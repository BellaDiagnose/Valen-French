// pages/common/recall.js —— 自测「默写」模式：提示文案生成 + 答案比对
// 纯函数、无 wx API，便于 Node 里直接测。
//
// 判分三档：
//   right  完全写对（只放宽大小写、首尾空格、中文标点）
//   near   差一点：重音、撇号、连字符、空格、冠词差别 —— 算对，但要重写一遍
//   wrong  拼错/漏词

const ACCENTS = {
  à: 'a', á: 'a', â: 'a', ä: 'a', å: 'a', ã: 'a',
  ç: 'c',
  è: 'e', é: 'e', ê: 'e', ë: 'e',
  ì: 'i', í: 'i', î: 'i', ï: 'i',
  ñ: 'n',
  ò: 'o', ó: 'o', ô: 'o', ö: 'o', õ: 'o', ø: 'o',
  ù: 'u', ú: 'u', û: 'u', ü: 'u',
  ý: 'y', ÿ: 'y',
  œ: 'oe', æ: 'ae', ß: 'ss'
};

const SUBSCRIPT = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
};
const SUPERSCRIPT = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-'
};

const ARTICLES = /^(the|a|an)\s+/;

// 统一大小写、空白、撇号与破折号
function base(s) {
  return String(s == null ? '' : s)
    .replace(/[’‘`´]/g, "'")
    .replace(/[‐‑–—]/g, '-')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/[，、]/g, ',')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// 严格比对：只放过首尾/多余空格与句读
function strict(s) {
  return base(s).replace(/[.,;:!?。；：！？]/g, '').trim();
}

// 宽松比对：再去掉重音、空格、连字符、撇号
function loose(s) {
  let out = '';
  for (const ch of base(s)) out += (ACCENTS[ch] || ch);
  return out.replace(/[\s'-]/g, '');
}

// 化学式比对：下标上标还原成普通字符，箭头/等号统一，乘除号统一，空格全忽略
function chem(s) {
  const raw = base(s)
    .replace(/[〖〗［］【】]/g, '')
    .replace(/[\u2192\u27f6\u21cc]|->|=>|-->|—>/g, '→');
  let out = '';
  for (const ch of raw) out += (SUBSCRIPT[ch] || SUPERSCRIPT[ch] || ch);
  return out
    .replace(/[×·]/g, '×')
    .replace(/[*]/g, '×')
    .replace(/[÷／]/g, '/')
    .replace(/=/g, '→')
    .replace(/\s+/g, '')
    .trim();
}

function stripArticle(s) {
  return s.replace(ARTICLES, '');
}

// 判分：kind = 'word'（外语单词）| 'term'（LC 术语）| 'chem'（化学式/公式）
// 法语词条的写法变体：ton/ta/tes、cadeau(x)、animal (animaux)、ami, e
// 默写时任意一种写法都算对，避免「会但被判错」
function wordVariants(answer) {
  const out = [];
  const push = (s) => {
    const t = String(s || '').replace(/\s+/g, ' ').trim();
    if (t && out.indexOf(t) === -1) out.push(t);
  };
  const add = (s) => {
    push(s);
    String(s).split('/').forEach((part) => {
      push(part);
      // "ami, e" → ami / amie；"ancien, ne" → ancien / ancienne
      const comma = part.split(/,\s*/);
      if (comma.length === 2) {
        push(comma[0]);
        push(comma[0].trim() + comma[1].trim());
      }
    });
  };
  add(answer);
  // 括号补充：cadeau(x) → cadeaux；animal (animaux) → animaux
  const m = String(answer).match(/^(.*?)\s*\(([^)]*)\)\s*(.*)$/);
  if (m) {
    const base = `${m[1]}${m[3]}`.trim();
    const inner = m[2].trim();
    add(base);
    if (inner) {
      add(base + inner);
      add(inner);
      if (base.indexOf(' ') > -1) {
        const head = base.split(' ')[0];
        add(`${head} ${inner}`);
      }
    }
  }
  return out;
}

function judge(input, answer, kind) {
  const typed = String(input == null ? '' : input).trim();
  if (!typed) return 'empty';
  const want = String(answer == null ? '' : answer);

  const targets = kind === 'word' ? wordVariants(want) : [want];
  const rank = { empty: 0, wrong: 1, near: 2, right: 3 };
  let best = 'wrong';
  targets.forEach((target) => {
    const res = judgeOne(typed, target, kind);
    if (rank[res] > rank[best]) best = res;
  });
  return best;
}

function judgeOne(typed, want, kind) {
  if (kind === 'chem') {
    const a = chem(typed);
    const b = chem(want);
    if (a === b) return 'right';
    if (a.replace(/\s/g, '') === b.replace(/\s/g, '')) return 'near';
    return 'wrong';
  }

  const a = strict(typed);
  const b = strict(want);
  if (a === b) return 'right';
  if (kind === 'term' && stripArticle(a) === stripArticle(b)) return 'right';
  if (loose(typed) === loose(want)) return 'near';
  if (kind === 'term' && stripArticle(loose(typed)) === stripArticle(loose(want))) return 'near';
  return 'wrong';
}

function letterCount(s) {
  return String(s || '').replace(/[^A-Za-zÀ-ÿœŒæÆß]/g, '').length;
}

function firstLetter(s) {
  const m = String(s || '').match(/[A-Za-zÀ-ÿœŒæÆß]/);
  return m ? m[0] : '';
}

// 提示：只给「骨架」，不给答案
// word / term → 首字母 + 词数 + 字母数；chem → 箭头两边各几个物质
function hintOf(answer, kind) {
  const text = String(answer || '').trim();
  if (kind === 'chem') {
    const sides = text.split(/[→⟶⇌]|->|=>|—>/);
    if (sides.length === 2) {
      const count = (part) => part.split('+').filter((x) => x.trim()).length;
      return `箭头左边 ${count(sides[0])} 个物质 · 右边 ${count(sides[1])} 个物质`;
    }
    const head = text.slice(0, 2);
    return `没有箭头，左右用 = 相连 · 前两个字符是“${head}”`;
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  const parts = [`首字母 ${firstLetter(text)}`];
  if (words > 1) parts.push(`${words} 个词`);
  parts.push(`${letterCount(text)} 个字母`);
  return parts.join(' · ');
}

// 公式类词条才适合默写：纯文字描述、列表、含中文的条目跳过
function isDictatableFormula(formula) {
  const s = String(formula || '');
  if (s.length < 5) return false;
  if (!/[A-Za-z]/.test(s)) return false;
  if (/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(s)) return false;
  return /[→=]/.test(s) || /[A-Za-z]\s*[=×÷/]/.test(s);
}

module.exports = { judge, hintOf, isDictatableFormula, chem, loose, strict };
