# aura/soft-dark 主题说明

## 元信息

- **来源项目**：aura-theme（daltonmenezes/aura-theme）
- **来源仓库/链接**：https://github.com/daltonmenezes/aura-theme
- **原始主题 ID**：`softDark`（VSCode 端口 `aura-soft-dark-color-theme.json`）
- **显示名**：Aura Soft Dark
- **协议**：MIT（© Dalton Menezes）
- **色彩方案**：dark
- **主题类型**：value theme（全局）
- **提取方式**：基于真实源码 `src/core/colors/schemes/soft-dark.ts` + `common.ts` + `packages/vscode/themes/aura-soft-dark-color-theme.json`
- **显式颜色令牌数**：29 required + 13 derivedOptional（accent 阶梯映射，见 palette.md）

## 迁移备注

- **与 Aura Dark 的差异**：仅背景阶梯（bg #21202e / surface #1f1a27 / sidebar #1c1b22）、
  hairline（#444444）、border-strong（#141414）、accent-foreground（#21202e）；语法色与强调色完全一致。
- **「Soft」指背景柔和**：上游 `softDark` 的语法仍是亮色（`commonSyntaxHighlighting`），
  「柔和语法」是另一个变体 `softDarkSoft`（`aura-soft-dark-soft-text-color-theme.json`，
  shade(0.2)+desaturate(0.1)），未单独入库。
- 其余注意事项同 `dark`（品牌色/行动色分离、无紫 hover、层级反向、半透明选区）。

## 文件清单

- `palette.md` — 逐角色全量色板表（规范字段）
- `../_source/` — 官方 schemes TS + 色板 CSS + VSCode JSON + contract.json（只读备查）
