import { useState } from 'react'
import { ExampleShell, ExSection, ExFrame, type ExamplePageProps } from './shell'
import '../../styles/examples-p2.css'

type View = 'md' | 'diff' | 'split'

const VIEWS: { id: View; label: string }[] = [
  { id: 'md', label: 'Markdown 预览' },
  { id: 'diff', label: '源码对比' },
  { id: 'split', label: '渲染 + 源并排' },
]

/** 代码块词法角色：只映射到 --tv-syn-*，不吃语义色。 */
type Tok = [string, string]

const CODE: Tok[][] = [
  [['p2-tk-com', '// themeVars() 只做角色回退，不发明新色值']],
  [
    ['p2-tk-kw', 'const'],
    ['p2-tk-var', ' FALLBACK'],
    ['p2-tk-op', ' = '],
    ['p2-tk-str', "['bg', 'text', 'accent', 'ok']"],
  ],
  [],
  [
    ['p2-tk-kw', 'export function '],
    ['p2-tk-fn', 'themeVars'],
    ['p2-tk-op', '('],
    ['p2-tk-var', 'entry'],
    ['p2-tk-op', ': '],
    ['p2-tk-type', 'ThemeEntry'],
    ['p2-tk-op', ', gap = '],
    ['p2-tk-num', '12'],
    ['p2-tk-op', ') {'],
  ],
  [
    ['p2-tk-kw', '  const '],
    ['p2-tk-var', 'pick'],
    ['p2-tk-op', ' = (role: '],
    ['p2-tk-type', 'string'],
    ['p2-tk-op', ') => '],
    ['p2-tk-fn', 'l1Value'],
    ['p2-tk-op', '('],
    ['p2-tk-var', 'entry'],
    ['p2-tk-op', ', '],
    ['p2-tk-var', 'role'],
    ['p2-tk-op', ') ?? '],
    ['p2-tk-str', "'transparent'"],
  ],
  [
    ['p2-tk-kw', '  return '],
    ['p2-tk-var', 'FALLBACK'],
    ['p2-tk-op', '.'],
    ['p2-tk-fn', 'reduce'],
    ['p2-tk-op', '((acc, role) => ({ ...acc, [role]: '],
    ['p2-tk-fn', 'pick'],
    ['p2-tk-op', '(role) }), {})'],
  ],
  [['p2-tk-op', '}']],
]

type RowKind = 'ctx' | 'add' | 'del'

interface DiffRow {
  kind: RowKind
  oldNo: number | null
  newNo: number | null
  code: string
}

interface Hunk {
  header: string
  rows: DiffRow[]
}

const HUNKS: Hunk[] = [
  {
    header: '@@ -12,6 +12,8 @@ export function themeVars(entry: ThemeEntry)',
    rows: [
      { kind: 'ctx', oldNo: 12, newNo: 12, code: "  const bg = first('bg') ?? surface" },
      { kind: 'del', oldNo: 13, newNo: null, code: "  const accent = first('accent') ?? surface2" },
      { kind: 'add', oldNo: null, newNo: 13, code: "  const accent = first('accent') ?? entry.theme.brand.color" },
      { kind: 'ctx', oldNo: 14, newNo: 14, code: "  const text = first('text') ?? muted" },
      { kind: 'add', oldNo: null, newNo: 15, code: "  const ok = first('ok', 'success', 'info', 'accent')" },
      { kind: 'ctx', oldNo: 15, newNo: 16, code: "  const danger = first('danger', 'error', 'accent')" },
    ],
  },
  {
    header: '@@ -28,4 +30,5 @@ 语法角色回退',
    rows: [
      { kind: 'ctx', oldNo: 28, newNo: 30, code: '  return {' },
      { kind: 'del', oldNo: 29, newNo: null, code: "    '--tv-syn-title': accent," },
      { kind: 'add', oldNo: null, newNo: 31, code: "    '--tv-syn-title': first('syntax-title') ?? accent," },
      { kind: 'add', oldNo: null, newNo: 32, code: "    '--tv-syn-function': first('syntax-function') ?? accent," },
      { kind: 'ctx', oldNo: 30, newNo: 33, code: '  }' },
    ],
  },
  {
    header: '@@ -41,3 +45,4 @@ 结构令牌',
    rows: [
      { kind: 'ctx', oldNo: 41, newNo: 45, code: "  '--tv-queued': first('queued') ?? info," },
      { kind: 'del', oldNo: 42, newNo: null, code: "  '--tv-radius': '12px'," },
      {
        kind: 'add',
        oldNo: null,
        newNo: 46,
        code: "  '--tv-radius': entry.theme.structuralNote?.includes('radius-none') ? '0px' : '12px',",
      },
      { kind: 'ctx', oldNo: 43, newNo: 47, code: '}' },
    ],
  },
]

/** 语法色板：10 个词法角色，各自对应一个 --tv-syn-* 变量。 */
const SYN_ROLES: { label: string; css: string }[] = [
  { label: 'comment', css: 'var(--tv-syn-comment)' },
  { label: 'keyword', css: 'var(--tv-syn-keyword)' },
  { label: 'string', css: 'var(--tv-syn-string)' },
  { label: 'literal', css: 'var(--tv-syn-literal)' },
  { label: 'title', css: 'var(--tv-syn-title)' },
  { label: 'attr', css: 'var(--tv-syn-attr)' },
  { label: 'function', css: 'var(--tv-syn-function)' },
  { label: 'variable', css: 'var(--tv-syn-variable)' },
  { label: 'type', css: 'var(--tv-syn-type)' },
  { label: 'operator', css: 'var(--tv-syn-operator)' },
]

const MD_ROWS: { role: string; value: string; note: string }[] = [
  { role: 'bg', value: '--tv-bg', note: '页面底，正文对比 12.4:1' },
  { role: 'text', value: '--tv-text', note: '正文 / 引用 / 代码行文字' },
  { role: 'accent', value: '--tv-accent', note: '链接 / 行内码 / 列表标记' },
  { role: 'border', value: '--tv-border', note: 'h1 下边线 / 表格分隔' },
]

const SOURCE_LINES = [
  '# 主题接入指南',
  '',
  '本文说明一套主题从 \`palette.md\` 走到项目里的完整路径。',
  '所有步骤都以 **契约** 为准，不以截图为准。',
  '',
  '## 一、读取契约',
  '',
  '每个家族在 \`_source/contract.json\` 声明 required 与',
  'derivedOptional 角色；越界角色视为违规。',
  '',
  '> 契约是唯一事实源。',
  '',
  '### 取值优先级',
  '',
  '- L1 角色直接命中',
  '- 家族映射命中',
  '- 落到 themeVars() 兜底链',
]

function MarkdownDoc() {
  return (
    <div className="p2-md">
      <h1>主题接入指南</h1>
      <p>
        本文说明一套主题从 <code className="p2-md-code">palette.md</code> 走到项目里的完整路径。
        所有步骤都以 <strong>契约</strong> 为准，不以截图为准。
      </p>
      <h2>一、读取契约</h2>
      <p>
        每个家族在 <code className="p2-md-code">_source/contract.json</code> 声明 required 与
        derivedOptional 角色；越界角色视为违规，缺失 required 视为阻断。
      </p>
      <blockquote className="p2-md-quote">
        <p>契约是唯一事实源。色板可以重生成，契约不能随手改。</p>
      </blockquote>
      <h3>取值优先级</h3>
      <ul className="p2-md-list">
        <li>
          L1 角色直接命中：取 <code className="p2-md-code">tokens[role]</code>
        </li>
        <li>
          家族映射命中：按 <code className="p2-md-code">l1RoleMap</code> 转到原生角色
        </li>
        <li>
          全部落空：走 <code className="p2-md-code">themeVars()</code> 的兜底链
        </li>
      </ul>
      <pre className="p2-code">
        <code>
          {CODE.map((line, li) => (
            <span key={li} className="p2-src-line">
              {line.length === 0 ? ' ' : null}
              {line.map(([cls, text], ti) => (
                <span key={ti} className={cls}>
                  {text}
                </span>
              ))}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
      <h3>对比度门槛</h3>
      <p>
        文本角色对 bg 的对比度需达到 <strong>AA 4.5:1</strong>；标红不等于要改值，只代表如实记录。
        完整清单见 <a className="p2-md-link" href="#contrast">INDEX.json 的 textContrast 字段</a>。
      </p>
      <table className="tbl">
        <thead>
          <tr>
            <th>角色</th>
            <th>取值来源</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {MD_ROWS.map((r) => (
            <tr key={r.role}>
              <td className="td-name">{r.role}</td>
              <td className="td-num ex-mono">{r.value}</td>
              <td className="td-dim">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="p2-md-hr" />
      <p className="ex-cap">文档版本 2026-10 · 适用 contract.json v3</p>
    </div>
  )
}

function DiffView() {
  return (
    <div className="p2-diff" role="table" aria-label="源码对比">
      <div className="p2-diff-head">
        <span className="ex-mono">src/data/tv.ts</span>
        <span className="st ok">+3</span>
        <span className="st danger">-3</span>
        <span style={{ marginLeft: 'auto' }}>3 个 hunk · 逐行</span>
      </div>
      {HUNKS.map((h) => (
        <div key={h.header} role="rowgroup">
          <div className="p2-diff-hunk">{h.header}</div>
          {h.rows.map((r, i) => (
            <div key={h.header + i} className={'p2-diff-row p2-' + r.kind} role="row">
              <span className="p2-diff-num">{r.oldNo ?? ''}</span>
              <span className="p2-diff-num">{r.newNo ?? ''}</span>
              <span className="p2-diff-sign" aria-hidden="true">
                {r.kind === 'add' ? '+' : r.kind === 'del' ? '−' : ' '}
              </span>
              <pre className="p2-diff-code">{r.code}</pre>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function RichTextExample({ ctx }: ExamplePageProps) {
  const [view, setView] = useState<View>('md')

  return (
    <ExampleShell
      meta={{
        title: '富文本 diff',
        desc: 'Markdown 预览与代码比对同屏，检验 syntax 系列与语义色各自的责任边界。',
        tag: '内容类',
        usage: '文档预览 · 代码评审 · 变更对比',
        points: [
          'Markdown 手工渲染不引库：标题层级只靠字号与间距，h1 用 border 下边线收口，不用强调色铺标题，否则换主题后整页泛色。',
          '行内码与代码块共用 surface-2 底但分工不同：行内码取 accent 文字做「可读/可点」提示，代码块取 syntax-* 做词法着色，二者不得互相借用。',
          'diff 的文字色不能用语义色，否则整块发红/发绿不可读——语义只落 ok / danger 的 12% 底与 3px 左竖条，行文字始终 --tv-text。',
          '词级改动用「底色 + 删除线」双编码，不只靠红绿区分；红绿色弱主题下删除线是唯一还成立的信号。',
          'syntax 系列不参与语义，10 色只表达词法角色；成功 / 失败 / 待办一律走 ok / warn / danger，混用会让代码块变成状态栏。',
        ],
      }}
    >
      <ExSection
        title="三视图切换"
        desc={'当前主题 #' + ctx.entry.theme.number + ' ' + ctx.entry.theme.displayName}
        extra={
          <div className="tabs">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={'tab' + (view === v.id ? ' on' : '')}
                aria-pressed={view === v.id}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        }
      >
        {view === 'md' && (
          <ExFrame title="docs/migration-guide.md">
            <div className="p2-pane p2-pane-scroll">
              <MarkdownDoc />
            </div>
          </ExFrame>
        )}

        {view === 'diff' && (
          <div className="p2-pane p2-pane-scroll">
            <DiffView />
          </div>
        )}

        {view === 'split' && (
          <div className="ex-grid2">
            <ExFrame title="渲染结果">
              <div className="p2-pane p2-pane-scroll">
                <MarkdownDoc />
              </div>
            </ExFrame>
            <ExFrame title="源码">
              <div className="p2-pane p2-pane-scroll p2-src ex-mono">
                {SOURCE_LINES.map((line, i) => (
                  <span className="p2-src-line" key={i}>
                    <span className="p2-src-no">{i + 1}</span>
                    {line === '' ? ' ' : line}
                  </span>
                ))}
              </div>
            </ExFrame>
          </div>
        )}
      </ExSection>

      <ExSection title="行内 diff（词级）" desc="改动词用 12% 底高亮，行文字仍是 text">
        <div className="p2-wdiff">
          <span className="p2-wd-num">13</span>
          <code>
            {"  const accent = first('accent') ?? "}
            <span className="p2-wd-del">'transparent'</span>
            <span className="p2-wd-sep"> → </span>
            <span className="p2-wd-add">entry.theme.brand.color</span>
          </code>
        </div>
        <div className="p2-wdiff" style={{ marginTop: 8 }}>
          <span className="p2-wd-num">46</span>
          <code>
            {"  '--tv-radius': "}
            <span className="p2-wd-del">'12px'</span>
            <span className="p2-wd-sep"> → </span>
            <span className="p2-wd-add">
              {"structuralNote?.includes('radius-none') ? '0px' : '12px'"}
            </span>
          </code>
        </div>
      </ExSection>

      <ExSection title="语法色板 10 色" desc="syntax 系列只表达词法角色，不参与状态语义">
        <div className="p2-synpal">
          {SYN_ROLES.map((s) => (
            <div className="p2-syn-cell" key={s.label}>
              <span className="p2-syn-sw" style={{ background: s.css }} aria-hidden="true" />
              <span className="p2-syn-name">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="alert info" style={{ marginTop: 10, marginBottom: 0 }}>
          <span aria-hidden="true">i</span>
          <div className="alert-body">
            <b>syntax 系列不参与语义，不得用于状态</b>
            <span>
              代码块里出现 ok / danger 只表示「这段是新增 / 删除」，不表示「这段代码对 / 错」。
              状态一律走 .st 徽章与 .alert，二者不可互换。
            </span>
          </div>
        </div>
      </ExSection>
    </ExampleShell>
  )
}