#!/usr/bin/env python3
"""Import ErgeMD themes into ThemeVault as the `ergemd` family.

Source: D:\\Workspace\\Code\\RustProject\\ErgeMD\\src\\styles\\themes
(can be overridden with --src). The ErgeMD theme system is:

  core/theme-core.css        global fallback (html:not([data-theme]))
  core/theme-dark-base.css   shared dark base values (12 themes inherit)
  core/theme-light-base.css  shared light base values
  core/theme-derived.css     derived/structural variables
  <id>.css                   per-theme [data-theme="<id>"] input variables

This generator:
  - parses every theme file's [data-theme] block (values verbatim)
  - computes required = intersection across all themes (identity roles)
    and derivedOptional = union - required  -> contract.json (data-driven)
  - writes themes/ergemd/<id>/palette.md + README.md and the family README
  - snapshots all css sources into themes/ergemd/_source/

Usage: python scripts/gen_ergemd.py [--src <themes-dir>]
"""
import argparse
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_SRC = pathlib.Path(r"D:\Workspace\Code\RustProject\ErgeMD\src\styles\themes")

THEME_IDS = [
    "aurora", "cherry-blossom", "cyberpunk", "dark", "desert-sunset", "falcon",
    "forest", "light", "monochrome", "neon-cyberpunk", "ocean", "solar-flare",
    "solarized-light", "tokyo-night",
]
DISPLAY = {
    "aurora": "Aurora", "cherry-blossom": "Cherry Blossom", "cyberpunk": "Cyberpunk",
    "dark": "Dark", "desert-sunset": "Desert Sunset", "falcon": "Falcon",
    "forest": "Forest", "light": "Light", "monochrome": "Monochrome",
    "neon-cyberpunk": "Neon Cyberpunk", "ocean": "Ocean", "solar-flare": "Solar Flare",
    "solarized-light": "Solarized Light", "tokyo-night": "Tokyo Night",
}
DARK_BASE_THEMES = {
    "aurora", "cherry-blossom", "cyberpunk", "dark", "desert-sunset", "falcon",
    "forest", "monochrome", "neon-cyberpunk", "ocean", "solar-flare", "tokyo-night",
}

# (section_title, [roles]) — same section names as the other families' palette.md
# so the shared preview/index generator works unchanged.
SECTIONS = [
    ("中性色（背景 / 文本 / 边框）", [
        "bg-page", "bg-reader", "bg-sidebar", "bg-code", "bg-secondary", "bg-tertiary",
        "text-primary", "text-secondary", "text-muted", "text-heading",
        "scrollbar-track", "scrollbar-thumb", "scrollbar-thumb-hover",
        "reader-bg-elevated", "status-bar-bg",
    ]),
    ("强调色", [
        "accent-cyan", "accent-pink", "accent-purple", "accent-green", "accent-yellow",
        "accent-orange", "accent-red", "accent-blue",
        "brand-primary", "brand-secondary", "brand-gradient", "brand-logo",
    ]),
    ("功能状态色（6 通道）", [
        "obsidian-callout-note", "obsidian-callout-abstract", "obsidian-callout-info",
        "obsidian-callout-todo", "obsidian-callout-tip", "obsidian-callout-success",
        "obsidian-callout-question", "obsidian-callout-warning", "obsidian-callout-failure",
        "obsidian-callout-danger", "obsidian-callout-bug", "obsidian-callout-example",
        "obsidian-callout-quote",
    ]),
    ("语法高亮色（仅代码块场景）", [
        "code-keyword", "code-string", "code-number", "code-comment", "code-function",
        "code-text", "code-label", "copy-success",
    ]),
    ("派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）", [
        "chart-text", "chart-text-muted", "chart-edge", "chart-label-bg",
        "chart-surface-1", "chart-surface-2", "chart-surface-3",
        "chart-fill-0", "chart-fill-1", "chart-fill-2", "chart-fill-3", "chart-fill-4",
        "chart-fill-5", "chart-fill-6", "chart-fill-7",
        "chart-stroke-0", "chart-stroke-1", "chart-stroke-2", "chart-stroke-3",
        "chart-stroke-4", "chart-stroke-5", "chart-stroke-6", "chart-stroke-7",
        "chart-series-0", "chart-series-1", "chart-series-2", "chart-series-3",
        "chart-series-4", "chart-series-5", "chart-series-6", "chart-series-7",
        "titlebar-gradient", "logo-bg", "logo-border",
        "accent-cyan-rgb", "accent-pink-rgb", "accent-purple-rgb", "accent-green-rgb",
        "accent-yellow-rgb", "accent-orange-rgb", "accent-red-rgb", "accent-blue-rgb",
        "brand-primary-rgb", "brand-secondary-rgb",
    ]),
]
SECTION_OF = {role: title for title, roles in SECTIONS for role in roles}

CSS_RE = re.compile(
    r"\[data-theme\s*=\s*\"([a-z-]+)\"\]\s*\{([^}]*)\}", re.S
)
VAR_RE = re.compile(r"^\s*--([a-z0-9-]+)\s*:\s*(.+?)\s*;?\s*$", re.M)
NOTE_RE = re.compile(
    r"(?:视觉特色|主题特色|主题类型|设计原则)[：:]\s*(.+?)(?:\n\s*\n|\Z)", re.S
)


def parse_css_blocks(text: str) -> dict:
    """Return {theme_id: {role: value}} from all [data-theme="x"] blocks."""
    out = {}
    for m in CSS_RE.finditer(text):
        tid = m.group(1)
        if tid not in out:
            out[tid] = {}
        for vm in VAR_RE.finditer(m.group(2)):
            out[tid][vm.group(1)] = vm.group(2).strip()
    return out


def extract_feature(text: str) -> str:
    m = NOTE_RE.search(text)
    if m:
        return " ".join(m.group(1).split())[:120]
    return ""


def rgb_to_note() -> str:
    return "RGB 输入变量（供 rgba 派生）"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=str(DEFAULT_SRC))
    args = ap.parse_args()
    src = pathlib.Path(args.src)

    # 1. parse base layers
    dark_base = {}
    light_base = {}
    core_text = (src / "core" / "theme-dark-base.css").read_text(encoding="utf-8")
    for tid, toks in parse_css_blocks(core_text).items():
        dark_base.update(toks)
    light_text = (src / "core" / "theme-light-base.css").read_text(encoding="utf-8")
    for tid, toks in parse_css_blocks(light_text).items():
        light_base.update(toks)

    # 2. parse theme files
    themes = {}
    for tid in THEME_IDS:
        p = src / f"{tid}.css"
        # 只读一次：parse_css_blocks 与 extract_feature 共享同一份文本
        text = p.read_text(encoding="utf-8")
        themes[tid] = parse_css_blocks(text).get(tid, {})
        themes[tid]["_feature"] = extract_feature(text)

    # 3. contract: required = intersection (restricted to canonical SECTIONS roles),
    #    derivedOptional = union - required. Restricting to SECTIONS keeps the
    #    contract aligned with what palette.md actually renders (roles outside
    #    SECTIONS, e.g. toast-*, are real source variables but not L1 roles).
    section_roles = set(SECTION_OF)
    all_toks = [set(t) for t in themes.values()]
    required = set.intersection(*all_toks) & section_roles
    union = set.union(*all_toks) & section_roles
    derived_optional = union - required
    contract = {
        "version": 1,
        "description": (
            "ErgeMD L1 semantic role set (data-driven). required = roles every theme "
            "defines directly (identity roles, restricted to canonical sections); "
            "derivedOptional = canonical roles some themes override or that inherit "
            "from core/theme-*-base.css. Source-only extras (toast-*, admonition-*) "
            "are not L1 roles."
        ),
        "required": sorted(required),
        "derivedOptional": sorted(derived_optional),
    }

    # 4. write family
    fam_dir = ROOT / "themes" / "ergemd"
    src_dir = fam_dir / "_source"
    src_dir.mkdir(parents=True, exist_ok=True)
    (src_dir / "contract.json").write_text(
        json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"contract.json: required={len(required)} derivedOptional={len(derived_optional)}")

    fam_lines = [
        "# ergemd 家族",
            "",
            "> 来源项目：[ErgeMD](https://github.com/ErgeAIA/ErgeMD)（AGPL-3.0，Rust 桌面 Markdown 阅读器）。",
            "> 源路径：`src/styles/themes/*.css`（`[data-theme]` 变量块）+ `core/`（base 层）。",
            "",
            "## 家族成员",
            "",
            "| 主题 ID | 显示名 | 方案 | 类型 | 背景 | 说明 |",
            "|---------|--------|------|------|------|------|",
        ]
    for tid in THEME_IDS:
        scheme = "dark" if tid in DARK_BASE_THEMES else "light"
        bg_kind = "完整定义" if any(
            r in themes[tid] for r in ("bg-page", "bg-reader")
        ) else f"继承 {scheme}-base"
        fam_lines.append(
            f"| `{tid}` | {DISPLAY[tid]} | {scheme} | value theme | {bg_kind} | {themes[tid]['_feature']} |"
        )
    fam_lines += [
        "",
        "## 分层结构（ErgeMD 原生体系）",
        "",
        "- `core/theme-core.css`：全局 fallback（`html:not([data-theme])`）。",
        "- `core/theme-dark-base.css` / `theme-light-base.css`：base 层，提供背景/文字/滚动条/图表默认值；",
        "  未在主题文件直接定义的派生角色继承此层。",
        "- `core/theme-derived.css`：派生/结构变量（alpha 合成、admonition、toast 等）。",
        "- `<id>.css`：主题输入变量（标题层级、accent、brand、代码高亮、chart palette、callout）。",
        "",
        "## L1 语义角色映射建议（迁移到其它项目时）",
        "",
        "| ErgeMD 角色 | ThemeVault L1 建议 |",
        "|-------------|---------------------|",
        "| `bg-page` / `bg-reader` / `bg-sidebar` | `bg` / `bg-surface` / `sidebar-bg` |",
        "| `text-primary` / `text-secondary` / `text-muted` | `text` / `text-muted` / `text-dim` |",
        "| `accent-blue`（或主题主 accent） | `accent` |",
        "| `accent-green` / `accent-yellow` / `accent-red` / `accent-cyan` | `ok` / `warn` / `danger` / `info` |",
        "| `accent-purple` | `queued` |",
        "| `code-keyword` / `code-string` / `code-number` / `code-comment` / `code-function` | `syntax-keyword` / `syntax-string` / `syntax-literal` / `syntax-comment` / `syntax-title` |",
        "| `obsidian-callout-*` | 功能状态色通道（note/info/success/warning/danger） |",
        "",
        "## 结构约定",
        "",
        "```",
        "themes/ergemd/",
        "├── README.md            # 本文件",
        "├── _source/             # ErgeMD 源码快照（只读备查，含 core/）+ contract.json",
        "│   ├── contract.json    # L1 语义角色契约（数据驱动生成，唯一事实源）",
        "│   ├── <id>.css         # 主题源码快照",
        "│   └── core/            # base/derived 层源码快照",
        "└── <theme-id>/          # 每套主题一个目录",
        "    ├── README.md",
        "    └── palette.md",
        "```",
        "",
        "## 校验",
        "",
        "- `scripts/gen_ergemd.py` 生成契约与色板表；`scripts/gen_index.py --write` 全量校验。",
    ]
    (fam_dir / "README.md").write_text("\n".join(fam_lines) + "\n", encoding="utf-8")
    print("wrote family README")

    # 5. snapshot sources (keep contract.json out of the snapshot dir listing)
    if src_dir.exists():
        for p in src_dir.glob("*"):
            if p.name == "contract.json":
                continue
            if p.is_dir():
                shutil.rmtree(p)
            else:
                p.unlink()
    src_dir.mkdir(parents=True, exist_ok=True)
    for p in src.glob("*.css"):
        shutil.copy2(p, src_dir / p.name)
    core_dst = src_dir / "core"
    shutil.copytree(src / "core", core_dst)
    print(f"snapshotted sources -> _source/ ({len(list(src.glob('*.css')))} css + core/)")

    # 6. write per-theme palette.md + README.md
    for tid in THEME_IDS:
        toks = themes[tid]
        scheme = "dark" if tid in DARK_BASE_THEMES else "light"
        base = dark_base if scheme == "dark" else light_base
        tdir = fam_dir / tid
        tdir.mkdir(exist_ok=True)

        pal = [
            f"# ergemd/{tid} 色板表",
            "",
            f"> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/{tid}.css`（{scheme}）。",
            "> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。",
            "> 未在主题文件直接定义、但由 base 层提供的角色，标注「继承 base」并给出 base 值。",
            "",
        ]
        count = 0
        for title, roles in SECTIONS:
            pal.append(f"## {title}")
            pal.append("")
            pal.append("| 语义角色 | 颜色值 | 类型 | 备注 |")
            pal.append("|----------|--------|------|------|")
            for role in roles:
                if role in toks:
                    value = toks[role]
                    kind = "中性" if "中性" in title else (
                        "强调" if "强调" in title else (
                            "功能" if "功能" in title else (
                                "语法" if "语法" in title else "派生"
                            )
                        )
                    )
                    note = rgb_to_note() if role.endswith("-rgb") else ""
                    pal.append(f"| `--{role}` | `{value}` | {kind} | {note} |")
                    count += 1
                elif role in base:
                    kind = "中性" if "中性" in title else (
                        "强调" if "强调" in title else (
                            "功能" if "功能" in title else (
                                "语法" if "语法" in title else "派生"
                            )
                        )
                    )
                    pal.append(
                        f"| `--{role}` | `{base[role]}` | {kind} | 继承 {scheme}-base |"
                    )
                    count += 1
            pal.append("")
        (tdir / "palette.md").write_text("\n".join(pal), encoding="utf-8")

        direct_count = len([r for r in toks if r != "_feature"])
        readme = [
            f"# ergemd/{tid} 主题说明",
            "",
            "## 元信息",
            "",
            f"- **来源项目**：ErgeMD（AGPL-3.0，Rust 桌面 Markdown 阅读器）",
            f"- **原始主题 ID**：`{tid}`",
            f"- **显示名**：{DISPLAY[tid]}",
            "- **协议**：AGPL-3.0",
            f"- **色彩方案**：{scheme}",
            "- **主题类型**：value theme（全局，data-theme 作用域）",
            f"- **提取方式**：基于真实源码 `src/styles/themes/{tid}.css` 的 `[data-theme]` 变量块",
            f"- **显式颜色令牌数**：{direct_count}（主题文件直接定义；另有 base 继承角色见 palette.md）",
            "",
            "## 迁移备注",
            "",
            "- 目标项目命名对齐见家族 README「L1 语义角色映射建议」。",
            f"- 背景/文字基础：{'主题完整定义' if any(r in toks for r in ('bg-page','bg-reader')) else f'继承 core/theme-{scheme}-base.css'}"
            + "；派生/结构变量继承 core/theme-derived.css。",
            f"- 特殊点：{themes[tid]['_feature'] or '（无特别说明）'}",
            "",
            "## 文件清单",
            "",
            "- `palette.md` — 逐角色全量色板表",
            "- `../_source/` — ErgeMD 源码快照（含 core/，只读备查）",
        ]
        (tdir / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")
        print(f"wrote {tid}/ (palette.md + README.md)")

    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
