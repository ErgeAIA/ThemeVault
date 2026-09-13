# catppuccin/macchiato 色板表

> 来源：catppuccin/palette `palette.json`（MIT），本表取 {flavor} flavor。
> 颜色值为官方 palette JSON 原文，未改写。类型按 ThemeVault 规范标注。
> 语义角色 → Catppuccin 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#24273a` | 中性 | Catppuccin `base` |
| `--bg-surface` | `#1e2030` | 中性 | Catppuccin `mantle` |
| `--bg-surface-2` | `#181926` | 中性 | Catppuccin `crust` |
| `--bg-elevated` | `#363a4f` | 中性 | Catppuccin `surface0` |
| `--bg-hover` | `#494d64` | 中性 | Catppuccin `surface1` |
| `--text` | `#cad3f5` | 中性 | Catppuccin `text` |
| `--text-muted` | `#a5adcb` | 中性 | Catppuccin `subtext0` |
| `--text-dim` | `#6e738d` | 中性 | Catppuccin `overlay0` |
| `--border` | `#363a4f` | 中性 | Catppuccin `surface0` |
| `--border-strong` | `#494d64` | 中性 | Catppuccin `surface1` |
| `--border-focus` | `#b7bdf8` | 中性 | 焦点用淡紫 |
| `--card` | `#1e2030` | 中性 | Catppuccin `mantle` |
| `--hairline` | `#181926` | 中性 | Catppuccin `crust` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#c6a0f6` | 强调 | 主强调（官方默认 primary） |
| `--accent-hover` | `#f5bde6` | 强调 | hover 惯例 |
| `--accent-deep` | `#c6a0f6` | 强调 | 无更深变体，沿用 mauve |
| `--accent-secondary` | `#8aadf4` | 强调 | Catppuccin `blue` |
| `--accent-foreground` | `#24273a` | 强调 | accent 上文字用 base |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#a6da95` | 功能 | Catppuccin `green` |
| `--warn` | `#eed49f` | 功能 | Catppuccin `yellow` |
| `--danger` | `#ed8796` | 功能 | Catppuccin `red` |
| `--info` | `#8aadf4` | 功能 | Catppuccin `blue` |
| `--queued` | `#b7bdf8` | 功能 | Catppuccin `lavender` |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8087a2` | 语法 | Catppuccin `overlay1` |
| `--syntax-keyword` | `#c6a0f6` | 语法 | Catppuccin `mauve` |
| `--syntax-string` | `#a6da95` | 语法 | Catppuccin `green` |
| `--syntax-literal` | `#f5a97f` | 语法 | Catppuccin `peach` |
| `--syntax-title` | `#8aadf4` | 语法 | Catppuccin `blue` |
| `--syntax-attr` | `#8bd5ca` | 语法 | Catppuccin `teal` |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#a6da95` | 功能 | Catppuccin `green` |
| `--warn-fill` | `#eed49f` | 功能 | Catppuccin `yellow` |
| `--danger-fill` | `#ee99a0` | 功能 | 柔化填充 |
| `--info-fill` | `#7dc4e4` | 功能 | Catppuccin `sapphire` |
| `--queued-fill` | `#b7bdf8` | 功能 | Catppuccin `lavender` |
