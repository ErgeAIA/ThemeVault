# falcon/dark-green-islands 色板表

> 来源：Falcon（MIT）`dark/green-islands.yml`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#002F38` | 中性 | 来源 editor.background |
| `--bg-surface` | `#002F38` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#153648` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#002F38` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#153F48` | 中性 | 来源 list.hoverBackground |
| `--text` | `#BBBBBB` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#a3a5ba` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#a3a5ba` | 中性 | 继承 text-muted |
| `--border` | `#153648` | 中性 | 来源 panel.border |
| `--border-strong` | `#153648` | 中性 | 继承 border |
| `--border-focus` | `#305862` | 中性 | 来源 focusBorder |
| `--card` | `#002F38` | 中性 | 继承 bg-elevated |
| `--hairline` | `#153648` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#305862` | 强调 | 来源 button.background |
| `--accent-hover` | `#305862` | 强调 | 继承 accent |
| `--accent-deep` | `#305862` | 强调 | 继承 accent |
| `--accent-secondary` | `#002F38` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#BBBBBB` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#1D9A62` | 功能 | 来源 terminal.ansiBrightPURPLE |
| `--warn` | `#dfae64` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#FF5555` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#9876AA` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#FF79C6` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8092AB` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#65BCD9` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#1D9A62` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#00b9af` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#65BCD9` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#00b9af` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#305862` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#305862` | 派生 | 来源 selection.background |
| `--placeholder` | `#8092AB` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#1D9A6266` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#ff555566` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#BBBBBB` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#8092AB` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#1D9A62` | 派生 | 继承 ok |
| `--warn-fill` | `#dfae64` | 派生 | 继承 warn |
| `--danger-fill` | `#FF5555` | 派生 | 继承 danger |
| `--info-fill` | `#9876AA` | 派生 | 继承 info |
| `--queued-fill` | `#FF79C6` | 派生 | 继承 queued |
