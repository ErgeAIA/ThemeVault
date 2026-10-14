import { useState, type CSSProperties, type ReactNode } from 'react'
import { fgFor, themeVars, type ThemeEntry } from '../data/tv'

// 侧栏导航（结构参考 xieyi examples#sidebar，纯 CSS + --tv-* 变量实现）
const NAV: { group: string; items: { label: string; icon: string; badge?: number }[] }[] = [
  {
    group: '工作台',
    items: [
      { label: '概览', icon: '◈' },
      { label: '数据分析', icon: '▲' },
    ],
  },
  {
    group: '内容',
    items: [
      { label: '组件', icon: '▣', badge: 28 },
      { label: '示例', icon: '✦', badge: 52 },
      { label: '资源', icon: '❏' },
    ],
  },
  {
    group: '系统',
    items: [
      { label: '设置', icon: '⚙' },
      { label: '成员', icon: '◉' },
    ],
  },
]

const PAGE_DESC: Record<string, string> = {
  概览: '管理 ThemeVault 的主题资产与适配流程',
  数据分析: '主题使用量与下载趋势洞察',
  组件: '管理组件资产与发布流程',
  示例: '页面级布局示例与使用场景',
  资源: '精选外部资源与工具链',
  设置: '站点偏好与账户安全',
  成员: '协作成员与权限管理',
}

const STATS = [
  { label: '主题总数', value: '152', delta: '+4 本周', up: true },
  { label: '本月下载', value: '405,091', delta: '+12.5%', up: true },
  { label: '待审核', value: '2', delta: '-1 较昨日', up: false },
  { label: '平均构建', value: '3.65 分', delta: '-8.3%', up: true },
]

const ROWS = [
  { name: 'Button 按钮', cat: '输入', status: '已发布', time: '2 小时前' },
  { name: 'Dialog 对话框', cat: '浮层', status: '已发布', time: '昨天' },
  { name: 'Accordion 手风琴', cat: '导航', status: '审核中', time: '3 天前' },
  { name: 'Calendar 日历', cat: '数据展示', status: '草稿', time: '上周' },
  { name: 'DataTable 数据表', cat: '数据展示', status: '已发布', time: '上周' },
]

const TABS = ['全部', '已发布', '审核中'] as const

const ST_TONE: Record<string, 'ok' | 'warn' | 'dim'> = {
  已发布: 'ok',
  审核中: 'warn',
  草稿: 'dim',
}

const CODE = `import { themeVars } from '@themevault/core'

// 一行换肤：把主题角色写进 CSS 变量
export function applyTheme(theme) {
  const vars = themeVars(theme)
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v)   // --tv-bg / --tv-accent ...
  }
  return { ok: true, theme: theme.number }
}`

const TOKEN_RE = /(\/\/.*$)|('[^']*')|(`[^`]*`)|\b(import|from|export|function|const|for|of|return|true|false)\b|\b(\d+(?:\.\d+)?)\b/gm

function highlightCode(code: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  for (const m of code.matchAll(TOKEN_RE)) {
    const i = m.index ?? 0
    if (i > last) out.push(code.slice(last, i))
    const cls = m[1] || m[2] || m[3] ? 'c' : m[4] ? 'k' : 'l'
    out.push(
      <span key={key++} className={`tk-${cls}`}>
        {m[0]}
      </span>,
    )
    last = i + m[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

const FEED = [
  { who: '李雷', act: '评审了 ember 主题', note: 'accent-foreground 近黑文字在浅底达 AA，建议同步 dark 变体', time: '10:24' },
  { who: '韩梅梅', act: '推送了新分支 feat/on-dark', note: '', time: '09:41' },
  { who: '张伟', act: '发起了适配评审', note: 'opencode 家族驼峰角色经 l1RoleMap 解析正常', time: '昨天' },
]

export default function AppSim({ entry }: { entry: ThemeEntry }) {
  const [current, setCurrent] = useState('概览')
  const [collapsed, setCollapsed] = useState(false)
  const [tab, setTab] = useState<(typeof TABS)[number]>('全部')
  const [notify, setNotify] = useState(true)
  const [emailUp, setEmailUp] = useState(true)
  const [pushUp, setPushUp] = useState(false)
  const [volume, setVolume] = useState(64)
  const [showInfo, setShowInfo] = useState(true)
  const [showWarn, setShowWarn] = useState(true)

  const vars = themeVars(entry) as unknown as CSSProperties
  const rows = ROWS.filter((r) => tab === '全部' || r.status === tab)
  const accentFg = entry.theme.tokens['accent-foreground'] ?? fgFor(entry.theme.brand?.color ?? '#888888')
  const avatar = { background: 'var(--tv-accent)', color: accentFg }

  return (
    <div className="sim" style={vars}>
      <div className="sim-shell">
        {/* 侧边栏 */}
        <aside className={`sim-side${collapsed ? ' collapsed' : ''}`}>
          <div className="sim-brand">
            {collapsed ? (
              <span className="sim-brand-mark" style={avatar}>
                T
              </span>
            ) : (
              <>
                <span className="sim-brand-name">ThemeVault</span>
                <span className="sim-badge">v0.1</span>
              </>
            )}
          </div>
          <nav className="sim-nav">
            {NAV.map((g) => (
              <div key={g.group} className="sim-nav-group">
                {!collapsed && <div className="sim-nav-title">{g.group}</div>}
                {g.items.map((it) => (
                  <button
                    key={it.label}
                    className={`sim-nav-item${current === it.label ? ' on' : ''}`}
                    onClick={() => setCurrent(it.label)}
                    title={it.label}
                  >
                    <span className="sim-nav-icon">{it.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="sim-nav-label">{it.label}</span>
                        {it.badge != null && <span className="sim-nav-badge">{it.badge}</span>}
                      </>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sim-user">
            <span className="sim-avatar" style={avatar}>
              二
            </span>
            {!collapsed && (
              <>
                <div className="sim-user-meta">
                  <div className="sim-user-name">二哥</div>
                  <div className="sim-user-role">管理员</div>
                </div>
                <span className="sim-user-gear">⚙</span>
              </>
            )}
          </div>
        </aside>

        {/* 主区 */}
        <div className="sim-main">
          <header className="sim-top">
            <button
              className="sim-icon-btn"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
            >
              ☰
            </button>
            <div className="sim-crumb">
              <span>首页</span>
              <span className="sim-crumb-sep">/</span>
              <span className="sim-crumb-cur">{current}</span>
            </div>
            <div className="sim-top-right">
              <input className="sim-search" placeholder="搜索… ⌘K" />
              <button className="sim-icon-btn sim-bell" aria-label="通知">
                ✉<i className="sim-dot" />
              </button>
              <span className="sim-avatar sm" style={avatar}>
                二
              </span>
            </div>
          </header>

          <div className="sim-content">
            {/* 页头 */}
            <div className="sim-pagehead">
              <div>
                <h2>{current === '概览' ? '主题管理' : current}</h2>
                <p>{PAGE_DESC[current] ?? ''}</p>
              </div>
              <button className="btn primary">＋ 新建主题</button>
            </div>

            {/* 指标卡 */}
            <div className="sim-stats">
              {STATS.map((s) => (
                <div className="p stat" key={s.label}>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className={`stat-delta ${s.up ? 'up' : 'down'}`}>{s.delta}</div>
                </div>
              ))}
            </div>

            <div className="sim-grid">
              {/* 表格卡 */}
              <div className="p span2">
                <div className="p-head">
                  <div>
                    <h3>最近组件</h3>
                    <p>按更新时间排序</p>
                  </div>
                  <div className="tabs">
                    {TABS.map((t) => (
                      <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>组件</th>
                      <th>分类</th>
                      <th>状态</th>
                      <th>更新时间</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.name}>
                        <td className="td-name">{r.name}</td>
                        <td className="td-dim">{r.cat}</td>
                        <td>
                          <span className={`st ${ST_TONE[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="td-dim">{r.time}</td>
                        <td className="td-act">
                          <button className="linkbtn">编辑</button>
                          <button className="linkbtn danger">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rows.length === 0 && <div className="p-empty">该状态下暂无组件</div>}
              </div>

              {/* 表单卡 */}
              <div className="p">
                <div className="p-head">
                  <div>
                    <h3>偏好设置</h3>
                    <p>表单控件即时生效</p>
                  </div>
                </div>
                <div className="form">
                  <label className="field">
                    <span>昵称</span>
                    <input className="input" defaultValue="二哥" />
                  </label>
                  <label className="field">
                    <span>角色</span>
                    <select className="input select" defaultValue="designer">
                      <option value="designer">designer</option>
                      <option value="developer">developer</option>
                      <option value="admin">admin</option>
                    </select>
                  </label>
                  <div className="field row">
                    <span>接收通知</span>
                    <button
                      className={`switch${notify ? ' on' : ''}`}
                      role="switch"
                      aria-checked={notify}
                      onClick={() => setNotify((v) => !v)}
                    >
                      <i />
                    </button>
                  </div>
                  <label className="check">
                    <input type="checkbox" checked={emailUp} onChange={(e) => setEmailUp(e.target.checked)} />
                    邮件通知（组件评审与发布提醒）
                  </label>
                  <label className="check">
                    <input type="checkbox" checked={pushUp} onChange={(e) => setPushUp(e.target.checked)} />
                    浏览器推送（实时消息）
                  </label>
                  <label className="field">
                    <span>音量 {volume}%</span>
                    <input
                      type="range"
                      className="slider"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                    />
                  </label>
                  <div className="form-foot">
                    <button className="btn ghost">取消</button>
                    <button className="btn primary">保存更改</button>
                  </div>
                </div>
              </div>

              {/* 反馈卡 */}
              <div className="p">
                <div className="p-head">
                  <div>
                    <h3>反馈与状态</h3>
                    <p>Alert / Progress / 按钮与徽章</p>
                  </div>
                </div>
                {showInfo && (
                  <div className="alert info">
                    <div className="alert-body">
                      <b>发布完成</b>
                      <span>「ThemeVault v0.1」已发布，示例与文档已同步更新。</span>
                    </div>
                    <button className="alert-x" onClick={() => setShowInfo(false)} aria-label="关闭">
                      ×
                    </button>
                  </div>
                )}
                {showWarn && (
                  <div className="alert warn">
                    <div className="alert-body">
                      <b>注意：即将达到存储上限</b>
                      <span>当前空间已使用 92%，建议清理历史版本后继续上传。</span>
                    </div>
                    <button className="alert-x" onClick={() => setShowWarn(false)} aria-label="关闭">
                      ×
                    </button>
                  </div>
                )}
                <div className="prog-block">
                  <div className="prog-head">
                    <span>上传文件</span>
                    <span className="td-dim">64%</span>
                  </div>
                  <div className="prog">
                    <i style={{ width: `${volume}%` }} />
                  </div>
                </div>
                <div className="btnrow">
                  <button className="btn primary">主要</button>
                  <button className="btn ghost">幽灵</button>
                  <button className="btn danger">危险</button>
                </div>
                <div className="chips">
                  <span className="st ok">通过</span>
                  <span className="st warn">审核中</span>
                  <span className="st danger">失败</span>
                  <span className="st info">信息</span>
                  <span className="st dim">草稿</span>
                </div>
              </div>

              {/* 代码卡 */}
              <div className="p">
                <div className="p-head">
                  <div>
                    <h3>语法高亮</h3>
                    <p>取自主题 syntax-* 角色</p>
                  </div>
                  <span className="sim-badge">TS</span>
                </div>
                <pre className="code">
                  <code>{highlightCode(CODE)}</code>
                </pre>
              </div>

              {/* 动态流卡 */}
              <div className="p">
                <div className="p-head">
                  <div>
                    <h3>最近动态</h3>
                    <p>团队协作流水</p>
                  </div>
                </div>
                <ul className="feed">
                  {FEED.map((f) => (
                    <li key={f.who + f.time}>
                      <span className="sim-avatar sm" style={avatar}>
                        {f.who[0]}
                      </span>
                      <div className="feed-body">
                        <div className="feed-head">
                          <b>{f.who}</b> {f.act}
                          <time>{f.time}</time>
                        </div>
                        {f.note && <div className="feed-note">{f.note}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
