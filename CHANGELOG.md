# 更新日志

本项目所有值得注意的变更都记录在此文件中。

本项目**无 release 产物**，变更按日期分隔，像日记一样记录一天的变更。分类习惯参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，不使用 SemVer 版本号。

## [Unreleased]

## 2026-10-20

### 新增
- 主题中文名：`erge/dark` = **夜灯**、`erge/light` = **晨光**（`scripts/zh_names.json`；预览卡片显示「Dark | 夜灯」，英文名保留）

### 变更
- 全局主题编号重排：`erge` 家族置顶为 **#001**（`erge/dark`）/ **#002**（`erge/light`），其余 150 套统一 `+2`（原 #001–#150 → #003–#152）；家族展示顺序同步前置。新增一次性迁移模式 `python scripts/gen_index.py --renumber --write`，旧 → 新映射见 `docs/.ai/decision-log.md` DEC-019
- `INDEX.md` 人工备注的保留键由「编号」改为「主题目录」（`scripts/gen_docs_views.py`）：重编号不再造成备注错配
- 人工速查表编号同步 `+2`：`docs/brand-colors.md`、`docs/profiles/ergemd.md`、`INDEX.md`「检索提示」
- 历史日志（CHANGELOG 早期条目、`docs/.ai/decision-log.md`、`project-progress.md`、`debug-log.md`、`docs/.ai/audit/`）按 append-only 约定保留旧编号，不改写

## 2026-10-11

### 新增
- 主题中文名：新增人工核定的译名表 `scripts/zh_names.json`（覆盖 113 个唯一主题名）；`gen_index.py` 输出 `zhName`，预览卡片标题以「英文名 | 中文名」显示，搜索支持中文名
- 分隔符取 `|` 而非 `-`：部分主题名自带连字符（catppuccin-frappe / one-dark / osaka-jade），用 `-` 会造成混淆
- `onepage` 家族显示名已自带中文（如「暖棕·冷锚」），不重复追加
- 预览卡片中文名后新增「复制色板」徽章：点击复制该主题完整调色板信息（元信息 + 全部语义角色色值 + 文本对比度 + 品牌色），可直接发给 AI 取色适配；`file://` 下剪贴板受限时回退到 `execCommand`

### 变更
- 预览页易读性改造：列数由 4 列 / 340px 改为 3 列 / 440px（一行少放一张、卡片更宽），列间距 18 → 22px
- 字号阶梯整体上移：主题名 14 → 17px，色值 9 → 12px、角色名 9 → 11px，代码块 11 → 13px（行高 1.7），元信息与 AA 徽标 10 → 12px，标签 11 → 12.5px；页面最小字号由 9px 提到 11px
- 色块 30 → 38px 高、最小列宽 72 → 96px 以容纳更大色值；数字启用 `tabular-nums` 对齐
- 浏览器表面主题化：选择色、焦点环、滚动条；页脚与空状态的低对比灰（#667，约 3.1:1）提亮
- 窄屏（≤768px）代码块改为换行，消除横向溢出（字号保持 13px）

## 2026-10-10

### 新增
- 新增 `opencode` 家族：DSH OpenCode 主题集（@`9839cb3`，MIT 聚合）72 套主题变体（35 双方案 dark/light + 2 单方案），由 `scripts/gen_opencode.py` 数据驱动生成，含家族 contract / intent / extract / mapping
- 为 synthwave / tokyonight / nord / dracula 4 个家族补充 light 方案（`scripts/gen_s2b_light.py`，DSH OpenCode→L1 映射，29 required 全填 + 契约兜底标注）
- 主题总数 101 → 150，家族数 22 → 23

### 变更
- `gen_opencode.py` 新增 `AA_EXEMPTIONS` 常量：为主题注入 AA 对比度已知偏差标注（仅标注，不改值）
- solarized 两个 light 主题（`solarized/light` #034、`opencode/solarized-light` #136）的 AA 对比度告警（textOnBg 4.13）登记为已知偏差豁免，保留源值不改（DEC-015）
- one-dark-pro / shades 维持仅 dark（不补 light）：DSH 对应源为精简 28 角色版，缺 text-muted + syntax*，补到 L1 会产生大量契约兜底（DEC-014）
- 根目录 `README.md` 移除「当前进度」节；进度唯一出处为 `docs/.ai/project-progress.md`，待办已转存
- opencode 家族中 light 与 dark 取值相同的变体（catppuccin-frappe / catppuccin-macchiato / nightowl，共 3 个）改按 dark 归档，避免 Light 筛选下出现深色主题；**色值未改写**，仅在 palette 与 README 注明归档依据

### 修复
- 预览卡片底色：opencode 家族用原生 `background` 而非 L1 `bg`，此前全部回退兜底色（35 套 light 主题显示成深色）；已补 `BG_TEXT_ROLES` / `BADGE_ROLES`
- 主题对比矩阵：新增 opencode → L1 角色映射，此前 opencode 家族整列为空
- 预览可读性：AA 徽标与编号 / 品牌 / 字体 / 方案 tag 改为按卡片底色明暗择优取色（此前浅色主题卡片上对比度低至 1.32，现最差 5.98 / 6.47）
- 预览补充：筛选无结果显示空状态提示；家族下拉支持 Esc 关闭与 `aria-expanded`；控件增加按下反馈；圆角体系统一为 6 / 8 / 12；代码块示例不再指向真实主题名
- 预览卡片背景为 `transparent` 的主题（lucent-orng / lucent-orng-light）回退为按方案中性的底色，此前透明底露出页面深色、与深色文字叠加不可读；卡片标注背景源值

## 2026-09-24

### 新增
- 定义 L1 v4 角色分层与缺口诚实规则（`docs/l1-roles.md`、ADR-0008）
- 新增 ErgeMD 适配 profile 与 core / reading 映射
- 新增主题纳入 DoD：来源 pin、值域三态（原文/公式/豁免）、映射可审

### 变更
- OnePage 缺口角色明确标注为「契约兜底」

## 2026-09-14

### 新增
- 预览家族分区与徽标配置生成化进 `preview/data.js`，与索引同源

### 变更
- OnePage 状态色与 ANSI 共 26 行统一为 HEX 显示（DEC-002）
- 预览对比度守卫与 Python 口径对齐，非纯色显示「—」
- 生成器增强健壮性并保证字节级幂等输出

### 修复
- 预览不再把 `var()` 公式值画成透明色块
- OnePage 卡片移除 graph-* 公式角色分区

## 2026-09-13

### 新增
- ThemeVault 初始入库：OnePage 家族（#073 warm-brown、#074 warm-paper）及索引 / 预览 / 文档骨架
