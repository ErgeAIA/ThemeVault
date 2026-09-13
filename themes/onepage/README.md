# onepage 家族

> 来源项目：[ivaneye/OnePage](https://github.com/ivaneye/OnePage)（MIT，@ 4226e57）
> 数据源：根目录 `theme.css` 中的固化双配色 `body.theme-light` / `body.theme-dark`
> + 共享层 `.theme-light` / `.theme-dark`（ANSI `--color-*-rgb` 与 `--code-*`）
> 上游：深度定制自 [Cupertino](https://github.com/aaaaalexis/Obsidian-Cupertino)（MIT）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `warm-paper` | Warm Paper（暖白纸张） | light | value theme | 米白暖底 `#faf7f1` + 深青强调 `#0e6e63` |
| `warm-brown` | Warm Brown · Cool Anchor（暖棕·冷锚） | dark | value theme | 暖棕底 `#262322` + 浅青强调 `#6db3a3` |

> 两套为 OnePage **固化默认配色**（开箱即用，不依赖 Style Settings）。
> Style Settings 中的 `onepage-accent` 可覆盖强调色；入库取的是**未覆盖时的默认值**。
> 彩色排版（`--typo-*`）是本家族核心身份资产，两套完整定义，迁移 ErgeMD 等目标时建议保留。

## L1 语义角色映射（本家族统一）

> OnePage 是 Obsidian CSS 变量体系。下表把 identity 段 + 共享 ANSI/code 映射到 L1。
> 缺口角色（border / 状态色）**只映射文件内已有令牌**，不发明 hex。

| L1 语义角色 | OnePage / Obsidian 令牌 | 说明 |
|-------------|-------------------------|------|
| `bg` | `--background-primary` | 最底层内容区 |
| `bg-surface` | `--background-secondary` | 次级表面 |
| `bg-surface-2` | `--background-secondary-alt` | 再深一档表面 |
| `bg-elevated` | `--background-tertiary` | 浮起/第三层 |
| `bg-hover` | `--interactive-hover` | `color-mix` 公式（原文） |
| `text` | `--text-normal` | 主文本 |
| `text-muted` | `--text-muted` | 次文本 |
| `text-dim` | `--text-faint` | 弱文本 |
| `border` | `--color-base-20` | 中性阶（identity 显式） |
| `border-strong` | `--color-base-25` | 中性阶（identity 显式） |
| `border-focus` | `--text-accent` | Obsidian 焦点/交互强调同源 |
| `card` | `--color-base-10` | 卡片底 |
| `hairline` | `--color-base-00` | 极淡分隔（最浅/最深 base） |
| `accent` | `--text-accent`（默认 hex） | 品牌青绿；可经 Style Settings 覆盖 |
| `accent-hover` | `--accent-hover` | `color-mix` 公式 |
| `accent-deep` | `--accent-active` | `color-mix` 公式（压暗） |
| `accent-secondary` | 同 `accent` | 源码无独立第二强调；彩色排版另有 typo 轴 |
| `accent-foreground` | `--background-primary` | 强调色块上的文字取 bg（源码 `--text-on-accent` 为 oklch 派生，不落固定 hex） |
| `ok` | `--color-green` / `--color-green-rgb` | 共享 ANSI |
| `warn` | `--color-yellow` / `--color-yellow-rgb` | 共享 ANSI |
| `danger` | `--color-red` / `--color-red-rgb` | 共享 ANSI |
| `info` | `--color-blue` / `--color-blue-rgb` | 共享 ANSI |
| `queued` | `--color-purple` / `--color-purple-rgb` | 共享 ANSI |
| `syntax-comment` | `--code-comment` | 共享代码色 |
| `syntax-keyword` | `--code-keyword` | |
| `syntax-string` | `--code-string` | |
| `syntax-literal` | `--code-value` | |
| `syntax-title` | `--code-function` | |
| `syntax-attr` | `--code-property` | |
| `typo-h1`…`typo-h6` / `typo-bold` / `typo-italic` | `--typo-*` | **家族扩展**（derivedOptional），彩色排版 |
| `graph-*` | `--graph-*` | 家族扩展，关系图谱 |

## 结构约定

```
themes/onepage/
├── README.md            # 本文件
├── _source/             # theme.css + LICENSE + contract.json（只读快照）
└── <theme-id>/          # warm-paper / warm-brown
    ├── README.md
    └── palette.md
```

## 校验

```powershell
python scripts/gen_index.py --write
```
