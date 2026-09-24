# 整理层 IR：theme.tokens.json（P0）

> 整理阶段（Organize）的**唯一机器产物**：把 `palette.md` 归位到 L1-v4 分层，供使用阶段
> （profiles / export）直接消费。人读视图（palette.md / INDEX.md / preview）是投影。
> 词表：`docs/l1-roles.md`。纳入 provenance 不在本层（见 `docs/intake-artifacts.md`）。

## 位置

```
themes/<family>/<id>/tokens.json
```

## Schema（schemaVersion 1）

| 字段 | 含义 |
|------|------|
| `family` / `theme` | 家族与主题 ID |
| `ir` | 固定 `L1-v4` |
| `tokens` | 角色名（无 `--` 前缀）→ 元数据 |
| `tokens.*.value` | **原文**（与 palette.md 一致，禁止改写） |
| `tokens.*.kind` | palette 类型列（中性/强调/…） |
| `tokens.*.layer` | `core` \| `reading` \| `family` |
| `tokens.*.fallback` | 备注是否为契约兜底/豁免/继承/推导 |
| `tokens.*.note` | palette 备注原文 |

分层规则：

1. `typo-*` → `reading`
2. `docs/l1-roles.md` L1-core 或家族 `contract.required` → `core`
3. 其余 → `family`（graph / ANSI / chart…）

## 生成与校验

```powershell
python scripts/gen_tokens.py          # 由 palette.md 写出/刷新全部 tokens.json
python scripts/gen_tokens.py --check  # 漂移则 exit 1
python scripts/gen_index.py --write   # 内联 gen_tokens 并校验
```

约束：

- **palette.md 仍是人审真源**；tokens.json 是确定性投影（同 palette → 同 tokens）。
- 禁止只改 tokens.json 不改 palette（`--check` 会失败）。
- 使用阶段读 tokens.json + `docs/profiles/*.mapping.json`，不要再解析 Markdown 表。

## 家族映射：family mapping.json（P1）

```
themes/<family>/mapping.json
```

- 角色 → 源变量线索（自 palette 备注 `--var` / 反引号标识提取；ergemd 用原生名；`typo-*` 默认 `--typo-*`）。
- **同族一致性**：各主题 **required** 角色必须齐全且对齐；`derivedOptional` 允许只覆盖分歧处。
- 家族 README 的对照表改为导读；机器消费以 `mapping.json` 为准。

```powershell
python scripts/gen_family_mapping.py          # 生成/刷新
python scripts/gen_family_mapping.py --check  # 漂移或 required 缺失 → exit 1
```

