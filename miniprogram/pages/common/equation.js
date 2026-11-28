// 化学式 / 方程式的排版计算。
//
// 一行放得下就一行；放不下就按运算符断成两行，而不是让浏览器在任意空格处折断，
// 留下单独一行孤零零的 6O₂、或者行首多出一个 +。
// 断点优先级：箭头 → 等号 → 竖线分隔 → 间隔号；箭头与分隔号留在上一行行尾，
// 等号留在下一行行首（和手写推导的续行习惯一致）。
// 宽度用字符 em 宽度估算（Georgia 加粗实测校准），误差由 CSS 的 flex-wrap 兜底。
const OPS = ['→', '⇌', '⟶', '->', '=', '+', '·', '｜', '|', '÷', '×', '/', '≈', '∼'];

const GAP_OUT = 16;   // 组间距（rpx）
const GAP_IN = 6;     // 组内「运算符 + 化学式」间距（rpx）
const SIZES = [38, 32, 27, 24];

// 断点：re 命中组的 op，attach 决定运算符被推到上一行尾还是留在下一行首
const BREAKS = [
  { re: /→|⇌|⟶/, attach: 'prev', pick: 'first' },
  { re: /=/, attach: 'prev', pick: 'first' },
  { re: /｜|\|/, attach: 'prev', pick: 'balance' },
  { re: /·/, attach: 'prev', pick: 'balance' }
];

function isOp(word) {
  return OPS.indexOf(word) > -1;
}

// → [{ k, op, text }]：运算符并到它后面那一项，保证 6O₂ 不会被拆开
// 数据里有的运算符没写空格（「（正离子）+ anion」），所以词内也要再拆一次
const SPLIT_RE = /([→⇌⟶=+·｜|÷×/≈])/;

function tokens(text) {
  const raw = String(text == null ? '' : text).trim();
  if (!raw) return [];
  const groups = [];
  let op = '';
  const pushWord = (word) => {
    if (isOp(word)) {
      op = op ? op + ' ' + word : word;
      return;
    }
    groups.push({ k: groups.length, op: op, text: word });
    op = '';
  };
  raw.split(/\s+/).forEach((word) => {
    word.split(SPLIT_RE).forEach((piece) => {
      if (piece) pushWord(piece);
    });
  });
  if (op && groups.length) groups[groups.length - 1].text += ' ' + op;
  return groups;
}

// 单字符宽度（em）：Georgia 加粗实测校准，下标按半宽处理
function charEm(ch) {
  if (/[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]/.test(ch)) return 1;
  if (/[₀-₉]/.test(ch)) return 0.55;
  if (/[a-z]/.test(ch)) return 0.55;
  if (/[A-Z]/.test(ch)) return 0.85;
  if (/[0-9]/.test(ch)) return 0.85;
  if (/[(){}]/.test(ch)) return 0.45;
  if (/[.,:;'’]/.test(ch)) return 0.3;
  if (/[+\-−→⇌⟶=·×÷/≈%｜|]/.test(ch)) return 0.75;
  return 0.6;
}

function emOf(str) {
  let sum = 0;
  for (const ch of String(str || '')) sum += charEm(ch);
  return sum;
}

function rowWidth(row, size) {
  let width = 0;
  row.forEach((g, i) => {
    if (i) width += GAP_OUT;
    if (g.op) width += emOf(g.op) * size + GAP_IN;
    width += emOf(g.text) * size;
  });
  return width;
}

// 在第 i 组处断行（该组的 op 是断点运算符）
function splitAt(groups, i, attach) {
  if (attach === 'next') {
    return [groups.slice(0, i), groups.slice(i)];
  }
  const op = groups[i].op;
  const left = groups.slice(0, i).concat([{ k: 'op-' + i, op: '', text: op, arrow: true }]);
  const right = groups.slice(i).map((g, n) => (n ? g : Object.assign({}, g, { op: '' })));
  return [left, right];
}

// 找一对能同时装下、且视觉最平衡的断点
function bestSplit(groups, size, width) {
  for (const rule of BREAKS) {
    const hits = [];
    groups.forEach((g, i) => {
      if (i > 0 && rule.re.test(g.op)) hits.push(i);
    });
    if (!hits.length) continue;
    const candidates = rule.pick === 'first' ? hits.slice(0, 1) : hits;
    let best = null;
    candidates.forEach((i) => {
      const rows = splitAt(groups, i, rule.attach);
      const w1 = rowWidth(rows[0], size);
      const w2 = rowWidth(rows[1], size);
      if (w1 > width || w2 > width) return;
      const score = rule.pick === 'balance' ? Math.max(w1, w2) : i;
      if (!best || score < best.score) best = { score: score, rows: rows };
    });
    if (best) return best.rows;
  }
  return null;
}

// opts: { width 可用宽度 rpx，sizes 字号档位 }
function layout(text, opts) {
  const options = opts || {};
  const width = options.width || 580;
  const sizes = options.sizes || SIZES;
  const groups = tokens(text);
  if (!groups.length) return { size: sizes[0], rows: [] };

  for (const size of sizes) {
    if (rowWidth(groups, size) <= width) return { size: size, rows: [groups] };
    const rows = bestSplit(groups, size, width);
    if (rows) return { size: size, rows: rows };
  }
  // 最小字号也断不开：交给 CSS 在组之间继续折
  const size = sizes[sizes.length - 1];
  return { size: size, rows: [groups] };
}

module.exports = { tokens: tokens, layout: layout, rowWidth: rowWidth, SIZES: SIZES };
