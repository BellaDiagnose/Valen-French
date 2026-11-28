#!/usr/bin/env node
/**
 * 把小程序的数据模块无损导出为 iOS 用的 Words.json / Science.json
 *
 *   node ios/Tools/export_words.js
 *
 * 数据源：miniprogram/pages/french/{data,enavant,conjugation}.js
 *         miniprogram/pages/science/{data-bio,data-chem,data-formula}.js
 * 输出：  ios/ValenFrench/Resources/{Words,Science}.json
 *
 * 改了词库/例句/变位/科学知识点后重新执行本脚本即可，iOS 端无需改代码。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const pages = path.join(root, 'miniprogram/pages/french');

const D = require(path.join(pages, 'data.js'));
const E = require(path.join(pages, 'enavant.js'));
const C = require(path.join(pages, 'conjugation.js'));

const simple = D.wordList.map(w => ({
  id: w.id,
  fr: w.fr,
  cn: w.cn,
  pos: w.pos || '',
  lesson: Number(w.lesson) || 0,
  example: w.example || '',
  exampleCn: w.exampleCn || ''
}));

const enavant = E.enavantWords.map(w => ({
  id: w.id,
  fr: w.fr,
  cn: w.cn,
  cat: w.cat || '',
  unit: Number(w.unit) || 0,
  theme: w.theme || '',
  example: w.example || '',
  exampleCn: w.exampleCn || ''
}));

const verbs = D.verbList.map(v => ({
  id: v.id,
  name: v.name,
  cn: v.cn,
  group: v.group || '',
  tenses: v.tenses || {},
  forms: v.forms || []
}));

// 词卡内嵌「现在时变位」：只收录 v. 开头且能生成变位的词
const conjugations = {};
simple.forEach(w => {
  if (w.pos.indexOf('v.') === 0) {
    const forms = C.getPresent(w.fr);
    if (forms) conjugations[w.fr] = forms;
  }
});

const grammarSimple = D.grammarLessons.map(g => ({
  lesson: g.lesson,
  level: g.level,
  stage: g.stage,
  theme: g.theme || '',
  topic: g.topic || '',
  points: g.points || []
}));

const out = {
  version: 1,
  tenseNames: D.TENSE_NAMES,
  persons: C.PERSONS,
  sources: {
    enavant: { label: 'En Avant', words: enavant },
    simple: { label: '简明法语', words: simple }
  },
  verbs,
  conjugations,
  grammarSimple,
  grammarEnavant: {
    units: E.enavantUnits,
    points: E.enavantPoints,
    examples: E.enavantExamples
  }
};

const json = JSON.stringify(out);

// iOS：打进 app bundle
const iosTarget = path.join(root, 'ios/ValenFrench/Resources/Words.json');
fs.writeFileSync(iosTarget, json);

const kb = (fs.statSync(iosTarget).size / 1024).toFixed(0);
console.log(`✓ ${iosTarget} (${kb}KB)`);
console.log(`  词条：En Avant ${enavant.length} / 简明法语 ${simple.length}`);
console.log(`  动词 ${verbs.length}（五时态）· 词卡变位 ${Object.keys(conjugations).length} · 语法 ${grammarSimple.length} 课 · 知识点 ${E.enavantPoints.length} 条 / ${E.enavantUnits.length} 单元`);

// ---- 科学（七+八年级生物 / 八年级化学 / 公式），与小程序同源 ----
const scienceDir = path.join(root, 'miniprogram/pages/science');
const B = require(path.join(scienceDir, 'data-bio.js'));
const C2 = require(path.join(scienceDir, 'data-chem.js'));
const F = require(path.join(scienceDir, 'data-formula.js'));

const science = {
  version: 1,
  checked: '沪科技版《八年级化学全一册》目录（2026-07-28）+ 沪教版五四学制 2024 生物七上/七下/八上/八下目录',
  bio: { units: B.units, points: B.points },
  chem: { units: C2.units, points: C2.points },
  formulas: { units: F.units, formulas: F.formulas }
};
const scienceJson = JSON.stringify(science);

const iosScience = path.join(root, 'ios/ValenFrench/Resources/Science.json');
fs.writeFileSync(iosScience, scienceJson);

const skb = (fs.statSync(iosScience).size / 1024).toFixed(0);
console.log(`✓ ${iosScience} (${skb}KB)`);
console.log(`  科学：生物 ${B.points.length} / 化学 ${C2.points.length} / 公式 ${F.formulas.length} 条`);
