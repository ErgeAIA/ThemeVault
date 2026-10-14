import { useEffect, useMemo, useState, useRef } from 'react'
import {
  allThemes,
  badgeInfos,
  cardBg,
  cardSections,
  contrast,
  families,
  fgFor,
  health,
  l1Value,
  type ThemeEntry,
} from '../data/tv'

const SCHEME_LABEL: Record<string, string> = { light: 'Light', dark: 'Dark' }


/** 选与底色对比度更高的文字色，保证 tag / 色块标签可读。 */
function readableOn(bg: string): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(bg || '')) return '#e5e5e5'
  const cDark = contrast('#101014', bg) ?? 0
  const cLight = contrast('#f5f5f7', bg) ?? 0
  return cDark >= cLight ? '#101014' : '#f5f5f7'
}

function minRatio(e: ThemeEntry): number {
  const vs = badgeInfos(e).map((b) => b.ratio).filter((r): r is number => r !== null)
  return vs.length ? Math.min(...vs) : Infinity
}

export function paletteText(e: ThemeEntry): string {
  const t = e.theme
  const bgRole = e.fam.family === 'ergemd' ? 'bg-page' : e.fam.family === 'opencode' ? 'background' : 'bg'
  const L: string[] = []
  L.push(`# ThemeVault 主题 #${String(t.number).padStart(3, '0')} ${t.displayName}${t.zhName ? ` | ${t.zhName}` : ''}`)
  L.push(`- 家族：${e.fam.familyDisplayName || e.fam.family}　主题 ID：${t.id}（${t.scheme}）`)
  L.push(`- 协议：${t.license || '—'}`)
  if (e.fam.license) L.push(`- 来源协议：${e.fam.license}`)
  if (e.fam.sourceRepo) L.push(`- 来源：${e.fam.sourceRepo}`)
  L.push(`- 色板文件：themes/${e.fam.family}/${t.id}/palette.md`)
  if (t.tokens?.[bgRole]) L.push(`- 主背景（${bgRole}）：${t.tokens[bgRole]}`)
  L.push('', '## 调色板（语义角色 = 色值；均取自官方源码原文，未改写）')
  for (const [k, v] of Object.entries(t.tokens || {})) L.push(`- ${k} = ${v}`)
  if (t.textContrast) {
    L.push('', '## 文本对比度（对背景，WCAG）')
    for (const [k, v] of Object.entries(t.textContrast)) L.push(`- ${k} = ${v === null ? '—' : v}`)
  }
  if (t.brand?.color) {
    L.push('', '## 品牌色与按钮文字')
    L.push(`- 品牌色：${t.brand.color}（建议按钮文字：${t.brand.buttonText === 'dark' ? '深字' : '浅字'}）`)
  }
  L.push('', '> 取色时背景与文字须成对取用；对比度 < 4.5 的项为主题自身事实（已知偏差），不要擅自改值。')
  return L.join('\n')
}

export default function PaletteGallery({
  selectedNumber,
  onSelect,
}: {
  selectedNumber: number
  onSelect: (entry: ThemeEntry) => void
}) {
  const [query, setQuery] = useState('')
  const [scheme, setScheme] = useState<'all' | 'light' | 'dark'>('all')
  const [family, setFamily] = useState<string>('all')
  const [sortMode, setSortMode] = useState<'num' | 'aa'>('num')
  const [onlyFail, setOnlyFail] = useState(false)

  const familyOptions = useMemo(() => {
    return families
      .map((f) => ({
        family: f.family,
        name: f.familyDisplayName || f.family,
        n: f.themes.filter((t) => t.type === 'value-theme').length,
      }))
      .filter((x) => x.n > 0)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^#/, '')
    return allThemes
      .filter((e) => {
        if (scheme !== 'all' && e.theme.scheme !== scheme) return false
        if (family !== 'all' && e.fam.family !== family) return false
        if (onlyFail && health(e).fail === 0) return false
        if (!q) return true
        const hay =
          `${e.theme.number} ${e.theme.displayName} ${e.theme.zhName ?? ''} ${e.fam.family}`.toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => (sortMode === 'aa' ? minRatio(a) - minRatio(b) : a.theme.number - b.theme.number))
  }, [query, scheme, family, onlyFail, sortMode])



  // ⌘K / "/" 聚焦搜索（真实可用的键盘加速器，便于快速跳主题）
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName || ''
      const typing = /INPUT|TEXTAREA|SELECT/.test(tag)
      if (
        (e.key === '/' && !typing) ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="gal">
      <div className="gal-hero">
        <div className="gal-hero-text">
          <h2>ThemeVault · UI 主题色板资产仓库</h2>
          <p>
            收集 {allThemes.length} 套开源主题，规范化为可直接适配的语义色板。挑一套主题，点卡片即可在「界面仿真」里看真实界面效果。
          </p>
        </div>
        <div className="gal-hero-stats">
          <span>
            <b>{allThemes.length}</b> 套主题
          </span>
          <span>
            <b>{new Set(allThemes.map((e) => e.fam.family)).size}</b> 个家族
          </span>
        </div>
      </div>

      <div className="gal-tools">
        <input
          ref={searchRef}
          className="gal-search"
          placeholder="搜索编号 / 名称 / 家族…（⌘K）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="fam-filter" value={family} onChange={(e) => setFamily(e.target.value)}>
          <option value="all">全部家族</option>
          {familyOptions.map((f) => (
            <option key={f.family} value={f.family}>
              {f.name} ({f.n})
            </option>
          ))}
        </select>
        {(['all', 'light', 'dark'] as const).map((s) => (
          <button key={s} className={`chip${scheme === s ? ' on' : ''}`} onClick={() => setScheme(s)}>
            {s === 'all' ? '全部' : SCHEME_LABEL[s]}
          </button>
        ))}
        <button className={`chip${sortMode === 'num' ? ' on' : ''}`} onClick={() => setSortMode('num')}>
          编号序
        </button>
        <button className={`chip${sortMode === 'aa' ? ' on' : ''}`} onClick={() => setSortMode('aa')}>
          对比度最差
        </button>
        <button className={`chip${onlyFail ? ' on' : ''}`} onClick={() => setOnlyFail((v) => !v)}>
          只看 ✗
        </button>
        <span className="gal-count">
          {list.length} / {allThemes.length} 套
        </span>
      </div>

      <div className="gal-grid">
        {list.map((entry) => {
          const { fam, theme } = entry
          const bg = cardBg(entry)
          const text = l1Value(entry, 'text') || '#e5e5e5'
          const ink = readableOn(bg)
          const isSel = theme.number === selectedNumber
          const numStr = String(theme.number).padStart(3, '0')
          const h = health(entry)
          const accent = theme.tokens?.accent
          const accentFg = theme.tokens?.['accent-foreground'] || (accent ? fgFor(accent) : ink)
          const brand = theme.brand
          const bt = brand?.buttonText === 'dark' ? '深字' : '浅字'
          const isMono = (theme.fontStyle ?? '').includes('mono')
          const fontStack = theme.fonts?.length
            ? theme.fonts.join(', ')
            : isMono
              ? 'ui-monospace, Consolas, monospace'
              : 'system-ui, sans-serif'
          const fontLabel = theme.fonts?.length
            ? theme.fonts.join(' · ')
            : isMono
              ? '等宽 mono（未声明具体字体）'
              : '默认（无声明）'
          return (
            <div
              key={`${fam.family}/${theme.id}`}
              className={`pg-card${isSel ? ' selected' : ''}`}
              style={{
                background: bg,
                color: text,
                borderColor: isSel ? (brand?.color || accent || '#ffffff') : undefined,
                boxShadow: isSel ? `0 0 0 2px ${brand?.color || accent || '#ffffff'}` : undefined,
              }}
              onClick={() => onSelect(entry)}
              title="点击应用此主题到界面仿真"
            >
              <div className="pg-head">
                <b>
                  {theme.displayName}
                  {theme.zhName ? ` | ${theme.zhName}` : ''}
                </b>
                <span className="pg-meta">
                  {theme.scheme} · {theme.tokens ? Object.keys(theme.tokens).length : 0} tokens
                  <br />
                  {theme.license}
                </span>
              </div>

              <div className="pg-badges">
                {badgeInfos(entry).map((b) => (
                  <span
                    key={b.role}
                    className={b.ok === false ? 'pg-badge fail' : 'pg-badge'}
                    style={{ color: b.ratio === null ? ink : b.ok ? '#6ee787' : '#ff8a80' }}
                  >
                    {b.text}
                  </span>
                ))}
              </div>

              {brand?.color && (
                <div className="pg-brand">
                  <i className="pg-brand-sw" style={{ background: brand.color }} />
                  <span>
                    品牌色 {brand.color} · {bt}
                  </span>
                </div>
              )}

              {accent && (
                <div className="pg-accent" style={{ color: ink }}>
                  主色按钮（fg={accentFg}）
                  <button
                    type="button"
                    style={{ background: accent, color: accentFg }}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    Button
                  </button>
                </div>
              )}

              <div className="pg-fontid">
                <div className="pg-fontid-name">字体身份 · {fontLabel}</div>
                <div className="pg-fontid-sample" style={{ fontFamily: fontStack }}>
                  AÅ Bb Cc Gg 字体 Ag 123 — The quick brown fox
                </div>
              </div>

              {cardSections(entry).map(([title, roles]) => {
                const swatches = roles
                  .filter((r) => {
                    const v = theme.tokens?.[r]
                    return v && !v.includes('var(')
                  })
                  .map((r) => {
                    const v = theme.tokens![r]
                    const fg = r === 'accent' && theme.tokens?.['accent-foreground'] ? theme.tokens['accent-foreground'] : fgFor(v)
                    return (
                      <div className="pg-sw" key={r}>
                        <div className="pg-sw-color" style={{ background: v, color: fg }}>
                          {v}
                        </div>
                        <div className="pg-sw-label">{r}</div>
                      </div>
                    )
                  })
                if (!swatches.length) return null
                return (
                  <div className="pg-section" key={title}>
                    <div className="pg-section-title">{title}</div>
                    <div className="pg-swatches">{swatches}</div>
                  </div>
                )
              })}

              <div className="pg-tags">
                <span className="pg-tag num" style={{ color: ink }}>
                  #{numStr}
                </span>
                {brand?.color && (
                  <span className="pg-tag brand" style={{ color: ink }}>
                    <i className="pg-dot" style={{ background: brand.color }} />
                    {brand.color}
                  </span>
                )}
                {h.tested > 0 && (
                  <span
                    className="pg-tag health"
                    style={{
                      color: h.fail ? '#ff8a80' : '#6ee787',
                      borderColor: h.fail ? '#ff8a80' : '#6ee787',
                    }}
                  >
                    AA {h.tested - h.fail}/{h.tested}
                    {h.fail ? ` · ${h.fail}✗` : ''}
                  </span>
                )}
                <span className={`pg-tag ${theme.scheme}`} style={{ color: ink }}>
                  {theme.scheme}
                </span>
                <span className="pg-tag" style={{ color: ink }}>
                  {fam.familyDisplayName || fam.family}
                </span>
                <span className="pg-tag" style={{ color: ink }}>
                  {theme.license}
                </span>
                {theme.fonts?.length ? (
                  <span className="pg-tag mono" style={{ color: ink }}>
                    {theme.fonts.join(' · ')}
                  </span>
                ) : null}
                <button
                  className="pg-copy"
                  style={{ color: ink }}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    navigator.clipboard?.writeText(paletteText(entry)).catch(() => {})
                  }}
                >
                  复制色板
                </button>
              </div>

              {isSel && <div className="pg-applied">✓ 当前主题</div>}
            </div>
          )
        })}
      </div>

      {list.length === 0 && <div className="gal-empty">没有匹配的主题，试试清空搜索或切换家族 / 方案。</div>}
    </div>
  )
}
