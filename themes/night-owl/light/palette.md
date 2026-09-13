# night-owl/light 色板表

> 来源：官方 themes/Night Owl-Light-color-theme.json（VS Code 主题）。颜色值为源码原文，未改写。
> 语义角色 → VS Code 语义键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#FBFBFB` | 中性 | editor.background |
| `--bg-surface` | `#F0F0F0` | 中性 | sideBar.background |
| `--bg-surface-2` | `#F0F0F0` | 中性 | input.background（同 surface） |
| `--bg-elevated` | `#F0F0F0` | 中性 | editorWidget.background（同 surface） |
| `--bg-hover` | `#d3e8f8` | 中性 | list.hoverBackground |
| `--text` | `#403f53` | 中性 | editor.foreground |
| `--text-muted` | `#989fb1` | 中性 | comment 系次要文本 |
| `--text-dim` | `#90A7B2` | 中性 | editorLineNumber.foreground |
| `--border` | `#d9d9d9` | 中性 | panel.border |
| `--border-strong` | `#F0F0F0` | 中性 | sideBar.border（同 surface） |
| `--border-focus` | `#93A1A1` | 中性 | focusBorder |
| `--card` | `#F0F0F0` | 中性 | editorWidget.background |
| `--hairline` | `#90A7B2` | 中性 | 行号/极淡分隔 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#2AA298` | 强调 | button.background（青绿品牌） |
| `--accent-hover` | `#2AA298` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#2AA298` | 强调 | 无更深变体，沿用 accent |
| `--accent-secondary` | `#288ed7` | 强调 | 蓝（次强调） |
| `--accent-foreground` | `#F0F0F0` | 强调 | button.foreground |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#08916a` | 功能 | terminal.ansiGreen |
| `--warn` | `#E0AF02` | 功能 | terminal.ansiYellow |
| `--danger` | `#de3d3b` | 功能 | terminal.ansiRed |
| `--info` | `#288ed7` | 功能 | terminal.ansiBlue |
| `--queued` | `#d6438a` | 功能 | terminal.ansiMagenta |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#989fb1` | 语法 | comment |
| `--syntax-keyword` | `#5ca7e4` | 语法 | keyword |
| `--syntax-string` | `#4876d6` | 语法 | string |
| `--syntax-literal` | `#aa0982` | 语法 | number |
| `--syntax-title` | `#111111` | 语法 | function |
| `--syntax-attr` | `#4876d6` | 语法 | attribute |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#08916a` | 派生 | 同 ok |
| `--warn-fill` | `#E0AF02` | 派生 | 同 warn |
| `--danger-fill` | `#de3d3b` | 派生 | 同 danger |
| `--info-fill` | `#288ed7` | 派生 | 同 info |
| `--queued-fill` | `#d6438a` | 派生 | 同 queued |
| `--selection` | `#7a8181ad` | 派生 | selection.background |
