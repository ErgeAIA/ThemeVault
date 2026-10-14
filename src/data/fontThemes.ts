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

const FALLBACK: Record<FontCategory, string> = {
  sans: 'system-ui, sans-serif',
  serif: 'Georgia, serif',
  mono: 'ui-monospace, monospace',
}

export function buildFamily(name: string, category: FontCategory): string {
  return `"${name}", ${FALLBACK[category]}`
}

export function categoryOf(name: string): FontCategory {
  return AVAILABLE_FONTS.find((f) => f.name === name)?.category ?? 'sans'
}

// 流行 UI 字体搭配方案：每个方案为 标题/正文/代码/界面 分配字体。
export const fontThemes: FontTheme[] = [
  {
    id: 'inter-allround',
    name: 'Inter 全能',
    description: '全站 Inter，代码用 JetBrains Mono，干净现代的默认之选。',
    fonts: {
      heading: buildFamily('Inter', 'sans'),
      body: buildFamily('Inter', 'sans'),
      code: buildFamily('JetBrains Mono', 'mono'),
      ui: buildFamily('Inter', 'sans'),
    },
  },
  {
    id: 'space-ibm',
    name: 'Space Grotesk × IBM Plex',
    description: '几何感标题配人文无衬线正文，代码 IBM Plex Mono（取自 ThemeVault 主题数据）。',
    fonts: {
      heading: buildFamily('Space Grotesk', 'sans'),
      body: buildFamily('IBM Plex Sans', 'sans'),
      code: buildFamily('IBM Plex Mono', 'mono'),
      ui: buildFamily('Space Grotesk', 'sans'),
    },
  },
  {
    id: 'geist-modern',
    name: 'Geist 现代',
    description: 'Vercel 出品的无衬线，代码用 Geist Mono，极简科技感。',
    fonts: {
      heading: buildFamily('Geist', 'sans'),
      body: buildFamily('Geist', 'sans'),
      code: buildFamily('Geist Mono', 'mono'),
      ui: buildFamily('Geist', 'sans'),
    },
  },
  {
    id: 'editorial-serif',
    name: '编辑衬线',
    description: 'Playfair 标题 + Source Serif 正文，长文阅读气质，代码 JetBrains Mono。',
    fonts: {
      heading: buildFamily('Playfair Display', 'serif'),
      body: buildFamily('Source Serif 4', 'serif'),
      code: buildFamily('JetBrains Mono', 'mono'),
      ui: buildFamily('Source Sans 3', 'sans'),
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
  {
    id: 'friendly-rounded',
    name: '圆润亲和',
    description: 'Quicksand 标题 + Nunito 正文，友好可爱，代码 Fira Code。',
    fonts: {
      heading: buildFamily('Quicksand', 'sans'),
      body: buildFamily('Nunito', 'sans'),
      code: buildFamily('Fira Code', 'mono'),
      ui: buildFamily('Nunito', 'sans'),
    },
  },
  {
    id: 'technical-archivo',
    name: '技术感 Archivo',
    description: 'Archivo 紧凑无衬线配 Inter 正文，仪表盘 / 后台风格。',
    fonts: {
      heading: buildFamily('Archivo', 'sans'),
      body: buildFamily('Inter', 'sans'),
      code: buildFamily('JetBrains Mono', 'mono'),
      ui: buildFamily('Inter', 'sans'),
    },
  },
  {
    id: 'tokyo-night-ish',
    name: 'Tokyo Night 风',
    description: 'Space Grotesk 标题 + IBM Plex Sans 正文，冷调科技，代码 IBM Plex Mono。',
    fonts: {
      heading: buildFamily('Space Grotesk', 'sans'),
      body: buildFamily('IBM Plex Sans', 'sans'),
      code: buildFamily('IBM Plex Mono', 'mono'),
      ui: buildFamily('IBM Plex Sans', 'sans'),
    },
  },
]
