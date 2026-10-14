# erge-dark 色板表

> 来源：ErgeAIA 品牌色原创派生（非外部开源），pin=DEC-017 @ 2026-10-14（本对话推导）。
> 颜色值为原创设计；功能色 / 语法色沿用 opensquilla 语义色（橙红家族配套），属 ADR-0008 显式豁免（见家族 README fallback 表 + DEC-017）。
> 类型按 ThemeVault 规范标注。深版为浅版近邻：主色调沉（L↓C↑H↓ 更沉）。

## 中性色（背景 / 文本 / 边框）

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--bg` | `#1A1714` | 中性 | 暖深底 |
| `--bg-surface` | `#241F1B` | 中性 | 面板 |
| `--bg-surface-2` | `#2C2620` | 中性 | 次级表面 |
| `--bg-elevated` | `#2E2823` | 中性 | 浮起层 |
| `--bg-hover` | `#322A24` | 中性 | hover 态 |
| `--text` | `#F3EDE7` | 中性 | 主文本（暖白） |
| `--text-muted` | `#C9C2B8` | 中性 | 次文本（浅暖灰） |
| `--text-dim` | `#858079` | 中性 | 弱文本（OKLCH 推导加深，on bg 4.56 过 AA） |
| `--border` | `#3A342D` | 中性 | 边框（暖深灰） |
| `--border-strong` | `#4A4339` | 中性 | 强边框 |
| `--border-focus` | `#C2460B` | 中性 | 焦点边框（主色染） |
| `--card` | `#241F1B` | 中性 | 卡片底 |
| `--hairline` | `#2E2823` | 中性 | 极淡分隔线 |

## 强调色

| 语义角色 | 颜色值 | 类型 | 备注 |
|----------|--------|------|------|
| `--accent` | `#F2570F` | 强调 | 主行动色（调沉橙红，浅版近邻） |
| `--accent-hover` | `#C2460B` | 强调 | hover / deep |
| `--accent-deep` | `#9E3A08` | 强调 | 更深 |
| `--accent-secondary` | `#FF7A3D` | 强调 | 次强调 |
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
| `--ok-on-dark` | `color-mix(in srgb, #257552 80%, #FFFFFF 20%)` | 功能 | Dark 深底前景适配（color-mix 派生自 ok·白 20%，on bg 过 AA）· 用户决策 2026-10-14 |
| `--warn-on-dark` | `color-mix(in srgb, #8A6410 82%, #FFFFFF 18%)` | 功能 | Dark 深底前景适配（派生自 warn·白 18%，on bg 过 AA）· 用户决策 2026-10-14 |
| `--danger-on-dark` | `color-mix(in srgb, #C2382E 78%, #FFFFFF 22%)` | 功能 | Dark 深底前景适配（派生自 danger·白 22%，on bg 过 AA）· 用户决策 2026-10-14 |
| `--info-on-dark` | `color-mix(in srgb, #4353B8 74%, #FFFFFF 26%)` | 功能 | Dark 深底前景适配（派生自 info·白 26%，on bg 过 AA）· 用户决策 2026-10-14 |
| `--queued-on-dark` | `color-mix(in srgb, #6B51C6 79%, #FFFFFF 21%)` | 功能 | Dark 深底前景适配（派生自 queued·白 21%，on bg 过 AA）· 用户决策 2026-10-14 |

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
