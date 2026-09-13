# ergemd/dark 主题说明

## 元信息

- **来源项目**：ErgeMD（AGPL-3.0，Rust 桌面 Markdown 阅读器）
- **原始主题 ID**：`dark`
- **显示名**：Dark
- **协议**：AGPL-3.0
- **色彩方案**：dark
- **主题类型**：value theme（全局，data-theme 作用域）
- **提取方式**：基于真实源码 `src/styles/themes/dark.css` 的 `[data-theme]` 变量块
- **显式颜色令牌数**：108（主题文件直接定义；另有 base 继承角色见 palette.md）

## 迁移备注

- 目标项目命名对齐见家族 README「L1 语义角色映射建议」。
- 背景/文字基础：主题完整定义；派生/结构变量继承 core/theme-derived.css。
- 特殊点：暗色主题 优化方式：共性变量直接使用统一色板值，个性变量按 OKLCH 原则优化

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — ErgeMD 源码快照（含 core/，只读备查）
