# ErgeAIA 家族

> 来源项目：ErgeAIA（原创派生品牌色，非外部开源）
> 来源仓库/链接：原创派生 · 无外部开源仓库（待用户确认）
> pin：DEC-017 @ 2026-10-14（本对话推导）

## 家族成员

| 主题 ID | 显示名 | 方案 | 类型 | 说明 |
|---------|--------|------|------|------|
| `light` | Light | light | value theme | 暖纸浅底 + 橙红品牌 `#FF6A2B`（ErgeAIA 品牌色）；accent-foreground 近黑 |
| `dark` | Dark | dark | value theme | 暖深底 + 调沉橙红 `#F2570F`（深版近邻）；accent-foreground 近黑 |

## 结构约定

`themes/erge/` 同 ThemeVault L1 标准结构；`_source/contract.json` 复用 opensquilla 同款 L1 v4 契约（29 required + derivedOptional），预览分区与 AA 徽标直接套用默认 L1 配置。

## 缺失角色约定（fallback · ADR-0008 豁免）

功能色（`ok`/`warn`/`danger`/`info`/`queued` 及 `-fill`）与语法高亮（`syntax-*` 6 个）沿用 opensquilla 语义色（橙红家族配套），属原创派生借用：在 `extract.json` 作为原创账本登记，并本表登记为显式豁免（不扩大 DEC-002/003 范围）。其余中性 / 强调色为 ErgeAIA 原创设计。

## 校验

- 契约完整性由根目录 `scripts/gen_index.py` 全量校验（required 覆盖 / 契约外角色 / 令牌计数）。
