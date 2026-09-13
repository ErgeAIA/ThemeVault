# catppuccin 家族

> 来源项目：[catppuccin/palette](https://github.com/catppuccin/palette)（MIT，@ main）
> 生态主仓库：catppuccin/catppuccin；数据源：`palette.json`（官方聚合调色板，26 色 × 4 flavor）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `latte` | Latte | light | value theme | 浅色（官方 Latte） |
| `frappe` | Frappe | dark | value theme | 中深（官方 Frappe） |
| `macchiato` | Macchiato | dark | value theme | 深色（官方 Macchiato） |
| `mocha` | Mocha | dark | value theme | 最深（官方 Mocha，最流行） |

## L1 语义角色映射（本家族统一）

> Catppuccin 是**命名调色板**（26 色），不是 UI 令牌集。下表是本仓库把
> Catppuccin 命名色映射到 L1 语义角色（29 required + 5 状态 fill 派生覆盖）的决策，
> 4 个 flavor 共用同一映射，仅色值随 flavor 不同。

| L1 语义角色 | Catppuccin 命名色 | 说明 |
|-------------|-------------------|------|
| `bg` | `base` |  |
| `bg-surface` | `mantle` |  |
| `bg-surface-2` | `crust` |  |
| `bg-elevated` | `surface0` |  |
| `bg-hover` | `surface1` |  |
| `text` | `text` |  |
| `text-muted` | `subtext0` |  |
| `text-dim` | `overlay0` |  |
| `border` | `surface0` |  |
| `border-strong` | `surface1` |  |
| `border-focus` | `lavender` | 焦点用淡紫 |
| `card` | `mantle` |  |
| `hairline` | `crust` |  |
| `accent` | `mauve` | 主强调（官方默认 primary） |
| `accent-hover` | `pink` | hover 惯例 |
| `accent-deep` | `mauve` | 无更深变体，沿用 mauve |
| `accent-secondary` | `blue` |  |
| `accent-foreground` | `base` | accent 上文字用 base |
| `ok` | `green` |  |
| `ok-fill` | `green` |  |
| `warn` | `yellow` |  |
| `warn-fill` | `yellow` |  |
| `danger` | `red` |  |
| `danger-fill` | `maroon` | 柔化填充 |
| `info` | `blue` |  |
| `info-fill` | `sapphire` |  |
| `queued` | `lavender` |  |
| `queued-fill` | `lavender` |  |
| `syntax-comment` | `overlay1` |  |
| `syntax-keyword` | `mauve` |  |
| `syntax-string` | `green` |  |
| `syntax-literal` | `peach` |  |
| `syntax-title` | `blue` |  |
| `syntax-attr` | `teal` |  |

## 结构约定

```
themes/catppuccin/
├── README.md            # 本文件
├── _source/             # 官方 palette JSON（只读备查）+ contract.json
└── <flavor>/            # latte / frappe / macchiato / mocha
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方 `palette.json` 为准；如上游改色，重跑本脚本即可刷新。
