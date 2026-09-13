---
title: Decision Log
type: decision-log
project: ThemeVault
updated: 2026-08-07
priority: higher-than-prd
description: >
  开发过程决策日志，优先级高于 PRD；冲突时以本文件最新条目为准并回写 PRD/ADR。
  只追加，不删除或改写历史。AI 在本文件新增或修改任何条目后，必须同步更新 frontmatter 的 updated 字段为当日日期（YYYY-MM-DD）。
---

# Decision Log

> 偏离 PRD 或做出重要技术选择时在此追加记录。只追加，不删除或改写历史。
> **优先级高于 PRD**：冲突时以本文件最新决策为准，并回写 PRD/ADR。
> 格式：`## DEC-NNN: 标题`，新条目置顶，NNN 三位递增。
> 字段：`- **日期**：` / `- **背景**：` / `- **决策**：` / `- **验证**：`

## DEC-001: OnePage 入库契约策略

- **日期**：2026-08-07
- **背景**：OnePage（Obsidian）双配色入库；需在 L1 通用契约与原生变量名之间选型；彩色排版为作者调教资产，后续可能扩 ErgeMD
- **决策**：L1 required 29 + derivedOptional 追加 typo-h1..h6/bold/italic 与 graph/ANSI；缺口只映射源码已有令牌、不发明 hex；整份 theme.css 入 `_source/`
- **验证**：`gen_index.py --write` exit 0；#073/#074 missing=0 out=0；tokenTotal=3510
