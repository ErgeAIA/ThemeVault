---
title: Debug Log
type: debug-log
project: ThemeVault
updated: 2026-10-22
description: >
  反复调试的 bug 追加记录，优先级与实现事实对齐。只追加，不删除或改写历史。
  AI 在本文件新增或修改任何条目后，必须同步更新 frontmatter 的 updated 字段为当日日期（YYYY-MM-DD）。
---

# Debug Log

> 反复调试的 bug 记录。只追加，不删除历史。
> 格式：`## BUG-NNN: 标题` + 日期/现象/根因/修复/验证限制/教训。NNN 三位递增。
> 字段：`- **日期**：` / `- **现象**：` / `- **根因**：` / `- **修复**：` / `- **验证限制**：` / `- **教训**：`

***

## BUG-002: opencode 家族 camelCase 角色被正则静默丢弃

- **日期**：2026-10-22
- **现象**：审 `scripts/` 性能时顺手对比「同一份 `palette.md` 被三个解析器解出的角色数」，发现 opencode 家族 72 套主题的 `tokens.json` 角色数远小于 `INDEX.tokenCount`——如 amoled 9 vs 28、aura 10 vs 50、orng 10 vs 51、onedarkpro 9 vs 28。其余家族（one-dark-pro 34/34、ayu 41/41）完全一致，说明缺陷只影响一类命名。**无任何报错、无任何门禁变红**，属静默数据丢失。
- **根因**：`scripts/gen_tokens.py` 的 `ROLE_RE` 写成 `(--[a-z0-9-]+)`，只匹配小写与连字符；opencode 原生变量名是 camelCase（`--backgroundElement` / `--backgroundPanel` / `--borderActive` / `--borderSubtle` / `--textMuted` / `--syntaxComment` / `--syntaxFunction` / `--selectedListItemText` 等），大写字母处匹配截断后整行不成立即被跳过。同仓库的 `gen_index.py` / `lint_intake.py` / `gen_family_mapping.py` / `gen_s2b_light.py` 用的都是 `[a-zA-Z0-9-]`，四份正则各自维护、漂移出一条漏网的。
- **修复**：`ROLE_RE` 统一收拢到 `scripts/_tvcommon.py`（`(--[a-zA-Z0-9-]+)`），五个脚本共用同一份；重跑 `python scripts/gen_tokens.py` 后 opencode 72 套 `tokens.json` 角色补齐（+27203/−15 行，全为新增角色），其余 79 个主题 `tokens.json` 逐字节未变。`themes/opencode/aura/palette.md` 三个解析器（gen_tokens / lint_intake / gen_family_mapping）现均为 50 角色，与 INDEX 一致。
- **验证限制**：`.tmp/probe-lintfix.py` 证实 `lint_intake --strict` 修复前后同为 0 error 0 warning——因为 lint 只校验「已被解析到」的角色，漏解析的角色它根本看不见。**门禁全绿并不能证明解析完整**，本次是靠跨解析器角色计数对照才发现。
- **教训**：**同一份数据被多份正则解析时，正则必须单点定义**。多个脚本各抄一份正则，漏字符集是必然结局，且因为没有断言，缺陷会一直静默；引入共享模块比逐个补正则可靠。另：门禁只校验它能看见的东西——「零告警」≠「零丢失」，跨实现的一致性对照（同输入、不同解析器、比输出规模）才是这类漏解析的检测手段。

## BUG-001: 预览色块把 var() 公式值画成透明块

- **日期**：2026-09-14
- **现象**：用户预览 #073/#074 报「彩色排版显示有异常」——「ANSI / 图谱」分区 graph-* 七角色渲染成透明色块 + 长公式文本溢出压住标签（#074 浅色下为看不见的白块）；onepage 的 bg-hover/accent-hover/accent-deep 三个 L1 角色同病（更早即存在）。
- **根因**：这些角色的色板值是 `var(--text-accent)` / `color-mix(... var(...) ...)` CSS 变量公式（palette.md:82-88 源码原文），而预览页没有这些 CSS 变量的定义上下文，浏览器无法把公式解析成颜色；数据侧（阶段 3 分区配置）误把公式角色当可上卡的展示色。
- **修复**：双保险——① 数据侧：graph-* 移出 onepage 卡片分区（提交 `ed933d4`，分区更名「ANSI 备查」）；② 渲染侧：`renderCard` 与对比矩阵通用过滤含 `var(` 的值（提交 `bf0c15c`，显示「—」）。公式角色在 INDEX.json tokens 与 palette.md 中原样保留。
- **验证限制**：预览渲染效果由用户人工复核（项目惯例不做 MCP 浏览器验证）；断言层确认全仓仅 onepage 存在 var( 值。
- **教训**：**公式值不是可渲染颜色**——「所见即数据」要求上卡的值必须是预览页可独立解析的纯色/独立 color-mix/rgba；新增家族分区时先检查角色值形态（含 `var(` 的派生公式只进 tokens），渲染侧再兜底过滤一次。

（此前无记录。）
