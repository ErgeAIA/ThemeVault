import type { ComponentType } from 'react'
import type { ExamplePageProps } from './shell'
import AppearanceExample from './AppearanceExample'
import ChartsExample from './ChartsExample'
import StatesExample from './StatesExample'
import FormExample from './FormExample'
import DetailExample from './DetailExample'
import MessagesExample from './MessagesExample'
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
  Component: ComponentType<ExamplePageProps>
}

/**
 * 页面示例登记表：侧栏「页面示例」分组由它生成。
 * 顺序即展示顺序，按优先级 P0 → P1 → P2 排列；新增示例页只需在此追加一行。
 */
export const EXAMPLE_PAGES: ExamplePageDef[] = [
  { key: '外观设置页', prio: 'P0', brief: '色板 / 圆角 / 密度 / 字号即时生效', Component: AppearanceExample },
  { key: '图表专区', prio: 'P0', brief: '折线 / 柱 / 饼 / 热力的系列色区分度', Component: ChartsExample },
  { key: '状态页合集', prio: 'P0', brief: '空 / 404 / 500 / 骨架 / 离线 / 无权限', Component: StatesExample },
  { key: '表单状态穷举', prio: 'P1', brief: '校验错误 / 禁用 / 只读 / 多步 / 长下拉 / 拖拽', Component: FormExample },
  { key: '详情主从布局', prio: 'P1', brief: '列表 + 详情 + 抽屉同屏的边框与分隔层级', Component: DetailExample },
  { key: '消息会话界面', prio: 'P1', brief: '气泡 / 未读 / 时间轴 / 附件区在浅底的可读性', Component: MessagesExample },
  { key: '富文本 diff', prio: 'P2', brief: 'Markdown 预览与代码对比的语义色分工', Component: RichTextExample },
  { key: '日历日程', prio: 'P2', brief: '多色事件块叠加与周视图密集文字', Component: CalendarExample },
  { key: '营销定价页', prio: 'P2', brief: '大标题 / CTA / 卡片栅格同色系对比度', Component: PricingExample },
]

export const EXAMPLE_MAP: Record<string, ExamplePageDef> = Object.fromEntries(
  EXAMPLE_PAGES.map((p) => [p.key, p]),
)
