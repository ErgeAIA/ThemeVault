# iceberg/dark 色板表

> 来源：官方 themes/iceberg.color-theme.json（VS Code 主题，低对比柔和）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#161821` | 中性 | editor.background |
| `--bg-surface` | `#161821` | 中性 | sideBar.background（同 bg） |
| `--bg-surface-2` | `#0f1117` | 中性 | input.background |
| `--bg-elevated` | `#1e2132` | 中性 | editorWidget.background |
| `--bg-hover` | `#1e2132` | 中性 | list.hoverBackground |
| `--text` | `#c6c8d1` | 中性 | editor.foreground |
| `--text-muted` | `#6b7089` | 中性 | badge.foreground / comment 系 |
| `--text-dim` | `#444b71` | 中性 | editorLineNumber.foreground |
| `--border` | `#1e2132` | 中性 | editorWidget.border |
| `--border-strong` | `#0e1015` | 中性 | sideBar/panel.border |
| `--border-focus` | `#242940` | 中性 | focusBorder |
| `--card` | `#1e2132` | 中性 | editorWidget/notifications |
| `--hairline` | `#444b71` | 中性 | 行号/极淡分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#84a0c6` | 强调 | activityBarBadge（品牌蓝） |
| `--accent-hover` | `#84a0c6` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#84a0c6` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#89b8c2` | 强调 | cyan（次强调） |
| `--accent-foreground` | `#161821` | 强调 | activityBarBadge.foreground（深底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#b4be82` | 功能 | terminal.ansiGreen |
| `--warn` | `#e2a478` | 功能 | terminal.ansiYellow |
| `--danger` | `#e27878` | 功能 | terminal.ansiRed |
| `--info` | `#84a0c6` | 功能 | terminal.ansiBlue |
| `--queued` | `#a093c7` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6b7089` | 语法 | comment |
| `--syntax-keyword` | `#84a0c6` | 语法 | keyword（蓝） |
| `--syntax-string` | `#a093c7` | 语法 | string（紫） |
| `--syntax-literal` | `#e2a478` | 语法 | number（橙，与 warn 同） |
| `--syntax-title` | `#c6c8d1` | 语法 | function（浅色） |
| `--syntax-attr` | `#a093c7` | 语法 | attribute（紫） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#b4be82` | 派生 | 同 ok |
| `--warn-fill` | `#e2a478` | 派生 | 同 warn |
| `--danger-fill` | `#e27878` | 派生 | 同 danger |
| `--info-fill` | `#84a0c6` | 派生 | 同 info |
| `--queued-fill` | `#a093c7` | 派生 | 同 queued |
| `--selection` | `#4a548266` | 派生 | selection.background |
