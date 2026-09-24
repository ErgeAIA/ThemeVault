# 纳入中间产物规范（P1）

> 纳入管线在「源快照」与「palette 映射」之间的**可审计中间 IR**。
> 目标：收集可回放、映射可复核、忠实可机器证明。不替代语义人工判断（ADR-0008）。

## 产物位置

```
themes/<family>/_source/
├── intent.json     # 纳入意图（S0 固化）
├── extract.json    # 机械抽取（可重跑）
├── contract.json   # 语义契约（人审）
└── …原始源文件
```

新纳入（S0–S5）**必须**产出 `intent.json` + `extract.json`；既有家族可渐进补齐（补时不得改 palette 历史语义）。

## intent.json

| 字段 | 含义 |
|------|------|
| `schemaVersion` | 当前 `1` |
| `family` | 家族 ID |
| `source.project` / `source.repo` | 来源项目与仓库 |
| `source.pin` | **不可变钉**：commit SHA 或 blob hash |
| `source.pinType` | `commit` \| `blob` \| `archive-hash` |
| `source.files` | 拷入 `_source/` 的相对文件名列表 |
| `source.license` | SPDX 或原文协议名 |
| `source.upstream` | 可选：上游项目 + 协议 + 署名要求 |
| `scope.themes` | 本家族纳入的 theme id 列表 |
| `scope.defaultSemantics` | `frozen-default`（固化默认）\| `runtime-fallback`（可覆盖回退默认） |
| `scope.defaultNote` | 默认值语义说明（如 `var(--x, DEFAULT)`） |
| `attribution` | 使用时必须保留的署名字符串 |
| `collectedAt` | 纳入日期 `YYYY-MM-DD` |

## extract.json（schemaVersion 2 · value-ledger）

**值账本**，不是声明 dump。真源是 `_source/**`；extract 是给 lint 用的**值域索引**（DEC-009）。

| 字段 | 含义 |
|------|------|
| `schemaVersion` | `2` |
| `family` / `pin` | 与 intent 一致 |
| `kind` | 固定 `value-ledger` |
| `provenance` | `full` \| `partial`（快照不含色值定义时，如 everforest） |
| `values` | **全局唯一值** → `{ kind, witness, hits }` |
| `values.*.witness` | `sourceFile` / `var` / `selector`（一条可回源线索） |
| `values.*.hits` | 源中出现次数（可选信息，不参与判定） |

规则：

1. **extract 不写 L1 角色**——映射只发生在 `palette.md` / mapping profile。
2. 成员判定：`palette.value ∈ values`（8 位 hex 可回溯 6 位主体）。
3. 全量 dump 不入库；要出现次数/全部路径 → `rg` 源文件或 `backfill --force` 临时导出。
4. 兼容 schemaVersion 1 的 `entries[]`（旧格式仍可被 lint 读取）。

## 与 palette / DoD 的关系

```text
intent.json   → 证明纳入范围与 pin（DoD）
extract.json  → 证明 palette 值可回溯到源声明（DoD 值域三态之①②）
contract.json → required / derivedOptional
palette.md    → L1 映射 + 兜底/豁免标记（人审层）
```

豁免值（DEC 登记）允许不在 extract 的「原文 hex」中出现，但必须能在 extract 找到**约定依据**或在 DEC 写明来源。

## 旧家族回填

历史家族（DEC-006 渐进）用 `scripts/backfill_intake_ir.py` 生成：

- `pinType: "legacy"` / `pin: "unrecorded-legacy-intake"`（入库时未钉 commit）
- `extract` 自 `_source/**` 机械扫取（CSS/JSON/YAML/Lua/Vim/literal hex）
- 快照不含色值定义时：`extract.provenance: "partial"`，值域证明降级为 WARN

```powershell
python scripts/backfill_intake_ir.py            # 仅补缺失
python scripts/backfill_intake_ir.py --force    # 重生成
python scripts/lint_intake.py
```

## 模板与工具

见 `themes/_TEMPLATE/_source/intent.example.json` 与 `extract.example.json`。

| 工具 | 用途 |
|------|------|
| `scripts/extract_css_vars.py` | 从 CSS 机械生成 `extract.json`（可重跑） |
| `scripts/scaffold_family.py` | 新家族骨架（intent/contract/README/palette 占位） |
| `scripts/lint_intake.py` | provenance 门禁；`gen_index` 已内联调用 |

```powershell
python scripts/extract_css_vars.py --src themes/onepage/_source/theme.css `
  --family onepage --pin <sha> `
  --selector body.theme-light --selector body.theme-dark `
  --selector .theme-light --selector .theme-dark `
  --out themes/onepage/_source/extract.json
python scripts/lint_intake.py          # 旧家族缺 IR = WARN
python scripts/lint_intake.py --strict # 新纳入 = 缺 IR 即 ERROR
python scripts/gen_index.py --write
```
