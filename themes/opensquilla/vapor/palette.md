# opensquilla-vapor 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/vapor/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1a0e2e` | 中性 |  |
| `--bg-surface` | `#241540` | 中性 |  |
| `--bg-surface-2` | `#2e1b52` | 中性 |  |
| `--bg-elevated` | `#3a2465` | 中性 |  |
| `--bg-hover` | `#472d78` | 中性 |  |
| `--text` | `#f3e9ff` | 中性 |  |
| `--text-muted` | `#c9b3e8` | 中性 |  |
| `--text-dim` | `#9d86c4` | 中性 |  |
| `--border` | `#3a2560` | 中性 |  |
| `--border-strong` | `#533a82` | 中性 |  |
| `--border-focus` | `#ff6ac1` | 中性 |  |
| `--card` | `#241540` | 中性 |  |
| `--hairline` | `#2c1a4d` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ff6ac1` | 强调 |  |
| `--accent-hover` | `#ff8fd4` | 强调 |  |
| `--accent-deep` | `#d63a9a` | 强调 |  |
| `--accent-secondary` | `#63e6ff` | 强调 |  |
| `--accent-foreground` | `#1a0620` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#6bf0c0` | 功能 |  |
| `--warn` | `#ffd86b` | 功能 |  |
| `--danger` | `#ff6f8f` | 功能 |  |
| `--info` | `#63e6ff` | 功能 |  |
| `--queued` | `#c79bff` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#7c6aa8` | 语法 |  |
| `--syntax-keyword` | `#ff8fd4` | 语法 |  |
| `--syntax-string` | `#6bf0c0` | 语法 |  |
| `--syntax-literal` | `#ffb06b` | 语法 |  |
| `--syntax-title` | `#63e6ff` | 语法 |  |
| `--syntax-attr` | `#c79bff` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                0 0 16px color-mix(in srgb, var(--accent-secondary) 40%, transparent)` | 结构 | 绑定 --accent |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                      inset 0 0 12px color-mix(in srgb, var(--accent-secondary) 30%, transparent)` | 结构 | 绑定 --accent |
