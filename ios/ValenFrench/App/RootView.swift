import SwiftUI

struct RootView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        ZStack(alignment: .topTrailing) {
            Theme.bg.ignoresSafeArea()

            VStack(spacing: 0) {
                TabBarView()
                    .padding(.horizontal, 16)
                    .padding(.top, 6)
                    .padding(.bottom, 10)

                content
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }

            FloatingRingView()
                .padding(.trailing, 14)
                .padding(.top, 4)
        }
        .toast(text: $store.toast)
        .sheet(isPresented: $store.showForceQuiz) {
            ForceQuizView()
                .environmentObject(store)
                .interactiveDismissDisabled(true)
        }
    }

    @ViewBuilder
    private var content: some View {
        switch store.activeTab {
        case .card:
            CardTabView()
        case .quiz:
            QuizTabView()
        case .verb:
            VerbTabView()
        case .plan:
            PlanTabView()
        case .points:
            PointsTabView()
        }
    }
}

// MARK: - 顶部胶囊导航

struct TabBarView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        HStack(spacing: 4) {
            ForEach(AppStore.Tab.allCases) { tab in
                let active = store.activeTab == tab
                Button {
                    store.selectTab(tab)
                } label: {
                    Text(tab.label)
                        .font(.system(size: 14, weight: active ? .bold : .semibold))
                        .foregroundColor(active ? Theme.primary : Theme.sub)
                        .lineLimit(1)
                        .minimumScaleFactor(0.78)
                        .frame(maxWidth: .infinity)
                        .frame(height: 46)
                        .background(
                            RoundedRectangle(cornerRadius: 15, style: .continuous)
                                .fill(active ? Theme.surface : Color.clear)
                                .shadow(color: active ? Theme.primary.opacity(0.16) : .clear,
                                        radius: 8, x: 0, y: 3)
                        )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(5)
        .background(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(Theme.chip)
        )
        .animation(.easeOut(duration: 0.18), value: store.activeTab)
    }
}
