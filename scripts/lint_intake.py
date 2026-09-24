#!/usr/bin/env python3
"""Provenance / intake DoD lint for ThemeVault.

extract.json value ledger (schemaVersion 2): palette values must be
formula | ledger-backed | explicit fallback note. Supports legacy
schemaVersion 1 entry lists. See docs/intake-artifacts.md.

Usage: python scripts/lint_intake.py [--strict]
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"
ROLE_RE = re.compile(r"^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$")
FALLBACK_NOTE = re.compile(
    r"契约兜底|豁免|约定|HEX 显示|继承|oklch|推导|未提供"
)
FORMULA_START = ("color-mix(", "var(", "rgb(", "rgba(", "linear-gradient(")


def rgb_to_hex(value: str) -> str | None:
    m = re.match(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", value.strip())
    if not m:
        return None
    r, g, b = (int(m.group(i)) for i in (1, 2, 3))
    return f"#{r:02x}{g:02x}{b:02x}"


def norm_hex(v: str) -> str:
    v = v.strip().lower()
    if re.fullmatch(r"#[0-9a-f]{3}", v):
        v = "#" + v[1] * 2 + v[2] * 2 + v[3] * 2
    return v


def is_formula(v: str) -> bool:
    return v.startswith(FORMULA_START)


def load_palette(path: Path) -> dict[str, dict]:
    tokens = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = ROLE_RE.match(line)
        if not m:
            continue
        role, value, kind, note = m.group(1)[2:], m.group(2).strip(), m.group(3).strip(), m.group(4).strip()
        tokens[role] = {"value": value, "kind": kind, "note": note}
    return tokens


def extract_index(extract: dict) -> tuple[set[str], set[str], bool]:
    """Return (normalized values, hex set incl. rgb conversions, has_values)."""
    vals: set[str] = set()
    hexes: set[str] = set()
    raw_values: list[str] = []
    if extract.get("schemaVersion") == 2 and isinstance(extract.get("values"), dict):
        raw_values = list(extract["values"].keys())
    else:
        for e in extract.get("entries", []):
            raw_values.append(e.get("value", ""))
    for v in raw_values:
        v = (v or "").strip()
        if not v:
            continue
        vals.add(v)
        vals.add(v.lower())
        h = rgb_to_hex(v)
        if h:
            hexes.add(h)
        nh = norm_hex(v)
        if nh.startswith("#"):
            hexes.add(nh)
    return vals, hexes, bool(vals)


def lint_family(fam_dir: Path, strict: bool) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    fam = fam_dir.name
    src = fam_dir / "_source"
    intent_p = src / "intent.json"
    extract_p = src / "extract.json"

    has_intent = intent_p.exists()
    has_extract = extract_p.exists()
    if not has_intent and not has_extract:
        msg = f"[{fam}] 缺 intent.json/extract.json（渐进补齐，DEC-006）"
        (errors if strict else warnings).append(msg)
    elif has_intent != has_extract:
        errors.append(f"[{fam}] intent/extract 不完整（intent={has_intent} extract={has_extract}）")
        return errors, warnings

    intent = extract = None
    if has_intent:
        try:
            intent = json.loads(intent_p.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(f"[{fam}] intent.json 解析失败: {e}")
            return errors, warnings
        if intent.get("schemaVersion") != 1:
            errors.append(f"[{fam}] intent.schemaVersion != 1")
        pin = (intent.get("source") or {}).get("pin")
        pin_type = (intent.get("source") or {}).get("pinType")
        if not pin and pin_type != "legacy":
            errors.append(f"[{fam}] intent.source.pin 为空")
        if not (intent.get("source") or {}).get("license"):
            errors.append(f"[{fam}] intent.source.license 为空")
        if not (intent.get("source") or {}).get("repo") and pin_type != "legacy":
            errors.append(f"[{fam}] intent.source.repo 为空")
        elif not (intent.get("source") or {}).get("repo"):
            warnings.append(f"[{fam}] intent.source.repo 为空（legacy 回填）")
    if has_extract:
        try:
            extract = json.loads(extract_p.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(f"[{fam}] extract.json 解析失败: {e}")
            return errors, warnings
        ver = extract.get("schemaVersion")
        if ver not in (1, 2):
            errors.append(f"[{fam}] extract.schemaVersion 不受支持: {ver}")
        if intent and extract.get("pin") != intent.get("source", {}).get("pin"):
            errors.append(f"[{fam}] extract.pin != intent.source.pin")
        if ver == 2:
            values = extract.get("values")
            if not isinstance(values, dict):
                errors.append(f"[{fam}] extract.values 必须为对象（value-ledger）")
            else:
                for i, (val, meta) in enumerate(values.items()):
                    if not isinstance(meta, dict) or "witness" not in meta:
                        errors.append(f"[{fam}] extract.values[{val!r}] 缺 witness")
                        if i > 5:
                            break
        else:
            for i, e in enumerate(extract.get("entries", [])):
                for k in ("selector", "var", "value", "kind", "sourceFile"):
                    if k not in e:
                        errors.append(f"[{fam}] extract.entries[{i}] 缺字段 {k}")
                        break

    vals, hexes, has_vals = extract_index(extract) if extract else (set(), set(), False)
    partial = bool(extract) and extract.get("provenance") == "partial"

    for theme_dir in sorted(p for p in fam_dir.iterdir() if p.is_dir() and not p.name.startswith("_")):
        palette = theme_dir / "palette.md"
        if not palette.exists():
            continue
        tid = theme_dir.name
        for role, tok in load_palette(palette).items():
            value, note = tok["value"], tok["note"]
            if is_formula(value):
                continue
            if FALLBACK_NOTE.search(note):
                continue
            if extract is None or not has_vals:
                continue
            nv = norm_hex(value)
            if value in vals or value.lower() in vals or nv in hexes:
                continue
            if re.fullmatch(r"#[0-9a-fA-F]{8}", value) and norm_hex(value[:7]) in hexes:
                continue
            if re.fullmatch(r"#[0-9a-fA-F]{8}", nv) and nv[:7] in hexes:
                continue
            if re.fullmatch(r"\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}", value):
                alt = f"rgb({value})"
                if any(
                    value.replace(" ", "") == ev.replace(" ", "") or value in ev or alt in ev
                    for ev in vals
                ):
                    continue
            if any(value and value in ev for ev in vals):
                continue
            msg = f"[{fam}/{tid}] --{role} 值不可回溯 extract 且备注无豁免标记: {value!r}"
            if partial:
                warnings.append(msg + "（provenance=partial）")
            else:
                errors.append(msg)
    return errors, warnings


def lint_all(themes_root: Path, strict: bool = False) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    for fam_dir in sorted(
        (p for p in themes_root.iterdir() if p.is_dir() and not p.name.startswith("_")),
        key=lambda p: p.name,
    ):
        if not (fam_dir / "_source" / "contract.json").exists():
            continue
        e, w = lint_family(fam_dir, strict)
        errors.extend(e)
        warnings.extend(w)
    return errors, warnings


def main(argv: list[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    strict = "--strict" in argv
    errors, warnings = lint_all(THEMES, strict=strict)
    for w in warnings:
        print(f"WARN: {w}")
    for e in errors:
        print(f"ERROR: {e}", file=sys.stderr)
    if errors:
        print(f"lint_intake: {len(errors)} error(s), {len(warnings)} warning(s)", file=sys.stderr)
        return 1
    print(f"lint_intake: OK ({len(warnings)} warning(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
