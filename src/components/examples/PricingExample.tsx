import { useState } from 'react'
import { ExampleShell, ExSection, type ExamplePageProps } from './shell'
import '../../styles/examples-p2.css'

type Cycle = 'monthly' | 'yearly'

interface Plan {
  id: string
  name: string
  desc: string
  /** 月付价（元 / 人 / 月）；年付按 8 折，等价于「省 20%」。 */
  monthly: number
  unit: string
  reco?: boolean
  cta: 'primary' | 'ghost'
  feats: { text: string; on: boolean }[]
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: '免费',
    desc: '个人试色，验证单套主题可行性',
    monthly: 0,
    unit: '永久免费',
    cta: 'ghost',
    feats: [
      { text: '每月浏览 20 套主题', on: true },
      { text: '3 个家族实时换肤', on: true },
      { text: 'palette.md 只读预览', on: true },
      { text: 'INDEX.json 导出', on: false },
      { text: 'AA 对比度批量扫描', on: false },
    ],
  },
  {
    id: 'team',
    name: '团队',
    desc: '小团队接入，资产与审查同屏',
    monthly: 49,
    unit: '人 / 月',
    reco: true,
    cta: 'primary',
    feats: [
      { text: '无限主题与家族', on: true },
      { text: '全部 22 家族实时换肤', on: true },
      { text: 'contract.json 校验与阻断', on: true },
      { text: 'AA 4.5 对比度批量扫描', on: true },
      { text: '导出 INDEX.json 与 tokens.json', on: false },
    ],
  },
  {
    id: 'ent',
    name: '企业',
    desc: '自建家族、私有仓库与审计留痕',
    monthly: 199,
    unit: '人 / 月',
    cta: 'ghost',
    feats: [
      { text: '团队版全部能力', on: true },
      { text: '私有家族与自建契约', on: true },
      { text: 'SSO / SCIM 成员同步', on: true },
      { text: 'DEC 决策留痕与审计导出', on: true },
      { text: '专属迁移顾问', on: true },
    ],
  },
]

interface CmpRow {
  label: string
  free: string
  team: string
  ent: string
}

/** 对比表：✓ 走 ok 语义色，— 走 dim，数字原样。 */
const CMP: CmpRow[] = [
  { label: '可浏览主题数', free: '20 / 月', team: '不限', ent: '不限' },
  { label: '家族换肤', free: '3', team: '22', ent: '22 + 私有' },
  { label: '契约校验', free: '—', team: '✓', ent: '✓' },
  { label: 'AA 对比度扫描', free: '—', team: '✓', ent: '✓' },
  { label: '批量导出', free: '—', team: '5 次 / 日', ent: '不限' },
  { label: '成员席位', free: '1', team: '50', ent: '不限' },
  { label: '审计与 DEC 留痕', free: '—', team: '—', ent: '✓' },
]

const LOGOS = ['opensquilla', 'catppuccin', 'ergemd', 'vscode']

function priceOf(plan: Plan, cycle: Cycle): number {
  if (plan.monthly === 0) return 0
  return cycle === 'yearly' ? Math.round(plan.monthly * 0.8) : plan.monthly
}

function Check({ on }: { on: boolean }) {
  if (!on) {
    return (
      <span className="p2-dash" aria-hidden="true">
        —
      </span>
    )
  }
  return (
    <svg className="p2-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CmpCell({ v }: { v: string }) {
  if (v === '✓') {
    return <span className="p2-cmp-yes">✓</span>
  }
  if (v === '—') {
    return <span className="p2-cmp-no">—</span>
  }
  return <span className="p2-cmp-num">{v}</span>
}

export default function PricingExample({ ctx }: ExamplePageProps) {
  const [cycle, setCycle] = useState<Cycle>('yearly')

  return (
    <ExampleShell
      meta={{
        title: '营销定价页',
        desc: '大标题、CTA、卡片栅格在同色系下的层级与对比度，是主题「一换就散」的重灾区。',
        tag: '营销类',
        usage: '落地页 · 定价页 · 升级引导',
        points: [
          '推荐卡靠描边 + 13% 底区分，不靠实心强调色铺满，否则同屏三个 CTA 互相抢，用户找不到「下一步」。',
          'hero 大标题只用 text 色，副标题降到 muted；标题一旦用 accent，整页就只剩一个可用强调位，CTA 反而失效。',
          '价格是唯一允许用 30px 大字的地方，单位与计费周期用小号 muted 并列，年付折扣写在同一行的 note 里，不做第二套静态数字。',
          '功能清单的勾选图标走 ok 色，缺失项用 dim + 删除线；不要在缺失项上画红色叉号——红叉表示错误，不表示「本档没有」。',
          '对比表里 ✓ 用 ok、— 用 dim、数字用 text 三级；三档同屏时靠列对齐与前缀符号区分，不靠给整列加底色。',
        ],
      }}
    >
      <div className="p2-hero">
        <span className="st info">ThemeVault Pro</span>
        <h2>把 150+ 套主题，变成你项目的设计系统</h2>
        <p className="p2-hero-sub">
          22 个家族、契约驱动的角色映射、AA 对比度守卫。接入主题不再靠截图对色，
          而是靠 <code className="ex-mono">palette.md</code> 与 <code className="ex-mono">contract.json</code> 两事实源。
        </p>
        <div className="p2-hero-cta">
          <button type="button" className="btn primary p2-cta">
            开始免费试用
          </button>
          <button type="button" className="btn ghost p2-cta">
            查看迁移指南
          </button>
        </div>
        <span className="p2-hero-note">无需信用卡 · 当前预览主题 #{ctx.entry.theme.number} {ctx.entry.theme.displayName}</span>
      </div>

      <ExSection title="计费方式" desc="切换即时重算，不写第二套静态价格">
        <div className="p2-billing">
          <b>按年付费省 20%</b>
          <span className={'p2-billing-label' + (cycle === 'monthly' ? ' p2-on' : '')}>月付</span>
          <button
            type="button"
            className={'switch' + (cycle === 'yearly' ? ' on' : '')}
            role="switch"
            aria-checked={cycle === 'yearly'}
            aria-label="按年付费"
            onClick={() => setCycle(cycle === 'yearly' ? 'monthly' : 'yearly')}
          >
            <i />
          </button>
          <span className={'p2-billing-label' + (cycle === 'yearly' ? ' p2-on' : '')}>年付</span>
          <span className="p2-save">省 20%</span>
          <span className="st warn" style={{ marginLeft: 'auto' }}>
            限时 30 天
          </span>
          <span className="p2-billing-note">
            {cycle === 'yearly' ? '年付一次性结算 12 个月，折后价已含折扣' : '月付随时可停，不享受折扣'}
          </span>
        </div>
      </ExSection>

      <div className="p2-plans">
        {PLANS.map((p) => {
          const price = priceOf(p, cycle)
          return (
            <div className={'p2-plan' + (p.reco ? ' p2-reco' : '')} key={p.id}>
              {p.reco && <span className="p2-plan-badge">推荐</span>}
              <div className="p2-plan-name">{p.name}</div>
              <div className="p2-plan-desc">{p.desc}</div>
              <div className="p2-price">
                <span className="p2-price-cur">¥</span>
                <span className="p2-price-num">{price}</span>
                <span className="p2-price-unit">{p.unit}</span>
              </div>
              <div className="p2-price-note">
                {p.monthly === 0
                  ? '不需要付费'
                  : cycle === 'yearly'
                    ? '年付价 · 原价 ¥' + p.monthly + ' / 月'
                    : '月付价 · 年付省 20%'}
              </div>
              <ul className="p2-feats">
                {p.feats.map((f) => (
                  <li key={f.text} className={f.on ? '' : 'p2-off'}>
                    <Check on={f.on} />
                    <span>{f.on ? f.text : <s>{f.text}</s>}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={'btn ' + p.cta + ' sm-btn'}
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
              >
                {p.id === 'free' ? '免费开始' : p.id === 'team' ? '升级到团队版' : '联系销售'}
              </button>
            </div>
          )
        })}
      </div>

      <ExSection title="三档功能对比" desc="✓ 走 ok，— 走 dim，数字走 text">
        <table className="tbl">
          <thead>
            <tr>
              <th>能力</th>
              <th>免费</th>
              <th>团队</th>
              <th>企业</th>
            </tr>
          </thead>
          <tbody>
            {CMP.map((r) => (
              <tr key={r.label}>
                <td className="td-name">{r.label}</td>
                <td>
                  <CmpCell v={r.free} />
                </td>
                <td>
                  <CmpCell v={r.team} />
                </td>
                <td>
                  <CmpCell v={r.ent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ExSection>

      <ExSection title="信任条" desc="客户 logo 位用文字占位，不引外链图片">
        <div className="p2-trust">
          {LOGOS.map((l) => (
            <div className="p2-logo" key={l}>
              {l}
            </div>
          ))}
        </div>
        <div className="ex-bar" style={{ marginTop: 8 }}>
          <span className="ex-cap">4 个家族已在生产环境接入 · 主题资产 152 套</span>
          <span className="ex-cap" style={{ marginLeft: 'auto' }}>
            替换为真实 logo 时保持 48px 行高与极淡底
          </span>
        </div>
      </ExSection>
    </ExampleShell>
  )
}