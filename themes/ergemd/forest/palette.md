# ergemd/forest 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/forest.css`（dark）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。
> 未在主题文件直接定义、但由 base 层提供的角色，标注「继承 base」并给出 base 值。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg-page` | `#1A2820` | 中性 |  |
| `--bg-reader` | `#222E28` | 中性 |  |
| `--bg-sidebar` | `#1A2420` | 中性 |  |
| `--bg-code` | `#1E2A24` | 中性 |  |
| `--bg-secondary` | `#222E28` | 中性 |  |
| `--bg-tertiary` | `#1E2A24` | 中性 |  |
| `--text-primary` | `#D8E8D8` | 中性 |  |
| `--text-secondary` | `#8AAA80` | 中性 |  |
| `--text-muted` | `#808870` | 中性 |  |
| `--text-heading` | `#E8F0E8` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 |  |
| `--scrollbar-thumb` | `#506858` | 中性 |  |
| `--scrollbar-thumb-hover` | `#708878` | 中性 |  |
| `--reader-bg-elevated` | `#1E2A24` | 中性 |  |
| `--status-bar-bg` | `rgba(34, 46, 40, 0.80)` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#4DB6AC` | 强调 |  |
| `--accent-pink` | `#F48FB1` | 强调 |  |
| `--accent-purple` | `#9575CD` | 强调 |  |
| `--accent-green` | `#50A14F` | 强调 |  |
| `--accent-yellow` | `#C0CA33` | 强调 |  |
| `--accent-orange` | `#FFA726` | 强调 |  |
| `--accent-red` | `#E57373` | 强调 |  |
| `--accent-blue` | `#4DB6AC` | 强调 |  |
| `--brand-primary` | `#66BB6A` | 强调 |  |
| `--brand-secondary` | `#9575CD` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #66BB6A, #9575CD)` | 强调 |  |
| `--brand-logo` | `#66BB6A` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#50a070` | 功能 |  |
| `--obsidian-callout-abstract` | `#40a080` | 功能 |  |
| `--obsidian-callout-info` | `#409080` | 功能 |  |
| `--obsidian-callout-todo` | `#409080` | 功能 |  |
| `--obsidian-callout-tip` | `#50a070` | 功能 |  |
| `--obsidian-callout-success` | `#50b060` | 功能 |  |
| `--obsidian-callout-question` | `#70b040` | 功能 |  |
| `--obsidian-callout-warning` | `#c0a040` | 功能 |  |
| `--obsidian-callout-failure` | `#c06050` | 功能 |  |
| `--obsidian-callout-danger` | `#c04040` | 功能 |  |
| `--obsidian-callout-bug` | `#b05060` | 功能 |  |
| `--obsidian-callout-example` | `#7060b0` | 功能 |  |
| `--obsidian-callout-quote` | `#707070` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#9575CD` | 语法 |  |
| `--code-string` | `#50A14F` | 语法 |  |
| `--code-number` | `#C0CA33` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#66BB6A` | 语法 |  |
| `--code-text` | `#D8E8D8` | 语法 |  |
| `--code-label` | `#FFA726` | 语法 |  |
| `--copy-success` | `#50A14F` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#D8E8D8` | 派生 |  |
| `--chart-text-muted` | `#8AAA80` | 派生 |  |
| `--chart-edge` | `#808870` | 派生 |  |
| `--chart-label-bg` | `#222E28` | 派生 |  |
| `--chart-surface-1` | `#222E28` | 派生 |  |
| `--chart-surface-2` | `#1E2A24` | 派生 |  |
| `--chart-surface-3` | `#1A2820` | 派生 |  |
| `--chart-fill-0` | `#2A3830` | 派生 |  |
| `--chart-fill-1` | `#3A4838` | 派生 |  |
| `--chart-fill-2` | `#4A5840` | 派生 |  |
| `--chart-fill-3` | `#5A6848` | 派生 |  |
| `--chart-fill-4` | `#4A7850` | 派生 |  |
| `--chart-fill-5` | `#3A6858` | 派生 |  |
| `--chart-fill-6` | `#385850` | 派生 |  |
| `--chart-fill-7` | `#385860` | 派生 |  |
| `--chart-stroke-0` | `#66BB6A` | 派生 |  |
| `--chart-stroke-1` | `#81C784` | 派生 |  |
| `--chart-stroke-2` | `#AED581` | 派生 |  |
| `--chart-stroke-3` | `#C0CA33` | 派生 |  |
| `--chart-stroke-4` | `#4DB6AC` | 派生 |  |
| `--chart-stroke-5` | `#9575CD` | 派生 |  |
| `--chart-stroke-6` | `#F48FB1` | 派生 |  |
| `--chart-stroke-7` | `#FFA726` | 派生 |  |
| `--chart-series-0` | `#66BB6A` | 派生 |  |
| `--chart-series-1` | `#AED581` | 派生 |  |
| `--chart-series-2` | `#C0CA33` | 派生 |  |
| `--chart-series-3` | `#4DB6AC` | 派生 |  |
| `--chart-series-4` | `#9575CD` | 派生 |  |
| `--chart-series-5` | `#F48FB1` | 派生 |  |
| `--chart-series-6` | `#FFA726` | 派生 |  |
| `--chart-series-7` | `#81C784` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #66BB6A, #9575CD, #4DB6AC)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `77, 182, 172` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `244, 143, 177` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `149, 117, 205` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `80, 161, 79` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `192, 202, 51` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 167, 38` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `229, 115, 115` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `77, 182, 172` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-primary-rgb` | `102, 187, 106` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `149, 117, 205` | 派生 | RGB 输入变量（供 rgba 派生） |
