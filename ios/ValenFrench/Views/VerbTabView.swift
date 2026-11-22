import SwiftUI

struct VerbTabView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        VStack(spacing: 10) {
            verbPicker
            tensePicker
            table
            Spacer(minLength: 0)
            stageLine
            rateRow
            navRow
        }
        .padding(.horizontal, 16)
        .padding(.bottom, 8)
    }

    // MARK: 动词选择

    private var verbPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(Array(store.verbs.enumerated()), id: \.offset) { index, verb in
                    let active = store.verbIndex == index
                    Button {
                        store.selectVerb(index)
                    } label: {
                        Text(verb.name)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(active ? .white : Theme.sub)
                            .padding(.horizontal, 13)
                            .frame(height: 38)
                            .background(
                                RoundedRectangle(cornerRadius: 13, style: .continuous)
                                    .fill(active ? Theme.primary : Theme.chip)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.vertical, 2)
        }
    }

    // MARK: 时态

    private var tensePicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(Array(store.tenseNames.enumerated()), id: \.offset) { index, name in
                    let active = store.tenseIndex == index
                    Button {
                        store.selectTense(index)
                    } label: {
                        Text(name)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(active ? .white : Theme.sub)
                            .padding(.horizontal, 12)
                            .frame(height: 34)
                            .background(
                                Capsule().fill(active ? Theme.primary : Theme.chip)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    // MARK: 变位表

    private var table: some View {
        VStack(spacing: 0) {
            if let verb = store.currentVerb {
                HStack(spacing: 8) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(verb.name)
                            .font(.system(size: 20, weight: .bold, design: .serif))
                            .foregroundColor(Theme.ink)
                        Text(verb.cn)
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(Theme.sub)
                    }
                    Spacer(minLength: 0)
                    SpeakButton(text: verb.name, size: 13)
                }
                .padding(.bottom, 10)

                HStack {
                    Text("人称")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.sub)
                        .frame(width: 96, alignment: .leading)
                    Text(store.tenseNames.indices.contains(store.tenseIndex) ? store.tenseNames[store.tenseIndex] : "")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.sub)
                    Spacer(minLength: 0)
                }
                .padding(.vertical, 7)
                .padding(.horizontal, 12)
                .background(Theme.chip.opacity(0.6))

                ForEach(Array(store.currentVerbForms.enumerated()), id: \.offset) { index, form in
                    let hidden = store.maskForms && !store.revealedForms.contains(index)
                    Button {
                        if hidden { store.revealForm(index) }
                    } label: {
                        HStack(spacing: 8) {
                            Text(store.persons.indices.contains(index) ? store.persons[index] : "")
                                .font(.system(size: 13, weight: .medium))
                                .foregroundColor(Theme.sub)
                                .frame(width: 96, alignment: .leading)

                            if hidden {
                                Text("点击显示")
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundColor(Theme.primary.opacity(0.7))
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .padding(.vertical, 3)
                                    .background(
                                        RoundedRectangle(cornerRadius: 6, style: .continuous)
                                            .fill(Theme.primary.opacity(0.08))
                                    )
                            } else {
                                Text(form)
                                    .font(.system(size: 15, weight: .semibold))
                                    .foregroundColor(Theme.ink)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        .padding(.horizontal, 12)
                        .padding(.vertical, 11)
                    }
                    .buttonStyle(.plain)

                    if index < store.currentVerbForms.count - 1 {
                        Rectangle()
                            .fill(Theme.line.opacity(0.7))
                            .frame(height: 0.6)
                            .padding(.horizontal, 12)
                    }
                }

                if store.currentVerbForms.isEmpty {
                    EmptyHint(text: "该时态暂无数据")
                }
            } else {
                EmptyHint(text: "暂无动词")
            }
        }
        .cardSurface(radius: 22, padding: 14)
    }

    // MARK: 记忆状态

    private var stageLine: some View {
        VStack(spacing: 2) {
            Text(store.verbStageLabel)
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(Theme.primary)
            if !store.verbNextDueText.isEmpty {
                Text(store.verbNextDueText)
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(Theme.sub)
            }
        }
        .frame(maxWidth: .infinity)
    }

    private var rateRow: some View {
        HStack(spacing: 8) {
            Button {
                store.rateVerb(1)
            } label: {
                Text("记住了 ✓")
            }
            .buttonStyle(PrimaryButtonStyle(color: Theme.success, height: 44))

            Button {
                store.rateVerb(-1)
            } label: {
                Text("忘记了 ↻")
            }
            .buttonStyle(PrimaryButtonStyle(color: Theme.warn, height: 44))
        }
    }

    private var navRow: some View {
        HStack(spacing: 8) {
            Button {
                store.prevVerb()
            } label: {
                Text("← 上一个")
            }
            .buttonStyle(SoftButtonStyle(height: 44))

            Button {
                store.toggleMask()
            } label: {
                Text(store.maskForms ? "显示答案" : "遮挡自测")
            }
            .buttonStyle(SoftButtonStyle(height: 44))

            Button {
                store.nextVerb()
            } label: {
                Text("下一个 →")
            }
            .buttonStyle(SoftButtonStyle(height: 44))
        }
    }
}
