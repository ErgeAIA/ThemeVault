import { useMemo, useState, type CSSProperties } from 'react'
import { ExampleShell, ExSection, type ExamplePageProps } from './shell'

/** 外观设置页：换肤入口本身。色板 / 圆角 / 密度 / 字号滑块即时作用于右侧预览。 */
export default function AppearanceExample({ ctx }: ExamplePageProps) {
  const { entry, num, setNum, fontId, setFontId, fontSchemes, allThemes } = ctx

  const [radius, setRadius] = useState(12)
  const [density, setDensity] = useState(1)
  const [fontSize, setFontSize] = useState(14)
  const [accentPath, setAccentPath] = useState<'theme' | 'secondary' | 'deep'>('theme')

  const radii = [0, 6, 12, 18]
  const densities: { label: string; v: number }[] = [
    { label: '紧凑', v: 0.82 },
    { label: '标准', v: 1 },
    { label: '宽松', v: 1.2 },
  ]

  // 预览框内的局部尺寸：只改内联样式，不新造 --tv-* 变量名
  const previewStyle = useMemo<CSSProperties>(
    () => ({
      borderRadius: radius,
      fontSize,
      padding: 16 * density,
    }),
    [radius, fontSize, density],
  )

  const swatches = allThemes.slice(0, 9)

  return (
    <ExampleShell
      meta={{
        title: '外观设置页',
        desc: '换肤入口本身就是主题的考场：色板缩略图、圆角、密度、字号四类控件必须同时可读。',
        tag: '设置类',
        usage: '产品设置 · 主题商城 · 外观偏好',
        points: [
          '左侧控件区与右侧预览区同屏，任何一次改动都要在视线内立刻看到结果，所以预览区不允许滚动出视野。',
          '色板缩略图用「三色小组」（背景 / 卡片 / 强调）而不是整块色板，缩略图才在 1.5 秒内可比较。',
          '圆角滑块直接写内联 borderRadius，密度与字号同理——不新造 CSS 变量，靠行内样式保证滑块有确定作用域。',
          '选中态一律「描边 + 强调色 13% 底」，不用实心强调色铺满，避免缩略图之间互相抢色。',
          '底部保存条固定，改动未保存时用 warn 色提示而非弹窗，保持「调一下看一眼」的连续节奏。',
        ],
      }}
    >
      <div className="ex-split">
        {/* 控件区 */}
        <div className="ex-sub">
          <ExSection title="配色方案" desc="点选后整页即时换肤">
            <div className="ex-grid3">
              {swatches.map(({ theme }) => {
                const on = theme.number === num
                return (
                  <button
                    key={theme.number}
                    type="button"
                    className="ex-sw"
                    aria-pressed={on}
                    onClick={() => setNum(theme.number)}
                    title={`#${theme.number} ${theme.displayName}`}
                    style={{
                      borderColor: on ? 'var(--tv-accent)' : 'var(--tv-border)',
                      background: on
                        ? 'color-mix(in srgb, var(--tv-accent) 12%, transparent)'
                        : 'var(--tv-card)',
                    }}
                  >
                    <span className="ex-sw-bars" aria-hidden="true">
                      <i style={{ background: theme.tokens['bg'] ?? theme.brand.color }} />
                      <i style={{ background: theme.tokens['card'] ?? theme.brand.color }} />
                      <i style={{ background: theme.tokens['accent'] ?? theme.brand.color }} />
                    </span>
                    <span className="ex-sw-label">#{theme.number}</span>
                    <span className="ex-sw-name">{theme.displayName}</span>
                  </button>
                )
              })}
            </div>
          </ExSection>

          <div className="ex-divider" />

          <ExSection title="字体方案">
            <label className="field">
              <select className="input select" value={fontId} onChange={(e) => setFontId(e.target.value)}>
                {fontSchemes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </label>
          </ExSection>

          <div className="ex-divider" />

          <ExSection title="圆角" desc={`${radius}px`}>
            <div className="ex-bar">
              {radii.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`chip${radius === r ? ' on' : ''}`}
                  onClick={() => setRadius(r)}
                >
                  {r === 0 ? '硬角' : `${r}px`}
                </button>
              ))}
            </div>
          </ExSection>

          <ExSection title="密度" desc={densities.find((d) => d.v === density)?.label}>
            <div className="ex-bar">
              {densities.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  className={`chip${density === d.v ? ' on' : ''}`}
                  onClick={() => setDensity(d.v)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </ExSection>

          <ExSection title="正文字号" desc={`${fontSize}px`}>
            <input
              className="slider"
              type="range"
              min={12}
              max={18}
              step={1}
              value={fontSize}
              aria-label="正文字号"
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </ExSection>

          <ExSection title="强调色取用" desc="同一套 token 的三种落点">
            <div className="ex-bar">
              {([
                ['theme', 'accent'],
                ['secondary', 'accent-secondary'],
                ['deep', 'accent-deep'],
              ] as const).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className={`chip${accentPath === k ? ' on' : ''}`}
                  onClick={() => setAccentPath(k)}
                >
                  {label}
                </button>
              ))}
            </div>
          </ExSection>
        </div>

        {/* 预览区 */}
        <div className="ex-sub" style={{ padding: 12 }}>
          <div className="ex-frame" style={previewStyle}>
            <div className="ex-frame-bar" style={{ borderRadius: Math.max(0, radius - 1) }}>
              <span className="ex-frame-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>实时预览 · #{entry.theme.number} {entry.theme.displayName}</span>
            </div>
            <div className="ex-frame-body" style={{ fontSize }}>
              <div className="ex-bar" style={{ marginBottom: 12 }}>
                <b style={{ fontSize: fontSize + 2 }}>外观偏好</b>
                <span className="st info" style={{ marginLeft: 'auto' }}>
                  {entry.theme.scheme}
                </span>
              </div>

              <div className="ex-grid2" style={{ marginBottom: 12 }}>
                <div className="ex-sub" style={{ borderRadius: radius, padding: 12 * density }}>
                  <div className="ex-kv" style={{ padding: `${6 * density}px 0` }}>
                    <dt>主按钮</dt>
                    <dd>
                      <button
                        type="button"
                        className="btn primary sm-btn"
                        style={{
                          borderRadius: Math.max(0, radius - 4),
                          background:
                            accentPath === 'theme'
                              ? 'var(--tv-accent)'
                              : accentPath === 'secondary'
                                ? 'var(--tv-accent-2)'
                                : 'var(--tv-accent-deep)',
                        }}
                      >
                        保存
                      </button>
                    </dd>
                  </div>
                  <div className="ex-kv" style={{ padding: `${6 * density}px 0` }}>
                    <dt>次按钮</dt>
                    <dd>
                      <button
                        type="button"
                        className="btn ghost sm-btn"
                        style={{ borderRadius: Math.max(0, radius - 4) }}
                      >
                        取消
                      </button>
                    </dd>
                  </div>
                </div>

                <div className="ex-sub" style={{ borderRadius: radius, padding: 12 * density }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>段落预览</div>
                  <p style={{ color: 'var(--tv-muted)', lineHeight: 1.62 }}>
                    正文用 <code className="ex-mono">--tv-text</code>，次级信息用{' '}
                    <code className="ex-mono">--tv-muted</code>，注释级信息用{' '}
                    <code className="ex-mono">--tv-dim</code>。三级明度是层级唯一的表达手段。
                  </p>
                  <p style={{ color: 'var(--tv-dim)', marginTop: 6, fontSize: fontSize - 2 }}>
                    这一行是 dim 级，用来验证它在当前背景上是否还读得清。
                  </p>
                </div>
              </div>

              <div className="ex-bar">
                <input className="input" placeholder="输入框随圆角与密度变化" style={{ borderRadius: Math.max(0, radius - 4) }} />
                <button
                  type="button"
                  className="btn primary sm-btn"
                  style={{ borderRadius: Math.max(0, radius - 4) }}
                >
                  应用
                </button>
              </div>
            </div>
          </div>

          <div className="alert warn" style={{ marginTop: 12, marginBottom: 0 }}>
            <span aria-hidden="true">▲</span>
            <div className="alert-body">
              <b>有 2 项改动未保存</b>
              <span>离开本页将丢弃圆角与字号修改</span>
            </div>
          </div>

          <div className="ex-bar" style={{ marginTop: 12 }}>
            <span className="ex-cap">当前：{entry.theme.displayName} · {radius}px · {fontSize}px</span>
            <div className="ex-bar-right ex-bar">
              <button type="button" className="btn ghost sm-btn">
                重置
              </button>
              <button type="button" className="btn primary sm-btn">
                保存更改
              </button>
            </div>
          </div>
        </div>
      </div>
    </ExampleShell>
  )
}
