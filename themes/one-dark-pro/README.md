# one-dark-pro 家族

> 来源项目：[Binaryify/OneDark-Pro](https://github.com/Binaryify/OneDark-Pro)（MIT（© Binaryify））
> 数据源：themes/OneDark-Pro.json（VS Code 主题 JSON：UI 语义键 `colors` + 语法 `tokenColors`）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | One Dark Pro | dark | value theme | 默认 dark 方案 |

> 官方唯一 dark 方案；Flat/Darker/Mix 为亮度变体未单列

## L1 语义角色映射（本家族统一）

> 本家族主题是 **VS Code 语义键集**（editor.* / sideBar.* / terminal.ansi* + tokenColors），
> 下表把 VS Code 语义键映射到 L1 语义角色（29 required），各主题色值见 palette.md。

| L1 语义角色 | VS Code 语义键 |
|-------------|----------------|
| `bg` | editor.background |
| `bg-surface` | sideBar/titleBar/statusBar.background |
| `bg-surface-2` | statusBar/input.background |
| `bg-elevated` | editorWidget.background |
| `bg-hover` | list.hoverBackground |
| `text` | editor.foreground |
| `text-muted` | comment 系 / 次要文本 |
| `text-dim` | editorLineNumber.foreground |
| `border` | panel/editorWidget.border |
| `border-strong` | sideBar/tab.border |
| `border-focus` | focusBorder |
| `card` | editorWidget/notifications.background |
| `hairline` | 行号/极淡分隔 |
| `accent` | activityBarBadge.background 或 button.background（品牌色，见各主题备注） |
| `accent-hover` | button.hoverBackground（无则同值） |
| `accent-deep` | 无更深变体，沿用 accent |
| `accent-secondary` | 次强调（cyan/蓝等） |
| `accent-foreground` | button/badge.foreground |
| `ok` | terminal.ansiGreen |
| `warn` | terminal.ansiYellow |
| `danger` | terminal.ansiRed |
| `info` | terminal.ansiBlue |
| `queued` | terminal.ansiMagenta |
| `syntax-comment` | tokenColors comment |
| `syntax-keyword` | tokenColors keyword |
| `syntax-string` | tokenColors string |
| `syntax-literal` | tokenColors number/constant |
| `syntax-title` | tokenColors function/type |
| `syntax-attr` | tokenColors attribute |

## 结构约定

```
themes/one-dark-pro/
├── README.md            # 本文件
├── _source/             # 官方主题 JSON + LICENSE（只读备查）+ contract.json
└── <theme-id>/          # 各方案
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方主题 JSON 为准；如上游改色，重跑快照与脚本。
