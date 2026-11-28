// pages/common/nav-bar.js —— 自定义顶栏数据与事件（法语页 / 科学页共用）
//
// 结构对齐 iOS 的 PageNavBar + NavRingMenu：
//   左：灰色圆形 home 按钮（回首页）
//   中：BELLA 助手 + 第二行当前科目名（En Avant / 简明法语 / 化学 / 生物）
//   右：进度环，点击展开科目下拉（四个科目平行入口，当前项描边加勾）
//
// 页面 json 需要 "navigationStyle": "custom"，页面根节点用 navTotal 做 padding-top。

const NAV_ITEMS = [
  { key: 'enavant', mark: 'EA', label: 'En Avant', accent: '#0f8a5a', tint: '#e4f1e9' },
  { key: 'simple', mark: 'CF', label: '简明法语', accent: '#128a80', tint: '#e5f5f1' },
  { key: 'chem', mark: 'CH', label: '化学', accent: '#b8783c', tint: '#fbf0e5' },
  { key: 'bio', mark: 'BI', label: '生物', accent: '#3e7f9e', tint: '#e8f2f7' }
];

const NAV_ROW = 44;      // 顶栏内容行高（与 iOS PageNavBar 一致）
const RING_RPX = 70;     // 进度环直径 ≈ 36pt

function navItems(currentKey) {
  return NAV_ITEMS.map((item) => Object.assign({}, item, { active: item.key === currentKey }));
}

// 状态栏高度 + 胶囊避让：右上角圆环排在微信胶囊左侧
function navMetrics() {
  let info = null;
  try {
    info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
  } catch (e) {
    info = null;
  }
  const width = (info && info.windowWidth) || 375;
  const statusBar = (info && info.statusBarHeight) || 20;
  const ring = Math.round(RING_RPX * (width / 750));

  let capsuleLeft = 0;
  try {
    const capsule = wx.getMenuButtonBoundingClientRect();
    capsuleLeft = capsule && capsule.left ? capsule.left : 0;
  } catch (e) {
    capsuleLeft = 0;
  }
  if (!capsuleLeft) capsuleLeft = width - 94;

  const ringRight = Math.max(10, Math.round(width - capsuleLeft + 8));
  return {
    navStatusBar: statusBar,
    navTotal: statusBar + NAV_ROW,
    navRingSize: ring,
    navRingRight: ringRight,
    navTitleMax: Math.max(120, Math.round(width - 192)),
    navCaretRight: Math.round(ring / 2 - 5),
    navMenuTop: statusBar + NAV_ROW + 8
  };
}

// 进页初始化：算一次几何尺寸，之后只更新科目与数值
function navInit(ctx, currentKey, subjectLabel) {
  ctx.setData(Object.assign(navMetrics(), {
    navOpen: false,
    navCurrent: currentKey,
    navSubject: subjectLabel || '',
    navItems: navItems(currentKey)
  }));
}

function navSync(ctx, currentKey, subjectLabel) {
  ctx.setData({
    navCurrent: currentKey,
    navSubject: subjectLabel || '',
    navItems: navItems(currentKey)
  });
}

function navValue(ctx, value, unit) {
  ctx.setData({
    navValue: value == null ? 0 : value,
    navUnit: unit || ''
  });
}

function targetUrl(key) {
  return (key === 'enavant' || key === 'simple')
    ? `/pages/french/french?source=${key}`
    : `/pages/science/science?subject=${key}`;
}

const methods = {
  onNavToggle() {
    this.setData({ navOpen: !this.data.navOpen });
  },

  onNavClose() {
    this.setData({ navOpen: false });
  },

  onNavHome() {
    this.setData({ navOpen: false });
    const stack = getCurrentPages();
    if (stack.length > 1) {
      wx.navigateBack({ delta: stack.length - 1 });
    } else {
      wx.reLaunch({ url: '/pages/home/home' });
    }
  },

  // 默认实现：换页（页面可覆盖，做原地切词库 / 切学科）
  onNavPick(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ navOpen: false });
    if (key === this.data.navCurrent) return;
    wx.redirectTo({ url: targetUrl(key) });
  },

  // 遮罩上禁止滚动穿透
  noop() {}
};

module.exports = {
  NAV_ITEMS,
  navMetrics,
  navInit,
  navSync,
  navValue,
  navItems,
  targetUrl,
  methods
};
