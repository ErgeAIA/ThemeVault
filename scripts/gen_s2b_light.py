#!/usr/bin/env python3
"""S2-B：为 TV 现有仅-dark 同名家族补 light 变体。

数据源：opencode 家族已生成的 `<dsh_tid>-light/palette.md`（OpenCode 原生角色，DSH light 方案）。
目标：TV 现有 L1 家族（synthwave/tokyonight/nord/dracula）补一个 `light` 主题，
      经 OpenCode→L1 映射，扩展家族级 extract / intent / README 成员表。

幂等：重跑不重复插入 README 行、不重复加 extract 值。

仅处理 DSH 完整源（50 角色）的家族；onedarkpro/shades 的 DSH 源是精简 28 角色
（缺 text-muted + 全部 syntax*），无法合理填充 L1 29 required，暂不处理。
"""
from __future__ import annotations
import json
import re
import pathlib

ROOT = pathlib.Path("themes")
OP = ROOT / "opencode"
OP_SRC = OP / "_source"
DSH_PIN = "9839cb3"

# TV 家族 → DSH 主题 id（opencode 家族里对应的 light palette）
TARGETS = {
    "synthwave": "synthwave84",
    "tokyonight": "tokyonight",
    "nord": "nord",
    "dracula": "dracula",
}

# OpenCode 原生角色 → L1 语义角色（None = 不映射 L1-core）
OC2L1 = {
    "background": "bg", "backgroundPanel": "bg-surface", "backgroundElement": "bg-surface-2",
    "text": "text", "textMuted": "text-muted", "border": "border",
    "borderActive": "border-strong", "borderSubtle": "hairline",
    "accent": "accent", "primary": "accent-secondary", "secondary": None,
    "error": "danger", "warning": "warn", "success": "ok", "info": "info",
    "syntaxComment": "syntax-comment", "syntaxKeyword": "syntax-keyword",
    "syntaxString": "syntax-string", "syntaxNumber": "syntax-literal",
    "syntaxType": "syntax-title", "syntaxVariable": "syntax-attr",
    "syntaxFunction": None, "syntaxOperator": None, "syntaxPunctuation": None,
}

# L1-core required 但 OpenCode 无对应 → 契约兜底（源 L1 角色, 备注前缀）
FALLBACK = {
    "bg-elevated": ("bg-surface-2", "契约兜底·同 bg-surface-2"),
    "bg-hover": ("bg-surface-2", "契约兜底·同 bg-surface-2"),
    "text-dim": ("text-muted", "契约兜底·同 text-muted"),
    "border-focus": ("border-strong", "契约兜底·同 border-strong"),
    "card": ("bg-surface-2", "契约兜底·同 bg-surface-2"),
    "accent-hover": ("accent", "契约兜底·同 accent"),
    "accent-deep": ("accent", "契约兜底·同 accent"),
    "accent-foreground": ("bg", "契约兜底·取 background（accent 上文字）"),
    "queued": ("accent-secondary", "契约兜底·同 accent-secondary"),
}

# 候选 L1 derivedOptional（按各家族契约过滤后才生成）
DERIVED = {
    "ok-fill": "ok", "warn-fill": "warn", "danger-fill": "danger",
    "info-fill": "info", "queued-fill": "queued", "selection": "bg-surface-2",
}

# L1 段落（标题, 类型, 角色顺序）；派生段角色在生成时按契约动态过滤
SECTIONS = [
    ("中性色（背景 / 文本 / 边框）", "中性",
     ["bg", "bg-surface", "bg-surface-2", "bg-elevated", "bg-hover", "text", "text-muted",
      "text-dim", "border", "border-strong", "border-focus", "card", "hairline"]),
    ("强调色", "强调", ["accent", "accent-hover", "accent-deep", "accent-secondary", "accent-foreground"]),
    ("功能状态色（5 通道）", "功能", ["ok", "warn", "danger", "info", "queued"]),
    ("语法高亮色", "语法", ["syntax-comment", "syntax-keyword", "syntax-string",
                           "syntax-literal", "syntax-title", "syntax-attr"]),
    ("派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）", "派生", []),
]

ROLE_RE = re.compile(r"^\|\s*`(--[a-zA-Z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$")


def parse_oc_light(dsh_tid: str) -> dict[str, str]:
    p = OP / f"{dsh_tid}-light" / "palette.md"
    roles: dict[str, str] = {}
    for line in p.read_text(encoding="utf-8").splitlines():
        m = ROLE_RE.match(line)
        if m:
            roles[m.group(1)[2:]] = m.group(2)  # strip leading --
    return roles


def read_contract(family: str) -> tuple[set[str], set[str]]:
    cp = ROOT / family / "_source" / "contract.json"
    data = json.loads(cp.read_text(encoding="utf-8"))
    return set(data.get("required", [])), set(data.get("derivedOptional", []))


def build_light_values(oc: dict[str, str], allowed_derived: set[str]):
    """返回 {l1: (value, note, oc_role_or_None)}。"""
    vals: dict[str, tuple[str, str, str | None]] = {}
    for oc_role, l1 in OC2L1.items():
        if l1 and oc_role in oc:
            vals[l1] = (oc[oc_role], f"OpenCode `{oc_role}`（DSH light）", oc_role)
    for l1, (src, note) in FALLBACK.items():
        if src in vals:
            vals[l1] = (vals[src][0], note, None)
    for l1, src in DERIVED.items():
        if l1 in allowed_derived and src in vals:
            note = "同 " + src if l1.endswith("fill") else "契约兜底·同 bg-surface-2"
            vals[l1] = (vals[src][0], note, None)
    return vals


def gen_palette(family: str, dsh_tid: str, vals: dict[str, tuple[str, str, str | None]],
               allowed_derived: set[str]) -> str:
    lines = [
        f"# {family}/light 色板表",
        "",
        f"> 来源：DSH（FeatherHunter/dsh-opencode-palette）@ `{DSH_PIN}`，原始主题 `{dsh_tid}` 的 light 方案，经 OpenCode→L1 映射。",
        "> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开），经 OpenCode 原生角色映射到 L1 语义角色；",
        "> 无独立 L1 值的角色按契约兜底标注（ADR-0008）。",
        "",
    ]
    derived_roles = [r for r in DERIVED if r in allowed_derived]
    for title, typ, roles in SECTIONS:
        if "派生" in title:
            roles = derived_roles
        if not roles:
            continue
        lines.append(f"## {title}")
        lines.append("")
        lines.append("| 语义角色 | 颜色值 | 类型 | 备注 |")
        lines.append("|----------|--------|------|------|")
        for r in roles:
            v, note, _ = vals[r]
            lines.append(f"| `--{r}` | `{v}` | {typ} | {note} |")
        lines.append("")
    return "\n".join(lines)


def gen_readme(family: str, dsh_tid: str, display: str, vals: dict[str, tuple[str, str, str | None]],
               req_count: int, der_count: int) -> str:
    bg = vals["bg"][0]
    text = vals["text"][0]
    return f"""# {family}/light 主题说明

## 元信息

- **来源项目**：DSH 聚合 OpenCode 主题集（FeatherHunter/dsh-opencode-palette）
- **来源仓库/链接**：https://github.com/FeatherHunter/dsh-opencode-palette
- **原始主题 ID**：`{dsh_tid}`（DSH）
- **显示名**：{display} Light
- **协议**：MIT（DSH 聚合；上游协议以原项目为准）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于 DSH 主题 JSON（OpenCode 原生角色），经 OpenCode→L1 映射脚本生成
- **显式颜色令牌数**：{req_count} required + {der_count} derivedOptional（见 palette.md）

## 迁移备注

- light 方案补充自 DSH（与 dark 不同源；dark 源为各自原始 VS Code 主题）。取色配对：bg `#{bg}` ↔ text `#{text}`。
- 契约兜底角色见 palette.md 备注（OpenCode 未提供独立 L1 值的角色，如 bg-elevated/bg-hover/text-dim 等同源角色）。
- 上游协议：原主题 `{display}` 以原项目协议为准（多 MIT/Apache-2.0）。

## 文件清单

- `palette.md` — 逐角色全量色板表（L1 语义角色）
- `../_source/` — 家族级 DSH 源快照（值域溯源见 `opencode/_source/{dsh_tid}.json`）
"""


def extend_extract(family: str, dsh_tid: str, vals: dict[str, tuple[str, str, str | None]]) -> None:
    ep = ROOT / family / "_source" / "extract.json"
    data = json.loads(ep.read_text(encoding="utf-8"))
    values = data["values"]
    for l1, (v, _note, oc_role) in vals.items():
        if v not in values:
            values[v] = {
                "kind": "hex",
                "witness": {
                    "sourceFile": f"opencode/_source/{dsh_tid}.json",
                    "var": oc_role if oc_role else f"light:{l1}",
                    "selector": "json",
                },
                "hits": 0,
            }
    ep.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_intent(family: str, dsh_tid: str) -> None:
    ip = ROOT / family / "_source" / "intent.json"
    data = json.loads(ip.read_text(encoding="utf-8"))
    themes = data.setdefault("scope", {}).setdefault("themes", [])
    if "light" not in themes:
        themes.append("light")
    data["lightSupplement"] = {
        "project": "FeatherHunter/dsh-opencode-palette",
        "repo": "https://github.com/FeatherHunter/dsh-opencode-palette",
        "pin": DSH_PIN,
        "dshTheme": dsh_tid,
        "scheme": "light",
        "note": "light 方案补充自 DSH OpenCode 主题集（与 dark 不同源；dark 源为各自原始 VS Code 主题）",
    }
    ip.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_family_readme(family: str, display: str) -> None:
    rp = ROOT / family / "README.md"
    text = rp.read_text(encoding="utf-8")
    if "| `light` |" in text:
        return
    light_row = f"| `light` | {display} Light | light | value theme | DSH 补充 light（OpenCode→L1 映射） |"
    m = re.search(r"(## 家族成员.*?)(\n## )", text, re.S)
    if not m:
        text = text.rstrip() + "\n\n" + light_row + "\n"
        rp.write_text(text, encoding="utf-8")
        return
    seg = m.group(1)
    lines = seg.splitlines()
    idx = None
    for i, ln in enumerate(lines):
        s = ln.strip()
        if s.startswith("|") and "主题 ID" not in s and "---" not in s:
            idx = i
    if idx is not None:
        lines.insert(idx + 1, light_row)
        new_seg = "\n".join(lines)
        text = text[:m.start(1)] + new_seg + text[m.start(2):]
        rp.write_text(text, encoding="utf-8")


def get_display(dsh_tid: str) -> str:
    p = OP_SRC / f"{dsh_tid}.json"
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        return data.get("name") or data.get("theme", {}).get("name") or dsh_tid
    except Exception:
        return dsh_tid


def main() -> None:
    for family, dsh_tid in TARGETS.items():
        oc = parse_oc_light(dsh_tid)
        if not oc:
            print(f"[skip] {family}: 无 opencode/{dsh_tid}-light/palette.md")
            continue
        required, derived = read_contract(family)
        allowed_derived = derived & set(DERIVED)
        vals = build_light_values(oc, allowed_derived)
        display = get_display(dsh_tid)
        light_dir = ROOT / family / "light"
        light_dir.mkdir(parents=True, exist_ok=True)
        (light_dir / "palette.md").write_text(
            gen_palette(family, dsh_tid, vals, allowed_derived), encoding="utf-8")
        (light_dir / "README.md").write_text(
            gen_readme(family, dsh_tid, display, vals, len(required), len(allowed_derived)),
            encoding="utf-8")
        extend_extract(family, dsh_tid, vals)
        update_intent(family, dsh_tid)
        update_family_readme(family, display)
        print(f"[ok] {family}/light  ←  DSH {dsh_tid} (bg={vals['bg'][0]} text={vals['text'][0]} "
              f"derived={len(allowed_derived)})")


if __name__ == "__main__":
    main()
