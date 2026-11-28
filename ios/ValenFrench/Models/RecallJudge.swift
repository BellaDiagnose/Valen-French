import Foundation

// MARK: - 默写判分（与小程序 pages/common/recall.js 同一套规则）
// 三档：right 完全写对 / near 差一点（重音、冠词、箭头写法）但算对 / wrong 没写对

enum RecallKind {
    case term
    case chem
}

enum RecallVerdict: String {
    case empty
    case wrong
    case near
    case right
}

enum RecallJudge {
    // MARK: 归一化

    private static func base(_ text: String) -> String {
        text
            .replacingOccurrences(of: "[’‘`´]", with: "'", options: .regularExpression)
            .replacingOccurrences(of: "[‐‑–—]", with: "-", options: .regularExpression)
            .replacingOccurrences(of: "（", with: "(")
            .replacingOccurrences(of: "）", with: ")")
            .replacingOccurrences(of: "[，、]", with: ",", options: .regularExpression)
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .lowercased()
    }

    private static func strict(_ text: String) -> String {
        base(text)
            .replacingOccurrences(of: "[.,;:!?。；：！？]", with: "", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static func loose(_ text: String) -> String {
        let folded = base(text)
            .folding(options: .diacriticInsensitive, locale: nil)
            .replacingOccurrences(of: "œ", with: "oe")
            .replacingOccurrences(of: "Œ", with: "oe")
            .replacingOccurrences(of: "æ", with: "ae")
            .replacingOccurrences(of: "Æ", with: "ae")
            .replacingOccurrences(of: "ß", with: "ss")
        return folded.replacingOccurrences(of: "[\\s'-]", with: "", options: .regularExpression)
    }

    private static let subscripts: [Character: String] = [
        "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
        "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9"
    ]

    private static let superscripts: [Character: String] = [
        "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
        "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
        "⁺": "+", "⁻": "-"
    ]

    private static func chem(_ text: String) -> String {
        var raw = base(text)
            .replacingOccurrences(of: "[〖〗［］【】]", with: "", options: .regularExpression)
        raw = raw
            .replacingOccurrences(of: "->", with: "→")
            .replacingOccurrences(of: "=>", with: "→")
            .replacingOccurrences(of: "-->", with: "→")
            .replacingOccurrences(of: "—>", with: "→")
            .replacingOccurrences(of: "⟶", with: "→")
            .replacingOccurrences(of: "⇌", with: "→")
        var mapped = ""
        for character in raw {
            mapped += subscripts[character] ?? superscripts[character] ?? String(character)
        }
        return mapped
            .replacingOccurrences(of: "[×·*]", with: "×", options: .regularExpression)
            .replacingOccurrences(of: "[÷／]", with: "/", options: .regularExpression)
            .replacingOccurrences(of: "=", with: "→")
            .replacingOccurrences(of: "\\s+", with: "", options: .regularExpression)
    }

    private static func stripArticle(_ text: String) -> String {
        text.replacingOccurrences(of: "^(the|a|an)\\s+", with: "", options: .regularExpression)
    }

    // MARK: 判分

    static func judge(_ input: String, answer: String, kind: RecallKind) -> RecallVerdict {
        let typed = input.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !typed.isEmpty else { return .empty }
        switch kind {
        case .chem:
            return chem(typed) == chem(answer) ? .right : .wrong
        case .term:
            let a = strict(typed)
            let b = strict(answer)
            if a == b { return .right }
            if stripArticle(a) == stripArticle(b) { return .right }
            if loose(typed) == loose(answer) { return .near }
            if stripArticle(loose(typed)) == stripArticle(loose(answer)) { return .near }
            return .wrong
        }
    }

    // MARK: 提示（只给骨架，不给答案）

    static func hint(of answer: String, kind: RecallKind) -> String {
        let text = answer.trimmingCharacters(in: .whitespacesAndNewlines)
        if kind == .chem {
            let normalized = text
                .replacingOccurrences(of: "⟶", with: "→")
                .replacingOccurrences(of: "⇌", with: "→")
            let sides = normalized.split(separator: "→", omittingEmptySubsequences: false)
            if sides.count == 2 {
                let count = { (part: Substring) in
                    part.split(separator: "+").filter { !$0.trimmingCharacters(in: .whitespaces).isEmpty }.count
                }
                return "箭头左边 \(count(sides[0])) 个物质 · 右边 \(count(sides[1])) 个物质"
            }
            return "没有箭头，左右用 = 相连 · 前两个字符是“\(text.prefix(2))”"
        }

        let words = text.split(whereSeparator: { $0.isWhitespace }).count
        var parts = ["首字母 \(firstLetter(text))"]
        if words > 1 { parts.append("\(words) 个词") }
        parts.append("\(letterCount(text)) 个字母")
        return parts.joined(separator: " · ")
    }

    private static func firstLetter(_ text: String) -> String {
        for character in text where isLetter(character) { return String(character) }
        return ""
    }

    private static func letterCount(_ text: String) -> Int {
        text.filter(isLetter).count
    }

    private static func isLetter(_ character: Character) -> Bool {
        guard let scalar = character.unicodeScalars.first?.value else { return false }
        return (65...90).contains(scalar)
            || (97...122).contains(scalar)
            || (0x00C0...0x00FF).contains(scalar)
            || scalar == 0x0153 || scalar == 0x0152
            || scalar == 0x00E6 || scalar == 0x00C6
            || scalar == 0x00DF
    }

    // MARK: 公式题是否适合默写

    static func isDictatableFormula(_ text: String) -> Bool {
        guard text.count >= 5 else { return false }
        guard text.range(of: "[A-Za-z]", options: .regularExpression) != nil else { return false }
        for scalar in text.unicodeScalars {
            let value = scalar.value
            if (0x4E00...0x9FFF).contains(value)
                || (0x3000...0x303F).contains(value)
                || (0xFF00...0xFFEF).contains(value) { return false }
        }
        if text.contains("→") || text.contains("=") { return true }
        return text.range(of: "[A-Za-z]\\s*[=×÷/]", options: .regularExpression) != nil
    }
}
