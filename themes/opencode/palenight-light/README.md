# opencode/palenight-light 主题说明

## 元信息

- **来源项目**：OpenCode 主题集（anomalyco/opencode），经 dsh-opencode-palette（MIT）聚合
- **来源仓库链接**：https://github.com/FeatherHunter/dsh-opencode-palette @ `9839cb3`
- **原始主题 ID**：`palenight`
- **显示名**：palenight
- **协议**：MIT（DSH 聚合分发；各原主题上游协议以原项目为准）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于 DSH 主题 JSON（OpenCode defs+theme 格式），解析 defs 引用与 dark/light 双方案，生成原生角色色板表
- **显式颜色令牌数**：见 palette.md（50 原生角色）
- **特殊点**：OpenCode 移植版；DSH 以 MIT 聚合；上游协议以原项目为准（Nord 衍生需保留 Sven Greb 署名）

## 迁移备注

- OpenCode 原生角色（非 L1）：background/text/accent/syntax*/markdown*/diff* 等。
- light 方案独立落盘为 `opencode/<id>-light`；dark 为主方案 `opencode/<id>`。
- 取色时按原生角色名直接引用；如需对齐 L1，可参考家族 README 的角色语义。

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — DSH 原始主题 JSON + contract.json + intent.json + extract.json
