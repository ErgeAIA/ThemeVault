# omni/dark 色板表

> 来源：Omni（MIT）`omni.yml`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#191622` | 中性 | 来源 editor.background |
| `--bg-surface` | `#15121E` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#201B2D` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#13111B` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#41414Da6` | 中性 | 来源 list.hoverBackground |
| `--text` | `#E1E1E6` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#5A4B81` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#5A4B81` | 中性 | 继承 text-muted |
| `--border` | `#FF79C6` | 中性 | 来源 panel.border |
| `--border-strong` | `#FF79C6` | 中性 | 继承 border |
| `--border-focus` | `#5A4B81` | 中性 | 来源 focusBorder |
| `--card` | `#13111B` | 中性 | 继承 bg-elevated |
| `--hairline` | `#FF79C6` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#41414D` | 强调 | 来源 button.background |
| `--accent-hover` | `#41414D` | 强调 | 继承 accent |
| `--accent-deep` | `#41414D` | 强调 | 继承 accent |
| `--accent-secondary` | `#41414D` | 强调 | 来源 badge.background |
| `--accent-foreground` | `#E1E1E6` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#67e480` | 功能 | 来源 terminal.ansiGreen |
| `--warn` | `#e7de79` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#FF79C6` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#78D1E1` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#988bc7` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5A4B81` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#78D1E1` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#FF79C6` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#78D1E1` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#988bc7` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#FF79C6` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#41414D` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#78D1E1` | 派生 | 来源 selection.background |
| `--placeholder` | `#5A4B81` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#67e48033` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#E9637980` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#E1E1E6` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#5A4B81` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#67e480` | 派生 | 继承 ok |
| `--warn-fill` | `#e7de79` | 派生 | 继承 warn |
| `--danger-fill` | `#FF79C6` | 派生 | 继承 danger |
| `--info-fill` | `#78D1E1` | 派生 | 继承 info |
| `--queued-fill` | `#988bc7` | 派生 | 继承 queued |
