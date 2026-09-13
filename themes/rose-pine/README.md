# Rose Pine 家族

> 来源项目：[rose-pine/rose-pine-theme](https://github.com/rose-pine/rose-pine-theme)（MIT，© Rosé Pine）
> 数据源：palette 定义取自 [rose-pine/neovim](https://github.com/rose-pine/neovim) 的 `lua/rose-pine/palette.lua`（官方 palette 源）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `main` | Rose Pine | dark | value theme | 默认变体 |
| `moon` | Rose Pine Moon | dark | value theme | 紫调月夜 |
| `dawn` | Rose Pine Dawn | light | value theme | 浅色 |

> palette 命名色：base/surface/overlay/muted/subtle/text（中性）+ love/gold/rose/pine/foam/iris（语义强调）。

## L1 语义角色映射（本家族统一）

> palette 命名色 → L1 角色映射见各 palette.md 备注列（每色标明来源键）。

## 结构约定

```
themes/rose-pine/
├── README.md
# 本文件
├── _source/
# 官方源文件 + LICENSE + contract.json
└── <theme-id>/

    ├── README.md
    └── palette.md
```

## 校验
- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方源为准；如上游改色，重跑快照与脚本。
