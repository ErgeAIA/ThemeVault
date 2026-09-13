# kanagawa/lotus 主题说明

## 元信息

- **来源项目**：kanagawa.nvim（Kanagawa）
- **来源仓库/链接**：https://github.com/rebelot/kanagawa.nvim
- **原始主题 ID**：`lotus`（themes.lua 变体函数）
- **显示名**：Kanagawa Lotus
- **协议**：MIT（© rebelot）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `lua/kanagawa/themes.lua` 的 `lotus` 变体（ui/syn/diag 语义映射）+ `colors.lua` 共享色板
- **显式颜色令牌数**：29 required + 5 derivedOptional（见 palette.md）

## 迁移备注

- **变体定位**：lotusWhite 背景系（浅色）；Lotus 是官方 3 变体之一（wave 默认 / dragon 暖暗 / lotus 浅色）。
- **共享色板**：3 变体共用 `colors.lua` 命名色板，仅变体函数选择不同色组；迁移时按家族 README 映射表转译。
- **品牌 accent**：crystalBlue（wave）/ dragonBlue2（dragon）/ lotusBlue4（lotus），均为主强调蓝；次强调紫。
- **diag 分工**：ok 绿 / warning 黄 / error 红 / info 蓝，3 变体语义一致（dragon 共用 wave 的 diag 色）。
- **终端迁移**：`themes.lua` 的 term 段定义了 ansi 16 色，可直接取用。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 colors.lua + themes.lua + LICENSE（只读备查）
