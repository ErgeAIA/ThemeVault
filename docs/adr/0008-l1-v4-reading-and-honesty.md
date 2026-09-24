# ADR-0008: L1 v4 分层（reading 轴）与缺口诚实

- **状态**：Accepted
- **日期**：2026-08-07
- **背景**：L1 仅 29 个 UI 角色时，阅读器主题（OnePage 彩色排版、ErgeMD `--h1-color`…）无法标准化迁移；required 强制齐套导致 `accent-secondary` 等出现「假完整」同值填充。
- **决策**：
  1. L1 升为 **v4**：`core` 29 + `reading` 8（`typo-h1`…`typo-h6` / `typo-bold` / `typo-italic`），词表唯一真源 `docs/l1-roles.md`。
  2. reading 进各家族契约 **derivedOptional**（有则必须成套），不抬升 core required。
  3. **缺口诚实**：无独立源值的 required 必须标「契约兜底·同 X / 取 X」；禁止假原文与假第二强调。
  4. 目标项目分发改为 **Profile**（`docs/profiles/<target>.mapping.json`），矩阵不继续在 migration-guide 线性堆叠。
- **备选**：
  - 纯 L1 29（丢 reading）→ 弃：与 ErgeMD/阅读器扩展目标冲突。
  - 原生变量名家族（仿 ergemd）→ 弃：Obsidian 名 ≠ ErgeMD 名，跨目标更贵。
  - reading 升 required → 弃：多数 UI 主题无排版轴，污染公共契约。
- **验证**：`python scripts/gen_index.py --write` 退出码 0；OnePage `typo-*` 已在契约内；`docs/profiles/ergemd.mapping.json` 覆盖 core+reading 映射。
- **影响**：新家族按 v4 词表；迁移阅读器走 Profile；`migration-guide` 只留方法论。
