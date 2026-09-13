# ADR-0001 契约单一事实源（contract.json）

- 状态：**已接受**（2026-08-04，G1）
- 关联：ADR-0002、ADR-0003

## 背景

首次收集 opensquilla 时发现「三份清单打架」：`INDEX.md` 手写数字（required 33、派生覆盖 26/5/…）、
各主题 README 的令牌数、`verify` 脚本的实测值互不一致（实测 required 为 29，派生覆盖也不同）。
人工维护数字必然漂移。

## 决策

1. 每个家族一个 `themes/<family>/_source/contract.json`，是 **L1 语义角色契约的唯一事实源**，
   声明 `required`（29 个）与 `derivedOptional`（33 个）角色清单。
2. 所有数字（required 覆盖、派生覆盖、令牌计数、契约外角色）一律由脚本从
   `contract.json` + `palette.md` **推导**，禁止人工手写。
3. 校验入口：`scripts/gen_index.py`（全量，产出 `INDEX.json`，可作 CI gate）；
   `themes/<family>/_source/check-theme-contract.mjs`（对照 tokens.css 源码）。
4. 新角色进契约：先改 `contract.json`（bump version），再让脚本重新校验全部主题；
   任何主题出现「required 缺失」或「契约外角色」即视为违规，需修复而非压制告警。

## 影响

- INDEX.md 的 required/派生覆盖/令牌列只保留机器生成值，人工备注仅限说明性文字。
- 首次执行已抓出两处真实偏差：required 33→29（INDEX.md 修正）；`atmosphere-dawn`
  未登记为派生角色（已补入 derivedOptional，contract v2 → v3 含此项演进）。
