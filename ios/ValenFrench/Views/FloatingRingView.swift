import SwiftUI

// MARK: - 模块导航目标（与小程序 float-nav.js 的 NAV_ITEMS 一致，首页由 navbar 承担）

enum ModuleNavTarget: String, CaseIterable, Identifiable {
    case enavant, simple, chem, bio

    var id: String { rawValue }

    var label: String {
        switch self {
        case .enavant: return "En Avant"
        case .simple: return "简明法语"
        case .chem: return "化学"
        case .bio: return "生物"
        }
    }

    var mark: String {
        switch self {
        case .enavant: return "EA"
        case .simple: return "CF"
        case .chem: return "CH"
        case .bio: return "BI"
        }
    }

    var accent: Color {
        switch self {
        case .enavant: return Color(hex: 0x0F8A5A)
        case .simple: return Color(hex: 0x128A80)
        case .chem: return Color(hex: 0xB8783C)
        case .bio: return Color(hex: 0x3E7F9E)
        }
    }

    var tint: Color {
        switch self {
        case .enavant: return Color(hex: 0xE4F1E9)
        case .simple: return Color(hex: 0xE5F5F1)
        case .chem: return Color(hex: 0xFBF0E5)
        case .bio: return Color(hex: 0xE8F2F7)
        }
    }
}

/// 模块导航球：小程序 float-nav 同款白色圆角方块。
/// 正面 = 当前模块进度环 + 模块名 + 「点击切换模块」；背面 = 四个科目入口（首页由 navbar 承担）。
/// 可拖到页面任意位置，位置在三个页面之间共享并持久化。
struct FloatingRingView: View {
    var target: ModuleNavTarget = .enavant
    var value: Int = 1
    var unit: String = "天"
    var fraction: Double = 0
    var onSelect: (ModuleNavTarget) -> Void = { _ in }

    /// 球心在容器坐标系中的位置；nil 表示还没拖动过，用默认停靠点
    @State private var center: CGPoint?
    @State private var dragging: CGSize = .zero
    @State private var flipped = false

    /// 跨页面共享拖动结果（"x,y"），离开页面再回来不会被重置
    @AppStorage("nav_ball_center") private var savedCenter: String = ""

    private let ballW: CGFloat = 108
    private let ballH: CGFloat = 150
    private let openW: CGFloat = 198
    private let openH: CGFloat = 238
    private let edge: CGFloat = 8

    var body: some View {
        GeometryReader { geo in
            let size = currentSize
            let at = resolved(container: geo.size, size: size)

            Group {
                if flipped {
                    back
                } else {
                    front(container: geo.size)
                }
            }
            .frame(width: size.width, height: size.height, alignment: .top)
            .position(x: at.x + size.width / 2, y: at.y + size.height / 2)
            .animation(.easeInOut(duration: 0.3), value: flipped)
        }
        .onAppear {
            if center == nil, !savedCenter.isEmpty {
                let parts = savedCenter.split(separator: ",").compactMap { Double($0) }
                if parts.count == 2 { center = CGPoint(x: parts[0], y: parts[1]) }
            }
        }
    }

    private var currentSize: CGSize {
        flipped ? CGSize(width: openW, height: openH) : CGSize(width: ballW, height: ballH)
    }

    /// 左上角坐标：默认右上角停靠，拖动后按球心还原
    private func resolved(container: CGSize, size: CGSize) -> CGPoint {
        let base: CGPoint
        if let center {
            base = CGPoint(x: center.x + dragging.width - size.width / 2,
                           y: center.y + dragging.height - size.height / 2)
        } else {
            base = CGPoint(x: container.width - 10 - size.width,
                           y: min(120, max(edge, container.height - size.height - edge)))
        }
        return clamp(base, container: container, size: size)
    }

    /// 保证整个球（含展开态）始终在页面内，可停在任意位置
    private func clamp(_ point: CGPoint, container: CGSize, size: CGSize) -> CGPoint {
        let maxX = max(edge, container.width - size.width - edge)
        let maxY = max(edge, container.height - size.height - edge)
        return CGPoint(x: min(maxX, max(edge, point.x)),
                       y: min(maxY, max(edge, point.y)))
    }

    private func dragGesture(container: CGSize, size: CGSize) -> some Gesture {
        DragGesture(minimumDistance: 2)
            .onChanged { value in
                dragging = value.translation
            }
            .onEnded { _ in
                let landed = resolved(container: container, size: size)
                let next = CGPoint(x: landed.x + size.width / 2,
                                   y: landed.y + size.height / 2)
                center = next
                dragging = .zero
                savedCenter = "\(Int(next.x)),\(Int(next.y))"
            }
    }

    // MARK: 正面

    private func front(container: CGSize) -> some View {
        VStack(spacing: 0) {
            ZStack {
                Circle()
                    .stroke(Theme.track, lineWidth: 9)
                Circle()
                    .trim(from: 0, to: min(1, max(0, fraction)))
                    .stroke(
                        LinearGradient(colors: [Theme.primary, Theme.primarySoft],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        style: StrokeStyle(lineWidth: 9, lineCap: .round)
                    )
                    .rotationEffect(.degrees(-90))
                Circle()
                    .fill(Color.white)
                    .frame(width: 50, height: 50)
                    .shadow(color: Theme.ink.opacity(0.05), radius: 4, x: 0, y: 1)
                VStack(spacing: 0) {
                    Text("\(value)")
                        .font(.system(size: 21, weight: .heavy, design: .rounded))
                        .foregroundColor(Theme.primary)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                    Text(unit)
                        .font(.system(size: 9, weight: .semibold))
                        .foregroundColor(Theme.sub)
                }
            }
            .frame(width: 68, height: 68)

            Text(target.label)
                .font(.system(size: 12, weight: .heavy))
                .foregroundColor(Color(hex: 0x14352A))
                .lineLimit(1)
                .minimumScaleFactor(0.8)
                .padding(.top, 10)

            Text("点击切换模块")
                .font(.system(size: 9, weight: .medium))
                .foregroundColor(Color(hex: 0x8EA196))
                .padding(.top, 3)
        }
        .frame(width: ballW, height: ballH)
        .navBallSurface()
        .contentShape(Rectangle())
        .gesture(dragGesture(container: container,
                             size: CGSize(width: ballW, height: ballH)))
        .onTapGesture { withAnimation { flipped = true } }
    }

    // MARK: 背面

    private var back: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text("模块导航")
                .font(.system(size: 16, weight: .heavy))
                .foregroundColor(Color(hex: 0x14352A))
                .frame(maxWidth: .infinity, alignment: .center)
                .padding(.bottom, 4)

            ForEach(ModuleNavTarget.allCases) { item in
                Button {
                    withAnimation { flipped = false }
                    onSelect(item)
                } label: {
                    HStack(spacing: 8) {
                        Text(item.mark)
                            .font(.system(size: 11, weight: .heavy))
                            .foregroundColor(item.accent)
                            .frame(width: 26, height: 26)
                            .background(RoundedRectangle(cornerRadius: 8, style: .continuous)
                                .fill(item.tint))
                        Text(item.label)
                            .font(.system(size: 12.5, weight: .semibold))
                            .foregroundColor(Theme.ink)
                            .lineLimit(1)
                        Spacer(minLength: 0)
                        if item == target {
                            Image(systemName: "checkmark")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundColor(Theme.primary)
                        }
                    }
                    .padding(.horizontal, 8)
                    .frame(height: 34)
                    .background(
                        RoundedRectangle(cornerRadius: 9, style: .continuous)
                            .fill(item == target ? Theme.chip : Color.clear)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 9, style: .continuous)
                            .stroke(item == target ? Color(hex: 0x1F9D63) : Color.clear,
                                    lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
            }

            Spacer(minLength: 0)

            Text("点击收起")
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(Theme.sub)
                .frame(maxWidth: .infinity)
                .padding(.top, 2)
                .contentShape(Rectangle())
                .onTapGesture { withAnimation { flipped = false } }
        }
        .padding(12)
        .frame(width: openW, height: openH, alignment: .top)
        .navBallSurface()
    }
}

private extension View {
    func navBallSurface() -> some View {
        self
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(Color.white.opacity(0.97))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .stroke(Color(hex: 0xE2EFE8), lineWidth: 1)
            )
            .shadow(color: Color(hex: 0x10261D).opacity(0.16), radius: 12, x: 0, y: 6)
    }
}
