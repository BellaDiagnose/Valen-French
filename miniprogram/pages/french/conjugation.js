// conjugation.js —— 动词现在时变位生成器
// 统一接口 getPresent(name) → 6 人称现在时数组，或 null（不规则且未入库，不误导）
// 数据优先级：data.js 手工入库的 39 个不规则动词 > 规则生成（-er / -ir）

const { verbList } = require('./data.js');

const PERSONS = ['je', 'tu', 'il / elle', 'nous', 'vous', 'ils / elles'];
const OUTERS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const REFL = ['me', 'te', 'se', 'nous', 'vous', 'se'];
const VOWEL = /^[aeiouyàâéèêëîïôûùœ]/i;

// data.js 手工入库的现在时（含主语），作为不规则动词权威数据
const fullTable = {};
verbList.forEach(v => {
  if (v.tenses && v.tenses['现在时']) fullTable[v.name] = v.tenses['现在时'];
});

// 常用动词补充（避免规则生成器误判；含主语格式与 data.js 一致）
Object.assign(fullTable, {
  finir: ['je finis', 'tu finis', 'il finit', 'nous finissons', 'vous finissez', 'ils finissent'],
  lever: ['je lève', 'tu lèves', 'il lève', 'nous levons', 'vous levez', 'ils lèvent'],
  élever: ["j'élève", 'tu élèves', 'il élève', 'nous élevons', 'vous élevez', 'ils élèvent'],
  "s'élever": ["je m'élève", "tu t'élèves", "il s'élève", 'nous nous élevons', 'vous vous élevez', "ils s'élèvent"],
  venir: ['je viens', 'tu viens', 'il vient', 'nous venons', 'vous venez', 'ils viennent'],
  'se lever': ['je me lève', 'tu te lèves', 'il se lève', 'nous nous levons', 'vous vous levez', 'ils se lèvent'],
  "s'amuser": ["je m'amuse", "tu t'amuses", "il s'amuse", 'nous nous amusons', 'vous vous amusez', "ils s'amusent"],
  // 其余不规则动词（-re / -oir 结尾，词库中出现但 data.js 动词表未收录）
  "s'asseoir": ["je m'assois", "tu t'assois", "il s'assoit", 'nous nous assoyons', 'vous vous asseyez', "ils s'assoient"],
  atteindre: ['je atteins', 'tu atteins', 'il atteint', 'nous atteignons', 'vous atteignez', 'ils atteignent'],
  comprendre: ['je comprends', 'tu comprends', 'il comprend', 'nous comprenons', 'vous comprenez', 'ils comprennent'],
  construire: ['je construis', 'tu construis', 'il construit', 'nous construisons', 'vous construisez', 'ils construisent'],
  coudre: ['je couds', 'tu couds', 'il coud', 'nous cousons', 'vous cousez', 'ils cousent'],
  dépendre: ['je dépends', 'tu dépends', 'il dépend', 'nous dépendons', 'vous dépendez', 'ils dépendent'],
  descendre: ['je descends', 'tu descends', 'il descend', 'nous descendons', 'vous descendez', 'ils descendent'],
  entendre: ["j'entends", 'tu entends', 'il entend', 'nous entendons', 'vous entendez', 'ils entendent'],
  "s'étendre": ["je m'étends", "tu t'étends", "il s'étend", 'nous nous étendons', 'vous vous étendez', "ils s'étendent"],
  'se mettre (à)': ['je me mets', 'tu te mets', 'il se met', 'nous nous mettons', 'vous vous mettez', 'ils se mettent'],
  naître: ['je naît', 'tu naîs', 'il naît', 'nous naissons', 'vous naissez', 'ils naissent'],
  obtenir: ["j'obtiens", 'tu obtiens', 'il obtient', 'nous obtenons', 'vous obtenez', 'ils obtiennent'],
  peindre: ['je peins', 'tu peins', 'il peint', 'nous peignons', 'vous peignez', 'ils peignent'],
  permettre: ['je permets', 'tu permets', 'il permet', 'nous permettons', 'vous permettez', 'ils permettent'],
  poursuivre: ['je poursuis', 'tu poursuis', 'il poursuit', 'nous poursuivons', 'vous poursuivez', 'ils poursuivent'],
  redevenir: ['je redeviens', 'tu redeviens', 'il redevient', 'nous redevenons', 'vous redevenez', 'ils redeviennent'],
  rendre: ['je rends', 'tu rends', 'il rend', 'nous rendons', 'vous rendez', 'ils rendent'],
  répondre: ['je réponds', 'tu réponds', 'il répond', 'nous répondons', 'vous répondez', 'ils répondent'],
  revoir: ['je revois', 'tu revois', 'il revoit', 'nous revoyons', 'vous revoyez', 'ils revoient'],
  suffire: ['je suffis', 'tu suffis', 'il suffit', 'nous suffisons', 'vous suffisez', 'ils suffisent'],
  vivre: ['je vis', 'tu vis', 'il vit', 'nous vivons', 'vous vivez', 'ils vivent']
});

// 从「含主语形式」剥离主语，得到纯变位（appelle / appelons ...）
function stripSubject(full) {
  const m = full.match(/^(?:je\s+|j'|tu\s+|il\s+|elle\s+|nous\s+|vous\s+|ils\s+|elles\s+)(.*)$/);
  return m ? m[1] : full;
}

// 取纯变位形式（6 个，不含主语）
function pureForms(verb) {
  if (fullTable[verb]) return fullTable[verb].map(stripSubject);

  // 第一组 -er
  if (/er$/.test(verb)) {
    const stem = verb.slice(0, -2);
    // -ger：nous 加 e 保软音（voyager → nous voyageons）
    if (/ger$/.test(verb)) {
      return [stem + 'e', stem + 'es', stem + 'e', stem + 'eons', stem + 'ez', stem + 'ent'];
    }
    // -cer：nous 用 ç（annoncer → nous annonçons）
    if (/cer$/.test(verb)) {
      const ced = stem.replace(/c$/, 'ç');
      return [stem + 'e', stem + 'es', stem + 'e', ced + 'ons', stem + 'ez', stem + 'ent'];
    }
    // -éver / -éter：重读音节 é→è
    //   -éter（répéter → répète）：词干末尾 é→è
    //   -éver（élever → élève）：词干内 élev→élèv（保留首 é，倒数第二 e→è）
    if (/é(ver|ter)$/.test(verb)) {
      let alt;
      if (/éver$/.test(verb)) {
        // élev -> élèv：把 é 之后、末辅音之前的 e 变 è
        alt = stem.replace(/(é.+)(.)$/, (m, a, b) => a.replace(/e$/, 'è') + b);
      } else {
        alt = stem.replace(/é([^é]*)$/, 'è$1'); // répét -> répèt
      }
      return [alt + 'e', alt + 'es', alt + 'e', stem + 'ons', stem + 'ez', alt + 'ent'];
    }
    // -eler / -eter：je/tu/il/ils 双写辅音（jeter → je jette, nous jetons）
    if (/(eler|eter)$/.test(verb)) {
      const dbl = stem.replace(/(l|t)$/, '$1$1');
      return [dbl + 'e', dbl + 'es', dbl + 'e', stem + 'ons', stem + 'ez', dbl + 'ent'];
    }
    return [stem + 'e', stem + 'es', stem + 'e', stem + 'ons', stem + 'ez', stem + 'ent'];
  }

  // 第二组 -ir（finir 型）；-oir / -nir 多为不规则，不生成
  if (/ir$/.test(verb) && !/(oir|nir)$/.test(verb)) {
    const stem = verb.slice(0, -2);
    return [stem + 'is', stem + 'is', stem + 'it', stem + 'issons', stem + 'issez', stem + 'issent'];
  }

  return null; // 不规则且未入库：不生成，避免误导
}

// 拆分代词式动词：se / s' 开头
function splitReflexive(name) {
  const n = name.trim();
  if (/^se\s+/.test(n)) return { reflexive: true, verb: n.replace(/^se\s+/, '') };
  if (/^s'/.test(n)) return { reflexive: true, verb: n.replace(/^s'/, '') };
  return { reflexive: false, verb: n };
}

// 拼主语（含代词式省音）
function attach(forms, reflexive) {
  return forms.map((f, i) => {
    const outer = OUTERS[i];
    if (!reflexive) {
      // je 在元音前省音（j'aime）
      return (i === 0 && VOWEL.test(f) ? "j'" : outer + ' ') + f;
    }
    // 代词式：主语 + 自反代词 + 变位动词
    let rp = REFL[i];
    // 自反代词 me/te/se 在元音前省音（m' / t' / s'）
    if (i < 3 && VOWEL.test(f)) rp = rp.replace(/e$/, "'");
    const sep = /'$/.test(rp) ? '' : ' ';
    // je 不因后面的自反代词省音（je me lève / je m'appelle）
    return outer + ' ' + rp + sep + f;
  });
}

// 对外接口
function getPresent(name) {
  if (!name) return null;
  const clean = name.trim();
  // 整体命中（含 s'appeler 这类代词式整体录入的）
  if (fullTable[clean]) return fullTable[clean];
  const { reflexive, verb } = splitReflexive(clean);
  const forms = pureForms(verb);
  return forms ? attach(forms, reflexive) : null;
}

function hasConjugation(name) { return !!getPresent(name); }

module.exports = { getPresent, hasConjugation, PERSONS };
