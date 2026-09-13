# kanagawa/dragon 色板表

> 来源：kanagawa.nvim（rebelot）`lua/kanagawa/themes.lua` 的 `dragon` 变体映射（值取 colors.lua 原文）。
> 背景：dragonBlack 背景系（暖调暗色）。语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#181616` | 中性 | dragonBlack3，ui.bg |
| `--bg-surface` | `#12120f` | 中性 | dragonBlack1，ui.bg_m2 |
| `--bg-surface-2` | `#0d0c0c` | 中性 | dragonBlack0，ui.bg_m3（最深） |
| `--bg-elevated` | `#282727` | 中性 | dragonBlack4，ui.bg_p1 |
| `--bg-hover` | `#282727` | 中性 | dragonBlack4 |
| `--text` | `#c5c9c5` | 中性 | dragonWhite，ui.fg |
| `--text-muted` | `#C8C093` | 中性 | oldWhite，ui.fg_dim（共用） |
| `--text-dim` | `#737c73` | 中性 | dragonAsh，comment 系 |
| `--border` | `#282727` | 中性 | dragonBlack4 |
| `--border-strong` | `#393836` | 中性 | dragonBlack5，ui.bg_p2 |
| `--border-focus` | `#8ba4b0` | 中性 | dragonBlue2（品牌蓝焦点） |
| `--card` | `#282727` | 中性 | dragonBlack4 |
| `--hairline` | `#282727` | 中性 | dragonBlack4 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#8ba4b0` | 强调 | dragonBlue2（品牌蓝，fun 色） |
| `--accent-hover` | `#8ea4a2` | 强调 | dragonAqua（青，type 色） |
| `--accent-deep` | `#658594` | 强调 | dragonBlue（info 色） |
| `--accent-secondary` | `#8992a7` | 强调 | dragonViolet（紫，keyword/statement） |
| `--accent-foreground` | `#0d0c0c` | 强调 | dragonBlack0（accent 上文字） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#98BB6C` | 功能 | springGreen，diag.ok（共用） |
| `--warn` | `#FF9E3B` | 功能 | roninYellow，diag.warning |
| `--danger` | `#E82424` | 功能 | samuraiRed，diag.error |
| `--info` | `#658594` | 功能 | dragonBlue，diag.info |
| `--queued` | `#938AA9` | 功能 | springViolet1（共用） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#737c73` | 语法 | dragonAsh |
| `--syntax-keyword` | `#8992a7` | 语法 | dragonViolet |
| `--syntax-string` | `#8a9a7b` | 语法 | dragonGreen2 |
| `--syntax-literal` | `#a292a3` | 语法 | dragonPink（number） |
| `--syntax-title` | `#8ba4b0` | 语法 | dragonBlue2（fun） |
| `--syntax-attr` | `#c4b28a` | 语法 | dragonYellow（identifier） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#98BB6C` | 派生 | 同 ok |
| `--warn-fill` | `#FF9E3B` | 派生 | 同 warn |
| `--danger-fill` | `#E82424` | 派生 | 同 danger |
| `--info-fill` | `#658594` | 派生 | 同 info |
| `--queued-fill` | `#938AA9` | 派生 | 同 queued |
