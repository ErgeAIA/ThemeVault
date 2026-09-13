# synthwave/dark 主题说明

## 元信息

- **来源项目**：Synthwave 84
- **来源仓库/链接**：https://github.com/robb0wen/synthwave-vscode
- **原始主题 ID**：`Synthwave 84`（themes/synthwave-color-theme.json）
- **显示名**：Synthwave 84
- **协议**：MIT（© Robb Owen）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/synthwave-color-theme.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 7 derivedOptional（见 palette.md）

## 迁移备注

- 霓虹风格：文本保持白色（README 明示「text will remain white」），UI 大面积半透明霓虹。
- 品牌 accent = 珊瑚粉 #f97e72（editorCursor/activityBarBadge），次强调青 #03edf9。
- 半透明语义：bg-elevated #171520DC、bg-hover #37294d99、hairline #ffffff22——保留 alpha 不强行转 hex。
- 语法分工：keyword 黄 #fede5d、string 橙 #ff8b39、number 珊瑚 #f97e72、function 青 #36f9f6。
- 辉光（glow）效果需扩展插件且官方标注实验性，纯色板迁移不含 glow。
- 终端迁移：ansi 16 色完整定义。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 synthwave-color-theme.json + LICENSE（只读备查）
