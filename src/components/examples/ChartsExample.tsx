import { ExampleShell, ExSection, type ExamplePageProps } from './shell'

/** 系列色：只用既有语义变量，不新造色值。 */
const SERIES = [
  { key: 'accent', label: '主系列', css: 'var(--tv-accent)' },
  { key: 'accent2', label: '次系列', css: 'var(--tv-accent-2)' },
  { key: 'ok', label: '正向', css: 'var(--tv-ok)' },
  { key: 'warn', label: '预警', css: 'var(--tv-warn)' },
  { key: 'danger', label: '异常', css: 'var(--tv-danger)' },
  { key: 'info', label: '参考', css: 'var(--tv-info)' },
] as const

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']

// 三条折线的原始值（千次），刻意让它们在 5–6 月贴近，检验系列色区分度
const LINES: number[][] = [
  [32, 44, 39, 58, 61, 57, 72, 80],
  [22, 30, 34, 41, 58, 64, 66, 74],
  [12, 18, 15, 22, 28, 33, 39, 44],
]

const BARS: { label: string; a: number; b: number }[] = [
  { label: '桌面', a: 82, b: 61 },
  { label: '移动', a: 64, b: 71 },
  { label: '平板', a: 38, b: 44 },
  { label: '其它', a: 17, b: 12 },
]

const DONUT = [
  { label: '已发布', v: 58, css: 'var(--tv-ok)' },
  { label: '待复核', v: 21, css: 'var(--tv-warn)' },
  { label: '草稿', v: 13, css: 'var(--tv-dim)' },
  { label: '未达标', v: 8, css: 'var(--tv-danger)' },
]

const HEAT_ROWS = ['一', '二', '三', '四', '五']
const HEAT_COLS = ['00', '04', '08', '12', '16', '20']
const HEAT: number[][] = [
  [2, 1, 6, 9, 7, 3],
  [1, 2, 8, 9, 6, 2],
  [3, 1, 7, 8, 8, 4],
  [2, 2, 6, 9, 7, 3],
  [4, 3, 5, 6, 5, 5],
]

// viewBox 宽度取 960：容器约 1150px 时缩放 ≈1.2 倍，9.5 号字实际渲染 ≈11.5px，
// 既填满宽度又不会把坐标轴文字放大到失真。高度按 960:190 的比例留给容器自适应。
const W = 960
const H = 190
const PAD = { l: 34, r: 12, t: 12, b: 24 }

function scaleX(i: number, n: number) {
  return PAD.l + ((W - PAD.l - PAD.r) * i) / Math.max(1, n - 1)
}
function scaleY(v: number, max: number) {
  return H - PAD.b - ((H - PAD.t - PAD.b) * v) / max
}
function linePath(vals: number[], max: number) {
  return vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i, vals.length).toFixed(1)},${scaleY(v, max).toFixed(1)}`).join(' ')
}

export default function ChartsExample({ ctx }: ExamplePageProps) {
  const max = 90
  const gridVals = [0, 30, 60, 90]
  const donutTotal = DONUT.reduce((s, d) => s + d.v, 0)
  let acc = 0
  const R = 52
  const C = 2 * Math.PI * R

  return (
    <ExampleShell
      meta={{
        title: '图表专区',
        desc: '多系列折线 / 柱 / 饼 / 热的色板区分度，是主题最容易崩的地方。',
        tag: '数据类',
        usage: '数据分析看板 · 报表 · 监控大屏',
        points: [
          '系列色直接取语义 token（accent / accent-2 / ok / warn / danger / info），不生成任意 hex——主题换色时全部图表自动跟随。',
          '折线用「实线 + 图形点」双编码，柱用「实心 + 半透明」区分 A/B；深浅两套主题下都不能只靠色相区分。',
          '网格线与坐标轴走 border 的 55% 透明混色，永远比系列色轻一级，避免网格抢走数据注意力。',
          '热力图用 accent 的 8%–78% 透明度阶梯，而不是六种色相；单色相段位在 light 主题里不会互相污染。',
          '数值标签走 text / dim 两级，单位与量级一律 tabular-nums 对齐，避免切换主题后数字抖动。',
        ],
      }}
    >
      <ExSection title="多系列折线" desc={`当前主题 #${ctx.entry.theme.number} ${ctx.entry.theme.displayName}`}>
        <div className="ex-sub">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: 'block', maxHeight: 230 }}
            role="img"
            aria-label="三条系列折线"
          >
            {gridVals.map((g) => (
              <g key={g}>
                <line
                  x1={PAD.l}
                  x2={W - PAD.r}
                  y1={scaleY(g, max)}
                  y2={scaleY(g, max)}
                  stroke="color-mix(in srgb, var(--tv-border) 55%, transparent)"
                  strokeWidth="1"
                />
                <text x={PAD.l - 6} y={scaleY(g, max) + 3.5} textAnchor="end" fontSize="9.5" fill="var(--tv-dim)">
                  {g}
                </text>
              </g>
            ))}
            {MONTHS.map((m, i) => (
              <text key={m} x={scaleX(i, MONTHS.length)} y={H - 6} textAnchor="middle" fontSize="9.5" fill="var(--tv-dim)">
                {m}
              </text>
            ))}
            {LINES.map((vals, si) => (
              <g key={si}>
                <path
                  d={linePath(vals, max)}
                  fill="none"
                  stroke={SERIES[si].css}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {vals.map((v, i) => (
                  <circle key={i} cx={scaleX(i, vals.length)} cy={scaleY(v, max)} r="2.6" fill={SERIES[si].css} />
                ))}
              </g>
            ))}
          </svg>
          <div className="ex-bar" style={{ marginTop: 8 }}>
            {SERIES.slice(0, 3).map((s) => (
              <span key={s.key} className="ex-legend">
                <i style={{ background: s.css }} aria-hidden="true" />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </ExSection>

      <div className="ex-grid2">
        <ExSection title="分组柱状" desc="A/B 双系列">
          <div className="ex-sub">
            <div className="ex-bars" role="img" aria-label="分组柱状图">
              {BARS.map((b) => (
                <div className="ex-bar-col" key={b.label}>
                  <div className="ex-bar-pair">
                    <i style={{ height: `${b.a}%`, background: 'var(--tv-accent)' }} />
                    <i style={{ height: `${b.b}%`, background: 'color-mix(in srgb, var(--tv-accent) 42%, transparent)' }} />
                  </div>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            <div className="ex-bar" style={{ marginTop: 6 }}>
              <span className="ex-legend">
                <i style={{ background: 'var(--tv-accent)' }} aria-hidden="true" />
                本期
              </span>
              <span className="ex-legend">
                <i style={{ background: 'color-mix(in srgb, var(--tv-accent) 42%, transparent)' }} aria-hidden="true" />
                上期
              </span>
            </div>
          </div>
        </ExSection>

        <ExSection title="环形占比" desc="四分类">
          <div className="ex-sub ex-bar" style={{ gap: 16 }}>
            <svg viewBox="0 0 140 140" width="132" height="132" role="img" aria-label="环形占比图">
              <circle cx="70" cy="70" r={R} fill="none" stroke="var(--tv-surface-2)" strokeWidth="15" />
              {DONUT.map((d) => {
                const frac = d.v / donutTotal
                const dash = frac * C
                const off = acc * C
                acc += frac
                return (
                  <circle
                    key={d.label}
                    cx="70"
                    cy="70"
                    r={R}
                    fill="none"
                    stroke={d.css}
                    strokeWidth="15"
                    strokeDasharray={`${dash.toFixed(2)} ${(C - dash).toFixed(2)}`}
                    strokeDashoffset={(-off).toFixed(2)}
                    transform="rotate(-90 70 70)"
                  />
                )
              })}
              <text x="70" y="66" textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--tv-text)">
                {donutTotal}
              </text>
              <text x="70" y="82" textAnchor="middle" fontSize="9" fill="var(--tv-dim)">
                主题总数
              </text>
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              {DONUT.map((d) => (
                <div className="ex-kv" key={d.label}>
                  <dt>
                    <span className="ex-legend">
                      <i style={{ background: d.css }} aria-hidden="true" />
                      {d.label}
                    </span>
                  </dt>
                  <dd>
                    {d.v} · {Math.round((d.v / donutTotal) * 100)}%
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </ExSection>
      </div>

      <ExSection title="热力密度" desc="单色相透明度阶梯，不靠色相区分">
        <div className="ex-sub">
          <div className="ex-heat" role="img" aria-label="热力密度图">
            <div className="ex-heat-row ex-heat-head">
              <span className="ex-heat-axis" />
              {HEAT_COLS.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {HEAT_ROWS.map((r, ri) => (
              <div className="ex-heat-row" key={r}>
                <span className="ex-heat-axis">周{r}</span>
                {HEAT_COLS.map((c, ci) => {
                  const v = HEAT[ri][ci]
                  const a = 8 + (v / 9) * 70
                  return (
                    <span
                      key={c}
                      className="ex-heat-cell"
                      title={`周${r} ${c}:00 · ${v}`}
                      style={{ background: `color-mix(in srgb, var(--tv-accent) ${a.toFixed(0)}%, transparent)` }}
                    >
                      {v}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="ex-bar" style={{ marginTop: 10 }}>
            <span className="ex-cap">低</span>
            {[8, 23, 39, 54, 70, 78].map((a) => (
              <i
                key={a}
                className="ex-heat-legend"
                style={{ background: `color-mix(in srgb, var(--tv-accent) ${a}%, transparent)` }}
              />
            ))}
            <span className="ex-cap">高</span>
          </div>
        </div>
      </ExSection>

      <ExSection title="状态色带" desc="语义色用在数据上时的可读性">
        <div className="ex-sub ex-bar" style={{ gap: 10 }}>
          {SERIES.slice(2).map((s, i) => (
            <div key={s.key} className="ex-sub" style={{ flex: 1, padding: '10px 12px', background: 'var(--tv-surface)' }}>
              <div className="ex-cap">{s.label}</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: s.css, fontVariantNumeric: 'tabular-nums' }}>
                {[96.4, 88.1, 4.2, 61.7][i]}%
              </div>
              <div className="ex-mini-bar">
                <i style={{ width: `${[76, 58, 12, 44][i]}%`, background: s.css }} />
              </div>
            </div>
          ))}
        </div>
      </ExSection>
    </ExampleShell>
  )
}
