# ergemd/desert-sunset 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/desert-sunset.css`（dark）。
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
| `--text-heading` | `#F0E8E0` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 | 继承 dark-base |
| `--scrollbar-thumb` | `#585860` | 中性 | 继承 dark-base |
| `--scrollbar-thumb-hover` | `#787880` | 中性 | 继承 dark-base |
| `--reader-bg-elevated` | `#262630` | 中性 | 继承 dark-base |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.80)` | 中性 | 继承 dark-base |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#4DD0E1` | 强调 |  |
| `--accent-pink` | `#F48FB1` | 强调 |  |
| `--accent-purple` | `#CE93D8` | 强调 |  |
| `--accent-green` | `#81C784` | 强调 |  |
| `--accent-yellow` | `#FFD54F` | 强调 |  |
| `--accent-orange` | `#FFB347` | 强调 |  |
| `--accent-red` | `#E57373` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#4DD0E1` | 强调 |  |
| `--brand-secondary` | `#CE93D8` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #4DD0E1, #CE93D8)` | 强调 |  |
| `--brand-logo` | `#4DD0E1` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#d09050` | 功能 |  |
| `--obsidian-callout-abstract` | `#c08050` | 功能 |  |
| `--obsidian-callout-info` | `#b08060` | 功能 |  |
| `--obsidian-callout-todo` | `#b08060` | 功能 |  |
| `--obsidian-callout-tip` | `#c09050` | 功能 |  |
| `--obsidian-callout-success` | `#a0b060` | 功能 |  |
| `--obsidian-callout-question` | `#90b050` | 功能 |  |
| `--obsidian-callout-warning` | `#d0a040` | 功能 |  |
| `--obsidian-callout-failure` | `#d07050` | 功能 |  |
| `--obsidian-callout-danger` | `#d05040` | 功能 |  |
| `--obsidian-callout-bug` | `#c06060` | 功能 |  |
| `--obsidian-callout-example` | `#a070c0` | 功能 |  |
| `--obsidian-callout-quote` | `#a09090` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#CE93D8` | 语法 |  |
| `--code-string` | `#81C784` | 语法 |  |
| `--code-number` | `#FFD54F` | 语法 |  |
| `--code-comment` | `#808070` | 语法 |  |
| `--code-function` | `#FFB347` | 语法 |  |
| `--code-text` | `#E0D6C8` | 语法 |  |
| `--code-label` | `#FFB347` | 语法 |  |
| `--copy-success` | `#81C784` | 语法 |  |

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
| `--chart-fill-0` | `#302830` | 派生 |  |
| `--chart-fill-1` | `#342C38` | 派生 |  |
| `--chart-fill-2` | `#302C38` | 派生 |  |
| `--chart-fill-3` | `#382C30` | 派生 |  |
| `--chart-fill-4` | `#342830` | 派生 |  |
| `--chart-fill-5` | `#302838` | 派生 |  |
| `--chart-fill-6` | `#2C3030` | 派生 |  |
| `--chart-fill-7` | `#303030` | 派生 |  |
| `--chart-stroke-0` | `#FFB347` | 派生 |  |
| `--chart-stroke-1` | `#E07A5F` | 派生 |  |
| `--chart-stroke-2` | `#F2CC8F` | 派生 |  |
| `--chart-stroke-3` | `#4DD0E1` | 派生 |  |
| `--chart-stroke-4` | `#81C784` | 派生 |  |
| `--chart-stroke-5` | `#CE93D8` | 派生 |  |
| `--chart-stroke-6` | `#FFD54F` | 派生 |  |
| `--chart-stroke-7` | `#F48FB1` | 派生 |  |
| `--chart-series-0` | `#FFB347` | 派生 |  |
| `--chart-series-1` | `#81C784` | 派生 |  |
| `--chart-series-2` | `#E07A5F` | 派生 |  |
| `--chart-series-3` | `#4DD0E1` | 派生 |  |
| `--chart-series-4` | `#F2CC8F` | 派生 |  |
| `--chart-series-5` | `#CE93D8` | 派生 |  |
| `--chart-series-6` | `#FFD54F` | 派生 |  |
| `--chart-series-7` | `#F48FB1` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #4DD0E1, #CE93D8, #F48FB1)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `77, 208, 225` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `244, 143, 177` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `206, 147, 216` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `129, 199, 132` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `255, 213, 79` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 179, 71` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `229, 115, 115` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `77, 208, 225` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `206, 147, 216` | 派生 | RGB 输入变量（供 rgba 派生） |
