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

// MARK: - 顶栏右侧的进度环按钮

/// 顶栏圆环要显示的数据：数值 + 单位 + 进度（0…1）
struct NavRingSpec {
    var value: Int
    var unit: String
    var fraction: Double
}

/// 圆环 + 数值，点击展开科目下拉。坐在 navbar 右侧，与左侧 home 图标同一行。
struct NavRingButton: View {
    var value: Int
    var unit: String
    var fraction: Double
    var isOpen: Bool = false
    var action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 3) {
                ZStack {
                    Circle()
                        .stroke(Theme.track, lineWidth: 4)
                    Circle()
                        .trim(from: 0, to: min(1, max(0, fraction)))
                        .stroke(
                            LinearGradient(colors: [Theme.primary, Theme.primarySoft],
                                           startPoint: .topLeading, endPoint: .bottomTrailing),
                            style: StrokeStyle(lineWidth: 4, lineCap: .round)
                        )
                        .rotationEffect(.degrees(-90))
                    VStack(spacing: -1) {
                        Text("\(value)")
                            .font(.system(size: 12, weight: .heavy, design: .rounded))
                            .foregroundColor(Theme.primary)
                            .lineLimit(1)
                            .minimumScaleFactor(0.6)
                        Text(unit)
                            .font(.system(size: 7, weight: .semibold))
                            .foregroundColor(Theme.sub)
                    }
                }
                .frame(width: 34, height: 34)

                Image(systemName: "chevron.down")
                    .font(.system(size: 9, weight: .bold))
                    .foregroundColor(Color(hex: 0x7C9187))
                    .rotationEffect(.degrees(isOpen ? 180 : 0))
            }
            .padding(.horizontal, 5)
            .frame(height: 40)
            .background(
                RoundedRectangle(cornerRadius: 20, style: .continuous)
                    .fill(isOpen ? Theme.chip : Color.clear)
            )
            .contentShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        }
        .buttonStyle(.plain)
        .animation(.easeOut(duration: 0.18), value: isOpen)
    }
}

// MARK: - 科目下拉面板

/// 挂在 navbar 下方、右对齐的白色下拉卡：四个科目，当前项描边 + 勾。
struct SubjectMenuPanel: View {
    var current: ModuleNavTarget
    var onPick: (ModuleNavTarget) -> Void

    var body: some View {
        VStack(spacing: 2) {
            ForEach(ModuleNavTarget.allCases) { item in
                Button { onPick(item) } label: {
                    HStack(spacing: 10) {
                        Text(item.mark)
                            .font(.system(size: 12, weight: .heavy))
                            .foregroundColor(item.accent)
                            .frame(width: 30, height: 30)
                            .background(
                                RoundedRectangle(cornerRadius: 9, style: .continuous)
                                    .fill(item.tint)
                            )

                        Text(item.label)
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(Theme.ink)
                            .lineLimit(1)

                        Spacer(minLength: 8)

                        if item == current {
                            Image(systemName: "checkmark")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundColor(Theme.primary)
                        }
                    }
                    .padding(.horizontal, 9)
                    .frame(height: 46)
                    .background(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .fill(item == current ? Theme.chip : Color.clear)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(item == current ? Color(hex: 0x1F9D63).opacity(0.35) : .clear,
                                    lineWidth: 1)
                    )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(7)
        .frame(width: 212)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(Color.white)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(Color(hex: 0xDCEBE2), lineWidth: 1)
        )
        .overlay(alignment: .topTrailing) {
            CaretUp()
                .fill(Color.white)
                .frame(width: 16, height: 8)
                .offset(x: -24, y: -7)
                .shadow(color: Color(hex: 0x10261D).opacity(0.04), radius: 1, y: -1)
        }
        .shadow(color: Color(hex: 0x10261D).opacity(0.18), radius: 20, x: 0, y: 10)
    }
}

private struct CaretUp: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}
