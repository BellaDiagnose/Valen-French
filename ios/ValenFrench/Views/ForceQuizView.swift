import SwiftUI

/// 间隔 ≥ 3 天打开时的强制热身自测，答完才解锁其它 tab
struct ForceQuizView: View {
    @EnvironmentObject private var store: AppStore

    private var finished: Int {
        StudyEngine.forceQuizQuestions - store.forceQuizLeft
    }

    var body: some View {
        VStack(spacing: 12) {
            Capsule()
                .fill(Theme.line)
                .frame(width: 38, height: 5)
                .padding(.top, 10)

            VStack(spacing: 4) {
                Text("热身自测")
                    .font(.system(size: 19, weight: .bold))
                    .foregroundColor(Theme.ink)
                Text("距上次学习 \(store.forceGapDays) 天，先做 \(StudyEngine.forceQuizQuestions) 题唤醒记忆")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(Theme.sub)
                    .multilineTextAlignment(.center)
            }

            ProgressView(value: Double(finished),
                         total: Double(StudyEngine.forceQuizQuestions))
                .tint(Theme.primary)
                .padding(.horizontal, 4)

            ScrollView(showsIndicators: false) {
                QuizCardView()
            }

            Button {
                store.nextQuestion()
            } label: {
                Text(store.forceQuizLeft <= 1 ? "完成热身" : "下一题 →")
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(!store.quizAnswered)
            .opacity(store.quizAnswered ? 1 : 0.45)
        }
        .padding(.horizontal, 18)
        .padding(.bottom, 16)
        .background(Theme.bg.ignoresSafeArea())
    }
}
