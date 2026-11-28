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

// 七上/七下 → 七年级；八上/八下/衔接 → 八年级（LC 衔接归入八年级）
private func scienceGradeBucket(_ book: String?) -> String {
    guard let book = book else { return "" }
    switch book.first {
    case "七": return "七"
    case "八", "衔": return "八"
    default: return ""
    }
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

// MARK: - 科学页状态

@MainActor
final class ScienceStore: ObservableObject {
    enum Subject: String, CaseIterable, Identifiable {
        case bio, chem
        var id: String { rawValue }
        var label: String { self == .bio ? "生物" : "化学" }
    }

    enum Segment: String, CaseIterable, Identifiable {
        case point, formula, quiz
        var id: String { rawValue }
        var label: String {
            switch self {
            case .point: return "知识点"
            case .formula: return "公式"
            case .quiz: return "自测"
            }
        }
    }

    private enum Key {
        static let memory = "science_memory_v1"
        static let stats = "science_stats_v1"
        static let subject = "science_subject_v1"
        static let lang = "science_lang_v1"
    }

    private let bank = ScienceBank.shared
    private let defaults = UserDefaults.standard
    private var toastTask: Task<Void, Never>?

    @Published var subject: Subject
    @Published var segment: Segment = .point
    @Published var showEnglish = false
    @Published var gradeFilter = "all"
    @Published var unitFilter = ""
    @Published var formulaUnitFilter = ""
    @Published var pointIndex = 0
    @Published var formulaIndex = 0
    @Published var flipped = false

    @Published var memory: [String: MemoryRecord]
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

        let stats = UserDefaults.standard.dictionary(forKey: Key.stats)
        quizRight = stats?["right"] as? Int ?? 0
        quizTotal = stats?["total"] as? Int ?? 0

        buildQuiz()
    }

    // MARK: 列表

    var gradeOptions: [ScienceUnit] {
        [
            ScienceUnit(key: "all", label: "全部", book: nil, subject: nil),
            ScienceUnit(key: "七", label: "七年级", book: nil, subject: nil),
            ScienceUnit(key: "八", label: "八年级", book: nil, subject: nil)
        ]
    }

    var unitOptions: [ScienceUnit] {
        let all = [ScienceUnit(key: "", label: "全部", book: nil, subject: nil)]
        let units = bank.units(for: subject)
        let scoped = gradeFilter == "all"
            ? units
            : units.filter { scienceGradeBucket($0.book) == gradeFilter }
        return all + scoped
    }

    var formulaUnitOptions: [ScienceUnit] {
        let all = [ScienceUnit(key: "", label: "全部", book: nil, subject: nil)]
        return all + bank.formulaUnits.filter { $0.subject == subject.rawValue }
    }

    var filteredPoints: [SciencePoint] {
        let all = bank.points(for: subject)
        let scoped = gradeFilter == "all"
            ? all
            : all.filter { scienceGradeBucket($0.book) == gradeFilter }
        return unitFilter.isEmpty ? scoped : scoped.filter { $0.unit == unitFilter }
    }

    var filteredFormulas: [ScienceFormula] {
        let all = bank.formulas(for: subject)
        return formulaUnitFilter.isEmpty ? all : all.filter { $0.unit == formulaUnitFilter }
    }

    var currentPoint: SciencePoint? {
        guard filteredPoints.indices.contains(pointIndex) else { return nil }
        return filteredPoints[pointIndex]
    }

    var currentFormula: ScienceFormula? {
        guard filteredFormulas.indices.contains(formulaIndex) else { return nil }
        return filteredFormulas[formulaIndex]
    }

    var currentLabel: String {
        if let point = currentPoint { return showEnglish ? point.en : point.cn }
        if let formula = currentFormula { return showEnglish ? formula.en : formula.cn }
        return ""
    }

    var studiedCount: Int {
        let prefix = subject == .bio ? "b" : "c"
        return memory.reduce(into: 0) { partial, item in
            if item.key.hasPrefix(prefix) { partial += 1 }
        }
    }

    // MARK: 导航

    func selectSubject(_ value: Subject) {
        guard value != subject else { return }
        subject = value
        defaults.set(value.rawValue, forKey: Key.subject)
        gradeFilter = "all"
        unitFilter = ""
        formulaUnitFilter = ""
        pointIndex = 0
        formulaIndex = 0
        flipped = false
        askedIDs = []
        quiz = nil
        buildQuiz()
    }

    func selectSegment(_ value: Segment) {
        segment = value
        flipped = false
    }

    func toggleLanguage() {
        showEnglish.toggle()
        defaults.set(showEnglish, forKey: Key.lang)
    }

    func setGradeFilter(_ key: String) {
        gradeFilter = key
        unitFilter = ""
        pointIndex = 0
        flipped = false
        askedIDs = []
        quiz = nil
        buildQuiz()
    }

    func setUnitFilter(_ key: String) {
        unitFilter = key
        pointIndex = 0
        flipped = false
    }

    func setFormulaUnitFilter(_ key: String) {
        formulaUnitFilter = key
        formulaIndex = 0
        flipped = false
    }

    func showPoint(_ index: Int) {
        let count = filteredPoints.count
        guard count > 0 else { return }
        var target = index
        if target < 0 { target = count - 1 }
        if target >= count { target = 0 }
        pointIndex = target
        flipped = false
    }

    func showFormula(_ index: Int) {
        let count = filteredFormulas.count
        guard count > 0 else { return }
        var target = index
        if target < 0 { target = count - 1 }
        if target >= count { target = 0 }
        formulaIndex = target
        flipped = false
    }

    func flip() {
        withAnimation(.easeInOut(duration: 0.4)) { flipped.toggle() }
    }

    // MARK: 记忆评分

    func rate(_ delta: Int) {
        let gid: String?
        if segment == .formula {
            gid = currentFormula.map { "f" + $0.id }
        } else {
            gid = currentPoint?.id
        }
        guard let gid else { return }

        let result = StudyEngine.advance(previous: memory[gid], delta: delta, now: Date())
        memory[gid] = MemoryRecord(stage: result.stage,
                                   dueAt: result.dueAt,
                                   lastReview: result.lastReview)
        defaults.set(try? JSONEncoder().encode(memory), forKey: Key.memory)

        if result.graduated {
            showToast("已固化 🎓")
        } else if delta > 0 {
            showToast("记住了 · \(result.intervalDays)天后")
        } else {
            showToast("忘记了 · 缩短间隔")
        }

        flipped = false
        if segment == .formula { showFormula(formulaIndex + 1) }
        else { showPoint(pointIndex + 1) }
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
        let points = gradeFilter == "all"
            ? bank.points(for: subject)
            : bank.points(for: subject).filter { scienceGradeBucket($0.book) == gradeFilter }
        return points.map { item in
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
        rateQuiz(correct)
    }

    private func rateQuiz(_ correct: Bool) {
        guard let gid = quiz?.answerID else { return }
        let result = StudyEngine.advance(previous: memory[gid], delta: correct ? 1 : -1, now: Date())
        memory[gid] = MemoryRecord(stage: result.stage,
                                   dueAt: result.dueAt,
                                   lastReview: result.lastReview)
        defaults.set(try? JSONEncoder().encode(memory), forKey: Key.memory)
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
