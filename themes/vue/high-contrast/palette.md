# vue/high-contrast 色板表

> 来源：Vue Theme（MIT）`vue-hc.json`（dark）。
> 颜色值为源码原文（VS Code color theme 语义键），未改写；缺失角色按家族映射约定值并标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#002933` | 中性 | 来源 editor.background |
| `--bg-surface` | `#002933` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--bg-surface-2` | `#002933` | 中性 | 来源 activityBar.background |
| `--bg-elevated` | `#002933` | 中性 | 来源 editorWidget.background |
| `--bg-hover` | `#09698180` | 中性 | 来源 list.hoverBackground |
| `--text` | `#E6E6E6` | 中性 | 来源 editor.foreground |
| `--text-muted` | `#586e75` | 中性 | 来源 约定 |
| `--text-dim` | `#586e75` | 中性 | 继承 text-muted |
| `--border` | `#002933` | 中性 | 来源 editorGroupHeader.tabsBackground |
| `--border-strong` | `#002933` | 中性 | 继承 border |
| `--border-focus` | `#00b7ff` | 中性 | 来源 focusBorder |
| `--card` | `#002933` | 中性 | 继承 bg-elevated |
| `--hairline` | `#002933` | 中性 | 继承 border |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#14c5ab` | 强调 | 来源 button.background |
| `--accent-hover` | `#14c5ab` | 强调 | 继承 accent |
| `--accent-deep` | `#14c5ab` | 强调 | 继承 accent |
| `--accent-secondary` | `#14c5ab` | 强调 | 来源 button.background |
| `--accent-foreground` | `#002933` | 强调 | 来源 button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#19f9d8` | 功能 | 来源 约定 |
| `--warn` | `#e6a23c` | 功能 | 来源 约定 |
| `--danger` | `#dc322f` | 功能 | 来源 约定 |
| `--info` | `#268bd2` | 功能 | 来源 约定 |
| `--queued` | `#b58900` | 功能 | 来源 约定 |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#9e9e9e` | 语法 | 来源 syntax-comment |
| `--syntax-keyword` | `#ff0e56` | 语法 | 来源 syntax-keyword |
| `--syntax-string` | `#9e9e9e` | 语法 | 来源 syntax-string |
| `--syntax-literal` | `#ffbe79` | 语法 | 来源 syntax-literal |
| `--syntax-title` | `#8be1f7` | 语法 | 来源 syntax-title |
| `--syntax-attr` | `#ffbe79` | 语法 | 来源 syntax-attr |

## 派生 / 结构色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--selection` | `#000000` | 派生 | 来源 editor.selectionBackground |
| `--selection-solid` | `#000000` | 派生 | 来源 editor.selectionBackground |
| `--statusbar-foreground` | `#14c5ab` | 派生 | 来源 statusBar.foreground |
| `--activitybar-inactive` | `#9e9e9e` | 派生 | 来源 activityBar.inactiveForeground |
| `--ok-fill` | `#19f9d8` | 派生 | 继承 ok |
| `--warn-fill` | `#e6a23c` | 派生 | 继承 warn |
| `--danger-fill` | `#dc322f` | 派生 | 继承 danger |
| `--info-fill` | `#268bd2` | 派生 | 继承 info |
| `--queued-fill` | `#b58900` | 派生 | 继承 queued |
