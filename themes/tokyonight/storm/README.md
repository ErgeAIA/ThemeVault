# tokyonight/storm 主题说明

## 元信息

- **来源项目**：tokyonight.nvim（Tokyo Night）
- **来源仓库/链接**：https://github.com/folke/tokyonight.nvim
- **原始主题 ID**：`storm`（`lua/tokyonight/colors/storm.lua`，基础 palette）
- **显示名**：Tokyo Night Storm
- **协议**：Apache-2.0（© Folke Lemaitre）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `lua/tokyonight/colors/storm.lua`（完整基础 palette）
- **显式颜色令牌数**：29 required + 9 derivedOptional（见 palette.md）
- **结构令牌**：无特殊字体/圆角（默认 sans）

## 迁移备注

- **storm 是完整 palette**：night 变体由 storm 派生（只改背景阶梯），storm 本身即完整定义；
  比 night 背景略亮（#24283b vs #1a1b26），适合作为「标准深色」ground。
- **palette 键 → 语义映射**：见家族 README「L1 语义角色映射」，色值全部取源码原文。
- **语法色分工**：keyword 紫 / string 绿 / number 橙 / function 蓝 / attr 黄（Tokyo Night 标志性组合）。
- **终端迁移**：terminal_black = #414868（ansi black），完整 ansi 16 色由运行时生成。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 night/storm/moon/day/init.lua + LICENSE（只读备查）
