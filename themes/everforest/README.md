# Everforest 家族

> 来源项目：[sainnhe/everforest](https://github.com/sainnhe/everforest)（MIT，© sainnhe）
> 数据源：`autoload/everforest.vim` 的 medium palette（default background=medium；hard/soft 为亮度变体未单列）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Everforest | dark | value theme | medium dark（默认） |
| `light` | Everforest Light | light | value theme | medium light |

> palette 命名色：bg0/bg1/...（背景阶梯）、fg/grey0-grey2（文本）、green/aqua/blue/red/yellow/orange/purple（强调+状态）。

## L1 语义角色映射（本家族统一）

> palette 命名色 → L1 角色映射见各 palette.md 备注列（每色标明来源键）。

## 结构约定

```
themes/everforest/
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
