import SwiftUI

// MARK: - 顶部导航栏
// 小程序由微信原生 navbar 提供：白底、居中标题、左侧灰色圆形「回首页」按钮。
// iOS 首页 / 法语页 / 科学页共用同一条，三个页面是平行关系而非弹层。
struct PageNavBar: View {
    let title: String
    /// 当前科目名，随页面 / 词库 / 学科实时变化；首页无科目时为空
    var subject: String?
    var showHome: Bool = true
    var onHome: () -> Void = {}
    /// 右侧进度环；nil 时不显示（首页）
    var ring: NavRingSpec?
    var ringOpen: Bool = false
    var onRingTap: () -> Void = {}

    var body: some View {
        ZStack {
            VStack(spacing: 1) {
                Text(title)
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundColor(Color(hex: 0x10261D))
                    .lineLimit(1)

                if let subject, !subject.isEmpty {
                    Text(subject)
                        .font(.system(size: 10, weight: .semibold))
                        .tracking(0.3)
                        .foregroundColor(Theme.primary)
                        .lineLimit(1)
                }
            }

            HStack {
                if showHome {
                    Button(action: onHome) {
                        Image(systemName: "house.fill")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(Color(hex: 0x4A5B52))
                            .frame(width: 34, height: 34)
                            .background(Circle().fill(Color(hex: 0xE9EFEA)))
                    }
                    .buttonStyle(.plain)
                }
                Spacer(minLength: 0)
                if let ring {
                    NavRingButton(value: ring.value,
                                  unit: ring.unit,
                                  fraction: ring.fraction,
                                  isOpen: ringOpen,
                                  action: onRingTap)
                }
            }
            .padding(.horizontal, 14)
        }
        .frame(height: 44)
        .background(
            Rectangle().fill(Color.white).ignoresSafeArea(edges: .top)
        )
        .overlay(alignment: .bottom) {
            Rectangle().fill(Color(hex: 0xEDF3EF)).frame(height: 0.5)
        }
    }
}

private enum RootPage {
    case home, french, science
}

struct RootView: View {
    @EnvironmentObject private var store: AppStore

    @State private var page: RootPage = .home
    @State private var scienceSubject: ScienceStore.Subject = .bio
    /// 顶栏科目下拉是否展开
    @State private var menuOpen = false
    /// 科学页今日已背 / 卡组进度，由 ScienceView 回报给顶栏圆环
    @State private var scienceToday = 0
    @State private var scienceProgress = 0.0

    var body: some View {
        VStack(spacing: 0) {
            PageNavBar(title: "BELLA 助手",
                       subject: navSubject,
                       showHome: page != .home,
                       onHome: goHome,
                       ring: page == .home ? nil : ringSpec,
                       ringOpen: menuOpen,
                       onRingTap: toggleMenu)

            ZStack(alignment: .topTrailing) {
                Theme.bg.ignoresSafeArea()

                switch page {
                case .home:
                    HomeView(onOpenFrench: openFrench, onOpenScience: openScience)
                        .transition(.opacity)
                case .french:
                    frenchStack
                        .transition(.opacity)
                case .science:
                    ScienceView(initialSubject: scienceSubject,
                                onNavigate: handleNav,
                                onSubjectChange: { scienceSubject = $0 },
                                onStatsChange: { today, progress in
                                    scienceToday = today
                                    scienceProgress = progress
                                })
                        .transition(.opacity)
                }

                if menuOpen {
                    Color(hex: 0x10261D).opacity(0.07)
                        .ignoresSafeArea()
                        .onTapGesture { closeMenu() }
                        .transition(.opacity)

                    SubjectMenuPanel(current: ringTarget) { target in
                        closeMenu()
                        handleNav(target)
                    }
                    .padding(.trailing, 12)
                    .padding(.top, 2)
                    .transition(.opacity.combined(with: .scale(scale: 0.96, anchor: .topTrailing)))
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .animation(.easeOut(duration: 0.18), value: menuOpen)
        }
        .background(Theme.bg.ignoresSafeArea())
        .toast(text: $store.toast)
        .sheet(isPresented: $store.showForceQuiz) {
            ForceQuizView()
                .environmentObject(store)
                .interactiveDismissDisabled(true)
        }
        .onChange(of: page) { _ in menuOpen = false }
    }

    // MARK: 顶栏圆环

    private var ringTarget: ModuleNavTarget {
        guard page == .french else {
            return scienceSubject == .chem ? .chem : .bio
        }
        return store.source == .enavant ? .enavant : .simple
    }

    private var ringSpec: NavRingSpec {
        page == .french
            ? NavRingSpec(value: store.ringDays, unit: "天", fraction: store.ringProgress)
            : NavRingSpec(value: scienceToday, unit: "今日", fraction: scienceProgress)
    }

    private func toggleMenu() {
        withAnimation(.easeOut(duration: 0.18)) { menuOpen.toggle() }
    }

    private func closeMenu() {
        withAnimation(.easeOut(duration: 0.15)) { menuOpen = false }
    }

    /// 顶栏第二行：显示当前页面的**准确科目名**，不再用「科学」这种泛称
    private var navSubject: String? {
        switch page {
        case .home: return nil
        case .french: return store.source.label
        case .science: return scienceSubject.label
        }
    }

    private func goHome() {
        withAnimation(.easeOut(duration: 0.2)) { page = .home }
    }

    // MARK: 法语页（与科学页平行，没有「科学速记」二级入口）

    private var frenchStack: some View {
        VStack(spacing: 0) {
            TabBarView()
                .padding(.horizontal, 16)
                .padding(.top, 10)
                .padding(.bottom, 10)

            content
                .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }

    /// 顶栏下拉里四个科目是平行入口，等价于小程序的 redirectTo（首页由 navbar 的 home 按钮承担）
    private func handleNav(_ target: ModuleNavTarget) {
        switch target {
        case .enavant, .simple:
            let source: WordSource = target == .enavant ? .enavant : .simple
            if store.source != source { store.switchSource(source) }
            store.selectTab(.card)
            withAnimation(.easeOut(duration: 0.2)) { page = .french }
        case .chem, .bio:
            let subject: ScienceStore.Subject = target == .chem ? .chem : .bio
            scienceSubject = subject
            if page != .science {
                withAnimation(.easeOut(duration: 0.2)) { page = .science }
            }
        }
    }

    private func openFrench(_ source: WordSource, _ tab: AppStore.Tab) {
        if store.source != source { store.switchSource(source) }
        store.selectTab(tab)
        if tab == .quiz { store.buildQuiz() }
        withAnimation(.easeOut(duration: 0.2)) { page = .french }
    }

    private func openScience(_ subject: ScienceStore.Subject) {
        scienceSubject = subject
        withAnimation(.easeOut(duration: 0.2)) { page = .science }
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

// MARK: - 顶部胶囊 Tab

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
