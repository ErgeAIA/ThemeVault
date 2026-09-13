# ThemeVault

> A curated vault of UI theme palettes — collected, normalized, and migration-ready.
> 精选 UI 主题色板库：已收集、已规范化、开箱即迁移。

## 定位

ThemeVault 是一个**主题资产仓库**，不是主题开发项目。它的三件事：
1. **收集**：把各种我喜欢的 UI 主题（来自开源项目、设计系统、手动调色）系统化收集进来。
2. **规范化**：每套主题统一拆成「语义令牌色板表 + 原始源码 + 迁移备注」，字段标准化，便于脚本检索。
3. **可迁移**：配套一套全局通用迁移指南，任何项目需要主题时能极快套用。

## 职责边界

ThemeVault 只维护**本仓库资产**（主题 / 脚本 / 文档 / 预览页）。目标项目（把主题适配进具体
App / 组件库，或审查 / 修复其文字问题）由**外部 AI** 处理：
- 外部 AI 读本仓库的 `palette.md` / `INDEX.json`（`textContrast` 文字对比度、`brand` 品牌按钮）/
  `docs/migration-guide.md`（标准取色片段）/ `docs/brand-colors.md`（按钮文字）取色与核对；
- 本仓库不修改任何目标项目代码，本仓库 AI 也不替外部 AI 执行适配 / 审查 / 修复；
- 新主题入库（S0-S5，见 AGENTS.md）只产出本仓库资产，不涉及目标项目。

## 🤖 给 AI 读者

AI 在本仓库工作时：
1. 先读 **`AGENTS.md`** —— 操作指令（硬性规则 / 工作流唯一详版 / 约定）。
2. 再读 **`AI-MAP.md`** —— 项目地图（目录职责 / 契约语义 / 数据流 / 常见坑）。
3. **本仓库 AI 只维护 ThemeVault 资产**；目标项目的适配 / 审查 / 修复由外部 AI 负责
   （读本仓库文档执行），本仓库 AI 不修改目标项目（见上方「职责边界」）。

**用户要「适配主题」时的快速路径**（把本仓库目录交给其它 AI 时，这条提示足够它直接上手）：
- 用户报**编号**（如「#012 的配色」）→ 查 `INDEX.json` 的 `theme.number` → 读对应 `palettePath` 的 `palette.md` 全表。
- 完整适配流程 = `AI-MAP.md` §5（选主题 → 取色 → 转译 → 校验对比度 → 协议）+
  `docs/migration-guide.md`（L1 角色映射矩阵 / 目标项目命名）。
- 只做适配时**只读即可**：不要改仓库数据、不要跑 `scripts/`；需要新增主题时按 `AGENTS.md` 的 S0–S5 工作流。

## 目录约定

```
ThemeVault/
├── README.md                    # 本文件：定位 + 约定 + 概览（人类入口）
├── AGENTS.md                    # ★ AI 操作指令（硬性规则 / 工作流唯一详版 / 约定）
├── AI-MAP.md                    # ★ 项目地图（目录职责 / 契约语义 / 数据流 / 常见坑）
├── INDEX.md                     # 主题清单索引（总表，必维护）
├── SOURCES.md                   # 来源登记清单（开源仓库地址/协议/主题，新家族必登记）
├── INDEX.json                   # 机器可读副表（含每主题全局编号 number；由 scripts/gen_index.py 生成，勿手改）
├── preview.html                 # 数据驱动 SPA 预览页（读 preview/data.js，双击即开，应用源码可手改）
├── scripts/                     # 生成/校验脚本（gen_index / gen_catppuccin / gen_ergemd / gen_vscode）
├── docs/
│   ├── migration-guide.md       # 全局通用迁移指南（适配多目标栈）
│   ├── brand-colors.md          # 品牌主色速查（每套主题的重点按钮主色 + 按钮文字建议）
│   ├── glossary.md              # 术语表
│   └── adr/                     # 架构决策记录（宪法，0001-0007）
├── preview/                     # data.js（SPA 数据源，由 gen_index.py 生成，勿手改）
└── themes/
    ├── _TEMPLATE/               # 新增主题的模板目录（复制即开始）
    └── <family>/                # 每个来源项目/体系一个家族，如 opensquilla
        ├── README.md            # 家族说明 + 成员表（来源/协议）
        ├── _source/             # 家族共享原始源码（contract.json / tokens.css，只读备查）
        └── <theme-id>/          # 每套主题一个目录，如 dark
            ├── README.md        # 来源/协议/提取方式/迁移备注
            └── palette.md       # 逐角色全量色板表（规范字段）
```

> 目录布局与演进规则见 `docs/adr/0002-directory-family-layout.md`。

## 命名规范

- **主题目录**：`themes/<family>/<id>/`，家族名 + 主题 ID 均小写。
  例：`themes/opensquilla/dark`、`themes/catppuccin/latte`。
- **色板表统一字段**（见 `_TEMPLATE/palette.md`）：语义角色 / 颜色值 / 类型（中性/强调/功能/语法/派生）/ 备注。
- **色彩方案标记**：每套主题标注 `light` / `dark` / `both`，便于按深浅检索。

## 主题分层范式（已验证，所有主题统一采用）

每套主题拆成两层语义角色（**具体角色清单以各家族 `_source/contract.json` 为准**，家族间不同）：
- **required（核心身份色）**：背景阶梯、文本阶梯、边框、card、hairline、accent 族、
  状态色通道（ok/warn/danger/info/queued）、语法高亮。
- **derivedOptional（派生/可选）**：阴影、scrim、状态 fill、sidebar 映射等，可由
  `var()`/`color-mix()` 公式派生，主题仅在真正分歧处覆盖。

> 家族契约示例（以脚本输出为准）：opensquilla / catppuccin required 29 / derivedOptional 33；
> aura required 29 / derivedOptional 13；dracula required 29 / derivedOptional 12；
> ergemd（数据驱动）required 34 / derivedOptional 58。
> 完整角色清单见各家族 `_source/contract.json`；映射矩阵见 `docs/migration-guide.md`。

## 工作流概览

新增一套主题的完整操作流程（S0 侦察 → S5 交付 + 自查清单）是 **AI 执行手册**，
唯一详版见 **`AGENTS.md`「新增主题工作流」**。人类视角的流程全景：

**收集 → 提取（真实源码）→ 规范化（palette.md + README）→ 校验（契约/对比度）→ 登记（INDEX）→ 预览（SPA 卡片 + preview.html）→ 复用（迁移指南）**

> 脚本命令、契约口径、AA 守卫等操作细节一律以 `AGENTS.md` 为准。

## 决策记录

- `docs/adr/`：0001 契约单一事实源 / 0002 目录布局 / 0003 INDEX.json / 0004 许可证与 provenance / 0005 AA 对比度守卫 / 0006 预览约定 / 0007 ErgeMD 数据驱动契约
- `docs/glossary.md`：全仓库统一术语

## 当前进度

- [x] opensquilla（9 value theme + 1 skin，已全量提取并产资产文档）
- [x] 目录迁移 themes/<family>/<id>/ + INDEX.json 生成器 + 宪法文档（ADR × 7 + glossary）
- [x] Catppuccin 家族（latte / frappe / macchiato / mocha，官方 palette.json → L1 映射）
- [x] ErgeMD 家族（AGPL-3.0 自有开源项目，14 套主题，数据驱动契约 + 源码快照，见 ADR-0007）
- [x] Aura 家族（dark / soft-dark，官方 accent 阶梯 → L1 映射，见家族 README）
- [x] Dracula 家族（dark，官方 dracula.yml → L1 映射，见家族 README）
- [x] 社区主题 10 家族（nord / solarized / tokyonight / one-dark-pro / night-owl / synthwave / iceberg / kanagawa / everforest / rose-pine）
- [x] VS Code theme 6 家族（ayu / jellyfish / shades / vue / omni / falcon，21 套主题，`gen_vscode.py` 数据驱动生成）
- [x] OnePage 家族（warm-brown / warm-paper，Obsidian 固化双配色 + 彩色排版 typo-*，见 DEC-001）
- [x] 数据驱动预览 SPA（preview.html 读 data.js 运行时渲染：瀑布流 + 自适应卡片 + AA 徽标 + 品牌色 swatch + 主题对比）
- [x] 主题编号系统（INDEX.json theme.number + INDEX.md 编号列：新增主题追加编号、已有编号不变，直接报编号即可取色）
- [ ] 下一套主题（候选：shadcn）
- [ ] 预览卡片元素细化（代码块模拟等，见 ADR-0006）

---
*本仓库由主题收集需求驱动，非自动生成。每套主题须经人工确认「喜欢」才入库。*
