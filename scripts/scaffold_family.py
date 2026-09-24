#!/usr/bin/env python3
"""Scaffold a ThemeVault family directory (intake S1). Never overwrites existing files.

Usage:
  python scripts/scaffold_family.py --family <id> --project <name> --repo <url> \
      --license MIT --themes light dark [--pin <sha>] [--pin-type commit]
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

L1_REQUIRED = [
    "bg", "bg-surface", "bg-surface-2", "bg-elevated", "bg-hover",
    "text", "text-muted", "text-dim",
    "border", "border-strong", "border-focus",
    "card", "hairline",
    "accent", "accent-hover", "accent-deep", "accent-secondary", "accent-foreground",
    "ok", "warn", "danger", "info", "queued",
    "syntax-comment", "syntax-keyword", "syntax-string",
    "syntax-literal", "syntax-title", "syntax-attr",
]
L1_READING = [
    "typo-h1", "typo-h2", "typo-h3", "typo-h4", "typo-h5", "typo-h6",
    "typo-bold", "typo-italic",
]


def write_new(path: Path, content: str, created: list[str]) -> None:
    if path.exists():
        print(f"skip (exists): {path}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    created.append(str(path.relative_to(ROOT)))


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--family", required=True)
    ap.add_argument("--project", required=True)
    ap.add_argument("--repo", required=True)
    ap.add_argument("--license", required=True)
    ap.add_argument("--themes", nargs="+", required=True)
    ap.add_argument("--pin", default="")
    ap.add_argument("--pin-type", default="commit", choices=["commit", "blob", "archive-hash"])
    ap.add_argument("--default-semantics", default="frozen-default",
                    choices=["frozen-default", "runtime-fallback"])
    args = ap.parse_args(argv)

    fam = args.family
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", fam):
        print("ERROR: family id must be lowercase kebab-case", file=sys.stderr)
        return 1
    created: list[str] = []
    fam_dir = THEMES / fam
    src = fam_dir / "_source"

    intent = {
        "schemaVersion": 1,
        "family": fam,
        "source": {
            "project": args.project,
            "repo": args.repo,
            "pin": args.pin,
            "pinType": args.pin_type,
            "files": [],
            "license": args.license,
            "upstream": {"project": None, "repo": None, "license": None, "note": None},
        },
        "scope": {
            "themes": list(args.themes),
            "defaultSemantics": args.default_semantics,
            "defaultNote": "",
        },
        "attribution": [],
        "collectedAt": date.today().isoformat(),
    }
    contract = {
        "family": fam,
        "version": 1,
        "source": {
            "project": args.project,
            "repo": args.repo,
            "license": args.license,
            "ref": args.pin or None,
            "primarySource": "",
        },
        "required": L1_REQUIRED,
        "derivedOptional": list(L1_READING),
    }
    write_new(src / "intent.json", json.dumps(intent, ensure_ascii=False, indent=2) + "\n", created)
    write_new(src / "contract.json", json.dumps(contract, ensure_ascii=False, indent=2) + "\n", created)
    write_new(
        fam_dir / "README.md",
        f"""# {fam} 家族

> 来源项目：[{fam}]({args.repo})（{args.license}{'，@ ' + args.pin if args.pin else ''}）
> 数据源：待填（拷入 `_source/` 后写文件名）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
""" + "".join(
            f"| `{t}` | {t} |  | value theme |  |\n" for t in args.themes
        ) + """
## L1 语义角色映射（本家族统一）

见 `docs/l1-roles.md`；完成后在此写对照表。

## 校验

```powershell
python scripts/extract_css_vars.py --src <css> --family {fam} --pin {args.pin or "<pin>"} --out themes/{fam}/_source/extract.json
python scripts/gen_index.py --write
```
""",
        created,
    )
    for t in args.themes:
        write_new(
            fam_dir / t / "README.md",
            f"""# {fam}/{t} 主题说明

## 元信息

- **来源项目**：{args.project}
- **来源仓库/链接**：{args.repo}
- **原始主题 ID**：`{t}`
- **显示名**：{t}
- **协议**：{args.license}
- **色彩方案**：
- **主题类型**：value theme（全局）
- **提取方式**：待填（含 pin）
- **提取日期**：{date.today().isoformat()}
- **显式颜色令牌数**：待填

## 迁移备注

- 待填

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — 快照 + intent/extract/contract
""",
            created,
        )
        write_new(
            fam_dir / t / "palette.md",
            f"# {fam}/{t} 色板表\n\n> 按 `_TEMPLATE/palette.md` 五段结构填写；值须能回溯 extract。\n",
            created,
        )

    print("created:" if created else "nothing created")
    for p in created:
        print(" ", p)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
