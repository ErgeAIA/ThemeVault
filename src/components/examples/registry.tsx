import type { ComponentType } from 'react'
import type { ExamplePageProps } from './shell'
import AppearanceExample from './AppearanceExample'
import StatesExample from './StatesExample'
import FormExample from './FormExample'
import DetailExample from './DetailExample'
import MessagesExample from './MessagesExample'
import ChartsExample from './ChartsExample'
import RichTextExample from './RichTextExample'
import CalendarExample from './CalendarExample'
import PricingExample from './PricingExample'

export interface ExamplePageDef {
  /** 侧栏显示名，同时作为路由键（与示例页 h2 标题保持一致）。 */
  key: string
  /** 优先级，决定侧栏里的排序与标记。 */
  prio: 'P0' | 'P1' | 'P2'
  /** 一句话说明，用于侧栏 title 提示。 */
  brief: string
  /** 徽章图标的 SVG path（24×24 线条，currentColor 描边），语义与页面用途对应。 */
  icon: string
  Component: ComponentType<ExamplePageProps>
}

/**
 * 页面示例登记表：侧栏「示例」菜单的下级项与示例卡片由它生成。
 * 顺序即展示顺序，按**预览一套主题时的使用顺序**排列：
 *   先选主题（外观）→ 看整体气质（状态/表单）→ 看结构化页面（主从/会话）
 *   → 看数据与内容（图表/富文本/日历）→ 收尾看转化页（定价）。
 * 新增示例页只需在此追加一行。
 */
export const EXAMPLE_PAGES: ExamplePageDef[] = [
  {
    key: '外观设置页',
    prio: 'P0',
    brief: '换肤入口：色板 / 圆角 / 密度 / 字号即时生效',
    // 调色板：换肤入口
    icon: 'M12 3a9 9 0 1 0 0 18h1.4a2 2 0 0 0 1.6-3.2 2 2 0 0 1 1.6-3.2H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z M7.6 11h.01 M10 7.6h.01 M14 7.6h.01 M16.4 11h.01',
    Component: AppearanceExample,
  },
  {
    key: '状态页合集',
    prio: 'P0',
    brief: '空 / 404 / 500 / 骨架 / 离线 / 无权限',
    // 感叹号圆标：异常与提示态
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7.8v5 M12 16.2h.01',
    Component: StatesExample,
  },
  {
    key: '表单状态穷举',
    prio: 'P1',
    brief: '校验错误 / 禁用 / 只读 / 多步 / 长下拉 / 拖拽',
    // 竖版表单纸：输入与校验
    icon: 'M5 3h14v18H5z M8.5 8h7 M8.5 12h7 M8.5 16h3.5',
    Component: FormExample,
  },
  {
    key: '详情主从布局',
    prio: 'P1',
    brief: '列表 + 详情 + 抽屉同屏的边框与分隔层级',
    // 左列表右详情：主从分栏
    icon: 'M3 4h18v16H3z M10 4v16 M5.5 8h2 M5.5 11.5h2 M13 8h5 M13 11.5h3.5',
    Component: DetailExample,
  },
  {
    key: '消息会话界面',
    prio: 'P1',
    brief: '气泡 / 未读 / 时间轴 / 附件区在浅底的可读性',
    // 对话气泡：会话
    icon: 'M4 5h16v11H9l-5 4z M8 9h8 M8 12.5h5',
    Component: MessagesExample,
  },
  {
    key: '图表专区',
    prio: 'P0',
    brief: '折线 / 柱 / 饼 / 热力的系列色区分度',
    // 坐标轴 + 柱：数据可视化
    icon: 'M3 3v18h18 M17.5 17V9 M12.5 17V5 M7.5 17v-3.5',
    Component: ChartsExample,
  },
  {
    key: '富文本 diff',
    prio: 'P2',
    brief: 'Markdown 预览与代码对比的语义色分工',
    // 中缝对比：diff 左右增删
    icon: 'M12 3v18 M4 8h4 M4 16h4 M16 8h4 M16 16h4',
    Component: RichTextExample,
  },
  {
    key: '日历日程',
    prio: 'P2',
    brief: '多色事件块叠加与周视图密集文字',
    // 日历格：日期与事件
    icon: 'M4 6h16v15H4z M4 10.5h16 M8 3v4 M16 3v4 M8 14h2 M14 14h2 M8 17.5h2',
    Component: CalendarExample,
  },
  {
    key: '营销定价页',
    prio: 'P2',
    brief: '大标题 / CTA / 卡片栅格同色系对比度',
    // 价签：定价与转化
    icon: 'M3.5 12 12 3.5h7.5V11L11 19.5z M16.2 7.8h.01',
    Component: PricingExample,
  },
]

export const EXAMPLE_MAP: Record<string, ExamplePageDef> = Object.fromEntries(
  EXAMPLE_PAGES.map((p) => [p.key, p]),
)
