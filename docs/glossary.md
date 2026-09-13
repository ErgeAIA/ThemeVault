# ThemeVault 术语表（Glossary）

> 全仓库统一用语。新条目随 ADR 演进补充。

## 主题体系（Theme System）

- **family（家族）**：一个来源项目/调色板体系，目录 `themes/<family>/`。
  例：`opensquilla`、`catppuccin`、`shadcn`。
- **theme（主题）**：家族内一套可用的主题，目录 `themes/<family>/<id>/`。
  例：`opensquilla/dark`、`catppuccin/latte`。
- **value theme（值主题）**：定义完整色板令牌的全局主题（`data-theme` 作用域），有 `palette.md`。
- **expressive skin（表达皮肤）**：路由级叠加层，无独立色板，继承当前 value theme 的 ground，
  仅叠加结构/纹理/字体层。例：`opensquilla/out-of-register`。
- **ground（基座）**：当前生效的 value theme 提供的底色/色板基底，skin 在其上叠加。

## 契约与角色（Contract & Roles）

- **contract.json（契约）**：家族 `_source/` 下的 L1 语义角色清单，**唯一事实源**（ADR-0001）。
- **required role（必需角色）**：每套 value theme 必须定义的语义角色（数量以各家族
  `_source/contract.json` 为准：L1 家族 29、ergemd 34）。
- **derivedOptional role（派生可选角色）**：可由公式派生的角色（数量各家族不同：L1 家族
  5–33、ergemd 58），主题仅在真正分歧处覆盖。例：`shadow`、`sidebar-bg`、`msg-bubble`、`atmosphere-dawn`。
- **覆盖（override）**：主题在 derivedOptional 上显式给出与 foundation 默认不同的值。
- **契约外角色（out-of-contract role）**：palette.md 出现但契约未登记的角色 → 违规，需补契约。

## 产物（Artifacts）

- **palette.md（色板表）**：逐角色全量色板表，统一字段（语义角色/颜色值/类型/备注），
  颜色值原文照抄源码。
- **INDEX.md**：人读总表（必维护）。
- **INDEX.json**：机器可读副表，由 `scripts/gen_index.py` 生成（ADR-0003）。
- **主题编号（theme number）**：每套主题的全局唯一数字引用号（INDEX.json 的 `theme.number`，001–074）。
  由 `gen_index.py` 自动分配：新增主题追加 `max+1`，已有编号永不变。引用主题时直接说编号即可。
- **preview/（预览）**：`preview/data.js`（`gen_index.py` 生成）+ `preview.html` 数据驱动 SPA（ADR-0006）。
- **令牌（token）**：一个语义角色及其颜色值；「色板表令牌」= palette.md 行数，
  「源码令牌」= tokens.css 变量数（含结构/焦点环非纯色令牌）。

## 质量（Quality）

- **AA 守卫**：WCAG 2.x AA 对比度口径，普通文本 ≥ 4.5:1、大号文本/UI 组件 ≥ 3:1（ADR-0005）。
- **provenance（来源追溯）**：来源仓库、协议、衍生署名（如 Nord→MIT Sven Greb）的可追溯信息（ADR-0004）。
