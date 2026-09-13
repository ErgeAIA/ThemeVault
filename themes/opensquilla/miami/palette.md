# opensquilla-miami 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/miami/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#FFF6F2` | 中性 |  |
| `--bg-surface` | `#FFFBF8` | 中性 |  |
| `--bg-surface-2` | `#FEEEE6` | 中性 |  |
| `--bg-elevated` | `#FFFFFF` | 中性 |  |
| `--bg-hover` | `#FCE3DA` | 中性 |  |
| `--text` | `#2A1830` | 中性 |  |
| `--text-muted` | `#6B4A5E` | 中性 |  |
| `--text-dim` | `#875E72` | 中性 |  |
| `--border` | `#F3CFC2` | 中性 |  |
| `--border-strong` | `#E9AC98` | 中性 |  |
| `--border-focus` | `#E6197E` | 中性 |  |
| `--card` | `#FFFBF8` | 中性 |  |
| `--hairline` | `#F7DED4` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#D71776` | 强调 |  |
| `--accent-hover` | `#C90F69` | 强调 |  |
| `--accent-deep` | `#A20A54` | 强调 |  |
| `--accent-secondary` | `#077B92` | 强调 |  |
| `--accent-foreground` | `#FFFFFF` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#0A7F5C` | 功能 |  |
| `--warn` | `#B85400` | 功能 |  |
| `--danger` | `#CC1A43` | 功能 |  |
| `--info` | `#0A73A8` | 功能 |  |
| `--queued` | `#7A4BD1` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#9A7A88` | 语法 |  |
| `--syntax-keyword` | `#C90F69` | 语法 |  |
| `--syntax-string` | `#0A835F` | 语法 |  |
| `--syntax-literal` | `#B0006E` | 语法 |  |
| `--syntax-title` | `#0A73A8` | 语法 |  |
| `--syntax-attr` | `#7A4BD1` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--shadow` | `rgba(0,0,0,0.10)` | 派生 |  |
| `--shadow-color` | `rgba(0,0,0,0.10)` | 派生 |  |
| `--scrim` | `rgba(0,0,0,0.40)` | 派生 |  |
| `--elev-highlight` | `rgba(255,255,255,0.9)` | 派生 |  |
| `--elev-1` | `0 0 0 1px var(--border), 0 1px 2px rgba(16,20,26,0.05), 0 4px 12px -4px rgba(16,20,26,0.10)` | 派生 |  |
| `--elev-1-hover` | `0 0 0 1px var(--border-strong), 0 2px 4px rgba(16,20,26,0.08), 0 10px 22px -6px rgba(16,20,26,0.14)` | 派生 |  |
| `--elev-2` | `0 0 0 1px var(--border-strong), 0 8px 24px -6px rgba(16,20,26,0.16)` | 派生 |  |
| `--elev-3` | `0 0 0 1px var(--border-strong), 0 16px 40px -10px rgba(16,20,26,0.22)` | 派生 |  |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent),
                0 0 0 5px color-mix(in srgb, var(--accent-secondary) 24%, transparent)` | 结构 | 绑定 --accent |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent),
                      inset 0 0 0 4px color-mix(in srgb, var(--accent-secondary) 24%, transparent)` | 结构 | 绑定 --accent |
