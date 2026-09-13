# ergemd/cherry-blossom 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/cherry-blossom.css`（dark）。
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
| `--accent-cyan` | `#B39DDB` | 强调 |  |
| `--accent-pink` | `#F48FB1` | 强调 |  |
| `--accent-purple` | `#CE93D8` | 强调 |  |
| `--accent-green` | `#81C784` | 强调 |  |
| `--accent-yellow` | `#FFF59D` | 强调 |  |
| `--accent-orange` | `#FFAB91` | 强调 |  |
| `--accent-red` | `#EF9A9A` | 强调 |  |
| `--accent-blue` | `#9FA8DA` | 强调 |  |
| `--brand-primary` | `#F8BBD9` | 强调 |  |
| `--brand-secondary` | `#CE93D8` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #F8BBD9, #CE93D8)` | 强调 |  |
| `--brand-logo` | `#F8BBD9` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#d070a0` | 功能 |  |
| `--obsidian-callout-abstract` | `#c070b0` | 功能 |  |
| `--obsidian-callout-info` | `#b070c0` | 功能 |  |
| `--obsidian-callout-todo` | `#b070c0` | 功能 |  |
| `--obsidian-callout-tip` | `#c080a0` | 功能 |  |
| `--obsidian-callout-success` | `#a0c080` | 功能 |  |
| `--obsidian-callout-question` | `#90c070` | 功能 |  |
| `--obsidian-callout-warning` | `#d0a060` | 功能 |  |
| `--obsidian-callout-failure` | `#d07070` | 功能 |  |
| `--obsidian-callout-danger` | `#d05050` | 功能 |  |
| `--obsidian-callout-bug` | `#c06080` | 功能 |  |
| `--obsidian-callout-example` | `#a070d0` | 功能 |  |
| `--obsidian-callout-quote` | `#a0a0a0` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#CE93D8` | 语法 |  |
| `--code-string` | `#81C784` | 语法 |  |
| `--code-number` | `#FFF59D` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#F8BBD9` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#FFAB91` | 语法 |  |
| `--copy-success` | `#81C784` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#E0E0E0` | 派生 |  |
| `--chart-text-muted` | `#A6A6A6` | 派生 |  |
| `--chart-edge` | `#808080` | 派生 |  |
| `--chart-label-bg` | `#282830` | 派生 |  |
| `--chart-surface-1` | `#2E2E38` | 派生 |  |
| `--chart-surface-2` | `#282830` | 派生 |  |
| `--chart-surface-3` | `#262630` | 派生 |  |
| `--chart-fill-0` | `#382838` | 派生 |  |
| `--chart-fill-1` | `#3A2840` | 派生 |  |
| `--chart-fill-2` | `#302838` | 派生 |  |
| `--chart-fill-3` | `#402838` | 派生 |  |
| `--chart-fill-4` | `#352838` | 派生 |  |
| `--chart-fill-5` | `#3A2830` | 派生 |  |
| `--chart-fill-6` | `#302840` | 派生 |  |
| `--chart-fill-7` | `#383040` | 派生 |  |
| `--chart-stroke-0` | `#F8BBD9` | 派生 |  |
| `--chart-stroke-1` | `#CE93D8` | 派生 |  |
| `--chart-stroke-2` | `#F48FB1` | 派生 |  |
| `--chart-stroke-3` | `#B39DDB` | 派生 |  |
| `--chart-stroke-4` | `#F06292` | 派生 |  |
| `--chart-stroke-5` | `#FFAB91` | 派生 |  |
| `--chart-stroke-6` | `#81C784` | 派生 |  |
| `--chart-stroke-7` | `#EF9A9A` | 派生 |  |
| `--chart-series-0` | `#F8BBD9` | 派生 |  |
| `--chart-series-1` | `#CE93D8` | 派生 |  |
| `--chart-series-2` | `#F48FB1` | 派生 |  |
| `--chart-series-3` | `#B39DDB` | 派生 |  |
| `--chart-series-4` | `#F06292` | 派生 |  |
| `--chart-series-5` | `#FFAB91` | 派生 |  |
| `--chart-series-6` | `#81C784` | 派生 |  |
| `--chart-series-7` | `#FFF59D` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, #F8BBD9, #CE93D8, #F48FB1)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(248, 187, 217, 0.15), rgba(206, 147, 216, 0.10))` | 派生 |  |
| `--logo-border` | `rgba(248, 187, 217, 0.15)` | 派生 |  |
| `--accent-cyan-rgb` | `179, 157, 219` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `244, 143, 177` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `206, 147, 216` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `129, 199, 132` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `255, 245, 157` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 171, 145` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `239, 154, 154` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `159, 168, 218` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-primary-rgb` | `248, 187, 217` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `206, 147, 216` | 派生 | RGB 输入变量（供 rgba 派生） |
