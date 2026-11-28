// pages/home/home.js —— BELLA 助手独立 landing page（Bento 四模块）
// 进度口径与 PWA / 法语页一致：已学 = 有记忆记录；固化 = 走完 7 阶段；待复习 = 未固化且已到期。

const { wordList } = require('../french/data.js');
const { enavantWords } = require('../french/enavant.js');
const S = require('../french/study.js');
const BIO = require('../science/data-bio.js');
const CHEM = require('../science/data-chem.js');
const FORMULA = require('../science/data-formula.js');

const FRENCH_MEMORY_KEY = 'french_memory_v2';
const SCIENCE_MEMORY_KEY = 'science_memory_v1';
const FRENCH_PLAN_KEY = 'french_study_plan_v1';
const FRENCH_SOURCE_KEY = 'french_source_v1';

const WORD_LIBS = {
  enavant: enavantWords.map((w) => 'e' + w.id),
  simple: wordList.map((w) => 'c' + w.id)
};

const MODULE_META = [
  { key: 'enavant', mark: 'EA', name: 'En Avant', accent: '#0f8a5a', tint: '#e4f1e9', kind: 'fr' },
  { key: 'simple', mark: 'CF', name: '简明法语', accent: '#128a80', tint: '#e5f5f1', kind: 'fr' },
  { key: 'chem', mark: 'CH', name: '化学', accent: '#b8783c', tint: '#fbf0e5', kind: 'sci' },
  { key: 'bio', mark: 'BI', name: '生物', accent: '#3e7f9e', tint: '#e8f2f7', kind: 'sci' }
];

function progressOfIds(ids, memory) {
  const now = Date.now();
  const mem = memory || {};
  let studied = 0;
  let graduated = 0;
  let due = 0;
  ids.forEach((id) => {
    const rec = mem[id];
    if (!rec) return;
    studied += 1;
    if (rec.stage >= S.GRADUATED) graduated += 1;
    else if (rec.dueAt <= now) due += 1;
  });
  return {
    total: ids.length,
    studied,
    graduated,
    due,
    percent: ids.length ? Math.round(studied / ids.length * 100) : 0
  };
}

function scienceIdsOf(subject) {
  const points = subject === 'bio' ? BIO.points : CHEM.points;
  // data-bio / data-chem 的 id 已带 b/c 前缀，科学页记忆键就是 b01 / c01
  const pointIds = points.map((p) => p.id);
  // 公式 id 本身是 f01，科学页 rateFormula 用 'f' + f.id → ff01
  const formulaIds = FORMULA.formulas
    .filter((f) => subject === 'bio' ? f.unit.indexOf('bio') === 0 : f.unit.indexOf('chem') === 0)
    .map((f) => 'f' + f.id);
  const g7 = points.filter((p) => String(p.book || '').charAt(0) === '七').length;
  return {
    ids: pointIds.concat(formulaIds),
    points: pointIds.length,
    formulas: formulaIds.length,
    g7,
    g8: pointIds.length - g7
  };
}

function studiedToday(memory, source) {
  const prefix = source === 'simple' ? 'c' : 'e';
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  let count = 0;
  Object.keys(memory || {}).forEach((id) => {
    if (id.charAt(0) !== prefix) return;
    const rec = memory[id];
    if (rec && rec.lastReview >= start.getTime()) count += 1;
  });
  return count;
}

Page({
  data: {
    modules: [],
    due: 0,
    done: 0,
    target: 0,
    percent: 0,
    totalStudied: 0,
    streak: 1,
    studiedTotal: 0,
    graduatedTotal: 0,
    rings: []
  },

  onLoad() {
    this.refresh();
  },

  onShow() {
    // 从法语页 / 科学页返回时刷新四模块进度
    this.refresh();
  },

  refresh() {
    const frenchMemory = wx.getStorageSync(FRENCH_MEMORY_KEY) || {};
    const scienceMemory = wx.getStorageSync(SCIENCE_MEMORY_KEY) || {};
    const plan = wx.getStorageSync(FRENCH_PLAN_KEY) || {};
    const source = wx.getStorageSync(FRENCH_SOURCE_KEY) || 'enavant';

    const modules = MODULE_META.map((meta) => {
      let progress;
      let sub;
      if (meta.kind === 'fr') {
        const ids = WORD_LIBS[meta.key];
        progress = progressOfIds(ids, frenchMemory);
        sub = `法语 · ${progress.total} 词`;
      } else {
        const info = scienceIdsOf(meta.key);
        progress = progressOfIds(info.ids, scienceMemory);
        sub = meta.key === 'bio'
          ? `七+八年级 · ${info.g7}+${info.g8} 知识点 / ${info.formulas} 公式`
          : `八年级 · ${info.points} 知识点 / ${info.formulas} 公式`;
      }
      return Object.assign({}, meta, progress, { sub });
    });

    const target = (plan.queue || []).length;
    const done = Math.min(target, studiedToday(frenchMemory, source));
    const due = modules.reduce((sum, item) => sum + item.due, 0);
    const studiedTotal = modules.reduce((sum, item) => sum + item.studied, 0);
    const graduatedTotal = modules.reduce((sum, item) => sum + item.graduated, 0);
    // Apple Watch 风格三环：外今日 / 中记忆健康度 / 内长期固化
    const todayPercent = target ? Math.round(done / target * 100) : 100;
    const memoryPercent = studiedTotal ? Math.round((studiedTotal - due) / studiedTotal * 100) : 0;
    const solidPercent = studiedTotal ? Math.round(graduatedTotal / studiedTotal * 100) : 0;
    this.setData({
      modules,
      due,
      done,
      target,
      percent: todayPercent,
      totalStudied: plan.totalStudied || 0,
      streak: plan.streak || 1,
      studiedTotal,
      graduatedTotal,
      rings: [
        { key: 'today', label: '今日新词', value: done + '/' + target, tone: todayPercent, color: '#0f8a5a' },
        { key: 'memory', label: '记忆状态', value: (studiedTotal - due) + '/' + studiedTotal, tone: memoryPercent, color: '#d6a13c' },
        { key: 'solid', label: '长期固化', value: graduatedTotal + '/' + studiedTotal, tone: solidPercent, color: '#3e7f9e' }
      ]
    });
  },

  onModuleTap(e) {
    const key = e.currentTarget.dataset.key;
    if (key === 'enavant' || key === 'simple') {
      wx.navigateTo({ url: `/pages/french/french?source=${key}` });
      return;
    }
    wx.navigateTo({ url: `/pages/science/science?subject=${key === 'chem' ? 'chem' : 'bio'}` });
  },

  onQuickTab(e) {
    wx.navigateTo({ url: `/pages/french/french?tab=${e.currentTarget.dataset.tab}` });
  }
});
