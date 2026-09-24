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

## extract.json

机械、幂等、**无语义映射**。由源文件解析，禁止手改色值。

| 字段 | 含义 |
|------|------|
| `schemaVersion` | 当前 `1` |
| `family` / `pin` | 与 intent 一致 |
| `entries[]` | 一条声明一条 |
| `entries[].selector` | CSS 选择器或源键路径（如 `body.theme-light`） |
| `entries[].var` | 变量名（含 `--`） |
| `entries[].value` | 声明值原文（去掉 CSS 的 `!important` 限定符；不转 hex） |
| `entries[].kind` | `hex` \| `rgb` \| `rgba` \| `color-mix` \| `var-ref` \| `shadow-or-gradient` \| `other` |
| `entries[].sourceFile` | 相对 `_source/` 的文件名 |

规则：

1. **extract 不写 L1 角色**——映射只发生在 `palette.md` / mapping profile。
2. 同一 `(selector, var)` 只保留一条；冲突时选更具体的 selector 并保留较早定义可另存 `entries[].note`。
3. 重跑 extract 应字节级稳定（排序：`selector` → `var`）。

## 与 palette / DoD 的关系

```text
intent.json   → 证明纳入范围与 pin（DoD）
extract.json  → 证明 palette 值可回溯到源声明（DoD 值域三态之①②）
contract.json → required / derivedOptional
palette.md    → L1 映射 + 兜底/豁免标记（人审层）
```

豁免值（DEC 登记）允许不在 extract 的「原文 hex」中出现，但必须能在 extract 找到**约定依据**或在 DEC 写明来源。

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
