# rose-pine/dawn 色板表


> 来源：rose-pine/neovim 的 palette.lua 的 dawn 变体（浅色）。颜色值为源码原文，未改写。
> 语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#faf4ed` | 中性 | base |
| `--bg-surface` | `#fffaf3` | 中性 | surface |
| `--bg-surface-2` | `#f2e9e1` | 中性 | overlay |
| `--bg-elevated` | `#f2e9e1` | 中性 | overlay |
| `--bg-hover` | `#f2e9e1` | 中性 | overlay |
| `--text` | `#464261` | 中性 | text |
| `--text-muted` | `#797593` | 中性 | subtle |
| `--text-dim` | `#9893a5` | 中性 | muted |
| `--border` | `#f2e9e1` | 中性 | overlay |
| `--border-strong` | `#dfdad9` | 中性 | highlight_med |
| `--border-focus` | `#907aa9` | 中性 | iris（焦点用紫） |
| `--card` | `#fffaf3` | 中性 | surface |
| `--hairline` | `#f4ede8` | 中性 | highlight_low |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#d7827e` | 强调 | rose（玫瑰粉，品牌色） |
| `--accent-hover` | `#d7827e` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#286983` | 强调 | pine |
| `--accent-secondary` | `#907aa9` | 强调 | iris |
| `--accent-foreground` | `#faf4ed` | 强调 | base（浅底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#286983` | 功能 | pine |
| `--warn` | `#ea9d34` | 功能 | gold |
| `--danger` | `#b4637a` | 功能 | love |
| `--info` | `#56949f` | 功能 | foam |
| `--queued` | `#907aa9` | 功能 | iris（紫） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#9893a5` | 语法 | muted |
| `--syntax-keyword` | `#286983` | 语法 | pine |
| `--syntax-string` | `#ea9d34` | 语法 | gold |
| `--syntax-literal` | `#ea9d34` | 语法 | gold |
| `--syntax-title` | `#d7827e` | 语法 | rose |
| `--syntax-attr` | `#907aa9` | 语法 | iris |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#286983` | 派生 | 同 ok |
| `--warn-fill` | `#ea9d34` | 派生 | 同 warn |
| `--danger-fill` | `#b4637a` | 派生 | 同 danger |
| `--info-fill` | `#56949f` | 派生 | 同 info |
| `--queued-fill` | `#907aa9` | 派生 | 同 queued |
