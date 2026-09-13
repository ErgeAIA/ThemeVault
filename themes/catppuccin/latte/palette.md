# catppuccin/latte 色板表

> 来源：catppuccin/palette `palette.json`（MIT），本表取 {flavor} flavor。
> 颜色值为官方 palette JSON 原文，未改写。类型按 ThemeVault 规范标注。
> 语义角色 → Catppuccin 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#eff1f5` | 中性 | Catppuccin `base` |
| `--bg-surface` | `#e6e9ef` | 中性 | Catppuccin `mantle` |
| `--bg-surface-2` | `#dce0e8` | 中性 | Catppuccin `crust` |
| `--bg-elevated` | `#ccd0da` | 中性 | Catppuccin `surface0` |
| `--bg-hover` | `#bcc0cc` | 中性 | Catppuccin `surface1` |
| `--text` | `#4c4f69` | 中性 | Catppuccin `text` |
| `--text-muted` | `#6c6f85` | 中性 | Catppuccin `subtext0` |
| `--text-dim` | `#9ca0b0` | 中性 | Catppuccin `overlay0` |
| `--border` | `#ccd0da` | 中性 | Catppuccin `surface0` |
| `--border-strong` | `#bcc0cc` | 中性 | Catppuccin `surface1` |
| `--border-focus` | `#7287fd` | 中性 | 焦点用淡紫 |
| `--card` | `#e6e9ef` | 中性 | Catppuccin `mantle` |
| `--hairline` | `#dce0e8` | 中性 | Catppuccin `crust` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#8839ef` | 强调 | 主强调（官方默认 primary） |
| `--accent-hover` | `#ea76cb` | 强调 | hover 惯例 |
| `--accent-deep` | `#8839ef` | 强调 | 无更深变体，沿用 mauve |
| `--accent-secondary` | `#1e66f5` | 强调 | Catppuccin `blue` |
| `--accent-foreground` | `#eff1f5` | 强调 | accent 上文字用 base |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#40a02b` | 功能 | Catppuccin `green` |
| `--warn` | `#df8e1d` | 功能 | Catppuccin `yellow` |
| `--danger` | `#d20f39` | 功能 | Catppuccin `red` |
| `--info` | `#1e66f5` | 功能 | Catppuccin `blue` |
| `--queued` | `#7287fd` | 功能 | Catppuccin `lavender` |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8c8fa1` | 语法 | Catppuccin `overlay1` |
| `--syntax-keyword` | `#8839ef` | 语法 | Catppuccin `mauve` |
| `--syntax-string` | `#40a02b` | 语法 | Catppuccin `green` |
| `--syntax-literal` | `#fe640b` | 语法 | Catppuccin `peach` |
| `--syntax-title` | `#1e66f5` | 语法 | Catppuccin `blue` |
| `--syntax-attr` | `#179299` | 语法 | Catppuccin `teal` |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#40a02b` | 功能 | Catppuccin `green` |
| `--warn-fill` | `#df8e1d` | 功能 | Catppuccin `yellow` |
| `--danger-fill` | `#e64553` | 功能 | 柔化填充 |
| `--info-fill` | `#209fb5` | 功能 | Catppuccin `sapphire` |
| `--queued-fill` | `#7287fd` | 功能 | Catppuccin `lavender` |
