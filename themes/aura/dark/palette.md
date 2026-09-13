# aura/dark 色板表

> 来源：aura-theme `src/core/colors/schemes/dark.ts` + `common.ts` + VSCode `aura-dark-color-theme.json`（MIT）。
> 颜色值为官方 accent 阶梯原文，未改写。语义角色 → Aura 令牌映射见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#15141b` | 中性 | Aura accent12（editor.background） |
| `--bg-surface` | `#121016` | 中性 | accent24（titleBar/statusBar/editorWidget） |
| `--bg-surface-2` | `#2d2b38` | 中性 | accent30（list.activeSelectionBackground） |
| `--bg-elevated` | `#110f18` | 中性 | accent21（sideBar；Aura 侧栏比 bg 更暗） |
| `--bg-hover` | `#3b334b` | 中性 | accent23（list.hoverBackground） |
| `--text` | `#edecee` | 中性 | accent7（editor.foreground） |
| `--text-muted` | `#cdccce` | 中性 | accent9（dropdown/input.foreground） |
| `--text-dim` | `#6d6d6d` | 中性 | accent8（tab.inactiveForeground / comment） |
| `--border` | `#3b334b` | 中性 | accent23（dropdown/input.border） |
| `--border-strong` | `#000000` | 中性 | accent11（panel/titleBar/tab.border） |
| `--border-focus` | `#a277ff` | 中性 | accent1（inputOption.activeBorder；focusBorder 本体为 accent17 半透明） |
| `--card` | `#121016` | 中性 | accent24（editorWidget.background） |
| `--hairline` | `#2d2d2d` | 中性 | accent13（editorWidget.border） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#a277ff` | 强调 | accent1（紫，品牌色：badge/cursor/selection/focus） |
| `--accent-hover` | `#49c29a` | 强调 | accent25（button.hoverBackground；紫无显式 hover，此为 secondary 按钮 hover） |
| `--accent-deep` | `#29263c` | 强调 | accent38（紫 selection 无 alpha 实体版） |
| `--accent-secondary` | `#61ffca` | 强调 | accent2（绿，button/progress/tab-active） |
| `--accent-foreground` | `#15141b` | 强调 | accent12（badge/button 上文字） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#61ffca` | 功能 | accent2（success/green） |
| `--warn` | `#ffca85` | 功能 | accent3（warning/orange） |
| `--danger` | `#ff6767` | 功能 | accent5（error/red） |
| `--info` | `#82e2ff` | 功能 | accent32（blue） |
| `--queued` | `#f694ff` | 功能 | accent6（pink） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6d6d6d` | 语法 | accent8（comment） |
| `--syntax-keyword` | `#a277ff` | 语法 | accent1（keyword/storage/tag） |
| `--syntax-string` | `#61ffca` | 语法 | accent2（string/constant） |
| `--syntax-literal` | `#9dff65` | 语法 | accent4（官方色板值；VSCode 端口未映射） |
| `--syntax-title` | `#ffca85` | 语法 | accent3（entity.name.function） |
| `--syntax-attr` | `#f694ff` | 语法 | accent6（entity.other.attribute-name） |

## 派生 / 结构色（主题显式覆盖才填）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#61ffca` | 功能 | 无独立 fill，沿用本体 |
| `--warn-fill` | `#ffca85` | 功能 | 无独立 fill，沿用本体 |
| `--danger-fill` | `#ff474720` | 功能 | accent27（diff removed 半透明红） |
| `--info-fill` | `#82e2ff` | 功能 | 无独立 fill，沿用本体 |
| `--queued-fill` | `#f694ff` | 功能 | 无独立 fill，沿用本体 |
| `--shadow` | `#0f0f0f` | 派生 | accent0（widget.shadow） |
| `--selection` | `#3d375e7f` | 派生 | accent20（primary-selection，半透明紫） |
| `--selection-solid` | `#29263c` | 派生 | accent38（无 alpha） |
| `--placeholder` | `#af8aff7f` | 派生 | accent14（input.placeholderForeground） |
| `--diff-insert` | `#00d89023` | 派生 | accent26（diffEditor.insertedTextBackground） |
| `--diff-remove` | `#ff474720` | 派生 | accent27（diffEditor.removedTextBackground） |
| `--statusbar-foreground` | `#adacae` | 派生 | accent10（statusBar.foreground） |
| `--activitybar-inactive` | `#525156` | 派生 | accent35（activityBar.inactiveForeground） |
