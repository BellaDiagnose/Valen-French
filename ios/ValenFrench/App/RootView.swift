import SwiftUI

struct RootView: View {
    @EnvironmentObject private var store: AppStore

    @State private var showHome = true
    @State private var showScience = false
    @State private var scienceSubject: ScienceStore.Subject = .bio

    var body: some View {
        ZStack(alignment: .topTrailing) {
            Theme.bg.ignoresSafeArea()

            if showHome {
                HomeView(onOpenFrench: openFrench, onOpenScience: openScience)
                    .transition(.opacity)
            } else {
                contentStack
                    .transition(.opacity)
            }
        }
        .toast(text: $store.toast)
        .sheet(isPresented: $store.showForceQuiz) {
            ForceQuizView()
                .environmentObject(store)
                .interactiveDismissDisabled(true)
        }
        .fullScreenCover(isPresented: $showScience) {
            ScienceView(initialSubject: scienceSubject) { showScience = false }
        }
    }

    // MARK: 法语页

    private var contentStack: some View {
        ZStack(alignment: .topTrailing) {
            VStack(spacing: 0) {
                homeBar

                TabBarView()
                    .padding(.horizontal, 16)
                    .padding(.top, 2)
                    .padding(.bottom, 10)

                scienceEntry
                    .padding(.horizontal, 16)
                    .padding(.bottom, 8)
                    .padding(.trailing, 108)

                content
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }

            FloatingRingView()
                .padding(.trailing, 14)
                .padding(.top, 4)
        }
    }

    /// 返回首页（小程序走 navigateBack，iOS 自绘一条）
    private var homeBar: some View {
        HStack(spacing: 8) {
            Button {
                withAnimation(.easeOut(duration: 0.2)) { showHome = true }
            } label: {
                HStack(spacing: 3) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 11, weight: .bold))
                    Text("首页")
                        .font(.system(size: 12, weight: .semibold))
                }
                .foregroundColor(Theme.primary)
                .padding(.horizontal, 10)
                .frame(height: 28)
                .background(Capsule().fill(Theme.chip))
            }
            .buttonStyle(.plain)

            Spacer(minLength: 0)

            Text(store.source.label)
                .font(.system(size: 11, weight: .semibold))
                .foregroundColor(Theme.sub)
                .lineLimit(1)
        }
        .padding(.horizontal, 16)
        .padding(.top, 6)
        .padding(.trailing, 100)
    }

    private func openFrench(_ source: WordSource, _ tab: AppStore.Tab) {
        if store.source != source { store.switchSource(source) }
        store.selectTab(tab)
        if tab == .quiz { store.buildQuiz() }
        withAnimation(.easeOut(duration: 0.2)) { showHome = false }
    }

    private func openScience(_ subject: ScienceStore.Subject) {
        scienceSubject = subject
        showScience = true
    }

    /// 独立科学页入口（避开右上角悬浮球）
    private var scienceEntry: some View {
        Button { openScience(.bio) } label: {
            HStack(spacing: 8) {
                Image(systemName: "atom")
                    .font(.system(size: 15, weight: .semibold))
                Text("科学速记 · 生物 / 化学")
                    .font(.system(size: 13, weight: .bold))
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                Spacer(minLength: 2)
                Image(systemName: "chevron.right")
                    .font(.system(size: 12, weight: .semibold))
            }
            .foregroundColor(Theme.primary)
            .padding(.horizontal, 14)
            .frame(height: 40)
            .background(
                RoundedRectangle(cornerRadius: 13, style: .continuous)
                    .fill(Theme.surface)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 13, style: .continuous)
                    .stroke(Theme.line, lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
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
