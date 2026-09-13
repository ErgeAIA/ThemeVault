# ergemd/monochrome 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/monochrome.css`（dark）。
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
| `--accent-cyan` | `#B0B0B0` | 强调 |  |
| `--accent-pink` | `#C0C0C0` | 强调 |  |
| `--accent-purple` | `#A0A0A0` | 强调 |  |
| `--accent-green` | `#909090` | 强调 |  |
| `--accent-yellow` | `#D0D0D0` | 强调 |  |
| `--accent-orange` | `#B8B8B8` | 强调 |  |
| `--accent-red` | `#A8A8A8` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#B0B0B0` | 强调 |  |
| `--brand-secondary` | `#8A8A8A` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #B0B0B0, #8A8A8A)` | 强调 |  |
| `--brand-logo` | `#B0B0B0` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#8888aa` | 功能 |  |
| `--obsidian-callout-abstract` | `#7777aa` | 功能 |  |
| `--obsidian-callout-info` | `#7777aa` | 功能 |  |
| `--obsidian-callout-todo` | `#7777aa` | 功能 |  |
| `--obsidian-callout-tip` | `#8888aa` | 功能 |  |
| `--obsidian-callout-success` | `#8888aa` | 功能 |  |
| `--obsidian-callout-question` | `#8888aa` | 功能 |  |
| `--obsidian-callout-warning` | `#aa8877` | 功能 |  |
| `--obsidian-callout-failure` | `#aa7777` | 功能 |  |
| `--obsidian-callout-danger` | `#aa6666` | 功能 |  |
| `--obsidian-callout-bug` | `#aa6688` | 功能 |  |
| `--obsidian-callout-example` | `#8877aa` | 功能 |  |
| `--obsidian-callout-quote` | `#777777` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#A0A0A0` | 语法 |  |
| `--code-string` | `#C8C8C8` | 语法 |  |
| `--code-number` | `#D8D8D8` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#B0B0B0` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#B8B8B8` | 语法 |  |
| `--copy-success` | `#909090` | 语法 |  |

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
| `--chart-fill-0` | `#2A2A2A` | 派生 |  |
| `--chart-fill-1` | `#303030` | 派生 |  |
| `--chart-fill-2` | `#282828` | 派生 |  |
| `--chart-fill-3` | `#323232` | 派生 |  |
| `--chart-fill-4` | `#2C2C2C` | 派生 |  |
| `--chart-fill-5` | `#303030` | 派生 |  |
| `--chart-fill-6` | `#262626` | 派生 |  |
| `--chart-fill-7` | `#2E2E2E` | 派生 |  |
| `--chart-stroke-0` | `#B0B0B0` | 派生 |  |
| `--chart-stroke-1` | `#A0A0A0` | 派生 |  |
| `--chart-stroke-2` | `#909090` | 派生 |  |
| `--chart-stroke-3` | `#C0C0C0` | 派生 |  |
| `--chart-stroke-4` | `#808080` | 派生 |  |
| `--chart-stroke-5` | `#D0D0D0` | 派生 |  |
| `--chart-stroke-6` | `#707070` | 派生 |  |
| `--chart-stroke-7` | `#B8B8B8` | 派生 |  |
| `--chart-series-0` | `#B0B0B0` | 派生 |  |
| `--chart-series-1` | `#909090` | 派生 |  |
| `--chart-series-2` | `#C0C0C0` | 派生 |  |
| `--chart-series-3` | `#808080` | 派生 |  |
| `--chart-series-4` | `#A0A0A0` | 派生 |  |
| `--chart-series-5` | `#D0D0D0` | 派生 |  |
| `--chart-series-6` | `#707070` | 派生 |  |
| `--chart-series-7` | `#E0E0E0` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #B0B0B0, #8A8A8A, #A0A0A0)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `176, 176, 176` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `192, 192, 192` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `160, 160, 160` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `144, 144, 144` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `208, 208, 208` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `184, 184, 184` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `168, 168, 168` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `176, 176, 176` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `138, 138, 138` | 派生 | RGB 输入变量（供 rgba 派生） |
