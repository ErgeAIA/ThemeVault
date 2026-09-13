# opensquilla/ember 主题说明


## 元信息

- **来源项目**：opensquilla（Apache-2.0，@ main）
- **原始主题 ID**：`ember`
- **显示名**：Ember
- **协议**：Apache-2.0（arctic 为 Nord MIT 衍生，需保留 Sven Greb 署名）
- **色彩方案**：dark
- **主题类型**：value theme（全局，data-theme 作用域）
- **提取方式**：基于真实源码 `opensquilla-webui/src/themes/ember/tokens.css`
- **显式颜色令牌数**：37（含结构/焦点环等非纯色令牌）
- **结构令牌**：display-mono（Space Grotesk / IBM Plex Mono）· display 标题等宽

## 迁移备注

- 目标项目命名对齐见 `docs/migration-guide.md` §4 映射矩阵。
- 浅色 baseline 优先取 `light`，深色取 `dark`；其余 7 套作风格化皮肤叠加。
- 特殊点：火山暖暗，含 world.css 辉光（装饰层，纯色板忽略）

## 文件清单

- `palette.md` — 逐角色全量色板表
- `../_source/` — 家族共享原始源码（tokens.css / manifest.ts / foundation.css / contract.json / 校验脚本）