// 本机安全软件会锁定 esbuild 官方安装路径二进制的临时输出（vite 依赖预构建与 build 均受影响，
// 报 "Access is denied"）。此启动器在 vite 进程启动前：
//   Windows 下把平台二进制复制到 .tmp/esbuild.exe 并以 ESBUILD_BINARY_PATH 指向它绕过；
//   其他平台原样启动 vite。CI（Linux）不受影响。
// 用法：node dev.mjs [vite 参数]，如 "dev": "node dev.mjs"、"build": "tsc --noEmit && node dev.mjs build"。
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'

if (process.platform === 'win32') {
  try {
    const require = createRequire(import.meta.url)
    const vitePkgDir = dirname(require.resolve('vite/package.json'))
    // pnpm 布局下 esbuild 与 @esbuild/<platform> 在同一层 node_modules 下
    const esbuildDir = dirname(require.resolve('esbuild/package.json', { paths: [vitePkgDir] }))
    const bin = join(dirname(esbuildDir), '@esbuild', 'win32-x64', 'esbuild.exe')
    if (existsSync(bin)) {
      mkdirSync('.tmp', { recursive: true })
      const copy = resolve('.tmp', 'esbuild.exe')
      if (!existsSync(copy)) copyFileSync(bin, copy)
      process.env.ESBUILD_BINARY_PATH = copy
    }
  } catch {
    // 找不到依赖结构时静默走默认路径
  }
}

const vite = resolve('node_modules', 'vite', 'bin', 'vite.js')
const child = spawn(process.execPath, [vite, ...process.argv.slice(2)], {
  stdio: 'inherit',
})
child.on('exit', (code) => process.exit(code ?? 0))
