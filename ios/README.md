# BELLA 助手 · iOS 原生版

法语复习 App 的 SwiftUI 原生实现，与仓库内微信小程序（`miniprogram/`）功能对齐、数据同源。仓库总览（两端对照）见 [`../README.md`](../README.md)。

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
│   ├── Services/       SpeechService（fr-FR TTS）
│   ├── Design/         Theme（色板、卡片、按钮、Toast）
│   ├── Views/          Card / Quiz / Verb / Plan / Points / FloatingRing / ForceQuiz
│   ├── Resources/      Words.json（357KB，全部词库与知识点）
│   ├── Assets.xcassets
│   └── Info.plist      CFBundleDisplayName = BELLA 助手
└── Tools/export_words.js                   从小程序数据生成 Words.json
```

## 数据流

`miniprogram/pages/french/*.js` →（`node ios/Tools/export_words.js`）→ `ValenFrench/Resources/Words.json` → `WordBank` 解码 → `AppStore`。

改了词库、例句或变位后，只需重跑导出脚本，iOS 端不用改代码：

```bash
node ios/Tools/export_words.js
```

## 记忆曲线（与 study.js 一致）

- 阶段间隔 `1 / 2 / 4 / 7 / 15 / 30 / 60` 天，到达第 7 阶段视为「已固化」。
- 每日新词默认 20，动态区间 10–30：自测正确率 ≥ 85% 加 5，< 60% 减 5，昨日完成率 < 50% 再减 5。
- 间隔 ≥ 3 天打开 → 强制热身自测 10 题，答完按正确率调整次日额度。
- 进度环 = 今日已背词数（按 `lastReview` 落在今天、且属于当前词库）÷ 今日队列长度，封顶 100%。

## 说明

本机仅有 Command Line Tools、没有安装 Xcode，因此工程已通过 `plutil -lint`、`swiftc -parse` 语法校验与 JSON 结构校验，但**未做过真机编译**。首次在 Xcode 打开若报错，优先检查 Signing Team 与 `Info.plist` 路径。
