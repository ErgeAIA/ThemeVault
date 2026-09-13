# ADR-0003 INDEX.json 机器可读副表

- 状态：**已接受**（2026-08-04，G3）
- 关联：ADR-0001、ADR-0002

## 背景

`INDEX.md` 是给人看的总表，但人工维护数字已多次漂移（见 ADR-0001）。
预览页、迁移工具、CI 需要稳定的机器可读入口。

## 决策

1. 仓库根维护 `INDEX.json`，字段见下，**由 `scripts/gen_index.py` 生成**（`--write` 落盘），
   不手写、不手工编辑。
2. 结构与数据来源：
   - 家族元信息 ← 家族 `README.md`（来源仓库/协议）+ `contract.json`（版本）
   - 每套主题的令牌/覆盖/缺失 ← 解析 `palette.md` 对照 `contract.json`
   - 显示名/方案/类型 ← 主题 `README.md` 元信息
3. 字段集：
   - `schemaVersion`、`generatedAt`、`generator`
   - `families[]`：`family`、`sourceProject`、`sourceRepo`、`license`、`contractPath`、`contractVersion`、`themes[]`
   - `themes[]`：`id`、`displayName`、`scheme`、`type`（value-theme / expressive-skin）、
     `path`、`palettePath`、`license`、`tokenCount`、`requiredCount`、`requiredMissing[]`、
     `derivedOverrideCount`、`outOfContractRoles[]`、`status`、`notes`
   - `stats`：家族数、主题数、value/skin 数、令牌总量
   - 后增字段（以 INDEX.json 实际为准）：`number`（全局编号）、`brand`（品牌色/按钮文字）、
     `textContrast`（文字对比度摘要）、`fontStyle`/`fonts`/`structuralNote`（字体身份）、
     `familyDisplayName`（家族品牌名）、`tokens`（全色值）
4. 校验失败（required 缺失或契约外角色）时退出码非 0，可作 CI gate。

## 影响

- `INDEX.md` 保持人工可读，但其数字列与 `INDEX.json` 同源（由脚本推导）。
- 预览页（ADR-0006）直接消费 `INDEX.json`，不重复解析 palette.md。
