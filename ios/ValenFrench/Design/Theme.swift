import SwiftUI

// MARK: - 色板（爱尔兰绿，取自 AppIcon 的 #22AC70 → #053A28 渐变）

enum Theme {
    static let bg = Color(hex: 0xF2F8F4)          // 薄荷白底
    static let surface = Color.white
    static let primary = Color(hex: 0x0F8A5A)     // 主色：翡翠绿（白字对比 4.3:1）
    static let primarySoft = Color(hex: 0x22AC70) // 图标渐变亮端
    static let primaryDeep = Color(hex: 0x053A28) // 图标渐变暗端
    static let chip = Color(hex: 0xE4F1E9)        // 薄荷底
    static let track = Color(hex: 0xE6F0EA)       // 进度槽
    static let ink = Color(hex: 0x10261D)         // 墨绿黑
    static let sub = Color(hex: 0x5E7368)         // 鼠尾草灰
    static let line = Color(hex: 0xD7E7DD)
    static let success = Color(hex: 0x2E9E6B)
    static let warn = Color(hex: 0xD9754F)
    static let accentSoft = Color(hex: 0xF0F8F3)
}

extension Color {
    init(hex: UInt32) {
        self.init(.sRGB,
                  red: Double((hex >> 16) & 0xFF) / 255.0,
                  green: Double((hex >> 8) & 0xFF) / 255.0,
                  blue: Double(hex & 0xFF) / 255.0,
                  opacity: 1.0)
    }
}

// MARK: - 样式

extension View {
    /// 白色圆角卡片
    func cardSurface(radius: CGFloat = 22, padding: CGFloat = 18) -> some View {
        self
            .padding(padding)
            .background(
                RoundedRectangle(cornerRadius: radius, style: .continuous)
                    .fill(Theme.surface)
            )
            .shadow(color: Theme.ink.opacity(0.06), radius: 14, x: 0, y: 6)
    }

    /// 胶囊标签背景
    func chipBackground(active: Bool, radius: CGFloat = 16) -> some View {
        self.background(
            RoundedRectangle(cornerRadius: radius, style: .continuous)
                .fill(active ? Theme.primary : Theme.chip)
        )
    }

    func toast(text: Binding<String?>) -> some View {
        overlay(alignment: .bottom) {
            if let message = text.wrappedValue {
                Text(message)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 18)
                    .padding(.vertical, 11)
                    .background(
                        Capsule().fill(Theme.ink.opacity(0.88))
                    )
                    .padding(.bottom, 40)
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
                    .animation(.easeOut(duration: 0.2), value: message)
            }
        }
    }
}

// MARK: - 按钮

struct PrimaryButtonStyle: ButtonStyle {
    var color: Color = Theme.primary
    var height: CGFloat = 46

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 15, weight: .semibold))
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .frame(height: height)
            .background(
                RoundedRectangle(cornerRadius: 14, style: .continuous)
                    .fill(color.opacity(configuration.isPressed ? 0.82 : 1))
            )
    }
}

struct SoftButtonStyle: ButtonStyle {
    var color: Color = Theme.primary
    var height: CGFloat = 42

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 14, weight: .semibold))
            .foregroundColor(color)
            .frame(maxWidth: .infinity)
            .frame(height: height)
            .background(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(color.opacity(configuration.isPressed ? 0.16 : 0.1))
            )
    }
}

// MARK: - 小组件

struct SectionChip: View {
    let text: String
    let active: Bool

    var body: some View {
        Text(text)
            .font(.system(size: 14, weight: active ? .bold : .semibold))
            .foregroundColor(active ? .white : Theme.sub)
            .padding(.horizontal, 14)
            .frame(minWidth: 58)
            .frame(height: 38)
            .chipBackground(active: active)
            .fixedSize()
    }
}

struct StatCard: View {
    let value: String
    let label: String
    let tint: Color

    var body: some View {
        VStack(spacing: 6) {
            Text(value)
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .foregroundColor(tint)
            Text(label)
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(tint.opacity(0.08))
        )
    }
}

struct SpeakButton: View {
    let text: String
    var size: CGFloat = 15

    var body: some View {
        Button {
            SpeechService.shared.speak(text)
        } label: {
            Image(systemName: "speaker.wave.2.fill")
                .font(.system(size: size, weight: .semibold))
                .foregroundColor(Theme.primary)
                .padding(8)
                .background(Circle().fill(Theme.primary.opacity(0.1)))
        }
        .buttonStyle(.plain)
        .accessibilityLabel("朗读")
    }
}

// MARK: - 空态

struct EmptyHint: View {
    let text: String

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: "checkmark.seal")
                .font(.system(size: 34, weight: .light))
                .foregroundColor(Theme.primary.opacity(0.5))
            Text(text)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 36)
    }
}
