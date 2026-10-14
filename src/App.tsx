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
    return s === 'gallery' || s === 'sim' ? s : 'gallery'
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
      {mode === 'gallery' ? (
        <>
          <header className="top">
            <div className="top-brand">
              <span className="top-logo">◐</span>
              <div className="top-title">
                <h1>ThemeVault</h1>
                <p>主题色板 × 字体 · 界面仿真工作台</p>
              </div>
            </div>
            <nav className="top-modes" aria-label="视图切换">
              <button className="on" onClick={() => setMode('gallery')}>
                ▦ 调色板海选
              </button>
              <button onClick={() => setMode('sim')}>
                ◱ 界面仿真
              </button>
            </nav>
            <div className="top-ctrls">
              <a
                className="gh-link"
                href="https://github.com/ErgeAIA/ThemeVault"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub 仓库"
                aria-label="GitHub 仓库"
              >
                <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
              </a>
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
            </div>
          </header>
          <main className="page">
            <PaletteGallery
              selectedNumber={num}
              onSelect={(e) => {
                setNum(e.theme.number)
                setMode('sim')
              }}
            />
          </main>
        </>
      ) : (
        <AppSim
          entry={entry}
          fontId={fontId}
          setFontId={setFontId}
          num={num}
          setNum={setNum}
          setMode={setMode}
          fontSchemes={FONT_SCHEMES}
        />
      )}
    </div>
  )
}
