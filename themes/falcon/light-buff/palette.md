# falcon/light-buff 色板表

> 来源：Falcon（MIT）`light/buff.yml`（light）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#F7F7F2` | 中性 | 来源 editor.background |
| `--bg-surface` | `#F7F7F2` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#F7F7F2` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#F7F7F2` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#EEE8D5` | 中性 | 来源 list.hoverBackground |
| `--text` | `#383A42` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#aeb3c2` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#aeb3c2` | 中性 | 继承 text-muted |
| `--border` | `#edede8` | 中性 | 来源 panel.border |
| `--border-strong` | `#edede8` | 中性 | 继承 border |
| `--border-focus` | `#ddb900` | 中性 | 来源 focusBorder |
| `--card` | `#F7F7F2` | 中性 | 继承 bg-elevated |
| `--hairline` | `#edede8` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#CCC8B6` | 强调 | 来源 button.background |
| `--accent-hover` | `#CCC8B6` | 强调 | 继承 accent |
| `--accent-deep` | `#CCC8B6` | 强调 | 继承 accent |
| `--accent-secondary` | `#F7F7F2` | 强调 | 来源 button.secondaryBackground |
| `--accent-foreground` | `#383A42` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#2fc864` | 功能 | 来源 terminal.ansiBrightPURPLE |
| `--warn` | `#dfae64` | 功能 | 来源 terminal.ansiYellow |
| `--danger` | `#FF5555` | 功能 | 来源 terminal.ansiRed |
| `--info` | `#871790` | 功能 | 来源 terminal.ansiBlue |
| `--queued` | `#FF79C6` | 功能 | 来源 terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#9DA0A8` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#007297` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#067D17` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#174ad4` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#007297` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#174ad4` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#CCC8B6` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#CCC8B6` | 派生 | 来源 selection.background |
| `--placeholder` | `#9DA0A8` | 派生 | 来源 input.placeholderForeground |
| `--diff-insert` | `#067D1766` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--diff-remove` | `#FF555566` | 派生 | 来源 diffEditor.removedTextBackground |
| `--statusbar-foreground` | `#383A42` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#9DA0A8` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#2fc864` | 派生 | 继承 ok |
| `--warn-fill` | `#dfae64` | 派生 | 继承 warn |
| `--danger-fill` | `#FF5555` | 派生 | 继承 danger |
| `--info-fill` | `#871790` | 派生 | 继承 info |
| `--queued-fill` | `#FF79C6` | 派生 | 继承 queued |
