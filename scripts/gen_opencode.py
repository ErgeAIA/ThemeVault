#!/usr/bin/env python3
"""Generate the `opencode` family from FeatherHunter/dsh-opencode-palette.

DSH ships 37 OpenCode themes under `src/themes/*.json`. Each theme is a VS Code
style token set (background/text/accent/error/warning/success/info/primary/
secondary/border*/syntax*/diff*/markdown*) stored either as:
  - dual scheme:  role -> {"dark": <hex|def>, "light": <hex|def>}
  - single scheme: role -> "<def name>"  (defs holds the actual hex, dark only)

We copy each source JSON verbatim into _source/, resolve defs references and the
dark/light split, then emit per-theme palette.md + README.md (dark, plus a
`-light` sibling for dual-scheme themes), plus the family contract/intent/
extract and README.

Source pin: 9839cb3eabe94a494fea4b17f4e50b1d6372d5ce (v2.0.26), MIT (aggregator).
Upstream: anomalyco/opencode (per DSH MANIFEST); each theme's original upstream
license is per its source project (mostly MIT / Apache-2.0).

Usage: python scripts/gen_opencode.py
"""
import json
import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
FAMILY = ROOT / "themes" / "opencode"
SRC = FAMILY / "_source"
DSH_TEMP = pathlib.Path(r"d:\temp")
PIN = "9839cb3eabe94a494fea4b17f4e50b1d6372d5ce"
PIN_SHORT = "9839cb3"
SRC_REPO = "https://github.com/FeatherHunter/dsh-opencode-palette"
UPSTREAM_REPO = "https://github.com/anomalyco/opencode"

SKIP = {"dsh_MANIFEST.json", "dsh_package.json", "dsh_LICENSE", "dsh_THIRD_PARTY_NOTICES.json"}

# 核心 required 角色（所有 37 主题共有；4 个精简主题缺 textMuted/syntax*，故降级为 derivedOptional）。
REQUIRED = [
    "background", "text", "border",
    "primary", "accent",
    "error", "warning", "success", "info",
]


def classify(role: str) -> str:
    """Map a raw OpenCode role to a palette section kind."""
    if role in ("primary", "secondary", "accent"):
        return "强调"
    if role in ("error", "warning", "success", "info"):
        return "功能"
    if role.startswith("syntax"):
        return "语法"
    if role.startswith("diff") or role.startswith("markdown"):
        return "派生"
    return "中性"


def resolve(val, defs, scheme):
    """Resolve a role value (hex string, defs name, or {dark,light} already unwrapped)."""
    if isinstance(val, str):
        if val.startswith("#"):
            return val
        if scheme in ("dark", "light") and isinstance(defs.get(scheme), dict) and val in defs[scheme]:
            return defs[scheme][val]
        if val in defs and isinstance(defs[val], str):
            return defs[val]
        return val  # leave unresolved (should not happen for valid themes)
    return val


def load_dsh(path: pathlib.Path):
    """Return (defs, theme, scheme) where scheme is 'dual' or 'single'."""
    d = json.loads(path.read_text(encoding="utf-8"))
    defs = d.get("defs", {})
    theme = d.get("theme", {})
    bg = theme.get("background")
    scheme = "dual" if isinstance(bg, dict) and ("dark" in bg or "light" in bg) else "single"
    return defs, theme, scheme


def resolve_role(role_val, defs, scheme):
    """Unwrap a role value into (dark_val, light_val)."""
    if isinstance(role_val, dict) and ("dark" in role_val or "light" in role_val):
        dark = resolve(role_val.get("dark"), defs, "dark")
        light = resolve(role_val.get("light"), defs, "light")
        return dark, light
    # single scheme (defs reference or raw hex)
    v = resolve(role_val, defs, None)
    return v, None


def main() -> int:
    FAMILY.mkdir(parents=True, exist_ok=True)
    SRC.mkdir(parents=True, exist_ok=True)

    # 1) discover main theme files (exclude desktop-2.0 d2_ duplicates + skip list)
    main_files = []
    for f in sorted(DSH_TEMP.glob("dsh_*.json")):
        name = f.name
        if name in SKIP or name.startswith("dsh_d2_"):
            continue
        main_files.append(f)
    print(f"discovered {len(main_files)} main theme files")

    # 2) parse every theme -> resolved roles + scheme
    themes = {}  # id -> {"scheme", "roles": {role: (dark, light)}}
    ledger = {}  # hex -> {"witness": {sourceFile, var}, "hits": int}
    for f in main_files:
        tid = f.name[4:-5]  # strip 'dsh_' and '.json'
        defs, theme, scheme = load_dsh(f)
        # copy source verbatim
        shutil.copyfile(f, SRC / f"{tid}.json")
        roles = {}
        for role, rv in theme.items():
            dark, light = resolve_role(rv, defs, scheme)
            roles[role] = (dark, light)
            for v in (dark, light):
                if isinstance(v, str) and v:
                    if v not in ledger:
                        entry = {"witness": {"sourceFile": f"{tid}.json", "var": role}, "hits": 0}
                        if v.startswith("#"):
                            entry["kind"] = "hex"
                        ledger[v] = entry
                    ledger[v]["hits"] += 1
        themes[tid] = {"scheme": scheme, "roles": roles}
        print(f"  {tid}: {scheme}, roles={len(roles)}")

    # 3) contract.json
    all_roles = set()
    for t in themes.values():
        all_roles |= set(t["roles"].keys())
    derived = sorted(all_roles - set(REQUIRED))
    contract = {
        "version": 3,
        "description": "OpenCode 原生语义角色集（VS Code 风格：background/text/accent/error/warning/"
                       "success/info/primary/secondary/border*/syntax*/diff*/markdown*）。opencode 家族统一契约；"
                       "每个主题 palette.md 必须定义全部 required 角色，derivedOptional 为场景/边框/次级角色。",
        "required": REQUIRED,
        "derivedOptional": derived,
    }
    (SRC / "contract.json").write_text(
        json.dumps(contract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"wrote contract.json (required={len(REQUIRED)}, derived={len(derived)})")

    # 4) intent.json
    intent = {
        "schemaVersion": 1,
        "family": "opencode",
        "source": {
            "project": "dsh-opencode-palette",
            "repo": SRC_REPO,
            "pin": PIN,
            "pinType": "commit",
            "files": sorted(f"{tid}.json" for tid in themes),
            "license": "MIT",
            "upstream": {
                "project": "OpenCode 主题集 (anomalyco/opencode)",
                "repo": UPSTREAM_REPO,
                "license": None,
                "note": "DSH 以 MIT 聚合分发；各原主题上游协议以原项目为准（多为 MIT / Apache-2.0）。",
            },
        },
        "scope": {
            "themes": sorted(themes.keys()),
            "defaultSemantics": "frozen-default",
            "defaultNote": "入库为源码固化默认值；DSH 主题 JSON 的 dark/light 双方案已分别落盘为 <id> 与 <id>-light。",
        },
        "attribution": [
            "Nord 衍生主题需保留 Sven Greb (Arctic Ice Studio) 署名",
        ],
        "collectedAt": "2026-10-10",
    }
    (SRC / "intent.json").write_text(
        json.dumps(intent, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("wrote intent.json")

    # 5) extract.json (value-ledger)
    extract = {
        "schemaVersion": 2,
        "family": "opencode",
        "pin": PIN,
        "kind": "value-ledger",
        "provenance": "full",
        "values": {
            hexv: {"kind": "hex", "witness": info["witness"], "hits": info["hits"]}
            for hexv, info in sorted(ledger.items())
        },
    }
    (SRC / "extract.json").write_text(
        json.dumps(extract, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"wrote extract.json ({len(ledger)} unique hex values)")

    # 6) per-theme palette.md + README.md
    section_order = ["中性", "强调", "功能", "语法", "派生"]
    section_titles = {
        "中性": "中性色（背景 / 文本 / 边框）",
        "强调": "强调色",
        "功能": "功能状态色（4 通道）",
        "语法": "语法高亮色",
        "派生": "派生 / 场景色（markdown / diff；主题显式值）",
    }

    def palette_text(tid: str, roles: dict, scheme_label: str, is_light: bool) -> str:
        out = [
            f"# opencode/{tid}{'-light' if is_light else ''} 色板表",
            "",
            f"> 来源：{SRC_REPO}（MIT 聚合）@ `{PIN_SHORT}`，原始主题 `{tid}`。",
            "> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开为 hex），未改写。",
            f"> 本表为 OpenCode 原生角色，{'light' if is_light else 'dark'} 方案。",
            "",
        ]
        # group roles by section, preserve REQUIRED order within section
        grouped = {k: [] for k in section_order}
        for role in sorted(roles.keys(), key=lambda r: (REQUIRED.index(r) if r in REQUIRED else 999, r)):
            grouped[classify(role)].append(role)
        for sec in section_order:
            rows = grouped[sec]
            if not rows:
                continue
            out += [
                f"## {section_titles[sec]}",
                "",
                "| 语义角色 | 颜色值 | 类型 | 备注 |",
                "|----------|--------|------|------|",
            ]
            for role in rows:
                dark, light = roles[role]
                v = light if is_light else dark
                note = f"OpenCode `{role}`" + ("" if v is not None else "；DSH 未提供该方案值")
                out.append(f"| `--{role}` | `{v}` | {sec} | {note} |")
            out.append("")
        return "\n".join(out)

    def readme_text(tid: str, scheme_label: str, is_light: bool) -> str:
        name = tid
        scheme = "light" if is_light else "dark"
        return "\n".join([
            f"# opencode/{tid}{'-light' if is_light else ''} 主题说明",
            "",
            "## 元信息",
            "",
            "- **来源项目**：OpenCode 主题集（anomalyco/opencode），经 dsh-opencode-palette（MIT）聚合",
            f"- **来源仓库链接**：{SRC_REPO} @ `{PIN_SHORT}`",
            f"- **原始主题 ID**：`{tid}`",
            f"- **显示名**：{name}",
            "- **协议**：MIT（DSH 聚合分发；各原主题上游协议以原项目为准）",
            f"- **色彩方案**：{scheme}",
            "- **主题类型**：value theme（全局）",
            "- **提取方式**：基于 DSH 主题 JSON（OpenCode defs+theme 格式），解析 defs 引用与 dark/light 双方案，生成原生角色色板表",
            "- **显式颜色令牌数**：见 palette.md（50 原生角色）",
            f"- **特殊点**：OpenCode 移植版；DSH 以 MIT 聚合；上游协议以原项目为准（Nord 衍生需保留 Sven Greb 署名）",
            "",
            "## 迁移备注",
            "",
            "- OpenCode 原生角色（非 L1）：background/text/accent/syntax*/markdown*/diff* 等。",
            "- light 方案独立落盘为 `opencode/<id>-light`；dark 为主方案 `opencode/<id>`。",
            "- 取色时按原生角色名直接引用；如需对齐 L1，可参考家族 README 的角色语义。",
            "",
            "## 文件清单",
            "",
            "- `palette.md` — 逐角色全量色板表",
            "- `../_source/` — DSH 原始主题 JSON + contract.json + intent.json + extract.json",
            "",
        ])

    theme_count = 0
    for tid, t in sorted(themes.items()):
        roles = t["roles"]
        scheme = t["scheme"]
        # dark
        td = FAMILY / tid
        td.mkdir(exist_ok=True)
        (td / "palette.md").write_text(palette_text(tid, roles, scheme, False), encoding="utf-8")
        (td / "README.md").write_text(readme_text(tid, scheme, False), encoding="utf-8")
        theme_count += 1
        # light (dual only)
        if scheme == "dual":
            tl = FAMILY / f"{tid}-light"
            tl.mkdir(exist_ok=True)
            (tl / "palette.md").write_text(palette_text(tid, roles, scheme, True), encoding="utf-8")
            (tl / "README.md").write_text(readme_text(tid, scheme, True), encoding="utf-8")
            theme_count += 1
    print(f"wrote {theme_count} theme dirs (dark + light siblings)")

    # 7) family README
    fam = [
        "# opencode 家族",
        "",
        f"> 来源项目：[FeatherHunter/dsh-opencode-palette]({SRC_REPO})（MIT 聚合，@ `{PIN_SHORT}`）",
        "> 上游：anomalyco/opencode（DSH MANIFEST 标注）；各原主题上游协议以原项目为准（多为 MIT / Apache-2.0）。",
        "> 数据格式：OpenCode 原生主题 JSON（defs + theme，VS Code 风格角色），dark/light 双方案。",
        "",
        "## 家族成员",
        "",
        "| 主题 ID | 显示名 | 方案 | 类型 | 说明 |",
        "|---------|--------|------|------|------|",
    ]
    for tid, t in sorted(themes.items()):
        if t["scheme"] == "dual":
            fam.append(f"| `{tid}` | {tid} | dark | value theme | OpenCode 移植（DSH 聚合 MIT） |")
            fam.append(f"| `{tid}-light` | {tid} (light) | light | value theme | 同主题 light 方案 |")
        else:
            fam.append(f"| `{tid}` | {tid} | dark | value theme | 单方案（仅 dark） |")
    fam += [
        "",
        "## 原生角色语义（本家族统一契约）",
        "",
        "> OpenCode 主题使用 VS Code 风格原生角色，非 L1 语义集。下表为本家族契约角色分类。",
        "",
        "| 分区 | 角色 |",
        "|------|------|",
        "| 中性 | background, backgroundPanel, backgroundElement, text, textMuted, border, borderActive, borderSubtle |",
        "| 强调 | primary, secondary, accent |",
        "| 功能 | error, warning, success, info |",
        "| 语法 | syntaxComment, syntaxKeyword, syntaxFunction, syntaxVariable, syntaxString, syntaxNumber, syntaxType, syntaxOperator, syntaxPunctuation |",
        "| 派生/场景 | diff*（12）, markdown*（14） |",
        "",
        "## 结构约定",
        "",
        "```",
        "themes/opencode/",
        "├── README.md            # 本文件",
        "├── _source/             # DSH 原始主题 JSON（只读）+ contract/intent/extract",
        "└── <id>/                # dark 方案",
        "    ├── README.md",
        "    └── palette.md",
        "└── <id>-light/          # light 方案（dual 主题才有）",
        "    ├── README.md",
        "    └── palette.md",
        "```",
        "",
        "## 校验",
        "",
        "- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。",
        "- 色值以 DSH 主题 JSON 解析后原文为准；上游改色则重跑本脚本刷新。",
        "- 协议 MIT（DSH 聚合）；Nord 衍生保留 Sven Greb 署名。",
    ]
    (FAMILY / "README.md").write_text("\n".join(fam) + "\n", encoding="utf-8")
    print("wrote family README")

    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
