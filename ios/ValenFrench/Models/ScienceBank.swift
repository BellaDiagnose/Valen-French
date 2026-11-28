import Foundation

// MARK: - 科学数据模型（由 export_words.js 从小程序导出）

struct ScienceUnit: Codable, Identifiable, Hashable {
    let key: String
    let label: String
    let book: String?
    let subject: String?
    var id: String { key }
}

struct ScienceKeyword: Codable, Hashable {
    let en: String
    let cn: String
}

struct SciencePoint: Codable, Identifiable, Hashable {
    let id: String
    let unit: String
    let book: String
    let chapter: String
    let cn: String
    let en: String
    let defCn: String
    let defEn: String
    let keywords: [ScienceKeyword]
    let lcTip: String
}

struct ScienceFormula: Codable, Identifiable, Hashable {
    let id: String
    let unit: String
    let type: String?
    let subject: String?
    let cn: String
    let en: String
    let expr: String
    let exprEn: String
    let formula: String
    let cond: String?
    let condEn: String?
    let noteCn: String
    let noteEn: String
    let keywords: [ScienceKeyword]
}

/// 读取 bundle 内的 Science.json（教材目录校对后的生物 / 化学 / 公式）
final class ScienceBank {
    static let shared = ScienceBank()

    let checked: String
    let bioUnits: [ScienceUnit]
    let bioPoints: [SciencePoint]
    let chemUnits: [ScienceUnit]
    let chemPoints: [SciencePoint]
    let formulaUnits: [ScienceUnit]
    let formulas: [ScienceFormula]

    private init() {
        let root: Raw
        if let url = Bundle.main.url(forResource: "Science", withExtension: "json"),
           let data = try? Data(contentsOf: url),
           let decoded = try? JSONDecoder().decode(Raw.self, from: data) {
            root = decoded
        } else {
            root = .empty
        }
        self.checked = root.checked
        self.bioUnits = root.bio.units
        self.bioPoints = root.bio.points
        self.chemUnits = root.chem.units
        self.chemPoints = root.chem.points
        self.formulaUnits = root.formulas.units
        self.formulas = root.formulas.formulas
    }

    func units(for subject: ScienceStore.Subject) -> [ScienceUnit] {
        subject == .bio ? bioUnits : chemUnits
    }

    func points(for subject: ScienceStore.Subject) -> [SciencePoint] {
        subject == .bio ? bioPoints : chemPoints
    }

    func formulas(for subject: ScienceStore.Subject) -> [ScienceFormula] {
        // 公式条目本身没有 subject 字段，归属由 formulaUnits 的 subject 决定
        let keys = Set(formulaUnits.filter { $0.subject == subject.rawValue }.map(\.key))
        return formulas.filter { keys.contains($0.unit) }
    }

    // MARK: 解码容器

    private struct Raw: Decodable {
        struct PointBlock: Decodable {
            let units: [ScienceUnit]
            let points: [SciencePoint]
        }
        struct FormulaBlock: Decodable {
            let units: [ScienceUnit]
            let formulas: [ScienceFormula]
        }

        let version: Int
        let checked: String
        let bio: PointBlock
        let chem: PointBlock
        let formulas: FormulaBlock

        static let empty = Raw(
            version: 0,
            checked: "",
            bio: PointBlock(units: [], points: []),
            chem: PointBlock(units: [], points: []),
            formulas: FormulaBlock(units: [], formulas: [])
        )
    }
}

// MARK: - 方程式排版

/// 化学式 / 方程式的断行：一行放得下就一行，放不下按运算符断成两行，
/// 免得 SwiftUI 在任意空格处折行、留下单独一行孤零零的 6O₂。
/// 断点优先级：箭头 → 等号 → 竖线 → 间隔号；运算符留在断点前那一行的行尾。
/// 与小程序 `common/equation.js`、PWA `eqLayout` 同一套规则。
enum EquationLayout {
    struct Group {
        let op: String
        let text: String
        let isArrow: Bool
    }

    struct Result {
        let fontSize: CGFloat
        let lines: [String]
    }

    private static let operators: Set<String> = ["→", "⇌", "⟶", "=", "+", "·", "｜", "|", "÷", "×", "/", "≈"]
    private static let sizes: [CGFloat] = [17, 15, 13.5, 12]
    private enum BreakRule {
        case arrow, equals, bar, dot
    }

    private static let breaks: [BreakRule] = [.arrow, .equals, .bar, .dot]

    private static func matches(_ rule: BreakRule, _ op: String) -> Bool {
        switch rule {
        case .arrow: return op.contains("→") || op.contains("⇌") || op.contains("⟶")
        case .equals: return op.contains("=")
        case .bar: return op.contains("｜") || op.contains("|")
        case .dot: return op.contains("·")
        }
    }

    private static func isBalanced(_ rule: BreakRule) -> Bool {
        rule == .bar || rule == .dot
    }

    static func layout(_ text: String, width limit: CGFloat) -> Result {
        let groups = tokens(text)
        guard !groups.isEmpty else { return Result(fontSize: sizes[0], lines: []) }

        for size in sizes {
            if width(of: groups, size: size) <= limit {
                return Result(fontSize: size, lines: [line(groups)])
            }
            for rule in breaks {
                let hits = groups.indices.filter { $0 > 0 && matches(rule, groups[$0].op) }
                guard !hits.isEmpty else { continue }
                let balanced = isBalanced(rule)
                let candidates = balanced ? hits : [hits[0]]
                var best: (score: CGFloat, rows: [[Group]])?
                for index in candidates {
                    let rows = split(groups, at: index)
                    let first = width(of: rows[0], size: size)
                    let second = width(of: rows[1], size: size)
                    guard first <= limit, second <= limit else { continue }
                    let score = balanced ? max(first, second) : CGFloat(index)
                    if best == nil || score < best!.score {
                        best = (score, rows)
                    }
                }
                if let found = best {
                    return Result(fontSize: size, lines: found.rows.map { line($0) })
                }
            }
        }
        return Result(fontSize: sizes[sizes.count - 1], lines: [line(groups)])
    }

    // MARK: - 切词

    private static func tokens(_ text: String) -> [Group] {
        var groups: [Group] = []
        var pending = ""
        var word = ""

        func flush() {
            guard !word.isEmpty else { return }
            groups.append(Group(op: pending, text: word, isArrow: false))
            pending = ""
            word = ""
        }

        for character in text {
            let symbol = String(character)
            if character == " " || character == "\t" || character == "\n" {
                flush()
            } else if operators.contains(symbol) {
                flush()
                pending = pending.isEmpty ? symbol : pending + " " + symbol
            } else {
                word.append(character)
            }
        }
        flush()
        if !pending.isEmpty, let last = groups.popLast() {
            groups.append(Group(op: last.op, text: last.text + " " + pending, isArrow: last.isArrow))
        }
        return groups
    }

    private static func split(_ groups: [Group], at index: Int) -> [[Group]] {
        var left = Array(groups[0..<index])
        left.append(Group(op: "", text: groups[index].op, isArrow: true))
        var right: [Group] = []
        for (offset, group) in groups[index...].enumerated() {
            right.append(offset == 0 ? Group(op: "", text: group.text, isArrow: false) : group)
        }
        return [left, right]
    }

    // MARK: - 宽度估算（等宽字体：ASCII 0.62em，中日韩全角 1em）

    private static func charWidth(_ character: Character) -> CGFloat {
        guard let scalar = character.unicodeScalars.first else { return 0.62 }
        return scalar.value >= 0x2E80 ? 1 : 0.62
    }

    private static func width(of row: [Group], size: CGFloat) -> CGFloat {
        var total: CGFloat = 0
        for (index, group) in row.enumerated() {
            if index > 0 { total += 7 }
            if !group.op.isEmpty {
                total += CGFloat(group.op.count) * 0.62 * size + 3
            }
            for character in group.text {
                total += charWidth(character) * size
            }
        }
        return total
    }

    private static func line(_ row: [Group]) -> String {
        row.map { $0.op.isEmpty ? $0.text : $0.op + " " + $0.text }.joined(separator: " ")
    }
}
