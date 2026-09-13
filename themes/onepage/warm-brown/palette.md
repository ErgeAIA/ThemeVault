# onepage/warm-brown 色板表

> 来源：OnePage `theme.css` @ `4226e57`（MIT）中 `body.theme-dark`（暖棕·冷锚）+ 共享 `.theme-dark` ANSI/code。
> 颜色值原文照抄；`color-mix` 保留源码形态。状态色 / ANSI 源为 `--color-*-rgb` 三元组，本表统一转 HEX 显示（DEC-002）。语义映射见家族 README。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#262322` | 中性 | `--background-primary`，暖棕 |
| `--bg-surface` | `color-mix(in srgb, #262322, white 5%)` | 中性 | `--background-secondary` 公式原文 |
| `--bg-surface-2` | `color-mix(in srgb, #262322, white 8%)` | 中性 | `--background-secondary-alt` |
| `--bg-elevated` | `#2f2b29` | 中性 | `--background-tertiary` |
| `--bg-hover` | `color-mix(in srgb, var(--background-secondary), var(--text-normal) 15%)` | 中性 | `--interactive-hover` 公式原文 |
| `--text` | `#cfc7bd` | 中性 | `--text-normal`，暖浅褐 |
| `--text-muted` | `#948d83` | 中性 | `--text-muted`；对 bg ≈ 4.8:1 |
| `--text-dim` | `#6b665e` | 中性 | `--text-faint`；对 bg ≈ 2.7:1（弱，源事实） |
| `--border` | `#2f2b29` | 中性 | `--color-base-20` |
| `--border-strong` | `#34302e` | 中性 | `--color-base-25` |
| `--border-focus` | `#6db3a3` | 中性 | 同 `--text-accent`（Obsidian 焦点强调） |
| `--card` | `#2b2725` | 中性 | `--color-base-10` |
| `--hairline` | `#242120` | 中性 | `--color-base-00` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#6db3a3` | 强调 | 默认浅青（HSL 166 32% 57%）；冷锚 |
| `--accent-hover` | `color-mix(in srgb, var(--text-accent) 88%, white)` | 强调 | 源码公式 |
| `--accent-deep` | `color-mix(in srgb, var(--text-accent) 88%, black)` | 强调 | `--accent-active` 源码公式 |
| `--accent-secondary` | `#6db3a3` | 强调 | 无独立第二强调，沿用主色；排版轴见 typo-* |
| `--accent-foreground` | `#262322` | 强调 | 取 bg；源 `--text-on-accent` 为 oklch 派生 |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#48C45E` | 功能 | `--color-green`（`--color-green-rgb: 72, 196, 90`）· HEX 显示 |
| `--warn` | `#C4B45E` | 功能 | `--color-yellow`（`--color-yellow-rgb: 196, 180, 94`）· HEX 显示 |
| `--danger` | `#D95A5F` | 功能 | `--color-red`（`--color-red-rgb: 217, 90, 95`）· HEX 显示 |
| `--info` | `#5694DA` | 功能 | `--color-blue`（`--color-blue-rgb: 86, 148, 218`）· HEX 显示 |
| `--queued` | `#8E7DC2` | 功能 | `--color-purple`（`--color-purple-rgb: 142, 125, 194`）· HEX 显示 |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5c6370` | 语法 | `--code-comment` |
| `--syntax-keyword` | `#e16d76` | 语法 | `--code-keyword`（亦作 tag） |
| `--syntax-string` | `#58b6c2` | 语法 | `--code-string` |
| `--syntax-literal` | `#c678de` | 语法 | `--code-value` |
| `--syntax-title` | `#d19a66` | 语法 | `--code-function`（亦作 important） |
| `--syntax-attr` | `#62afef` | 语法 | `--code-property` |

## 彩色排版（家族身份，derivedOptional）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--typo-h1` | `#4F74AF` | 派生 | 亮暗同源：皇家蓝提亮 |
| `--typo-h2` | `#8567BD` | 派生 | 深紫提亮 |
| `--typo-h3` | `#4E9A8A` | 派生 | 深青绿提亮 |
| `--typo-h4` | `#C0765E` | 派生 | 深陶土提亮 |
| `--typo-h5` | `#C99B5E` | 派生 | 琥珀 |
| `--typo-h6` | `#8A8478` | 派生 | 暖灰 |
| `--typo-bold` | `#E89A60` | 派生 | 加粗，暖橙 |
| `--typo-italic` | `#A6BA9D` | 派生 | 斜体，浅鼠尾草 |

## 图谱色 / ANSI / 其它派生

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-active` | `color-mix(in srgb, var(--text-accent) 88%, black)` | 派生 | 与 accent-deep 同源 |
| `--shadow` | `rgba(0, 0, 0, 0.08) 0px 12px 24px -4px, rgba(0, 0, 0, 0.04) 0px 8px 16px -4px` | 派生 | `--shadow-s` 共享层原文 |
| `--color-red` | `#D95A5F` | 功能 | ANSI 全通道备查（`--color-red-rgb: 217, 90, 95`）· HEX 显示 |
| `--color-orange` | `#DB8650` | 功能 | `--color-orange-rgb: 219, 134, 80` · HEX 显示 |
| `--color-yellow` | `#C4B45E` | 功能 | `--color-yellow-rgb: 196, 180, 94` · HEX 显示 |
| `--color-green` | `#48C45E` | 功能 | `--color-green-rgb: 72, 196, 90` · HEX 显示 |
| `--color-cyan` | `#3FBAB6` | 功能 | `--color-cyan-rgb: 63, 186, 182` · HEX 显示 |
| `--color-blue` | `#5694DA` | 功能 | `--color-blue-rgb: 86, 148, 218` · HEX 显示 |
| `--color-purple` | `#8E7DC2` | 功能 | `--color-purple-rgb: 142, 125, 194` · HEX 显示 |
| `--color-pink` | `#DE6793` | 功能 | `--color-pink-rgb: 222, 103, 147` · HEX 显示 |
| `--graph-node-tag` | `var(--text-accent)` | 派生 | 源码 var 引用 |
| `--graph-node-attachment` | `color-mix(in srgb, var(--text-accent) 65%, var(--text-muted))` | 派生 | |
| `--graph-line` | `color-mix(in srgb, var(--text-muted) 28%, transparent)` | 派生 | |
| `--graph-line-highlight` | `var(--text-accent)` | 派生 | |
| `--graph-color-1` | `var(--text-accent)` | 派生 | |
| `--graph-color-2` | `color-mix(in srgb, var(--text-accent) 55%, var(--text-muted))` | 派生 | |
| `--graph-color-3` | `var(--text-muted)` | 派生 | |
