// ThemeVault 主题数据访问层。
// 数据源 preview/data.js 是 gen_index.py 的生成物（只读，禁止手改），
// 此处以副作用导入并复刻 preview.html 的家族感知 L1 解析（l1Value），
// 供「调色板海选」与「界面仿真」两个视图共用。

import '../../preview/data.js'

export interface TVBrand {
  color: string
  buttonText: string
  contrast: { white: number; black: number }
}

export interface TVTheme {
  id: string
  displayName: string
  zhName: string | null
  scheme: 'light' | 'dark'
  type: string
  number: number
  fonts: string[]
  fontStyle: string | null
  structuralNote: string | null
  license: string
  licenseNote: string | null
  tokenCount?: number
  brand: TVBrand
  textContrast: {
    textOnBg: number | null
    textMutedOnBg: number | null
    textDimOnBg: number | null
  }
  tokens: Record<string, string>
}

export interface TVFamily {
  family: string
  familyDisplayName: string
  license: string
  sourceRepo?: string
  l1RoleMap?: Record<string, string>
  sections?: [string, string[]][]
  badgePairs?: [string, string][]
  themes: TVTheme[]
}

interface TVData {
  families: TVFamily[]
}

const tv = (window as unknown as { __TV?: TVData }).__TV

export const families: TVFamily[] = tv?.families ?? []

export interface ThemeEntry {
  fam: TVFamily
  theme: TVTheme
}

export const allThemes: ThemeEntry[] = families
  .flatMap((fam) => fam.themes.map((theme) => ({ fam, theme })))
  .filter((e) => e.theme.type === 'value-theme' && e.theme.tokens)
  .sort((a, b) => a.theme.number - b.theme.number)

// ===== L1 → 家族原生角色映射兜底（与 preview.html 常量一致；家族 l1RoleMap 优先）=====

const ERGE_MD_L1_MAP: Record<string, string> = {
  bg: 'bg-page',
  'bg-surface': 'bg-reader',
  text: 'text-primary',
  'text-muted': 'text-secondary',
  'text-dim': 'text-muted',
  accent: 'accent-blue',
  ok: 'accent-green',
  warn: 'accent-yellow',
  danger: 'accent-red',
  info: 'accent-cyan',
  queued: 'accent-purple',
  'syntax-keyword': 'code-keyword',
  'syntax-string': 'code-string',
  'syntax-literal': 'code-number',
  'syntax-comment': 'code-comment',
  'syntax-title': 'code-function',
}

const OPENCODE_L1_MAP: Record<string, string> = {
  bg: 'background',
  'bg-surface': 'backgroundPanel',
  'bg-surface-2': 'backgroundElement',
  text: 'text',
  'text-muted': 'textMuted',
  accent: 'accent',
  'accent-secondary': 'secondary',
  border: 'border',
  'border-strong': 'borderActive',
  'border-subtle': 'borderSubtle',
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
  'syntax-keyword': 'syntaxKeyword',
  'syntax-string': 'syntaxString',
  'syntax-literal': 'syntaxNumber',
  'syntax-comment': 'syntaxComment',
  'syntax-title': 'syntaxFunction',
  'syntax-variable': 'syntaxVariable',
  'syntax-type': 'syntaxType',
}

const FALLBACK_MAPS: Record<string, Record<string, string>> = {
  ergemd: ERGE_MD_L1_MAP,
  opencode: OPENCODE_L1_MAP,
}

/** 取主题在 L1 角色 r 上的色值：L1 家族直接取，ergemd / opencode 经映射取原生角色。 */
export function l1Value(entry: ThemeEntry, role: string): string | null {
  const t = entry.theme.tokens || {}
  if (t[role]) return t[role]
  const map = entry.fam.l1RoleMap ?? FALLBACK_MAPS[entry.fam.family]
  if (map) {
    const native = map[role]
    if (native && t[native]) return t[native]
  }
  return null
}

// ===== WCAG 对比度（与 preview.html / gen_index.py 同口径；仅 6 位 hex 可算）=====

export function luminance(hex: string): number | null {
  const h = hex.replace('#', '')
  if (h.length !== 6) return null
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  if (rgb.some((c) => Number.isNaN(c))) return null
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2])
}

export function contrast(a: string, b: string): number | null {
  const la = luminance(a)
  const lb = luminance(b)
  if (la === null || lb === null) return null
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** 选与底色对比度更高的文字色（黑 / 白）。 */
export function fgFor(bg: string): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(bg || '')) return '#e5e5e5'
  const cDark = contrast('#101014', bg) ?? 0
  const cLight = contrast('#f5f5f7', bg) ?? 0
  return cDark >= cLight ? '#101014' : '#f5f5f7'
}

// ===== 主题 → CSS 变量（--tv-*），含角色回退链 =====

export function themeVars(entry: ThemeEntry): Record<string, string> {
  const first = (...roles: string[]): string | null => {
    for (const r of roles) {
      const val = l1Value(entry, r)
      if (val) return val
    }
    return null
  }

  const bg = first('bg') ?? '#1e1e24'
  const surface = first('bg-surface', 'card', 'bg') ?? bg
  const surface2 = first('bg-surface-2', 'bg-elevated', 'bg-surface', 'bg') ?? surface
  const elevated = first('bg-elevated', 'bg-surface-2', 'bg-surface') ?? surface
  const hover = first('bg-hover', 'bg-surface-2', 'bg-surface') ?? surface
  const card = first('card', 'bg-surface', 'bg') ?? surface
  const border = first('border', 'hairline', 'bg-surface-2', 'bg-surface') ?? surface2
  const borderStrong = first('border-strong', 'border') ?? border
  const accent = first('accent') ?? entry.theme.brand?.color ?? '#888888'
  const text = first('text') ?? '#e5e5e5'
  const muted = first('text-muted', 'text') ?? text
  const dim = first('text-dim', 'text-muted', 'text') ?? muted
  const ok = first('ok', 'success', 'info', 'accent') ?? accent
  const warn = first('warn', 'warning', 'accent') ?? accent
  const danger = first('danger', 'error', 'accent') ?? accent
  const info = first('info', 'accent') ?? accent

  return {
    '--tv-bg': bg,
    '--tv-surface': surface,
    '--tv-surface-2': surface2,
    '--tv-elevated': elevated,
    '--tv-hover': hover,
    '--tv-card': card,
    '--tv-border': border,
    '--tv-border-strong': borderStrong,
    '--tv-focus': first('border-focus') ?? accent,
    '--tv-text': text,
    '--tv-muted': muted,
    '--tv-dim': dim,
    '--tv-accent': accent,
    '--tv-accent-hover': first('accent-hover') ?? accent,
    '--tv-accent-deep': first('accent-deep') ?? accent,
    '--tv-accent-2': first('accent-secondary') ?? accent,
    '--tv-accent-fg': first('accent-foreground') ?? fgFor(accent),
    '--tv-ok': ok,
    '--tv-ok-fill': first('ok-fill', 'success') ?? ok,
    '--tv-warn': warn,
    '--tv-warn-fill': first('warn-fill', 'warning') ?? warn,
    '--tv-danger': danger,
    '--tv-danger-fill': first('danger-fill', 'error') ?? danger,
    '--tv-info': info,
    '--tv-info-fill': first('info-fill') ?? info,
    '--tv-queued': first('queued') ?? info,
    '--tv-syn-comment': first('syntax-comment') ?? dim,
    '--tv-syn-keyword': first('syntax-keyword') ?? accent,
    '--tv-syn-string': first('syntax-string') ?? ok,
    '--tv-syn-literal': first('syntax-literal') ?? warn,
    '--tv-syn-title': first('syntax-title') ?? accent,
    '--tv-syn-attr': first('syntax-attr', 'syntax-variable', 'syntax-type') ?? accent,
    '--tv-syn-function': first('syntax-title', 'syntax-function') ?? accent,
    '--tv-syn-variable': first('syntax-attr', 'syntax-variable') ?? text,
    '--tv-syn-type': first('syntax-type', 'syntax-title') ?? accent,
    '--tv-syn-operator': first('syntax-operator') ?? dim,
    '--tv-syn-punctuation': first('syntax-punctuation') ?? dim,
    '--tv-radius': entry.theme.structuralNote?.includes('radius-none') ? '0px' : '12px',
  }
}

// ===== 字体 =====

export type FontStacks = Record<'heading' | 'body' | 'code' | 'ui', string>

export const THEME_FONT_ID = 'theme'

// 中文回退家族（与 fontThemes 保持一致），让跟随主题时中文也能落到一致字体。
const CJK_SANS = '"PingFang SC", "Microsoft YaHei", "Noto Sans SC"'

/** 「跟随主题」字体栈：主题声明 fonts[0] 为标题/正文/界面，fonts[1]（或等宽声明）为代码。 */
export function themeFontStacks(entry: ThemeEntry): FontStacks {
  const fonts = entry.theme.fonts ?? []
  const isMono = (entry.theme.fontStyle ?? '').includes('mono')
  const primary = fonts[0]
    ? `"${fonts[0]}", system-ui, sans-serif, ${CJK_SANS}`
    : `system-ui, sans-serif, ${CJK_SANS}`
  const mono = fonts[1]
    ? `"${fonts[1]}", ui-monospace, monospace, ${CJK_SANS}`
    : fonts[0] && isMono
      ? `"${fonts[0]}", ui-monospace, monospace, ${CJK_SANS}`
      : `ui-monospace, monospace, ${CJK_SANS}`
  return { heading: primary, body: primary, code: mono, ui: primary }
}

// ===== 卡片分区角色（与 preview.html 同口径；家族派生 sections 优先）=====

const SECTION_ROLES: [string, string[]][] = [
  [
    '背景 / 文本 / 边框',
    ['bg', 'bg-surface', 'bg-surface-2', 'bg-elevated', 'bg-hover', 'text', 'text-muted', 'text-dim', 'border', 'border-strong', 'border-focus', 'card', 'hairline'],
  ],
  ['强调色', ['accent', 'accent-hover', 'accent-deep', 'accent-secondary', 'accent-foreground']],
  ['状态色', ['ok', 'ok-fill', 'warn', 'warn-fill', 'danger', 'danger-fill', 'info', 'info-fill', 'queued', 'queued-fill']],
  ['语法高亮', ['syntax-comment', 'syntax-keyword', 'syntax-string', 'syntax-literal', 'syntax-title', 'syntax-attr']],
]

const FAMILY_SECTION_ROLES: Record<string, [string, string[]][]> = {
  ergemd: [
    ['背景 / 文本', ['bg-page', 'bg-reader', 'bg-sidebar', 'bg-code', 'bg-secondary', 'bg-tertiary', 'text-primary', 'text-secondary', 'text-muted', 'text-heading']],
    ['标题层级', ['h1-color', 'h2-color', 'h3-color', 'h4-color', 'h5-color', 'h6-color']],
    ['强调 / 品牌', ['accent-cyan', 'accent-pink', 'accent-purple', 'accent-green', 'accent-yellow', 'accent-orange', 'accent-red', 'accent-blue', 'brand-primary', 'brand-secondary', 'brand-logo']],
    ['状态色 (callout)', ['obsidian-callout-note', 'obsidian-callout-info', 'obsidian-callout-success', 'obsidian-callout-warning', 'obsidian-callout-danger']],
    ['语法高亮', ['code-keyword', 'code-string', 'code-number', 'code-comment', 'code-function', 'code-text']],
  ],
}

const BADGE_ROLES: Record<string, [string, string][]> = {
  opensquilla: [['text', 'bg'], ['text-muted', 'bg'], ['text-dim', 'bg']],
  catppuccin: [['text', 'bg'], ['text-muted', 'bg'], ['text-dim', 'bg']],
  ergemd: [['text-primary', 'bg-page'], ['text-secondary', 'bg-page'], ['text-muted', 'bg-page']],
  opencode: [['text', 'background'], ['textMuted', 'background']],
}

/** 卡片分区：家族派生 sections 优先，否则 ergemd 专用 / 通用兜底。 */
export function cardSections(entry: ThemeEntry): [string, string[]][] {
  return entry.fam.sections ?? FAMILY_SECTION_ROLES[entry.fam.family] ?? SECTION_ROLES
}

const usable = (v: string | undefined): string | null =>
  v && !v.includes('var(') ? v : null

/** 家族感知 AA 对比度徽标（text/bg 等角色对），返回可读文本与是否通过。 */
export function badgeInfos(entry: ThemeEntry): {
  role: string
  text: string
  ratio: number | null
  ok: boolean | null
}[] {
  const tokens = entry.theme.tokens || {}
  const pairs = entry.fam.badgePairs ?? BADGE_ROLES[entry.fam.family] ?? BADGE_ROLES.opensquilla
  return pairs.map(([r, bgr]) => {
    const a = usable(tokens[r])
    const b = usable(tokens[bgr])
    if (!a || !b) return { role: r, text: `${r} 无`, ratio: null, ok: null }
    const ratio = contrast(a, b)
    if (ratio === null) return { role: r, text: `${r} 无`, ratio: null, ok: null }
    const ok = ratio >= 4.5
    return { role: r, text: `${r} ${ratio.toFixed(1)} ${ok ? '✓' : '✗'}`, ratio, ok }
  })
}

/** AA 通过情况：已测对数 / 失败数。 */
export function health(entry: ThemeEntry): { tested: number; fail: number } {
  const b = badgeInfos(entry).filter((x) => x.ratio !== null)
  return { tested: b.length, fail: b.filter((x) => !x.ok).length }
}

/** 卡片底色：家族 bg 角色实色，非纯色回退中性底，否则透明会露出深色页底。 */
export function cardBg(entry: ThemeEntry): string {
  const bgRole = entry.fam.family === 'ergemd' ? 'bg-page' : entry.fam.family === 'opencode' ? 'background' : 'bg'
  const raw = entry.theme.tokens?.[bgRole]
  if (raw && /^#[0-9a-fA-F]{6}$/.test(raw)) return raw
  return entry.theme.scheme === 'light' ? '#f5f5f7' : '#101014'
}

// ===== 代码块高亮（家族感知，与 preview.html 同口径）=====

const SYNTAX_ROLE_MAP: Record<string, Record<string, string>> = {
  _default: { keyword: 'syntax-keyword', string: 'syntax-string', number: 'syntax-literal', comment: 'syntax-comment', fn: 'syntax-title', attr: 'syntax-attr' },
  ergemd: { keyword: 'code-keyword', string: 'code-string', number: 'code-number', comment: 'code-comment', fn: 'code-function', text: 'code-text' },
  opencode: {
    keyword: 'syntaxKeyword', string: 'syntaxString', number: 'syntaxNumber', comment: 'syntaxComment',
    fn: 'syntaxFunction', variable: 'syntaxVariable', type: 'syntaxType', operator: 'syntaxOperator', punctuation: 'syntaxPunctuation',
  },
}
const CODE_BG_ROLE: Record<string, string> = { ergemd: 'bg-code', opencode: 'backgroundPanel' }
const CODE_TOKEN_MAP: Record<string, string> = { c: 'comment', k: 'keyword', s: 'string', n: 'number', f: 'fn', v: 'variable', t: 'type', o: 'operator', p: 'punctuation' }
const CODE_LINES: [string, string][][] = [
  [['c', '// 主题预览 · syntax highlight']],
  [['k', 'const'], ['v', ' theme'], ['o', ' = '], ['p', '{ '], ['v', 'name'], ['o', ': '], ['s', '"vault"'], ['p', ', '], ['v', 'size'], ['o', ': '], ['n', '42'], ['p', ' }']],
  [['k', 'function'], ['f', ' pick'], ['p', '('], ['v', 't'], ['o', ': '], ['t', 'Theme'], ['p', ') {']],
  [['d', '  '], ['k', 'return'], ['v', ' t'], ['o', '.'], ['v', 'name'], ['o', ' + '], ['s', '":"'], ['o', ' + '], ['v', 'theme.size'], ['p', ';']],
  [['p', '}']],
]

/** 代码块按家族映射上色，返回每行 token（颜色 + 文本）；非纯色降级为 text。 */
export function codeBlockLines(entry: ThemeEntry): { color: string; text: string }[][] {
  const fam = entry.fam.family
  const sm = SYNTAX_ROLE_MAP[fam] ?? SYNTAX_ROLE_MAP._default
  const tokens = entry.theme.tokens || {}
  const text = l1Value(entry, 'text') || '#e5e5e5'
  const colorOf = (key: string): string => {
    const sem = CODE_TOKEN_MAP[key]
    const role = sem ? sm[sem] : null
    return (role && usable(tokens[role])) || text
  }
  return CODE_LINES.map((line) => line.map(([k, s]) => ({ color: colorOf(k), text: s })))
}

export const codeBlockBg = (entry: ThemeEntry): string | null =>
  usable(entry.theme.tokens?.[CODE_BG_ROLE[entry.fam.family] ?? 'bg-surface']) ?? null
