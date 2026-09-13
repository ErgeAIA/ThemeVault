# synthwave/dark 色板表

> 来源：官方 themes/synthwave-color-theme.json（VS Code 主题，霓虹风格）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#262335` | 中性 | editor.background |
| `--bg-surface` | `#241b2f` | 中性 | sideBar/statusBar.background |
| `--bg-surface-2` | `#2a2139` | 中性 | input.background |
| `--bg-elevated` | `#171520DC` | 中性 | editorWidget.background（半透明） |
| `--bg-hover` | `#37294d99` | 中性 | list.hoverBackground（半透明） |
| `--text` | `#ffffff` | 中性 | README「text will remain white」+ terminal.foreground |
| `--text-muted` | `#ffffff99` | 中性 | sideBar.foreground（半透明） |
| `--text-dim` | `#ffffff73` | 中性 | editorLineNumber.foreground（45% 白） |
| `--border` | `#1f212b` | 中性 | focusBorder（深紫黑描边） |
| `--border-strong` | `#2a2139` | 中性 | input.background 系 |
| `--border-focus` | `#f97e72` | 中性 | editorCursor（霓虹珊瑚） |
| `--card` | `#171520DC` | 中性 | editorWidget.background |
| `--hairline` | `#ffffff22` | 中性 | editorWidget.border（半透明白） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#f97e72` | 强调 | activityBarBadge/cursor（霓虹珊瑚品牌） |
| `--accent-hover` | `#f97e72` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#f97e72` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#03edf9` | 强调 | terminalCursor 青（次强调） |
| `--accent-foreground` | `#2a2139` | 强调 | activityBarBadge.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#72f1b8` | 功能 | terminal.ansiGreen |
| `--warn` | `#f3e70f` | 功能 | terminal.ansiYellow |
| `--danger` | `#fe4450` | 功能 | terminal.ansiRed |
| `--info` | `#03edf9` | 功能 | terminal.ansiBlue |
| `--queued` | `#ff7edb` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#848bbd` | 语法 | comment |
| `--syntax-keyword` | `#fede5d` | 语法 | keyword（黄） |
| `--syntax-string` | `#ff8b39` | 语法 | string（橙） |
| `--syntax-literal` | `#f97e72` | 语法 | number（珊瑚粉） |
| `--syntax-title` | `#36f9f6` | 语法 | function（青） |
| `--syntax-attr` | `#fede5d` | 语法 | attribute（黄） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#72f1b8` | 派生 | 同 ok |
| `--warn-fill` | `#f3e70f` | 派生 | 同 warn |
| `--danger-fill` | `#fe4450` | 派生 | 同 danger |
| `--info-fill` | `#03edf9` | 派生 | 同 info |
| `--queued-fill` | `#ff7edb` | 派生 | 同 queued |
| `--selection` | `#ffffff20` | 派生 | selection.background |
