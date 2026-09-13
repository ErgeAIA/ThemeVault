# ADR-0002 目录布局：themes/<family>/<id>/

- 状态：**已接受**（2026-08-04，G2），opensquilla 家族已完成迁移
- 关联：ADR-0001、ADR-0003

## 背景

首版采用扁平目录 `themes/<source>-<theme-id>/`（如 `opensquilla-dark`），
家族公共资产（`_source/contract.json`、`foundation.css`、`check-theme-contract.mjs`、
`opensquilla-theme-assets.md`）只能放在一个独立家族目录里，与主题目录割裂。
随着 Catppuccin、shadcn 等家族陆续加入，扁平目录会前缀爆炸、家族资产无处安放。

## 决策

统一为两级结构：

```
themes/
├── _TEMPLATE/            # 新增主题模板
└── <family>/             # 来源项目/调色板体系 = 一个家族
    ├── README.md         # 家族说明 + 成员表（含来源仓库/协议）
    ├── <family>-assets.md  # 家族自包含色板快照（迁移用，可选）
    ├── _source/          # 家族共享原始源码（只读备查）
    │   └── contract.json # L1 契约（唯一事实源，见 ADR-0001）
    └── <theme-id>/       # 每套主题一个目录
        ├── README.md     # 元信息 + 迁移备注
        └── palette.md    # 逐角色色板表（value theme 必有；skin 无）
```

## 规则

- `<family>`：来源项目/体系名小写（`opensquilla`、`catppuccin`、`shadcn`）。
- `<theme-id>`：主题 ID 小写（`dark`、`latte`、`mocha`…）。
- `_source/` 只在家族级存在，主题目录不复制源码，README 以 `../_source/` 引用。
- skin（无独立色板）同样放在家族下，README 标注「无 palette.md」。

## 影响

- 2026-08-04 已把 10 个 `themes/opensquilla-*` 目录迁入 `themes/opensquilla/` 家族。
- 路径引用规则：INDEX.md / INDEX.json 一律写 `themes/<family>/<id>/`。
