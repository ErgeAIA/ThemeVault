# nord/dark 色板表

> 来源：Nord（Sven Greb）官方 `src/nord.css`（16 色定义 + 用途注释）+ `arcticicestudio/nord-visual-studio-code` 主题 JSON。
> 颜色值为源码原文，未改写。语义角色 → Nord 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#2e3440` | 中性 | nord0，editor.background |
| `--bg-surface` | `#3b4252` | 中性 | nord1，statusBar/input/notification 背景 |
| `--bg-surface-2` | `#434c5e` | 中性 | nord2，inactive selection / button.secondary |
| `--bg-elevated` | `#2e3440` | 中性 | nord0，editorWidget.background（浮起层与 bg 同色） |
| `--bg-hover` | `#3b4252` | 中性 | nord1，list.hoverBackground / lineHighlight |
| `--text` | `#d8dee9` | 中性 | nord4，主文本 |
| `--text-muted` | `#4c566a` | 中性 | nord3，editorLineNumber（行号/次要文本） |
| `--text-dim` | `#4c566a` | 中性 | nord3（无第三档，与 muted 同值） |
| `--border` | `#3b4252` | 中性 | nord1，dropdown/panel/sideBar.border |
| `--border-strong` | `#434c5e` | 中性 | nord2 |
| `--border-focus` | `#88c0d0` | 中性 | nord8，焦点相关用 accent（list.focusBackground） |
| `--card` | `#3b4252` | 中性 | nord1，notification/peekView 卡片 |
| `--hairline` | `#4c566a` | 中性 | nord3，editorWhitespace/分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#88c0d0` | 强调 | nord8，官方「accent color of the palette」 |
| `--accent-hover` | `#88c0d0` | 强调 | nord8（button.hover 为全实色，与 accent 同值） |
| `--accent-deep` | `#5e81ac` | 强调 | nord10，frost 最深 |
| `--accent-secondary` | `#8fbcbb` | 强调 | nord7 |
| `--accent-foreground` | `#2e3440` | 强调 | nord0，accent 上文字（badge/button.foreground） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#a3be8c` | 功能 | nord14（success / diff additions） |
| `--warn` | `#ebcb8b` | 功能 | nord13（warnings / git renames） |
| `--danger` | `#bf616a` | 功能 | nord11（errors / diff deletions） |
| `--info` | `#81a1c1` | 功能 | nord9（inputValidation.info） |
| `--queued` | `#b48ead` | 功能 | nord15（numbers / 紫） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#4c566a` | 语法 | nord3（comments） |
| `--syntax-keyword` | `#81a1c1` | 语法 | nord9（keywords/operators/tags） |
| `--syntax-string` | `#a3be8c` | 语法 | nord14（strings） |
| `--syntax-literal` | `#b48ead` | 语法 | nord15（numbers） |
| `--syntax-title` | `#8fbcbb` | 语法 | nord7（classes/types） |
| `--syntax-attr` | `#88c0d0` | 语法 | nord8（attributes） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#a3be8c` | 派生 | 同 ok |
| `--warn-fill` | `#ebcb8b` | 派生 | 同 warn |
| `--danger-fill` | `#bf616a` | 派生 | 同 danger |
| `--info-fill` | `#81a1c1` | 派生 | 同 info |
| `--queued-fill` | `#b48ead` | 派生 | 同 queued |
| `--shadow` | `#00000066` | 派生 | widget.shadow |
| `--sidebar-bg` | `#2e3440` | 派生 | nord0，sideBar.background |
| `--text-secondary` | `#e5e9f0` | 派生 | nord5（ansiWhite） |
| `--selection` | `#434c5ecc` | 派生 | editor.selectionBackground（半透明 nord2） |
| `--diff-insert` | `#81a1c133` | 派生 | diffEditor.insertedTextBackground |
| `--diff-remove` | `#bf616a4d` | 派生 | diffEditor.removedTextBackground |
