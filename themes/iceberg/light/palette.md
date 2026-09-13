# iceberg/light 色板表

> 来源：官方 themes/iceberg-light.color-theme.json（VS Code 主题）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#e8e9ec` | 中性 | editor.background |
| `--bg-surface` | `#e8e9ec` | 中性 | sideBar.background（同 bg） |
| `--bg-surface-2` | `#c8cfdd` | 中性 | statusBar.background |
| `--bg-elevated` | `#dcdfe7` | 中性 | editorWidget.background |
| `--bg-hover` | `#dcdfe7` | 中性 | 同 elevated |
| `--text` | `#33374c` | 中性 | editor.foreground |
| `--text-muted` | `#8389a3` | 中性 | comment 系次要文本 |
| `--text-dim` | `#9fa7bd` | 中性 | editorLineNumber.foreground |
| `--border` | `#c8cfdd` | 中性 | panel.border |
| `--border-strong` | `#e8e9ec` | 中性 | sideBar.border（同 bg） |
| `--border-focus` | `#cbcfda` | 中性 | focusBorder |
| `--card` | `#dcdfe7` | 中性 | editorWidget.background |
| `--hairline` | `#9fa7bd` | 中性 | 行号/极淡分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#2d539e` | 强调 | activityBarBadge（品牌蓝） |
| `--accent-hover` | `#2d539e` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#2d539e` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#3f83a6` | 强调 | cyan（次强调） |
| `--accent-foreground` | `#e8e9ec` | 强调 | activityBarBadge.foreground（浅底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#668e3d` | 功能 | terminal.ansiGreen |
| `--warn` | `#c57339` | 功能 | terminal.ansiYellow |
| `--danger` | `#cc517a` | 功能 | terminal.ansiRed |
| `--info` | `#2d539e` | 功能 | terminal.ansiBlue |
| `--queued` | `#7759b4` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8389a3` | 语法 | comment |
| `--syntax-keyword` | `#2d539e` | 语法 | keyword（蓝） |
| `--syntax-string` | `#7759b4` | 语法 | string（紫） |
| `--syntax-literal` | `#c57339` | 语法 | number（橙，与 warn 同） |
| `--syntax-title` | `#33374c` | 语法 | function |
| `--syntax-attr` | `#7759b4` | 语法 | attribute（紫） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#668e3d` | 派生 | 同 ok |
| `--warn-fill` | `#c57339` | 派生 | 同 warn |
| `--danger-fill` | `#cc517a` | 派生 | 同 danger |
| `--info-fill` | `#2d539e` | 派生 | 同 info |
| `--queued-fill` | `#7759b4` | 派生 | 同 queued |
| `--selection` | `#aeb2c666` | 派生 | selection.background |
