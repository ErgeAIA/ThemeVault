# kanagawa 家族

> 来源项目：[rebelot/kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim)（MIT，© rebelot）
> 数据源：`lua/kanagawa/colors.lua`（共享命名色板）+ `lua/kanagawa/themes.lua`（wave/dragon/lotus 变体语义映射）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `wave` | Kanagawa Wave | dark | value theme | 默认变体，sumiInk 背景 + 浮世绘色板 |
| `dragon` | Kanagawa Dragon | dark | value theme | 暖调暗色，dragonBlack 背景 |
| `lotus` | Kanagawa Lotus | light | value theme | 浅色，lotusWhite 米黄背景 |

> Kanagawa 是**共享命名色板 + 变体函数**架构：3 变体共用 colors.lua，themes.lua 按变体选择色组。

## L1 语义角色映射（本家族统一）

> themes.lua 用 `ui`（背景/文本）/ `syn`（语法）/ `diag`（状态）语义键引用 palette。下表给出 L1 角色 → 变体映射方向

| L1 语义角色 | Kanagawa 语义键（wave / dragon / lotus） |
|-------------|------------------------------------------|
| `bg` | ui.bg（sumiInk3 / dragonBlack3 / lotusWhite3） |
| `bg-surface` | ui.bg_m2（sumiInk1 / dragonBlack1 / lotusWhite1） |
| `bg-surface-2` | ui.bg_m3（sumiInk0 / dragonBlack0 / lotusWhite0） |
| `bg-elevated` / `bg-hover` | ui.bg_p1（sumiInk4 / dragonBlack4 / lotusWhite4） |
| `text` | ui.fg（fujiWhite / dragonWhite / lotusInk1） |
| `text-muted` | ui.fg_dim（oldWhite） |
| `text-dim` | syn.comment（fujiGray / dragonAsh / lotusGray3） |
| `accent` | syn.fun（crystalBlue / dragonBlue2 / lotusBlue4） |
| `accent-secondary` | syn.statement/keyword（oniViolet / dragonViolet / lotusViolet4） |
| `ok` / `warn` / `danger` / `info` | diag.ok / warning / error / info |
| `syntax-*` | syn 段（string/number/constant/identifier/fun/comment…） |

## 结构约定

```
themes/kanagawa/
├── README.md            # 本文件
├── _source/             # 官方 colors.lua + themes.lua + LICENSE（只读备查）+ contract.json
└── <theme-id>/          # wave / dragon / lotus
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方 colors.lua 为准；如上游改色，重跑快照与脚本。
