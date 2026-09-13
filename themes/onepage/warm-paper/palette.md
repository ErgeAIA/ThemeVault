# onepage/warm-paper 色板表

> 来源：OnePage `theme.css` @ `4226e57`（MIT）中 `body.theme-light`（暖白纸张）+ 共享 `.theme-light` ANSI/code。
> 颜色值原文照抄；`color-mix` 保留源码形态。状态色 / ANSI 源为 `--color-*-rgb` 三元组，本表统一转 HEX 显示（DEC-002）。语义映射见家族 README。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#faf7f1` | 中性 | `--background-primary`，暖白纸张 |
| `--bg-surface` | `#f3efe7` | 中性 | `--background-secondary` |
| `--bg-surface-2` | `#efeae1` | 中性 | `--background-secondary-alt` |
| `--bg-elevated` | `#ede8de` | 中性 | `--background-tertiary` |
| `--bg-hover` | `color-mix(in srgb, var(--background-secondary), var(--text-normal) 15%)` | 中性 | `--interactive-hover` 公式原文 |
| `--text` | `#3d3730` | 中性 | `--text-normal`，暖褐黑 |
| `--text-muted` | `#857d70` | 中性 | `--text-muted`；对 bg ≈ 3.8:1 |
| `--text-dim` | `#c0b8ab` | 中性 | `--text-faint`；对 bg ≈ 1.8:1（弱，源事实） |
| `--border` | `#eae5db` | 中性 | `--color-base-20` |
| `--border-strong` | `#e2dcd0` | 中性 | `--color-base-25` |
| `--border-focus` | `#0e6e63` | 中性 | 同 `--text-accent`（Obsidian 焦点强调） |
| `--card` | `#f2eee6` | 中性 | `--color-base-10` |
| `--hairline` | `#f8f5ef` | 中性 | `--color-base-00` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#0e6e63` | 强调 | 默认深青（HSL 173 77% 24%）；`var(--onepage-accent-hex, #0e6e63)` |
| `--accent-hover` | `color-mix(in srgb, var(--text-accent) 85%, white)` | 强调 | 源码公式 |
| `--accent-deep` | `color-mix(in srgb, var(--text-accent) 90%, black)` | 强调 | `--accent-active` 源码公式 |
| `--accent-secondary` | `#0e6e63` | 强调 | 无独立第二强调，沿用主色；排版轴见 typo-* |
| `--accent-foreground` | `#faf7f1` | 强调 | 取 bg；源 `--text-on-accent` 为 oklch 派生 |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#4AD55F` | 功能 | `--color-green`（`--color-green-rgb: 74, 213, 95`）· HEX 显示 |
| `--warn` | `#E0CD63` | 功能 | `--color-yellow`（`--color-yellow-rgb: 224, 205, 99`）· HEX 显示 |
| `--danger` | `#FE7070` | 功能 | `--color-red`（`--color-red-rgb: 254, 112, 112`）· HEX 显示 |
| `--info` | `#6AADFA` | 功能 | `--color-blue`（`--color-blue-rgb: 106, 173, 250`）· HEX 显示 |
| `--queued` | `#BB9EF5` | 功能 | `--color-purple`（`--color-purple-rgb: 187, 158, 245`）· HEX 显示 |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#b6b9c5` | 语法 | `--code-comment` |
| `--syntax-keyword` | `#e45749` | 语法 | `--code-keyword`（亦作 tag） |
| `--syntax-string` | `#0d97b3` | 语法 | `--code-string` |
| `--syntax-literal` | `#a626a4` | 语法 | `--code-value` |
| `--syntax-title` | `#b76b02` | 语法 | `--code-function`（亦作 important） |
| `--syntax-attr` | `#62afef` | 语法 | `--code-property` |

## 彩色排版（家族身份，derivedOptional）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--typo-h1` | `#1D345C` | 派生 | 标题 1，海军蓝 |
| `--typo-h2` | `#52377A` | 派生 | 标题 2，深紫 |
| `--typo-h3` | `#0e6e63` | 派生 | 标题 3，与 accent 同深青 |
| `--typo-h4` | `#CE5567` | 派生 | 标题 4，玫瑰 |
| `--typo-h5` | `#9C6B1E` | 派生 | 标题 5，琥珀 |
| `--typo-h6` | `#8A8378` | 派生 | 标题 6，暖灰 |
| `--typo-bold` | `#C2410C` | 派生 | 加粗，焦橙 |
| `--typo-italic` | `#4A704F` | 派生 | 斜体，深鼠尾草绿 |

## 图谱色 / ANSI / 其它派生

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent-active` | `color-mix(in srgb, var(--text-accent) 90%, black)` | 派生 | 与 accent-deep 同源 |
| `--shadow` | `rgba(0, 0, 0, 0.08) 0px 12px 24px -4px, rgba(0, 0, 0, 0.04) 0px 8px 16px -4px` | 派生 | `--shadow-s` 共享层原文 |
| `--color-red` | `#FE7070` | 功能 | ANSI 全通道备查（`--color-red-rgb: 254, 112, 112`）· HEX 显示 |
| `--color-orange` | `#F29A64` | 功能 | `--color-orange-rgb: 242, 154, 100` · HEX 显示 |
| `--color-yellow` | `#E0CD63` | 功能 | `--color-yellow-rgb: 224, 205, 99` · HEX 显示 |
| `--color-green` | `#4AD55F` | 功能 | `--color-green-rgb: 74, 213, 95` · HEX 显示 |
| `--color-cyan` | `#38DBD6` | 功能 | `--color-cyan-rgb: 56, 219, 214` · HEX 显示 |
| `--color-blue` | `#6AADFA` | 功能 | `--color-blue-rgb: 106, 173, 250` · HEX 显示 |
| `--color-purple` | `#BB9EF5` | 功能 | `--color-purple-rgb: 187, 158, 245` · HEX 显示 |
| `--color-pink` | `#F37DB7` | 功能 | `--color-pink-rgb: 243, 125, 183` · HEX 显示 |
| `--graph-node-tag` | `var(--text-accent)` | 派生 | 源码 var 引用 |
| `--graph-node-attachment` | `color-mix(in srgb, var(--text-accent) 65%, var(--text-muted))` | 派生 | |
| `--graph-line` | `color-mix(in srgb, var(--text-muted) 28%, transparent)` | 派生 | |
| `--graph-line-highlight` | `var(--text-accent)` | 派生 | |
| `--graph-color-1` | `var(--text-accent)` | 派生 | |
| `--graph-color-2` | `color-mix(in srgb, var(--text-accent) 55%, var(--text-muted))` | 派生 | |
| `--graph-color-3` | `var(--text-muted)` | 派生 | |
