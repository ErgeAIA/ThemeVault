# tokyonight/light 主题说明

## 元信息

- **来源项目**：DSH 聚合 OpenCode 主题集（FeatherHunter/dsh-opencode-palette）
- **来源仓库/链接**：https://github.com/FeatherHunter/dsh-opencode-palette
- **原始主题 ID**：`tokyonight`（DSH）
- **显示名**：tokyonight Light
- **协议**：MIT（DSH 聚合；上游协议以原项目为准）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于 DSH 主题 JSON（OpenCode 原生角色），经 OpenCode→L1 映射脚本生成
- **显式颜色令牌数**：29 required + 5 derivedOptional（见 palette.md）

## 迁移备注

- light 方案补充自 DSH（与 dark 不同源；dark 源为各自原始 VS Code 主题）。取色配对：bg `##e1e2e7` ↔ text `##3760bf`。
- 契约兜底角色见 palette.md 备注（OpenCode 未提供独立 L1 值的角色，如 bg-elevated/bg-hover/text-dim 等同源角色）。
- 上游协议：原主题 `tokyonight` 以原项目协议为准（多 MIT/Apache-2.0）。

## 文件清单

- `palette.md` — 逐角色全量色板表（L1 语义角色）
- `../_source/` — 家族级 DSH 源快照（值域溯源见 `opencode/_source/tokyonight.json`）
