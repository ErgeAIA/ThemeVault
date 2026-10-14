export type FontRole = 'heading' | 'body' | 'code' | 'ui'
export type FontCategory = 'sans' | 'serif' | 'mono'

export interface FontTheme {
  id: string
  name: string
  description: string
  fonts: Record<FontRole, string>
}

export const FONT_ROLES: { key: FontRole; label: string }[] = [
  { key: 'heading', label: '标题' },
  { key: 'body', label: '正文' },
  { key: 'code', label: '代码' },
  { key: 'ui', label: '界面' },
]

export interface FontMeta {
  name: string
  category: FontCategory
}

// 可选字体家族（用于"逐个元素微调"下拉）。均可在 Google Fonts 获取。
export const AVAILABLE_FONTS: FontMeta[] = [
  { name: 'Inter', category: 'sans' },
  { name: 'IBM Plex Sans', category: 'sans' },
  { name: 'Geist', category: 'sans' },
  { name: 'Source Sans 3', category: 'sans' },
  { name: 'Space Grotesk', category: 'sans' },
  { name: 'Archivo', category: 'sans' },
  { name: 'Nunito', category: 'sans' },
  { name: 'Quicksand', category: 'sans' },
  { name: 'Playfair Display', category: 'serif' },
  { name: 'Source Serif 4', category: 'serif' },
  { name: 'JetBrains Mono', category: 'mono' },
  { name: 'IBM Plex Mono', category: 'mono' },
  { name: 'Geist Mono', category: 'mono' },
  { name: 'Fira Code', category: 'mono' },
]

const CJK_SANS = '"PingFang SC", "Microsoft YaHei", "Noto Sans SC"'
const CJK_SERIF = '"Songti SC", "SimSun", "Noto Serif SC"'

// 回退链统一追加中文家族：拉丁字体不含中文字形，否则中文会落到各系统默认字体，
// 导致「切换字体方案」在中文界面几乎看不出变化。
const FALLBACK: Record<FontCategory, string> = {
  sans: `system-ui, sans-serif, ${CJK_SANS}`,
  serif: `Georgia, serif, ${CJK_SERIF}`,
  mono: `ui-monospace, monospace, ${CJK_SANS}`,
}

export function buildFamily(name: string, category: FontCategory): string {
  return `"${name}", ${FALLBACK[category]}`
}

export function categoryOf(name: string): FontCategory {
  return AVAILABLE_FONTS.find((f) => f.name === name)?.category ?? 'sans'
}

// 精选 UI 字体簇：每簇 ≤3 家族、等宽同源优先、回退链含中文（见 FALLBACK）。
export const fontThemes: FontTheme[] = [
  {
    id: 'system',
    name: '系统默认',
    description: 'system-ui + 等宽，零字体负载、原生平台感，中文走系统字体。',
    fonts: {
      heading: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif, ${CJK_SANS}`,
      body: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif, ${CJK_SANS}`,
      code: `ui-monospace, SFMono-Regular, Menlo, monospace, ${CJK_SANS}`,
      ui: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif, ${CJK_SANS}`,
    },
  },
  {
    id: 'geist-modern',
    name: 'Geist 现代',
    description: 'Vercel 出品的 Geist + Geist Mono，同源等宽，极简科技感。',
    fonts: {
      heading: buildFamily('Geist', 'sans'),
      body: buildFamily('Geist', 'sans'),
      code: buildFamily('Geist Mono', 'mono'),
      ui: buildFamily('Geist', 'sans'),
    },
  },
  {
    id: 'ibm-plex',
    name: 'IBM Plex 套装',
    description: 'IBM Plex Sans + IBM Plex Mono，全家同源最协调，人文无衬线。',
    fonts: {
      heading: buildFamily('IBM Plex Sans', 'sans'),
      body: buildFamily('IBM Plex Sans', 'sans'),
      code: buildFamily('IBM Plex Mono', 'mono'),
      ui: buildFamily('IBM Plex Sans', 'sans'),
    },
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk 展示',
    description: 'Space Grotesk 几何标题 + Inter 正文，显示体对比建立层级，代码 IBM Plex Mono。',
    fonts: {
      heading: buildFamily('Space Grotesk', 'sans'),
      body: buildFamily('Inter', 'sans'),
      code: buildFamily('IBM Plex Mono', 'mono'),
      ui: buildFamily('Inter', 'sans'),
    },
  },
  {
    id: 'editorial-serif',
    name: '编辑衬线',
    description: 'Playfair 展示标题 + Source Serif 4 正文/界面，长文阅读气质，代码 JetBrains Mono（压到 3 家族）。',
    fonts: {
      heading: buildFamily('Playfair Display', 'serif'),
      body: buildFamily('Source Serif 4', 'serif'),
      code: buildFamily('JetBrains Mono', 'mono'),
      ui: buildFamily('Source Serif 4', 'serif'),
    },
  },
  {
    id: 'friendly-rounded',
    name: '圆润亲和',
    description: 'Quicksand 标题 + Nunito 正文/界面，友好可爱，代码 Fira Code。',
    fonts: {
      heading: buildFamily('Quicksand', 'sans'),
      body: buildFamily('Nunito', 'sans'),
      code: buildFamily('Fira Code', 'mono'),
      ui: buildFamily('Nunito', 'sans'),
    },
  },
  {
    id: 'mono-obsessed',
    name: '等宽控',
    description: '全站 IBM Plex Mono，极客与终端美学。',
    fonts: {
      heading: buildFamily('IBM Plex Mono', 'mono'),
      body: buildFamily('IBM Plex Mono', 'mono'),
      code: buildFamily('IBM Plex Mono', 'mono'),
      ui: buildFamily('IBM Plex Mono', 'mono'),
    },
  },
]
