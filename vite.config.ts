import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 项目页子路径 = /<repo>/。本地 dev 用根路径 '/'，
// CI 构建时通过 GITHUB_PAGES=1 切到 /ThemeVault/。
const base = process.env.GITHUB_PAGES ? '/ThemeVault/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
})
