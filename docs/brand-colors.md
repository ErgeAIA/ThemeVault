# ThemeVault 品牌主色速查（Brand Colors）

> 每套主题的**品牌主色**（重点按钮 / 品牌强调的底色）：L1 家族取 `accent` 角色，ergemd 家族取 `brand-primary`。
> 数据由 `scripts/gen_index.py` 从 palette.md 解析并计算，落盘于 INDEX.json 的 `theme.brand` 字段（AI 读那份）。
> 本表是**人类速查版**；编号 = INDEX.md / INDEX.json 的全局主题编号。

## 方法论（怎么用这张表）

1. **品牌色** = 主题的 `accent`（palette.md 强调段；ergemd 用 `brand-primary`，即官方品牌色）。
2. **色块文字色**（`theme.brand.buttonText`）：`dark` = 深字 `#101014`，`light` = 浅字 `#f5f5f7`。
   口径与预览卡片色块 `fgFor()` 完全一致（luminance > 0.55 深字 / 否则浅字）——**预览所见即所得**。
3. **适配**：品牌按钮 = `brand.color` 背景 + 对应文字色（`dark`→`#101014`、`light`→`#f5f5f7`），
   与预览卡片色块显示完全一致（如 #008 Synthwave：`#ff2fb9` + `#f5f5f7`）。
4. `theme.brand.contrast` 保留 WCAG 白/黑对比度作**参考**（不是文字色建议）——想要更高对比可自行按它选字色，
   或用 `accent-foreground`（比纯黑/纯白更贴合主题）。

## 🤍 浅字按钮（55 套 —— 色块文字 #f5f5f7）

> 品牌色多为中等/暗色系（luminance ≤ 0.55）。列中「白字/黑字」为 WCAG 参考对比度。

| # | 主题 | 品牌色 | 白字 | 黑字 | # | 主题 | 品牌色 | 白字 | 黑字 |
|---|------|--------|------|------|---|------|--------|------|------|
| 001 | opensquilla/arctic | `#88C0D0` | 2.0 | 10.5 | 034 | solarized/light | `#268bd2` | 3.68 | 5.71 |
| 003 | opensquilla/dark | `#F26A1B` | 3.06 | 6.85 | 035 | tokyonight/moon | `#82aaff` | 2.3 | 9.14 |
| 004 | opensquilla/ember | `#ff6a2b` | 2.86 | 7.35 | 036 | tokyonight/night | `#7aa2f7` | 2.52 | 8.34 |
| 005 | opensquilla/light | `#BA4D0F` | 5.05 | 4.16 | 037 | tokyonight/storm | `#7aa2f7` | 2.52 | 8.34 |
| 006 | opensquilla/miami | `#D71776` | 4.91 | 4.27 | 038 | one-dark-pro/dark | `#4d78cc` | 4.31 | 4.87 |
| 008 | opensquilla/synthwave | `#ff2fb9` | 3.3 | 6.36 | 039 | night-owl/dark | `#7e57c2` | 5.21 | 4.03 |
| 009 | opensquilla/terminal | `#ffb000` | 1.83 | 11.46 | 040 | night-owl/light | `#2AA298` | 3.13 | 6.72 |
| 010 | opensquilla/vapor | `#ff6ac1` | 2.6 | 8.08 | 041 | synthwave/dark | `#f97e72` | 2.54 | 8.26 |
| 011 | catppuccin/frappe | `#ca9ee6` | 2.2 | 9.54 | 042 | iceberg/dark | `#84a0c6` | 2.68 | 7.82 |
| 012 | catppuccin/latte | `#8839ef` | 5.41 | 3.88 | 043 | iceberg/light | `#2d539e` | 7.39 | 2.84 |
| 013 | catppuccin/macchiato | `#c6a0f6` | 2.15 | 9.76 | 044 | kanagawa/dragon | `#8ba4b0` | 2.61 | 8.03 |
| 014 | catppuccin/mocha | `#cba6f7` | 2.03 | 10.34 | 045 | kanagawa/lotus | `#4d699b` | 5.51 | 3.81 |
| 015 | ergemd/aurora | `#4FC3F7` | 2.0 | 10.48 | 046 | kanagawa/wave | `#7E9CD8` | 2.75 | 7.63 |
| 018 | ergemd/dark | `#569CD6` | 2.95 | 7.12 | 047 | everforest/dark | `#a7c080` | 2.0 | 10.49 |
| 019 | ergemd/desert-sunset | `#4DD0E1` | 1.84 | 11.43 | 048 | everforest/light | `#8da101` | 2.9 | 7.23 |
| 020 | ergemd/falcon | `#65BCD9` | 2.15 | 9.75 | 049 | rose-pine/dawn | `#d7827e` | 2.84 | 7.38 |
| 021 | ergemd/forest | `#66BB6A` | 2.36 | 8.88 | 051 | rose-pine/moon | `#ea9a97` | 2.19 | 9.57 |
| 022 | ergemd/light | `#2666F0` | 4.95 | 4.24 | 052 | ayu/dark | `#e6b450` | 1.91 | 11.01 |
| 023 | ergemd/monochrome | `#B0B0B0` | 2.17 | 9.68 | 053 | ayu/light | `#f29718` | 2.28 | 9.22 |
| 025 | ergemd/ocean | `#26C6DA` | 2.06 | 10.17 | 055 | jellyfish/dark | `#ff0055` | 3.9 | 5.38 |
| 026 | ergemd/solar-flare | `#4DD0E1` | 1.84 | 11.43 | 059 | vue/high-contrast | `#14c5ab` | 2.19 | 9.6 |
| 027 | ergemd/solarized-light | `#268bd2` | 3.68 | 5.71 | 060 | falcon/dark | `#305862` | 7.78 | 2.7 |
| 029 | aura/dark | `#a277ff` | 3.17 | 6.62 | 061 | falcon/dark-blue | `#305862` | 7.78 | 2.7 |
| 030 | aura/soft-dark | `#a277ff` | 3.17 | 6.62 | 062 | falcon/dark-green | `#305862` | 7.78 | 2.7 |
| 031 | dracula/dark | `#bd93f9` | 2.41 | 8.71 | 063 | falcon/dark-green-islands | `#305862` | 7.78 | 2.7 |
| 032 | nord/dark | `#88c0d0` | 2.0 | 10.5 | 072 | omni/dark | `#41414D` | 10.06 | 2.09 |
| 033 | solarized/dark | `#268bd2` | 3.68 | 5.71 | 073 | onepage/warm-brown | `#6db3a3` | 2.43 | 8.63 |
| 074 | onepage/warm-paper | `#0e6e63` | 6.12 | 3.43 |    |   |   |   |   |

## 🖤 深字按钮（16 套 —— 色块文字 #101014）

> 品牌色为亮色系（luminance > 0.55），如霓虹青/粉/绿。

| # | 主题 | 品牌色 | 白字 | 黑字 | # | 主题 | 品牌色 | 白字 | 黑字 |
|---|------|--------|------|------|---|------|--------|------|------|
| 002 | opensquilla/crt-green | `#39ff14` | 1.36 | 15.49 | 064 | falcon/light-bean-green | `#AFDBB8` | 1.54 | 13.65 |
| 016 | ergemd/cherry-blossom | `#F8BBD9` | 1.6 | 13.1 | 065 | falcon/light-buff | `#CCC8B6` | 1.68 | 12.5 |
| 017 | ergemd/cyberpunk | `#00FFFF` | 1.25 | 16.75 | 066 | falcon/light-celadon | `#AFDBB8` | 1.54 | 13.65 |
| 024 | ergemd/neon-cyberpunk | `#00FFFF` | 1.25 | 16.75 | 067 | falcon/light-green | `#AFDBB8` | 1.54 | 13.65 |
| 028 | ergemd/tokyo-night | `#7DCFFF` | 1.72 | 12.24 | 068 | falcon/light-green-islands | `#AFDBB8` | 1.54 | 13.65 |
| 050 | rose-pine/main | `#ebbcba` | 1.69 | 12.43 | 069 | falcon/light-grey | `#c7dae1` | 1.44 | 14.54 |
| 054 | ayu/mirage | `#ffcc66` | 1.49 | 14.08 | 070 | falcon/light-pink | `#FFD6E0` | 1.32 | 15.95 |
| 058 | vue/dark | `#19f9d8` | 1.35 | 15.58 | 071 | falcon/light-yellow | `#CCC8B6` | 1.68 | 12.5 |

## 无品牌色（2 套）

- **shades**（#056/057）：`accent` 为带 alpha 的 `#FAD000dd`，无法确定纯色文字色 → 无 `theme.brand`，预览卡片无品牌 swatch（源事实）。

## 注意

- **色块文字色 ≠ WCAG 最佳对比**：如 arctic `#88C0D0` 色块按 `fgFor` 显示浅字，但黑字对比高达 10.5:1——
  「预览所见即所得」优先（与预览卡片完全一致）。若追求更高对比，可改用 `accent-foreground` 或按 WCAG 列自选字色。
- **文字色首选 `accent-foreground`**：如 Nord `#2e3440`、Tokyo Night `#1a1b26`，比纯黑更贴合主题（品牌按钮内层文字）。
- 本表按钮文字口径与预览卡片**完全一致**：适配时直接按 `brand.color` + `brand.buttonText` 取用即可。

## 落地示例（重点按钮）

```css
/* 浅字组（如 #008 Synthwave 粉）：品牌色背景 + 浅色文字 #f5f5f7 */
.btn-primary { background: #ff2fb9; color: #f5f5f7; }
.btn-primary:hover { background: color-mix(in srgb, #ff2fb9 88%, #ffffff); }

/* 深字组（如 #017 cyberpunk 青）：品牌色背景 + 深色文字 #101014 */
.btn-primary { background: #00FFFF; color: #101014; }
```

---

*本表由品牌色分析生成；机器可读版见 INDEX.json 的 `theme.brand`（`color` / `buttonText` / `contrast`）。*
