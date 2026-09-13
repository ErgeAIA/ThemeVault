# rose-pine/main 色板表


> 来源：rose-pine/neovim 的 lua/rose-pine/palette.lua 的 main 变体（官方 palette 定义源）。颜色值为源码原文，未改写。
> 语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#191724` | 中性 | base |
| `--bg-surface` | `#1f1d2e` | 中性 | surface |
| `--bg-surface-2` | `#26233a` | 中性 | overlay |
| `--bg-elevated` | `#26233a` | 中性 | overlay |
| `--bg-hover` | `#26233a` | 中性 | overlay |
| `--text` | `#e0def4` | 中性 | text |
| `--text-muted` | `#908caa` | 中性 | subtle（次级文本） |
| `--text-dim` | `#6e6a86` | 中性 | muted（弱文本） |
| `--border` | `#26233a` | 中性 | overlay |
| `--border-strong` | `#403d52` | 中性 | highlight_med |
| `--border-focus` | `#c4a7e7` | 中性 | iris（焦点用紫） |
| `--card` | `#1f1d2e` | 中性 | surface |
| `--hairline` | `#21202e` | 中性 | highlight_low |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ebbcba` | 强调 | rose（玫瑰粉，品牌色） |
| `--accent-hover` | `#ebbcba` | 强调 | 无显式 hover，同值 |
| `--accent-deep` | `#31748f` | 强调 | pine（松青蓝） |
| `--accent-secondary` | `#c4a7e7` | 强调 | iris（紫） |
| `--accent-foreground` | `#191724` | 强调 | base（深底） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#31748f` | 功能 | pine（success） |
| `--warn` | `#f6c177` | 功能 | gold |
| `--danger` | `#eb6f92` | 功能 | love（红粉） |
| `--info` | `#9ccfd8` | 功能 | foam（青） |
| `--queued` | `#c4a7e7` | 功能 | iris（紫，第 6 通道） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6e6a86` | 语法 | muted |
| `--syntax-keyword` | `#31748f` | 语法 | pine |
| `--syntax-string` | `#f6c177` | 语法 | gold |
| `--syntax-literal` | `#f6c177` | 语法 | gold（number，同 string） |
| `--syntax-title` | `#ebbcba` | 语法 | rose（function） |
| `--syntax-attr` | `#c4a7e7` | 语法 | iris（attribute） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#31748f` | 派生 | 同 ok |
| `--warn-fill` | `#f6c177` | 派生 | 同 warn |
| `--danger-fill` | `#eb6f92` | 派生 | 同 danger |
| `--info-fill` | `#9ccfd8` | 派生 | 同 info |
| `--queued-fill` | `#c4a7e7` | 派生 | 同 queued |
