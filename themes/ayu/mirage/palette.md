# ayu/mirage 色板表

> 来源：Ayu（MIT）`ayu-mirage-unbordered.json`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1f2430` | 中性 | 来源 editor.background |
| `--bg-surface` | `#1f2430` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#1f2430` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#282e3b` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#63759926` | 中性 | 来源 list.hoverBackground |
| `--text` | `#cccac2` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#707a8c80` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#707a8c80` | 中性 | 继承 text-muted |
| `--border` | `#171b24` | 中性 | 来源 widget.border |
| `--border-strong` | `#171b24` | 中性 | 继承 border |
| `--border-focus` | `#ffcc66` | 中性 | 来源 focusBorder |
| `--card` | `#282e3b` | 中性 | 继承 bg-elevated |
| `--hairline` | `#171b24` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ffcc66` | 强调 | 来源 button.background |
| `--accent-hover` | `#ffcc66` | 强调 | 继承 accent |
| `--accent-deep` | `#ffcc66` | 强调 | 继承 accent |
| `--accent-secondary` | `#707a8c33` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#735923` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#87d96c` | 功能 | 来源 terminal.ansiGreen |
| `--warn` | `#fcca60` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#f28273` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#6acdff` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#ddbbff` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6e7c8f` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#ffa659` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#d5ff80` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#d5ff80` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#ffcd66` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#ffcd66` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#409fff40` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#409fff40` | 派生 | 来源 selection.background |
| `--placeholder` | `#707a8c80` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#87d96c1f` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#f279831f` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#707a8c` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#707a8c99` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#87d96c` | 派生 | 继承 ok |
| `--warn-fill` | `#fcca60` | 派生 | 继承 warn |
| `--danger-fill` | `#f28273` | 派生 | 继承 danger |
| `--info-fill` | `#6acdff` | 派生 | 继承 info |
| `--queued-fill` | `#ddbbff` | 派生 | 继承 queued |
