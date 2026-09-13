# iceberg/dark 主题说明

## 元信息

- **来源项目**：Iceberg
- **来源仓库/链接**：https://github.com/cocopon/vscode-iceberg-theme
- **原始主题 ID**：`Iceberg`（themes/iceberg.color-theme.json + iceberg-light.color-theme.json）
- **显示名**：Iceberg
- **协议**：MIT（© cocopon）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 themes/iceberg.color-theme.json + iceberg-light.color-theme.json（VS Code 主题 JSON，UI 语义键 + tokenColors）
- **显式颜色令牌数**：29 required + 7 derivedOptional（见 palette.md）

## 迁移备注

- 低对比柔和设计：bg #161821 + text #c6c8d1，对比克制，适合长时间阅读。
- 品牌 accent = 蓝 #84a0c6（activityBarBadge，Iceberg 标志色）。
- text-muted 取 #6b7089（badge.foreground/comment 系）；text-dim 取行号 #444b71。
- 语法分工：keyword 蓝 #84a0c6、string 紫 #a093c7、number 橙 #e2a478、function 浅 #c6c8d1。
- 终端迁移：ansi 16 色完整定义。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 iceberg.color-theme.json, iceberg-light.color-theme.json + LICENSE（只读备查）
