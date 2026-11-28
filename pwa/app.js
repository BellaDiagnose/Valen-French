'use strict';

/* =========================================================================
 * BELLA 助手 · PWA
 * 逻辑与小程序的 french.js / iOS 的 StudyEngine 同源：
 *   艾宾浩斯 1/2/4/7/15/30/60 天 · 每日 20 词（10–30 动态调节）
 *   ≥3 天未打开 → 强制自测 10 题
 * 存储键与两端保持一致，方便将来互导。
 * ========================================================================= */

/* ==================== 常量 ==================== */

const STAGE_DAYS = [1, 2, 4, 7, 15, 30, 60];
const GRADUATED = STAGE_DAYS.length;
const DAILY_DEFAULT = 20;
const DAILY_MIN = 10;
const DAILY_MAX = 30;
const FORCE_GAP = 3;
const FORCE_QUESTIONS = 10;
const RING_C = 2 * Math.PI * 18;

/* 单文件构建由 build-single.js 注入；标准 PWA 下恒为 false */
const SINGLE_FILE = window.__BELLA_SINGLE_FILE__ === true;

const KEY = {
  memory: 'french_memory_v2',
  plan: 'french_study_plan_v1',
  source: 'french_source_v1',
  verbMemory: 'french_verb_memory_v1',
  asked: 'french_asked_ids_v1',
  score: 'french_quiz_score_v1',
  hint: 'bella_install_hint_v1',
  scienceMemory: 'science_memory_v1',
  scienceStats: 'science_stats_v1'
};

const TABS = [
  { id: 'home', label: '首页' },
  { id: 'card', label: '单词卡' },
  { id: 'quiz', label: '自测' },
  { id: 'verb', label: '变位' },
  { id: 'plan', label: '计划' },
  { id: 'points', label: '知识点' },
  { id: 'science', label: '科学' }
];

/* Bento 首页四个入口；颜色只做模块识别，主色仍是爱尔兰绿 */
const HOME_MODULES = [
  { key: 'enavant', mark: 'EA', name: 'En Avant', accent: '#0f8a5a', tint: '#e4f1e9', kind: 'fr' },
  { key: 'simple', mark: 'CF', name: '简明法语', accent: '#128a80', tint: '#e5f5f1', kind: 'fr' },
  { key: 'chem', mark: 'CH', name: '化学', accent: '#b8783c', tint: '#fbf0e5', kind: 'sci' },
  { key: 'bio', mark: 'BI', name: '生物', accent: '#3e7f9e', tint: '#e8f2f7', kind: 'sci' }
];

/* ==================== 小工具 ==================== */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('本地存储写入失败', key, err);
  }
}

/* 词库名按纯字符串存（与小程序/iOS 的 string 值一致，便于将来互导） */
function readRaw(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (err) {
    return fallback;
  }
}

function writeRaw(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn('本地存储写入失败', key, err);
  }
}

const esc = (v) => String(v == null ? '' : v)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const pad2 = (n) => String(n).padStart(2, '0');

function dayString(date = new Date()) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/** yyyy-MM-dd 取当天中午，规避夏令时导致的 23/25 小时误差 */
function parseDay(str) {
  if (!str) return 0;
  const parts = str.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return 0;
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0).getTime();
}

function daysBetween(from, to) {
  if (!from || !to) return 0;
  return Math.round((parseDay(to) - parseDay(from)) / 86400000);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000);
}

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function fmtMD(sec) {
  const d = new Date(sec * 1000);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ==================== 学习引擎 ==================== */

const Engine = {
  openState(plan) {
    const today = dayString();
    const gap = plan.lastOpenDate ? daysBetween(plan.lastOpenDate, today) : 0;
    return {
      today,
      gap,
      crossDay: plan.today !== today,
      forceQuiz: Boolean(plan.lastOpenDate) && gap >= FORCE_GAP
    };
  },

  adjustDaily(current, accuracy, completion) {
    let n = current > 0 ? current : DAILY_DEFAULT;
    if (accuracy != null) {
      if (accuracy >= 0.85) n += 5;
      else if (accuracy < 0.6) n -= 5;
    }
    if (completion != null && completion < 0.5) n -= 5;
    return Math.max(DAILY_MIN, Math.min(DAILY_MAX, n));
  },

  /** 按单元顺序，从未学词中补齐今日队列 */
  pickNew(words, memory, count) {
    const picked = [];
    for (const word of words) {
      if (picked.length >= count) break;
      if (!memory[word.id]) picked.push(word.id);
    }
    return picked;
  },

  buildDailyPlan(plan, state, words, memory) {
    const next = { ...plan };
    const yesterdayCompletion = plan.queue.length
      ? plan.doneCount / plan.queue.length
      : null;

    if (state.crossDay) {
      next.dailyNewCount = Engine.adjustDaily(plan.dailyNewCount, plan.lastQuizAccuracy, yesterdayCompletion);
      next.queue = Engine.pickNew(words, memory, next.dailyNewCount);
      next.doneCount = 0;
      next.yesterdayRate = yesterdayCompletion;
      next.today = state.today;
      next.streak = (yesterdayCompletion || 0) > 0 ? plan.streak + 1 : 1;
    }

    next.lastOpenDate = state.today;
    if (state.forceQuiz) next.forceQuizDone = false;
    return next;
  },

  advance(previous, delta, atSec) {
    const prevStage = previous ? previous.stage : -1;
    const stage = delta > 0
      ? Math.min(GRADUATED, prevStage + 1)
      : Math.max(0, prevStage - 1);
    const graduated = stage >= GRADUATED;
    return {
      stage,
      graduated,
      dueAt: graduated ? 0 : atSec + STAGE_DAYS[Math.min(stage, STAGE_DAYS.length - 1)] * 86400,
      lastReview: atSec,
      intervalDays: graduated ? 0 : STAGE_DAYS[Math.min(stage, STAGE_DAYS.length - 1)]
    };
  }
};

/* ==================== 词库 ==================== */

const Bank = {
  raw: null,
  words: { enavant: [], simple: [] },
  byId: {},
  lessonCounts: {},
  verbs: [],
  tenseNames: [],
  persons: [],
  conjugations: {},
  pointUnits: [],
  grammarGroups: [],

  build(raw) {
    Bank.raw = raw;
    Bank.tenseNames = raw.tenseNames || [];
    Bank.persons = raw.persons || [];
    Bank.verbs = raw.verbs || [];
    Bank.conjugations = raw.conjugations || {};

    const meta = [
      ['enavant', 'e', 'enavant'],
      ['simple', 'c', 'simple']
    ];
    for (const [source, prefix, block] of meta) {
      const list = ((raw.sources[block] || {}).words || []).map((w) => ({
        id: prefix + w.id,
        source,
        fr: w.fr,
        cn: w.cn,
        pos: w.pos || '',
        unit: Number(w.lesson || w.unit || 0),
        theme: w.theme || '',
        cat: w.cat || '',
        example: w.example || '',
        exampleCn: w.exampleCn || '',
        isVerb: (w.pos || '').indexOf('v.') === 0
      }));
      Bank.words[source] = list;
      Bank.lessonCounts[source] = {};
      for (const word of list) {
        Bank.byId[word.id] = word;
        Bank.lessonCounts[source][word.unit] = (Bank.lessonCounts[source][word.unit] || 0) + 1;
      }
    }

    Bank.pointUnits = Bank.buildPointUnits(raw.grammarEnavant || { units: [], points: [], examples: [] });
    Bank.grammarGroups = Bank.buildGrammarGroups(raw.grammarSimple || []);
  },

  buildPointUnits(grammar) {
    const buckets = new Map();
    for (const point of grammar.points || []) {
      if (!buckets.has(point.unit)) {
        buckets.set(point.unit, { unit: point.unit, theme: point.theme || '', points: [], examples: [] });
      }
      buckets.get(point.unit).points.push(point);
    }
    for (const example of grammar.examples || []) {
      if (!buckets.has(example.unit)) {
        const unit = (grammar.units || []).find((u) => u.unit === example.unit);
        buckets.set(example.unit, {
          unit: example.unit,
          theme: unit ? unit.theme : '',
          points: [],
          examples: []
        });
      }
      buckets.get(example.unit).examples.push(example);
    }
    return [...buckets.values()].sort((a, b) => a.unit - b.unit);
  },

  buildGrammarGroups(lessons) {
    const order = [];
    const buckets = new Map();
    for (const lesson of lessons) {
      const key = `${lesson.level} · ${lesson.stage}`;
      if (!buckets.has(key)) {
        buckets.set(key, { key, level: lesson.level, stage: lesson.stage, lessons: [] });
        order.push(key);
      }
      buckets.get(key).lessons.push(lesson);
    }
    return order.map((key) => buckets.get(key));
  }
};

/* ==================== 科学词库（教材目录校对版） ==================== */

// 七上/七下 → 七年级；八上/八下/衔接 → 八年级（LC 衔接归入八年级）
function gradeBucketOf(book) {
  const first = String(book || '').charAt(0);
  if (first === '七') return '七';
  if (first === '八' || first === '衔') return '八';
  return '';
}

function inSciGrade(book, grade) {
  return !grade || grade === 'all' || gradeBucketOf(book) === grade;
}

const Science = {
  raw: null,

  build(raw) {
    this.raw = raw || {};
  },

  units(subject, grade) {
    const block = this.raw[subject] || {};
    return (block.units || []).filter((unit) => inSciGrade(unit.book, grade));
  },

  points(subject, grade) {
    const block = this.raw[subject] || {};
    return (block.points || []).filter((point) => inSciGrade(point.book, grade));
  },

  formulaUnits(subject) {
    const units = (this.raw.formulas || {}).units || [];
    return units.filter((u) => u.subject === subject);
  },

  formulas(subject) {
    const raw = this.raw.formulas || {};
    const keys = new Set(this.formulaUnits(subject).map((u) => u.key));
    return (raw.formulas || []).filter((f) => keys.has(f.unit));
  }
};

/* ==================== 应用状态 ==================== */

const S = {
  ready: false,
  source: 'enavant',
  memory: {},
  verbMemory: {},
  plan: null,

  tab: 'home',
  ids: [],
  index: 0,
  flipped: false,
  lesson: 0,

  quiz: null,
  answered: false,
  selected: null,
  right: 0,
  total: 0,
  asked: [],

  force: false,
  forceLeft: 0,
  forceRight: 0,
  forceGap: 0,

  verbIndex: 0,
  tenseIndex: 0,
  mask: false,
  revealed: new Set(),

  filterUnit: 0,
  filterLevel: '全部',

  // 科学（与小程序 / iOS 独立记忆键）
  sciSubject: 'bio',
  sciSeg: 'point',
  sciGrade: 'all',
  sciUnit: '',
  sciFormulaUnit: '',
  sciIndex: 0,
  sciFormulaIndex: 0,
  sciFlipped: false,
  sciLang: 'zh',
  sciQuizMode: 'point',
  sciQuizLang: 'en2zh',
  sciQuiz: null,
  sciAnswered: false,
  sciSelected: null,
  sciRight: 0,
  sciTotal: 0,
  sciAsked: [],
  sciMemory: {},

  toastTimer: null
};

/* ==================== 派生数据 ==================== */

const gidPrefix = () => (S.source === 'enavant' ? 'e' : 'c');

function words() {
  return Bank.words[S.source] || [];
}

function scopedWords() {
  if (S.source !== 'simple' || !S.lesson) return words();
  const filtered = words().filter((w) => w.unit === S.lesson);
  return filtered.length ? filtered : words();
}

function card() {
  const id = S.ids[S.index];
  return id ? Bank.byId[id] : null;
}

function cardConjugation() {
  const current = card();
  if (!current || !current.isVerb) return null;
  return Bank.conjugations[current.fr] || null;
}

function makeStats(list) {
  const now = nowSec();
  const result = { due: [], learning: [], fresh: [], graduated: [], total: list.length };
  for (const word of list) {
    const record = S.memory[word.id];
    if (!record) {
      result.fresh.push(word);
    } else if (record.stage >= GRADUATED) {
      result.graduated.push(word);
    } else if (record.dueAt <= now) {
      result.due.push(word);
    } else {
      result.learning.push(word);
    }
  }
  result.due.sort((a, b) => (S.memory[a.id].dueAt || 0) - (S.memory[b.id].dueAt || 0));
  return result;
}

const stats = () => makeStats(scopedWords());

function studiedToday() {
  const prefix = gidPrefix();
  const start = startOfToday();
  let count = 0;
  for (const [id, record] of Object.entries(S.memory)) {
    if (id.startsWith(prefix) && record.lastReview >= start) count += 1;
  }
  return count;
}

function ringFraction() {
  const target = S.plan.queue.length;
  if (!target) return 1;
  return Math.min(1, studiedToday() / target);
}

/* 模块进度：已学 = 有任意记忆记录；固化 = 走完 1/2/4/7/15/30/60 天全部阶段 */
function progressFrom(ids, store) {
  const now = nowSec();
  let studied = 0;
  let graduated = 0;
  let due = 0;
  for (const id of ids) {
    const record = store[id];
    if (!record) continue;
    studied += 1;
    if (record.stage >= GRADUATED) graduated += 1;
    else if (record.dueAt <= now) due += 1;
  }
  const total = ids.length;
  return {
    total,
    studied,
    graduated,
    due,
    percent: total ? Math.round((studied / total) * 100) : 0
  };
}

function frenchProgress(source) {
  const list = Bank.words[source] || [];
  return progressFrom(list.map((word) => word.id), S.memory);
}

function scienceProgress(subject) {
  const points = Science.points(subject);
  const formulas = Science.formulas(subject);
  const ids = points.map((point) => point.id)
    .concat(formulas.map((formula) => `f${formula.id}`));
  return Object.assign(progressFrom(ids, S.sciMemory), {
    points: points.length,
    formulas: formulas.length,
    g7: points.filter((point) => gradeBucketOf(point.book) === '七').length,
    g8: points.filter((point) => gradeBucketOf(point.book) === '八').length
  });
}

function totalDueCount() {
  return frenchProgress('enavant').due
    + frenchProgress('simple').due
    + scienceProgress('bio').due
    + scienceProgress('chem').due;
}

function lessonOptions() {
  const counts = Bank.lessonCounts.simple || {};
  const options = [{ value: 0, label: '全部', count: Bank.words.simple.length }];
  for (let lesson = 1; lesson <= 30; lesson += 1) {
    options.push({ value: lesson, label: `第${lesson}课`, count: counts[lesson] || 0 });
  }
  return options;
}

function verbDueCount() {
  const now = nowSec();
  return Bank.verbs.filter((verb) => {
    const record = S.verbMemory[String(verb.id)];
    return record && record.stage < GRADUATED && record.dueAt <= now;
  }).length;
}

function currentVerb() {
  return Bank.verbs[S.verbIndex] || Bank.verbs[0] || null;
}

function currentVerbForms() {
  const verb = currentVerb();
  const tense = Bank.tenseNames[S.tenseIndex];
  return verb && tense ? (verb.tenses[tense] || []) : [];
}

/* ==================== 持久化 ==================== */

function persistPlan() { write(KEY.plan, S.plan); }
function persistMemory() { write(KEY.memory, S.memory); }

/* ==================== 提示 ==================== */

function toast(text) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('is-on');
  clearTimeout(S.toastTimer);
  S.toastTimer = setTimeout(() => el.classList.remove('is-on'), 1900);
}

/* ==================== 语音 ==================== */

let cachedVoice = null;

function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replace(/\.\.\./g, '…'));
    utter.lang = 'fr-FR';
    utter.rate = 0.92;
    if (!cachedVoice) {
      cachedVoice = window.speechSynthesis.getVoices().find((v) => /^fr/i.test(v.lang)) || null;
    }
    if (cachedVoice) utter.voice = cachedVoice;
    window.speechSynthesis.speak(utter);
  } catch (err) {
    console.warn('朗读不可用', err);
  }
}

/* ==================== 核心动作 ==================== */

function rebuild() {
  const pool = scopedWords();
  const poolIDs = new Set(pool.map((w) => w.id));
  const queueIDs = S.plan.queue.filter((id) => poolIDs.has(id));
  S.ids = S.lesson ? pool.map((w) => w.id) : (queueIDs.length ? queueIDs : pool.map((w) => w.id));
  S.index = 0;
  S.flipped = false;
}

function refreshOnLaunch() {
  const state = Engine.openState(S.plan);
  let next = Engine.buildDailyPlan(S.plan, state, words(), S.memory);
  if (!next.queue.length) {
    next.queue = Engine.pickNew(words(), S.memory, next.dailyNewCount);
  }
  S.plan = next;
  persistPlan();

  S.force = state.forceQuiz && !next.forceQuizDone;
  S.forceGap = state.gap;
  S.forceLeft = S.force ? FORCE_QUESTIONS : 0;
  S.forceRight = 0;

  rebuild();
  buildQuiz();
}

function switchSource(source) {
  if (source === S.source) return;
  S.source = source;
  writeRaw(KEY.source, source);
  S.lesson = 0;
  S.plan = {
    ...S.plan,
    queue: Engine.pickNew(Bank.words[source], S.memory, S.plan.dailyNewCount),
    doneCount: 0
  };
  persistPlan();
  S.filterUnit = 0;
  S.filterLevel = '全部';
  rebuild();
  buildQuiz();
}

function rateWord(gid, delta, silent) {
  const at = nowSec();
  const previous = S.memory[gid];
  const result = Engine.advance(previous, delta, at);
  S.memory[gid] = { stage: result.stage, dueAt: result.dueAt, lastReview: result.lastReview };

  S.plan = {
    ...S.plan,
    doneCount: Math.min(S.plan.queue.length, studiedToday()),
    totalStudied: S.plan.totalStudied + (previous ? 0 : (S.plan.queue.includes(gid) ? 1 : 0))
  };

  persistMemory();
  persistPlan();

  if (silent) return;
  if (result.graduated) toast('已固化 🎓');
  else if (delta > 0) toast(`记住了 · ${result.intervalDays} 天后`);
  else toast('忘记了 · 缩短间隔');
}

function rate(delta) {
  const current = card();
  if (!current) return;
  rateWord(current.id, delta, false);
  S.flipped = false;
  renderAll();
}

function showCard(index) {
  if (!S.ids.length) return;
  let target = index;
  if (target < 0) target = S.ids.length - 1;
  if (target >= S.ids.length) target = 0;
  S.index = target;
  S.flipped = false;
  renderAll();
}

function startReview() {
  const due = stats().due.map((w) => w.id);
  if (!due.length) { toast('今天没有待复习的词 🎉'); return; }
  S.ids = due;
  S.index = 0;
  S.flipped = false;
  S.tab = 'card';
  renderAll();
}

function startNew() {
  if (!S.plan.queue.length) { toast('今日新词已学完'); return; }
  S.ids = S.plan.queue.slice();
  S.index = 0;
  S.flipped = false;
  S.tab = 'card';
  renderAll();
}

function browseAll() {
  S.ids = words().map((w) => w.id);
  S.index = 0;
  S.flipped = false;
  S.tab = 'card';
  renderAll();
}

function focusWord(bucket, id) {
  const list = stats()[bucket] || [];
  if (!list.length) return;
  S.ids = list.map((w) => w.id);
  const at = list.findIndex((w) => w.id === id);
  S.index = at < 0 ? 0 : at;
  S.flipped = false;
  S.tab = 'card';
  renderAll();
}

/* ---------- 自测 ---------- */

function buildQuiz() {
  const poolBase = words();
  if (!poolBase.length) { S.quiz = null; return; }

  let pool = poolBase.filter((w) => !S.asked.includes(w.id));
  if (pool.length < 4) {
    pool = poolBase;
    S.asked = [];
  }

  const word = pool[Math.floor(Math.random() * pool.length)];
  const mode = S.total % 2 === 0 ? 'fr2cn' : 'cn2fr';
  const distractors = shuffle(poolBase.filter((w) => w.id !== word.id)).slice(0, 3);
  const options = shuffle([word, ...distractors]).map((w) => ({
    id: w.id,
    text: mode === 'fr2cn' ? w.cn : w.fr
  }));

  S.quiz = { word, mode, options, answerId: word.id };
  S.answered = false;
  S.selected = null;
  S.asked.push(word.id);
  write(KEY.asked, S.asked);
}

function answer(optionId) {
  if (!S.quiz || S.answered) return;
  const correct = optionId === S.quiz.answerId;
  rateWord(S.quiz.word.id, correct ? 1 : -1, true);

  S.answered = true;
  S.selected = optionId;

  if (S.force) {
    if (correct) S.forceRight += 1;
  } else {
    S.total += 1;
    if (correct) S.right += 1;
    write(KEY.score, { right: S.right, total: S.total });
  }
  renderAll();
}

function nextQuestion() {
  if (S.force) {
    S.forceLeft -= 1;
    if (S.forceLeft <= 0) { finishForceQuiz(); return; }
    buildQuiz();
    renderAll();
    return;
  }
  buildQuiz();
  renderAll();
}

function finishForceQuiz() {
  const accuracy = S.forceRight / FORCE_QUESTIONS;
  S.plan = {
    ...S.plan,
    lastQuizAccuracy: accuracy,
    forceQuizDone: true,
    dailyNewCount: Engine.adjustDaily(S.plan.dailyNewCount, accuracy, null)
  };
  persistPlan();
  S.force = false;
  S.forceLeft = 0;
  buildQuiz();
  toast(`热身完成 ${Math.round(accuracy * 100)}% · 明日 ${S.plan.dailyNewCount} 词/天`);
  renderAll();
}

function resetQuizStats() {
  S.right = 0;
  S.total = 0;
  S.asked = [];
  write(KEY.score, { right: 0, total: 0 });
  write(KEY.asked, []);
  buildQuiz();
  toast('统计已重置');
  renderAll();
}

/* ---------- 变位 ---------- */

function selectVerb(index) {
  const total = Bank.verbs.length;
  if (!total) return;
  S.verbIndex = ((index % total) + total) % total;
  S.revealed = new Set();
  renderAll();
}

function selectTense(index) {
  S.tenseIndex = index;
  S.revealed = new Set();
  renderAll();
}

function rateVerb(delta) {
  const verb = currentVerb();
  if (!verb) return;
  const key = String(verb.id);
  const result = Engine.advance(S.verbMemory[key], delta, nowSec());
  S.verbMemory[key] = { stage: result.stage, dueAt: result.dueAt, lastReview: result.lastReview };
  write(KEY.verbMemory, S.verbMemory);

  if (result.graduated) toast('变位已固化 🎓');
  else if (delta > 0) toast(`记住了 · ${result.intervalDays} 天后`);
  else toast('忘记了 · 缩短间隔');
  renderAll();
}

/* ==================== 渲染 ==================== */

function ringOffset() {
  return RING_C * (1 - ringFraction());
}

function renderHeader() {
  const sub = document.getElementById('brand-sub');
  if (S.tab === 'science') {
    const subject = S.sciSubject === 'chem' ? '化学' : '生物';
    sub.textContent = `${subject} · ${Science.points(S.sciSubject).length} 知识点 / ${Science.formulas(S.sciSubject).length} 公式`;
  } else if (S.tab === 'home') {
    const sci = Science.points('bio').length + Science.points('chem').length
      + Science.formulas('bio').length + Science.formulas('chem').length;
    sub.textContent = `四个模块 · 法语 ${words().length} 词 + 科学 ${sci} 条`;
  } else {
    const source = S.source === 'enavant' ? 'En Avant' : '简明法语';
    sub.textContent = `${source} · ${words().length} 词${S.source === 'simple' && S.lesson ? ` · 第${S.lesson}课` : ''}`;
  }
  document.getElementById('ring-days').textContent = Math.max(1, S.plan.streak);
  document.getElementById('ring-fill').style.strokeDashoffset = ringOffset().toFixed(1);
}

/* Apple Watch 风格同心环：外环今日新词 / 中环记忆状态 / 内环长期固化 */
function ringDash(radius, fraction) {
  const circumference = 2 * Math.PI * radius;
  const value = Math.max(0, Math.min(1, fraction || 0));
  return {
    dash: circumference.toFixed(1),
    offset: (circumference * (1 - value)).toFixed(1)
  };
}

function renderHome() {
  const done = Math.min(S.plan.queue.length, studiedToday());
  const target = S.plan.queue.length;
  const percent = Math.round(ringFraction() * 100);
  const due = totalDueCount();
  const streak = Math.max(1, S.plan.streak);

  let studiedTotal = 0;
  let graduatedTotal = 0;
  const modules = HOME_MODULES.map((module) => {
    const progress = module.kind === 'fr'
      ? frenchProgress(module.key)
      : scienceProgress(module.key);
    studiedTotal += progress.studied;
    graduatedTotal += progress.graduated;
    const sub = module.kind === 'fr'
      ? `法语 · ${progress.total} 词`
      : (module.key === 'bio'
        ? `七+八年级 · ${progress.g7}+${progress.g8} 知识点 / ${progress.formulas} 公式`
        : `八年级 · ${progress.points} 知识点 / ${progress.formulas} 公式`);
    return `
      <button class="bento module-card" data-act="home-open" data-val="${module.key}"
              style="--accent:${module.accent};--tint:${module.tint}">
        <span class="module-top">
          <span class="module-mark">${module.mark}</span>
          <span class="module-go" aria-hidden="true">↗</span>
        </span>
        <span class="module-name">${module.name}</span>
        <span class="module-sub">${sub}</span>
        <span class="module-progress-row">
          <b>${progress.percent}%</b><span>已学 ${progress.studied}/${progress.total}</span>
        </span>
        <span class="bar"><i style="width:${progress.percent}%"></i></span>
        <span class="module-foot">
          <span>固化 ${progress.graduated}</span><span>待复习 ${progress.due}</span>
        </span>
      </button>`;
  }).join('');

  // 中环 = 已学记忆健康度（已学且不需复习的比例），内环 = 长期固化率
  const memoryFraction = studiedTotal ? (studiedTotal - due) / studiedTotal : 0;
  const solidFraction = studiedTotal ? graduatedTotal / studiedTotal : 0;
  const ringToday = ringDash(42, ringFraction());
  const ringMemory = ringDash(32, memoryFraction);
  const ringSolid = ringDash(22, solidFraction);
  const ringLegend = [
    { key: 'today', label: '今日新词', value: `${done}/${target}`, tone: Math.round(ringFraction() * 100) },
    { key: 'memory', label: '记忆状态', value: `${studiedTotal - due}/${studiedTotal}`, tone: Math.round(memoryFraction * 100) },
    { key: 'solid', label: '长期固化', value: `${graduatedTotal}/${studiedTotal}`, tone: Math.round(solidFraction * 100) }
  ].map((row) => `
    <div class="ring-legend-row">
      <i class="ring-dot ring-dot-${row.key}"></i>
      <span>${row.label}</span>
      <b>${row.value}</b>
      <em>${row.tone}%</em>
    </div>`).join('');

  return `
    <div class="bento-grid">
      <section class="bento bento-hero">
        <div class="hero-copy">
          <span class="hero-kicker">BELLA · DAILY</span>
          <h2>四个模块，一起向前</h2>
          <p>待复习 <b>${due}</b> 项 · 今日新词 <b>${target}</b> · 连续 <b>${streak}</b> 天</p>
        </div>
        <div class="hero-streak" aria-label="连续学习 ${streak} 天">
          <b>${streak}</b><span>连续天数</span>
        </div>
      </section>

      <section class="bento bento-rings" aria-label="学习状态总览">
        <div class="rings-visual">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle class="ring-track" cx="50" cy="50" r="42"></circle>
            <circle class="ring-fill ring-today" cx="50" cy="50" r="42"
                    stroke-dasharray="${ringToday.dash}" stroke-dashoffset="${ringToday.offset}"></circle>
            <circle class="ring-track" cx="50" cy="50" r="32"></circle>
            <circle class="ring-fill ring-memory" cx="50" cy="50" r="32"
                    stroke-dasharray="${ringMemory.dash}" stroke-dashoffset="${ringMemory.offset}"></circle>
            <circle class="ring-track" cx="50" cy="50" r="22"></circle>
            <circle class="ring-fill ring-solid" cx="50" cy="50" r="22"
                    stroke-dasharray="${ringSolid.dash}" stroke-dashoffset="${ringSolid.offset}"></circle>
          </svg>
          <div class="rings-center"><b>${percent}%</b><span>今日</span></div>
        </div>
        <div class="rings-info">
          <span class="rings-label">学习状态</span>
          <span class="rings-caption">待复习 <b>${due}</b> 项 · 累计 ${S.plan.totalStudied} 词</span>
          <div class="ring-legend">${ringLegend}</div>
        </div>
      </section>

      ${modules}

      <section class="bento bento-next">
        <div class="next-copy">
          <span class="stat-label">学习节奏</span>
          <b>每天一点点，四块都顾到</b>
        </div>
        <div class="next-actions">
          <button class="pill" data-act="tab" data-val="quiz">自测</button>
          <button class="pill" data-act="tab" data-val="verb">变位</button>
          <button class="pill" data-act="tab" data-val="points">知识点</button>
        </div>
      </section>
    </div>`;
}

function renderTabs() {
  document.getElementById('tabs').innerHTML = TABS.map((tab) => `
    <button class="tab${S.tab === tab.id ? ' is-active' : ''}" data-act="tab" data-val="${tab.id}">${tab.label}</button>
  `).join('');
}

function lessonChips() {
  if (S.source !== 'simple') return '';
  return `
    <div class="chips">
      ${lessonOptions().map((opt) => `
        <button class="chip${S.lesson === opt.value ? ' is-active' : ''}" data-act="lesson" data-val="${opt.value}">
          ${esc(opt.label)}<small>${opt.count}</small>
        </button>
      `).join('')}
    </div>`;
}

function cardMarkup() {
  const current = card();
  if (!current) {
    return `<div class="card empty"><span class="ico">🎉</span>当前范围没有单词，换个课次试试</div>`;
  }

  const conjugation = cardConjugation();
  const unitLabel = current.source === 'simple' ? `第${current.unit}课` : `Unit ${current.unit}`;

  return `
    <div class="panel">
      ${lessonChips()}
      <div class="card-counter">${S.index + 1} / ${S.ids.length}</div>

      <div class="flashcard${S.flipped ? ' is-flipped' : ''}">
        <div class="flashcard-inner">
          <div class="face face-front" data-act="flip">
            <span class="card-badge">${esc(unitLabel)}${current.theme ? ' · ' + esc(current.theme) : ''}</span>
            <span class="word-fr${current.fr.length > 16 ? ' sm' : ''}">${esc(current.fr)}</span>
            <button class="speak lg" data-act="speak" aria-label="朗读">🔊</button>
            <span class="card-flip-hint">点击卡片看释义</span>
          </div>

          <div class="face face-back">
            <span class="back-word">${esc(current.fr)}</span>
            <span class="back-cn">${esc(current.cn)}${current.pos ? ' · ' + esc(current.pos) : ''}</span>

            ${current.example ? `
              <div class="example">
                <div class="fr">${esc(current.example)}</div>
                <div class="cn">${esc(current.exampleCn)}</div>
              </div>` : ''}

            ${conjugation ? `
              <div class="conj">
                <div class="conj-title">现在时变位</div>
                ${conjugation.map((form, i) => `
                  <div class="conj-row">
                    <span>${esc(Bank.persons[i] || '')}</span>
                    <span>${esc(form)}</span>
                  </div>`).join('')}
              </div>` : ''}

            <button class="btn btn-ghost btn-sm" data-act="flip">返回正面</button>
          </div>
        </div>
      </div>

      <div class="rate-row">
        <button class="btn btn-soft" data-act="forget">忘记了</button>
        <button class="btn btn-primary" data-act="remember">记住了</button>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost btn-sm" data-act="prev">← 上一个</button>
        <button class="btn btn-ghost btn-sm" data-act="next">下一个 →</button>
      </div>
    </div>`;
}

function quizMarkup(compact) {
  if (!S.quiz) {
    return `<div class="card empty"><span class="ico">📚</span>词库为空，无法出题</div>`;
  }

  const q = S.quiz;
  const acc = S.total ? Math.round((S.right / S.total) * 100) : 0;
  const prompt = q.mode === 'fr2cn' ? q.word.fr : q.word.cn;
  const hint = q.mode === 'fr2cn' ? '选出中文释义' : '选出法语单词';
  const correctOption = q.options.find((o) => o.id === q.answerId);

  const options = q.options.map((opt, i) => {
    let cls = 'option';
    if (S.answered) {
      if (opt.id === q.answerId) cls += ' is-correct';
      else if (opt.id === S.selected) cls += ' is-wrong';
    }
    return `
      <button class="${cls}" data-act="answer" data-val="${esc(opt.id)}" ${S.answered ? 'disabled' : ''}>
        <span class="idx">${String.fromCharCode(65 + i)}</span>
        <span>${esc(opt.text)}</span>
      </button>`;
  }).join('');

  const verdict = S.answered ? `
    <div class="quiz-verdict ${S.selected === q.answerId ? 'ok' : 'no'}">
      ${S.selected === q.answerId
        ? '答对了 ✓'
        : `答错了 · 正确答案：${esc(correctOption ? correctOption.text : '')}`}
    </div>
    ${q.word.example ? `
      <div class="example">
        <div class="fr">${esc(q.word.example)}</div>
        <div class="cn">${esc(q.word.exampleCn)}</div>
      </div>` : ''}
    <button class="btn btn-primary" data-act="quiz-next">下一题（${S.force ? `剩 ${Math.max(0, S.forceLeft - 1)} 题` : '继续'}）</button>` : '';

  const head = compact ? '' : `
    <div class="card quiz-score">
      <div>
        <div class="card-title">自测正确率</div>
        <div class="muted">已答 ${S.total} 题 · 对 ${S.right} 题</div>
      </div>
      <b>${acc}%</b>
    </div>`;

  return `
    ${head}
    <div class="quiz-prompt">
      <div class="label">${hint}</div>
      <div class="text">${esc(prompt)}</div>
    </div>
    <div class="options">${options}</div>
    ${verdict}`;
}

function renderQuiz() {
  return `
    <div class="panel">
      ${quizMarkup(false)}
      <div class="row-btns">
        <button class="btn btn-ghost btn-sm" data-act="quiz-skip">跳过这题</button>
        <button class="btn btn-danger btn-sm" data-act="quiz-reset">重置统计</button>
      </div>
    </div>`;
}

function renderForce() {
  const modal = document.getElementById('force');
  const body = document.getElementById('force-body');
  if (!S.force) {
    modal.hidden = true;
    body.innerHTML = '';
    return;
  }
  modal.hidden = false;
  document.getElementById('force-sub').textContent =
    `已有 ${S.forceGap} 天没来，先自测 10 题确认记忆还在 · 剩 ${S.forceLeft} 题`;
  body.innerHTML = quizMarkup(true);
}

function renderVerb() {
  const verb = currentVerb();
  if (!verb) {
    return `<div class="card empty"><span class="ico">📖</span>暂无变位数据</div>`;
  }

  const forms = currentVerbForms();
  const record = S.verbMemory[String(verb.id)];
  const due = verbDueCount();

  let stageText;
  if (!record) stageText = '新动词 · 待背诵';
  else if (record.stage >= GRADUATED) stageText = '已固化 🎓';
  else if (record.dueAt <= nowSec()) stageText = `待复习 · 阶段 ${record.stage + 1}/${GRADUATED}`;
  else stageText = `记忆阶段 ${record.stage + 1}/${GRADUATED} · ${STAGE_DAYS[Math.min(record.stage, STAGE_DAYS.length - 1)]}天间隔`;

  const rows = forms.map((form, i) => {
    const hidden = S.mask && !S.revealed.has(i);
    return `
      <div class="verb-row">
        <span class="verb-person">${esc(Bank.persons[i] || '')}</span>
        <span class="verb-form${hidden ? ' masked' : ' revealed'}" ${hidden ? `data-act="reveal" data-val="${i}"` : ''}>${esc(form)}</span>
      </div>`;
  }).join('');

  return `
    <div class="panel">
      <div class="chips">
        ${Bank.verbs.map((v, i) => `
          <button class="pill${S.verbIndex === i ? ' is-active' : ''}" data-act="verb" data-val="${i}">${esc(v.name)}</button>
        `).join('')}
      </div>

      <div class="chips">
        ${Bank.tenseNames.map((name, i) => `
          <button class="pill${S.tenseIndex === i ? ' is-active' : ''}" data-act="tense" data-val="${i}">${esc(name)}</button>
        `).join('')}
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <div class="card-title">${esc(verb.name)}</div>
            <div class="muted">${esc(verb.cn)} · ${esc(verb.group)}</div>
          </div>
          <button class="speak" data-act="speak-verb" aria-label="朗读">🔊</button>
        </div>
        <div class="verb-table">${rows}</div>
      </div>

      <div class="stage-line">
        <span>${esc(stageText)}</span>
        ${due ? `<b>${due} 个待复习</b>` : ''}
      </div>

      <div class="rate-row">
        <button class="btn btn-soft btn-sm" data-act="mask">${S.mask ? '显示全部' : '遮住变位'}</button>
        <button class="btn btn-primary btn-sm" data-act="verb-remember">背下来了</button>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost btn-sm" data-act="verb-prev">← 上一个</button>
        <button class="btn btn-ghost btn-sm" data-act="verb-next">下一个 →</button>
      </div>
    </div>`;
}

function groupMarkup(title, bucket, list) {
  if (!list.length) return '';
  const rows = list.slice(0, 30).map((word) => {
    const record = S.memory[word.id];
    const stage = record
      ? (record.stage >= GRADUATED ? '已固化' : `阶段 ${record.stage + 1}`)
      : '新词';
    return `
      <button class="word-row" data-act="focus" data-val="${bucket}|${esc(word.id)}">
        <span class="fr">${esc(word.fr)}</span>
        <span class="cn">${esc(word.cn)}</span>
        <span class="stage">${stage}</span>
      </button>`;
  }).join('');

  return `
    <details class="group" ${bucket === 'due' ? 'open' : ''}>
      <summary>${title}<span class="count">${list.length}</span></summary>
      <div class="group-body">${rows}${list.length > 30 ? `<div class="hint" style="padding:8px 10px">仅显示前 30 个，开始复习按顺序过全部</div>` : ''}</div>
    </details>`;
}

function renderPlan() {
  const st = stats();
  const fraction = Math.round(ringFraction() * 100);
  const studied = Math.min(S.plan.queue.length, studiedToday());
  const graduatedPercent = st.total ? Math.round((st.graduated.length / st.total) * 100) : 0;
  const verbDue = verbDueCount();

  return `
    <div class="panel">
      <div class="stats">
        <div class="stat stat-due"><b>${st.due.length}</b><span>今日待复习</span></div>
        <div class="stat stat-learning"><b>${st.learning.length}</b><span>学习中</span></div>
        <div class="stat stat-new"><b>${st.fresh.length}</b><span>新词</span></div>
      </div>

      <div class="card">
        <div class="card-head">
          <span class="card-title">今日进度</span>
          <span class="card-title" style="color:var(--primary)">${studied} / ${S.plan.queue.length}</span>
        </div>
        <div class="bar"><i style="width:${fraction}%"></i></div>
        <div class="meta" style="margin-top:10px">
          <span>每日 ${S.plan.dailyNewCount} 词</span>
          <span>连续 ${S.plan.streak} 天</span>
          <span>固化 ${graduatedPercent}%</span>
          <span>累计 ${S.plan.totalStudied} 词</span>
        </div>
      </div>

      <button class="btn btn-primary" data-act="start-review">开始复习 · ${st.due.length} 词</button>
      <button class="btn btn-soft" data-act="start-new">背今日新词 · ${S.plan.queue.length} 词</button>

      ${verbDue ? `
        <button class="card" data-act="tab" data-val="verb" style="text-align:left">
          <div class="card-head" style="margin:0">
            <div>
              <div class="card-title">变位待复习</div>
              <div class="muted">${verbDue} 个动词变位到期</div>
            </div>
            <span class="count" style="font-size:11px;font-weight:800;color:var(--primary)">去背诵 →</span>
          </div>
        </button>` : ''}

      ${groupMarkup('今日待复习', 'due', st.due)}
      ${groupMarkup('学习中', 'learning', st.learning)}
      ${groupMarkup('新词', 'fresh', st.fresh)}

      <button class="btn btn-ghost btn-sm" data-act="browse-all">浏览全部单词 →</button>
      <div class="card" style="padding:13px 16px">
        <div class="card-head" style="margin:0">
          <span class="muted">切换词库</span>
          <div class="row-btns">
            <button class="pill${S.source === 'enavant' ? ' is-active' : ''}" data-act="source" data-val="enavant">En Avant</button>
            <button class="pill${S.source === 'simple' ? ' is-active' : ''}" data-act="source" data-val="simple">简明法语</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderPoints() {
  const enavant = S.source === 'enavant';

  if (enavant) {
    const units = S.filterUnit ? Bank.pointUnits.filter((u) => u.unit === S.filterUnit) : Bank.pointUnits;
    return `
      <div class="panel">
        <div class="card" style="padding:14px 16px">
          <div class="card-title">En Avant 知识点速查</div>
          <div class="muted" style="margin-top:2px">共 ${Bank.pointUnits.length} 单元 · ${units.length} 组</div>
        </div>
        <div class="chips">
          <button class="pill${S.filterUnit === 0 ? ' is-active' : ''}" data-act="unit" data-val="0">全部</button>
          ${Bank.pointUnits.map((u) => `
            <button class="pill${S.filterUnit === u.unit ? ' is-active' : ''}" data-act="unit" data-val="${u.unit}">${u.unit}</button>
          `).join('')}
        </div>
        ${units.map((unit) => `
          <div class="card point-unit">
            <div class="card-head" style="margin-bottom:6px">
              <span class="unit-tag">Unit ${unit.unit}</span>
              <span class="theme">${esc(unit.theme)}</span>
            </div>
            ${unit.points.length ? `<ul class="point-list">
              ${unit.points.map((p) => `<li><b>${esc(p.title)}</b> · ${esc(p.cn)}</li>`).join('')}
            </ul>` : ''}
            ${unit.examples.length ? `<ul class="point-list">
              ${unit.examples.slice(0, 6).map((e) => `<li>${esc(e.fr)}<br>${esc(e.cn)}</li>`).join('')}
            </ul>` : ''}
          </div>`).join('')}
      </div>`;
  }

  const levels = ['全部', ...new Set(Bank.grammarGroups.map((g) => g.level))];
  const groups = S.filterLevel === '全部'
    ? Bank.grammarGroups
    : Bank.grammarGroups.filter((g) => g.level === S.filterLevel);
  const lessonCount = Bank.grammarGroups.reduce((sum, g) => sum + g.lessons.length, 0);

  return `
    <div class="panel">
      <div class="card" style="padding:14px 16px">
        <div class="card-title">简明法语 · 语法体系</div>
        <div class="muted" style="margin-top:2px">上册 A1 + A2 · ${lessonCount} 课</div>
      </div>
      <div class="chips">
        ${levels.map((level) => `
          <button class="pill${S.filterLevel === level ? ' is-active' : ''}" data-act="level" data-val="${esc(level)}">${esc(level)}</button>
        `).join('')}
      </div>
      ${groups.map((group) => `
        <div class="card">
          <div class="card-head">
            <span class="card-title">${esc(group.level)} · ${esc(group.stage)}</span>
            <span class="muted">${group.lessons.length} 课</span>
          </div>
          ${group.lessons.map((lesson) => `
            <div style="padding:8px 0;border-bottom:1px solid var(--line)">
              <div style="font-size:12.5px;font-weight:700">第 ${lesson.lesson} 课 ${esc(lesson.theme)}</div>
              <div class="muted" style="margin-top:2px">${esc(lesson.topic)}</div>
              ${lesson.points.length ? `<ul class="point-list">${lesson.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
            </div>`).join('')}
        </div>`).join('')}
    </div>`;
}

/* ==================== 科学 ==================== */

function sciPoints() {
  const list = Science.points(S.sciSubject, S.sciGrade);
  return S.sciUnit ? list.filter((p) => p.unit === S.sciUnit) : list;
}

function sciFormulas() {
  const list = Science.formulas(S.sciSubject);
  return S.sciFormulaUnit ? list.filter((f) => f.unit === S.sciFormulaUnit) : list;
}

function sciRate(gid, delta) {
  const previous = S.sciMemory[gid];
  const result = Engine.advance(previous, delta, nowSec());
  S.sciMemory[gid] = {
    stage: result.stage,
    dueAt: result.dueAt,
    lastReview: result.lastReview
  };
  write(KEY.scienceMemory, S.sciMemory);
  if (result.graduated) toast('已固化 🎓');
  else if (delta > 0) toast(`记住了 · ${result.intervalDays}天后`);
  else toast('忘记了 · 缩短间隔');
}

function sciShowPoint(index) {
  const count = sciPoints().length;
  if (!count) return;
  S.sciIndex = ((index % count) + count) % count;
  S.sciFlipped = false;
}

function sciShowFormula(index) {
  const count = sciFormulas().length;
  if (!count) return;
  S.sciFormulaIndex = ((index % count) + count) % count;
  S.sciFlipped = false;
}

function sciBuildQuiz() {
  const pool = [];
  if (S.sciQuizMode === 'formula') {
    for (const f of Science.formulas(S.sciSubject)) {
      pool.push({
        gid: 'f' + f.id,
        front: S.sciQuizLang === 'en2zh' ? f.en : f.cn,
        back: S.sciQuizLang === 'en2zh' ? f.cn : f.en,
        hint: f.expr
      });
    }
  } else {
    for (const p of Science.points(S.sciSubject, S.sciGrade)) {
      pool.push({
        gid: p.id,
        front: S.sciQuizLang === 'en2zh' ? p.en : p.cn,
        back: S.sciQuizLang === 'en2zh' ? p.cn : p.en,
        hint: p.chapter
      });
    }
  }
  if (!pool.length) { S.sciQuiz = null; return; }

  let candidates = pool.filter((q) => !S.sciAsked.includes(q.gid));
  if (candidates.length < 4) {
    candidates = pool.slice();
    S.sciAsked = [];
  }
  const answer = candidates[Math.floor(Math.random() * candidates.length)];
  const distractors = pool.filter((q) => q.gid !== answer.gid)
    .slice().sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [answer].concat(distractors)
    .map((q) => ({ id: q.gid, text: q.back }))
    .sort(() => Math.random() - 0.5);

  S.sciQuiz = { answer, options, answerId: answer.gid };
  S.sciAnswered = false;
  S.sciSelected = null;
  S.sciAsked.push(answer.gid);
}

function sciAnswer(optionId) {
  if (!S.sciQuiz || S.sciAnswered) return;
  const correct = optionId === S.sciQuiz.answerId;
  S.sciAnswered = true;
  S.sciSelected = optionId;
  S.sciTotal += 1;
  if (correct) S.sciRight += 1;
  write(KEY.scienceStats, { right: S.sciRight, total: S.sciTotal });
  sciRate(S.sciQuiz.answerId, correct ? 1 : -1);
}

function sciChips(items, active, act) {
  return `
    <div class="chips">
      ${items.map((u) => `
        <button class="chip${active === u.key ? ' is-active' : ''}" data-act="${act}" data-val="${esc(u.key)}">
          ${esc(u.label)}
        </button>
      `).join('')}
    </div>`;
}

function sciPointCard() {
  const list = sciPoints();
  if (!list.length) return `<div class="card empty"><span class="ico">📚</span>该章节暂无知识点</div>`;
  sciShowPoint(S.sciIndex);
  const p = list[S.sciIndex];
  const en = S.sciLang === 'en';
  return `
    <div class="panel">
      ${S.sciSubject === 'bio' ? sciChips([
        { key: 'all', label: '全部' },
        { key: '七', label: '七年级' },
        { key: '八', label: '八年级' }
      ], S.sciGrade, 'sci-grade') : ''}
      ${sciChips([{ key: '', label: '全部' }].concat(Science.units(S.sciSubject, S.sciGrade)), S.sciUnit, 'sci-unit')}
      <div class="card-counter">${S.sciIndex + 1} / ${list.length} · 已学 ${Object.keys(S.sciMemory).length} 条</div>
      <div class="flashcard${S.sciFlipped ? ' is-flipped' : ''}">
        <div class="flashcard-inner sci-inner">
          <div class="face face-front sci-front" data-act="sci-flip">
            <span class="card-badge">${esc(p.chapter)}</span>
            <span class="sci-term">${esc(en ? p.en : p.cn)}</span>
            <span class="card-flip-hint">点击翻面看${en ? '中文' : '英文'}解释与 LC 关键词</span>
          </div>
          <div class="face face-back sci-back" data-act="sci-flip">
            <span class="sci-back-term">${esc(en ? p.en : p.cn)}</span>
            <p class="sci-def">${esc(en ? p.defEn : p.defCn)}</p>
            <div class="sci-kw">
              <b>LC 关键词</b>
              ${(p.keywords || []).map((k) => `<span><i>${esc(k.en)}</i> / ${esc(k.cn)}</span>`).join('')}
            </div>
            <p class="sci-tip">${esc(p.lcTip)}</p>
          </div>
        </div>
      </div>
      <div class="rate-row">
        <button class="btn btn-soft" data-act="sci-forget">忘记了</button>
        <button class="btn btn-primary" data-act="sci-remember">记住了</button>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost btn-sm" data-act="sci-prev">← 上一条</button>
        <button class="btn btn-ghost btn-sm" data-act="sci-next">下一条 →</button>
      </div>
    </div>`;
}

function sciFormulaCard() {
  const list = sciFormulas();
  if (!list.length) return `<div class="card empty"><span class="ico">🧪</span>该分类暂无公式</div>`;
  sciShowFormula(S.sciFormulaIndex);
  const f = list[S.sciFormulaIndex];
  const en = S.sciLang === 'en';
  return `
    <div class="panel">
      ${sciChips([{ key: '', label: '全部' }].concat(Science.formulaUnits(S.sciSubject)), S.sciFormulaUnit, 'sci-funit')}
      <div class="card-counter">${S.sciFormulaIndex + 1} / ${list.length}</div>
      <div class="flashcard${S.sciFlipped ? ' is-flipped' : ''}">
        <div class="flashcard-inner sci-inner">
          <div class="face face-front sci-front" data-act="sci-flip">
            <span class="card-badge">${esc(f.type || '')}</span>
            <span class="sci-term">${esc(en ? f.en : f.cn)}</span>
            <span class="sci-formula">${esc(f.formula)}</span>
            <span class="card-flip-hint">点击翻面看表达式与条件</span>
          </div>
          <div class="face face-back sci-back" data-act="sci-flip">
            <span class="sci-back-term">${esc(en ? f.en : f.cn)}</span>
            <p class="sci-def">${esc(en ? f.exprEn : f.expr)}</p>
            <span class="sci-formula">${esc(f.formula)}</span>
            ${f.cond ? `<p class="sci-cond">条件：${esc(en ? (f.condEn || f.cond) : f.cond)}</p>` : ''}
            <p class="sci-note">${esc(en ? f.noteEn : f.noteCn)}</p>
            <div class="sci-kw">${(f.keywords || []).map((k) => `<span><i>${esc(k.en)}</i> / ${esc(k.cn)}</span>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="rate-row">
        <button class="btn btn-soft" data-act="sci-forget">忘记了</button>
        <button class="btn btn-primary" data-act="sci-remember">记住了</button>
      </div>
      <div class="nav-row">
        <button class="btn btn-ghost btn-sm" data-act="sci-prev">← 上一条</button>
        <button class="btn btn-ghost btn-sm" data-act="sci-next">下一条 →</button>
      </div>
    </div>`;
}

function sciQuizMarkup() {
  const acc = S.sciTotal ? Math.round((S.sciRight / S.sciTotal) * 100) : 0;
  const q = S.sciQuiz;
  if (!q) return `<div class="card empty"><span class="ico">📚</span>暂无可出题内容</div>`;
  const options = q.options.map((opt) => {
    let cls = 'option';
    if (S.sciAnswered) {
      if (opt.id === q.answerId) cls += ' is-correct';
      else if (opt.id === S.sciSelected) cls += ' is-wrong';
    }
    return `<button class="${cls}" data-act="sci-answer" data-val="${esc(opt.id)}" ${S.sciAnswered ? 'disabled' : ''}>${esc(opt.text)}</button>`;
  }).join('');

  return `
    <div class="panel">
      <div class="row-btns">
        <button class="pill${S.sciQuizMode === 'point' ? ' is-active' : ''}" data-act="sci-qmode" data-val="point">术语互译</button>
        <button class="pill${S.sciQuizMode === 'formula' ? ' is-active' : ''}" data-act="sci-qmode" data-val="formula">公式配对</button>
        <button class="pill${S.sciQuizLang === 'en2zh' ? ' is-active' : ''}" data-act="sci-qlang" data-val="en2zh">英→中</button>
        <button class="pill${S.sciQuizLang === 'zh2en' ? ' is-active' : ''}" data-act="sci-qlang" data-val="zh2en">中→英</button>
      </div>
      <div class="card-head">
        <span class="card-title">选出正确释义</span>
        <span class="muted">正确率 ${acc}% · ${S.sciRight}/${S.sciTotal}</span>
      </div>
      <div class="card sci-quiz">
        <div class="sci-prompt">${esc(q.answer.front)}</div>
        <div class="sci-hint">${esc(q.answer.hint)}</div>
        <div class="options">${options}</div>
        ${S.sciAnswered ? `
          <div class="quiz-verdict ${q.answerId === S.sciSelected ? 'ok' : 'no'}">
            ${q.answerId === S.sciSelected ? '答对了 ✓' : `答错了 · 正确答案：${esc(q.options.find((o) => o.id === q.answerId).text)}`}
          </div>
          <button class="btn btn-primary" data-act="sci-qnext">下一题</button>
        ` : ''}
      </div>
      <button class="btn btn-ghost btn-sm" data-act="sci-reset">重置统计</button>
    </div>`;
}

function scienceMarkup() {
  return `
    <div class="sci-head panel">
      <div class="row-btns">
        <button class="pill${S.sciSubject === 'bio' ? ' is-active' : ''}" data-act="sci-subject" data-val="bio">生物</button>
        <button class="pill${S.sciSubject === 'chem' ? ' is-active' : ''}" data-act="sci-subject" data-val="chem">化学</button>
        <button class="pill" data-act="sci-lang">${S.sciLang === 'en' ? 'EN' : '中/英'}</button>
      </div>
      <div class="row-btns">
        <button class="pill${S.sciSeg === 'point' ? ' is-active' : ''}" data-act="sci-seg" data-val="point">知识点</button>
        <button class="pill${S.sciSeg === 'formula' ? ' is-active' : ''}" data-act="sci-seg" data-val="formula">公式</button>
        <button class="pill${S.sciSeg === 'quiz' ? ' is-active' : ''}" data-act="sci-seg" data-val="quiz">自测</button>
      </div>
      <div class="sci-source">教材目录校对版 · 英式术语对齐爱尔兰 Leaving Certificate</div>
    </div>
    ${S.sciSeg === 'point' ? sciPointCard() : (S.sciSeg === 'formula' ? sciFormulaCard() : sciQuizMarkup())}`;
}

function currentSciGid() {
  if (S.sciSeg === 'formula') {
    const list = sciFormulas();
    return list.length ? 'f' + list[S.sciFormulaIndex].id : null;
  }
  const list = sciPoints();
  return list.length ? list[S.sciIndex].id : null;
}

function sciAdvanceCard() {
  if (S.sciSeg === 'formula') sciShowFormula(S.sciFormulaIndex + 1);
  else sciShowPoint(S.sciIndex + 1);
  renderAll();
}

function renderView() {
  const view = document.getElementById('view');
  switch (S.tab) {
    case 'home': view.innerHTML = renderHome(); break;
    case 'card': view.innerHTML = cardMarkup(); break;
    case 'quiz': view.innerHTML = renderQuiz(); break;
    case 'verb': view.innerHTML = renderVerb(); break;
    case 'plan': view.innerHTML = renderPlan(); break;
    case 'points': view.innerHTML = renderPoints(); break;
    case 'science': view.innerHTML = scienceMarkup(); break;
    default: view.innerHTML = '';
  }
}

function renderAll() {
  if (!S.ready) return;
  renderTabs();
  renderHeader();
  renderView();
  renderForce();
}

/* ==================== 事件 ==================== */

const ACTIONS = {
  tab(val) {
    if (S.force) { toast('请先完成强制自测'); return; }
    if (val === 'quiz' && !S.quiz) buildQuiz();
    S.tab = val;
    renderAll();
  },

  'home-open'(val) {
    if (S.force) { toast('请先完成强制自测'); return; }
    if (val === 'enavant' || val === 'simple') {
      switchSource(val);
      S.tab = 'card';
    } else {
      S.sciSubject = val === 'chem' ? 'chem' : 'bio';
      S.sciSeg = 'point';
      S.sciUnit = '';
      S.sciFormulaUnit = '';
      S.sciIndex = 0;
      S.sciFormulaIndex = 0;
      S.sciFlipped = false;
      sciBuildQuiz();
      S.tab = 'science';
    }
    renderAll();
  },

  lesson(val) {
    S.lesson = Number(val);
    S.index = 0;
    S.flipped = false;
    rebuild();
    renderAll();
  },

  source(val) { switchSource(val); renderAll(); },

  flip() {
    S.flipped = !S.flipped;
    renderAll();
  },

  remember() { rate(1); },
  forget() { rate(-1); },
  prev() { showCard(S.index - 1); },
  next() { showCard(S.index + 1); },

  speak() {
    const current = card();
    if (current) speak(current.fr);
  },

  'speak-verb'() {
    const verb = currentVerb();
    if (verb) speak(verb.name);
  },

  'start-review'() { startReview(); },
  'start-new'() { startNew(); },
  'browse-all'() { browseAll(); },

  focus(val) {
    const [bucket, id] = val.split('|');
    focusWord(bucket, id);
  },

  answer(val) { answer(val); },

  'quiz-next'() { nextQuestion(); },
  'quiz-skip'() { buildQuiz(); renderAll(); },
  'quiz-reset'() { resetQuizStats(); },

  verb(val) { selectVerb(Number(val)); },
  tense(val) { selectTense(Number(val)); },
  'verb-prev'() { selectVerb(S.verbIndex - 1); },
  'verb-next'() { selectVerb(S.verbIndex + 1); },

  mask() {
    S.mask = !S.mask;
    S.revealed = new Set();
    renderAll();
  },

  reveal(val) {
    const index = Number(val);
    if (S.revealed.has(index)) S.revealed.delete(index);
    else S.revealed.add(index);
    renderAll();
  },

  'verb-remember'() { rateVerb(1); },

  unit(val) {
    S.filterUnit = Number(val);
    renderAll();
  },

  level(val) {
    S.filterLevel = val;
    renderAll();
  },

  'sci-subject'(val) {
    S.sciSubject = val === 'chem' ? 'chem' : 'bio';
    S.sciGrade = 'all';
    S.sciUnit = '';
    S.sciFormulaUnit = '';
    S.sciIndex = 0;
    S.sciFormulaIndex = 0;
    S.sciFlipped = false;
    S.sciAsked = [];
    S.sciQuiz = null;
    sciBuildQuiz();
    renderAll();
  },

  'sci-seg'(val) {
    S.sciSeg = ['point', 'formula', 'quiz'].includes(val) ? val : 'point';
    S.sciFlipped = false;
    if (S.sciSeg === 'quiz' && !S.sciQuiz) sciBuildQuiz();
    renderAll();
  },

  'sci-lang'() {
    S.sciLang = S.sciLang === 'en' ? 'zh' : 'en';
    renderAll();
  },

  'sci-grade'(val) {
    S.sciGrade = val || 'all';
    S.sciUnit = '';
    S.sciIndex = 0;
    S.sciFlipped = false;
    S.sciAsked = [];
    S.sciQuiz = null;
    renderAll();
  },

  'sci-unit'(val) {
    S.sciUnit = val;
    S.sciIndex = 0;
    S.sciFlipped = false;
    renderAll();
  },

  'sci-funit'(val) {
    S.sciFormulaUnit = val;
    S.sciFormulaIndex = 0;
    S.sciFlipped = false;
    renderAll();
  },

  'sci-flip'() {
    S.sciFlipped = !S.sciFlipped;
    renderAll();
  },

  'sci-remember'() {
    const gid = currentSciGid();
    if (gid) sciRate(gid, 1);
    sciAdvanceCard();
  },

  'sci-forget'() {
    const gid = currentSciGid();
    if (gid) sciRate(gid, -1);
    sciAdvanceCard();
  },

  'sci-prev'() {
    if (S.sciSeg === 'formula') sciShowFormula(S.sciFormulaIndex - 1);
    else sciShowPoint(S.sciIndex - 1);
    renderAll();
  },

  'sci-next'() {
    if (S.sciSeg === 'formula') sciShowFormula(S.sciFormulaIndex + 1);
    else sciShowPoint(S.sciIndex + 1);
    renderAll();
  },

  'sci-qmode'(val) {
    S.sciQuizMode = val === 'formula' ? 'formula' : 'point';
    S.sciAsked = [];
    S.sciQuiz = null;
    sciBuildQuiz();
    renderAll();
  },

  'sci-qlang'(val) {
    S.sciQuizLang = val === 'zh2en' ? 'zh2en' : 'en2zh';
    S.sciQuiz = null;
    sciBuildQuiz();
    renderAll();
  },

  'sci-answer'(val) {
    sciAnswer(val);
    renderAll();
  },

  'sci-qnext'() {
    sciBuildQuiz();
    renderAll();
  },

  'sci-reset'() {
    S.sciRight = 0;
    S.sciTotal = 0;
    S.sciAsked = [];
    write(KEY.scienceStats, { right: 0, total: 0 });
    sciBuildQuiz();
    renderAll();
    toast('统计已重置');
  }
};

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-act]');
  if (!el) return;
  const handler = ACTIONS[el.dataset.act];
  if (!handler) return;
  event.preventDefault();
  handler(el.dataset.val, el);
});

/* ==================== Service Worker ==================== */

let waitingWorker = null;

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('sw.js', { scope: './' }).then((registration) => {
    if (registration.waiting) showUpdateBar(registration.waiting);

    registration.addEventListener('updatefound', () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateBar(worker);
        }
      });
    });
  }).catch((err) => console.warn('Service Worker 注册失败', err));

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (window.__bellaReloading) return;
    window.__bellaReloading = true;
    window.location.reload();
  });

  window.addEventListener('online', () => updateNetbar());
  window.addEventListener('offline', () => updateNetbar());
  updateNetbar();
}

function showUpdateBar(worker) {
  waitingWorker = worker;
  const bar = document.getElementById('update-bar');
  bar.hidden = false;
  bar.onclick = () => {
    worker.postMessage({ type: 'SKIP_WAITING' });
  };
}

function updateNetbar() {
  const bar = document.getElementById('netbar');
  const text = document.getElementById('netbar-text');
  if (navigator.onLine) {
    bar.hidden = true;
  } else {
    bar.hidden = false;
    text.textContent = SINGLE_FILE
      ? '单文件版 · 全部内容已内置，无需联网'
      : '离线模式 · 已缓存内容可正常使用';
  }
}

/* ==================== 启动 ==================== */

function hydrate() {
  const storedSource = readRaw(KEY.source, 'enavant').replace(/^"|"$/g, '');
  S.source = storedSource === 'simple' ? 'simple' : 'enavant';
  S.memory = read(KEY.memory, {}) || {};
  S.verbMemory = read(KEY.verbMemory, {}) || {};
  S.asked = read(KEY.asked, []) || [];

  const score = read(KEY.score, { right: 0, total: 0 }) || {};
  S.right = Number(score.right) || 0;
  S.total = Number(score.total) || 0;

  S.sciMemory = read(KEY.scienceMemory, {}) || {};
  const sciStats = read(KEY.scienceStats, { right: 0, total: 0 }) || {};
  S.sciRight = Number(sciStats.right) || 0;
  S.sciTotal = Number(sciStats.total) || 0;
  sciBuildQuiz();

  const stored = read(KEY.plan, null);
  const today = dayString();
  S.plan = stored && stored.queue ? stored : {
    today,
    lastOpenDate: today,
    dailyNewCount: DAILY_DEFAULT,
    queue: [],
    doneCount: 0,
    totalStudied: 0,
    lastQuizAccuracy: null,
    yesterdayRate: null,
    streak: 1,
    forceQuizDone: true
  };

  refreshOnLaunch();
}

function askPersistentStorage() {
  if (!navigator.storage || !navigator.storage.persist) return;
  navigator.storage.persisted().then((already) => {
    if (already) return;
    navigator.storage.persist().catch(() => {});
  }).catch(() => {});
}

function maybeShowInstallHint() {
  const standalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
  if (standalone) return;
  if (read(KEY.hint, false)) return;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  setTimeout(() => {
    toast(isIOS ? 'iOS：分享 → 添加到主屏幕，离线可用' : '浏览器菜单 → 安装应用，离线可用');
    write(KEY.hint, true);
  }, 2600);
}

async function boot() {
  const view = document.getElementById('view');
  try {
    if (SINGLE_FILE) {
      Bank.build(window.__BELLA_INLINE_DATA__);
      Science.build(window.__BELLA_INLINE_SCIENCE__);
    } else {
      const [wordsRes, scienceRes] = await Promise.all([
        fetch('data/words.json'),
        fetch('data/science.json')
      ]);
      if (!wordsRes.ok) throw new Error(`词库 HTTP ${wordsRes.status}`);
      if (!scienceRes.ok) throw new Error(`科学数据 HTTP ${scienceRes.status}`);
      Bank.build(await wordsRes.json());
      Science.build(await scienceRes.json());
    }
  } catch (err) {
    view.innerHTML = `<div class="card empty"><span class="ico">⚠️</span>词库加载失败：${esc(err.message)}<br>请联网后重试</div>`;
    return;
  }

  hydrate();
  S.ready = true;
  renderAll();
  if (!SINGLE_FILE) {
    // 单文件版没有外部 sw.js 可注册；离线能力来自 HTML 自身
    registerServiceWorker();
    askPersistentStorage();
    maybeShowInstallHint();
  }
}

boot();
