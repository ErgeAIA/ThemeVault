# solarized 家族

> 来源项目：[altercation/solarized](https://github.com/altercation/solarized)（MIT，© Ethan Schoonover）
> 数据源：`xresources/solarized`（官方 16 色定义）+ `vim-colors-solarized/colors/solarized.vim`（GUI 色 + 权威语义映射）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `dark` | Solarized Dark | dark | value theme | base03 背景 + base0 文本，低饱和护眼 |
| `light` | Solarized Light | light | value theme | base3 暖黄背景 + base00 文本（灰阶反转） |

> **双方案结构**：Solarized 的 16 色里，8 个 base 灰阶在 dark/light 间**反转**（dark 用 base03 最深背景、
> base0 主文本；light 用 base3 最浅背景、base00 主文本），8 个强调色两方案共用不变。

## L1 语义角色映射（本家族统一）

> Solarized 是**命名色板**（16 色：base03–base3 灰阶 + 8 强调色），不是 UI 令牌集。下表把命名色
> 映射到 L1 语义角色（29 required + 6 derivedOptional），dark/light 共用同一映射，仅中性灰阶取档不同。

| L1 语义角色 | Solarized 命名色（dark / light） | 说明 |
|-------------|----------------------------------|------|
| `bg` | base03 / base3 | 最底层背景 |
| `bg-surface` | base02 / base2 | 次级背景 |
| `bg-surface-2` | base02 / base2 | 背景仅两档，同值 |
| `bg-elevated` | base02 / base2 | 同值 |
| `bg-hover` | base02 / base2 | 同值 |
| `text` | base0 / base00 | 主文本 |
| `text-muted` | base1 | 次要文本 |
| `text-dim` | base01 | 注释/弱文本 |
| `border` | base01 / base1 | 分隔 |
| `border-strong` | base0 / base00 | 强分隔 |
| `border-focus` | cyan | 焦点用强调色 |
| `card` | base02 / base2 | 卡片底 |
| `hairline` | base02 / base2 | 极淡分隔 |
| `accent` | blue | 主强调 |
| `accent-hover` | cyan | hover 惯例 |
| `accent-deep` | blue | 无更深变体，沿用 accent |
| `accent-secondary` | cyan | |
| `accent-foreground` | base3 | accent 上文字 |
| `ok` | green | |
| `warn` | yellow | |
| `danger` | red | |
| `info` | blue | |
| `queued` | violet | |
| `syntax-comment` | base01 | |
| `syntax-keyword` | green | |
| `syntax-string` | cyan | |
| `syntax-literal` | orange | 数字/常量 |
| `syntax-title` | blue | 函数/类型 |
| `syntax-attr` | yellow | 属性 |

## 结构约定

```
themes/solarized/
├── README.md            # 本文件
├── _source/             # 官方 xresources + solarized.vim + LICENSE（只读备查）+ contract.json
└── <theme-id>/          # dark / light
    ├── README.md
    └── palette.md
```

## 校验

- 由 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
- 色值以官方 `xresources/solarized` + `vim-colors-solarized` GUI 色为准；如上游改色，重跑快照与脚本。
