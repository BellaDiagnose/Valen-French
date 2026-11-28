import SwiftUI

// MARK: - 模块导航目标（与小程序 float-nav.js 的 NAV_ITEMS 一致）

enum ModuleNavTarget: String, CaseIterable, Identifiable {
    case home, enavant, simple, chem, bio

    var id: String { rawValue }

    var label: String {
        switch self {
        case .home: return "首页"
        case .enavant: return "En Avant"
        case .simple: return "简明法语"
        case .chem: return "化学"
        case .bio: return "生物"
        }
    }

    var mark: String {
        switch self {
        case .home: return "⌂"
        case .enavant: return "EA"
        case .simple: return "CF"
        case .chem: return "CH"
        case .bio: return "BI"
        }
    }

    var accent: Color {
        switch self {
        case .home, .enavant: return Color(hex: 0x0F8A5A)
        case .simple: return Color(hex: 0x128A80)
        case .chem: return Color(hex: 0xB8783C)
        case .bio: return Color(hex: 0x3E7F9E)
        }
    }

    var tint: Color {
        switch self {
        case .home, .enavant: return Color(hex: 0xE4F1E9)
        case .simple: return Color(hex: 0xE5F5F1)
        case .chem: return Color(hex: 0xFBF0E5)
        case .bio: return Color(hex: 0xE8F2F7)
        }
    }
}

/// 右上角模块导航球：小程序 float-nav 同款白色圆角方块。
/// 正面 = 当前模块进度环 + 模块名 + 「点击切换模块」；背面 = 五个模块入口。
/// 法语页数值是连续天数「N 天」，科学页是今日已背「N 今日」。
struct FloatingRingView: View {
    var target: ModuleNavTarget = .home
    var value: Int = 1
    var unit: String = "天"
    var fraction: Double = 0
    var onSelect: (ModuleNavTarget) -> Void = { _ in }

    @State private var base: CGSize = .zero
    @State private var translation: CGSize = .zero
    @State private var flipped = false

    private let ballW: CGFloat = 108
    private let ballH: CGFloat = 150
    private let openW: CGFloat = 198
    private let openH: CGFloat = 300

    var body: some View {
        Group {
            if flipped { back } else { front }
        }
        .frame(width: flipped ? openW : ballW,
               height: flipped ? openH : ballH,
               alignment: .top)
        .offset(x: clamped.width, y: clamped.height)
        .gesture(dragGesture)
        .animation(.easeInOut(duration: 0.3), value: flipped)
    }

    private var clamped: CGSize {
        CGSize(width: min(0, max(-250, base.width + translation.width)),
               height: max(0, min(420, base.height + translation.height)))
    }

    private var dragGesture: some Gesture {
        DragGesture(minimumDistance: 8)
            .onChanged { translation = $0.translation }
            .onEnded { _ in
                base = clamped
                translation = .zero
            }
    }

    // MARK: 正面

    private var front: some View {
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
