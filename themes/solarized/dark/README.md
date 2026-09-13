# solarized/dark 主题说明

## 元信息

- **来源项目**：solarized
- **来源仓库/链接**：https://github.com/altercation/solarized
- **原始主题 ID**：`dark`（Solarized Dark，`xresources/solarized` 的 Dark 定义）
- **显示名**：Solarized Dark
- **协议**：MIT（© Ethan Schoonover）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `xresources/solarized`（官方色值）+ `vim-colors-solarized/colors/solarized.vim`（GUI 16 色，权威语义映射）
- **显式颜色令牌数**：29 required + 6 derivedOptional（见 palette.md）

## 迁移备注

- **命名色板 → 语义映射**：Solarized 是 16 色命名色板（base03–base3 灰阶 + 8 强调色），
  迁移到目标项目时按家族 README 的 L1 映射表转译，颜色值全部取官方源码原文。
- **背景阶梯仅两档**：dark 背景只有 base03 / base02 两档，bg-surface-2 / bg-elevated / bg-hover 均为 base02，
  如实标注不造值；目标项目如需更多层级可自行派生。
- **强调色不随深浅变化**：8 强调色（blue/cyan/green/yellow/orange/red/magenta/violet）dark/light 共用，
  仅中性灰阶反转。
- **accent 分工**：accent 用 blue（主强调），hover/次强调用 cyan；ok 用 green、danger 用 red、
  warn 用 yellow、queued 用 violet，语义与色相严格对应。
- **终端迁移**：ansi 16 色官方定义在 `_source/solarized`（color0–15，base02/red/green/yellow/blue/
  magenta/cyan/base2 + base03/orange/base01/base00/base0/violet/base1/base3），终端主题可直接取用。
- **无 hover 变体**：accent-hover 取 cyan（社区惯例的亮强调），非官方显式 hover，可按需 color-mix 派生。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 xresources + solarized.vim + LICENSE（只读备查）
