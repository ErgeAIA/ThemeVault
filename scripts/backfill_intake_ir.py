#!/usr/bin/env python3
"""Backfill intake IR (intent.json + extract.json) for ThemeVault families.

extract.json is a **value ledger** (schemaVersion 2): one entry per unique
color value + a single witness (sourceFile / var / selector). Ground truth
stays in `_source/**`; this is an index for provenance lint (see
docs/intake-artifacts.md). Rebuild anytime with --force.

Usage:
  python scripts/backfill_intake_ir.py
  python scripts/backfill_intake_ir.py --family nord
  python scripts/backfill_intake_ir.py --force
"""
from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"

HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
RGB_RE = re.compile(r"rgba?\([^)]+\)")
HSL_RE = re.compile(r"hsla?\([^)]+\)")
CSS_VAR_RE = re.compile(r"(--[a-zA-Z0-9-]+)\s*:\s*([^;]+)")
ASSIGN_RE = re.compile(
    r"['\"]?([A-Za-z0-9_./-]+)['\"]?\s*[=:]\s*['\"]([^'\"]+)['\"]"
)
JSON_KV_RE = re.compile(r"['\"]([A-Za-z0-9_./#-]+)['\"]\s*:\s*['\"]([^'\"]+)['\"]")
YAML_KV_RE = re.compile(r"^(\s*)([A-Za-z0-9_./#-]+)\s*:\s*([^\s#][^#\n]*)$", re.M)
RGB_TRIPLET_RE = re.compile(r"^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$")
COLOR_KEY_HINT = re.compile(
    r"color|background|bg|text|fg|border|accent|shadow|selection|highlight|"
    r"foreground|ansi|code|syntax|brand|palette|comment|string|keyword|"
    r"function|constant|number|variable|title|attribute|error|warning|info",
    re.I,
)


def kind_of(val: str) -> str:
    v = val.strip()
    if v.startswith("var(") and "color-mix" not in v and "rgb(" not in v:
        return "var-ref"
    if "color-mix" in v:
        return "color-mix"
    if "rgb(" in v:
        return "rgb"
    if "rgba(" in v:
        return "rgba"
    if v.startswith("#"):
        return "hex"
    if "linear-gradient" in v:
        return "shadow-or-gradient"
    return "other"


def looks_color(val: str) -> bool:
    v = val.strip()
    if not v:
        return False
    return bool(
        HEX_RE.search(v)
        or RGB_RE.search(v)
        or HSL_RE.search(v)
        or RGB_TRIPLET_RE.match(v)
        or v.startswith("color-mix")
        or v.startswith("linear-gradient")
        or v.startswith("var(")
    )


def norm_value(val: str) -> str:
    v = val.strip()
    if v.endswith("!important"):
        v = v[: -len("!important")].strip()
    return v if len(v) < 300 else v[:300] + "…"


def add_value(
    ledger: dict[str, dict],
    value: str,
    kind: str,
    source_file: str,
    var: str,
    selector: str,
) -> None:
    v = norm_value(value)
    if not v:
        return
    # first witness wins (stable enough; rebuild is deterministic by scan order)
    if v in ledger:
        ledger[v]["hits"] = ledger[v].get("hits", 1) + 1
        return
    ledger[v] = {
        "kind": kind,
        "witness": {
            "sourceFile": source_file,
            "var": var,
            "selector": selector,
        },
        "hits": 1,
    }


def add_entry_raw(ledger, selector, var, value, source_file) -> None:
    val = norm_value(value)
    if looks_color(val) or kind_of(val) in ("var-ref", "color-mix"):
        add_value(ledger, val, kind_of(val), source_file, var, selector)


def walk_json(obj, path: str, rel: str, ledger: dict) -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk_json(v, f"{path}.{k}" if path else k, rel, ledger)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_json(v, f"{path}[{i}]", rel, ledger)
    elif isinstance(obj, str) and looks_color(obj):
        add_value(ledger, obj, kind_of(obj), rel, path or "(root)", "json")


def extract_pairs(text: str, rel: str, ledger: dict, selector: str) -> None:
    for rx, sel in ((JSON_KV_RE, "json-kv"), (YAML_KV_RE, "yaml-kv"), (ASSIGN_RE, "assign")):
        for m in rx.finditer(text):
            groups = m.groups()
            key = groups[-2] if len(groups) >= 2 else groups[0]
            val = (groups[-1] or "").strip().strip("'\"").strip()
            if val and looks_color(val):
                add_value(ledger, val, kind_of(val), rel, str(key), f"{selector}:{sel}")


def extract_from_css(text: str, rel: str, ledger: dict) -> None:
    for m in CSS_VAR_RE.finditer(text):
        var, val = m.group(1), m.group(2)
        add_entry_raw(ledger, "css", var, val, rel)
    extract_pairs(text, rel, ledger, "css-text")


def extract_from_json(text: str, rel: str, ledger: dict) -> None:
    for candidate in (text, re.sub(r"^\s*//.*$", "", text, flags=re.M)):
        try:
            obj = json.loads(candidate)
        except json.JSONDecodeError:
            continue
        walk_json(obj, "", rel, ledger)
        break
    extract_pairs(text, rel, ledger, "json")


def extract_from_yaml(text: str, rel: str, ledger: dict) -> None:
    extract_pairs(text, rel, ledger, "yaml")


def extract_from_lua_ts(text: str, rel: str, ledger: dict) -> None:
    extract_pairs(text, rel, ledger, "code")
    for m in re.finditer(r"([A-Za-z0-9_]+)\s*=\s*(#[0-9a-fA-F]{3,8})", text):
        add_value(ledger, m.group(2), "hex", rel, m.group(1), "code")
    for m in re.finditer(r"([A-Za-z0-9_]+)\s*=\s*([0-9a-fA-F]{6})\b", text):
        if COLOR_KEY_HINT.search(m.group(1)):
            add_value(ledger, "#" + m.group(2), "hex", rel, m.group(1), "code")


def extract_bare_hexes(text: str, rel: str, ledger: dict) -> None:
    for m in HEX_RE.finditer(text):
        start = m.start()
        line_start = text.rfind("\n", 0, start) + 1
        prefix = text[line_start:start]
        idm = re.search(r"([A-Za-z0-9_.#/-]+)\s*$", prefix)
        var = idm.group(1) if idm else f"hex@{start}"
        add_value(ledger, m.group(0), "hex", rel, var, "literal")
    for m in re.finditer(r"&([A-Za-z0-9_]+)\s+'(#[0-9a-fA-F]{3,8})'", text):
        add_value(ledger, m.group(2), "hex", rel, m.group(1), "yaml-anchor")
    for m in re.finditer(r"'(#[0-9a-fA-F]{3,8})'", text):
        add_value(ledger, m.group(1), "hex", rel, "hex-literal", "quoted-hex")


def extract_file(path: Path, src_root: Path, ledger: dict) -> None:
    rel = str(path.relative_to(src_root)).replace("\\", "/")
    if path.name.lower() in ("license", "license.txt", "license.md"):
        return
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return
    suf = path.suffix.lower()
    if suf == ".css":
        extract_from_css(text, rel, ledger)
    elif suf == ".json":
        extract_from_json(text, rel, ledger)
    elif suf in (".yml", ".yaml"):
        extract_from_yaml(text, rel, ledger)
    else:
        extract_from_lua_ts(text, rel, ledger)
    extract_bare_hexes(text, rel, ledger)
    extract_pairs(text, rel, ledger, "fallback")


def family_meta(fam_dir: Path) -> dict:
    readme = fam_dir / "README.md"
    meta = {"project": fam_dir.name, "repo": "", "license": "", "note": ""}
    if readme.exists():
        t = readme.read_text(encoding="utf-8")
        m = re.search(r"来源项目：\[([^\]]+)\]\(([^)]+)\)", t)
        if m:
            meta["project"], meta["repo"] = m.group(1), m.group(2)
        else:
            m = re.search(r"来源项目：\s*(.+)", t)
            if m:
                meta["project"] = m.group(1).strip()
        m = re.search(r"（([^（）]*?(?:Apache-2\.0|MIT|AGPL-3\.0)[^（）]*?)）", t)
        if m:
            meta["license"] = m.group(1).split("，")[0].strip()
    contract = fam_dir / "_source" / "contract.json"
    if contract.exists():
        c = json.loads(contract.read_text(encoding="utf-8"))
        src = c.get("source") or {}
        meta["project"] = src.get("project") or meta["project"]
        meta["repo"] = src.get("repo") or meta["repo"]
        meta["license"] = src.get("license") or meta["license"]
        if src.get("ref"):
            meta["note"] = f"contract.source.ref={src['ref']}"
    return meta


def themes_of(fam_dir: Path) -> list[str]:
    return sorted(
        p.name for p in fam_dir.iterdir()
        if p.is_dir() and not p.name.startswith("_") and (p / "palette.md").exists()
    )


def write_ir(fam_dir: Path, force: bool) -> str | None:
    fam = fam_dir.name
    src = fam_dir / "_source"
    if not (src / "contract.json").exists():
        return None
    if (src / "intent.json").exists() and not force:
        return "skip"
    meta = family_meta(fam_dir)
    themes = themes_of(fam_dir)
    ledger: dict[str, dict] = {}
    for f in sorted(src.rglob("*")):
        if f.is_file():
            extract_file(f, src, ledger)
    # deterministic key order
    values = {k: ledger[k] for k in sorted(ledger.keys())}
    pin = "unrecorded-legacy-intake"
    pin_type = "legacy"
    intent = {
        "schemaVersion": 1,
        "family": fam,
        "source": {
            "project": meta["project"],
            "repo": meta["repo"],
            "pin": pin,
            "pinType": pin_type,
            "files": sorted(
                str(f.relative_to(src)).replace("\\", "/")
                for f in src.rglob("*")
                if f.is_file() and f.name not in ("intent.json", "extract.json")
            ),
            "license": meta["license"] or "UNKNOWN",
            "upstream": {
                "project": None,
                "repo": None,
                "license": None,
                "note": meta["note"] or None,
            },
        },
        "scope": {
            "themes": themes,
            "defaultSemantics": "frozen-default",
            "defaultNote": "回填 IR：入库时未记录运行时覆盖语义；按源码固化值处理",
        },
        "attribution": [],
        "collectedAt": date.today().isoformat(),
        "backfilled": True,
    }
    extract = {
        "schemaVersion": 2,
        "family": fam,
        "pin": pin,
        "kind": "value-ledger",
        "values": values,
    }
    # preserve partial flag if previously set (everforest-style)
    old_extract_p = src / "extract.json"
    if old_extract_p.exists():
        try:
            old = json.loads(old_extract_p.read_text(encoding="utf-8"))
            if old.get("provenance") == "partial":
                extract["provenance"] = "partial"
                extract["provenanceNote"] = old.get("provenanceNote")
        except json.JSONDecodeError:
            pass
    if not extract.get("provenance"):
        extract["provenance"] = "full"
    (src / "intent.json").write_text(
        json.dumps(intent, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (src / "extract.json").write_text(
        json.dumps(extract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return f"ok values={len(values)}"


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--family")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args(argv)
    for p in sorted(THEMES.iterdir()):
        if not p.is_dir() or p.name.startswith("_"):
            continue
        if args.family and p.name != args.family:
            continue
        status = write_ir(p, force=args.force)
        if status:
            print(f"{p.name}: {status}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
