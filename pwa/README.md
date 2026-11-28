# BELLA 助手 · PWA

离线 Web App，两种分发形态：

| 形态 | 产物 | 离线来源 | 能否添加到主屏 |
| --- | --- | --- | --- |
| 标准 PWA（零依赖、零构建） | `pwa/` 静态目录 | Service Worker 预缓存 | ✅ 需 HTTPS / localhost |
| 单文件版（esbuild 压缩打包） | `dist/bella-french.html`（约 606KB） | 全部资源已内联，文件本身就是离线包 | ❌ 直接打开时无 SW |

与 `miniprogram/`、`ios/` 同源：词库来自 `data/words.json`，科学来自 `data/science.json`（均由 `ios/Tools/export_words.js` 导出）；记忆算法与持久化键名完全一致。第六个 tab「科学」有四个分段：每日背诵（今日到期 + 当日额度新卡，评完自动离场）、公式、自测、复习计划（四卡统计 + 清单成队 + 公式待复习入口），走独立的 `science_memory_v1` / `science_plan_v1`，与小程序、iOS 同一套卡组口径。

## 单文件版：一个 HTML 拷走就用

```bash
cd pwa
npm install                 # 仅首次需要，只为装 esbuild
npm run build:single        # → dist/bella-french.html
```

构建脚本做四件事：esbuild 压缩 `app.js` / `app.css`；`words.json` 与 `science.json` 紧凑内嵌；图标与 manifest 转 data URI；折叠 HTML 空白。产物自检会拒绝任何残留的外部引用。

把 `dist/bella-french.html` 用 AirDrop / 文件 App / 邮件发到设备，直接打开即可背词——**不需要服务器、不需要联网、不需要安装**。页面里的 `__BELLA_SINGLE_FILE__` 构建标志会跳过两次 `fetch` 与 `serviceWorker.register()`；状态仍写 `localStorage`，键名与另外两端一致。

取舍：

- 单文件形态没有外部 `sw.js` 可注册（浏览器不允许用 `blob:` URL 注册 SW），因此**没有版本更新提示**：换了新 HTML 就是新版本，旧文件的进度只留在它自己的 origin 下。
- `file://` 的 `localStorage` 由浏览器按文件来源隔离，Safari 真机行为未验证；若要稳妥持久化与「添加到主屏幕」，仍用下面标准 PWA 的 HTTPS 部署。
- manifest 与图标以内联 data URI 提供，Chrome 对 `data:` manifest 支持不完整；不影响页面运行，安装能力请用标准版。

## 本地跑（标准 PWA）

```bash
cd pwa
python3 -m http.server 8080        # 或 npx serve .
# http://localhost:8080
```

Service Worker 只在 **HTTPS 或 localhost** 下注册，所以本地必须用 `localhost` 而不是 `file://`。

## 部署

任意静态托管都行，不需要 Node、不需要打包：

- 现有 Caddy：`bella.valen-robotic.cn { root * /srv/bella-french/pwa  file_server }`
- 或 `gh-pages` / Cloudflare Pages / 对象存储 + CDN。

## 安装

| 平台 | 操作 |
| --- | --- |
| iPhone / iPad | **Safari** 打开 → 分享 → 添加到主屏幕（Chrome/Firefox 的 iOS 版不支持） |
| Android | Chrome 菜单 → 安装应用 |
| macOS / Windows | Chrome / Edge 地址栏右侧安装图标 |

首次打开需联网一次（缓存 App Shell 与词库），之后飞行模式可正常使用。

## 离线缓存（`sw.js`）

| 层 | 策略 | 说明 |
| --- | --- | --- |
| App Shell（html/css/js/manifest/图标） | 预缓存 + cache-first | 冷启动 0 网络请求 |
| `data/words.json` / `data/science.json` | 独立 `bella-data-<版本>` + cache-first | 只读数据，随版本整体替换 |
| 其它静态资源 | stale-while-revalidate | 先回缓存，后台更新 |
| 导航请求 | 优先返回缓存 shell | 断网也能启动，缺失才回网络 |

用户状态（记忆档案 / 计划 / 分数）只写 `localStorage`，**不进 Cache**，因此更新外壳不丢进度；首启会请求 `navigator.storage.persist()` 降低被系统清理的概率。

## 发版检查清单

改动任何前端文件后：

1. 改 `sw.js` 顶部的 `VERSION`（当前 `v1.1.0`），否则老缓存不会失效；
2. 若改了词库/例句/变位：`node ios/Tools/export_words.js`；
3. 若改了图标：`python3 ios/Tools/make_appicon.py`；
4. 重新部署 → 老用户会在页面底部看到「发现新版本 · 点此更新」，点一下才刷新（不会打断正在背的词）；
5. 若也发单文件版：`npm run build:single`，把新的 `dist/bella-french.html` 替换掉旧文件。

## 文件

```
pwa/
├── index.html            外壳（顶部品牌 + 进度环 + 六个 tab + 强制自测弹层）
├── app.css               绿色主题令牌、卡片、翻面动画、各 tab 样式
├── app.js                Engine（记忆曲线）+ Bank / Science（词库）+ 六 tab + localStorage
├── sw.js                 预缓存 / 分层策略 / 版本升级 / 离线回退
├── manifest.webmanifest  安装信息（standalone、主题色、三种图标）
├── data/words.json       613 + 1141 词与知识点（导脚本产出，勿手改）
├── data/science.json     生物 67（七 30 + 八 37）+ 化学 35 + 公式 30 条（导脚本产出，勿手改）
├── icons/                192 / 512 / maskable 512 / apple-touch 180
├── build-single.js       esbuild 压缩 + 全资源内联 → dist/bella-french.html
├── package.json          唯一开发依赖：esbuild（运行 PWA 本身不需要）
└── dist/bella-french.html  单文件产物（构建生成）
```
