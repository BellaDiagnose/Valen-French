/* =========================================================================
 * BELLA 助手 · Service Worker
 *
 * 离线缓存设计（三层）
 * ─────────────────────────────────────────────────────────────────────────
 * 1) 预缓存（install）：App Shell 全部静态资源 + 词库数据一次性写入
 *    `bella-shell-<版本>`。策略为 cache-first，冷启动 0 网络请求即可渲染。
 * 2) 词库数据 `data/words.json` / `data/science.json`：随版本号变化而整体替换，
 *    运行期只读 → cache-first，不做过期校验（避免离线时被网络抖动拖累）。
 * 3) 其余静态资源（css/js/图标）：stale-while-revalidate ——
 *    先返回缓存保证秒开，后台静默拉新写入下一版本缓存。
 *
 * 升级流程
 * ─────────────────────────────────────────────────────────────────────────
 * 改了任何前端文件必须同改 VERSION，否则旧缓存不会失效：
 *   新 SW 装好进入 waiting → 页面顶部出现「发现新版本」条
 *   → 用户点击 → postMessage(SKIP_WAITING) → controllerchange → 自动刷新。
 * 启动时同时清理所有非当前版本的缓存目录，避免存储膨胀。
 *
 * 用户学习状态（记忆档案 / 计划 / 分数）只存 localStorage，不进 Cache，
 * 因此更新 App Shell 不会丢进度；离线状态下写入同样安全。
 * ========================================================================= */

const VERSION = 'v1.4.1';
const SHELL_CACHE = `bella-shell-${VERSION}`;
const DATA_CACHE = `bella-data-${VERSION}`;
const KEEP = [SHELL_CACHE, DATA_CACHE];

const PRECACHE = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './manifest.webmanifest',
  './data/words.json',
  './data/science.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png'
];

/* ---------------- 安装：预缓存 App Shell ---------------- */

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    const data = await caches.open(DATA_CACHE);

    // 逐条 add，单条失败不拖垮整体（离线首装时仍能装上一个可用的壳）
    await Promise.all(PRECACHE.map(async (url) => {
      const target = url.includes('/data/') ? data : shell;
      try {
        await target.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[sw] 预缓存失败', url, err);
      }
    }));

    // 不自动 skipWaiting：等用户确认后再接管，避免打断正在背的词
  })());
});

/* ---------------- 激活：清理旧版本 + 接管页面 ---------------- */

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      const isBella = key.startsWith('bella-shell-') || key.startsWith('bella-data-');
      return isBella && !KEEP.includes(key) ? caches.delete(key) : undefined;
    }));

    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.disable();
    }
    await self.clients.claim();
  })());
});

/* ---------------- 取用策略 ---------------- */

async function fromCache(cacheName, request) {
  const cache = await caches.open(cacheName);
  return cache.match(request, { ignoreSearch: true });
}

async function staleWhileRevalidate(cacheName, request) {
  const cached = await fromCache(cacheName, request);
  const network = fetch(request).then(async (response) => {
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  return cached || (await network) || Response.error();
}

async function networkFirst(cacheName, request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await fromCache(cacheName, request);
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 页面导航：缓存里的 shell 优先（离线也能启动），miss 再走网络
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const shell = await fromCache(SHELL_CACHE, './index.html');
      if (shell) return shell;
      try {
        return await fetch(request);
      } catch (err) {
        return new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<body style="font:16px -apple-system,sans-serif;padding:48px 24px;text-align:center;color:#10261d;background:#f2f8f4">' +
          '<h1 style="font-size:20px">暂时无法启动</h1>' +
          '<p style="color:#5e7368">首次使用需要联网完成一次缓存，之后即可离线。</p></body>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
        );
      }
    })());
    return;
  }

  // 词库：只读 + 随版本整体替换 → cache-first
  if (url.pathname.endsWith('/data/words.json')) {
    event.respondWith((async () => {
      const cached = await fromCache(DATA_CACHE, request);
      if (cached) return cached;
      return networkFirst(DATA_CACHE, request);
    })());
    return;
  }

  // 静态资源：先给缓存，后台更新
  if (/\.(css|js|png|svg|webmanifest|json|woff2?)$/.test(url.pathname) || url.pathname.endsWith('/')) {
    event.respondWith(staleWhileRevalidate(SHELL_CACHE, request));
    return;
  }

  event.respondWith(networkFirst(SHELL_CACHE, request));
});

/* ---------------- 消息：跳过等待 ---------------- */

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
