# catppuccin/frappe 色板表

> 来源：catppuccin/palette `palette.json`（MIT），本表取 {flavor} flavor。
> 颜色值为官方 palette JSON 原文，未改写。类型按 ThemeVault 规范标注。
> 语义角色 → Catppuccin 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#303446` | 中性 | Catppuccin `base` |
| `--bg-surface` | `#292c3c` | 中性 | Catppuccin `mantle` |
| `--bg-surface-2` | `#232634` | 中性 | Catppuccin `crust` |
| `--bg-elevated` | `#414559` | 中性 | Catppuccin `surface0` |
| `--bg-hover` | `#51576d` | 中性 | Catppuccin `surface1` |
| `--text` | `#c6d0f5` | 中性 | Catppuccin `text` |
| `--text-muted` | `#a5adce` | 中性 | Catppuccin `subtext0` |
| `--text-dim` | `#737994` | 中性 | Catppuccin `overlay0` |
| `--border` | `#414559` | 中性 | Catppuccin `surface0` |
| `--border-strong` | `#51576d` | 中性 | Catppuccin `surface1` |
| `--border-focus` | `#babbf1` | 中性 | 焦点用淡紫 |
| `--card` | `#292c3c` | 中性 | Catppuccin `mantle` |
| `--hairline` | `#232634` | 中性 | Catppuccin `crust` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ca9ee6` | 强调 | 主强调（官方默认 primary） |
| `--accent-hover` | `#f4b8e4` | 强调 | hover 惯例 |
| `--accent-deep` | `#ca9ee6` | 强调 | 无更深变体，沿用 mauve |
| `--accent-secondary` | `#8caaee` | 强调 | Catppuccin `blue` |
| `--accent-foreground` | `#303446` | 强调 | accent 上文字用 base |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#a6d189` | 功能 | Catppuccin `green` |
| `--warn` | `#e5c890` | 功能 | Catppuccin `yellow` |
| `--danger` | `#e78284` | 功能 | Catppuccin `red` |
| `--info` | `#8caaee` | 功能 | Catppuccin `blue` |
| `--queued` | `#babbf1` | 功能 | Catppuccin `lavender` |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#838ba7` | 语法 | Catppuccin `overlay1` |
| `--syntax-keyword` | `#ca9ee6` | 语法 | Catppuccin `mauve` |
| `--syntax-string` | `#a6d189` | 语法 | Catppuccin `green` |
| `--syntax-literal` | `#ef9f76` | 语法 | Catppuccin `peach` |
| `--syntax-title` | `#8caaee` | 语法 | Catppuccin `blue` |
| `--syntax-attr` | `#81c8be` | 语法 | Catppuccin `teal` |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#a6d189` | 功能 | Catppuccin `green` |
| `--warn-fill` | `#e5c890` | 功能 | Catppuccin `yellow` |
| `--danger-fill` | `#ea999c` | 功能 | 柔化填充 |
| `--info-fill` | `#85c1dc` | 功能 | Catppuccin `sapphire` |
| `--queued-fill` | `#babbf1` | 功能 | Catppuccin `lavender` |
