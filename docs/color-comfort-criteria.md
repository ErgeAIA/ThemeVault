# 配色判据体系与文献清单（舒适优先，多维判定）

> 用途：给「配色 / 主题 / token 系统」类技能与评审当判据源。**不要把它当成一条阈值规则用**——它的价值在于把被压缩成一个数的五件事重新拆开。
> 校准锚点：AI Vault 夜灯（ThemeVault #001 erge/dark）/ 晨光（#002 erge/light）迁移实测，2026-10-21，分支 `ui/theme-erge-defaults`，探针 `scripts/probe-theme-colors.mjs`。
> 阅读顺序：先 §0 结论 → §1–§3 判据 → §5 负向清单 → §8 怎么机检 → §9 文献。

---

## 0. 六条可直接抄走的结论

1. **单值塌缩是所有误判的来源。**「文字对卡片底的 ratio」这一个数同时被要求回答看得见吗、晃不晃、有没有层次、是不是我的品牌、眼睛要不要重新对焦。它一个都答不了。
2. **标准只有下限，舒适要的是上限。** WCAG 2.x 没有上限概念；深底亮字到 15–18:1 时，可辨识度还在涨，舒适度已经开始掉。暗底必须有天花板这条**负向规则**。
3. **判据的最小形状是四元的**：`角色 × 极性 × 字号/字重 × 表面`。缺任何一个轴都会出现「全绿但刺眼」或「合规但分层失效」。
4. **层次与状态反馈用 ΔE，不用 ratio。** ratio 是亮度比，对「浮起来没有」「hover 有没有动」这两件事不敏感；ΔE00 / OKLab 距离才对。
5. **一 token 兼两职（既当填充又当文字）时，选值必须两职都过。** 只按其中一职选，另一职会静默烂掉（本次：`--brand` 同时喂 139 处 `bg-primary` 与 614 处 `text-primary`）。
6. **指标定不了的判断要摊开成人眼验收项**，作为流程里的一等公民，而不是"顺手看一眼"。品牌分量、层次存在感、冷暖统一、图标语义一致性——这四类没有任何静态指标能覆盖。

---

## 1. 五层判据

| 层 | 它回答 | 用的量 | 阈值形状 | 常规工具能不能检 |
|---|---|---|---|---|
| L1 可见性 | 看不看得见 | 对比度（WCAG ratio / APCA Lc） | 下限 = f(字号, 字重, 极性)，非常数 | 能（多数门禁只做这层） |
| L2 舒适度 | 看久了难不难受 | 上限、彩度、空间频率、大面积亮面 | 暗底亮字有天花板；大面积纯白有惩罚 | **通常没有**，缺口最大 |
| L3 层次 | 谁在主、谁浮起、谁并列 | 相邻档 / 相邻表面之间的 ΔE 或 tone 差 | 下限 + 相邻差**成对**判定 | 能，需新增检查 |
| L4 识别与一致性 | 是不是我的品牌；跨主题还是不是同一个语义 | 面积占比、ΔE00（经白点适应后） | 语义色跨主题 ΔE00 ≤ 上限；强调面积 ≤ 上限 | 部分（用色相角会误报） |
| L5 生理负荷 | 眼睛要不要重新对焦 / 要不要适应闪烁 | 冷暖对撞、调节反应、瞬态（过渡时长/刷新） | 暖底禁高彩度蓝紫当正文；transition 有下限 | 能做成静态规则 |

## 2. 八个自变量（每条判据都要标自己作用在哪些轴上）

`角色` · `极性`（亮底暗字 / 暗底亮字）· `字号` · `字重` · `落在哪个表面`（以及该表面的周围是谁）· `彩度` · `空间频率`（纹理/条纹）· `时间`（过渡、闪烁、瞬态）

## 3. 角色 → 判据表

「实测锚点」列是夜灯 / 晨光迁移后的浏览器实算值（对卡片底），可作为同类暖底主题的起点参照，不是通用标准。

| 角色 | 最小判据 | 上限 / 惩罚 | 附加判据 | 实测锚点 |
|---|---|---|---|---|
| 要点（页面与弹窗标题、数值、按钮文字） | 极性下限 | 不设上限，但**禁止用它排长文** | 面积小才允许高对比 | 12.52 / 17.56 |
| 阅读（正文、指南说明、详情描述） | 下限 + 舒适带 | 暗底上限严于浅底（halation） | 行宽与行高参与「晃」的程度 | 派生 84% → 9.24 / 10.88；五表面 8.94–11.33 与 9.09–10.88 |
| 辅助（13px 计数、hint、占位） | 4.5 在**每一个**表面分别成立 | — | 与相邻档要有可辨 ΔE | 4.96/5.57/4.80（夜灯 card/main/hover）；5.66/5.22/4.73（晨光） |
| 图标与图形（非文本） | 3:1 | 同要点 | 判定要先分「文字 / 图形」，否则误报 | 恒底层 vs `--bg-card` |
| 描边与分隔线 | 分界用 ΔE（薄线对底约 1.1–1.5）；**可寻址控件边界**用 3:1 | — | 分界线的存在感是色差量，不是 ratio | 晨光 card vs main 1.08，需描边补 |
| 填充底 + 其上的字 | 文字对**该填充**本身达标 | 填充受 L2 彩度/亮度惩罚 | 极性反转要重配墨色，不能共用 | 墨 `#171614` 压 `#ff7a3d` = 6.98；白字压同色 = 2.59 |
| 品牌强调 | 同要点 | **面积 ≤ 一档**（60-30-10 里的 10） | 诉求是「可见」不是「最高对比」 | 晨光只能出现 accent-deep `#b84a14`，真品牌 `#FF6A2B` 无处现身 |
| 身份 / 语义色（跨主题恒定） | 各自表面下限 | — | 恒定性用 ΔE00 + 彩色适应变换；压暗必然转色相 | 黄绿压成橄榄绿、`#cb4b16`→`#c14411` 这类明度补偿 |

---

## 4. 阈值怎么给（避免伪精确）

静态阈值表**必须查表生成，不要凭记忆抄数字**：

- L1 用 APCA 的最小值图（minimum plot），它按 `字号 × 字重 × 极性` 给曲线；WCAG 4.5 / 3 只作为**合规兜底**保留。注意 WCAG 3（含 APCA）截至 2026 年中仍是 working draft，生产判定要双轨：ratio 过合规、Lc 过舒适。
- L2 的上限目前**没有公认定量曲线**（见 §10）。可行做法：把它写成「负向清单 + 极性分档软上限」，并要求人眼验收，不要伪装成科学阈值。
- L3 的相邻差建议用 ΔE00 或 OKLab 距离表达；工程上更好用的是 M3 的 **tone**（同 tone 上不同色相的感知亮度一致），层次= tone 差，对比= tone 比值。
- 任何 tint / hover / 派生色：先在 `oklab` 里算，再落 `srgb` 值；混色空间本身要成一条机检。

---

## 5. 负向清单（拦的是「数据更好看、体验更差」的方向）

1. 暗底**禁止纯白**正文；用 off-white 或带底色的暖白，并降一档彩度。
2. **禁止把要点档拿去排长文**。这条比任何上限数字都好用：它禁的是用错档，不是调错值。
3. 禁止 `card` 与 `elevated` 同值（无层次）；禁止浅底大面积纯白当主视觉面。
4. 禁止为达标把弱档推到次级档附近——「下限 + 相邻 ΔE」必须成对判定，否则合规即抹平层级。
5. 禁止在暖底上用高彩度蓝 / 紫当正文或小图标（纵向色像差使蓝红无法同时聚焦，实测抬高调节反应）。
6. 禁止用 `color-mix(in srgb)` 派生主题色：同一比例在不同色相上混出的明度、彩度变化不一致。
7. 禁止用 `/N` 透明度表达"更亮或更淡的品牌色"——最终对比取决于它叠在哪个表面上，必须放到真实组件上验。
8. 禁止把 hover 反馈写成 `brightness` 兜底，或静态与 hover 同值（dead hover）；hover 方向要跨主题统一，判据是 ΔE 可辨。
9. 纹理与条纹按**空间频率 + 面积**限制，不按对比度限制：中空间频率（约 3 cycles/degree 量级）是最易激惹段，扫描线、斑马纹、密集网格都在这里。

---

## 6. 指标看不见、必须留人眼的四类

| 验收项 | 为什么指标覆盖不了 | 怎么验 |
|---|---|---|
| 品牌分量 | 强调色的视觉重量是结构问题，不落在任何 ratio 上 | 同页并排截图，问「主按钮像不像主角」 |
| 层次存在感 | 只测文字/表面，不测「这块浮起来了没」 | 关掉阴影单看底色的分界是否成立 |
| 冷暖统一 | 没有指标描述"这套屏看久了温不温" | 中性灰族的色温 / Duv 一致性 + 肉眼长读一段 |
| 图标语义一致性 | 形状与颜色共同承载语义 | 跨主题走查同一状态（如运行/失败/隐藏） |

验收产物规格：同一页面两套主题并排 1 张 + 正文 100% 缩放样张 1 张 + 主按钮与淡底标签特写 1 张。指标全绿不等于通过。

---

## 7. 冲突裁决顺序

可见性（L1 合规）> 舒适（L2 上限与负向清单）> 层次（L3）> 语义一致（L4）> 生理负荷（L5，可作长期风险加权）> 审美偏好。
例外：当提升 L1 数值会触发 §5 任一条时，**不提升**，改为换角色档或换表面。

---

## 8. 机检怎么落（可直接实现为脚本的门禁）

| 检查 | 做法 | 关键点 |
|---|---|---|
| 实算而非读源码 | 用无头浏览器加载构建产物 CSS，逐主题读 `getComputedStyle` | `color-mix` 只有浏览器算得准；每套主题**冷加载一次**，否则会读到过渡起点的旧值 |
| 改动前后对账 | 存基线 JSON → 改后 `--compare` | 目标是证明「改动只落在预期主题内」，其余主题零漂移 |
| 分角色判定 | 角色表驱动，而非全局 4.5 | 图形走 3:1、文字走 f(字号,字重,极性) |
| 多表面判定 | 每个文字色对它**会用到的每个表面**分别算 | 只算卡片底会漏 hover 底与输入底 |
| 相邻档 ΔE | 文字档两两之间、表面两两之间 | 与下限成对，防 §5.4 |
| 混色空间扫描 | grep `color-mix(in srgb` 的派生位点 | 派生层应统一 `oklab` |
| 彩度上限 | 按角色给 chroma 上限（OKLCH C） | 深底强调族最易越界 |
| 一 token 多职检测 | 统计同一 token 被 `bg-*` 与 `text-*` 同时消费的次数 | 命中即要求两职各自达标，或拆档 |
| 恒定层不被主题重写 | 身份色/危险色只在基线层写一次 | 浅底只调明暗，换色相即违规 |
| 未定义变量 | 引用检查 | 浏览器会静默丢弃整条声明，不会报错 |

脚本失效要报警、不许静默 PASS；阈值来源要能追到官方或有后果的约定，追不到就降级为提示。

---

## 9. 文献与规范清单

级别含义：**标准** = 官方规范；**论文** = 同行评审；**一手** = 提案/作者文档；**厂商** = 平台规范；**实践** = 工程博客；**转述** = 二手，回原文再引。

| # | 出处 | 级别 | 能定哪条判据 |
|---|---|---|---|
| 1 | [Myndex Whitepaper（W3C Silver，APCA/SAPC 作者）](https://www.w3.org/WAI/GL/task-forces/silver/wiki/User:Myndex/Whitepaper) | 一手 | L1：WCAG2 数学在深色对上失真；阈值 = f(极性, 字号, 字重)；暗底需更高 Lc。**先读这份** |
| 2 | [Understanding the APCA](https://www.accessibilitychecker.org/blog/apca-advanced-perceptual-contrast-algorithm/) | 实践 | L2：暗底避免高饱和 / 极亮字，off-white + 抬底色防 halation（对应 §5.1、§5.3） |
| 3 | [WCAG 2.2 vs WCAG 3.0](https://www.qualibooth.com/resources/wcag-22-vs-30-whats-coming/) | 实践 | 双轨判据的依据（2026 年中仍是 working draft） |
| 4 | [Pastoor 1990, *Human Factors* 32(2):157-171, PMID 2210772](https://ngdc.cncb.ac.cn/openlb/publication/OLB-PM-02210772) | 论文 | L2/L4：**饱和度对主观评价影响最大**，去饱和组合普遍满意；冷色底更适合 light-on-dark（约 800 组评价） |
| 5 | [Bauer & Cavonius 1980，对比反转与易读性](https://m.sohu.com/a/319543812_100143156/?pvid=000115_3w_a)（转述版） | 转述 | 长文优先浅底这条经典规则的出处（深字浅底准确率高约 26%）[待验证原文] |
| 6 | Buchner & Baumgartner, *Ergonomics* 50(7):1036,「Text–background polarity affects performance irrespective of ambient illumination and color contrast」 | 论文 | 极性是**独立轴**，不能只靠调 ratio 解决 [作者名待验证，仅见引文] |
| 7 | [Dobres 等 2016, *Displays* 41:42-49](https://ir.psych.ac.cn/handle/311026/19961?mode=full&submit_simple=Show+full+item+record) | 论文 | 字重 × 极性 × 汉字的一瞥式易读性（粗体更利、正极性更利） |
| 8 | [Visual Perception of Peripheral Screen Elements, *Applied Sciences* 2025, 15(14):7636](https://www.mdpi.com/2076-3417/15/14/7636) | 论文 | L1：白底黑字 / 蓝字最易读；边缘视野元素的判定 |
| 9 | [Immediate Effects of Light Mode and Dark Mode on Visual Fatigue, *IJERPH* 2025, 22(4):609](https://www.mdpi.com/1660-4601/22/4/609) | 论文 | L2/L5：明暗模式与眼疲劳的即时效应、屏幕与周边亮度落差 |
| 10 | [Display Color Mode and Luminance Contrast on Visual Fatigue（2021）](https://www.researchgate.net/publication/349602864_Study_on_the_Effects_of_Display_Color_Mode_and_Luminance_Contrast_on_Visual_Fatigue) | 论文 | L2：疲劳随模式与亮度差的量化 |
| 11 | [A neurological basis for visual stress and its treatment, *Vision Research* 2025](https://www.sciencedirect.com/science/article/abs/pii/S0042698925000768) | 论文 | L5 pattern glare 谱系入口（Wilkins 1981 *Vision Research* 21:457-467；1989 *LRT* 21:11-18；Wilkins & Evans 2010） |
| 12 | [Auditory discomfort in visually sensitive individuals, *Frontiers in Psychology* 2023](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1126481/full) | 论文 | **Pattern Glare Test 的可操作定义**（0.4 / 3 / 10 cpd，中高频易激惹）；色度分离与 alpha 响应（2018）→ §5.9 直接依据 |
| 13 | [Effects of Lighting Quality on Working Efficiency, *IJERPH* 2019, PMC6877933](https://pmc.ncbi.nlm.nih.gov/articles/PMC6877933/) | 论文 | discomfort glare 定义网络 +《Visual stress theory and its application to reading》 |
| 14 | CIE 117:1995 *Discomfort Glare in Interior Lighting*（UGR）+ [Eye movement and pupil size constriction under discomfort glare, *IOVS* 2015, 56:1649-1656](https://www.mdpi.com/2075-5309/16/4/696) | 标准 + 论文 | L2 客观化方向：UGR 不可照搬到自发光屏，但**瞳孔收缩是可自动测的不适信号** |
| 15 | [Short-term effects of text-background color combinations on the dynamics of the accommodative response（2022）](https://m.zhangqiaokeyan.com/journal-foreign-detail/0704025032686.html) | 论文 | L5：**蓝-红组合抬高调节反应**；正极性瞳孔更小 → §5.5 冷暖对撞条 |
| 16 | [Effects of luminance and colour contrast on the search, *Displays*](https://www.sciencedirect.com/science/article/abs/pii/S0141938204000046) | 论文 | L5：色像差 → chromostereopsis / 模糊；UI 用多色会**降低明度对比**；含 Tinker & Paterson 1931（11 种组合阅读速度）历史锚点 |
| 17 | [Vergence–accommodation conflicts hinder visual performance, PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC2879326/) | 论文 | 「发虚」的机制解释 |
| 18 | [web.dev 颜色指南](https://web.developers.google.cn/learn/css/color?authuser=956858896&hl=zh-cn) | 厂商 | L3/L4：oklab / oklch 性质（改色相不动明度与饱和度）→ §5.6 |
| 19 | [material_color_utilities（hct / tonal_palette / contrast / dislike_analyzer）](https://docs.flutter.dev/flutter/package-material_color_utilities_contrast_contrast/package-material_color_utilities_contrast_contrast-library.html) | 开源 + 规范 | 现成算法：HCT 让「tone 决定对比」可执行；含不喜色分析器 |
| 20 | [Android Wear 颜色系统](https://developer.android.com/design/ui/wear/guides/styles/color/system?hl=zh-cn) | 厂商 | 颜色角色命名（primary / on-primary / container）；**先定 tone 再反查色值**、按种子派生 AAA |
| 21 | [（可能是）最硬核的色彩系统总结](https://www.zcool.com.cn/article/ZMTQ2MjIwMA==.html) | 实践（高质量长文） | HCT = CAM16 的 h/C + L\* 的 tone；为什么 hue/chroma 不能当刻度 |
| 22 | [color-mix() 派生 hover 与浅底实战](https://m.17golang.com/article/621062.html)、[OKLab 消除渐变中间发黑](https://m.php.cn/faq/3080042.html) | 实践 | 静默失效、`@supports` 降级、透明度必须放到真实组件核验 |
| 23 | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | 工具 | 支持 **alpha 输入**（多数门禁不支持，是 §5.7 的来源） |
| 24 | [color-expert 技能条目](https://tool.lu/zh_CN/skill/s/iBl) | 同类技能 | 现成的「任务 → 色彩空间」路由表（OKLCH / OKHSV / HSLuv）；建技能前先对照，避免重复与抢路由 |

---

## 10. 三个已知空白（不要写成科学结论）

1. **暗底亮度天花板缺直接文献。** halation / 散光放大那套解释主要来自转述与生理推理，没有「某 Lc 以上主观不适显著上升」的定量曲线。写法只能是：经验软上限 + 强制人眼验收。
2. **暖冷（CCT / Duv）与屏幕阅读舒适度。** 照明领域文献充足，落到「UI 底色偏橙 vs 偏灰」的实证极少。把暖底当舒适选择是设计判断，不是证据。
3. **token 体系本身**（派生公式、一 token 多职、跨主题恒定）几乎没有 HCI 实证，全部是工程规范。这部分与论文级判据要分栏标注，否则读者会把 60-30-10 当成有实验支持的规则。

---

## 11. 反例集（真实踩过的六种误判）

| 误判 | 表现 | 正解 |
|---|---|---|
| 拿上限当改进 | 把深底正文从 12.6 换到 12.5 或更高，认为"更清楚了" | 病根是用错档；先分角色，再谈数值 |
| 按 `--bg` 求比给徽章 | 色板自校工具显示"全过 AA"，应用里 13px 文字在卡片/hover 底只有 3.5–4.3 | 每个角色对它实际用到的**全部表面**分别算 |
| 用色相角判跨主题恒定 | 6° 阈值既误报（近灰区）又漏报（高彩度区） | ΔE00 + 白点适应变换 |
| 一 token 双职 | 品牌色同时是填充与文字，为了 AA 只能整体压深，品牌色"消失" | 拆品牌填充档 / 品牌文字档，或明写只满足一职 |
| 弱档达标即收工 | 弱档抬到 4.5 后与次级档只剩 0.65 差，层级被抹平 | 下限 + 相邻 ΔE 成对判定 |
| 只看编译结果 | 混色参数写错 / 旧内核不支持 `color-mix`，浏览器静默丢弃整条声明 | 浏览器实算探针 + 未定义变量检查 |
