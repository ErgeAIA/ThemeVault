# everforest/light 色板表


> 来源：官方 autoload/everforest.vim 的 medium light palette。颜色值为源码原文，未改写。
> 语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#fdf6e3` | 中性 | bg0 |
| `--bg-surface` | `#f4f0d9` | 中性 | bg1 |
| `--bg-surface-2` | `#efebd4` | 中性 | bg2 |
| `--bg-elevated` | `#e6e2cc` | 中性 | bg3 |
| `--bg-hover` | `#efebd4` | 中性 | bg2 |
| `--text` | `#5c6a72` | 中性 | fg |
| `--text-muted` | `#829181` | 中性 | grey2 |
| `--text-dim` | `#a6b0a0` | 中性 | grey0 |
| `--border` | `#efebd4` | 中性 | bg2 |
| `--border-strong` | `#e6e2cc` | 中性 | bg3 |
| `--border-focus` | `#3a94c5` | 中性 | blue |
| `--card` | `#f4f0d9` | 中性 | bg1 |
| `--hairline` | `#f4f0d9` | 中性 | bg1 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#8da101` | 强调 | green（品牌绿） |
| `--accent-hover` | `#35a77c` | 强调 | aqua |
| `--accent-deep` | `#3a94c5` | 强调 | blue |
| `--accent-secondary` | `#3a94c5` | 强调 | blue |
| `--accent-foreground` | `#fdf6e3` | 强调 | bg0（浅底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#8da101` | 功能 | green |
| `--warn` | `#dfa000` | 功能 | yellow |
| `--danger` | `#f85552` | 功能 | red |
| `--info` | `#3a94c5` | 功能 | blue |
| `--queued` | `#df69ba` | 功能 | purple |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#a6b0a0` | 语法 | grey0 |
| `--syntax-keyword` | `#f85552` | 语法 | red |
| `--syntax-string` | `#8da101` | 语法 | green |
| `--syntax-literal` | `#f57d26` | 语法 | orange（number） |
| `--syntax-title` | `#3a94c5` | 语法 | blue（function） |
| `--syntax-attr` | `#dfa000` | 语法 | yellow（attribute） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#8da101` | 派生 | 同 ok |
| `--warn-fill` | `#dfa000` | 派生 | 同 warn |
| `--danger-fill` | `#f85552` | 派生 | 同 danger |
| `--info-fill` | `#3a94c5` | 派生 | 同 info |
| `--queued-fill` | `#df69ba` | 派生 | 同 queued |
