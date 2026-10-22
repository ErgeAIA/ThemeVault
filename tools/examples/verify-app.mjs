#!/usr/bin/env node
/**
 * tools/examples/verify-app.mjs
 * 零依赖 headless 验收脚本：复用 tools/examples/serve-dist.mjs 提供的静态服务，
 * 用本机 Chrome 经 CDP 打开 Vite 构建产物，验收「页面示例」React 示例页。
 *
 * 用法：在仓库根执行 node tools/examples/verify-app.mjs
 * 环境变量：TV_PORT 覆盖静态服务端口（默认 4173）；CHROME_PATH 覆盖浏览器路径。
 * 退出码：0 = FAIL 数为 0（PASS/WARN 均可）；1 = 存在 FAIL；2 = 前置条件缺失（dist/、浏览器、静态服务不可用）
 * WARN 不影响退出码，但汇总里同时打印 PASS/WARN/FAIL 三个计数，并单列基线豁免 URL。
 * 副作用：仅写 .tmp/examples-shots/app-*.png；若自行拉起静态服务则在结束时 kill；
 *        Chrome 临时 profile 位于系统临时目录并在退出时清理。
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const DIST = path.join(ROOT, 'dist');
const SERVE = path.join(HERE, 'serve-dist.mjs');
const SHOT_DIR = path.join(ROOT, '.tmp', 'examples-shots');
const VIEWPORT = { width: 1440, height: 1200 };
const NL = String.fromCharCode(10);
const DEFAULT_PORT = Number(process.env.TV_PORT || 4173);
/**
 * 既有基线外部域名白名单。
 * 每一项都是**本仓库既有行为**，来源 src/lib/fontLoader.ts:12-23 的 loadGoogleFonts：
 * 该函数把 Google Fonts 的 <link> 注入 <head>，由 src/App.tsx:54-61 的 useEffect 无条件触发。
 * 触发链：src/data/tv.ts:230 与 src/data/fontThemes.ts:41 的 CJK_SANS 里写了 "PingFang SC"，
 * 而 PingFang SC 不是 Google Fonts 字体，故其 CSS 请求被 Chrome 判 net::ERR_BLOCKED_BY_ORB。
 * 这些请求**不是本次「页面示例」改动引入的**（git log: fontLoader.ts 属既有提交 2cd29fd），
 * 因此记为 WARN 而非 FAIL；白名单以外的任何外部域名仍判 FAIL。
 */
const BASELINE_EXTERNAL_HOSTS = [
  'fonts.googleapis.com', // 既有行为，来自 src/lib/fontLoader.ts，非本次示例页改动
  'fonts.gstatic.com',    // 同上：Google Fonts CSS 引出的字体文件域名
];

/**
 * 「示例」分组下「页面示例」子组的应有顺序
 * （与 src/components/examples/registry.tsx 的 EXAMPLE_PAGES 一致，按预览主题的使用顺序）。
 */
const EXPECTED_PAGES = [
  '外观设置页', '状态页合集', '表单状态穷举',
  '详情主从布局', '消息会话界面', '图表专区',
  '富文本 diff', '日历日程', '营销定价页',
];

/** 原有「结构示例」子组的侧栏项（不参与页面示例断言，仅用于校验两组分区存在）。 */
const EXPECTED_DEMO_MIN = 1;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].filter((p) => typeof p === 'string' && p.length > 0);

const results = [];
const warns = [];
/** 命中基线白名单的 URL（去重），汇总末尾全量打印 */
const baselineUrls = new Set();
function pass(name, detail) {
  results.push({ ok: true, name: name, detail: detail || '' });
  console.log('PASS  ' + name + (detail ? '  -- ' + detail : ''));
}
function fail(name, detail) {
  results.push({ ok: false, name: name, detail: detail || '' });
  console.log('FAIL  ' + name + (detail ? '  -- ' + detail : ''));
}
function warn(name, detail) {
  warns.push({ name: name, detail: detail || '' });
  console.log('WARN  ' + name + (detail ? '  -- ' + detail : ''));
}
/** URL 主机名是否落在既有基线白名单内；命中的 URL 会记入 baselineUrls */
function baselineHostOf(u) {
  let host = '';
  try { host = new URL(u).hostname; } catch (e) { return ''; }
  if (BASELINE_EXTERNAL_HOSTS.indexOf(host) < 0) return '';
  baselineUrls.add(u);
  return host;
}
function info(msg) { console.log('INFO  ' + msg); }
function sleep(ms) { return new Promise((r) => { setTimeout(r, ms); }); }

/* ============================ 静态服务 ============================ */

function probeUrl(url) {
  return new Promise(function (resolve) {
    let done = false;
    const finish = function (code) { if (!done) { done = true; resolve(code); } };
    let req = null;
    try { req = http.get(url, function (res) { res.resume(); finish(res.statusCode || 0); }); } catch (e) { finish(0); return; }
    req.on('error', function () { finish(0); });
    req.setTimeout(1500, function () { req.destroy(); finish(0); });
  });
}

async function ensureServer() {
  const url = 'http://127.0.0.1:' + DEFAULT_PORT + '/';
  const code = await probeUrl(url);
  if (code === 200) {
    info('静态服务已在运行，直接复用: ' + url);
    pass('[0a] 静态服务可用（复用已有实例）', url);
    return { base: url, proc: null };
  }
  if (!fs.existsSync(DIST)) {
    console.error('错误: dist/ 不存在，先执行 node dev.mjs build');
    return null;
  }
  info('静态服务未响应，自行拉起: node tools/examples/serve-dist.mjs ' + DEFAULT_PORT);
  const proc = spawn(process.execPath, [SERVE, String(DEFAULT_PORT)], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  let banner = '';
  proc.stdout.on('data', function (c) { if (banner.length < 2000) banner = banner + String(c); });
  proc.stderr.on('data', function (c) { if (banner.length < 2000) banner = banner + String(c); });
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (proc.exitCode !== null) break;
    const c = await probeUrl(url);
    if (c === 200) {
      pass('[0a] 静态服务可用（自行拉起）', url);
      return { base: url, proc: proc };
    }
    await sleep(200);
  }
  console.error('错误: 静态服务启动失败；服务输出片段: ' + banner.slice(0, 500));
  try { proc.kill(); } catch (e) { /* 忽略 */ }
  return null;
}

/* ============================ CDP 客户端 ============================ */

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    const self = this;
    ws.addEventListener('message', function (ev) {
      let msg = null;
      try { msg = JSON.parse(ev.data); } catch (e) { return; }
      if (msg.id && self.pending.has(msg.id)) {
        const slot = self.pending.get(msg.id);
        self.pending.delete(msg.id);
        if (msg.error) slot.reject(new Error(msg.error.message || 'CDP 调用失败'));
        else slot.resolve(msg.result || {});
        return;
      }
      if (msg.method && self.listeners.has(msg.method)) {
        for (const fn of Array.from(self.listeners.get(msg.method))) fn(msg.params || {});
      }
    });
  }
  send(method, params, sessionId) {
    const id = this.nextId;
    this.nextId = this.nextId + 1;
    const payload = { id: id, method: method, params: params || {} };
    if (sessionId) payload.sessionId = sessionId;
    const self = this;
    return new Promise(function (resolve, reject) {
      self.pending.set(id, { resolve: resolve, reject: reject });
      try { self.ws.send(JSON.stringify(payload)); } catch (e) { reject(e); }
    });
  }
  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method).add(fn);
  }
  once(method, timeoutMs) {
    const self = this;
    return new Promise(function (resolve, reject) {
      let timer = null;
      const off = self.on(method, function (params) {
        if (timer) clearTimeout(timer);
        resolve(params);
      });
      timer = setTimeout(function () { reject(new Error('等待 CDP 事件超时: ' + method)); }, timeoutMs || 20000);
    });
  }
  close() { try { this.ws.close(); } catch (e) { /* 忽略 */ } }
}

function launchChrome(exe, profileDir) {
  const args = [
    '--headless=new',
    '--remote-debugging-port=0',
    '--user-data-dir=' + profileDir,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-sync',
    '--disable-background-networking',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-extensions',
    '--disable-gpu',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-pings',
    '--metrics-recording-only',
    '--window-size=' + VIEWPORT.width + ',' + VIEWPORT.height,
    'about:blank',
  ];
  const child = spawn(exe, args, { stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true });
  child.stderrText = '';
  if (child.stderr) {
    child.stderr.on('data', function (chunk) {
      if (child.stderrText.length < 4000) child.stderrText = child.stderrText + String(chunk);
    });
  }
  child.on('error', function (err) { child.spawnError = err; });
  return child;
}

async function waitDevToolsPort(profileDir, timeoutMs) {
  const portFile = path.join(profileDir, 'DevToolsActivePort');
  const deadline = Date.now() + (timeoutMs || 20000);
  while (Date.now() < deadline) {
    if (fs.existsSync(portFile)) {
      const text = await fsp.readFile(portFile, 'utf8').catch(() => '');
      const lines = text.split(NL).map((s) => s.trim()).filter((s) => s.length > 0);
      if (lines.length >= 2) return { port: Number(lines[0]), wsPath: lines[1] };
    }
    await sleep(100);
  }
  throw new Error('等待 DevToolsActivePort 超时: ' + portFile);
}

function connectCDP(url) {
  return new Promise(function (resolve, reject) {
    let ws = null;
    try { ws = new WebSocket(url); } catch (e) { reject(e); return; }
    const client = new CDP(ws);
    ws.addEventListener('open', function () { resolve(client); }, { once: true });
    ws.addEventListener('error', function () { reject(new Error('CDP WebSocket 连接失败: ' + url)); }, { once: true });
  });
}

/* ============================ 页内表达式 ============================ */

const evalFn = function (fnSource, args) {
  const parts = (args || []).map(function (a) { return JSON.stringify(a); });
  return '(' + fnSource + ')(' + parts.join(',') + ')';
};

/** #root 是否有渲染内容 */
const FN_ROOT_READY = 'function(){var r=document.getElementById("root");return r?r.children.length:0;}';

/** 调色板海选视图特征 */
const FN_GALLERY = 'function(){' +
  'var gal=document.querySelector(".gal");' +
  'var cards=document.querySelectorAll(".pg-card").length;' +
  'var grid=document.querySelectorAll(".gal-grid").length;' +
  'var hero=document.querySelectorAll(".gal-hero").length;' +
  'var onBtns=Array.prototype.map.call(document.querySelectorAll(".top-modes button.on"),function(b){return (b.textContent||"").trim();});' +
  'return {gal:!!gal,cards:cards,grid:grid,hero:hero,onBtns:onBtns};}';

/** 点击文本包含 txt 的按钮 */
const FN_CLICK_TEXT = 'function(txt){' +
  'var all=Array.prototype.slice.call(document.querySelectorAll("button"));' +
  'var b=all.filter(function(x){return ((x.textContent||"").replace(/\\s+/g," ")).indexOf(txt)>=0;})[0];' +
  'if(!b)return "no-button";' +
  'b.click();return "ok";}';

/**
 * 侧栏分组列表。除组名与全量侧栏项外，额外按组内 .sim-nav-sub-title 分隔标题
 * 把子项切成 pages（页面示例）/ demos（结构示例）两段，用于断言分区与顺序。
 */
const FN_NAV = 'function(){' +
  'var groups=Array.prototype.slice.call(document.querySelectorAll(".sim-nav-group"));' +
  'return groups.map(function(g){' +
  'var t=g.querySelector(".sim-nav-title");' +
  'var items=Array.prototype.slice.call(g.querySelectorAll(".sim-nav-item"));' +
  // 界面示例页直接挂在「示例」下（无分隔标题），从「结构示例」分隔标题起才是结构示例组
  'var inDemos=false,pages=[],demos=[];' +
  'var kids=Array.prototype.slice.call(g.querySelectorAll(".sim-nav-sub-title, .sim-nav-item"));' +
  'kids.forEach(function(el){' +
  'if(el.classList.contains("sim-nav-sub-title")){inDemos=true;return;}' +
  // 离开「示例」手风琴（遇到同级非 .sub 菜单项）即结束子项区段，
  // 否则会把它后面的「资源」等常规菜单项误算进「结构示例」
  'if(!el.classList.contains("sub")){inDemos=false;return;}' +
  'var l=el.querySelector(".sim-nav-label");' +
  'var s=l?(l.textContent||"").trim():(el.textContent||"").trim();' +
  'if(inDemos)demos.push(s);else pages.push(s);});' +
  'var subTitles=Array.prototype.slice.call(g.querySelectorAll(".sim-nav-sub-title")).map(function(x){return (x.textContent||"").trim();});' +
  'var allTitles=Array.prototype.slice.call(g.querySelectorAll(".sim-nav-item .sim-nav-label, .sim-nav-sub-title")).map(function(x){return (x.textContent||"").trim();});' +
  'return {title:t?(t.textContent||"").trim():"",' +
  'items:items.map(function(i){var l=i.querySelector(".sim-nav-label");return l?(l.textContent||"").trim():(i.textContent||"").trim();}),' +
  'pages:pages,demos:demos,subTitles:subTitles,allTitles:allTitles};});}';

/** 统计「示例」菜单下界面示例页子项里带徽章 SVG 的数量与缺失项。 */
const FN_NAV_ICONS = 'function(labels){' +
  'var btns=Array.prototype.slice.call(document.querySelectorAll(".sim-nav-item.sub"));' +
  'var have=[],miss=[];' +
  'labels.forEach(function(name){' +
  'var b=btns.filter(function(x){var l=x.querySelector(".sim-nav-label");return l&&(l.textContent||"").trim()===name;})[0];' +
  'if(!b){miss.push(name+"(无侧栏项)");return;}' +
  'var svg=b.querySelector(".sim-nav-icon.sub-icon svg");' +
  'var p=svg?svg.querySelector("path"):null;' +
  'if(svg&&p&&(p.getAttribute("d")||"").length>0)have.push(name);else miss.push(name);});' +
  'return {have:have,miss:miss};}';

/**
 * 点击「示例」菜单下「页面示例」子组里的某个侧栏项。
 * 子项带 .sub 类，且被 .sim-nav-sub-title（页面示例 / 结构示例）分隔，
 * 故这里按分隔标题定位「页面示例」段，避免误点到同组的结构示例。
 */
const FN_CLICK_NAV = 'function(label){' +
  'var kids=Array.prototype.slice.call(document.querySelectorAll(".sim-nav-group .sim-nav-sub-title, .sim-nav-group .sim-nav-item.sub"));' +
  'if(!kids.length)return "no-group";' +
  'var inDemos=false,hit=null;' +
  'kids.forEach(function(el){' +
  'if(el.classList.contains("sim-nav-sub-title")){inDemos=true;return;}' +
  'if(hit||inDemos)return;' +
  'var l=el.querySelector(".sim-nav-label");' +
  'var s=l?(l.textContent||"").trim():(el.textContent||"").trim();' +
  'if(s===label)hit=el;});' +
  'if(!hit)return "no-item";' +
  'hit.click();return "ok";}';

/** 当前示例页状态：标题 / 结构 / 未解析 var() */
const FN_EXSTATE = 'function(){' +
  'var shell=document.querySelector(".ex-shell");' +
  'var sc=document.querySelector(".sim-content");' +
  'var h2=shell?shell.querySelector("h2"):(sc?sc.querySelector("h2"):document.querySelector("h2"));' +
  'var stage=document.querySelector(".ex-stage");' +
  'var pts=document.querySelectorAll(".points li").length;' +
  'var bad=[];' +
  'var props=["color","background-color","border-top-color","border-right-color","border-bottom-color","border-left-color","outline-color"];' +
  'if(stage){' +
  'var els=[stage].concat(Array.prototype.slice.call(stage.querySelectorAll("*")));' +
  'for(var i=0;i<els.length;i++){var cs=getComputedStyle(els[i]);' +
  'for(var j=0;j<props.length;j++){var v=cs.getPropertyValue(props[j]);' +
  'if(v&&v.indexOf("var(")>=0){bad.push(els[i].tagName+"."+(typeof els[i].className==="string"?els[i].className:"")+" "+props[j]+"="+v);}}}}' +
  'var vis=0;' +
  'if(stage){var all=Array.prototype.slice.call(stage.querySelectorAll("*"));' +
  'for(var k=0;k<all.length;k++){var r=all[k].getBoundingClientRect();' +
  'if(r.width>0&&r.height>0&&getComputedStyle(all[k]).visibility!=="hidden")vis++;}}' +
  'return {title:h2?(h2.textContent||"").trim():"",hasShell:!!shell,hasStage:!!stage,points:pts,varBad:bad.slice(0,8),varBadCount:bad.length,stageEls:stage?stage.querySelectorAll("*").length:0,visEls:vis};}';

/** 主题状态：--tv-bg / 生效背景 / body 背景 / 下拉当前文案 */
const FN_THEME = 'function(){' +
  'var app=document.querySelector(".app");' +
  'var sim=document.querySelector(".sim");' +
  'var el=app||sim;' +
  'var cs=el?getComputedStyle(el):null;' +
  'var btn=document.querySelector(".top-ctrls .sim-select-btn");' +
  'var label=btn?btn.getAttribute("aria-label"):"";' +
  'return {tvBg:cs?cs.getPropertyValue("--tv-bg").trim():"",' +
  'effBg:el?getComputedStyle(el).backgroundColor:"",' +
  'simBg:sim?getComputedStyle(sim).backgroundColor:"",' +
  'bodyBg:getComputedStyle(document.body).backgroundColor,' +
  'selLabel:label||"",selText:btn?(btn.textContent||"").trim():"",' +
  'h2:(function(){var s=document.querySelector(".ex-shell h2");return s?(s.textContent||"").trim():"";})()};}';

/** 打开主题下拉（.top-ctrls 里 aria-label=选择主题 的那个） */
const FN_OPEN_THEME = 'function(){' +
  'var btns=Array.prototype.slice.call(document.querySelectorAll(".top-ctrls .sim-select-btn"));' +
  'var b=btns.filter(function(x){return x.getAttribute("aria-label")==="选择主题";})[0];' +
  'if(!b)return "no-select";' +
  'if(b.getAttribute("aria-expanded")!=="true")b.click();' +
  'return "ok";}';

/** 读主题下拉选项文案 */
const FN_THEME_OPTIONS = 'function(){' +
  'return Array.prototype.map.call(document.querySelectorAll(".sim-select-list .sim-select-item"),' +
  'function(x){return {text:(x.textContent||"").trim(),current:x.className.indexOf("current")>=0};});}';

/** 按文案点选主题下拉项（避免依赖 DOM 顺序） */
const FN_PICK_OPTION_TEXT = 'function(txt){' +
  'var list=Array.prototype.slice.call(document.querySelectorAll(".sim-select-list .sim-select-item"));' +
  'var it=list.filter(function(x){return (x.textContent||"").trim()===txt;})[0];' +
  'if(!it)return "no-option";' +
  'it.click();return "ok";}';

/** 图表专区：取柱条计算背景色（验证取自 --tv-accent 而非硬编码） */
const FN_BAR_SKIN = 'function(){' +
  'var bars=document.querySelectorAll(".ex-bars .ex-bar-pair i");' +
  'var first=bars.length?getComputedStyle(bars[0]).backgroundColor:"";' +
  'var out=[];' +
  'for(var i=0;i<bars.length&&i<4;i++){out.push(getComputedStyle(bars[i]).backgroundColor);}' +
  'var accent=getComputedStyle(document.documentElement).getPropertyValue("--tv-accent").trim();' +
  'var host=document.querySelector(".sim")||document.querySelector(".app");' +
  'if(host&&getComputedStyle(host).getPropertyValue("--tv-accent").trim())accent=getComputedStyle(host).getPropertyValue("--tv-accent").trim();' +
  'return {count:bars.length,first:first,colors:out,accent:accent};}';

/** 状态页合集：取状态图形计算文字色（验证取自 --tv-info/warn/danger/dim） */
const FN_STATE_SKIN = 'function(){' +
  'var art=document.querySelector(".ex-state-art");' +
  'if(!art)return {count:0,color:"",cls:""};' +
  'return {count:document.querySelectorAll(".ex-state-art").length,color:getComputedStyle(art).color,cls:art.className};}';

/** 通用探针：取首个匹配元素的计算样式（prop 如 color / backgroundColor） */
const FN_COLOR_PROBE = 'function(sel,prop){' +
  'var list=document.querySelectorAll(sel);' +
  'if(!list.length)return {count:0,value:"",sel:sel,prop:prop};' +
  'return {count:list.length,value:getComputedStyle(list[0]).getPropertyValue(prop),sel:sel,prop:prop};}';

/** 按序号点选主题下拉项（序号基于当前 DOM 顺序） */
const FN_PICK_OPTION = 'function(idx){' +
  'var list=Array.prototype.slice.call(document.querySelectorAll(".sim-select-list .sim-select-item"));' +
  'if(!list[idx])return "no-option";' +
  'list[idx].click();return "ok";}';

/* ============================ 主流程 ============================ */

async function main() {
  console.log('== ThemeVault 页面示例 headless 验收 ==');
  console.log('仓库根: ' + ROOT);
  console.log('构建产物: ' + DIST);
  console.log('视口: ' + VIEWPORT.width + 'x' + VIEWPORT.height + '  deviceScaleFactor=1');
  if (!fs.existsSync(DIST)) {
    console.error('错误: dist/ 不存在 -> ' + DIST + '（先执行 node dev.mjs build）');
    process.exit(2);
  }
  const chromeExe = CHROME_CANDIDATES.filter((p) => fs.existsSync(p))[0];
  if (!chromeExe) {
    console.error('错误: 未找到 Chrome/Edge，已尝试:');
    for (const c of CHROME_CANDIDATES) console.error('  - ' + c);
    console.error('可设置环境变量 CHROME_PATH 指定浏览器路径。');
    process.exit(2);
  }
  console.log('浏览器: ' + chromeExe);
  await fsp.mkdir(SHOT_DIR, { recursive: true });

  const served = await ensureServer();
  if (!served) { process.exitCode = 2; return; }
  const base = served.base;
  console.log('');

  const profileDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'tv-verify-app-'));
  let child = null;
  let cdp = null;
  let exitCode = 1;
  const shots = [];
  try {
    child = launchChrome(chromeExe, profileDir);
    let dt = null;
    try {
      dt = await waitDevToolsPort(profileDir, 25000);
    } catch (e) {
      console.error('错误: 浏览器未就绪: ' + (e && e.message ? e.message : String(e)));
      if (child && child.stderrText) console.error('浏览器 stderr 片段: ' + child.stderrText.slice(0, 800));
      process.exitCode = 2;
      return;
    }
    cdp = await connectCDP('ws://127.0.0.1:' + dt.port + dt.wsPath);
    const created = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const attached = await cdp.send('Target.attachToTarget', { targetId: created.targetId, flatten: true });
    const sessionId = attached.sessionId;
    const send = function (m, p) { return cdp.send(m, p, sessionId); };
    const evaluate = async function (expression) {
      const res = await send('Runtime.evaluate', {
        expression: expression,
        returnByValue: true,
        awaitPromise: true,
        userGesture: true,
      });
      if (res.exceptionDetails) {
        const ex = res.exceptionDetails;
        const desc = (ex.exception && (ex.exception.description || ex.exception.value)) || ex.text || '未知';
        throw new Error('页面内表达式异常: ' + String(desc).split(NL)[0]);
      }
      return res.result ? res.result.value : undefined;
    };
    const screenshot = async function (file) {
      const res = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
      const buf = Buffer.from(res.data, 'base64');
      await fsp.writeFile(file, buf);
      shots.push({ file: file, bytes: buf.length });
      return buf.length;
    };

    const consoleErrors = [];
    const requests = new Map();
    const responses = new Map();
    const failedReqs = [];
    cdp.on('Runtime.consoleAPICalled', function (p) {
      if (p.type !== 'error') return;
      const text = (p.args || []).map(function (a) {
        if (a && a.value !== undefined) return String(a.value);
        return (a && (a.description || a.type)) || '';
      }).join(' ');
      consoleErrors.push('[console.error] ' + text);
    });
    cdp.on('Runtime.exceptionThrown', function (p) {
      const d = p.exceptionDetails || {};
      const desc = (d.exception && (d.exception.description || d.exception.value)) || d.text || '未知异常';
      consoleErrors.push('[pageerror] ' + String(desc).split(NL)[0]);
    });
    cdp.on('Log.entryAdded', function (p) {
      const e = p.entry || {};
      if (e.level !== 'error') return;
      if (e.source === 'network') return;
      consoleErrors.push('[log:' + e.source + '] ' + (e.text || ''));
    });
    const initiators = new Map();
    cdp.on('Network.requestWillBeSent', function (p) {
      if (p.request && p.request.url) requests.set(p.requestId, p.request.url);
      const init = p.initiator || {};
      const stack = init.stack || {};
      const where = stack.callFrames && stack.callFrames[0]
        ? (stack.callFrames[0].url || '') + ':' + stack.callFrames[0].lineNumber
        : (init.url || init.type || '');
      initiators.set(p.requestId, String(where));
    });
    cdp.on('Network.responseReceived', function (p) {
      if (p.response) responses.set(p.requestId, p.response.status);
    });
    cdp.on('Network.loadingFailed', function (p) {
      failedReqs.push({ id: p.requestId, url: requests.get(p.requestId) || '', err: p.errorText || '' });
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Log.enable');
    await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: VIEWPORT.width, height: VIEWPORT.height, deviceScaleFactor: 1, mobile: false,
    });
    const loaded = cdp.once('Page.loadEventFired', 30000);
    await send('Page.navigate', { url: base });
    await loaded;

    // 等 #root 内有内容
    let ready = 0;
    const readyDeadline = Date.now() + 20000;
    while (Date.now() < readyDeadline) {
      ready = await evaluate(evalFn(FN_ROOT_READY, []));
      if (ready > 0) break;
      await sleep(150);
    }
    if (ready > 0) pass('[0b] #root 已渲染', '子节点 ' + ready + ' 个');
    else fail('[0b] #root 已渲染', '20s 内 #root 无子节点');
    await sleep(500);

    // 断言 1：默认是「调色板海选」
    const gal = await evaluate(evalFn(FN_GALLERY, []));
    const galOk = (gal.gal === true || gal.hero > 0 || gal.grid > 0) && gal.cards > 0;
    if (galOk) pass('[1] 默认视图为「调色板海选」', '.gal 存在，主题卡 ' + gal.cards + ' 张，按钮态 ' + JSON.stringify(gal.onBtns));
    else fail('[1] 默认视图为「调色板海选」', JSON.stringify(gal));

    // 断言 2 前置：切到仿真视图
    const clicked = await evaluate(evalFn(FN_CLICK_TEXT, ['界面仿真']));
    await sleep(600);
    const simReady = await evaluate('(function(){return document.querySelectorAll(".sim").length;})()');
    if (clicked === 'ok' && simReady > 0) pass('[2.0] 已切换到「界面仿真」视图', '点击按钮 => .sim 存在');
    else fail('[2.0] 已切换到「界面仿真」视图', 'click=' + clicked + ' sim=' + simReady);

    // 断言 2：「示例」菜单下界面示例页的侧栏项（示例页直接挂在「示例」下，
    // 之后才是「结构示例」分隔标题 + 原有结构示例；靠 .sim-nav-sub-title 区分两段）
    const nav = await evaluate(evalFn(FN_NAV, []));
    // 「示例」菜单挂在「内容」分组下，分组标题不叫「示例」，
    // 故以「组内出现 .sim-nav-sub-title = 结构示例」定位承载它的分组。
    const exGroup = (nav || []).filter(function (g) { return (g.subTitles || []).indexOf('结构示例') >= 0; })[0];
    const exItems = exGroup ? exGroup.pages : [];
    const demoItems = exGroup ? exGroup.demos : [];
    const expectN = EXPECTED_PAGES.length;
    const orderOk = exItems.length === expectN && EXPECTED_PAGES.every(function (k, i) { return exItems[i] === k; });
    if (orderOk) {
      pass('[2.1] 侧栏「示例」菜单下界面示例页含 ' + expectN + ' 项且顺序一致', exItems.join(' / '));
    } else {
      const diff = [];
      for (let i = 0; i < Math.max(expectN, exItems.length); i++) {
        if (exItems[i] !== EXPECTED_PAGES[i]) diff.push('#' + (i + 1) + ' 期望 ' + JSON.stringify(EXPECTED_PAGES[i] || '(无)') + ' 实得 ' + JSON.stringify(exItems[i] || '(无)'));
      }
      fail('[2.1] 侧栏「示例」菜单下界面示例页含 ' + expectN + ' 项且顺序一致',
        '实得 ' + exItems.length + ' 项: ' + (exItems.join(' / ') || '(空)') + ' ；首个差异: ' + diff[0]);
    }
    if (exItems.length > 0) pass('[2.2] 「示例」菜单下有界面示例页', exItems.length + ' 项');
    else fail('[2.2] 「示例」菜单下有界面示例页', '0 项');
    // [2.2a] 每个示例页侧栏项都带一枚语义徽章图标（.sim-nav-icon.sub-icon > svg > path）
    const iconStat = await evaluate(evalFn(FN_NAV_ICONS, [EXPECTED_PAGES]));
    if (iconStat && iconStat.miss.length === 0 && iconStat.have.length === EXPECTED_PAGES.length) {
      pass('[2.2a] 9 个示例页侧栏项均带徽章图标', iconStat.have.length + ' / ' + EXPECTED_PAGES.length);
    } else {
      fail('[2.2a] 9 个示例页侧栏项均带徽章图标',
        '有图标 ' + (iconStat ? iconStat.have.length : 0) + ' 项，缺失 ' + JSON.stringify(iconStat ? iconStat.miss : []));
    }
    // [2.2b] 界面示例页直接接在「示例」下方，只有「结构示例」一条分隔标题，
    //        且「页面示例」字样不得再出现在侧栏
    const subs = exGroup ? exGroup.subTitles : [];
    const noPageTitle = !(exGroup && exGroup.allTitles.indexOf('页面示例') >= 0);
    if (subs.length === 1 && subs[0] === '结构示例' && demoItems.length >= EXPECTED_DEMO_MIN && noPageTitle) {
      pass('[2.2b] 示例页直接挂在「示例」下，仅「结构示例」一条分隔标题',
        '分隔标题 ' + subs.join(' / ') + '（结构示例 ' + demoItems.length + ' 项，页面示例字样已移除）');
    } else {
      fail('[2.2b] 示例页直接挂在「示例」下，仅「结构示例」一条分隔标题',
        '分隔标题 ' + JSON.stringify(subs) + '，结构示例 ' + demoItems.length + ' 项，页面示例字样残留=' + !noPageTitle);
    }

    const SAFE_BAD = String.fromCharCode(92) + '/:*?"<>| ';
    const safeName = function (s) {
      let out = '';
      for (const ch of String(s)) out = out + (SAFE_BAD.indexOf(ch) >= 0 ? '-' : ch);
      return out;
    };
    /** 逐页统计（供报告与「.points li 实测值」断言口径说明） */
    const visCounts = [];
    for (let i = 0; i < exItems.length; i++) {
      const label = exItems[i];
      const tag = '[2.3.' + (i + 1) + '] 示例页 ' + label;
      const clickRes = await evaluate(evalFn(FN_CLICK_NAV, [label]));
      await sleep(600);
      const st = await evaluate(evalFn(FN_EXSTATE, []));
      const headerOk = !!st.title && (st.title === label || st.title.indexOf(label) >= 0);
      const norm = function (s) { return String(s).split(' ').join('').split('/').join('').trim(); };
      const coverRate = function (a, b) {
        const bs = new Set(norm(b).split(''));
        const chars = norm(a).split('');
        if (!chars.length) return 0;
        let hit = 0;
        for (const c of chars) if (bs.has(c)) hit = hit + 1;
        return hit / chars.length;
      };
      const rate = coverRate(label, st.title);
      const titleOk = headerOk || rate >= 0.7;
      if (!headerOk && titleOk) warn(tag + ' h2 与侧栏文案措辞不同（覆盖率 ' + Math.round(rate * 100) + '%）：侧栏 ' + JSON.stringify(label) + ' -> h2 ' + JSON.stringify(st.title));
      const stageOk = st.hasStage === true;
      const pointsOk = st.points >= 3;
      const varOk = st.varBadCount === 0;
      const bytes = await screenshot(path.join(SHOT_DIR, 'app-' + (i + 1) + '-' + safeName(label) + '.png'));
      const parts = [
        'click=' + clickRes,
        'h2=' + JSON.stringify(st.title) + '(vs 侧栏 ' + JSON.stringify(label) + ', 覆盖率 ' + Math.round(rate * 100) + '%)',
        '.ex-stage=' + (stageOk ? 'ok' : 'missing'),
        '.points li=' + st.points,
        'stage 元素=' + st.stageEls,
        '可见元素=' + st.visEls,
        '未解析var=' + st.varBadCount,
        '截图=' + bytes + 'B',
      ];
      if (titleOk && stageOk && pointsOk && varOk) pass(tag, parts.join(' '));
      else fail(tag, parts.join(' ') + (st.varBadCount ? ' 样例: ' + st.varBad.join(' | ') : ''));

      // 断言 2.4：页面内容非空（.ex-stage 内可见元素 > 20，防「壳渲染了但内容空」）
      const visOk = st.visEls > 20;
      const visTag = '[2.4.' + (i + 1) + '] 示例页 ' + label + ' 内容非空';
      if (visOk) pass(visTag, '.ex-stage 内可见元素 ' + st.visEls + ' 个（> 20）');
      else fail(visTag, '.ex-stage 内可见元素仅 ' + st.visEls + ' 个（应 > 20，疑似内容未渲染）');
      visCounts.push({ label: label, vis: st.visEls, points: st.points, stageEls: st.stageEls });
    }

    // [2.5] 各页 .points li 数量一致性（实测值口径，不预设 5）
    {
      const pts = visCounts.map(function (v) { return v.points; });
      const uniq = Array.from(new Set(pts));
      const summary = visCounts.map(function (v) { return v.label + '=' + v.points; }).join(' ');
      if (uniq.length === 1 && uniq[0] >= 3) {
        pass('[2.5] 9 页 .points li 数量一致且 >= 3', summary);
      } else if (uniq.length > 1) {
        fail('[2.5] 9 页 .points li 数量一致且 >= 3', '实测值不统一: ' + summary);
      } else {
        fail('[2.5] 9 页 .points li 数量一致且 >= 3', '实测值 ' + uniq[0] + ' < 3: ' + summary);
      }
    }

    // 断言 3：在同一个示例页内切换主题下拉（dark / light 各一次）
    const before = await evaluate(evalFn(FN_THEME, []));
    const pickTheme = async function (scheme) {
      const openRes = await evaluate(evalFn(FN_OPEN_THEME, []));
      await sleep(250);
      const opts = await evaluate(evalFn(FN_THEME_OPTIONS, []));
      const hit = (opts || []).filter(function (o) {
        return !o.current && o.text.slice(-scheme.length - 2) === '· ' + scheme;
      })[0];
      if (!hit) return { ok: false, openRes: openRes, opts: opts || [], state: null, picked: '' };
      const clickRes = await evaluate(evalFn(FN_PICK_OPTION_TEXT, [hit.text]));
      await sleep(600);
      return { ok: true, openRes: openRes, opts: opts, state: await evaluate(evalFn(FN_THEME, [])), picked: hit.text, clickRes: clickRes };
    };
    const darkPick = await pickTheme('dark');
    const lightPick = await pickTheme('light');
    info('主题下拉选项数 dark=' + darkPick.opts.length + ' light=' + lightPick.opts.length + '（当前初始: ' + JSON.stringify(before.selText) + '）');
    if (darkPick.ok) info('切到 dark : ' + JSON.stringify(darkPick.picked) + '  --tv-bg=' + darkPick.state.tvBg + '  生效背景=' + darkPick.state.effBg);
    else fail('[3] 主题下拉可选中 dark 主题', 'open=' + darkPick.openRes + ' 选项 ' + darkPick.opts.length);
    if (lightPick.ok) info('切到 light: ' + JSON.stringify(lightPick.picked) + '  --tv-bg=' + lightPick.state.tvBg + '  生效背景=' + lightPick.state.effBg);
    else fail('[3] 主题下拉可选中 light 主题', 'open=' + lightPick.openRes + ' 选项 ' + lightPick.opts.length);
    info('--tv-bg 变化: ' + before.tvBg + ' -> ' + (darkPick.state ? darkPick.state.tvBg : '?') + ' -> ' + (lightPick.state ? lightPick.state.tvBg : '?'));
    info('可见背景变化: ' + before.effBg + ' -> ' + (darkPick.state ? darkPick.state.effBg : '?') + ' -> ' + (lightPick.state ? lightPick.state.effBg : '?'));

    const dS = darkPick.state, lS = lightPick.state;
    const tvChanged = !!(dS && lS && dS.tvBg && lS.tvBg && dS.tvBg !== lS.tvBg);
    const effChanged = !!(dS && lS && dS.effBg && lS.effBg && dS.effBg !== lS.effBg);
    if (tvChanged) pass('[3a] dark / light 两种主题下 --tv-bg 计算值不同', dS.tvBg + ' vs ' + lS.tvBg);
    else fail('[3a] dark / light 两种主题下 --tv-bg 计算值不同', 'dark=' + (dS ? dS.tvBg : 'n/a') + ' light=' + (lS ? lS.tvBg : 'n/a'));
    if (effChanged) pass('[3b] 可见背景（.sim backgroundColor）随主题变化', dS.effBg + ' vs ' + lS.effBg);
    else fail('[3b] 可见背景（.sim backgroundColor）随主题变化', 'dark=' + (dS ? dS.effBg : 'n/a') + ' light=' + (lS ? lS.effBg : 'n/a'));
    if (dS && dS.title && before.title && dS.title === before.title) info('切换在示例页内完成，h2 保持: ' + JSON.stringify(before.title));
    if (before.bodyBg === (lS ? lS.bodyBg : '')) info('body 计算背景固定为 ' + before.bodyBg + '（index.css 固定底色），可见背景由 .app/.sim 承担');
    const themeShotFile = path.join(SHOT_DIR, 'app-theme-light.png');
    const themeShot = await screenshot(themeShotFile);
    info('主题切换后截图 ' + path.basename(themeShotFile) + '  ' + themeShot + ' B');

    /**
     * 断言 3c / 3d：示例页必须真正随主题换肤。
     * 做法：进入目标示例页 -> 取某元素计算色作为基线 -> 逐个换主题 -> 直到该色发生变化。
     * 若颜色不变，说明该元素颜色被硬编码而非取自 --tv-*，判 FAIL。
     */
    const listThemeOptions = async function () {
      await evaluate(evalFn(FN_OPEN_THEME, []));
      await sleep(220);
      return (await evaluate(evalFn(FN_THEME_OPTIONS, []))) || [];
    };
    const schemeOf = function (text) {
      if (text.slice(-5) === 'light') return 'light';
      if (text.slice(-4) === 'dark') return 'dark';
      return '';
    };
    const runSkinCase = async function (tag, label, fnSource, readColor, desc) {
      const navRes = await evaluate(evalFn(FN_CLICK_NAV, [label]));
      await sleep(600);
      if (navRes !== 'ok') { fail(tag, '无法进入示例页 ' + JSON.stringify(label) + ' click=' + navRes); return; }
      const before = await evaluate(evalFn(fnSource, []));
      const base = readColor(before);
      if (!base || base === 'rgba(0, 0, 0, 0)' || base === 'transparent') {
        fail(tag, '基线取色为空：' + JSON.stringify(before));
        return;
      }
      const used = new Set();
      const tried = [];
      let hit = null;
      for (let k = 0; k < 8; k++) {
        const opts = await listThemeOptions();
        const cur = (opts.filter(function (o) { return o.current; })[0] || {}).text || '';
        const curScheme = schemeOf(cur);
        const cands = opts.filter(function (o) { return !o.current && !used.has(o.text); });
        // 优先挑「方案不同」（dark <-> light）的候选，更能证明颜色来自主题变量
        const target = cands.filter(function (o) {
          const s = schemeOf(o.text);
          return s && curScheme && s !== curScheme;
        })[0] || cands[0];
        if (!target) break;
        used.add(target.text);
        const pickRes = await evaluate(evalFn(FN_PICK_OPTION_TEXT, [target.text]));
        await sleep(520);
        const after = await evaluate(evalFn(fnSource, []));
        const now = readColor(after);
        tried.push(JSON.stringify(target.text) + ' -> ' + now);
        if (pickRes === 'ok' && now && now !== base) { hit = { text: target.text, color: now, state: after }; break; }
      }
      if (hit) {
        pass(tag + ' 示例页 ' + label, desc + ' 随主题变化：' + base + ' -> ' + hit.color + '（换到 ' + JSON.stringify(hit.text) + '）');
      } else {
        fail(tag + ' 示例页 ' + label, desc + ' 在 ' + tried.length + ' 次换主题后仍为 ' + base + '（疑似硬编码而非 var(--tv-*)）；尝试记录: ' + (tried.join(' | ') || '无可选主题'));
      }
    };
    /** runSkinCase 的选择器版：按 CSS 选择器取计算色（用于 P1/P2 新增页） */
    const runSkinCaseSel = async function (tag, label, sel, prop, desc) {
      const probe = async function () {
        return await evaluate(evalFn(FN_COLOR_PROBE, [sel, prop]));
      };
      const navRes = await evaluate(evalFn(FN_CLICK_NAV, [label]));
      await sleep(600);
      if (navRes !== 'ok') { fail(tag + ' 示例页 ' + label, '无法进入示例页 click=' + navRes); return; }
      const before = await probe();
      const base = before && before.value;
      if (!before || before.count === 0 || !base) {
        fail(tag + ' 示例页 ' + label, '选择器 ' + sel + ' 未命中元素（count=' + (before ? before.count : 0) + '）');
        return;
      }
      const used = new Set();
      const tried = [];
      let hit = null;
      for (let k = 0; k < 8; k++) {
        const opts = await listThemeOptions();
        const cur = (opts.filter(function (o) { return o.current; })[0] || {}).text || '';
        const curScheme = schemeOf(cur);
        const cands = opts.filter(function (o) { return !o.current && !used.has(o.text); });
        const target = cands.filter(function (o) {
          const s = schemeOf(o.text);
          return s && curScheme && s !== curScheme;
        })[0] || cands[0];
        if (!target) break;
        used.add(target.text);
        const pickRes = await evaluate(evalFn(FN_PICK_OPTION_TEXT, [target.text]));
        await sleep(520);
        const after = await probe();
        const now = after && after.value;
        tried.push(JSON.stringify(target.text) + ' -> ' + now);
        if (pickRes === 'ok' && now && now !== base) { hit = { text: target.text, color: now }; break; }
      }
      if (hit) {
        pass(tag + ' 示例页 ' + label, desc + '（选择器 ' + sel + ' × ' + prop + '，命中 ' + before.count + ' 个）随主题变化：' + base + ' -> ' + hit.color + '（换到 ' + JSON.stringify(hit.text) + '）');
      } else {
        fail(tag + ' 示例页 ' + label, desc + '（选择器 ' + sel + ' × ' + prop + '）在 ' + tried.length + ' 次换主题后仍为 ' + base + '（疑似硬编码而非 var(--tv-*)）；尝试记录: ' + (tried.join(' | ') || '无可选主题'));
      }
    };
    await runSkinCase('[6.1]', '图表专区', FN_BAR_SKIN, function (s) { return s ? s.first : ''; }, '首个柱条 .ex-bar-pair i 的 background-color');
    await runSkinCase('[6.2]', '状态页合集', FN_STATE_SKIN, function (s) { return s ? s.color : ''; }, '状态图形 .ex-state-art 的 color');
    // [6.3] 新增 P1/P2 页换肤对比：富文本 diff 与营销定价页各挑一个纯 token 驱动的元素
    await runSkinCaseSel('[6.3.1]', '富文本 diff', '.p2-wd-del', 'background-color', 'diff 删除块 background-color（color-mix 自 var(--tv-danger)）');
    await runSkinCaseSel('[6.3.2]', '营销定价页', '.p2-plan-badge', 'background-color', '推荐方案角标 background-color（= var(--tv-accent)）');
    {
      const backShot = await screenshot(path.join(SHOT_DIR, 'app-skin-after.png'));
      info('换肤断言后截图 app-skin-after.png  ' + backShot + ' B');
    }

    // 断言 4：无 console error / pageerror / 失败网络请求
    const shotAfter = shots.length;
    const netFail = failedReqs.filter(function (f) { return (f.url || '').indexOf('favicon') < 0; });
    const netBaseline = [];
    const netReal = [];
    for (const f of netFail) {
      if (baselineHostOf(f.url)) netBaseline.push(f);
      else netReal.push(f);
    }
    const badStatus = [];
    for (const entry of responses) {
      const url = requests.get(entry[0]) || '';
      if (url.indexOf('favicon') >= 0) continue;
      if (entry[1] >= 400) badStatus.push(entry[1] + ' ' + url);
    }
    if (consoleErrors.length === 0) pass('[4a] 全程无 console error / pageerror');
    else fail('[4a] 全程无 console error / pageerror', consoleErrors.slice(0, 6).join(' | '));
    for (const f of netBaseline) warn('[4b] 失败请求命中既有基线白名单（非本次改动）', f.err + ' ' + f.url);
    if (netReal.length === 0) {
      pass('[4b] 无失败网络请求（Network.loadingFailed）', netBaseline.length ? '基线外链失败 ' + netBaseline.length + ' 条已记为 WARN' : '0 条失败请求');
    } else {
      fail('[4b] 无失败网络请求（Network.loadingFailed）', netReal.slice(0, 6).map(function (f) { return f.err + ' ' + f.url; }).join(' | '));
    }
    if (badStatus.length === 0) pass('[4c] 无 status>=400 的网络响应');
    else fail('[4c] 无 status>=400 的网络响应', badStatus.slice(0, 6).join(' | '));

    // 断言 5：无外部域名资源
    const urls = Array.from(new Set(Array.from(requests.values())));
    const allowed = function (u) {
      if (u.indexOf('data:') === 0 || u.indexOf('blob:') === 0 || u.indexOf('about:') === 0) return true;
      try {
        const h = new URL(u).hostname;
        return h === '127.0.0.1' || h === 'localhost' || h === '[::1]';
      } catch (e) { return false; }
    };
    const external = urls.filter(function (u) { return !allowed(u); });
    const extBaseline = [];
    const extReal = [];
    for (const u of external) {
      if (baselineHostOf(u)) extBaseline.push(u);
      else extReal.push(u);
    }
    const extHosts = {};
    for (const u of extReal) {
      let host = u;
      try { host = new URL(u).hostname; } catch (e) { /* 保留原串 */ }
      if (!extHosts[host]) extHosts[host] = [];
      extHosts[host].push(u);
    }
    info('请求总数 ' + requests.size + '，去重 URL ' + urls.length);
    for (const u of urls) {
      let by = '';
      for (const entry of requests) {
        if (entry[1] === u) { by = initiators.get(entry[0]) || ''; break; }
      }
      info('  req ' + u + (by ? '   <- ' + by : ''));
    }
    if (external.length === 0) {
      pass('[5] 无外部域名资源请求', '全部请求指向 127.0.0.1 / data: / blob:');
    } else if (extReal.length === 0) {
      const baseHostList = Array.from(new Set(extBaseline.map(function (u) { let h = u; try { h = new URL(u).hostname; } catch (e) { /* 保留 */ } return h; }))).join(', ');
      pass('[5] 无外部域名资源请求', '白名单外 0 条；命中既有基线白名单 ' + extBaseline.length + ' 条（' + baseHostList + '），详见汇总「基线豁免」节');
      warn('[5] 外部域名请求命中既有基线白名单（非本次改动）', extBaseline.length + ' 条，主机 ' + baseHostList);
    } else {
      const hostList = Object.keys(extHosts).map(function (h) { return h + ' x' + extHosts[h].length; }).join(', ');
      fail('[5] 无外部域名资源请求', '白名单外域名: ' + hostList + ' ；样例: ' + extReal.slice(0, 3).join(' | '));
    }

    // 断言 7：截图落盘
    const badShots = shots.filter(function (s) { return !fs.existsSync(s.file) || s.bytes < 1000; });
    const pageShots = shots.filter(function (s) { return path.basename(s.file).indexOf('app-') === 0 && s.file.indexOf('theme') < 0 && s.file.indexOf('skin') < 0; });
    if (pageShots.length >= exItems.length && badShots.length === 0) {
      pass('[7] 截图全部落盘', '示例页 ' + pageShots.length + ' 张（应 ' + exItems.length + '）+ 主题/换肤 ' + (shots.length - pageShots.length) + ' 张，共 ' + shots.length + ' 张，目录 ' + SHOT_DIR);
    } else {
      fail('[7] 截图全部落盘', '示例页截图 ' + pageShots.length + ' 张（应 ' + exItems.length + '），总 ' + shots.length + '，异常 ' + badShots.length);
    }
    info('本次截图 ' + shotAfter + ' 张（示例页 ' + exItems.length + ' + 主题切换 1 + 换肤断言 1）');

    const failed = results.filter(function (r) { return !r.ok; }).length;
    exitCode = failed === 0 ? 0 : 1;
  } catch (err) {
    console.error('');
    console.error('错误: ' + (err && err.message ? err.message : String(err)));
    if (err && err.stack) console.error(String(err.stack).split(NL).slice(0, 4).join(NL));
    exitCode = 1;
  } finally {
    if (cdp) cdp.close();
    if (child && !child.killed) { try { child.kill(); } catch (e) { /* 忽略 */ } }
    if (served.proc && !served.proc.killed) {
      try { served.proc.kill(); } catch (e) { /* 忽略 */ }
      info('已关闭自行拉起的静态服务 (pid ' + served.proc.pid + ')');
    }
    await sleep(200);
    try { await fsp.rm(profileDir, { recursive: true, force: true, maxRetries: 3 }); } catch (e) { /* 忽略 */ }
  }

  console.log('');
  console.log('== 汇总 ==');
  const passedCount = results.filter(function (r) { return r.ok; }).length;
  const failedCount = results.length - passedCount;
  const warnCount = warns.length;
  console.log('检查项 ' + results.length + '   PASS ' + passedCount + '   WARN ' + warnCount + '   FAIL ' + failedCount
    + (warnCount > 0 ? '   <-- 有 WARN，请查看下方清单' : ''));
  if (warnCount > 0) {
    console.log('');
    console.log('WARN 清单:');
    for (const w of warns) console.log('  - ' + w.name + (w.detail ? '  (' + w.detail + ')' : ''));
  }
  if (failedCount > 0) {
    console.log('');
    console.log('FAIL 明细:');
    for (const r of results) if (!r.ok) console.log('  - ' + r.name + (r.detail ? '  (' + r.detail + ')' : ''));
  }
  console.log('');
  console.log('== 基线豁免 ' + baselineUrls.size + ' 条（既有行为，非本次示例页改动）==');
  console.log('判定依据: src/lib/fontLoader.ts:12-23 的 loadGoogleFonts 经 src/App.tsx:54-61 的 useEffect');
  console.log('          向 <head> 注入 fonts.googleapis.com 的 <link>；src/data/tv.ts:230 与');
  console.log('          src/data/fontThemes.ts:41 的 CJK_SANS 含 "PingFang SC"（非 Google Fonts 字体，');
  console.log('          故被 Chrome 判 net::ERR_BLOCKED_BY_ORB）。git log 显示 fontLoader.ts 属既有提交 2cd29fd。');
  console.log('白名单（' + BASELINE_EXTERNAL_HOSTS.length + ' 项）: ' + BASELINE_EXTERNAL_HOSTS.join(', '));
  if (baselineUrls.size === 0) console.log('本次运行未出现基线外链请求。');
  else for (const u of baselineUrls) console.log('  * ' + u);
  console.log('');
  console.log('body 计算背景不断言: src/index.css:39-44 把 body { background: #101014 } 硬编码，');
  console.log('  可见背景由 src/index.css:46-53 的 .app { background: var(--tv-bg) } 与 .sim 承担，');
  console.log('  故断言 [3b] 改取 .sim 的 backgroundColor，body 值仅作 INFO 输出。');
  console.log('');
  console.log('截图目录: ' + SHOT_DIR);
  console.log('退出码: ' + exitCode + '（0=FAIL 为 0；1=有 FAIL；2=前置条件缺失。WARN 不影响退出码）');
  process.exitCode = exitCode;
}

main().catch(function (err) {
  console.error('未捕获错误: ' + (err && err.message ? err.message : String(err)));
  process.exitCode = 1;
});
