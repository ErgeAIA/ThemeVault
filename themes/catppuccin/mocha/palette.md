# catppuccin/mocha 色板表

> 来源：catppuccin/palette `palette.json`（MIT），本表取 {flavor} flavor。
> 颜色值为官方 palette JSON 原文，未改写。类型按 ThemeVault 规范标注。
> 语义角色 → Catppuccin 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1e1e2e` | 中性 | Catppuccin `base` |
| `--bg-surface` | `#181825` | 中性 | Catppuccin `mantle` |
| `--bg-surface-2` | `#11111b` | 中性 | Catppuccin `crust` |
| `--bg-elevated` | `#313244` | 中性 | Catppuccin `surface0` |
| `--bg-hover` | `#45475a` | 中性 | Catppuccin `surface1` |
| `--text` | `#cdd6f4` | 中性 | Catppuccin `text` |
| `--text-muted` | `#a6adc8` | 中性 | Catppuccin `subtext0` |
| `--text-dim` | `#6c7086` | 中性 | Catppuccin `overlay0` |
| `--border` | `#313244` | 中性 | Catppuccin `surface0` |
| `--border-strong` | `#45475a` | 中性 | Catppuccin `surface1` |
| `--border-focus` | `#b4befe` | 中性 | 焦点用淡紫 |
| `--card` | `#181825` | 中性 | Catppuccin `mantle` |
| `--hairline` | `#11111b` | 中性 | Catppuccin `crust` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#cba6f7` | 强调 | 主强调（官方默认 primary） |
| `--accent-hover` | `#f5c2e7` | 强调 | hover 惯例 |
| `--accent-deep` | `#cba6f7` | 强调 | 无更深变体，沿用 mauve |
| `--accent-secondary` | `#89b4fa` | 强调 | Catppuccin `blue` |
| `--accent-foreground` | `#1e1e2e` | 强调 | accent 上文字用 base |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#a6e3a1` | 功能 | Catppuccin `green` |
| `--warn` | `#f9e2af` | 功能 | Catppuccin `yellow` |
| `--danger` | `#f38ba8` | 功能 | Catppuccin `red` |
| `--info` | `#89b4fa` | 功能 | Catppuccin `blue` |
| `--queued` | `#b4befe` | 功能 | Catppuccin `lavender` |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#7f849c` | 语法 | Catppuccin `overlay1` |
| `--syntax-keyword` | `#cba6f7` | 语法 | Catppuccin `mauve` |
| `--syntax-string` | `#a6e3a1` | 语法 | Catppuccin `green` |
| `--syntax-literal` | `#fab387` | 语法 | Catppuccin `peach` |
| `--syntax-title` | `#89b4fa` | 语法 | Catppuccin `blue` |
| `--syntax-attr` | `#94e2d5` | 语法 | Catppuccin `teal` |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#a6e3a1` | 功能 | Catppuccin `green` |
| `--warn-fill` | `#f9e2af` | 功能 | Catppuccin `yellow` |
| `--danger-fill` | `#eba0ac` | 功能 | 柔化填充 |
| `--info-fill` | `#74c7ec` | 功能 | Catppuccin `sapphire` |
| `--queued-fill` | `#b4befe` | 功能 | Catppuccin `lavender` |
