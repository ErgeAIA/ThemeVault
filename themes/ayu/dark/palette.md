# ayu/dark 色板表

> 来源：Ayu（MIT）`ayu-dark-unbordered.json`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#0d1017` | 中性 | 来源 editor.background |
| `--bg-surface` | `#0d1017` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#0d1017` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#141821` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#47526640` | 中性 | 来源 list.hoverBackground |
| `--text` | `#bfbdb6` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#5a6378a6` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#5a6378a6` | 中性 | 继承 text-muted |
| `--border` | `#1b1f29` | 中性 | 来源 widget.border |
| `--border-strong` | `#1b1f29` | 中性 | 继承 border |
| `--border-focus` | `#e6b450` | 中性 | 来源 focusBorder |
| `--card` | `#141821` | 中性 | 继承 bg-elevated |
| `--hairline` | `#1b1f29` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#e6b450` | 强调 | 来源 button.background |
| `--accent-hover` | `#e6b450` | 强调 | 继承 accent |
| `--accent-deep` | `#e6b450` | 强调 | 继承 accent |
| `--accent-secondary` | `#5a637833` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#765b24` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#70bf56` | 功能 | 来源 terminal.ansiGreen |
| `--warn` | `#fdb04c` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#f06b73` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#4fbfff` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#d0a1ff` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5a6673` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#ff8f40` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#aad94c` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#aad94c` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#ffb454` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#ffb454` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#3388ff40` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#3388ff40` | 派生 | 来源 selection.background |
| `--placeholder` | `#5a637880` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#70bf561f` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#f26d781f` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#5a6378` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#5a637899` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#70bf56` | 派生 | 继承 ok |
| `--warn-fill` | `#fdb04c` | 派生 | 继承 warn |
| `--danger-fill` | `#f06b73` | 派生 | 继承 danger |
| `--info-fill` | `#4fbfff` | 派生 | 继承 info |
| `--queued-fill` | `#d0a1ff` | 派生 | 继承 queued |
