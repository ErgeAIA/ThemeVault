# catppuccin/frappe 主题说明

## 元信息

- **来源项目**：catppuccin（MIT，@ main）
- **原始主题 ID**：`frappe`
- **显示名**：Frappe
- **协议**：MIT
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于官方 `palette.json` 的 frappe 分片（26 色命名调色板），按家族 L1 映射生成
- **特殊点**：中深（官方 Frappe）；映射 mauve→accent / green→ok / red→danger / blue→info

## 迁移备注

- Catppuccin 是命名调色板，非 UI 令牌集；迁移时按家族 README 映射表展开即可。
- 派生覆盖仅状态 fill（ok/warn/danger/info/queued-fill），阴影/sidebar 等继承 foundation 默认。
- 协议 MIT；建议保留来源链接，无需强制署名。

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — 官方 palette JSON（含本 flavor）+ contract.json
