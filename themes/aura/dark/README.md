# aura/dark 主题说明

## 元信息

- **来源项目**：aura-theme（daltonmenezes/aura-theme）
- **来源仓库/链接**：https://github.com/daltonmenezes/aura-theme
- **原始主题 ID**：`dark`（VSCode 端口 `aura-dark-color-theme.json`）
- **显示名**：Aura Dark
- **协议**：MIT（© Dalton Menezes）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `src/core/colors/schemes/dark.ts` + `common.ts` + `packages/vscode/themes/aura-dark-color-theme.json`
- **显式颜色令牌数**：29 required + 13 derivedOptional（accent 阶梯映射，见 palette.md）

## 迁移备注

- **品牌色与行动色分离**：Aura 的「品牌强调」是紫 `#a277ff`（badge/cursor/selection/focus），
  但「实际可点击行动」是绿 `#61ffca`（button/progress/tab-active）。迁移时若只取一个 accent，
  交互组件建议用绿（按钮语义），品牌/焦点用紫。
- **无紫色 hover**：`accent-hover` 取自 `button.hoverBackground #49c29a`（绿色按钮 hover），
  紫色本身无 hover 变体；如需紫 hover 请自行派生（如 `color-mix` 提亮）。
- **层级反向**：sideBar（#110f18）比 editor 背景（#15141b）更暗，与常规「侧栏浮起更亮」相反，
  迁移 sidebar 时不要套用通用「浮起层加亮」公式。
- **soft-text 变体**：上游还有「柔和语法/前景」版（`commonSoftSyntaxHighlighting` =
  shade(0.2)+desaturate(0.1)，`commonSoftUI` accent9 #b4b4b4），对应
  `aura-dark-soft-text-color-theme.json`，未单独入库；需要时按此公式派生。
- **选区是半透明紫**：`selection #3d375e7f`（accent20）带 alpha，叠在背景上呈深紫；纯色版为
  `#29263c`（accent38）。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 schemes TS + 色板 CSS + VSCode JSON + contract.json（只读备查）
