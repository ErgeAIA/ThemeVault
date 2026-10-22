import { useState } from 'react'
import { ExampleShell, ExSection, ExFrame, type ExamplePageProps } from './shell'

type Scene = 'empty' | 'error' | 'notfound' | 'loading' | 'offline' | 'forbidden'

const SCENES: { id: Scene; label: string; tone: string }[] = [
  { id: 'empty', label: '空状态', tone: 'info' },
  { id: 'error', label: '500 错误', tone: 'danger' },
  { id: 'notfound', label: '404 未找到', tone: 'warn' },
  { id: 'loading', label: '加载骨架', tone: 'dim' },
  { id: 'offline', label: '离线', tone: 'warn' },
  { id: 'forbidden', label: '无权限', tone: 'danger' },
]

function Glyph({ id }: { id: Scene }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (id === 'empty') {
    return (
      <svg {...common}>
        <path d="M3 7h18v12H3z" />
        <path d="M3 7l3-3h12l3 3" />
        <path d="M9 12h6" />
      </svg>
    )
  }
  if (id === 'error') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
    )
  }
  if (id === 'notfound') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4 4" />
        <path d="M9 11h4" />
      </svg>
    )
  }
  if (id === 'loading') {
    return (
      <svg {...common}>
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    )
  }
  if (id === 'offline') {
    return (
      <svg {...common}>
        <path d="M3 8.5a15 15 0 0 1 18 0" />
        <path d="M6.5 12.5a10 10 0 0 1 11 0" />
        <path d="M10 16.5a5 5 0 0 1 4 0" />
        <path d="M3 3l18 18" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export default function StatesExample({ ctx }: ExamplePageProps) {
  const [scene, setScene] = useState<Scene>('empty')

  const current = SCENES.find((s) => s.id === scene)!

  return (
    <ExampleShell
      meta={{
        title: '状态页合集',
        desc: '空状态、404 / 500、加载骨架、离线、无权限——主题在「几乎没有内容」时最容易被看穿。',
        tag: '状态类',
        usage: '异常兜底 · 首屏加载 · 权限拦截',
        points: [
          '每个状态页只有三件东西：图形区、一句主文案、一个可选动作。文案层级固定为 text → muted，禁止用强调色写正文。',
          '图形区一律用 currentColor 单色线条 SVG，颜色由外层 text 决定；换主题时图形自动跟随，不需要为每个状态准备配色。',
          '加载骨架用 surface-2 打底 + 一次透明度脉冲，脉冲只动透明度不动位置，避免在低刷新率下抖动。',
          '错误与无权限用 danger 语义色，但只落在图标与左侧边线上；主文案仍是 text 色，避免整页发红造成压迫。',
          '图标容器统一 56px 圆形，底色为语义色的 12% 混色——12% 是这套 token 下「看得见但不刺眼」的经验阈值。',
        ],
      }}
    >
      <ExSection title="切换状态" desc="侧栏图标同屏对比">
        <div className="ex-bar">
          {SCENES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip${scene === s.id ? ' on' : ''}`}
              onClick={() => setScene(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </ExSection>

      <div className="ex-split">
        <ExFrame title={`/ ${current.label}`}>
          <div className="ex-state">
            <span
              className={`ex-state-art ${current.tone === 'danger' ? 'danger' : current.tone === 'warn' ? 'warn' : current.tone === 'dim' ? 'dim' : 'info'}`}
            >
              {scene === 'loading' ? (
                <span className="ex-spin" aria-hidden="true" />
              ) : (
                <Glyph id={scene} />
              )}
            </span>
            <b className="ex-state-title">
              {scene === 'empty' && '还没有任何主题'}
              {scene === 'error' && '服务暂时不可用'}
              {scene === 'notfound' && '页面走丢了'}
              {scene === 'loading' && '正在加载主题…'}
              {scene === 'offline' && '当前处于离线状态'}
              {scene === 'forbidden' && '你没有访问权限'}
            </b>
            <p className="ex-state-desc">
              {scene === 'empty' && '导入第一套主题后，这里会显示它的色板与对比度报告。'}
              {scene === 'error' && '索引服务返回 500。稍后重试，或换个时间再试。'}
              {scene === 'notfound' && '链接可能已失效，也可能主题编号被重新编排过。'}
              {scene === 'loading' && '正在读取 INDEX.json 与 22 个家族的 palette.md。'}
              {scene === 'offline' && '网络中断。已缓存的 12 套主题仍可离线浏览。'}
              {scene === 'forbidden' && '该主题属于私有家族，需要管理员授权后才能查看。'}
            </p>
            <div className="ex-bar" style={{ marginTop: 14 }}>
              {scene === 'empty' && (
                <>
                  <button type="button" className="btn primary sm-btn">导入主题</button>
                  <button type="button" className="btn ghost sm-btn">查看文档</button>
                </>
              )}
              {scene === 'error' && (
                <>
                  <button type="button" className="btn primary sm-btn">重试</button>
                  <button type="button" className="btn ghost sm-btn">查看状态页</button>
                </>
              )}
              {scene === 'notfound' && (
                <>
                  <button type="button" className="btn primary sm-btn">回到首页</button>
                  <button type="button" className="btn ghost sm-btn">搜索主题</button>
                </>
              )}
              {scene === 'loading' && <span className="ex-cap">已加载 7 / 12</span>}
              {scene === 'offline' && (
                <>
                  <button type="button" className="btn primary sm-btn">重新连接</button>
                  <button type="button" className="btn ghost sm-btn">浏览缓存</button>
                </>
              )}
              {scene === 'forbidden' && (
                <>
                  <button type="button" className="btn primary sm-btn">申请权限</button>
                  <button type="button" className="btn ghost sm-btn">切换账号</button>
                </>
              )}
            </div>
          </div>
        </ExFrame>

        <div>
          <ExSection title="加载骨架" desc="列表占位，与真实行高一致">
            <div className="ex-sub">
              <div className="ex-skel" />
              <div className="ex-skel" style={{ width: '88%' }} />
              <div className="ex-skel" style={{ width: '94%' }} />
              <div className="ex-skel" style={{ width: '72%' }} />
              <div className="ex-bar" style={{ marginTop: 12, gap: 8 }}>
                <span className="ex-skel" style={{ width: 72, height: 26, borderRadius: 8 }} />
                <span className="ex-skel" style={{ width: 96, height: 26, borderRadius: 8 }} />
              </div>
            </div>
          </ExSection>

          <ExSection title="行内提示" desc="不打断流程的轻量状态">
            <div className="alert info" style={{ marginBottom: 8 }}>
              <span aria-hidden="true">i</span>
              <div className="alert-body">
                <b>索引已是最新</b>
                <span>上次生成于 2 分钟前</span>
              </div>
            </div>
            <div className="alert warn" style={{ marginBottom: 0 }}>
              <span aria-hidden="true">▲</span>
              <div className="alert-body">
                <b>3 套主题缺失 required 角色</b>
                <span>#017 / #021 / #024 需要补齐契约</span>
              </div>
            </div>
          </ExSection>
        </div>
      </div>

      <ExSection title="骨架与真实内容混排" desc="按 3 列网格，检验占位块与卡片底色是否同一层级">
        <div className="ex-grid3">
          {[0, 1, 2].map((i) => (
            <div className="ex-sub" key={i}>
              <div className="ex-bar" style={{ marginBottom: 10 }}>
                <span className="ex-skel" style={{ width: 30, height: 30, borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div className="ex-skel" style={{ width: '62%', marginBottom: 5 }} />
                  <div className="ex-skel" style={{ width: '40%', height: 8 }} />
                </div>
              </div>
              <div className="ex-skel" style={{ width: '96%' }} />
              <div className="ex-skel" style={{ width: '78%' }} />
            </div>
          ))}
        </div>
        <div className="ex-cap">主题号 {ctx.entry.theme.number} · 骨架用 surface-2，内容卡用 card，二者层级必须可辨</div>
      </ExSection>
    </ExampleShell>
  )
}
