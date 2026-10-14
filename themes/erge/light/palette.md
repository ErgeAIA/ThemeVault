# erge-light 色板表

> 来源：ErgeAIA 品牌色原创派生（非外部开源），pin=DEC-017 @ 2026-10-14（本对话推导）。
> 颜色值为原创设计；功能色 / 语法色沿用 opensquilla 语义色（橙红家族配套），属 ADR-0008 显式豁免（见家族 README fallback 表 + DEC-017）。
> 类型按 ThemeVault 规范标注。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#FAF1E9` | 中性 | 暖纸面（主色 5% 染） |
| `--bg-surface` | `#FBE8DD` | 中性 | 面板（主色 11% 染） |
| `--bg-surface-2` | `#EDE8DE` | 中性 | 次级表面（主色染浅） |
| `--bg-elevated` | `#FFFFFF` | 中性 | 浮起层 |
| `--bg-hover` | `#F3E5DB` | 中性 | hover 态 |
| `--text` | `#171614` | 中性 | 主文本（近黑） |
| `--text-muted` | `#55524C` | 中性 | 次文本（暖灰） |
| `--text-dim` | `#706E69` | 中性 | 弱文本（OKLCH 推导加深，on bg 4.57 过 AA） |
| `--border` | `#E2DDD3` | 中性 | 边框（暖灰） |
| `--border-strong` | `#D2CCBE` | 中性 | 强边框 |
| `--border-focus` | `#C9A48C` | 中性 | 焦点边框（主色染） |
| `--card` | `#FFFFFF` | 中性 | 卡片底 |
| `--hairline` | `#F2E9E0` | 中性 | 极淡分隔线 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#FF6A2B` | 强调 | 主行动色（ErgeAIA 品牌色） |
| `--accent-hover` | `#D15723` | 强调 | hover / deep |
| `--accent-deep` | `#B84A14` | 强调 | 更深 |
| `--accent-secondary` | `#F07A3D` | 强调 | 次强调 |
| `--accent-foreground` | `#171614` | 强调 | 主色上的文字（近黑，WCAG 达标） |

## 功能状态色（6 通道）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--ok` | `#257552` | 功能 | 成功（沿用 opensquilla 语义色 · DEC-017 豁免） |
| `--ok-fill` | `#2E8A5F` | 功能 | 成功填充 |
| `--warn` | `#8A6410` | 功能 | 警告 |
| `--warn-fill` | `#B2820B` | 功能 | 警告填充 |
| `--danger` | `#C2382E` | 功能 | 危险 |
| `--danger-fill` | `#E0564A` | 功能 | 危险填充 |
| `--info` | `#4353B8` | 功能 | 信息 |
| `--info-fill` | `#6478D9` | 功能 | 信息填充 |
| `--queued` | `#6B51C6` | 功能 | 排队中（第 6 通道） |
| `--queued-fill` | `#8B6FE0` | 功能 | 排队中填充 |

## 语法高亮色（仅代码块场景）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--syntax-comment` | `#5F6B7A` | 语法 | 注释（沿用 opensquilla · DEC-017 豁免） |
| `--syntax-keyword` | `#8E24AA` | 语法 | 关键字 |
| `--syntax-string` | `#2E7D32` | 语法 | 字符串 |
| `--syntax-literal` | `#8A5700` | 语法 | 字面量 |
| `--syntax-title` | `#1E55C7` | 语法 | 标题 |
| `--syntax-attr` | `#0E7490` | 语法 | 属性 |

## 派生 / 结构色

> 本主题不显式覆盖派生色（阴影 / 浮起 / 遮罩 / sidebar 等），继承 foundation 派生。
