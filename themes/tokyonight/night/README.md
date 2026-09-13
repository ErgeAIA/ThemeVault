# tokyonight/night 主题说明

## 元信息

- **来源项目**：tokyonight.nvim（Tokyo Night）
- **来源仓库/链接**：https://github.com/folke/tokyonight.nvim
- **原始主题 ID**：`night`（`lua/tokyonight/colors/night.lua`，默认 flavor）
- **显示名**：Tokyo Night
- **协议**：Apache-2.0（© Folke Lemaitre）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `lua/tokyonight/colors/night.lua`（在 storm palette 上覆盖背景阶梯）
- **显式颜色令牌数**：29 required + 9 derivedOptional（见 palette.md）
- **结构令牌**：无特殊字体/圆角（默认 sans）

## 迁移备注

- **palette 键 → 语义映射**：Tokyo Night 的 lua palette 是命名色表（bg/fg/comment/blue/cyan/green/
  magenta/orange/purple/red/yellow…），迁移时按家族 README 的 L1 映射表转译，颜色值全部取源码原文。
- **night 是 storm 的深覆盖**：`night.lua` 对 storm palette 只覆盖 bg/bg_dark/bg_dark1（更深），
  其余全部继承 storm；本表已列出解析值。
- **无显式 hover 变体**：accent-hover 与 accent 同值（blue），需要时可用 `color-mix` 派生。
- **语法色分工**：keyword 紫（purple）、string 绿（green）、number 橙（orange）、function 蓝（blue）、
  attr 黄（yellow）、comment 深紫灰——Tokyo Night 的标志性高亮组合。
- **终端迁移**：terminal_black 在 palette 定义（ansi black）；完整 ansi 16 色由主题运行时生成，
  需要时按 night palette 的 base 色 + 强调色展开。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 night/storm/moon/day/init.lua + LICENSE（只读备查）
