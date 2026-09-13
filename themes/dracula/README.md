# dracula 家族

> 来源项目：[dracula/visual-studio-code](https://github.com/dracula/visual-studio-code)（MIT，© Zeno Rocha / Dracula Theme）
> 生态主仓库：dracula/dracula-theme；数据源：`src/dracula.yml`（官方 YAML 锚点体系，VSCode 端口唯一源）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Dracula | dark | value theme | 经典暗色（官方唯一主题，无 light 变体） |

## L1 语义角色映射（本家族统一）

> Dracula 是**命名色板**（base 11 色 + UI 变体 4 色），不是 UI 令牌集。下表是本仓库把
> Dracula 命名色映射到 L1 语义角色（29 required + 派生覆盖）的决策，色值全部来自 `dracula.yml` 原文。

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
| `ok` | `GREEN #50FA7B` |  |
| `warn` | `YELLOW #F1FA8C` |  |
| `danger` | `RED #FF5555` |  |
| `info` | `CYAN #8BE9FD` |  |
| `queued` | `PINK #FF79C6` | 无官方，取强调粉（与 accent 区分） |
| `syntax-comment` | `COMMENT #6272A4` | comment |
| `syntax-keyword` | `PINK #FF79C6` | keyword |
| `syntax-string` | `YELLOW #F1FA8C` | string |
| `syntax-literal` | `PURPLE #BD93F9` | constant / numeric |
| `syntax-title` | `CYAN #8BE9FD` | entity.name.type.class（markup.heading 为 PURPLE） |
| `syntax-attr` | `GREEN #50FA7B` | entity.other.attribute-name / function |

## 已知注意事项

- **hover 是半透明**：`list.hoverBackground = #44475A75`（alpha 75），纯色版为 `#44475A`（SELECTION）。
- **text-dim 与 muted 同值**：Dracula 无第三档文本色，如实标注不造值。
- **accent-hover 为约定**：官方无 hover 变体，取 PINK（Dracula 站点 hover 惯例色），迁移时可用 `color-mix` 派生。
- **ansicolor 完整**：ansi 16 色在 `dracula.yml` 有完整定义（terminal 迁移可直接取用）。
