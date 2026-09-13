# ayu/light 色板表

> 来源：Ayu（MIT）`ayu-light-unbordered.json`（light）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#f8f9fa` | 中性 | 来源 editor.background |
| `--bg-surface` | `#f8f9fa` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#f8f9fa` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#fafafa` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#6b7d8f24` | 中性 | 来源 list.hoverBackground |
| `--text` | `#5c6166` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#828e9f66` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#828e9f66` | 中性 | 继承 text-muted |
| `--border` | `#6b7d8f1f` | 中性 | 来源 widget.border |
| `--border-strong` | `#6b7d8f1f` | 中性 | 继承 border |
| `--border-focus` | `#f29718` | 中性 | 来源 focusBorder |
| `--card` | `#fafafa` | 中性 | 继承 bg-elevated |
| `--hairline` | `#6b7d8f1f` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#f29718` | 强调 | 来源 button.background |
| `--accent-hover` | `#f29718` | 强调 | 继承 accent |
| `--accent-deep` | `#f29718` | 强调 | 继承 accent |
| `--accent-secondary` | `#828e9f33` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#7e4b01` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#6cbf43` | 功能 | 来源 terminal.ansiGreen |
| `--warn` | `#e7a100` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#f06b6c` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#21a1e2` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#a176cb` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#adaeb1` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#fa8532` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#86b300` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#86b300` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#eba400` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#eba400` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#035bd626` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#035bd626` | 派生 | 来源 selection.background |
| `--placeholder` | `#828e9f80` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#6cbf431f` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#ff73831f` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#828e9f` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#828e9f99` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#6cbf43` | 派生 | 继承 ok |
| `--warn-fill` | `#e7a100` | 派生 | 继承 warn |
| `--danger-fill` | `#f06b6c` | 派生 | 继承 danger |
| `--info-fill` | `#21a1e2` | 派生 | 继承 info |
| `--queued-fill` | `#a176cb` | 派生 | 继承 queued |
