# ergemd/dark 色板表

> 来源：ErgeMD（AGPL-3.0）`src/styles/themes/dark.css`（dark）。
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
| `--text-heading` | `#EBEBEB` | 中性 |  |
| `--scrollbar-track` | `transparent` | 中性 |  |
| `--scrollbar-thumb` | `#586575` | 中性 |  |
| `--scrollbar-thumb-hover` | `#768696` | 中性 |  |
| `--reader-bg-elevated` | `#262630` | 中性 |  |
| `--status-bar-bg` | `rgba(40, 40, 48, 0.80)` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-cyan` | `#569CD6` | 强调 |  |
| `--accent-pink` | `#C586C0` | 强调 |  |
| `--accent-purple` | `#C586C0` | 强调 |  |
| `--accent-green` | `#6A9955` | 强调 |  |
| `--accent-yellow` | `#DCDCAA` | 强调 |  |
| `--accent-orange` | `#CE9178` | 强调 |  |
| `--accent-red` | `#F44747` | 强调 |  |
| `--accent-blue` | `#7AA2F7` | 强调 | 继承 dark-base |
| `--brand-primary` | `#569CD6` | 强调 |  |
| `--brand-secondary` | `#C586C0` | 强调 |  |
| `--brand-gradient` | `linear-gradient(135deg, #569CD6, #C586C0)` | 强调 |  |
| `--brand-logo` | `#569CD6` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--obsidian-callout-note` | `#6c9bff` | 功能 |  |
| `--obsidian-callout-abstract` | `#40c8ff` | 功能 |  |
| `--obsidian-callout-info` | `#40d4e8` | 功能 |  |
| `--obsidian-callout-todo` | `#40d4e8` | 功能 |  |
| `--obsidian-callout-tip` | `#40d9b5` | 功能 |  |
| `--obsidian-callout-success` | `#40d863` | 功能 |  |
| `--obsidian-callout-question` | `#80e830` | 功能 |  |
| `--obsidian-callout-warning` | `#ffa840` | 功能 |  |
| `--obsidian-callout-failure` | `#ff6c6c` | 功能 |  |
| `--obsidian-callout-danger` | `#ff4060` | 功能 |  |
| `--obsidian-callout-bug` | `#ff4080` | 功能 |  |
| `--obsidian-callout-example` | `#9c70ff` | 功能 |  |
| `--obsidian-callout-quote` | `#b0b0b0` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--code-keyword` | `#569CD6` | 语法 |  |
| `--code-string` | `#CE9178` | 语法 |  |
| `--code-number` | `#DCDCAA` | 语法 |  |
| `--code-comment` | `#6B7280` | 语法 |  |
| `--code-function` | `#4FC3F7` | 语法 |  |
| `--code-text` | `#E0E0E0` | 语法 |  |
| `--code-label` | `#CE9178` | 语法 |  |
| `--copy-success` | `#6A9955` | 语法 |  |

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
| `--chart-fill-0` | `#3A3A4A` | 派生 | 继承 dark-base |
| `--chart-fill-1` | `#3D3D52` | 派生 | 继承 dark-base |
| `--chart-fill-2` | `#3A4848` | 派生 | 继承 dark-base |
| `--chart-fill-3` | `#48443A` | 派生 | 继承 dark-base |
| `--chart-fill-4` | `#3A4840` | 派生 | 继承 dark-base |
| `--chart-fill-5` | `#483A3A` | 派生 | 继承 dark-base |
| `--chart-fill-6` | `#423A48` | 派生 | 继承 dark-base |
| `--chart-fill-7` | `#484848` | 派生 | 继承 dark-base |
| `--chart-stroke-0` | `#7AA2F7` | 派生 | 继承 dark-base |
| `--chart-stroke-1` | `#BB9AF7` | 派生 | 继承 dark-base |
| `--chart-stroke-2` | `#9ECE6A` | 派生 | 继承 dark-base |
| `--chart-stroke-3` | `#E0AF68` | 派生 | 继承 dark-base |
| `--chart-stroke-4` | `#F7768E` | 派生 | 继承 dark-base |
| `--chart-stroke-5` | `#FF9E64` | 派生 | 继承 dark-base |
| `--chart-stroke-6` | `#7DCFFF` | 派生 | 继承 dark-base |
| `--chart-stroke-7` | `#C586C0` | 派生 | 继承 dark-base |
| `--chart-series-0` | `#7DCFFF` | 派生 | 继承 dark-base |
| `--chart-series-1` | `#9ECE6A` | 派生 | 继承 dark-base |
| `--chart-series-2` | `#E0AF68` | 派生 | 继承 dark-base |
| `--chart-series-3` | `#F7768E` | 派生 | 继承 dark-base |
| `--chart-series-4` | `#BB9AF7` | 派生 | 继承 dark-base |
| `--chart-series-5` | `#FF9E64` | 派生 | 继承 dark-base |
| `--chart-series-6` | `#7AA2F7` | 派生 | 继承 dark-base |
| `--chart-series-7` | `#C586C0` | 派生 | 继承 dark-base |
| `--titlebar-gradient` | `linear-gradient(90deg, transparent 0%, rgba(86, 156, 214, 0.4) 15%, rgba(197, 134, 192, 0.2) 50%, rgba(206, 145, 120, 0.15) 85%, transparent 100%)` | 派生 |  |
| `--logo-bg` | `linear-gradient(135deg, rgba(86, 156, 214, 0.15), rgba(197, 134, 192, 0.1))` | 派生 |  |
| `--logo-border` | `rgba(86, 156, 214, 0.10)` | 派生 |  |
| `--accent-cyan-rgb` | `125, 207, 255` | 派生 | 继承 dark-base |
| `--accent-pink-rgb` | `247, 118, 142` | 派生 | 继承 dark-base |
| `--accent-purple-rgb` | `187, 154, 247` | 派生 | 继承 dark-base |
| `--accent-green-rgb` | `158, 206, 106` | 派生 | 继承 dark-base |
| `--accent-yellow-rgb` | `224, 175, 104` | 派生 | 继承 dark-base |
| `--accent-orange-rgb` | `255, 158, 100` | 派生 | 继承 dark-base |
| `--accent-red-rgb` | `247, 118, 142` | 派生 | 继承 dark-base |
| `--accent-blue-rgb` | `122, 162, 247` | 派生 | 继承 dark-base |
| `--brand-primary-rgb` | `125, 207, 255` | 派生 | 继承 dark-base |
| `--brand-secondary-rgb` | `187, 154, 247` | 派生 | 继承 dark-base |
