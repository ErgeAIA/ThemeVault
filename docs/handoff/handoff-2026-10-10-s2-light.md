---
title: S2 完成交接 — DSH OpenCode 主题集导入
type: handoff
project: ThemeVault
date: 2026-10-10
author: AI
updated: 2026-10-10
summary: >
  S2 把 DSH OpenCode 主题集（@9839cb3）导入 TV：S2-A 新建 opencode 家族（72 套 dark/light 变体），
  S2-B 为 4 个现有仅-dark 同名家族补 light 变体；one-dark-pro/shades 跳过。
---

# S2 完成交接（2026-10-10）

## 目标
把 GitHub `FeatherHunter/dsh-opencode-palette` @ `9839cb3` 的 OpenCode 主题集导入 ThemeVault
（S0 协议核查已确认 MIT 聚合，可落盘；pin=`9839cb3`）。

## 结论
- **S2-A（已完成）**：新建 `opencode` 家族，`scripts/gen_opencode.py` 数据驱动生成 72 套主题变体
  （37 主主题：35 双方案 dark/light + 2 单方案 aura/ayu；其中 4 个精简源主题
  amoled/oc-2/onedarkpro/shadesofpurple 缺 `textMuted`+syntax*，降级为 derivedOptional）。
  协议 MIT（DSH 聚合）；上游协议逐主题标注（nord 的 Sven Greb 等）。
  `gen_index --write` 全绿（familyCount=23, themeCount=146, missing=0/out=0）。
- **S2-B（已完成）**：为 TV 现有 4 个完整源家族补 light 变体——`synthwave`/`tokyonight`/`nord`/`dracula`，
  `scripts/gen_s2b_light.py` 数据驱动（DSH 对应主题 light 方案 → OpenCode→L1 映射，按各家族契约动态适配
  派生角色：6/5/6/6）。29 L1-core required 全填；无独立值的角色按 ADR-0008 契约兜底标注。
  `gen_index --write` 全绿（themeCount=146→150）。
- **one-dark-pro / shades 跳过**（用户 2026-10-10 确认）：DSH 对应源是精简 28 角色版
  （缺 `text-muted` + 6 syntax），补到 TV L1（required=29）会产生大量契约兜底/缺失，违反 ADR-0008；
  opencode 家族已含两者 light 可直接取用。

## 验证（gen_index 全绿）
- 所有主题 `missing=0 out=0`；退出码 0。
- AA 标红：仅 `opencode/solarized-light` textOnBg=4.13（浅背景，源主题事实，未改值）；
  其余 light（含 S2-B 4 家族）无 AA 标红（浅背景配深文字，对比度达标）。
- 值域诚实：S2 全部色值 = DSH 主题 JSON 原文 hex（defs 引用已展开），无发明 hex；
  豁免仅契约兜底（S2-B：bg-elevated/bg-hover/text-dim/card 同 bg-surface-2、accent-hover/accent-deep 同 accent、
  border-focus 同 border-strong、accent-foreground 取 background、queued 同 accent-secondary；S2-A：syntax-literal=accent 等）。
- 协议与 pin：DSH MIT 聚合，pin=`9839cb3`；上游协议逐主题标注。

## 已落盘资产
- `themes/opencode/`：72 套主题变体（dark + `-light`）+ 家族 `_source/{contract,intent,extract,mapping}.json` + 家族 README。
- `themes/{synthwave,tokyonight,nord,dracula}/light/`：4 个 light 主题（palette + README + tokens）。
- 4 家族级 `extract.json`（并入 DSH light 值，witness 指向 `opencode/_source/<dsh_tid>.json`）、
  `intent.json`（加 `lightSupplement`）、README 成员表（加 light 行）。
- `scripts/gen_opencode.py`、`scripts/gen_s2b_light.py`。
- `INDEX.json` / `INDEX.md` / `AI-MAP.md` / `preview/data.js`（gen_index 生成）。

## 待办 / 注意
- one-dark-pro/shades 的 TV L1 家族暂不补 light（按决策跳过）；如未来要补，
  须从上游完整源取 light 方案（非 DSH 精简源）。
- 无遗留运行时代码改动；外部项目源码未修改。

## 关键决策回溯
- DEC-014（本会话登记）：S2-B 跳过 one-dark-pro/shades（DSH 精简源缺 text-muted+syntax*）。
- ADR-0008：禁止发明 hex；契约兜底标注。
