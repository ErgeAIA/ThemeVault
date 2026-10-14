/// <reference types="vite/client" />

// preview/data.js 是生成物（window.__TV = ...），以副作用导入，无类型导出。
declare module '*data.js'
