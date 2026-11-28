import SwiftUI

// MARK: - 首页快照
// 与小程序 pages/home/home.js 同一口径：
// 已学 = 有记忆记录；固化 = 走完 7 阶段；待复习 = 未固化且已到期。

struct HomeModule: Identifiable {
    let id: String
    let mark: String
    let name: String
    let sub: String
    let accent: Color
    let tint: Color
    let studied: Int
    let total: Int
    let graduated: Int
    let due: Int

    var percent: Int {
        total > 0 ? Int((Double(studied) / Double(total) * 100).rounded()) : 0
    }

    var isScience: Bool { id == "chem" || id == "bio" }
}

struct HomeRing: Identifiable {
    let id: String
    let label: String
    let value: String
    let tone: Int
    let color: Color
}

struct HomeSnapshot {
    var modules: [HomeModule] = []
    var rings: [HomeRing] = []
    var due = 0
    var done = 0
    var target = 0
    var streak = 1
    var totalStudied = 0
    var studiedTotal = 0
    var graduatedTotal = 0
    var todayPercent = 0
    var source: WordSource = .enavant

    static func load() -> HomeSnapshot {
        let frenchMemory = memory("french_memory_v2")
        let scienceMemory = memory("science_memory_v1")
        let plan = storedPlan()
        let source = WordSource(rawValue: UserDefaults.standard.string(forKey: "french_source_v1") ?? "")
            ?? .enavant

        let bank = WordBank.shared
        let sci = ScienceBank.shared

        var modules: [HomeModule] = []

        for src in WordSource.allCases {
            let ids = bank.words(for: src).map(\.id)
            let tally = tally(ids, frenchMemory)
            modules.append(HomeModule(id: src.rawValue,
                                      mark: src == .enavant ? "EA" : "CF",
                                      name: src.label,
                                      sub: "法语 · \(ids.count) 词",
                                      accent: src == .enavant ? Color(hex: 0x0F8A5A) : Color(hex: 0x128A80),
                                      tint: src == .enavant ? Color(hex: 0xE4F1E9) : Color(hex: 0xE5F5F1),
                                      studied: tally.studied,
                                      total: ids.count,
                                      graduated: tally.graduated,
                                      due: tally.due))
        }

        for subject in [ScienceStore.Subject.chem, .bio] {
            let points = sci.points(for: subject)
            let formulas = sci.formulas(for: subject)
            let ids = points.map(\.id) + formulas.map { "f" + $0.id }
            let tally = tally(ids, scienceMemory)
            let g7 = points.filter { $0.book.hasPrefix("七") }.count
            let sub = subject == .bio
                ? "七+八年级 · \(g7)+\(points.count - g7) 知识点 / \(formulas.count) 公式"
                : "八年级 · \(points.count) 知识点 / \(formulas.count) 公式"
            modules.append(HomeModule(id: subject.rawValue,
                                      mark: subject == .bio ? "BI" : "CH",
                                      name: subject.label,
                                      sub: sub,
                                      accent: subject == .bio ? Color(hex: 0x3E7F9E) : Color(hex: 0xB8783C),
                                      tint: subject == .bio ? Color(hex: 0xE8F2F7) : Color(hex: 0xFBF0E5),
                                      studied: tally.studied,
                                      total: ids.count,
                                      graduated: tally.graduated,
                                      due: tally.due))
        }

        let target = plan?.queue.count ?? 0
        let done = min(target, studiedToday(frenchMemory, prefix: source.gidPrefix))
        let due = modules.reduce(0) { $0 + $1.due }
        let studiedTotal = modules.reduce(0) { $0 + $1.studied }
        let graduatedTotal = modules.reduce(0) { $0 + $1.graduated }

        let todayPercent = target > 0 ? Int((Double(done) / Double(target) * 100).rounded()) : 100
        let memoryPercent = studiedTotal > 0
            ? Int((Double(studiedTotal - due) / Double(studiedTotal) * 100).rounded())
            : 0
        let solidPercent = studiedTotal > 0
            ? Int((Double(graduatedTotal) / Double(studiedTotal) * 100).rounded())
            : 0

        return HomeSnapshot(
            modules: modules,
            rings: [
                HomeRing(id: "today", label: "今日新词", value: "\(done)/\(target)",
                         tone: todayPercent, color: Color(hex: 0x0F8A5A)),
                HomeRing(id: "memory", label: "记忆状态", value: "\(studiedTotal - due)/\(studiedTotal)",
                         tone: memoryPercent, color: Color(hex: 0xD6A13C)),
                HomeRing(id: "solid", label: "长期固化", value: "\(graduatedTotal)/\(studiedTotal)",
                         tone: solidPercent, color: Color(hex: 0x3E7F9E))
            ],
            due: due,
            done: done,
            target: target,
            streak: plan?.streak ?? 1,
            totalStudied: plan?.totalStudied ?? 0,
            studiedTotal: studiedTotal,
            graduatedTotal: graduatedTotal,
            todayPercent: todayPercent,
            source: source
        )
    }

    // MARK: 工具

    private static func tally(_ ids: [String],
                              _ memory: [String: MemoryRecord]) -> (studied: Int, graduated: Int, due: Int) {
        let now = Date().timeIntervalSince1970
        var studied = 0
        var graduated = 0
        var due = 0
        for id in ids {
            guard let record = memory[id] else { continue }
            studied += 1
            if record.isGraduated {
                graduated += 1
            } else if record.dueAt <= now {
                due += 1
            }
        }
        return (studied, graduated, due)
    }

    private static func studiedToday(_ memory: [String: MemoryRecord], prefix: String) -> Int {
        let start = StudyEngine.startOfToday()
        return memory.reduce(into: 0) { total, item in
            if item.key.hasPrefix(prefix), item.value.lastReview >= start { total += 1 }
        }
    }

    private static func memory(_ key: String) -> [String: MemoryRecord] {
        guard let data = UserDefaults.standard.data(forKey: key),
              let value = try? JSONDecoder().decode([String: MemoryRecord].self, from: data) else {
            return [:]
        }
        return value
    }

    private static func storedPlan() -> StudyPlan? {
        guard let data = UserDefaults.standard.data(forKey: "french_study_plan_v1") else { return nil }
        return try? JSONDecoder().decode(StudyPlan.self, from: data)
    }
}

// MARK: - 首页

/// Bento landing：Hero + 三层同心环 + 四张模块卡 + 学习节奏
/// 尺寸由小程序 750rpx 设计稿折算（1rpx ≈ 0.52pt，即 rpx/2 取整后微调）
struct HomeView: View {
    var onOpenFrench: (WordSource, AppStore.Tab) -> Void
    var onOpenScience: (ScienceStore.Subject) -> Void

    @State private var snapshot = HomeSnapshot()
    @State private var appeared = false

    var body: some View {
        GeometryReader { geo in
            ScrollView(showsIndicators: false) {
                VStack(spacing: 10) {
                    hero
                    ringsCard

                    HStack(alignment: .top, spacing: 10) {
                        moduleCard(snapshot.modules[safe: 0], height: moduleHeight(geo))
                        moduleCard(snapshot.modules[safe: 1], height: moduleHeight(geo))
                    }
                    HStack(alignment: .top, spacing: 10) {
                        moduleCard(snapshot.modules[safe: 2], height: moduleHeight(geo))
                        moduleCard(snapshot.modules[safe: 3], height: moduleHeight(geo))
                    }

                    rhythmCard
                }
                .padding(.horizontal, 15)
                .padding(.top, 12)
                .padding(.bottom, 16)
                .frame(minHeight: geo.size.height, alignment: .top)
            }
        }
        .background(Theme.bg)
        .onAppear {
            snapshot = HomeSnapshot.load()
            withAnimation(.easeOut(duration: 0.28)) { appeared = true }
        }
        .opacity(appeared ? 1 : 0)
        .offset(y: appeared ? 0 : 8)
    }

    /// 四张模块卡吃掉剩余高度，避免高屏下方留一大片空白
    private func moduleHeight(_ geo: GeometryProxy) -> CGFloat {
        let fixed: CGFloat = 156 + 125 + 78 + 10 * 4 + 12 + 16
        return min(232, max(172, (geo.size.height - fixed) / 2))
    }

    // MARK: Hero

    private var hero: some View {
        HStack(alignment: .center, spacing: 8) {
            VStack(alignment: .leading, spacing: 0) {
                Text("BELLA · DAILY")
                    .font(.system(size: 10, weight: .heavy))
                    .tracking(1.6)
                    .foregroundColor(.white.opacity(0.8))

                Text("四个模块，一起向前")
                    .font(.system(size: 20, weight: .heavy))
                    .foregroundColor(.white)
                    .padding(.top, 5)
                    .fixedSize(horizontal: false, vertical: true)

                Text("待复习 \(snapshot.due) 项 · 今日新词 \(snapshot.target) · 连续 \(snapshot.streak) 天")
                    .font(.system(size: 11.5, weight: .semibold))
                    .foregroundColor(.white.opacity(0.9))
                    .padding(.top, 6)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Spacer(minLength: 6)

            VStack(spacing: 2) {
                Text("\(snapshot.streak)")
                    .font(.system(size: 24, weight: .heavy, design: .rounded))
                    .foregroundColor(.white)
                Text("连续天数")
                    .font(.system(size: 9, weight: .bold))
                    .foregroundColor(.white.opacity(0.84))
            }
            .frame(width: 68, height: 68)
            .background(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .fill(Color.white.opacity(0.16))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .stroke(Color.white.opacity(0.3), lineWidth: 0.8)
            )
        }
        .padding(17)
        .frame(maxWidth: .infinity, minHeight: 156)
        .background(
            ZStack {
                LinearGradient(colors: [Color(hex: 0x053A28),
                                        Color(hex: 0x0F8A5A),
                                        Color(hex: 0x22AC70)],
                               startPoint: .topLeading,
                               endPoint: .bottomTrailing)
                RadialGradient(colors: [Color.white.opacity(0.24), Color.white.opacity(0)],
                               center: .topTrailing,
                               startRadius: 2,
                               endRadius: 190)
            }
        )
        .clipShape(RoundedRectangle(cornerRadius: 19, style: .continuous))
        .shadow(color: Color(hex: 0x053A28).opacity(0.18), radius: 18, x: 0, y: 8)
    }

    // MARK: 三环

    private var ringsCard: some View {
        HStack(alignment: .center, spacing: 13) {
            TripleRing(rings: snapshot.rings)

            VStack(alignment: .leading, spacing: 0) {
                Text("学习状态")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(Theme.sub)
                Text("待复习 \(snapshot.due) 项 · 累计 \(snapshot.totalStudied) 词")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundColor(Color(hex: 0x8EA196))
                    .padding(.top, 4)
                    .fixedSize(horizontal: false, vertical: true)

                VStack(spacing: 7) {
                    ForEach(snapshot.rings) { ring in
                        HStack(spacing: 6) {
                            Circle()
                                .fill(ring.color)
                                .frame(width: 7, height: 7)
                            Text(ring.label)
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(Theme.sub)
                                .lineLimit(1)
                            Spacer(minLength: 2)
                            Text(ring.value)
                                .font(.system(size: 10.5, weight: .bold))
                                .foregroundColor(Theme.ink)
                            Text("\(ring.tone)%")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(Color(hex: 0x8EA196))
                                .frame(width: 34, alignment: .trailing)
                        }
                    }
                }
                .padding(.top, 7)
            }
        }
        .padding(13)
        .frame(maxWidth: .infinity, minHeight: 125, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 15, style: .continuous).fill(Theme.surface))
        .shadow(color: Theme.ink.opacity(0.07), radius: 13, x: 0, y: 5)
    }

    // MARK: 模块卡

    @ViewBuilder
    private func moduleCard(_ module: HomeModule?, height: CGFloat) -> some View {
        if let module = module {
            Button {
                if module.isScience {
                    onOpenScience(module.id == "chem" ? .chem : .bio)
                } else {
                    onOpenFrench(module.id == "simple" ? .simple : .enavant, .card)
                }
            } label: {
                VStack(alignment: .leading, spacing: 0) {
                    HStack(spacing: 0) {
                        Text(module.mark)
                            .font(.system(size: 10, weight: .heavy))
                            .tracking(0.5)
                            .foregroundColor(module.accent)
                            .frame(width: 30, height: 30)
                            .background(RoundedRectangle(cornerRadius: 9, style: .continuous)
                                .fill(module.tint))
                        Spacer(minLength: 0)
                        Text("↗")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(Color(hex: 0x8EA196))
                    }

                    Text(module.name)
                        .font(.system(size: 14.5, weight: .heavy))
                        .foregroundColor(Theme.ink)
                        .padding(.top, 6)
                        .lineLimit(1)
                        .minimumScaleFactor(0.85)

                    Text(module.sub)
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(Theme.sub)
                        .lineSpacing(1)
                        .padding(.top, 3)
                        .fixedSize(horizontal: false, vertical: true)

                    Spacer(minLength: 6)

                    HStack(alignment: .firstTextBaseline, spacing: 4) {
                        Text("\(module.percent)%")
                            .font(.system(size: 22, weight: .heavy, design: .rounded))
                            .foregroundColor(module.accent)
                        Spacer(minLength: 0)
                        Text("已学 \(module.studied)/\(module.total)")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(Theme.sub)
                            .lineLimit(1)
                            .minimumScaleFactor(0.8)
                    }

                    BentoBar(percent: module.percent, tint: module.accent, height: 5)
                        .padding(.top, 5)

                    HStack(spacing: 0) {
                        Text("固化 \(module.graduated)")
                        Spacer(minLength: 4)
                        Text("待复习 \(module.due)")
                    }
                    .font(.system(size: 9.5, weight: .bold))
                    .foregroundColor(Color(hex: 0x8EA196))
                    .padding(.top, 7)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .frame(height: height, alignment: .topLeading)
                .background(RoundedRectangle(cornerRadius: 15, style: .continuous).fill(Theme.surface))
                .overlay(alignment: .top) {
                    Rectangle()
                        .fill(module.accent)
                        .frame(height: 3)
                }
                .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                .shadow(color: Theme.ink.opacity(0.07), radius: 13, x: 0, y: 5)
            }
            .buttonStyle(.plain)
        } else {
            Color.clear.frame(maxWidth: .infinity, minHeight: height)
        }
    }

    // MARK: 学习节奏

    private var rhythmCard: some View {
        HStack(alignment: .center, spacing: 8) {
            VStack(alignment: .leading, spacing: 0) {
                Text("学习节奏")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(Theme.sub)
                Text("每天一点点，四块都顾到")
                    .font(.system(size: 13.5, weight: .heavy))
                    .foregroundColor(Theme.ink)
                    .padding(.top, 4)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Spacer(minLength: 4)

            HStack(spacing: 6) {
                quickPill("自测", .quiz)
                quickPill("变位", .verb)
                quickPill("知识点", .points)
            }
        }
        .padding(.horizontal, 13)
        .padding(.vertical, 12)
        .frame(maxWidth: .infinity, minHeight: 78, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 15, style: .continuous).fill(Theme.surface))
        .shadow(color: Theme.ink.opacity(0.07), radius: 13, x: 0, y: 5)
    }

    private func quickPill(_ title: String, _ tab: AppStore.Tab) -> some View {
        Button {
            onOpenFrench(snapshot.source, tab)
        } label: {
            Text(title)
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(Theme.primary)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(RoundedRectangle(cornerRadius: 7, style: .continuous)
                    .fill(Theme.chip))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - 三层同心环（Apple Watch 风格：外今日 / 中记忆 / 内固化）

struct TripleRing: View {
    let rings: [HomeRing]

    private let outer: CGFloat = 96
    private let middle: CGFloat = 62
    private let inner: CGFloat = 42

    var body: some View {
        ZStack {
            ring(rings[safe: 0], diameter: outer, thickness: 11)
            ring(rings[safe: 1], diameter: middle, thickness: 9)
            ring(rings[safe: 2], diameter: inner, thickness: 7)

            VStack(spacing: 0) {
                Text("\(rings[safe: 0]?.tone ?? 0)%")
                    .font(.system(size: 15, weight: .heavy, design: .rounded))
                    .foregroundColor(Theme.ink)
                    .lineLimit(1)
                    .minimumScaleFactor(0.6)
                Text("今日")
                    .font(.system(size: 8.5, weight: .bold))
                    .foregroundColor(Theme.sub)
            }
            .frame(width: inner - 16)
        }
        .frame(width: outer, height: outer)
        .accessibilityLabel(rings.map { "\($0.label) \($0.tone)%" }.joined(separator: "，"))
    }

    @ViewBuilder
    private func ring(_ item: HomeRing?, diameter: CGFloat, thickness: CGFloat) -> some View {
        if let item = item {
            ZStack {
                Circle()
                    .stroke(Theme.track, lineWidth: thickness)
                Circle()
                    .trim(from: 0, to: min(1, max(0, Double(item.tone) / 100)))
                    .stroke(item.color, style: StrokeStyle(lineWidth: thickness, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                    .animation(.easeOut(duration: 0.6), value: item.tone)
            }
            .frame(width: diameter, height: diameter)
        }
    }
}

// MARK: - 进度条

struct BentoBar: View {
    let percent: Int
    let tint: Color
    var height: CGFloat = 6

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.track)
                Capsule()
                    .fill(LinearGradient(colors: [tint.opacity(0.72), tint],
                                         startPoint: .leading,
                                         endPoint: .trailing))
                    .frame(width: geo.size.width * CGFloat(max(0, min(100, percent))) / 100)
            }
        }
        .frame(height: height)
    }
}

// MARK: - 安全下标

extension Array {
    subscript(safe index: Int) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}
