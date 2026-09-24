#!/usr/bin/env python3
"""Build theme.tokens.json — ThemeVault organize-layer IR (L1-v4).

Source of truth for L1 role layers: docs/l1-roles.md.
Palette values stay verbatim; this file classifies layer/fallback for
machine consumers (export / profiles). See docs/organize-ir.md.

Usage:
  python scripts/gen_tokens.py            # write all themes
  python scripts/gen_tokens.py --check    # exit 1 if drift vs palette.md
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"
L1_ROLES = ROOT / "docs" / "l1-roles.md"
ROLE_RE = re.compile(
    r"^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$"
)
FALLBACK_NOTE = re.compile(r"契约兜底|豁免|约定|HEX 显示|继承|oklch|推导|未提供")


def parse_palette(path: Path) -> dict[str, dict]:
    tokens: dict[str, dict] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = ROLE_RE.match(line)
        if not m:
            continue
        role, value, kind, note = (
            m.group(1)[2:],
            m.group(2).strip(),
            m.group(3).strip(),
            m.group(4).strip(),
        )
        tokens[role] = {"value": value, "kind": kind, "note": note}
    return tokens


def parse_l1_layers(path: Path) -> tuple[set[str], set[str]]:
    """Return (core_roles, reading_roles) from docs/l1-roles.md."""
    text = path.read_text(encoding="utf-8")
    core: set[str] = set()
    reading: set[str] = set()
    m = re.search(r"## 2\. L1-core（29）\s*```([^`]+)```", text)
    if m:
        for tok in m.group(1).split():
            core.add(tok.strip("`"))
    for m in re.finditer(r"\|\s*`(typo-[a-z0-9-]+)`\s*\|", text):
        reading.add(m.group(1))
    return core, reading


def build_tokens(
    family: str,
    theme: str,
    palette: dict[str, dict],
    core: set[str],
    reading: set[str],
    required: set[str],
) -> dict:
    out: dict[str, dict] = {}
    for role in sorted(palette):
        meta = palette[role]
        if role in reading or role.startswith("typo-"):
            layer = "reading"
        elif role in core or role in required:
            layer = "core"
        else:
            layer = "family"
        out[role] = {
            "value": meta["value"],
            "kind": meta["kind"],
            "layer": layer,
            # 对抗审查 B1：拆开「无独立源值」与「纳入期显示豁免」
            "contractFallback": bool(re.search(r"契约兜底|豁免|继承", meta["note"])),
            "displayExemption": bool(re.search(r"HEX 显示", meta["note"])),
            "derivedHint": bool(re.search(r"推导|oklch|约定|未提供", meta["note"])),
            "fallback": bool(FALLBACK_NOTE.search(meta["note"])),
            "note": meta["note"],
        }
    return {
        "schemaVersion": 1,
        "family": family,
        "theme": theme,
        "ir": "L1-v4",
        "tokens": out,
    }


def tokens_equal(a: dict, b: dict) -> bool:
    # ignore whitespace-only diffs in values via canonical json
    return json.dumps(a, ensure_ascii=False, sort_keys=True) == json.dumps(
        b, ensure_ascii=False, sort_keys=True
    )


def process_theme(
    fam_dir: Path,
    theme_dir: Path,
    core: set[str],
    reading: set[str],
    write: bool,
) -> tuple[str | None, dict | None]:
    palette_p = theme_dir / "palette.md"
    if not palette_p.exists():
        return None, None
    fam = fam_dir.name
    tid = theme_dir.name
    contract_p = fam_dir / "_source" / "contract.json"
    required: set[str] = set()
    if contract_p.exists():
        required = set(json.loads(contract_p.read_text(encoding="utf-8")).get("required", []))
    palette = parse_palette(palette_p)
    doc = build_tokens(fam, tid, palette, core, reading, required)
    out_p = theme_dir / "tokens.json"
    if not write:
        if not out_p.exists():
            return f"[{fam}/{tid}] 缺 tokens.json", doc
        old = json.loads(out_p.read_text(encoding="utf-8"))
        if not tokens_equal(old, doc):
            return f"[{fam}/{tid}] tokens.json 与 palette.md 不一致", doc
        return None, doc
    payload = json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
    if out_p.exists() and out_p.read_text(encoding="utf-8") == payload:
        return None, doc
    out_p.write_text(payload, encoding="utf-8")
    return None, doc


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args(argv)
    core, reading = parse_l1_layers(L1_ROLES)
    if not core or not reading:
        print("ERROR: 无法从 docs/l1-roles.md 解析 core/reading", file=sys.stderr)
        return 1
    errors = 0
    written = 0
    for fam_dir in sorted(p for p in THEMES.iterdir() if p.is_dir() and not p.name.startswith("_")):
        if not (fam_dir / "_source" / "contract.json").exists():
            continue
        for theme_dir in sorted(p for p in fam_dir.iterdir() if p.is_dir() and not p.name.startswith("_")):
            err, doc = process_theme(fam_dir, theme_dir, core, reading, write=not args.check)
            if err:
                print(f"ERROR: {err}", file=sys.stderr)
                errors += 1
            elif not args.check and doc is not None and (theme_dir / "tokens.json").exists():
                written += 1
    if args.check:
        print(f"gen_tokens --check: {'OK' if errors == 0 else f'{errors} error(s)'}")
        return 1 if errors else 0
    print(f"gen_tokens: wrote/refreshed themes (core={len(core)} reading={len(reading)})")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
