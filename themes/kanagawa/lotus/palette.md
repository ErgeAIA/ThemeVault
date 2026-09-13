# kanagawa/lotus 色板表

> 来源：kanagawa.nvim（rebelot）`lua/kanagawa/themes.lua` 的 `lotus` 变体映射（值取 colors.lua 原文）。
> 背景：lotusWhite 背景系（浅色）。语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#f2ecbc` | 中性 | lotusWhite3，ui.bg |
| `--bg-surface` | `#dcd5ac` | 中性 | lotusWhite1，ui.bg_m2 |
| `--bg-surface-2` | `#d5cea3` | 中性 | lotusWhite0，ui.bg_m3（最浅） |
| `--bg-elevated` | `#e7dba0` | 中性 | lotusWhite4，ui.bg_p1 |
| `--bg-hover` | `#e7dba0` | 中性 | lotusWhite4 |
| `--text` | `#545464` | 中性 | lotusInk1，ui.fg |
| `--text-muted` | `#43436c` | 中性 | lotusInk2，ui.fg_dim |
| `--text-dim` | `#8a8980` | 中性 | lotusGray3，comment 系 |
| `--border` | `#e7dba0` | 中性 | lotusWhite4 |
| `--border-strong` | `#e4d794` | 中性 | lotusWhite5，ui.bg_p2 |
| `--border-focus` | `#4d699b` | 中性 | lotusBlue4（品牌蓝焦点） |
| `--card` | `#e7dba0` | 中性 | lotusWhite4 |
| `--hairline` | `#e7dba0` | 中性 | lotusWhite4 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#4d699b` | 强调 | lotusBlue4（品牌蓝，fun 色） |
| `--accent-hover` | `#5d57a3` | 强调 | lotusBlue5（亮蓝紫） |
| `--accent-deep` | `#597b75` | 强调 | lotusAqua（青） |
| `--accent-secondary` | `#624c83` | 强调 | lotusViolet4（紫，keyword） |
| `--accent-foreground` | `#f2ecbc` | 强调 | lotusWhite3（accent 上文字，浅底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#6f894e` | 功能 | lotusGreen，diag.ok |
| `--warn` | `#e98a00` | 功能 | lotusOrange2，diag.warning |
| `--danger` | `#e82424` | 功能 | lotusRed3，diag.error |
| `--info` | `#4e8ca2` | 功能 | lotusTeal1，diag.info |
| `--queued` | `#766b90` | 功能 | lotusViolet2（紫，第 6 通道） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8a8980` | 语法 | lotusGray3 |
| `--syntax-keyword` | `#624c83` | 语法 | lotusViolet4 |
| `--syntax-string` | `#6f894e` | 语法 | lotusGreen |
| `--syntax-literal` | `#b35b79` | 语法 | lotusPink（number） |
| `--syntax-title` | `#4d699b` | 语法 | lotusBlue4（fun） |
| `--syntax-attr` | `#77713f` | 语法 | lotusYellow（identifier） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#6f894e` | 派生 | 同 ok |
| `--warn-fill` | `#e98a00` | 派生 | 同 warn |
| `--danger-fill` | `#e82424` | 派生 | 同 danger |
| `--info-fill` | `#4e8ca2` | 派生 | 同 info |
| `--queued-fill` | `#766b90` | 派生 | 同 queued |
