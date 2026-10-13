---
title: Decision Log
type: decision-log
project: ThemeVault
updated: 2026-10-14
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

## DEC-017: Erge 品牌色原创入库（erge 家族 Light/Dark）

- **日期**：2026-10-14
- **背景**：用户将自调的 Erge 品牌色（橙红家族，原创派生，非外部开源）纳入 ThemeVault 当正式主题，用于软件 UI / 网站配色；huiyi 现有模板不动（仅参考）。主色：Light `#FF6A2B`、Dark `#F2570F`（深版调沉：L↓C↑H↓ 更沉）。原创无外部仓库，按用户授权「协议自定、pin=本对话结论」。
- **决策**：
  - 新建 `erge` 家族（第 24 号），`contract.json` 复用 opensquilla 的 L1 v4 required/derivedOptional（29 required + derivedOptional），角色用 L1 标准命名（`bg/text/text-muted/text-dim/accent/accent-hover/accent-deep/accent-secondary/accent-foreground`、功能 6 通道、语法 6）；预览分区/AA 徽标直接套用默认 L1 配置。
  - `text-dim` 经 OKLCH 推导加深到过 AA：Light `#706E69`（on bg 4.57）、Dark `#858079`（on bg 4.56）。
  - `accent-foreground` 两版均 `#171614`（近黑），作为主色块/按钮文字（WCAG：黑 on `#FF6A2B`=7.35、on `#F2570F`=6.15，均达标）；此处为**亮主色配近黑文字**（橙红主色偏亮，白字不达标）。
  - 功能色 / 语法色沿用 opensquilla 语义色（橙红家族配套），在 Erge `extract.json` 作为原创账本登记 + 家族 README fallback 表登记，属 ADR-0008 显式豁免。
  - 协议：`license=Custom（© 2026 Erge，保留署名）`；`pin=DEC-017 @ 2026-10-14（本对话推导）`，`pinType=derivation`；`repo=原创派生·无外部开源仓库`——**协议/仓库为待用户最终确认的占位**（遵守「协议未确认不假装已定」）。
  - 预览：改 `preview.html` 让主色色块/按钮文字优先用 `accent-foreground`（若主题定义），并新增「实心主色按钮」小样，满足用户验收「近黑文字按钮」效果；`gen_index` 的 `brand.buttonText` 仍按 WCAG 亮度阈值判（`#F2570F` lum≈0.258→标「浅字」），与 accent-foreground 实际近黑不一致属仓库既有口径，适配时按 accent-foreground 取用。
- **验证**：`gen_index --write` 全绿；`lint_intake` 通过；预览刷新 Erge 卡片显示近黑文字主色块。

## DEC-018: Erge Dark 补 on-dark 提亮变体 + 近黑按钮定稿

- **日期**：2026-10-14
- **背景**：impeccable 审查发现 Erge Dark 功能状态色（ok/warn/danger/info/queued）在深底 `#1A1714` 作前景对比度 2.69–3.32 全 FAIL（WCAG AA 要求 ≥4.5）；这些功能色沿用 opensquilla 浅底语义色（DEC-017 豁免值来源，但未豁免深底适配）。近黑按钮文字（accent-foreground `#171614`）两版实测达标（6.33 / 5.29），白字 FAIL（2.86 / 3.42）。`brand.buttonText` 用 `lum(accent)>0.55` 判为「浅字」，与 accent-foreground 近黑矛盾。
- **决策**：
  - 为 Erge Dark 新增 5 个 `*-on-dark` 提亮变体，用 `color-mix(in srgb, <原功能色> N%, #FFFFFF (100-N)%)` 派生（白 18–26%），深底对比度 ≥4.5（AA）。登记进 `contract.json` `derivedOptional`；用公式而非裸 hex（`lint_intake` 对公式跳过账本校验，ADR-0008 豁免，可复算、不污染 extract 账本）。
  - 近黑按钮文字定为 Erge Light/Dark 规范（accent-foreground `#171614`）；`brand.buttonText` 标签与预览白字不一致属全局 `brand_of` 逻辑，用户 2026-10-14 决定**不修正**（保留仓库既有 WCAG 亮度口径），仅此文档标注已知不一致，适配时按 `accent-foreground` 取用。
- **验证**：`gen_index --write` 全绿（erge/dark #151 missing=0 out=0 derived=10，exit 0）；`lint_intake` 通过。

## DEC-016: 主题中文名（zhName）与分隔符约定

- **日期**：2026-10-11
- **背景**：用户希望每个主题在英文名后附中文名（译自现有英文名），便于中文阅读与检索。
- **决策**：① 译名人工核定，存于 `scripts/zh_names.json`（结构 `<家族> -> <显示名> -> 中文名`）；同名 dark/light 变体共享一条；品牌名（GitHub / Vercel / OpenCode / OC-2）保留原文。② `gen_index.py` 加载译名表并输出 `zhName`（未登记返回 None，预览不追加分隔符）。③ 预览格式「英文名 | 中文名」，分隔符取 `|` —— 多个主题名自带连字符（catppuccin-frappe / one-dark / osaka-jade / lucent-orng），用 `-` 会与名字内连字符混淆。④ `onepage` 显示名已含中文，不重复追加。⑤ 搜索支持中文名（卡片带 `data-zh`）。
- **验证**：`gen_index --write` 全绿（themeCount=150）；149 个 value 主题中 147 个有中文名（缺 2 个为 onepage，显示名已含中文）；预览标题渲染正确（Arctic | 北极）；中文搜索命中（「德古拉」4 个、「东京之夜」7 个）。

## DEC-015: solarized 两个 light 主题的 AA 已知偏差登记豁免（不改值）

- **日期**：2026-10-10
- **背景**：`gen_index` AA 守卫（text 对 bg 对比度 <4.5）实际报出 **2 个**标红，均为 solarized light 同源同值（text=#657b83 base00 / bg=#fdf6e3 base3，对比度 4.13）：①`solarized/light` #034（TV 原有 L1 家族，源：官方 xresources + vim-colors-solarized）；②`opencode/solarized-light` #136（DSH 聚合源）。solarized 设计本就柔和低对比，4.13 是其设计特征而非缺陷；硬性规则 7 禁止悄悄「修复」源值。
- **决策**：**不改值**（用户 2026-10-10 确认「登记豁免·不改值」），仅登记为已知偏差：在 palette 顶部引用块 + `text` 角色备注 + 主题 README「特殊点」标注「AA 已知偏差·源主题事实·不改值」。opencode 侧改 `gen_opencode.py` 增加 `AA_EXEMPTIONS` 常量注入（避免生成器重跑覆盖标注）；solarized 侧为手工落盘（无生成脚本）直接改。`gen_index` 仍 print AA-WARN —— 属已决的信息提示，非未决告警。
- **验证**：`gen_index --write` 全绿（exit 0，themeCount=150，missing=0/out=0）；两个 AA-WARN 保留（未改值，符合预期）；改动仅限标注（palette/README/tokens 备注）+ 生成器豁免常量，未改动任何色值。

## DEC-014: S2-B light 补充跳过 one-dark-pro / shades

- **日期**：2026-10-10
- **背景**：S2-B 为 TV 现有仅-dark 同名家族补 light 变体（取自 DSH 对应主题 light 方案，经 OpenCode→L1 映射）。one-dark-pro/shades 的 DSH 对应源（onedarkpro/shadesofpurple）是精简 28 角色版，缺 `textMuted` + 全部 6 个 L1 语法角色；TV 现有 one-dark-pro/shades 家族契约 required=29 L1-core（含 text-muted + 6 syntax）。
- **决策**：跳过这两个家族的 light 补充（用户 2026-10-10 确认）。理由：补到 L1 会产生大量 required 契约兜底甚至缺失（text-muted 只能"同 text"、6 个 syntax 无 DSH 值需编造兜底），违反 ADR-0008「禁止发明 hex」。opencode 家族已含 onedarkpro/shadesofpurple 的 light（DSH 精简源），可直接取用，不重复落盘到 TV L1 家族。
- **验证**：gen_index 全绿（themeCount=150，无越界）；已落盘 light 家族 synthwave/tokyonight/nord/dracula 经 OpenCode→L1 映射，29 required 全填 + 契约兜底标注。

## DEC-013: 对抗审查修复（A1/A2/B1）

- **日期**：2026-09-14
- **背景**：整理 P0–P3 对抗审查发现门禁漏洞、mapping 空心、fallback 语义混用
- **决策**：
  - A1：`gen_index` 校验模式强制 `gen_docs_views --check`
  - A2：`mapping.json` **降级为 hints**（README 对照表 + 备注抽取）；空率 STAT；`--strict` 才对零线索 ERROR；完备映射仍以家族 README / migration-guide 为准
  - B1：tokens 拆分 `contractFallback` / `displayExemption` / `derivedHint`
- **验证**：A1 人为漂移 exit≠0；required 空线索 287/643（hints 级，已知）；gen_index 绿

## DEC-012: 人读视图生成化

- **日期**：2026-09-14
- **背景**：INDEX.md / AI-MAP 计数手抄易漂移
- **决策**：`gen_docs_views.py` 从 INDEX.json 渲染标记区；备注列按编号保留；gen_index --write 内联
- **验证**：`--check` OK；gen_index 绿

## DEC-011: 家族 mapping 单源与 required 一致性

- **日期**：2026-09-14
- **背景**：源变量→L1 映射散落 README/migration-guide/palette 备注；derivedOptional 覆盖面本就因主题而异
- **决策**：`themes/<family>/mapping.json` 为机器单源；一致性仅强制 **required 对齐**；README 对照表降为导读
- **验证**：22 族生成 OK；`gen_family_mapping --check` 与 `gen_index` 绿

## DEC-010: 整理层 IR theme.tokens.json

- **日期**：2026-09-14
- **背景**：palette.md 同时充当决策/机器 IR/人读表；使用阶段需再解析 Markdown
- **决策**：每主题 `tokens.json`（L1-v4 分层 core/reading/family + fallback）；palette 为人审真源，tokens 为确定性投影；`gen_tokens` + `gen_index` 门禁
- **验证**：74 套生成成功；`--check` OK；`gen_index --write` 绿

## DEC-009: extract 升级为 value-ledger（v2）

- **日期**：2026-09-14
- **背景**：v1 全量 dump 约 17MB，出现次数无证明价值；真源已在 `_source/`
- **决策**：extract = 全局唯一值 → witness（schemaVersion 2）；体积约 4.8%；lint 兼容 v1；partial 仍降级
- **验证**：22 族重生成；lint/gen_index 绿；bytes 16925955 → 814313

## DEC-008: 旧家族 IR 回填与 partial provenance

- **日期**：2026-09-14
- **背景**：21 个家族缺 intent/extract；部分 `_source` 不含色值定义（everforest）
- **决策**：`backfill_intake_ir.py` 机械回填；legacy pin；8 位 hex 允许 6 位主体回溯；`provenance=partial` 值域 WARN
- **验证**：`lint_intake` exit 0（68 条 everforest WARN）；`gen_index` 绿

## DEC-007: 纳入 P2/P3 工具链与 provenance 门禁

- **日期**：2026-09-14
- **背景**：intent/extract 有规范无工具；值域忠实无机器闸
- **决策**：新增 `extract_css_vars.py` / `scaffold_family.py` / `lint_intake.py`；`gen_index` 内联 lint（缺 IR 旧家族 WARN，有 IR 则值域必须可回溯或备注豁免）；新纳入 DoD 要求 `--strict`
- **验证**：onepage lint OK；scaffold 冒烟通过；`gen_index --write` exit 0

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
