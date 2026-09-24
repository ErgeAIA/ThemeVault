# ThemeVault 项目地图（AI 读者专用）

> 本文件是给 **AI 代理**（或任何需要程序化读取本项目的人）的项目结构地图。
> 目标：让你在 2 分钟内搞清楚「这个仓库存了什么、怎么读、怎么把主题迁移到目标项目」。
> 人类读者请从 `README.md` 开始。

## 0. 一句话定位

ThemeVault = **UI 主题色板资产仓库**：把多个来源项目的主题系统化收集、规范化成
「语义角色色板表 + 源码快照 + 迁移指南」，供任何项目快速适配主题。
**它不是主题开发项目，不产生运行时代码。**

## 1. 目录地图

```
ThemeVault/
├── AGENTS.md                    # ★ AI 操作指令（本仓库工作规则，先读硬性规则）
├── README.md                    # 人读入口：定位/约定/工作流（先读它）
├── AI-MAP.md                    # ★ 本文件：AI 读的项目地图
├── INDEX.md                     # 主题清单总表（人读，数字必须抄 INDEX.json）
├── SOURCES.md                   # 来源登记清单（仓库地址/协议/收录主题，新家族必登记）
├── INDEX.json                   # 机器可读副表（★ 由 scripts/gen_index.py 生成，勿手改）
├── preview.html                 # 数据驱动 SPA（读 preview/data.js 运行时渲染，双击即开）
├── scripts/                     # 生成/校验脚本（唯一事实源驱动）
│   ├── gen_index.py             #   INDEX.json + preview/data.js 生成器 + 契约/对比度校验（CI 门禁）
│   ├── gen_catppuccin.py        #   Catppuccin 家族生成器（官方 palette.json → palette.md）
│   ├── gen_ergemd.py            #   ErgeMD 家族生成器（CSS 变量 → 数据驱动契约 + palette.md）
│   └── gen_vscode.py            #   VS Code theme 6 家族生成器（jsonc/YAML → palette.md + 契约）
├── docs/
│   ├── migration-guide.md       # ★ 全局迁移指南：L1 角色映射矩阵 + 多目标栈实施（适配时必读）
│   ├── glossary.md              # 术语表（family/theme/skin/required/derivedOptional…）
│   └── adr/                     # 架构决策记录（宪法，0001-0007）
├── preview/                     # data.js（SPA 数据源，由 gen_index.py 生成，勿手改）
└── themes/
    ├── _TEMPLATE/               # 新增主题的模板目录（复制即开始）
    └── <family>/                # 家族 = 一个来源项目/体系
        ├── README.md            # 家族说明 + 成员表（来源/协议/继承关系）
        ├── _source/             # 家族共享原始源码（只读备查）
        │   ├── contract.json    # ★ 该家族 L1 语义角色契约（唯一事实源）
        │   └── …（tokens.css / palette.json / 校验脚本等）
        └── <theme-id>/          # 每套主题一个目录
            ├── palette.md       # ★ 逐角色全量色板表（适配时主要读取对象）
            └── README.md        # 来源/协议/提取方式/迁移备注
```

## 2. 家族现状（2026-08-07）

<!-- BEGIN:generated family-status -->
22 个家族 / 74 套主题（73 value theme + 1 skin，数字以 `INDEX.json` 的 `stats` 为准：
familyCount 22 / themeCount 74 / valueThemeCount 73 / skinCount 1 / tokenTotal 3510，21 light + 52 dark）。

| 家族 | 主题数 | 方案 | 契约版本 | required/derived | 角色命名 | 来源 |
|------|--------|------|----------|------------------|----------|------|
| opensquilla | 9 + 1 skin | 2L+7D+1both | v3 | 29/33 | L1 通用 | Apache-2.0 |
| catppuccin | 4 | 1L+3D | v3 | 29/33 | L1 通用 | MIT |
| ergemd | 14 | 2L+12D | v1 | 34/58 | ErgeMD 原生名 | AGPL-3.0 |
| aura | 2 | 0L+2D | v1 | 29/13 | L1 通用 | MIT |
| dracula | 1 | 0L+1D | v1 | 29/12 | L1 通用 | MIT |
| nord | 1 | 0L+1D | v1 | 29/11 | L1 通用 | MIT |
| solarized | 2 | 1L+1D | v1 | 29/6 | L1 通用 | MIT |
| tokyonight | 3 | 0L+3D | v1 | 29/9 | L1 通用 | Apache-2.0 |
| one-dark-pro | 1 | 0L+1D | v1 | 29/5 | L1 通用 | MIT |
| night-owl | 2 | 1L+1D | v1 | 29/6 | L1 通用 | MIT |
| synthwave | 1 | 0L+1D | v1 | 29/6 | L1 通用 | MIT |
| iceberg | 2 | 1L+1D | v1 | 29/6 | L1 通用 | MIT |
| kanagawa | 3 | 1L+2D | v1 | 29/5 | L1 通用 | MIT |
| everforest | 2 | 1L+1D | v1 | 29/5 | L1 通用 | MIT |
| rose-pine | 3 | 1L+2D | v1 | 29/5 | L1 通用 | MIT |
| ayu | 3 | 1L+2D | v1 | 29/12 | L1 通用 | MIT |
| jellyfish | 1 | 0L+1D | v1 | 29/12 | L1 通用 | Apache-2.0 |
| shades | 2 | 0L+2D | v1 | 29/12 | L1 通用 | MIT |
| vue | 2 | 0L+2D | v1 | 29/12 | L1 通用 | MIT |
| falcon | 12 | 8L+4D | v1 | 29/12 | L1 通用 | MIT |
| omni | 1 | 0L+1D | v1 | 29/12 | L1 通用 | MIT |
| onepage | 2 | 1L+1D | v1 | 29/25 | L1 + typo 扩展 | MIT |

> 本表由 `scripts/gen_docs_views.py` 生成，禁止手改计数。
<!-- END:generated family-status -->

## 3. 核心概念速查

### 3.1 家族（family）与主题（theme）
- **家族** = 一个来源项目/体系的全部主题，共享一份 `_source/contract.json` 与继承关系。
- **主题** = 一套具体配色（一个 `[data-theme]` 块或一份 palette）。每套一个目录。
- **主题编号（theme number）**：每套主题的全局唯一引用号（INDEX.json 的 `theme.number`，001–072）。
  由 `gen_index.py` 自动分配（新增主题追加 `max+1`、已有编号永不变）；引用主题时直接说编号。
- **品牌色（brand）**：每套主题的重点按钮/品牌强调主色（INDEX.json 的 `theme.brand`：
  `color` / `buttonText` / `contrast`），L1 家族取 `accent`、ergemd 取 `brand-primary`；
  `buttonText` = 品牌色块文字用深色（`dark`，#101014）还是浅色（`light`，#f5f5f7），
  与预览卡片色块 `fgFor()` 同口径（luminance > 0.55 深字）——适配按「color + 对应文字色」取用
  即与预览完全一致；`contrast` 为 WCAG 参考值（白/黑对比度）。人类速查见 `docs/brand-colors.md`。
- **value theme**：完整定义全局配色的主题；**expressive skin**：叠加层（仅 opensquilla 的 out-of-register，不定义 ground）。

### 3.2 语义角色分层（contract.json 是唯一事实源）
- **required**：该家族每套主题都必须直接定义的核心身份色（背景/文本/边框/强调/状态/语法）。
- **derivedOptional**：可由 `var()`/`color-mix()` 派生的角色；主题仅在真正分歧处覆盖。
- `palette.md` 必须覆盖全部 required；超出 contract 的角色会被校验报「out-of-contract」。

### 3.3 palette.md 五段分区
中性色（背景/文本/边框）→ 强调色 → 状态色/功能色 → 语法高亮 → 派生。
每行：`| 语义角色 | 颜色值 | 类型（中性/强调/功能/语法/派生） | 备注 |`

### 3.4 「继承 base」备注（ErgeMD 特有，⚠️ 取色时必读）
ErgeMD 部分主题（如 cyberpunk/aurora/tokyo-night）只定义特色变量，背景/文本继承
`core/theme-dark-base.css` 或 `theme-light-base.css`。其 palette.md 会把继承角色也列出，
**备注列以「继承」开头**，值 = base 层解析值。**取色时不要以为这些值来自主题文件本身。**

### 3.5 颜色值形态
- 大多数是 `#RRGGBB` 纯色；也存在 `rgba(...)`、`linear-gradient(...)`、`transparent`。
- ErgeMD 提供 `--*-rgb` 三元组变量（如 `--accent-cyan-rgb: 77, 208, 225`），用于派生 rgba。
- **所有值均为源码原文，未改写**；不要“优化”或“统一”它们。

### 3.6 字体身份（预览提示，非颜色契约）
- 主题 README 元信息「结构令牌」行登记特殊字体，格式：`mono（IBM Plex Mono）· 硬角（radius-none）`。
- gen_index.py 解析为 `fontStyle`（mono / display-mono / sans）+ `fonts` + `structuralNote`，存于 INDEX.json。
- 预览卡片据此渲染：`mono` 全卡片等宽（如 opensquilla/terminal），`display-mono` 仅标题等宽
  （如 ember/synthwave），右上角 meta 有 `· mono` 徽标，HTML 卡片有字体 tag。
- **预览不加载外部字体**（保持自包含）；等宽用 ui-monospace 等宽族模拟，字体名仅标注。
- ErgeMD 无主题级特殊字体（共用系统 UI + JetBrains Mono 代码块），`fontStyle` 为空 = 默认 sans。

## 4. 数据流（谁生成谁）

```
themes/<family>/_source/contract.json  ← 唯一事实源（ergemd 由 gen_ergemd.py 生成）
        │
        ▼  palette.md（人工按模板填，或 gen_catppuccin/gen_ergemd/gen_vscode 生成）
themes/<family>/<id>/palette.md + README.md
        │          （README 元信息：显示名/协议/方案/结构令牌→字体）
        │
        ▼  python scripts/gen_index.py --write
INDEX.json + preview/data.js  ← 机器生成（校验：契约覆盖 / out-of-contract / AA / fontStyle / brand）
INDEX.md    ← 人维护总表（数字必须抄 INDEX.json，勿手写）
        │
        ▼  浏览器刷新 preview.html（静态 SPA，读 data.js 运行时渲染，无需重生成）
preview.html  ← 数据驱动卡片（瀑布流 + grid auto-fill + AA 徽标 + 品牌色 swatch）
```

## 5. 适配工作流（你要给目标项目做主题时的步骤）

> 用户可能直接报**编号**（如「#012」）：先查 `INDEX.json` 里 `number=12` 的 theme 拿到
> `palettePath`，再按下面步骤取色转译。

1. **选主题**：查 `INDEX.md` 或 `INDEX.json` → 按方案（light/dark）与备注筛选。
   风格线索在各家族 README 与 palette.md 备注。
   也可**直接按编号引用**：如「#012」→ 查 INDEX.json 里 `number=12` 的 theme → 读其 `palettePath`。
2. **取色**：读 `themes/<family>/<id>/palette.md` 全表。
   - **背景与文字成对取用**：L1 家族 `bg`↔`text`、ergemd `bg-page`↔`text-primary`；
     light 方案浅背景配深文字、dark 方案深背景配浅文字，禁止浅背景配浅/白文字。
   - ErgeMD 注意「继承 base」行的解析值（3.4）。
   - 需要 rgba 变体时找 `--*-rgb` 三元组（ErgeMD）或派生态（opensquilla）。
3. **转译**：把 palette 角色映射到目标项目的设计令牌：
   - L1 通用角色（bg/text/accent/ok/warn/danger…）→ 目标项目同类语义，直接对照
     `docs/migration-guide.md` 的映射矩阵与兼容性坑。
   - ErgeMD 原生角色（bg-page/accent-cyan/obsidian-callout-*…）→ 先按语义归位，再套矩阵。
4. **校验对比度**：AA 守卫口径为文本 4.5:1 / 大块 3:1（ADR-0005）。
   每套主题的 text/text-muted/text-dim 对 bg 对比度已算好存于 `INDEX.json` 的
   `theme.textContrast` 字段（textOnBg / textMutedOnBg / textDimOnBg），直接查；
   `preview.html` 卡片徽标也已标出 ✓/✗；被标 ✗ 的角色（如部分主题的 text-muted
   仅 2.9–3.7:1）在目标项目里要用派生色或接受降级。
5. **注意协议**：opensquilla 的 arctic 是 Nord MIT 衍生需保留署名；ergemd 为自有开源项目（AGPL-3.0）。
6. **验证**：改完后跑 `python scripts/gen_index.py`（不传 --write 仅校验）确认无回归。

## 6. 关键脚本速查

| 脚本 | 用法 | 输出 | 何时跑 |
|------|------|------|--------|
| gen_index.py | `python scripts/gen_index.py [--write]` | INDEX.json + preview/data.js（含每主题 number + brand + tokens）+ 校验报告；exit 1 = 违规 | 任何 palette/contract 变更后 |
| gen_catppuccin.py | `python scripts/gen_catppuccin.py` | catppuccin 家族 palette.md + README + contract | 仅 Catppuccin 重生成 |
| gen_ergemd.py | `python scripts/gen_ergemd.py [--src <dir>]` | ergemd 家族 14 套 + 数据驱动 contract | 仅 ErgeMD 源码变更后 |
| gen_vscode.py | `python scripts/gen_vscode.py [--families ...]` | VS Code theme 6 家族 21 套（ayu/shades/jellyfish/vue/omni/falcon）palette.md + README + contract | 新增/更新 VS Code theme 家族时 |

> `--write` 才会落盘 INDEX.json + preview/data.js；不带参数 = 只校验（CI 门禁）。
> 预览页 `preview.html` 是静态 SPA，读 data.js 运行时渲染——更新 data.js 后刷新浏览器即反映，无需脚本重生成预览。

## 7. ADR 索引（宪法，规则冲突时以 ADR 为准）

- 0001 契约单一事实源（contract.json 唯一；opensquilla 演进到 v3）
- 0002 目录布局 themes/<family>/<id>/
- 0003 INDEX.json 机器可读副表
- 0004 许可证与 provenance 策略
- 0005 AA 对比度守卫（文本 4.5 / 大块 3）
- 0006 预览约定（数据驱动 SPA：preview.html 读 preview/data.js 运行时渲染 + 字体身份提示）
- 0007 ErgeMD 家族：数据驱动契约 + AGPL-3.0 自有开源项目来源 + 家族感知预览

## 8. 常见坑（AI 适配时最容易踩）

1. **数字别手写**：INDEX.md / README 里的数字以 `INDEX.json` 为准，改文档不如改数据后重跑脚本。
2. **INDEX.json 勿手改**：它是生成物；改 palette/contract 后重跑 gen_index.py。
3. **ErgeMD 继承角色**：先看备注列「继承」再取色，否则拿到的是 base 值却以为是主题值。
4. **ergemd 角色名 ≠ L1**：跨家族迁移必须过映射矩阵，禁止按名字硬搬。
5. **对比度红叉**：预览页的 ✗ 是源主题真实存在的弱对比，不是生成器 bug；适配时自行决策。
6. **非纯色值**：rgba/gradient/transparent 是合法的（如状态栏、滚动条），转译时保留语义不强行转 hex。
7. **协议**：入库时确认过来源与协议；跨项目使用时仍要保留必需署名（Nord→arctic）。
8. **字体 ≠ 颜色契约**：font/radius 是结构类令牌，不在 contract.json 里；要字体信息去
   INDEX.json 的 `fontStyle`/`fonts`/`structuralNote` 字段（源：主题 README「结构令牌」行）。
9. **预览是自包含的**：不加载外部字体/图片，mono 效果用系统等宽族模拟；真机字体名以源项目为准。
10. **编号勿手改**：`theme.number` 由 gen_index.py 自动分配（新增主题追加 `max+1`、已有编号不变）；
    手工改它没用，还会与 INDEX.md 编号列、预览卡片编号 tag 漂移。
