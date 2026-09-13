# ergemd/ocean 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/ocean.css`（dark）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。
> 未在主题文件直接定义、但由 base 层提供的角色，标注「继承 base」并给出 base 值。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg-page` | `#282830` | 中性 | 继承 dark-base |
| `--bg-reader` | `#2E2E38` | 中性 | 继承 dark-base |
| `--bg-sidebar` | `#222230` | 中性 | 继承 dark-base |
| `--bg-code` | `#262630` | 中性 | 继承 dark-base |
| `--bg-secondary` | `#2E2E38` | 中性 | 继承 dark-base |
| `--bg-tertiary` | `#262630` | 中性 | 继承 dark-base |
| `--text-primary` | `#E0E0E0` | 中性 | 继承 dark-base |
| `--text-secondary` | `#A6A6A6` | 中性 | 继承 dark-base |
| `--text-muted` | `#808080` | 中性 | 继承 dark-base |
| `--text-heading` | `#FAFAFA` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 | 继承 dark-base |
| `--scrollbar-thumb` | `#585860` | 中性 | 继承 dark-base |
| `--scrollbar-thumb-hover` | `#787880` | 中性 | 继承 dark-base |
| `--reader-bg-elevated` | `#262630` | 中性 | 继承 dark-base |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.80)` | 中性 | 继承 dark-base |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#26C6DA` | 强调 |  |
| `--accent-pink` | `#F48FB1` | 强调 |  |
| `--accent-purple` | `#7E57C2` | 强调 |  |
| `--accent-green` | `#66BB6A` | 强调 |  |
| `--accent-yellow` | `#FFEE58` | 强调 |  |
| `--accent-orange` | `#FFA726` | 强调 |  |
| `--accent-red` | `#EF5350` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#26C6DA` | 强调 |  |
| `--brand-secondary` | `#7E57C2` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #26C6DA, #7E57C2)` | 强调 |  |
| `--brand-logo` | `#26C6DA` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#4090d0` | 功能 |  |
| `--obsidian-callout-abstract` | `#3080d0` | 功能 |  |
| `--obsidian-callout-info` | `#3080c0` | 功能 |  |
| `--obsidian-callout-todo` | `#3080c0` | 功能 |  |
| `--obsidian-callout-tip` | `#3090b0` | 功能 |  |
| `--obsidian-callout-success` | `#30a090` | 功能 |  |
| `--obsidian-callout-question` | `#50a070` | 功能 |  |
| `--obsidian-callout-warning` | `#d09040` | 功能 |  |
| `--obsidian-callout-failure` | `#d06060` | 功能 |  |
| `--obsidian-callout-danger` | `#d04040` | 功能 |  |
| `--obsidian-callout-bug` | `#c05070` | 功能 |  |
| `--obsidian-callout-example` | `#7060c0` | 功能 |  |
| `--obsidian-callout-quote` | `#708080` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#7E57C2` | 语法 |  |
| `--code-string` | `#66BB6A` | 语法 |  |
| `--code-number` | `#FFEE58` | 语法 |  |
| `--code-comment` | `#808096` | 语法 |  |
| `--code-function` | `#42A5F5` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#FFA726` | 语法 |  |
| `--copy-success` | `#66BB6A` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#E0E0E0` | 派生 | 继承 dark-base |
| `--chart-text-muted` | `#A6A6A6` | 派生 | 继承 dark-base |
| `--chart-edge` | `#808080` | 派生 | 继承 dark-base |
| `--chart-label-bg` | `#282830` | 派生 | 继承 dark-base |
| `--chart-surface-1` | `#2E2E38` | 派生 | 继承 dark-base |
| `--chart-surface-2` | `#282830` | 派生 | 继承 dark-base |
| `--chart-surface-3` | `#262630` | 派生 | 继承 dark-base |
| `--chart-fill-0` | `#2A2C38` | 派生 |  |
| `--chart-fill-1` | `#2C3040` | 派生 |  |
| `--chart-fill-2` | `#282C40` | 派生 |  |
| `--chart-fill-3` | `#2C3840` | 派生 |  |
| `--chart-fill-4` | `#283040` | 派生 |  |
| `--chart-fill-5` | `#2C3048` | 派生 |  |
| `--chart-fill-6` | `#263038` | 派生 |  |
| `--chart-fill-7` | `#283040` | 派生 |  |
| `--chart-stroke-0` | `#42A5F5` | 派生 |  |
| `--chart-stroke-1` | `#26C6DA` | 派生 |  |
| `--chart-stroke-2` | `#80DEEA` | 派生 |  |
| `--chart-stroke-3` | `#66BB6A` | 派生 |  |
| `--chart-stroke-4` | `#7E57C2` | 派生 |  |
| `--chart-stroke-5` | `#FFA726` | 派生 |  |
| `--chart-stroke-6` | `#F48FB1` | 派生 |  |
| `--chart-stroke-7` | `#EF5350` | 派生 |  |
| `--chart-series-0` | `#42A5F5` | 派生 |  |
| `--chart-series-1` | `#26C6DA` | 派生 |  |
| `--chart-series-2` | `#80DEEA` | 派生 |  |
| `--chart-series-3` | `#66BB6A` | 派生 |  |
| `--chart-series-4` | `#7E57C2` | 派生 |  |
| `--chart-series-5` | `#FFA726` | 派生 |  |
| `--chart-series-6` | `#F48FB1` | 派生 |  |
| `--chart-series-7` | `#FFEE58` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #26C6DA, #7E57C2, #F48FB1)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `38, 198, 218` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `244, 143, 177` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `126, 87, 194` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `102, 187, 106` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `255, 238, 88` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 167, 38` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `239, 83, 80` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `38, 198, 218` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `126, 87, 194` | 派生 | RGB 输入变量（供 rgba 派生） |
