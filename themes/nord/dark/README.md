# nord/dark 主题说明

## 元信息

- **来源项目**：nord（Nord）
- **来源仓库/链接**：https://github.com/nordtheme/nord（生态主仓库；VS Code port：arcticicestudio/nord-visual-studio-code）
- **原始主题 ID**：`nord`（Nord，`src/nord.css` 的 16 色 palette）
- **显示名**：Nord
- **协议**：MIT（© Sven Greb）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `src/nord.css`（官方 16 色定义 + 用途注释）+ `nord-color-theme.json`（VS Code 端口 UI 语义映射）
- **显式颜色令牌数**：29 required + 11 derivedOptional（见 palette.md）
- **结构令牌**：无特殊字体/圆角（Nord 极简，默认 sans）

## 迁移备注

- **命名色板 → 语义映射**：Nord 是 16 色命名色板（Polar Night nord0–3 / Snow Storm nord4–6 / Frost
  nord7–10 / Aurora nord11–15），迁移时按家族 README 的 L1 映射表转译，颜色值全部取官方源码原文。
- **accent = nord8**：官方明确 `--nord8` 是「the accent color of the color palette」，主强调用 #88c0d0；
  列表选中态（list.activeSelectionBackground）也直接用 accent 实色——品牌统一度高。
- **浮起层与 bg 同色**：Nord 极简设计，editorWidget/peekView 背景 = nord0（与编辑器背景同色），
  bg-elevated 与 bg 同值，如实标注不造值。
- **无第三档文本色**：text-dim 与 text-muted 同值（均为 nord3 #4c566a），目标项目需要时自行派生。
- **hover 半透明系**：selection = nord2 半透明（#434c5ecc）、diff-insert/remove 为 nord9/nord11 低透明度，
  保留 alpha 语义。
- **终端迁移**：ansi 16 色官方定义在 `_source/nord-color-theme.json`（terminal.ansi*：Black=nord1、
  Red=nord11、Green=nord14、Yellow=nord13、Blue=nord9、Magenta=nord15、Cyan=nord8、White=nord5 +
  Bright 系），终端主题可直接取用。
- **与 opensquilla/arctic 的关系**：arctic 是 opensquilla 的 Nord 衍生主题；本家族是 Nord **本体**，
  跨项目使用须保留 Sven Greb 的 MIT 署名。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 nord.css + nord-color-theme.json + LICENSE（只读备查）
