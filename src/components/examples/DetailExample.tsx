import { useState } from 'react'
import { ExampleShell, ExSection, type ExamplePageProps } from './shell'
import '../../styles/examples-p1.css'

type Tab = 'overview' | 'roles' | 'contrast'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: '概览' },
  { id: 'roles', label: '角色表' },
  { id: 'contrast', label: '对比度' },
]

const SEP_LEVELS = [
  { cls: 'l1', name: '面板边框', token: '--tv-border', use: '把「列表 / 详情 / 侧栏」切成三块，是唯一允许画实线的地方' },
  { cls: 'l2', name: '面板内分隔', token: 'color-mix(border 60%)', use: '详情内部的段与段之间，弱一档以免和面板边框抢' },
  { cls: 'l3', name: '行间 hairline', token: 'color-mix(border 34%)', use: '列表行与行、消息行与行，只做视觉索引不构成结构' },
]

export default function DetailExample({ ctx }: ExamplePageProps) {
  const { entry, allThemes } = ctx
  const [tab, setTab] = useState<Tab>('overview')
  const [drawer, setDrawer] = useState(false)

  const rows = allThemes.slice(0, 8)
  const [active, setActive] = useState(rows[0]?.theme.number ?? 1)
  const sel = rows.find((r) => r.theme.number === active) ?? rows[0]
  const selTheme = sel?.theme

  return (
    <ExampleShell
      meta={{
        title: '详情主从布局',
        desc: '列表 + 详情 + 抽屉同屏时，边框与分隔层级的克制程度，决定页面读起来是「分栏」还是「碎块」。',
        tag: '主从类',
        usage: '主题详情 · 契约查看 · 资产编辑',
        points: [
          '同一屏内只允许一种线承担「结构」——面板边框；其余全部降级为同色系的低透明度分隔，靠透明度差而不是靠换色区分层级。',
          '选中行用「accent 13% 底 + 左侧 3px accent 竖条」，竖条是 inset box-shadow 而不是 border-left：用 border 会让选中行横向位移 3px，列表在键盘上下移动时抖动。',
          '抽屉必须落在详情列自己的定位上下文里（position: absolute + 容器 overflow: hidden），不用 fixed 覆盖整页；示例页嵌在工作台里，fixed 会盖住顶栏与侧栏。',
          '抽屉与遮罩同时出现时，遮罩用 bg 的 55% 混合而不是黑色：light 方案下黑色遮罩会把详情文字压成一片脏灰，用方案自身的底色更稳。',
          '侧栏信息卡用 surface 底、详情区用 card 底、外框用 border：三级底色差在半屏宽时刚好可辨，再多一档就变成「每块都有边框」的噪音。',
        ],
      }}
    >
      <ExSection
        title="三栏同屏"
        desc="点击左侧行切换详情，抽屉只在详情列内滑出"
        extra={<span className="ex-cap">当前工作台主题 #{entry.theme.number} · {entry.theme.scheme}</span>}
      >
        <div className="p1-master">
          <div className="p1-list">
            <div className="p1-list-hd">
              <b>主题资产</b>
              <span className="ex-cap">{rows.length} / {allThemes.length}</span>
            </div>
            {rows.map((r) => {
              const on = r.theme.number === active
              return (
                <button
                  key={r.theme.number}
                  type="button"
                  className={`p1-li${on ? ' on' : ''}`}
                  aria-current={on}
                  onClick={() => setActive(r.theme.number)}
                >
                  <span className="p1-li-num">#{String(r.theme.number).padStart(3, '0')}</span>
                  <span className="p1-li-body">
                    <span className="p1-li-name">{r.theme.displayName}</span>
                    <span className="p1-li-meta">{r.fam.family} · {r.theme.scheme}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="p1-detail">
            <div className="p1-detail-inner">
              <div className="p1-detail-hd">
                <div style={{ minWidth: 0 }}>
                  <h4 className="p1-detail-title">
                    #{String(selTheme?.number ?? 1).padStart(3, '0')} {selTheme?.displayName}
                  </h4>
                  <div className="p1-detail-path">
                    themes/{sel?.fam.family}/{selTheme?.id}/palette.md
                  </div>
                </div>
                <button type="button" className="btn primary sm-btn" onClick={() => setDrawer(true)}>
                  打开抽屉
                </button>
              </div>

              <div className="tabs" style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tab${tab === t.id ? ' on' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 8 }}>
                {tab === 'overview' && (
                  <div>
                    <div className="ex-kv">
                      <dt>主题编号</dt>
                      <dd>#{String(selTheme?.number ?? 1).padStart(3, '0')}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>家族</dt>
                      <dd>{sel?.fam.family}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>协议</dt>
                      <dd>{selTheme?.license}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>色彩方案</dt>
                      <dd>{selTheme?.scheme}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>提取方式</dt>
                      <dd>机械抽取 + L1 映射</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>对比度 text/bg</dt>
                      <dd>{selTheme?.textContrast.textOnBg?.toFixed(2) ?? '—'} : 1</dd>
                    </div>
                  </div>
                )}
                {tab === 'roles' && (
                  <div className="ex-scroll" style={{ maxHeight: 214 }}>
                    {['bg', 'bg-surface', 'text', 'text-muted', 'accent', 'border', 'border-strong', 'syntax-keyword'].map((role) => (
                      <div className="ex-kv" key={role}>
                        <dt className="ex-mono">{role}</dt>
                        <dd style={{ color: 'var(--tv-dim)' }}>
                          {selTheme?.tokens[role] ? '已取值' : '契约兜底'}
                        </dd>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'contrast' && (
                  <div>
                    <div className="ex-kv">
                      <dt>text / bg</dt>
                      <dd>{selTheme?.textContrast.textOnBg?.toFixed(2) ?? '—'}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>text-muted / bg</dt>
                      <dd>{selTheme?.textContrast.textMutedOnBg?.toFixed(2) ?? '—'}</dd>
                    </div>
                    <div className="ex-kv">
                      <dt>text-dim / bg</dt>
                      <dd>{selTheme?.textContrast.textDimOnBg?.toFixed(2) ?? '—'}</dd>
                    </div>
                    <div className="p1-note" style={{ marginTop: 8 }}>
                      AA 正文阈值 4.5:1。dim 级低于阈值属于源主题事实，页面只如实展示，不在渲染层「修正」。
                    </div>
                  </div>
                )}
              </div>

              <p className="p1-detail-body">
                该主题由 <code className="ex-mono">{sel?.fam.family}</code> 家族机械抽取，required 角色全覆盖，
                derivedOptional 缺 2 个（syntax-operator / syntax-punctuation），回退到 dim 级中性色。
                修改左侧选中项时详情整体重绘，但抽屉状态保持，避免编辑到一半被切走。
              </p>

              <div className="ex-bar" style={{ marginTop: 'auto', paddingTop: 10 }}>
                <button type="button" className="btn ghost sm-btn">
                  查看 palette.md
                </button>
                <button type="button" className="btn ghost sm-btn" onClick={() => setDrawer(true)}>
                  编辑属性
                </button>
                <span className="ex-cap" style={{ marginLeft: 'auto' }}>
                  详情列 overflow: hidden
                </span>
              </div>
            </div>

            <div
              className={`p1-scrim${drawer ? ' on' : ''}`}
              onClick={() => setDrawer(false)}
              aria-hidden="true"
            />
            <aside className={`p1-drawer${drawer ? ' on' : ''}`} aria-hidden={!drawer} inert={!drawer}>
              <div className="p1-drawer-hd">
                <span>编辑 · 契约角色</span>
                <button type="button" className="linkbtn" onClick={() => setDrawer(false)}>
                  关闭
                </button>
              </div>
              <div className="p1-drawer-body">
                <label className="field">
                  <span>显示名</span>
                  <input className="input" defaultValue={selTheme?.displayName ?? ''} />
                </label>
                <label className="field">
                  <span>协议</span>
                  <select className="input select" defaultValue={selTheme?.license ?? 'MIT'}>
                    <option value="MIT">MIT</option>
                    <option value="Apache-2.0">Apache-2.0</option>
                    <option value="AGPL-3.0">AGPL-3.0</option>
                  </select>
                </label>
                <label className="field">
                  <span>对比度阈值</span>
                  <input className="input" defaultValue="4.5" />
                </label>
                <label className="check">
                  <input type="checkbox" defaultChecked />
                  允许 derivedOptional 回退到 dim
                </label>
                <span className="p1-note">
                  抽屉自身带 --tv-border-strong 左边框，比面板边框重一档，才能压在详情内容之上而不被当成另一栏。
                </span>
              </div>
              <div className="p1-drawer-foot">
                <button type="button" className="btn ghost sm-btn" onClick={() => setDrawer(false)}>
                  取消
                </button>
                <button type="button" className="btn primary sm-btn" onClick={() => setDrawer(false)}>
                  保存
                </button>
              </div>
            </aside>
          </div>

          <aside className="p1-side">
            <span className="p1-side-title">侧栏信息卡</span>
            <div className="ex-kv">
              <dt>家族</dt>
              <dd>{sel?.fam.family}</dd>
            </div>
            <div className="ex-kv">
              <dt>方案</dt>
              <dd>{selTheme?.scheme}</dd>
            </div>
            <div className="ex-kv">
              <dt>令牌数</dt>
              <dd>{selTheme?.tokenCount ?? '—'}</dd>
            </div>
            <div className="ex-kv">
              <dt>结构</dt>
              <dd>{selTheme?.structuralNote ?? '默认圆角'}</dd>
            </div>
            <div className="ex-kv">
              <dt>字体</dt>
              <dd>{selTheme?.fonts[0] ?? '—'}</dd>
            </div>
            <div className="p1-side-foot">
              侧栏用 surface 底、详情用 card 底：同一张卡片内部靠底色差分区，不再额外加边框。
            </div>
          </aside>
        </div>
      </ExSection>

      <ExSection title="分隔层级" desc="三层强度同屏对照，标注各自能画在哪">
        <div className="ex-sub">
          <div className="p1-sep-rows">
            {SEP_LEVELS.map((s) => (
              <div className="p1-sep-row" key={s.cls}>
                <span className="p1-sep-row-top">
                  <span className="p1-mini-title">{s.name}</span>
                  <span className={`p1-sep ${s.cls}`} />
                  <span className="ex-cap ex-mono">{s.token}</span>
                </span>
                <span className="ex-cap p1-sep-use">{s.use}</span>
              </div>
            ))}
          </div>
        </div>
      </ExSection>
    </ExampleShell>
  )
}
