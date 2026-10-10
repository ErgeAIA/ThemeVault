---
title: Project Progress
type: project-progress
project: ThemeVault
updated: 2026-10-10
description: >
  项目开发进度实时记录：阶段、分支、代码状态、最近进展。每次会话更新。
  AI 在本文件新增进展或修改当前状态后，必须同步更新 frontmatter 的 updated 字段为当日日期（YYYY-MM-DD）。
---

# Project Progress

> 记录当前任务状态、分支和最近进展。每次会话更新。
> 新进展插在「当前状态」之后、旧「最后更新」之前。

---

## 当前状态

- **今日（2026-10-10）**：导入决策已下（4 条）：①全量导入，落盘加 `opencode` 前缀区分；②同名同色池者也保留为 OpenCode 变体；③为 TV 缺失 light 的现有同名家族补 light 方案（取自 DSH 对应主题 light 方案）；④先核查协议。
  - **S0 协议核查(完成)**：DSH 仓库 `LICENSE`=MIT（FeatherHunter 2026，聚合层明确）；`THIRD_PARTY_NOTICES.md` 不存在(404)；37 主 json 均无内置 license/author 字段→协议需从上游确认。结论：DSH 以 MIT 聚合分发；主题上游协议对 TV 已收录同名来源复用（MIT/Apache-2.0），新名字多为知名 MIT/Apache 主题，落盘逐主题标注上游协议+必要署名（如 nord 的 Sven Greb）。**整体可落盘**。pin=`9839cb3`（v2.0.26）。
  - **S1 设计(已定)**：单一 `opencode` 家族（用户确认），数据驱动 `scripts/gen_opencode.py` 生成。DSH 主题 JSON 实为 **VS Code 风格原生角色**（background/text/accent/error/warning/success/info/primary/secondary/border*/syntax*/diff*/markdown* 共 50）；35 双方案(dark+light)+2 单方案(aura/ayu)。desktop-2.0 的 4 个与主 json 重复已去重。
  - **S2 落盘(完成)**：**S2-A 已完成**——`gen_opencode.py` 生成 opencode 家族 72 套主题(dark+` -light` 变体)、contract/intent/extract/family README；放宽 3 个解析器 `ROLE_RE` 以支持 OpenCode 驼峰角色名；`gen_index.py --write` 全绿（familyCount=23, themeCount=146, opencode #107–#146, missing=0/out=0）。4 个精简主题(amoled/oc-2/onedarkpro/shadesofpurple, 28 角色)缺 textMuted+syntax*，已降级为 derivedOptional。AA 标红：`opencode/solarized-light` textOnBg=4.13（浅背景，不改值）。**S2-B 补 light（进行）**：已完成 **synthwave/tokyonight/nord/dracula** 4 个完整源家族的 light 变体（`scripts/gen_s2b_light.py` 数据驱动，DSH OpenCode→L1 映射，29 L1-core required 全填+契约兜底标注，gen_index 全绿 themeCount=150）；**one-dark-pro/shades 跳过（用户 2026-10-10 确认：DSH 精简源缺 text-muted+syntax*，补到 L1 会产生大量契约兜底/缺失，违反 ADR-0008；opencode 家族已含两者 light 可直接取用）。S2 全部完成（A+B）**。
  - **AA 已知偏差豁免(完成)**：用户 2026-10-10 确认「登记豁免·不改值」。实际 AA 标红 **2 个**（S5 初版漏报 `solarized/light` #034）：①`solarized/light` #034（TV 原有 L1 家族）②`opencode/solarized-light` #136（DSH 源）——两者同值（text `#657b83` / bg `#fdf6e3`，对比度 4.13），属 solarized 设计特征（柔和低对比），**不改值**；仅在 palette 顶部 + text 角色备注 + README「特殊点」登记「AA 已知偏差·源主题事实·不改值」。opencode 侧改 `gen_opencode.py` 加 `AA_EXEMPTIONS` 常量注入（避免重跑丢失标注）；solarized 侧手工落盘直接改（无生成脚本覆盖）。gen_index 仍 print AA-WARN（已决的信息提示）。见 DEC-015。
  - **待办（README 进度节清理后转入）**：`gen_index --write`（内联 gen_docs_views）已删除根目录 `README.md` 的「## 当前进度」整节（符合 AGENTS「README 不写当前进度/待办」）。其中未完成的两条转存于此：① ~~下一套主题（候选：shadcn）~~ **取消（用户 2026-10-10 决定不做）**；② 预览卡片元素细化（见 ADR-0006）：

  - **预览页审查与修复（2026-10-10，design-taste-frontend 审查后按 P0→P1 修复）**：审查发现 17 项问题，已修 —— **P0**：①opencode 家族卡片底色全走兜底（原生 `background` ≠ L1 `bg`，35 套 light 显示成深色）；②对比矩阵对 opencode 整列为空（补 `OPENCODE_L1_MAP` + `L1_MAPS`，`l1Value` 改为多家族）。**P1**：③徽标 / tag 固定色在浅色卡片上不可读（编号 tag 对比度低至 1.32）→ 改为按底色明暗择优取色，现最差 5.98（tag）/ 6.47（徽标）；④meta 不透明度 0.6→0.85。**P2/P3**：⑤筛选空状态；⑥下拉 Esc 关闭 + `aria-expanded`；⑦控件按下反馈；⑧圆角统一 6/8/12；⑨代码块示例去掉真实主题名 ember；⑩对比矩阵占位「—」→「无」、页脚分隔符收敛。取舍：未给全部色块加 `tabindex`（会产生数千个 tab 停靠点，反而不利于键盘导航），色块复制仍为鼠标操作。
  - **用户二次反馈「083/086/114 仍深色」调查（2026-10-11）**：已核实为**源数据事实，非渲染 bug** —— DSH 源 `catppuccin-frappe` / `catppuccin-macchiato` / `nightowl` 的 `background` 写作 `{"dark": X, "light": X}`（light 与 dark 同值，这些本质是 dark 主题），TV 忠实落盘，配色自洽（深底 + 浅字，对比度 8.06-13.54）。统计：opencode 35 个 light 变体中**仅 3 个**与 dark 差异 ≤2 个角色（nightowl 0、frappe 1、macchiato 1），其余 32 个差异 16-28 为真实双方案。另发现 `lucent-orng`（#103/#104）的 `background` 源值为 `transparent`（非深色）→ 透明底露出页面深色、与 light 方案深色文字叠加不可读，已修为按方案回退中性底（#104 现浅底 `#f5f5f7`、对比度 15.98）并标注源值。083/086/114 的处理（标注 / 改标 scheme / 移除冗余副本）待用户决策。**阶段1「代码块模拟」已实现**（2026-10-10）——卡片内新增代码块，底色（`bg-surface` / ergemd `bg-code` / opencode `backgroundPanel`）+ 边框 + 语法色均取主题角色，家族感知解析三套命名（L1 `syntax-*` / ergemd `code-*` / opencode 驼峰 `syntaxXxx`），公式值（含 `var(`）沿用色块区口径降级为 text。冒烟验证：149 张卡片均渲染代码块，三套命名体系均取到正确角色色。**待用户验证实际观感**。后续可选扩展：基础组件（面板 / 按钮 / 状态徽章 / 链接）、终端 ANSI 模拟。
- **当前分支**：main（已有提交，基线以 `git log` 为准）
- **阶段**：资产仓维护（非运行时项目）；协作记忆已初始化
- **代码**：`scripts/*.py` 生成器与校验器存在；无应用运行时
- **工具链**：Python 3 + `scripts/gen_index.py`；codegraph 1.6.0（若已建索引见 `.codegraph/`）
- **最后更新**：2026-09-14 整理对抗修复 A1/A2/B1
  - gen_index 校验路径强制 docs --check；mapping 降级 hints + --strict；tokens 负载语义拆分；DEC-013
- **上次更新**：2026-09-14 整理 P3：人读视图生成化
  - `gen_docs_views.py`；INDEX.md/AI-MAP 标记区与 INDEX.json 对齐；DEC-012
- **上次更新**：2026-09-14 整理 P1：family mapping.json
  - 22 族 `mapping.json`；同族 required 一致性门禁；gen_index 内联；DEC-011
- **上次更新**：2026-09-14 整理 P0：theme.tokens.json
  - 74 套 `tokens.json`（core/reading/family + fallback）；`gen_tokens.py`；gen_index 内联；DEC-010
- **上次更新**：2026-09-14 extract v2 值账本
  - `extract.json` 升 value-ledger；17MB→814KB（4.8%）；lint 兼容 v1；DEC-009
- **上次更新**：2026-09-24 References 省 token 简化
  - AGENTS `## References` 宽表压成「何时 → 路径」短列表（全文入上下文，token 宝贵）
  - agents-changelog 已留痕；待用户验证：条件式指针可读且够短
- **上次更新**：2026-09-14 旧家族 IR 回填
  - 21 家族 `intent.json`+`extract.json`；`backfill_intake_ir.py`；lint：legacy pin / alpha-hex / partial
  - everforest 快照无色值定义 → provenance=partial（WARN）；DEC-008；lint/gen_index 绿
- **上次更新**：2026-09-24 References 补全指引
  - AGENTS `## References` 由裸「见 X」改为分组表（索引 / 契约规范 / 地图入口 / 过程记忆 / 变更记录），每项「是什么 / 何时查」
  - 补入 `CHANGELOG*.md`、`docs/brand-colors.md`、`preview.html`+`data.js`、`themes/_TEMPLATE/`
  - agents-changelog 已留痕；待用户验证：References 一眼可知用途
- **上次更新**：2026-09-14 纳入 P2+P3
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
- **下一步**：旧家族渐进补 intent/extract；或转整理/使用流程审查；另有并行会话 CHANGELOG/README 改动未提交
- **本阶段禁止**：手改 INDEX.json / preview/data.js；改外部项目源码；未确认协议不落盘
