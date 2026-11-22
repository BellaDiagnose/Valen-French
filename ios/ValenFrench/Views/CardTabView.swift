import SwiftUI

struct CardTabView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        VStack(spacing: 10) {
            if store.source == .simple {
                lessonPicker
            }

            Group {
                if let card = store.card {
                    FlipCardView(word: card)
                } else {
                    EmptyHint(text: "当前筛选没有词条")
                        .cardSurface()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)

            actionRow

            Text("记住了 → 隔更久复习；忘记了 → 缩短间隔")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.sub)
                .padding(.bottom, 6)
        }
        .padding(.horizontal, 16)
    }

    // MARK: 课次选择

    private var lessonPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(store.lessonOptions) { option in
                    let active = store.lessonFilter == option.value
                    Button {
                        store.setLessonFilter(option.value)
                    } label: {
                        VStack(spacing: 1) {
                            Text(option.label)
                                .font(.system(size: 13, weight: .semibold))
                            Text("\(option.count) 词")
                                .font(.system(size: 10, weight: .medium))
                                .opacity(0.75)
                        }
                        .foregroundColor(active ? .white : Theme.sub)
                        .frame(width: 68, height: 48)
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
    }

    // MARK: 操作按钮

    private var actionRow: some View {
        HStack(spacing: 8) {
            Button {
                store.prevCard()
            } label: {
                Text("← 上一个")
            }
            .buttonStyle(SoftButtonStyle(height: 46))

            Button {
                store.markRemembered()
            } label: {
                Text("记住了 ✓")
            }
            .buttonStyle(PrimaryButtonStyle(color: Theme.success))

            Button {
                store.markForgotten()
            } label: {
                Text("忘记了 ↻")
            }
            .buttonStyle(PrimaryButtonStyle(color: Theme.warn))

            Button {
                store.nextCard()
            } label: {
                Text("下一个 →")
            }
            .buttonStyle(SoftButtonStyle(height: 46))
        }
    }
}

// MARK: - 翻面单词卡

struct FlipCardView: View {
    @EnvironmentObject private var store: AppStore
    let word: Word

    var body: some View {
        ZStack {
            front
                .opacity(store.flipped ? 0 : 1)

            back
                .opacity(store.flipped ? 1 : 0)
                .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
        }
        .rotation3DEffect(.degrees(store.flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0))
        .animation(.easeInOut(duration: 0.42), value: store.flipped)
    }

    // MARK: 正面

    private var front: some View {
        VStack(spacing: 0) {
            HStack(alignment: .top) {
                Text(stageText)
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(Theme.primary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Capsule().fill(Theme.primary.opacity(0.1)))

                Spacer(minLength: 8)

                Text(word.source == .simple ? word.unitLabel : word.theme)
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Theme.sub)
                    .lineLimit(1)
            }

            Spacer(minLength: 8)

            HStack(spacing: 10) {
                Text(word.fr)
                    .font(.system(size: 40, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.ink)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.5)
                    .lineLimit(3)

                SpeakButton(text: word.fr)
            }
            .frame(maxWidth: .infinity)

            if !word.pos.isEmpty {
                Text(word.pos)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(Theme.sub)
                    .padding(.top, 8)
            }

            Spacer(minLength: 8)

            Text("点击卡片看释义与例句")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.sub.opacity(0.8))
        }
        .cardSurface(radius: 24, padding: 20)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .onTapGesture { store.flipCard() }
    }

    // MARK: 背面

    private var back: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 14) {
                Text(word.cn)
                    .font(.system(size: 26, weight: .bold))
                    .foregroundColor(Theme.ink)
                    .frame(maxWidth: .infinity, alignment: .leading)

                if !word.example.isEmpty {
                    VStack(alignment: .leading, spacing: 7) {
                        HStack(alignment: .top, spacing: 8) {
                            Text(word.example)
                                .font(.system(size: 15, weight: .medium, design: .serif))
                                .foregroundColor(Theme.ink)
                                .fixedSize(horizontal: false, vertical: true)
                            Spacer(minLength: 0)
                            SpeakButton(text: word.example, size: 12)
                        }
                        Text(word.exampleCn)
                            .font(.system(size: 13, weight: .regular))
                            .foregroundColor(Theme.sub)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(12)
                    .background(
                        RoundedRectangle(cornerRadius: 14, style: .continuous)
                            .fill(Theme.accentSoft)
                    )
                }

                if let forms = store.cardConjugation, !forms.isEmpty {
                    conjugationTable(forms)
                }

                Button {
                    store.flipCard()
                } label: {
                    Text("点击卡片返回正面")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(Theme.sub)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                }
                .buttonStyle(.plain)
            }
            .padding(20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(Theme.surface)
        )
        .shadow(color: Color(hex: 0x1F2740).opacity(0.06), radius: 14, x: 0, y: 6)
    }

    // MARK: 变位表（内嵌）

    private func conjugationTable(_ forms: [String]) -> some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("现在时变位")
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(Theme.primary)
                .padding(.bottom, 6)

            ForEach(Array(forms.enumerated()), id: \.offset) { index, form in
                HStack(spacing: 8) {
                    Text(store.persons.indices.contains(index) ? store.persons[index] : "")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(Theme.sub)
                        .frame(width: 72, alignment: .leading)
                    Text(pureForm(form))
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(Theme.ink)
                    Spacer(minLength: 0)
                }
                .padding(.vertical, 5)

                if index < forms.count - 1 {
                    Rectangle()
                        .fill(Theme.line.opacity(0.6))
                        .frame(height: 0.6)
                }
            }
        }
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Theme.chip.opacity(0.45))
        )
    }

    private var stageText: String {
        guard let record = store.memory[word.id] else { return "新词 · 今日计划" }
        return record.stageLabel
    }

    /// 去掉主语，保留纯变位（j'aime → aime，tu aimes → aimes）
    private func pureForm(_ full: String) -> String {
        if let apostrophe = full.range(of: "'") {
            return String(full[apostrophe.upperBound...])
        }
        if let space = full.firstIndex(of: " ") {
            return String(full[full.index(after: space)...])
        }
        return full
    }
}
