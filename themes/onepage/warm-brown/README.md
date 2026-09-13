# onepage/warm-brown 主题说明

## 元信息

- **来源项目**：OnePage（ivaneye/OnePage）
- **来源仓库/链接**：https://github.com/ivaneye/OnePage
- **原始主题 ID**：`theme-dark`（暖棕·冷锚 / Warm Brown · Cool Anchor，`body.theme-dark`）
- **显示名**：Warm Brown · Cool Anchor（暖棕·冷锚）
- **协议**：MIT（© 2025 一页清 / ivaneye；基于 Cupertino，MIT）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `theme.css` @ `4226e57d8d33ee4bb0f0bc00405c3762831799bc`
  （`body.theme-dark` identity + `.theme-dark` 共享 ANSI/code）
- **提取日期**：2026-08-07
- **显式颜色令牌数**：29 required + 25 derivedOptional（含 typo 彩色排版 8 + graph 7 + ANSI 8，见 palette.md）

## 迁移备注（针对本套主题）

- **取色配对**：深背景 `#262322` 必须配浅文字 `#cfc7bd`；强调为浅青 `#6db3a3`（冷锚，对 bg ≈ 6.4:1）。
- **冷暖对比结构**：暖棕底 + 冷青绿强调，与 light「暖白 + 深青」同一对比逻辑；
  迁移时不要把强调换成暖色，否则丢掉设计锚点。
- **彩色排版优先保留**：亮暗同源（相对 light 各提亮一档），`typo-*` 整组迁移。
- **弱对比源事实**：`text-faint` ≈ 2.7:1（对 bg）——预览标红，不擅自改值；`text-muted` ≈ 4.8:1 过线。
- **背景表面为 color-mix 公式**：`bg-surface` / `bg-surface-2` 是
  `color-mix(in srgb, #262322, white 5%/8%)`，目标项目不支持 color-mix 时再解析，勿在 palette 里预转 hex。
- **状态色来自共享 ANSI**：与 Cupertino 层同源；全通道见 palette `--color-*`。
- **L1 映射**：见 `themes/onepage/README.md`「L1 语义角色映射」。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — theme.css + LICENSE + contract.json（只读备查）
