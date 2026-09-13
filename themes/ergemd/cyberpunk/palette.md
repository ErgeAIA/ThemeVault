# ergemd/cyberpunk 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/cyberpunk.css`（dark）。
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
| `--accent-cyan` | `#00FFFF` | 强调 |  |
| `--accent-pink` | `#FF6496` | 强调 |  |
| `--accent-purple` | `#FF00FF` | 强调 |  |
| `--accent-green` | `#00FF00` | 强调 |  |
| `--accent-yellow` | `#FFFF00` | 强调 |  |
| `--accent-orange` | `#FF8000` | 强调 |  |
| `--accent-red` | `#FF0040` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#00FFFF` | 强调 |  |
| `--brand-secondary` | `#FF00FF` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #00FFFF, #FF00FF)` | 强调 |  |
| `--brand-logo` | `#00FFFF` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#00d4ff` | 功能 |  |
| `--obsidian-callout-abstract` | `#00e5ff` | 功能 |  |
| `--obsidian-callout-info` | `#00e5d0` | 功能 |  |
| `--obsidian-callout-todo` | `#00e5d0` | 功能 |  |
| `--obsidian-callout-tip` | `#00ffb3` | 功能 |  |
| `--obsidian-callout-success` | `#00ff88` | 功能 |  |
| `--obsidian-callout-question` | `#88ff00` | 功能 |  |
| `--obsidian-callout-warning` | `#ffaa00` | 功能 |  |
| `--obsidian-callout-failure` | `#ff4466` | 功能 |  |
| `--obsidian-callout-danger` | `#ff0044` | 功能 |  |
| `--obsidian-callout-bug` | `#ff0080` | 功能 |  |
| `--obsidian-callout-example` | `#aa66ff` | 功能 |  |
| `--obsidian-callout-quote` | `#aaaaaa` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#FF00FF` | 语法 |  |
| `--code-string` | `#00FF00` | 语法 |  |
| `--code-number` | `#FF8000` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#00FFFF` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#FF8000` | 语法 |  |
| `--copy-success` | `#00FF00` | 语法 |  |

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
| `--chart-fill-0` | `#2A2838` | 派生 |  |
| `--chart-fill-1` | `#2E2A40` | 派生 |  |
| `--chart-fill-2` | `#302845` | 派生 |  |
| `--chart-fill-3` | `#282840` | 派生 |  |
| `--chart-fill-4` | `#2C2845` | 派生 |  |
| `--chart-fill-5` | `#302A48` | 派生 |  |
| `--chart-fill-6` | `#262838` | 派生 |  |
| `--chart-fill-7` | `#2A2A40` | 派生 |  |
| `--chart-stroke-0` | `#00FFFF` | 派生 |  |
| `--chart-stroke-1` | `#FF00FF` | 派生 |  |
| `--chart-stroke-2` | `#00FF00` | 派生 |  |
| `--chart-stroke-3` | `#FF8000` | 派生 |  |
| `--chart-stroke-4` | `#FFFF00` | 派生 |  |
| `--chart-stroke-5` | `#FF6496` | 派生 |  |
| `--chart-stroke-6` | `#7DCFFF` | 派生 |  |
| `--chart-stroke-7` | `#F7768E` | 派生 |  |
| `--chart-series-0` | `#00FFFF` | 派生 |  |
| `--chart-series-1` | `#FF00FF` | 派生 |  |
| `--chart-series-2` | `#00FF00` | 派生 |  |
| `--chart-series-3` | `#FF8000` | 派生 |  |
| `--chart-series-4` | `#FFFF00` | 派生 |  |
| `--chart-series-5` | `#FF6496` | 派生 |  |
| `--chart-series-6` | `#FF0040` | 派生 |  |
| `--chart-series-7` | `#BB9AF7` | 派生 |  |
| `--titlebar-gradient` | `linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.5) 15%, rgba(255, 0, 255, 0.3) 50%, rgba(255, 100, 150, 0.2) 85%, transparent 100%)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(125, 207, 255, 0.15), rgba(187, 154, 247, 0.10))` | 派生 | 继承 dark-base |
| `--logo-border` | `rgba(125, 207, 255, 0.20)` | 派生 | 继承 dark-base |
| `--accent-cyan-rgb` | `0, 255, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-pink-rgb` | `255, 100, 150` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-purple-rgb` | `255, 0, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-green-rgb` | `0, 255, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-yellow-rgb` | `255, 255, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-orange-rgb` | `255, 128, 0` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-red-rgb` | `255, 0, 64` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `0, 255, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
| `--brand-secondary-rgb` | `255, 0, 255` | 派生 | RGB 输入变量（供 rgba 派生） |
