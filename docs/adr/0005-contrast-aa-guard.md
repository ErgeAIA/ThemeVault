# ADR-0005 对比度守卫：WCAG AA

- 状态：**已接受**（2026-08-04，G6）
- 关联：ADR-0001、ADR-0006

## 背景

主题库若含不可读的文本/背景组合（对比度过低），迁移出去就是事故。
需要一个统一、可脚本化的对比度口径。

## 决策

1. 守卫口径对齐 **WCAG 2.x AA**：普通文本 ≥ 4.5:1，大号文本/UI 组件 ≥ 3:1。
2. 校验对象：`text` / `text-muted` / `text-dim` 对各自常用背景（`bg`、`bg-surface`、
   `bg-elevated`、`card`）的对比度；accent 上的 `accent-foreground`。
3. 落地方式：`scripts/gen_index.py` 已实现对比度检查；每套主题的 text/text-muted/text-dim
   对 bg 对比度落于 `INDEX.json` 的 `theme.textContrast`（textOnBg / textMutedOnBg / textDimOnBg）。
   **已先行落地**：`preview.html` SPA 卡片徽标已带 text/text-muted/text-dim 对 bg 的
   AA 徽标（比率 + ✓/✗），不达标直接标红。
4. 例外：装饰性/语法高亮色不强制；`text-dim` 若为设计上有意弱化，允许降至 3:1 并在备注注明。

## 影响

- 新主题入库须过 AA 检查；不达标的要么修值（需与上游确认）、要么在 README 备注豁免理由。
- 预览页（ADR-0006）可在卡片上直接标注对比度徽标，直观暴露问题。
