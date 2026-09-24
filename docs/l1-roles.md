# L1 语义角色标准（v4）

> **角色词表唯一事实源**（跨家族）。家族 `contract.json` 只声明「本家族要求/覆盖哪些 L1 角色」。
> 颜色值真源仍是各 `palette.md` + `_source/`（ADR-0001）。本文件不承载色值。
> 版本：v4 = L1-core（29）+ **L1-reading（8）** + 缺口诚实约定（ADR-0008）。

## 1. 分层

| 层 | 角色数 | 用途 | 契约要求 |
|----|--------|------|----------|
| **L1-core** | 29 | 全局 UI：背景/文本/边框/强调/状态/语法 | value theme 必须齐 |
| **L1-reading** | 8 | 阅读器彩色排版：标题与强调排版 | 有则进 derivedOptional（或家族扩展），无则不写 |
| 家族扩展 | 不定 | graph、ANSI、chart… | 仅 derivedOptional |

## 2. L1-core（29）

```
bg  bg-surface  bg-surface-2  bg-elevated  bg-hover
text  text-muted  text-dim
border  border-strong  border-focus
card  hairline
accent  accent-hover  accent-deep  accent-secondary  accent-foreground
ok  warn  danger  info  queued
syntax-comment  syntax-keyword  syntax-string
syntax-literal  syntax-title  syntax-attr
```

## 3. L1-reading（8）— 阅读器身份色

| 角色 | 语义 | 典型源名 |
|------|------|----------|
| `typo-h1` | 一级标题色 | OnePage `--typo-h1` / ErgeMD `--h1-color` |
| `typo-h2` | 二级标题色 | `--typo-h2` / `--h2-color` |
| `typo-h3` | 三级标题色 | `--typo-h3` / `--h3-color` |
| `typo-h4` | 四级标题色 | `--typo-h4` / `--h4-color` |
| `typo-h5` | 五级标题色 | `--typo-h5` / `--h5-color` |
| `typo-h6` | 六级标题色 | `--typo-h6` / `--h6-color` |
| `typo-bold` | 加粗/强调排版色 | `--typo-bold` |
| `typo-italic` | 斜体排版色 | `--typo-italic` |

约定：

1. **有独立设计则入库**（OnePage 全套 8；ErgeMD 有 h1–h6，bold/italic 无原生变量时不发明）。
2. **迁移阅读器时整组保留**，禁止只搬 core 就宣称完成阅读向适配。
3. 无该层的家族不必补齐；有则必须成套声明，禁止只写 h1。

## 4. 缺口诚实（禁止假完整）

| 标记 | 何时用 | palette 备注前缀 |
|------|--------|------------------|
| **契约兜底·同 X** | required 在源码无独立值，沿用角色 X | `契约兜底·同 accent` |
| **契约兜底·取 X** | required 无值，用另一角色顶替（如 fg 取 bg） | `契约兜底·取 bg` |
| **公式原文** | 源为 `color-mix`/`var()`/`rgb()` | 保留公式，不预转 hex |
| **推导** | 仅 README 给建议值，palette 不写假原文 | 备注不写 hex 为「原文」 |
| **缺省** | derivedOptional 真无 | 不写行，或写「未提供」 |

禁止：

- 用同值填满 required 却不标「契约兜底」
- 把推导 hex 写成源码原文
- 为「表好看」发明 accent-secondary / border-focus 等

## 5. 与目标项目 Profile

目标项目映射写在 `docs/profiles/<target>.md` + `docs/profiles/<target>.mapping.json`（机器可读）。
Profile 引用本文件的角色名，不另造 L1 别名。

- 已有：`docs/profiles/ergemd.md`
