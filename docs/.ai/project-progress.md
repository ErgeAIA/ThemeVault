---
title: Project Progress
type: project-progress
project: ThemeVault
updated: 2026-09-14
description: >
  项目开发进度实时记录：阶段、分支、代码状态、最近进展。每次会话更新。
  AI 在本文件新增进展或修改当前状态后，必须同步更新 frontmatter 的 updated 字段为当日日期（YYYY-MM-DD）。
---

# Project Progress

> 记录当前任务状态、分支和最近进展。每次会话更新。
> 新进展插在「当前状态」之后、旧「最后更新」之前。

---

## 当前状态

- **当前分支**：main（已有提交，基线以 `git log` 为准）
- **阶段**：资产仓维护（非运行时项目）；协作记忆已初始化
- **代码**：`scripts/*.py` 生成器与校验器存在；无应用运行时
- **工具链**：Python 3 + `scripts/gen_index.py`；codegraph 1.6.0（若已建索引见 `.codegraph/`）
- **最后更新**：2026-09-14 纳入 P2+P3
  - `extract_css_vars.py` / `scaffold_family.py` / `lint_intake.py`；`gen_index` 内联 provenance 门禁
  - onepage extract 重生成（136 条）lint OK；DEC-007；Commands 表已登记工具
- **上次更新**：2026-09-24 README 剥离进度 + 双语变更日志
  - README 删除「当前进度」清单；AGENTS Conventions 明确「进度唯一出处 project-progress.md」；agents-changelog 已留痕
  - 新增 `CHANGELOG.md` / `CHANGELOG.en.md` / `.changelog-manager.json`（日记式按日分隔，无 release）
  - 待用户验证：README 无进度残留；CHANGELOG 双语条目一一对应
- **上次更新**：2026-09-14 P1 纳入中间产物
  - `docs/intake-artifacts.md` + `_TEMPLATE` 示例；`themes/onepage/_source/{intent,extract}.json` 试点
  - AGENTS S2/DoD/References 接线；DEC-006
- **上次更新**：2026-09-14 P0 纳入 DoD
  - AGENTS.md：S0 增加 pin/默认值语义；S2 值域三态+映射可审；S5 自检升级为纳入 DoD 清单
  - DEC-005；agents-changelog 已留痕；`gen_index` 绿
- **上次更新**：2026-09-14 P0：L1-v4 + ErgeMD profile
  - 新增 `docs/l1-roles.md`、`docs/adr/0008-l1-v4-reading-and-honesty.md`、`docs/profiles/ergemd.md` + `ergemd.mapping.json`
  - OnePage accent 兜底备注改「契约兜底」；glossary/migration-guide/AGENTS References 同步；DEC-004
  - `gen_index.py --write` exit 0；与既有 DEC-002 HEX 豁免不冲突
- **上次更新**：2026-09-14 审计优化方案 5 阶段全部完成
  - vibe-audit 审计落盘 `docs/.ai/audit/audit-2026-09-13.md`（问题 17 条：中 4 / 低 13）；优化方案分 5 阶段全部交付，每阶段独立提交
  - 阶段 1 ✅ `803359f`：#073/#074 状态色 + ANSI 26 行 rgb()→HEX（DEC-002 显式豁免）
  - 阶段 2 ✅ `168d47f`：预览对比度口径对齐 Python（非 6 位纯色显示「—」）；structural_of 不再伪造 fonts（nord/tokyonight×3 脏数据清除）
  - 阶段 3 ✅ `8b7399f` + 缺陷修复 `ed933d4`：家族分区/徽标/ergemd 映射生成化进 data.js（数据优先、常量兜底）；onepage 登记 OnePage + 卡片新分区（typo 8 + ANSI 备查 8）；graph-* 公式角色移出卡片
  - 用户追加决策 ✅ `bf0c15c`：含 var( 的值一律不上色块卡（卡片/对比矩阵通用过滤）
  - 阶段 4 ✅ `016136a`：F1 编号硬失败 · F5 字节幂等（unchanged skipped）· F4 requirements.txt + Toolchain · F8 jsonc 转义 · F9 参数/契约报错 · F17 死参
  - 阶段 5 ✅（本次）：DEC-003（vue 约定值边界）· BUG-001（预览公式色块）· glossary 001–074 · README 进度补 onepage · brand-colors.md 补 #073/#074（浅字 55 套，表内 71 编号自洽：73 value − 007 skin − shades 2）
  - 待用户验证：brand-colors 新增两行数值、README/glossary 改动；预览各阶段累积项复核
  - 待用户验证：预览刷新——① onepage 两卡片新分区与 OnePage 标签 ② 其余 21 家族卡片分区/徽标与此前一致 ③ ergemd 对比矩阵不回归 ④ 前两阶段遗留项（HEX 显示复制、5 套假对比度改「—」、nord/tokyonight 假字体 tag 消失）
- **上次更新**：2026-08-07 vibe-init + OnePage 入库
  - OnePage 家族入库：`themes/onepage/`（#073 warm-brown / #074 warm-paper）
  - `gen_index.py --write` 全绿；INDEX.md / SOURCES.md / AI-MAP.md 已同步
  - vibe-init：`git init`；补齐 `docs/.ai/` 与 `docs/handoff/`；AGENTS.md 增量补 Permissions 等节
- **下一步**：纳入 P2（extract 脚本/scaffold）或 P3（provenance lint）；或转整理/使用流程审查
- **本阶段禁止**：手改 INDEX.json / preview/data.js；改外部项目源码；未确认协议不落盘
