import { useState } from 'react'
import { ExampleShell, ExSection, type ExamplePageProps } from './shell'
import '../../styles/examples-p2.css'

type Cate = 'accent' | 'ok' | 'warn' | 'danger' | 'info' | 'queued'

interface CalEvent {
  title: string
  cate: Cate
}

/** 事件类别：六种语义色只做「左竖条 + 15% 底」，文字一律 text。 */
const CATES: { id: Cate; label: string; css: string }[] = [
  { id: 'accent', label: '主题发布', css: 'var(--tv-accent)' },
  { id: 'ok', label: '验收通过', css: 'var(--tv-ok)' },
  { id: 'warn', label: '对比度告警', css: 'var(--tv-warn)' },
  { id: 'danger', label: '契约阻断', css: 'var(--tv-danger)' },
  { id: 'info', label: '评审会议', css: 'var(--tv-info)' },
  { id: 'queued', label: '排队等待', css: 'var(--tv-queued)' },
]

const WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

/** 2026-10：10 月 1 日为周四，前置 9 月 28–30，共 5 行 35 格。 */
const YEAR = 2026
const MONTH = 10
const FIRST_COL = 3
const DAYS_IN_MONTH = 31
const TODAY = 22

interface Cell {
  day: number
  inMonth: boolean
}

const CELLS: Cell[] = Array.from({ length: 35 }, (_, i) => {
  const n = i - FIRST_COL + 1
  if (n < 1) return { day: 27 + n, inMonth: false }
  if (n > DAYS_IN_MONTH) return { day: n - DAYS_IN_MONTH, inMonth: false }
  return { day: n, inMonth: true }
})

const MONTH_EVENTS: Record<number, CalEvent[]> = {
  1: [
    { title: 'catppuccin 家族复核', cate: 'info' },
    { title: 'INDEX 重生成', cate: 'queued' },
  ],
  2: [{ title: 'text 对 bg 4.9:1', cate: 'ok' }],
  5: [
    { title: 'opensquilla #041 发布', cate: 'accent' },
    { title: 'syntax-title 越界', cate: 'warn' },
  ],
  6: [{ title: 'queue: 6 套待入库', cate: 'queued' }],
  7: [
    { title: 'ergemd 继承层核对', cate: 'ok' },
    { title: 'missing required 角色', cate: 'danger' },
    { title: '周会 · 主题资产', cate: 'info' },
  ],
  8: [{ title: 'AA 4.5 回归扫描', cate: 'warn' }],
  9: [{ title: '#052 预览刷新', cate: 'accent' }],
  12: [
    { title: 'vscode 家族抽取', cate: 'queued' },
    { title: 'contract.json v3', cate: 'info' },
  ],
  13: [{ title: 'palette.md 结构校验', cate: 'ok' }],
  14: [{ title: 'dark 方案 text-dim 2.9:1', cate: 'danger' }],
  15: [
    { title: 'catppuccin mocha 发布', cate: 'accent' },
    { title: '预览页 AA 徽标复核', cate: 'ok' },
  ],
  16: [{ title: '跨家族色相对比', cate: 'info' }],
  19: [
    { title: '#061 入库验收', cate: 'ok' },
    { title: 'derive 角色越界', cate: 'danger' },
  ],
  20: [
    { title: 'themeVars 兜底链回归', cate: 'warn' },
    { title: 'queue 队列 3 项', cate: 'queued' },
  ],
  21: [{ title: 'ok / warn 同屏对比', cate: 'info' }],
  22: [
    { title: 'P2 示例页联调',
      cate: 'accent' },
    { title: 'diff 语义色复查', cate: 'ok' },
    { title: '定价页对比度 4.4:1', cate: 'warn' },
  ],
  23: [{ title: 'ergemd 三方案验收', cate: 'ok' }],
  26: [
    { title: '#070 归档', cate: 'queued' },
    { title: '家族 README 同步', cate: 'info' },
  ],
  27: [{ title: 'syntax 系列只做词法', cate: 'warn' }],
  28: [{ title: '季度色板审计', cate: 'info' }],
  29: [{ title: '区块令牌回归', cate: 'accent' }],
  30: [
    { title: '月度对比度报告', cate: 'ok' },
    { title: '2 套缺失 required', cate: 'danger' },
  ],
}

/** 周视图：2026-10-19（周一）至 10-25（周日），09:00–16:00 共 8 个时间槽。 */
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
const SLOT_H = 30

interface WeekEvent {
  col: number
  start: number
  span: number
  title: string
  meta: string
  cate: Cate
  /** 同一时间槽内的并排占位：l 左半 / r 右半 / 全宽。 */
  half?: 'l' | 'r'
}

const WEEK_EVENTS: WeekEvent[] = [
  {
    col: 0,
    start: 0,
    span: 3,
    title: '主题家族评审：opensquilla 22 套色板逐项过契约',
    meta: '09:00–12:00 · 会议室 A',
    cate: 'info',
  },
  { col: 1, start: 1, span: 2, title: 'diff 视图联调', meta: '10:00–12:00 · 桌面端', cate: 'accent' },
  { col: 2, start: 0, span: 1, title: 'AA 4.5 扫描', meta: '09:00 · 自动', cate: 'ok' },
  { col: 2, start: 4, span: 1, title: 'warn 阈值复核', meta: '13:00 · 手动', cate: 'warn' },
  { col: 3, start: 2, span: 2, title: '对比度告警处置', meta: '11:00–13:00', cate: 'warn', half: 'l' },
  { col: 3, start: 2, span: 2, title: '契约修订会', meta: '11:00–13:00', cate: 'info', half: 'r' },
  { col: 4, start: 5, span: 2, title: 'P2 三页联调', meta: '14:00–16:00', cate: 'accent' },
  { col: 5, start: 3, span: 1, title: '色板归档', meta: '12:00', cate: 'queued' },
  { col: 6, start: 6, span: 2, title: '周报与下周排期', meta: '15:00–17:00', cate: 'queued' },
]

/** 选中日 22 日的侧栏日程（与月视图事件块同源）。 */
const DAY_ITEMS: { time: string; title: string; place: string; cate: Cate }[] = [
  { time: '09:30', title: 'P2 示例页联调', place: '桌面端 · 富文本页', cate: 'accent' },
  { time: '11:00', title: 'diff 语义色复查', place: '代码评审 · 12 行', cate: 'ok' },
  { time: '14:00', title: '定价页对比度 4.4:1 待处置', place: 'Web · 定价区', cate: 'warn' },
  { time: '16:30', title: '三角色 token 缺口登记', place: 'docs/.ai · decision-log', cate: 'queued' },
]

function cateCss(id: Cate): string {
  return CATES.find((c) => c.id === id)?.css ?? 'var(--tv-accent)'
}

function Legend() {
  return (
    <div className="p2-lg">
      {CATES.map((c) => (
        <span className="p2-lg-item" key={c.id}>
          <i className="p2-lg-bar" style={{ background: c.css }} aria-hidden="true" />
          {c.label}
        </span>
      ))}
    </div>
  )
}

export default function CalendarExample({ ctx }: ExamplePageProps) {
  const [selected, setSelected] = useState<number>(TODAY)

  return (
    <ExampleShell
      meta={{
        title: '日历日程',
        desc: '多色事件块叠加、周视图密集文字——主题色相一偏，整块日历立刻变糊。',
        tag: '数据类',
        usage: '日程排期 · 内容日历 · 项目里程碑',
        points: [
          '六种语义色同屏时，事件块之间靠的是竖条不靠底色：底色统一 15% 混色几乎同灰度，3px 实色左竖条才是唯一稳定的区分编码。',
          '事件块内文字永远是 --tv-text，不跟随类别变色；一旦用类别色写字，浅底深字主题下 warn 与 ok 会同时掉到 3:1 以下。',
          '今天只用「accent 圆点 + 62% accent 描边」标记，不用实心 accent 铺格子，否则会被误读成「这格有强调事件」。',
          '周视图网格线不能和事件块底色打架：网格线走 border 的 40% 透明、且用虚线，事件块是实边；两者层级差必须一眼可辨。',
          '跨槽事件用绝对定位按 30px 槽高换算，重叠事件各占 50% 宽——不用 flex 挤压，避免文字被压成竖排。',
        ],
      }}
    >
      <div className="p2-cal">
        <div style={{ minWidth: 0 }}>
          <ExSection
            title="月视图"
            desc={
              YEAR + ' 年 ' + MONTH + ' 月 · 当前主题 #' + ctx.entry.theme.number + ' ' + ctx.entry.theme.displayName
            }
          >
            <div className="ex-sub">
              <div className="p2-month">
                {WEEKDAYS.map((w) => (
                  <div className="p2-cal-wd" key={w}>
                    {w}
                  </div>
                ))}
                {CELLS.map((cell, i) => {
                  const evs = cell.inMonth ? MONTH_EVENTS[cell.day] ?? [] : []
                  const isToday = cell.inMonth && cell.day === TODAY
                  const isSel = cell.inMonth && cell.day === selected
                  const cls =
                    'p2-day' +
                    (cell.inMonth ? '' : ' p2-out') +
                    (isToday ? ' p2-today' : '') +
                    (isSel ? ' p2-sel' : '')
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cls}
                      disabled={!cell.inMonth}
                      aria-pressed={isSel}
                      aria-label={
                        (cell.inMonth ? MONTH + ' 月 ' + cell.day + ' 日' : '非本月日期') +
                        '，' +
                        evs.length +
                        ' 个事件'
                      }
                      onClick={() => cell.inMonth && setSelected(cell.day)}
                    >
                      <span className="p2-day-num">
                        {cell.day}
                        {isToday && <i className="p2-day-dot" aria-hidden="true" />}
                      </span>
                      {evs.slice(0, 3).map((e, ei) => (
                        <span key={ei} className={'p2-ev p2-' + e.cate} title={e.title}>
                          {e.title}
                        </span>
                      ))}
                    </button>
                  )
                })}
              </div>
              <div className="p2-month-foot">
                <span className="ex-cap">今天 10 月 22 日 · 选中 {selected} 日</span>
                <span className="ex-cap" style={{ marginLeft: 'auto' }}>
                  每格最多 3 个事件块，超出折叠
                </span>
              </div>
            </div>
          </ExSection>
        </div>

        <div className="p2-cal-right">
          <ExSection title="事件类别" desc="竖条即类别">
            <div className="ex-sub">
              <Legend />
            </div>
          </ExSection>

          <ExSection title={'10 月 ' + selected + ' 日'} desc="当天日程">
            <div className="ex-sub">
              {selected === TODAY ? (
                <div className="p2-sched">
                  {DAY_ITEMS.map((it) => (
                    <div className="p2-sched-item" key={it.time}>
                      <span className="p2-sched-time">{it.time}</span>
                      <div style={{ minWidth: 0 }}>
                        <div className="p2-sched-title">{it.title}</div>
                        <div className="p2-sched-meta">
                          <i
                            className="p2-sched-dot"
                            style={{ background: cateCss(it.cate) }}
                            aria-hidden="true"
                          />
                          {it.place}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p2-sched">
                  {(MONTH_EVENTS[selected] ?? []).map((e) => (
                    <div className="p2-sched-item" key={e.title}>
                      <span className="p2-sched-time">全天</span>
                      <div style={{ minWidth: 0 }}>
                        <div className="p2-sched-title">{e.title}</div>
                        <div className="p2-sched-meta">
                          <i className="p2-sched-dot" style={{ background: cateCss(e.cate) }} aria-hidden="true" />
                          {CATES.find((c) => c.id === e.cate)?.label}
                        </div>
                      </div>
                    </div>
                  ))}
                  {(MONTH_EVENTS[selected] ?? []).length === 0 && (
                    <div className="p2-sched-empty">当天没有安排</div>
                  )}
                </div>
              )}
            </div>
          </ExSection>
        </div>
      </div>

      <ExSection title="周视图" desc="7 列 × 8 槽（09:00–16:00），含跨槽与重叠事件">
        <div className="p2-week-scroll">
          <div className="p2-week">
            <div className="p2-week-head">
              <div className="p2-week-hd" />
              {WEEKDAYS.map((w, i) => (
                <div className={'p2-week-hd' + (i === 3 ? ' p2-today' : '')} key={w}>
                  {w}
                  <span className="p2-week-hd-t">{19 + i}</span>
                </div>
              ))}
            </div>
            <div className="p2-week-body">
              <div className="p2-week-rail">
                {SLOTS.map((s) => (
                  <div className="p2-rail-time" key={s}>
                    {s}
                  </div>
                ))}
              </div>
              {WEEKDAYS.map((w, ci) => (
                <div className={'p2-week-col' + (ci === 3 ? ' p2-today' : '')} key={w}>
                  {SLOTS.map((s) => (
                    <span className="p2-slot" key={s} aria-hidden="true" />
                  ))}
                  {WEEK_EVENTS.filter((e) => e.col === ci).map((e, ei) => {
                    const style: Record<string, string | number> = {
                      top: e.start * SLOT_H + 2,
                      height: e.span * SLOT_H - 4,
                    }
                    const cls =
                      'p2-wev p2-' +
                      e.cate +
                      (e.half === 'l' ? ' p2-half-l' : e.half === 'r' ? ' p2-half-r' : '')
                    return (
                      <div className={cls} key={ci + '-' + ei} style={style} title={e.title + ' · ' + e.meta}>
                        <div className="p2-wev-title">{e.title}</div>
                        <div className="p2-wev-meta">{e.meta}</div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ex-bar" style={{ marginTop: 8 }}>
          <span className="ex-cap">跨槽事件：绝对定位，起止按 30px 槽高换算</span>
          <span className="ex-cap" style={{ marginLeft: 'auto' }}>
            重叠事件：同一槽内两列各占 50% 宽
          </span>
        </div>
      </ExSection>

      <ExSection title="密集文字压力测试" desc="超长标题 2 行截断，不撑破事件块">
        <div className="p2-clamp-demo">
          <div className="p2-ev p2-accent p2-wrap">
            <span className="p2-clamp2">
              主题家族评审：opensquilla 22 套色板逐项过契约，附 AA 对比度与越界角色清单
            </span>
          </div>
          <div className="p2-ev p2-warn p2-wrap p2-ev-tall">
            <span className="p2-clamp2">
              dark 方案 text-dim 对 bg 仅 2.94:1，需在 decision-log 登记豁免而不是悄悄改源值
            </span>
          </div>
          <div className="p2-ev p2-danger p2-wrap">
            <span className="p2-clamp2">
              #017 缺失 required 角色（ok / info / queued），触发契约阻断，禁止入库
            </span>
          </div>
        </div>
        <div className="p2-wdiff" style={{ marginTop: 8 }}>
          <span className="p2-wd-num">行高</span>
          <code>{'p2-ev.p2-clamp2 → -webkit-line-clamp: 2 + white-space: normal，高度由行数而非字符数决定'}</code>
        </div>
      </ExSection>
    </ExampleShell>
  )
}