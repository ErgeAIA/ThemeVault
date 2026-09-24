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

## 家族映射：family mapping.json（P1 · hints 级）

```
themes/<family>/mapping.json
```

- **定位（对抗审查 A2 降级）**：角色 → 源变量**线索缓存**（palette 备注 + 家族 README 对照表），
  **不是完备单源**。完备对照仍以各家族 README 映射表 / `docs/migration-guide.md` 为准。
- `--strict`：required 角色零线索 → ERROR（新家族/补全验收用）；默认 WARN + STAT 空率。
- 同族一致性：各主题 **required** 角色必须齐全；`derivedOptional` 允许只覆盖分歧处。

```powershell
python scripts/gen_family_mapping.py          # 生成/刷新
python scripts/gen_family_mapping.py --check
python scripts/gen_family_mapping.py --strict # 完备性门禁
```

## tokens 负载语义（B1）

| 字段 | 含义 |
|------|------|
| `contractFallback` | 无独立源值，契约兜底（同 X / 取 X / 继承） |
| `displayExemption` | 纳入期显示豁免（如 DEC-002 HEX 显示），**不是设计缺口** |
| `derivedHint` | 推导 / 约定 / oklch / 未提供 |
| `fallback` | 上三者 OR（兼容旧读者） |

## 人读视图生成化（P3）

`INDEX.md` 索引表、统计区与 `AI-MAP.md` 家族现状表由 `scripts/gen_docs_views.py` 从
`INDEX.json` 渲染（`<!-- BEGIN:generated … -->` 标记内）。手写只保留标记外散文与
INDEX.md **备注列**（按编号保留）。

```powershell
python scripts/gen_docs_views.py [--check]
```

