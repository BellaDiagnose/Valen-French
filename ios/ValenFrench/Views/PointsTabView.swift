import SwiftUI

struct PointsTabView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(spacing: 12) {
                header
                filterChips

                if store.source == .enavant {
                    ForEach(store.filteredPointUnits) { unit in
                        PointUnitCard(unit: unit)
                    }
                } else {
                    ForEach(store.filteredGrammarGroups) { group in
                        GrammarGroupCard(group: group)
                    }
                }
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 18)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(store.source == .enavant ? "En Avant 知识点速查" : "简明法语 · 语法体系")
                .font(.system(size: 17, weight: .bold))
                .foregroundColor(Theme.ink)
            Text(store.source == .enavant
                 ? "共 \(store.pointUnits.count) 单元 · \(store.filteredPointUnits.count) 组"
                 : "上册 A1 + A2 · 语音 / 入门 / 初级 \(store.grammarGroups.reduce(0) { $0 + $1.lessons.count }) 课")
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Theme.sub)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 4)
    }

    @ViewBuilder
    private var filterChips: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                if store.source == .enavant {
                    Button {
                        store.filterUnit = 0
                    } label: {
                        SectionChip(text: "全部", active: store.filterUnit == 0)
                    }
                    .buttonStyle(.plain)

                    ForEach(store.pointUnits) { unit in
                        Button {
                            store.filterUnit = unit.unit
                        } label: {
                            SectionChip(text: "\(unit.unit)", active: store.filterUnit == unit.unit)
                        }
                        .buttonStyle(.plain)
                    }
                } else {
                    ForEach(store.levelOptions, id: \.self) { level in
                        Button {
                            store.filterLevel = level
                        } label: {
                            SectionChip(text: level, active: store.filterLevel == level)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .padding(.vertical, 2)
        }
    }
}

// MARK: - En Avant 单元知识点

struct PointUnitCard: View {
    let unit: PointUnit
    @EnvironmentObject private var store: AppStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                Text("Unit \(unit.unit)")
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Capsule().fill(Theme.primary))
                Text(unit.theme)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(Theme.ink)
                    .lineLimit(1)
                Spacer(minLength: 0)
            }

            if !unit.points.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(unit.points) { point in
                        VStack(alignment: .leading, spacing: 3) {
                            Text(point.title)
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundColor(Theme.ink)
                            Text(point.cn)
                                .font(.system(size: 12))
                                .foregroundColor(Theme.sub)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(10)
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(Theme.accentSoft)
                        )
                    }
                }
            }

            if !unit.examples.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Text("例句")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(Theme.primary)
                    ForEach(unit.examples) { example in
                        HStack(alignment: .top, spacing: 8) {
                            VStack(alignment: .leading, spacing: 2) {
                                Text(example.fr)
                                    .font(.system(size: 13, weight: .medium, design: .serif))
                                    .foregroundColor(Theme.ink)
                                    .fixedSize(horizontal: false, vertical: true)
                                Text(example.cn)
                                    .font(.system(size: 11))
                                    .foregroundColor(Theme.sub)
                            }
                            Spacer(minLength: 0)
                            SpeakButton(text: example.fr, size: 11)
                        }
                    }
                }
            }
        }
        .cardSurface(radius: 20, padding: 14)
    }
}

// MARK: - 简明法语语法体系

struct GrammarGroupCard: View {
    let group: GrammarGroup

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                Text(group.key)
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 9)
                    .padding(.vertical, 4)
                    .background(Capsule().fill(Theme.primary))
                Spacer(minLength: 0)
                Text("\(group.lessons.count) 课")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(Theme.sub)
            }

            ForEach(group.lessons) { lesson in
                VStack(alignment: .leading, spacing: 5) {
                    HStack(spacing: 6) {
                        Text("第\(lesson.lesson)课")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(Theme.primary)
                        if !lesson.theme.isEmpty {
                            Text(lesson.theme)
                                .font(.system(size: 11, weight: .medium))
                                .foregroundColor(Theme.sub)
                        }
                        Spacer(minLength: 0)
                    }
                    if !lesson.topic.isEmpty {
                        Text(lesson.topic)
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(Theme.ink)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    ForEach(Array(lesson.points.enumerated()), id: \.offset) { _, point in
                        HStack(alignment: .top, spacing: 6) {
                            Circle()
                                .fill(Theme.primary.opacity(0.5))
                                .frame(width: 4, height: 4)
                                .padding(.top, 5)
                            Text(point)
                                .font(.system(size: 11))
                                .foregroundColor(Theme.sub)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(10)
                .background(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(Theme.accentSoft)
                )
            }
        }
        .cardSurface(radius: 20, padding: 14)
    }
}
