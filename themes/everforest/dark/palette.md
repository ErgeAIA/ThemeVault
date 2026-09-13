# everforest/dark 色板表


> 来源：官方 autoload/everforest.vim 的 medium dark palette（默认 background=medium）。颜色值为源码原文，未改写。
> 语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#2d353b` | 中性 | bg0, editor 背景 |
| `--bg-surface` | `#343f44` | 中性 | bg1 |
| `--bg-surface-2` | `#3d484d` | 中性 | bg2 |
| `--bg-elevated` | `#475258` | 中性 | bg3 |
| `--bg-hover` | `#3d484d` | 中性 | bg2 |
| `--text` | `#d3c6aa` | 中性 | fg |
| `--text-muted` | `#9da9a0` | 中性 | grey2 次要文本 |
| `--text-dim` | `#7a8478` | 中性 | grey0 弱文本 |
| `--border` | `#3d484d` | 中性 | bg2 |
| `--border-strong` | `#475258` | 中性 | bg3 |
| `--border-focus` | `#7fbbb3` | 中性 | blue（品牌青焦点） |
| `--card` | `#343f44` | 中性 | bg1 |
| `--hairline` | `#343f44` | 中性 | bg1 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#a7c080` | 强调 | green（品牌绿，statusline1） |
| `--accent-hover` | `#83c092` | 强调 | aqua（青） |
| `--accent-deep` | `#7fbbb3` | 强调 | blue |
| `--accent-secondary` | `#7fbbb3` | 强调 | blue（青蓝） |
| `--accent-foreground` | `#2d353b` | 强调 | bg0（深底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#a7c080` | 功能 | green |
| `--warn` | `#dbbc7f` | 功能 | yellow |
| `--danger` | `#e67e80` | 功能 | red |
| `--info` | `#7fbbb3` | 功能 | blue |
| `--queued` | `#d699b6` | 功能 | purple |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#7a8478` | 语法 | grey0 |
| `--syntax-keyword` | `#e67e80` | 语法 | red（keyword） |
| `--syntax-string` | `#a7c080` | 语法 | green |
| `--syntax-literal` | `#e69875` | 语法 | orange（number） |
| `--syntax-title` | `#7fbbb3` | 语法 | blue（function） |
| `--syntax-attr` | `#dbbc7f` | 语法 | yellow（attribute） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#a7c080` | 派生 | 同 ok |
| `--warn-fill` | `#dbbc7f` | 派生 | 同 warn |
| `--danger-fill` | `#e67e80` | 派生 | 同 danger |
| `--info-fill` | `#7fbbb3` | 派生 | 同 info |
| `--queued-fill` | `#d699b6` | 派生 | 同 queued |
