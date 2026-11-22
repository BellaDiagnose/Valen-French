import Foundation

/// study.js 的 Swift 移植：纯逻辑、无 UI 依赖，便于单测
/// 1) 日期/间隔（间隔 ≥ 3 天触发强制自测）
/// 2) 每日新词队列（默认 20，按单元顺序从未学词中取）
/// 3) 动态调节额度（依据自测正确率 + 昨日完成率）
/// 4) 记忆阶段推进（艾宾浩斯 1/2/4/7/15/30/60 天）
enum StudyEngine {
    static let stageDays = [1, 2, 4, 7, 15, 30, 60]
    static let graduatedStage = stageDays.count
    static let defaultDaily = 20
    static let minDaily = 10
    static let maxDaily = 30
    static let forceGapDays = 3
    static let forceQuizQuestions = 10

    private static let calendar: Calendar = {
        var c = Calendar(identifier: .gregorian)
        c.timeZone = .current
        return c
    }()

    // MARK: 日期工具（本地日期，避免 UTC 偏移）

    static func dayString(_ date: Date = Date()) -> String {
        let c = calendar.dateComponents([.year, .month, .day], from: date)
        let y = c.year ?? 1970
        let m = c.month ?? 1
        let d = c.day ?? 1
        return String(format: "%04d-%02d-%02d", y, m, d)
    }

    /// 解析 yyyy-MM-dd，取当天中午，规避夏令时导致的 23/25 小时误差
    static func parseDay(_ string: String) -> Date? {
        let parts = string.split(separator: "-").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        var comps = DateComponents()
        comps.year = parts[0]
        comps.month = parts[1]
        comps.day = parts[2]
        comps.hour = 12
        return calendar.date(from: comps)
    }

    static func daysBetween(_ from: String, _ to: String) -> Int {
        guard let a = parseDay(from), let b = parseDay(to) else { return 0 }
        return Int((b.timeIntervalSince(a) / 86_400).rounded())
    }

    static func startOfToday(_ date: Date = Date()) -> TimeInterval {
        calendar.startOfDay(for: date).timeIntervalSince1970
    }

    // MARK: 打开时的状态

    struct OpenState {
        let today: String
        let gap: Int
        let crossDay: Bool
        let forceQuiz: Bool
    }

    static func openState(plan: StudyPlan, now: Date = Date()) -> OpenState {
        let today = dayString(now)
        let gap = plan.lastOpenDate.isEmpty ? 0 : daysBetween(plan.lastOpenDate, today)
        return OpenState(today: today,
                         gap: gap,
                         crossDay: plan.today != today,
                         forceQuiz: !plan.lastOpenDate.isEmpty && gap >= forceGapDays)
    }

    // MARK: 动态额度

    static func adjustDaily(current: Int, accuracy: Double?, completion: Double?) -> Int {
        var n = current > 0 ? current : defaultDaily
        if let accuracy = accuracy {
            if accuracy >= 0.85 { n += 5 }
            else if accuracy < 0.6 { n -= 5 }
        }
        if let completion = completion, completion < 0.5 { n -= 5 }
        return max(minDaily, min(maxDaily, n))
    }

    // MARK: 今日新词队列

    static func pickNewWords(words: [Word], memory: [String: MemoryRecord], count: Int) -> [String] {
        var picked: [String] = []
        for word in words where picked.count < count {
            if memory[word.id] == nil { picked.append(word.id) }
        }
        return picked
    }

    // MARK: 生成/刷新今日计划

    static func buildDailyPlan(plan: StudyPlan,
                               state: OpenState,
                               words: [Word],
                               memory: [String: MemoryRecord]) -> StudyPlan {
        var next = plan
        let yesterdayCompletion: Double? = plan.queue.isEmpty
            ? nil
            : Double(plan.doneCount) / Double(plan.queue.count)

        if state.crossDay {
            next.dailyNewCount = adjustDaily(current: plan.dailyNewCount,
                                             accuracy: plan.lastQuizAccuracy,
                                             completion: yesterdayCompletion)
            next.queue = pickNewWords(words: words, memory: memory, count: next.dailyNewCount)
            next.doneCount = 0
            next.yesterdayRate = yesterdayCompletion
            next.today = state.today
            next.streak = (yesterdayCompletion ?? 0) > 0 ? plan.streak + 1 : 1
        }

        next.lastOpenDate = state.today
        if state.forceQuiz { next.forceQuizDone = false }
        return next
    }

    // MARK: 记忆推进

    struct AdvanceResult {
        let stage: Int
        let dueAt: TimeInterval
        let lastReview: TimeInterval
        let graduated: Bool

        var intervalDays: Int {
            graduated ? 0 : stageDays[min(max(stage, 0), stageDays.count - 1)]
        }
    }

    static func advance(previous: MemoryRecord?, delta: Int, now: Date = Date()) -> AdvanceResult {
        let prevStage = previous?.stage ?? -1
        let stage = delta > 0
            ? min(graduatedStage, prevStage + 1)
            : max(0, prevStage - 1)
        let ts = now.timeIntervalSince1970
        let due: TimeInterval = stage >= graduatedStage
            ? 0
            : ts + Double(stageDays[min(stage, stageDays.count - 1)]) * 86_400
        return AdvanceResult(stage: stage, dueAt: due, lastReview: ts, graduated: stage >= graduatedStage)
    }
}
