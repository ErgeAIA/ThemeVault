#!/usr/bin/env python3
"""共享的只读缓存层：palette.md 解析与 contract.json 读取。

一次 `gen_index.py` 运行会在同进程内依次调用 lint_intake / gen_tokens /
gen_family_mapping / gen_docs_views，每个模块都独立读一遍同一批
themes/<family>/<theme>/palette.md（实测 755 次读取 / 151 个唯一文件）。
本模块把「读文本 → 解析角色表」整体按路径缓存，四个模块共用一份结果，
把重复解析收敛为每个文件一次。

缓存键是 resolve() 后的绝对路径；脚本都是短命进程（无长期驻留），
不存在脚本内改文件后复用旧缓存的问题。
"""
from __future__ import annotations

import json
import re
from functools import lru_cache
from pathlib import Path

# 角色名大小写敏感：opencode 家族用 camelCase（--textMuted / --syntaxComment），
# 只匹配 [a-z0-9-] 会把这类行静默丢弃（72 套主题 tokens.json 少记 40 个角色）。
ROLE_RE = re.compile(
    r"^\|\s*`(--[a-zA-Z0-9-]+)`\s*\|\s*`([^`]*)`\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|$"
)


@lru_cache(maxsize=None)
def read_text(path: str) -> str:
    """按绝对路径缓存文件文本（仅用于本轮只读的资产文件）。"""
    return Path(path).read_text(encoding="utf-8")


@lru_cache(maxsize=None)
def parse_palette(path: str) -> dict[str, dict]:
    """解析 palette.md 角色表 → {role: {value, kind, note}}（结果按路径缓存）。"""
    tokens: dict[str, dict] = {}
    for line in read_text(path).splitlines():
        m = ROLE_RE.match(line)
        if not m:
            continue
        role = m.group(1)[2:]
        tokens[role] = {
            "value": m.group(2).strip(),
            "kind": m.group(3).strip(),
            "note": m.group(4).strip(),
        }
    return tokens


@lru_cache(maxsize=None)
def load_contract(path: str) -> dict:
    """读取 _source/contract.json（同族多主题共用，按路径缓存）。"""
    return json.loads(read_text(path))


def clear() -> None:
    """清空缓存（供脚本内部改写资产后重读，或测试使用）。"""
    read_text.cache_clear()
    parse_palette.cache_clear()
    load_contract.cache_clear()
