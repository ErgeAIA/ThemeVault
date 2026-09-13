# solarized/light 主题说明

## 元信息

- **来源项目**：solarized
- **来源仓库/链接**：https://github.com/altercation/solarized
- **原始主题 ID**：`light`（Solarized Light，`xresources/solarized` 的 Light 定义）
- **显示名**：Solarized Light
- **协议**：MIT（© Ethan Schoonover）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `xresources/solarized`（官方色值）+ `vim-colors-solarized/colors/solarized.vim`（GUI 16 色，权威语义映射）
- **显式颜色令牌数**：29 required + 6 derivedOptional（见 palette.md）

## 迁移备注

- **命名色板 → 语义映射**：Solarized 是 16 色命名色板，迁移时按家族 README 的 L1 映射表转译；
  light 方案的灰阶反转（base3 背景 → base00 文本），强调色与 dark 共用。
- **背景阶梯仅两档**：light 背景只有 base3 / base2 两档，bg-surface-2 / bg-elevated / bg-hover 均为 base2。
- **护眼设计**：base3 暖黄背景 + base00 低饱和文本，是 Solarized 的经典护眼特征，迁移时保留该对比结构。
- **强调色不随深浅变化**：accent（blue）等在 light 下与 dark 同值，accent-foreground 统一用 base3（accent 上文字）。
- **终端迁移**：ansi 16 色官方定义在 `_source/solarized`（color0–15），终端主题可直接取用。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 xresources + solarized.vim + LICENSE（只读备查）
