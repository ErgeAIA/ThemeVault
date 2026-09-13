# ergemd/light 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/light.css`（light）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。
> 未在主题文件直接定义、但由 base 层提供的角色，标注「继承 base」并给出 base 值。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg-page` | `#F7F7F7` | 中性 |  |
| `--bg-reader` | `#FFFFFF` | 中性 |  |
| `--bg-sidebar` | `#F2F2F2` | 中性 |  |
| `--bg-code` | `#F8F8F8` | 中性 |  |
| `--bg-secondary` | `#FEFEFE` | 中性 |  |
| `--bg-tertiary` | `#F0F0F0` | 中性 |  |
| `--text-primary` | `#2D2D2D` | 中性 |  |
| `--text-secondary` | `#4A4A4A` | 中性 |  |
| `--text-muted` | `#6E6E6E` | 中性 |  |
| `--text-heading` | `#222222` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 |  |
| `--scrollbar-thumb` | `#C4C4C4` | 中性 |  |
| `--scrollbar-thumb-hover` | `#A8A8A8` | 中性 |  |
| `--reader-bg-elevated` | `#F2F2F2` | 中性 |  |
| `--status-bar-bg` | `rgba(255, 255, 255, 0.60)` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#0C9CB8` | 强调 |  |
| `--accent-pink` | `#DB2777` | 强调 |  |
| `--accent-purple` | `#7B38ED` | 强调 |  |
| `--accent-green` | `#179E49` | 强调 |  |
| `--accent-yellow` | `#B87F00` | 强调 |  |
| `--accent-orange` | `#E35410` | 强调 |  |
| `--accent-red` | `#D92323` | 强调 |  |
| `--accent-blue` | `#2666F0` | 强调 |  |
| `--brand-primary` | `#2666F0` | 强调 |  |
| `--brand-secondary` | `#7B38ED` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #2666F0, #7B38ED)` | 强调 |  |
| `--brand-logo` | `#2666F0` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#448aff` | 功能 |  |
| `--obsidian-callout-abstract` | `#00b0ff` | 功能 |  |
| `--obsidian-callout-info` | `#00b8d4` | 功能 |  |
| `--obsidian-callout-todo` | `#00b8d4` | 功能 |  |
| `--obsidian-callout-tip` | `#00bfa5` | 功能 |  |
| `--obsidian-callout-success` | `#00c853` | 功能 |  |
| `--obsidian-callout-question` | `#64dd17` | 功能 |  |
| `--obsidian-callout-warning` | `#ff9100` | 功能 |  |
| `--obsidian-callout-failure` | `#ff5252` | 功能 |  |
| `--obsidian-callout-danger` | `#ff1744` | 功能 |  |
| `--obsidian-callout-bug` | `#f50057` | 功能 |  |
| `--obsidian-callout-example` | `#7c4dff` | 功能 |  |
| `--obsidian-callout-quote` | `#9e9e9e` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#2563EB` | 语法 |  |
| `--code-string` | `#169A47` | 语法 |  |
| `--code-number` | `#DF5010` | 语法 |  |
| `--code-comment` | `#8F95A0` | 语法 |  |
| `--code-function` | `#7B38ED` | 语法 |  |
| `--code-text` | `#2D2D2D` | 语法 |  |
| `--code-label` | `#E35410` | 语法 |  |
| `--copy-success` | `#179E49` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#2D2D2D` | 派生 |  |
| `--chart-text-muted` | `#6E6E6E` | 派生 |  |
| `--chart-edge` | `#8F95A0` | 派生 |  |
| `--chart-label-bg` | `#F8F8F8` | 派生 |  |
| `--chart-surface-1` | `#FFFFFF` | 派生 |  |
| `--chart-surface-2` | `#F8F8F8` | 派生 |  |
| `--chart-surface-3` | `#F0F0F0` | 派生 |  |
| `--chart-fill-0` | `#EEF4FF` | 派生 |  |
| `--chart-fill-1` | `#F3EEFF` | 派生 |  |
| `--chart-fill-2` | `#EEFAF7` | 派生 |  |
| `--chart-fill-3` | `#FFF8EE` | 派生 |  |
| `--chart-fill-4` | `#EEFFF3` | 派生 |  |
| `--chart-fill-5` | `#FFEEF3` | 派生 |  |
| `--chart-fill-6` | `#F8EEFF` | 派生 |  |
| `--chart-fill-7` | `#F5F5F5` | 派生 |  |
| `--chart-stroke-0` | `#2666F0` | 派生 |  |
| `--chart-stroke-1` | `#7B38ED` | 派生 |  |
| `--chart-stroke-2` | `#179E49` | 派生 |  |
| `--chart-stroke-3` | `#B87F00` | 派生 |  |
| `--chart-stroke-4` | `#DB2777` | 派生 |  |
| `--chart-stroke-5` | `#E35410` | 派生 |  |
| `--chart-stroke-6` | `#0C9CB8` | 派生 |  |
| `--chart-stroke-7` | `#6B7280` | 派生 |  |
| `--chart-series-0` | `#2666F0` | 派生 |  |
| `--chart-series-1` | `#179E49` | 派生 |  |
| `--chart-series-2` | `#B87F00` | 派生 |  |
| `--chart-series-3` | `#DB2777` | 派生 |  |
| `--chart-series-4` | `#7B38ED` | 派生 |  |
| `--chart-series-5` | `#E35410` | 派生 |  |
| `--chart-series-6` | `#0C9CB8` | 派生 |  |
| `--chart-series-7` | `#D92323` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, transparent 0%, rgba(38, 102, 240, 0.3) 15%, rgba(123, 56, 237, 0.15) 50%, rgba(227, 84, 16, 0.1) 85%, transparent 100%)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(38, 102, 240, 0.10), rgba(123, 56, 237, 0.08))` | 派生 | 继承 light-base |
| `--logo-border` | `rgba(38, 102, 240, 0.15)` | 派生 | 继承 light-base |
| `--accent-cyan-rgb` | `12, 156, 184` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `219, 39, 119` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `123, 56, 237` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `23, 158, 73` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `184, 127, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `227, 84, 16` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `217, 35, 35` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `38, 102, 240` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-primary-rgb` | `38, 102, 240` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `123, 56, 237` | 派生 | RGB 输入变量（供 rgba 派生） |
