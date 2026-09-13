# kanagawa/wave 色板表

> 来源：kanagawa.nvim（rebelot）`lua/kanagawa/themes.lua` 的 `wave` 变体映射（值取 colors.lua 原文）。
> 背景：sumiInk 背景系（默认变体）。语义角色 → palette 键映射规则见家族 README「L1 语义角色映射」。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1F1F28` | 中性 | sumiInk3，ui.bg |
| `--bg-surface` | `#181820` | 中性 | sumiInk1，ui.bg_m2 |
| `--bg-surface-2` | `#16161D` | 中性 | sumiInk0，ui.bg_m3（最深） |
| `--bg-elevated` | `#2A2A37` | 中性 | sumiInk4，ui.bg_p1 |
| `--bg-hover` | `#2A2A37` | 中性 | sumiInk4，ui.bg_p1 |
| `--text` | `#DCD7BA` | 中性 | fujiWhite，ui.fg |
| `--text-muted` | `#C8C093` | 中性 | oldWhite，ui.fg_dim |
| `--text-dim` | `#727169` | 中性 | fujiGray，comment 系 |
| `--border` | `#2A2A37` | 中性 | sumiInk4（bg_p1 系分隔） |
| `--border-strong` | `#363646` | 中性 | sumiInk5，ui.bg_p2 |
| `--border-focus` | `#7E9CD8` | 中性 | crystalBlue（品牌蓝焦点） |
| `--card` | `#2A2A37` | 中性 | sumiInk4（浮窗） |
| `--hairline` | `#2A2A37` | 中性 | sumiInk4 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#7E9CD8` | 强调 | crystalBlue（品牌蓝，fun 色） |
| `--accent-hover` | `#7FB4CA` | 强调 | springBlue（亮蓝） |
| `--accent-deep` | `#658594` | 强调 | dragonBlue（深蓝，info 色） |
| `--accent-secondary` | `#957FB8` | 强调 | oniViolet（紫，statement/keyword） |
| `--accent-foreground` | `#16161D` | 强调 | sumiInk0（accent 上文字） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#98BB6C` | 功能 | springGreen，diag.ok |
| `--warn` | `#FF9E3B` | 功能 | roninYellow，diag.warning |
| `--danger` | `#E82424` | 功能 | samuraiRed，diag.error |
| `--info` | `#658594` | 功能 | dragonBlue，diag.info |
| `--queued` | `#938AA9` | 功能 | springViolet1（紫，第 6 通道） |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#727169` | 语法 | fujiGray |
| `--syntax-keyword` | `#957FB8` | 语法 | oniViolet（keyword/statement） |
| `--syntax-string` | `#98BB6C` | 语法 | springGreen |
| `--syntax-literal` | `#D27E99` | 语法 | sakuraPink（number） |
| `--syntax-title` | `#7E9CD8` | 语法 | crystalBlue（fun） |
| `--syntax-attr` | `#E6C384` | 语法 | carpYellow（identifier） |

## 派生 / 结构色（主题显式覆盖才填；否则继承 foundation 派生）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok-fill` | `#98BB6C` | 派生 | 同 ok |
| `--warn-fill` | `#FF9E3B` | 派生 | 同 warn |
| `--danger-fill` | `#E82424` | 派生 | 同 danger |
| `--info-fill` | `#658594` | 派生 | 同 info |
| `--queued-fill` | `#938AA9` | 派生 | 同 queued |
