# ergemd/tokyo-night 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/tokyo-night.css`（dark）。
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
| `--accent-cyan` | `#7DCFFF` | 强调 |  |
| `--accent-pink` | `#F7768E` | 强调 |  |
| `--accent-purple` | `#BB9AF7` | 强调 |  |
| `--accent-green` | `#9ECE6A` | 强调 |  |
| `--accent-yellow` | `#E0AF68` | 强调 |  |
| `--accent-orange` | `#FF9E64` | 强调 |  |
| `--accent-red` | `#F7768E` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#7DCFFF` | 强调 |  |
| `--brand-secondary` | `#BB9AF7` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #7DCFFF, #BB9AF7)` | 强调 |  |
| `--brand-logo` | `#7DCFFF` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#7070d0` | 功能 |  |
| `--obsidian-callout-abstract` | `#6060d0` | 功能 |  |
| `--obsidian-callout-info` | `#6070c0` | 功能 |  |
| `--obsidian-callout-todo` | `#6070c0` | 功能 |  |
| `--obsidian-callout-tip` | `#6080b0` | 功能 |  |
| `--obsidian-callout-success` | `#60a090` | 功能 |  |
| `--obsidian-callout-question` | `#70a070` | 功能 |  |
| `--obsidian-callout-warning` | `#d09050` | 功能 |  |
| `--obsidian-callout-failure` | `#d06060` | 功能 |  |
| `--obsidian-callout-danger` | `#d04050` | 功能 |  |
| `--obsidian-callout-bug` | `#c05070` | 功能 |  |
| `--obsidian-callout-example` | `#9060c0` | 功能 |  |
| `--obsidian-callout-quote` | `#808080` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#BB9AF7` | 语法 |  |
| `--code-string` | `#9ECE6A` | 语法 |  |
| `--code-number` | `#FF9E64` | 语法 |  |
| `--code-comment` | `#909096` | 语法 |  |
| `--code-function` | `#7DCFFF` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#FF9E64` | 语法 |  |
| `--copy-success` | `#9ECE6A` | 语法 |  |

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
| `--chart-fill-0` | `#2A2A38` | 派生 |  |
| `--chart-fill-1` | `#2C2C40` | 派生 |  |
| `--chart-fill-2` | `#302A40` | 派生 |  |
| `--chart-fill-3` | `#2C3040` | 派生 |  |
| `--chart-fill-4` | `#283040` | 派生 |  |
| `--chart-fill-5` | `#2C2A48` | 派生 |  |
| `--chart-fill-6` | `#262838` | 派生 |  |
| `--chart-fill-7` | `#2A2C40` | 派生 |  |
| `--chart-stroke-0` | `#7AA2F7` | 派生 |  |
| `--chart-stroke-1` | `#BB9AF7` | 派生 |  |
| `--chart-stroke-2` | `#7DCFFF` | 派生 |  |
| `--chart-stroke-3` | `#9ECE6A` | 派生 |  |
| `--chart-stroke-4` | `#E0AF68` | 派生 |  |
| `--chart-stroke-5` | `#F7768E` | 派生 |  |
| `--chart-stroke-6` | `#FF9E64` | 派生 |  |
| `--chart-stroke-7` | `#C586C0` | 派生 |  |
| `--chart-series-0` | `#7AA2F7` | 派生 |  |
| `--chart-series-1` | `#BB9AF7` | 派生 |  |
| `--chart-series-2` | `#7DCFFF` | 派生 |  |
| `--chart-series-3` | `#9ECE6A` | 派生 |  |
| `--chart-series-4` | `#E0AF68` | 派生 |  |
| `--chart-series-5` | `#F7768E` | 派生 |  |
| `--chart-series-6` | `#FF9E64` | 派生 |  |
| `--chart-series-7` | `#C586C0` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #7DCFFF, #BB9AF7, #F7768E)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `125, 207, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `247, 118, 142` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `187, 154, 247` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `158, 206, 106` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `224, 175, 104` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 158, 100` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `247, 118, 142` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `125, 207, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `187, 154, 247` | 派生 | RGB 输入变量（供 rgba 派生） |
