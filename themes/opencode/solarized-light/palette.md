# opencode/solarized-light 色板表

> 来源：https://github.com/FeatherHunter/dsh-opencode-palette（MIT 聚合）@ `9839cb3`，原始主题 `solarized`。
> 颜色值为 DSH 主题 JSON 解析后原文（defs 引用已展开为 hex），未改写。
> 本表为 OpenCode 原生角色，light 方案。
> ⚠ **AA 已知偏差（不改值）**：text(#657b83) 对 background(#fdf6e3) 对比度 4.13 < 4.5；此为 solarized 设计特征（柔和低对比），属源主题事实，不改值。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--background` | `#fdf6e3` | 中性 | OpenCode `background` |
| `--text` | `#657b83` | 中性 | OpenCode `text`；AA 已知偏差（见顶部说明，不改值） |
| `--border` | `#eee8d5` | 中性 | OpenCode `border` |
| `--backgroundElement` | `#eee8d5` | 中性 | OpenCode `backgroundElement` |
| `--backgroundPanel` | `#eee8d5` | 中性 | OpenCode `backgroundPanel` |
| `--borderActive` | `#93a1a1` | 中性 | OpenCode `borderActive` |
| `--borderSubtle` | `#eee8d5` | 中性 | OpenCode `borderSubtle` |
| `--textMuted` | `#93a1a1` | 中性 | OpenCode `textMuted` |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--primary` | `#268bd2` | 强调 | OpenCode `primary` |
| `--accent` | `#2aa198` | 强调 | OpenCode `accent` |
| `--secondary` | `#6c71c4` | 强调 | OpenCode `secondary` |

## 功能状态色（4 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--error` | `#dc322f` | 功能 | OpenCode `error` |
| `--warning` | `#b58900` | 功能 | OpenCode `warning` |
| `--success` | `#859900` | 功能 | OpenCode `success` |
| `--info` | `#cb4b16` | 功能 | OpenCode `info` |

## 语法高亮色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntaxComment` | `#93a1a1` | 语法 | OpenCode `syntaxComment` |
| `--syntaxFunction` | `#268bd2` | 语法 | OpenCode `syntaxFunction` |
| `--syntaxKeyword` | `#859900` | 语法 | OpenCode `syntaxKeyword` |
| `--syntaxNumber` | `#d33682` | 语法 | OpenCode `syntaxNumber` |
| `--syntaxOperator` | `#859900` | 语法 | OpenCode `syntaxOperator` |
| `--syntaxPunctuation` | `#657b83` | 语法 | OpenCode `syntaxPunctuation` |
| `--syntaxString` | `#2aa198` | 语法 | OpenCode `syntaxString` |
| `--syntaxType` | `#b58900` | 语法 | OpenCode `syntaxType` |
| `--syntaxVariable` | `#2aa198` | 语法 | OpenCode `syntaxVariable` |

## 派生 / 场景色（markdown / diff；主题显式值）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--diffAdded` | `#859900` | 派生 | OpenCode `diffAdded` |
| `--diffAddedBg` | `#eee8d5` | 派生 | OpenCode `diffAddedBg` |
| `--diffAddedLineNumberBg` | `#eee8d5` | 派生 | OpenCode `diffAddedLineNumberBg` |
| `--diffContext` | `#93a1a1` | 派生 | OpenCode `diffContext` |
| `--diffContextBg` | `#eee8d5` | 派生 | OpenCode `diffContextBg` |
| `--diffHighlightAdded` | `#859900` | 派生 | OpenCode `diffHighlightAdded` |
| `--diffHighlightRemoved` | `#dc322f` | 派生 | OpenCode `diffHighlightRemoved` |
| `--diffHunkHeader` | `#93a1a1` | 派生 | OpenCode `diffHunkHeader` |
| `--diffLineNumber` | `#5f6969` | 派生 | OpenCode `diffLineNumber` |
| `--diffRemoved` | `#dc322f` | 派生 | OpenCode `diffRemoved` |
| `--diffRemovedBg` | `#eee8d5` | 派生 | OpenCode `diffRemovedBg` |
| `--diffRemovedLineNumberBg` | `#eee8d5` | 派生 | OpenCode `diffRemovedLineNumberBg` |
| `--markdownBlockQuote` | `#93a1a1` | 派生 | OpenCode `markdownBlockQuote` |
| `--markdownCode` | `#859900` | 派生 | OpenCode `markdownCode` |
| `--markdownCodeBlock` | `#657b83` | 派生 | OpenCode `markdownCodeBlock` |
| `--markdownEmph` | `#b58900` | 派生 | OpenCode `markdownEmph` |
| `--markdownHeading` | `#268bd2` | 派生 | OpenCode `markdownHeading` |
| `--markdownHorizontalRule` | `#93a1a1` | 派生 | OpenCode `markdownHorizontalRule` |
| `--markdownImage` | `#2aa198` | 派生 | OpenCode `markdownImage` |
| `--markdownImageText` | `#6c71c4` | 派生 | OpenCode `markdownImageText` |
| `--markdownLink` | `#2aa198` | 派生 | OpenCode `markdownLink` |
| `--markdownLinkText` | `#6c71c4` | 派生 | OpenCode `markdownLinkText` |
| `--markdownListEnumeration` | `#2aa198` | 派生 | OpenCode `markdownListEnumeration` |
| `--markdownListItem` | `#268bd2` | 派生 | OpenCode `markdownListItem` |
| `--markdownStrong` | `#cb4b16` | 派生 | OpenCode `markdownStrong` |
| `--markdownText` | `#657b83` | 派生 | OpenCode `markdownText` |
