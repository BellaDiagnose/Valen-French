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
