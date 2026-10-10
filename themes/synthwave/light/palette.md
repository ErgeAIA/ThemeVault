# synthwave/light 色板表

> 来源：DSH（FeatherHunter/dsh-opencode-palette）@ `9839cb3`，原始主题 `synthwave84` 的 light 方案，经 OpenCode→L1 映射。
> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开），经 OpenCode 原生角色映射到 L1 语义角色；
> 无独立 L1 值的角色按契约兜底标注（ADR-0008）。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#fafafa` | 中性 | OpenCode `background`（DSH light） |
| `--bg-surface` | `#f5f5f5` | 中性 | OpenCode `backgroundPanel`（DSH light） |
| `--bg-surface-2` | `#eeeeee` | 中性 | OpenCode `backgroundElement`（DSH light） |
| `--bg-elevated` | `#eeeeee` | 中性 | 契约兜底·同 bg-surface-2 |
| `--bg-hover` | `#eeeeee` | 中性 | 契约兜底·同 bg-surface-2 |
| `--text` | `#262335` | 中性 | OpenCode `text`（DSH light） |
| `--text-muted` | `#5c5c8a` | 中性 | OpenCode `textMuted`（DSH light） |
| `--text-dim` | `#5c5c8a` | 中性 | 契约兜底·同 text-muted |
| `--border` | `#e0e0e0` | 中性 | OpenCode `border`（DSH light） |
| `--border-strong` | `#00bcd4` | 中性 | OpenCode `borderActive`（DSH light） |
| `--border-focus` | `#00bcd4` | 中性 | 契约兜底·同 border-strong |
| `--card` | `#eeeeee` | 中性 | 契约兜底·同 bg-surface-2 |
| `--hairline` | `#f0f0f0` | 中性 | OpenCode `borderSubtle`（DSH light） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#9c27b0` | 强调 | OpenCode `accent`（DSH light） |
| `--accent-hover` | `#9c27b0` | 强调 | 契约兜底·同 accent |
| `--accent-deep` | `#9c27b0` | 强调 | 契约兜底·同 accent |
| `--accent-secondary` | `#00bcd4` | 强调 | OpenCode `primary`（DSH light） |
| `--accent-foreground` | `#fafafa` | 强调 | 契约兜底·取 background（accent 上文字） |

## 功能状态色（5 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#4caf50` | 功能 | OpenCode `success`（DSH light） |
| `--warn` | `#ff9800` | 功能 | OpenCode `warning`（DSH light） |
| `--danger` | `#f44336` | 功能 | OpenCode `error`（DSH light） |
| `--info` | `#ff5722` | 功能 | OpenCode `info`（DSH light） |
| `--queued` | `#00bcd4` | 功能 | 契约兜底·同 accent-secondary |

## 语法高亮色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5c5c8a` | 语法 | OpenCode `syntaxComment`（DSH light） |
| `--syntax-keyword` | `#e91e63` | 语法 | OpenCode `syntaxKeyword`（DSH light） |
| `--syntax-string` | `#ff9800` | 语法 | OpenCode `syntaxString`（DSH light） |
| `--syntax-literal` | `#9c27b0` | 语法 | OpenCode `syntaxNumber`（DSH light） |
| `--syntax-title` | `#00bcd4` | 语法 | OpenCode `syntaxType`（DSH light） |
| `--syntax-attr` | `#262335` | 语法 | OpenCode `syntaxVariable`（DSH light） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#4caf50` | 派生 | 同 ok |
| `--warn-fill` | `#ff9800` | 派生 | 同 warn |
| `--danger-fill` | `#f44336` | 派生 | 同 danger |
| `--info-fill` | `#ff5722` | 派生 | 同 info |
| `--queued-fill` | `#00bcd4` | 派生 | 同 queued |
| `--selection` | `#eeeeee` | 派生 | 契约兜底·同 bg-surface-2 |
