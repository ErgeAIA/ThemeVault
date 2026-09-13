# OpenSquilla 主题资产库（可移植色板集合）

> **用途**：本文件是 OpenSquilla 全部主题的**自包含快照**，作为主题资产保存，方便日后迁移到其它项目。
> **来源仓库**：`opensquilla/opensquilla`（Apache-2.0，@ main 分支）
> **源路径**：`opensquilla-webui/src/themes/*`（value theme 的 `tokens.css` + `manifest.ts`）
> **提取方式**：源码级直接读取各 `tokens.css`，非 README 推断。
> **配套文档**：迁移到其它项目的操作指南见 `opensquilla-theme-migration-guide.md`。

---

## 0. 许可与归属

- 仓库协议：**Apache-2.0**（允许商业/修改/再分发，需保留版权与 NOTICE）。
- 部分主题含第三方调色板衍生：`arctic` 源自 **Nord**（MIT，Sven Greb，已在源码 THIRD_PARTY_NOTICES 标注，使用时保留署名）。
- 其余主题（dark/light/ember/miami/synthwave/terminal/vapor/crt-green）为 OpenSquilla 原创，随仓库协议。

## 1. 主题体系架构（迁移前必读）

OpenSquilla 采用**双轴主题引擎**，颜色一律用 **CSS 自定义属性（语义令牌）** 承载：

| 轴 | 机制 | 作用域 | 文件 |
|----|------|--------|------|
| **Value theme**（Ax对 A） | `data-theme="<id>"` 打在 `<html>` | 全局换肤 | `src/themes/<id>/tokens.css`（L1 调色板）+ 可选 `world.css`（字体/纹理/辉光） |
| **Expressive skin**（Axis B） | `data-skin="<id>"` 打在路由内容容器 | 路由级换肤 | `src/themes/<id>/skin.css`（仅 `out-of-register` 一套） |

**关键设计点（决定迁移成本）：**
1. **L1 语义契约（contract.json）**：每个 value theme 必须定义 **33 个 required 角色**（`--bg` `--text` `--accent` `--ok/warn/danger/info/queued` `--syntax-*` 等），缺失会在 CI（`check-theme-contract.mjs`）报错。
2. **派生默认值（foundation.css 的 L1 derived defaults 块）**：34 个 `derivedOptional` 角色（各类 `-fill`、阴影、sidebar 映射等）由 `:root,[data-theme],[data-skin]` 统一用 `var()` / `color-mix()` 公式派生，**主题只需覆盖真正不同的少数角色**。这是低迁移成本的核心——目标项目若复用同机制，移植量骤减。
3. **自动注册**：`registry.ts` 用 `import.meta.glob('./*/manifest.ts')` 扫描主题目录，新增主题 = 新增文件夹，无需改注册表。
4. **对比度守卫**：`check-webui-colors.mjs` 校验 AA（4.5:1 文本 / 3:1 大色块），所有主题色值均已通过。
5. **world 层懒加载**：ember/miami/synthwave/terminal/vapor 的装饰性辉光/网格/扫描线在 `world.css`，按需 `import()` 加载，不进主包——纯色板迁移可忽略。

### 1.1 33 个 required 语义角色（必须全部定义）

`bg` `bg-surface` `bg-surface-2` `bg-elevated` `bg-hover` `text` `text-muted` `text-dim` `border` `border-strong` `border-focus` `card` `hairline` `accent` `accent-hover` `accent-deep` `accent-secondary` `accent-foreground` `ok` `warn` `danger` `info` `queued` `syntax-comment` `syntax-keyword` `syntax-string` `syntax-literal` `syntax-title` `syntax-attr`

### 1.2 34 个 derivedOptional（可被 foundation 派生，主题按需覆盖）

`elev-highlight` `elev-1` `elev-1-hover` `elev-2` `elev-3` `ok-fill` `warn-fill` `danger-fill` `info-fill` `queued-fill` `chart-2` `shadow` `shadow-color` `scrim` `grain-opacity` `msg-bubble` `msg-obj-border` `surface-2` `surface-3` `color-green` `color-red` `color-blue` `text-secondary` `sidebar-bg` `sidebar-control-bg` `sidebar-control-hover` `sidebar-item-hover` `sidebar-item-active` `sidebar-text-strong` `sidebar-text` `sidebar-text-soft` `sidebar-border`

---

## 2. 主题清单

| 主题 ID | 显示名 | 色彩方案 | 颜色令牌数 | 备注 |
|---------|--------|----------|------------|------|
| `light` | Light | light | 59 | 飞书/Lark 结构逻辑 + 暖橙品牌；含完整 sidebar 令牌；浅色 |
| `dark` | Dark | dark | 38 | 中性石墨，含 6 通道状态谱（默认 ground）；深色 |
| `arctic` | Arctic | dark | 31 | Nord 衍生冷调；深色 |
| `crt-green` | CRT Green | dark | 29 | 绿屏 CRT；深色 |
| `ember` | Ember | dark | 37 | 火山暖暗，含 world.css 辉光；深色 |
| `miami` | Miami | light | 40 | 迈阿密日光，浅色，含 world.css 极光 |
| `synthwave` | Synthwave | dark | 37 | retrowave 霓虹；深色，含 world.css |
| `terminal` | Terminal | dark | 38 | 琥珀 CRT，含 world.css 扫描线；深色 |
| `vapor` | Vapor | dark | 32 | 蒸汽波深葡萄，含 world.css；深色 |

> 色彩方案分布：**2 套 light**（light、miami）+ **7 套 dark**（dark、arctic、crt-green、ember、synthwave、terminal、vapor）。
> 另有 **1 套 expressive skin**：`out-of-register`（路由级，无独立色板，继承当前 ground 令牌 + 叠加结构层 skin.css）。

---

## 3. 各主题颜色值全量提取

> 仅含颜色值令牌（hex / rgb(a) / color-mix）。结构类令牌（font/radius/focus-ring）不列入色板契约；
> 主题身份字体在主题 README「结构令牌」行登记，预览卡片以字体提示呈现（见 ADR-0006 §字体身份提示）。

### 3.1 Light（`light`）— light — 59 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#F7F7F8` |
| `--bg-surface` | `#FFFFFF` |
| `--bg-surface-2` | `#F0F0F2` |
| `--bg-elevated` | `#FFFFFF` |
| `--bg-hover` | `#EAEAED` |
| `--text` | `#1D1D1F` |
| `--text-muted` | `#5F6066` |
| `--text-dim` | `#85868D` |
| `--border` | `#E6E6E9` |
| `--border-strong` | `#D5D5DA` |
| `--border-focus` | `#B9BAC1` |
| `--card` | `#FFFFFF` |
| `--hairline` | `#EFEFF1` |
| `--accent` | `#BA4D0F` |
| `--accent-hover` | `#A5440C` |
| `--accent-deep` | `#8E3A0A` |
| `--accent-secondary` | `#B6501C` |
| `--accent-foreground` | `#FFFFFF` |
| `--ok` | `#257552` |
| `--warn` | `#8A6410` |
| `--danger` | `#C2382E` |
| `--info` | `#4353B8` |
| `--queued` | `#6B51C6` |
| `--ok-fill` | `#2E8A5F` |
| `--warn-fill` | `#B2820B` |
| `--danger-fill` | `#E0564A` |
| `--info-fill` | `#6478D9` |
| `--queued-fill` | `#8B6FE0` |
| `--syntax-comment` | `#5F6B7A` |
| `--syntax-keyword` | `#8E24AA` |
| `--syntax-string` | `#2E7D32` |
| `--syntax-literal` | `#8A5700` |
| `--syntax-title` | `#1E55C7` |
| `--syntax-attr` | `#0E7490` |
| `--elev-highlight` | `rgba(255,255,255,0.9)` |
| `--elev-1` | `0 1px 2px rgba(16,20,26,0.035), 0 8px 24px -16px rgba(16,20,26,0.14)` |
| `--elev-1-hover` | `0 2px 5px rgba(16,20,26,0.055), 0 14px 34px -18px rgba(16,20,26,0.20)` |
| `--elev-2` | `0 8px 30px -16px rgba(16,20,26,0.22)` |
| `--elev-3` | `0 20px 55px -22px rgba(16,20,26,0.30)` |
| `--shadow` | `rgba(0,0,0,0.10)` |
| `--shadow-color` | `rgba(0,0,0,0.10)` |
| `--scrim` | `rgba(0, 0, 0, 0.40)` |
| `--atmosphere-dawn` | `linear-gradient(180deg, #D9E5F6 0%, #EEF0F5 48%, #F8E9D8 100%)` |
| `--sidebar-bg` | `#F3F3F5` |
| `--sidebar-control-bg` | `#FFFFFF` |
| `--sidebar-control-hover` | `#F8F8F9` |
| `--sidebar-item-hover` | `#EAEAED` |
| `--sidebar-item-active` | `#E4E4E8` |
| `--sidebar-text-strong` | `#18181A` |
| `--sidebar-text` | `#56565A` |
| `--sidebar-text-soft` | `#6C6C70` |
| `--sidebar-border` | `#EBEBEE` |
| `--font-sans` | `var(--font-sans-default)` |
| `--font-display` | `var(--font-display-default)` |
| `--radius-control` | `var(--radius-md)` |
| `--radius-card` | `var(--radius-lg)` |
| `--radius-panel` | `var(--radius-xl)` |
| `--radius-modal` | `var(--radius-2xl)` |
| `--radius-pill` | `var(--radius-full)` |

### 3.2 Dark（`dark`）— dark — 38 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#18181A` |
| `--bg-surface` | `#202022` |
| `--bg-surface-2` | `#28282B` |
| `--bg-elevated` | `#2D2D30` |
| `--bg-hover` | `#353539` |
| `--text` | `#F5F5F7` |
| `--text-muted` | `#B0B0B6` |
| `--text-dim` | `#87878E` |
| `--border` | `#303034` |
| `--border-strong` | `#444448` |
| `--border-focus` | `#55555B` |
| `--card` | `#202022` |
| `--hairline` | `#29292C` |
| `--msg-bubble` | `color-mix(in srgb, var(--text) 8%, var(--bg-surface))` |
| `--accent` | `#F26A1B` |
| `--accent-hover` | `#FF7A2E` |
| `--accent-deep` | `#D95A11` |
| `--accent-secondary` | `#FF8A4C` |
| `--accent-foreground` | `#160B02` |
| `--ok` | `#39D7A2` |
| `--warn` | `#E8B23A` |
| `--danger` | `#FF6B6B` |
| `--info` | `#56C2E6` |
| `--queued` | `#8C7DF2` |
| `--warn-fill` | `#E8B23A` |
| `--syntax-comment` | `#8B93A6` |
| `--syntax-keyword` | `#C792EA` |
| `--syntax-string` | `#9ECE6A` |
| `--syntax-literal` | `#E5C07B` |
| `--syntax-title` | `#7AA2F7` |
| `--syntax-attr` | `#56B6C2` |
| `--font-sans` | `var(--font-sans-default)` |
| `--font-display` | `var(--font-display-default)` |
| `--radius-control` | `var(--radius-md)` |
| `--radius-card` | `var(--radius-lg)` |
| `--radius-panel` | `var(--radius-xl)` |
| `--radius-modal` | `var(--radius-2xl)` |
| `--radius-pill` | `var(--radius-full)` |

### 3.3 Arctic（`arctic`）— dark — 31 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#2E3440` |
| `--bg-surface` | `#333B49` |
| `--bg-surface-2` | `#3B4252` |
| `--bg-elevated` | `#434C5E` |
| `--bg-hover` | `#4C566A` |
| `--text` | `#ECEFF4` |
| `--text-muted` | `#C8D0DE` |
| `--text-dim` | `#97A0B2` |
| `--border` | `#3B4252` |
| `--border-strong` | `#4C566A` |
| `--border-focus` | `#5E6A82` |
| `--card` | `#333B49` |
| `--hairline` | `#353D4B` |
| `--accent` | `#88C0D0` |
| `--accent-hover` | `#99D1E0` |
| `--accent-deep` | `#5E81AC` |
| `--accent-secondary` | `#8CA9C6` |
| `--accent-foreground` | `#2E3440` |
| `--ok` | `#A3BE8C` |
| `--warn` | `#EBCB8B` |
| `--danger` | `#DD929A` |
| `--info` | `#88C0D0` |
| `--queued` | `#BE9DB8` |
| `--warn-fill` | `#EBCB8B` |
| `--syntax-comment` | `#616E88` |
| `--syntax-keyword` | `#81A1C1` |
| `--syntax-string` | `#A3BE8C` |
| `--syntax-literal` | `#D08770` |
| `--syntax-title` | `#88C0D0` |
| `--syntax-attr` | `#8FBCBB` |
| `--elev-highlight` | `rgba(255,255,255,0.05)` |

### 3.4 CRT Green（`crt-green`）— dark — 29 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#04120a` |
| `--bg-surface` | `#08200f` |
| `--bg-surface-2` | `#0c2a15` |
| `--bg-elevated` | `#10331b` |
| `--bg-hover` | `#164024` |
| `--text` | `#d6ffe2` |
| `--text-muted` | `#8fd6a5` |
| `--text-dim` | `#5fa876` |
| `--border` | `#1d5230` |
| `--border-strong` | `#2c7a48` |
| `--border-focus` | `#39ff88` |
| `--card` | `#08200f` |
| `--hairline` | `#123a1f` |
| `--accent` | `#39ff14` |
| `--accent-hover` | `#5cff45` |
| `--accent-deep` | `#22b30d` |
| `--accent-secondary` | `#00e5c7` |
| `--accent-foreground` | `#04120a` |
| `--ok` | `#3dff6e` |
| `--warn` | `#ffc233` |
| `--danger` | `#ff5a52` |
| `--info` | `#38d9ff` |
| `--queued` | `#c58bff` |
| `--syntax-comment` | `#4f8f66` |
| `--syntax-keyword` | `#39ff88` |
| `--syntax-string` | `#ffd24d` |
| `--syntax-literal` | `#00e5c7` |
| `--syntax-title` | `#7dff9e` |
| `--syntax-attr` | `#38d9ff` |

### 3.5 Ember（`ember`）— dark — 37 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#1a0f0c` |
| `--bg-surface` | `#241512` |
| `--bg-surface-2` | `#2f1c17` |
| `--bg-elevated` | `#3a241d` |
| `--bg-hover` | `#452c23` |
| `--text` | `#ffe9dc` |
| `--text-muted` | `#e6b49a` |
| `--text-dim` | `#c08a6e` |
| `--border` | `#4a2c22` |
| `--border-strong` | `#6b3d2c` |
| `--border-focus` | `#ff7a3d` |
| `--card` | `#241512` |
| `--hairline` | `#3a2018` |
| `--accent` | `#ff6a2b` |
| `--accent-hover` | `#ff8047` |
| `--accent-deep` | `#c23e12` |
| `--accent-secondary` | `#ffb638` |
| `--accent-foreground` | `#2a0d04` |
| `--ok` | `#7fd66a` |
| `--warn` | `#ffc23d` |
| `--danger` | `#ff5c47` |
| `--info` | `#ff9d5c` |
| `--queued` | `#e08bff` |
| `--syntax-comment` | `#a8735a` |
| `--syntax-keyword` | `#ff7a3d` |
| `--syntax-string` | `#ffb638` |
| `--syntax-literal` | `#ff9d6b` |
| `--syntax-title` | `#ffd08a` |
| `--syntax-attr` | `#ff8f6b` |
| `--font-display` | `var(--font-mono)` |
| `--radius-control` | `var(--radius-none)` |
| `--radius-card` | `var(--radius-none)` |
| `--radius-panel` | `var(--radius-none)` |
| `--radius-modal` | `var(--radius-none)` |
| `--radius-pill` | `var(--radius-none)` |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                0 0 14px color-mix(in srgb, var(--accent) 46%, transparent)` |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 36%, transparent)` |

### 3.6 Miami（`miami`）— light — 40 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#FFF6F2` |
| `--bg-surface` | `#FFFBF8` |
| `--bg-surface-2` | `#FEEEE6` |
| `--bg-elevated` | `#FFFFFF` |
| `--bg-hover` | `#FCE3DA` |
| `--text` | `#2A1830` |
| `--text-muted` | `#6B4A5E` |
| `--text-dim` | `#875E72` |
| `--border` | `#F3CFC2` |
| `--border-strong` | `#E9AC98` |
| `--border-focus` | `#E6197E` |
| `--card` | `#FFFBF8` |
| `--hairline` | `#F7DED4` |
| `--accent` | `#D71776` |
| `--accent-hover` | `#C90F69` |
| `--accent-deep` | `#A20A54` |
| `--accent-secondary` | `#077B92` |
| `--accent-foreground` | `#FFFFFF` |
| `--ok` | `#0A7F5C` |
| `--warn` | `#B85400` |
| `--danger` | `#CC1A43` |
| `--info` | `#0A73A8` |
| `--queued` | `#7A4BD1` |
| `--syntax-comment` | `#9A7A88` |
| `--syntax-keyword` | `#C90F69` |
| `--syntax-string` | `#0A835F` |
| `--syntax-literal` | `#B0006E` |
| `--syntax-title` | `#0A73A8` |
| `--syntax-attr` | `#7A4BD1` |
| `--elev-highlight` | `rgba(255,255,255,0.9)` |
| `--elev-1` | `0 0 0 1px var(--border), 0 1px 2px rgba(16,20,26,0.05), 0 4px 12px -4px rgba(16,20,26,0.10)` |
| `--elev-1-hover` | `0 0 0 1px var(--border-strong), 0 2px 4px rgba(16,20,26,0.08), 0 10px 22px -6px rgba(16,20,26,0.14)` |
| `--elev-2` | `0 0 0 1px var(--border-strong), 0 8px 24px -6px rgba(16,20,26,0.16)` |
| `--elev-3` | `0 0 0 1px var(--border-strong), 0 16px 40px -10px rgba(16,20,26,0.22)` |
| `--shadow` | `rgba(0,0,0,0.10)` |
| `--shadow-color` | `rgba(0,0,0,0.10)` |
| `--scrim` | `rgba(0,0,0,0.40)` |
| `--font-display` | `var(--font-mono)` |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent),
                0 0 0 5px color-mix(in srgb, var(--accent-secondary) 24%, transparent)` |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 60%, transparent),
                      inset 0 0 0 4px color-mix(in srgb, var(--accent-secondary) 24%, transparent)` |

### 3.7 Synthwave（`synthwave`）— dark — 37 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#150a24` |
| `--bg-surface` | `#1e1036` |
| `--bg-surface-2` | `#281649` |
| `--bg-elevated` | `#331d5c` |
| `--bg-hover` | `#3d2470` |
| `--text` | `#f5e8ff` |
| `--text-muted` | `#c9a8e8` |
| `--text-dim` | `#a888d0` |
| `--border` | `#3a2560` |
| `--border-strong` | `#523484` |
| `--border-focus` | `#ff2fb9` |
| `--card` | `#1e1036` |
| `--hairline` | `#2c1a4d` |
| `--accent` | `#ff2fb9` |
| `--accent-hover` | `#ff5cc9` |
| `--accent-deep` | `#c00f8a` |
| `--accent-secondary` | `#3fd6ff` |
| `--accent-foreground` | `#1a0518` |
| `--ok` | `#3ff5b0` |
| `--warn` | `#ffb03a` |
| `--danger` | `#ff5a7a` |
| `--info` | `#3fd6ff` |
| `--queued` | `#c9a0ff` |
| `--syntax-comment` | `#7a5aa8` |
| `--syntax-keyword` | `#ff5cc9` |
| `--syntax-string` | `#3ff5b0` |
| `--syntax-literal` | `#ffb03a` |
| `--syntax-title` | `#3fd6ff` |
| `--syntax-attr` | `#c9a0ff` |
| `--font-display` | `var(--font-mono)` |
| `--radius-control` | `var(--radius-none)` |
| `--radius-card` | `var(--radius-none)` |
| `--radius-panel` | `var(--radius-none)` |
| `--radius-modal` | `var(--radius-none)` |
| `--radius-pill` | `var(--radius-none)` |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                0 0 14px color-mix(in srgb, var(--accent) 45%, transparent)` |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 72%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 35%, transparent)` |

### 3.8 Terminal（`terminal`）— dark — 38 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#0a0800` |
| `--bg-surface` | `#12100a` |
| `--bg-surface-2` | `#1a160c` |
| `--bg-elevated` | `#221d10` |
| `--bg-hover` | `#2b2414` |
| `--text` | `#ffd479` |
| `--text-muted` | `#cf9f4e` |
| `--text-dim` | `#96733a` |
| `--border` | `#3a2f14` |
| `--border-strong` | `#5c4a1f` |
| `--border-focus` | `#ffb000` |
| `--card` | `#12100a` |
| `--hairline` | `#221c0e` |
| `--accent` | `#ffb000` |
| `--accent-hover` | `#ffc333` |
| `--accent-deep` | `#cc8a00` |
| `--accent-secondary` | `#ff8c1a` |
| `--accent-foreground` | `#0a0800` |
| `--ok` | `#7ee787` |
| `--warn` | `#ffcf5a` |
| `--danger` | `#ff7b5e` |
| `--info` | `#7fd0ff` |
| `--queued` | `#d3a0ff` |
| `--syntax-comment` | `#7a6636` |
| `--syntax-keyword` | `#ffb000` |
| `--syntax-string` | `#7ee787` |
| `--syntax-literal` | `#ff8c1a` |
| `--syntax-title` | `#ffcf5a` |
| `--syntax-attr` | `#7fd0ff` |
| `--font-sans` | `var(--font-mono)` |
| `--font-display` | `var(--font-mono)` |
| `--radius-control` | `var(--radius-none)` |
| `--radius-card` | `var(--radius-none)` |
| `--radius-panel` | `var(--radius-none)` |
| `--radius-modal` | `var(--radius-none)` |
| `--radius-pill` | `var(--radius-none)` |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                0 0 12px color-mix(in srgb, var(--accent) 45%, transparent)` |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                      inset 0 0 10px color-mix(in srgb, var(--accent) 35%, transparent)` |

### 3.9 Vapor（`vapor`）— dark — 32 个颜色令牌

| 语义角色 | 颜色值 |
|----------|--------|
| `--bg` | `#1a0e2e` |
| `--bg-surface` | `#241540` |
| `--bg-surface-2` | `#2e1b52` |
| `--bg-elevated` | `#3a2465` |
| `--bg-hover` | `#472d78` |
| `--text` | `#f3e9ff` |
| `--text-muted` | `#c9b3e8` |
| `--text-dim` | `#9d86c4` |
| `--border` | `#3a2560` |
| `--border-strong` | `#533a82` |
| `--border-focus` | `#ff6ac1` |
| `--card` | `#241540` |
| `--hairline` | `#2c1a4d` |
| `--accent` | `#ff6ac1` |
| `--accent-hover` | `#ff8fd4` |
| `--accent-deep` | `#d63a9a` |
| `--accent-secondary` | `#63e6ff` |
| `--accent-foreground` | `#1a0620` |
| `--ok` | `#6bf0c0` |
| `--warn` | `#ffd86b` |
| `--danger` | `#ff6f8f` |
| `--info` | `#63e6ff` |
| `--queued` | `#c79bff` |
| `--syntax-comment` | `#7c6aa8` |
| `--syntax-keyword` | `#ff8fd4` |
| `--syntax-string` | `#6bf0c0` |
| `--syntax-literal` | `#ffb06b` |
| `--syntax-title` | `#63e6ff` |
| `--syntax-attr` | `#c79bff` |
| `--font-display` | `var(--font-mono)` |
| `--focus-ring` | `0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                0 0 16px color-mix(in srgb, var(--accent-secondary) 40%, transparent)` |
| `--focus-ring-inset` | `inset 0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent),
                      inset 0 0 12px color-mix(in srgb, var(--accent-secondary) 30%, transparent)` |

---

## 4. Expressive Skin：`out-of-register`

- 类型：Axis B 路由级皮肤（`data-skin`），非全局。
- 目录含 `manifest.ts` + `skin.css` + `fonts/`，**无独立 tokens.css**——它继承当前 value theme 的 ground 令牌，仅叠加结构/纹理/字体层。
- 迁移含义：若目标项目只有"全局主题"概念、无"路由级 skin"概念，可忽略此套；若需保留，把它当作"叠加层"而非独立色板。

---

## 5. 迁移到其它项目的提示

- 直接复用本资产库的 **第 3 节色板表** 即可拿到全部 hex/rgb 值。
- 角色命名（`--bg` / `--accent` 等）是 OpenSquilla 自创语义名；迁移到目标项目时需按目标项目的令牌命名做**映射对齐**（见 `opensquilla-theme-migration-guide.md` 的映射表）。
- **优先迁移浅色/深色各一套**（light + dark）作为 baseline，再按需补充风格化主题（synthwave/vapor/ember 等）。
- 若目标项目支持 `color-mix()` 与 CSS 变量派生机制，可照搬 foundation.css 的派生公式，仅移植 33 个 required 角色即可。
- **务必保留对比度校验**：把 `check-theme-contract.mjs` + `check-webui-colors.mjs` 思路带入目标项目 CI，防止迁移后色值破坏 AA。

> 生成说明：本文件由 github-analyzer 流程基于 opensquilla 真实 `tokens.css` 自动提取并整理，颜色值为源码原文。
