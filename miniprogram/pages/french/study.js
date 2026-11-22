/**
 * study.js —— 学习计划纯逻辑（无 wx API，便于 Node 独立测试）
 *
 * 职责：
 *  1. 日期/间隔计算（间隔≥3天 → 强制自测关卡）
 *  2. 每日新词队列（默认20词，按记忆状态从未学词中取）
 *  3. 动态调节每日额度（依据自测正确率 + 昨日完成率）
 *  4. 记忆阶段推进（艾宾浩斯 1/2/4/7/15/30/60 天）
 */

const DAY = 24 * 60 * 60 * 1000;
const STAGES = [1, 2, 4, 7, 15, 30, 60];
const GRADUATED = STAGES.length;          // stage 达到 7 = 已固化
const DEFAULT_DAILY = 20;                 // 默认每日新词量
const MIN_DAILY = 10;                     // 动态调节下限
const MAX_DAILY = 30;                     // 动态调节上限
const FORCE_GAP_DAYS = 3;                 // 间隔≥3天强制自测
const FORCE_QUIZ_QUESTIONS = 10;          // 强制自测题数

// ---------- 日期工具（本地日期，避免时区偏差） ----------
function dateStr(ts) {
  const d = new Date(ts == null ? Date.now() : ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseDate(s) {
  if (!s) return null;
  const parts = s.split('-').map(Number);
  if (parts.length !== 3) return null;
  return Date.UTC(parts[0], parts[1] - 1, parts[2]);
}

// from → to 相差天数（to 在前则为负）
function diffDays(from, to) {
  const a = parseDate(from), b = parseDate(to);
  if (a == null || b == null) return 0;
  return Math.round((b - a) / DAY);
}

// ---------- 打开时状态判定 ----------
// plan: { today, lastOpenDate, ... }；now: 时间戳
function openState(plan, now) {
  const today = dateStr(now);
  const gap = plan.lastOpenDate ? diffDays(plan.lastOpenDate, today) : 0;
  const crossDay = plan.today !== today;
  return {
    today,
    gap,
    crossDay,
    // 首次打开(lastOpenDate为空)不触发；间隔≥3天才触发
    forceQuiz: !!plan.lastOpenDate && gap >= FORCE_GAP_DAYS
  };
}

// ---------- 动态调节每日新词额度 ----------
// accuracy: 上次自测正确率(0~1)，null 表示无数据
// completion: 昨日完成率(0~1)，null 表示无数据
function adjustDaily(current, accuracy, completion) {
  let n = current || DEFAULT_DAILY;
  if (accuracy != null) {
    if (accuracy >= 0.85) n += 5;        // 掌握好 → 加量
    else if (accuracy < 0.6) n -= 5;     // 掌握差 → 减量
  }
  if (completion != null && completion < 0.5) n -= 5;  // 昨天没学完 → 再减
  return Math.max(MIN_DAILY, Math.min(MAX_DAILY, n));
}

// ---------- 从词库挑选今日新词 ----------
// allWords: [{gid, ...}]；memory: {gid:{stage,...}}；count: 今日额度
// 取「从未进入记忆档案」的词，按 allWords 顺序（单元顺序）取 count 个
function pickNewWords(allWords, memory, count) {
  const picked = [];
  for (let i = 0; i < allWords.length && picked.length < count; i++) {
    const w = allWords[i];
    if (!memory[w.gid]) picked.push(w.gid);
  }
  return picked;
}

// ---------- 生成/刷新某天的计划 ----------
// 返回新的 plan 对象（纯函数，不修改入参）
// allWords 用于生成新队列；memory 用于排除已学词
function buildDailyPlan(plan, state, allWords, memory) {
  const next = Object.assign({}, plan);
  const yesterdayCompletion = (plan.queue && plan.queue.length)
    ? (plan.doneCount || 0) / plan.queue.length
    : null;

  if (state.crossDay) {
    // 跨天：先按昨天的表现调节额度，再生成今日队列
    next.dailyNewCount = adjustDaily(
      plan.dailyNewCount,
      plan.lastQuizAccuracy != null ? plan.lastQuizAccuracy : null,
      yesterdayCompletion
    );
    next.queue = pickNewWords(allWords, memory, next.dailyNewCount);
    next.doneCount = 0;
    next.yesterdayRate = yesterdayCompletion;
    next.today = state.today;
    // 连续天数：昨天有学习则延续，否则归 1
    next.streak = (plan.today && yesterdayCompletion != null && yesterdayCompletion > 0)
      ? (plan.streak || 0) + 1
      : 1;
  }

  // 每次打开都更新 lastOpenDate
  next.lastOpenDate = state.today;

  // 触发强制自测时，标记本轮未完成
  if (state.forceQuiz) next.forceQuizDone = false;

  return next;
}

// ---------- 新计划初始值 ----------
function initPlan(now) {
  const today = dateStr(now);
  return {
    today,
    lastOpenDate: today,
    dailyNewCount: DEFAULT_DAILY,
    queue: [],
    doneCount: 0,
    totalStudied: 0,
    lastQuizAccuracy: null,
    yesterdayRate: null,
    streak: 1,
    forceQuizDone: true
  };
}

// ---------- 记忆阶段推进 ----------
// delta: +1 记住 / -1 忘记；返回 { stage, dueAt, graduated }
function advanceMemory(prev, delta, now) {
  const prevStage = prev ? prev.stage : -1;
  const stage = delta > 0
    ? Math.min(GRADUATED, prevStage + 1)
    : Math.max(0, prevStage - 1);
  return {
    stage,
    dueAt: stage >= GRADUATED ? 0 : now + STAGES[Math.min(stage, STAGES.length - 1)] * DAY,
    lastReview: now,
    graduated: stage >= GRADUATED
  };
}

module.exports = {
  DAY, STAGES, GRADUATED, DEFAULT_DAILY, MIN_DAILY, MAX_DAILY,
  FORCE_GAP_DAYS, FORCE_QUIZ_QUESTIONS,
  dateStr, parseDate, diffDays, openState, adjustDaily,
  pickNewWords, buildDailyPlan, initPlan, advanceMemory
};
