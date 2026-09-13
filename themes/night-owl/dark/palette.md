# night-owl/dark 色板表

> 来源：官方 themes/Night Owl-color-theme.json（VS Code 主题）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#011627` | 中性 | editor.background |
| `--bg-surface` | `#011627` | 中性 | sideBar.background（同 bg） |
| `--bg-surface-2` | `#0b253a` | 中性 | input.background |
| `--bg-elevated` | `#021320` | 中性 | editorWidget.background |
| `--bg-hover` | `#011627` | 中性 | list.hoverBackground（同 bg） |
| `--text` | `#d6deeb` | 中性 | editor.foreground |
| `--text-muted` | `#637777` | 中性 | comment 系次要文本 |
| `--text-dim` | `#4b6479` | 中性 | editorLineNumber.foreground |
| `--border` | `#5f7e97` | 中性 | panel/editorWidget.border |
| `--border-strong` | `#011627` | 中性 | sideBar.border（同 bg） |
| `--border-focus` | `#122d42` | 中性 | focusBorder |
| `--card` | `#021320` | 中性 | editorWidget.background |
| `--hairline` | `#4b6479` | 中性 | 行号/极淡分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#7e57c2` | 强调 | button.background（品牌紫） |
| `--accent-hover` | `#7e57c2` | 强调 | button.hoverBackground（实色） |
| `--accent-deep` | `#7e57c2` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#82AAFF` | 强调 | 蓝（次强调） |
| `--accent-foreground` | `#ffffffcc` | 强调 | button.foreground（半透明白） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#22da6e` | 功能 | terminal.ansiGreen |
| `--warn` | `#c5e478` | 功能 | terminal.ansiYellow |
| `--danger` | `#EF5350` | 功能 | terminal.ansiRed |
| `--info` | `#82AAFF` | 功能 | terminal.ansiBlue |
| `--queued` | `#C792EA` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#637777` | 语法 | comment |
| `--syntax-keyword` | `#5ca7e4` | 语法 | keyword（蓝） |
| `--syntax-string` | `#ecc48d` | 语法 | string |
| `--syntax-literal` | `#F78C6C` | 语法 | number |
| `--syntax-title` | `#ffcb8b` | 语法 | function |
| `--syntax-attr` | `#c5e478` | 语法 | attribute |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#22da6e` | 派生 | 同 ok |
| `--warn-fill` | `#c5e478` | 派生 | 同 warn |
| `--danger-fill` | `#EF5350` | 派生 | 同 danger |
| `--info-fill` | `#82AAFF` | 派生 | 同 info |
| `--queued-fill` | `#C792EA` | 派生 | 同 queued |
| `--selection` | `#4373c2` | 派生 | selection.background |
