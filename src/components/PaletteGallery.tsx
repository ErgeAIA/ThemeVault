import { useMemo, useState } from 'react'
import { allThemes, fgFor, l1Value, type ThemeEntry } from '../data/tv'

// 海选卡片上展示的关键角色（覆盖 背景/文字/强调/状态，值取家族感知 L1 解析）
const KEY_ROLES = [
  'bg',
  'bg-surface',
  'text',
  'text-muted',
  'accent',
  'ok',
  'warn',
  'danger',
  'info',
] as const

const SCHEME_LABEL: Record<string, string> = { light: 'Light', dark: 'Dark' }

export default function PaletteGallery({
  selectedNumber,
  onSelect,
}: {
  selectedNumber: number
  onSelect: (entry: ThemeEntry) => void
}) {
  const [query, setQuery] = useState('')
  const [scheme, setScheme] = useState<'all' | 'light' | 'dark'>('all')

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allThemes.filter((e) => {
      if (scheme !== 'all' && e.theme.scheme !== scheme) return false
      if (!q) return true
      const hay =
        `${e.theme.number} ${e.theme.displayName} ${e.theme.zhName ?? ''} ${e.fam.family}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query, scheme])

  return (
    <div className="gal">
      <div className="gal-tools">
        <input
          className="gal-search"
          placeholder="搜索编号 / 名称 / 家族…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {(['all', 'light', 'dark'] as const).map((s) => (
          <button
            key={s}
            className={`chip${scheme === s ? ' on' : ''}`}
            onClick={() => setScheme(s)}
          >
            {s === 'all' ? '全部' : SCHEME_LABEL[s]}
          </button>
        ))}
        <span className="gal-count">
          {list.length} / {allThemes.length} 套
        </span>
      </div>

      <div className="gal-grid">
        {list.map((entry) => {
          const { fam, theme } = entry
          const aa = theme.textContrast?.textOnBg
          const isSel = theme.number === selectedNumber
          return (
            <button
              key={`${fam.family}/${theme.id}`}
              className={`gal-card${isSel ? ' selected' : ''}`}
              onClick={() => onSelect(entry)}
              title="点击应用此主题到界面仿真"
            >
              <div className="gal-head">
                <span className="gal-num">#{theme.number}</span>
                <span className="gal-name">
                  {theme.displayName}
                  {theme.zhName ? ` | ${theme.zhName}` : ''}
                </span>
                <span className={`badge-scheme ${theme.scheme}`}>
                  {SCHEME_LABEL[theme.scheme] ?? theme.scheme}
                </span>
                <span
                  className={`badge-aa${aa !== null && aa !== undefined && aa < 4.5 ? ' fail' : ''}`}
                  title={`text 对 bg 的 WCAG 对比度${aa === null || aa === undefined ? '（非纯色无法计算）' : `：${aa}`}`}
                >
                  {aa === null || aa === undefined ? 'AA —' : aa < 4.5 ? 'AA ✗' : 'AA ✓'}
                </span>
              </div>
              <div className="gal-fam">
                {fam.familyDisplayName} · {theme.license}
              </div>
              <div className="gal-swatches">
                {KEY_ROLES.map((role) => {
                  const val = l1Value(entry, role)
                  return (
                    <div
                      key={role}
                      className="sw"
                      style={
                        val
                          ? { background: val, color: fgFor(val) }
                          : {
                              background: 'transparent',
                              color: 'var(--tv-dim)',
                              border: '1px dashed var(--tv-border)',
                            }
                      }
                    >
                      <span className="sw-role">{role}</span>
                      <span className="sw-val">{val ?? '—'}</span>
                    </div>
                  )
                })}
              </div>
              {isSel && <div className="gal-applied">✓ 当前主题</div>}
            </button>
          )
        })}
      </div>

      {list.length === 0 && <div className="gal-empty">没有匹配的主题</div>}
    </div>
  )
}
