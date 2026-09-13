#!/usr/bin/env python3
"""VS Code theme → ThemeVault 家族生成器（S1 数据驱动）。

为每个 VS Code 主题项目（ayu / shades-of-purple / jellyfish / vue-theme / omni / falcon）
解析 color theme 源（jsonc JSON 或 YAML anchors），按每家族 L1 映射提取色板，
落盘 themes/<family>/<id>/palette.md + README.md、家族 README.md、_source/ 快照 + contract.json。

角色值来源（每家族 map）：
  ("vs", [keys])   从 colors 取第一个存在的键
  ("token", role)  从 tokenColors 归位结果（syntax-*）
  ("ref", role)    引用其他 L1 角色值
  ("fixed", v)     固定约定值（备注「约定」）
missing（vs 全缺）→ 家族 fallback → ref 就近 → 标注空。

用法: python scripts/gen_vscode.py [--families ayu,shades,jellyfish,vue]
"""
import json
import re
import shutil
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent

# ---------------- 解析（jsonc：注释 + 尾逗号；yaml：anchors 展开） ----------------

def strip_comments(s: str) -> str:
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    out, in_str, i = [], False, 0
    while i < len(s):
        ch = s[i]
        if ch == '"':
            in_str = not in_str
            out.append(ch)
        elif ch == "/" and not in_str and i + 1 < len(s) and s[i + 1] == "/":
            while i < len(s) and s[i] != "\n":
                i += 1
            continue
        else:
            out.append(ch)
        i += 1
    return "".join(out)


class _ThemeLoader(yaml.SafeLoader):
    pass


def _alpha_ctor(loader, node):
    """VS Code theme YAML 的 `!alpha [color, pct]`：把 #RRGGBB 转成 pct% alpha 的 8 位 hex。"""
    vals = loader.construct_sequence(node, deep=True)
    if len(vals) != 2:
        return str(vals)
    color, pct = vals[0], vals[1]
    if isinstance(color, str) and re.fullmatch(r"#[0-9a-fA-F]{6}", color) and isinstance(pct, (int, float)):
        a = round(float(pct) / 100 * 255)
        return f"{color}{a:02x}"
    return str(color)


_ThemeLoader.add_constructor("!alpha", _alpha_ctor)


def load_theme_file(p: Path) -> dict:
    text = p.read_text(encoding="utf-8")
    if p.suffix.lower() == ".json":
        s = strip_comments(text)
        s = re.sub(r",\s*([}\]])", r"\1", s)  # jsonc 尾逗号
        return json.loads(s)
    return yaml.load(text, Loader=_ThemeLoader)  # YAML anchors + !alpha 派生


# ---------------- tokenColors → L1 syntax（通用 scope 归位） ----------------

SYNTAX_KEYWORDS = {
    "syntax-comment": ["comment"],
    "syntax-keyword": ["keyword", "storage"],
    "syntax-string": ["string"],
    "syntax-literal": ["constant"],
    "syntax-title": ["entity.name.function", "support.function", "entity.name.class", "entity.name.type"],
    "syntax-attr": ["attribute"],
}


def syntax_of(token_colors) -> dict:
    out = {}
    for role, kws in SYNTAX_KEYWORDS.items():
        for t in token_colors or []:
            sc = t.get("scope")
            scopes = sc if isinstance(sc, list) else ([sc] if sc else [])
            fg = (t.get("settings") or {}).get("foreground")
            if not fg:
                continue
            if any(k in s for s in scopes for k in kws):
                out[role] = fg
                break
    return out


# ---------------- L1 角色分区（palette.md 五段，与 dracula 家族契约同构） ----------------

SECTIONS = [
    ("中性色（背景 / 文本 / 边框）", ["bg", "bg-surface", "bg-surface-2", "bg-elevated", "bg-hover",
                                     "text", "text-muted", "text-dim", "border", "border-strong",
                                     "border-focus", "card", "hairline"]),
    ("强调色", ["accent", "accent-hover", "accent-deep", "accent-secondary", "accent-foreground"]),
    ("功能状态色（6 通道）", ["ok", "warn", "danger", "info", "queued"]),
    ("语法高亮色（仅代码块场景）", ["syntax-comment", "syntax-keyword", "syntax-string",
                                        "syntax-literal", "syntax-title", "syntax-attr"]),
    ("派生 / 结构色", ["selection", "selection-solid", "placeholder", "diff-insert", "diff-remove",
                        "statusbar-foreground", "activitybar-inactive",
                        "ok-fill", "warn-fill", "danger-fill", "info-fill", "queued-fill"]),
]
SECTION_OF = {r: t for t, rs in SECTIONS for r in rs}
REQUIRED = [r for t, rs in SECTIONS[:4] for r in rs]  # 29
DERIVED = SECTIONS[4][1]  # 12

KIND_OF = {"中性色（背景 / 文本 / 边框）": "中性", "强调色": "强调", "功能状态色（6 通道）": "功能",
           "语法高亮色（仅代码块场景）": "语法", "派生 / 结构色": "派生"}


# ---------------- 家族配置（每家族 map + fallback + 主题清单） ----------------

# 通用 VS Code 键映射（多键备选）；每家族可覆盖 + fallback 补缺。
COMMON_MAP = {
    "bg": ("vs", ["editor.background"]),
    "bg-surface": ("vs", ["editorGroupHeader.tabsBackground", "panel.background"]),
    "bg-surface-2": ("vs", ["activityBar.background"]),
    "bg-elevated": ("vs", ["editorWidget.background", "dropdown.background"]),
    "bg-hover": ("vs", ["list.hoverBackground"]),
    "text": ("vs", ["editor.foreground"]),
    "text-muted": ("vs", ["editorLineNumber.foreground"]),
    "text-dim": ("ref", "text-muted"),
    "border": ("vs", ["widget.border", "editorGroupHeader.border", "panel.border"]),
    "border-strong": ("ref", "border"),
    "border-focus": ("vs", ["focusBorder"]),
    "card": ("ref", "bg-elevated"),
    "hairline": ("ref", "border"),
    "accent": ("vs", ["button.background"]),
    "accent-hover": ("ref", "accent"),
    "accent-deep": ("ref", "accent"),
    "accent-secondary": ("vs", ["button.secondaryBackground", "badge.background"]),
    "accent-foreground": ("vs", ["button.foreground"]),
    "ok": ("vs", ["terminal.ansiGreen"]),
    "warn": ("vs", ["terminal.ansiYellow"]),
    "danger": ("vs", ["terminal.ansiRed", "errorForeground"]),
    "info": ("vs", ["terminal.ansiBlue", "terminal.ansiCyan"]),
    "queued": ("vs", ["terminal.ansiMagenta"]),
    "syntax-comment": ("token", "syntax-comment"),
    "syntax-keyword": ("token", "syntax-keyword"),
    "syntax-string": ("token", "syntax-string"),
    "syntax-literal": ("token", "syntax-literal"),
    "syntax-title": ("token", "syntax-title"),
    "syntax-attr": ("token", "syntax-attr"),
    # 派生段
    "selection": ("vs", ["editor.selectionBackground", "selection.background"]),
    "selection-solid": ("vs", ["selection.background", "editor.selectionBackground"]),
    "placeholder": ("vs", ["input.placeholderForeground"]),
    "diff-insert": ("vs", ["diffEditor.insertedTextBackground"]),
    "diff-remove": ("vs", ["diffEditor.removedTextBackground"]),
    "statusbar-foreground": ("vs", ["statusBar.foreground"]),
    "activitybar-inactive": ("vs", ["activityBar.inactiveForeground"]),
    "ok-fill": ("ref", "ok"),
    "warn-fill": ("ref", "warn"),
    "danger-fill": ("ref", "danger"),
    "info-fill": ("ref", "info"),
    "queued-fill": ("ref", "queued"),
}

FAMILIES = {
    "ayu": {
        "display": "Ayu",
        "repo": "https://github.com/ayu-theme/vscode-ayu",
        "license": "MIT",
        "source": "根目录 `ayu-*-unbordered.json`（VS Code color theme JSON，bordered 变体为同色边线版未单列）",
        "owner_note": "© Ayu；官方 3 方案（Light/Mirage/Dark），unbordered 为默认版",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("vs", ["widget.border"]),
        },
        "themes": [
            {"id": "dark", "display": "Ayu Dark", "scheme": "dark", "file": "ayu-dark-unbordered.json", "note": "官方暗色，琥珀金品牌（focus/按钮 #e6b450）"},
            {"id": "mirage", "display": "Ayu Mirage", "scheme": "dark", "file": "ayu-mirage-unbordered.json", "note": "官方 mirage 暗紫调，金色品牌（#ffcc66）"},
            {"id": "light", "display": "Ayu Light", "scheme": "light", "file": "ayu-light-unbordered.json", "note": "官方浅色，橙色品牌（#f29718）"},
        ],
    },
    "shades": {
        "display": "Shades of Purple",
        "repo": "https://github.com/ahmadawais/shades-of-purple-vscode",
        "license": "MIT",
        "source": "`themes/shades-of-purple-color-theme*.json`（VS Code color theme JSON，italic 为字体变体未单列）",
        "owner_note": "© Ahmad Awais；紫色系高饱和，黄色品牌（#FAD000）",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("vs", ["dropdown.border"]),
            "ok": ("vs", ["terminal.ansiGreen"]),
        },
        "themes": [
            {"id": "dark", "display": "Shades of Purple", "scheme": "dark", "file": "shades-of-purple.json", "note": "默认紫调，黄品牌（#FAD000）"},
            {"id": "super-dark", "display": "Shades of Purple (Super Dark)", "scheme": "dark", "file": "shades-super-dark.json", "note": "更暗背景变体（#191830）"},
        ],
    },
    "jellyfish": {
        "display": "JellyFish",
        "repo": "https://github.com/pawelborkar/vscode-jellyfish",
        "license": "Apache-2.0",
        "source": "`themes/JellyFish Theme-color-theme.json`（VS Code color theme JSON）",
        "owner_note": "© Pawel Borkar；海洋紫蓝调，粉红品牌（#ff0055）",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("vs", ["editorGroupHeader.tabsBackground"]),
            "accent-secondary": ("ref", "accent"),
            "accent-foreground": ("ref", "text"),
            "ok": ("fixed", "#00f7ff"),
            "warn": ("vs", ["badge.background"]),
            "danger": ("ref", "accent"),
            "info": ("fixed", "#00f7ff"),
            "queued": ("fixed", "#FF92A5"),
        },
        "themes": [
            {"id": "dark", "display": "JellyFish", "scheme": "dark", "file": "JellyFish.json", "note": "海洋深蓝紫调，粉红品牌（#ff0055）"},
        ],
    },
    "vue": {
        "display": "Vue Theme",
        "repo": "https://github.com/mariorodeghiero/vue-theme-vscode",
        "license": "MIT",
        "source": "`themes/vue-theme-color-theme*.json`（VS Code color theme JSON）",
        "owner_note": "© Mário Rodeghiero；Solarized 深青底 + Vue 品牌绿（#19f9d8）",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("vs", ["editorGroupHeader.tabsBackground"]),
            "text-muted": ("fixed", "#586e75"),
            "accent-secondary": ("ref", "accent"),
            "ok": ("fixed", "#19f9d8"),
            "warn": ("fixed", "#e6a23c"),
            "danger": ("fixed", "#dc322f"),
            "info": ("fixed", "#268bd2"),
            "queued": ("fixed", "#b58900"),
        },
        "themes": [
            {"id": "dark", "display": "Vue Theme", "scheme": "dark", "file": "vue-theme.json", "note": "Solarized 深青底（#002b36）+ Vue 绿品牌"},
            {"id": "high-contrast", "display": "Vue Theme High Contrast", "scheme": "dark", "file": "vue-hc.json", "note": "高对比变体（#002933）"},
        ],
    },
    "omni": {
        "display": "Omni",
        "repo": "https://github.com/getomni/visual-studio-code",
        "license": "MIT",
        "source": "`src/omni.yml`（VS Code theme YAML 锚点体系 + !alpha 派生）",
        "owner_note": "© Rocketseat；深紫底（#191622）+ 粉红品牌（#FF79C6）",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("ref", "bg-elevated"),
            "accent-secondary": ("ref", "accent"),
            "accent-foreground": ("ref", "text"),
            "danger": ("vs", ["terminal.ansiRed"]),
        },
        "themes": [
            {"id": "dark", "display": "Omni", "scheme": "dark", "file": "omni.yml", "note": "Rocketseat 深紫调（#191622），粉红品牌（#FF79C6）"},
        ],
    },
    "falcon": {
        "display": "Falcon",
        "repo": "https://github.com/panxiaoan/falcon-vscode-themes",
        "license": "MIT",
        "source": "`src/{dark,light}/*.yml`（VS Code theme YAML 锚点体系 + !alpha 派生）",
        "owner_note": "© Xiaoan Pan；温和护眼系列（12 套，4 dark + 8 light）",
        "map": {**COMMON_MAP},
        "fallback": {
            "bg-hover": ("ref", "selection"),
            "border": ("vs", ["editorGroupHeader.border", "widget.border"]),
            "accent-secondary": ("ref", "accent"),
            "accent-foreground": ("ref", "text"),
            "queued": ("vs", ["terminal.ansiMagenta"]),
            "ok": ("vs", ["terminal.ansiBrightPURPLE"]),  # falcon ansi 键名错位：绿存于 ansiBrightPURPLE
        },
        "themes": [
            {"id": "dark", "display": "Falcon Dark", "scheme": "dark", "file": "dark/dark.yml", "note": "护眼暗色，青蓝强调（#65BCD9）"},
            {"id": "dark-blue", "display": "Falcon Dark Blue", "scheme": "dark", "file": "dark/blue.yml", "note": "暗色蓝调"},
            {"id": "dark-green", "display": "Falcon Dark Green", "scheme": "dark", "file": "dark/green.yml", "note": "暗色绿调"},
            {"id": "dark-green-islands", "display": "Falcon Dark Green(Islands)", "scheme": "dark", "file": "dark/green-islands.yml", "note": "暗色绿岛"},
            {"id": "light-celadon", "display": "Falcon Light Celadon", "scheme": "light", "file": "light/celadon.yml", "note": "浅色青瓷"},
            {"id": "light-green", "display": "Falcon Light Green", "scheme": "light", "file": "light/green.yml", "note": "浅色绿调"},
            {"id": "light-green-islands", "display": "Falcon Light Green(Islands)", "scheme": "light", "file": "light/green-islands.yml", "note": "浅色绿岛"},
            {"id": "light-bean-green", "display": "Falcon Light Bean Green", "scheme": "light", "file": "light/bean-green.yml", "note": "浅色豆绿"},
            {"id": "light-pink", "display": "Falcon Light Pink", "scheme": "light", "file": "light/pink.yml", "note": "浅色粉调"},
            {"id": "light-buff", "display": "Falcon Light Buff", "scheme": "light", "file": "light/buff.yml", "note": "浅色浅黄褐"},
            {"id": "light-yellow", "display": "Falcon Light Yellow", "scheme": "light", "file": "light/yellow.yml", "note": "浅色黄调"},
            {"id": "light-grey", "display": "Falcon Light Grey", "scheme": "light", "file": "light/grey.yml", "note": "浅色灰调"},
        ],
    },
}


def resolve(role, cfg, colors, syntax, stack=None):
    """返回 (value, note)；note 为来源说明（VS 键 / 约定 / ref）。"""
    stack = stack or []
    if role in stack:
        return None, None
    stack = stack + [role]
    kind, val = cfg["map"].get(role, ("fixed", None))
    if kind == "vs":
        for k in val:
            if colors.get(k):
                return colors[k], k
        # vs 全缺 → fallback
        if role in cfg.get("fallback", {}):
            fb = cfg["fallback"][role]
            return resolve_fb(fb, cfg, colors, syntax, stack)
        return None, None
    if kind == "token":
        v = syntax.get(role)
        return (v, "tokenColors") if v else (None, None)
    if kind == "ref":
        v, _ = resolve(val, cfg, colors, syntax, stack)
        return (v, f"ref {val}") if v else (None, None)
    if kind == "fixed":
        return val, "约定"
    return None, None


def resolve_fb(fb, cfg, colors, syntax, stack):
    kind, val = fb
    if kind == "vs":
        for k in val:
            if colors.get(k):
                return colors[k], k
        return None, None
    if kind == "fixed":
        return val, "约定"
    if kind == "ref":
        return resolve(val, cfg, colors, syntax, stack)
    return None, None


def build_theme(cfg, t, src_path):
    data = load_theme_file(src_path)
    colors = data.get("colors", {}) or {}
    syntax = syntax_of(data.get("tokenColors", []) or [])
    toks = {}
    notes = {}
    for role in REQUIRED + DERIVED:
        v, n = resolve(role, cfg, colors, syntax)
        if v:
            toks[role] = v
            notes[role] = n
    return toks, notes


def write_palette(tdir, fam_id, t, toks, notes, cfg):
    pal = [
        f"# {fam_id}/{t['id']} 色板表",
        "",
        f"> 来源：{cfg['display']}（{cfg['license']}）`{t['file']}`（{t['scheme']}）。",
        "> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。",
        "",
    ]
    count = 0
    for title, roles in SECTIONS:
        pal.append(f"## {title}")
        pal.append("")
        pal.append("| 语义角色 | 颜色值 | 类型 | 备注 |")
        pal.append("|----------|--------|------|------|")
        for role in roles:
            if role not in toks:
                continue
            note = notes.get(role, "")
            if note and note != "tokenColors" and not note.startswith("ref"):
                note = f"来源 {note}"
            elif note == "tokenColors":
                note = f"来源 {role}"
            elif note.startswith("ref"):
                note = f"继承 {note[4:]}"
            pal.append(f"| `--{role}` | `{toks[role]}` | {KIND_OF[title]} | {note} |")
            count += 1
        pal.append("")
    (tdir / "palette.md").write_text("\n".join(pal), encoding="utf-8")
    return count


def write_theme_readme(tdir, fam_id, t, cfg, direct_count):
    readme = [
        f"# {fam_id}/{t['id']} 主题说明",
        "",
        "## 元信息",
        "",
        f"- **来源项目**：{cfg['display']}（{cfg['license']}，{cfg['repo']}）",
        f"- **原始主题 ID**：`{t['id']}`",
        f"- **显示名**：{t['display']}",
        f"- **协议**：{cfg['license']}",
        f"- **色彩方案**：{t['scheme']}",
        "- **主题类型**：value theme（VS Code color theme）",
        f"- **提取方式**：解析 `{t['file']}`（VS Code 语义键 → L1 映射，见家族 README）",
        f"- **显式颜色令牌数**：{direct_count}（L1 角色数；源码含更多 VS Code 语义键未全列）",
        "",
        "## 迁移备注",
        "",
        f"- {t['note']}。",
        "- 角色值全部为源码原文；映射决策（含缺失角色的约定值）见家族 README「L1 语义角色映射」。",
        f"- {cfg.get('owner_note', '')}",
        "",
        "## 文件清单",
        "",
        "- `palette.md` — 逐角色全量色板表",
        f"- `../_source/{t['file']}` — 源码快照（只读备查）",
    ]
    (tdir / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")


def write_contract(fam_dir, cfg):
    contract = {
        "family": fam_dir.name,
        "version": 1,
        "source": {
            "project": cfg["display"],
            "repo": cfg["repo"],
            "license": cfg["license"],
            "ref": "default branch (2026-08)",
            "primarySource": cfg["source"],
        },
        "required": REQUIRED,
        "derivedOptional": DERIVED,
    }
    (fam_dir / "_source" / "contract.json").write_text(
        json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def write_family_readme(fam_dir, fam_id, cfg):
    lines = [
        f"# {fam_id} 家族",
        "",
        f"> 来源项目：[{cfg['display']}]({cfg['repo']})（{cfg['license']}）",
        f"> {cfg.get('owner_note', '')}",
        f"> 数据源：{cfg['source']}",
        "",
        "## 家族成员",
        "",
        "| 主题 ID | 显示名 | 方案 | 类型 | 说明 |",
        "|---------|--------|------|------|------|",
    ]
    for t in cfg["themes"]:
        lines.append(f"| `{t['id']}` | {t['display']} | {t['scheme']} | value theme | {t['note']} |")
    lines += [
        "",
        "## L1 语义角色映射（本家族统一）",
        "",
        "> VS Code color theme 语义键 → L1 角色。值全部为源码原文；缺失角色（bg-hover/text-dim/border 等）",
        "> 按约定值补全并在 palette.md 备注「约定 / 继承」。",
        "",
        "| L1 语义角色 | 取值来源 |",
        "|-------------|----------|",
    ]
    for role in REQUIRED + DERIVED:
        kind, val = cfg["map"].get(role, ("?", None))
        if kind == "vs":
            lines.append(f"| `{role}` | `{val[0]}`{('（备选 ' + val[1] + '）') if len(val) > 1 else ''} |")
        elif kind == "token":
            lines.append(f"| `{role}` | tokenColors 按 scope（`{SYNTAX_KEYWORDS[role][0]}` 等） |")
        elif kind == "ref":
            lines.append(f"| `{role}` | 继承 `{val}` |")
        elif kind == "fixed":
            lines.append(f"| `{role}` | 约定值 `{val}` |")
    if cfg.get("fallback"):
        lines += ["", "**缺失角色约定（fallback）**："]
        for role, fb in cfg["fallback"].items():
            kind, val = fb
            desc = f"取 `{val[0]}`" if kind == "vs" else (f"约定 `{val}`" if kind == "fixed" else f"继承 `{val}`")
            lines.append(f"- `{role}`：{desc}")
    lines += [
        "",
        "## 结构约定",
        "",
        "```",
        f"themes/{fam_id}/",
        "├── README.md            # 本文件",
        "├── _source/             # 源码快照（只读备查）+ contract.json",
        "│   ├── contract.json    # L1 语义角色契约（required 29 / derivedOptional 12）",
        "│   └── *.json / *.yml   # VS Code color theme 原始源",
        f"└── <theme-id>/          # 每套主题一个目录（palette.md + README.md）",
        "```",
        "",
        "## 校验",
        "",
        "- `python scripts/gen_vscode.py` 生成色板表与契约；`python scripts/gen_index.py --write` 全量校验。",
    ]
    (fam_dir / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    if "-h" in sys.argv or "--help" in sys.argv:
        print(__doc__)
        return 0
    fams = sys.argv[sys.argv.index("--families") + 1].split(",") if "--families" in sys.argv else list(FAMILIES)
    src_root = ROOT / ".tmp_src"
    for fam_id in fams:
        cfg = FAMILIES[fam_id]
        fam_dir = ROOT / "themes" / fam_id
        (fam_dir / "_source").mkdir(parents=True, exist_ok=True)
        for t in cfg["themes"]:
            src_path = src_root / fam_id / t["file"]
            if not src_path.exists():
                src_path = fam_dir / "_source" / t["file"]  # 重跑幂等：从已快照的 _source 读
            if not src_path.exists():
                print(f"[{fam_id}/{t['id']}] 缺源文件 {t['file']}，跳过")
                continue
            tdir = fam_dir / t["id"]
            tdir.mkdir(exist_ok=True)
            toks, notes = build_theme(cfg, t, src_path)
            n = write_palette(tdir, fam_id, t, toks, notes, cfg)
            write_theme_readme(tdir, fam_id, t, cfg, n)
            dst = fam_dir / "_source" / t["file"]
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_path, dst)
            print(f"wrote {fam_id}/{t['id']} tokens={n}")
        write_contract(fam_dir, cfg)
        write_family_readme(fam_dir, fam_id, cfg)
        print(f"wrote {fam_id}/ contract + family README")
    print("done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
