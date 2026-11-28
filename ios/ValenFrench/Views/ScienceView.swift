import SwiftUI

/// 科学独立页：七+八年级生物 / 八年级化学
/// 每日背诵卡组（到期 + 当日额度新卡）、公式、自测、复习计划四块
struct ScienceView: View {
    /// 首页模块卡进入时指定学科；为 nil 时沿用上次选择
    var initialSubject: ScienceStore.Subject?

    @Environment(\.dismiss) private var dismiss
    @StateObject private var store = ScienceStore()

    init(initialSubject: ScienceStore.Subject? = nil) {
        self.initialSubject = initialSubject
    }

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Theme.bg.ignoresSafeArea()

                VStack(spacing: 10) {
                    subjectPicker
                    segmentBar

                    ScrollView(showsIndicators: false) {
                        switch store.segment {
                        case .point: pointPane
                        case .formula: formulaPane
                        case .quiz: quizPane
                        case .plan: planPane
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .padding(.horizontal, 16)
                .padding(.top, 8)
                .padding(.bottom, 78)
            }
            .navigationTitle("科学速记")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button {
                        store.toggleLanguage()
                    } label: {
                        Text(store.showEnglish ? "EN" : "中")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(Theme.primary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(Capsule().fill(Theme.chip))
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("完成") { dismiss() }
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Theme.primary)
                }
            }
            .onAppear {
                if let initialSubject { store.selectSubject(initialSubject) }
                store.refreshDay()
            }
            .toast(text: $store.toast)
        }
    }

    // MARK: 顶部切换

    private var subjectPicker: some View {
        Picker("学科", selection: Binding(
            get: { store.subject },
            set: { store.selectSubject($0) }
        )) {
            ForEach(ScienceStore.Subject.allCases) { Text($0.label).tag($0) }
        }
        .pickerStyle(.segmented)
    }

    private var segmentBar: some View {
        HStack(spacing: 4) {
            ForEach(ScienceStore.Segment.allCases) { item in
                let active = store.segment == item
                Button { store.selectSegment(item) } label: {
                    Text(item.label)
                        .font(.system(size: 12, weight: active ? .bold : .semibold))
                        .foregroundColor(active ? .white : Theme.sub)
                        .frame(maxWidth: .infinity)
                        .frame(height: 34)
                        .background(
                            RoundedRectangle(cornerRadius: 11, style: .continuous)
                                .fill(active ? Theme.primary : Theme.chip)
                        )
                }
                .buttonStyle(.plain)
            }
        }
    }

    // MARK: 每日背诵（卡组）

    private var pointPane: some View {
        VStack(spacing: 12) {
            deckHeader

            if store.queueKind == .point, !store.queueIDs.isEmpty {
                queueChip
            }

            if let point = store.currentPoint {
                cardMeta(text: "第 \(store.pointIndex + 1) 张 · \(store.stageLabel(point.id))",
                         tail: "剩余 \(store.deckPoints.count) 张")

                ZStack {
                    pointFront.opacity(store.flipped ? 0 : 1)
                    pointBack
                        .opacity(store.flipped ? 1 : 0)
                        .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                }
                .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
                .animation(.easeInOut(duration: 0.42), value: store.flipped)
                .frame(maxWidth: .infinity, minHeight: 320, maxHeight: 380)
                .contentShape(Rectangle())
                .onTapGesture { store.flip() }
                .cardSurface(radius: 22, padding: 0)

                deckActions
            } else {
                deckEmpty
            }
        }
        .padding(.bottom, 10)
    }

    private var deckHeader: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                VStack(alignment: .leading, spacing: 3) {
                    Text("\(store.subject.label) · 今日背诵")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(Theme.ink)
                    Text(deckSubtitle)
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Theme.sub)
                }
                Spacer(minLength: 0)
                Text(remainingText)
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(Theme.primary)
            }
            ProgressTrack(fraction: store.deckProgress)
        }
        .cardSurface(radius: 18, padding: 14)
    }

    private var deckSubtitle: String {
        let head = "今日 \(store.reviewedToday) / \(store.deckTotal)"
        if store.queueKind == .point {
            return "\(head) · \(store.queueMode.label) \(store.queueIDs.count) 条"
        }
        return "\(head) · 到期 \(store.deckDue.count) · 新卡 \(store.deckFresh.count)"
    }

    private var remainingText: String {
        store.queueKind == .point
            ? "剩余 \(store.queueIDs.count) 张"
            : "剩余 \(store.deckIDs.count) 张"
    }

    private var queueChip: some View {
        HStack {
            Button { store.exitQueue() } label: {
                Text("\(store.queueLabel) ✕")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(store.queueMode == .study ? .white : Theme.primary)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Capsule().fill(store.queueMode == .study
                                               ? Theme.warn
                                               : Theme.primary.opacity(0.12)))
            }
            .buttonStyle(.plain)
            Spacer(minLength: 0)
        }
    }

    private var pointFront: some View {
        VStack(spacing: 12) {
            Text(store.currentPoint?.chapter ?? "")
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(Theme.primary)
                .padding(.horizontal, 12)
                .padding(.vertical, 5)
                .background(Capsule().fill(Theme.primary.opacity(0.1)))

            Text(store.currentLabel)
                .font(.system(size: 28, weight: .bold, design: .rounded))
                .foregroundColor(Theme.ink)
                .multilineTextAlignment(.center)
                .minimumScaleFactor(0.7)

            Spacer(minLength: 6)

            Text("点击卡片翻面看\(store.showEnglish ? "中文" : "英文")解释与 LC 关键词")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var pointBack: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 12) {
                Text(store.currentLabel)
                    .font(.system(size: 20, weight: .bold))
                    .foregroundColor(Theme.ink)

                Text(store.showEnglish
                     ? (store.currentPoint?.defEn ?? "")
                     : (store.currentPoint?.defCn ?? ""))
                    .font(.system(size: 14))
                    .foregroundColor(Theme.ink)
                    .lineSpacing(4)

                if let keywords = store.currentPoint?.keywords, !keywords.isEmpty {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("LC 关键词").font(.system(size: 12, weight: .bold))
                            .foregroundColor(Theme.primary)
                        ForEach(keywords, id: \.en) { word in
                            HStack(alignment: .firstTextBaseline, spacing: 6) {
                                Text(word.en).font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(Theme.ink)
                                Text("/ \(word.cn)").font(.system(size: 12))
                                    .foregroundColor(Theme.sub)
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                    .background(RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .fill(Theme.accentSoft))
                }

                if let tip = store.currentPoint?.lcTip {
                    Text(tip)
                        .font(.system(size: 12))
                        .foregroundColor(Theme.sub)
                        .lineSpacing(3)
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(RoundedRectangle(cornerRadius: 22, style: .continuous).fill(Theme.surface))
    }

    private var deckActions: some View {
        VStack(spacing: 10) {
            HStack(spacing: 12) {
                Button { store.rate(-1) } label: {
                    Text("忘记了 ↻")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Color(hex: 0xC23B3B))
                        .frame(maxWidth: .infinity)
                        .frame(height: 46)
                        .background(RoundedRectangle(cornerRadius: 13, style: .continuous)
                            .fill(Color(hex: 0xC23B3B).opacity(0.1)))
                }
                Button { store.rate(1) } label: {
                    Text("记住了 ✓")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 46)
                        .background(RoundedRectangle(cornerRadius: 13, style: .continuous)
                            .fill(Theme.primary))
                }
            }
            .buttonStyle(.plain)

            HStack(spacing: 12) {
                Button { store.showPoint(store.pointIndex - 1) } label: {
                    Text("← 上一个")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 38)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
                Button { store.showPoint(store.pointIndex + 1) } label: {
                    Text("下一个 →")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 38)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
            }
            .buttonStyle(.plain)

            Text("评完自动下一张 · 记住了隔更久再背，忘记了明天重来")
                .font(.system(size: 10.5, weight: .medium))
                .foregroundColor(Theme.sub)
                .multilineTextAlignment(.center)
        }
    }

    private var deckEmpty: some View {
        VStack(spacing: 10) {
            Image(systemName: "checkmark.seal.fill")
                .font(.system(size: 34, weight: .light))
                .foregroundColor(Theme.primary.opacity(0.7))
            Text(store.reviewedToday > 0 ? "今天的卡片背完了" : "今天没有要背的卡片")
                .font(.system(size: 15, weight: .bold))
                .foregroundColor(Theme.ink)
            Text(store.reviewedToday > 0
                 ? "今天共背 \(store.reviewedToday) 张 · 明天按 1→2→4→7 天间隔自动排卡"
                 : "这个科目已全部固化，想回顾去复习计划里翻")
                .font(.system(size: 12))
                .foregroundColor(Theme.sub)
                .multilineTextAlignment(.center)
            Button { store.selectSegment(.plan) } label: {
                Text("看复习计划 →")
            }
            .buttonStyle(SoftButtonStyle(height: 42))
            .padding(.horizontal, 24)
            .padding(.top, 4)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 26)
        .cardSurface(radius: 22, padding: 16)
    }

    // MARK: 公式

    private var formulaPane: some View {
        VStack(spacing: 12) {
            if store.queueKind == .formula {
                queueChip
            } else {
                chipRow(store.formulaUnitOptions, active: store.formulaUnitFilter) {
                    store.setFormulaUnitFilter($0)
                }
            }

            if let formula = store.currentFormula {
                cardMeta(text: "第 \(store.formulaIndex + 1) 张 · \(store.stageLabel("f" + formula.id))",
                         tail: "共 \(store.formulas.count) 张")

                ZStack {
                    formulaFront.opacity(store.flipped ? 0 : 1)
                    formulaBack
                        .opacity(store.flipped ? 1 : 0)
                        .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                }
                .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
                .animation(.easeInOut(duration: 0.42), value: store.flipped)
                .frame(maxWidth: .infinity, minHeight: 320, maxHeight: 380)
                .contentShape(Rectangle())
                .onTapGesture { store.flip() }
                .cardSurface(radius: 22, padding: 0)

                formulaActions
            } else {
                EmptyHint(text: "该分类暂无公式")
            }
        }
        .padding(.bottom, 10)
    }

    private var formulaFront: some View {
        VStack(spacing: 14) {
            Text(store.showEnglish ? (store.currentFormula?.en ?? "") : (store.currentFormula?.cn ?? ""))
                .font(.system(size: 24, weight: .bold, design: .rounded))
                .foregroundColor(Theme.ink)
                .multilineTextAlignment(.center)

            formulaLines()

            Spacer(minLength: 4)
            Text("点击翻面看表达式、条件与 LC 提示")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    /// 方程式按运算符断行（一行放得下就一行），不让 SwiftUI 在任意空格处折
    private func formulaLines(centered: Bool = true) -> some View {
        let layout = EquationLayout.layout(store.currentFormula?.formula ?? "", width: 300)
        return VStack(alignment: centered ? .center : .leading, spacing: 2) {
            ForEach(Array(layout.lines.enumerated()), id: \.offset) { _, line in
                Text(line)
                    .font(.system(size: layout.fontSize, weight: .semibold, design: .monospaced))
                    .foregroundColor(Theme.primary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
        }
        .frame(maxWidth: .infinity, alignment: centered ? .center : .leading)
    }

    private var formulaBack: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 12) {
                Text(store.showEnglish ? (store.currentFormula?.exprEn ?? "") : (store.currentFormula?.expr ?? ""))
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Theme.ink)

                formulaLines(centered: false)

                if let cond = store.currentFormula?.cond, !cond.isEmpty {
                    Text("条件：\(store.showEnglish ? (store.currentFormula?.condEn ?? cond) : cond)")
                        .font(.system(size: 13))
                        .foregroundColor(Theme.sub)
                }

                Text(store.showEnglish ? (store.currentFormula?.noteEn ?? "") : (store.currentFormula?.noteCn ?? ""))
                    .font(.system(size: 13))
                    .foregroundColor(Theme.ink)
                    .lineSpacing(4)

                if let words = store.currentFormula?.keywords, !words.isEmpty {
                    Text(words.map { store.showEnglish ? $0.en : $0.cn }.joined(separator: " · "))
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(Theme.primary)
                }
            }
            .padding(20)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(RoundedRectangle(cornerRadius: 22, style: .continuous).fill(Theme.surface))
    }

    private var formulaActions: some View {
        VStack(spacing: 10) {
            HStack(spacing: 12) {
                Button { store.rate(-1) } label: {
                    Text("忘记了")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Color(hex: 0xC23B3B))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(RoundedRectangle(cornerRadius: 13, style: .continuous)
                            .fill(Color(hex: 0xC23B3B).opacity(0.1)))
                }
                Button { store.rate(1) } label: {
                    Text("记住了")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(RoundedRectangle(cornerRadius: 13, style: .continuous)
                            .fill(Theme.primary))
                }
            }
            .buttonStyle(.plain)

            HStack(spacing: 12) {
                Button { store.showFormula(store.formulaIndex - 1) } label: {
                    Text("← 上一个")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 38)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
                Button { store.showFormula(store.formulaIndex + 1) } label: {
                    Text("下一个 →")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 38)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
            }
            .buttonStyle(.plain)
        }
    }

    // MARK: 自测

    private var quizPane: some View {
        VStack(spacing: 14) {
            HStack(spacing: 8) {
                ForEach(ScienceQuizMode.allCases) { mode in
                    Button { store.setQuizMode(mode) } label: {
                        Text(mode.label)
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(store.quizMode == mode ? .white : Theme.sub)
                            .padding(.horizontal, 12)
                            .frame(height: 34)
                            .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(store.quizMode == mode ? Theme.primary : Theme.chip))
                    }
                    .buttonStyle(.plain)
                }
                ForEach(ScienceQuizLang.allCases) { lang in
                    Button { store.setQuizLang(lang) } label: {
                        Text(lang.label)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(store.quizLang == lang ? Theme.primary : Theme.sub)
                            .padding(.horizontal, 10)
                            .frame(height: 34)
                            .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(store.quizLang == lang ? Theme.primary.opacity(0.12) : Theme.chip))
                    }
                    .buttonStyle(.plain)
                }
                Spacer(minLength: 0)
            }

            HStack {
                Text("正确率 \(store.quizAccuracy)% · \(store.quizRight)/\(store.quizTotal)")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(Theme.sub)
                Spacer()
                Button("重置") { store.resetStats() }
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(Theme.primary)
            }

            if let question = store.quiz {
                VStack(spacing: 14) {
                    Text(question.prompt)
                        .font(.system(size: 22, weight: .bold, design: .rounded))
                        .foregroundColor(Theme.ink)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 20)
                        .cardSurface(radius: 20, padding: 14)

                    ForEach(question.options) { option in
                        let isAnswer = option.id == question.answerID
                        let isPicked = option.id == store.quizSelectedID
                        Button { store.answer(option.id) } label: {
                            HStack {
                                Text(option.text)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundColor(Theme.ink)
                                Spacer()
                                if store.quizAnswered && isAnswer {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(Theme.success)
                                } else if store.quizAnswered && isPicked {
                                    Image(systemName: "xmark.circle.fill")
                                        .foregroundColor(Color(hex: 0xC23B3B))
                                }
                            }
                            .padding(.horizontal, 14)
                            .frame(height: 46)
                            .background(
                                RoundedRectangle(cornerRadius: 14, style: .continuous)
                                    .fill(store.quizAnswered && isAnswer
                                          ? Theme.success.opacity(0.14)
                                          : (store.quizAnswered && isPicked
                                             ? Color(hex: 0xC23B3B).opacity(0.12)
                                             : Theme.surface))
                            )
                        }
                        .buttonStyle(.plain)
                        .disabled(store.quizAnswered)
                    }

                    if store.quizAnswered {
                        Text(store.quizCorrect ? "答对了 ✓" : "答错了 · 记忆间隔已缩短")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(store.quizCorrect ? Theme.success : Color(hex: 0xC23B3B))
                        Button { store.nextQuestion() } label: {
                            Text("下一题")
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .frame(height: 44)
                                .background(RoundedRectangle(cornerRadius: 14, style: .continuous)
                                    .fill(Theme.primary))
                        }
                        .buttonStyle(.plain)
                    }
                }
                .cardSurface(radius: 20, padding: 16)
            } else {
                EmptyHint(text: "暂无可出题内容")
            }
        }
        .padding(.bottom, 10)
    }

    // MARK: 复习计划

    private var planPane: some View {
        let buckets = store.planBuckets
        return VStack(spacing: 12) {
            HStack(spacing: 8) {
                planStat("\(buckets.due.count)", "今日待复习", Color(hex: 0xC96F24))
                planStat("\(buckets.learning.count)", "学习中", Theme.primary)
                planStat("\(buckets.fresh.count)", "新卡片", Theme.sub)
                planStat("\(buckets.graduated.count)", "已固化", Theme.success)
            }

            Button { store.startTodayDeck() } label: {
                Text(store.deckIDs.isEmpty
                     ? "开始今日背诵"
                     : "开始今日背诵（\(store.deckIDs.count) 张）")
            }
            .buttonStyle(PrimaryButtonStyle())

            if store.formulaDueCount > 0 {
                formulaEntry
            }

            curveCard

            ForEach(SciencePlanGroup.allCases) { group in
                planGroup(group)
            }

            Text("点清单里任一卡片，可直接从这张背起")
                .font(.system(size: 10.5, weight: .medium))
                .foregroundColor(Theme.sub)
                .frame(maxWidth: .infinity, alignment: .center)
                .padding(.top, 2)
        }
        .padding(.bottom, 10)
    }

    private func planStat(_ value: String, _ label: String, _ tint: Color) -> some View {
        VStack(spacing: 5) {
            Text(value)
                .font(.system(size: 22, weight: .bold, design: .rounded))
                .foregroundColor(tint)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(label)
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(Theme.sub)
                .lineLimit(1)
                .minimumScaleFactor(0.8)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(tint.opacity(0.1))
        )
    }

    private var formulaEntry: some View {
        Button { store.startFormulaReview() } label: {
            HStack(spacing: 10) {
                Image(systemName: "testtube.2")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(Theme.primary)

                VStack(alignment: .leading, spacing: 2) {
                    Text("公式待复习")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(Theme.ink)
                    Text("公式不进每日卡组，单独过一遍")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Theme.sub)
                }

                Spacer(minLength: 0)

                Text("\(store.formulaDueCount) 条 →")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(Theme.primary)
            }
            .cardSurface(radius: 18, padding: 14)
        }
        .buttonStyle(.plain)
    }

    private var curveCard: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text("📈 智能学习计划")
                .font(.system(size: 13, weight: .bold))
                .foregroundColor(Theme.ink)
            Text("每天 \(store.plan.dailyNewCount) 条新卡片，间隔 1→2→4→7→15→30→60 天复习；连续 \(store.plan.streak) 天。当前范围：\(store.subject.label) · \(store.pointCount) 知识点 + \(store.formulaCount) 公式 = \(store.planBuckets.total) 条。")
                .font(.system(size: 11.5))
                .foregroundColor(Theme.sub)
                .lineSpacing(3)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardSurface(radius: 18, padding: 14)
    }

    @ViewBuilder
    private func planGroup(_ group: SciencePlanGroup) -> some View {
        let items = store.planBuckets.items(group)
        if !items.isEmpty {
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 8) {
                    Text(group.title)
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(Theme.ink)
                    Text("\(items.count)")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Capsule().fill(Theme.primary.opacity(0.1)))
                    Spacer(minLength: 0)
                }

                ForEach(Array(items.prefix(30))) { item in
                    Button { store.focus(item, group: group) } label: {
                        HStack(spacing: 8) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(item.title)
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(Theme.ink)
                                    .lineLimit(1)
                                Text(item.sub)
                                    .font(.system(size: 11))
                                    .foregroundColor(Theme.sub)
                                    .lineLimit(1)
                            }
                            Spacer(minLength: 0)
                            Text(item.stageText)
                                .font(.system(size: 10, weight: .medium))
                                .foregroundColor(Theme.sub)
                                .lineLimit(1)
                            Image(systemName: "chevron.right")
                                .font(.system(size: 9, weight: .bold))
                                .foregroundColor(Theme.sub.opacity(0.5))
                        }
                        .padding(.vertical, 7)
                    }
                    .buttonStyle(.plain)
                }

                if items.count > 30 {
                    Text("仅显示前 30 条，主按钮会过全部")
                        .font(.system(size: 10.5, weight: .medium))
                        .foregroundColor(Theme.sub)
                        .padding(.top, 2)
                }
            }
            .cardSurface(radius: 18, padding: 14)
        }
    }

    // MARK: 通用组件

    private func cardMeta(text: String, tail: String) -> some View {
        HStack {
            Text(text)
            Spacer(minLength: 0)
            Text(tail)
        }
        .font(.system(size: 11, weight: .medium))
        .foregroundColor(Theme.sub)
        .padding(.horizontal, 4)
    }

    private func chipRow(_ items: [ScienceUnit], active: String,
                         onSelect: @escaping (String) -> Void) -> some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(items) { item in
                    Button { onSelect(item.key) } label: {
                        Text(item.label)
                            .font(.system(size: 12, weight: active == item.key ? .bold : .semibold))
                            .foregroundColor(active == item.key ? .white : Theme.sub)
                            .padding(.horizontal, 12)
                            .frame(height: 34)
                            .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(active == item.key ? Theme.primary : Theme.chip))
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}

// MARK: - 进度条

private struct ProgressTrack: View {
    let fraction: Double

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.track)
                Capsule()
                    .fill(LinearGradient(colors: [Theme.primary, Theme.primarySoft],
                                         startPoint: .leading,
                                         endPoint: .trailing))
                    .frame(width: fraction <= 0 ? 0 : max(6, geo.size.width * min(fraction, 1)))
                    .animation(.easeOut(duration: 0.45), value: fraction)
            }
        }
        .frame(height: 8)
    }
}
