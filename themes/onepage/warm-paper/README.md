# onepage/warm-paper 主题说明

## 元信息

- **来源项目**：OnePage（ivaneye/OnePage）
- **来源仓库/链接**：https://github.com/ivaneye/OnePage
- **原始主题 ID**：`theme-light`（暖白纸张 / Warm Paper，`body.theme-light`）
- **显示名**：Warm Paper（暖白纸张）
- **协议**：MIT（© 2025 一页清 / ivaneye；基于 Cupertino，MIT）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `theme.css` @ `4226e57d8d33ee4bb0f0bc00405c3762831799bc`
  （`body.theme-light` identity + `.theme-light` 共享 ANSI/code）
- **提取日期**：2026-08-07
- **显式颜色令牌数**：29 required + 25 derivedOptional（含 typo 彩色排版 8 + graph 7 + ANSI 8，见 palette.md）

## 迁移备注（针对本套主题）

- **取色配对**：浅背景 `#faf7f1` 必须配深文字 `#3d3730`；强调为深青 `#0e6e63`（对 bg ≈ 5.7:1）。
- **彩色排版优先保留**：`typo-h1…h6` / `bold` / `italic` 是作者调教的阅读层次，迁 ErgeMD 或其它
  Markdown 阅读器时建议整组搬，不要退回纯正文色。
- **弱对比源事实**：`text-muted` ≈ 3.8:1、`text-faint` ≈ 1.8:1（对 bg）——预览会标红，
  **不擅自改值**；目标项目需要 AA 时用派生色或接受降级。
- **强调色可覆盖**：源码 `var(--onepage-accent-hex, #0e6e63)`；入库为默认值。改强调时同步
  `accent-hover` / `accent-deep` 的 color-mix 公式（勿写死派生 hex）。
- **状态色来自共享 ANSI**：非 OnePage identity 独创，与 Cupertino 层同源；终端/标签场景可另取
  palette 中 `--color-*` 全通道。
- **L1 映射**：见 `themes/onepage/README.md`「L1 语义角色映射」。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — theme.css + LICENSE + contract.json（只读备查）
