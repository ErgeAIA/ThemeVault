# tokyonight 家族

> 来源项目：[folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)（Apache-2.0，© Folke Lemaitre）
> 数据源：`lua/tokyonight/colors/*.lua`（night / storm / moon 静态 palette；day 为运行时反转生成）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `night` | Tokyo Night | dark | value theme | 默认 flavor，最深背景（由 storm 派生） |
| `storm` | Tokyo Night Storm | dark | value theme | 基础 palette，标准深色 |
| `moon` | Tokyo Night Moon | dark | value theme | 独立紫调月夜 |

> **day 变体（light）**：官方第 4 个 flavor，由 `day.lua` 在运行时对 night palette 做
> `Util.invert()` + blend 反转生成，无静态色值可抄，故不单列色板；需要 light 方案时按
> 「night 反转」的官方机制自行生成（`_source/day.lua` 有完整逻辑）。

## L1 语义角色映射（本家族统一）

> Tokyo Night 的 lua palette 是**命名色表**（bg/fg/comment/blue/cyan/green/magenta/orange/purple/
> red/yellow + 变体），不是 L1 语义令牌。下表把 palette 键映射到 L1 语义角色
> （29 required + 9 derivedOptional），night/storm/moon 共用同一映射，仅色值随 flavor 不同。

| L1 语义角色 | palette 键 | 说明 |
|-------------|-----------|------|
| `bg` | `bg` | 最底层背景（flavor 主色） |
| `bg-surface` | `bg_dark` | 侧栏/状态栏 |
| `bg-surface-2` | `bg_dark1` | 次级凹陷 |
| `bg-elevated` | `bg` | 浮窗背景与 bg 同色 |
| `bg-hover` | `bg_highlight` | highlight 背景 |
| `text` | `fg` | 主文本 |
| `text-muted` | `fg_dark` | 次级文本 |
| `text-dim` | `fg_gutter` | 行号/最弱文本 |
| `border` | `dark3` | 分隔 |
| `border-strong` | `dark5` | 强分隔 |
| `border-focus` | `blue` | 焦点用蓝 |
| `card` | `bg_dark` | 卡片/浮窗底 |
| `hairline` | `fg_gutter` | 极淡分隔 |
| `accent` | `blue` | 主强调蓝 |
| `accent-hover` | `blue` | 无显式 hover，同值 |
| `accent-deep` | `blue0` | 深蓝 |
| `accent-secondary` | `cyan` | |
| `accent-foreground` | `bg` | accent 上文字 |
| `ok` | `green` | |
| `warn` | `orange` | |
| `danger` | `red` | |
| `info` | `blue` | |
| `queued` | `magenta` | |
| `syntax-comment` | `comment` | |
| `syntax-keyword` | `purple` | keyword |
| `syntax-string` | `green` | string |
| `syntax-literal` | `orange` | number/常量 |
| `syntax-title` | `blue` | function/类型 |
| `syntax-attr` | `yellow` | 属性 |
| `git-add` / `git-change` / `git-delete` | `git.*` | diff 派生 |
| `terminal-black` | `terminal_black` | ansi black |

## 结构约定

```
themes/tokyonight/
├── README.md            # 本文件
├── _source/             # 官方 colors/*.lua + LICENSE（只读备查）+ contract.json
└── <theme-id>/          # night / storm / moon
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方 `colors/*.lua` 为准；如上游改色，重跑快照与脚本。
