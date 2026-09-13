# tokyonight/moon 主题说明

## 元信息

- **来源项目**：tokyonight.nvim（Tokyo Night）
- **来源仓库/链接**：https://github.com/folke/tokyonight.nvim
- **原始主题 ID**：`moon`（`lua/tokyonight/colors/moon.lua`，独立 palette）
- **显示名**：Tokyo Night Moon
- **协议**：Apache-2.0（© Folke Lemaitre）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `lua/tokyonight/colors/moon.lua`（独立 palette，紫调月夜）
- **显式颜色令牌数**：29 required + 9 derivedOptional（见 palette.md）
- **结构令牌**：无特殊字体/圆角（默认 sans）

## 迁移备注

- **moon 是独立 palette**：不继承 storm，bg #222436 + 紫调强调（purple #fca7ea、magenta #c099ff），
  整体比 night/storm 更紫更柔和。
- **palette 键 → 语义映射**：见家族 README「L1 语义角色映射」，色值全部取源码原文。
- **fg_dark 显著更暗**：moon 的 text-muted（fg_dark #828bb8）比 night/storm（#a9b1d6）暗不少，
  迁移时如需弱文本对比注意 AA。
- **终端迁移**：terminal_black = #444a73（ansi black）。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 night/storm/moon/day/init.lua + LICENSE（只读备查）
