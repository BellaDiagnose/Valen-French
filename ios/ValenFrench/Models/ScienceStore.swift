import Foundation
import SwiftUI

// MARK: - 自测题

enum ScienceQuizMode: String, CaseIterable, Identifiable {
    case point, formula
    var id: String { rawValue }
    var label: String { self == .point ? "术语互译" : "公式配对" }
}

enum ScienceQuizLang: String, CaseIterable, Identifiable {
    case en2zh, zh2en
    var id: String { rawValue }
    var label: String { self == .en2zh ? "英 → 中" : "中 → 英" }
}

struct ScienceQuestion: Identifiable {
    struct Option: Identifiable, Hashable {
        let id: String
        let text: String
    }

    let id: String
    let prompt: String
    let hint: String
    let options: [Option]
    let answerID: String
}

// MARK: - 每日计划模型

/// 当天新卡队列：当天只定一次，背掉的卡不会从后面补位
struct ScienceDeckQueue: Codable, Equatable {
    var date: String
    var ids: [String]
}

struct SciencePlan: Codable {
    var today: String
    var lastOpenDate: String
    var dailyNewCount: Int
    var streak: Int
    var newQueues: [String: ScienceDeckQueue]

    static func initial(day: String) -> SciencePlan {
        SciencePlan(today: day,
                    lastOpenDate: day,
                    dailyNewCount: StudyEngine.defaultDaily,
                    streak: 1,
                    newQueues: [:])
    }
}

enum SciencePlanKind: String, Hashable {
    case point, formula
}

enum ScienceQueueMode: String {
    case review, study, browse

    var label: String {
        switch self {
        case .review: return "复习"
        case .study: return "新学"
        case .browse: return "浏览"
        }
    }
}

enum SciencePlanGroup: String, CaseIterable, Hashable, Identifiable {
    case due, learning, fresh, graduated

    var id: String { rawValue }

    var title: String {
        switch self {
        case .due: return "今日待复习"
        case .learning: return "学习中"
        case .fresh: return "新卡片"
        case .graduated: return "已固化 🎓"
        }
    }

    var mode: ScienceQueueMode {
        switch self {
        case .due: return .review
        case .fresh: return .study
        case .learning, .graduated: return .browse
        }
    }
}

struct SciencePlanItem: Identifiable, Hashable {
    let gid: String          // 记忆键：知识点 b01 / 公式 f01
    let cardID: String       // 卡片 id：知识点 b01 / 公式 01
    let kind: SciencePlanKind
    let title: String
    let sub: String
    let stageText: String

    var id: String { gid }
}

struct SciencePlanBuckets {
    var due: [SciencePlanItem] = []
    var learning: [SciencePlanItem] = []
    var fresh: [SciencePlanItem] = []
    var graduated: [SciencePlanItem] = []

    var total: Int { due.count + learning.count + fresh.count + graduated.count }

    func items(_ group: SciencePlanGroup) -> [SciencePlanItem] {
        switch group {
        case .due: return due
        case .learning: return learning
        case .fresh: return fresh
        case .graduated: return graduated
        }
    }
}

// MARK: - 科学页状态

@MainActor
final class ScienceStore: ObservableObject {
    enum Subject: String, CaseIterable, Identifiable {
        case bio, chem
        var id: String { rawValue }
        var label: String { self == .bio ? "生物" : "化学" }
    }

    enum Segment: String, CaseIterable, Identifiable {
        case point, formula, quiz, plan
        var id: String { rawValue }
        var label: String {
            switch self {
            case .point: return "每日背诵"
            case .formula: return "公式"
            case .quiz: return "自测"
            case .plan: return "复习计划"
            }
        }
    }

    private enum Key {
        static let memory = "science_memory_v1"
        static let stats = "science_stats_v1"
        static let subject = "science_subject_v1"
        static let lang = "science_lang_v1"
        static let plan = "science_plan_v1"
    }

    private let bank = ScienceBank.shared
    private let defaults = UserDefaults.standard
    private var toastTask: Task<Void, Never>?
    private let pointByID: [String: SciencePoint]
    private let formulaByID: [String: ScienceFormula]

    @Published var subject: Subject
    @Published var segment: Segment = .point
    @Published var showEnglish = false
    @Published var formulaUnitFilter = ""
    @Published var pointIndex = 0
    @Published var formulaIndex = 0
    @Published var flipped = false

    @Published var memory: [String: MemoryRecord]
    @Published var plan: SciencePlan
    @Published var deckDue: [String] = []
    @Published var deckFresh: [String] = []

    // 从计划清单进入的队列；为空 = 走今日卡组
    @Published var queueIDs: [String] = []
    @Published var queueKind: SciencePlanKind?
    @Published var queueMode: ScienceQueueMode = .browse

    @Published var quizMode: ScienceQuizMode = .point
    @Published var quizLang: ScienceQuizLang = .en2zh
    @Published var quiz: ScienceQuestion?
    @Published var quizAnswered = false
    @Published var quizSelectedID: String?
    @Published var quizCorrect = false
    @Published var quizRight = 0
    @Published var quizTotal = 0
    @Published var askedIDs: [String] = []
    @Published var toast: String?

    init() {
        let stored = UserDefaults.standard.string(forKey: Key.subject) ?? ""
        subject = Subject(rawValue: stored) ?? .bio
        showEnglish = UserDefaults.standard.bool(forKey: Key.lang)
        memory = ScienceStore.decode([String: MemoryRecord].self, key: Key.memory) ?? [:]
        plan = ScienceStore.decode(SciencePlan.self, key: Key.plan)
            ?? .initial(day: StudyEngine.dayString())

        var points: [String: SciencePoint] = [:]
        for item in ScienceBank.shared.bioPoints + ScienceBank.shared.chemPoints {
            points[item.id] = item
        }
        pointByID = points
        formulaByID = Dictionary(uniqueKeysWithValues: ScienceBank.shared.formulas.map { ($0.id, $0) })

        let stats = UserDefaults.standard.dictionary(forKey: Key.stats)
        quizRight = stats?["right"] as? Int ?? 0
        quizTotal = stats?["total"] as? Int ?? 0

        refreshDay()
        buildQuiz()
    }

    // MARK: 卡组

    /// 跨天时作废旧队列、按昨天有没有背过累加连续天数
    func refreshDay() {
        let today = StudyEngine.dayString()
        if plan.today != today {
            plan.streak = plan.today.isEmpty ? 1 : (reviewedOn(plan.today) ? plan.streak + 1 : 1)
            plan.today = today
            plan.newQueues = [:]
        }
        plan.lastOpenDate = today
        persistPlan()
        refreshDeck()
    }

    func refreshDeck() {
        if plan.today != StudyEngine.dayString() {
            refreshDay()
            return
        }
        let now = Date().timeIntervalSince1970
        deckDue = bank.points(for: subject).compactMap { point -> String? in
            guard let record = memory[point.id],
                  !record.isGraduated,
                  record.dueAt > 0,
                  record.dueAt <= now else { return nil }
            return point.id
        }.sorted { (memory[$0]?.dueAt ?? 0) < (memory[$1]?.dueAt ?? 0) }
        deckFresh = ensureNewQueue(day: plan.today).filter { memory[$0] == nil }
    }

    var deckIDs: [String] { deckDue + deckFresh }

    var pointCount: Int { bank.points(for: subject).count }
    var formulaCount: Int { bank.formulas(for: subject).count }

    var formulaUnitOptions: [ScienceUnit] {
        [ScienceUnit(key: "", label: "全部", book: nil, subject: nil)]
            + bank.formulaUnits.filter { $0.subject == subject.rawValue }
    }

    /// 当前正在过的卡片 id：有队列走队列，否则走今日卡组
    var pointIDs: [String] {
        queueKind == .point ? queueIDs : deckIDs
    }

    var deckPoints: [SciencePoint] {
        pointIDs.compactMap { pointByID[$0] }
    }

    var formulaIDs: [String] {
        if queueKind == .formula { return queueIDs }
        return bank.formulas(for: subject)
            .filter { formulaUnitFilter.isEmpty || $0.unit == formulaUnitFilter }
            .map(\.id)
    }

    var formulas: [ScienceFormula] {
        formulaIDs.compactMap { formulaByID[$0] }
    }

    var currentPoint: SciencePoint? {
        deckPoints.indices.contains(pointIndex) ? deckPoints[pointIndex] : nil
    }

    var currentFormula: ScienceFormula? {
        formulas.indices.contains(formulaIndex) ? formulas[formulaIndex] : nil
    }

    var currentLabel: String {
        if let point = currentPoint { return showEnglish ? point.en : point.cn }
        if let formula = currentFormula { return showEnglish ? formula.en : formula.cn }
        return ""
    }

    /// 今天已经评过的知识点张数（评过即离场，用它与剩余卡组还原今日总量）
    var reviewedToday: Int {
        let today = StudyEngine.dayString()
        return bank.points(for: subject).filter { point in
            guard let record = memory[point.id], record.lastReview > 0 else { return false }
            return StudyEngine.dayString(Date(timeIntervalSince1970: record.lastReview)) == today
        }.count
    }

    var deckTotal: Int { deckIDs.count + reviewedToday }

    var deckProgress: Double {
        deckTotal > 0 ? min(1, Double(reviewedToday) / Double(deckTotal)) : 0
    }

    func stageLabel(_ gid: String) -> String {
        guard let record = memory[gid] else { return "未开始" }
        if record.isGraduated { return "已固化" }
        let days = StudyEngine.stageDays[min(max(record.stage, 0), StudyEngine.stageDays.count - 1)]
        return "第 \(record.stage + 1) 档 · \(days) 天"
    }

    // MARK: 计划

    var planBuckets: SciencePlanBuckets {
        let now = Date().timeIntervalSince1970
        var buckets = SciencePlanBuckets()
        for item in planItems(now: now) { append(item, to: &buckets, now: now) }
        buckets.due.sort { (memory[$0.gid]?.dueAt ?? 0) < (memory[$1.gid]?.dueAt ?? 0) }
        return buckets
    }

    private func planItems(now: TimeInterval) -> [SciencePlanItem] {
        let points = bank.points(for: subject).map { point in
            SciencePlanItem(gid: point.id,
                            cardID: point.id,
                            kind: .point,
                            title: point.cn,
                            sub: point.en,
                            stageText: stageText(gid: point.id, now: now))
        }
        let formulas = bank.formulas(for: subject).map { formula in
            let gid = "f" + formula.id
            return SciencePlanItem(gid: gid,
                                   cardID: formula.id,
                                   kind: .formula,
                                   title: formula.cn,
                                   sub: formula.expr,
                                   stageText: stageText(gid: gid, now: now))
        }
        return points + formulas
    }

    private func stageText(gid: String, now: TimeInterval) -> String {
        guard let record = memory[gid] else { return "未开始" }
        if record.isGraduated { return "完成全部间隔" }
        if record.dueAt > 0 && record.dueAt <= now { return "已到期" }
        return "第 \(record.stage + 1) 档 · \(ScienceStore.monthDay(record.dueAt))"
    }

    private func append(_ item: SciencePlanItem, to buckets: inout SciencePlanBuckets, now: TimeInterval) {
        guard let record = memory[item.gid] else {
            buckets.fresh.append(item)
            return
        }
        if record.isGraduated {
            buckets.graduated.append(item)
        } else if record.dueAt > 0 && record.dueAt <= now {
            buckets.due.append(item)
        } else {
            buckets.learning.append(item)
        }
    }

    var formulaDueCount: Int {
        planBuckets.due.filter { $0.kind == .formula }.count
    }

    // MARK: 导航

    func selectSubject(_ value: Subject) {
        guard value != subject else { return }
        subject = value
        defaults.set(value.rawValue, forKey: Key.subject)
        formulaUnitFilter = ""
        pointIndex = 0
        formulaIndex = 0
        flipped = false
        clearQueue()
        askedIDs = []
        quiz = nil
        refreshDeck()
        buildQuiz()
    }

    func selectSegment(_ value: Segment) {
        segment = value
        flipped = false
        if value == .point || value == .formula { clearQueue() }
        if value == .point { pointIndex = 0 }
        if value == .quiz && quiz == nil { buildQuiz() }
    }

    func toggleLanguage() {
        showEnglish.toggle()
        defaults.set(showEnglish, forKey: Key.lang)
    }

    func setFormulaUnitFilter(_ key: String) {
        formulaUnitFilter = key
        formulaIndex = 0
        flipped = false
    }

    func showPoint(_ index: Int) {
        let count = deckPoints.count
        guard count > 0 else { pointIndex = 0; return }
        pointIndex = max(0, min(index, count - 1))
        flipped = false
    }

    func showFormula(_ index: Int) {
        let count = formulas.count
        guard count > 0 else { formulaIndex = 0; return }
        formulaIndex = max(0, min(index, count - 1))
        flipped = false
    }

    func flip() {
        withAnimation(.easeInOut(duration: 0.4)) { flipped.toggle() }
    }

    // MARK: 队列

    var queueLabel: String {
        guard queueKind != nil else { return "" }
        return "\(queueMode.label) · \(queueIDs.count) 条"
    }

    func startTodayDeck() {
        clearQueue()
        segment = .point
        pointIndex = 0
        flipped = false
        refreshDeck()
    }

    func startFormulaReview() {
        let ids = planBuckets.due.filter { $0.kind == .formula }.map(\.cardID)
        guard !ids.isEmpty else { showToast("今天没有待复习的公式 🎉"); return }
        openQueue(kind: .formula, ids: ids, mode: .review, start: 0)
    }

    func focus(_ item: SciencePlanItem, group: SciencePlanGroup) {
        let list = planBuckets.items(group).filter { $0.kind == item.kind }
        let ids = list.map(\.cardID)
        guard let index = list.firstIndex(where: { $0.gid == item.gid }) else { return }
        openQueue(kind: item.kind, ids: ids, mode: group.mode, start: index)
    }

    private func openQueue(kind: SciencePlanKind, ids: [String], mode: ScienceQueueMode, start: Int) {
        guard !ids.isEmpty else { showToast("这一组暂时没有卡片"); return }
        queueIDs = ids
        queueKind = kind
        queueMode = mode
        flipped = false
        if kind == .formula {
            segment = .formula
            formulaUnitFilter = ""
            formulaIndex = max(0, min(start, ids.count - 1))
        } else {
            segment = .point
            pointIndex = max(0, min(start, ids.count - 1))
        }
    }

    func exitQueue() {
        clearQueue()
        pointIndex = 0
        formulaIndex = 0
        flipped = false
        refreshDeck()
    }

    private func clearQueue() {
        queueIDs = []
        queueKind = nil
        queueMode = .browse
    }

    // MARK: 记忆评分

    func rate(_ delta: Int) {
        let kind: SciencePlanKind = segment == .formula ? .formula : .point
        let cardID = kind == .formula ? currentFormula?.id : currentPoint?.id
        guard let cardID else { return }
        let gid = kind == .formula ? "f" + cardID : cardID

        let result = StudyEngine.advance(previous: memory[gid], delta: delta, now: Date())
        memory[gid] = MemoryRecord(stage: result.stage,
                                   dueAt: result.dueAt,
                                   lastReview: result.lastReview)
        persistMemory()

        if result.graduated {
            showToast("已固化 🎓")
        } else if delta > 0 {
            showToast("记住了 · \(result.intervalDays)天后")
        } else {
            showToast("忘记了 · 缩短间隔")
        }

        if queueKind == kind, let index = queueIDs.firstIndex(of: cardID) {
            queueIDs.remove(at: index)
            if queueIDs.isEmpty { clearQueue() }
        } else if kind == .formula {
            // 公式不在卡组里，评完顺手翻下一张
            let next = formulaIndex + 1
            refreshDeck()
            showFormula(next)
            flipped = false
            return
        }

        refreshDeck()
        flipped = false
        if kind == .point { clampPointIndex() }
    }

    private func clampPointIndex() {
        let count = deckPoints.count
        if count == 0 { pointIndex = 0 }
        else if pointIndex >= count { pointIndex = count - 1 }
    }

    // MARK: 自测

    func setQuizMode(_ mode: ScienceQuizMode) {
        quizMode = mode
        askedIDs = []
        quiz = nil
        buildQuiz()
    }

    func setQuizLang(_ lang: ScienceQuizLang) {
        quizLang = lang
        quiz = nil
        buildQuiz()
    }

    private func quizPool() -> [(id: String, front: String, back: String, hint: String)] {
        let english = quizLang == .en2zh
        if quizMode == .formula {
            return bank.formulas(for: subject).map { item in
                (id: "f" + item.id,
                 front: english ? item.en : item.cn,
                 back: english ? item.cn : item.en,
                 hint: item.expr)
            }
        }
        return bank.points(for: subject).map { item in
            (id: item.id,
             front: english ? item.en : item.cn,
             back: english ? item.cn : item.en,
             hint: item.chapter)
        }
    }

    func buildQuiz() {
        let pool = quizPool()
        guard !pool.isEmpty else { quiz = nil; return }

        var candidates = pool.filter { !askedIDs.contains($0.id) }
        if candidates.count < 4 {
            candidates = pool
            askedIDs = []
        }
        guard let answer = candidates.randomElement() else { quiz = nil; return }

        var distractors = pool.filter { $0.id != answer.id }
        distractors.shuffle()
        let options = ([answer] + Array(distractors.prefix(3)))
            .map { ScienceQuestion.Option(id: $0.id, text: $0.back) }
            .shuffled()

        quiz = ScienceQuestion(id: answer.id,
                               prompt: answer.front,
                               hint: answer.hint,
                               options: options,
                               answerID: answer.id)
        quizAnswered = false
        quizSelectedID = nil
        quizCorrect = false
        askedIDs.append(answer.id)
    }

    func answer(_ optionID: String) {
        guard let current = quiz, !quizAnswered else { return }
        let correct = optionID == current.answerID
        quizAnswered = true
        quizSelectedID = optionID
        quizCorrect = correct
        quizTotal += 1
        if correct { quizRight += 1 }
        defaults.set(["right": quizRight, "total": quizTotal], forKey: Key.stats)
        rateQuiz(current.answerID, correct: correct)
    }

    private func rateQuiz(_ gid: String, correct: Bool) {
        let result = StudyEngine.advance(previous: memory[gid], delta: correct ? 1 : -1, now: Date())
        memory[gid] = MemoryRecord(stage: result.stage,
                                   dueAt: result.dueAt,
                                   lastReview: result.lastReview)
        persistMemory()
        refreshDeck()
    }

    func nextQuestion() { buildQuiz() }

    func resetStats() {
        quizRight = 0
        quizTotal = 0
        askedIDs = []
        defaults.set(["right": 0, "total": 0], forKey: Key.stats)
        buildQuiz()
        showToast("统计已重置")
    }

    var quizAccuracy: Int {
        quizTotal > 0 ? Int((Double(quizRight) / Double(quizTotal) * 100).rounded()) : 0
    }

    // MARK: 存储

    private func ensureNewQueue(day: String) -> [String] {
        if let pinned = plan.newQueues[subject.rawValue], pinned.date == day {
            return pinned.ids
        }
        let ids = bank.points(for: subject)
            .filter { memory[$0.id] == nil }
            .prefix(plan.dailyNewCount)
            .map(\.id)
        plan.newQueues[subject.rawValue] = ScienceDeckQueue(date: day, ids: Array(ids))
        persistPlan()
        return Array(ids)
    }

    private func reviewedOn(_ day: String) -> Bool {
        memory.values.contains { record in
            guard record.lastReview > 0 else { return false }
            return StudyEngine.dayString(Date(timeIntervalSince1970: record.lastReview)) == day
        }
    }

    private func persistMemory() {
        defaults.set(try? JSONEncoder().encode(memory), forKey: Key.memory)
    }

    private func persistPlan() {
        defaults.set(try? JSONEncoder().encode(plan), forKey: Key.plan)
    }

    private static func monthDay(_ timestamp: TimeInterval) -> String {
        guard timestamp > 0 else { return "待安排" }
        let date = Date(timeIntervalSince1970: timestamp)
        let comps = Calendar.current.dateComponents([.month, .day], from: date)
        return "\(comps.month ?? 0)月\(comps.day ?? 0)日"
    }

    // MARK: Toast

    func showToast(_ text: String) {
        toast = text
        toastTask?.cancel()
        toastTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: 1_900_000_000)
            guard !Task.isCancelled else { return }
            self?.toast = nil
        }
    }

    private static func decode<T: Decodable>(_ type: T.Type, key: String) -> T? {
        guard let data = UserDefaults.standard.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }
}
