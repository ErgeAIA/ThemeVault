# opensquilla 家族

> 来源项目：[opensquilla/opensquilla](https://github.com/opensquilla/opensquilla)（Apache-2.0，@ main）
> 源路径：`opensquilla-webui/src/themes/*`（value theme 的 `tokens.css` + manifest，expressive skin 的 `skin.css`）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `light` | Light | light | value theme | Lark 结构逻辑 + 暖橙品牌（含完整 sidebar 派生 + 浅色阴影） |
| `dark` | Dark | dark | value theme | 中性石墨，6 通道状态谱；默认 ground |
| `arctic` | Arctic | dark | value theme | **Nord 衍生（MIT，需署名 Sven Greb）** |
| `crt-green` | CRT Green | dark | value theme | 绿屏 CRT |
| `ember` | Ember | dark | value theme | 火山暖暗，+world 辉光 |
| `miami` | Miami | light | value theme | 迈阿密日光，+world 极光 |
| `synthwave` | Synthwave | dark | value theme | retrowave 霓虹，+world 网格 |
| `terminal` | Terminal | dark | value theme | 琥珀 CRT，+world 扫描线 |
| `vapor` | Vapor | dark | value theme | 蒸汽波深葡萄，+world 网格 |
| `out-of-register` | Out-of-Register | both | expressive skin | 路由级叠加层，无独立色板 |

## 结构约定

```
themes/opensquilla/
├── README.md                 # 本文件：家族说明 + 成员表
├── opensquilla-theme-assets.md  # 家族自包含色板快照（迁移用）
├── _source/                  # 家族共享原始源码（只读备查）
│   ├── contract.json         # L1 语义角色契约（唯一事实源）
│   ├── foundation.css        # 派生色默认值
│   ├── <id>.tokens.css       # 各主题原始令牌
│   ├── <id>.manifest.ts
│   └── check-theme-contract.mjs
└── <theme-id>/               # 每套主题一个目录
    ├── README.md             # 来源/协议/提取方式/迁移备注
    └── palette.md            # 逐角色全量色板表（规范字段）
```

## 校验

- 契约完整性由 `_source/check-theme-contract.mjs` 校验（对照 `contract.json`）。
- 色板表与契约的一致性由根目录 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
