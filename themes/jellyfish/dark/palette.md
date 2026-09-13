# jellyfish/dark 色板表

> 来源：JellyFish（Apache-2.0）`JellyFish.json`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#00002c` | 中性 | 来源 editor.background |
| `--bg-surface` | `#00002c` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#000124` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#171520dc` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#4e484862` | 中性 | 来源 list.hoverBackground |
| `--text` | `#ffffff` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#8686867c` | 中性 | 来源 editorLineNumber.foreground |
| `--text-dim` | `#8686867c` | 中性 | 继承 text-muted |
| `--border` | `#ff4800` | 中性 | 来源 panel.border |
| `--border-strong` | `#ff4800` | 中性 | 继承 border |
| `--border-focus` | `#1f212b` | 中性 | 来源 focusBorder |
| `--card` | `#171520dc` | 中性 | 继承 bg-elevated |
| `--hairline` | `#ff4800` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ff0055` | 强调 | 来源 button.background |
| `--accent-hover` | `#ff0055` | 强调 | 继承 accent |
| `--accent-deep` | `#ff0055` | 强调 | 继承 accent |
| `--accent-secondary` | `#ffd900` | 强调 | 来源 badge.background |
| `--accent-foreground` | `#ffffff` | 强调 | 来源 editor.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#00f7ff` | 功能 | 来源 约定 |
| `--warn` | `#ffd900` | 功能 | 来源 badge.background |
| `--danger` | `#ff0055` | 功能 | 来源 button.background |
| `--info` | `#00f7ff` | 功能 | 来源 约定 |
| `--queued` | `#FF92A5` | 功能 | 来源 约定 |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#838383` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#ff0062` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#EEFFFF` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#EEFFFF` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#00ffff` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#00fff2` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#ff00885d` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#ff00885d` | 派生 | 来源 editor.selectionBackground |
| `--diff-insert` | `#20a5842d` | 派生 | 来源 diffEditor.insertedTextBackground |
| `--statusbar-foreground` | `#a1a1a183` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#ffffff6c` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#00f7ff` | 派生 | 继承 ok |
| `--warn-fill` | `#ffd900` | 派生 | 继承 warn |
| `--danger-fill` | `#ff0055` | 派生 | 继承 danger |
| `--info-fill` | `#00f7ff` | 派生 | 继承 info |
| `--queued-fill` | `#FF92A5` | 派生 | 继承 queued |
