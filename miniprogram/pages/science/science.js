// pages/science/science.js —— 科学（七+八年级生物 / 八年级化学）双语知识点 + 公式背诵
//
// 数据源：data-bio.js / data-chem.js / data-formula.js
// 记忆算法复用 pages/french/study.js（1/2/4/7/15/30/60 天）
// 存储键与法语端隔离：science_memory_v1 / science_plan_v1 / science_stats_v1

const S = require('../french/study.js');
const FLOAT_NAV = require('../common/float-nav.js');
const R = require('../common/recall.js');
const EQ = require('../common/equation.js');
const B = require('./data-bio.js');
const C = require('./data-chem.js');
const F = require('./data-formula.js');

const MEMORY_KEY = 'science_memory_v1';
const PLAN_KEY = 'science_plan_v1';
const STATS_KEY = 'science_stats_v1';

// 各类目对应的完整词条。data-bio / data-chem 的 id 已带 b/c 前缀，
// gid 直接等于 id（b01 / c01），与首页、PWA、iOS 的记忆键完全一致。
function withGid(list) {
  return list.map((p) => Object.assign({}, p, { gid: p.id }));
}

const BANK = {
  bio: { name: '生物', units: B.units, points: withGid(B.points), prefix: 'b' },
  chem: { name: '化学', units: C.units, points: withGid(C.points), prefix: 'c' }
};

// 公式按学科分组：生物 = bio + bio-gen，化学 = chem-*
function formulasOf(subject) {
  return F.formulas.filter((f) => (subject === 'bio'
    ? f.unit.indexOf('bio') === 0
    : f.unit.indexOf('chem') === 0));
}

// 知识点卡片页不是「全库浏览」，而是每日卡组：
// 今日到期（dueAt 已过）+ 今日额度内的新卡，评过分即推到明天之后、自动离场。
const QUEUE_WORDS = { review: '复习', study: '新学', browse: '浏览' };

function queueLabel(mode, count) {
  if (!mode) return '';
  return `${QUEUE_WORDS[mode] || '浏览'} · ${count} 条`;
}

function queueTone(mode) {
  if (mode === 'study') return 'study';
  if (mode === 'review') return 'review';
  return '';
}

function subjectGids(subject, kind) {
  return kind === 'formula'
    ? formulasOf(subject).map((f) => 'f' + f.id)
    : BANK[subject].points.map((p) => p.gid);
}

Page(Object.assign({}, FLOAT_NAV.methods, {
  data: {
    subject: 'bio',

    // —— 悬浮球（模块导航）——
    floatX: 0, floatY: 0, floatFlipped: false,
    floatCurrent: 'bio', floatNavItems: [],
    floatValue: '', floatUnit: '', floatCurrentLabel: '',
    tabs: [
      { key: 'point', label: '每日背诵' },
      { key: 'formula', label: '公式' },
      { key: 'quiz', label: '自测' },
      { key: 'plan', label: '复习计划' }
    ],
    activeTab: 'point',

    // —— 每日背诵（知识点卡组）——
    pointIds: [],
    pointQueue: null,        // 非空 = 从计划清单点进来的临时队列
    pointQueueLabel: '',
    pointQueueTone: '',
    pointQueueMode: '',
    pointIndex: 0,
    point: null,
    pointFlipped: false,
    pointLang: 'zh',        // zh 正面中文 / en 正面英文
    pointStage: -1,
    pointStageLabel: '',
    pointNextDue: '',
    // 今日卡组进度：pointTodayDone = 今天已评过分的张数，pointTodayTotal = 今日总量
    pointDeckDue: 0,
    pointDeckNew: 0,
    pointTodayDone: 0,
    pointTodayTotal: 0,
    pointDeckPercent: 0,

    // —— 公式卡 ——
    formulaUnits: [],
    formulaUnitFilter: 0,
    formulaIds: [],
    formulaQueue: null,
    formulaQueueLabel: '',
    formulaQueueTone: '',
    formulaIndex: 0,
    formula: null,
    formulaRows: [],        // 排版行：每行是若干不可拆的「运算符 + 化学式」组
    formulaSize: 38,        // 38 / 32 / 27 / 24（rpx）
    formulaFlipped: false,
    formulaLang: 'zh',
    formulaStage: -1,
    formulaStageLabel: '',
    formulaNextDue: '',

    // —— 自测 ——
    quizMode: 'point',      // point = 术语互译 / formula = 公式配对
    quizLang: 'en2zh',      // en2zh / zh2en
    quizWay: 'choice',      // choice = 四选一 / recall = 默写
    recall: null,
    quiz: null,
    quizAnswered: false,
    quizSelectedId: -1,
    quizCorrect: false,
    quizTotal: 0,
    quizRight: 0,
    askedIds: [],

    // —— 复习计划 ——
    planDueItems: [], planLearningItems: [], planNewItems: [], planGraduatedItems: [],
    planDueCount: 0, planLearningCount: 0, planNewCount: 0, planGraduatedCount: 0,
    planDailyCount: 20, planStreak: 0,
    planItemCount: 0, planPointCount: 0, planFormulaCount: 0, planSubjectLabel: '生物',
    planDeckCount: 0, planFormulaDueCount: 0,

    // —— 全局 ——
    memory: {},
    plan: null,
    dailyCount: 10,
    studiedToday: 0,
    ringPercent: 0,
    toast: ''
  },

  // ==================== 生命周期 ====================
  onLoad(options) {
    FLOAT_NAV.initFloatPosition(this);
    const memory = wx.getStorageSync(MEMORY_KEY) || {};
    const plan = wx.getStorageSync(PLAN_KEY) || S.initPlan(Date.now());
    const stats = wx.getStorageSync(STATS_KEY) || { total: 0, right: 0 };
    const subject = options && options.subject === 'chem' ? 'chem' : 'bio';
    this.setData({
      memory, plan,
      quizTotal: stats.total || 0,
      quizRight: stats.right || 0
    }, () => {
      this.refreshSubject(subject);
      this.syncFloatNav();
    });
  },

  // ============ 悬浮球：当前模块进度 + 模块导航 ============
  syncFloatNav() {
    const subject = this.data.subject;
    FLOAT_NAV.syncNavData(this, subject);
    this.setData({
      floatValue: this.data.studiedToday || 0,
      floatUnit: '今日',
      floatCurrentLabel: subject === 'chem' ? '化学' : '生物'
    });
  },

  onShow() {
    // 从别的页面返回时，重算今日进度（可能跨天）
    const memory = wx.getStorageSync(MEMORY_KEY) || this.data.memory;
    let plan = wx.getStorageSync(PLAN_KEY) || this.data.plan || S.initPlan(Date.now());
    const state = S.openState(plan, Date.now());
    plan = S.buildDailyPlan(plan, state, this.allItems(), memory);
    // 跨天：今日新卡队列作废，下次渲染重新按额度挑卡
    if (state.crossDay) plan = Object.assign({}, plan, { newQueues: {} });
    wx.setStorageSync(PLAN_KEY, plan);
    this.setData({ memory, plan }, () => {
      this.updateProgress();
      this.syncFloatNav();
      if (this.data.activeTab === 'plan') this.refreshPlan();
      // 跨天后卡组要重排；队列模式下不动用户当前队列
      if (this.data.activeTab === 'point' && !this.data.pointQueue) {
        this.showPoint(this.data.pointIndex);
      }
    });
  },

  // ==================== tab 切换 ====================
  onTabChange(e) {
    const key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    const patch = { activeTab: key };
    // 计划页顶部是统计卡和主按钮，球停到右下角；其余 tab 回到右上角
    FLOAT_NAV.dockFloat(this, key === 'plan' ? 'bottom' : 'top');
    this.setData(patch, () => {
      if (key === 'quiz' && !this.data.quiz && !this.data.recall) this.buildQuiz();
      if (key === 'plan') this.refreshPlan();
      if (key === 'point' && !this.data.pointQueue) this.showPoint(0);
    });
  },

  refreshSubject(subject) {
    const formulaUnits = [{ key: 0, label: '全部' }].concat(
      F.units.filter((u) => (subject === 'bio'
        ? u.subject === 'bio' : u.subject === 'chem'))
        .map((u) => ({ key: u.key, label: u.label }))
    );
    this.setData({
      subject,
      formulaUnits,
      formulaUnitFilter: 0,
      activeTab: 'point',
      pointIndex: 0,
      pointQueue: null,
      pointQueueLabel: '',
      pointQueueTone: '',
      pointQueueMode: '',
      formulaIndex: 0,
      formulaQueue: null,
      formulaQueueLabel: '',
      formulaQueueTone: '',
      quiz: null,
      askedIds: []
    }, () => {
      FLOAT_NAV.dockFloat(this, 'top');
      this.showPoint(0);
      this.showFormula(0);
      this.updateProgress();
      this.refreshPlan();
      this.syncFloatNav();
    });
  },

  // ==================== 通用工具 ====================
  allItems() {
    return BANK.bio.points.concat(BANK.chem.points,
      F.formulas.map((f) => Object.assign({}, f, { gid: 'f' + f.id })));
  },

  findPoint(gid) {
    return BANK[this.data.subject].points.filter((p) => p.gid === gid)[0] || null;
  },

  findFormula(id) {
    return formulasOf(this.data.subject).filter((f) => f.id === id)[0] || null;
  },

  stageLabel(stage) {
    if (stage == null || stage < 0) return '未开始';
    if (stage >= S.GRADUATED) return '已固化';
    return `第 ${stage + 1} 档 · ${S.STAGES[stage]} 天`;
  },

  dueDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  },

  studiedToday(memory) {
    const today = S.dateStr(Date.now());
    let n = 0;
    Object.keys(memory).forEach((gid) => {
      const m = memory[gid];
      if (m && m.lastReview) {
        const d = new Date(m.lastReview);
        const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (ds === today) n += 1;
      }
    });
    return n;
  },

  updateProgress() {
    const memory = this.data.memory;
    const studied = this.studiedToday(memory);
    const quota = this.data.plan ? this.data.plan.dailyNewCount : S.DEFAULT_DAILY;
    this.setData({
      studiedToday: studied,
      ringPercent: Math.min(100, Math.round((studied / quota) * 100))
    });
  },

  // ==================== 每日背诵（知识点卡组） ====================
  // 今日新卡队列当天定一次、存进 plan.newQueues（按科目分开）：
  // 背掉的卡离场后不会从后面「补位」，否则一天能无限背下去。
  ensureNewQueue() {
    const subject = this.data.subject;
    const today = S.dateStr(Date.now());
    const plan = this.data.plan || {};
    const queues = plan.newQueues || {};
    const pinned = queues[subject];
    if (pinned && pinned.date === today) return pinned.ids;
    const quota = plan.dailyNewCount || S.DEFAULT_DAILY;
    const memory = this.data.memory;
    const ids = subjectGids(subject, 'point')
      .filter((gid) => !memory[gid])
      .slice(0, quota);
    const nextQueues = Object.assign({}, queues);
    nextQueues[subject] = { date: today, ids };
    const nextPlan = Object.assign({}, plan, { newQueues: nextQueues });
    wx.setStorageSync(PLAN_KEY, nextPlan);
    this.setData({ plan: nextPlan });
    return ids;
  },

  // 卡组 = 今日到期（按到期先后）+ 今日新卡里还没背的
  deckOf(kind) {
    const memory = this.data.memory;
    const now = Date.now();
    const due = [];
    subjectGids(this.data.subject, kind).forEach((gid) => {
      const m = memory[gid];
      if (m && m.stage < S.GRADUATED && m.dueAt && m.dueAt <= now) due.push(gid);
    });
    due.sort((a, b) => memory[a].dueAt - memory[b].dueAt);
    const newIds = kind === 'formula'
      ? []
      : this.ensureNewQueue().filter((gid) => !memory[gid]);
    return { due, newIds, ids: due.concat(newIds) };
  },

  reviewedToday(kind) {
    const today = S.dateStr(Date.now());
    const memory = this.data.memory;
    return subjectGids(this.data.subject, kind).filter((gid) => {
      const m = memory[gid];
      return m && m.lastReview && S.dateStr(m.lastReview) === today;
    }).length;
  },

  // 队列模式（从计划清单点某一条进来）优先，否则用今日卡组
  visiblePointIds() {
    if (this.data.pointQueue && this.data.pointQueue.length) return this.data.pointQueue;
    return this.deckOf('point').ids;
  },

  showPoint(i) {
    const deck = this.deckOf('point');
    const queued = !!(this.data.pointQueue && this.data.pointQueue.length);
    const ids = queued ? this.data.pointQueue : deck.ids;
    const done = this.reviewedToday('point');
    const total = deck.ids.length + done;
    const base = {
      pointIds: ids,
      pointDeckDue: deck.due.length,
      pointDeckNew: deck.newIds.length,
      pointTodayDone: done,
      pointTodayTotal: total,
      pointDeckPercent: total ? Math.round((done / total) * 100) : 0,
      pointFlipped: false
    };
    if (!ids.length) {
      this.setData(Object.assign(base, { point: null, pointIndex: 0 }));
      return;
    }
    const idx = Math.max(0, Math.min(i, ids.length - 1));
    const gid = ids[idx];
    const point = this.findPoint(gid) || BANK.bio.points.concat(BANK.chem.points)
      .filter((p) => p.gid === gid)[0];
    const mem = this.data.memory[gid];
    this.setData(Object.assign(base, {
      pointIndex: idx,
      point,
      pointStage: mem ? mem.stage : -1,
      pointStageLabel: this.stageLabel(mem ? mem.stage : -1),
      pointNextDue: mem && mem.dueAt ? this.dueDate(mem.dueAt) : ''
    }));
  },

  prevPoint() { this.showPoint(this.data.pointIndex - 1); },
  nextPoint() { this.showPoint(this.data.pointIndex + 1); },
  flipPoint() { this.setData({ pointFlipped: !this.data.pointFlipped }); },
  togglePointLang() {
    this.setData({ pointLang: this.data.pointLang === 'zh' ? 'en' : 'zh' });
  },

  // 评分后这张卡 dueAt 推到明天之后 → 自动离开卡组，停在原位置看下一张
  ratePoint(e) {
    const delta = Number(e.currentTarget.dataset.delta);
    const point = this.data.point;
    if (!point) return;
    const gid = point.gid;
    const memory = Object.assign({}, this.data.memory);
    memory[gid] = S.advanceMemory(memory[gid], delta, Date.now());
    wx.setStorageSync(MEMORY_KEY, memory);
    const m = memory[gid];
    const patch = { memory };
    if (this.data.pointQueue) {
      const left = this.data.pointQueue.filter((id) => id !== gid);
      patch.pointQueue = left.length ? left : null;
      patch.pointQueueLabel = left.length ? queueLabel(this.data.pointQueueMode, left.length) : '';
      patch.pointQueueTone = left.length ? queueTone(this.data.pointQueueMode) : '';
      patch.pointQueueMode = left.length ? this.data.pointQueueMode : '';
    }
    this.setData(patch, () => {
      this.updateProgress();
      this.syncFloatNav();
      this.showPoint(this.data.pointIndex);
      wx.showToast({
        title: delta > 0 ? `已记住 · ${this.stageLabel(m.stage)}` : '已重置 · 明天再来',
        icon: 'none'
      });
    });
  },

  goPlan() {
    FLOAT_NAV.dockFloat(this, 'bottom');
    this.setData({ activeTab: 'plan' }, () => this.refreshPlan());
  },

  // ==================== 公式卡 ====================
  onFormulaUnitFilter(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ formulaUnitFilter: key, formulaQueue: null, formulaQueueLabel: '', formulaQueueTone: '' }, () => this.showFormula(0));
  },

  visibleFormulaIds() {
    if (this.data.formulaQueue && this.data.formulaQueue.length) return this.data.formulaQueue;
    return formulasOf(this.data.subject)
      .filter((f) => !this.data.formulaUnitFilter || f.unit === this.data.formulaUnitFilter)
      .map((f) => f.id);
  },

  showFormula(i) {
    const ids = this.visibleFormulaIds();
    if (!ids.length) {
      this.setData({ formula: null, formulaIds: [], formulaIndex: 0, formulaRows: [], formulaSize: 38 });
      return;
    }
    const idx = Math.max(0, Math.min(i, ids.length - 1));
    const id = ids[idx];
    const formula = this.findFormula(id);
    const mem = this.data.memory['f' + id];
    this.setData({
      formulaIds: ids,
      formulaIndex: idx,
      formula,
      formulaRows: formula && formula.formula ? this.layoutFormula(formula.formula) : [],
      formulaSize: formula && formula.formula ? EQ.layout(formula.formula).size : 0,
      formulaFlipped: false,
      formulaStage: mem ? mem.stage : -1,
      formulaStageLabel: this.stageLabel(mem ? mem.stage : -1),
      formulaNextDue: mem && mem.dueAt ? this.dueDate(mem.dueAt) : ''
    });
  },

  // 公式排版：一行放得下就一行，放不下按箭头断成两行（见 common/equation.js）
  layoutFormula(text) {
    const layout = EQ.layout(text);
    return layout.rows.map((row, i) => ({ k: i, groups: row }));
  },

  prevFormula() { this.showFormula(this.data.formulaIndex - 1); },
  nextFormula() { this.showFormula(this.data.formulaIndex + 1); },
  flipFormula() { this.setData({ formulaFlipped: !this.data.formulaFlipped }); },
  toggleFormulaLang() {
    this.setData({ formulaLang: this.data.formulaLang === 'zh' ? 'en' : 'zh' });
  },

  rateFormula(e) {
    const delta = Number(e.currentTarget.dataset.delta);
    const f = this.data.formula;
    if (!f) return;
    const gid = 'f' + f.id;
    const memory = Object.assign({}, this.data.memory);
    memory[gid] = S.advanceMemory(memory[gid], delta, Date.now());
    wx.setStorageSync(MEMORY_KEY, memory);
    const m = memory[gid];
    this.setData({
      memory,
      formulaStage: m.stage,
      formulaStageLabel: this.stageLabel(m.stage),
      formulaNextDue: m.dueAt ? this.dueDate(m.dueAt) : ''
    }, () => {
      this.updateProgress();
      wx.showToast({
        title: delta > 0 ? `已记住 · ${this.stageLabel(m.stage)}` : '已重置 · 明天再来',
        icon: 'none'
      });
    });
  },

  // ==================== 复习计划 ====================
  // 计划按「当前科目」统计：该科目全部知识点 + 该科目公式
  subjectItems() {
    const subject = this.data.subject;
    // gid = 记忆键（公式带 f 前缀）；cardId = 卡片页用的 id（公式不带前缀）
    const points = BANK[subject].points.map((p) => ({
      gid: p.gid, cardId: p.gid, kind: 'point', title: p.cn, sub: p.en
    }));
    const formulas = formulasOf(subject).map((f) => ({
      gid: 'f' + f.id, cardId: f.id, kind: 'formula', title: f.cn, sub: f.expr
    }));
    return points.concat(formulas);
  },

  refreshPlan() {
    const items = this.subjectItems();
    const memory = this.data.memory;
    const now = Date.now();
    const due = [], learning = [], fresh = [], graduated = [];
    items.forEach((it) => {
      const m = memory[it.gid];
      if (!m) { fresh.push(Object.assign({}, it, { stageText: '未开始' })); return; }
      if (m.stage >= S.GRADUATED) {
        graduated.push(Object.assign({}, it, { stageText: '完成全部间隔' }));
        return;
      }
      if (m.dueAt && m.dueAt <= now) {
        due.push(Object.assign({}, it, { stageText: '已到期', dueAt: m.dueAt }));
        return;
      }
      learning.push(Object.assign({}, it, {
        stageText: `第 ${m.stage + 1} 档 · ${this.dueDate(m.dueAt)}`
      }));
    });
    due.sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0));
    const plan = this.data.plan || {};
    const subject = this.data.subject;
    const formulaDue = due.filter((i) => i.kind === 'formula').length;
    this.setData({
      planDueItems: due,
      planLearningItems: learning,
      planNewItems: fresh,
      planGraduatedItems: graduated,
      planDueCount: due.length,
      planLearningCount: learning.length,
      planNewCount: fresh.length,
      planGraduatedCount: graduated.length,
      planDailyCount: plan.dailyNewCount || S.DEFAULT_DAILY,
      planStreak: plan.streak || 0,
      planItemCount: items.length,
      planPointCount: BANK[subject].points.length,
      planFormulaCount: formulasOf(subject).length,
      planSubjectLabel: subject === 'chem' ? '化学' : '生物',
      planDeckCount: this.deckOf('point').ids.length,
      planFormulaDueCount: formulaDue
    });
  },

  // 从计划清单打开一组卡片队列：mode = review（待复习）/ study（新学）/ browse（学习中、已固化）
  openQueue(kind, ids, mode, start) {
    const idx = Math.max(0, start || 0);
    FLOAT_NAV.dockFloat(this, 'top');
    const label = queueLabel(mode, ids.length);
    const tone = queueTone(mode);
    if (kind === 'point') {
      this.setData({
        activeTab: 'point', pointQueue: ids, pointQueueLabel: label,
        pointQueueTone: tone, pointQueueMode: mode
      }, () => this.showPoint(idx));
    } else {
      this.setData({
        activeTab: 'formula', formulaQueue: ids, formulaQueueLabel: label,
        formulaQueueTone: tone
      }, () => this.showFormula(idx));
    }
  },

  // 计划页主按钮：回到「每日背诵」，卡组按今日额度和到期重新排
  startTodayDeck() {
    FLOAT_NAV.dockFloat(this, 'top');
    this.setData({
      activeTab: 'point',
      pointQueue: null, pointQueueLabel: '', pointQueueTone: '', pointQueueMode: ''
    }, () => this.showPoint(0));
  },

  // 公式卡不参与每日卡组，待复习的公式单独给入口
  startFormulaReview() {
    const formulas = this.data.planDueItems
      .filter((i) => i.kind === 'formula').map((i) => i.cardId);
    if (!formulas.length) {
      wx.showToast({ title: '今天没有待复习的公式 🎉', icon: 'none' });
      return;
    }
    this.openQueue('formula', formulas, 'review', 0);
  },

  // 点清单里的某一条：把该组作为队列，并从这条开始
  onPlanItemTap(e) {
    const { gid, kind, group } = e.currentTarget.dataset;
    const map = {
      due: 'planDueItems', learning: 'planLearningItems',
      new: 'planNewItems', graduated: 'planGraduatedItems'
    };
    // 同一组里混着知识点和公式，队列只取同类型，否则 showFormula 拿不到知识点 id
    const list = (this.data[map[group]] || []).filter((i) => i.kind === kind);
    const ids = list.map((i) => i.cardId);
    const idx = Math.max(0, list.findIndex((i) => i.gid === gid));
    const mode = group === 'due' ? 'review' : (group === 'new' ? 'study' : 'browse');
    this.openQueue(kind, ids, mode, idx);
  },

  // 点队列标签退出，回到今日卡组
  exitQueue(e) {
    const kind = e.currentTarget.dataset.kind;
    if (kind === 'formula') {
      this.setData({ formulaQueue: null, formulaQueueLabel: '', formulaQueueTone: '' },
        () => this.showFormula(0));
    } else {
      this.setData({
        pointQueue: null, pointQueueLabel: '', pointQueueTone: '', pointQueueMode: ''
      }, () => this.showPoint(0));
    }
  },

  // ==================== 自测 ====================
  onQuizModeChange(e) {
    this.setData({ quizMode: e.currentTarget.dataset.key, quiz: null, recall: null, askedIds: [] },
      () => this.buildQuiz());
  },

  onQuizLangChange(e) {
    this.setData({ quizLang: e.currentTarget.dataset.key, quiz: null },
      () => this.buildQuiz());
  },

  onQuizWayChange(e) {
    const way = e.currentTarget.dataset.key;
    if (way === this.data.quizWay) return;
    this.setData({ quizWay: way, quiz: null, recall: null, askedIds: [] }, () => this.buildQuiz());
  },

  quizPool() {
    if (this.data.quizMode === 'formula') {
      return formulasOf(this.data.subject).map((f) => ({
        gid: 'f' + f.id,
        front: this.data.quizLang === 'en2zh' ? f.en : f.cn,
        back: this.data.quizLang === 'en2zh' ? f.cn : f.en,
        hint: f.expr
      }));
    }
    return BANK[this.data.subject].points
      .map((p) => ({
        gid: p.gid,
        front: this.data.quizLang === 'en2zh' ? p.en : p.cn,
        back: this.data.quizLang === 'en2zh' ? p.cn : p.en,
        hint: p.chapter
      }));
  },

  buildQuiz() {
    if (this.data.quizWay === 'recall') { this.buildRecall(); return; }
    this.buildChoiceQuiz();
  },

  buildChoiceQuiz() {
    const pool = this.quizPool();
    if (!pool.length) return;
    const { askedIds } = this.data;
    let candidates = pool.filter((q) => askedIds.indexOf(q.gid) === -1);
    if (candidates.length < 4) {
      candidates = pool.slice();
      this.setData({ askedIds: [] });
    }
    const answer = candidates[Math.floor(Math.random() * candidates.length)];
    const distractors = pool.filter((q) => q.gid !== answer.gid)
      .slice().sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [answer].concat(distractors)
      .map((q) => ({ id: q.gid, text: q.back }))
      .sort(() => Math.random() - 0.5);
    this.setData({
      quiz: { answer, options, answerId: answer.gid },
      quizAnswered: false,
      quizSelectedId: -1,
      quizCorrect: false,
      askedIds: this.data.askedIds.concat(answer.gid)
    });
  },

  // 默写题池：术语 → 中文写英文；公式 → 只留能真正写出来的化学式 / 计算式（文字型说明跳过）
  recallPool() {
    const subject = this.data.subject;
    const subjectName = subject === 'bio' ? '生物' : '化学';
    if (this.data.quizMode === 'formula') {
      return formulasOf(subject)
        .filter((f) => R.isDictatableFormula(f.formula))
        .map((f) => ({
          gid: 'f' + f.id,
          kind: 'chem',
          tag: `${subjectName} · 公式默写`,
          prompt: f.cn,
          sub: f.expr,
          answer: f.formula,
          extra: f.cond ? `条件：${f.cond}` : ''
        }));
    }
    return BANK[subject].points.map((p) => ({
      gid: p.gid,
      kind: 'term',
      tag: p.chapter,
      prompt: p.cn,
      sub: '',
      answer: p.en,
      extra: p.defCn
    }));
  },

  buildRecall() {
    const all = this.recallPool();
    if (!all.length) {
      wx.showToast({ title: '这一类没有可默写的条目', icon: 'none' });
      return;
    }
    const { askedIds } = this.data;
    let pool = all.filter((q) => askedIds.indexOf(q.gid) === -1);
    let base = askedIds;
    if (!pool.length) { pool = all.slice(); base = []; this.setData({ askedIds: [] }); }
    const q = pool[Math.floor(Math.random() * pool.length)];
    const isChem = q.kind === 'chem';
    this.setData({
      recall: {
        gid: q.gid,
        tag: q.tag,
        prompt: q.prompt,
        sub: q.sub,
        qhint: isChem
          ? '看中文名称与反应描述，写出化学式 · 下标打普通数字即可，→ 可写 = 或 ->'
          : '看中文写 LC 英文术语 · 首字母大小写不限，the / a 可省略',
        mask: R.hintOf(q.answer, q.kind),
        placeholder: isChem ? '例如 6CO2 + 6H2O → C6H12O6 + 6O2' : '在这里写英文术语',
        input: '', answered: false, status: '', statusText: '',
        kind: q.kind,
        answer: q.answer,
        extra: q.extra
      },
      askedIds: base.concat(q.gid)
    });
  },

  onRecallInput(e) {
    if (!this.data.recall) return;
    this.setData({ 'recall.input': e.detail.value });
  },

  submitRecall() {
    const rl = this.data.recall;
    if (!rl || rl.answered) return;
    const res = R.judge(rl.input, rl.answer, rl.kind);
    if (res === 'empty') {
      wx.showToast({ title: '先写一点再看答案', icon: 'none' });
      return;
    }
    this.settleRecall(res);
  },

  revealRecall() {
    const rl = this.data.recall;
    if (!rl || rl.answered) return;
    this.settleRecall('wrong');
  },

  settleRecall(status) {
    const rl = this.data.recall;
    const correct = status !== 'wrong';
    const memory = Object.assign({}, this.data.memory);
    memory[rl.gid] = S.advanceMemory(memory[rl.gid], correct ? 1 : -1, Date.now());
    wx.setStorageSync(MEMORY_KEY, memory);
    const total = this.data.quizTotal + 1;
    const right = this.data.quizRight + (correct ? 1 : 0);
    wx.setStorageSync(STATS_KEY, { total, right });
    const texts = rl.kind === 'chem'
      ? {
        right: '写对了 ✓',
        near: '差一点 · 空格或箭号写法不一致，答案本身对',
        wrong: '没写对 · 对照答案抄一遍'
      }
      : {
        right: '写对了 ✓',
        near: '差一点 · 只差重音、连字符或冠词',
        wrong: '没写对 · 对照答案抄一遍'
      };
    this.setData({
      recall: Object.assign({}, rl, { answered: true, status, statusText: texts[status] }),
      quizTotal: total,
      quizRight: right,
      memory
    }, () => this.updateProgress());
  },

  onSelectOption(e) {
    if (this.data.quizAnswered) return;
    const id = e.currentTarget.dataset.id;
    const correct = id === this.data.quiz.answerId;
    const total = this.data.quizTotal + 1;
    const right = this.data.quizRight + (correct ? 1 : 0);
    const stats = { total, right };
    wx.setStorageSync(STATS_KEY, stats);
    // 自测答对 → 记忆推进；答错 → 缩短间隔
    const memory = Object.assign({}, this.data.memory);
    const gid = this.data.quiz.answer.gid;
    memory[gid] = S.advanceMemory(memory[gid], correct ? 1 : -1, Date.now());
    wx.setStorageSync(MEMORY_KEY, memory);
    this.setData({
      quizAnswered: true,
      quizSelectedId: id,
      quizCorrect: correct,
      quizTotal: total,
      quizRight: right,
      memory
    }, () => this.updateProgress());
  },

  nextQuiz() { this.buildQuiz(); },
  resetQuizStats() {
    wx.setStorageSync(STATS_KEY, { total: 0, right: 0 });
    this.setData({ quizTotal: 0, quizRight: 0, askedIds: [] }, () => this.buildQuiz());
    wx.showToast({ title: '统计已重置', icon: 'none' });
  }
}));
