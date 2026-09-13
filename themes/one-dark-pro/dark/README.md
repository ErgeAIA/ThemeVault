# one-dark-pro/dark 主题说明

## 元信息

- **来源项目**：One Dark Pro
- **来源仓库/链接**：https://github.com/Binaryify/OneDark-Pro
- **原始主题 ID**：`One Dark Pro`（themes/OneDark-Pro.json）
- **显示名**：One Dark Pro
- **协议**：MIT（© Binaryify）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/OneDark-Pro.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 6 derivedOptional（见 palette.md）

## 迁移备注

- 品牌 accent 取 activityBarBadge 蓝 #4d78cc（品牌辨识度）；VS Code 按钮实色为 #404754 低调灰蓝，迁移时可按需取用。
- 无显式 hover/更深变体：accent-hover / accent-deep 与 accent 同值，可 color-mix 派生。
- 语法分工：keyword 紫 #c678dd、string 绿 #98c379、number 橙 #d19a66、function 蓝 #61afef、class 黄 #e5c07b。
- 终端迁移：ansi 16 色在 _source JSON 完整定义，terminal 主题可直接取用。
- 无第三档文本色语义：text-dim 取行号色 #495162，text-muted 取 comment 系 #5c6370。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 OneDark-Pro.json + LICENSE（只读备查）
