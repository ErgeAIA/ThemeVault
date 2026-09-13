# tokyonight/moon 色板表

> 来源：tokyonight.nvim（folke）`lua/tokyonight/colors/moon.lua`（独立 palette，紫调月夜）。
> 颜色值为源码原文，未改写。语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#222436` | 中性 | bg，moon 变体 |
| `--bg-surface` | `#1e2030` | 中性 | bg_dark（侧栏/状态栏） |
| `--bg-surface-2` | `#191B29` | 中性 | bg_dark1 |
| `--bg-elevated` | `#222436` | 中性 | bg（浮窗背景与 bg 同色） |
| `--bg-hover` | `#2f334d` | 中性 | bg_highlight（highlight 背景） |
| `--text` | `#c8d3f5` | 中性 | fg |
| `--text-muted` | `#828bb8` | 中性 | fg_dark |
| `--text-dim` | `#3b4261` | 中性 | fg_gutter（行号/最弱文本） |
| `--border` | `#545c7e` | 中性 | dark3 |
| `--border-strong` | `#737aa2` | 中性 | dark5 |
| `--border-focus` | `#82aaff` | 中性 | blue（焦点用蓝） |
| `--card` | `#1e2030` | 中性 | bg_dark |
| `--hairline` | `#3b4261` | 中性 | fg_gutter |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#82aaff` | 强调 | blue，主强调 |
| `--accent-hover` | `#82aaff` | 强调 | blue（无显式 hover，同值） |
| `--accent-deep` | `#3e68d7` | 强调 | blue0 |
| `--accent-secondary` | `#86e1fc` | 强调 | cyan |
| `--accent-foreground` | `#222436` | 强调 | bg（accent 上文字用深背景） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#c3e88d` | 功能 | green |
| `--warn` | `#ff966c` | 功能 | orange |
| `--danger` | `#ff757f` | 功能 | red |
| `--info` | `#82aaff` | 功能 | blue |
| `--queued` | `#c099ff` | 功能 | magenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#636da6` | 语法 | comment |
| `--syntax-keyword` | `#fca7ea` | 语法 | purple（keyword） |
| `--syntax-string` | `#c3e88d` | 语法 | green（string） |
| `--syntax-literal` | `#ff966c` | 语法 | orange（number/常量） |
| `--syntax-title` | `#82aaff` | 语法 | blue（function/类型） |
| `--syntax-attr` | `#ffc777` | 语法 | yellow（属性） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#c3e88d` | 派生 | 同 ok |
| `--warn-fill` | `#ff966c` | 派生 | 同 warn |
| `--danger-fill` | `#ff757f` | 派生 | 同 danger |
| `--info-fill` | `#82aaff` | 派生 | 同 info |
| `--queued-fill` | `#c099ff` | 派生 | 同 queued |
| `--git-add` | `#b8db87` | 派生 | git.add |
| `--git-change` | `#7ca1f2` | 派生 | git.change |
| `--git-delete` | `#e26a75` | 派生 | git.delete |
| `--terminal-black` | `#444a73` | 派生 | terminal_black（ansi black） |
