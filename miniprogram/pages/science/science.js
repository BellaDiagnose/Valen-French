// pages/science/science.js —— 科学（七+八年级生物 / 八年级化学）双语知识点 + 公式背诵
//
// 数据源：data-bio.js / data-chem.js / data-formula.js
// 记忆算法复用 pages/french/study.js（1/2/4/7/15/30/60 天）
// 存储键与法语端隔离：science_memory_v1 / science_plan_v1 / science_stats_v1

const S = require('../french/study.js');
const FLOAT_NAV = require('../common/float-nav.js');
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

// 年级口径：七上/七下 → 七年级；八上/八下/衔接 → 八年级（LC 衔接归入八年级）
const GRADE_OPTIONS = [
  { key: 'all', label: '全部' },
  { key: '七', label: '七年级' },
  { key: '八', label: '八年级' }
];

function gradeBucket(book) {
  const first = String(book || '').charAt(0);
  if (first === '七') return '七';
  if (first === '八' || first === '衔') return '八';
  return '';
}

function inGrade(book, grade) {
  return !grade || grade === 'all' || gradeBucket(book) === grade;
}

function unitsOfGrade(subject, grade) {
  return BANK[subject].units.filter((u) => inGrade(u.book, grade));
}

Page(Object.assign({}, FLOAT_NAV.methods, {
  data: {
    subject: 'bio',

    // —— 悬浮球（模块导航）——
    floatX: 0, floatY: 0, floatFlipped: false,
    floatCurrent: 'bio', floatNavItems: [],
    floatValue: '', floatUnit: '', floatCurrentLabel: '',
    tabs: [
      { key: 'point', label: '知识点' },
      { key: 'formula', label: '公式' },
      { key: 'quiz', label: '自测' }
    ],
    activeTab: 'point',

    // —— 知识点卡 ——
    gradeOptions: GRADE_OPTIONS,
    gradeFilter: 'all',     // all / 七 / 八
    pointUnits: [],
    unitFilter: 0,          // 0 = 全部
    pointIds: [],
    pointIndex: 0,
    point: null,
    pointFlipped: false,
    pointLang: 'zh',        // zh 正面中文 / en 正面英文
    pointStage: -1,
    pointStageLabel: '',
    pointNextDue: '',
    pointGraduated: 0,
    pointTotal: 0,
    pointDue: 0,

    // —— 公式卡 ——
    formulaUnits: [],
    formulaUnitFilter: 0,
    formulaIds: [],
    formulaIndex: 0,
    formula: null,
    formulaFlipped: false,
    formulaLang: 'zh',
    formulaStage: -1,
    formulaStageLabel: '',
    formulaNextDue: '',

    // —— 自测 ——
    quizMode: 'point',      // point = 术语互译 / formula = 公式配对
    quizLang: 'en2zh',      // en2zh / zh2en
    quiz: null,
    quizAnswered: false,
    quizSelectedId: -1,
    quizCorrect: false,
    quizTotal: 0,
    quizRight: 0,
    askedIds: [],

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
    wx.setStorageSync(PLAN_KEY, plan);
    this.setData({ memory, plan }, () => this.updateProgress());
  },

  // ==================== tab 切换 ====================
  onTabChange(e) {
    const key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    const patch = { activeTab: key };
    this.setData(patch, () => {
      if (key === 'quiz' && !this.data.quiz) this.buildQuiz();
    });
  },

  refreshSubject(subject) {
    const bank = BANK[subject];
    const pointUnits = [{ key: 0, label: '全部' }].concat(
      bank.units.map((u) => ({ key: u.key, label: u.label }))
    );
    const formulaUnits = [{ key: 0, label: '全部' }].concat(
      F.units.filter((u) => (subject === 'bio'
        ? u.subject === 'bio' : u.subject === 'chem'))
        .map((u) => ({ key: u.key, label: u.label }))
    );
    this.setData({
      subject,
      gradeFilter: 'all',
      pointUnits,
      unitFilter: 0,
      formulaUnits,
      formulaUnitFilter: 0,
      activeTab: 'point',
      pointIds: bank.points.map((p) => p.gid),
      pointIndex: 0,
      formulaIds: formulasOf(subject).map((f) => f.id),
      formulaIndex: 0,
      quiz: null,
      askedIds: []
    }, () => {
      this.showPoint(0);
      this.showFormula(0);
      this.updateProgress();
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
    const total = Object.keys(memory).length;
    const studied = this.studiedToday(memory);
    const quota = this.data.plan ? this.data.plan.dailyNewCount : S.DEFAULT_DAILY;
    const percent = Math.min(100, Math.round((studied / quota) * 100));
    // 今日到期（已学且 dueAt 已过）
    let due = 0;
    Object.keys(memory).forEach((gid) => {
      const m = memory[gid];
      if (m && m.dueAt && m.dueAt <= Date.now()) due += 1;
    });
    this.setData({
      studiedToday: studied,
      pointTotal: total,
      pointDue: due,
      ringPercent: percent
    });
  },

  // ==================== 知识点卡 ====================
  onGradeFilter(e) {
    const grade = e.currentTarget.dataset.key;
    const pointUnits = [{ key: 0, label: '全部' }].concat(
      unitsOfGrade(this.data.subject, grade).map((u) => ({ key: u.key, label: u.label }))
    );
    this.setData({
      gradeFilter: grade,
      pointUnits,
      unitFilter: 0,
      quiz: null,
      askedIds: []
    }, () => this.showPoint(0));
  },

  onUnitFilter(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ unitFilter: key }, () => this.showPoint(0));
  },

  visiblePointIds() {
    const bank = BANK[this.data.subject];
    const filter = this.data.unitFilter;
    const grade = this.data.gradeFilter;
    return bank.points
      .filter((p) => inGrade(p.book, grade))
      .filter((p) => !filter || p.unit === filter)
      .map((p) => p.gid);
  },

  showPoint(i) {
    const ids = this.visiblePointIds();
    if (!ids.length) {
      this.setData({ point: null, pointIds: [], pointIndex: 0 });
      return;
    }
    const idx = Math.max(0, Math.min(i, ids.length - 1));
    const gid = ids[idx];
    const point = this.findPoint(gid) || BANK.bio.points.concat(BANK.chem.points)
      .filter((p) => p.gid === gid)[0];
    const mem = this.data.memory[gid];
    this.setData({
      pointIds: ids,
      pointIndex: idx,
      point,
      pointFlipped: false,
      pointStage: mem ? mem.stage : -1,
      pointStageLabel: this.stageLabel(mem ? mem.stage : -1),
      pointNextDue: mem && mem.dueAt ? this.dueDate(mem.dueAt) : ''
    });
  },

  prevPoint() { this.showPoint(this.data.pointIndex - 1); },
  nextPoint() { this.showPoint(this.data.pointIndex + 1); },
  flipPoint() { this.setData({ pointFlipped: !this.data.pointFlipped }); },
  togglePointLang() {
    this.setData({ pointLang: this.data.pointLang === 'zh' ? 'en' : 'zh' });
  },

  ratePoint(e) {
    const delta = Number(e.currentTarget.dataset.delta);
    const gid = this.data.point && this.data.point.gid;
    if (!gid) return;
    const memory = Object.assign({}, this.data.memory);
    memory[gid] = S.advanceMemory(memory[gid], delta, Date.now());
    wx.setStorageSync(MEMORY_KEY, memory);
    const m = memory[gid];
    this.setData({
      memory,
      pointStage: m.stage,
      pointStageLabel: this.stageLabel(m.stage),
      pointNextDue: m.dueAt ? this.dueDate(m.dueAt) : ''
    }, () => {
      this.updateProgress();
      wx.showToast({
        title: delta > 0 ? `已记住 · ${this.stageLabel(m.stage)}` : '已重置 · 明天再来',
        icon: 'none'
      });
    });
  },

  // ==================== 公式卡 ====================
  onFormulaUnitFilter(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ formulaUnitFilter: key }, () => this.showFormula(0));
  },

  visibleFormulaIds() {
    return formulasOf(this.data.subject)
      .filter((f) => !this.data.formulaUnitFilter || f.unit === this.data.formulaUnitFilter)
      .map((f) => f.id);
  },

  showFormula(i) {
    const ids = this.visibleFormulaIds();
    if (!ids.length) {
      this.setData({ formula: null, formulaIds: [], formulaIndex: 0 });
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
      formulaFlipped: false,
      formulaStage: mem ? mem.stage : -1,
      formulaStageLabel: this.stageLabel(mem ? mem.stage : -1),
      formulaNextDue: mem && mem.dueAt ? this.dueDate(mem.dueAt) : ''
    });
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

  // ==================== 自测 ====================
  onQuizModeChange(e) {
    this.setData({ quizMode: e.currentTarget.dataset.key, quiz: null, askedIds: [] },
      () => this.buildQuiz());
  },

  onQuizLangChange(e) {
    this.setData({ quizLang: e.currentTarget.dataset.key, quiz: null },
      () => this.buildQuiz());
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
      .filter((p) => inGrade(p.book, this.data.gradeFilter))
      .map((p) => ({
        gid: p.gid,
        front: this.data.quizLang === 'en2zh' ? p.en : p.cn,
        back: this.data.quizLang === 'en2zh' ? p.cn : p.en,
        hint: p.chapter
      }));
  },

  buildQuiz() {
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
