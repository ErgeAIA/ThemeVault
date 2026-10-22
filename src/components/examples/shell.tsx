import type { ReactNode } from 'react'
import type { ThemeEntry } from '../../data/tv'
import '../../styles/examples.css'

/** 示例页可用的上下文：需要真换肤的页面（如外观设置页）从这里拿主题控制权。 */
export interface ExampleCtx {
  entry: ThemeEntry
  num: number
  setNum: (n: number) => void
  fontId: string
  setFontId: (id: string) => void
  fontSchemes: { id: string; name: string; description: string }[]
  allThemes: ThemeEntry[]
}

/** 每个示例页自带的元信息：标题 / 一句话说明 / 分类 / 典型场景 / 结构要点。 */
export interface ExampleMeta {
  title: string
  desc: string
  tag: string
  usage: string
  points: string[]
}

export interface ExamplePageProps {
  ctx: ExampleCtx
}

/**
 * 示例页统一外壳：页头（标题 + 场景说明）→ 布局演示区 → 结构要点。
 * 演示区由各页自行填充；颜色只允许 var(--tv-*) 与 color-mix 派生。
 */
export function ExampleShell({
  meta,
  children,
}: {
  meta: ExampleMeta
  children: ReactNode
}) {
  return (
    <div className="ex-shell">
      <div className="ex-hd">
        <div className="ex-hd-text">
          <h2>{meta.title}</h2>
          <p className="ex-scene">
            <span className="ex-scene-tag">典型场景</span>
            <span>{meta.usage}</span>
            <span className="ex-sep" aria-hidden="true">
              /
            </span>
            <span>{meta.desc}</span>
          </p>
        </div>
        <span className="st info">{meta.tag}</span>
      </div>
      <div className="p ex-stage">{children}</div>
      <div className="p">
        <div className="p-head">
          <div>
            <h3>结构要点</h3>
            <p>换渲染层时，这几条是必须原样搬运的结构</p>
          </div>
        </div>
        <ul className="points">
          {meta.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** 演示区内部的小节标题（比 .p-head 轻一级）。 */
export function ExSection({
  title,
  desc,
  extra,
  children,
}: {
  title: string
  desc?: string
  extra?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="ex-sec">
      <div className="ex-sec-head">
        <h4>{title}</h4>
        {desc && <span className="ex-cap">{desc}</span>}
        {extra}
      </div>
      {children}
    </section>
  )
}

/** 演示区内的窗口示意框。 */
export function ExFrame({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="ex-frame">
      {title && (
        <div className="ex-frame-bar">
          <span className="ex-frame-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{title}</span>
        </div>
      )}
      <div className="ex-frame-body">{children}</div>
    </div>
  )
}
