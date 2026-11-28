import SwiftUI

// MARK: - 默写题（与小程序 recallPool / recall.wxml 对齐）

struct ScienceRecallItem {
    let gid: String
    let kind: RecallKind
    let tag: String
    let prompt: String
    let sub: String
    let answer: String
    let extra: String
}

/// 自测「默写」：不给选项，自己写英文术语 / 化学方程式，写完对答案
struct ScienceRecallView: View {
    @ObservedObject var store: ScienceStore

    @State private var current: ScienceRecallItem?
    @State private var asked: [String] = []
    @State private var input = ""
    @State private var verdict: RecallVerdict?
    @State private var statusText = ""

    var body: some View {
        VStack(spacing: 10) {
            if let item = current {
                questionCard(item)
                hintBar(item)
                answerField(item)

                if verdict == nil {
                    HStack(spacing: 10) {
                        Button { submit() } label: {
                            Text("对答案 ↵")
                                .font(.system(size: 14, weight: .bold))
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .frame(height: 44)
                                .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .fill(Theme.primary))
                        }
                        .buttonStyle(.plain)

                        Button { reveal() } label: {
                            Text("不会，看答案")
                                .font(.system(size: 13, weight: .bold))
                                .foregroundColor(Theme.primary)
                                .frame(maxWidth: .infinity)
                                .frame(height: 44)
                                .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .fill(Theme.chip))
                        }
                        .buttonStyle(.plain)
                    }
                } else {
                    resultCard(item)
                    Button { next() } label: {
                        Text("下一题 →")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 44)
                            .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(Theme.primary))
                    }
                    .buttonStyle(.plain)
                }
            } else {
                EmptyHint(text: "这一类没有可默写的条目")
            }
        }
        .padding(.bottom, 10)
        .onAppear { if current == nil { next() } }
    }

    // MARK: 题面

    private func questionCard(_ item: ScienceRecallItem) -> some View {
        VStack(spacing: 0) {
            Text(item.tag)
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(Theme.primary)
                .lineLimit(1)
                .padding(.horizontal, 9)
                .padding(.vertical, 4)
                .background(Capsule().fill(Theme.chip))
                .padding(.bottom, 11)

            Text(item.prompt)
                .font(.system(size: 22, weight: .heavy))
                .foregroundColor(Theme.ink)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)

            if !item.sub.isEmpty {
                Text(item.sub)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(Color(hex: 0x445D52))
                    .multilineTextAlignment(.center)
                    .padding(.top, 7)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Text(item.kind == .chem
                 ? "看中文名称与反应描述，写出化学式 · 下标打普通数字即可，→ 可写 = 或 ->"
                 : "看中文写 LC 英文术语 · 首字母大小写不限，the / a 可省略")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(hex: 0x8EA196))
                .multilineTextAlignment(.center)
                .padding(.top, 8)
                .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .padding(.horizontal, 15)
        .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.surface))
        .shadow(color: Theme.ink.opacity(0.07), radius: 14, x: 0, y: 5)
    }

    private func hintBar(_ item: ScienceRecallItem) -> some View {
        HStack(alignment: .firstTextBaseline, spacing: 8) {
            Text("提示")
                .font(.system(size: 10, weight: .heavy))
                .foregroundColor(Theme.primary)
                .padding(.horizontal, 6)
                .padding(.vertical, 2)
                .background(RoundedRectangle(cornerRadius: 4, style: .continuous)
                    .fill(Color(hex: 0xD7EDE1)))

            Text(RecallJudge.hint(of: item.answer, kind: item.kind))
                .font(.system(size: 11.5, weight: .medium))
                .foregroundColor(Color(hex: 0x445D52))
                .fixedSize(horizontal: false, vertical: true)

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 11)
        .padding(.vertical, 9)
        .background(RoundedRectangle(cornerRadius: 8, style: .continuous)
            .fill(Color(hex: 0xEEF7F2)))
    }

    private func answerField(_ item: ScienceRecallItem) -> some View {
        TextField(item.kind == .chem
                  ? "例如 6CO2 + 6H2O → C6H12O6 + 6O2"
                  : "在这里写英文术语",
                  text: $input)
            .font(.system(size: 17, weight: .bold))
            .foregroundColor(Theme.ink)
            .submitLabel(.done)
            .disabled(verdict != nil)
            .onSubmit(submit)
            .padding(.horizontal, 14)
            .padding(.vertical, 13)
            .background(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .fill(verdictBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .stroke(verdictBorder, lineWidth: 1)
            )
    }

    private var verdictBackground: Color {
        switch verdict {
        case .right: return Color(hex: 0xF2FBF6)
        case .near: return Color(hex: 0xFDF9EF)
        case .wrong: return Color(hex: 0xFDF4F2)
        default: return Theme.surface
        }
    }

    private var verdictBorder: Color {
        switch verdict {
        case .right: return Color(hex: 0x1F9D63)
        case .near: return Color(hex: 0xD6A13C)
        case .wrong: return Color(hex: 0xD9705F)
        default: return Theme.line
        }
    }

    // MARK: 结果

    private func resultCard(_ item: ScienceRecallItem) -> some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(statusText)
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(verdict == .right ? Theme.success
                                 : (verdict == .near ? Color(hex: 0xB8783C) : Color(hex: 0xB9683C)))
                .fixedSize(horizontal: false, vertical: true)

            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text("正确答案")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(Theme.sub)
                Text(item.answer)
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(Theme.ink)
                    .fixedSize(horizontal: false, vertical: true)
            }

            if !item.extra.isEmpty {
                Text(item.extra)
                    .font(.system(size: 12))
                    .foregroundColor(Theme.sub)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
            .fill(verdictBackground))
    }

    // MARK: 逻辑

    private var pool: [ScienceRecallItem] {
        let bank = ScienceBank.shared
        let name = store.subject.label
        if store.quizMode == .formula {
            return bank.formulas(for: store.subject)
                .filter { RecallJudge.isDictatableFormula($0.formula) }
                .map { formula in
                    let cond = formula.cond ?? ""
                    return ScienceRecallItem(gid: "f" + formula.id,
                                             kind: .chem,
                                             tag: "\(name) · 公式默写",
                                             prompt: formula.cn,
                                             sub: formula.expr,
                                             answer: formula.formula,
                                             extra: cond.isEmpty ? "" : "条件：\(cond)")
                }
        }
        return bank.points(for: store.subject).map { point in
            ScienceRecallItem(gid: point.id,
                              kind: .term,
                              tag: point.chapter,
                              prompt: point.cn,
                              sub: "",
                              answer: point.en,
                              extra: point.defCn)
        }
    }

    private func next() {
        let all = pool
        guard !all.isEmpty else { current = nil; return }
        var candidates = all.filter { !asked.contains($0.gid) }
        var base = asked
        if candidates.isEmpty {
            candidates = all
            base = []
        }
        guard let picked = candidates.randomElement() else { current = nil; return }
        asked = base + [picked.gid]
        current = picked
        input = ""
        verdict = nil
        statusText = ""
    }

    private func submit() {
        guard let item = current, verdict == nil else { return }
        let result = RecallJudge.judge(input, answer: item.answer, kind: item.kind)
        guard result != .empty else {
            store.showToast("先写一点再看答案")
            return
        }
        settle(result, item: item)
    }

    private func reveal() {
        guard let item = current, verdict == nil else { return }
        settle(.wrong, item: item)
    }

    private func settle(_ result: RecallVerdict, item: ScienceRecallItem) {
        verdict = result
        store.recordRecall(gid: item.gid, correct: result != .wrong)
        if result == .right {
            statusText = "写对了 ✓"
        } else if result == .near {
            statusText = item.kind == .chem
                ? "差一点 · 空格或箭号写法不一致，答案本身对"
                : "差一点 · 只差重音、连字符或冠词"
        } else {
            statusText = "没写对 · 对照答案抄一遍"
        }
    }
}
