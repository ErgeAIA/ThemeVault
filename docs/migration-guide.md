# ThemeVault 主题迁移指南（资产 → 目标项目）

> **配套资产**：全部主题色板见各家族 `themes/<family>/<id>/palette.md`（逐角色全量色板表）；
> 机器可读索引见 `INDEX.json` / `INDEX.md`；源码快照与契约见各家族 `_source/`。
> **目标读者**：要把 ThemeVault 主题资产迁移到**已有成熟主题系统**的其它项目的工程师/设计工程师。
> **本指南范围**：只做分析与指引，**不修改任何来源项目源码**，也不替目标项目写具体实现代码——
> 给出映射、策略、步骤与风险边界，由你按目标项目规范落地。

---

## 1. 家族总览与角色命名体系

ThemeVault 现有 **22 个家族 / 74 套主题**（73 value theme + 1 expressive skin，数字以 `INDEX.json` 为准）：

| 家族 | 主题数 | 方案 | required / derivedOptional | 角色命名体系 | 协议 | 来源仓库 |
|------|--------|------|------------------------------|--------------|------|----------|
| opensquilla | 10（9 + 1 skin） | 2 light + 7 dark + both | 29 / 33 | L1 通用语义名 | Apache-2.0 | opensquilla/opensquilla |
| catppuccin | 4 | 1 light + 3 dark | 29 / 33 | L1 通用语义名 | MIT | catppuccin/palette |
| ergemd | 14 | 2 light + 12 dark | 34 / 58 | **原生变量名** | AGPL-3.0 | ErgeAIA/ErgeMD |
| aura | 2 | 0 light + 2 dark | 29 / 13 | L1 通用语义名 | MIT | daltonmenezes/aura-theme |
| dracula | 1 | 0 light + 1 dark | 29 / 12 | L1 通用语义名 | MIT | dracula/visual-studio-code |
| nord | 1 | 0 light + 1 dark | 29 / 11 | L1 通用语义名 | MIT | nordtheme/nord |
| solarized | 2 | 1 light + 1 dark | 29 / 6 | L1 通用语义名 | MIT | altercation/solarized |
| tokyonight | 3 | 0 light + 3 dark | 29 / 9 | L1 通用语义名 | Apache-2.0 | folke/tokyonight.nvim |
| one-dark-pro | 1 | 0 light + 1 dark | 29 / 5 | L1 通用语义名 | MIT | Binaryify/OneDark-Pro |
| night-owl | 2 | 1 light + 1 dark | 29 / 6 | L1 通用语义名 | MIT | sdras/night-owl-vscode-theme |
| synthwave | 1 | 0 light + 1 dark | 29 / 6 | L1 通用语义名 | MIT | robb0wen/synthwave-vscode |
| iceberg | 2 | 1 light + 1 dark | 29 / 6 | L1 通用语义名 | MIT | cocopon/vscode-iceberg-theme |
| kanagawa | 3 | 1 light + 2 dark | 29 / 5 | L1 通用语义名 | MIT | rebelot/kanagawa.nvim |
| everforest | 2 | 1 light + 1 dark | 29 / 5 | L1 通用语义名 | MIT | sainnhe/everforest |
| rose-pine | 3 | 1 light + 2 dark | 29 / 5 | L1 通用语义名 | MIT | rose-pine/rose-pine-theme |
| ayu | 3 | 1 light + 2 dark | 29 / 12 | L1（VS Code 提取） | MIT | ayu-theme/vscode-ayu |
| jellyfish | 1 | 0 light + 1 dark | 29 / 12 | L1（VS Code 提取） | Apache-2.0 | pawelborkar/vscode-jellyfish |
| shades | 2 | 0 light + 2 dark | 29 / 12 | L1（VS Code 提取） | MIT | ahmadawais/shades-of-purple-vscode |
| vue | 2 | 0 light + 2 dark | 29 / 12 | L1（VS Code 提取） | MIT | mariorodeghiero/vue-theme-vscode |
| omni | 1 | 0 light + 1 dark | 29 / 12 | L1（VS Code 提取） | MIT | getomni/visual-studio-code |
| falcon | 12 | 8 light + 4 dark | 29 / 12 | L1（VS Code 提取） | MIT | panxiaoan/falcon-vscode-themes |
| onepage | 2 | 1 light + 1 dark | 29 / 25 | L1 + typo 扩展 | MIT | ivaneye/OnePage |

**两套命名体系**（这是迁移时最容易混淆的点）：

- **L1 通用语义名**（21 家族）：角色名为 `bg`、`text`、`accent`、`ok/warn/danger/info/queued`、
  `syntax-*` 等，家族间语义对齐，跨家族可直接对照。其中 6 个 VS Code theme 系列
  （ayu / jellyfish / shades / vue / omni / falcon）由 VS Code 语义键提取为 L1，提取决策见各家族 README；
  onepage 额外提供 `typo-h1…h6` / `typo-bold` / `typo-italic` 彩色排版扩展角色（迁移阅读器建议整组保留）。
- **原生变量名**（仅 ergemd）：角色名为 `bg-page`、`accent-cyan`、`obsidian-callout-*`、`code-*` 等，
  是源码里真实存在的 CSS 变量名。跨项目迁移时必须过 §2.5 的映射矩阵转译，**禁止按名字硬搬**。

**⚠️ ErgeMD「继承 base」取色提示**：ergemd 部分主题（如 cyberpunk / aurora / tokyo-night）只定义
特色变量，背景/文字继承 `core/theme-dark-base.css` / `theme-light-base.css`。其 `palette.md` 会把继承
角色也列出，**备注列以「继承」开头，值 = base 层解析值**——取色时不要以为这些值来自主题文件本身。

---

## 2. 全局角色映射矩阵（核心）

### 2.1 转译三步法

1. **选主题**：查 `INDEX.md` 或 `INDEX.json`，按方案（light/dark）与备注筛选；风格线索在各家族
   README 与 palette.md 备注。
2. **取色**：读 `themes/<family>/<id>/palette.md` 全表。注意 ErgeMD「继承 base」行（§1）；
   需要 rgba 变体时找 `--*-rgb` 三元组（ergemd）或派生态（opensquilla）。
3. **转译**：把 palette 角色映射到目标项目的设计令牌——L1 通用角色直接对照本节的
   catppuccin / aura / dracula / opensquilla 矩阵；ergemd 原生角色先按语义归位再套矩阵；
   最终命名对齐走 §2.6 的目标命名列。

> 各家族矩阵是**映射决策**的转译视图，完整逐角色映射（含说明）以各家族 README 为单一事实源；
> 颜色值一律以 palette.md 原文为准，本指南不重复色值。

### 2.2 L1 ↔ catppuccin 命名色（官方 26 色，4 flavor 共用同一映射）

> Catppuccin 是**命名调色板**（26 色），不是 UI 令牌集。下表把命名色映射到 L1 语义角色。

| L1 语义角色 | Catppuccin 命名色 | 说明 |
|-------------|-------------------|------|
| `bg` | `base` | |
| `bg-surface` | `mantle` | |
| `bg-surface-2` | `crust` | |
| `bg-elevated` | `surface0` | |
| `bg-hover` | `surface1` | |
| `text` | `text` | |
| `text-muted` | `subtext0` | |
| `text-dim` | `overlay0` | |
| `border` | `surface0` | |
| `border-strong` | `surface1` | |
| `border-focus` | `lavender` | 焦点用淡紫 |
| `card` | `mantle` | |
| `hairline` | `crust` | |
| `accent` | `mauve` | 主强调（官方默认 primary） |
| `accent-hover` | `pink` | hover 惯例 |
| `accent-deep` | `mauve` | 无更深变体，沿用 mauve |
| `accent-secondary` | `blue` | |
| `accent-foreground` | `base` | accent 上文字用 base |
| `ok` / `ok-fill` | `green` | |
| `warn` / `warn-fill` | `yellow` | |
| `danger` | `red` | |
| `danger-fill` | `maroon` | 柔化填充 |
| `info` | `blue` | |
| `info-fill` | `sapphire` | |
| `queued` / `queued-fill` | `lavender` | |
| `syntax-comment` | `overlay1` | |
| `syntax-keyword` | `mauve` | |
| `syntax-string` | `green` | |
| `syntax-literal` | `peach` | |
| `syntax-title` | `blue` | |
| `syntax-attr` | `teal` | |

### 2.3 L1 ↔ aura accent 阶梯（官方 accent0–39 + VSCode 语义键）

> Aura 是 **accent 阶梯色板**（`common.ts` 定义 accent0–39），不是 UI 令牌集。下表把官方阶梯 +
> VSCode 语义键映射到 L1 语义角色（29 required + 13 derivedOptional），两套主题共用同一映射。

| L1 语义角色 | Aura 令牌 | 来源键（VSCode） | 说明 |
|-------------|-----------|------------------|------|
| `bg` | accent12 | editor.background | dark #15141b / soft #21202e |
| `bg-surface` | accent24 | titleBar/statusBar/editorWidget.background | dark #121016 / soft #1f1a27 |
| `bg-surface-2` | accent30 | list.activeSelectionBackground | 选中列表项 |
| `bg-elevated` | accent21 | sideBar.background | 注意：Aura 侧栏比 bg 更暗（#110f18） |
| `bg-hover` | accent23 | list.hoverBackground | |
| `text` | accent7 | editor.foreground | |
| `text-muted` | accent9 | dropdown/input.foreground | |
| `text-dim` | accent8 | tab.inactiveForeground / comment | |
| `border` | accent23 | dropdown/input.border | |
| `border-strong` | accent11 | panel/titleBar/tab.border | dark #000000 / soft #141414 |
| `border-focus` | accent1 | inputOption.activeBorder | focusBorder 本体为 accent17（半透明） |
| `card` | accent24 | editorWidget.background | |
| `hairline` | accent13 | editorWidget.border | dark #2d2d2d / soft #444444 |
| `accent` | accent1 | badge/cursor/selection/focus | 紫，品牌色 |
| `accent-hover` | accent25 | button.hoverBackground | 紫无显式 hover；此为 secondary（绿）按钮 hover |
| `accent-deep` | accent38 | selection 无 alpha 实体 | |
| `accent-secondary` | accent2 | button/progress/tab-active | 绿（Aura 的实际行动色） |
| `accent-foreground` | accent12 | badge/button.foreground | dark #15141b / soft #21202e |
| `ok` | accent2 | success/green | |
| `warn` | accent3 | warning/orange | |
| `danger` | accent5 | error/red | |
| `info` | accent32 | blue（类型/类） | |
| `queued` | accent6 | pink（属性） | |
| `syntax-comment` | accent8 | comment | |
| `syntax-keyword` | accent1 | keyword/storage/tag | |
| `syntax-string` | accent2 | string/constant | |
| `syntax-literal` | accent4 | 官方色板存在，VSCode 端口未映射 | #9dff65 |
| `syntax-title` | accent3 | entity.name.function | |
| `syntax-attr` | accent6 | entity.other.attribute-name | |
| `shadow` | accent0 | widget.shadow | |
| `selection` | accent20 | editor.selectionBackground | 半透明紫 |
| `selection-solid` | accent38 | — | 无 alpha 版 |
| `placeholder` | accent14 | input.placeholderForeground | |
| `diff-insert` | accent26 | diffEditor.insertedTextBackground | |
| `diff-remove` | accent27 | diffEditor.removedTextBackground | |
| `statusbar-foreground` | accent10 | statusBar.foreground | |
| `activitybar-inactive` | accent35 | activityBar.inactiveForeground | |

> ⚠️ Aura 的两个特例：**bg-elevated（侧栏）比 bg 更暗**，与大多数主题「侧栏浮起更亮」相反；
> **accent-hover 取的是绿（secondary）按钮的 hover**，不是紫色 hover——目标项目若需紫 hover 需自行派生。

### 2.4 L1 ↔ dracula 命名色（官方 base 11 色 + UI 变体 4 色）

> Dracula 是**命名色板**，不是 UI 令牌集。下表把命名色映射到 L1 语义角色，色值全部来自
> `dracula.yml` 原文（bg 系列分层：editor → sidebar → statusBar 逐层加深）。

| L1 语义角色 | Dracula 命名色 | 说明 |
|-------------|----------------|------|
| `bg` | `BG #282A36` | editor.background |
| `bg-surface` | `BGDark #21222C` | sideBar.background |
| `bg-surface-2` | `BGDarker #191A21` | statusBar.background |
| `bg-elevated` | `BGLight #343746` | activityBar.background / dropdown.background |
| `bg-hover` | `LineHighlight #44475A75` | list.hoverBackground（半透明 SELECTION） |
| `text` | `FG #F8F8F2` | editor.foreground |
| `text-muted` | `COMMENT #6272A4` | editorLineNumber.foreground（行号/次要文本） |
| `text-dim` | `COMMENT #6272A4` | 无独立更暗文本色，沿用 comment（与 muted 同值） |
| `border` | `BGLight #343746` | 控件分隔灰（dropdown.border 官方为 BGDarker，此处取中间灰） |
| `border-strong` | `BGLighter #424450` | 更强分隔灰 |
| `border-focus` | `COMMENT #6272A4` | focusBorder |
| `card` | `BGDark #21222C` | editorWidget.background |
| `hairline` | `BGDarker #191A21` | tabsBackground / 细分割线 |
| `accent` | `PURPLE #BD93F9` | 品牌紫（Dracula 标志色） |
| `accent-hover` | `PINK #FF79C6` | 无官方 hover，取 Dracula 常用强调粉 |
| `accent-deep` | `PURPLE #BD93F9` | 无更深变体，沿用 accent |
| `accent-secondary` | `CYAN #8BE9FD` | 次强调（类名/内建） |
| `accent-foreground` | `FG #F8F8F2` | accent 上文字（badge/button.foreground 惯例） |
| `ok` | `GREEN #50FA7B` | |
| `warn` | `YELLOW #F1FA8C` | |
| `danger` | `RED #FF5555` | |
| `info` | `CYAN #8BE9FD` | |
| `queued` | `PINK #FF79C6` | 无官方，取强调粉（与 accent 区分） |
| `syntax-comment` | `COMMENT #6272A4` | comment |
| `syntax-keyword` | `PINK #FF79C6` | keyword |
| `syntax-string` | `YELLOW #F1FA8C` | string |
| `syntax-literal` | `PURPLE #BD93F9` | constant / numeric |
| `syntax-title` | `CYAN #8BE9FD` | entity.name.type.class（markup.heading 为 PURPLE） |
| `syntax-attr` | `GREEN #50FA7B` | entity.other.attribute-name / function |

> ⚠️ Dracula 已知注意：**hover 是半透明**（`#44475A75`，纯色版为 SELECTION `#44475A`）；
> **text-dim 与 muted 同值**（无第三档文本色，如实标注不造值）；**accent-hover 为约定**（官方无 hover
> 变体）；**ansi 16 色完整**定义在 `_source/dracula.yml`，终端迁移可直接取用。

### 2.5 L1 ↔ ergemd 原生名（`bg-page` / `accent-cyan` / `code-*` / `obsidian-callout-*`）

> ErgeMD 用源码原生变量名。下表给出 **ErgeMD 角色 → ThemeVault L1 建议**（语义归位方向），
> 完整契约见 `themes/ergemd/_source/contract.json`（required 34 / derivedOptional 58）。

| ErgeMD 角色 | ThemeVault L1 建议 |
|-------------|---------------------|
| `bg-page` / `bg-reader` / `bg-sidebar` | `bg` / `bg-surface` / `sidebar-bg` |
| `text-primary` / `text-secondary` / `text-muted` | `text` / `text-muted` / `text-dim` |
| `accent-blue`（或主题主 accent） | `accent` |
| `accent-green` / `accent-yellow` / `accent-red` / `accent-cyan` | `ok` / `warn` / `danger` / `info` |
| `accent-purple` | `queued` |
| `code-keyword` / `code-string` / `code-number` / `code-comment` / `code-function` | `syntax-keyword` / `syntax-string` / `syntax-literal` / `syntax-comment` / `syntax-title` |
| `obsidian-callout-*` | 功能状态色通道（note/info/success/warning/danger） |

> 取色注意：ergemd 提供 `--*-rgb` 三元组变量（如 `--accent-cyan-rgb: 77, 208, 225`），供 rgba 派生；
> 存在 `rgba(...)`、`linear-gradient(...)`、`transparent` 等非纯色值，转译时保留语义，不强行转 hex。

### 2.6 L1 ↔ 目标项目通用命名（通用语义 / shadcn/ui / Tailwind v4）

以 opensquilla 的 L1 语义名为基准（其角色名是项目自创语义），下表给出**推荐的目标命名**，
迁移时按目标项目实际令牌名替换右侧列。

**中性色（背景 / 文本 / 边框）**

| L1 角色 | 通用语义（建议） | shadcn/ui 近似 | Tailwind v4 |
|---------|------------------|----------------|-------------|
| `bg` | `--color-canvas` | `--background` | `--color-bg` |
| `bg-surface` | `--color-surface` | `--card` | `--color-surface` |
| `bg-surface-2` | `--color-surface-2` | `--muted` | `--color-surface-2` |
| `bg-elevated` | `--color-elevated` | `--popover` | `--color-elevated` |
| `bg-hover` | `--color-hover` | `--accent`(hover 态) | `--color-hover` |
| `text` | `--color-text` | `--foreground` | `--color-text` |
| `text-muted` | `--color-text-muted` | `--muted-foreground` | `--color-text-muted` |
| `text-dim` | `--color-text-dim` | `--muted-foreground`(更淡) | `--color-text-dim` |
| `border` | `--color-border` | `--border` | `--color-border` |
| `border-strong` | `--color-border-strong` | `--border`(强) | `--color-border-strong` |
| `border-focus` | `--color-border-focus` | `--ring` | `--color-ring` |
| `card` | `--color-card` | `--card` | `--color-card` |
| `hairline` | `--color-hairline` | `--border`(极淡) | `--color-hairline` |

**强调色与功能色**

| L1 角色 | 通用语义 | 说明 |
|---------|----------|------|
| `accent` / `accent-hover` / `accent-deep` / `accent-secondary` / `accent-foreground` | `--color-primary` 族 | 主行动色；`foreground` 是该色上的文字色 |
| `ok` / `ok-fill` | `--color-success` | 成功/完成 |
| `warn` / `warn-fill` | `--color-warning` | 警告 |
| `danger` / `danger-fill` | `--color-danger` | 错误/危险 |
| `info` / `info-fill` | `--color-info` | 信息 |
| `queued` / `queued-fill` | `--color-queued`（或复用 info） | 排队中（第 6 通道，opensquilla 特有） |
| `syntax-*` (6) | `--color-syntax-*` | 仅代码块场景 |

### 2.7 特殊通道与派生说明

- **queued = 第 6 状态通道**：opensquilla 独有的「排队中」状态色，catppuccin 用 `lavender`、
  dracula 用 `pink` 映射；目标项目无此概念时映射到中性或 info。
- **fill 派生通道**：`ok-fill` / `warn-fill` / `danger-fill` 等由主色 `var()`/`color-mix()` 派生
  （opensquilla/catppuccin 契约第 33 位）；主题仅在真正分歧处覆盖（如 catppuccin 的
  `danger-fill` 用 `maroon` 柔化）。目标项目无派生机制时需显式定义或补派生层。
- **语法高亮 6 色仅作用于代码块**：若目标项目无代码展示场景可整体省略。
- **结构令牌不在颜色契约**：font / radius 是结构类令牌，不进 contract.json（ADR-0001/0006）；
  字体信息在 INDEX.json 的 `fontStyle` / `fonts` / `structuralNote` 字段（源：主题 README「结构令牌」行）。

---

## 3. 与目标项目主题框架的匹配度

| 目标项目主题形态 | 匹配度 | 落差与对策 |
|------------------|--------|-----------|
| 用 CSS 变量 + 语义令牌（如 shadcn/ui、OpenBabel 风） | **高** | 命名可能不同（`--background` vs `--bg`），走 §2.6 映射表对齐；派生机制可直接照搬。 |
| 用 Tailwind CSS v4 `@theme` 块 | **高** | L1 语义可直接落入 `@theme { --color-bg: ... }`；需加 `data-theme` 作用域。 |
| 用 SCSS `$map` / `_variables.scss` | **中** | 色值可照搬，但需把"按 data-theme 切换"改为"按 `$theme-name` map 嵌套"或仍保留 CSS 变量输出。 |
| 用 JS/TS theme object（`{ light: { bg: '#..' } }`） | **中** | 需把 CSS 变量改写成 typed object；派生公式用 JS 函数替代 `color-mix`（或保留 CSS、仅 object 持有 required 值）。 |
| 用 CSS-in-JS（styled-components / emotion） | **中** | 同上，theme provider 注入 tokens；`color-mix` 在运行时 CSS 仍可用。 |

**结论**：无论目标项目用哪种技术栈，**颜色值本身可 100% 复用**；差异只在"如何声明/切换这些令牌"。
（opensquilla 的语义令牌 + `color-mix` 派生架构是 L1 家族的代表案例，详见附录。）

---

## 4. 深浅方案落位

全家族方案统计（以 `INDEX.json` 为准）：**22 light + 51 dark**（73 value theme），分布如下：

| 家族 | light | dark | 说明 |
|------|-------|------|------|
| opensquilla | 2（light、miami） | 7 + 1 skin | skin 为 both（路由级叠加层） |
| catppuccin | 1（latte） | 3（frappe/macchiato/mocha） | 同一 26 色，深浅按 flavor 递进 |
| ergemd | 2（light、solarized-light） | 12 | 全部 14 套 value theme |
| aura | 0 | 2（dark、soft-dark） | 无官方 light 变体 |
| dracula | 0 | 1（dark） | 官方唯一主题 |
| nord | 0 | 1（dark） | 北极蓝极简 |
| solarized | 1（light） | 1（dark） | 官方双方案 |
| tokyonight | 0 | 3（night/storm/moon） | 三变体全暗色 |
| one-dark-pro | 0 | 1（dark） | Atom 移植 |
| night-owl | 1（light） | 1（dark） | 官方双方案 |
| synthwave | 0 | 1（dark） | 霓虹 |
| iceberg | 1（light） | 1（dark） | 低对比双方案 |
| kanagawa | 1（lotus） | 2（wave/dragon） | 浮世绘 |
| everforest | 1（light） | 1（dark） | 森林柔和 |
| rose-pine | 1（dawn） | 2（main/moon） | 玫瑰粉 |
| ayu | 1（light） | 2（dark/mirage） | 官方三方案 |
| jellyfish | 0 | 1（dark） | 海洋紫蓝 |
| shades | 0 | 2（dark/super-dark） | 紫调 |
| vue | 0 | 2（dark/high-contrast） | Solarized 底 |
| omni | 0 | 1（dark） | Rocketseat |
| falcon | 8 | 4 | 温和护眼系列 |
| onepage | 1（warm-paper） | 1（warm-brown） | Obsidian 固化双配色 |

迁移建议：
1. **先落 baseline**：把每家族最接近「系统浅色 / 深色」的主题作为目标项目的深浅基准——
   opensquilla `light`+`dark`、catppuccin `latte`+`mocha`、ergemd `light`+`dark`，覆盖最广场景。
2. **风格化主题作为可选皮肤**：synthwave / vapor / ember / terminal / crt-green / arctic / miami
   （opensquilla）、cyberpunk / neon-cyberpunk / desert-sunset 等（ergemd）视为"品牌皮肤"
   叠加在 baseline 之上，而非替换系统深浅。
3. **深浅配对**：dark 系列彼此独立、不依赖系统 `prefers-color-scheme`；迁移时若目标项目用
   "跟随系统"模式，需给每个深色主题配一个浅色回退（opensquilla 用 `colorScheme: 'dark'` 标记，
   系统模式下落回 light）。

---

## 5. 兼容性风险与对策

| # | 问题 | 影响 | 解决方案 |
|---|------|------|----------|
| 1 | **`color-mix()` 依赖** | 派生角色用 `color-mix(in srgb, ...)`；目标项目若需支持旧浏览器（< 2023）会失效 | 现代项目（Chrome 111+/Safari 16.2+/Firefox 113+）可直接用；旧环境改为预计算静态值或 PostCSS 插件 `postcss-preset-env`。 |
| 2 | **derivedOptional 缺失** | 若目标项目无派生层，只搬 required 会缺阴影/sidebar/fill | 二选一：① 照搬源项目的派生块（opensquilla 为 `foundation.css`）；② 在每套主题里显式补全 derived 角色。 |
| 3 | **令牌命名冲突** | 目标项目可能已有 `--bg`/`--accent` 等同名但不同义 | 用命名空间前缀（如 `--osq-bg`）或在映射阶段重命名（§2.6 矩阵），避免污染目标系统。 |
| 4 | **contrast 回退风险** | 色值迁移后若改了作用域/叠加层，可能跌破 AA | 复用 `themes/opensquilla/_source/check-theme-contract.mjs`（required 完整性）思路 + AA 对比度校验（文本 4.5 / 大块 3，ADR-0005），在目标项目 CI 加入同款守卫。 |
| 5 | **ErgeMD 继承 base** | 取色时拿到的是 base 解析值，误以为来自主题文件 | 先看 palette.md 备注列「继承」再取色；背景/文字基础跟随 `core/theme-*-base.css`。 |
| 6 | **ErgeMD 非纯色值** | `rgba(...)` / `linear-gradient(...)` / `transparent` / `--*-rgb` 三元组 | 转译时保留语义，不强行转 hex；rgba 变体用 `--*-rgb` 三元组派生。 |
| 7 | **命名色板无 hover 变体** | catppuccin / dracula / aura 官方无 accent-hover，本仓库取约定色 | 迁移时可沿用约定值（catppuccin `pink`、dracula `pink`、aura 绿按钮 hover），或改用 `color-mix` 派生。 |
| 8 | **第三方署名** | arctic 源自 Nord（MIT，Sven Greb） | 迁移后保留 THIRD_PARTY_NOTICES 署名，遵守 MIT（ADR-0004）；catppuccin / aura / dracula 官方均有版权行，跨项目使用保留必需署名。 |
| 9 | **expressive skin** | opensquilla `out-of-register` 是路由级叠加层，非独立色板 | 目标项目若无"路由级 skin"概念可忽略；若要保留，当叠加层处理而非第 10 套主题。 |
| 10 | **world.css 装饰层** | opensquilla ember/miami/synthwave/terminal/vapor 的辉光/网格/扫描线在 world.css，纯色板迁移会丢质感 | 视为"可选增强"，按需迁移；纯色板资产不含这些。 |

---

## 6. 实施步骤（纯配置/分析层，不改来源项目）

> 以下步骤在**目标项目**内执行，来源项目仓库保持只读。

**Step 1 — 锁定目标框架**
确认目标项目主题技术栈（CSS 变量 / Tailwind @theme / SCSS / JS object，见 §3），选定 §2.6
映射表的"目标命名列"。

**Step 2 — 选家族与主题**
按 §1 家族总览 + §4 深浅建议选型：先定深浅 baseline（建议 opensquilla `light`/`dark` 或
catppuccin `latte`/`mocha`），再补充风格化主题；ErgeMD 需过 §2.5 原生名映射。

**Step 3 — 抽取色板**
从目标主题的 `palette.md` 复制全表（含派生覆盖行）。ErgeMD 注意「继承 base」行的解析值
（§2.1 第 2 步）；需要 rgba 变体时找 `--*-rgb` 三元组。

**Step 4 — 命名重映射**
按 §2 矩阵把源角色 → 目标令牌名（L1 家族直接套 §2.6；原生名家族先经 §2.2–§2.5 归位）。
批量替换可用脚本（在目标项目内），但**不要在来源项目源码上操作**。

**Step 5 — 补齐派生层**
若目标项目无 `color-mix` 派生机制：
- 方案 A：复制源项目的派生块（opensquilla 为 `foundation.css` 的 `:root,[data-theme],[data-skin]` 派生块，推荐，零维护）；
- 方案 B：在每套主题显式写出全部 derivedOptional 角色（参考目标主题 palette.md 的派生覆盖值）。

**Step 6 — 注入切换机制**
- CSS 变量体系：用 `:root` / `[data-theme="xxx"]` 选择器承载每套主题块（opensquilla 即此模式，
  可直接借鉴其 `tokens.ts` 的 `import.meta.glob` 自动注册思路）。
- Tailwind：在 `@theme` 内用 `@variant` / `data-theme` 作用域。
- JS object：theme provider 按 key 注入。

**Step 7 — 加对比度守卫**
把 required 完整性 + AA 对比度（文本 4.5 / 大块 3）校验逻辑移植到目标项目 CI，防止后续改色破坏契约。

**Step 8 — 验证**
- 视觉：每套主题在浅/深背景上渲染核心组件（按钮/卡片/状态点/代码块）。
- 对比度：跑守卫脚本，确认全部 required 角色已定义且无 AA 跌破。
- 回归：确认目标项目原有主题不被新令牌污染（命名空间/前缀隔离）。

---

## 7. 迁移后验证清单

- [ ] 目标项目原有主题仍可正常切换（无冲突/无污染）
- [ ] 每套迁移主题定义了契约的全部 required 角色（或派生层已补齐）——数字以该家族 `_source/contract.json` 为准
- [ ] 浅色/深色 baseline 在 `prefers-color-scheme` 下正确落位
- [ ] 风格化主题作为叠加皮肤不破坏系统深浅
- [ ] 焦点环、状态点、代码块在每套主题下对比度达标（AA：文本 4.5 / 大块 3）
- [ ] 第三方署名保留（arctic → Nord/Sven Greb；catppuccin / aura / dracula 官方版权行）
- [ ] ErgeMD「继承 base」角色已按 base 解析值取色，未误标为主题值
- [ ] CI 守卫脚本就位，后续改色有自动拦截

---

## 附录：opensquilla 案例分析（L1 语义令牌 + color-mix 派生代表作）

opensquilla 是 L1 通用家族中**令牌体系最完整**的案例：角色全部用原生 CSS 自定义属性（语义令牌）
承载，派生层由 `foundation.css` 的 `var()`/`color-mix()` 公式自动补齐。它的分析思路可套用到
catppuccin / aura / dracula（同为 L1 命名，但后者是命名色板/阶梯色板，需要 §2.2–§2.4 的映射）。

- **角色分层**：required 29（背景/文本/边框阶梯、accent 族、6 通道状态、6 语法高亮）+ 
  derivedOptional 33（`foundation.css` 派生：`--ok-fill: var(--ok)`、`--sidebar-bg: var(--bg-surface)`、
  `--msg-bubble: color-mix(...)` 等，主题只在真正分歧处覆盖）——数字以 `contract.json` 为准。
- **可行性结论**：总体可行性**高**（语义令牌 + 色值，与目标项目变量体系天然兼容）；改造成本**中-低**
  （CSS 变量体系几乎零改造，SCSS map / JS object / Tailwind config 需一次格式转译）；主要风险是
  派生机制差异 + 对比度回退。
- **令牌量参考**（opensquilla 9 套 value theme，源码令牌口径）：light 最全（含完整 sidebar 派生覆盖 +
  浅色阴影），arctic / crt-green 最精简（仅 required + 少量派生覆盖）。详见
  `themes/opensquilla/opensquilla-theme-assets.md`。
- **focus-ring 绑定 accent**：焦点环用 `color-mix(in srgb, var(--accent) 40%, transparent)`；
  目标项目若焦点色独立则需解耦（保留绑定推荐，品牌一致）。

---

> 本指南基于 ThemeVault 各家族真实源码（`tokens.css`、`palette.json`、`schemes/*.ts`、`dracula.yml`、
> ErgeMD CSS 变量体系 + 各家族 `_source/contract.json`）分析整理，未修改任何来源项目文件。
> 全局统计数字以 `INDEX.json` 为准；逐角色映射与色值以各家族 README / palette.md 为单一事实源。

---

## 附录：标准取色片段（取色防呆）

适配目标项目时按此**最小配对**取色，不要自由发挥——尤其不要只取背景色后用默认白/黑文字：

| 用途 | L1 家族取色 | ergemd 取色 |
|------|------------|-------------|
| 页面背景 | `bg` | `bg-page` |
| 正文文字 | `text` | `text-primary` |
| 次级文字 | `text-muted` | `text-secondary` |
| 弱化文字 | `text-dim` | `text-muted` |
| 品牌强调 | `accent` | `brand-primary` |
| 成功 / 警告 / 危险 / 信息 | `ok` / `warn` / `danger` / `info` | `accent-green` / `accent-yellow` / `accent-red` / `accent-cyan` |

**校验规则（取色后必查）**：

1. **背景与文字成对取用**：取 `bg`（或 `bg-page`）时必须同时取对应 `text`（或 `text-primary`），
   禁止只取背景色后用默认白/黑文字——那是「浅背景配白文字」看不清事故的主要来源。
2. **明暗配对**：light 方案浅背景 → 深文字；dark 方案深背景 → 浅文字。
3. **对比度数据**：每套主题 text/text-muted/text-dim 对 bg 的对比度已算好，直接查
   `INDEX.json` 的 `theme.textContrast`（`textOnBg` / `textMutedOnBg` / `textDimOnBg`）；
   文本 ≥ 4.5:1、大号文本/UI 组件 ≥ 3:1（ADR-0005）。
4. **弱对比降级**：`textMutedOnBg` / `textDimOnBg` < 4.5 是设计上的弱化（如部分主题
   text-muted 仅 2.9–3.7:1），正文不要用它们，只用 `text`（或 `text-primary`）作正文。
5. **非纯色值**：`rgba(...)` / `linear-gradient(...)` / `transparent` 按语义保留，不强行转 hex。
