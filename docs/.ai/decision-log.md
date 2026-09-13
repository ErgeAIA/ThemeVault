---
title: Decision Log
type: decision-log
project: ThemeVault
updated: 2026-09-14
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

## DEC-002: onepage 状态色/ANSI 值统一为 HEX 显示

- **日期**：2026-09-14
- **背景**：#073/#074 的状态色 5 角色 + ANSI 8 通道共 26 行值为 `rgb(r, g, b)` 形态；源码（`_source/theme.css:306` 共享块）本无 hex 原文，而是 `--color-*-rgb` 三元组 + `rgb(var(--color-*-rgb))` 组合公式。rgb() 形态导致预览色块复制被 `^#` 正则拒绝、色块文字色走兜底逻辑，且与全仓 hex 显示惯例不一致。用户明确要求统一为 HEX 显示（2026-09-14，附预览截图）。
- **决策**：26 行 rgb() 无损换算为 6 位 HEX（0-255 ↔ 两位 hex 一一对应）；备注列保留源三元组指针并标注「HEX 显示」；此为硬性规则 3「色值原文」的**显式豁免**，范围仅这 26 行；color-mix / var / rgba（shadow 等）公式值一律保留源形态不动。豁免先例不外推到其它家族。
- **验证**：`gen_index.py --write` exit 0、missing=0 out=0；grep 两 palette 值列无残留 rgb(；INDEX.json/data.js #073/#074 tokens 与新 HEX 一致；预览人工验证色块复制与文字色正常。

## DEC-001: OnePage 入库契约策略

- **日期**：2026-08-07
- **背景**：OnePage（Obsidian）双配色入库；需在 L1 通用契约与原生变量名之间选型；彩色排版为作者调教资产，后续可能扩 ErgeMD
- **决策**：L1 required 29 + derivedOptional 追加 typo-h1..h6/bold/italic 与 graph/ANSI；缺口只映射源码已有令牌、不发明 hex；整份 theme.css 入 `_source/`
- **验证**：`gen_index.py --write` exit 0；#073/#074 missing=0 out=0；tokenTotal=3510
