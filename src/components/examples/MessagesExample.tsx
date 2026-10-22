import { useState } from 'react'
import { ExampleShell, ExSection, ExFrame, type ExamplePageProps } from './shell'
import '../../styles/examples-p1.css'

interface Conv {
  id: string
  name: string
  initials: string
  time: string
  preview: string
  unread: number
}

const CONVS: Conv[] = [
  { id: 'c1', name: 'openquilla 维护者', initials: 'OQ', time: '14:32', preview: 'syntax-operator 这个角色要不要进 required？', unread: 3 },
  { id: 'c2', name: 'catppuccin 同步组', initials: 'CC', time: '13:08', preview: 'mocha 与 macchiato 的 border 差 2.1%', unread: 1 },
  { id: 'c3', name: 'ergemd 收录', initials: 'EG', time: '昨天', preview: 'aurora 的对比度 4.62，达标', unread: 0 },
  { id: 'c4', name: '契约评审', initials: 'CT', time: '昨天', preview: 'contract.json 的 derivedOptional 扩容到 6 个', unread: 0 },
  { id: 'c5', name: 'vscode 家族', initials: 'VS', time: '周一', preview: 'dark-plus 的 token 名沿用原生词表', unread: 0 },
  { id: 'c6', name: '入库流水线', initials: 'CI', time: '10月18日', preview: 'gen_index.py --write 退出码 0', unread: 0 },
]

const THREADS: Record<string, { me: boolean; text?: string; time: string; quote?: string; att?: { name: string; size: string } }[]> = {
  c1: [
    { me: false, text: '刚看了 #048 的 palette.md，syntax-operator 现在是用 fallback 顶的。', time: '14:20' },
    { me: true, text: '对，源主题没有独立 operator 值。按 ADR-0008 应当在备注列标「契约兜底·同 syntax-punctuation」。', time: '14:24' },
    {
      me: false,
      text: '那我在契约里把它从 required 挪到 derivedOptional？',
      time: '14:26',
      quote: '契约兜底·同 syntax-punctuation',
    },
    { me: false, text: '顺带把 extract.json 补上，机械抽取的结果要能回溯到 _source 原文。', time: '14:32', att: { name: 'contract-048-draft.json', size: '3.1 KB' } },
  ],
  c2: [
    { me: false, text: 'mocha 和 macchiato 的 border 只差 2.1%，背景几乎同级。', time: '13:02' },
    { me: true, text: '这个差异在 half-screen 布局里看不出来，但换主题时能感知到。别改源值。', time: '13:05' },
    { me: false, text: '明白，只在 README 的迁移备注里记一笔。', time: '13:08' },
  ],
  c3: [
    { me: true, text: 'aurora 的 textOnBg 4.62，刚过 AA 线，会标黄还是标红？', time: '昨天 10:11' },
    { me: false, text: '≥ 4.5 就通过，4.62 标绿。阈值守卫只管下限，不设「太接近」的警告。', time: '昨天 10:14' },
    { me: true, text: 'OK，那 #046 直接进预览。', time: '昨天 10:15' },
  ],
  c4: [
    { me: false, text: 'derivedOptional 从 4 个扩到 6 个，新增 syntax-operator 与 syntax-punctuation。', time: '昨天 09:20' },
    { me: true, text: '老主题要回填吗？', time: '昨天 09:22' },
    { me: false, text: '不用，缺省走 contract 兜底，palette.md 不改。', time: '昨天 09:31' },
  ],
  c5: [
    { me: true, text: 'vscode 家族走原生词表，L1 映射表要单列吗？', time: '周一 16:40' },
    { me: false, text: '要。README 里给一张 vscode → L1 的对照，别塞进契约。', time: '周一 16:44' },
    { me: true, text: '收到。', time: '周一 16:45' },
  ],
  c6: [
    { me: false, text: '本批 4 套主题已生成 INDEX.json，退出码 0，missing=0 out=0。', time: '10月18日 11:02' },
    { me: true, text: 'preview 刷新能看到吗？', time: '10月18日 11:05' },
    { me: false, text: '能，data.js 已同步，SPA 直接读。', time: '10月18日 11:06' },
  ],
}

function IconAttach() {
  return (
    <svg className="p1-ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 6" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11" />
      <path d="M7 11l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  )
}

export default function MessagesExample({ ctx }: ExamplePageProps) {
  const { entry } = ctx
  const [active, setActive] = useState('c1')
  const [draft, setDraft] = useState('')
  const conv = CONVS.find((c) => c.id === active)!
  const thread = THREADS[active] ?? []
  const canSend = draft.trim().length > 0

  return (
    <ExampleShell
      meta={{
        title: '消息会话界面',
        desc: '气泡、未读、时间轴与附件输入区在同主题下的可读性，重点压测浅色方案。',
        tag: '会话类',
        usage: '评审讨论 · 入库通知 · 家族协作',
        points: [
          '自己发的气泡用 accent 底 + accent-fg 文字，这是全套页面里唯一「大色块承字」的位置；accent 是给描边和小面积标记设计的，拿来整块承字会立刻暴露对比度缺口——本仓库 151 套主题里可测的 62 套有 18 套 accent/accent-fg 低于 4.5:1，最差的 #149 dracula 只有 1.30:1。',
          '对方气泡用 surface-2 底 + text 色，绝不跟随 accent；两边都用色块会让「谁说的」只能靠左右方向判断，长会话里方向感会失效。',
          '未读计数同样压在 accent 底上，且只有 10px——它是全页最小的可读文本，浅色方案下最先糊的就是它；未读点本身不带文字，可以继续用 accent，计数则必须回到 accent-fg 的实测结果。',
          '时间轴只画一条居中 hairline（color-mix border 34%），日期文字压在上面而不是留缺口：留缺口在窄屏会因为换行把线撑断。',
          '输入区的发送按钮在空 draft 时禁用，但必须保留 accent 底（降到 55% 混合）而不是换成灰：按钮位置不变、形状不变，用户才不会以为按钮消失了。',
        ],
      }}
    >
      <ExSection
        title="会话 + 消息流"
        desc="左侧选中会话，右侧气泡与输入区随之切换"
        extra={<span className="ex-cap">#{entry.theme.number} · {entry.theme.scheme}</span>}
      >
        <div className="p1-chat">
          <div className="p1-convs">
            <div className="p1-convs-hd">
              <b>会话</b>
              <span className="ex-cap">4 条未读</span>
            </div>
            {CONVS.map((c) => {
              const on = c.id === active
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`p1-conv${on ? ' on' : ''}`}
                  aria-current={on}
                  onClick={() => setActive(c.id)}
                >
                  <span className="p1-av">{c.initials}</span>
                  <span className="p1-conv-body">
                    <span className="p1-conv-top">
                      <span className="p1-conv-name">{c.name}</span>
                      <span className="p1-conv-time">{c.time}</span>
                    </span>
                    <span className="p1-conv-prev">
                      {c.unread > 0 && <i className="p1-undot" aria-hidden="true" />}
                      <span>{c.preview}</span>
                    </span>
                  </span>
                  {c.unread > 0 && <span className="p1-unread">{c.unread}</span>}
                </button>
              )
            })}
          </div>

          <div className="p1-thread">
            <div className="p1-thread-hd">
              <span className="p1-av">{conv.initials}</span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span className="p1-thread-title">{conv.name}</span>
                <span className="ex-cap" style={{ display: 'block' }}>
                  {conv.unread > 0 ? `${conv.unread} 条未读 · ` : ''}主题资产讨论
                </span>
              </span>
              <span className="ex-cap" style={{ marginLeft: 'auto' }}>在线</span>
            </div>

            <div className="p1-msgs">
              <div className="p1-day">
                <i aria-hidden="true" />
                <span>10月21日</span>
                <i aria-hidden="true" />
              </div>

              {thread.map((m, i) => (
                <div className={`p1-msg${m.me ? ' me' : ''}`} key={i}>
                  {m.me && <span className="p1-msg-time">{m.time}</span>}
                  <div className={`p1-bubble ${m.me ? 'me' : 'other'}`}>
                    {m.quote && (
                      <div className="p1-quote">
                        <span className="p1-quote-label">引用 · palette.md 备注</span>
                        <span className="p1-quote-body">{m.quote}</span>
                      </div>
                    )}
                    {m.text && <span>{m.text}</span>}
                    {m.att && (
                      <div className="p1-att">
                        <span className="p1-file-ico">
                          <IconDownload />
                        </span>
                        <span className="p1-att-meta">
                          <span className="p1-att-name">{m.att.name}</span>
                          <span className="p1-att-size">{m.att.size} · JSON</span>
                        </span>
                      </div>
                    )}
                  </div>
                  {!m.me && <span className="p1-msg-time">{m.time}</span>}
                </div>
              ))}

              <div className="p1-msg">
                <div className="p1-bubble other p1-typing" aria-label="对方正在输入">
                  <i /><i /><i />
                </div>
                <span className="p1-msg-time">正在输入…</span>
              </div>
            </div>

            <div className="p1-composer">
              <div className="p1-composer-row">
                <button type="button" className="p1-ico-btn" aria-label="添加附件">
                  <IconAttach />
                </button>
                <input
                  className="input p1-input-msg"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="回复 #048 的契约变更——例如：syntax-operator 移入 derivedOptional 后，palette.md 备注列需同步"
                />
                <button type="button" className="btn primary sm-btn p1-send" disabled={!canSend}>
                  发送
                </button>
              </div>
              <span className="ex-cap" style={{ display: 'block', marginTop: 6 }}>
                {canSend ? '可发送：已有内容，Enter 直接发出' : '已禁用：draft 为空时按钮仍保留 accent 底与位置，只降低饱和度'}
              </span>
            </div>
          </div>
        </div>
      </ExSection>

      <div className="p1-cols">
        <ExSection title="气泡对照" desc="同一句文案在三种底色下的可读性">
          <div className="ex-sub">
            <div className="p1-msg" style={{ marginBottom: 10 }}>
              <div className="p1-bubble me">accent 底 + accent-fg：自己发的消息</div>
            </div>
            <div className="p1-msg" style={{ marginBottom: 10 }}>
              <div className="p1-bubble other">surface-2 底 + text：对方消息</div>
            </div>
            <div className="p1-msg">
              <div className="p1-bubble other">
                <div className="p1-quote">引用块在 surface-2 上再降一档，靠左竖线定位来源</div>
              </div>
            </div>
          </div>
        </ExSection>

        <ExSection title="输入区状态" desc="空 draft / 有 draft / 禁用附件">
          <ExFrame title="composer">
            <div className="p1-composer" style={{ borderTop: 'none', padding: 0 }}>
              <div className="p1-composer-row">
                <button type="button" className="p1-ico-btn" aria-label="添加附件">
                  <IconAttach />
                </button>
                <input className="input p1-input-msg" placeholder="空 draft：发送按钮禁用" />
                <button type="button" className="btn primary sm-btn p1-send" disabled>
                  发送
                </button>
              </div>
              <div className="p1-composer-row" style={{ marginTop: 8 }}>
                <button type="button" className="p1-ico-btn" aria-label="添加附件">
                  <IconAttach />
                </button>
                <input className="input p1-input-msg" defaultValue="已输入内容" />
                <button type="button" className="btn primary sm-btn">
                  发送
                </button>
              </div>
              <span className="ex-cap" style={{ display: 'block', marginTop: 8 }}>
                accent-fg 是对比风险最高的一处。实测（本仓库可测的 62 套）：#149 dracula 1.30 : 1、#51 rose-pine 2.60 : 1、#50 everforest 2.69 : 1，均低于 AA 4.5。工作台只如实展示，不在渲染层「修正」源值。
              </span>
            </div>
          </ExFrame>
        </ExSection>
      </div>
    </ExampleShell>
  )
}
