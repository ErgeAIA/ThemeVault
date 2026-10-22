import { useState } from 'react'
import { ExampleShell, ExSection, ExFrame, type ExamplePageProps } from './shell'
import '../../styles/examples-p1.css'

type Scene = 'error' | 'disabled' | 'readonly' | 'steps' | 'select' | 'drop'

const SCENES: { id: Scene; label: string; hint: string }[] = [
  { id: 'error', label: '校验错误', hint: '红只出现在边框与图标' },
  { id: 'disabled', label: '禁用三件套', hint: '标签仍须读得清' },
  { id: 'readonly', label: '只读', hint: '与禁用必须可区分' },
  { id: 'steps', label: '多步表单', hint: '形状表达进度' },
  { id: 'select', label: '长下拉', hint: '锁宽 + 截断' },
  { id: 'drop', label: '文件拖拽', hint: '虚线用 border-strong' },
]

/** 主题资产的存在形式：编号 → 家族 → 契约角色。 */
const THEME_PICKER: { group: string; items: { num: string; name: string }[] }[] = [
  {
    group: 'opensquilla · 9 套',
    items: [
      { num: '#003', name: 'opensquilla/dark' },
      { num: '#004', name: 'opensquilla/light' },
      { num: '#005', name: 'opensquilla/arctic' },
      { num: '#006', name: 'opensquilla/ember' },
      { num: '#007', name: 'opensquilla/vapor' },
    ],
  },
  {
    group: 'catppuccin · 4 套',
    items: [
      { num: '#031', name: 'catppuccin/mocha' },
      { num: '#032', name: 'catppuccin/macchiato' },
      { num: '#033', name: 'catppuccin/frappe' },
      { num: '#034', name: 'catppuccin/latte' },
    ],
  },
  {
    group: 'ergemd · 14 套',
    items: [
      { num: '#046', name: 'ergemd/aurora' },
      { num: '#047', name: 'ergemd/cherry-blossom' },
      {
        num: '#048',
        name: 'ergemd/neon-cyberpunk-super-long-display-name',
      },
      { num: '#049', name: 'ergemd/solarized-light' },
      { num: '#050', name: 'ergemd/tokyo-night' },
      { num: '#051', name: 'ergemd/desert-sunset' },
      { num: '#052', name: 'ergemd/monochrome' },
    ],
  },
]

const STEPS = ['选择主题', '映射角色', '校验对比度']

const PICKED = [
  { name: 'themevault-palette-012-openquilla.md', size: '48.2 KB' },
  { name: 'contract.json', size: '3.1 KB' },
]

function IconAlert() {
  return (
    <svg className="p1-ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

function IconUpload() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export default function FormExample({ ctx }: ExamplePageProps) {
  const { entry } = ctx
  const [scene, setScene] = useState<Scene>('error')
  const [picked, setPicked] = useState('catppuccin/mocha')
  const [files, setFiles] = useState(PICKED)

  const current = SCENES.find((s) => s.id === scene)!

  return (
    <ExampleShell
      meta={{
        title: '表单状态穷举',
        desc: '校验、禁用、只读、多步、长下拉、拖拽六类表单状态同主题下的可读性与区分度。',
        tag: '表单类',
        usage: '主题入库 · 契约编辑 · 资产管理',
        points: [
          '错误色只允许落在输入框边框、前置图标和一行 11.5px 小字上，主文案与字段名永远是 --tv-text；整块铺红会让后面的字段被误读成正常。',
          '禁用态禁止用整体 opacity 压低——那会把标签一起抹掉；改为文字降到 --tv-dim、底色留在 surface-2，标签仍然念得出「对比度阈值」四个字。',
          '只读与禁用靠两个方向同时拉开：只读用 surface-2 底 + 正常文字色（内容可信），禁用再降一档文字色（不可操作），只靠灰度的单一差异在 light 方案下会失效。',
          '多步进度用形状（实心勾 / 空心描边 / 断线）承担状态，颜色只做辅助；否则 dark 方案里 accent 与 info 的色相差异会让已完成步与当前步撞车。',
          '文件拖拽区的虚线必须用 --tv-border-strong：light 方案下 --tv-border 与 surface 只差 3% 亮度，1px 虚线直接消失，这是最常被漏掉的一处。',
        ],
      }}
    >
      <ExSection title="当前演示" desc={current.hint} extra={<span className="ex-cap">#{entry.theme.number} · {entry.theme.scheme}</span>}>
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

      <div className="p1-cols">
        <div className="ex-sub">
          {scene === 'error' && (
            <ExSection title="校验错误" desc="两个字段失败，错误只降在边框与图标">
              <div className="alert warn">
                <IconAlert />
                <div className="alert-body">
                  <b>有 2 个字段需要修正</b>
                  <span>主题编号重复、对比度阈值超出 4.5–21 区间</span>
                </div>
              </div>
              <div className="form">
                <label className="field">
                  <span>主题编号</span>
                  <input className="input p1-input-err" defaultValue="#152" aria-invalid="true" />
                  <span className="p1-err-msg">
                    <IconAlert />
                    编号 #152 已被 catppuccin/mocha 占用
                  </span>
                </label>
                <label className="field">
                  <span>对比度阈值</span>
                  <input className="input p1-input-err" defaultValue="3.2" aria-invalid="true" />
                  <span className="p1-err-msg">
                    <IconAlert />
                    必须 ≥ 4.5（AA 正文阈值），当前 3.2
                  </span>
                </label>
                <label className="field">
                  <span>提取方式</span>
                  <input className="input" defaultValue="由 _source 机械抽取" />
                  <span className="ex-cap">该字段通过，边框保持 --tv-border</span>
                </label>
              </div>
              <div className="p1-quiet">
                <div className="p1-quiet-head">反例 · 错误态但不发红</div>
                <div className="form">
                  <label className="field">
                    <span>语法角色映射（缺 syntax-operator）</span>
                    <input className="input p1-input-quiet" defaultValue="syntax-keyword → code-keyword" />
                    <span className="p1-err-quiet">
                      只有边框与前置图标用 danger，说明文字仍是 --tv-muted，读起来不像系统故障。
                    </span>
                  </label>
                </div>
              </div>
            </ExSection>
          )}

          {scene === 'disabled' && (
            <ExSection title="禁用三件套" desc="input / select / button 同时不可操作">
              <div className="ex-grid2">
                <div className="form">
                  <label className="field">
                    <span>锁定字段 · 禁用</span>
                    <input className="input p1-dis" defaultValue="家族 ID（自动分配）" disabled />
                  </label>
                  <label className="field">
                    <span>协议</span>
                    <select className="input select p1-dis" defaultValue="agpl" disabled>
                      <option value="agpl">AGPL-3.0</option>
                    </select>
                  </label>
                  <div className="ex-bar">
                    <button type="button" className="btn primary sm-btn p1-dis" disabled>
                      写入 palette.md
                    </button>
                    <span className="ex-cap">禁用按钮保留主色底？否，统一降为 surface-2</span>
                  </div>
                </div>
                <div className="form">
                  <label className="field">
                    <span>同结构 · 启用</span>
                    <input className="input" defaultValue="family-id" />
                  </label>
                  <label className="field">
                    <span>协议</span>
                    <select className="input select" defaultValue="mit">
                      <option value="mit">MIT</option>
                      <option value="agpl">AGPL-3.0</option>
                    </select>
                  </label>
                  <div className="ex-bar">
                    <button type="button" className="btn primary sm-btn">
                      写入 palette.md
                    </button>
                  </div>
                </div>
              </div>
            </ExSection>
          )}

          {scene === 'readonly' && (
            <ExSection title="只读 vs 禁用" desc="同一行内并排，检验两档灰度是否够分辨">
              <div className="ex-grid2">
                <label className="field">
                  <span>只读 · 内容可信</span>
                  <input className="input p1-ro" defaultValue="ergemd/aurora" readOnly />
                  <span className="ex-cap">surface-2 底 + --tv-text 文字，可选中复制</span>
                </label>
                <label className="field">
                  <span>禁用 · 不可操作</span>
                  <input className="input p1-dis" defaultValue="ergemd/aurora" disabled />
                  <span className="ex-cap">surface-2 底 + --tv-dim 文字，不可选中</span>
                </label>
              </div>
              <div className="form" style={{ marginTop: 14 }}>
                <label className="field">
                  <span>契约角色数</span>
                  <input className="input p1-ro" defaultValue="required 14 / derivedOptional 6" readOnly />
                </label>
                <label className="field">
                  <span>显式颜色令牌数</span>
                  <input className="input p1-ro" defaultValue="41" readOnly />
                </label>
                <label className="check">
                  <input type="checkbox" defaultChecked />
                  只读字段可以勾选「纳入导出」——不可编辑不等于不可用
                </label>
              </div>
            </ExSection>
          )}

          {scene === 'steps' && (
            <ExSection title="多步表单" desc="第 2 步进行中，第 1 步已完成">
              <div className="p1-steps">
                <div className="p1-step done">
                  <span className="p1-step-dot">
                    <IconCheck />
                  </span>
                  <span className="p1-step-label">{STEPS[0]}</span>
                </div>
                <i className="p1-step-line" aria-hidden="true" />
                <div className="p1-step on">
                  <span className="p1-step-dot">2</span>
                  <span className="p1-step-label">{STEPS[1]}</span>
                </div>
                <i className="p1-step-line" aria-hidden="true" />
                <div className="p1-step todo">
                  <span className="p1-step-dot">3</span>
                  <span className="p1-step-label">{STEPS[2]}</span>
                </div>
              </div>
              <div className="prog-block">
                <div className="prog-head">
                  <span>映射进度</span>
                  <span className="ex-cap">12 / 20 个角色</span>
                </div>
                <div className="prog">
                  <i style={{ width: '60%' }} />
                </div>
              </div>
              <div className="form" style={{ marginTop: 16 }}>
                <label className="field">
                  <span>required 角色 · syntax-operator</span>
                  <input className="input" defaultValue="未映射" />
                </label>
                <label className="field">
                  <span>映射来源</span>
                  <input className="input" defaultValue="ergemd/code-keyword → syntax-keyword" readOnly />
                </label>
                <label className="field">
                  <span>回退备注（写入 palette.md 备注列）</span>
                  <textarea
                    className="input p1-textarea"
                    defaultValue="契约兜底·同 syntax-punctuation；源主题未提供独立 operator 值。"
                  />
                </label>
                <div className="ex-bar">
                  <button type="button" className="btn ghost sm-btn">
                    上一步
                  </button>
                  <button type="button" className="btn primary sm-btn">
                    下一步
                  </button>
                  <span className="ex-cap">第 2 步允许回退，第 3 步才校验契约</span>
                </div>
              </div>
            </ExSection>
          )}

          {scene === 'select' && (
            <ExSection title="长下拉（展开态）" desc="14 项 + 分组标题 + 一项超长名">
              <div className="p1-sel">
                <button type="button" className="p1-sel-btn" aria-expanded="true" aria-haspopup="listbox">
                  <span className="p1-sel-value">{picked}</span>
                  <span className="p1-sel-caret" aria-hidden="true">▲</span>
                </button>
                <div className="p1-sel-list" role="listbox">
                  {THEME_PICKER.map((g) => (
                    <div key={g.group}>
                      <div className="p1-sel-group">{g.group}</div>
                      {g.items.map((it) => {
                        const on = picked === it.name
                        return (
                          <button
                            key={it.num}
                            type="button"
                            role="option"
                            aria-selected={on}
                            className={`p1-sel-item${on ? ' on' : ''}`}
                            onClick={() => setPicked(it.name)}
                          >
                            <span className="p1-sel-item-name">{it.name}</span>
                            <span className="p1-sel-item-name" style={{ flex: '0 0 auto', color: 'var(--tv-dim)' }}>
                              {it.num}
                            </span>
                            {on && <span className="p1-sel-check" aria-hidden="true">✓</span>}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </ExSection>
          )}

          {scene === 'drop' && (
            <ExSection title="文件拖拽" desc="虚线 + 主副文案 + 选择按钮">
              <div className="p1-drop">
                <span className="p1-drop-icon">
                  <IconUpload />
                </span>
                <span className="p1-drop-title">拖入 palette.md 或 contract.json</span>
                <span className="p1-drop-sub">
                  支持 .md / .json，单文件 ≤ 2 MB；批量导入会按家族自动分组
                </span>
                <button type="button" className="btn ghost sm-btn" style={{ marginTop: 4 }}>
                  选择文件
                </button>
              </div>
              <div className="p1-files">
                {files.map((f) => (
                  <div className="p1-file" key={f.name}>
                    <span className="p1-file-ico">
                      <IconFile />
                    </span>
                    <span className="p1-file-meta">
                      <span className="p1-file-name">{f.name}</span>
                      <span className="p1-file-size">{f.size} · 等待校验</span>
                    </span>
                    <button
                      type="button"
                      className="linkbtn"
                      onClick={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
                    >
                      移除
                    </button>
                  </div>
                ))}
                {files.length === 0 && <span className="ex-cap">已全部移除，可重新拖入</span>}
              </div>
            </ExSection>
          )}
        </div>

        <div>
          <ExSection title="常驻对照" desc="不随场景切换，用来比对层级">
            <div className="ex-sub">
              <div className="p1-mini-title">启用 / 禁用 同屏</div>
              <div className="ex-bar" style={{ marginTop: 8 }}>
                <button type="button" className="btn primary sm-btn">
                  已启用
                </button>
                <button type="button" className="btn primary sm-btn p1-dis" disabled>
                  已禁用
                </button>
              </div>
              <div className="ex-bar" style={{ marginTop: 8 }}>
                <input className="input" style={{ maxWidth: 132 }} defaultValue="可编辑" />
                <input className="input p1-dis" style={{ maxWidth: 132 }} defaultValue="已禁用" disabled />
              </div>
              <div className="ex-divider" />
              <div className="p1-mini-title">文字三级</div>
              <div className="ex-kv">
                <dt>主文案</dt>
                <dd style={{ color: 'var(--tv-text)' }}>--tv-text</dd>
              </div>
              <div className="ex-kv">
                <dt>说明文字</dt>
                <dd style={{ color: 'var(--tv-muted)' }}>--tv-muted</dd>
              </div>
              <div className="ex-kv">
                <dt>弱化 / 禁用</dt>
                <dd style={{ color: 'var(--tv-dim)' }}>--tv-dim</dd>
              </div>
              <div className="ex-kv">
                <dt>错误色</dt>
                <dd style={{ color: 'var(--tv-danger)' }}>--tv-danger</dd>
              </div>
              <div className="p1-note" style={{ marginTop: 10 }}>
                对照要点：danger 只在 3 处出现——边框、前置图标、11.5px 说明行。同一屏里如果连字段名都变红，错误就失去了「指出哪一项坏了」的作用。
              </div>
            </div>
          </ExSection>

          <ExSection title="禁用态可读性自检" desc="标签必须能念出来">
            <ExFrame title="locked-fields">
              <label className="field">
                <span style={{ color: 'var(--tv-dim)' }}>家族（不可改）</span>
                <input className="input p1-dis" defaultValue="catppuccin" disabled />
              </label>
              <label className="field" style={{ marginTop: 10 }}>
                <span style={{ color: 'var(--tv-dim)' }}>入库时间</span>
                <input className="input p1-dis" defaultValue="2026-10-21 14:02" disabled />
              </label>
              <span className="ex-cap" style={{ display: 'block', marginTop: 9 }}>
                底色仍是 surface-2，文字降到 dim；若再把 opacity 压到 0.4，日期会先糊掉
              </span>
            </ExFrame>
          </ExSection>
        </div>
      </div>
    </ExampleShell>
  )
}
