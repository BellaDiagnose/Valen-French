import Foundation

/// 词库加载器：读取 bundle 内的 Words.json（由 miniprogram 数据无损导出）
final class WordBank {
    static let shared = WordBank()

    let tenseNames: [String]
    let persons: [String]
    let verbs: [Verb]
    let conjugations: [String: [String]]
    let grammarSimple: [GrammarLesson]
    let grammarEnavant: GrammarEnavant

    /// 知识点按单元聚合（含只有例句的单元）
    let pointUnits: [PointUnit]
    /// 简明法语语法按「等级 · 阶段」聚合
    let grammarGroups: [GrammarGroup]

    private let wordsByID: [String: Word]
    private let wordsBySource: [WordSource: [Word]]
    private let lessonCountCache: [WordSource: [Int: Int]]

    private init() {
        let root = WordBank.load() ?? RawFile.empty

        var byID: [String: Word] = [:]
        var bySource: [WordSource: [Word]] = [:]
        var counts: [WordSource: [Int: Int]] = [:]

        let blocks: [(WordSource, RawFile.Source)] = [
            (.enavant, root.sources.enavant),
            (.simple, root.sources.simple)
        ]
        for (source, block) in blocks {
            let list = block.words.map { raw -> Word in
                Word(id: source.gidPrefix + String(raw.id),
                     source: source,
                     fr: raw.fr,
                     cn: raw.cn,
                     pos: raw.pos ?? "",
                     unit: raw.lesson ?? raw.unit ?? 0,
                     theme: raw.theme ?? "",
                     example: raw.example ?? "",
                     exampleCn: raw.exampleCn ?? "")
            }
            bySource[source] = list
            list.forEach { byID[$0.id] = $0 }

            var lessonCount: [Int: Int] = [:]
            list.forEach { lessonCount[$0.unit, default: 0] += 1 }
            counts[source] = lessonCount
        }

        self.tenseNames = root.tenseNames
        self.persons = root.persons
        self.verbs = root.verbs
        self.conjugations = root.conjugations
        self.grammarSimple = root.grammarSimple
        self.grammarEnavant = root.grammarEnavant
        self.wordsByID = byID
        self.wordsBySource = bySource
        self.lessonCountCache = counts
        self.pointUnits = WordBank.buildPointUnits(root.grammarEnavant)
        self.grammarGroups = WordBank.buildGrammarGroups(root.grammarSimple)
    }

    // MARK: 查询

    func words(for source: WordSource) -> [Word] {
        wordsBySource[source] ?? []
    }

    func word(_ id: String) -> Word? {
        wordsByID[id]
    }

    func conjugation(for word: Word) -> [String]? {
        guard word.isVerb else { return nil }
        return conjugations[word.fr]
    }

    func lessonCounts(for source: WordSource) -> [Int: Int] {
        lessonCountCache[source] ?? [:]
    }

    // MARK: 聚合

    private static func buildPointUnits(_ grammar: GrammarEnavant) -> [PointUnit] {
        var order: [Int] = []
        var buckets: [Int: (theme: String, points: [EAPoint])] = [:]
        for point in grammar.points {
            if buckets[point.unit] == nil {
                buckets[point.unit] = (point.theme, [])
                order.append(point.unit)
            }
            buckets[point.unit]?.points.append(point)
        }

        var examplesByUnit: [Int: [EAExample]] = [:]
        for example in grammar.examples {
            examplesByUnit[example.unit, default: []].append(example)
        }
        for unit in examplesByUnit.keys where buckets[unit] == nil {
            let theme = grammar.units.first { $0.unit == unit }?.theme ?? ""
            buckets[unit] = (theme, [])
            order.append(unit)
        }

        return order.sorted().map { unit in
            PointUnit(unit: unit,
                      theme: buckets[unit]?.theme ?? "",
                      points: buckets[unit]?.points ?? [],
                      examples: examplesByUnit[unit] ?? [])
        }
    }

    private static func buildGrammarGroups(_ lessons: [GrammarLesson]) -> [GrammarGroup] {
        var order: [String] = []
        var buckets: [String: [GrammarLesson]] = [:]
        for lesson in lessons {
            let key = lesson.groupKey
            if buckets[key] == nil {
                buckets[key] = []
                order.append(key)
            }
            buckets[key]?.append(lesson)
        }
        return order.map { key in
            let list = buckets[key] ?? []
            return GrammarGroup(key: key,
                                level: list.first?.level ?? "",
                                stage: list.first?.stage ?? "",
                                lessons: list)
        }
    }

    // MARK: 解码

    private static func load() -> RawFile? {
        guard let url = Bundle.main.url(forResource: "Words", withExtension: "json") else {
            assertionFailure("缺少 Words.json 资源")
            return nil
        }
        do {
            let data = try Data(contentsOf: url)
            return try JSONDecoder().decode(RawFile.self, from: data)
        } catch {
            assertionFailure("Words.json 解码失败：\(error)")
            return nil
        }
    }

    private struct RawFile: Decodable {
        struct RawWord: Decodable {
            let id: Int
            let fr: String
            let cn: String
            let pos: String?
            let cat: String?
            let lesson: Int?
            let unit: Int?
            let theme: String?
            let example: String?
            let exampleCn: String?
        }

        struct Source: Decodable {
            let label: String
            let words: [RawWord]
        }

        struct Sources: Decodable {
            let enavant: Source
            let simple: Source
        }

        let tenseNames: [String]
        let persons: [String]
        let sources: Sources
        let verbs: [Verb]
        let conjugations: [String: [String]]
        let grammarSimple: [GrammarLesson]
        let grammarEnavant: GrammarEnavant

        static let empty = RawFile(
            tenseNames: ["现在时", "未完成过去时", "复合过去时", "简单将来时", "过去将来时"],
            persons: ["je", "tu", "il / elle", "nous", "vous", "ils / elles"],
            sources: Sources(enavant: Source(label: "En Avant", words: []),
                             simple: Source(label: "简明法语", words: [])),
            verbs: [],
            conjugations: [:],
            grammarSimple: [],
            grammarEnavant: GrammarEnavant(units: [], points: [], examples: [])
        )
    }
}
