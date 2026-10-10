# nord/light 色板表

> 来源：DSH（FeatherHunter/dsh-opencode-palette）@ `9839cb3`，原始主题 `nord` 的 light 方案，经 OpenCode→L1 映射。
> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开），经 OpenCode 原生角色映射到 L1 语义角色；
> 无独立 L1 值的角色按契约兜底标注（ADR-0008）。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#ECEFF4` | 中性 | OpenCode `background`（DSH light） |
| `--bg-surface` | `#E5E9F0` | 中性 | OpenCode `backgroundPanel`（DSH light） |
| `--bg-surface-2` | `#D8DEE9` | 中性 | OpenCode `backgroundElement`（DSH light） |
| `--bg-elevated` | `#D8DEE9` | 中性 | 契约兜底·同 bg-surface-2 |
| `--bg-hover` | `#D8DEE9` | 中性 | 契约兜底·同 bg-surface-2 |
| `--text` | `#2E3440` | 中性 | OpenCode `text`（DSH light） |
| `--text-muted` | `#3B4252` | 中性 | OpenCode `textMuted`（DSH light） |
| `--text-dim` | `#3B4252` | 中性 | 契约兜底·同 text-muted |
| `--border` | `#4C566A` | 中性 | OpenCode `border`（DSH light） |
| `--border-strong` | `#434C5E` | 中性 | OpenCode `borderActive`（DSH light） |
| `--border-focus` | `#434C5E` | 中性 | 契约兜底·同 border-strong |
| `--card` | `#D8DEE9` | 中性 | 契约兜底·同 bg-surface-2 |
| `--hairline` | `#4C566A` | 中性 | OpenCode `borderSubtle`（DSH light） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#8FBCBB` | 强调 | OpenCode `accent`（DSH light） |
| `--accent-hover` | `#8FBCBB` | 强调 | 契约兜底·同 accent |
| `--accent-deep` | `#8FBCBB` | 强调 | 契约兜底·同 accent |
| `--accent-secondary` | `#5E81AC` | 强调 | OpenCode `primary`（DSH light） |
| `--accent-foreground` | `#ECEFF4` | 强调 | 契约兜底·取 background（accent 上文字） |

## 功能状态色（5 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#A3BE8C` | 功能 | OpenCode `success`（DSH light） |
| `--warn` | `#D08770` | 功能 | OpenCode `warning`（DSH light） |
| `--danger` | `#BF616A` | 功能 | OpenCode `error`（DSH light） |
| `--info` | `#5E81AC` | 功能 | OpenCode `info`（DSH light） |
| `--queued` | `#5E81AC` | 功能 | 契约兜底·同 accent-secondary |

## 语法高亮色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#4C566A` | 语法 | OpenCode `syntaxComment`（DSH light） |
| `--syntax-keyword` | `#81A1C1` | 语法 | OpenCode `syntaxKeyword`（DSH light） |
| `--syntax-string` | `#A3BE8C` | 语法 | OpenCode `syntaxString`（DSH light） |
| `--syntax-literal` | `#B48EAD` | 语法 | OpenCode `syntaxNumber`（DSH light） |
| `--syntax-title` | `#8FBCBB` | 语法 | OpenCode `syntaxType`（DSH light） |
| `--syntax-attr` | `#8FBCBB` | 语法 | OpenCode `syntaxVariable`（DSH light） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#A3BE8C` | 派生 | 同 ok |
| `--warn-fill` | `#D08770` | 派生 | 同 warn |
| `--danger-fill` | `#BF616A` | 派生 | 同 danger |
| `--info-fill` | `#5E81AC` | 派生 | 同 info |
| `--queued-fill` | `#5E81AC` | 派生 | 同 queued |
| `--selection` | `#D8DEE9` | 派生 | 契约兜底·同 bg-surface-2 |
