# ADR-0006 预览约定：数据驱动 SPA

- 状态：**已接受**（2026-08-04，G5，方案先行）；**首版已实现**（2026-08-04）；**演进为 SPA**（2026-08-07）
- 关联：ADR-0003、ADR-0005

## 背景

用户希望预览效果类似 vscodethemes.com：快速浏览每套主题的主要颜色。
预览需要随主题入库自动更新 → 必须脚本生成、可重复。首版用脚本生成 SVG 色卡，
后因固定尺寸 / 卡片重叠 / 压缩 / 错乱等问题，演进为数据驱动 SPA。

## 决策

1. **生成方式**：`scripts/gen_index.py --write` 生成预览数据，禁用手工截图。
   - `gen_index.py --write` 输出 `preview/data.js`（全量 INDEX.json 包成 `window.__TV`，
     含每主题 tokens / number / brand）+ `INDEX.json`。**唯一生成命令**（无独立预览脚本）。
   - `preview.html` 是数据驱动 SPA（原生 JS 单文件，读 `preview/data.js` 运行时渲染），
     双击即开（`<script src>` 无 file:// CORS 限制，比 fetch 稳）。
2. **卡片内容**：每套主题的主要颜色全包含 —— 背景阶梯、文本阶梯、border、accent 族、
   6 通道状态、语法高亮（按家族分区：L1 通用 / ErgeMD 原生变量名）。另有 AA 徽标、
   品牌色 swatch、编号 tag、字体 tag。
3. **触发时机**：每改完 palette / contract，跑 `gen_index.py --write`；data.js 更新后
   刷新浏览器即反映新主题，**无需额外重生成预览**（SPA 运行时渲染）。
4. **SPA 而非静态产物**：早期用 `scripts/gen_preview.py` 生成 SVG 色卡 + `preview/index.html`，
   因固定尺寸 / 卡片重叠 / 压缩 / 错乱等问题退役（脚本与 SVG 已删除）。改用数据驱动 SPA：
   瀑布流（CSS columns）+ grid auto-fill 色块（卡片高度自适应内容），三叠加筛选
   （搜索 × 家族下拉 × scheme）+ 主题对比（选 2-4，角色×主题矩阵 + 上方完整卡片 + 色块点击复制）。
5. **字体身份提示（2026-08-05 补充）**：主题若有特殊字体（结构类令牌，非颜色契约），
   在主题 README 元信息「结构令牌」行登记，格式：`mono（IBM Plex Mono）· 硬角（radius-none）`；
   `gen_index.py` 解析为 `fontStyle`（mono / display-mono / sans）+ `fonts` + `structuralNote`，
   SPA `renderCard` 据此渲染：`mono` 全卡片等宽（标题 / 分区 / 标签），`display-mono` 仅标题等宽，
   右上角 meta 追加 `· mono` 徽标，卡片显示字体 tag。**不加载外部字体**（预览保持自包含），
   只做字体族提示（ui-monospace 等宽族 + 字体名标注）。字体不进入颜色契约（ADR-0001 不变）。

## 影响

- 预览产物：`preview/data.js`（生成物，勿手改）+ `preview.html`（应用源码，可手改）。
- 卡片含全部主要颜色（背景 / 文本 / 边框 + 强调 + 状态 + 语法）+ AA 对比度徽标（ADR-0005）+ 品牌色 swatch。
- `scripts/gen_preview.py` 与 `preview/*.svg`、`preview/index.html` 已删除（SPA 取代）。
- 字体身份提示已实现：terminal（mono）与 ember / synthwave（display-mono）已在预览卡片体现；
  ErgeMD 无主题级特殊字体（共用系统 UI + JetBrains Mono 代码块），不标注。
