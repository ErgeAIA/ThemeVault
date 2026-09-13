# dracula/dark 色板表

> 来源：dracula/visual-studio-code `src/dracula.yml`（MIT），YAML 锚点原文。
> 颜色值为官方定义原文，未改写。类型按 ThemeVault 规范标注。
> 语义角色 → Dracula 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#282a36` | 中性 | BG（editor.background） |
| `--bg-surface` | `#21222c` | 中性 | BGDark（sideBar.background） |
| `--bg-surface-2` | `#191a21` | 中性 | BGDarker（statusBar.background） |
| `--bg-elevated` | `#343746` | 中性 | BGLight（activityBar/dropdown.background） |
| `--bg-hover` | `#44475a75` | 中性 | LineHighlight（list.hoverBackground，半透明；纯色 #44475a） |
| `--text` | `#f8f8f2` | 中性 | FG（editor.foreground） |
| `--text-muted` | `#6272a4` | 中性 | COMMENT（editorLineNumber.foreground） |
| `--text-dim` | `#6272a4` | 中性 | 无独立更暗文本色，沿用 comment（与 muted 同值） |
| `--border` | `#343746` | 中性 | BGLight（分隔灰） |
| `--border-strong` | `#424450` | 中性 | BGLighter |
| `--border-focus` | `#6272a4` | 中性 | focusBorder（COMMENT） |
| `--card` | `#21222c` | 中性 | BGDark（editorWidget.background） |
| `--hairline` | `#191a21` | 中性 | BGDarker（tabsBackground） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#bd93f9` | 强调 | PURPLE（品牌紫） |
| `--accent-hover` | `#ff79c6` | 强调 | PINK（无官方 hover，取惯例粉） |
| `--accent-deep` | `#bd93f9` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#8be9fd` | 强调 | CYAN |
| `--accent-foreground` | `#f8f8f2` | 强调 | FG（badge/button.foreground 惯例） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#50fa7b` | 功能 | GREEN |
| `--warn` | `#f1fa8c` | 功能 | YELLOW |
| `--danger` | `#ff5555` | 功能 | RED |
| `--info` | `#8be9fd` | 功能 | CYAN |
| `--queued` | `#ff79c6` | 功能 | PINK（无官方，取强调粉） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6272a4` | 语法 | COMMENT |
| `--syntax-keyword` | `#ff79c6` | 语法 | PINK（keyword） |
| `--syntax-string` | `#f1fa8c` | 语法 | YELLOW（string） |
| `--syntax-literal` | `#bd93f9` | 语法 | PURPLE（constant/numeric） |
| `--syntax-title` | `#8be9fd` | 语法 | CYAN（entity.name.type.class；markup.heading 为 PURPLE） |
| `--syntax-attr` | `#50fa7b` | 语法 | GREEN（attribute-name/function） |

## 派生 / 结构色（主题显式覆盖才填）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#50fa7b` | 功能 | 无独立 fill，沿用本体 |
| `--warn-fill` | `#f1fa8c` | 功能 | 无独立 fill，沿用本体 |
| `--danger-fill` | `#ff5555` | 功能 | 无独立 fill，沿用本体 |
| `--info-fill` | `#8be9fd` | 功能 | 无独立 fill，沿用本体 |
| `--queued-fill` | `#ff79c6` | 功能 | 无独立 fill，沿用本体 |
| `--selection` | `#44475a` | 派生 | SELECTION（editor.selectionBackground，纯色无 alpha） |
| `--selection-solid` | `#44475a` | 派生 | 官方 selection 即纯色，无半透明版 |
| `--placeholder` | `#6272a4` | 派生 | input.placeholderForeground（COMMENT） |
| `--diff-insert` | `#50fa7b` | 派生 | diffEditor.insertedTextBackground（alpha 20 的绿，纯色版） |
| `--diff-remove` | `#ff5555` | 派生 | diffEditor.removedTextBackground（alpha 50 的红，纯色版） |
| `--statusbar-foreground` | `#f8f8f2` | 派生 | statusBar.foreground（FG） |
| `--activitybar-inactive` | `#6272a4` | 派生 | 无官方 inactive，取 COMMENT（合理推断） |
