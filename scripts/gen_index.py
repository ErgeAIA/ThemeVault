#!/usr/bin/env python3
"""ThemeVault INDEX.json generator + contract/palette validator.

Single source of truth: themes/<family>/_source/contract.json
Derived:               INDEX.json (this script), numbers in INDEX.md

Reads every themes/<family>/<id>/palette.md, checks coverage against the
family contract, and emits a machine-readable INDEX.json at repo root.
Exit code 1 if any value theme violates the contract (missing required role
or out-of-contract role), so it can run as a CI gate.

Usage: python scripts/gen_index.py [--write]   (--write persists INDEX.json)
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
THEMES = ROOT / "themes"
INDEX_JSON = ROOT / "INDEX.json"

ROLE_RE = re.compile(r"^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$")
META_RE = re.compile(r"^\s*(?:-\s+)?\*\*(.+?)\*\*[：:]\s*(.+?)\s*$")
FAMILY_SRC_RE = re.compile(r"来源项目[：:]\s*\[?([^\]]*?)\]?\(([^)]*)\)?")
LICENSE_RE = re.compile(r"（([^（）]*?(?:Apache-2\.0|MIT|AGPL-3\.0)[^（）]*?)）")


def parse_palette(path: Path) -> dict:
    """Return {role: {"value": str, "kind": str, "note": str}} from palette.md."""
    tokens: dict[str, dict] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        m = ROLE_RE.match(line)
        if not m:
            continue
        role, value, kind, note = m.group(1)[2:], m.group(2).strip(), m.group(3).strip(), m.group(4).strip()
        tokens[role] = {"value": value, "kind": kind, "note": note}
    return tokens


def parse_theme_readme(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    meta: dict[str, str] = {}
    in_meta = False
    for line in text.splitlines():
        if line.startswith("## 元信息"):
            in_meta = True
            continue
        if in_meta and line.startswith("## "):
            break
        if in_meta:
            m = META_RE.match(line)
            if m:
                key = m.group(1).strip().rstrip("：:")
                meta[key] = m.group(2).strip()
    # 特殊点 lives in 迁移备注 for opensquilla themes; search the whole file
    sp = re.search(r"特殊点[：:]\s*(.+?)\s*$", text, re.M)
    if sp and "特殊点" not in meta:
        meta["特殊点"] = sp.group(1).strip()
    return meta


def parse_family_readme(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    info: dict[str, str] = {}
    m = FAMILY_SRC_RE.search(text)
    if m:
        info["sourceProject"] = m.group(1).strip()
        info["sourceRepo"] = m.group(2).strip()
    lic = LICENSE_RE.search(text)
    if lic:
        # 家族 README 的协议写法形如「（Apache-2.0，@ main）」：只取「，」前第一段，
        # 丢掉 "@ main" / 版权署名等尾巴，得到干净的协议名。
        info["license"] = lic.group(1).split("，")[0].strip()
    return info


def scheme_of(meta: dict) -> str | None:
    for key in ("色彩方案", "scheme"):
        if key in meta:
            raw = meta[key].strip()
            # normalize: take first token (drop parentheticals / notes)
            return re.split(r"[（(\s]", raw)[0].lower()
    return None


def license_of(meta: dict) -> str | None:
    for key in ("协议", "license"):
        if key in meta:
            raw = meta[key].strip()
            # strip parenthetical notes, e.g. "Apache-2.0（arctic 为 Nord…）"
            return re.split(r"[（(]", raw)[0].strip()
    return None


def type_of(meta: dict, has_palette: bool) -> str:
    for key in ("主题类型", "type"):
        if key in meta:
            v = meta[key]
            if "expressive skin" in v or "skin" in v.lower():
                return "expressive-skin"
    return "value-theme" if has_palette else "expressive-skin"


STRUCTURAL_RE = re.compile(r"^(mono|display-mono|sans)\s*(?:（([^）]+)）)?(?:\s*·\s*(.*))?$")


def structural_of(meta: dict) -> tuple[str | None, list[str], str | None]:
    """Parse the 「结构令牌」 meta line into (fontStyle, fonts, structuralNote).

    Format: mono（IBM Plex Mono）· 硬角（radius-none）
    - first token: mono | display-mono | sans
    - parenthesized list right after: identity fonts
    - rest after ·: free-form structural note (radius/focus-ring/world layers)
    Missing line => (None, [], None): family default, treated as sans.
    Unparseable line => (None, [], raw): keep the note, no invented fonts.
    """
    raw = None
    for key in ("结构令牌", "structural"):
        if key in meta:
            raw = meta[key]
            break
    if not raw:
        return None, [], None
    m = STRUCTURAL_RE.match(raw.strip())
    if not m:
        return None, [], raw
    style, fonts_raw, note = m.group(1), m.group(2), m.group(3)
    fonts = [f.strip() for f in re.split(r"[、/，,]", fonts_raw)] if fonts_raw else []
    return style, [f for f in fonts if f], (note.strip() if note else None)


def luminance(hexv: str) -> float | None:
    h = hexv.lstrip("#")
    if len(h) != 6:
        return None
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    def lin(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def contrast(a: str, b: str) -> float | None:
    la, lb = luminance(a), luminance(b)
    if la is None or lb is None:
        return None
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def brand_of(tokens: dict) -> dict | None:
    """品牌主色：ergemd 家族用 brand-primary（官方品牌色），其余家族用 accent。

    返回 {"color", "buttonText", "contrast"}；无纯色品牌色返回 None。
    buttonText: 与 preview.html 的 fgFor() 同口径 —— luminance > 0.55 用深字（dark，#101014），
    否则用浅字（light，#f5f5f7）。保证品牌色块文字色 = 预览卡片色块实际显示；
    适配时按「color + 对应文字色」取用即与预览一致（不采用 WCAG 对比度推荐，避免预览与建议矛盾）。
    contrast: 仍给 WCAG 参考值（white/black 对比度），供人工决策。
    """
    color = (tokens.get("brand-primary") or tokens.get("accent") or {})
    color = color["value"] if isinstance(color, dict) else color  # tokens[role] = {"value","kind","note"}
    if not color or not color.startswith("#"):
        return None
    lum = luminance(color)
    cw = contrast(color, "#FFFFFF")
    cb = contrast(color, "#000000")
    if lum is None or cw is None or cb is None:
        return None
    return {
        "color": color,
        "buttonText": "dark" if lum > 0.55 else "light",
        "contrast": {"white": round(cw, 2), "black": round(cb, 2)},
    }


# 文本-背景对比度摘要（取色防呆：AI 适配先查 textContrast，避免浅背景配浅文字）。
# L1 家族用 bg + text/text-muted/text-dim；ergemd 用 bg-page + text-primary/text-secondary/text-muted。
TEXT_CONTRAST_ROLES = {
    "ergemd": ("bg-page", {"text-primary": "textOnBg", "text-secondary": "textMutedOnBg", "text-muted": "textDimOnBg"}),
}


def text_contrast_of(tokens: dict, family: str) -> dict | None:
    """text 系列对 bg 的对比度摘要；无纯色 bg 返回 None，不可解析的值（rgba/gradient）该键为 None。

    仅对 #hex 纯色计算，非纯色不强行转换。
    """
    if family in TEXT_CONTRAST_ROLES:
        bg_role, text_map = TEXT_CONTRAST_ROLES[family]
    else:
        bg_role, text_map = "bg", {"text": "textOnBg", "text-muted": "textMutedOnBg", "text-dim": "textDimOnBg"}
    bg_tok = tokens.get(bg_role)
    bg_val = bg_tok["value"] if isinstance(bg_tok, dict) else bg_tok
    if not bg_val:
        return None
    out = {}
    for role, key in text_map.items():
        tok = tokens.get(role)
        val = tok["value"] if isinstance(tok, dict) else tok
        c = contrast(val, bg_val) if val else None
        out[key] = round(c, 2) if c is not None else None
    return out


# 家族展示/编号顺序（与 INDEX.md 家族分组一致）；不在列表中的新家族排在末尾。
FAMILY_ORDER = ["opensquilla", "catppuccin", "ergemd", "aura", "dracula", "nord", "solarized",
                "tokyonight", "one-dark-pro", "night-owl", "synthwave", "iceberg",
                "kanagawa", "everforest", "rose-pine", "ayu", "jellyfish", "shades",
                "vue", "falcon", "omni", "onepage"]

# 家族显示名（卡片底部标签 / 规范品牌名，首字母大写或品牌官方写法）。
FAMILY_DISPLAY_NAMES = {
    "opensquilla": "OpenSquilla", "catppuccin": "Catppuccin", "ergemd": "ErgeMD",
    "aura": "Aura", "dracula": "Dracula", "nord": "Nord", "solarized": "Solarized",
    "tokyonight": "Tokyo Night", "one-dark-pro": "One Dark Pro", "night-owl": "Night Owl",
    "synthwave": "Synthwave", "iceberg": "Iceberg", "kanagawa": "Kanagawa",
    "everforest": "Everforest", "rose-pine": "Rosé Pine",
    "ayu": "Ayu", "jellyfish": "JellyFish", "shades": "Shades of Purple",
    "vue": "Vue Theme", "falcon": "Falcon", "omni": "Omni", "onepage": "OnePage",
}


# ── 家族感知预览配置（生成进 INDEX.json 的 family.sections / badgePairs / l1RoleMap）──
# preview.html 优先读 data.js，内置同款常量兜底；分区/映射的单一事实源从 contract 延伸至此。
# 未在此登记的家族用 L1_SECTIONS / DEFAULT_BADGE_PAIRS。

L1_SECTIONS = [
    ["背景 / 文本 / 边框", ["bg", "bg-surface", "bg-surface-2", "bg-elevated", "bg-hover",
                            "text", "text-muted", "text-dim", "border", "border-strong",
                            "border-focus", "card", "hairline"]],
    ["强调色", ["accent", "accent-hover", "accent-deep", "accent-secondary", "accent-foreground"]],
    ["状态色", ["ok", "ok-fill", "warn", "warn-fill", "danger", "danger-fill",
                "info", "info-fill", "queued", "queued-fill"]],
    ["语法高亮", ["syntax-comment", "syntax-keyword", "syntax-string",
                  "syntax-literal", "syntax-title", "syntax-attr"]],
]

FAMILY_SECTIONS = {
    # ergemd：原生角色分区（与家族 README 五段一致）
    "ergemd": [
        ["背景 / 文本", ["bg-page", "bg-reader", "bg-sidebar", "bg-code", "bg-secondary",
                         "bg-tertiary", "text-primary", "text-secondary", "text-muted", "text-heading"]],
        ["标题层级", ["h1-color", "h2-color", "h3-color", "h4-color", "h5-color", "h6-color"]],
        ["强调 / 品牌", ["accent-cyan", "accent-pink", "accent-purple", "accent-green", "accent-yellow",
                         "accent-orange", "accent-red", "accent-blue", "brand-primary",
                         "brand-secondary", "brand-logo"]],
        ["状态色 (callout)", ["obsidian-callout-note", "obsidian-callout-info", "obsidian-callout-success",
                              "obsidian-callout-warning", "obsidian-callout-danger"]],
        ["语法高亮", ["code-keyword", "code-string", "code-number", "code-comment",
                      "code-function", "code-text"]],
    ],
    # onepage：L1 身份段 + 家族身份资产（typo 彩色排版 / ANSI 备查通道，审计 F11）。
    # accent-active（color-mix）、shadow（box-shadow 串）、graph-*（var/color-mix 公式，预览页
    # 无 CSS 变量上下文渲染不了）不上卡，只留在 tokens。
    "onepage": L1_SECTIONS + [
        ["彩色排版", ["typo-h1", "typo-h2", "typo-h3", "typo-h4", "typo-h5", "typo-h6",
                      "typo-bold", "typo-italic"]],
        ["ANSI 备查", ["color-red", "color-orange", "color-yellow", "color-green", "color-cyan",
                       "color-blue", "color-purple", "color-pink"]],
    ],
}

DEFAULT_BADGE_PAIRS = [["text", "bg"], ["text-muted", "bg"], ["text-dim", "bg"]]
FAMILY_BADGE_PAIRS = {
    "ergemd": [["text-primary", "bg-page"], ["text-secondary", "bg-page"], ["text-muted", "bg-page"]],
}

# ergemd 原生角色 → L1 对比矩阵映射（仅 ergemd 家族输出，preview 对比视图用）
ERGEMD_L1_MAP = {
    "bg": "bg-page", "bg-surface": "bg-reader",
    "text": "text-primary", "text-muted": "text-secondary", "text-dim": "text-muted",
    "accent": "accent-blue", "ok": "accent-green", "warn": "accent-yellow",
    "danger": "accent-red", "info": "accent-cyan", "queued": "accent-purple",
    "syntax-keyword": "code-keyword", "syntax-string": "code-string", "syntax-literal": "code-number",
    "syntax-comment": "code-comment", "syntax-title": "code-function",
}


def family_sort_key(name: str) -> tuple[int, str]:
    if name in FAMILY_ORDER:
        return (FAMILY_ORDER.index(name), name)
    return (len(FAMILY_ORDER), name)


def load_old_numbers(path: Path) -> dict[tuple[str, str], int]:
    """读取已落盘 INDEX.json 的编号映射 {(family, id): number}。

    编号采用「追加分配」策略：已有主题沿用旧号（永不变），新增主题取 max+1。
    首次运行（无旧文件）返回空映射，按当前遍历顺序分配 1..N。
    旧文件存在但损坏/缺 families 时硬失败——静默重编号会破坏「已有编号永不变」。
    """
    if not path.exists():
        return {}
    try:
        old = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError) as e:
        raise SystemExit(
            f"ERROR: {path} 已存在但无法解析（{e.__class__.__name__}）。"
            "编号分配拒绝继续（已有编号永不变），请先修复或恢复该文件。"
        )
    if not isinstance(old.get("families"), list):
        raise SystemExit(
            f"ERROR: {path} 缺少 families 数组，编号分配拒绝继续，请先修复该文件。"
        )
    return {
        (f["family"], t["id"]): t["number"]
        for f in old["families"]
        for t in f.get("themes", [])
        if "number" in t
    }


def assign_numbers(families: list[dict]) -> None:
    """给每个 theme 填全局编号 number（就地修改）。"""
    old = load_old_numbers(INDEX_JSON)
    next_num = (max(old.values()) + 1) if old else 1
    for fam in families:
        for theme in fam["themes"]:
            key = (fam["family"], theme["id"])
            if key in old:
                theme["number"] = old[key]
            else:
                theme["number"] = next_num
                next_num += 1


def needs_write(path: Path, canonical: str, prefix: str = "", suffix: str = "") -> bool:
    """与磁盘既有内容比对（剔除 generatedAt 后重序列化）；一致返回 False 以跳过重写。

    generatedAt 每次运行都变，直接比较会让零数据改动也产生时间戳 diff；
    字节幂等 = 数据不变则文件不动（审计 F5）。
    """
    if not path.exists():
        return True
    raw = path.read_text(encoding="utf-8")
    if raw == prefix + canonical + "\n" + suffix:
        return False
    try:
        old = json.loads(raw[len(prefix):len(raw) - len(suffix)])
    except json.JSONDecodeError:
        return True
    old.pop("generatedAt", None)
    return json.dumps(old, ensure_ascii=False, indent=2) != canonical


def main() -> int:
    # 单 flag 参数解析：跳过 argparse（初始化 + 模块导入 ~12ms），保留 --help。
    if "-h" in sys.argv[1:] or "--help" in sys.argv[1:]:
        print(__doc__)
        return 0
    write = "--write" in sys.argv[1:]

    # 纳入 DoD / provenance（P3）：与契约覆盖同门禁；缺 IR 的旧家族仅警告。
    try:
        from lint_intake import lint_all as _lint_all
        _ie, _iw = _lint_all(THEMES, strict=False)
        for _w in _iw:
            print(f"WARN: {_w}")
        for _e in _ie:
            print(f"ERROR: {_e}", file=sys.stderr)
        if _ie:
            print(f"lint_intake: {len(_ie)} error(s)", file=sys.stderr)
            return 1
    except ImportError:
        pass

    families = []
    all_tokens = 0
    errors = []

    for fam_dir in sorted(
        (p for p in THEMES.iterdir() if p.is_dir() and not p.name.startswith("_")),
        key=lambda p: family_sort_key(p.name),
    ):
        contract_path = fam_dir / "_source" / "contract.json"
        if not contract_path.exists():
            errors.append(f"[{fam_dir.name}] missing _source/contract.json")
            continue
        try:
            contract = json.loads(contract_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            print(f"ERROR: 契约解析失败 {contract_path}: {e}", file=sys.stderr)
            return 1
        required = set(contract.get("required", []))
        derived = set(contract.get("derivedOptional", []))
        contract_all = required | derived

        fam_readme = parse_family_readme(fam_dir / "README.md") if (fam_dir / "README.md").exists() else {}

        themes = []
        for theme_dir in sorted(p for p in fam_dir.iterdir() if p.is_dir() and not p.name.startswith("_")):
            tid = theme_dir.name
            palette_path = theme_dir / "palette.md"
            readme_path = theme_dir / "README.md"
            meta = parse_theme_readme(readme_path) if readme_path.exists() else {}
            has_palette = palette_path.exists()

            if has_palette:
                tokens = parse_palette(palette_path)
                roles = set(tokens)
                missing = sorted(required - roles)
                out_of_contract = sorted(roles - contract_all)
                # Count only explicit overrides: rows marked 「继承 …」 come from the
                # family base layer, not the theme (ErgeMD palette lists them for
                # readability but they are not overrides).
                derived_overrides = sorted(
                    r for r in roles & derived if not tokens[r]["note"].startswith("继承")
                )
                if missing:
                    errors.append(f"[{fam_dir.name}/{tid}] required 缺失: {missing}")
                if out_of_contract:
                    errors.append(f"[{fam_dir.name}/{tid}] 契约外角色: {out_of_contract}")
                all_tokens += len(tokens)
            else:
                tokens, missing, out_of_contract, derived_overrides = {}, [], [], []

            font_style, fonts, structural_note = structural_of(meta)
            themes.append({
                "id": tid,
                "displayName": meta.get("显示名", tid),
                "scheme": scheme_of(meta),
                "type": type_of(meta, has_palette),
                "path": f"themes/{fam_dir.name}/{tid}",
                "palettePath": f"themes/{fam_dir.name}/{tid}/palette.md" if has_palette else None,
                "license": license_of(meta) or fam_readme.get("license"),
                "licenseNote": meta.get("特殊点") if "Nord" in meta.get("特殊点", "") else None,
                "fontStyle": font_style,
                "fonts": fonts,
                "structuralNote": structural_note,
                "tokenCount": len(tokens),
                "requiredCount": len(required),
                "requiredMissing": missing,
                "derivedOverrideCount": len(derived_overrides),
                "outOfContractRoles": out_of_contract,
                "status": "extracted" if has_palette else "recorded",
                "brand": brand_of(tokens) if has_palette else None,
                "textContrast": text_contrast_of(tokens, fam_dir.name) if has_palette else None,
                "tokens": {r: t["value"] for r, t in tokens.items()} if has_palette else None,
                "notes": meta.get("特殊点", ""),
            })

        families.append({
            "family": fam_dir.name,
            "familyDisplayName": FAMILY_DISPLAY_NAMES.get(fam_dir.name, fam_dir.name),
            "sourceProject": fam_readme.get("sourceProject", fam_dir.name),
            "sourceRepo": fam_readme.get("sourceRepo"),
            "license": fam_readme.get("license"),
            "contractPath": f"themes/{fam_dir.name}/_source/contract.json",
            "contractVersion": contract.get("version"),
            "sections": FAMILY_SECTIONS.get(fam_dir.name, L1_SECTIONS),
            "badgePairs": FAMILY_BADGE_PAIRS.get(fam_dir.name, DEFAULT_BADGE_PAIRS),
            "l1RoleMap": ERGEMD_L1_MAP if fam_dir.name == "ergemd" else None,
            "themes": themes,
        })

    # 全局编号：沿用旧号 + 新主题追加 max+1（新增主题不改变已有编号）。
    assign_numbers(families)

    stats = {
        "familyCount": len(families),
        "themeCount": sum(len(f["themes"]) for f in families),
        "valueThemeCount": sum(1 for f in families for t in f["themes"] if t["type"] == "value-theme"),
        "skinCount": sum(1 for f in families for t in f["themes"] if t["type"] == "expressive-skin"),
        "tokenTotal": all_tokens,
    }

    index = {
        "schemaVersion": 1,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "generator": "scripts/gen_index.py",
        "singleSourceOfTruth": "themes/<family>/_source/contract.json",
        "families": families,
        "stats": stats,
    }

    if write:
        canonical = json.dumps(
            {k: v for k, v in index.items() if k != "generatedAt"}, ensure_ascii=False, indent=2
        )
        if needs_write(INDEX_JSON, canonical):
            INDEX_JSON.write_text(
                json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
            )
            print(f"wrote {INDEX_JSON.relative_to(ROOT)}")
        else:
            print(f"unchanged, skipped {INDEX_JSON.relative_to(ROOT)}")

        # SPA 数据：完整 INDEX.json（含每主题 tokens）包成 JS 全局变量，
        # 供 preview.html 双击即开（<script src> 无 file:// CORS 限制，比 fetch 稳）。
        data_js = ROOT / "preview" / "data.js"
        data_js.parent.mkdir(exist_ok=True)
        if needs_write(data_js, canonical, "window.__TV = ", ";\n"):
            data_js.write_text(
                "window.__TV = " + json.dumps(index, ensure_ascii=False, indent=2) + ";\n",
                encoding="utf-8",
            )
            print(f"wrote {data_js.relative_to(ROOT)}")
        else:
            print(f"unchanged, skipped {data_js.relative_to(ROOT)}")

    # human summary（编号 #N 供 INDEX.md 编号列抄写核对；brand 供品牌色核对）
    for f in families:
        for t in f["themes"]:
            extra = ""
            if t["derivedOverrideCount"]:
                extra = f" derived={t['derivedOverrideCount']}"
            brand = t.get("brand")
            brand_s = f" brand={brand['color']}({brand['buttonText']})" if brand else ""
            tc = t.get("textContrast")
            tc_s = ""
            if tc and tc.get("textOnBg") is not None and tc["textOnBg"] < 4.5:
                tc_s = f" ⚠️textOnBg={tc['textOnBg']}"
            print(f"{f['family']}/{t['id']} #{t['number']:03d} tokens={t['tokenCount']} missing={len(t['requiredMissing'])} out={len(t['outOfContractRoles'])}{extra}{brand_s}{tc_s}")
    print(json.dumps(stats, ensure_ascii=False))

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
