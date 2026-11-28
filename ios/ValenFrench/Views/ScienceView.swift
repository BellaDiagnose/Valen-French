import SwiftUI

// MARK: - 自测方式

enum ScienceQuizWay: String, CaseIterable, Identifiable {
    case choice, recall
    var id: String { rawValue }
    var label: String { self == .choice ? "四选一" : "默写" }
}

/// 科学独立页：七+八年级生物 / 八年级化学
/// 与法语页、首页平行，共用 RootView 的 PageNavBar；切科目走顶栏圆环下拉。
/// 结构与小程序 pages/science 对齐：四 tab（每日背诵 / 公式 / 自测 / 复习计划）
struct ScienceView: View {
    /// 首页模块卡 / 顶栏下拉进入时指定学科
    var initialSubject: ScienceStore.Subject?
    /// 顶栏下拉选中的模块交回 RootView 切换根页面
    var onNavigate: (ModuleNavTarget) -> Void
    /// 学科变化同步给 RootView，用于顶栏显示准确的科目名
    var onSubjectChange: (ScienceStore.Subject) -> Void
    /// 今日已背 / 卡组进度，同步给顶栏圆环
    var onStatsChange: (Int, Double) -> Void

    @StateObject private var store = ScienceStore()
    @State private var quizWay: ScienceQuizWay = .choice

    init(initialSubject: ScienceStore.Subject? = nil,
         onNavigate: @escaping (ModuleNavTarget) -> Void = { _ in },
         onSubjectChange: @escaping (ScienceStore.Subject) -> Void = { _ in },
         onStatsChange: @escaping (Int, Double) -> Void = { _, _ in }) {
        self.initialSubject = initialSubject
        self.onNavigate = onNavigate
        self.onSubjectChange = onSubjectChange
        self.onStatsChange = onStatsChange
    }

    var body: some View {
        ZStack {
            Theme.bg.ignoresSafeArea()

            VStack(spacing: 0) {
                tabBar

                Group {
                    switch store.segment {
                    case .point: pointPane
                    case .formula: formulaPane
                    case .quiz: ScrollView(showsIndicators: false) { quizPane }
                    case .plan: ScrollView(showsIndicators: false) { planPane }
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            .padding(.horizontal, 15)
            .padding(.bottom, 12)
        }
        .toast(text: $store.toast)
        .onAppear {
            if let initialSubject { store.selectSubject(initialSubject) }
            store.refreshDay()
            onSubjectChange(store.subject)
            pushStats()
        }
        .onChange(of: store.subject) { value in
            onSubjectChange(value)
            pushStats()
        }
        .onChange(of: statsToken) { _ in pushStats() }
        // 顶栏下拉选了另一个学科：本页自己切换（页面不重建）
        .onChange(of: initialSubject) { value in
            if let value { store.selectSubject(value) }
        }
    }

    private var statsToken: String {
        "\(store.reviewedToday)/\(store.deckTotal)"
    }

    private func pushStats() {
        onStatsChange(store.reviewedToday, store.deckProgress)
    }

    private var tabBar: some View {
        HStack(spacing: 2) {
            ForEach(ScienceStore.Segment.allCases) { item in
                let active = store.segment == item
                Button { store.selectSegment(item) } label: {
                    Text(item.label)
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(active ? Theme.primary : Color(hex: 0x53675D))
                        .lineLimit(1)
                        .minimumScaleFactor(0.8)
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(
                            RoundedRectangle(cornerRadius: 10, style: .continuous)
                                .fill(active ? Theme.surface : Color.clear)
                                .shadow(color: active ? Theme.primary.opacity(0.18) : .clear,
                                        radius: 7, x: 0, y: 3)
                        )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(5)
        .background(
            RoundedRectangle(cornerRadius: 13, style: .continuous)
                .fill(Color(hex: 0xE3F0E9))
        )
        .shadow(color: Theme.ink.opacity(0.05), radius: 10, x: 0, y: 3)
        .padding(.top, 10)
        .padding(.bottom, 16)
    }

    // MARK: 模块一 每日背诵

    private var pointPane: some View {
        VStack(spacing: 10) {
            unitPicker

            deckHead

            if store.currentPoint != nil {
                flashCard(front: pointFront, back: pointBack)

                actionRow(isFormula: false)
                rateHint
            } else {
                deckEmpty
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    /// 章节切换：与法语单词卡的课次 chip 同款（横向滚动、双行、选中实心）
    private var unitPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(store.pointUnitOptions) { unit in
                    let active = store.pointUnitFilter == unit.key
                    Button {
                        store.setPointUnitFilter(unit.key)
                    } label: {
                        VStack(spacing: 1) {
                            Text(store.shortUnitLabel(unit))
                                .font(.system(size: 13, weight: .semibold))
                                .lineLimit(1)
                            Text("\(store.unitPointCount(unit.key)) 条")
                                .font(.system(size: 10, weight: .medium))
                                .opacity(0.75)
                        }
                        .foregroundColor(active ? .white : Theme.sub)
                        .padding(.horizontal, 13)
                        .frame(height: 48)
                        .background(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .fill(active ? Theme.primary : Theme.chip)
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.vertical, 2)
        }
        .frame(height: 52)
    }

    /// 卡组头标题：选了章节就显示完整章节名
    private var deckTitle: String {
        let unit = store.pointUnitTitle
        return unit.isEmpty ? "\(store.subject.label) · 今日背诵" : "\(store.subject.label) · \(unit)"
    }

    /// 今日卡组头：标题 + 今日进度、全宽进度条、到期/新卡 + 阶段，三级信息一列到底
    /// （小程序 pages/science 的 .deck-head 同构）
    private var deckHead: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(deckTitle)
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(Color(hex: 0x14352A))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                    .layoutPriority(1)

                Spacer(minLength: 4)

                if store.deckTotal > 0 { deckFraction }
            }

            if store.deckTotal > 0 {
                ProgressTrack(fraction: store.deckProgress,
                              tint: Color(hex: 0xD5E8DD),
                              height: 6)
                    .padding(.top, 7)
            }

            HStack(spacing: 10) {
                deckQueueTag
                Spacer(minLength: 0)
                deckStagePill
            }
            .padding(.top, 7)
        }
        .padding(.bottom, 4)
    }

    /// 右上角今日进度：今日 N / 总数
    private var deckFraction: some View {
        HStack(alignment: .firstTextBaseline, spacing: 2) {
            Text("今日")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Color(hex: 0x7D9187))
                .padding(.trailing, 3)
            Text("\(store.reviewedToday)")
                .font(.system(size: 17, weight: .heavy, design: .rounded))
                .foregroundColor(Theme.primary)
            Text("/\(store.deckTotal)")
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(Color(hex: 0x8EA196))
        }
    }

    /// 左下：队列中显示可点的「浏览 · N 条 ✕」，否则显示到期/新卡
    @ViewBuilder
    private var deckQueueTag: some View {
        if store.queueKind == .point {
            let tone: Color = store.queueMode == .study ? Color(hex: 0xD6A13C) : Theme.primary
            Button { store.exitQueue() } label: {
                Text("\(store.queueLabel) ✕")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Capsule().fill(tone))
            }
            .buttonStyle(.plain)
        } else {
            HStack(alignment: .firstTextBaseline, spacing: 5) {
                Text("到期")
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: 0x7D9187))
                Text("\(store.deckDue.count)")
                    .font(.system(size: 13, weight: .bold, design: .rounded))
                    .foregroundColor(Color(hex: 0x14352A))
                Text("·")
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: 0xC3D4C9))
                    .padding(.horizontal, 4)
                Text("新卡")
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: 0x7D9187))
                Text("\(store.deckFresh.count)")
                    .font(.system(size: 13, weight: .bold, design: .rounded))
                    .foregroundColor(Color(hex: 0x14352A))
            }
        }
    }

    /// 右下：当前卡的记忆阶段
    @ViewBuilder
    private var deckStagePill: some View {
        if let point = store.currentPoint {
            Text(store.stageLabel(point.id))
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(Color(hex: 0x0D7A50))
                .lineLimit(1)
                .minimumScaleFactor(0.8)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(Capsule().fill(Theme.chip))
        }
    }

    private func cardMeta(counter: String, stage: String, queue: String?) -> some View {
        HStack(spacing: 8) {
            if let queue {
                Button { store.exitQueue() } label: {
                    Text("\(queue) ✕")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(Theme.primary.opacity(0.1)))
                }
                .buttonStyle(.plain)
            }
            Text(counter)
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(hex: 0x8EA196))
            Text(stage)
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(Theme.primary)
                .lineLimit(1)
                .minimumScaleFactor(0.75)
                .padding(.horizontal, 10)
                .padding(.vertical, 4)
                .background(Capsule().fill(Theme.chip))
            Spacer(minLength: 0)
        }
    }

    /// 双面翻卡：正面白→薄荷渐变，背面薄荷→白渐变
    private func flashCard<Front: View, Back: View>(front: Front, back: Back) -> some View {
        ZStack {
            front.opacity(store.flipped ? 0 : 1)
            back
                .opacity(store.flipped ? 1 : 0)
                .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
        }
        .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
        .animation(.easeInOut(duration: 0.42), value: store.flipped)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .onTapGesture { store.flip() }
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .shadow(color: Theme.ink.opacity(0.1), radius: 18, x: 0, y: 8)
    }

    // MARK: 知识点正面

    private var pointFront: some View {
        let point = store.currentPoint
        let english = store.showEnglish
        return VStack(spacing: 0) {
            HStack {
                tagPill("\(point?.chapter ?? "") · \(store.subject.label)")
                Spacer(minLength: 0)
            }

            Spacer(minLength: 10)

            VStack(spacing: 10) {
                Text(english ? (point?.en ?? "") : (point?.cn ?? ""))
                    .font(english
                          ? .system(size: 22, weight: .bold, design: .serif)
                          : .system(size: 25, weight: .heavy, design: .rounded))
                    .foregroundColor(english ? Theme.primary : Color(hex: 0x14352A))
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.7)
                    .fixedSize(horizontal: false, vertical: true)

                Text(english ? (point?.cn ?? "") : (point?.en ?? ""))
                    .font(.system(size: 15, weight: .semibold, design: .serif))
                    .foregroundColor(Color(hex: 0x128A80))
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)

                Text(english ? (point?.defEn ?? "") : (point?.defCn ?? ""))
                    .font(.system(size: 13.5, weight: .regular))
                    .foregroundColor(Color(hex: 0x445D52))
                    .lineSpacing(4)
                    .lineLimit(6)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 4)
            }

            Spacer(minLength: 10)

            HStack(spacing: 5) {
                Text("\(point?.keywords.count ?? 0) 个 LC 关键词")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(Theme.primary)
                Text("·")
                    .foregroundColor(Color(hex: 0x8EA196))
                Text("LC 答题方法")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Color(hex: 0x8EA196))
            }

            Text("点击卡片查看\(english ? "中文" : "英文")定义 ↻")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(hex: 0x8EA196))
                .padding(.top, 12)
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(colors: [.white, Color(hex: 0xF4FBF7)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
    }

    // MARK: 知识点背面

    private var pointBack: some View {
        let point = store.currentPoint
        let english = store.showEnglish
        return VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(english ? (point?.cn ?? "") : (point?.en ?? ""))
                    .font(.system(size: 17, weight: .heavy))
                    .foregroundColor(Color(hex: 0x14352A))
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 4)
                langButton
            }
            .padding(.bottom, 10)
            .overlay(alignment: .bottom) {
                Rectangle().fill(Theme.line).frame(height: 1)
            }

            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 12) {
                    block(label: english ? "中文解释" : "Leaving Certificate Definition",
                          text: english ? (point?.defCn ?? "") : (point?.defEn ?? ""))

                    keywordBlock(point?.keywords ?? [])

                    VStack(alignment: .leading, spacing: 5) {
                        blockLabel("答题方法 · LC Exam tip")
                        Text(point?.lcTip ?? "")
                            .font(.system(size: 13))
                            .foregroundColor(Color(hex: 0x2E4C41))
                            .lineSpacing(4)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(10)
                    .background(RoundedRectangle(cornerRadius: 8, style: .continuous)
                        .fill(Theme.chip))
                }
                .padding(.top, 12)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .padding(16)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(colors: [Color(hex: 0xEDF7F1), .white],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
    }

    // MARK: 模块二 公式

    private var formulaPane: some View {
        VStack(spacing: 10) {
            if store.queueKind == .formula {
                HStack {
                    Button { store.exitQueue() } label: {
                        Text("\(store.queueLabel) ✕")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(Theme.primary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(Capsule().fill(Theme.primary.opacity(0.1)))
                    }
                    .buttonStyle(.plain)
                    Spacer(minLength: 0)
                }
            } else {
                chipRow(store.formulaUnitOptions, active: store.formulaUnitFilter) {
                    store.setFormulaUnitFilter($0)
                }
            }

            if let formula = store.currentFormula {
                cardMeta(counter: "\(store.formulaIndex + 1) / \(store.formulas.count)",
                         stage: store.stageLabel("f" + formula.id),
                         queue: store.queueKind == .formula ? store.queueLabel : nil)

                flashCard(front: formulaFront, back: formulaBack)
                actionRow(isFormula: true)
            } else {
                EmptyHint(text: "该分类下暂无公式")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var formulaFront: some View {
        let formula = store.currentFormula
        let english = store.showEnglish
        let layout = EquationLayout.layout(formula?.formula ?? "", width: 300)
        return VStack(spacing: 0) {
            HStack {
                tagPill("\(english ? (formula?.en ?? "") : (formula?.cn ?? "")) · \(store.subject.label)")
                Spacer(minLength: 0)
            }

            Spacer(minLength: 8)

            Text(english ? (formula?.exprEn ?? "") : (formula?.expr ?? ""))
                .font(.system(size: 17, weight: .bold))
                .foregroundColor(Color(hex: 0x14352A))
                .multilineTextAlignment(.center)
                .lineLimit(2)
                .fixedSize(horizontal: false, vertical: true)

            VStack(spacing: 3) {
                ForEach(Array(layout.lines.enumerated()), id: \.offset) { _, line in
                    formulaText(line, size: layout.fontSize)
                        .lineLimit(1)
                        .minimumScaleFactor(0.8)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.top, 14)

            Spacer(minLength: 8)

            Text("点击卡片查看含义与考点 ↻")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Color(hex: 0x8EA196))
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(colors: [.white, Color(hex: 0xF4FBF7)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
    }

    /// 运算符灰色、化学式绿色（小程序 eq-op / eq-tok 同款）
    private func formulaText(_ line: String, size: CGFloat) -> Text {
        let operators: Set<String> = ["→", "⇌", "⟶", "=", "+", "·", "｜", "|", "÷", "×", "/", "≈"]
        var result = Text("")
        for token in line.split(separator: " ").map(String.init) {
            let color: Color = operators.contains(token)
                ? Color(hex: 0x7D968A)
                : Theme.primary
            result = result + Text(token + " ")
                .foregroundColor(color)
                .font(.system(size: size, weight: .heavy, design: .serif))
        }
        return result
    }

    private var formulaBack: some View {
        let formula = store.currentFormula
        let english = store.showEnglish
        return VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(english ? (formula?.cn ?? "") : (formula?.en ?? ""))
                    .font(.system(size: 17, weight: .heavy))
                    .foregroundColor(Color(hex: 0x14352A))
                    .fixedSize(horizontal: false, vertical: true)
                Spacer(minLength: 4)
                langButton
            }
            .padding(.bottom, 10)
            .overlay(alignment: .bottom) {
                Rectangle().fill(Theme.line).frame(height: 1)
            }

            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 12) {
                    block(label: "条件 · Condition",
                          text: english ? (formula?.condEn ?? formula?.cond ?? "")
                                        : (formula?.cond ?? ""))
                    block(label: english ? "中文说明" : "LC 考点说明",
                          text: english ? (formula?.noteCn ?? "") : (formula?.noteEn ?? ""))
                    keywordBlock(formula?.keywords ?? [])
                }
                .padding(.top, 12)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .padding(16)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(colors: [Color(hex: 0xEDF7F1), .white],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
    }

    // MARK: 卡片通用零件

    private func tagPill(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 11, weight: .semibold))
            .foregroundColor(Color(hex: 0x6B8075))
            .lineLimit(1)
            .truncationMode(.tail)
            .padding(.horizontal, 9)
            .padding(.vertical, 4)
            .background(Capsule().fill(Theme.chip))
    }

    private var langButton: some View {
        Button { store.toggleLanguage() } label: {
            Text(store.showEnglish ? "中 →" : "EN →")
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(.white)
                .padding(.horizontal, 9)
                .padding(.vertical, 5)
                .background(RoundedRectangle(cornerRadius: 6, style: .continuous)
                    .fill(Theme.primary))
        }
        .buttonStyle(.plain)
    }

    private func blockLabel(_ text: String) -> some View {
        Text(text)
            .font(.system(size: 11, weight: .bold))
            .foregroundColor(Theme.primary)
    }

    private func block(label: String, text: String) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            blockLabel(label)
            Text(text)
                .font(.system(size: 13.5))
                .foregroundColor(Color(hex: 0x2E4C41))
                .lineSpacing(4)
                .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func keywordBlock(_ words: [ScienceKeyword]) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            blockLabel("LC 关键词 · Key terms")
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 96), spacing: 6)], spacing: 6) {
                ForEach(words, id: \.en) { word in
                    VStack(alignment: .leading, spacing: 1) {
                        Text(word.en)
                            .font(.system(size: 12.5, weight: .bold))
                            .foregroundColor(Color(hex: 0x14352A))
                            .lineLimit(1)
                            .minimumScaleFactor(0.75)
                        Text(word.cn)
                            .font(.system(size: 10.5))
                            .foregroundColor(Color(hex: 0x6B8075))
                            .lineLimit(1)
                            .minimumScaleFactor(0.75)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 6)
                    .background(
                        RoundedRectangle(cornerRadius: 6, style: .continuous)
                            .fill(Theme.surface)
                            .overlay(RoundedRectangle(cornerRadius: 6, style: .continuous)
                                .stroke(Theme.line, lineWidth: 1))
                    )
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    /// 一行四个按钮：← 上一个 / 记住了 ✓ / 忘记了 ↻ / 下一个 →
    private func actionRow(isFormula: Bool) -> some View {
        HStack(spacing: 8) {
            navButton("← 上一个") {
                if isFormula { store.showFormula(store.formulaIndex - 1) }
                else { store.showPoint(store.pointIndex - 1) }
            }
            rateButton("记住了 ✓", fill: Theme.primary, text: .white) { store.rate(1) }
            rateButton("忘记了 ↻", fill: Color(hex: 0xF7EBE3), text: Color(hex: 0xB9683C)) { store.rate(-1) }
            navButton("下一个 →") {
                if isFormula { store.showFormula(store.formulaIndex + 1) }
                else { store.showPoint(store.pointIndex + 1) }
            }
        }
    }

    private func navButton(_ title: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(Color(hex: 0x445D52))
                .lineLimit(1)
                .minimumScaleFactor(0.75)
                .frame(maxWidth: .infinity)
                .frame(height: 46)
                .background(RoundedRectangle(cornerRadius: 9, style: .continuous)
                    .fill(Theme.surface))
                .overlay(RoundedRectangle(cornerRadius: 9, style: .continuous)
                    .stroke(Color(hex: 0xE2EFE8), lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    private func rateButton(_ title: String, fill: Color, text: Color,
                            action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(text)
                .lineLimit(1)
                .minimumScaleFactor(0.75)
                .frame(maxWidth: .infinity)
                .frame(height: 46)
                .background(RoundedRectangle(cornerRadius: 9, style: .continuous).fill(fill))
        }
        .buttonStyle(.plain)
    }

    private var rateHint: some View {
        Text("记住了 → 隔更久再背；忘记了 → 明天重来｜评完自动下一张")
            .font(.system(size: 11, weight: .medium))
            .foregroundColor(Color(hex: 0x8EA196))
            .multilineTextAlignment(.center)
            .frame(maxWidth: .infinity)
    }

    private var emptyTitle: String {
        if store.reviewedToday > 0 { return "今天的卡片背完了" }
        return store.pointUnitFilter.isEmpty ? "今天没有要背的卡片" : "本章没有待背卡片"
    }

    private var emptySub: String {
        if store.reviewedToday > 0 {
            return "今天共背 \(store.reviewedToday) 张 · 明天按 1→2→4→7 天间隔自动排卡"
        }
        if !store.pointUnitFilter.isEmpty {
            return "换一章看看，或点「全部章节」回到今日整组"
        }
        return "这个科目已全部完成固化，想回顾去复习计划里翻"
    }

    private var deckEmpty: some View {
        VStack(spacing: 10) {
            Text("✓")
                .font(.system(size: 30, weight: .heavy))
                .foregroundColor(Theme.primary)
                .frame(width: 60, height: 60)
                .background(Circle().fill(Theme.chip))

            Text(emptyTitle)
                .font(.system(size: 17, weight: .heavy))
                .foregroundColor(Color(hex: 0x14352A))
            Text(emptySub)
                .font(.system(size: 12))
                .foregroundColor(Color(hex: 0x6B8075))
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)

            Button { store.selectSegment(.plan) } label: {
                Text("看复习计划 →")
                    .font(.system(size: 14, weight: .bold))
                    .foregroundColor(Theme.primary)
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .background(RoundedRectangle(cornerRadius: 9, style: .continuous)
                        .fill(Theme.chip))
            }
            .buttonStyle(.plain)
            .padding(.horizontal, 40)
            .padding(.top, 10)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(20)
        .background(RoundedRectangle(cornerRadius: 14, style: .continuous).fill(Theme.surface))
        .shadow(color: Theme.ink.opacity(0.08), radius: 18, x: 0, y: 8)
    }

    // MARK: 模块三 自测

    private var quizPane: some View {
        VStack(spacing: 10) {
            VStack(spacing: 0) {
                segRow("方式", items: ScienceQuizWay.allCases.map { way in
                    (title: way.label, active: quizWay == way, action: { quizWay = way })
                })
                separator
                segRow("题目", items: ScienceQuizMode.allCases.map { mode in
                    (title: mode.label, active: store.quizMode == mode,
                     action: { store.setQuizMode(mode) })
                })
                if quizWay == .choice {
                    separator
                    segRow("方向", items: ScienceQuizLang.allCases.map { lang in
                        (title: lang.label, active: store.quizLang == lang,
                         action: { store.setQuizLang(lang) })
                    })
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(RoundedRectangle(cornerRadius: 10, style: .continuous).fill(Theme.surface))
            .shadow(color: Theme.ink.opacity(0.05), radius: 9, x: 0, y: 3)

            HStack {
                Text("正确 \(store.quizRight) / \(store.quizTotal)")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(Theme.primary)
                Spacer()
                Button { store.resetStats() } label: {
                    Text("重置")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(Color(hex: 0x8EA196))
                        .padding(.horizontal, 9)
                        .padding(.vertical, 4)
                        .background(RoundedRectangle(cornerRadius: 6, style: .continuous)
                            .fill(Color(hex: 0xE6F1EA)))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 4)

            if quizWay == .choice { choiceQuiz } else { recallQuiz }
        }
        .padding(.bottom, 12)
    }

    private var separator: some View {
        Rectangle().fill(Color(hex: 0xEDF5F0)).frame(height: 1)
    }

    private func segRow(_ label: String,
                        items: [(title: String, active: Bool, action: () -> Void)]) -> some View {
        HStack(spacing: 10) {
            Text(label)
                .font(.system(size: 13, weight: .bold))
                .foregroundColor(Color(hex: 0x53675D))
                .frame(width: 40, alignment: .leading)

            HStack(spacing: 3) {
                ForEach(items.indices, id: \.self) { index in
                    Button { items[index].action() } label: {
                        Text(items[index].title)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(items[index].active ? Theme.primary : Color(hex: 0x5E7368))
                            .lineLimit(1)
                            .minimumScaleFactor(0.8)
                            .frame(maxWidth: .infinity)
                            .frame(height: 30)
                            .background(
                                RoundedRectangle(cornerRadius: 5, style: .continuous)
                                    .fill(items[index].active ? Theme.surface : Color.clear)
                                    .shadow(color: items[index].active ? Theme.primary.opacity(0.14) : .clear,
                                            radius: 5, x: 0, y: 2)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(3)
            .background(RoundedRectangle(cornerRadius: 7, style: .continuous)
                .fill(Color(hex: 0xE6F1EA)))
        }
        .padding(.vertical, 6)
    }

    private var choiceQuiz: some View {
        VStack(spacing: 10) {
            if let question = store.quiz {
                VStack(spacing: 0) {
                    Text("\(store.subject.label) · \(store.quizMode == .point ? "术语" : "公式")")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 9)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(Theme.chip))
                        .padding(.bottom, 12)

                    Text(question.prompt)
                        .font(.system(size: 21, weight: .heavy))
                        .foregroundColor(Color(hex: 0x14352A))
                        .multilineTextAlignment(.center)
                        .fixedSize(horizontal: false, vertical: true)

                    if !question.hint.isEmpty {
                        Text(question.hint)
                            .font(.system(size: 12))
                            .foregroundColor(Color(hex: 0x6B8075))
                            .multilineTextAlignment(.center)
                            .padding(.top, 8)
                            .fixedSize(horizontal: false, vertical: true)
                    }

                    Text("选出正确的\(store.quizLang == .en2zh ? "中文" : "英文")")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(Color(hex: 0x8EA196))
                        .padding(.top, 10)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 22)
                .padding(.horizontal, 15)
                .background(RoundedRectangle(cornerRadius: 12, style: .continuous).fill(Theme.surface))
                .shadow(color: Theme.ink.opacity(0.07), radius: 14, x: 0, y: 5)

                VStack(spacing: 8) {
                    ForEach(question.options) { option in
                        let isAnswer = option.id == question.answerID
                        let isPicked = option.id == store.quizSelectedID
                        Button { store.answer(option.id) } label: {
                            HStack(spacing: 8) {
                                Text(option.text)
                                    .font(.system(size: 14, weight: .medium))
                                    .foregroundColor(Color(hex: 0x14352A))
                                    .fixedSize(horizontal: false, vertical: true)
                                Spacer(minLength: 4)
                                if store.quizAnswered && isAnswer {
                                    Text("✓")
                                        .font(.system(size: 16, weight: .heavy))
                                        .foregroundColor(Theme.primary)
                                } else if store.quizAnswered && isPicked {
                                    Text("✗")
                                        .font(.system(size: 16, weight: .heavy))
                                        .foregroundColor(Color(hex: 0xD9705F))
                                }
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 12)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(
                                RoundedRectangle(cornerRadius: 9, style: .continuous)
                                    .fill(store.quizAnswered && isAnswer
                                          ? Theme.chip
                                          : (store.quizAnswered && isPicked
                                             ? Color(hex: 0xFBECEA)
                                             : Theme.surface))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 9, style: .continuous)
                                    .stroke(store.quizAnswered && isAnswer
                                            ? Color(hex: 0x1F9D63)
                                            : (store.quizAnswered && isPicked
                                               ? Color(hex: 0xD9705F) : Theme.line),
                                            lineWidth: 1)
                            )
                        }
                        .buttonStyle(.plain)
                        .disabled(store.quizAnswered)
                    }
                }

                if store.quizAnswered {
                    let answer = question.options.first { $0.id == question.answerID }?.text ?? ""
                    Text(store.quizCorrect ? "答对了 ✓" : "正确答案：\(answer)")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(store.quizCorrect ? Color(hex: 0x1F9D63) : Color(hex: 0xB9683C))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(RoundedRectangle(cornerRadius: 8, style: .continuous)
                            .fill(store.quizCorrect ? Theme.chip : Color(hex: 0xF7EBE3)))

                    Button { store.nextQuestion() } label: {
                        Text("下一题 →")
                            .font(.system(size: 14, weight: .bold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .frame(height: 44)
                            .background(RoundedRectangle(cornerRadius: 9, style: .continuous)
                                .fill(Theme.primary))
                    }
                    .buttonStyle(.plain)
                }
            } else {
                EmptyHint(text: "暂无可出题内容")
            }
        }
    }

    private var recallQuiz: some View {
        ScienceRecallView(store: store)
            .id("\(store.subject.rawValue)-\(store.quizMode.rawValue)")
    }

    // MARK: 模块四 复习计划

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

            if store.formulaDueCount > 0 { formulaEntry }

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
                    Text("🧪 公式待复习")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(Theme.ink)
                    Text("公式不进每日卡组，单独过一遍")
                        .font(.system(size: 11, weight: .medium))
                        .foregroundColor(Theme.sub)
                }
                Spacer(minLength: 0)
                Text("\(store.formulaDueCount) 条")
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
                Text("\(group.title) · \(items.count)")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(group == .due
                                     ? Color(hex: 0xC96F24)
                                     : (group == .graduated ? Theme.success : Theme.ink))

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
            .frame(maxWidth: .infinity, alignment: .leading)
            .cardSurface(radius: 18, padding: 14)
        }
    }

    // MARK: 通用组件

    private func chipRow(_ items: [ScienceUnit], active: String,
                         onSelect: @escaping (String) -> Void) -> some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(items) { item in
                    Button { onSelect(item.key) } label: {
                        Text(item.label)
                            .font(.system(size: 12, weight: active == item.key ? .bold : .semibold))
                            .foregroundColor(active == item.key ? .white : Color(hex: 0x5E7368))
                            .padding(.horizontal, 12)
                            .frame(height: 32)
                            .background(Capsule().fill(active == item.key ? Theme.primary : Color(hex: 0xE6F1EA)))
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
    var tint: Color = Theme.track
    var height: CGFloat = 4

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(tint)
                Capsule()
                    .fill(LinearGradient(colors: [Theme.primarySoft, Theme.primary],
                                         startPoint: .leading,
                                         endPoint: .trailing))
                    .frame(width: fraction <= 0 ? 0 : max(6, geo.size.width * min(fraction, 1)))
                    .animation(.easeOut(duration: 0.45), value: fraction)
            }
        }
        .frame(height: height)
    }
}
