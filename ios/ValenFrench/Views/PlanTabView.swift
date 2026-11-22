import SwiftUI

struct PlanTabView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 12) {
                statRow
                progressCard
                actionButtons

                if store.verbDueCount > 0 {
                    verbDueCard
                }

                WordGroupList(bucket: .due)
                WordGroupList(bucket: .learning)
                WordGroupList(bucket: .fresh)

                Button {
                    store.browseAll()
                } label: {
                    Text("浏览全部单词 →")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.primary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .fill(Theme.surface)
                        )
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 18)
        }
    }

    // MARK: 三个统计

    private var statRow: some View {
        HStack(spacing: 8) {
            StatCard(value: "\(store.stats.dueCount)", label: "今日待复习", tint: Theme.primary)
            StatCard(value: "\(store.stats.learningCount)", label: "学习中", tint: Theme.primarySoft)
            StatCard(value: "\(store.stats.newCount)", label: "新词", tint: Theme.sub)
        }
    }

    // MARK: 今日进度

    private var progressCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                Text("今日进度")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(Theme.ink)
                Spacer(minLength: 0)
                Text("\(min(store.plan.queue.count, store.studiedTodayCount)) / \(store.plan.queue.count)")
                    .font(.system(size: 13, weight: .bold, design: .rounded))
                    .foregroundColor(Theme.primary)
            }

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.track)
                    Capsule()
                        .fill(LinearGradient(colors: [Theme.primary, Theme.primarySoft],
                                             startPoint: .leading,
                                             endPoint: .trailing))
                        .frame(width: max(6, geo.size.width * store.ringProgress))
                        .animation(.easeOut(duration: 0.55), value: store.ringProgress)
                }
            }
            .frame(height: 9)

            HStack(spacing: 10) {
                Label("每日 \(store.plan.dailyNewCount) 词", systemImage: "target")
                Label("连续 \(store.plan.streak) 天", systemImage: "flame")
                Spacer(minLength: 0)
                Label("固化 \(store.stats.graduatedPercent)%", systemImage: "checkmark.seal")
            }
            .font(.system(size: 11, weight: .medium))
            .foregroundColor(Theme.sub)
            .labelStyle(TightLabelStyle())
        }
        .cardSurface(radius: 20, padding: 16)
    }

    // MARK: 入口按钮

    private var actionButtons: some View {
        VStack(spacing: 8) {
            Button {
                store.startReview()
            } label: {
                Text("开始复习 · \(store.stats.dueCount) 词")
            }
            .buttonStyle(PrimaryButtonStyle())

            Button {
                store.startNew()
            } label: {
                Text("背今日新词 · \(store.plan.queue.count) 词")
            }
            .buttonStyle(SoftButtonStyle(height: 46))
        }
    }

    private var verbDueCard: some View {
        HStack(spacing: 10) {
            Image(systemName: "textformat.abc")
                .font(.system(size: 18, weight: .semibold))
                .foregroundColor(Theme.primary)

            VStack(alignment: .leading, spacing: 2) {
                Text("变位待复习")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(Theme.ink)
                Text("\(store.verbDueCount) 个动词到复习时间")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(Theme.sub)
            }

            Spacer(minLength: 0)

            Button {
                store.startVerbReview()
            } label: {
                Text("去复习")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)
                    .background(Capsule().fill(Theme.primary))
            }
            .buttonStyle(.plain)
        }
        .cardSurface(radius: 18, padding: 14)
    }
}

// MARK: - 分组词表

struct WordGroupList: View {
    @EnvironmentObject private var store: AppStore
    let bucket: MemoryStats.Bucket

    private var bucketWords: [Word] {
        store.stats.words(in: bucket)
    }

    var body: some View {
        if !bucketWords.isEmpty {
            VStack(alignment: .leading, spacing: 8) {
                HStack(spacing: 8) {
                    Text(bucket.title)
                        .font(.system(size: 13, weight: .bold))
                        .foregroundColor(Theme.ink)
                    Text("\(bucketWords.count)")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(Theme.primary)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Capsule().fill(Theme.primary.opacity(0.1)))
                    Spacer(minLength: 0)
                }

                ForEach(Array(bucketWords.prefix(6))) { word in
                    Button {
                        store.focus(bucket: bucket, wordID: word.id)
                    } label: {
                        HStack(spacing: 10) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(word.fr)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundColor(Theme.ink)
                                    .lineLimit(1)
                                Text(word.cn)
                                    .font(.system(size: 11))
                                    .foregroundColor(Theme.sub)
                                    .lineLimit(1)
                            }
                            Spacer(minLength: 0)
                            if let record = store.memory[word.id], !record.isGraduated, record.dueAt > 0 {
                                Text(AppStore.formatDate(record.dueAt))
                                    .font(.system(size: 10, weight: .medium))
                                    .foregroundColor(Theme.sub)
                            }
                            Image(systemName: "chevron.right")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(Theme.sub.opacity(0.6))
                        }
                        .padding(.vertical, 8)
                    }
                    .buttonStyle(.plain)
                }

                if bucketWords.count > 6 {
                    Button {
                        if let first = bucketWords.first {
                            store.focus(bucket: bucket, wordID: first.id)
                        }
                    } label: {
                        Text("查看全部 \(bucketWords.count) 个 →")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(Theme.primary)
                    }
                    .buttonStyle(.plain)
                }
            }
            .cardSurface(radius: 20, padding: 14)
        }
    }
}

// MARK: - 紧凑 Label

struct TightLabelStyle: LabelStyle {
    func makeBody(configuration: Configuration) -> some View {
        HStack(spacing: 4) {
            configuration.icon.font(.system(size: 10, weight: .semibold))
            configuration.title
        }
    }
}
