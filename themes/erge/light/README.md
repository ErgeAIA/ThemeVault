# erge/light 主题说明


## 元信息

- **来源项目**：Erge（原创派生品牌色，非外部开源）
- **原始主题 ID**：`light`
- **显示名**：Light
- **协议**：Custom（© 2026 ErgeAIA，保留署名；待用户最终确认）
- **色彩方案**：light
- **主题类型**：value theme（全局）
- **提取方式**：原创设计（非源码抽取；pin=DEC-017 @ 2026-10-14 本对话推导）
- **显式颜色令牌数**：34（含功能/语法色沿用 opensquilla 语义色，DEC-017 豁免）

## 迁移备注

- 目标项目命名对齐见 `docs/migration-guide.md` §4 映射矩阵。
- `accent-foreground` = `#171614`（近黑）：主色 `#FF6A2B` 偏亮，白字对比度仅 2.86 不达标，故主色块/按钮文字用近黑（WCAG 黑 on accent = 7.35，达标）。
- `text-dim` = `#706E69` 经 OKLCH 推导加深，on bg `#FAF1E9` 对比度 4.57，过 AA。
- 功能色 / 语法色沿用 opensquilla 语义色（橙红家族配套），属 DEC-017 显式豁免。

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — 家族共享契约 / intent / extract（原创账本）
