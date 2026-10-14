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

const USER = { name: '宝藏二哥AIA', initial: '宝', role: '管理员' }

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

const MORE_ROWS = [
  { name: 'Button 按钮', cat: '输入', status: '已发布', ver: 'v1.4.0', time: '2 小时前' },
  { name: 'Input 输入框', cat: '输入', status: '已发布', ver: 'v1.2.3', time: '昨天' },
  { name: 'Select 下拉选择', cat: '输入', status: '已发布', ver: 'v1.1.0', time: '昨天' },
  { name: 'Dialog 对话框', cat: '浮层', status: '已发布', ver: 'v2.0.1', time: '2 天前' },
  { name: 'Tabs 标签页', cat: '导航', status: '审核中', ver: 'v0.9.2', time: '3 天前' },
  { name: 'Accordion 手风琴', cat: '导航', status: '审核中', ver: 'v0.8.0', time: '3 天前' },
  { name: 'Calendar 日历', cat: '数据展示', status: '草稿', ver: 'v0.3.1', time: '上周' },
  { name: 'DataTable 数据表', cat: '数据展示', status: '已发布', ver: 'v1.5.2', time: '上周' },
  { name: 'Tooltip 文字提示', cat: '浮层', status: '草稿', ver: 'v0.2.0', time: '2 周前' },
]

const TABS = ['全部', '已发布', '审核中'] as const

const ST_TONE: Record<string, 'ok' | 'warn' | 'dim' | 'info'> = {
  已发布: 'ok',
  审核中: 'warn',
  草稿: 'dim',
  布局类: 'info',
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

// ===== 复用小件 =====

function Avatar({ entry, sm }: { entry: ThemeEntry; sm?: boolean }) {
  const accentFg =
    entry.theme.tokens['accent-foreground'] ?? fgFor(entry.theme.brand?.color ?? '#888888')
  return (
    <span
      className={`sim-avatar${sm ? ' sm' : ''}`}
      style={{ background: 'var(--tv-accent)', color: accentFg }}
    >
      {USER.initial}
    </span>
  )
}

function PageHead({ title, desc, action }: { title: string; desc: string; action?: string }) {
  return (
    <div className="sim-pagehead">
      <div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      {action && <button className="btn primary">＋ {action}</button>}
    </div>
  )
}

function CardHead({ title, desc, extra }: { title: string; desc?: string; extra?: ReactNode }) {
  return (
    <div className="p-head">
      <div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
      {extra}
    </div>
  )
}

// ===== 概览 =====

function Overview() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('全部')
  const [notify, setNotify] = useState(true)
  const [emailUp, setEmailUp] = useState(true)
  const [pushUp, setPushUp] = useState(false)
  const [volume, setVolume] = useState(64)
  const [showInfo, setShowInfo] = useState(true)
  const [showWarn, setShowWarn] = useState(true)

  const rows = ROWS.filter((r) => tab === '全部' || r.status === tab)

  return (
    <>
      <PageHead title="主题管理" desc="管理 ThemeVault 的主题资产与适配流程" action="新建主题" />

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
        <div className="p span2">
          <CardHead
            title="最近组件"
            desc="按更新时间排序"
            extra={
              <div className="tabs">
                {TABS.map((t) => (
                  <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>
                    {t}
                  </button>
                ))}
              </div>
            }
          />
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

        <div className="p">
          <CardHead title="偏好设置" desc="表单控件即时生效" />
          <div className="form">
            <label className="field">
              <span>昵称</span>
              <input className="input" defaultValue={USER.name} />
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

        <div className="p">
          <CardHead title="反馈与状态" desc="Alert / Progress / 按钮与徽章" />
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

        <div className="p">
          <CardHead title="语法高亮" desc="取自主题 syntax-* 角色" extra={<span className="sim-badge">TS</span>} />
          <pre className="code">
            <code>{highlightCode(CODE)}</code>
          </pre>
        </div>

        <div className="p">
          <CardHead title="最近动态" desc="团队协作流水" />
          <ul className="feed">
            {FEED.map((f) => (
              <li key={f.who + f.time}>
                <span className="sim-avatar sm">{f.who[0]}</span>
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
    </>
  )
}

// ===== 数据分析 =====

function Analytics() {
  const bars = [
    { m: '5月', v: 62 },
    { m: '6月', v: 78 },
    { m: '7月', v: 45 },
    { m: '8月', v: 91 },
    { m: '9月', v: 73 },
    { m: '10月', v: 96 },
  ]
  const top = [
    { name: 'ember', fam: 'opensquilla', dl: '52,304' },
    { name: 'arctic', fam: 'opensquilla', dl: '38,120' },
    { name: 'kanagawa-dragon', fam: 'kanagawa', dl: '29,547' },
    { name: 'frappe', fam: 'catppuccin', dl: '21,093' },
    { name: 'warm-brown', fam: 'onepage', dl: '14,382' },
  ]
  const dist = [
    { fam: 'opencode', n: 46, pct: 30 },
    { fam: 'opensquilla', n: 8, pct: 18 },
    { fam: 'catppuccin', n: 26, pct: 14 },
    { fam: 'onepage', n: 22, pct: 12 },
  ]
  return (
    <>
      <PageHead title="数据分析" desc="主题使用量与下载趋势洞察" action="导出报表" />
      <div className="sim-stats">
        <div className="p stat">
          <div className="stat-label">本月下载</div>
          <div className="stat-value">405,091</div>
          <div className="stat-delta up">+12.5%</div>
        </div>
        <div className="p stat">
          <div className="stat-label">月活跃访客</div>
          <div className="stat-value">12,878</div>
          <div className="stat-delta down">-4.5%</div>
        </div>
        <div className="p stat">
          <div className="stat-label">适配项目</div>
          <div className="stat-value">23</div>
          <div className="stat-delta up">+3 本月</div>
        </div>
        <div className="p stat">
          <div className="stat-label">示例完成率</div>
          <div className="stat-value">98.5%</div>
          <div className="stat-delta up">+1.2%</div>
        </div>
      </div>
      <div className="sim-grid">
        <div className="p span2">
          <CardHead title="下载趋势" desc="近 6 个月（示意）" extra={<span className="sim-badge">月度</span>} />
          <div className="bars">
            {bars.map((b) => (
              <div className="bar-col" key={b.m}>
                <i style={{ height: `${b.v}%` }} title={`${b.m}：${b.v}%`} />
                <span>{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p">
          <CardHead title="热门主题" desc="按本月下载排序" />
          <table className="tbl">
            <thead>
              <tr>
                <th>主题</th>
                <th>家族</th>
                <th className="td-num">下载</th>
              </tr>
            </thead>
            <tbody>
              {top.map((t) => (
                <tr key={t.name}>
                  <td className="td-name">{t.name}</td>
                  <td className="td-dim">{t.fam}</td>
                  <td className="td-num">{t.dl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p">
          <CardHead title="家族分布" desc="主题数量占比" />
          {dist.map((d) => (
            <div className="dist-row" key={d.fam}>
              <div className="dist-head">
                <span className="td-name">{d.fam}</span>
                <span className="td-dim">
                  {d.n} 套 · {d.pct}%
                </span>
              </div>
              <div className="prog slim">
                <i style={{ width: `${d.pct}%`, background: 'var(--tv-accent)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ===== 组件 =====

function ComponentsPage() {
  const [q, setQ] = useState('')
  const rows = MORE_ROWS.filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <>
      <PageHead title="组件管理" desc="管理 ThemeVault 的组件资产与发布流程" action="新建组件" />
      <div className="p span2">
        <CardHead
          title="全部组件"
          desc={`共 ${rows.length} 个（示意数据）`}
          extra={<input className="input sim-search-lg" placeholder="搜索组件…" value={q} onChange={(e) => setQ(e.target.value)} />}
        />
        <table className="tbl">
          <thead>
            <tr>
              <th>组件</th>
              <th>分类</th>
              <th>状态</th>
              <th>版本</th>
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
                <td className="td-dim">{r.ver}</td>
                <td className="td-dim">{r.time}</td>
                <td className="td-act">
                  <button className="linkbtn">编辑</button>
                  <button className="linkbtn danger">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="p-empty">没有匹配「{q}」的组件</div>}
      </div>
    </>
  )
}

// ===== 示例 =====

const EXAMPLES = [
  { title: '侧边栏布局', desc: '左侧分组导航 + 顶栏 + 内容区', tag: '布局类', usage: '管理后台 / 工作台' },
  { title: '数据面板', desc: '指标卡 + 趋势图 + 动态流', tag: '布局类', usage: 'SaaS 指标页' },
  { title: '综合表单页', desc: '输入/下拉/开关/上传，含必填与错误态', tag: '表单类', usage: '账户设置' },
  { title: '数据列表管理', desc: '搜索 + 表格 + 删除确认', tag: '列表类', usage: '后台管理' },
  { title: '看板', desc: '待办 / 进行中 / 已完成三列', tag: '布局类', usage: '项目看板' },
  { title: '登录 / 注册页', desc: 'Tab 切换的认证卡片', tag: '认证类', usage: '产品入口' },
]

function ExamplesPage() {
  return (
    <>
      <PageHead title="示例" desc="页面级布局示例与使用场景" action="新建示例" />
      <div className="ex-grid">
        {EXAMPLES.map((e) => (
          <div className="p ex-card" key={e.title}>
            <span className={`st ${ST_TONE[e.tag]}`}>{e.tag}</span>
            <h4>{e.title}</h4>
            <p className="ex-desc">{e.desc}</p>
            <div className="ex-foot">
              <span className="td-dim">{e.usage}</span>
              <button className="linkbtn">查看</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ===== 资源 =====

const RESOURCES = [
  { name: 'shadcn/ui', desc: '可复制粘贴的 React 组件集合，与本站示例风格同源', cat: '组件库' },
  { name: 'Tailwind CSS', desc: '原子化 CSS 框架，快速落地主题变量映射', cat: '样式' },
  { name: 'Base UI', desc: '无样式的可访问原语，适合深度自定义换肤', cat: '原语' },
  { name: 'Lucide Icons', desc: '开源图标库，侧栏/按钮图标首选', cat: '图标' },
  { name: 'Framer Motion', desc: 'React 动画库，页面切换与微交互', cat: '动画' },
  { name: 'Vercel AI SDK', desc: 'AI 应用开发工具链，配合主题生成流程', cat: 'AI' },
]

function ResourcesPage() {
  return (
    <>
      <PageHead title="资源" desc="精选外部资源与工具链" />
      <div className="sim-grid">
        <div className="p span2">
          <CardHead title="推荐资源" desc="点击打开外部站点" />
          {RESOURCES.map((r) => (
            <div className="res-row" key={r.name}>
              <span className="res-icon">❏</span>
              <div className="res-body">
                <div className="res-name">
                  {r.name} <span className="sim-badge">{r.cat}</span>
                </div>
                <div className="res-desc">{r.desc}</div>
              </div>
              <button className="btn ghost sm-btn">打开</button>
            </div>
          ))}
        </div>
        <div className="p">
          <CardHead title="分类" desc="按用途筛选" />
          <div className="chips">
            {['全部', '组件库', '样式', '原语', '图标', '动画', 'AI'].map((c, i) => (
              <button key={c} className={`chip${i === 0 ? ' on' : ''}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="p">
          <CardHead title="贡献资源" desc="发现好工具？提交收录" />
          <div className="form">
            <label className="field">
              <span>资源链接</span>
              <input className="input" placeholder="https://…" />
            </label>
            <label className="field">
              <span>一句话理由</span>
              <input className="input" placeholder="它解决了什么问题" />
            </label>
            <div className="form-foot">
              <button className="btn primary">提交</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ===== 设置 =====

function SettingsPage() {
  const [autoDark, setAutoDark] = useState(true)
  const [twoFa, setTwoFa] = useState(false)
  return (
    <>
      <PageHead title="设置" desc="站点偏好与账户安全" />
      <div className="sim-grid">
        <div className="p">
          <CardHead title="个人资料" desc="展示在你的个人主页" />
          <div className="form">
            <label className="field">
              <span>昵称</span>
              <input className="input" defaultValue={USER.name} />
            </label>
            <label className="field">
              <span>署名</span>
              <input className="input" defaultValue="B站·宝藏二哥AIA" />
            </label>
            <label className="field">
              <span>主页</span>
              <input className="input" defaultValue="space.bilibili.com/67221461" />
            </label>
            <div className="form-foot">
              <button className="btn primary">保存更改</button>
            </div>
          </div>
        </div>
        <div className="p">
          <CardHead title="外观" desc="主题与语言偏好，即时生效" />
          <div className="form">
            <label className="field">
              <span>界面主题</span>
              <select className="input select" defaultValue="跟随主题">
                <option>跟随主题</option>
                <option>海选中已选主题</option>
              </select>
            </label>
            <label className="field">
              <span>语言</span>
              <select className="input select" defaultValue="简体中文">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </label>
            <div className="field row">
              <span>自动切换暗色</span>
              <button
                className={`switch${autoDark ? ' on' : ''}`}
                role="switch"
                aria-checked={autoDark}
                onClick={() => setAutoDark((v) => !v)}
              >
                <i />
              </button>
            </div>
          </div>
        </div>
        <div className="p">
          <CardHead title="安全" desc="登录设备与验证方式" />
          <div className="set-line">
            <span className="td-name">已登录设备</span>
            <span className="td-dim">3 台</span>
          </div>
          <div className="field row" style={{ margin: '12px 0' }}>
            <span>两步验证</span>
            <button
              className={`switch${twoFa ? ' on' : ''}`}
              role="switch"
              aria-checked={twoFa}
              onClick={() => setTwoFa((v) => !v)}
            >
              <i />
            </button>
          </div>
          <label className="field">
            <span>添加备用邮箱</span>
            <input className="input" placeholder="backup@example.com" />
          </label>
          <div className="form-foot">
            <button className="btn ghost">更新</button>
          </div>
        </div>
      </div>
    </>
  )
}

// ===== 成员 =====

const MEMBERS = [
  { name: '宝藏二哥AIA', role: '管理员', tone: 'ok' as const },
  { name: '李雷', role: '组件工程师', tone: 'info' as const },
  { name: '韩梅梅', role: '交互设计师', tone: 'info' as const },
  { name: '张伟', role: '内容运营', tone: 'dim' as const },
]

function MembersPage() {
  return (
    <>
      <PageHead title="成员" desc="协作成员与权限管理" action="邀请成员" />
      <div className="sim-grid">
        <div className="p span2">
          <CardHead title="全部成员" desc={`${MEMBERS.length} 位（示意数据）`} />
          {MEMBERS.map((m, i) => (
            <div className="member" key={m.name}>
              <span className="sim-avatar sm">{m.name[0]}</span>
              <div className="member-body">
                <div className="td-name">{m.name}</div>
                <div className="td-dim member-sub">{m.role}</div>
              </div>
              <span className={`st ${m.tone}`}>{i === 0 ? '所有者' : '成员'}</span>
              {i > 0 && <button className="linkbtn danger">移除</button>}
            </div>
          ))}
        </div>
        <div className="p">
          <CardHead title="邀请协作" desc="成员可评审、评论并接收版本通知" />
          <div className="form">
            <label className="field">
              <span>邮箱</span>
              <input className="input" placeholder="member@example.com" />
            </label>
            <label className="field">
              <span>角色</span>
              <select className="input select" defaultValue="成员">
                <option>成员</option>
                <option>评审者</option>
                <option>管理员</option>
              </select>
            </label>
            <div className="form-foot">
              <button className="btn primary">发送邀请</button>
            </div>
          </div>
        </div>
        <div className="p">
          <CardHead title="最近添加" desc="按时间排序" />
          <ul className="feed">
            {MEMBERS.slice(1).map((m) => (
              <li key={m.name}>
                <span className="sim-avatar sm">{m.name[0]}</span>
                <div className="feed-body">
                  <div className="feed-head">
                    <b>{m.name}</b> 加入了协作
                    <time>上周</time>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const PAGES: Record<string, () => ReactNode> = {
  概览: Overview,
  数据分析: Analytics,
  组件: ComponentsPage,
  示例: ExamplesPage,
  资源: ResourcesPage,
  设置: SettingsPage,
  成员: MembersPage,
}

export default function AppSim({ entry }: { entry: ThemeEntry }) {
  const [current, setCurrent] = useState('概览')
  const [collapsed, setCollapsed] = useState(false)

  const vars = themeVars(entry) as unknown as CSSProperties
  const Page = PAGES[current] ?? Overview

  return (
    <div className="sim" style={vars}>
      <div className="sim-shell">
        {/* 侧边栏 */}
        <aside className={`sim-side${collapsed ? ' collapsed' : ''}`}>
          <div className="sim-brand">
            {collapsed ? (
              <span className="sim-brand-mark">
                <Avatar entry={entry} sm />
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
            <Avatar entry={entry} />
            {!collapsed && (
              <>
                <div className="sim-user-meta">
                  <div className="sim-user-name">{USER.name}</div>
                  <div className="sim-user-role">{USER.role}</div>
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
              <Avatar entry={entry} sm />
            </div>
          </header>

          <div className="sim-content">
            <Page />
          </div>
        </div>
      </div>
    </div>
  )
}
