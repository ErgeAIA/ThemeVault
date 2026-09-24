#!/usr/bin/env python3
"""Render human views from INDEX.json: INDEX.md table/stats + AI-MAP counts.

Generated regions are delimited by HTML comments; prose outside is hand-written.
Remarks in INDEX.md are preserved by theme number.

Usage:
  python scripts/gen_docs_views.py          # rewrite generated blocks
  python scripts/gen_docs_views.py --check  # exit 1 on drift
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX_JSON = ROOT / "INDEX.json"
INDEX_MD = ROOT / "INDEX.md"
AI_MAP = ROOT / "AI-MAP.md"

BEGIN = "<!-- BEGIN:generated {name} -->"
END = "<!-- END:generated {name} -->"


def has_marker(text: str, name: str) -> bool:
    """Exact marker line match — `index-table` must not match `index-table-DRIFT`."""
    b = BEGIN.format(name=name)
    return any(line.strip() == b for line in text.splitlines())


def replace_block(text: str, name: str, body: str) -> str:
    b = BEGIN.format(name=name)
    e = END.format(name=name)
    block = f"{b}\n{body.rstrip()}\n{e}"
    pat = re.compile(re.escape(b) + r".*?" + re.escape(e), re.S)
    if pat.search(text):
        return pat.sub(lambda _m: block, text, count=1)
    return text


def preserve_remarks(md: str) -> dict[int, str]:
    remarks: dict[int, str] = {}
    for line in md.splitlines():
        m = re.match(r"^\| (\d{3}) \|.*\| ([^|]*) \|$", line)
        if m:
            remarks[int(m.group(1))] = m.group(2).strip()
    return remarks


def render_index_table(index: dict, remarks: dict[int, str]) -> str:
    lines = [
        "| 编号 | 主题目录 | 来源项目 | 主题 ID | 显示名 | 协议 | 方案 | required 角色 | 派生覆盖 | 状态 | 备注 |",
        "|-----|----------|----------|---------|--------|------|------|---------------|----------|------|------|",
    ]
    rows = sorted(
        (t for f in index["families"] for t in f["themes"]),
        key=lambda t: t["number"],
    )
    for t in rows:
        fam = t["path"].split("/")[1]
        n = t["number"]
        if t["type"] == "expressive-skin":
            req, der, status = "0（继承 ground）", "—", "✅ 已记录"
        else:
            req = str(t["requiredCount"])
            der = str(t.get("derivedOverrideCount", 0))
            status = "✅ 已提取"
        note = remarks.get(n, "")
        scheme = t.get("scheme") or "—"
        lines.append(
            f"| {n:03d} | `{t['path']}` | {fam} | {t['id']} | "
            f"{t.get('displayName', t['id'])} | {t.get('license') or '—'} | {scheme} | "
            f"{req} | {der} | {status} | {note} |"
        )
    return "\n".join(lines)


def render_index_stats(index: dict) -> str:
    stats = index["stats"]
    fams = [f["family"] for f in index["families"]]
    themes = [t for f in index["families"] for t in f["themes"]]
    value = [t for t in themes if t["type"] == "value-theme"]
    skin = [t for t in themes if t["type"] == "expressive-skin"]
    light = sum(1 for t in value if (t.get("scheme") or "") == "light")
    dark = sum(1 for t in value if (t.get("scheme") or "") == "dark")
    lic: dict[str, int] = {}
    for t in value:
        key = (t.get("license") or "UNKNOWN").split("（")[0].strip()
        lic[key] = lic.get(key, 0) + 1
    lic_s = " + ".join(f"{k} × {v}" for k, v in sorted(lic.items(), key=lambda x: (-x[1], x[0])))
    return "\n".join(
        [
            f"- 已入库来源项目：**{len(fams)}**（{'、'.join(fams)}）",
            f"- value theme：**{len(value)} 套**（{light} light + {dark} dark）",
            f"- expressive skin：**{len(skin)} 套**",
            f"- stats（INDEX.json）：familyCount {stats['familyCount']} / themeCount {stats['themeCount']} / "
            f"valueThemeCount {stats['valueThemeCount']} / skinCount {stats['skinCount']} / tokenTotal {stats['tokenTotal']}",
            f"- 色板表令牌总量：**{stats['tokenTotal']} 个**",
            f"- 协议分布（value theme）：{lic_s}",
            "",
            "> 本节由 `scripts/gen_docs_views.py` 从 `INDEX.json` 生成，禁止手改。",
        ]
    )


def render_ai_map(index: dict) -> str:
    stats = index["stats"]
    themes = [t for f in index["families"] for t in f["themes"]]
    value = [t for t in themes if t["type"] == "value-theme"]
    light = sum(1 for t in value if (t.get("scheme") or "") == "light")
    dark = sum(1 for t in value if (t.get("scheme") or "") == "dark")
    lines = [
        f"{stats['familyCount']} 个家族 / {stats['themeCount']} 套主题（{stats['valueThemeCount']} value theme + "
        f"{stats['skinCount']} skin，数字以 `INDEX.json` 的 `stats` 为准：",
        f"familyCount {stats['familyCount']} / themeCount {stats['themeCount']} / "
        f"valueThemeCount {stats['valueThemeCount']} / skinCount {stats['skinCount']} / "
        f"tokenTotal {stats['tokenTotal']}，{light} light + {dark} dark）。",
        "",
        "| 家族 | 主题数 | 方案 | 契约版本 | required/derived | 角色命名 | 来源 |",
        "|------|--------|------|----------|------------------|----------|------|",
    ]
    for fam in index["families"]:
        contract_p = ROOT / "themes" / fam["family"] / "_source" / "contract.json"
        ver, req, der = "?", "?", "?"
        if contract_p.exists():
            c = json.loads(contract_p.read_text(encoding="utf-8"))
            ver = c.get("version", "?")
            req = len(c.get("required", []))
            der = len(c.get("derivedOptional", []))
        ts = fam["themes"]
        n_skin = sum(1 for t in ts if t["type"] == "expressive-skin")
        n_val = len(ts) - n_skin
        l = sum(1 for t in ts if (t.get("scheme") or "") == "light" and t["type"] == "value-theme")
        d = sum(1 for t in ts if (t.get("scheme") or "") == "dark" and t["type"] == "value-theme")
        both = sum(1 for t in ts if (t.get("scheme") or "") == "both")
        scheme_s = f"{l}L+{d}D" + (f"+{both}both" if both else "")
        count_s = f"{n_val}" + (f" + {n_skin} skin" if n_skin else "")
        lic = ts[0].get("license") or "—"
        naming = "ErgeMD 原生名" if fam["family"] == "ergemd" else "L1 通用"
        if fam["family"] == "onepage":
            naming = "L1 + typo 扩展"
        lines.append(
            f"| {fam['family']} | {count_s} | {scheme_s} | v{ver} | {req}/{der} | {naming} | {lic} |"
        )
    lines += ["", "> 本表由 `scripts/gen_docs_views.py` 生成，禁止手改计数。"]
    return "\n".join(lines)


def write_index_md(index: dict) -> str:
    old = INDEX_MD.read_text(encoding="utf-8")
    remarks = preserve_remarks(old)
    table = render_index_table(index, remarks)
    stats = render_index_stats(index)
    # 精确标记（禁止子串误判，对抗审查 A1）
    if has_marker(old, "index-table"):
        text = replace_block(old, "index-table", table)
        text = replace_block(text, "index-stats", stats)
        return text
    m_stats = re.search(r"## 统计\n", old)
    m_tip = re.search(r"## 检索提示\n", old)
    head = old[: m_stats.start()] if m_stats else old
    head = re.sub(
        r"(\| 编号 \|.*?\n\|-----\|.*?\n).*?(?=\n## |\Z)",
        lambda m: m.group(1)
        + f"{BEGIN.format(name='index-table')}\n{table}\n{END.format(name='index-table')}\n",
        head,
        count=1,
        flags=re.S,
    )
    tail = old[m_tip.start() :] if m_tip else ""
    mid = f"## 统计\n\n{BEGIN.format(name='index-stats')}\n{stats}\n{END.format(name='index-stats')}\n\n"
    return head.rstrip() + "\n\n" + mid + tail


def write_ai_map(index: dict) -> str:
    old = AI_MAP.read_text(encoding="utf-8")
    body = render_ai_map(index)
    if has_marker(old, "family-status"):
        return replace_block(old, "family-status", body)
    m = re.search(r"(## 2\. 家族现状[^\n]*\n\n)(.*?)(?=\n## )", old, flags=re.S)
    if not m:
        return old
    return (
        old[: m.start(2)]
        + f"{BEGIN.format(name='family-status')}\n{body}\n{END.format(name='family-status')}\n"
        + old[m.end(2) :]
    )


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args(argv)
    if not INDEX_JSON.exists():
        print("ERROR: 先运行 gen_index --write 生成 INDEX.json", file=sys.stderr)
        return 1
    index = json.loads(INDEX_JSON.read_text(encoding="utf-8"))
    new_index_md = write_index_md(index)
    new_ai = write_ai_map(index)
    errors = 0
    for path, new in ((INDEX_MD, new_index_md), (AI_MAP, new_ai)):
        old = path.read_text(encoding="utf-8") if path.exists() else ""
        if args.check:
            if old != new:
                print(f"ERROR: {path.name} 生成区与 INDEX.json 不一致", file=sys.stderr)
                errors += 1
        elif old != new:
            path.write_text(new, encoding="utf-8")
            print(f"wrote {path.name}")
    print(f"gen_docs_views: {'OK' if errors == 0 else f'{errors} error(s)'}")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
