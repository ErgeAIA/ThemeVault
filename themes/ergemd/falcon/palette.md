# ergemd/falcon 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/falcon.css`（dark）。
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
| `--text-heading` | `#EBEBEB` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 | 继承 dark-base |
| `--scrollbar-thumb` | `#585860` | 中性 | 继承 dark-base |
| `--scrollbar-thumb-hover` | `#787880` | 中性 | 继承 dark-base |
| `--reader-bg-elevated` | `#262630` | 中性 | 继承 dark-base |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.80)` | 中性 | 继承 dark-base |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#65BCD9` | 强调 |  |
| `--accent-pink` | `#FF79C6` | 强调 |  |
| `--accent-purple` | `#9876AA` | 强调 |  |
| `--accent-green` | `#50A14F` | 强调 |  |
| `--accent-yellow` | `#DFAE64` | 强调 |  |
| `--accent-orange` | `#C58564` | 强调 |  |
| `--accent-red` | `#FF5555` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#65BCD9` | 强调 |  |
| `--brand-secondary` | `#9876AA` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #65BCD9, #9876AA)` | 强调 |  |
| `--brand-logo` | `#65BCD9` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#7090c0` | 功能 |  |
| `--obsidian-callout-abstract` | `#6090c0` | 功能 |  |
| `--obsidian-callout-info` | `#6080c0` | 功能 |  |
| `--obsidian-callout-todo` | `#6080c0` | 功能 |  |
| `--obsidian-callout-tip` | `#6090a0` | 功能 |  |
| `--obsidian-callout-success` | `#60a080` | 功能 |  |
| `--obsidian-callout-question` | `#70a060` | 功能 |  |
| `--obsidian-callout-warning` | `#c09050` | 功能 |  |
| `--obsidian-callout-failure` | `#c06060` | 功能 |  |
| `--obsidian-callout-danger` | `#c04040` | 功能 |  |
| `--obsidian-callout-bug` | `#b05070` | 功能 |  |
| `--obsidian-callout-example` | `#8060b0` | 功能 |  |
| `--obsidian-callout-quote` | `#808080` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#9876AA` | 语法 |  |
| `--code-string` | `#50A14F` | 语法 |  |
| `--code-number` | `#DFAE64` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#65BCD9` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#C58564` | 语法 |  |
| `--copy-success` | `#50A14F` | 语法 |  |

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
| `--chart-fill-1` | `#2C2E40` | 派生 |  |
| `--chart-fill-2` | `#302A40` | 派生 |  |
| `--chart-fill-3` | `#2C3040` | 派生 |  |
| `--chart-fill-4` | `#283040` | 派生 |  |
| `--chart-fill-5` | `#302C48` | 派生 |  |
| `--chart-fill-6` | `#262838` | 派生 |  |
| `--chart-fill-7` | `#2C2C40` | 派生 |  |
| `--chart-stroke-0` | `#65BCD9` | 派生 |  |
| `--chart-stroke-1` | `#9876AA` | 派生 |  |
| `--chart-stroke-2` | `#50A14F` | 派生 |  |
| `--chart-stroke-3` | `#DFAE64` | 派生 |  |
| `--chart-stroke-4` | `#C58564` | 派生 |  |
| `--chart-stroke-5` | `#FF79C6` | 派生 |  |
| `--chart-stroke-6` | `#7DCFFF` | 派生 |  |
| `--chart-stroke-7` | `#FF5555` | 派生 |  |
| `--chart-series-0` | `#65BCD9` | 派生 |  |
| `--chart-series-1` | `#50A14F` | 派生 |  |
| `--chart-series-2` | `#C58564` | 派生 |  |
| `--chart-series-3` | `#9876AA` | 派生 |  |
| `--chart-series-4` | `#DFAE64` | 派生 |  |
| `--chart-series-5` | `#FF79C6` | 派生 |  |
| `--chart-series-6` | `#7DCFFF` | 派生 |  |
| `--chart-series-7` | `#FF5555` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #65BCD9, #9876AA, #FF79C6)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `101, 188, 217` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `255, 121, 198` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `152, 118, 170` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `80, 161, 79` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `223, 174, 100` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `197, 133, 100` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `255, 85, 85` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `101, 188, 217` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `152, 118, 170` | 派生 | RGB 输入变量（供 rgba 派生） |
