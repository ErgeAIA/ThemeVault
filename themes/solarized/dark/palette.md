# solarized/dark 色板表

> 来源：solarized（Ethan Schoonover）官方 `xresources/solarized` + `vim-colors-solarized`（GUI 16 色）。
> 颜色值为源码原文，未改写。语义角色 → Solarized 命名色映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#002b36` | 中性 | base03，最底层背景 |
| `--bg-surface` | `#073642` | 中性 | base02 |
| `--bg-surface-2` | `#073642` | 中性 | base02（dark 背景仅两档，与 surface 同值） |
| `--bg-elevated` | `#073642` | 中性 | base02 |
| `--bg-hover` | `#073642` | 中性 | base02 |
| `--text` | `#839496` | 中性 | base0，主文本 |
| `--text-muted` | `#93a1a1` | 中性 | base1 |
| `--text-dim` | `#586e75` | 中性 | base01（注释/弱文本） |
| `--border` | `#586e75` | 中性 | base01 |
| `--border-strong` | `#839496` | 中性 | base0 |
| `--border-focus` | `#2aa198` | 中性 | cyan（焦点用强调色） |
| `--card` | `#073642` | 中性 | base02 |
| `--hairline` | `#073642` | 中性 | base02 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#268bd2` | 强调 | blue，主强调 |
| `--accent-hover` | `#2aa198` | 强调 | cyan |
| `--accent-deep` | `#268bd2` | 强调 | blue（无更深变体，沿用 accent） |
| `--accent-secondary` | `#2aa198` | 强调 | cyan |
| `--accent-foreground` | `#fdf6e3` | 强调 | base3，accent 上文字 |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#859900` | 功能 | green |
| `--warn` | `#b58900` | 功能 | yellow |
| `--danger` | `#dc322f` | 功能 | red |
| `--info` | `#268bd2` | 功能 | blue |
| `--queued` | `#6c71c4` | 功能 | violet |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#586e75` | 语法 | base01 |
| `--syntax-keyword` | `#859900` | 语法 | green |
| `--syntax-string` | `#2aa198` | 语法 | cyan |
| `--syntax-literal` | `#cb4b16` | 语法 | orange（数字/常量） |
| `--syntax-title` | `#268bd2` | 语法 | blue（函数/类型） |
| `--syntax-attr` | `#b58900` | 语法 | yellow（属性） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#859900` | 派生 | 同 ok |
| `--warn-fill` | `#b58900` | 派生 | 同 warn |
| `--danger-fill` | `#dc322f` | 派生 | 同 danger |
| `--info-fill` | `#268bd2` | 派生 | 同 info |
| `--queued-fill` | `#6c71c4` | 派生 | 同 queued |
| `--text-secondary` | `#839496` | 派生 | base0（次级文本） |
