---
title: AGENTS.md Changelog
type: agents-changelog
project: ThemeVault
updated: 2026-09-24
description: >
  AGENTS.md 的变更记录，AGENTS.md 每改动一次就追加一行，不随日常开发更新。
  只追加，不删除或改写历史。AI 在本文件新增或修改任何条目后，必须同步更新 frontmatter 的 updated 字段为当日日期（YYYY-MM-DD）。
---

# AGENTS.md Changelog

> **AGENTS.md 每改动一次，必须在此追加一行**；无对应记录即视为静默丢失。
> 模式：<全新初始化 | 半程合成 | 已初始化优化>
> 来源文件：<本次处置的旧 AGENTS.md / CLAUDE.md 路径；全新初始化写「无」>
> 格式：一行一条 `<旧值> → keep|update|drop|merge → <新值/去处/原因>`
> 全新初始化无旧约定可处置时，写一行 `<无旧约定> → 全新初始化 → 直建当前 AGENTS.md`

---

## 2026-08-07 · vibe-init（模式：已初始化优化）

来源文件：`AGENTS.md`（既有项目自建契约，非六节结构）；`.zcode/plans/*`（会话计划，非规则）

- `<既有「项目一句话 / 开始工作前 / 硬性规则 / 工作流 / 目录速览 / 约定」全文>` → keep → 原文保留，不整体重写
- `<无 mode 注释>` → update → 文件头追加 `<!-- mode: 已初始化优化 -->`
- `<无 Permissions 节>` → update → 新增 Permissions（接管义务 / 文档义务 / 常驻纪律 / 禁止项）
- `<「开始工作前」无 docs/.ai 义务>` → update → 追加过程文档与 handoff 最新指针
- `<无 Toolchain / Commands 表>` → update → 追加事实区（Python + gen_index 命令，与既有工作流一致）
- `<无 Conventions 中 docs/.ai 约定>` → update → 追加会话文档体系约定行
- `<无 References / Self-Maintenance>` → update → 追加指针节与自维护五条
- `.zcode/plans/plan-sess_*.md` → keep → 会话计划产物，不纳入 AGENTS.md 规则区
- `AI-MAP.md` / `docs/migration-guide.md` / `docs/adr/` → keep → 已有指针或正文引用，不复述

## 2026-08-07 · P0 L1-v4 + ErgeMD profile

- `<References 无 l1-roles/profiles>` → update → 追加 `docs/l1-roles.md`、`docs/profiles/` 指针
- `<其余 AGENTS.md 条目>` → keep → 硬性规则/工作流未改

## 2026-09-14 · P0 纳入 DoD

- `<S0 无 pin/默认值语义>` → update → 增加 pin 钉住与默认值语义声明
- `<S2 无值域诚实/映射可审>` → update → 增加 ADR-0008 值域三态与 reading 成套要求
- `<S5/自查清单>` → update → 升级为「纳入 DoD」：pin、豁免清单、契约兜底、映射可审
- `<其余条目>` → keep → 未改

## 2026-09-14 · P1 纳入中间产物

- `<S2 无 intent/extract>` → update → 新增强制 `intent.json`/`extract.json` 与规范指针
- `<DoD 清单>` → update → 增加中间产物勾选项
- `<References>` → update → 增加 `docs/intake-artifacts.md`

## 2026-09-14 · P2/P3 纳入工具与门禁

- `<Commands 表>` → update → 增加 lint_intake / extract_css_vars / scaffold_family
- `<DoD>` → keep → 值域由 lint 强制可回溯

---

## 2026-09-14 · 审计优化阶段 4（事实区回填）

- `Toolchain 表 Python 行「系统/环境 PATH（未锁版本）」` → update → 补 ≥3.10 下限（PEP 604 语法）与 pyyaml 依赖指针（新增 requirements.txt，仅 gen_vscode.py 需要；审计 F4）

## 2026-09-24 · README 不写进度

- `<Conventions 无 README 进度边界>` → update → 追加「README 不写当前进度/待办；进度唯一出处 docs/.ai/project-progress.md」
- `README.md「当前进度」清单（含已完项与待办）` → drop → 整节删除；进度归 project-progress.md 管理
