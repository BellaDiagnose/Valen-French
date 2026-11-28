import SwiftUI

/// 科学独立页：七+八年级生物 / 八年级化学知识点、公式与自测，教材目录校对 + LC 英式表述
struct ScienceView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var store = ScienceStore()

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Theme.bg.ignoresSafeArea()

                VStack(spacing: 12) {
                    subjectPicker
                    segmentBar

                    ScrollView(showsIndicators: false) {
                        switch store.segment {
                        case .point: pointPane
                        case .formula: formulaPane
                        case .quiz: quizPane
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
                .padding(.horizontal, 16)
                .padding(.top, 10)
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
                        .font(.system(size: 13, weight: active ? .bold : .semibold))
                        .foregroundColor(active ? .white : Theme.sub)
                        .frame(maxWidth: .infinity)
                        .frame(height: 36)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(active ? Theme.primary : Theme.chip)
                        )
                }
                .buttonStyle(.plain)
            }
        }
    }

    // MARK: 知识点

    private var pointPane: some View {
        VStack(spacing: 14) {
            if store.subject == .bio {
                chipRow(store.gradeOptions, active: store.gradeFilter) { store.setGradeFilter($0) }
            }
            chipRow(store.unitOptions, active: store.unitFilter) { store.setUnitFilter($0) }

            if store.currentPoint == nil {
                EmptyHint(text: "该章节暂无知识点")
            } else {
                ZStack {
                    pointFront.opacity(store.flipped ? 0 : 1)
                    pointBack
                        .opacity(store.flipped ? 1 : 0)
                        .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                }
                .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
                .animation(.easeInOut(duration: 0.42), value: store.flipped)
                .frame(maxWidth: .infinity, minHeight: 330, maxHeight: 400)
                .contentShape(Rectangle())
                .onTapGesture { store.flip() }
                .cardSurface(radius: 22, padding: 0)

                cardActions(current: store.pointIndex, total: store.filteredPoints.count,
                            onPrev: { store.showPoint(store.pointIndex - 1) },
                            onNext: { store.showPoint(store.pointIndex + 1) })
            }
        }
        .padding(.bottom, 10)
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

    // MARK: 公式

    private var formulaPane: some View {
        VStack(spacing: 14) {
            chipRow(store.formulaUnitOptions, active: store.formulaUnitFilter) {
                store.setFormulaUnitFilter($0)
            }

            if store.currentFormula == nil {
                EmptyHint(text: "该分类暂无公式")
            } else {
                ZStack {
                    formulaFront.opacity(store.flipped ? 0 : 1)
                    formulaBack
                        .opacity(store.flipped ? 1 : 0)
                        .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                }
                .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
                .animation(.easeInOut(duration: 0.42), value: store.flipped)
                .frame(maxWidth: .infinity, minHeight: 330, maxHeight: 400)
                .contentShape(Rectangle())
                .onTapGesture { store.flip() }
                .cardSurface(radius: 22, padding: 0)

                cardActions(current: store.formulaIndex, total: store.filteredFormulas.count,
                            onPrev: { store.showFormula(store.formulaIndex - 1) },
                            onNext: { store.showFormula(store.formulaIndex + 1) })
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

            Text(store.currentFormula?.formula ?? "")
                .font(.system(size: 17, weight: .semibold, design: .monospaced))
                .foregroundColor(Theme.primary)
                .multilineTextAlignment(.center)
                .minimumScaleFactor(0.65)

            Spacer(minLength: 4)
            Text("点击翻面看表达式、条件与 LC 提示")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var formulaBack: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 12) {
                Text(store.showEnglish ? (store.currentFormula?.exprEn ?? "") : (store.currentFormula?.expr ?? ""))
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Theme.ink)

                Text(store.currentFormula?.formula ?? "")
                    .font(.system(size: 17, weight: .bold, design: .monospaced))
                    .foregroundColor(Theme.primary)

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

    // MARK: 通用组件

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

    private func cardActions(current: Int, total: Int,
                             onPrev: @escaping () -> Void,
                             onNext: @escaping () -> Void) -> some View {
        VStack(spacing: 10) {
            HStack(spacing: 12) {
                Button(action: onPrev) {
                    Text("上一条").font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 40)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
                Button(action: onNext) {
                    Text("下一条").font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .frame(height: 40)
                        .background(RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(Theme.chip))
                }
            }
            .buttonStyle(.plain)

            Text("\(total == 0 ? 0 : current + 1) / \(total) · 已学 \(store.studiedCount) 条")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.sub)

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
        }
    }
}
