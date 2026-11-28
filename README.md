# BELLA 助手 · 法语复习 + 七/八年级生物 + 八年级化学

给女儿做的复习 App：法语两本教材、双词库、艾宾浩斯间隔重复；**另含初二生物 / 化学双语知识点与公式**（上海新教材 × 爱尔兰 Leaving Certificate）。**同一套学习算法与爱尔兰绿配色，两套实现并行**——微信小程序、iOS 原生（SwiftUI）。

| 平台 | 位置 | 技术栈 | 状态 |
| --- | --- | --- | --- |
| 微信小程序 | `miniprogram/` | WXML / WXSS / 原生 JS，纯本地存储；法语 + 科学（生物 7/8、化学 8） | 已可用，未真机预览 |
| iOS 原生 | `ios/` | SwiftUI，iOS 16+，UserDefaults 持久化；法语 + 科学（生物 7/8、化学 8） | 已编译并侧载到真机运行 |

> 科学模块在**两端均已实现**：生物覆盖七、八年级，化学为八年级。数据由同一份 `miniprogram/pages/science/*.js` 导出到 iOS `Science.json`，两端记忆档案互相隔离（键名 `science_*`）。

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
2. 跑完在 artifact 或 Release 附件里拿到 `ValenFrench-unsigned.ipa`（约 1.5 分钟）。
3. 用仓库自带的 `./ios/Tools/install_iphone.sh`（xtool 签名 + 安装）或 **iloader / SideStore / Sideloadly** 以你自己的 Apple ID 签名后装进 iPhone。

产物是**未签名** ipa，构建过程不需要任何 Apple 证书；签名与安装都在本机侧载工具里完成。公开仓库的 macOS runner 免费且不计量分钟数（私有仓库按 Linux 的 10 倍计费，免费额度折合约 200 分钟/月）。完整链路（xtool 登录、bundle ID 改写、7 天续期）见 [`ios/README.md`](ios/README.md)。

家用侧载的固有限制（免费 Apple ID）：签名 **7 天过期**、同时最多 **3 个**侧载应用、iOS 16+ 需在「设置 → 隐私与安全性 → 开发者模式」打开开关。到期重跑一次 `install_iphone.sh` 即可续期，不必重新编译。

## 功能

| 模块 | 说明 |
| --- | --- |
| 单词卡 | 3D 翻面卡；背面内嵌**现在时变位表** + 法语例句 + 中文译文 |
| 按课背诵 | 第 1–30 课课次条，每个 chip 两行显示课次与词数 |
| 自测 · 四选一 | 法↔中交替出题；答后绿/红反馈并给出例句 |
| 自测 · 默写 | 看中文自己写法语原形，不带选项。提示只给骨架（首字母 + 词数 + 字母数）。判分三档：写对 / 差一点（重音、连字符、冠词差别，算对但要重写）/ 写错；变体写法通吃（ton/ta/tes、cadeau(x)、animal (animaux)、ami, e）。可「不会，看答案」，同样推进 1/2/4/7 记忆曲线 |
| 变位表 | 39 个动词 × 5 时态（现在 / 未完成过去 / 复合过去 / 简单将来 / 过去将来），遮挡点击揭示 |
| 复习计划 | 待复习 / 学习中 / 新词分组，动态每日额度；顶部统计卡与主按钮固定在最上层，不被遮挡 |
| 知识点 | En Avant 按单元（125 条 / 21 单元）；简明法语按 A1·A2（30 课） |
| 每日计划 | 默认 20 词，10–30 动态调节；间隔 ≥ 3 天打开强制 10 题热身 |
| 进度环 / 导航 | 顶栏右侧进度环（与左侧灰色圆形 home 按钮同一行）：环内显示当前模块数值（法语=连续天数 / 科学=今日已背），点击展开科目下拉（EA / CF / CH / BI），当前项描边加勾，点按即换页；「首页 / 化学 / 生物 / 两本法语书」是平行页面，页内不再放学科切换块 |

### 科学：生物 7/8 年级 + 化学 8 年级（两端）

由 landing page 的四模块卡进入，独立页面、独立记忆档案，不与法语词库混记。进页即对应科目，切换科目走顶栏圆环的下拉，页内不设学科切换块。两端共用同一份数据，由 `export_words.js` 从小程序数据模块导出到 iOS `Science.json`。

| 模块 | 说明 |
| --- | --- |
| 每日背诵 | 知识点栏就是「今天该背的卡」：今日到期（按到期先后）+ 当日额度内的新卡，背完即离场、次日按间隔重排。卡头显示「今日 N / 总量 · 到期 · 新卡」与进度条；评过分自动翻下一张，卡组清空给完成态。新卡队列当天定一次（`plan.newQueues`，按科目分开），背掉不补位，避免一天无限刷 |
| 章节切换 | 卡组头上方一排横向 chip：`全部章节` + 各章短名（`第13章` / `主题一` / `LC`）+ 该章条数，样式与法语课次条同款。选中后卡组、今日进度、顶栏圆环全部按本章重算，卡头标题显示完整章节名；选章等于退出计划队列，回「全部章节」恢复整科 |
| 卡面内容 | 生物 67 条（七年级 30 + 八年级 37，含 LC 衔接）+ 化学 35 条；卡面直接可读中文术语 + 英文术语 + 同语言定义 + 关键词条数，翻面看另一语言定义、LC 关键词与答题方法，两端一致 |
| 双语内容 | 每条含中文术语、LC 英文术语、中文解释、LC 定义（英文）、关键词表 |
| LC 答题法 | 每条附 Leaving Certificate 表述提示：定义必踩关键词、过程用 bullet points、图表标注与因果链 |
| 公式 | 30 条：生物文字表达式 + 遗传图解，化学式 / 必背方程式（带状态符号）/ 计算公式；中英双版本。长方程式按箭头断成「反应物 →」/「生成物」两行，系数与化学式（6O₂）不会被拆开，也不会出现行首孤立的 + 或 → |
| 自测 · 四选一 | 术语互译 / 公式配对 × 英→中 / 中→英；答对推进记忆、答错缩短间隔 |
| 自测 · 默写 | 术语：看中文写 LC 英文术语（the / a 可省，大小写不限）；公式：看中文名与文字表达式写化学式/方程式，下标直接打普通数字、→ 可写 = 或 ->。提示按题型给「首字母 + 词数 + 字母数」或「箭头左右各几个物质」。文字型条目（如「沿浓度梯度：高浓度 → 低浓度」）不进默写池 |
| 复习计划 | 按当前科目统计「今日待复习 / 学习中 / 新卡片 / 已固化」四卡；主按钮「开始今日背诵」直接回到每日卡组，公式待复习另给入口（公式不进入每日卡组，仍按单元翻阅）；四组清单点任意一条即从该条成队背起、评完自动出队，顶部「复习/浏览 · N 条 ✕」可随时退回今日卡组 |
| 记忆 | 复用 `study.js` 的 1/2/4/7/15/30/60 天；键名 `science_memory_v1` / `science_plan_v1` / `science_stats_v1` |

**教材与考纲依据**：上海 2027 新教改（化学下放初二，沪教版八年级全一册四主题；生物沪教版 2024 五四学制七上细胞/植物、七下分类/多样性/生态、八上人体保障/调节、八下健康/遗传进化）；爱尔兰 Leaving Certificate 2027 新大纲（Nature of Science + 三条 strand，定义题占 15–20% 分、须覆盖全部关键词）。

**目录级校对已完成**（2026-11-28）：化学按沪科技版《八年级化学全一册》电子课本目录（含页码，4 主题 / 6 专题 / 各课题）校正了 `chapter`，元素符号 / 化学式 / 化合价归回「专题1 课题2 通用的化学语言」，补入遗漏的「专题5 课题3 结构多样的碳单质」；生物按沪教版五四学制 2024 七上（序章 + 1–5 章）/ 七下（6–11 章）/ 八上 / 八下目录校正到节，补入七年级 30 条（b38–b67），并保留八上/八下补入的「感觉器官」「性激素与青春期」「非传染病」三条。酸碱盐相关方程式（f21/f23/f24）已标注为教材外 LC 衔接预习。教材全文需付费，尚未逐页校对。

LC 衔接专题标注了上海八年级不单独教但 LC 必考的内容（酶、渗透、减数分裂、摩尔、滴定、气体定律等），在章名中标「LC」；细胞、光合作用、呼吸作用等已在七年级上册教材中系统出现。

两端差异只在实现方式：顶栏圆环小程序用 `conic-gradient`、iOS 用 `Circle().trim` + `.animation`；首页三色同心环小程序用 `conic-gradient`、iOS 用三层 `Circle().trim`。发音小程序侧已整体移除（等 MP3 重新生成），iOS 用系统离线 TTS（`AVSpeechSynthesizer` fr-FR），不占包体。

## 配色（两端统一）

主色取自 AppIcon 的绿渐变（`#22ac70 → #053a28`），两端各自用同一组令牌：

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `primary` | `#0f8a5a` | 主按钮、选中态、强调数字（白字对比 4.3:1） |
| `primarySoft` | `#22ac70` | 渐变亮端、进度环、二级强调 |
| `primaryDeep` | `#053a28` | 渐变暗端、标题文字渐变起点 |
| `chip` / `mint` | `#e4f1e9` | 胶囊、Tab 底、软按钮 |
| `bg` | `#f2f8f4` | 页面底色（薄荷白） |
| `ink` | `#10261d` | 正文（墨绿黑，替代原藏青 `#1f2740`） |
| `sub` | `#5e7368` | 次要文字（鼠尾草灰，替代原冷灰） |

iOS 见 `Design/Theme.swift` 与 `AccentColor.colorset`；小程序见 `app.wxss` 的 CSS 变量。橙色（待复习）与红色（答错）语义色保持不变。

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
│   │   ├── nav-bar.js/wxml/wxss     自定义顶栏：home 圆钮 + 标题/科目 + 进度环下拉
│   │   ├── recall.js/wxml/wxss      默写题判分、提示骨架与题面模板
│   │   └── equation.js              公式排版（按箭头 / 等号断行，运算符不拆）
│   ├── pages/french/
│   │   ├── french.js/wxml/wxss/json 页面与交互（五 tab、课次 chip、顶栏圆环）
│   │   ├── study.js                 记忆曲线与学习计划（法语 + 科学共用）
│   │   ├── conjugation.js           现在时变位生成器
│   │   ├── data.js                  简明法语词库 / 动词 / 语法
│   │   └── enavant.js               En Avant 词库 / 知识点 / 单元
│   └── pages/science/
│       ├── science.js/wxml/wxss/json 科学页（四 tab：每日背诵 / 公式 / 自测 / 复习计划）
│       ├── data-bio.js              生物 67 条（沪教版 2024 五四学制）
│       ├── data-chem.js             化学 35 条（沪教版八年级新教材）
│       └── data-formula.js          公式 30 条（表达式 / 方程式 / 计算式）
├── ios/                             iOS 原生（详见 ios/README.md）
│   ├── ValenFrench.xcodeproj/
│   ├── ValenFrench/{App,Models,Views,Design,Services,Resources}
│   ├── Tools/export_words.js        从小程序数据导出 Words.json + Science.json
│   ├── Tools/make_appicon.py        生成 AppIcon 1024 与主屏预览图
│   └── Tools/install_iphone.sh      取最新 ipa → xtool 签名 → 装到 iPhone（7 天续期也用它）
├── .github/workflows/ios-ipa.yml    云端 macOS 构建 unsigned ipa
├── project.config.json              仓库根工程配置（miniprogramRoot）
└── 小程序项目档案.md                 教材提取过程与素材来源记录
```

## 记忆曲线与学习计划

两端算法一致，小程序实现见 `study.js`，iOS 见 `StudyEngine.swift`：

- 阶段间隔 `1 / 2 / 4 / 7 / 15 / 30 / 60` 天，走完第 7 阶段视为「已固化」。
- 每日新词默认 20，区间 10–30：自测正确率 ≥ 85% 加 5，< 60% 减 5，昨日完成率 < 50% 再减 5。
- 距上次打开 ≥ 3 天 → 强制热身自测 10 题，答完按正确率调整次日额度。
- 进度环 = 今日已背词数（`lastReview` 落在今天且属于当前词库）÷ 今日队列长度，封顶 100%。

持久化键名两端对齐：`french_memory_v2`（记忆档案）、`french_study_plan_v1`（学习计划）、`french_source_v1`（当前词库）、`french_verb_memory_v1`（变位记忆）、`french_asked_ids_v1` / `french_quiz_score_v1`（自测）、`science_memory_v1` / `science_plan_v1` / `science_stats_v1`（科学）。小程序落 `wx.setStorageSync`，iOS 落 `UserDefaults`——字段结构一致，将来做导入导出可以互认。

## 数据同源

iOS 的词库不是手抄的，由脚本从小程序数据模块无损导出：

```bash
node ios/Tools/export_words.js
# → ios/ValenFrench/Resources/Words.json（357KB）
# → ios/ValenFrench/Resources/Science.json（102KB）
```

导出内容：613 + 1141 词、39 动词五时态、212 组词卡变位、30 课语法、125 知识点 / 21 单元；科学 132 条（生物 67 / 化学 35 / 公式 30）。**改词库、例句或变位后只需重跑这一条命令，再重新编译 iOS 即可**，代码不用动。

图标同理：`python3 ios/Tools/make_appicon.py` 刷新 `AppIcon-1024.png`。

## 已知问题 / 待办

- [x] 小程序 `audio/` 里 1.2M MP3 无代码引用（发音逻辑整体移除），已移出项目，并在两份 `project.config.json` 的 `packOptions.ignore` 排除该目录；`miniprogram/` 由 1.7M 降到 608K，代码质量「图片和音频资源 >200K」项消除。
- [x] 小程序 `app.json` 开启 `lazyCodeLoading: requiredComponents`（代码质量「LazyCodeLoading」项）。
- [x] iOS 已在真机跑起来：GitHub Actions 编译 unsigned ipa → 本机 xtool 签名安装，首页 / 法语 / 化学 / 生物四页可正常进入。本机无 Xcode，类型检查只能靠云端构建。
- [x] iOS AppIcon：爱尔兰绿渐变 + 三叶草 + BELLA 字标，`ios/Tools/make_appicon.py` 可重新生成。
- [x] 两端主色统一为爱尔兰绿（`#0f8a5a` / `#22ac70` / `#053a28`），语义色（橙/红）保留。
- [x] 科学两端同步：132 条数据（生物 67 / 化学 35 / 公式 30）、707 个 LC 关键词；同一份导出脚本写 iOS `Science.json`，`export_words.js` 从小程序三个 data 文件导出，无需手改。
- [x] 科学两端都是四 tab（每日背诵 / 公式 / 自测 / 复习计划）：到期的按到期先后排进卡组、新卡按当日额度发一次，评完离场并自动翻下一张；计划页四卡统计、主按钮回卡组、公式待复习单独入口、清单点条目成队；每日背诵均带章节 chip。
- [x] 教材目录级校对：化学按沪科技版八年级全一册目录（含页码）校正章节归属、补碳单质；生物按沪教版五四学制 2024 七上/七下/八上/八下目录校正到节，补七年级 30 条与八年级三条遗漏；酸碱盐方程式标注为教材外。
- [ ] 教材全文需付费，**尚未逐页校对**；LC 衔接专题按 2027 首考新大纲编写，表述细节建议对照 Curriculum Online 官方 specification 复核。
- [ ] 小程序尚未真机预览验证（当前靠开发者工具模拟器）。
- [ ] En Avant 部分单元（U7/14/15/19/20/21）词汇库页排版不同，只提取到零散词条。
- [ ] 小程序发音待接回：倾向改系统 TTS（参考 iOS 的 `AVSpeechSynthesizer` 方案），可彻底摆脱音频文件与 2M 主包限制。

## License

Apache License 2.0，见 `LICENSE`。
