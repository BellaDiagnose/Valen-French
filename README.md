# BELLA 助手 · 法语复习 + 七/八年级生物 + 八年级化学

给女儿做的复习 App：法语两本教材、双词库、艾宾浩斯间隔重复；**另含初二生物 / 化学双语知识点与公式**（上海新教材 × 爱尔兰 Leaving Certificate）。**同一套学习算法与爱尔兰绿配色，三套实现并行**——微信小程序、iOS 原生（SwiftUI）、可离线安装的 PWA。

| 平台 | 位置 | 技术栈 | 状态 |
| --- | --- | --- | --- |
| 微信小程序 | `miniprogram/` | WXML / WXSS / 原生 JS，纯本地存储；法语 + 科学（生物 7/8、化学 8） | 已可用，未真机预览 |
| iOS 原生 | `ios/` | SwiftUI，iOS 16+，UserDefaults 持久化；法语 + 科学（生物 7/8、化学 8） | 工程完整，未编译验证 |
| PWA | `pwa/` | 原生 JS + Service Worker，localStorage + 离线缓存；法语 + 科学，另有单文件构建 | 已可安装，离线自测通过 |

> 科学模块在**三端均已实现**：生物覆盖七、八年级，化学为八年级；由启动 landing page 的科学卡或法语页入口进入。数据由同一份 `miniprogram/pages/science/*.js` 导出，三端记忆档案互相隔离（键名 `science_*`）。

## 快速开始

### 微信小程序

微信开发者工具 →「导入项目」→ 目录选本仓库根目录。两种打开方式都受支持：

1. **打开仓库根**（推荐，`project.config.json` 里 `"miniprogramRoot": "miniprogram/"`）。
2. **直接打开 `miniprogram/`**——该目录自带一份 `project.config.json`（`miniprogramRoot` 为空串），可当独立工程用。

> 若编译报 `app.json is not found in the project root directory`，是工具把 `miniprogramRoot` 解析成了空串、跑去仓库根找 `app.json` 了。两份配置现在都显式声明了根目录，退出工具重开或改用第 2 种方式即可。

AppID `wx7c642f582ed0c718`，基础库 3.18.0，`urlCheck: false`（无后端、无网络请求）。

### iOS

```bash
open ios/ValenFrench.xcodeproj
```

1. 选中 `ValenFrench` target → **Signing & Capabilities** → 勾选 Team（免费 Apple ID 即可）。
2. 需要时改 `PRODUCT_BUNDLE_IDENTIFIER`（默认 `cn.valenrobotic.bellafrench`）。
3. 选 iPhone 模拟器或真机 → ⌘R。

要求 Xcode 15+ / iOS 16.0+。工程是手写 `project.pbxproj`，不含 `xcuserdata`，首次打开由 Xcode 自行生成。

### 没有 Xcode 也能编译（GitHub Actions）

本机只有 Command Line Tools 时无法编译 Swift：CLT 的 Swift 标准库只有 `macosx / maccatalyst / xros`，**没有 `iphoneos`**，`swiftc -target arm64-apple-ios` 必然失败。改用仓库自带的流水线，在云端 macOS 上编译：

1. 推到 GitHub → **Actions** → `iOS IPA (unsigned)` → **Run workflow**（或打 `ios-v*` tag 自动触发）。
2. 跑完在 artifact 里下载 `ValenFrench-unsigned-ipa`（约 3–5 分钟）。
3. 用 **iloader / SideStore / Sideloadly** 以你自己的 Apple ID 签名后装进 iPhone。

产物是**未签名** ipa，构建过程不需要任何 Apple 证书；签名与安装都在侧载工具里完成。公开仓库的 macOS runner 免费且不计量分钟数（私有仓库按 Linux 的 10 倍计费，免费额度折合约 200 分钟/月）。

家用侧载的固有限制（免费 Apple ID）：签名 **7 天过期**、同时最多 **3 个**侧载应用、iOS 16+ 需在「设置 → 隐私与安全性 → 开发者模式」打开开关。想彻底摆脱这些限制，只有 iOS ≤ 16.6.1 / 17.0 的设备能走 TrollStore；或改用下面的 PWA。

### PWA（推荐给「不想签名、不想过期」的场景）

`pwa/` 是零依赖静态站点，装到主屏后与原生 App 外观一致（无地址栏、独立图标、横竖屏锁定），**装一次永久有效，离线可用**。

```bash
cd pwa && python3 -m http.server 8080
# 打开 http://localhost:8080
```

- **iPhone / iPad**：Safari 打开站点 → 分享 → **添加到主屏幕**（必须 Safari，Chrome 系不支持添加到主屏）。
- **Android**：Chrome 菜单 → **安装应用 / 添加到主屏幕**。
- **桌面**：Chrome / Edge 地址栏右侧的安装图标。

上线必须走 **HTTPS**（`localhost` 例外），否则 Service Worker 不注册、也就没有离线。本项目可直接挂到现有的 Caddy 反代下，例如 `bella.valen-robotic.cn` 指到 `pwa/` 目录即可，无需任何构建步骤。

安装能力依赖 `manifest.webmanifest`（`display: standalone`、`theme_color`、三种图标）与 `sw.js`；`icons/` 里的图标由 `ios/Tools/make_appicon.py` 一并生成（含 Android maskable 安全区版本）。

**不想托管、只想拷一个文件**：`cd pwa && npm install && npm run build:single` → `pwa/dist/bella-french.html`（约 491KB）。esbuild 压缩 JS/CSS，词库、图标、manifest 全部内联，双击即开、断网可用；单文件形态没有外部 `sw.js`，因此不提供「添加到主屏幕」与版本更新提示，真机 `file://` 下的 `localStorage` 持久化也未验证。详见 [`pwa/README.md`](pwa/README.md)。

## 功能

| 模块 | 说明 |
| --- | --- |
| 单词卡 | 3D 翻面卡；背面内嵌**现在时变位表** + 法语例句 + 中文译文 |
| 按课背诵 | 第 1–30 课课次条，每个 chip 两行显示课次与词数 |
| 自测 | 四选一，法↔中交替；答后绿/红反馈并给出例句 |
| 变位表 | 39 个动词 × 5 时态（现在 / 未完成过去 / 复合过去 / 简单将来 / 过去将来），遮挡点击揭示 |
| 复习计划 | 待复习 / 学习中 / 新词分组，动态每日额度 |
| 知识点 | En Avant 按单元（125 条 / 21 单元）；简明法语按 A1·A2（30 课） |
| 每日计划 | 默认 20 词，10–30 动态调节；间隔 ≥ 3 天打开强制 10 题热身 |
| 进度环 / 导航 | 右上角可拖动悬浮球（法语页 / 科学页共用）：正面当前模块进度环，点击翻面展开为正常尺寸的悬浮面板，列出「首页 + 两本法语书 + 化学 + 生物」，点按即切换模块；四个模块共用同一模板与导航，页内不再放科目切换或页面标题（PWA 为首页三色同心环） |
| 离线安装 | PWA 可「添加到主屏幕」，Service Worker 预缓存外壳与词库，飞行模式照样背词 |

### 科学：生物 7/8 年级 + 化学 8 年级（三端）

启动 landing page 的四模块卡或模块悬浮导航球进入（iOS 为卡片入口），独立页面、独立记忆档案，不与法语词库混记。生物 / 化学与其他模块同模板：进页即对应科目，切换科目走悬浮导航球，页内不设学科切换块。三端共用 `Science.json` / `science.json`，由 `export_words.js` 从同一份数据导出。

| 模块 | 说明 |
| --- | --- |
| 知识点 | 生物 67 条（七年级 30 + 八年级 37，含 LC 衔接）+ 化学 35 条；生物可按「七年级 / 八年级」再按章节筛选，正反面切换中文 / 英文 |
| 双语内容 | 每条含中文术语、LC 英文术语、中文解释、LC 定义（英文）、关键词表 |
| LC 答题法 | 每条附 Leaving Certificate 表述提示：定义必踩关键词、过程用 bullet points、图表标注与因果链 |
| 公式 | 30 条：生物文字表达式 + 遗传图解，化学式 / 必背方程式（带状态符号）/ 计算公式；中英双版本 |
| 自测 | 四选一，术语互译 / 公式配对 × 英→中 / 中→英；答对推进记忆、答错缩短间隔 |
| 记忆 | 复用 `study.js` 的 1/2/4/7/15/30/60 天；键名 `science_memory_v1` / `science_plan_v1` / `science_stats_v1` |

**教材与考纲依据**：上海 2027 新教改（化学下放初二，沪教版八年级全一册四主题；生物沪教版 2024 五四学制七上细胞/植物、七下分类/多样性/生态、八上人体保障/调节、八下健康/遗传进化）；爱尔兰 Leaving Certificate 2027 新大纲（Nature of Science + 三条 strand，定义题占 15–20% 分、须覆盖全部关键词）。

**目录级校对已完成**（2026-11-28）：化学按沪科技版《八年级化学全一册》电子课本目录（含页码，4 主题 / 6 专题 / 各课题）校正了 `chapter`，元素符号 / 化学式 / 化合价归回「专题1 课题2 通用的化学语言」，补入遗漏的「专题5 课题3 结构多样的碳单质」；生物按沪教版五四学制 2024 七上（序章 + 1–5 章）/ 七下（6–11 章）/ 八上 / 八下目录校正到节，补入七年级 30 条（b38–b67），并保留八上/八下补入的「感觉器官」「性激素与青春期」「非传染病」三条。酸碱盐相关方程式（f21/f23/f24）已标注为教材外 LC 衔接预习。教材全文需付费，尚未逐页校对。

LC 衔接专题标注了上海八年级不单独教但 LC 必考的内容（酶、渗透、减数分裂、摩尔、滴定、气体定律等），在章名中标「LC」；细胞、光合作用、呼吸作用等已在七年级上册教材中系统出现。

三端差异只在实现方式：进度环小程序用 JS 逐帧缓动 / 首页用 conic-gradient 三色同心环、iOS 用 `Circle().trim` + `.animation`、PWA 用 SVG `stroke-dasharray` + CSS transition；发音小程序侧已整体移除（等 MP3 重新生成），iOS 用系统离线 TTS（`AVSpeechSynthesizer` fr-FR），PWA 用 Web Speech（`speechSynthesis` fr-FR），都不占包体。小程序悬浮球是模块导航（首页 + 四模块），iOS 悬浮球仍只翻面切词库，PWA 用 tab 与首页卡切换模块。

## 配色（三端统一）

主色取自 AppIcon 的绿渐变（`#22ac70 → #053a28`），三端各自用同一组令牌：

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `primary` | `#0f8a5a` | 主按钮、选中态、强调数字（白字对比 4.3:1） |
| `primarySoft` | `#22ac70` | 渐变亮端、进度环、二级强调 |
| `primaryDeep` | `#053a28` | 渐变暗端、标题文字渐变起点 |
| `chip` / `mint` | `#e4f1e9` | 胶囊、Tab 底、软按钮 |
| `bg` | `#f2f8f4` | 页面底色（薄荷白） |
| `ink` | `#10261d` | 正文（墨绿黑，替代原藏青 `#1f2740`） |
| `sub` | `#5e7368` | 次要文字（鼠尾草灰，替代原冷灰） |

iOS 见 `Design/Theme.swift` 与 `AccentColor.colorset`；小程序见 `app.wxss` 的 CSS 变量；PWA 见 `app.css` 的 `:root`。橙色（待复习）与红色（答错）语义色保持不变。

## 离线缓存设计（PWA）

`pwa/sw.js` 是唯一的离线入口，采用三层策略，原则是**壳与数据分开、用户状态永不进缓存**：

| 层 | 内容 | 策略 | 理由 |
| --- | --- | --- | --- |
| App Shell | `index.html` / `app.css` / `app.js` / `manifest` / 图标 | install 时全量预缓存 → cache-first | 冷启动零网络请求，飞行模式也能秒开 |
| 词库数据 | `data/words.json`（357KB） | 独立 `bella-data-<版本>` 缓存 → cache-first | 只读、随版本整体替换，无需校验过期 |
| 其它静态资源 | 后续新增的 css/js/图片 | stale-while-revalidate | 先给缓存再后台更新，不阻塞渲染 |

- **导航请求**（`mode === 'navigate'`）直接返回缓存的 `index.html`；缓存意外缺失时才回网络，仍失败则给一张极简「首次使用需联网」兜底页。
- **升级**：改动任何前端文件必须同步改 `sw.js` 的 `VERSION`。新 SW 装好进入 waiting → 页面底部浮出「发现新版本 · 点此更新」→ 用户点一下才 `skipWaiting` 并自动刷新，**不会在背单词途中被强制打断**。
- **清理**：`activate` 时删除所有非当前版本的 `bella-shell-* / bella-data-*` 缓存，其它应用的缓存不碰。
- **状态**：记忆档案、学习计划、自测分数只写 `localStorage`（键名与小程序/iOS 一致），更新 App Shell 不丢进度，离线写入同样安全；首次启动会请求 `navigator.storage.persist()` 降低被系统回收的概率。
- **断网提示**：`online/offline` 事件驱动底部提示条，明确告知「离线模式，已缓存内容可正常使用」。

## 词库数据

| 教材 | 单词 | 例句 | 其它 |
| --- | --- | --- | --- |
| 简明法语教程（修订版）上册 | 1141 | 1141（100%） | 39 动词 × 5 时态、30 课语法、212 动词现在时变位 |
| En Avant: Mon dossier | 613 | 613（100%） | 125 知识点、21 单元、24 条教材原句 |

数据源均为扫描版 PDF，经 OCR + 人工校对入库，提取过程记录在 `小程序项目档案.md`（其中音频相关章节已过期）。

## 目录结构

```
Valen-French/
├── miniprogram/                     微信小程序
│   ├── app.js / app.json / app.wxss
│   ├── project.config.json          独立打开本目录时用的工程配置
│   ├── audio/                       旧 MP3（已无引用，待重新生成后接回）
│   ├── sitemap.json
│   ├── pages/common/
│   │   └── float-nav.js/wxml/wxss   法语页 / 科学页共用的模块导航悬浮球
│   ├── pages/french/
│   │   ├── french.js/wxml/wxss/json 页面与交互（五 tab、模块导航球、圆环）
│   │   ├── study.js                 记忆曲线与学习计划（法语 + 科学共用）
│   │   ├── conjugation.js           现在时变位生成器
│   │   ├── data.js                  简明法语词库 / 动词 / 语法
│   │   └── enavant.js               En Avant 词库 / 知识点 / 单元
│   └── pages/science/
│       ├── science.js/wxml/wxss/json 科学页（三 tab：知识点 / 公式 / 自测）
│       ├── data-bio.js              生物 34 条（沪教版 2024 五四学制）
│       ├── data-chem.js             化学 35 条（沪教版八年级新教材）
│       └── data-formula.js          公式 30 条（表达式 / 方程式 / 计算式）
├── ios/                             iOS 原生（详见 ios/README.md）
│   ├── ValenFrench.xcodeproj/
│   ├── ValenFrench/{App,Models,Views,Design,Services,Resources}
│   ├── Tools/export_words.js        从小程序数据导出 Words.json + Science.json（iOS + PWA 双写）
│   └── Tools/make_appicon.py        生成 AppIcon 1024 与 PWA 全套图标
├── .github/workflows/ios-ipa.yml    云端 macOS 构建 unsigned ipa
├── pwa/                             可离线安装的 PWA（标准版零依赖、无构建）
│   ├── index.html / app.css / app.js  外壳、样式、五 tab 全部逻辑
│   ├── sw.js                        Service Worker：预缓存 + 版本升级 + 离线回退
│   ├── manifest.webmanifest         安装信息（standalone / 图标 / 主题色）
│   ├── data/words.json              与小程序的词库同源（导脚本产出）
│   ├── icons/                       192 / 512 / maskable / apple-touch
│   ├── build-single.js              esbuild 打包 → 单 HTML（仅构建时需要 npm）
│   └── dist/bella-french.html       单文件产物（491KB，全资源内联）
├── project.config.json              仓库根工程配置（miniprogramRoot）
└── 小程序项目档案.md                 教材提取过程与素材来源记录
```

## 记忆曲线与学习计划

两端算法一致，小程序实现见 `study.js`，iOS 见 `StudyEngine.swift`，PWA 见 `pwa/app.js` 的 `Engine`：

- 阶段间隔 `1 / 2 / 4 / 7 / 15 / 30 / 60` 天，走完第 7 阶段视为「已固化」。
- 每日新词默认 20，区间 10–30：自测正确率 ≥ 85% 加 5，< 60% 减 5，昨日完成率 < 50% 再减 5。
- 距上次打开 ≥ 3 天 → 强制热身自测 10 题，答完按正确率调整次日额度。
- 进度环 = 今日已背词数（`lastReview` 落在今天且属于当前词库）÷ 今日队列长度，封顶 100%。

持久化键名三端对齐：`french_memory_v2`（记忆档案）、`french_study_plan_v1`（学习计划）、`french_source_v1`（当前词库）、`french_verb_memory_v1`（变位记忆）、`french_asked_ids_v1` / `french_quiz_score_v1`（自测）。小程序与 iOS 落在各自的本地 KV，PWA 落在 `localStorage`——字段结构一致，将来做导入导出可以互认。

## 数据同源

iOS 与 PWA 的词库不是手抄的，由脚本从小程序数据模块无损导出：

```bash
node ios/Tools/export_words.js
# → ios/ValenFrench/Resources/Words.json（357KB）
# → pwa/data/words.json               （357KB）
```

导出内容：613 + 1141 词、39 动词五时态、212 组词卡变位、30 课语法、125 知识点 / 21 单元。**改词库、例句或变位后只需重跑这一条命令，iOS 端重新编译、PWA 端改一次 `sw.js` 的 `VERSION` 即可**，代码不用动（否则浏览器会继续吃旧缓存）。

图标同理：`python3 ios/Tools/make_appicon.py` 会同时刷新 iOS 的 `AppIcon-1024.png` 和 `pwa/icons/` 的四张图。

## 已知问题 / 待办

- [x] 小程序 `audio/` 里 1.2M MP3 无代码引用（发音逻辑整体移除），已移出项目，并在两份 `project.config.json` 的 `packOptions.ignore` 排除该目录；`miniprogram/` 由 1.7M 降到 608K，代码质量「图片和音频资源 >200K」项消除。
- [x] 小程序 `app.json` 开启 `lazyCodeLoading: requiredComponents`（代码质量「LazyCodeLoading」项）。
- [ ] iOS 端未在真机验证：本机无 Xcode（已通过 `plutil -lint`、`swiftc -parse`、JSON↔Decodable 字段校验与成员引用静态扫描）。编译交给 `.github/workflows/ios-ipa.yml` 在云端完成。
- [x] iOS AppIcon 已补：爱尔兰绿渐变 + 三叶草 + BELLA 字标，`ios/Tools/make_appicon.py` 可重新生成（现同时产出 PWA 全套图标）。
- [x] 三端主色统一为爱尔兰绿（`#0f8a5a` / `#22ac70` / `#053a28`），语义色（橙/红）保留。
- [x] PWA 已实现并离线自测：Node DOM 桩跑通五个 tab、记忆推进、强制自测；伪 `CacheStorage` + 断网验证预缓存、导航回退、词库离线读取与版本清理。
- [x] PWA 单文件版：esbuild 压缩 + 全资源内联，断网模拟下跑真实产物脚本，验证零 fetch / 零 SW / 五 tab 与记忆推进正常；标准 PWA 三套旧测试回归通过。
- [x] 科学三端同步：132 条数据（生物 67 / 化学 35 / 公式 30）、707 个 LC 关键词；同一份导出脚本写入 iOS `Science.json` 与 PWA `science.json`。Node 桩跑真实代码，验证三端翻卡、中英切换、七/八年级筛选、章节筛选、学科切换、记忆推进、公式卡与四选一自测。`export_words.js` 从小程序三个 data 文件导出，无需手改。
- [x] 教材目录级校对：化学按沪科技版八年级全一册目录（含页码）校正章节归属、补碳单质；生物按沪教版五四学制 2024 七上/七下/八上/八下目录校正到节，补七年级 30 条与八年级三条遗漏；酸碱盐方程式标注为教材外。
- [ ] 教材全文需付费，**尚未逐页校对**；LC 衔接专题按 2027 首考新大纲编写，表述细节建议对照 Curriculum Online 官方 specification 复核。
- [ ] iOS 科学模块未在真机编译验证（本机无 Xcode），已通过 `swiftc -parse` 与工程文件引用检查；注意 `ScienceView.swift` 的类型检查只能在云端构建时完成。
- [ ] PWA 未真机安装验证：Safari「添加到主屏幕」后的全屏与安全区表现、法国语音色是否已下载（未装法语语音包时 `speechSynthesis` 会静默失败）。
- [ ] PWA 需 HTTPS 上线：可挂到现有 Caddy 反代（如 `bella.valen-robotic.cn`）指向 `pwa/`，`localhost` 与 `127.0.0.1` 除外。
- [ ] 小程序尚未真机预览验证。
- [ ] En Avant 部分单元（U7/14/15/19/20/21）词汇库页排版不同，只提取到零散词条。
- [ ] 小程序发音待接回：倾向改系统 TTS（参考 iOS 的 `AVSpeechSynthesizer` 方案），可彻底摆脱音频文件与 2M 主包限制。

## License

Apache License 2.0，见 `LICENSE`。
