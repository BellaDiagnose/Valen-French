'use strict';

/**
 * 把 PWA 打包成一个自包含的 HTML 文件。
 *
 *   node pwa/build-single.js
 *   → pwa/dist/bella-french.html
 *
 * 内联内容：app.css（esbuild minify）· app.js（esbuild minify）·
 *           data/{words,science}.json · 图标（base64）· manifest（data URI）。
 * 单文件形态没有外部 sw.js，Service Worker 不注册；离线能力来自文件本身，
 * app.js 通过 __BELLA_SINGLE_FILE__ / __BELLA_INLINE_DATA__ / __BELLA_INLINE_SCIENCE__ 三个钩子切换。
 */

const fs = require('fs');
const path = require('path');
const { transformSync } = require('esbuild');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist', 'bella-french.html');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const dataUri = (file, mime) =>
  `data:${mime};base64,${fs.readFileSync(path.join(ROOT, file)).toString('base64')}`;

// ---------- 1. 压缩 JS / CSS ----------
const js = transformSync(read('app.js'), {
  loader: 'js',
  minify: true,
  target: 'es2020',
  legalComments: 'none'
}).code;

const css = transformSync(read('app.css'), {
  loader: 'css',
  minify: true,
  target: 'es2020'
}).code;

// ---------- 2. 内联数据 ----------
const words = JSON.stringify(JSON.parse(read('data/words.json')))
  .replace(/<\//g, '<\\/'); // 防止词库内容意外闭合 <script>
const science = JSON.stringify(JSON.parse(read('data/science.json')))
  .replace(/<\//g, '<\\/');

const manifest = JSON.parse(read('manifest.webmanifest'));
delete manifest.start_url;
delete manifest.scope;
manifest.icons = [{
  src: dataUri('icons/icon-192.png', 'image/png'),
  sizes: '192x192',
  type: 'image/png',
  purpose: 'any'
}];
const manifestUri = 'data:application/manifest+json;base64,' +
  Buffer.from(JSON.stringify(manifest)).toString('base64');

const appleIcon = dataUri('icons/apple-touch-icon-180.png', 'image/png');
const favicon = dataUri('icons/icon-192.png', 'image/png');

// ---------- 3. 替换 index.html 的外部引用 ----------
const replacements = [
  ['<link rel="manifest" href="manifest.webmanifest">',
    `<link rel="manifest" href="${manifestUri}">`],
  ['<link rel="apple-touch-icon" href="icons/apple-touch-icon-180.png">',
    `<link rel="apple-touch-icon" href="${appleIcon}">`],
  ['<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png">',
    `<link rel="icon" type="image/png" sizes="192x192" href="${favicon}">`],
  ['<link rel="stylesheet" href="app.css">', `<style>${css}</style>`],
  ['<script src="app.js"></script>',
    `<script>window.__BELLA_SINGLE_FILE__=true;window.__BELLA_INLINE_DATA__=${words};window.__BELLA_INLINE_SCIENCE__=${science};</script>` +
    `<script>${js}</script>`]
];

let html = read('index.html');
for (const [from, to] of replacements) {
  if (!html.includes(from)) throw new Error(`index.html 中找不到待替换项：${from}`);
  html = html.replace(from, to);
}

// 折叠标签间空白，但保护 <style>/<script> 内容
const blocks = [];
html = html.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
  blocks.push(m);
  return `\u0000BELLA_BLOCK_${blocks.length - 1}\u0000`;
});
html = html.replace(/>\s+</g, '><').replace(/\n{2,}/g, '\n');
blocks.forEach((block, i) => {
  html = html.replace(`\u0000BELLA_BLOCK_${i}\u0000`, block);
});

// ---------- 4. 自检 + 落盘 ----------
const markup = html.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
const leftovers = ['src="app.js"', 'href="app.css"', 'sw.js', 'data/words.json', 'data/science.json',
  'href="icons/', 'href="manifest.webmanifest"'];
const found = leftovers.filter((s) => markup.includes(s));
if (found.length) throw new Error(`仍有外部引用：${found.join(', ')}`);
if (!html.includes('__BELLA_INLINE_DATA__')) throw new Error('词库未注入');
if (!html.includes('__BELLA_INLINE_SCIENCE__')) throw new Error('科学数据未注入');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

const kb = (n) => (n / 1024).toFixed(0) + 'KB';
console.log(`✓ ${path.relative(process.cwd(), OUT)} (${kb(Buffer.byteLength(html))})`);
console.log(`  JS ${kb(Buffer.byteLength(js))} · CSS ${kb(Buffer.byteLength(css))} · 词库 ${kb(Buffer.byteLength(words))} · 科学 ${kb(Buffer.byteLength(science))} · 图标+manifest ${kb(Buffer.byteLength(manifestUri + appleIcon + favicon))}`);
console.log('  无外部请求；SW 在单文件模式下不注册');
