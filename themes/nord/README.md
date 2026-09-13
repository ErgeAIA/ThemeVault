# nord 家族

> 来源项目：[nordtheme/nord](https://github.com/nordtheme/nord)（MIT，© Sven Greb）
> 数据源：`src/nord.css`（官方 16 色定义 + 用途注释）+ `arcticicestudio/nord-visual-studio-code` 的 `themes/nord-color-theme.json`（UI 语义映射）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Nord | dark | value theme | 北极蓝极简 palette，官方唯一方案（无 light 变体） |

> **生态主仓库**：nordtheme/nord 是聚合仓库（16 色 palette + 各平台 ports）；UI 语义取自 VS Code 端口。
> 本仓库收录 Nord 本体 palette 为 1 套 dark value theme。

## L1 语义角色映射（本家族统一）

> Nord 是**命名色板**（16 色：Polar Night nord0–3、Snow Storm nord4–6、Frost nord7–10、Aurora
> nord11–15），不是 UI 令牌集。下表把命名色映射到 L1 语义角色（29 required + 11 derivedOptional），
> 依据 `nord.css` 的官方用途注释与 VS Code 端口的语义键。

| L1 语义角色 | Nord 命名色 | 说明 |
|-------------|-------------|------|
| `bg` | nord0 `#2e3440` | editor.background |
| `bg-surface` | nord1 `#3b4252` | statusBar/input/notification 背景 |
| `bg-surface-2` | nord2 `#434c5e` | inactive selection / button.secondary |
| `bg-elevated` | nord0 `#2e3440` | editorWidget.background（与 bg 同色，极简设计） |
| `bg-hover` | nord1 `#3b4252` | list.hoverBackground / lineHighlight |
| `text` | nord4 `#d8dee9` | editor.foreground |
| `text-muted` | nord3 `#4c566a` | editorLineNumber（行号/次要文本） |
| `text-dim` | nord3 `#4c566a` | 无第三档，与 muted 同值 |
| `border` | nord1 `#3b4252` | dropdown/panel/sideBar.border |
| `border-strong` | nord2 `#434c5e` | 强分隔 |
| `border-focus` | nord8 `#88c0d0` | 焦点相关用 accent（list.focusBackground） |
| `card` | nord1 `#3b4252` | notification/peekView 卡片 |
| `hairline` | nord3 `#4c566a` | editorWhitespace/极淡分隔 |
| `accent` | nord8 `#88c0d0` | 官方「accent color of the palette」 |
| `accent-hover` | nord8 `#88c0d0` | button.hover 全实色 |
| `accent-deep` | nord10 `#5e81ac` | frost 最深 |
| `accent-secondary` | nord7 `#8fbcbb` | |
| `accent-foreground` | nord0 `#2e3440` | badge/button.foreground（accent 上文字） |
| `ok` | nord14 `#a3be8c` | success / diff additions |
| `warn` | nord13 `#ebcb8b` | warnings / git renames |
| `danger` | nord11 `#bf616a` | errors / diff deletions |
| `info` | nord9 `#81a1c1` | inputValidation.info |
| `queued` | nord15 `#b48ead` | numbers / 紫 |
| `syntax-comment` | nord3 `#4c566a` | comments |
| `syntax-keyword` | nord9 `#81a1c1` | keywords/operators/tags |
| `syntax-string` | nord14 `#a3be8c` | strings |
| `syntax-literal` | nord15 `#b48ead` | numbers |
| `syntax-title` | nord7 `#8fbcbb` | classes/types |
| `syntax-attr` | nord8 `#88c0d0` | attributes |
| `shadow` | `#00000066` | widget.shadow |
| `sidebar-bg` | nord0 `#2e3440` | sideBar.background |
| `selection` | nord2 66% `#434c5ecc` | editor.selectionBackground |
| `diff-insert` / `diff-remove` | `#81a1c133` / `#bf616a4d` | diffEditor 半透明 |

## 结构约定

```
themes/nord/
├── README.md            # 本文件
├── _source/             # 官方 nord.css + nord-color-theme.json + LICENSE（只读备查）+ contract.json
└── <theme-id>/          # dark
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方 `nord.css` 为准；如上游改色，重跑快照与脚本。
