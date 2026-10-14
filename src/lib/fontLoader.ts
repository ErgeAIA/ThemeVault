// 从 CSS font-family 字符串提取首个真实字体家族名（用于 Google Fonts 加载与展示）。
export function primaryFamily(cssFont: string): string {
  const first = cssFont.split(',')[0].trim()
  return first.replace(/^["']|["']$/g, '')
}

// 常见字重；现代可变字体均支持此区间，缺失权重时 Google Fonts 会整体失败并回退，无副作用。
const WEIGHTS = [400, 500, 600, 700]
const loaded = new Set<string>()

// 按需向 <head> 注入 Google Fonts 样式表，已加载的家族跳过。
export function loadGoogleFonts(families: string[]): void {
  const toLoad = [...new Set(families)].filter((f) => f && !loaded.has(f))
  if (!toLoad.length) return
  toLoad.forEach((f) => loaded.add(f))
  const params = toLoad
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@${WEIGHTS.join(';')}`)
    .join('&')
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`
  document.head.appendChild(link)
}
