# opensquilla-dark 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/dark/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#18181A` | 中性 |  |
| `--bg-surface` | `#202022` | 中性 |  |
| `--bg-surface-2` | `#28282B` | 中性 |  |
| `--bg-elevated` | `#2D2D30` | 中性 |  |
| `--bg-hover` | `#353539` | 中性 |  |
| `--text` | `#F5F5F7` | 中性 |  |
| `--text-muted` | `#B0B0B6` | 中性 |  |
| `--text-dim` | `#87878E` | 中性 |  |
| `--border` | `#303034` | 中性 |  |
| `--border-strong` | `#444448` | 中性 |  |
| `--border-focus` | `#55555B` | 中性 |  |
| `--card` | `#202022` | 中性 |  |
| `--hairline` | `#29292C` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#F26A1B` | 强调 |  |
| `--accent-hover` | `#FF7A2E` | 强调 |  |
| `--accent-deep` | `#D95A11` | 强调 |  |
| `--accent-secondary` | `#FF8A4C` | 强调 |  |
| `--accent-foreground` | `#160B02` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#39D7A2` | 功能 |  |
| `--warn` | `#E8B23A` | 功能 |  |
| `--warn-fill` | `#E8B23A` | 功能 |  |
| `--danger` | `#FF6B6B` | 功能 |  |
| `--info` | `#56C2E6` | 功能 |  |
| `--queued` | `#8C7DF2` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8B93A6` | 语法 |  |
| `--syntax-keyword` | `#C792EA` | 语法 |  |
| `--syntax-string` | `#9ECE6A` | 语法 |  |
| `--syntax-literal` | `#E5C07B` | 语法 |  |
| `--syntax-title` | `#7AA2F7` | 语法 |  |
| `--syntax-attr` | `#56B6C2` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--msg-bubble` | `color-mix(in srgb, var(--text) 8%, var(--bg-surface))` | 派生 |  |
