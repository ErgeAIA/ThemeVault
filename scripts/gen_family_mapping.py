#!/usr/bin/env python3
"""Build themes/<family>/mapping.json — source-token → L1 role map (organize P1).

Single machine source for family-level mapping. Family README stays human
guidance; migration-guide points here. Hints come from palette.md notes
(`--var` / backticked source names). Values are never rewritten.

Usage:
  python scripts/gen_family_mapping.py
  python scripts/gen_family_mapping.py --check
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"
ROLE_RE = re.compile(
    r"^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$"
)
SRC_HINT_RE = re.compile(r"(`--[a-zA-Z0-9-]+`|--[a-zA-Z0-9-]+|`[a-zA-Z][a-zA-Z0-9_.-]{1,40}`)")


def parse_palette(path: Path) -> dict[str, dict]:
    tokens: dict[str, dict] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = ROLE_RE.match(line)
        if not m:
            continue
        role = m.group(1)[2:]
        tokens[role] = {"value": m.group(2).strip(), "kind": m.group(3).strip(), "note": m.group(4).strip()}
    return tokens


def source_hints(note: str, value: str, family: str, role: str) -> list[str]:
    found = []
    for m in SRC_HINT_RE.finditer(note):
        tok = m.group(0).strip("`")
        if tok.startswith("--") or "." in tok or tok[0].islower():
            if tok not in found and tok != role:
                found.append(tok)
    # ergemd: native role names are source names
    if family == "ergemd" and role not in found:
        found.insert(0, role)
    # L1-reading：源码变量与角色同名（OnePage --typo-*）
    if role.startswith("typo-") and not found:
        found.append(f"--{role}")
    return found


README_ROW_RE = re.compile(
    r"^\|\s*`([a-z0-9-]+)`\s*\|([^|]+)\|([^|]*)\|",
    re.M,
)


def parse_family_readme_map(path: Path) -> dict[str, list[str]]:
    """从家族 README 对照表抽取 L1 角色 → 源令牌（第 2 列 + 第 3 列标识）。"""
    if not path.exists():
        return {}
    out: dict[str, list[str]] = {}
    for m in README_ROW_RE.finditer(path.read_text(encoding="utf-8")):
        role, col2, col3 = m.group(1), m.group(2), m.group(3)
        toks = []
        for part in re.split(r"[\s,/、]+", col2.strip().strip("`")):
            part = part.strip("`").strip()
            if part and not part.startswith("#") and part != role:
                # nord0 / accent12 / --background-primary / editor.background
                if re.fullmatch(r"[A-Za-z][A-Za-z0-9_.#-]{1,48}", part) or part.startswith("--"):
                    toks.append(part)
        for part in re.findall(r"[A-Za-z][A-Za-z0-9_.#-]{1,48}", col3):
            if any(x in part.lower() for x in ("background", "foreground", "color", "border", "accent", "editor", "list", "button", "side", "status", "title", "terminal", "dropdown", "input", "panel", "tab.", "widget", "selection", "cursor", "comment", "string", "keyword", "constant", "entity", "storage", "meta", "variable", "invalid", "diff", "banner", "badge", "shadow", "focus", "hover", "line", "guide", "ansi")):
                toks.append(part)
        if toks:
            out.setdefault(role, [])
            for t in toks:
                if t not in out[role]:
                    out[role].append(t)
    return out


def build_family_mapping(fam_dir: Path) -> dict:
    fam = fam_dir.name
    readme_map = parse_family_readme_map(fam_dir / "README.md")
    acc: dict[str, dict] = {}
    themes = sorted(
        p.name for p in fam_dir.iterdir()
        if p.is_dir() and not p.name.startswith("_") and (p / "palette.md").exists()
    )
    for tid in themes:
        pal = parse_palette(fam_dir / tid / "palette.md")
        for role, meta in pal.items():
            hints = source_hints(meta["note"], meta["value"], fam, role)
            for h in readme_map.get(role, []):
                if h not in hints:
                    hints.append(h)
            slot = acc.setdefault(role, {"sources": [], "kind": meta["kind"], "themes": []})
            for h in hints:
                if h not in slot["sources"]:
                    slot["sources"].append(h)
            if tid not in slot["themes"]:
                slot["themes"].append(tid)
            if fam == "ergemd" and role not in slot["sources"]:
                slot["sources"].insert(0, role)
    map_out = {}
    for role in sorted(acc):
        map_out[role] = {
            "sources": acc[role]["sources"],
            "kind": acc[role]["kind"],
            "themeCount": len(acc[role]["themes"]),
        }
    return {
        "schemaVersion": 1,
        "family": fam,
        "ir": "L1-v4",
        "themes": themes,
        "map": map_out,
    }


def check_family_consistency(fam_dir: Path) -> list[str]:
    """required 角色集必须同族一致；derivedOptional 允许仅覆盖分歧处。"""
    errors = []
    fam = fam_dir.name
    contract_p = fam_dir / "_source" / "contract.json"
    required: set[str] = set()
    if contract_p.exists():
        required = set(json.loads(contract_p.read_text(encoding="utf-8")).get("required", []))
    for theme_dir in sorted(p for p in fam_dir.iterdir() if p.is_dir() and not p.name.startswith("_")):
        pal_p = theme_dir / "palette.md"
        if not pal_p.exists():
            continue
        roles = set(parse_palette(pal_p))
        missing = sorted(required - roles)
        if missing:
            errors.append(f"[{fam}/{theme_dir.name}] required 角色缺失: {missing}")
    return errors


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--strict", action="store_true", help="required 无源线索视为错误")
    args = ap.parse_args(argv)
    strict = args.strict
    errors = 0
    warnings = 0
    for fam_dir in sorted(p for p in THEMES.iterdir() if p.is_dir() and not p.name.startswith("_")):
        if not (fam_dir / "_source" / "contract.json").exists():
            continue
        cons = check_family_consistency(fam_dir)
        for e in cons:
            print(f"ERROR: {e}", file=sys.stderr)
            errors += 1
        doc = build_family_mapping(fam_dir)
        # A2：required 角色不得零来源线索（允许显式契约兜底角色仍要有来源说明）
        contract_p = fam_dir / "_source" / "contract.json"
        required = set()
        if contract_p.exists():
            required = set(json.loads(contract_p.read_text(encoding="utf-8")).get("required", []))
        for role in sorted(required):
            meta = doc["map"].get(role)
            if meta is not None and not meta.get("sources"):
                msg = f"[{fam_dir.name}] required --{role} 无源变量线索（mapping 为 hints，非完备单源）"
                if strict:
                    print(f"ERROR: {msg}", file=sys.stderr)
                    errors += 1
                else:
                    warnings += 1
                    print(f"WARN: {msg}")
        # 统计空率（供追踪 A2 完备性）
        empty_req = sum(
            1
            for role in required
            if doc["map"].get(role) is not None and not doc["map"][role].get("sources")
        )
        if empty_req:
            print(f"STAT: [{fam_dir.name}] required 空线索 {empty_req}/{len(required)}")
        out_p = fam_dir / "mapping.json"
        payload = json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
        if args.check:
            if not out_p.exists():
                print(f"ERROR: [{fam_dir.name}] 缺 mapping.json", file=sys.stderr)
                errors += 1
            elif out_p.read_text(encoding="utf-8") != payload:
                print(f"ERROR: [{fam_dir.name}] mapping.json 与 palette 提示不一致", file=sys.stderr)
                errors += 1
        else:
            if not out_p.exists() or out_p.read_text(encoding="utf-8") != payload:
                out_p.write_text(payload, encoding="utf-8")
    mode = "check" if args.check else "write"
    print(
        f"gen_family_mapping --{mode}: {'OK' if errors == 0 else f'{errors} error(s)'}"
        f" ({warnings} warn)"
    )
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
