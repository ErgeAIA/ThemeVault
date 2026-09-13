# ergemd 家族

> 来源项目：[ErgeMD](https://github.com/ErgeAIA/ErgeMD)（AGPL-3.0，Rust 桌面 Markdown 阅读器）。
> 源路径：`src/styles/themes/*.css`（`[data-theme]` 变量块）+ `core/`（base 层）。

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 背景 | 说明 |
|---------|--------|------|------|------|------|
| `aurora` | Aurora | dark | value theme | 继承 dark-base | 暗色主题 视觉特色：青绿色调（cyan/teal），类似 VS Code One Dark 风格 |
| `cherry-blossom` | Cherry Blossom | dark | value theme | 继承 dark-base | 暗色主题 视觉特色：粉色/樱花系，柔和紫色调 |
| `cyberpunk` | Cyberpunk | dark | value theme | 继承 dark-base | 赛博朋克霓虹色（高饱和青、品红、橙、绿色点缀） ================================================================================ */ |
| `dark` | Dark | dark | value theme | 完整定义 | 暗色主题 优化方式：共性变量直接使用统一色板值，个性变量按 OKLCH 原则优化 |
| `desert-sunset` | Desert Sunset | dark | value theme | 继承 dark-base | 沙漠日落暖色调（橙色、沙色、珊瑚红）+ 青色点缀 ================================================================================ */ |
| `falcon` | Falcon | dark | value theme | 继承 dark-base | 蓝紫色调 + 青色点缀，类似 Dracula/One Dark 风格 ================================================================================ */ |
| `forest` | Forest | dark | value theme | 完整定义 | 暗色主题 视觉特色：森林绿色调 + 青色点缀 |
| `light` | Light | light | value theme | 完整定义 | 亮色主题 视觉特色：清晰蓝色调，多色标题层级 |
| `monochrome` | Monochrome | dark | value theme | 继承 dark-base | 纯灰度（无彩色）风格，必须保持纯灰度层次对比 |
| `neon-cyberpunk` | Neon Cyberpunk | dark | value theme | 完整定义 | 暗色主题 视觉特色：高饱和度霓虹色（C > 0.35），紫黑色背景 |
| `ocean` | Ocean | dark | value theme | 继承 dark-base | 海洋蓝色调（H≈190-220°） ================================================================================ */ |
| `solar-flare` | Solar Flare | dark | value theme | 完整定义 | 暗色主题 视觉特色：太阳耀斑暖色调（H≈40-85°，金/橙/黄色系） |
| `solarized-light` | Solarized Light | light | value theme | 完整定义 | 亮色主题 视觉特色：Solarized 护眼配色，暖色调背景（H≈90°），低饱和度文字 |
| `tokyo-night` | Tokyo Night | dark | value theme | 继承 dark-base | 蓝紫色调（H≈200-285°），高对比度暗色背景 ================================================================================ */ |

## 分层结构（ErgeMD 原生体系）

- `core/theme-core.css`：全局 fallback（`html:not([data-theme])`）。
- `core/theme-dark-base.css` / `theme-light-base.css`：base 层，提供背景/文字/滚动条/图表默认值；
  未在主题文件直接定义的派生角色继承此层。
- `core/theme-derived.css`：派生/结构变量（alpha 合成、admonition、toast 等）。
- `<id>.css`：主题输入变量（标题层级、accent、brand、代码高亮、chart palette、callout）。

## L1 语义角色映射建议（迁移到其它项目时）

| ErgeMD 角色 | ThemeVault L1 建议 |
|-------------|---------------------|
| `bg-page` / `bg-reader` / `bg-sidebar` | `bg` / `bg-surface` / `sidebar-bg` |
| `text-primary` / `text-secondary` / `text-muted` | `text` / `text-muted` / `text-dim` |
| `accent-blue`（或主题主 accent） | `accent` |
| `accent-green` / `accent-yellow` / `accent-red` / `accent-cyan` | `ok` / `warn` / `danger` / `info` |
| `accent-purple` | `queued` |
| `code-keyword` / `code-string` / `code-number` / `code-comment` / `code-function` | `syntax-keyword` / `syntax-string` / `syntax-literal` / `syntax-comment` / `syntax-title` |
| `obsidian-callout-*` | 功能状态色通道（note/info/success/warning/danger） |

## 结构约定

```
themes/ergemd/
├── README.md            # 本文件
├── _source/             # ErgeMD 源码快照（只读备查，含 core/）+ contract.json
│   ├── contract.json    # L1 语义角色契约（数据驱动生成，唯一事实源）
│   ├── <id>.css         # 主题源码快照
│   └── core/            # base/derived 层源码快照
└── <theme-id>/          # 每套主题一个目录
    ├── README.md
    └── palette.md
```

## 校验

- `scripts/gen_ergemd.py` 生成契约与色板表；`scripts/gen_index.py --write` 全量校验。
