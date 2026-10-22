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

import _tvcommon

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"
L1_ROLES = ROOT / "docs" / "l1-roles.md"
# 角色表解析统一在 _tvcommon（四脚本共用一份缓存结果，正则大小写敏感见该模块）。
ROLE_RE = _tvcommon.ROLE_RE
FALLBACK_NOTE = re.compile(r"契约兜底|豁免|约定|HEX 显示|继承|oklch|推导|未提供")
# 逐角色跑的正则提到模块级：原先在 7152 次循环里现写 re.search 字面量，
# 每次都要过 re 内部缓存查找（实测 4 万次 _compile）。
CONTRACT_FALLBACK_RE = re.compile(r"契约兜底|豁免|继承")
DISPLAY_EXEMPTION_RE = re.compile(r"HEX 显示")
DERIVED_HINT_RE = re.compile(r"推导|oklch|约定|未提供")


def parse_palette(path: Path) -> dict[str, dict]:
    """解析 palette.md 角色表；走 _tvcommon 的跨模块缓存。"""
    return _tvcommon.parse_palette(str(path))


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
            "contractFallback": bool(CONTRACT_FALLBACK_RE.search(meta["note"])),
            "displayExemption": bool(DISPLAY_EXEMPTION_RE.search(meta["note"])),
            "derivedHint": bool(DERIVED_HINT_RE.search(meta["note"])),
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
    # 已从磁盘 json.loads 出来、已是规范化结构，直接比较即可；
    # 原先两侧各 json.dumps 一次（每主题 2 次 ~500 项编码）纯属重复编码开销。
    return a == b


def load_required(contract_p: Path) -> set[str] | None:
    """读取家族契约的 required 角色集（同族共享，按路径缓存）。

    返回 None 表示该家族没有 contract.json（跳过），与「契约存在但 required 为空」区分开。
    """
    if not contract_p.exists():
        return None
    return set(_tvcommon.load_contract(str(contract_p)).get("required", []))


def process_theme(
    fam_dir: Path,
    theme_dir: Path,
    core: set[str],
    reading: set[str],
    write: bool,
    required: set[str],
) -> tuple[str | None, dict | None]:
    palette_p = theme_dir / "palette.md"
    if not palette_p.exists():
        return None, None
    fam = fam_dir.name
    tid = theme_dir.name
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
    for fam_dir in sorted(p for p in THEMES.iterdir() if p.is_dir() and not p.name.startswith("_")):
        # 契约 required 同族共享：原先每主题重读一次 contract.json（151 次 → 24 次）
        required = load_required(fam_dir / "_source" / "contract.json")
        if required is None:
            continue
        for theme_dir in sorted(p for p in fam_dir.iterdir() if p.is_dir() and not p.name.startswith("_")):
            err, doc = process_theme(fam_dir, theme_dir, core, reading, write=not args.check, required=required)
            if err:
                print(f"ERROR: {err}", file=sys.stderr)
                errors += 1
    if args.check:
        print(f"gen_tokens --check: {'OK' if errors == 0 else f'{errors} error(s)'}")
        return 1 if errors else 0
    print(f"gen_tokens: wrote/refreshed themes (core={len(core)} reading={len(reading)})")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
