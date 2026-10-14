import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  allThemes,
  THEME_FONT_ID,
  themeFontStacks,
  themeVars,
  type FontStacks,
  type ThemeEntry,
} from './data/tv'
import { fontThemes } from './data/fontThemes'
import { loadGoogleFonts } from './lib/fontLoader'
import PaletteGallery from './components/PaletteGallery'
import AppSim from './components/AppSim'

type Mode = 'gallery' | 'sim'

const FONT_SCHEMES = [
  { id: THEME_FONT_ID, name: '跟随主题', description: '使用主题声明的字体' },
  ...fontThemes.map((f) => ({ id: f.id, name: f.name, description: f.description })),
]

const DEFAULT_ENTRY =
  allThemes.find((t) => t.fam.family === 'opensquilla' && t.theme.id === 'ember') ?? allThemes[0]

function firstQuotedName(stack: string): string | null {
  const m = /"([^"]+)"/.exec(stack)
  return m ? m[1] : null
}

export default function App() {
  const [mode, setMode] = useState<Mode>(() => {
    const s = localStorage.getItem('tvMode')
    return s === 'gallery' || s === 'sim' ? s : 'sim'
  })
  const [num, setNum] = useState<number>(() => {
    const n = Number(localStorage.getItem('tvTheme'))
    return allThemes.some((t) => t.theme.number === n) ? n : DEFAULT_ENTRY.theme.number
  })
  const [fontId, setFontId] = useState<string>(() => {
    const s = localStorage.getItem('tvFont')
    return s && FONT_SCHEMES.some((f) => f.id === s) ? s : THEME_FONT_ID
  })

  const entry: ThemeEntry = useMemo(
    () => allThemes.find((t) => t.theme.number === num) ?? DEFAULT_ENTRY,
    [num],
  )

  const stacks: FontStacks = useMemo(() => {
    if (fontId === THEME_FONT_ID) return themeFontStacks(entry)
    return fontThemes.find((f) => f.id === fontId)?.fonts ?? themeFontStacks(entry)
  }, [fontId, entry])

  useEffect(() => {
    const names = new Set<string>()
    for (const s of Object.values(stacks)) {
      const n = firstQuotedName(s)
      if (n) names.add(n)
    }
    loadGoogleFonts([...names])
  }, [stacks])

  useEffect(() => {
    localStorage.setItem('tvMode', mode)
    localStorage.setItem('tvTheme', String(num))
    localStorage.setItem('tvFont', fontId)
  }, [mode, num, fontId])

  const vars = {
    ...themeVars(entry),
    '--tv-font-heading': stacks.heading,
    '--tv-font-body': stacks.body,
    '--tv-font-code': stacks.code,
    '--tv-font-ui': stacks.ui,
  } as unknown as CSSProperties

  return (
    <div className="app" style={vars}>
      <header className="top">
        <div className="top-brand">
          <span className="top-logo">◐</span>
          <div className="top-title">
            <h1>ThemeVault</h1>
            <p>主题色板 × 字体 · 界面仿真工作台</p>
          </div>
        </div>
        <nav className="top-modes" aria-label="视图切换">
          <button className={mode === 'gallery' ? 'on' : ''} onClick={() => setMode('gallery')}>
            ▦ 调色板海选
          </button>
          <button className={mode === 'sim' ? 'on' : ''} onClick={() => setMode('sim')}>
            ◱ 界面仿真
          </button>
        </nav>
        <div className="top-ctrls">
          <label>
            主题
            <select value={num} onChange={(e) => setNum(Number(e.target.value))}>
              {allThemes.map(({ theme }) => (
                <option key={theme.number} value={theme.number}>
                  #{theme.number} {theme.displayName}
                  {theme.zhName ? ` · ${theme.zhName}` : ''}
                </option>
              ))}
            </select>
          </label>
          {mode === 'sim' && (
            <label>
              字体
              <select value={fontId} onChange={(e) => setFontId(e.target.value)}>
                {FONT_SCHEMES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </header>

      {mode === 'gallery' ? (
        <main className="page">
          <PaletteGallery
            selectedNumber={num}
            onSelect={(e) => {
              setNum(e.theme.number)
              setMode('sim')
            }}
          />
        </main>
      ) : (
        <AppSim entry={entry} />
      )}
    </div>
  )
}
