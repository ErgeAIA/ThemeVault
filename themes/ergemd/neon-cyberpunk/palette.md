# ergemd/neon-cyberpunk 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/neon-cyberpunk.css`（dark）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。
> 未在主题文件直接定义、但由 base 层提供的角色，标注「继承 base」并给出 base 值。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg-page` | `#282830` | 中性 |  |
| `--bg-reader` | `#2E2E38` | 中性 |  |
| `--bg-sidebar` | `#222230` | 中性 |  |
| `--bg-code` | `#262630` | 中性 |  |
| `--bg-secondary` | `#2E2E38` | 中性 |  |
| `--bg-tertiary` | `#262630` | 中性 |  |
| `--text-primary` | `#E0E0E0` | 中性 |  |
| `--text-secondary` | `#A6A6A6` | 中性 |  |
| `--text-muted` | `#808080` | 中性 |  |
| `--text-heading` | `#FAFAFA` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 |  |
| `--scrollbar-thumb` | `#585860` | 中性 |  |
| `--scrollbar-thumb-hover` | `#787880` | 中性 |  |
| `--reader-bg-elevated` | `#262630` | 中性 |  |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.85)` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#00FFFF` | 强调 |  |
| `--accent-pink` | `#FF00FF` | 强调 |  |
| `--accent-purple` | `#BF00FF` | 强调 |  |
| `--accent-green` | `#00FF64` | 强调 |  |
| `--accent-yellow` | `#FFFF00` | 强调 |  |
| `--accent-orange` | `#FF8000` | 强调 |  |
| `--accent-red` | `#FF0040` | 强调 |  |
| `--accent-blue` | `#00AAFF` | 强调 |  |
| `--brand-primary` | `#00FFFF` | 强调 |  |
| `--brand-secondary` | `#FF00FF` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #00FFFF, #FF00FF)` | 强调 |  |
| `--brand-logo` | `#00FFFF` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#00ccff` | 功能 |  |
| `--obsidian-callout-abstract` | `#00ddff` | 功能 |  |
| `--obsidian-callout-info` | `#00ddcc` | 功能 |  |
| `--obsidian-callout-todo` | `#00ddcc` | 功能 |  |
| `--obsidian-callout-tip` | `#00ffaa` | 功能 |  |
| `--obsidian-callout-success` | `#00ff77` | 功能 |  |
| `--obsidian-callout-question` | `#77ff00` | 功能 |  |
| `--obsidian-callout-warning` | `#ff9900` | 功能 |  |
| `--obsidian-callout-failure` | `#ff3355` | 功能 |  |
| `--obsidian-callout-danger` | `#ff0033` | 功能 |  |
| `--obsidian-callout-bug` | `#ff0070` | 功能 |  |
| `--obsidian-callout-example` | `#9955ff` | 功能 |  |
| `--obsidian-callout-quote` | `#999999` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#FF00FF` | 语法 |  |
| `--code-string` | `#00FF64` | 语法 |  |
| `--code-number` | `#FFFF00` | 语法 |  |
| `--code-comment` | `#808096` | 语法 |  |
| `--code-function` | `#00FFFF` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#FF8000` | 语法 |  |
| `--copy-success` | `#00FF64` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 base/derived）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--chart-text` | `#E0E0E0` | 派生 |  |
| `--chart-text-muted` | `#A6A6A6` | 派生 |  |
| `--chart-edge` | `#808090` | 派生 |  |
| `--chart-label-bg` | `#2E2E38` | 派生 |  |
| `--chart-surface-1` | `#2E2E38` | 派生 |  |
| `--chart-surface-2` | `#282830` | 派生 |  |
| `--chart-surface-3` | `#262630` | 派生 |  |
| `--chart-fill-0` | `#2A5050` | 派生 |  |
| `--chart-fill-1` | `#3A2850` | 派生 |  |
| `--chart-fill-2` | `#4A5030` | 派生 |  |
| `--chart-fill-3` | `#305030` | 派生 |  |
| `--chart-fill-4` | `#504030` | 派生 |  |
| `--chart-fill-5` | `#503050` | 派生 |  |
| `--chart-fill-6` | `#284850` | 派生 |  |
| `--chart-fill-7` | `#383850` | 派生 |  |
| `--chart-stroke-0` | `#00FFFF` | 派生 |  |
| `--chart-stroke-1` | `#FF00FF` | 派生 |  |
| `--chart-stroke-2` | `#FFFF00` | 派生 |  |
| `--chart-stroke-3` | `#00FF64` | 派生 |  |
| `--chart-stroke-4` | `#FF8000` | 派生 |  |
| `--chart-stroke-5` | `#BF00FF` | 派生 |  |
| `--chart-stroke-6` | `#00AAFF` | 派生 |  |
| `--chart-stroke-7` | `#FF0040` | 派生 |  |
| `--chart-series-0` | `#00FFFF` | 派生 |  |
| `--chart-series-1` | `#FF00FF` | 派生 |  |
| `--chart-series-2` | `#FFFF00` | 派生 |  |
| `--chart-series-3` | `#00FF64` | 派生 |  |
| `--chart-series-4` | `#FF8000` | 派生 |  |
| `--chart-series-5` | `#BF00FF` | 派生 |  |
| `--chart-series-6` | `#00AAFF` | 派生 |  |
| `--chart-series-7` | `#FF0040` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.6) 15%, rgba(255, 0, 255, 0.4) 50%, rgba(255, 0, 64, 0.3) 85%, transparent 100%)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `0, 255, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `255, 0, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `191, 0, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `0, 255, 100` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `255, 255, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 128, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `255, 0, 64` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `0, 170, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-primary-rgb` | `0, 255, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `255, 0, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
