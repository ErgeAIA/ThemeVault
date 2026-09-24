#!/usr/bin/env python3
"""Backfill intake IR (intent.json + extract.json) for ThemeVault families.

Reads existing `_source/` snapshots (no network) and emits mechanical extract
across CSS / JSON / YAML / Lua / TS / Vim color declarations. Never invents
values. Legacy pin uses pinType=legacy (see docs/intake-artifacts.md).

Usage:
  python scripts/backfill_intake_ir.py           # all families missing IR
  python scripts/backfill_intake_ir.py --family nord
  python scripts/backfill_intake_ir.py --force   # rewrite existing IR
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"

HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
RGB_RE = re.compile(r"rgba?\([^)]+\)")
HSL_RE = re.compile(r"hsla?\([^)]+\)")
CSS_VAR_RE = re.compile(r"(--[a-zA-Z0-9-]+)\s*:\s*([^;]+)")
# lua/ts style: key = "#abc" or key = "rgb(...)"
ASSIGN_RE = re.compile(
    r"['\"]?([A-Za-z0-9_./-]+)['\"]?\s*[=:]\s*['\"]([^'\"]+)['\"]"
)
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
    if "rgb(" in v or "rgba(" in v:
        return "rgb" if "rgb(" in v else "rgba"
    if v.startswith("#"):
        return "hex"
    if "hsl(" in v or "hsla(" in v:
        return "other"
    if "linear-gradient" in v:
        return "shadow-or-gradient"
    return "other"


RGB_TRIPLET_RE = re.compile(r"^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$")
# raw "key": "#hex" / key: #hex fallbacks
JSON_KV_RE = re.compile(
    r"['\"]([A-Za-z0-9_./#-]+)['\"]\s*:\s*['\"]([^'\"]+)['\"]"
)
YAML_KV_RE = re.compile(
    r"^(\s*)([A-Za-z0-9_./#-]+)\s*:\s*([^\s#][^#\n]*)$", re.M
)


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


def add_entry(entries: list, seen: set, selector: str, var: str, value: str, source_file: str) -> None:
    val = value.strip().rstrip(";").strip()
    if val.endswith("!important"):
        val = val[: -len("!important")].strip()
    key = (source_file, selector, var, val)
    if key in seen:
        return
    seen.add(key)
    entries.append({
        "selector": selector,
        "var": var,
        "value": val if len(val) < 300 else val[:300] + "…",
        "kind": kind_of(val),
        "sourceFile": source_file,
    })


def extract_from_css(text: str, rel: str, entries: list, seen: set) -> None:
    for m in CSS_VAR_RE.finditer(text):
        var, val = m.group(1), m.group(2)
        if looks_color(val) or COLOR_KEY_HINT.search(var):
            if looks_color(val) or kind_of(val.strip()) in ("var-ref", "color-mix"):
                add_entry(entries, seen, "css", var, val, rel)
    # raw string pairs fallback
    extract_pairs(text, rel, entries, seen, selector="css-text")


def extract_pairs(text: str, rel: str, entries: list, seen: set, selector: str) -> None:
    for rx, sel in ((JSON_KV_RE, "json-kv"), (YAML_KV_RE, "yaml-kv"), (ASSIGN_RE, "assign")):
        for m in rx.finditer(text):
            groups = m.groups()
            key = groups[-2] if len(groups) >= 2 else groups[0]
            val = groups[-1]
            val = (val or "").strip().strip("'\"").strip()
            if val and looks_color(val):
                add_entry(entries, seen, f"{selector}:{sel}", str(key), val, rel)


def extract_from_json(text: str, rel: str, entries: list, seen: set) -> None:
    parsed = False
    for candidate in (text, re.sub(r"^\s*//.*$", "", text, flags=re.M)):
        try:
            obj = json.loads(candidate)
        except json.JSONDecodeError:
            continue
        walk_json(obj, "", rel, entries, seen)
        parsed = True
        break
    extract_pairs(text, rel, entries, seen, selector="json")


def extract_from_yaml(text: str, rel: str, entries: list, seen: set) -> None:
    extract_pairs(text, rel, entries, seen, selector="yaml")
    extract_from_lua_ts(text, rel, entries, seen)


def extract_from_lua_ts(text: str, rel: str, entries: list, seen: set) -> None:
    extract_pairs(text, rel, entries, seen, selector="code")
    for m in re.finditer(r"([A-Za-z0-9_]+)\s*=\s*(#[0-9a-fA-F]{3,8})", text):
        add_entry(entries, seen, "code", m.group(1), m.group(2), rel)
    # everforest.vim / solarized style: gui=#hex
    for m in re.finditer(r"([A-Za-z0-9_]+)\s*=\s*([0-9a-fA-F]{6})\b", text):
        if COLOR_KEY_HINT.search(m.group(1)):
            add_entry(entries, seen, "code", m.group(1), "#" + m.group(2), rel)


def walk_json(obj, path: str, rel: str, entries: list, seen: set) -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            walk_json(v, f"{path}.{k}" if path else k, rel, entries, seen)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_json(v, f"{path}[{i}]", rel, entries, seen)
    elif isinstance(obj, str):
        if looks_color(obj):
            add_entry(entries, seen, "json", path or "(root)", obj, rel)


def extract_bare_hexes(text: str, rel: str, entries: list, seen: set) -> None:
    """Last-resort harvest: every hex literal with nearest left identifier."""
    for m in HEX_RE.finditer(text):
        start = m.start()
        line_start = text.rfind("\n", 0, start) + 1
        prefix = text[line_start:start]
        idm = re.search(r"([A-Za-z0-9_.#/-]+)\s*$", prefix)
        var = idm.group(1) if idm else f"hex@{start}"
        add_entry(entries, seen, "literal", var, m.group(0), rel)
    # YAML anchors: &BG '#282A36'
    for m in re.finditer(r"&([A-Za-z0-9_]+)\s+'(#[0-9a-fA-F]{3,8})'", text):
        add_entry(entries, seen, "yaml-anchor", m.group(1), m.group(2), rel)
    # vim script lists: '#2d353b'
    for m in re.finditer(r"'(#[0-9a-fA-F]{3,8})'", text):
        add_entry(entries, seen, "quoted-hex", "hex-literal", m.group(1), rel)


def extract_file(path: Path, src_root: Path, entries: list, seen: set) -> None:
    rel = str(path.relative_to(src_root)).replace("\\", "/")
    if path.name.lower() in ("license", "license.txt", "license.md"):
        return
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return
    suf = path.suffix.lower()
    if suf == ".css":
        extract_from_css(text, rel, entries, seen)
    elif suf == ".json":
        extract_from_json(text, rel, entries, seen)
    elif suf in (".yml", ".yaml"):
        extract_from_yaml(text, rel, entries, seen)
    elif suf in (".lua", ".ts", ".mjs", ".js", ".vim", "") or path.name in ("solarized",):
        extract_from_lua_ts(text, rel, entries, seen)
    else:
        extract_from_lua_ts(text, rel, entries, seen)
    extract_bare_hexes(text, rel, entries, seen)
    extract_pairs(text, rel, entries, seen, selector="fallback")
    rel = str(path.relative_to(src_root)).replace("\\", "/")
    if path.name.lower() in ("license", "license.txt", "license.md"):
        return
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return
    suf = path.suffix.lower()
    if suf == ".css":
        extract_from_css(text, rel, entries, seen)
    elif suf == ".json":
        extract_from_json(text, rel, entries, seen)
    elif suf in (".yml", ".yaml"):
        extract_from_yaml(text, rel, entries, seen)
    elif suf in (".lua", ".ts", ".mjs", ".js", ".vim", "") or path.name in ("solarized",):
        extract_from_lua_ts(text, rel, entries, seen)
    else:
        extract_from_lua_ts(text, rel, entries, seen)
    extract_bare_hexes(text, rel, entries, seen)
    extract_pairs(text, rel, entries, seen, selector="fallback")


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
    entries: list = []
    seen: set = set()
    for f in sorted(src.rglob("*")):
        if f.is_file():
            extract_file(f, src, entries, seen)
    entries.sort(key=lambda e: (e["sourceFile"], e["selector"], e["var"], e["value"]))
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
                for f in src.rglob("*") if f.is_file()
            ),
            "license": meta["license"] or "UNKNOWN",
            "upstream": {"project": None, "repo": None, "license": None, "note": meta["note"] or None},
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
        "schemaVersion": 1,
        "family": fam,
        "pin": pin,
        "entries": entries,
    }
    (src / "intent.json").write_text(
        json.dumps(intent, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (src / "extract.json").write_text(
        json.dumps(extract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return f"ok entries={len(entries)}"


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--family")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args(argv)
    fams = []
    for p in sorted(THEMES.iterdir()):
        if not p.is_dir() or p.name.startswith("_"):
            continue
        if args.family and p.name != args.family:
            continue
        fams.append(p)
    for fam in fams:
        status = write_ir(fam, force=args.force)
        if status:
            print(f"{fam.name}: {status}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
