// pages/french/french.js
const { wordList, verbList, grammarLessons, TENSE_NAMES } = require('./data.js');
const { enavantWords, enavantPoints, enavantExamples, enavantUnits } = require('./enavant.js');
const S = require('./study.js');
const C = require('./conjugation.js');
const FLOAT_NAV = require('../common/float-nav.js');
const R = require('../common/recall.js');

// ============ 本地缓存 key ============
const MEMORY_KEY = 'french_memory_v2';        // 记忆档案 { gid: {stage,dueAt,lastReview} }
const PLAN_KEY = 'french_study_plan_v1';      // 学习计划状态
const SOURCE_KEY = 'french_source_v1';        // 当前词库 enavant / simple
const VERB_MEMORY_KEY = 'french_verb_memory_v1'; // 动词变位记忆档案 { verbId: {stage,dueAt,lastReview} }

// ============ 词库 ============
// gid 全局唯一：En Avant 用 e{id}，简明法语用 c{id}，记忆档案隔离
const enavant = enavantWords.map(w => Object.assign({}, w, {
  gid: 'e' + w.id, source: 'enavant', lesson: w.unit, phonetic: ''
}));
const simple = wordList.map(w => Object.assign({}, w, {
  gid: 'c' + w.id, source: 'simple', cat: w.pos, unit: w.lesson
}));
const LIBS = {
  enavant: { name: 'En Avant', words: enavant },
  simple: { name: '简明法语', words: simple }
};

// 简明法语每课词数（课次条第二行显示"要背诵的"统计）
const LESSON_COUNTS = (() => {
  const m = {};
  wordList.forEach(w => {
    const l = Number(w.lesson) || 0;
    m[l] = (m[l] || 0) + 1;
  });
  return m;
})();

// 语法体系按级别分组（A1 语音+入门 / A2 初级），供「知识点」tab 用
function buildGrammarGroups() {
  const groups = {};
  grammarLessons.forEach(g => {
    const key = g.level + ' · ' + g.stage;
    if (!groups[key]) groups[key] = { key, level: g.level, stage: g.stage, lessons: [] };
    groups[key].lessons.push(g);
  });
  return Object.keys(groups).map(k => groups[k]);
}

Page(Object.assign({}, FLOAT_NAV.methods, {
  data: {
    tabs: [
      { key: 'card', label: '单词卡' },
      { key: 'quiz', label: '自测' },
      { key: 'verb', label: '变位表' },
      { key: 'plan', label: '复习计划' },
      { key: 'points', label: '知识点' }
    ],
    activeTab: 'card',

    // —— 词库 ——
    sources: [
      { key: 'enavant', label: 'En Avant' },
      { key: 'simple', label: '简明法语' }
    ],
    source: 'enavant',
    sourceName: 'En Avant',
    // —— 悬浮球（模块导航）——
    floatX: 0, floatY: 0,
    cardHeight: 420,
    floatFlipped: false,
    floatCurrent: 'enavant',
    floatNavItems: [],
    floatValue: '',
    floatUnit: '',
    floatCurrentLabel: '',

    // —— 学习计划 ——
    plan: null,
    dailyNewCount: S.DEFAULT_DAILY,
    queue: [],
    doneCount: 0,
    ringPercent: 0,
    queueWords: [],
    streak: 0,

    // —— 强制自测关卡 ——
    showForceQuiz: false,
    forceGapDays: 0,
    forceQuizLeft: 0,
    forceQuizDone: true,

    // —— 单词卡 ——
    activeWordIds: [],
    cardIndex: 0,
    card: null,
    flipped: false,
    isReviewMode: false,
    // 单元/课次筛选：0 = 全部；仅简明法语使用
    lessonFilter: 0,
    lessonOptions: [{ value: 0, label: '全部', count: simple.length }].concat(
      Array.from({ length: 30 }, (_, i) => ({
        value: i + 1,
        label: `第${i + 1}课`,
        count: LESSON_COUNTS[i + 1] || 0
      }))
    ),
    lessonWordCount: 0,
    memory: {},
    cardStage: -1,
    cardStageLabel: '',
    cardNextDue: '',
    graduatedCount: 0,
    graduatedPercent: 0,

    // —— 复习计划分组 ——
    dueWords: [], learningWords: [], newWords: [], graduatedWords: [],
    dueCount: 0, newCount: 0, learningCount: 0,

    // —— 自测 ——
    quiz: null, quizAnswered: false, quizSelectedId: -1,
    quizCorrect: false, quizTotal: 0, quizRight: 0, askedIds: [],
    quizWay: 'choice',      // choice = 四选一 / recall = 默写
    recall: null,

    // —— 变位表 ——
    verbs: verbList, verbIndex: 0, currentVerb: verbList[0],
    tenseNames: TENSE_NAMES, tenseIndex: 0,
    personLabels: ['je', 'tu', 'il / elle', 'nous', 'vous', 'ils / elles'],
    verbForms: (verbList[0] && verbList[0].tenses ? verbList[0].tenses[TENSE_NAMES[0]] : []),
    maskForms: false, revealed: {},
    verbMemory: {},
    verbStage: -1, verbStageLabel: '', verbNextDue: '',
    verbDueCount: 0,

    // —— 知识点 ——
    enavantUnits: enavantUnits,
    pointUnits: [],
    grammarGroups: buildGrammarGroups(),
    filterUnit: 0, filterLevel: '全部'
  },

  onLoad(options) {
    // 卡片高度 = 窗口高度 - 非卡片区占用（tab + 课次条 + 底部按钮/提示 + 页面边距，约 470rpx 换算 px）
    try {
      const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      const rpx = info.windowWidth / 750;
      this.setData({ cardHeight: Math.max(320, Math.round(info.windowHeight - 470 * rpx)) });
    } catch (e) { /* 用默认卡片高度 */ }
    FLOAT_NAV.initFloatPosition(this);

    const querySource = options && (options.source === 'enavant' || options.source === 'simple')
      ? options.source
      : '';
    const source = querySource || wx.getStorageSync(SOURCE_KEY) || 'enavant';
    if (querySource && querySource !== wx.getStorageSync(SOURCE_KEY)) {
      wx.setStorageSync(SOURCE_KEY, source);
    }
    const validTabs = ['card', 'quiz', 'verb', 'plan', 'points'];
    const activeTab = options && validTabs.indexOf(options.tab) >= 0 ? options.tab : 'card';
    const memory = wx.getStorageSync(MEMORY_KEY) || {};
    const verbMemory = wx.getStorageSync(VERB_MEMORY_KEY) || {};
    let plan = wx.getStorageSync(PLAN_KEY) || null;
    const now = Date.now();
    if (!plan) {
      plan = S.initPlan(now);
      plan.queue = S.pickNewWords(LIBS[source].words, memory, plan.dailyNewCount);
    }
    const state = S.openState(plan, now);
    plan = S.buildDailyPlan(plan, state, LIBS[source].words, memory);
    if (!plan.queue || plan.queue.length === 0) {
      plan.queue = S.pickNewWords(LIBS[source].words, memory, plan.dailyNewCount);
    }
    // 首次初始化的「昨天完成率」无意义，不因 doneCount=0 降额度
    if (state.gap === 0 && !plan.lastQuizAccuracy) {
      // 保留初始额度，不动
    }
    wx.setStorageSync(PLAN_KEY, plan);

    this.setData({
      activeTab, source, sourceName: LIBS[source].name, memory, verbMemory, plan,
      verbDueCount: this.countDueVerbs(verbMemory),
      dailyNewCount: plan.dailyNewCount,
      queue: plan.queue,
      doneCount: Math.min(plan.queue.length, this.studiedTodayCount(memory, source)),
      streak: plan.streak || 1,
      forceGapDays: state.gap,
      forceQuizDone: plan.forceQuizDone !== false,
      showForceQuiz: state.forceQuiz && plan.forceQuizDone === false,
      forceQuizLeft: state.forceQuiz ? S.FORCE_QUIZ_QUESTIONS : 0
    }, () => {
      this.rebuildForSource(source);
      this.buildPoints();
      this.buildQuiz();
      if (this.data.showForceQuiz) this.buildChoiceQuiz();
      this.initRing(this.ringPercentOf(plan, memory));
      this.syncFloatNav();
    });
  },

  // ============ 悬浮球：当前模块进度 + 模块导航 ============
  syncFloatNav() {
    const source = this.data.source;
    FLOAT_NAV.syncNavData(this, source);
    this.setData({
      floatValue: this.data.streak || 1,
      floatUnit: '天',
      floatCurrentLabel: LIBS[source].name
    });
  },

  // ============ 词库切换 ============
  onLessonFilter(e) {
    const lessonFilter = Number(e.currentTarget.dataset.lesson);
    this.setData({ lessonFilter }, () => this.rebuildForSource(this.data.source));
  },

  onSourceChange(e) {
    const source = e.currentTarget.dataset.source;
    this.setData({ floatFlipped: false, lessonFilter: 0 });
    if (source === this.data.source) return;
    wx.setStorageSync(SOURCE_KEY, source);
    const memory = this.data.memory;
    let plan = this.data.plan;
    plan = Object.assign({}, plan, {
      queue: S.pickNewWords(LIBS[source].words, memory, plan.dailyNewCount),
      doneCount: 0
    });
    wx.setStorageSync(PLAN_KEY, plan);
    this.setData({
      source, sourceName: LIBS[source].name, plan,
      queue: plan.queue, doneCount: 0, showForceQuiz: false
    }, () => {
      this.rebuildForSource(source);
      this.initRing(0);
      this.syncFloatNav();
    });
  },

  rebuildForSource(source) {
    let words = LIBS[source].words;
    const memory = this.data.memory;
    const filter = source === 'simple' ? (this.data.lessonFilter || 0) : 0;
    if (filter) {
      const pool = words.filter(w => Number(w.lesson) === filter);
      // 空课（该课暂无词条）保留全部，避免卡片空白
      if (pool.length) words = pool;
    }
    const stats = this.computeStats(words, memory);
    // 按课背诵：展示该课全部词，不受今日队列（20 新词）限制；
    // 不筛选时：按今日队列顺序，队列为空则全书顺序
    const queueIds = (this.data.queue || []).filter(gid => words.some(w => w.gid === gid));
    const ordered = filter
      ? words.map(w => w.gid)
      : (queueIds.length ? queueIds : words.map(w => w.gid));
    const ids = ordered;
    const first = words.find(w => w.gid === ordered[0]) || words[0];
    this.setData(Object.assign({
      words, lessonWordCount: ids.length,
      queueWords: ordered.map(gid => words.find(w => w.gid === gid)).filter(Boolean),
      activeWordIds: ordered,
      card: first, cardIndex: 0
    }, stats, this.cardInfo(first, memory)));
  },

  // ============ 记忆分组 ============
  computeStats(words, memory) {
    const now = Date.now();
    const dueWords = [], learningWords = [], newWords = [], graduatedWords = [];
    words.forEach(w => {
      const rec = memory[w.gid];
      if (!rec) { newWords.push(w); return; }
      const item = Object.assign({}, w, {
        _stage: Math.min(rec.stage + 1, S.GRADUATED),
        _dueText: rec.dueAt ? this.formatDue(rec.dueAt) : ''
      });
      if (rec.stage >= S.GRADUATED) { graduatedWords.push(item); return; }
      if (rec.dueAt <= now) dueWords.push(item); else learningWords.push(item);
    });
    dueWords.sort((a, b) => memory[a.gid].dueAt - memory[b.gid].dueAt);
    return {
      dueWords, learningWords, newWords, graduatedWords,
      dueCount: dueWords.length, newCount: newWords.length,
      learningCount: learningWords.length,
      graduatedCount: graduatedWords.length,
      graduatedPercent: Math.round(graduatedWords.length / words.length * 100)
    };
  },

  cardInfo(card, memory) {
    if (!card) return { cardStage: -1, cardStageLabel: '', cardNextDue: '', cardConjugation: null, cardPersonLabels: [] };
    // 动词卡：附加上现在时变位，实现「背单词一起背变位」
    const isVerb = !!(card.pos && card.pos.indexOf('v.') === 0);
    const conj = isVerb ? C.getPresent(card.fr) : null;
    const conjInfo = {
      cardIsVerb: isVerb,
      cardConjugation: conj,
      cardPersonLabels: conj ? C.PERSONS : []
    };
    const rec = memory[card.gid];
    if (!rec) return Object.assign({ cardStage: -1, cardStageLabel: '新词 · 今日计划', cardNextDue: '' }, conjInfo);
    if (rec.stage >= S.GRADUATED) {
      return Object.assign({ cardStage: rec.stage, cardStageLabel: '已固化 🎓', cardNextDue: '' }, conjInfo);
    }
    return Object.assign({
      cardStage: rec.stage + 1,
      cardStageLabel: `记忆阶段 ${rec.stage + 1}/${S.GRADUATED} · ${S.STAGES[rec.stage]}天间隔`,
      cardNextDue: `下次 ${this.formatDue(rec.dueAt)}`
    }, conjInfo);
  },

  formatDue(ts) {
    const d = new Date(ts);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  },

  // ============ 进度圆环：缓动填充 ============
  // 今日已背词数：按 lastReview 落在今天统计，且只算当前词库（e/c 前缀隔离）
  studiedTodayCount(memory, source) {
    const prefix = source === 'simple' ? 'c' : 'e';
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const start = d.getTime();
    const mem = memory || {};
    let n = 0;
    Object.keys(mem).forEach(k => {
      if (k.charAt(0) !== prefix) return;
      const r = mem[k];
      if (r && r.lastReview >= start) n++;
    });
    return n;
  },

  // 今日进度 = 今日已背词数 / 今日队列长度（封顶 100%）
  ringPercentOf(plan, memory) {
    const q = (plan && plan.queue) || [];
    const target = q.length;
    if (!target) return 100; // 今日无新词（已全部学完）视为满环
    const done = Math.min(target, this.studiedTodayCount(memory, this.data.source));
    return Math.max(0, Math.min(100, (done / target) * 100));
  },

  // 直接落到目标值（首次渲染 / 切换词库时用，不动画）
  initRing(percent) {
    this.clearRingAnim();
    const v = Math.max(0, Math.min(100, percent || 0));
    this._ringShown = v;
    this.setData({ ringPercent: v });
  },

  // 从当前值缓动到目标值（点击「记住了/忘记了」后触发）
  animateRing(percent) {
    this.clearRingAnim();
    const to = Math.max(0, Math.min(100, percent || 0));
    const from = typeof this._ringShown === 'number' ? this._ringShown : 0;
    if (Math.abs(to - from) < 0.3) {
      this._ringShown = to;
      this.setData({ ringPercent: to });
      return;
    }
    const duration = 560;
    const start = Date.now();
    this._ringTimer = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const v = Math.round((from + (to - from) * eased) * 100) / 100;
      this._ringShown = v;
      this.setData({ ringPercent: v });
      if (p >= 1) {
        this.clearRingAnim();
        this._ringShown = to;
        this.setData({ ringPercent: to });
      }
    }, 24);
  },

  clearRingAnim() {
    if (this._ringTimer) {
      clearInterval(this._ringTimer);
      this._ringTimer = null;
    }
  },

  onUnload() {
    this.clearRingAnim();
  },

  // ============ 记忆推进 ============
  advance(gid, delta, silent) {
    const now = Date.now();
    const memory = Object.assign({}, this.data.memory);
    const wasNew = !memory[gid];
    const res = S.advanceMemory(memory[gid], delta, now);
    memory[gid] = { stage: res.stage, dueAt: res.dueAt, lastReview: res.lastReview };
    wx.setStorageSync(MEMORY_KEY, memory);

    let plan = Object.assign({}, this.data.plan);
    // 今日进度按「今天学过的词数」重算（按课背诵/浏览全部也计入），封顶为队列长度
    plan.doneCount = Math.min(((plan.queue || []).length),
      this.studiedTodayCount(memory, this.data.source));
    if (wasNew && plan.queue && plan.queue.indexOf(gid) >= 0) {
      plan.totalStudied = (plan.totalStudied || 0) + 1;
    }
    wx.setStorageSync(PLAN_KEY, plan);

    const words = LIBS[this.data.source].words;
    this.setData(Object.assign(
      { memory, plan, doneCount: plan.doneCount || 0 },
      this.computeStats(words, memory)
    ), () => {
      this.animateRing(this.ringPercentOf(plan, memory));
      FLOAT_NAV.syncNavData(this, this.data.source);
    });

    if (!silent) {
      if (res.graduated) wx.showToast({ title: '已固化 🎓', icon: 'none' });
      else wx.showToast({
        title: delta > 0 ? `记住了 · ${S.STAGES[res.stage]}天后` : '忘记了 · 缩短间隔',
        icon: 'none'
      });
    }
    return res;
  },

  rateCurrent(delta) {
    if (!this.data.card) return;
    this.advance(this.data.card.gid, delta, false);
    this.setData(this.cardInfo(this.data.card, this.data.memory));
    if (this.data.isReviewMode) this.nextCard();
  },
  markRemembered() { this.rateCurrent(1); },
  markForgotten() { this.rateCurrent(-1); },

  // ============ Tab ============
  onTabChange(e) {
    const key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    if (this.data.showForceQuiz) {
      wx.showToast({ title: '请先完成强制自测', icon: 'none' });
      return;
    }
    // 计划页顶部是统计卡和主按钮，球停到右下角；其余 tab 回到右上角
    FLOAT_NAV.dockFloat(this, key === 'plan' ? 'bottom' : 'top');
    this.setData({ activeTab: key });
    if (key === 'quiz' && !this.data.quiz && !this.data.recall) this.buildQuiz();
  },

  // ============ 单词卡 ============
  showCard(i) {
    const ids = this.data.activeWordIds;
    if (!ids || !ids.length) return;
    if (i < 0) i = ids.length - 1;
    if (i >= ids.length) i = 0;
    const words = LIBS[this.data.source].words;
    const card = words.find(w => w.gid === ids[i]);
    if (!card) return;
    this.setData(Object.assign(
      { cardIndex: i, card, flipped: false },
      this.cardInfo(card, this.data.memory)
    ));
  },
  flipCard() { this.setData({ flipped: !this.data.flipped }); },
  prevCard() { this.showCard(this.data.cardIndex - 1); },
  nextCard() { this.showCard(this.data.cardIndex + 1); },

  // ============ 复习计划 ============
  startReview() {
    const ids = this.data.dueWords.map(w => w.gid);
    if (!ids.length) { wx.showToast({ title: '今天没有待复习的词 🎉', icon: 'none' }); return; }
    this.setData({ activeWordIds: ids, isReviewMode: true, activeTab: 'card' });
    this.showCard(0);
  },
  startNew() {
    const ids = this.data.queue.slice();
    if (!ids.length) { wx.showToast({ title: '今日新词已学完', icon: 'none' }); return; }
    this.setData({ activeWordIds: ids, isReviewMode: false, activeTab: 'card' });
    this.showCard(0);
  },
  reviewFromWord(e) {
    const { group, gid } = e.currentTarget.dataset;
    const map = { due: 'dueWords', learning: 'learningWords', new: 'newWords', graduated: 'graduatedWords' };
    const ids = this.data[map[group]].map(w => w.gid);
    this.setData({ activeWordIds: ids, isReviewMode: group === 'due', activeTab: 'card' });
    this.showCard(ids.indexOf(gid));
  },
  browseAll() {
    const words = LIBS[this.data.source].words;
    this.setData({ activeWordIds: words.map(w => w.gid), isReviewMode: false, activeTab: 'card' });
    this.showCard(0);
  },

  // ============ 自测 ============
  // 出题池：四选一用当前词库全部词条；默写只看有法语原形的词条
  quizPool(forRecall) {
    const words = LIBS[this.data.source].words;
    const all = forRecall ? words.filter(w => w.fr) : words;
    const { askedIds } = this.data;
    let pool = all.filter(w => askedIds.indexOf(w.gid) === -1);
    if (pool.length < 4) { pool = all.slice(); this.setData({ askedIds: [] }); }
    return { pool, all };
  },

  onQuizWayChange(e) {
    const way = e.currentTarget.dataset.key;
    if (way === this.data.quizWay) return;
    this.setData({ quizWay: way, quiz: null, recall: null, askedIds: [] }, () => this.buildQuiz());
  },

  buildQuiz() {
    if (this.data.quizWay === 'recall') { this.buildRecall(); return; }
    this.buildChoiceQuiz();
  },

  // 四选一（强制热身关卡也走这里，不受「默写」开关影响）
  buildChoiceQuiz() {
    const { pool, all } = this.quizPool(false);
    const word = pool[Math.floor(Math.random() * pool.length)];
    const mode = this.data.quizTotal % 2 === 0 ? 'fr2cn' : 'cn2fr';
    const distractors = all.filter(w => w.gid !== word.gid)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [word].concat(distractors)
      .map(w => ({ id: w.gid, text: mode === 'fr2cn' ? w.cn : w.fr }))
      .sort(() => Math.random() - 0.5);
    this.setData({
      quiz: { word, options, answerId: word.gid, mode },
      quizAnswered: false, quizSelectedId: -1, quizCorrect: false,
      askedIds: this.data.askedIds.concat(word.gid)
    });
  },

  // 默写：看中文写法语原形；提示只给首字母、词数、字母数
  buildRecall() {
    const { pool } = this.quizPool(true);
    const word = pool[Math.floor(Math.random() * pool.length)];
    const unitText = this.data.source === 'simple'
      ? `第 ${word.unit} 课` : `第 ${word.lesson} 单元`;
    // En Avant 的 pos 位存的是单元主题（一句法语长标题），只有简明法语的 n.f. / v.i. 才值得放进来
    const rawPos = word.pos || word.cat || '';
    const pos = (rawPos.length <= 8 && !/\s/.test(rawPos)) ? rawPos : '';
    const example = word.example
      ? `${word.example}${word.exampleCn ? '　' + word.exampleCn : ''}` : '';
    this.setData({
      recall: {
        gid: word.gid,
        tag: `${LIBS[this.data.source].name} · ${unitText}${pos ? ' · ' + pos : ''}`,
        prompt: word.cn,
        qhint: '看中文写出法语原形 · 大小写不限，重音写错算「差一点」',
        mask: R.hintOf(word.fr, 'word'),
        placeholder: '在这里写法语单词',
        input: '', answered: false, status: '', statusText: '',
        answer: word.fr, extra: example
      },
      askedIds: this.data.askedIds.concat(word.gid)
    });
  },

  onRecallInput(e) {
    if (!this.data.recall) return;
    this.setData({ 'recall.input': e.detail.value });
  },

  submitRecall() {
    const rl = this.data.recall;
    if (!rl || rl.answered) return;
    const res = R.judge(rl.input, rl.answer, 'word');
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
    this.advance(rl.gid, correct ? 1 : -1, true);
    const texts = {
      right: '写对了 ✓',
      near: '差一点 · 重音或连字符写漏了，抄一遍',
      wrong: '没写对 · 抄一遍再下一题'
    };
    this.setData({
      recall: Object.assign({}, rl, { answered: true, status, statusText: texts[status] }),
      quizTotal: this.data.quizTotal + 1,
      quizRight: this.data.quizRight + (correct ? 1 : 0)
    });
  },

  onSelectOption(e) {
    if (this.data.quizAnswered) return;
    const gid = e.currentTarget.dataset.id;
    const correct = gid === this.data.quiz.answerId;
    this.advance(gid, correct ? 1 : -1, true);
    this.setData({
      quizAnswered: true, quizSelectedId: gid, quizCorrect: correct,
      quizTotal: this.data.quizTotal + 1,
      quizRight: this.data.quizRight + (correct ? 1 : 0)
    });
  },
  nextQuiz() { this.buildQuiz(); },
  resetQuizStats() {
    this.setData({ quizTotal: 0, quizRight: 0, askedIds: [] }, () => this.buildQuiz());
    wx.showToast({ title: '统计已重置', icon: 'none' });
  },

  // ============ 强制自测关卡 ============
  onForceSelect(e) {
    if (this.data.quizAnswered) return;
    const gid = e.currentTarget.dataset.id;
    const correct = gid === this.data.quiz.answerId;
    this.advance(gid, correct ? 1 : -1, true);
    const right = (this.data._forceRight || 0) + (correct ? 1 : 0);
    const answered = (this.data._forceAnswered || 0) + 1;
    this.setData({
      quizAnswered: true, quizSelectedId: gid, quizCorrect: correct,
      _forceRight: right, _forceAnswered: answered
    });
  },
  nextForceQuiz() {
    const left = this.data.forceQuizLeft - 1;
    if (left <= 0) {
      const accuracy = (this.data._forceRight || 0) / S.FORCE_QUIZ_QUESTIONS;
      let plan = Object.assign({}, this.data.plan);
      plan.lastQuizAccuracy = accuracy;
      plan.forceQuizDone = true;
      plan.dailyNewCount = S.adjustDaily(plan.dailyNewCount, accuracy, null);
      wx.setStorageSync(PLAN_KEY, plan);
      this.setData({
        showForceQuiz: false, forceQuizDone: true, forceQuizLeft: 0,
        plan, dailyNewCount: plan.dailyNewCount,
        _forceRight: 0, _forceAnswered: 0
      });
      wx.showToast({
        title: `热身完成 ${Math.round(accuracy * 100)}% · 明日${plan.dailyNewCount}词/天`,
        icon: 'none', duration: 2500
      });
      this.buildChoiceQuiz();
      return;
    }
    this.setData({ forceQuizLeft: left }, () => this.buildChoiceQuiz());
  },

  // ============ 变位背诵（记忆曲线） ============
  countDueVerbs(memory) {
    const now = Date.now();
    return verbList.filter(v => {
      const rec = memory[v.id];
      return rec && rec.stage < S.GRADUATED && rec.dueAt <= now;
    }).length;
  },
  verbInfo(v, memory) {
    if (!v) return { verbStage: -1, verbStageLabel: '', verbNextDue: '' };
    const rec = memory[v.id];
    if (!rec) return { verbStage: -1, verbStageLabel: '新动词 · 待背诵', verbNextDue: '' };
    if (rec.stage >= S.GRADUATED) {
      return { verbStage: rec.stage, verbStageLabel: '已固化 🎓', verbNextDue: '' };
    }
    const due = rec.dueAt <= Date.now();
    return {
      verbStage: rec.stage + 1,
      verbStageLabel: due
        ? `待复习 · 阶段 ${rec.stage + 1}/${S.GRADUATED}`
        : `记忆阶段 ${rec.stage + 1}/${S.GRADUATED} · ${S.STAGES[rec.stage]}天间隔`,
      verbNextDue: `下次 ${this.formatDue(rec.dueAt)}`
    };
  },
  rateCurrentVerb(delta) {
    const v = this.data.currentVerb;
    if (!v) return;
    const now = Date.now();
    const memory = Object.assign({}, this.data.verbMemory);
    const res = S.advanceMemory(memory[v.id], delta, now);
    memory[v.id] = { stage: res.stage, dueAt: res.dueAt, lastReview: res.lastReview };
    wx.setStorageSync(VERB_MEMORY_KEY, memory);
    this.setData(Object.assign(
      { verbMemory: memory, verbDueCount: this.countDueVerbs(memory) },
      this.verbInfo(v, memory)
    ));
    wx.showToast({
      title: res.graduated ? '变位已固化 🎓' : (delta > 0 ? `记住了 · ${S.STAGES[res.stage]}天后` : '忘记了 · 缩短间隔'),
      icon: 'none'
    });
  },
  // 从复习计划进入待复习的动词变位
  startVerbReview() {
    const now = Date.now();
    const due = verbList.filter(v => {
      const rec = this.data.verbMemory[v.id];
      return rec && rec.stage < S.GRADUATED && rec.dueAt <= now;
    });
    if (!due.length) {
      wx.showToast({ title: '变位暂无待复习，可在变位表逐词背诵', icon: 'none' });
      this.setData({ activeTab: 'verb' });
      return;
    }
    const idx = verbList.findIndex(v => v.id === due[0].id);
    this.setData({
      activeTab: 'verb', verbIndex: idx, currentVerb: due[0],
      maskForms: false, revealed: {}
    }, () => {
      this.syncVerbForms();
      wx.showToast({ title: `${due.length} 个动词变位待复习`, icon: 'none' });
    });
  },

  markVerbRemembered() { this.rateCurrentVerb(1); },
  markVerbForgotten() { this.rateCurrentVerb(-1); },
  // 从单词卡跳到对应动词变位
  studyVerbFromCard() {
    const card = this.data.card;
    if (!card) return;
    let idx = verbList.findIndex(v => v.name === card.fr || card.fr.indexOf(v.name) === 0);
    if (idx < 0) {
      wx.showToast({ title: '该词暂无变位表', icon: 'none' });
      return;
    }
    this.setData({
      activeTab: 'verb', verbIndex: idx, currentVerb: verbList[idx],
      maskForms: false, revealed: {}
    }, () => {
      this.syncVerbForms();
      this.setData(this.verbInfo(verbList[idx], this.data.verbMemory));
    });
  },

  // ============ 变位表 ============
  syncVerbForms() {
    const v = this.data.currentVerb;
    const tense = TENSE_NAMES[this.data.tenseIndex];
    this.setData(Object.assign({
      verbForms: (v && v.tenses && v.tenses[tense]) ? v.tenses[tense] : [],
      revealed: {}
    }, this.verbInfo(v, this.data.verbMemory)));
  },
  onTenseTap(e) {
    this.setData({ tenseIndex: Number(e.currentTarget.dataset.index) }, () => this.syncVerbForms());
  },
  onVerbTap(e) {
    const i = e.currentTarget.dataset.index;
    this.setData({ verbIndex: i, currentVerb: this.data.verbs[i] }, () => this.syncVerbForms());
  },
  prevVerb() {
    let i = this.data.verbIndex - 1; if (i < 0) i = this.data.verbs.length - 1;
    this.setData({ verbIndex: i, currentVerb: this.data.verbs[i] }, () => this.syncVerbForms());
  },
  nextVerb() {
    let i = this.data.verbIndex + 1; if (i >= this.data.verbs.length) i = 0;
    this.setData({ verbIndex: i, currentVerb: this.data.verbs[i] }, () => this.syncVerbForms());
  },
  toggleMask() { this.setData({ maskForms: !this.data.maskForms, revealed: {} }); },
  revealForm(e) {
    const idx = e.currentTarget.dataset.index;
    const revealed = Object.assign({}, this.data.revealed);
    revealed[idx] = !revealed[idx];
    this.setData({ revealed });
  },

  // ============ 知识点 ============
  buildPoints() {
    const byUnit = {};
    enavantPoints.forEach(p => {
      if (!byUnit[p.unit]) byUnit[p.unit] = { unit: p.unit, theme: p.theme, points: [] };
      byUnit[p.unit].points.push(p);
    });
    const pointUnits = Object.keys(byUnit).map(k => byUnit[k]).sort((a, b) => a.unit - b.unit);
    // 例句按单元分组，附到对应 pointUnit；无知识点的单元也建例句组
    const exByUnit = {};
    enavantExamples.forEach(e => {
      if (!exByUnit[e.unit]) exByUnit[e.unit] = [];
      exByUnit[e.unit].push(e);
    });
    pointUnits.forEach(pu => { pu.examples = exByUnit[pu.unit] || []; });
    // 有例句但无知识点的单元，补进 pointUnits（用空 points）
    Object.keys(exByUnit).forEach(u => {
      if (!pointUnits.find(p => p.unit === Number(u))) {
        const meta = enavantUnits.find(x => x.unit === Number(u));
        pointUnits.push({ unit: Number(u), theme: meta ? meta.theme : '', points: [], examples: exByUnit[u] });
      }
    });
    pointUnits.sort((a, b) => a.unit - b.unit);
    this.setData({ pointUnits });
  },
  onFilterUnit(e) {
    this.setData({ filterUnit: Number(e.currentTarget.dataset.unit) });
  },
  onFilterLevel(e) {
    this.setData({ filterLevel: e.currentTarget.dataset.level });
  }
}));
