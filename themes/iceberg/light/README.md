# iceberg/light 主题说明

## 元信息

- **来源项目**：Iceberg
- **来源仓库/链接**：https://github.com/cocopon/vscode-iceberg-theme
- **原始主题 ID**：`Iceberg Light`（themes/iceberg.color-theme.json + iceberg-light.color-theme.json）
- **显示名**：Iceberg Light
- **协议**：MIT（© cocopon）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/iceberg.color-theme.json + iceberg-light.color-theme.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 7 derivedOptional（见 palette.md）

## 迁移备注

- 低对比柔和浅色：bg #e8e9ec + text #33374c。
- 品牌 accent = 蓝 #2d539e（activityBarBadge）。
- text-muted 取 #8389a3；text-dim 取行号 #9fa7bd。
- 语法分工：keyword 蓝 #2d539e、string 紫 #7759b4、number 橙 #c57339、function 深 #33374c。
- 终端迁移：ansi 16 色完整定义。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 iceberg.color-theme.json, iceberg-light.color-theme.json + LICENSE（只读备查）
