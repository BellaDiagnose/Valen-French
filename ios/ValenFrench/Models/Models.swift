import Foundation

// MARK: - 词库

enum WordSource: String, CaseIterable, Codable, Identifiable {
    case enavant
    case simple

    var id: String { rawValue }

    var label: String {
        switch self {
        case .enavant: return "En Avant"
        case .simple: return "简明法语"
        }
    }

    /// gid 前缀：En Avant 用 e，简明法语用 c，记忆档案按前缀隔离
    var gidPrefix: String { self == .enavant ? "e" : "c" }
}

struct Word: Identifiable, Hashable {
    let id: String            // gid，例如 e12 / c345
    let source: WordSource
    let fr: String
    let cn: String
    let pos: String           // 简明法语词性；En Avant 为空
    let unit: Int             // 课次 / 单元
    let theme: String
    let example: String
    let exampleCn: String

    var isVerb: Bool { pos.hasPrefix("v.") }

    var unitLabel: String {
        source == .simple ? "第\(unit)课" : "Unit \(unit)"
    }
}

// MARK: - 记忆档案

struct MemoryRecord: Codable, Hashable {
    var stage: Int
    var dueAt: TimeInterval      // 0 表示已固化、不再排期
    var lastReview: TimeInterval

    var isGraduated: Bool { stage >= StudyEngine.graduatedStage }

    var stageLabel: String {
        if isGraduated { return "已固化 🎓" }
        let index = max(0, min(stage, StudyEngine.stageDays.count - 1))
        return "记忆阶段 \(stage + 1)/\(StudyEngine.graduatedStage) · \(StudyEngine.stageDays[index])天间隔"
    }
}

// MARK: - 学习计划

struct StudyPlan: Codable {
    var today: String
    var lastOpenDate: String
    var dailyNewCount: Int
    var queue: [String]
    var doneCount: Int
    var totalStudied: Int
    var lastQuizAccuracy: Double?
    var yesterdayRate: Double?
    var streak: Int
    var forceQuizDone: Bool

    static func initial(today: String) -> StudyPlan {
        StudyPlan(today: today,
                  lastOpenDate: today,
                  dailyNewCount: StudyEngine.defaultDaily,
                  queue: [],
                  doneCount: 0,
                  totalStudied: 0,
                  lastQuizAccuracy: nil,
                  yesterdayRate: nil,
                  streak: 1,
                  forceQuizDone: true)
    }
}

// MARK: - 动词变位

struct Verb: Codable, Identifiable, Hashable {
    let id: Int
    let name: String
    let cn: String
    let group: String
    let tenses: [String: [String]]
    let forms: [PersonForm]

    struct PersonForm: Codable, Hashable {
        let person: String
        let form: String
    }
}

// MARK: - 语法 / 知识点

struct GrammarLesson: Codable, Identifiable, Hashable {
    let lesson: Int
    let level: String
    let stage: String
    let theme: String
    let topic: String
    let points: [String]

    var id: Int { lesson }
    var groupKey: String { "\(level) · \(stage)" }
}

struct EAUnit: Codable, Identifiable, Hashable {
    let unit: Int
    let theme: String
    let wordCount: Int
    var id: Int { unit }
}

struct EAPoint: Codable, Identifiable, Hashable {
    let title: String
    let cn: String
    let unit: Int
    let theme: String
    var id: String { "\(unit)-\(title)" }
}

struct EAExample: Codable, Identifiable, Hashable {
    let fr: String
    let cn: String
    let unit: Int
    let theme: String
    var id: String { "\(unit)-\(fr)" }
}

struct GrammarEnavant: Codable {
    let units: [EAUnit]
    let points: [EAPoint]
    let examples: [EAExample]
}

/// 知识点面板按单元聚合后的模型
struct PointUnit: Identifiable {
    let unit: Int
    let theme: String
    let points: [EAPoint]
    let examples: [EAExample]
    var id: Int { unit }
}

/// 简明法语语法按「等级 · 阶段」聚合
struct GrammarGroup: Identifiable {
    let key: String
    let level: String
    let stage: String
    let lessons: [GrammarLesson]
    var id: String { key }
}
