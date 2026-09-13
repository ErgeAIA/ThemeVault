# aura 家族

> 来源项目：[daltonmenezes/aura-theme](https://github.com/daltonmenezes/aura-theme)（MIT，@ main）
> 数据源：`src/core/colors/schemes/{common,dark,soft-dark}.ts`（官方 accent 阶梯 0–39）
> + `packages/vscode/themes/aura-*-color-theme.json`（语义映射）+ `packages/color-palettes/aura-colors.css`

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Aura Dark | dark | value theme | 深色背景 #15141b + 亮语法（最知名默认） |
| `soft-dark` | Aura Soft Dark | dark | value theme | 柔和深紫灰背景 #21202e + 亮语法 |

> **官方 4 方案与本仓库的对应**：上游 `schemes/*.ts` 定义 4 个导出
> （`dark` / `darkSoft` / `softDark` / `softDarkSoft`），VSCode 端口有 4 个 JSON
> （aura-dark / aura-dark-soft-text / aura-soft-dark / aura-soft-dark-soft-text）。
> 差异轴：**背景色**（dark #15141b vs soft #21202e）+ **语法/前景**（亮 vs 柔和
> shade(0.2)+desaturate(0.1)）。本仓库收 2 套核心（背景轴两端），
> 「soft-text」（柔和语法/前景）为同一色板的柔化滤镜，不作独立主题收录；
> 需要时按 `commonSoftSyntaxHighlighting` / `commonSoftUI` 派生即可。

## L1 语义角色映射（本家族统一）

> Aura 是 **accent 阶梯色板**（accent0–39，`common.ts`），不是 UI 令牌集。
> 下表把官方 accent 阶梯 + VSCode 语义键映射到 L1 语义角色（29 required + 13 derivedOptional）。
> 两套主题共用同一映射，仅背景阶梯与 accent-foreground 随主题不同。

| L1 语义角色 | Aura 令牌 | 来源键（VSCode） | 说明 |
|-------------|-----------|------------------|------|
| `bg` | accent12 | editor.background | dark #15141b / soft #21202e |
| `bg-surface` | accent24 | titleBar/statusBar/editorWidget.background | dark #121016 / soft #1f1a27 |
| `bg-surface-2` | accent30 | list.activeSelectionBackground | 选中列表项 |
| `bg-elevated` | accent21 | sideBar.background | 注意：Aura 侧栏比 bg 更暗（#110f18） |
| `bg-hover` | accent23 | list.hoverBackground | |
| `text` | accent7 | editor.foreground | |
| `text-muted` | accent9 | dropdown/input.foreground | |
| `text-dim` | accent8 | tab.inactiveForeground / comment | |
| `border` | accent23 | dropdown/input.border | |
| `border-strong` | accent11 | panel/titleBar/tab.border | dark #000000 / soft #141414 |
| `border-focus` | accent1 | inputOption.activeBorder | focusBorder 本体为 accent17（半透明） |
| `card` | accent24 | editorWidget.background | |
| `hairline` | accent13 | editorWidget.border | dark #2d2d2d / soft #444444 |
| `accent` | accent1 | badge/cursor/selection/focus | 紫，品牌色 |
| `accent-hover` | accent25 | button.hoverBackground | 紫无显式 hover；此为 secondary（绿）按钮 hover |
| `accent-deep` | accent38 | selection 无 alpha 实体 | |
| `accent-secondary` | accent2 | button/progress/tab-active | 绿（Aura 的实际行动色） |
| `accent-foreground` | accent12 | badge/button.foreground | dark #15141b / soft #21202e |
| `ok` | accent2 | success/green | |
| `warn` | accent3 | warning/orange | |
| `danger` | accent5 | error/red | |
| `info` | accent32 | blue（类型/类） | |
| `queued` | accent6 | pink（属性） | |
| `syntax-comment` | accent8 | comment | |
| `syntax-keyword` | accent1 | keyword/storage/tag | |
| `syntax-string` | accent2 | string/constant | |
| `syntax-literal` | accent4 | 官方色板存在，VSCode 端口未映射 | #9dff65 |
| `syntax-title` | accent3 | entity.name.function | |
| `syntax-attr` | accent6 | entity.other.attribute-name | |
| `shadow` | accent0 | widget.shadow | |
| `selection` | accent20 | editor.selectionBackground | 半透明紫 |
| `selection-solid` | accent38 | — | 无 alpha 版 |
| `placeholder` | accent14 | input.placeholderForeground | |
| `diff-insert` | accent26 | diffEditor.insertedTextBackground | |
| `diff-remove` | accent27 | diffEditor.removedTextBackground | |
| `statusbar-foreground` | accent10 | statusBar.foreground | |
| `activitybar-inactive` | accent35 | activityBar.inactiveForeground | |

## 结构约定

```
themes/aura/
├── README.md            # 本文件
├── _source/             # 官方 schemes TS + 色板 CSS + VSCode JSON（只读备查）+ contract.json
└── <theme-id>/          # dark / soft-dark
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以 `src/core/colors/schemes/*.ts` + VSCode JSON 为准；如上游改色，重跑快照与脚本。
