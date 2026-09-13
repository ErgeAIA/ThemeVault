# ADR-0007 ErgeMD 家族入库：数据驱动契约 + AGPL-3.0 自有开源项目来源

- 状态：**已接受**（2026-08-04）
- 关联：ADR-0001、ADR-0002、ADR-0003

## 背景

用户自有开源项目 ErgeMD（AGPL-3.0，Rust 桌面 Markdown 阅读器，`https://github.com/ErgeAIA/ErgeMD`）
有一套 14 主题的 CSS 变量体系（`src/styles/themes/*.css` + `core/` base 层），要求并入 ThemeVault。
其角色词表与 opensquilla/catppuccin 的 L1 集合完全不同（`bg-page`/`accent-cyan`/`obsidian-callout-*` 等），
且主题分两类：完整定义背景的（dark/light/forest/solarized-light/solar-flare/neon-cyberpunk 等）与继承 base 的。

## 决策

1. **契约数据驱动**：`scripts/gen_ergemd.py` 解析全部 14 个主题的 `[data-theme]` 块，
   `required` = 所有主题都直接定义的角色交集（∩ 规范分区），`derivedOptional` = 并集 − required，
   写入 `themes/ergemd/_source/contract.json`（version 1）。不手工枚举角色。
2. **规范分区复用**：palette.md 沿用五段结构（中性/强调/功能/语法/派生），角色为 ErgeMD 原生变量名；
   未在主题文件定义、但由 base 层提供的角色，在 palette.md 中标注「继承 dark/light-base」并给出 base 解析值。
3. **覆盖数口径修正**：`gen_index.py` 的 `derivedOverrideCount` 只统计显式覆盖
   （备注列以「继承」开头的行不计），保证与 opensquilla/catppuccin 口径一致。
4. **源码快照**：全部 `.css` + `core/` 拷入 `themes/ergemd/_source/`（只读备查）。
5. **来源登记**：家族 README 标注真实仓库 `https://github.com/ErgeAIA/ErgeMD`，协议 AGPL-3.0；
   INDEX.json 的 license 字段为 AGPL-3.0。
6. **预览家族感知**：`preview.html` 内嵌 `FAMILY_SECTION_ROLES` / `BADGE_ROLES` / `BG_TEXT_ROLES`（JS 常量），
   按家族渲染 ErgeMD 原生角色的色卡与 AA 徽标（text-primary/secondary/muted vs bg-page）。

## 影响

- 家族数 2 → 3，主题数 14 → 28（27 value + 1 skin），色板表令牌总量 432 → 1720。
- 新家族若角色词表与 L1 不同，沿用本 ADR 的「数据驱动契约 + 家族感知预览」模式。
- opensquilla 契约版本 2 → 3（补 `atmosphere-dawn` 派生角色，ADR-0001 的演进规则）。
