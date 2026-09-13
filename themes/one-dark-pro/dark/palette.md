# one-dark-pro/dark 色板表

> 来源：官方 themes/OneDark-Pro.json（VS Code 主题）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#282c34` | 中性 | editor.background |
| `--bg-surface` | `#21252b` | 中性 | sideBar/statusBar.background |
| `--bg-surface-2` | `#1d1f23` | 中性 | input.background |
| `--bg-elevated` | `#21252b` | 中性 | editorWidget.background（同 surface） |
| `--bg-hover` | `#2c313a` | 中性 | list.hoverBackground |
| `--text` | `#abb2bf` | 中性 | editor.foreground |
| `--text-muted` | `#5c6370` | 中性 | comment 系次要文本 |
| `--text-dim` | `#495162` | 中性 | editorLineNumber.foreground |
| `--border` | `#3e4452` | 中性 | panel.border |
| `--border-strong` | `#181a1f` | 中性 | tab.border |
| `--border-focus` | `#3e4452` | 中性 | focusBorder（同 border） |
| `--card` | `#21252b` | 中性 | editorWidget.background |
| `--hairline` | `#495162` | 中性 | 行号/极淡分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#4d78cc` | 强调 | activityBarBadge.background（蓝色品牌强调） |
| `--accent-hover` | `#4d78cc` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#4d78cc` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#61afef` | 强调 | function 蓝（次强调） |
| `--accent-foreground` | `#f8fafd` | 强调 | badge.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#8cc265` | 功能 | terminal.ansiGreen |
| `--warn` | `#d18f52` | 功能 | terminal.ansiYellow |
| `--danger` | `#e05561` | 功能 | terminal.ansiRed |
| `--info` | `#4aa5f0` | 功能 | terminal.ansiBlue |
| `--queued` | `#c162de` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5c6370` | 语法 | comment |
| `--syntax-keyword` | `#c678dd` | 语法 | keyword.control（紫） |
| `--syntax-string` | `#98c379` | 语法 | string |
| `--syntax-literal` | `#d19a66` | 语法 | number（橙） |
| `--syntax-title` | `#61afef` | 语法 | function（蓝） |
| `--syntax-attr` | `#d19a66` | 语法 | attribute（橙） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#8cc265` | 派生 | 同 ok |
| `--warn-fill` | `#d18f52` | 派生 | 同 warn |
| `--danger-fill` | `#e05561` | 派生 | 同 danger |
| `--info-fill` | `#4aa5f0` | 派生 | 同 info |
| `--queued-fill` | `#c162de` | 派生 | 同 queued |
