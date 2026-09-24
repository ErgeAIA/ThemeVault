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

## DEC-006: 纳入中间产物 intent.json / extract.json

- **日期**：2026-09-14
- **背景**：纳入缺可回放中间 IR；palette 值域证明只能靠事后 diff 源码
- **决策**：新纳入必须落 `_source/intent.json` + `extract.json`（`docs/intake-artifacts.md`）；extract 机械无 L1；OnePage 为试点（93 条）
- **验证**：模板 + onepage 试点；AGENTS S2/DoD 已接线；`gen_index` 绿

## DEC-005: 纳入 DoD（pin / 值域三态 / 映射可审）

- **日期**：2026-09-14
- **背景**：纳入成功缺机器可检完成定义；色值忠实靠口诀；与 DEC-002 HEX 豁免、DEC-003 约定值豁免并存导致口径分散
- **决策**：S0 强制 pin + 默认值语义；S2 值域仅三态（原文/公式/显式豁免）；无独立值标契约兜底；S5/DoD 清单强制映射可审与 pin。豁免仍须 DEC + 家族 fallback 表（不扩大 DEC-002/003 范围）
- **验证**：AGENTS.md 工作流与 DoD 自检清单已改；`gen_index --write` exit 0

## DEC-004: L1 v4 分层与缺口诚实 + ErgeMD Profile

- **日期**：2026-08-07
- **背景**：L1-29 无法承载阅读排版；required 强齐套造成假完整；迁移矩阵在 migration-guide 线性膨胀。与 DEC-002 的 HEX 豁免并行：本条立长期 IR 规则，不覆盖 DEC-002 已落盘的 26 行显示豁免。
- **决策**：L1 core+reading 词表 `docs/l1-roles.md`（ADR-0008）；缺口必须标契约兜底（同 DEC-003 兜底表精神一致）；目标分发改走 `docs/profiles/`（首个 ErgeMD）
- **验证**：`gen_index --write` 仍绿；mapping.json 覆盖 core+reading；OnePage typo 对齐 reading

## DEC-003: vue 家族缺失角色约定值边界

- **日期**：2026-09-14
- **背景**：审计 F7 发现 `gen_vscode.py` 的 vue 家族 fallback 含 5 个不在源码中的约定 hex（text-muted `#586e75`、warn `#e6a23c`、danger `#dc322f`、info `#268bd2`、queued `#b58900`，#058/#059 各 5 行；对照组：jellyfish 的 `#00f7ff`/`#FF92A5` 与 vue 的 `#19f9d8` 均见于各自源文件）。与硬性规则 3「色值原文」存在张力；OnePage 入库（DEC-001）对同类缺口按「不发明 hex」处理，两家族口径不一致。
- **决策**：保留现状（用户 2026-09-14 决策）。vue 家族缺失角色允许「约定值」补位：取值为 Solarized 官方调色板颜色（vue 主题明示基于 Solarized），palette.md 备注已标「来源 约定」、家族 README「缺失角色约定（fallback）」表已列明——该 fallback 表即硬性规则 3 的**显式豁免清单**，范围仅此 5 条，不外推。后续新家族默认「不发明 hex」（对齐 DEC-001）；确需约定值时须在家族 README 登记 fallback 表并在本日志追加 DEC。
- **验证**：grep `#586e75`/`#e6a23c`/`#dc322f`/`#268bd2`/`#b58900` 确认不在 `themes/vue/_source/*.json`（约定非源码事实）；palette.md 对应行备注含「来源 约定」；`gen_index.py --write` 全绿。

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
