# tokyonight/night 色板表

> 来源：tokyonight.nvim（folke）`lua/tokyonight/colors/night.lua`（基于 storm 变体覆盖背景阶梯）。
> 颜色值为源码原文，未改写。语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1a1b26` | 中性 | bg，最流行默认变体 |
| `--bg-surface` | `#16161e` | 中性 | bg_dark（侧栏/状态栏） |
| `--bg-surface-2` | `#0C0E14` | 中性 | bg_dark1 |
| `--bg-elevated` | `#1a1b26` | 中性 | bg（浮窗背景与 bg 同色） |
| `--bg-hover` | `#292e42` | 中性 | bg_highlight（继承 storm，highlight 背景） |
| `--text` | `#c0caf5` | 中性 | fg |
| `--text-muted` | `#a9b1d6` | 中性 | fg_dark |
| `--text-dim` | `#3b4261` | 中性 | fg_gutter（行号/最弱文本） |
| `--border` | `#545c7e` | 中性 | dark3 |
| `--border-strong` | `#737aa2` | 中性 | dark5 |
| `--border-focus` | `#7aa2f7` | 中性 | blue（焦点用蓝） |
| `--card` | `#16161e` | 中性 | bg_dark |
| `--hairline` | `#3b4261` | 中性 | fg_gutter |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#7aa2f7` | 强调 | blue，主强调 |
| `--accent-hover` | `#7aa2f7` | 强调 | blue（无显式 hover，同值） |
| `--accent-deep` | `#3d59a1` | 强调 | blue0 |
| `--accent-secondary` | `#7dcfff` | 强调 | cyan |
| `--accent-foreground` | `#1a1b26` | 强调 | bg（accent 上文字用深背景） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#9ece6a` | 功能 | green |
| `--warn` | `#ff9e64` | 功能 | orange |
| `--danger` | `#f7768e` | 功能 | red |
| `--info` | `#7aa2f7` | 功能 | blue |
| `--queued` | `#bb9af7` | 功能 | magenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#565f89` | 语法 | comment |
| `--syntax-keyword` | `#9d7cd8` | 语法 | purple（keyword） |
| `--syntax-string` | `#9ece6a` | 语法 | green（string） |
| `--syntax-literal` | `#ff9e64` | 语法 | orange（number/常量） |
| `--syntax-title` | `#7aa2f7` | 语法 | blue（function/类型） |
| `--syntax-attr` | `#e0af68` | 语法 | yellow（属性） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#9ece6a` | 派生 | 同 ok |
| `--warn-fill` | `#ff9e64` | 派生 | 同 warn |
| `--danger-fill` | `#f7768e` | 派生 | 同 danger |
| `--info-fill` | `#7aa2f7` | 派生 | 同 info |
| `--queued-fill` | `#bb9af7` | 派生 | 同 queued |
| `--git-add` | `#449dab` | 派生 | git.add（继承 storm） |
| `--git-change` | `#6183bb` | 派生 | git.change |
| `--git-delete` | `#914c54` | 派生 | git.delete |
| `--terminal-black` | `#414868` | 派生 | terminal_black（ansi black） |
