# BELLA 助手 · iOS 原生版

法语复习 App 的 SwiftUI 原生实现，与仓库内微信小程序（`miniprogram/`）、PWA（`pwa/`）功能对齐、数据同源。仓库总览（三端对照）见 [`../README.md`](../README.md)。

## 打开与运行

```bash
open ios/ValenFrench.xcodeproj
```

1. Xcode 选中 `ValenFrench` target → **Signing & Capabilities** → 勾选 Team（免费 Apple ID 即可）。
2. 需要时改 `PRODUCT_BUNDLE_IDENTIFIER`（默认 `cn.valenrobotic.bellafrench`）。
3. 选择 iPhone 模拟器或真机 → ⌘R。

**环境要求**：Xcode 15 及以上、iOS 16.0 及以上。工程为手写 `project.pbxproj`（objectVersion 56），未包含 `xcuserdata`，首次打开由 Xcode 自行生成。

## 功能对照

| 模块 | 小程序 | iOS |
| --- | --- | --- |
| 顶部导航 | 5 个 pill tab | 同款胶囊导航（加大版：高 46pt、圆角 20） |
| 单词卡 | 翻面卡 + 内嵌变位表 + 例句 | 3D 翻面（`rotation3DEffect`）+ 变位表 + 例句 |
| 课次背诵 | 第 1–30 课 chip + 词数 | 同款两行 chip（课次 / 词数） |
| 自测 | 四选一、法↔中交替 | 同款，且修正了「答错推进干扰词记忆」的问题 |
| 变位表 | 39 动词 × 5 时态，遮挡自测 | 同款，逐格点击揭示 |
| 复习计划 | 待复习/学习中/新词分组、动态额度 | 同款 + 进度条 |
| 知识点 | En Avant 按单元 / 简明法语按 A1·A2 | 同款 |
| 进度环 | 右上角悬浮球，可拖动、翻转切词库 | 同款，改用 `Circle().trim` 原生动画填充 |
| 强制自测 | 间隔 ≥ 3 天，10 题热身 | 同款，sheet 弹层锁定 tab |
| 科学（生物 7/8、化学 8） | 独立科学页（知识点 / 公式 / 自测） | `ScienceView` sheet 呈现，生物可按七/八年级 + 章节筛选，双语翻卡与 LC 关键词 |
| 发音 | 已移除（曾用 MP3） | **系统离线 TTS**（`AVSpeechSynthesizer` fr-FR），无需音频文件 |

## 目录结构

```
ios/
├── ValenFrench.xcodeproj/project.pbxproj   手写工程文件
├── ValenFrench/
│   ├── App/            ValenFrenchApp / RootView（含顶部导航）/ AppStore（状态机）
│   ├── Models/         Models（Word/MemoryRecord/StudyPlan/Verb…）
│   │                   StudyEngine（study.js 的 Swift 移植）
│   │                   WordBank（Words.json 解码与聚合）
│   │                   ScienceBank / ScienceStore（Science.json 解码与科学页状态）
│   ├── Services/       SpeechService（fr-FR TTS）
│   ├── Design/         Theme（色板、卡片、按钮、Toast）
│   ├── Views/          Card / Quiz / Verb / Plan / Points / Science / FloatingRing / ForceQuiz
│   ├── Resources/      Words.json（357KB）+ Science.json（102KB，生物/化学/公式）
│   ├── Assets.xcassets AppIcon（1024，由 Tools/make_appicon.py 生成）
│   └── Info.plist      CFBundleDisplayName = BELLA 助手
├── Design/             设计稿导出（appicon-preview.png）
├── Tools/export_words.js                   导出 Words.json + Science.json（同时写入 pwa/data/）
└── Tools/make_appicon.py                   生成 AppIcon 与 PWA 图标（爱尔兰三叶草 + BELLA 字标）
```

## 数据流

`miniprogram/pages/french/*.js` →（`node ios/Tools/export_words.js`）→ `Words.json` + `pwa/data/words.json` → `WordBank` → `AppStore`；
`miniprogram/pages/science/*.js` → 同一脚本 → `Science.json` + `pwa/data/science.json` → `ScienceBank` → `ScienceStore` → `ScienceView`。

改了词库、例句、变位或科学知识点后，只需重跑导出脚本，iOS 端不用改代码：

```bash
node ios/Tools/export_words.js
```

## App 图标

图标由 `ios/Tools/make_appicon.py` 用代码绘制（Pillow + numpy，4× 超采样后缩放），不依赖任何外部素材：

```bash
python3 ios/Tools/make_appicon.py --preview
# → ValenFrench/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png
# → Design/appicon-preview.png（圆角预览，模拟主屏效果）
# → pwa/icons/{icon-192,icon-512,icon-maskable-512,apple-touch-icon-180}.png
```

设计：爱尔兰绿渐变底（`#22AC70` → `#053A28`）+ 白色三叶草 + Avenir Next Heavy 的 `BELLA` 字标。三叶草三片叶由心形参数方程生成（叶尖汇于中心、叶缘外翻成缺口），叶宽/间隙/茎宽集中在脚本顶部 `SHAMROCK` 常量；底色改 `GREEN_TOP` / `GREEN_BOTTOM` 即可。输出 1024×1024 RGB 无 alpha，符合 App Store 要求。

## 记忆曲线（与 study.js 一致）

- 阶段间隔 `1 / 2 / 4 / 7 / 15 / 30 / 60` 天，到达第 7 阶段视为「已固化」。
- 每日新词默认 20，动态区间 10–30：自测正确率 ≥ 85% 加 5，< 60% 减 5，昨日完成率 < 50% 再减 5。
- 间隔 ≥ 3 天打开 → 强制热身自测 10 题，答完按正确率调整次日额度。
- 进度环 = 今日已背词数（按 `lastReview` 落在今天、且属于当前词库）÷ 今日队列长度，封顶 100%。

## 配色

`Design/Theme.swift` 统一色板，主色取自图标渐变：`primary #0F8A5A`、`primarySoft #22AC70`、`primaryDeep #053A28`，底色 `#F2F8F4`，正文墨绿黑 `#10261D`。`AccentColor.colorset` 同步为 `#0F8A5A`，与小程序 `app.wxss`、PWA `app.css` 的变量保持一致。

## 真机安装（无本机 Xcode 的做法）

本机只有 Command Line Tools（没有 Xcode，磁盘也放不下），所以编译与签名拆成两段：**GitHub 的 macOS runner 负责编译，本机只做签名和推包**。

```
git tag -f ios-v0.1.2 && git push -f origin ios-v0.1.2   # 触发 .github/workflows/ios-ipa.yml
./ios/Tools/install_iphone.sh                            # 取最新 ipa → xtool 签名 → 装到 iPhone
```

| 环节 | 谁做 | 说明 |
| --- | --- | --- |
| 编译 | GitHub Actions `macos-15`（Xcode 16.4） | `xcodebuild -target ValenFrench -sdk iphoneos CODE_SIGNING_ALLOWED=NO`，产物是**未签名** ipa |
| 分发 | Release 附件 | workflow 用 `if: always()` 把 `ValenFrench-unsigned.ipa` 和 `xcodebuild.log` 挂到 Release，公开仓库可匿名下载，本机不需要 token。**构建失败也能拿到日志** |
| 签名安装 | 本机 [xtool](https://github.com/xtool-org/xtool) 1.24.0 | `xtool install` 解包 → 配对握手 → Developer Services 自动注册设备/证书/App ID → 就地签名 → 重打包 → AFC 上传安装 |

首次准备：

```bash
# xtool 官方 macOS 发布包，Apple 公证签名
curl -L -o /tmp/xtool.app.zip https://github.com/xtool-org/xtool/releases/download/1.24.0/xtool.app.zip
unzip -q /tmp/xtool.app.zip -d /tmp && cp -R /tmp/xtool.app /Applications/
ln -fs /Applications/xtool.app/Contents/Resources/bin/xtool ~/.local/bin/xtool
xtool auth login      # Apple ID + 密码 + 双重认证码，交互式，凭证存本机
```

几条实测事实：

- **bundle ID 会被改写**。免费账号的 App ID 必须全局唯一，xtool 会注册成 `XTL-<TeamID>.cn.valenrobotic.bellafrench`，装到设备上的 `CFBundleIdentifier` 也是这个。`xtool launch` 用它才找得到，用原 ID 会报 `Could not find an installed app`。
- **首次打开要先信任开发者**：设置 → 通用 → VPN 与设备管理 → 信任 `jibin.zou@gmail.com`。
- **签名 7 天过期**，重跑 `install_iphone.sh` 即可续期（同一份 ipa，不需要重新编译）。
- **`xtool launch` 会失败**（`DebugserverClient.Error.unknown`）：本机没有 Developer Disk Image，`DDIMounter` 在 xtool 里是 `#if false` 的死代码。装完从桌面图标启动，不要用命令行启动。
- 工程文件的 `Resources` 阶段必须引用 `PBXBuildFile`（`003F`），不能直接塞 `PBXFileReference`；塞错会让 xcodebuild 直接报「project is damaged」并以 `-[PBXFileReference buildPhase]: unrecognized selector` 崩溃。

