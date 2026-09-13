# shades/super-dark 色板表

> 来源：Shades of Purple（MIT）`shades-super-dark.json`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#191830` | 中性 | 来源 editor.background |
| `--bg-surface` | `#191830` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#15152a` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#131327` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#191830` | 中性 | 来源 list.hoverBackground |
| `--text` | `#FFFFFF` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#7870ab` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#7870ab` | 中性 | 继承 text-muted |
| `--border` | `#FAD000` | 中性 | 来源 panel.border |
| `--border-strong` | `#FAD000` | 中性 | 继承 border |
| `--border-focus` | `#15152b` | 中性 | 来源 focusBorder |
| `--card` | `#131327` | 中性 | 继承 bg-elevated |
| `--hairline` | `#FAD000` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#FAD000dd` | 强调 | 来源 button.background |
| `--accent-hover` | `#FAD000dd` | 强调 | 继承 accent |
| `--accent-deep` | `#FAD000dd` | 强调 | 继承 accent |
| `--accent-secondary` | `#A599E9cc` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#131327` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#3AD900` | 功能 | 来源 terminal.ansiGreen |
| `--warn` | `#FAD000` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#EC3A37F5` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#7857fe` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#FF2C70` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#B362FF` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#FF9D00` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#A5FF90` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#FF628C` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#FF9D00` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#9EFFFF` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#5706a288` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#5706a2` | 派生 | 来源 selection.background |
| `--placeholder` | `#A599E9` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#3AD90020` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#EE3A4320` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#A599E9` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#A599E9` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#3AD900` | 派生 | 继承 ok |
| `--warn-fill` | `#FAD000` | 派生 | 继承 warn |
| `--danger-fill` | `#EC3A37F5` | 派生 | 继承 danger |
| `--info-fill` | `#7857fe` | 派生 | 继承 info |
| `--queued-fill` | `#FF2C70` | 派生 | 继承 queued |
