import SwiftUI

/// 右上角进度环悬浮球：可拖动；点击翻面选择词库
struct FloatingRingView: View {
    @EnvironmentObject private var store: AppStore

    @State private var base: CGSize = .zero
    @State private var translation: CGSize = .zero
    @State private var flipped = false

    private let ballSize: CGFloat = 76
    private let pickerWidth: CGFloat = 148

    var body: some View {
        Group {
            if flipped { picker } else { ring }
        }
        .offset(x: clamped.width, y: clamped.height)
        .gesture(dragGesture)
        .animation(.easeOut(duration: 0.28), value: flipped)
    }

    private var clamped: CGSize {
        CGSize(width: min(0, max(-240, base.width + translation.width)),
               height: max(0, min(520, base.height + translation.height)))
    }

    private var dragGesture: some Gesture {
        DragGesture(minimumDistance: 8)
            .onChanged { value in
                translation = value.translation
            }
            .onEnded { _ in
                base = clamped
                translation = .zero
            }
    }

    // MARK: 正面：今日进度环 + 连续天数

    private var ring: some View {
        ZStack {
            Circle()
                .fill(Theme.surface)
                .shadow(color: Theme.primary.opacity(0.18), radius: 10, x: 0, y: 5)

            Circle()
                .stroke(Theme.track, lineWidth: 7)
                .padding(6)

            Circle()
                .trim(from: 0, to: store.ringProgress)
                .stroke(
                    LinearGradient(colors: [Theme.primary, Theme.primarySoft],
                                   startPoint: .topLeading,
                                   endPoint: .bottomTrailing),
                    style: StrokeStyle(lineWidth: 7, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .padding(6)
                .animation(.easeOut(duration: 0.55), value: store.ringProgress)

            VStack(spacing: -1) {
                Text("\(store.ringDays)")
                    .font(.system(size: 23, weight: .bold, design: .rounded))
                    .foregroundColor(Theme.ink)
                Text("天")
                    .font(.system(size: 9, weight: .semibold))
                    .foregroundColor(Theme.sub)
            }
        }
        .frame(width: ballSize, height: ballSize)
        .contentShape(Circle())
        .onTapGesture {
            withAnimation(.easeInOut(duration: 0.28)) { flipped = true }
        }
        .accessibilityLabel("今日进度，连续 \(store.ringDays) 天")
    }

    // MARK: 背面：词库选择

    private var picker: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("切换词库")
                .font(.system(size: 12, weight: .bold))
                .foregroundColor(Theme.sub)

            ForEach(WordSource.allCases) { src in
                Button {
                    store.switchSource(src)
                    withAnimation(.easeInOut(duration: 0.28)) { flipped = false }
                } label: {
                    HStack(spacing: 6) {
                        Text(src.label)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(store.source == src ? .white : Theme.ink)
                        Spacer(minLength: 0)
                        if store.source == src {
                            Image(systemName: "checkmark")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundColor(.white)
                        }
                    }
                    .padding(.horizontal, 10)
                    .frame(height: 34)
                    .background(
                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                            .fill(store.source == src ? Theme.primary : Theme.chip)
                    )
                }
                .buttonStyle(.plain)
            }

            Text("点击此处翻回")
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(Theme.sub)
                .frame(maxWidth: .infinity)
                .padding(.top, 2)
                .onTapGesture {
                    withAnimation(.easeInOut(duration: 0.28)) { flipped = false }
                }
        }
        .frame(width: pickerWidth)
        .cardSurface(radius: 18, padding: 12)
    }
}
