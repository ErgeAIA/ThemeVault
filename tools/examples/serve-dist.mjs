#!/usr/bin/env node
/**
 * tools/examples/serve-dist.mjs
 * 零依赖静态服务器：把构建产物 dist/ 挂在 http://127.0.0.1:<port> 上，供 headless 浏览器验收。
 *
 * 用法：node tools/examples/serve-dist.mjs [port]   （默认 4173）
 * 退出码：0 = 正常；2 = dist 不存在（先跑 node dev.mjs build）
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.argv[2] || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

if (!fs.existsSync(DIST)) {
  console.error('dist/ 不存在：先执行 node dev.mjs build');
  process.exit(2);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(DIST, url === '/' ? 'index.html' : url.replace(/^\/+/, ''));
    // 目录穿越防护
    if (!file.startsWith(DIST)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
    const body = fs.readFileSync(file);
    res.writeHead(200, {
      'content-type': MIME[path.extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(body);
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log('serving ' + DIST + ' on http://127.0.0.1:' + PORT);
  });
