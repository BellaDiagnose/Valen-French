# BELLA 助手 · 法语复习

给女儿做的法语复习 App：两本教材、双词库、艾宾浩斯间隔重复。**同一套词库与学习算法，两套实现并行**——微信小程序与 iOS 原生（SwiftUI）。

| 平台 | 位置 | 技术栈 | 状态 |
| --- | --- | --- | --- |
| 微信小程序 | `miniprogram/` | WXML / WXSS / 原生 JS，纯本地存储 | 已可用，未真机预览 |
| iOS 原生 | `ios/` | SwiftUI，iOS 16+，UserDefaults 持久化 | 工程完整，未编译验证 |

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
| 进度环 | 右上角可拖动悬浮球，点击翻面切词库；今日进度圆环缓动填充 |

两端差异只在实现方式：进度环小程序用 JS 逐帧缓动、iOS 用 `Circle().trim` + `.animation`；发音小程序侧已整体移除（等 MP3 重新生成），iOS 侧用系统离线 TTS（`AVSpeechSynthesizer` fr-FR），不占包体。

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
│   └── pages/french/
│       ├── french.js/wxml/wxss/json 页面与交互（五 tab、悬浮球、圆环）
│       ├── study.js                 记忆曲线与学习计划（可独立测试）
│       ├── conjugation.js           现在时变位生成器
│       ├── data.js                  简明法语词库 / 动词 / 语法
│       └── enavant.js               En Avant 词库 / 知识点 / 单元
├── ios/                             iOS 原生（详见 ios/README.md）
│   ├── ValenFrench.xcodeproj/
│   ├── ValenFrench/{App,Models,Views,Design,Services,Resources}
│   └── Tools/export_words.js        从小程序数据导出 Words.json
├── project.config.json              仓库根工程配置（miniprogramRoot）
└── 小程序项目档案.md                 教材提取过程与素材来源记录
```

## 记忆曲线与学习计划

两端算法一致，小程序实现见 `study.js`，iOS 见 `StudyEngine.swift`：

- 阶段间隔 `1 / 2 / 4 / 7 / 15 / 30 / 60` 天，走完第 7 阶段视为「已固化」。
- 每日新词默认 20，区间 10–30：自测正确率 ≥ 85% 加 5，< 60% 减 5，昨日完成率 < 50% 再减 5。
- 距上次打开 ≥ 3 天 → 强制热身自测 10 题，答完按正确率调整次日额度。
- 进度环 = 今日已背词数（`lastReview` 落在今天且属于当前词库）÷ 今日队列长度，封顶 100%。

持久化键名两端对齐：`french_memory_v2`（记忆档案）、`french_study_plan_v1`（学习计划）、`french_source_v1`（当前词库）。

## 数据同源

iOS 的词库不是手抄的，由脚本从小程序数据模块无损导出：

```bash
node ios/Tools/export_words.js
# → ios/ValenFrench/Resources/Words.json（357KB）
```

导出内容：613 + 1141 词、39 动词五时态、212 组词卡变位、30 课语法、125 知识点 / 21 单元。**改词库、例句或变位后只需重跑这一条命令，iOS 端无需改代码**，重新编译即可。

## 已知问题 / 待办

- [ ] 小程序 `audio/` 里 1.2M MP3 已无代码引用（发音逻辑整体移除），仍占主包体积；待 MP3 重新生成后接回，或删除。
- [ ] iOS 端未做过真机编译：本机只有 Command Line Tools、无 Xcode。已通过 `plutil -lint`、`swiftc -parse`、JSON↔Decodable 字段校验与成员引用静态扫描。
- [ ] iOS AppIcon 为空占位，需要补 1024×1024 图标。
- [ ] 小程序尚未真机预览验证。
- [ ] En Avant 部分单元（U7/14/15/19/20/21）词汇库页排版不同，只提取到零散词条。
- [ ] 小程序发音待接回：倾向改系统 TTS（参考 iOS 的 `AVSpeechSynthesizer` 方案），可彻底摆脱音频文件与 2M 主包限制。

## License

Apache License 2.0，见 `LICENSE`。
