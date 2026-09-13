# opensquilla-terminal 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/terminal/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#0a0800` | 中性 |  |
| `--bg-surface` | `#12100a` | 中性 |  |
| `--bg-surface-2` | `#1a160c` | 中性 |  |
| `--bg-elevated` | `#221d10` | 中性 |  |
| `--bg-hover` | `#2b2414` | 中性 |  |
| `--text` | `#ffd479` | 中性 |  |
| `--text-muted` | `#cf9f4e` | 中性 |  |
| `--text-dim` | `#96733a` | 中性 |  |
| `--border` | `#3a2f14` | 中性 |  |
| `--border-strong` | `#5c4a1f` | 中性 |  |
| `--border-focus` | `#ffb000` | 中性 |  |
| `--card` | `#12100a` | 中性 |  |
| `--hairline` | `#221c0e` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ffb000` | 强调 |  |
| `--accent-hover` | `#ffc333` | 强调 |  |
| `--accent-deep` | `#cc8a00` | 强调 |  |
| `--accent-secondary` | `#ff8c1a` | 强调 |  |
| `--accent-foreground` | `#0a0800` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#7ee787` | 功能 |  |
| `--warn` | `#ffcf5a` | 功能 |  |
| `--danger` | `#ff7b5e` | 功能 |  |
| `--info` | `#7fd0ff` | 功能 |  |
| `--queued` | `#d3a0ff` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#7a6636` | 语法 |  |
| `--syntax-keyword` | `#ffb000` | 语法 |  |
| `--syntax-string` | `#7ee787` | 语法 |  |
| `--syntax-literal` | `#ff8c1a` | 语法 |  |
| `--syntax-title` | `#ffcf5a` | 语法 |  |
| `--syntax-attr` | `#7fd0ff` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                0 0 12px color-mix(in srgb, var(--accent) 45%, transparent)` | 结构 | 绑定 --accent |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 35%, transparent)` | 结构 | 绑定 --accent |
