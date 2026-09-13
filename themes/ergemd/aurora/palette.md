# ergemd/aurora 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/aurora.css`（dark）。
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
| `--text-primary` | `#E0E0E0` | 中性 |  |
| `--text-secondary` | `#A6A6A6` | 中性 |  |
| `--text-muted` | `#808080` | 中性 |  |
| `--text-heading` | `#EBEBEB` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 |  |
| `--scrollbar-thumb` | `#586575` | 中性 |  |
| `--scrollbar-thumb-hover` | `#768696` | 中性 |  |
| `--reader-bg-elevated` | `#262630` | 中性 |  |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.80)` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#4FC3F7` | 强调 |  |
| `--accent-pink` | `#F48FB1` | 强调 |  |
| `--accent-purple` | `#C586C0` | 强调 |  |
| `--accent-green` | `#6A9955` | 强调 |  |
| `--accent-yellow` | `#DCDCAA` | 强调 |  |
| `--accent-orange` | `#CE9178` | 强调 |  |
| `--accent-red` | `#F44747` | 强调 |  |
| `--accent-blue` | `#569CD6` | 强调 |  |
| `--brand-primary` | `#4FC3F7` | 强调 |  |
| `--brand-secondary` | `#C586C0` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #4FC3F7, #C586C0)` | 强调 |  |
| `--brand-logo` | `#4FC3F7` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#5ec4c4` | 功能 |  |
| `--obsidian-callout-abstract` | `#4dd8c0` | 功能 |  |
| `--obsidian-callout-info` | `#4dd8b8` | 功能 |  |
| `--obsidian-callout-todo` | `#4dd8b8` | 功能 |  |
| `--obsidian-callout-tip` | `#50d8a0` | 功能 |  |
| `--obsidian-callout-success` | `#50d890` | 功能 |  |
| `--obsidian-callout-question` | `#80d850` | 功能 |  |
| `--obsidian-callout-warning` | `#d8a050` | 功能 |  |
| `--obsidian-callout-failure` | `#d86060` | 功能 |  |
| `--obsidian-callout-danger` | `#d84040` | 功能 |  |
| `--obsidian-callout-bug` | `#d85080` | 功能 |  |
| `--obsidian-callout-example` | `#9070d8` | 功能 |  |
| `--obsidian-callout-quote` | `#909090` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#569CD6` | 语法 |  |
| `--code-string` | `#6A9955` | 语法 |  |
| `--code-number` | `#CE9178` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#4FC3F7` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#CE9178` | 语法 |  |
| `--copy-success` | `#6A9955` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#E0E0E0` | 派生 |  |
| `--chart-text-muted` | `#A6A6A6` | 派生 |  |
| `--chart-edge` | `#6B7280` | 派生 |  |
| `--chart-label-bg` | `#282830` | 派生 |  |
| `--chart-surface-1` | `#2E2E38` | 派生 |  |
| `--chart-surface-2` | `#282830` | 派生 |  |
| `--chart-surface-3` | `#262630` | 派生 |  |
| `--chart-fill-0` | `#2A3040` | 派生 |  |
| `--chart-fill-1` | `#2A3545` | 派生 |  |
| `--chart-fill-2` | `#2A3848` | 派生 |  |
| `--chart-fill-3` | `#304045` | 派生 |  |
| `--chart-fill-4` | `#283040` | 派生 |  |
| `--chart-fill-5` | `#2E3548` | 派生 |  |
| `--chart-fill-6` | `#252838` | 派生 |  |
| `--chart-fill-7` | `#303038` | 派生 |  |
| `--chart-stroke-0` | `#4FC3F7` | 派生 |  |
| `--chart-stroke-1` | `#569CD6` | 派生 |  |
| `--chart-stroke-2` | `#6A9955` | 派生 |  |
| `--chart-stroke-3` | `#DCDCAA` | 派生 |  |
| `--chart-stroke-4` | `#CE9178` | 派生 |  |
| `--chart-stroke-5` | `#C586C0` | 派生 |  |
| `--chart-stroke-6` | `#F48FB1` | 派生 |  |
| `--chart-stroke-7` | `#F44747` | 派生 |  |
| `--chart-series-0` | `#4FC3F7` | 派生 |  |
| `--chart-series-1` | `#6A9955` | 派生 |  |
| `--chart-series-2` | `#DCDCAA` | 派生 |  |
| `--chart-series-3` | `#F48FB1` | 派生 |  |
| `--chart-series-4` | `#569CD6` | 派生 |  |
| `--chart-series-5` | `#CE9178` | 派生 |  |
| `--chart-series-6` | `#C586C0` | 派生 |  |
| `--chart-series-7` | `#F44747` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #4FC3F7, #C586C0, #F48FB1)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(79, 195, 247, 0.15), rgba(197, 133, 192, 0.10))` | 派生 |  |
| `--logo-border` | `rgba(79, 195, 247, 0.15)` | 派生 |  |
| `--accent-cyan-rgb` | `79, 195, 247` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `244, 143, 177` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `197, 133, 192` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `106, 153, 85` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `220, 220, 170` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `206, 145, 120` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `244, 71, 71` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `86, 156, 214` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-primary-rgb` | `79, 195, 247` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `197, 133, 192` | 派生 | RGB 输入变量（供 rgba 派生） |
