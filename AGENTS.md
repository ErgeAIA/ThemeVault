# AGENTS.md

<!-- mode: 已初始化优化 -->

> 本文件只包含 AI 代理在本仓库工作时需要读取的指令。
> **工作流详版的唯一出处**（README.md 只保留概览，人类读者请看 README.md）。
> 完整项目地图请看 `AI-MAP.md`。
> 变更工作流时同步更新本文件，保持与仓库实况一致。

## Permissions

IMPORTANT: 本仓库只维护 ThemeVault 色板资产；禁止改外部项目源码与手改生成物
YOU MUST 会话开始先读 docs/.ai/project-progress.md、docs/.ai/decision-log.md、docs/.ai/debug-log.md 与 docs/handoff/ 最新一份
YOU MUST 先复述现状与待确认项，再动手
YOU MUST 改码或入库前先读 AI-MAP.md 与 docs/.ai/decision-log.md
YOU MUST 每次会话更新 docs/.ai/project-progress.md
YOU MUST 改 AGENTS.md 前先读、改后追加 docs/.ai/agents-changelog.md
YOU MUST 改某领域前先读 docs/.ai/experience/<领域>/（存在时）
YOU MUST 每次只推进一个阶段，完成即停，等用户验证
YOU MUST 入库/改 palette 或契约后运行 python scripts/gen_index.py --write 并确认退出码 0
禁止自行宣称已修复，修复结果须由用户验证
禁止整文件重写既有文件，只做最小精确补丁
禁止手改 INDEX.json / preview/data.js，禁止改外部项目源码，禁止协议未确认即落盘
禁止不记录就改动 AGENTS.md 的约定

## 项目一句话

ThemeVault 是 **UI 主题色板资产仓库**：把来源项目（opensquilla / catppuccin / ergemd）的主题
收集、规范化为「palette.md 色板表 + _source/ 源码快照 + contract.json 契约 + 迁移指南」，
供任何项目快速适配主题。它不是主题开发项目，不产生运行时代码。
**职责边界**：本仓库只维护 ThemeVault 资产本身；目标项目的主题适配 / 文字审查 / 修复由
**外部 AI** 负责（外部 AI 读本仓库的 palette.md / INDEX.json / docs/ 取色与核对），
本仓库 AI 不修改任何目标项目代码。
（详细定位与目录树见 README.md，此处仅保留 AI 需要的最小上下文。）

## 开始工作前

- 首次接触本仓库：**先读 `AI-MAP.md`**（目录职责 / 契约语义 / 数据流 / 适配工作流 / 常见坑）。
- 迁移适配类任务：读 `docs/migration-guide.md`（L1 角色映射矩阵 + 多目标栈实施）。
- 用户报主题编号（如「#012」）取色：查 `INDEX.json` 的 `theme.number` → `palettePath` → `palette.md`（编号由脚本自动分配，勿手改）。
- 术语口径：`docs/glossary.md`；决策历史：`docs/adr/`（0001–0007）。
- 协作记忆：读 `docs/.ai/project-progress.md`、`docs/.ai/decision-log.md`、`docs/.ai/debug-log.md`；交接见 `docs/handoff/` 最新一份。

## 硬性规则（必须遵守）

1. **禁止手改生成物**：`INDEX.json`、`preview/data.js` 由脚本生成，勿手改。
   `preview.html` 是数据驱动的 SPA 应用源码（读 `preview/data.js` 渲染），可手改（类似 scripts/）。
   改完源数据后运行 `gen_index.py --write` 重新生成 INDEX.json + data.js，绝不直接编辑这两个生成物。
2. **契约是唯一事实源**：每个家族 `themes/<family>/_source/contract.json` 定义 required /
   derivedOptional 角色。palette.md 的角色必须 ⊆ 契约（required 一个都不能缺，越界角色禁止）。
3. **颜色值保留原文**：palette.md 的色值必须是源码原文，禁止「优化 / 统一 / 转 hex」；
   `rgba(...)`、`linear-gradient(...)`、`transparent` 是合法值，保留语义。
4. **禁止重新分析已入库来源**：opensquilla / catppuccin / ergemd 的分析已沉淀在 `themes/`，
   不要联网重抓或重做；一切结论以 palette.md + `_source/` 为准。
5. **不改外部项目源码**：ErgeMD、opensquilla 是 ThemeVault 之外的来源项目，只读其主题文件，
   绝不在本仓库会话中修改它们。
6. **协议与署名**：跨项目使用主题时保留协议与必需署名（如 Nord 衍生的 arctic 需保留
   Sven Greb 署名）；ergemd 为自有开源项目（AGPL-3.0），如实标注协议。
7. **AA 对比度守卫**：文本角色对背景对比度 < 4.5 是告警（预览卡片标红 ✗），但不要悄悄
   「修复」源值 —— 那是源主题的事实，如需改动必须显式与用户确认。
8. **取色配对防呆**：适配取色时背景与文字必须成对取用（`bg`↔`text`；ergemd 用
   `bg-page`↔`text-primary`）；light 方案浅背景配深文字、dark 方案深背景配浅文字；
   取色后校验对比度 ≥ 4.5:1（每套主题 text/text-muted/text-dim 对 bg 的对比度见
   `INDEX.json` 的 `theme.textContrast` 字段），禁止浅背景配浅/白文字。
9. **职责边界（本仓库 vs 目标项目）**：本仓库 AI 只维护 ThemeVault 资产（themes/、scripts/、
   docs/、preview.html、INDEX.*）。「审查 / 修复某个目标项目（另一项目）的主题文字问题」
   是**外部 AI** 的职责——把本仓库目录交给外部 AI，外部 AI 读 `docs/migration-guide.md`
   附录「标准取色片段」+ `INDEX.json` 的 `textContrast`/`brand` + `docs/brand-colors.md`
   执行；本仓库 AI 不替外部 AI 审查或修改目标项目。新主题入库（S0-S5）只产出本仓库资产。

## 工作流

### 变更后必跑（按序）

```powershell
python scripts/gen_index.py --write   # 校验契约覆盖 + 生成 INDEX.json + preview/data.js（退出码 1 = 违规）
```

> 预览页 `preview.html` 是静态 SPA，读 `preview/data.js` 运行时渲染——
> `gen_index.py --write` 更新 data.js 后，刷新浏览器即反映新主题，**无需重生成预览**。

- `INDEX.md` 是手写总表：每增删一套主题同步增删行，**数字必须与 INDEX.json 一致**（以脚本输出为准）。

### 新增主题工作流（用户给开源主题链接时）

用户通常直接给一个开源主题链接。按 **S0 → S5** 顺序执行，每步有明确产出，禁止跳步。

**S0 侦察（先调研，不写任何文件）**
- `web_search` / `web_fetch` 打开链接：确认仓库性质、主题文件位置（tokens.css / palette.json / CSS 变量块）。
- 确认协议：查 LICENSE / README / package.json。**协议不明确 = 不落盘**，先问用户（ADR-0004）。
- **钉住 pin**：记录来源 URL + **commit SHA**（或不可变 blob/文件 hash）；无 pin 不得进入 S2。
- 判断角色词表：L1（见 `docs/l1-roles.md` core/reading）还是原生词表 → 决定契约方式（S1）。
- 声明默认值语义：入库的是「源码固化默认」还是「可运行时覆盖的回退默认」（如 Style Settings）。

**S1 家族判定**
- 已有同来源家族 → 加入现有家族，不新建。
- 新来源 → 新建 `themes/<family>/`（`_source/` + 家族 README 成员表）。
- 决定生成方式：
  - 官方有结构化源（palette.json / 规整 CSS 变量体系）→ 优先写 `scripts/gen_<family>.py`
    数据驱动生成（参考 `gen_catppuccin.py` / `gen_ergemd.py` / `gen_vscode.py`），契约由脚本自动计算（ADR-0007）。
  - 零散 / 手工调色 → 按 `themes/_TEMPLATE/` 手工落盘，契约人工核定。

**S2 落盘**
- `_source/`：原始源码文件**原样拷入**（只读快照）+ `contract.json`（required / derivedOptional）+ pin 备注
  （`_source/README.md` 写清 URL@commit / hash）。
- **纳入中间产物（P1，新纳入必须）**：`_source/intent.json` + `_source/extract.json`（规范见
  `docs/intake-artifacts.md`；模板 `themes/_TEMPLATE/_source/*.example.json`）。
  extract 只做机械抽取无 L1 映射；值域证明以 extract 回溯为准。
- `themes/<family>/<id>/palette.md`：按 `_TEMPLATE/palette.md` 五段结构（中性 / 强调 / 功能 / 语法 /
  派生），表格 `| --role | value | 类型 | 备注 |`；值原文照抄；继承 base 层的角色在备注列标注
  「继承 dark/light-base」并给出解析值（如 ergemd）。
- **值域诚实（ADR-0008）**：每个值必须是 ① `_source` 原文/子串 ② 公式原文（`color-mix`/`var()`/`rgb()`）
  ③ 显式豁免（家族 README fallback 表 + `docs/.ai/decision-log.md` 登记）。禁止发明 hex；无独立值用
  「契约兜底·同 X / 取 X」标注。
- **映射可审**：家族 README 须含 L1（或原生）对照要点；reading 轴（`typo-*`）有则成套写入 derivedOptional。
- `themes/<family>/<id>/README.md`：`## 元信息` 键完整 —— 来源项目 / 来源仓库链接（含 pin）/ 原始主题 ID /
  显示名 / 协议 / 色彩方案 / 主题类型 / 提取方式 / 显式颜色令牌数 / 结构令牌（可选，格式
  `mono（IBM Plex Mono）· 硬角（radius-none）`）；另写迁移备注（特殊点 / 署名 / world 层装饰）。
- 家族 README.md 成员表同步更新。
- **新家族 → 在 `SOURCES.md` 登记一行**（仓库地址 / 协议 / 收录主题列表），与家族 README、INDEX.md 同步（ADR-0004）。

**S3 索引与校验**
- `INDEX.md` 追加一行：**编号** + required 角色数 / 派生覆盖数（**以脚本输出为准**，禁止手抄错）。
  编号由 `gen_index.py` 自动分配（新增主题追加 max+1、已有编号不变），INDEX.md 编号列抄脚本输出的 `#N`，勿手改。
- 跑 `python scripts/gen_index.py --write`：要求全绿 —— 每套 `missing=0 out=0`、退出码 0；违规即修。

**S4 预览更新**
- `preview.html` 是数据驱动 SPA，读 `preview/data.js`；`gen_index.py --write` 已在 S3 生成 data.js，**无需额外步骤**。
- 检查 AA 徽标：标红（✗）项记录到交付摘要，**不擅自改值**（硬性规则 7）。

**S5 交付摘要（纳入 DoD 未过 = 不得宣称已纳入）**
- 汇报：家族 / 主题、light-dark 方案、令牌数、契约 required/derivedOptional、协议、pin、fontStyle、
  AA 标红项、值域（原文/公式/豁免）统计、需要用户决策的点。

**纳入 DoD 自检清单（交付前逐项过）**
- [ ] 协议已确认（未确认 = 不落盘）
- [ ] **pin 已记录**（URL@commit 或文件 hash，写入 `_source` 与主题 README）
- [ ] **intent.json + extract.json 已落盘**（新纳入；规范 `docs/intake-artifacts.md`）
- [ ] 色值全部原文或公式原文；**豁免仅有 DEC 登记的显式清单**
- [ ] 无独立值的 required 已标「契约兜底·同 X / 取 X」
- [ ] palette.md 角色 ⊆ 契约，required 无缺、无越界角色
- [ ] L1-core 映射可审；L1-reading 有则成套（`docs/l1-roles.md`）
- [ ] INDEX.md 与 INDEX.json 数字一致
- [ ] `gen_index.py --write` 全绿（missing=0 out=0，已生成 INDEX.json + preview/data.js）
- [ ] 预览页 `preview.html` 刷新后新主题已反映（SPA 读 data.js）
- [ ] 外部项目源码未被修改；已入库来源（opensquilla / catppuccin / ergemd）未被重分析

## 目录速览

```
AGENTS.md                  本文件（操作规则：硬性规则 / 工作流唯一详版 / 约定）
scripts/        gen_index / gen_catppuccin / gen_ergemd / gen_vscode（生成+校验，勿手改产物）
themes/         22 家族，每套主题 = palette.md + README.md；_source/ 为只读快照+契约
docs/           migration-guide / glossary / adr（宪法）
preview/        data.js（生成物，SPA 数据源）
preview.html    数据驱动 SPA（读 data.js 运行时渲染，应用源码可手改）
INDEX.md + INDEX.json     人读清单 / 机器副表（含每主题全局编号 number，勿手改 JSON）
AI-MAP.md                 项目地图（AI 必读）
docs/.ai/                 协作进度 / 决策 / 调试 / init 报告
docs/handoff/             会话交接文档
```

## Toolchain

| 工具 | 精确版本 | 锁定位置 |
| ---- | -------- | -------- |
| Python | ≥ 3.10（PEP 604 语法），小版本未锁；第三方依赖 `pyyaml`（仅 gen_vscode.py，见 `requirements.txt`） | `scripts/*.py` |
| codegraph | 1.6.0 | `.codegraph/`（索引） |

## Commands

| 场景 | 命令原文 | 来源 |
| ---- | -------- | ---- |
| 变更后校验与生成 | `python scripts/gen_index.py --write` | 本文件「变更后必跑」（内含 lint_intake） |
| 仅校验不落盘 | `python scripts/gen_index.py` | 同上 |
| 纳入 provenance 门禁 | `python scripts/lint_intake.py [--strict]` | 新纳入用 `--strict` |
| 旧家族回填 IR | `python scripts/backfill_intake_ir.py [--family <id>] [--force]` | 见 docs/intake-artifacts.md |
| 生成 extract.json | `python scripts/extract_css_vars.py --src <css> --family <id> --pin <sha> --out themes/<id>/_source/extract.json` | 见 docs/intake-artifacts.md |
| 脚手架家族 | `python scripts/scaffold_family.py --family <id> --project <n> --repo <url> --license <spdx> --themes <ids…>` | S1，不覆盖既有文件 |

## Conventions

- 文档与代码注释用中文（与现有 README / INDEX / AI-MAP 一致）。
- 脚本：Python 3 + pathlib，UTF-8 输出，生成器必须幂等可重复。
- **Git 提交节奏**：每完成一个阶段或可独立交付的功能性改动，**自行分批 `commit` + `push`**，不待用户点名；一条提交对应一个可回看的变更单元（工具 / 数据 / 文档可分开），便于后期 `git log`/`git blame` 查档。不提交密钥与无关工作区噪音；不改写已推送历史。
- 角色命名：家族原生变量名（如 `bg-page`、`accent-cyan`、`--bg`），迁移映射见 migration-guide §4。
- 字体 / radius 等结构类令牌**不进颜色契约**（ADR-0001 / ADR-0006），字体信息在
  INDEX.json 的 `fontStyle` / `fonts` / `structuralNote` 字段（源：README「结构令牌」行）。
- 会话文档体系固定：进度写 `docs/.ai/project-progress.md`；决策写 `docs/.ai/decision-log.md`；两者只追加不删历史。
- **README 不写当前进度 / 待办清单**；进度唯一出处是 `docs/.ai/project-progress.md`（README 只保留定位、约定、概览）。
- bug 追加 `docs/.ai/debug-log.md`，格式 `BUG-NNN`；只追加不删历史。
- 交接写 `docs/handoff/`，命名 `handoff-YYYY-MM-DD-*.md`。
- 改 `docs/.ai` 或 handoff 须同步 frontmatter `updated` 为当日。
- 改 AGENTS.md 须在 `docs/.ai/agents-changelog.md` 追加一行处置记录。
- 可复用经验落 `docs/.ai/experience/<领域>/`（正文可改写，历史靠该域 changelog）。

## References

- 首次接触 / 目录数据流 → 见 AI-MAP.md
- 对人说明仓库 → 见 README.md
- 报编号取色 / 对比度 / 品牌按钮 → 见 INDEX.json（人读总表 INDEX.md）
- 新家族登记 / 协议出处 → 见 SOURCES.md
- S2 手工落盘起步 → 见 themes/_TEMPLATE/
- 写契约 / 判角色缺口 → 见 docs/l1-roles.md
- S2 中间产物 intent/extract → 见 docs/intake-artifacts.md
- 外部项目适配 / 取色转译 → 见 docs/migration-guide.md
- 目标分发映射（如 ErgeMD）→ 见 docs/profiles/
- 按钮配色 / 文字建议 → 见 docs/brand-colors.md
- 术语口径 → 见 docs/glossary.md
- 规则冲突 / 回溯口径 → 见 docs/adr/
- 预览验收 / AA 徽标 → 见 preview.html
- 对外变更说明 → 见 CHANGELOG.md 与 CHANGELOG.en.md
- 会话现状 → 见 docs/.ai/project-progress.md
- 做选择 / DEC 回溯 → 见 docs/.ai/decision-log.md
- 修 bug / 预览生成器坑 → 见 docs/.ai/debug-log.md
- 改 AGENTS 前后留痕 → 见 docs/.ai/agents-changelog.md
- 同领域可复用做法 → 见 docs/.ai/experience/
- 交接 / 上次结论 → 见 docs/handoff/
- 回溯 vibe-init → 见 docs/.ai/init-report.md

## Self-Maintenance

1. 改变规则的 PR 须同步改本文件，否则视为规则漂移
2. 规则写入错误发生处最近作用域，家族规则写对应 `themes/<family>/`
3. 命令更名、重构后，提交前核对本文件并更新过期示例
4. 随发布或固定周期清除失效条目
5. 本文件修改走 PR/Review，与代码同等纪律
