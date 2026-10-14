import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  fontThemes,
  FONT_ROLES,
  AVAILABLE_FONTS,
  buildFamily,
  categoryOf,
  type FontRole,
} from './data/fontThemes'
import { loadGoogleFonts, primaryFamily } from './lib/fontLoader'

type StyleVars = CSSProperties & Record<`--${string}`, string>

export default function App() {
  const [selectedId, setSelectedId] = useState(fontThemes[0].id)
  const [overrides, setOverrides] = useState<Partial<Record<FontRole, string>>>({})
  const [dark, setDark] = useState(false)

  const theme = useMemo(
    () => fontThemes.find((t) => t.id === selectedId) ?? fontThemes[0],
    [selectedId],
  )

  const current = useMemo(() => {
    const c: Record<FontRole, string> = { ...theme.fonts }
    ;(Object.keys(overrides) as FontRole[]).forEach((r) => {
      if (overrides[r]) c[r] = overrides[r] as string
    })
    return c
  }, [theme, overrides])

  const families = useMemo(
    () => (Object.values(current) as string[]).map(primaryFamily),
    [current],
  )

  useEffect(() => {
    loadGoogleFonts(families)
  }, [families])

  const setRole = (role: FontRole, name: string) => {
    setOverrides((prev) => ({ ...prev, [role]: buildFamily(name, categoryOf(name)) }))
  }
  const resetRole = (role: FontRole) => {
    setOverrides((prev) => {
      const n = { ...prev }
      delete n[role]
      return n
    })
  }

  const styleVars: StyleVars = {
    '--font-heading': current.heading,
    '--font-body': current.body,
    '--font-code': current.code,
    '--font-ui': current.ui,
  }

  const cssText = `:root{\n  --font-heading: ${current.heading};\n  --font-body: ${current.body};\n  --font-code: ${current.code};\n  --font-ui: ${current.ui};\n}`

  return (
    <div className={`app${dark ? ' dark' : ''}`}>
      <header className="topbar">
        <div className="brand">
          <span className="logo">🦐</span>
          <div>
            <h1>ThemeVault · 字体搭配仿真器</h1>
            <p>切换标题 / 正文 / 代码 / 界面字体组合，实时看到真实效果。</p>
          </div>
        </div>
        <button className="theme-toggle" onClick={() => setDark((d) => !d)}>
          {dark ? '☀ 浅色' : '🌙 深色'}
        </button>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h2>字体方案</h2>
          <div className="scheme-list">
            {fontThemes.map((t) => (
              <button
                key={t.id}
                className={`scheme-card${t.id === selectedId ? ' active' : ''}`}
                onClick={() => {
                  setSelectedId(t.id)
                  setOverrides({})
                }}
              >
                <span className="scheme-name">{t.name}</span>
                <span className="scheme-desc">{t.description}</span>
              </button>
            ))}
          </div>

          <h2>逐个元素微调</h2>
          <div className="role-tweaks">
            {FONT_ROLES.map(({ key, label }) => (
              <div className="tweak-row" key={key}>
                <label>{label}</label>
                <select
                  value={primaryFamily(current[key])}
                  onChange={(e) => setRole(key, e.target.value)}
                >
                  {AVAILABLE_FONTS.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <button
                  className="reset"
                  onClick={() => resetRole(key)}
                  title="恢复方案默认值"
                >
                  ↺
                </button>
              </div>
            ))}
          </div>

          <button
            className="copy-btn"
            onClick={() => navigator.clipboard?.writeText(cssText)}
          >
            复制 CSS 变量
          </button>
        </aside>

        <main className="canvas" style={styleVars}>
          <Canvas />
        </main>
      </div>
    </div>
  )
}

function Canvas() {
  return (
    <div className="demo">
      <section className="demo-block">
        <span className="role-tag">标题 · Heading</span>
        <h1 className="demo-h1">设计系统的呼吸感</h1>
        <h2 className="demo-h2">字体的层级与节奏</h2>
        <h3 className="demo-h3">次级标题示例</h3>
      </section>

      <section className="demo-block">
        <span className="role-tag">正文 · Body</span>
        <p className="demo-p">
          好的字体搭配像空气：用户不会注意它，却始终被它托住。标题负责第一眼的性格，
          正文承载长时间阅读的信噪比，代码需要等宽与清晰，界面元素则要在密集操作中保持克制。
          下面这段中文用于检验中文字形与西文混排的协调度。The quick brown fox jumps over the lazy dog.
        </p>
      </section>

      <section className="demo-block">
        <span className="role-tag">界面 · UI</span>
        <div className="demo-ui">
          <button className="btn btn-primary">主要按钮</button>
          <button className="btn btn-secondary">次要按钮</button>
          <button className="btn btn-ghost">幽灵按钮</button>
          <input className="demo-input" placeholder="输入框示例 Input" />
          <span className="badge">Badge 标签</span>
          <span className="chip">Chip 选择</span>
        </div>
      </section>

      <section className="demo-block">
        <span className="role-tag">代码 · Code</span>
        <pre className="demo-code">{`function greet(name: string) {
  // heading / body / code 各司其职
  return \`Hello, \${name}!\`
}`}</pre>
      </section>

      <section className="demo-block">
        <span className="role-tag">卡片 · Card</span>
        <div className="demo-card">
          <h4 className="card-title">卡片标题</h4>
          <p className="card-text">
            卡片内混合标题、正文与按钮，检验搭配在真实组件里的整体观感。
          </p>
          <button className="btn btn-primary">查看详情</button>
        </div>
      </section>
    </div>
  )
}
