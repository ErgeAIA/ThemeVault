# dracula/light 色板表

> 来源：DSH（FeatherHunter/dsh-opencode-palette）@ `9839cb3`，原始主题 `dracula` 的 light 方案，经 OpenCode→L1 映射。
> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开），经 OpenCode 原生角色映射到 L1 语义角色；
> 无独立 L1 值的角色按契约兜底标注（ADR-0008）。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#f8f8f2` | 中性 | OpenCode `background`（DSH light） |
| `--bg-surface` | `#e8e8e2` | 中性 | OpenCode `backgroundPanel`（DSH light） |
| `--bg-surface-2` | `#d8d8d2` | 中性 | OpenCode `backgroundElement`（DSH light） |
| `--bg-elevated` | `#d8d8d2` | 中性 | 契约兜底·同 bg-surface-2 |
| `--bg-hover` | `#d8d8d2` | 中性 | 契约兜底·同 bg-surface-2 |
| `--text` | `#282a36` | 中性 | OpenCode `text`（DSH light） |
| `--text-muted` | `#6272a4` | 中性 | OpenCode `textMuted`（DSH light） |
| `--text-dim` | `#6272a4` | 中性 | 契约兜底·同 text-muted |
| `--border` | `#c8c8c2` | 中性 | OpenCode `border`（DSH light） |
| `--border-strong` | `#bd93f9` | 中性 | OpenCode `borderActive`（DSH light） |
| `--border-focus` | `#bd93f9` | 中性 | 契约兜底·同 border-strong |
| `--card` | `#d8d8d2` | 中性 | 契约兜底·同 bg-surface-2 |
| `--hairline` | `#e0e0e0` | 中性 | OpenCode `borderSubtle`（DSH light） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#8be9fd` | 强调 | OpenCode `accent`（DSH light） |
| `--accent-hover` | `#8be9fd` | 强调 | 契约兜底·同 accent |
| `--accent-deep` | `#8be9fd` | 强调 | 契约兜底·同 accent |
| `--accent-secondary` | `#bd93f9` | 强调 | OpenCode `primary`（DSH light） |
| `--accent-foreground` | `#f8f8f2` | 强调 | 契约兜底·取 background（accent 上文字） |

## 功能状态色（5 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#50fa7b` | 功能 | OpenCode `success`（DSH light） |
| `--warn` | `#f1fa8c` | 功能 | OpenCode `warning`（DSH light） |
| `--danger` | `#ff5555` | 功能 | OpenCode `error`（DSH light） |
| `--info` | `#ffb86c` | 功能 | OpenCode `info`（DSH light） |
| `--queued` | `#bd93f9` | 功能 | 契约兜底·同 accent-secondary |

## 语法高亮色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#6272a4` | 语法 | OpenCode `syntaxComment`（DSH light） |
| `--syntax-keyword` | `#ff79c6` | 语法 | OpenCode `syntaxKeyword`（DSH light） |
| `--syntax-string` | `#f1fa8c` | 语法 | OpenCode `syntaxString`（DSH light） |
| `--syntax-literal` | `#bd93f9` | 语法 | OpenCode `syntaxNumber`（DSH light） |
| `--syntax-title` | `#8be9fd` | 语法 | OpenCode `syntaxType`（DSH light） |
| `--syntax-attr` | `#282a36` | 语法 | OpenCode `syntaxVariable`（DSH light） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#50fa7b` | 派生 | 同 ok |
| `--warn-fill` | `#f1fa8c` | 派生 | 同 warn |
| `--danger-fill` | `#ff5555` | 派生 | 同 danger |
| `--info-fill` | `#ffb86c` | 派生 | 同 info |
| `--queued-fill` | `#bd93f9` | 派生 | 同 queued |
| `--selection` | `#d8d8d2` | 派生 | 契约兜底·同 bg-surface-2 |
