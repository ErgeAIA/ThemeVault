# dracula/dark 主题说明

## 元信息

- **来源项目**：dracula/visual-studio-code
- **来源仓库/链接**：https://github.com/dracula/visual-studio-code
- **原始主题 ID**：`Dracula`（src/dracula.yml，name: Dracula）
- **显示名**：Dracula
- **协议**：MIT（© Zeno Rocha / Dracula Theme）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `src/dracula.yml`（YAML 锚点体系：base 11 色 + UI 变体 4 色 + ansi 16 色 + tokenColors）
- **显式颜色令牌数**：29 required + 12 derivedOptional（见 palette.md）

## 迁移备注

- **命名色板 → 语义映射**：Dracula 是 11 色命名色板（BG/FG/SELECTION/COMMENT + CYAN/GREEN/ORANGE/PINK/PURPLE/RED/YELLOW），
  迁移到目标项目时按家族 README 的 L1 映射表转译，颜色值全部取 `dracula.yml` 原文。
- **品牌紫 + 功能绿**：accent 用 PURPLE #BD93F9（品牌），但 ok/diff-insert 等成功语义用 GREEN #50FA7B，二者分工明确。
- **无 hover 变体**：accent-hover 取 PINK（Dracula 站点 hover 惯例），需自行确认或 `color-mix` 派生。
- **text-dim 与 muted 同值**：Dracula 无第三档文本色，两角色同为 #6272A4，迁移时可按需自行加深。
- **层级常规**：editor（#282A36）→ sidebar（#21222C）→ statusBar（#191A21）逐层加深，符合「侧栏浮起更亮」的常规（与 aura 相反）。
- **hover/selection 半透明**：list.hoverBackground #44475A75 带 alpha；纯色版 #44475A（SELECTION）可用作 hover 底色。
- **terminal 迁移**：ansi 16 色在 `_source/dracula.yml` 有完整定义（COLOR0-15），终端主题可直接取用。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 dracula.yml + contract.json（只读备查）
