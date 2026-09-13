# opensquilla-ember 色板表

> 来源：opensquilla/opensquilla `opensquilla-webui/src/themes/ember/tokens.css`（Apache-2.0）。
> 颜色值为源码原文，未改写。类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1a0f0c` | 中性 |  |
| `--bg-surface` | `#241512` | 中性 |  |
| `--bg-surface-2` | `#2f1c17` | 中性 |  |
| `--bg-elevated` | `#3a241d` | 中性 |  |
| `--bg-hover` | `#452c23` | 中性 |  |
| `--text` | `#ffe9dc` | 中性 |  |
| `--text-muted` | `#e6b49a` | 中性 |  |
| `--text-dim` | `#c08a6e` | 中性 |  |
| `--border` | `#4a2c22` | 中性 |  |
| `--border-strong` | `#6b3d2c` | 中性 |  |
| `--border-focus` | `#ff7a3d` | 中性 |  |
| `--card` | `#241512` | 中性 |  |
| `--hairline` | `#3a2018` | 中性 |  |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#ff6a2b` | 强调 |  |
| `--accent-hover` | `#ff8047` | 强调 |  |
| `--accent-deep` | `#c23e12` | 强调 |  |
| `--accent-secondary` | `#ffb638` | 强调 |  |
| `--accent-foreground` | `#2a0d04` | 强调 |  |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#7fd66a` | 功能 |  |
| `--warn` | `#ffc23d` | 功能 |  |
| `--danger` | `#ff5c47` | 功能 |  |
| `--info` | `#ff9d5c` | 功能 |  |
| `--queued` | `#e08bff` | 功能 |  |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#a8735a` | 语法 |  |
| `--syntax-keyword` | `#ff7a3d` | 语法 |  |
| `--syntax-string` | `#ffb638` | 语法 |  |
| `--syntax-literal` | `#ff9d6b` | 语法 |  |
| `--syntax-title` | `#ffd08a` | 语法 |  |
| `--syntax-attr` | `#ff8f6b` | 语法 |  |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                0 0 14px color-mix(in srgb, var(--accent) 46%, transparent)` | 结构 | 绑定 --accent |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 36%, transparent)` | 结构 | 绑定 --accent |
