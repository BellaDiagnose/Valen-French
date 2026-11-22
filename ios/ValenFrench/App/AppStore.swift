import Foundation
import SwiftUI

// MARK: - 统计快照

struct MemoryStats {
    enum Bucket: String, CaseIterable {
        case due, learning, fresh, graduated
        var title: String {
            switch self {
            case .due: return "今日待复习"
            case .learning: return "学习中"
            case .fresh: return "新词"
            case .graduated: return "已固化"
            }
        }
    }

    var due: [Word] = []
    var learning: [Word] = []
    var fresh: [Word] = []
    var graduated: [Word] = []
    var total: Int = 0

    var dueCount: Int { due.count }
    var learningCount: Int { learning.count }
    var newCount: Int { fresh.count }
    var graduatedCount: Int { graduated.count }
    var graduatedPercent: Int {
        total > 0 ? Int((Double(graduatedCount) / Double(total) * 100).rounded()) : 0
    }

    func words(in bucket: Bucket) -> [Word] {
        switch bucket {
        case .due: return due
        case .learning: return learning
        case .fresh: return fresh
        case .graduated: return graduated
        }
    }
}

// MARK: - 自测题

struct QuizQuestion {
    enum Mode {
        case fr2cn, cn2fr
        var hint: String { self == .fr2cn ? "选出中文释义" : "选出法语单词" }
    }

    struct Option: Identifiable, Hashable {
        let id: String
        let text: String
    }

    let word: Word
    let options: [Option]
    let answerID: String
    let mode: Mode

    var prompt: String { mode == .fr2cn ? word.fr : word.cn }
}

// MARK: - 全局状态

@MainActor
final class AppStore: ObservableObject {
    enum Tab: String, CaseIterable, Identifiable {
        case card, quiz, verb, plan, points
        var id: String { rawValue }
        var label: String {
            switch self {
            case .card: return "单词卡"
            case .quiz: return "自测"
            case .verb: return "变位表"
            case .plan: return "复习计划"
            case .points: return "知识点"
            }
        }
    }

    private enum Key {
        static let memory = "french_memory_v2"
        static let plan = "french_study_plan_v1"
        static let source = "french_source_v1"
        static let verbMemory = "french_verb_memory_v1"
        static let asked = "french_asked_ids_v1"
        static let quizScore = "french_quiz_score_v1"
    }

    private let defaults = UserDefaults.standard
    private let bank = WordBank.shared
    private var toastTask: Task<Void, Never>?

    // 词库与记忆
    @Published var source: WordSource
    @Published var memory: [String: MemoryRecord]
    @Published var verbMemory: [String: MemoryRecord]
    @Published var plan: StudyPlan

    // 导航
    @Published var activeTab: Tab = .card
    @Published var toast: String?

    // 单词卡
    @Published var activeWordIDs: [String] = []
    @Published var cardIndex: Int = 0
    @Published var flipped: Bool = false
    @Published var isReviewMode: Bool = false
    @Published var lessonFilter: Int = 0
    @Published var ringProgress: Double = 0

    // 自测
    @Published var quiz: QuizQuestion?
    @Published var quizAnswered: Bool = false
    @Published var quizSelectedID: String?
    @Published var quizCorrect: Bool = false
    @Published var quizRight: Int = 0
    @Published var quizTotal: Int = 0
    @Published var quizAskedIDs: [String] = []

    // 强制自测
    @Published var showForceQuiz: Bool = false
    @Published var forceQuizLeft: Int = 0
    @Published var forceQuizRight: Int = 0
    @Published var forceGapDays: Int = 0

    // 变位表
    @Published var verbIndex: Int = 0
    @Published var tenseIndex: Int = 0
    @Published var maskForms: Bool = false
    @Published var revealedForms: Set<Int> = []

    // 知识点
    @Published var filterUnit: Int = 0
    @Published var filterLevel: String = "全部"

    init() {
        let storedSource = UserDefaults.standard.string(forKey: Key.source)
        source = storedSource.flatMap(WordSource.init(rawValue:)) ?? .enavant
        memory = AppStore.decode([String: MemoryRecord].self, key: Key.memory) ?? [:]
        verbMemory = AppStore.decode([String: MemoryRecord].self, key: Key.verbMemory) ?? [:]
        plan = AppStore.decode(StudyPlan.self, key: Key.plan)
            ?? StudyPlan.initial(today: StudyEngine.dayString())
        quizAskedIDs = UserDefaults.standard.stringArray(forKey: Key.asked) ?? []

        let score = UserDefaults.standard.dictionary(forKey: Key.quizScore)
        quizRight = score?["right"] as? Int ?? 0
        quizTotal = score?["total"] as? Int ?? 0

        refreshOnLaunch()
    }

    // MARK: 启动 / 切库

    func refreshOnLaunch() {
        let state = StudyEngine.openState(plan: plan)
        var next = StudyEngine.buildDailyPlan(plan: plan, state: state,
                                              words: words, memory: memory)
        if next.queue.isEmpty {
            next.queue = StudyEngine.pickNewWords(words: words, memory: memory, count: next.dailyNewCount)
        }
        plan = next
        persistPlan()

        showForceQuiz = state.forceQuiz && !next.forceQuizDone
        forceGapDays = state.gap
        forceQuizLeft = showForceQuiz ? StudyEngine.forceQuizQuestions : 0
        forceQuizRight = 0

        ringProgress = ringFraction
        rebuild()
        buildQuiz()
    }

    func switchSource(_ newSource: WordSource) {
        guard newSource != source else { return }
        source = newSource
        defaults.set(newSource.rawValue, forKey: Key.source)
        lessonFilter = 0
        var next = plan
        next.queue = StudyEngine.pickNewWords(words: bank.words(for: newSource),
                                              memory: memory,
                                              count: next.dailyNewCount)
        next.doneCount = 0
        plan = next
        persistPlan()
        ringProgress = ringFraction
        rebuild()
        withAnimation(.easeOut(duration: 0.55)) { ringProgress = ringFraction }
    }

    func selectTab(_ tab: Tab) {
        guard tab != activeTab else { return }
        if showForceQuiz {
            showToast("请先完成强制自测")
            return
        }
        if tab == .quiz && quiz == nil { buildQuiz() }
        activeTab = tab
    }

    // MARK: 词库读取

    var words: [Word] { bank.words(for: source) }
    var wordsCount: Int { words.count }

    var scopedWords: [Word] {
        guard source == .simple, lessonFilter > 0 else { return words }
        let filtered = words.filter { $0.unit == lessonFilter }
        return filtered.isEmpty ? words : filtered
    }

    var card: Word? {
        guard activeWordIDs.indices.contains(cardIndex) else { return nil }
        return bank.word(activeWordIDs[cardIndex])
    }

    var cardConjugation: [String]? {
        guard let card = card else { return nil }
        return bank.conjugation(for: card)
    }

    var persons: [String] { bank.persons }

    struct LessonOption: Identifiable {
        let value: Int
        let label: String
        let count: Int
        var id: Int { value }
    }

    var lessonOptions: [LessonOption] {
        let counts = bank.lessonCounts(for: .simple)
        var list = [LessonOption(value: 0, label: "全部", count: bank.words(for: .simple).count)]
        for lesson in 1...30 {
            list.append(LessonOption(value: lesson, label: "第\(lesson)课", count: counts[lesson] ?? 0))
        }
        return list
    }

    // MARK: 统计

    var stats: MemoryStats { makeStats(for: scopedWords) }
    var allStats: MemoryStats { makeStats(for: words) }

    func makeStats(for list: [Word]) -> MemoryStats {
        let now = Date().timeIntervalSince1970
        var result = MemoryStats()
        result.total = list.count
        for word in list {
            guard let record = memory[word.id] else {
                result.fresh.append(word)
                continue
            }
            if record.isGraduated {
                result.graduated.append(word)
            } else if record.dueAt <= now {
                result.due.append(word)
            } else {
                result.learning.append(word)
            }
        }
        result.due.sort { (memory[$0.id]?.dueAt ?? 0) < (memory[$1.id]?.dueAt ?? 0) }
        return result
    }

    /// 今日已背词数（只算当前词库，按 lastReview 落今日）
    var studiedTodayCount: Int {
        let prefix = source.gidPrefix
        let start = StudyEngine.startOfToday()
        return memory.reduce(into: 0) { partial, item in
            if item.key.hasPrefix(prefix), item.value.lastReview >= start {
                partial += 1
            }
        }
    }

    /// 环进度 = 今日已背 / 今日队列（封顶 1，队列为空视为满环）
    var ringFraction: Double {
        let target = plan.queue.count
        guard target > 0 else { return 1 }
        return min(1, Double(studiedTodayCount) / Double(target))
    }

    var ringDays: Int { max(1, plan.streak) }

    // MARK: 卡片流

    func rebuild() {
        let pool = scopedWords
        let poolIDs = Set(pool.map(\.id))
        let queueIDs = plan.queue.filter { poolIDs.contains($0) }
        if lessonFilter > 0 {
            activeWordIDs = pool.map(\.id)
        } else {
            activeWordIDs = queueIDs.isEmpty ? pool.map(\.id) : queueIDs
        }
        cardIndex = 0
        flipped = false
    }

    func setLessonFilter(_ value: Int) {
        lessonFilter = value
        rebuild()
    }

    func showCard(_ index: Int) {
        guard !activeWordIDs.isEmpty else { return }
        var target = index
        if target < 0 { target = activeWordIDs.count - 1 }
        if target >= activeWordIDs.count { target = 0 }
        cardIndex = target
        flipped = false
    }

    func flipCard() {
        withAnimation(.easeInOut(duration: 0.42)) { flipped.toggle() }
    }

    func nextCard() { showCard(cardIndex + 1) }
    func prevCard() { showCard(cardIndex - 1) }

    // MARK: 记忆评分

    func markRemembered() { rate(1) }
    func markForgotten() { rate(-1) }

    private func rate(_ delta: Int) {
        guard let current = card else { return }
        rateWord(current.id, delta: delta)
        flipped = false
        if isReviewMode { nextCard() }
    }

    func rateWord(_ gid: String, delta: Int, silent: Bool = false) {
        let now = Date()
        let previous = memory[gid]
        let result = StudyEngine.advance(previous: previous, delta: delta, now: now)
        memory[gid] = MemoryRecord(stage: result.stage,
                                  dueAt: result.dueAt,
                                  lastReview: result.lastReview)

        var next = plan
        next.doneCount = min(next.queue.count, studiedTodayCount)
        if previous == nil && next.queue.contains(gid) { next.totalStudied += 1 }
        plan = next

        persistMemory()
        persistPlan()
        withAnimation(.easeOut(duration: 0.55)) { ringProgress = ringFraction }

        guard !silent else { return }
        if result.graduated {
            showToast("已固化 🎓")
        } else if delta > 0 {
            showToast("记住了 · \(result.intervalDays)天后")
        } else {
            showToast("忘记了 · 缩短间隔")
        }
    }

    // MARK: 计划入口

    func startReview() {
        let ids = stats.due.map(\.id)
        guard !ids.isEmpty else {
            showToast("今天没有待复习的词 🎉")
            return
        }
        activeWordIDs = ids
        isReviewMode = true
        cardIndex = 0
        flipped = false
        activeTab = .card
    }

    func startNew() {
        let ids = plan.queue
        guard !ids.isEmpty else {
            showToast("今日新词已学完")
            return
        }
        activeWordIDs = ids
        isReviewMode = false
        cardIndex = 0
        flipped = false
        activeTab = .card
    }

    func browseAll() {
        activeWordIDs = words.map(\.id)
        isReviewMode = false
        cardIndex = 0
        flipped = false
        activeTab = .card
    }

    func focus(bucket: MemoryStats.Bucket, wordID: String) {
        let bucketWords = stats.words(in: bucket)
        guard !bucketWords.isEmpty else { return }
        activeWordIDs = bucketWords.map(\.id)
        isReviewMode = bucket == .due
        cardIndex = max(0, bucketWords.firstIndex { $0.id == wordID } ?? 0)
        flipped = false
        activeTab = .card
    }

    // MARK: 自测

    func buildQuiz() {
        let poolBase = words
        guard !poolBase.isEmpty else { quiz = nil; return }

        var pool = poolBase.filter { !quizAskedIDs.contains($0.id) }
        if pool.count < 4 {
            pool = poolBase
            quizAskedIDs = []
        }
        guard let word = pool.randomElement() else { quiz = nil; return }

        let mode: QuizQuestion.Mode = quizTotal % 2 == 0 ? .fr2cn : .cn2fr
        var distractors = poolBase.filter { $0.id != word.id }
        distractors.shuffle()
        let options = ([word] + Array(distractors.prefix(3)))
            .map { QuizQuestion.Option(id: $0.id, text: mode == .fr2cn ? $0.cn : $0.fr) }
            .shuffled()

        quiz = QuizQuestion(word: word, options: options, answerID: word.id, mode: mode)
        quizAnswered = false
        quizSelectedID = nil
        quizCorrect = false
        quizAskedIDs.append(word.id)
        defaults.set(quizAskedIDs, forKey: Key.asked)
    }

    func answer(_ optionID: String) {
        guard let current = quiz, !quizAnswered else { return }
        let correct = optionID == current.answerID
        // 记忆推进作用在「被提问的词」上，而非被点错的干扰项
        rateWord(current.word.id, delta: correct ? 1 : -1, silent: true)
        quizAnswered = true
        quizSelectedID = optionID
        quizCorrect = correct

        if showForceQuiz {
            if correct { forceQuizRight += 1 }
        } else {
            quizTotal += 1
            if correct { quizRight += 1 }
            saveQuizScore()
        }
    }

    func nextQuestion() {
        if showForceQuiz {
            let left = forceQuizLeft - 1
            if left <= 0 {
                finishForceQuiz()
            } else {
                forceQuizLeft = left
                buildQuiz()
            }
            return
        }
        buildQuiz()
    }

    func resetQuizStats() {
        quizTotal = 0
        quizRight = 0
        quizAskedIDs = []
        defaults.set(quizAskedIDs, forKey: Key.asked)
        saveQuizScore()
        buildQuiz()
        showToast("统计已重置")
    }

    private func finishForceQuiz() {
        let accuracy = Double(forceQuizRight) / Double(StudyEngine.forceQuizQuestions)
        var next = plan
        next.lastQuizAccuracy = accuracy
        next.forceQuizDone = true
        next.dailyNewCount = StudyEngine.adjustDaily(current: next.dailyNewCount,
                                                    accuracy: accuracy,
                                                    completion: nil)
        plan = next
        persistPlan()
        forceQuizLeft = 0
        showForceQuiz = false
        buildQuiz()
        showToast("热身完成 \(Int((accuracy * 100).rounded()))% · 明日 \(next.dailyNewCount) 词/天")
    }

    var quizAccuracy: Int {
        quizTotal > 0 ? Int((Double(quizRight) / Double(quizTotal) * 100).rounded()) : 0
    }

    // MARK: 变位

    var verbs: [Verb] { bank.verbs }
    var tenseNames: [String] { bank.tenseNames }

    var currentVerb: Verb? {
        bank.verbs.indices.contains(verbIndex) ? bank.verbs[verbIndex] : bank.verbs.first
    }

    var currentVerbForms: [String] {
        guard let verb = currentVerb,
              bank.tenseNames.indices.contains(tenseIndex) else { return [] }
        return verb.tenses[bank.tenseNames[tenseIndex]] ?? []
    }

    var verbDueCount: Int {
        let now = Date().timeIntervalSince1970
        return bank.verbs.reduce(into: 0) { partial, verb in
            guard let record = verbMemory[String(verb.id)] else { return }
            if !record.isGraduated && record.dueAt <= now { partial += 1 }
        }
    }

    var currentVerbRecord: MemoryRecord? {
        guard let verb = currentVerb else { return nil }
        return verbMemory[String(verb.id)]
    }

    var verbStageLabel: String {
        guard let verb = currentVerb else { return "" }
        guard let record = verbMemory[String(verb.id)] else { return "新动词 · 待背诵" }
        if record.isGraduated { return "已固化 🎓" }
        if record.dueAt <= Date().timeIntervalSince1970 {
            return "待复习 · 阶段 \(record.stage + 1)/\(StudyEngine.graduatedStage)"
        }
        return record.stageLabel
    }

    var verbNextDueText: String {
        guard let record = currentVerbRecord, !record.isGraduated, record.dueAt > 0 else { return "" }
        return "下次 \(Self.formatDate(record.dueAt))"
    }

    func selectVerb(_ index: Int) {
        guard bank.verbs.indices.contains(index) else { return }
        verbIndex = index
        revealedForms = []
    }

    func prevVerb() {
        guard !bank.verbs.isEmpty else { return }
        selectVerb(verbIndex - 1 < 0 ? bank.verbs.count - 1 : verbIndex - 1)
    }

    func nextVerb() {
        guard !bank.verbs.isEmpty else { return }
        selectVerb(verbIndex + 1 >= bank.verbs.count ? 0 : verbIndex + 1)
    }

    func selectTense(_ index: Int) {
        tenseIndex = index
        revealedForms = []
    }

    func toggleMask() {
        maskForms.toggle()
        revealedForms = []
    }

    func revealForm(_ index: Int) {
        if revealedForms.contains(index) { revealedForms.remove(index) }
        else { revealedForms.insert(index) }
    }

    func rateVerb(_ delta: Int) {
        guard let verb = currentVerb else { return }
        let key = String(verb.id)
        let now = Date()
        let result = StudyEngine.advance(previous: verbMemory[key], delta: delta, now: now)
        verbMemory[key] = MemoryRecord(stage: result.stage,
                                      dueAt: result.dueAt,
                                      lastReview: result.lastReview)
        defaults.set(try? JSONEncoder().encode(verbMemory), forKey: Key.verbMemory)

        if result.graduated {
            showToast("变位已固化 🎓")
        } else if delta > 0 {
            showToast("记住了 · \(result.intervalDays)天后")
        } else {
            showToast("忘记了 · 缩短间隔")
        }
    }

    func startVerbReview() {
        let now = Date().timeIntervalSince1970
        guard let due = bank.verbs.first(where: { verb in
            guard let record = verbMemory[String(verb.id)] else { return false }
            return !record.isGraduated && record.dueAt <= now
        }) else {
            showToast("变位暂无待复习，可在变位表逐词背诵")
            activeTab = .verb
            return
        }
        if let index = bank.verbs.firstIndex(where: { $0.id == due.id }) {
            selectVerb(index)
            activeTab = .verb
            showToast("\(verbDueCount) 个动词变位待复习")
        }
    }

    /// 从单词卡跳到对应变位表
    func studyVerbFromCard() {
        guard let current = card else { return }
        guard let index = bank.verbs.firstIndex(where: {
            $0.name == current.fr || current.fr.hasPrefix($0.name)
        }) else {
            showToast("该词暂无变位表")
            return
        }
        selectVerb(index)
        activeTab = .verb
    }

    // MARK: 知识点

    var pointUnits: [PointUnit] { bank.pointUnits }
    var grammarGroups: [GrammarGroup] { bank.grammarGroups }

    var filteredPointUnits: [PointUnit] {
        filterUnit == 0 ? pointUnits : pointUnits.filter { $0.unit == filterUnit }
    }

    var levelOptions: [String] {
        var levels = ["全部"]
        for group in grammarGroups where !levels.contains(group.level) {
            levels.append(group.level)
        }
        return levels
    }

    var filteredGrammarGroups: [GrammarGroup] {
        filterLevel == "全部" ? grammarGroups : grammarGroups.filter { $0.level == filterLevel }
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

    // MARK: 持久化

    private func persistMemory() {
        defaults.set(try? JSONEncoder().encode(memory), forKey: Key.memory)
    }

    private func persistPlan() {
        defaults.set(try? JSONEncoder().encode(plan), forKey: Key.plan)
    }

    private func saveQuizScore() {
        defaults.set(["right": quizRight, "total": quizTotal], forKey: Key.quizScore)
    }

    private static func decode<T: Decodable>(_ type: T.Type, key: String) -> T? {
        guard let data = UserDefaults.standard.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }

    static func formatDate(_ timestamp: TimeInterval) -> String {
        let date = Date(timeIntervalSince1970: timestamp)
        let comps = Calendar.current.dateComponents([.month, .day], from: date)
        return "\(comps.month ?? 1)月\(comps.day ?? 1)日"
    }
}
