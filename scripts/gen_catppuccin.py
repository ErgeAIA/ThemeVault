#!/usr/bin/env python3
"""Generate the catppuccin family from the official palette JSONs.

Downloads palette/<flavor>.json from github.com/catppuccin/catppuccin (MIT),
maps the 26 named colors onto the ThemeVault L1 semantic role set, and writes:

  themes/catppuccin/_source/<flavor>.json   (raw official source, read-only)
  themes/catppuccin/_source/contract.json   (L1 contract, same role set)
  themes/catppuccin/README.md               (family readme + mapping table)
  themes/catppuccin/<flavor>/palette.md     (normalized palette table)
  themes/catppuccin/<flavor>/README.md      (theme readme)

The L1 mapping is a *project decision* recorded here and in the family README;
color values themselves are copied verbatim from the official palette JSON.

Usage: python scripts/gen_catppuccin.py
"""
import json
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FAMILY = ROOT / "themes" / "catppuccin"
SRC = FAMILY / "_source"

FLAVORS = ["latte", "frappe", "macchiato", "mocha"]
# Official canonical palette data: catppuccin/palette repo (MIT), palette.json
# contains all four flavors in one file.
PALETTE_URL = "https://raw.githubusercontent.com/catppuccin/palette/main/palette.json"

# name -> display name / scheme / note
FLAVOR_META = {
    "latte": ("Latte", "light", "浅色（官方 Latte）"),
    "frappe": ("Frappe", "dark", "中深（官方 Frappe）"),
    "macchiato": ("Macchiato", "dark", "深色（官方 Macchiato）"),
    "mocha": ("Mocha", "dark", "最深（官方 Mocha，最流行）"),
}

# L1 role -> Catppuccin named color (same mapping for every flavor).
MAPPING = [
    # (role, color, kind, note)
    ("bg", "base", "中性", ""),
    ("bg-surface", "mantle", "中性", ""),
    ("bg-surface-2", "crust", "中性", ""),
    ("bg-elevated", "surface0", "中性", ""),
    ("bg-hover", "surface1", "中性", ""),
    ("text", "text", "中性", ""),
    ("text-muted", "subtext0", "中性", ""),
    ("text-dim", "overlay0", "中性", ""),
    ("border", "surface0", "中性", ""),
    ("border-strong", "surface1", "中性", ""),
    ("border-focus", "lavender", "中性", "焦点用淡紫"),
    ("card", "mantle", "中性", ""),
    ("hairline", "crust", "中性", ""),
    ("accent", "mauve", "强调", "主强调（官方默认 primary）"),
    ("accent-hover", "pink", "强调", "hover 惯例"),
    ("accent-deep", "mauve", "强调", "无更深变体，沿用 mauve"),
    ("accent-secondary", "blue", "强调", ""),
    ("accent-foreground", "base", "强调", "accent 上文字用 base"),
    ("ok", "green", "功能", ""),
    ("ok-fill", "green", "功能", ""),
    ("warn", "yellow", "功能", ""),
    ("warn-fill", "yellow", "功能", ""),
    ("danger", "red", "功能", ""),
    ("danger-fill", "maroon", "功能", "柔化填充"),
    ("info", "blue", "功能", ""),
    ("info-fill", "sapphire", "功能", ""),
    ("queued", "lavender", "功能", ""),
    ("queued-fill", "lavender", "功能", ""),
    ("syntax-comment", "overlay1", "语法", ""),
    ("syntax-keyword", "mauve", "语法", ""),
    ("syntax-string", "green", "语法", ""),
    ("syntax-literal", "peach", "语法", ""),
    ("syntax-title", "blue", "语法", ""),
    ("syntax-attr", "teal", "语法", ""),
]

CONTRACT = {
    "version": 3,
    "description": "Canonical L1 semantic role set (shared across families). Every value theme's palette.md must define every `required` role. `derivedOptional` roles have var()-mapped defaults in foundation; a theme overrides one only where it diverges.",
    "required": [
        "bg", "bg-surface", "bg-surface-2", "bg-elevated", "bg-hover",
        "text", "text-muted", "text-dim",
        "border", "border-strong", "border-focus", "card", "hairline",
        "accent", "accent-hover", "accent-deep", "accent-secondary", "accent-foreground",
        "ok", "warn", "danger", "info", "queued",
        "syntax-comment", "syntax-keyword", "syntax-string", "syntax-literal", "syntax-title", "syntax-attr",
    ],
    "derivedOptional": [
        "elev-highlight", "elev-1", "elev-1-hover", "elev-2", "elev-3",
        "ok-fill", "warn-fill", "danger-fill", "info-fill", "queued-fill",
        "chart-2", "shadow", "shadow-color", "scrim", "grain-opacity",
        "msg-bubble", "msg-obj-border", "surface-2", "surface-3",
        "color-green", "color-red", "color-blue", "text-secondary",
        "sidebar-bg", "sidebar-control-bg", "sidebar-control-hover", "sidebar-item-hover",
        "sidebar-item-active", "sidebar-text-strong", "sidebar-text", "sidebar-text-soft", "sidebar-border",
        "atmosphere-dawn",
    ],
}


def fetch_all() -> dict:
    """Download the combined palette.json and return {flavor: {"colors": {...}}}."""
    import time
    last_err = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(PALETTE_URL, headers={"User-Agent": "ThemeVault/1.0"})
            with urllib.request.urlopen(req, timeout=120) as r:
                data = json.loads(r.read().decode("utf-8"))
            break
        except Exception as e:  # noqa: BLE001 - retry on transient network errors
            last_err = e
            time.sleep(2 * (attempt + 1))
    else:
        raise last_err
    out = {}
    for flavor in FLAVORS:
        if flavor not in data:
            raise KeyError(f"flavor {flavor!r} missing from palette.json")
        entry = data[flavor]
        colors = entry.get("colors") if isinstance(entry, dict) else entry
        out[flavor] = {"name": flavor, "colors": colors}
    return out


def hex_of(palette: dict, color: str) -> str:
    return palette["colors"][color]["hex"]


def main() -> int:
    SRC.mkdir(parents=True, exist_ok=True)
    palettes = fetch_all()
    for flavor, p in palettes.items():
        (SRC / f"{flavor}.json").write_text(
            json.dumps(p, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"fetched {flavor}: {len(p['colors'])} colors, base={hex_of(p, 'base')}")

    (SRC / "contract.json").write_text(
        json.dumps(CONTRACT, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("wrote contract.json v3")

    # family README
    fam_lines = [
        "# catppuccin 家族",
        "",
        "> 来源项目：[catppuccin/palette](https://github.com/catppuccin/palette)（MIT，@ main）",
        "> 生态主仓库：catppuccin/catppuccin；数据源：`palette.json`（官方聚合调色板，26 色 × 4 flavor）",
        "",
        "## 家族成员",
        "",
        "| 主题 ID | 显示名 | 方案 | 类型 | 说明 |",
        "|---------|--------|------|------|------|",
    ]
    for flavor in FLAVORS:
        name, scheme, note = FLAVOR_META[flavor]
        fam_lines.append(f"| `{flavor}` | {name} | {scheme} | value theme | {note} |")
    fam_lines += [
        "",
        "## L1 语义角色映射（本家族统一）",
        "",
        "> Catppuccin 是**命名调色板**（26 色），不是 UI 令牌集。下表是本仓库把",
        "> Catppuccin 命名色映射到 L1 语义角色（29 required + 5 状态 fill 派生覆盖）的决策，",
        "> 4 个 flavor 共用同一映射，仅色值随 flavor 不同。",
        "",
        "| L1 语义角色 | Catppuccin 命名色 | 说明 |",
        "|-------------|-------------------|------|",
    ]
    for role, color, kind, note in MAPPING:
        fam_lines.append(f"| `{role}` | `{color}` | {note} |")
    fam_lines += [
        "",
        "## 结构约定",
        "",
        "```",
        "themes/catppuccin/",
        "├── README.md            # 本文件",
        "├── _source/             # 官方 palette JSON（只读备查）+ contract.json",
        "└── <flavor>/            # latte / frappe / macchiato / mocha",
        "    ├── README.md",
        "    └── palette.md",
        "```",
        "",
        "## 校验",
        "",
        "- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。",
        "- 色值以官方 `palette.json` 为准；如上游改色，重跑本脚本即可刷新。",
    ]
    (FAMILY / "README.md").write_text("\n".join(fam_lines) + "\n", encoding="utf-8")
    print("wrote family README")

    # per-flavor files
    for flavor in FLAVORS:
        name, scheme, note = FLAVOR_META[flavor]
        p = palettes[flavor]
        theme_dir = FAMILY / flavor
        theme_dir.mkdir(exist_ok=True)

        # palette.md grouped by kind, preserving required order within groups
        groups = {
            "中性": [],
            "强调": [],
            "功能": [],
            "语法": [],
            "派生": [],
        }
        for role, color, kind, note_ in MAPPING:
            if role.endswith("-fill"):
                groups["派生"].append((role, color, kind, note_))
            else:
                groups[kind].append((role, color, kind, note_))

        out = [
            f"# catppuccin/{flavor} 色板表",
            "",
            "> 来源：catppuccin/palette `palette.json`（MIT），本表取 {flavor} flavor。",
            "> 颜色值为官方 palette JSON 原文，未改写。类型按 ThemeVault 规范标注。",
            "> 语义角色 → Catppuccin 命名色映射规则见家族 README「L1 语义角色映射」。",
            "",
        ]
        section_titles = {
            "中性": "中性色（背景 / 文本 / 边框）",
            "强调": "强调色",
            "功能": "功能状态色（6 通道）",
            "语法": "语法高亮色（仅代码块场景）",
            "派生": "派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）",
        }
        for kind in ["中性", "强调", "功能", "语法", "派生"]:
            rows = groups[kind]
            if not rows:
                continue
            out += [
                f"## {section_titles[kind]}",
                "",
                "| 语义角色 | 颜色值 | 类型 | 备注 |",
                "|----------|--------|------|------|",
            ]
            for role, color, kind_, note_ in rows:
                hexv = hex_of(p, color)
                note_cell = note_ if note_ else f"Catppuccin `{color}`"
                out.append(f"| `--{role}` | `{hexv}` | {kind_} | {note_cell} |")
            out.append("")
        (theme_dir / "palette.md").write_text("\n".join(out), encoding="utf-8")

        # theme README
        readme = [
            f"# catppuccin/{flavor} 主题说明",
            "",
            "## 元信息",
            "",
            "- **来源项目**：catppuccin（MIT，@ main）",
            f"- **原始主题 ID**：`{flavor}`",
            f"- **显示名**：{name}",
            "- **协议**：MIT",
            f"- **色彩方案**：{scheme}",
            "- **主题类型**：value theme（全局）",
            f"- **提取方式**：基于官方 `palette.json` 的 {flavor} 分片（26 色命名调色板），按家族 L1 映射生成",
            f"- **特殊点**：{note}；映射 mauve→accent / green→ok / red→danger / blue→info",
            "",
            "## 迁移备注",
            "",
            "- Catppuccin 是命名调色板，非 UI 令牌集；迁移时按家族 README 映射表展开即可。",
            "- 派生覆盖仅状态 fill（ok/warn/danger/info/queued-fill），阴影/sidebar 等继承 foundation 默认。",
            "- 协议 MIT；建议保留来源链接，无需强制署名。",
            "",
            "## 文件清单",
            "",
            "- `palette.md` — 逐角色全量色板表",
            "- `../_source/` — 官方 palette JSON（含本 flavor）+ contract.json",
        ]
        (theme_dir / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")
        print(f"wrote {flavor}/ (palette.md + README.md)")

    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
