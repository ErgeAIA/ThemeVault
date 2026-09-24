# ErgeMD 适配 Profile（L1-v4 → ErgeMD）

> 目标：把任意 ThemeVault 主题（含 OnePage 彩色排版）迁入 **ErgeMD**。
> 词表：`docs/l1-roles.md`；机器映射：`ergemd.mapping.json`（同目录）。
> 职责：本文件只给映射与步骤；**不改 ErgeMD 源码**（外部适配者在其仓库落地）。
> 协议：ErgeMD 自身 AGPL-3.0；主题色按来源家族协议与署名使用（如 Nord→arctic）。

## 1. 角色对照（摘要，完整以 mapping.json 为准）

| L1-core | ErgeMD | 备注 |
|---------|--------|------|
| `bg` | `bg-page` | |
| `bg-surface` | `bg-reader` | |
| `bg-surface-2` | `bg-secondary` | |
| `bg-elevated` | `bg-sidebar` | |
| `text` | `text-primary` | **配对** `bg-page` |
| `text-muted` | `text-secondary` | 命名错位 |
| `text-dim` | `text-muted` | 命名错位 |
| `accent` | `brand-primary` | 主行动/品牌 |
| `accent-deep` / `accent-secondary` | `brand-secondary` | |
| `accent-hover` | （公式） | color-mix 或自行提亮 |
| `border*` / `hairline` / `bg-hover` | （无直接） | 见 mapping.json `notes` |
| `ok` `warn` `danger` `info` `queued` | `accent-green/yellow/red/cyan/purple` | |
| `syntax-*` | `code-comment/keyword/string/number/function/label` | literal→number，title→function，attr→label |

| L1-reading | ErgeMD | 备注 |
|------------|--------|------|
| `typo-h1`…`typo-h6` | `h1-color`…`h6-color` | 成套迁移 |
| `typo-bold` / `typo-italic` | （无原生） | 扩展 CSS 或接受缺省 |

## 2. OnePage → ErgeMD（推荐基线）

| 用途 | 取 |
|------|----|
| 浅色阅读 | **#074** `onepage/warm-paper` |
| 深色阅读 | **#073** `onepage/warm-brown` |

示例（warm-paper，值见 `themes/onepage/warm-paper/palette.md`）：

```css
/* ErgeMD 示例片段 — 值须按所选主题 palette 原文 */
--bg-page: #faf7f1;
--bg-reader: #f3efe7;
--bg-secondary: #efeae1;
--text-primary: #3d3730;
--text-secondary: #857d70;
--text-muted: #c0b8ab;
--brand-primary: #0e6e63;
--h1-color: #1D345C;
--h2-color: #52377A;
--h3-color: #0e6e63;
--h4-color: #CE5567;
--h5-color: #9C6B1E;
--h6-color: #8A8378;
/* bold/italic：ErgeMD 无变量时用自定义或省略 */
```

warm-brown 同理读 `#073` palette；**禁止浅底配浅字**。

## 3. 实施步骤

1. 选主题编号 → 读对应 `palette.md` 全表（含「契约兜底」备注）。
2. 按 `ergemd.mapping.json` 填 ErgeMD 主题 CSS：**core 先、reading 后**。
3. 公式值（`color-mix`/`var()`）原样保留；目标构建不支持时再解析并标注推导。
4. 配对校验：`bg-page`↔`text-primary`，对照 `INDEX.json` 的 `textContrast`。
5. 阅读向验收：h1–h6 分层可辨；与 OnePage 预览对照，不整成单色标题（除非主题本身单色）。
6. 保留来源协议与署名（跨项目使用主题时）。

## 4. 明确不做

- 不把 `typo-bold` 伪造成 ErgeMD 原生变量。
- 不改 ThemeVault 以外的 ErgeMD 源码仓库。
- 不「优化」色值；AA 弱项（如 text-faint）如实使用或在目标项目显式降级。
