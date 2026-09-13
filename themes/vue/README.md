# vue 家族

> 来源项目：[Vue Theme](https://github.com/mariorodeghiero/vue-theme-vscode)（MIT）
> © Mário Rodeghiero；Solarized 深青底 + Vue 品牌绿（#19f9d8）
> 数据源：`themes/vue-theme-color-theme*.json`（VS Code color theme JSON）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Vue Theme | dark | value theme | Solarized 深青底（#002b36）+ Vue 绿品牌 |
| `high-contrast` | Vue Theme High Contrast | dark | value theme | 高对比变体（#002933） |

## L1 语义角色映射（本家族统一）

> VS Code color theme 语义键 → L1 角色。值全部为源码原文；缺失角色（bg-hover/text-dim/border 等）
> 按约定值补全并在 palette.md 备注「约定 / 继承」。

| L1 语义角色 | 取值来源 |
|-------------|----------|
| `bg` | `editor.background` |
| `bg-surface` | `editorGroupHeader.tabsBackground`（备选 panel.background） |
| `bg-surface-2` | `activityBar.background` |
| `bg-elevated` | `editorWidget.background`（备选 dropdown.background） |
| `bg-hover` | `list.hoverBackground` |
| `text` | `editor.foreground` |
| `text-muted` | `editorLineNumber.foreground` |
| `text-dim` | 继承 `text-muted` |
| `border` | `widget.border`（备选 editorGroupHeader.border） |
| `border-strong` | 继承 `border` |
| `border-focus` | `focusBorder` |
| `card` | 继承 `bg-elevated` |
| `hairline` | 继承 `border` |
| `accent` | `button.background` |
| `accent-hover` | 继承 `accent` |
| `accent-deep` | 继承 `accent` |
| `accent-secondary` | `button.secondaryBackground`（备选 badge.background） |
| `accent-foreground` | `button.foreground` |
| `ok` | `terminal.ansiGreen` |
| `warn` | `terminal.ansiYellow` |
| `danger` | `terminal.ansiRed`（备选 errorForeground） |
| `info` | `terminal.ansiBlue`（备选 terminal.ansiCyan） |
| `queued` | `terminal.ansiMagenta` |
| `syntax-comment` | tokenColors 按 scope（`comment` 等） |
| `syntax-keyword` | tokenColors 按 scope（`keyword` 等） |
| `syntax-string` | tokenColors 按 scope（`string` 等） |
| `syntax-literal` | tokenColors 按 scope（`constant` 等） |
| `syntax-title` | tokenColors 按 scope（`entity.name.function` 等） |
| `syntax-attr` | tokenColors 按 scope（`attribute` 等） |
| `selection` | `editor.selectionBackground`（备选 selection.background） |
| `selection-solid` | `selection.background`（备选 editor.selectionBackground） |
| `placeholder` | `input.placeholderForeground` |
| `diff-insert` | `diffEditor.insertedTextBackground` |
| `diff-remove` | `diffEditor.removedTextBackground` |
| `statusbar-foreground` | `statusBar.foreground` |
| `activitybar-inactive` | `activityBar.inactiveForeground` |
| `ok-fill` | 继承 `ok` |
| `warn-fill` | 继承 `warn` |
| `danger-fill` | 继承 `danger` |
| `info-fill` | 继承 `info` |
| `queued-fill` | 继承 `queued` |

**缺失角色约定（fallback）**：
- `bg-hover`：继承 `selection`
- `border`：取 `editorGroupHeader.tabsBackground`
- `text-muted`：约定 `#586e75`
- `accent-secondary`：继承 `accent`
- `ok`：约定 `#19f9d8`
- `warn`：约定 `#e6a23c`
- `danger`：约定 `#dc322f`
- `info`：约定 `#268bd2`
- `queued`：约定 `#b58900`

## 结构约定

```
themes/vue/
├── README.md            # 本文件
├── _source/             # 源码快照（只读备查）+ contract.json
│   ├── contract.json    # L1 语义角色契约（required 29 / derivedOptional 12）
│   └── *.json / *.yml   # VS Code color theme 原始源
└── <theme-id>/          # 每套主题一个目录（palette.md + README.md）
```

## 校验

- `python scripts/gen_vscode.py` 生成色板表与契约；`python scripts/gen_index.py --write` 全量校验。
