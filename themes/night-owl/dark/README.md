# night-owl/dark 主题说明

## 元信息

- **来源项目**：Night Owl
- **来源仓库/链接**：https://github.com/sdras/night-owl-vscode-theme
- **原始主题 ID**：`Night Owl`（themes/Night Owl-color-theme.json + Night Owl-Light-color-theme.json）
- **显示名**：Night Owl
- **协议**：MIT（© Sarah Drasner）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/Night Owl-color-theme.json + Night Owl-Light-color-theme.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 7 derivedOptional（见 palette.md）

## 迁移备注

- 品牌 accent = 紫 #7e57c2（button.background），hover 为全实色；button.foreground 为半透明白 #ffffffcc。
- 极简同色设计：sideBar/statusBar/panel/list.hover 背景均 = bg #011627，层级靠边框与选中态区分。
- text-muted 取 comment 系 #637777（次要文本）；text-dim 取行号 #4b6479。
- 语法分工：keyword 蓝 #5ca7e4、string 米 #ecc48d、number 珊瑚 #F78C6C、function 橙黄 #ffcb8b。
- 终端迁移：ansi 16 色完整定义，可直接取用。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 Night Owl-color-theme.json, Night Owl-Light-color-theme.json + LICENSE（只读备查）
