import SwiftUI

struct QuizTabView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        VStack(spacing: 12) {
            HStack(spacing: 8) {
                Text("正确 \(store.quizRight) / \(store.quizTotal)")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Theme.ink)

                if store.quizTotal > 0 {
                    Text("\(store.quizAccuracy)%")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 7)
                        .padding(.vertical, 3)
                        .background(Capsule().fill(Theme.primary.opacity(0.1)))
                }

                Spacer()

                Button {
                    store.resetQuizStats()
                } label: {
                    Text("重置")
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundColor(Theme.sub)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 5)
                        .background(Capsule().fill(Theme.chip))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 4)

            ScrollView(showsIndicators: false) {
                QuizCardView()
            }

            Button {
                store.nextQuestion()
            } label: {
                Text("下一题 →")
            }
            .buttonStyle(PrimaryButtonStyle())
            .opacity(store.quizAnswered ? 1 : 0.45)
            .disabled(!store.quizAnswered)
        }
        .padding(.horizontal, 16)
        .padding(.bottom, 10)
    }
}

// MARK: - 题目卡片（自测 / 强制自测共用）

struct QuizCardView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        VStack(spacing: 14) {
            if let quiz = store.quiz {
                HStack(spacing: 8) {
                    Text(quiz.mode.hint)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 9)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(Theme.primary.opacity(0.1)))

                    Spacer(minLength: 0)

                    if let record = store.memory[quiz.word.id] {
                        Text(record.stageLabel)
                            .font(.system(size: 10, weight: .medium))
                            .foregroundColor(Theme.sub)
                            .lineLimit(1)
                    } else {
                        Text("新词")
                            .font(.system(size: 10, weight: .medium))
                            .foregroundColor(Theme.sub)
                    }
                }

                Text(quiz.prompt)
                    .font(.system(size: 30, weight: .semibold, design: .serif))
                    .foregroundColor(Theme.ink)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.5)
                    .lineLimit(3)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 4)

                VStack(spacing: 9) {
                    ForEach(quiz.options) { option in
                        optionRow(option, quiz: quiz)
                    }
                }

                if store.quizAnswered {
                    feedback(quiz)
                }
            } else {
                EmptyHint(text: "词库为空")
            }
        }
        .cardSurface(radius: 24, padding: 18)
        .frame(maxWidth: .infinity)
    }

    private func optionRow(_ option: QuizQuestion.Option, quiz: QuizQuestion) -> some View {
        let isAnswer = option.id == quiz.answerID
        let isSelected = option.id == store.quizSelectedID
        let answered = store.quizAnswered

        var fill = Theme.chip.opacity(0.55)
        var textColor = Theme.ink
        var icon: String?

        if answered {
            if isAnswer {
                fill = Theme.success.opacity(0.14)
                textColor = Theme.success
                icon = "checkmark.circle.fill"
            } else if isSelected {
                fill = Theme.warn.opacity(0.14)
                textColor = Theme.warn
                icon = "xmark.circle.fill"
            } else {
                fill = Theme.chip.opacity(0.3)
                textColor = Theme.sub
            }
        }

        return Button {
            store.answer(option.id)
        } label: {
            HStack(spacing: 10) {
                Text(option.text)
                    .font(.system(size: 15, weight: .medium))
                    .foregroundColor(textColor)
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)

                Spacer(minLength: 0)

                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundColor(textColor)
                }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 13)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous).fill(fill)
            )
        }
        .buttonStyle(.plain)
        .disabled(answered)
    }

    @ViewBuilder
    private func feedback(_ quiz: QuizQuestion) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(store.quizCorrect ? "答对了 ✓" : "正确答案：\(quiz.word.cn)")
                .font(.system(size: 13, weight: .bold))
                .foregroundColor(store.quizCorrect ? Theme.success : Theme.warn)

            if !quiz.word.example.isEmpty {
                Text(quiz.word.example)
                    .font(.system(size: 14, weight: .medium, design: .serif))
                    .foregroundColor(Theme.ink)
                    .fixedSize(horizontal: false, vertical: true)
                Text(quiz.word.exampleCn)
                    .font(.system(size: 12))
                    .foregroundColor(Theme.sub)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill((store.quizCorrect ? Theme.success : Theme.warn).opacity(0.08))
        )
    }
}
