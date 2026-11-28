// pages/common/float-nav.js —— 共用「模块导航悬浮球」数据与事件
// 正面：当前模块进度环；背面：首页 + 四个模块，点按即切换（redirectTo / navigateBack）。
// 法语页 / 科学页各自 include 同一个 wxml，并混入这里的 methods。

const NAV_ITEMS = [
  { key: 'home', mark: '⌂', label: '首页', accent: '#0f8a5a', tint: '#e4f1e9' },
  { key: 'enavant', mark: 'EA', label: 'En Avant', accent: '#0f8a5a', tint: '#e4f1e9' },
  { key: 'simple', mark: 'CF', label: '简明法语', accent: '#128a80', tint: '#e5f5f1' },
  { key: 'chem', mark: 'CH', label: '化学', accent: '#b8783c', tint: '#fbf0e5' },
  { key: 'bio', mark: 'BI', label: '生物', accent: '#3e7f9e', tint: '#e8f2f7' }
];

function navData(currentKey) {
  return {
    floatX: 0,
    floatY: 0,
    floatFlipped: false,
    floatCurrent: currentKey || 'home',
    floatValue: '',
    floatUnit: '',
    floatCurrentLabel: '',
    floatNavItems: NAV_ITEMS.map((item) => Object.assign({}, item, {
      active: item.key === currentKey
    }))
  };
}

function syncNavData(ctx, currentKey) {
  ctx.setData({
    floatCurrent: currentKey,
    floatNavItems: NAV_ITEMS.map((item) => Object.assign({}, item, {
      active: item.key === currentKey
    }))
  });
}

const BALL_W = 208;
const BALL_H = 290;
const OPEN_W = 380;
const OPEN_H = 580;

// 顶部停靠：卡片页右上角的空白处（默认）
function dockTop(ctx) {
  try {
    const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    ctx.setData({ floatX: Math.max(8, info.windowWidth - 120), floatY: 120 });
  } catch (e) { /* 保持原位 */ }
}

// 底部停靠：计划 / 长列表页，球落到右下角，顶部整块留给统计卡与主按钮
function dockBottom(ctx) {
  try {
    const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    const rpx = info.windowWidth / 750;
    ctx.setData({
      floatX: Math.max(8, info.windowWidth - 120),
      floatY: Math.max(8, Math.round(info.windowHeight - BALL_H * rpx - 24))
    });
  } catch (e) { /* 保持原位 */ }
}

// 切 tab 时按页面需要停靠；用户手动拖过就不再自动挪（_floatMoved）
function dockFloat(ctx, where) {
  if (ctx._floatMoved || ctx.data.floatFlipped) return;
  if (where === 'bottom') dockBottom(ctx); else dockTop(ctx);
}

function initFloatPosition(ctx) {
  try {
    const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    ctx.setData({ floatX: Math.max(8, info.windowWidth - 120), floatY: 120 });
  } catch (e) {
    ctx.setData({ floatX: 260, floatY: 120 });
  }
}

const methods = {
  onFloatTouchStart(e) {
    const t = e.touches[0];
    this._floatDrag = {
      startX: t.clientX, startY: t.clientY,
      originX: this.data.floatX, originY: this.data.floatY,
      moved: false
    };
  },

  onFloatTouchMove(e) {
    if (!this._floatDrag) return;
    const t = e.touches[0];
    const dx = t.clientX - this._floatDrag.startX;
    const dy = t.clientY - this._floatDrag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) this._floatDrag.moved = true;
    if (!this._floatDrag.moved) return;
    let x = this._floatDrag.originX + dx;
    let y = this._floatDrag.originY + dy;
    const bounds = this.floatBounds();
    if (bounds) {
      x = Math.max(4, Math.min(x, bounds.x));
      y = Math.max(4, Math.min(y, bounds.y));
    }
    this.setData({ floatX: x, floatY: y });
  },

  floatBounds(open) {
    try {
      const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      const rpx = info.windowWidth / 750;
      const isOpen = open === undefined ? this.data.floatFlipped : open;
      const w = (isOpen ? OPEN_W : BALL_W) * rpx;
      const h = (isOpen ? OPEN_H : BALL_H) * rpx;
      return { x: info.windowWidth - w - 6, y: info.windowHeight - h - 6 };
    } catch (e) {
      return null;
    }
  },

  onFloatTouchEnd() {
    if (this._floatDrag && this._floatDrag.moved) this._floatMoved = true;
    if (this._floatDrag && !this._floatDrag.moved) {
      const next = !this.data.floatFlipped;
      const patch = { floatFlipped: next };
      if (next) {
        // 展开面板比球体宽：记住收起位置并自动收进屏幕边缘
        this._floatRest = { x: this.data.floatX, y: this.data.floatY };
        const bounds = this.floatBounds(true);
        if (bounds) {
          patch.floatX = Math.max(4, Math.min(this.data.floatX, bounds.x));
          patch.floatY = Math.max(4, Math.min(this.data.floatY, bounds.y));
        }
      } else if (this._floatRest) {
        const bounds = this.floatBounds(false);
        patch.floatX = bounds ? Math.max(4, Math.min(this._floatRest.x, bounds.x)) : this._floatRest.x;
        patch.floatY = bounds ? Math.max(4, Math.min(this._floatRest.y, bounds.y)) : this._floatRest.y;
      }
      this.setData(patch);
    }
    this._floatDrag = null;
  },

  onFloatNavTap(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ floatFlipped: false });
    if (key === this.data.floatCurrent) return;
    if (key === 'home') {
      // 回首页：能回退就回退，栈里没有首页时才重开，避免白多一层
      const stack = getCurrentPages();
      if (stack.length > 1) {
        wx.navigateBack({ delta: stack.length - 1 });
      } else {
        wx.reLaunch({ url: '/pages/home/home' });
      }
      return;
    }
    const url = (key === 'enavant' || key === 'simple')
      ? `/pages/french/french?source=${key}`
      : `/pages/science/science?subject=${key}`;
    // redirectTo 替换当前页：页面栈深度不变，导航栏不会多出「返回首页」灰球
    wx.redirectTo({ url });
  }
};

module.exports = { NAV_ITEMS, navData, syncNavData, initFloatPosition, dockFloat, dockTop, dockBottom, methods };
