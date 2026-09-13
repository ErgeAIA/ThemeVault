# night-owl/light 主题说明

## 元信息

- **来源项目**：Night Owl
- **来源仓库/链接**：https://github.com/sdras/night-owl-vscode-theme
- **原始主题 ID**：`Light Owl`（themes/Night Owl-color-theme.json + Night Owl-Light-color-theme.json）
- **显示名**：Light Owl
- **协议**：MIT（© Sarah Drasner）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/Night Owl-color-theme.json + Night Owl-Light-color-theme.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 7 derivedOptional（见 palette.md）

## 迁移备注

- 品牌 accent = 青绿 #2AA298（button.background，配浅字）。
- 浅色低对比设计：bg #FBFBFB + text #403f53；行号/边框均为柔和灰。
- text-muted 取 comment 系 #989fb1；text-dim 取行号 #90A7B2。
- 语法分工：keyword 蓝 #5ca7e4、string 蓝 #4876d6、number 紫 #aa0982、function 黑 #111111。
- 终端迁移：ansi 16 色完整定义。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 Night Owl-color-theme.json, Night Owl-Light-color-theme.json + LICENSE（只读备查）
