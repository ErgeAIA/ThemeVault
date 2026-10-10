# tokyonight/light 色板表

> 来源：DSH（FeatherHunter/dsh-opencode-palette）@ `9839cb3`，原始主题 `tokyonight` 的 light 方案，经 OpenCode→L1 映射。
> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开），经 OpenCode 原生角色映射到 L1 语义角色；
> 无独立 L1 值的角色按契约兜底标注（ADR-0008）。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#e1e2e7` | 中性 | OpenCode `background`（DSH light） |
| `--bg-surface` | `#d5d6db` | 中性 | OpenCode `backgroundPanel`（DSH light） |
| `--bg-surface-2` | `#c8c9ce` | 中性 | OpenCode `backgroundElement`（DSH light） |
| `--bg-elevated` | `#c8c9ce` | 中性 | 契约兜底·同 bg-surface-2 |
| `--bg-hover` | `#c8c9ce` | 中性 | 契约兜底·同 bg-surface-2 |
| `--text` | `#3760bf` | 中性 | OpenCode `text`（DSH light） |
| `--text-muted` | `#8990a3` | 中性 | OpenCode `textMuted`（DSH light） |
| `--text-dim` | `#8990a3` | 中性 | 契约兜底·同 text-muted |
| `--border` | `#737a8c` | 中性 | OpenCode `border`（DSH light） |
| `--border-strong` | `#5a607d` | 中性 | OpenCode `borderActive`（DSH light） |
| `--border-focus` | `#5a607d` | 中性 | 契约兜底·同 border-strong |
| `--card` | `#c8c9ce` | 中性 | 契约兜底·同 bg-surface-2 |
| `--hairline` | `#9699a8` | 中性 | OpenCode `borderSubtle`（DSH light） |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#b15c00` | 强调 | OpenCode `accent`（DSH light） |
| `--accent-hover` | `#b15c00` | 强调 | 契约兜底·同 accent |
| `--accent-deep` | `#b15c00` | 强调 | 契约兜底·同 accent |
| `--accent-secondary` | `#2e7de9` | 强调 | OpenCode `primary`（DSH light） |
| `--accent-foreground` | `#e1e2e7` | 强调 | 契约兜底·取 background（accent 上文字） |

## 功能状态色（5 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#587539` | 功能 | OpenCode `success`（DSH light） |
| `--warn` | `#b15c00` | 功能 | OpenCode `warning`（DSH light） |
| `--danger` | `#f52a65` | 功能 | OpenCode `error`（DSH light） |
| `--info` | `#2e7de9` | 功能 | OpenCode `info`（DSH light） |
| `--queued` | `#2e7de9` | 功能 | 契约兜底·同 accent-secondary |

## 语法高亮色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#8990a3` | 语法 | OpenCode `syntaxComment`（DSH light） |
| `--syntax-keyword` | `#9854f1` | 语法 | OpenCode `syntaxKeyword`（DSH light） |
| `--syntax-string` | `#587539` | 语法 | OpenCode `syntaxString`（DSH light） |
| `--syntax-literal` | `#b15c00` | 语法 | OpenCode `syntaxNumber`（DSH light） |
| `--syntax-title` | `#8c6c3e` | 语法 | OpenCode `syntaxType`（DSH light） |
| `--syntax-attr` | `#f52a65` | 语法 | OpenCode `syntaxVariable`（DSH light） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#587539` | 派生 | 同 ok |
| `--warn-fill` | `#b15c00` | 派生 | 同 warn |
| `--danger-fill` | `#f52a65` | 派生 | 同 danger |
| `--info-fill` | `#2e7de9` | 派生 | 同 info |
| `--queued-fill` | `#2e7de9` | 派生 | 同 queued |
