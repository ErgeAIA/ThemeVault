# opensquilla-synthwave 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/synthwave/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#150a24` | 中性 |  |
| `--bg-surface` | `#1e1036` | 中性 |  |
| `--bg-surface-2` | `#281649` | 中性 |  |
| `--bg-elevated` | `#331d5c` | 中性 |  |
| `--bg-hover` | `#3d2470` | 中性 |  |
| `--text` | `#f5e8ff` | 中性 |  |
| `--text-muted` | `#c9a8e8` | 中性 |  |
| `--text-dim` | `#a888d0` | 中性 |  |
| `--border` | `#3a2560` | 中性 |  |
| `--border-strong` | `#523484` | 中性 |  |
| `--border-focus` | `#ff2fb9` | 中性 |  |
| `--card` | `#1e1036` | 中性 |  |
| `--hairline` | `#2c1a4d` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ff2fb9` | 强调 |  |
| `--accent-hover` | `#ff5cc9` | 强调 |  |
| `--accent-deep` | `#c00f8a` | 强调 |  |
| `--accent-secondary` | `#3fd6ff` | 强调 |  |
| `--accent-foreground` | `#1a0518` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#3ff5b0` | 功能 |  |
| `--warn` | `#ffb03a` | 功能 |  |
| `--danger` | `#ff5a7a` | 功能 |  |
| `--info` | `#3fd6ff` | 功能 |  |
| `--queued` | `#c9a0ff` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#7a5aa8` | 语法 |  |
| `--syntax-keyword` | `#ff5cc9` | 语法 |  |
| `--syntax-string` | `#3ff5b0` | 语法 |  |
| `--syntax-literal` | `#ffb03a` | 语法 |  |
| `--syntax-title` | `#3fd6ff` | 语法 |  |
| `--syntax-attr` | `#c9a0ff` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                0 0 14px color-mix(in srgb, var(--accent) 45%, transparent)` | 结构 | 绑定 --accent |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 35%, transparent)` | 结构 | 绑定 --accent |
