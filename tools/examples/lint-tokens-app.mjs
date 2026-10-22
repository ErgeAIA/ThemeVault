#!/usr/bin/env node
/**
 * tools/examples/lint-tokens-app.mjs
 *
 * 用途：对「React 组件版示例页」做 token 审计。
 * 特点：零 npm 依赖、只读（仅 --report 且路径必须在 .tmp/ 下时写入）、不联网。
 *
 * 默认扫描范围（可用 --root 覆盖根目录）：
 *   src/components/examples/**\/*.tsx
 *   src/styles/examples*.css
 * 变量定义来源（只读采集，不作为门禁对象）：
 *   src/**\/*.css 的 "--x:" 定义
 *   src/**\/*.ts(x) 的 '--x': 定义（App.tsx 注入的 --tv-font-* 走这里）
 *   src/data/tv.ts 中 themeVars 返回的 '--tv-*' 字符串键
 *
 * 检查项
 *   [1] 禁裸色值        FAIL  #hex / rgb() / hsl() / 具名颜色 / SVG 具体色值
 *   [2] 引用完整性      FAIL  var(--x) 引用名找不到定义
 *   [3] 自造变量        FAIL  定义的自定义属性不在允许集合内
 *   [4] 双方案覆盖      WARN  逐页 var(--tv-*) 使用统计；某页 0 引用但有样式
 *   [5] 对比度配对      WARN  仅统计实际用到的角色，< 4.5 提示，不改值
 *   [6] 未使用 token    INFO
 *
 * CLI：--verbose / --no-contrast / --root <dir> / --selftest / --report <path> / --help
 * 退出码：0 = 无 FAIL；1 = 有 FAIL；2 = 根目录或 INDEX.json 不可读；
 *         带 --selftest 时 0 = 自测全部通过
 */
import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve, join, relative, isAbsolute, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const HERE = dirname(fileURLToPath(import.meta.url))
const DEFAULT_ROOT = resolve(HERE, '..', '..')

const SCAN_TSX_DIR = 'src/components/examples'
const SCAN_CSS_GLOB = /^examples.*\.css$/i
const INDEX_JSON = 'INDEX.json'
const DARK_THEME_NUMBER = 1
const LIGHT_THEME_NUMBER = 2
const AA_TEXT_MIN = 4.5

/* ------------------------------------------------------------------ *
 * 0. 小工具
 * ------------------------------------------------------------------ */

function buildLineStarts(text) {
  const starts = [0]
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1)
  return starts
}

function makeLineOf(starts) {
  return function lineOf(offset) {
    if (offset < 0) offset = 0
    let lo = 0
    let hi = starts.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (starts[mid] <= offset) lo = mid
      else hi = mid - 1
    }
    return lo + 1
  }
}

function blank(text) {
  let out = ''
  for (let k = 0; k < text.length; k++) out += text[k] === '\n' ? '\n' : ' '
  return out
}

/** 把 CSS 注释替换成等长空白（保留换行），偏移与行号不变。 */
function stripCssComments(text) {
  let out = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2)
      const stop = end === -1 ? text.length : end + 2
      out += blank(text.slice(i, stop))
      i = stop
    } else {
      out += text[i]
      i++
    }
  }
  return out
}

/** TS/TSX：剔除 // 行注释与块注释（保留换行与长度）；"://" 视为 URL 不作注释。 */
function stripJsComments(text) {
  let out = ''
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2)
      const stop = end === -1 ? text.length : end + 2
      out += blank(text.slice(i, stop))
      i = stop
      continue
    }
    if (ch === '/' && text[i + 1] === '/' && text[i - 1] !== ':') {
      let k = i
      while (k < text.length && text[k] !== '\n') k++
      out += blank(text.slice(i, k))
      i = k
      continue
    }
    out += ch
    i++
  }
  return out
}

function skipString(text, i, end) {
  const quote = text[i]
  let k = i + 1
  while (k < end) {
    if (text[k] === '\\') { k += 2; continue }
    if (text[k] === quote) return k + 1
    k++
  }
  return end
}

function matchBrace(text, openIndex, end) {
  let depth = 0
  for (let k = openIndex; k < end; k++) {
    const ch = text[k]
    if (ch === '"' || ch === "'" || ch === '`') { k = skipString(text, k, end) - 1; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return k
    }
  }
  return end
}

function rel(root, abs) {
  return relative(root, abs).split(sep).join('/')
}

function fsRead(abs) {
  try {
    return readFileSync(abs, 'utf8')
  } catch {
    return null
  }
}

/* ------------------------------------------------------------------ *
 * 1. 颜色字面量识别
 * ------------------------------------------------------------------ */

const NAMED_HEX = 'aliceblue:f0f8ff,antiquewhite:faebd7,aqua:00ffff,aquamarine:7fffd4,azure:f0ffff,beige:f5f5dc,bisque:ffe4c4,black:000000,blanchedalmond:ffebcd,blue:0000ff,blueviolet:8a2be2,brown:a52a2a,burlywood:deb887,cadetblue:5f9ea0,chartreuse:7fff00,chocolate:d2691e,coral:ff7f50,cornflowerblue:6495ed,cornsilk:fff8dc,crimson:dc143c,cyan:00ffff,darkblue:00008b,darkcyan:008b8b,darkgoldenrod:b8860b,darkgray:a9a9a9,darkgreen:006400,darkgrey:a9a9a9,darkkhaki:bdb76b,darkmagenta:8b008b,darkolivegreen:556b2f,darkorange:ff8c00,darkorchid:9932cc,darkred:8b0000,darksalmon:e9967a,darkseagreen:8fbc8f,darkslateblue:483d8b,darkslategray:2f4f4f,darkslategrey:2f4f4f,darkturquoise:00ced1,darkviolet:9400d3,deeppink:ff1493,deepskyblue:00bfff,dimgray:696969,dimgrey:696969,dodgerblue:1e90ff,firebrick:b22222,floralwhite:fffaf0,forestgreen:228b22,fuchsia:ff00ff,gainsboro:dcdcdc,ghostwhite:f8f8ff,gold:ffd700,goldenrod:daa520,gray:808080,green:008000,greenyellow:adff2f,grey:808080,honeydew:f0fff0,hotpink:ff69b4,indianred:cd5c5c,indigo:4b0082,ivory:fffff0,khaki:f0e68c,lavender:e6e6fa,lavenderblush:fff0f5,lawngreen:7cfc00,lemonchiffon:fffacd,lightblue:add8e6,lightcoral:f08080,lightcyan:e0ffff,lightgoldenrodyellow:fafad2,lightgray:d3d3d3,lightgreen:90ee90,lightgrey:d3d3d3,lightpink:ffb6c1,lightsalmon:ffa07a,lightseagreen:20b2aa,lightskyblue:87cefa,lightslategray:778899,lightslategrey:778899,lightsteelblue:b0c4de,lightyellow:ffffe0,lime:00ff00,limegreen:32cd32,linen:faf0e6,magenta:ff00ff,maroon:800000,mediumaquamarine:66cdaa,mediumblue:0000cd,mediumorchid:ba55d3,mediumpurple:9370db,mediumseagreen:3cb371,mediumslateblue:7b68ee,mediumspringgreen:00fa9a,mediumturquoise:48d1cc,mediumvioletred:c71585,midnightblue:191970,mintcream:f5fffa,mistyrose:ffe4e1,moccasin:ffe4b5,navajowhite:ffdead,navy:000080,oldlace:fdf5e6,olive:808000,olivedrab:6b8e23,orange:ffa500,orangered:ff4500,orchid:da70d6,palegoldenrod:eee8aa,palegreen:98fb98,paleturquoise:afeeee,palevioletred:db7093,papayawhip:ffefd5,peachpuff:ffdab9,peru:cd853f,pink:ffc0cb,plum:dda0dd,powderblue:b0e0e6,purple:800080,rebeccapurple:663399,red:ff0000,rosybrown:bc8f8f,royalblue:4169e1,saddlebrown:8b4513,salmon:fa8072,sandybrown:f4a460,seagreen:2e8b57,seashell:fff5ee,sienna:a0522d,silver:c0c0c0,skyblue:87ceeb,slateblue:6a5acd,slategray:708090,slategrey:708090,snow:fffafa,springgreen:00ff7f,steelblue:4682b4,tan:d2b48c,teal:008080,thistle:d8bfd8,tomato:ff6347,turquoise:40e0d0,violet:ee82ee,wheat:f5deb3,white:ffffff,whitesmoke:f5f5f5,yellow:ffff00,yellowgreen:9acd32'

const NAMED_COLORS = new Map(
  NAMED_HEX.split(',').map((p) => {
    const i = p.indexOf(':')
    return [p.slice(0, i), p.slice(i + 1)]
  }),
)

/** 允许出现在值里的非字面量关键字。 */
const ALLOWED_KEYWORDS = new Set([
  'transparent', 'currentcolor', 'inherit', 'initial', 'unset', 'revert',
  'none', 'auto', 'normal', 'solid', 'dashed', 'dotted', 'double', 'thin', 'thick',
  'srgb', 'in', 'oklab', 'oklch', 'lch', 'lab', 'hwb', 'linear', 'shorter', 'longer',
  'hue', 'increase', 'decrease', 'plus', 'minus', 'oklab', 'display-p3', 'rec2020',
  'repeat', 'no-repeat', 'center', 'contain', 'cover', 'absolute', 'relative', 'fixed',
])

const COLOR_FN_RE = /\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch)\s*\(/gi

/** 找出文本里所有字符串字面量的区间（单双引号与模板串，跳过转义）。 */
function stringRanges(text) {
  const out = []
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === '"' || ch === "'") {
      const end = skipString(text, i, text.length)
      out.push([i, end])
      i = end
    } else {
      i++
    }
  }
  return out
}

function inRanges(idx, ranges) {
  for (const r of ranges) {
    if (idx >= r[0] && idx < r[1]) return true
    if (r[0] > idx) return false
  }
  return false
}

/**
 * 在给定文本片段里找颜色字面量。
 * opts.stringsOnly = true 时只认字符串字面量内的命中（TSX 用，避免把标识符 RED 当成具名色 red）。
 * 返回 [{ line, kind, snippet }]
 */
function scanLiterals(text, lineOf, offsetBase, opts) {
  const hits = []
  const base = offsetBase || 0
  const stringsOnly = !!(opts && opts.stringsOnly)
  const ranges = stringsOnly ? stringRanges(text) : null

  // 裸十六进制：仅 3/4/6/8 位；# 前不能是标识符字符
  const hexRe = /#([0-9a-fA-F]{3,8})(?![0-9a-zA-Z_-])/g
  let m
  while ((m = hexRe.exec(text)) !== null) {
    const digits = m[1]
    if ([3, 4, 6, 8].indexOf(digits.length) === -1) continue
    if (stringsOnly && !inRanges(m.index, ranges)) continue
    const before = m.index > 0 ? text[m.index - 1] : ''
    if (/[A-Za-z0-9_$]/.test(before)) continue
    hits.push({ line: lineOf(base + m.index), kind: '裸十六进制色值', snippet: '#' + digits })
  }

  // 颜色函数
  COLOR_FN_RE.lastIndex = 0
  while ((m = COLOR_FN_RE.exec(text)) !== null) {
    if (stringsOnly && !inRanges(m.index, ranges)) continue
    hits.push({ line: lineOf(base + m.index), kind: '裸颜色函数', snippet: m[0] + '…' })
  }

  // 具名颜色
  const wordRe = /[A-Za-z][A-Za-z-]*/g
  while ((m = wordRe.exec(text)) !== null) {
    const word = m[0].toLowerCase()
    if (ALLOWED_KEYWORDS.has(word)) continue
    if (!NAMED_COLORS.has(word)) continue
    if (stringsOnly && !inRanges(m.index, ranges)) continue
    hits.push({ line: lineOf(base + m.index), kind: '具名颜色', snippet: m[0] })
  }

  return hits
}

/* ------------------------------------------------------------------ *
 * 2. 颜色值解析（供对比度用）
 * ------------------------------------------------------------------ */

function hexToRgb(hex) {
  let h = String(hex).replace(/^#/, '')
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6 && h.length !== 8) return null
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  if ([r, g, b].some((v) => Number.isNaN(v))) return null
  return { r, g, b, a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 }
}

function parseColor(raw) {
  const text = String(raw == null ? '' : raw).trim()
  if (!text) return null
  const lower = text.toLowerCase()
  if (lower === 'transparent') return { r: 0, g: 0, b: 0, a: 0 }
  if (text[0] === '#') return hexToRgb(text)
  if (NAMED_COLORS.has(lower)) return hexToRgb('#' + NAMED_COLORS.get(lower))
  const fx = /^([a-z]+)\(([\s\S]*)\)$/i.exec(text)
  if (!fx) return null
  const fn = fx[1].toLowerCase()
  const body = fx[2]
  if (fn === 'rgb' || fn === 'rgba') {
    const parts = body.split(/[\s,/]+/).filter(Boolean)
    if (parts.length < 3) return null
    const ch = (t) => (t.slice(-1) === '%' ? (parseFloat(t) / 100) * 255 : parseFloat(t))
    const r = ch(parts[0])
    const g = ch(parts[1])
    const b = ch(parts[2])
    if ([r, g, b].some((v) => !isFinite(v))) return null
    let a = 1
    if (parts[3] !== undefined) {
      const t = parts[3]
      a = t.slice(-1) === '%' ? parseFloat(t) / 100 : parseFloat(t)
      if (!isFinite(a)) a = 1
    }
    return { r, g, b, a: Math.max(0, Math.min(1, a)) }
  }
  return null
}

function mixColors(c1, c2, w1) {
  const w2 = 1 - w1
  const a = c1.a * w1 + c2.a * w2
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 }
  return {
    r: (c1.r * c1.a * w1 + c2.r * c2.a * w2) / a,
    g: (c1.g * c1.a * w1 + c2.g * c2.a * w2) / a,
    b: (c1.b * c1.a * w1 + c2.b * c2.a * w2) / a,
    a,
  }
}

function channelLum(v) {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

function relativeLuminance(c) {
  return 0.2126 * channelLum(c.r) + 0.7152 * channelLum(c.g) + 0.0722 * channelLum(c.b)
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/* ------------------------------------------------------------------ *
 * 3. 单文件分析
 * ------------------------------------------------------------------ */

const COLOR_PROP_RE = /(color|background|border|fill|stroke|outline|shadow|filter|caret|accent|decoration)/i
const VAR_REF_RE = /var\(\s*(--[A-Za-z0-9_]+(?:-[A-Za-z0-9_]+)*)\s*(,?)/g
const CUSTOM_DEF_CSS_RE = /(^|[;{\s])(--[A-Za-z0-9_]+(?:-[A-Za-z0-9_]+)*)\s*:/g
const CUSTOM_DEF_TSX_RE = /['"](--[A-Za-z0-9_]+(?:-[A-Za-z0-9_]+)*)['"]\s*:/g

/** CSS：解析声明，逐条检查值里的颜色字面量，并收集 var 引用与自定义属性定义。 */
function analyzeCss(text, lineOf) {
  const result = { literals: [], refs: [], defs: [], hasStyle: false }
  const css = stripCssComments(text)
  const decls = []

  function pushDecl(raw, start) {
    const trimmed = raw.trim()
    if (!trimmed) return
    const colon = trimmed.indexOf(':')
    if (colon <= 0) return
    const prop = trimmed.slice(0, colon).trim()
    if (!prop || /[\s{}]/.test(prop)) return
    const lead = raw.length - raw.replace(/^\s+/, '').length
    decls.push({ prop, value: trimmed.slice(colon + 1).trim(), offset: start + lead })
  }

  let i = 0
  let seg = 0
  let paren = 0
  while (i < css.length) {
    const ch = css[i]
    if (ch === '"' || ch === "'") { i = skipString(css, i, css.length); continue }
    if (ch === '(') { paren++; i++; continue }
    if (ch === ')') { if (paren > 0) paren--; i++; continue }
    if (paren === 0 && ch === '{') {
      pushDecl(css.slice(seg, i), seg)
      seg = i + 1
      i++
      continue
    }
    if (paren === 0 && ch === ';') {
      pushDecl(css.slice(seg, i), seg)
      seg = i + 1
      i++
      continue
    }
    i++
  }

  for (const d of decls) {
    result.hasStyle = true
    const isCustom = d.prop.indexOf('--') === 0
    if (isCustom) result.defs.push({ name: d.prop, line: lineOf(d.offset), value: d.value })
    for (const h of scanLiterals(d.value, lineOf, d.offset)) {
      result.literals.push({ ...h, context: d.prop + ': ' + d.value })
    }
  }

  VAR_REF_RE.lastIndex = 0
  let rm
  while ((rm = VAR_REF_RE.exec(css)) !== null) {
    result.refs.push({ name: rm[1], hasFallback: rm[2] === ',', line: lineOf(rm.index) })
  }
  return result
}

/** TSX：先定位颜色上下文（内联 style 对象 / 颜色类属性 / 对象字面量颜色键），再查字面量。 */
function colorSpansTsx(src) {
  const spans = []
  let m

  const styleRe = /\bstyle\s*=\s*\{\{/g
  while ((m = styleRe.exec(src)) !== null) {
    const open = m.index + m[0].length - 1
    const close = matchBrace(src, open, src.length)
    spans.push({ start: open, end: close + 1 })
  }

  const attrRe = /\b(fill|stroke|stopColor|floodColor|lightingColor|color)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  while ((m = attrRe.exec(src)) !== null) {
    spans.push({ start: m.index, end: m.index + m[0].length })
  }

  const propRe = /\b([A-Za-z][A-Za-z0-9]*)\s*:\s*(?=['"])/g
  while ((m = propRe.exec(src)) !== null) {
    if (!COLOR_PROP_RE.test(m[1])) continue
    const quoteEnd = skipString(src, propRe.lastIndex, src.length)
    spans.push({ start: m.index, end: quoteEnd })
  }

  spans.sort((a, b) => a.start - b.start)
  const merged = []
  for (const s of spans) {
    const last = merged[merged.length - 1]
    if (last && s.start <= last.end) last.end = Math.max(last.end, s.end)
    else merged.push({ start: s.start, end: s.end })
  }
  return merged
}

function analyzeTsx(text, lineOf) {
  const result = { literals: [], refs: [], defs: [], hasStyle: false }
  const src = stripJsComments(text)

  const spans = colorSpansTsx(src)
  const claimed = []
  for (const span of spans) {
    claimed.push([span.start, span.end])
    const chunk = src.slice(span.start, span.end)
    for (const h of scanLiterals(chunk, lineOf, span.start, { stringsOnly: true })) {
      result.literals.push({ ...h, context: chunk.replace(/\s+/g, ' ').trim().slice(0, 120) })
    }
  }

  // 全域兜底：颜色上下文之外也可能藏色值（如 const RED = '#ff0000' 后再用）。
  // 只认 6/8 位 hex 与颜色函数——3/4 位 hex 会与 #017 这类主题编号撞车，故仅在上面的上下文里判。
  const inClaimed = (idx) => claimed.some((c) => idx >= c[0] && idx < c[1])
  const strongRe = /(?:(#)([0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-zA-Z_-]))|(\b(?:rgba?|hsla?)\s*\()/g
  let sm
  while ((sm = strongRe.exec(src)) !== null) {
    if (inClaimed(sm.index)) continue
    if (sm[1] === '#') {
      const before = sm.index > 0 ? src[sm.index - 1] : ''
      if (/[A-Za-z0-9_$]/.test(before)) continue
      result.literals.push({
        line: lineOf(sm.index), kind: '裸十六进制色值', snippet: '#' + sm[2],
        context: src.slice(Math.max(0, sm.index - 40), sm.index + 20).replace(/\s+/g, ' ').trim(),
      })
    } else {
      result.literals.push({
        line: lineOf(sm.index), kind: '裸颜色函数', snippet: sm[3].trim(),
        context: src.slice(Math.max(0, sm.index - 40), sm.index + 40).replace(/\s+/g, ' ').trim(),
      })
    }
  }

  result.hasStyle = spans.length > 0 || /\bclassName\s*=/.test(src)

  VAR_REF_RE.lastIndex = 0
  let rm
  while ((rm = VAR_REF_RE.exec(src)) !== null) {
    result.refs.push({ name: rm[1], hasFallback: rm[2] === ',', line: lineOf(rm.index) })
  }

  CUSTOM_DEF_TSX_RE.lastIndex = 0
  while ((rm = CUSTOM_DEF_TSX_RE.exec(src)) !== null) {
    result.defs.push({ name: rm[1], line: lineOf(rm.index), value: '' })
  }
  return result
}

/* ------------------------------------------------------------------ *
 * 4. 定义来源采集
 * ------------------------------------------------------------------ */

function walkFiles(dir, filter, acc) {
  const out = acc || []
  if (!existsSync(dir)) return out
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.git') continue
      walkFiles(p, filter, out)
    } else if (filter(p, ent.name)) {
      out.push(p)
    }
  }
  return out
}

/** 采集整个 src/ 下的自定义属性定义：name -> [{ file, line }] */
function collectDefinitions(root) {
  const defs = new Map()
  const files = walkFiles(join(root, 'src'), (p, n) => /\.(css|tsx|ts)$/.test(n), [])
  for (const abs of files) {
    const text = fsRead(abs)
    if (text === null) continue
    const isCss = /\.css$/.test(abs)
    const stripped = isCss ? stripCssComments(text) : stripJsComments(text)
    const lineOf = makeLineOf(buildLineStarts(stripped))
    const re = isCss ? CUSTOM_DEF_CSS_RE : CUSTOM_DEF_TSX_RE
    re.lastIndex = 0
    let m
    while ((m = re.exec(stripped)) !== null) {
      const name = isCss ? m[2] : m[1]
      if (!defs.has(name)) defs.set(name, [])
      defs.get(name).push({ file: rel(root, abs), line: lineOf(m.index) })
    }
  }
  return defs
}

/* ------------------------------------------------------------------ *
 * 5. 主流程
 * ------------------------------------------------------------------ */

function parseArgs(argv) {
  const o = { root: null, verbose: false, contrast: true, selftest: false, report: null, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') o.help = true
    else if (a === '--verbose' || a === '-v') o.verbose = true
    else if (a === '--no-contrast') o.contrast = false
    else if (a === '--selftest') o.selftest = true
    else if (a === '--root') o.root = argv[++i] || null
    else if (a.indexOf('--root=') === 0) o.root = a.slice(7)
    else if (a === '--report') o.report = argv[++i] || null
    else if (a.indexOf('--report=') === 0) o.report = a.slice(9)
  }
  return o
}

function helpText() {
  return [
    'lint-tokens-app.mjs — React 示例页 token 审计（零依赖）',
    '',
    '用法：node tools/examples/lint-tokens-app.mjs [选项]',
    '',
    '选项：',
    '  --root <dir>     仓库根目录（默认脚本上两级）',
    '  --verbose        打印逐文件 INFO（引用清单、各页 token）',
    '  --no-contrast    跳过对比度配对',
    '  --selftest       跑内置负例自测（不读仓库，全部通过退出 0）',
    '  --report <path>  另存报告（路径必须位于 .tmp/ 下）',
    '  --help           本帮助',
    '',
    '退出码：0 无 FAIL / 1 有 FAIL / 2 根目录或 INDEX.json 不可读',
    '',
  ].join('\n')
}

function flattenThemes(indexDoc) {
  const out = []
  const fams = Array.isArray(indexDoc.families) ? indexDoc.families : []
  for (const f of fams) {
    const list = Array.isArray(f.themes) ? f.themes : []
    for (const t of list) out.push({ family: f.id || f.family || '', ...t })
  }
  return out
}

const ROLE_TO_INDEX_ROLE = {
  '--tv-text': 'text',
  '--tv-muted': 'text-muted',
  '--tv-dim': 'text-dim',
  '--tv-bg': 'bg',
  '--tv-surface': 'bg-surface',
  '--tv-surface-2': 'bg-surface-2',
  '--tv-elevated': 'bg-elevated',
  '--tv-card': 'card',
  '--tv-border': 'border',
  '--tv-accent': 'accent',
  '--tv-accent-fg': 'accent-foreground',
  '--tv-ok': 'ok',
  '--tv-warn': 'warn',
  '--tv-danger': 'danger',
  '--tv-info': 'info',
  '--tv-queued': 'queued',
}

function runMain(opts) {
  const root = opts.root ? (isAbsolute(opts.root) ? opts.root : resolve(process.cwd(), opts.root)) : DEFAULT_ROOT
  const lines = []
  const push = (s) => lines.push(s === undefined ? '' : s)
  const c = { PASS: 0, WARN: 0, FAIL: 0 }
  const v = (level, title, detail) => {
    c[level] = (c[level] || 0) + 1
    push('  ' + level.padEnd(5) + ' ' + title + (detail ? '  — ' + detail : ''))
  }

  if (!existsSync(root) || !statSync(root).isDirectory()) {
    process.stderr.write('[lint-tokens-app] 根目录不存在：' + root + '\n')
    return { code: 2, lines }
  }
  const indexPath = join(root, INDEX_JSON)
  if (!existsSync(indexPath)) {
    process.stderr.write('[lint-tokens-app] 找不到 INDEX.json：' + indexPath + '\n')
    return { code: 2, lines }
  }
  let indexDoc = null
  try {
    indexDoc = JSON.parse(readFileSync(indexPath, 'utf8'))
  } catch (e) {
    process.stderr.write('[lint-tokens-app] INDEX.json 解析失败：' + e.message + '\n')
    return { code: 2, lines }
  }

  /* ---- 发现被审计文件 ---- */
  const tsxDir = join(root, SCAN_TSX_DIR)
  const stylesDir = join(root, 'src/styles')
  const targets = []
  for (const abs of walkFiles(tsxDir, (p, n) => /\.tsx$/.test(n), [])) targets.push(abs)
  for (const abs of walkFiles(stylesDir, (p, n) => SCAN_CSS_GLOB.test(n), [])) targets.push(abs)
  targets.sort()

  // registry.tsx 里 import 了但文件不存在 → 标注跳过
  const missing = []
  const regPath = join(tsxDir, 'registry.tsx')
  if (existsSync(regPath)) {
    const reg = stripJsComments(readFileSync(regPath, 'utf8'))
    const impRe = /from\s+['"]\.\/([^'"]+)['"]/g
    let im
    while ((im = impRe.exec(reg)) !== null) {
      const name = im[1]
      const cand = join(tsxDir, /\.tsx?$/.test(name) ? name : name + '.tsx')
      if (!existsSync(cand)) missing.push(name)
    }
  }

  push('ThemeVault 示例页 token 审计（lint-tokens-app.mjs）')
  push('根目录：' + root)
  push('范围：' + SCAN_TSX_DIR + '/**/*.tsx + src/styles/examples*.css（' + targets.length + ' 个文件）')
  push('例外：src/index.css 不参与门禁，仅作为变量定义来源')
  push('')

  if (!targets.length) {
    push('  FAIL  未找到任何被审计文件（' + SCAN_TSX_DIR + ' 与 src/styles/examples*.css）')
    push('')
    push('汇总：PASS 0 / WARN 0 / FAIL 1')
    push('退出码：1（存在 FAIL，门禁不通过）')
    return { code: 1, lines }
  }

  /* ---- 定义来源 ---- */
  const defs = collectDefinitions(root)
  const tvTsPath = join(root, 'src/data/tv.ts')
  const tvTsText = existsSync(tvTsPath) ? readFileSync(tvTsPath, 'utf8') : ''
  const tvKeys = new Set()
  {
    const re = /['"](--tv-[A-Za-z0-9_-]+)['"]/g
    let m
    while ((m = re.exec(tvTsText)) !== null) tvKeys.add(m[1])
    for (const k of tvKeys) if (!defs.has(k)) defs.set(k, [{ file: 'src/data/tv.ts', line: 0 }])
  }
  const WHITELIST = ['--tv-radius']
  for (const w of WHITELIST) if (!defs.has(w)) defs.set(w, [{ file: '(whitelist)', line: 0 }])
  const whitelisted = new Set(WHITELIST)

  /* ---- 逐文件分析 ---- */
  const reports = []
  for (const abs of targets) {
    const text = fsRead(abs)
    if (text === null) continue
    const isCss = /\.css$/.test(abs)
    const stripped = isCss ? stripCssComments(text) : stripJsComments(text)
    const lineOf = makeLineOf(buildLineStarts(stripped))
    const res = isCss ? analyzeCss(text, lineOf) : analyzeTsx(text, lineOf)
    res.literals.sort((a, b) => a.line - b.line)
    reports.push({ file: rel(root, abs), kind: isCss ? 'css' : 'tsx', text: stripped, ...res })
  }

  const usedRoles = new Set()
  for (const r of reports) for (const ref of r.refs) if (ref.name.indexOf('--tv-') === 0) usedRoles.add(ref.name)

  /* ---- [1] 禁裸色值 ---- */
  push('[1] 禁裸色值（FAIL 门禁）')
  {
    const total = reports.reduce((n, r) => n + r.literals.length, 0)
    if (total === 0) {
      v('PASS', '被审计文件中未发现裸色值', reports.length + ' 个文件')
    } else {
      v('FAIL', total + ' 处裸色值', '应改用 var(--tv-*) 或 color-mix()')
      for (const r of reports) {
        for (const h of r.literals) {
          push('  FAIL  ' + r.file + ':' + h.line + '  ' + h.kind + '「' + h.snippet + '」 ← ' + h.context)
        }
      }
    }
    if (opts.verbose) {
      for (const r of reports) if (r.literals.length === 0) push('  INFO  ' + r.file + ' 无裸色值')
    }
  }
  push('')

  /* ---- [2] 引用完整性 ---- */
  push('[2] 引用完整性（var() 引用名必须有定义）')
  {
    const seen = new Map()
    for (const r of reports) {
      for (const ref of r.refs) {
        if (!seen.has(ref.name)) seen.set(ref.name, [])
        seen.get(ref.name).push({ file: r.file, line: ref.line })
      }
    }
    const bad = []
    for (const entry of seen) if (!defs.has(entry[0])) bad.push({ name: entry[0], uses: entry[1] })
    if (!bad.length) {
      v('PASS', '全部 ' + seen.size + ' 个 var() 引用名都有定义', '')
    } else {
      v('FAIL', bad.length + ' 个引用名找不到定义', '')
      for (const b of bad) {
        const u = b.uses[0]
        push('  FAIL  ' + u.file + ':' + u.line + '  var(' + b.name + ') 未定义（共 ' + b.uses.length + ' 处引用）')
        for (const ux of b.uses.slice(1, 4)) push('        另见 ' + ux.file + ':' + ux.line)
      }
    }
    if (opts.verbose) push('  INFO  引用名清单：' + [...seen.keys()].sort().join(', '))
  }
  push('')

  /* ---- [3] 自造变量 ---- */
  push('[3] 自造变量（定义必须落在既有 token 体系内）')
  {
    const allowed = new Set()
    for (const k of tvKeys) allowed.add(k)
    for (const k of whitelisted) allowed.add(k)
    for (const entry of defs) {
      const name = entry[0]
      const outside = entry[1].some(
        (w) => w.file && w.file !== 'src/data/tv.ts' && w.file !== '(whitelist)' &&
          w.file.indexOf('src/styles/examples') !== 0 &&
          w.file.indexOf('src/components/examples') !== 0,
      )
      if (outside) allowed.add(name)
    }
    const bad = []
    for (const r of reports) for (const d of r.defs) if (!allowed.has(d.name)) bad.push({ file: r.file, line: d.line, name: d.name })
    if (!bad.length) {
      v('PASS', '被审计文件未自造变量', '允许集合 ' + allowed.size + ' 个名字')
    } else {
      v('FAIL', bad.length + ' 个自定义属性不在允许集合内', '')
      for (const b of bad) push('  FAIL  ' + b.file + ':' + b.line + '  自造变量 ' + b.name)
    }
  }
  push('')

  /* ---- [4] 双方案覆盖 ---- */
  push('[4] 双方案覆盖（逐页 token 使用统计）')
  {
    let warned = 0
    for (const r of reports) {
      if (r.kind !== 'tsx') continue
      if (!/Example\.tsx$/.test(r.file)) continue
      const own = new Set()
      for (const ref of r.refs) if (ref.name.indexOf('--tv-') === 0) own.add(ref.name)
      if (own.size === 0 && r.hasStyle) {
        warned++
        push('  WARN  ' + r.file + '  0 个 var(--tv-*) 引用，但存在内联 style / className（颜色可能全靠 CSS 类）')
      } else if (opts.verbose) {
        push('  INFO  ' + r.file + '  引用 ' + own.size + ' 个 token：' + [...own].sort().join(', '))
      }
    }
    if (!warned) v('PASS', '每个示例页都有 var(--tv-*) 直接引用', '')
    else v('WARN', warned + ' 个示例页未直接引用 token', '颜色走 CSS 类亦可接受，人工确认')
    push('  INFO  全部 token 使用：' + usedRoles.size + ' 个角色')
  }
  push('')

  /* ---- [5] 对比度 ---- */
  if (!opts.contrast) {
    push('[5] 对比度配对：已由 --no-contrast 跳过')
    push('')
  } else {
    push('[5] 对比度配对（WCAG，阈值 ' + AA_TEXT_MIN + ':1；仅统计实际用到的角色）')
    const themes = flattenThemes(indexDoc)
    const dark = themes.find((t) => t.number === DARK_THEME_NUMBER)
    const light = themes.find((t) => t.number === LIGHT_THEME_NUMBER)

    const pairs = [
      ['--tv-text', '--tv-bg', '正文 / 页面底'],
      ['--tv-muted', '--tv-bg', '次要文字 / 页面底'],
      ['--tv-dim', '--tv-bg', '弱化文字 / 页面底'],
      ['--tv-accent-fg', '--tv-accent', '按钮前景 / 主色'],
      ['--tv-text', '--tv-surface', '正文 / 卡片面'],
      ['--tv-text', '--tv-surface-2', '正文 / 次级面'],
      ['--tv-text', '--tv-card', '正文 / 卡'],
    ]

    let warnCount = 0
    let passCount = 0
    let skipCount = 0
    const warnList = []

    for (const theme of [dark, light]) {
      if (!theme) continue
      const tokens = theme.tokens || {}
      push('  · #' + String(theme.number).padStart(3, '0') + ' ' + theme.family + '/' + theme.id + ' ' + (theme.zhName || '') + '（' + (theme.scheme || '') + '）')
      for (const pair of pairs) {
        const fgRole = pair[0]
        const bgRole = pair[1]
        const label = pair[2]
        if (!usedRoles.has(fgRole) || !usedRoles.has(bgRole)) { skipCount++; continue }
        const fg = parseColor(tokens[ROLE_TO_INDEX_ROLE[fgRole]])
        const bg = parseColor(tokens[ROLE_TO_INDEX_ROLE[bgRole]])
        if (!fg || !bg) { skipCount++; continue }
        const ratio = contrastRatio(fg, bg)
        const s = ratio.toFixed(2) + ':1'
        if (ratio < AA_TEXT_MIN) {
          warnCount++
          warnList.push('#' + theme.number + ' ' + fgRole + '/' + bgRole + ' = ' + s)
          push('      WARN  ' + label.padEnd(18) + '  ' + (fgRole + ' / ' + bgRole).padEnd(34) + s.padEnd(9) + '< ' + AA_TEXT_MIN)
        } else {
          passCount++
          push('      PASS  ' + label.padEnd(18) + '  ' + (fgRole + ' / ' + bgRole).padEnd(34) + s)
        }
      }
      // 状态色：文字用状态色本身，底为该色 12% 混入 bg-surface
      for (const statusRole of ['--tv-ok', '--tv-warn', '--tv-danger', '--tv-info', '--tv-queued']) {
        if (!usedRoles.has(statusRole)) { skipCount++; continue }
        const fg = parseColor(tokens[ROLE_TO_INDEX_ROLE[statusRole]])
        const base = parseColor(tokens['bg-surface'])
        if (!fg || !base) { skipCount++; continue }
        const tint = mixColors(fg, base, 0.12)
        const ratio = contrastRatio(fg, tint)
        const s = ratio.toFixed(2) + ':1'
        if (ratio < AA_TEXT_MIN) {
          warnCount++
          warnList.push('#' + theme.number + ' ' + statusRole + '/tint12 = ' + s)
          push('      WARN  ' + '状态色 / 12% 混底'.padEnd(18) + '  ' + (statusRole + ' / tint12').padEnd(34) + s.padEnd(9) + '< ' + AA_TEXT_MIN)
        } else {
          passCount++
          push('      PASS  ' + '状态色 / 12% 混底'.padEnd(18) + '  ' + (statusRole + ' / tint12').padEnd(34) + s)
        }
      }
    }
    if (!warnCount) v('PASS', '对比度配对全部 ≥ ' + AA_TEXT_MIN + ':1', passCount + ' 组')
    else {
      v('WARN', warnCount + ' 组对比度 < ' + AA_TEXT_MIN + ':1（源主题取值，不阻断）', '')
      for (const w of warnList) push('        · ' + w)
    }
    if (skipCount) push('  INFO  跳过 ' + skipCount + ' 组（角色未被引用或取值不可解析）')
    push('')
  }

  /* ---- [6] 未使用 token ---- */
  push('[6] 未被示例页引用的 token（INFO）')
  {
    const unused = [...tvKeys].filter((k) => !usedRoles.has(k)).sort()
    if (!unused.length) push('  INFO  无')
    else push('  INFO  ' + unused.length + ' 个角色未被 examples 引用：' + unused.join(', '))
  }
  push('')

  if (missing.length) {
    push('未找到的组件（registry.tsx 有 import，文件不存在）：' + [...new Set(missing)].join(', ') + ' — 已跳过')
    push('')
  }

  push('汇总：PASS ' + c.PASS + ' / WARN ' + c.WARN + ' / FAIL ' + c.FAIL)
  const code = c.FAIL > 0 ? 1 : 0
  push('退出码：' + code + (code === 0 ? '（无 FAIL）' : '（存在 FAIL，门禁不通过）'))
  return { code, lines }
}

/* ------------------------------------------------------------------ *
 * 6. 内置负例自测
 * ------------------------------------------------------------------ */

function runSelftest() {
  const lines = []
  let bad = 0

  function check(name, actual, expect) {
    const ok = actual === expect
    if (!ok) bad++
    lines.push((ok ? 'OK   ' : 'BAD  ') + name.padEnd(32) + ' got=' + actual + ' expect=' + expect)
  }

  function tsxSrc(src) {
    const stripped = stripJsComments(src)
    const lineOf = makeLineOf(buildLineStarts(stripped))
    return analyzeTsx(src, lineOf)
  }

  function cssSrc(src) {
    const stripped = stripCssComments(src)
    const lineOf = makeLineOf(buildLineStarts(stripped))
    return analyzeCss(src, lineOf)
  }

  // ---- TSX 负例 ----
  check('tsx 内联 style 裸 hex', tsxSrc('<i style={{ color: \'#ff0000\' }} />').literals.length, 1)
  check('tsx 内联 style rgb()', tsxSrc('<i style={{ background: \'rgb(1 2 3)\' }} />').literals.length, 1)
  check('tsx 内联 style hsl()', tsxSrc('<i style={{ borderColor: \'hsl(10 20% 30%)\' }} />').literals.length, 1)
  check('tsx 内联 style 具名颜色', tsxSrc('<i style={{ color: \'red\' }} />').literals.length, 1)
  check('tsx SVG fill 具体色值', tsxSrc('<svg><path fill="#00ff00" /></svg>').literals.length, 1)
  check('tsx SVG stroke 具体色值', tsxSrc('<svg><path stroke="#123456" /></svg>').literals.length, 1)
  check('tsx SVG fill=none 合法', tsxSrc('<svg><path fill="none" /></svg>').literals.length, 0)
  check('tsx SVG fill=currentColor 合法', tsxSrc('<svg><path fill="currentColor" stroke="currentColor" /></svg>').literals.length, 0)
  check('tsx var() 合法', tsxSrc('<i style={{ color: \'var(--tv-text)\' }} />').literals.length, 0)
  check('tsx color-mix 合法', tsxSrc('<i style={{ background: \'color-mix(in srgb, var(--tv-accent) 12%, transparent)\' }} />').literals.length, 0)
  check('tsx 文本 #017 不误报', tsxSrc('<span>#017 / #021 / #024 需要补齐契约</span>').literals.length, 0)
  check('tsx 注释内 var 不算引用', tsxSrc('// 只允许 var(--tv-text)\nconst a = 1').refs.length, 0)
  check('tsx 正常 var 引用计数', tsxSrc('<i style={{ color: \'var(--tv-text)\' }} />').refs.length, 1)
  check('tsx 自造变量定义', tsxSrc('<i style={{ \'--sw-bg\': \'red\' } as never} />').defs.length, 1)
  check('tsx URL 中的 // 不吞行', tsxSrc('<a href="https://x.y/z">跳转 #ff0000</a>').literals.length, 1)
  check('tsx 标识符 RED 不算具名色', tsxSrc("const RED = 'x'\nconst a = <i style={{ color: RED }} />").literals.length, 0)
  check('tsx 常量 6 位 hex 兜底抓到', tsxSrc("const RED = '#ff0000'\nconst a = <i style={{ color: RED }} />").literals.length, 1)
  check('tsx 域外 rgb() 兜底抓到', tsxSrc("const C = 'rgb(1 2 3)'\nconst a = <i />").literals.length, 1)
  check('tsx 域外 var() 不误判', tsxSrc("const C = 'var(--tv-text)'\nconst a = <i style={{ color: C }} />").literals.length, 0)
  check('tsx 主题编号 #017 仍不误报', tsxSrc("const s = '#017 #021 #024'\nconst a = <span>{s}</span>").literals.length, 0)

  // ---- CSS 负例 ----
  check('css 裸 hex', cssSrc('.a { color: #ff0000; }').literals.length, 1)
  check('css #root 选择器不误报', cssSrc('#root { height: 100%; }').literals.length, 0)
  check('css rgb()', cssSrc('.a { background: rgb(1, 2, 3); }').literals.length, 1)
  check('css 具名颜色', cssSrc('.a { border-color: white; }').literals.length, 1)
  check('css transparent 合法', cssSrc('.a { background: transparent; }').literals.length, 0)
  check('css currentColor 合法', cssSrc('.a { color: currentColor; }').literals.length, 0)
  check('css var()+color-mix 合法', cssSrc('.a { color: color-mix(in srgb, var(--tv-accent) 12%, transparent); }').literals.length, 0)
  check('css 注释里的 hex 不误报', cssSrc('/* #F2570F */ .a { color: var(--tv-text); }').literals.length, 0)
  check('css 自造变量定义被记录', cssSrc('.a { --sw-bg: red; }').defs.length, 1)
  check('css 自造变量值含 hex 也报', cssSrc('.a { --sw-bg: #ff0000; }').literals.length, 1)
  check('css var 引用计数', cssSrc('.a { color: var(--tv-text); border: 1px solid var(--tv-border); }').refs.length, 2)
  check('css 注释内 var 不算引用', cssSrc('/* var(--tv-nope) */ .a { color: var(--tv-text); }').refs.length, 1)

  // ---- WCAG ----
  const black = parseColor('#000000')
  const white = parseColor('#ffffff')
  check('wcag 黑白对比 21:1', Math.round(contrastRatio(black, white)), 21)
  const bg25 = parseColor('#201A15')
  const tint = mixColors(parseColor('#257552'), bg25, 0.12)
  check('wcag 12% 混色在区间内', tint.r > bg25.r && tint.r < 256, true)

  lines.push('')
  lines.push('自测结果：' + (bad === 0 ? '全部通过' : bad + ' 项不符预期'))
  return { code: bad === 0 ? 0 : 1, lines }
}

/* ------------------------------------------------------------------ *
 * 7. 入口
 * ------------------------------------------------------------------ */

function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) {
    process.stdout.write(helpText())
    return 0
  }
  if (opts.selftest) {
    const r = runSelftest()
    process.stdout.write(r.lines.join('\n') + '\n')
    return r.code
  }
  const r = runMain(opts)
  const text = r.lines.join('\n') + '\n'
  if (opts.report) {
    const rp = isAbsolute(opts.report) ? opts.report : resolve(process.cwd(), opts.report)
    const norm = rp.split(sep).join('/')
    if (norm.indexOf('/.tmp/') === -1) {
      process.stderr.write('[lint-tokens-app] 拒绝写入：--report 路径必须位于 .tmp/ 下（' + rp + '）\n')
      return 2
    }
    writeFileSync(rp, text, 'utf8')
  }
  process.stdout.write(text)
  return r.code
}

process.exitCode = main()
