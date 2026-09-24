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
- 判断角色词表：L1（bg/text/border/accent/ok-warn-danger-info-queued/syntax）还是原生词表
  （bg-page/accent-cyan…）→ 决定契约方式（S1）。

**S1 家族判定**
- 已有同来源家族 → 加入现有家族，不新建。
- 新来源 → 新建 `themes/<family>/`（`_source/` + 家族 README 成员表）。
- 决定生成方式：
  - 官方有结构化源（palette.json / 规整 CSS 变量体系）→ 优先写 `scripts/gen_<family>.py`
    数据驱动生成（参考 `gen_catppuccin.py` / `gen_ergemd.py` / `gen_vscode.py`），契约由脚本自动计算（ADR-0007）。
  - 零散 / 手工调色 → 按 `themes/_TEMPLATE/` 手工落盘，契约人工核定。

**S2 落盘**
- `_source/`：原始源码文件**原样拷入**（只读快照）+ `contract.json`（required / derivedOptional）。
- `themes/<family>/<id>/palette.md`：按 `_TEMPLATE/palette.md` 五段结构（中性 / 强调 / 功能 / 语法 /
  派生），表格 `| --role | value | 类型 | 备注 |`；值原文照抄；继承 base 层的角色在备注列标注
  「继承 dark/light-base」并给出解析值（如 ergemd）。
- `themes/<family>/<id>/README.md`：`## 元信息` 键完整 —— 来源项目 / 来源仓库链接 / 原始主题 ID /
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

**S5 交付摘要**
- 汇报：家族 / 主题、light-dark 方案、令牌数、契约 required/derivedOptional、协议、fontStyle、
  AA 标红项、需要用户决策的点（如弱对比是否要修、协议确认）。

**自查清单（交付前逐项过）**
- [ ] 协议已确认（未确认 = 不落盘）
- [ ] 色值全部原文，未改写 / 未转 hex
- [ ] palette.md 角色 ⊆ 契约，required 无缺、无越界角色
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
| 变更后校验与生成 | `python scripts/gen_index.py --write` | 本文件「变更后必跑」 |
| 仅校验不落盘 | `python scripts/gen_index.py` | 同上 |

## Conventions

- 文档与代码注释用中文（与现有 README / INDEX / AI-MAP 一致）。
- 脚本：Python 3 + pathlib，UTF-8 输出，生成器必须幂等可重复。
- 角色命名：家族原生变量名（如 `bg-page`、`accent-cyan`、`--bg`），迁移映射见 migration-guide §4。
- 字体 / radius 等结构类令牌**不进颜色契约**（ADR-0001 / ADR-0006），字体信息在
  INDEX.json 的 `fontStyle` / `fonts` / `structuralNote` 字段（源：README「结构令牌」行）。
- 会话文档体系固定：进度写 `docs/.ai/project-progress.md`；决策写 `docs/.ai/decision-log.md`；两者只追加不删历史。
- bug 追加 `docs/.ai/debug-log.md`，格式 `BUG-NNN`；只追加不删历史。
- 交接写 `docs/handoff/`，命名 `handoff-YYYY-MM-DD-*.md`。
- 改 `docs/.ai` 或 handoff 须同步 frontmatter `updated` 为当日。
- 改 AGENTS.md 须在 `docs/.ai/agents-changelog.md` 追加一行处置记录。
- 可复用经验落 `docs/.ai/experience/<领域>/`（正文可改写，历史靠该域 changelog）。

## References

见 AI-MAP.md
见 README.md
见 INDEX.md
见 INDEX.json
见 SOURCES.md
见 docs/l1-roles.md
见 docs/migration-guide.md
见 docs/glossary.md
见 docs/adr/
见 docs/profiles/
见 docs/.ai/agents-changelog.md
见 docs/.ai/decision-log.md
见 docs/.ai/debug-log.md
见 docs/.ai/init-report.md
见 docs/.ai/project-progress.md
见 docs/.ai/experience/
见 docs/handoff/
见 themes/_TEMPLATE/

## Self-Maintenance

1. 改变规则的 PR 须同步改本文件，否则视为规则漂移
2. 规则写入错误发生处最近作用域，家族规则写对应 `themes/<family>/`
3. 命令更名、重构后，提交前核对本文件并更新过期示例
4. 随发布或固定周期清除失效条目
5. 本文件修改走 PR/Review，与代码同等纪律
