# ThemeVault — 来源登记清单

> 登记 ThemeVault 收录的全部**开源来源项目**：仓库地址、协议、收录的主题。
> 数据口径与 `INDEX.json` / 各家族 `README.md` 一致；新增家族入库时在此追加一行。
> 主题 → 来源映射规则：`themes/<family>/<id>` 的主题一律源自该家族登记的仓库。

## 登记总表

| # | 来源项目 | 仓库地址 | 协议 | 收录主题（家族 ID） | 备注 |
|---|----------|----------|------|---------------------|------|
| 1 | opensquilla | https://github.com/opensquilla/opensquilla | Apache-2.0 | `arctic` `crt-green` `dark` `ember` `light` `miami` `out-of-register` `synthwave` `terminal` `vapor` | 开源项目；arctic 为 Nord 衍生（MIT），需保留 Sven Greb 署名；out-of-register 为 expressive skin |
| 2 | catppuccin | https://github.com/catppuccin/palette | MIT | `latte` `frappe` `macchiato` `mocha` | 官方聚合调色板（26 色 × 4 flavor）；生态主仓库 catppuccin/catppuccin |
| 3 | ergemd | https://github.com/ErgeAIA/ErgeMD | AGPL-3.0 | `aurora` `cherry-blossom` `cyberpunk` `dark` `desert-sunset` `falcon` `forest` `light` `monochrome` `neon-cyberpunk` `ocean` `solar-flare` `solarized-light` `tokyo-night` | 自有开源项目（AGPL-3.0，Rust 桌面 Markdown 阅读器）；Gitee 镜像 `git@gitee.com:ergeaia/ErgeMD.git`；数据源为 `src/styles/themes/` CSS 变量体系 |
| 4 | aura | https://github.com/daltonmenezes/aura-theme | MIT | `dark` `soft-dark` | © Dalton Menezes；数据源为 `src/core/colors/schemes/` TS + `packages/vscode/themes/` JSON |
| 5 | dracula | https://github.com/dracula/visual-studio-code | MIT | `dark` | © Zeno Rocha / Dracula Theme；数据源为 `src/dracula.yml`（YAML 锚点体系）；生态主仓库 dracula/dracula-theme |
| 6 | solarized | https://github.com/altercation/solarized | MIT | `dark` `light` | © Ethan Schoonover；数据源为 `xresources/solarized`（官方 16 色）+ `vim-colors-solarized`（权威语义映射） |
| 7 | nord | https://github.com/nordtheme/nord | MIT | `dark` | © Sven Greb；数据源为 `src/nord.css`（官方 16 色）+ VS Code 端口 `arcticicestudio/nord-visual-studio-code` 的 `nord-color-theme.json` |
| 8 | tokyonight | https://github.com/folke/tokyonight.nvim | Apache-2.0 | `night` `storm` `moon` | © Folke Lemaitre；数据源为 `lua/tokyonight/colors/*.lua`（night/storm/moon 静态 palette）；day flavor 为运行时反转生成 |
| 9 | one-dark-pro | https://github.com/Binaryify/OneDark-Pro | MIT | `dark` | © Binaryify；数据源为 `themes/OneDark-Pro.json`（VS Code 主题） |
| 10 | night-owl | https://github.com/sdras/night-owl-vscode-theme | MIT | `dark` `light` | © Sarah Drasner；数据源为 `themes/Night Owl-color-theme.json` + `Night Owl-Light-color-theme.json` |
| 11 | synthwave | https://github.com/robb0wen/synthwave-vscode | MIT | `dark` | © Robb Owen；数据源为 `themes/synthwave-color-theme.json`（霓虹风格） |
| 12 | iceberg | https://github.com/cocopon/vscode-iceberg-theme | MIT | `dark` `light` | © cocopon；数据源为 `themes/iceberg.color-theme.json` + `iceberg-light.color-theme.json`（低对比柔和） |
| 13 | kanagawa | https://github.com/rebelot/kanagawa.nvim | MIT | `wave` `dragon` `lotus` | © rebelot；数据源为 `lua/kanagawa/{colors,themes}.lua`（共享命名色板 + 变体语义映射） |
| 14 | everforest | https://github.com/sainnhe/everforest | MIT | `dark` `light` | © sainnhe；数据源为 `autoload/everforest.vim` 的 medium palette（hard/soft 为亮度变体未单列） |
| 15 | rose-pine | https://github.com/rose-pine/rose-pine-theme | MIT | `main` `moon` `dawn` | © Rosé Pine；数据源 palette 定义取自 [rose-pine/neovim](https://github.com/rose-pine/neovim) 的 `lua/rose-pine/palette.lua`（官方 palette 源；主仓库为品牌聚合） |
| 16 | ayu | https://github.com/ayu-theme/vscode-ayu | MIT | `dark` `mirage` `light` | © Ayu；数据源为根目录 `ayu-*-unbordered.json`（VS Code color theme；bordered 变体为同色边线版未单列） |
| 17 | jellyfish | https://github.com/pawelborkar/vscode-jellyfish | Apache-2.0 | `dark` | © Pawel Borkar；数据源为 `themes/JellyFish Theme-color-theme.json`（VS Code color theme） |
| 18 | shades-of-purple | https://github.com/ahmadawais/shades-of-purple-vscode | MIT | `dark` `super-dark` | © Ahmad Awais；数据源为 `themes/shades-of-purple-color-theme*.json`（italic 为字体变体未单列） |
| 19 | vue | https://github.com/mariorodeghiero/vue-theme-vscode | MIT | `dark` `high-contrast` | © Mário Rodeghiero；数据源为 `themes/vue-theme-color-theme*.json`（VS Code color theme） |
| 20 | omni | https://github.com/getomni/visual-studio-code | MIT | `dark` | © Rocketseat；数据源为 `src/omni.yml`（YAML 锚点体系 + `!alpha` 派生） |
| 21 | falcon | https://github.com/panxiaoan/falcon-vscode-themes | MIT | `dark` `dark-blue` `dark-green` `dark-green-islands` `light-bean-green` `light-buff` `light-celadon` `light-green` `light-green-islands` `light-grey` `light-pink` `light-yellow` | © Xiaoan Pan；温和护眼系列 12 套；数据源为 `src/{dark,light}/*.yml`（YAML 锚点 + `!alpha` 派生；ansi 键名有错位，绿存于 ansiBrightPURPLE） |
| 22 | onepage | https://github.com/ivaneye/OnePage | MIT | `warm-paper` `warm-brown` | © 2025 一页清（ivaneye）；Obsidian 主题，基于 [Cupertino](https://github.com/aaaaalexis/Obsidian-Cupertino)（MIT）；数据源为固定 commit `4226e57` 的 `theme.css` 固化双配色 + 彩色排版 `--typo-*` |

## 维护约定

- 新增**家族**入库时：在本表追加一行，与家族 `README.md`、`INDEX.md` 同步登记。
- 仓库地址与协议以**官方仓库为准**（查 LICENSE / README），协议不明确不落盘（ADR-0004）。
- 第三方调色板衍生的主题（如 opensquilla/arctic 源自 Nord）在备注标注署名要求。
- 所有来源项目如实标注协议（Apache-2.0 / MIT / AGPL-3.0）；ergemd 为用户自有开源项目（AGPL-3.0）。
