/**
 * data-formula.js —— 初二生物 + 化学必背公式 / 表达式 / 方程式
 *
 * 上海新教改化学"弱化方程式背诵"，但 Leaving Certificate 明确要求
 * 精确写出配平的方程式、状态符号与计算式。这里按 LC 标准呈现：
 *   expr     表达式（中文语境的写法）
 *   exprEn   爱尔兰 LC 写法（英文词 / 化学式 + 状态符号）
 *   cond     反应条件
 *   condEn   英文条件
 *   noteCn / noteEn  含义与考试提醒
 *   keywords LC 关键词
 *
 * type: 'bio-word' 生物文字表达式 / 'chem-eq' 化学方程式 / 'calc' 计算式 / 'genetics' 遗传图解
 */

const units = [
  { key: 'bio', label: '生物 · 生理表达式', subject: 'bio' },
  { key: 'bio-gen', label: '生物 · 遗传图解', subject: 'bio' },
  { key: 'chem-base', label: '化学 · 基础化学式', subject: 'chem' },
  { key: 'chem-eq', label: '化学 · 必背方程式', subject: 'chem' },
  { key: 'chem-calc', label: '化学 · 计算公式', subject: 'chem' }
];

const formulas = [
  // ---------- 生物：生理文字表达式 ----------
  {
    id: 'f01', unit: 'bio', type: 'bio-word',
    cn: '光合作用',
    en: 'Photosynthesis',
    expr: '二氧化碳 + 水 ——(光能 / 叶绿体)→ 葡萄糖 + 氧气',
    exprEn: 'carbon dioxide + water —(light energy / chlorophyll)→ glucose + oxygen',
    formula: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    cond: '光照、叶绿体（叶绿素）',
    condEn: 'light energy, chlorophyll in chloroplasts',
    noteCn: '合成有机物、储存能量的过程。LC 里必须写出 light energy 和 chlorophyll 两个条件，缺一扣分。',
    noteEn: 'An endothermic reaction storing energy. Always include light energy and chlorophyll when writing the word equation in LC.',
    keywords: [
      { en: 'endothermic', cn: '吸热' },
      { en: 'chlorophyll', cn: '叶绿素' },
      { en: 'limiting factor', cn: '限制因素' }
    ]
  },
  {
    id: 'f02', unit: 'bio', type: 'bio-word',
    cn: '有氧呼吸',
    en: 'Aerobic respiration',
    expr: '有机物（葡萄糖）+ 氧气 ——(酶)→ 二氧化碳 + 水 + 能量',
    exprEn: 'glucose + oxygen —(enzymes)→ carbon dioxide + water + energy (ATP)',
    formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy',
    cond: '酶、线粒体',
    condEn: 'enzymes, mitochondria',
    noteCn: '释放能量的过程，与光合作用的反应物、生成物正好相反。ATP 是细胞的能量货币。',
    noteEn: 'Exothermic; the reverse of photosynthesis in terms of reactants and products. ATP is the energy currency of the cell.',
    keywords: [
      { en: 'exothermic', cn: '放热' },
      { en: 'ATP', cn: 'ATP' },
      { en: 'mitochondrion', cn: '线粒体' }
    ]
  },
  {
    id: 'f03', unit: 'bio', type: 'bio-word',
    cn: '无氧呼吸（酵母）',
    en: 'Anaerobic respiration in yeast',
    expr: '葡萄糖 ——(酶、无氧)→ 酒精 + 二氧化碳 + 少量能量',
    exprEn: 'glucose —(enzymes, no oxygen)→ ethanol + carbon dioxide + small amount of energy',
    formula: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy',
    cond: '无氧、酶',
    condEn: 'absence of oxygen, enzymes (zymase)',
    noteCn: '酵母的酒精发酵，用于酿酒和面包。 muscle 无氧呼吸产物是乳酸而非酒精。',
    noteEn: 'Alcoholic fermentation in yeast; used in brewing and baking. In human muscle, anaerobic respiration produces lactic acid instead.',
    keywords: [
      { en: 'fermentation', cn: '发酵' },
      { en: 'ethanol', cn: '乙醇' },
      { en: 'lactic acid', cn: '乳酸' }
    ]
  },
  {
    id: 'f04', unit: 'bio', type: 'bio-word',
    cn: '淀粉的消化',
    en: 'Digestion of starch',
    expr: '淀粉 ——(唾液淀粉酶)→ 麦芽糖 ——(麦芽糖酶)→ 葡萄糖',
    exprEn: 'starch —(amylase)→ maltose —(maltase)→ glucose',
    formula: '(C₆H₁₀O₅)n + nH₂O → nC₆H₁₂O₆',
    cond: '淀粉酶、麦芽糖酶',
    condEn: 'amylase in saliva and pancreatic juice; maltase in small intestine',
    noteCn: '淀粉最终分解为可吸收的葡萄糖，在小肠完成吸收。',
    noteEn: 'Starch is broken down to glucose for absorption in the small intestine. LC food tests: iodine for starch, Benedict\'s for reducing sugar.',
    keywords: [
      { en: 'amylase', cn: '淀粉酶' },
      { en: 'maltose', cn: '麦芽糖' },
      { en: 'glucose', cn: '葡萄糖' }
    ]
  },
  {
    id: 'f05', unit: 'bio', type: 'bio-word',
    cn: '蛋白质的消化',
    en: 'Digestion of protein',
    expr: '蛋白质 ——(胃蛋白酶 / 胰蛋白酶)→ 多肽 ——(肽酶)→ 氨基酸',
    exprEn: 'protein —(pepsin / trypsin)→ peptides —(peptidases)→ amino acids',
    formula: 'protein + H₂O → amino acids',
    cond: '胃酸、蛋白酶',
    condEn: 'stomach acid, proteases',
    noteCn: '蛋白质最终分解为氨基酸才能被吸收，用于合成人体自身蛋白质。',
    noteEn: 'Amino acids are the building blocks used for growth and repair. Biuret test detects protein (blue → purple).',
    keywords: [
      { en: 'pepsin', cn: '胃蛋白酶' },
      { en: 'peptide', cn: '多肽' },
      { en: 'amino acid', cn: '氨基酸' }
    ]
  },
  {
    id: 'f06', unit: 'bio', type: 'bio-word',
    cn: '气体交换 · 扩散方向',
    en: 'Gas exchange by diffusion',
    expr: '肺泡(O₂ 高) → 血液(O₂ 低)；血液(CO₂ 高) → 肺泡(CO₂ 低)',
    exprEn: 'alveoli (high O₂) → blood (low O₂); blood (high CO₂) → alveoli (low CO₂)',
    formula: '沿浓度梯度：高浓度 → 低浓度',
    cond: '肺泡壁与毛细血管壁均一层细胞',
    condEn: 'alveolar and capillary walls are one cell thick',
    noteCn: '组织的气体交换方向相反：血液给组织送 O₂、带走 CO₂。',
    noteEn: 'At body tissues the direction reverses: oxygen leaves the blood and carbon dioxide enters it. Always write "down a concentration gradient".',
    keywords: [
      { en: 'diffusion gradient', cn: '扩散梯度' },
      { en: 'alveolus', cn: '肺泡' },
      { en: 'capillary', cn: '毛细血管' }
    ]
  },
  // ---------- 生物：遗传图解 ----------
  {
    id: 'f07', unit: 'bio-gen', type: 'genetics',
    cn: '一对相对性状的杂交（完全显性）',
    en: 'Monohybrid cross (complete dominance)',
    expr: 'P：AA × aa → F₁：全部 Aa（显性）→ F₁ 自交 Aa × Aa → F₂：1AA : 2Aa : 1aa',
    exprEn: 'P: AA × aa → F1: all Aa (dominant phenotype) → F1 selfed: Aa × Aa → F2: 1 AA : 2 Aa : 1 aa',
    formula: '基因型比 1:2:1 ｜ 表现型比 3:1',
    cond: '显性完全掩盖隐性',
    condEn: 'complete dominance',
    noteCn: 'LC 必须画出 Punnett square，写清配子、F₁、F₂ 与两种比例。',
    noteEn: 'LC requires a Punnett square with parental genotypes, gametes, F1/F2 and both the genotypic (1:2:1) and phenotypic (3:1) ratios.',
    keywords: [
      { en: 'Punnett square', cn: '遗传图解' },
      { en: 'genotype / phenotype ratio', cn: '基因型 / 表现型比' },
      { en: 'heterozygous', cn: '杂合子' }
    ]
  },
  {
    id: 'f08', unit: 'bio-gen', type: 'genetics',
    cn: '测交',
    en: 'Test cross',
    expr: '未知显性个体 × 隐性纯合子(aa) → 子代全显性则为 AA；出现 1:1 则为 Aa',
    exprEn: 'unknown dominant individual × homozygous recessive (aa) → all dominant offspring means AA; a 1:1 ratio means Aa',
    formula: 'Aa × aa → 1Aa : 1aa（表现型 1:1）',
    cond: '与隐性纯合子杂交',
    condEn: 'cross with homozygous recessive',
    noteCn: '用于判断显性性状个体的基因型。',
    noteEn: 'A test cross reveals the genotype of an individual showing the dominant phenotype.',
    keywords: [
      { en: 'test cross', cn: '测交' },
      { en: 'homozygous recessive', cn: '隐性纯合子' },
      { en: 'carrier', cn: '携带者' }
    ]
  },
  {
    id: 'f09', unit: 'bio-gen', type: 'genetics',
    cn: '性别决定',
    en: 'Sex determination',
    expr: '母 XX（配子全 X）× 父 XY（配子 X 或 Y）→ 女 XX : 男 XY = 1 : 1',
    exprEn: 'mother XX (all X ova) × father XY (X or Y sperm) → female XX : male XY = 1 : 1',
    formula: 'XX × XY → XX : XY = 1 : 1',
    cond: '精子类型决定性别',
    condEn: 'the sperm determines the sex of the offspring',
    noteCn: '每次受精生男生女概率均为 50%，与上次结果无关。',
    noteEn: 'Each fertilisation is independent: the probability of a boy or a girl is 50% each time.',
    keywords: [
      { en: 'sex chromosome', cn: '性染色体' },
      { en: 'gamete', cn: '配子' },
      { en: 'probability', cn: '概率' }
    ]
  },
  // ---------- 化学：基础化学式 ----------
  {
    id: 'f10', unit: 'chem-base', type: 'chem-eq',
    cn: '常见单质的化学式',
    en: 'Formulae of common elements',
    expr: '氧气 O₂ ｜ 氮气 N₂ ｜ 氢气 H₂ ｜ 氯气 Cl₂ ｜ 碳 C ｜ 铁 Fe ｜ 镁 Mg ｜ 铜 Cu',
    exprEn: 'oxygen O₂ ｜ nitrogen N₂ ｜ hydrogen H₂ ｜ chlorine Cl₂ ｜ carbon C ｜ iron Fe ｜ magnesium Mg ｜ copper Cu',
    formula: 'O₂ · N₂ · H₂ · Cl₂（气态非金属多为双原子分子）',
    cond: '元素符号首字母大写，第二个字母小写',
    condEn: 'first letter capital, second letter lower case',
    noteCn: '稀有气体（He、Ne、Ar）是单原子分子，金属和固态非金属用元素符号直接表示。',
    noteEn: 'Noble gases are monatomic; metals and solid non-metals are represented by their symbol alone. Always write correct case: Co ≠ CO.',
    keywords: [
      { en: 'diatomic molecule', cn: '双原子分子' },
      { en: 'monatomic', cn: '单原子' },
      { en: 'chemical symbol', cn: '元素符号' }
    ]
  },
  {
    id: 'f11', unit: 'chem-base', type: 'chem-eq',
    cn: '常见化合物的化学式',
    en: 'Formulae of common compounds',
    expr: '水 H₂O ｜ 二氧化碳 CO₂ ｜ 一氧化碳 CO ｜ 氯化钠 NaCl ｜ 碳酸钙 CaCO₃ ｜ 硫酸 H₂SO₄ ｜ 氢氧化钠 NaOH',
    exprEn: 'water H₂O ｜ carbon dioxide CO₂ ｜ carbon monoxide CO ｜ sodium chloride NaCl ｜ calcium carbonate CaCO₃ ｜ sulfuric acid H₂SO₄ ｜ sodium hydroxide NaOH',
    formula: 'H₂O · CO₂ · NaCl · CaCO₃ · H₂SO₄ · NaOH',
    cond: '正负化合价代数和为零',
    condEn: 'total positive and negative valencies sum to zero',
    noteCn: '书写依据：正价在前、负价在后，十字交叉确定原子个数。',
    noteEn: 'Use valencies to deduce formulae; in LC also state oxidation numbers when asked.',
    keywords: [
      { en: 'valency', cn: '化合价' },
      { en: 'oxidation number', cn: '氧化数' },
      { en: 'compound', cn: '化合物' }
    ]
  },
  {
    id: 'f12', unit: 'chem-base', type: 'chem-eq',
    cn: '常见离子',
    en: 'Common ions',
    expr: 'Na⁺ ｜ K⁺ ｜ Ca²⁺ ｜ Mg²⁺ ｜ Al³⁺ ｜ Cl⁻ ｜ O²⁻ ｜ OH⁻ ｜ SO₄²⁻ ｜ CO₃²⁻ ｜ NO₃⁻ ｜ NH₄⁺',
    exprEn: 'sodium Na⁺ ｜ potassium K⁺ ｜ calcium Ca²⁺ ｜ magnesium Mg²⁺ ｜ aluminium Al³⁺ ｜ chloride Cl⁻ ｜ oxide O²⁻ ｜ hydroxide OH⁻ ｜ sulfate SO₄²⁻ ｜ carbonate CO₃²⁻ ｜ nitrate NO₃⁻ ｜ ammonium NH₄⁺',
    formula: 'cation（正离子）+ anion（负离子）→ ionic compound',
    cond: '离子所带电荷写在符号右上角',
    condEn: 'the charge is written as a superscript',
    noteCn: '爱尔兰用 sulfate / aluminium / aluminium 的拼写，不是 sulfate 美式 sulfur 混用。',
    noteEn: 'Irish exams use British spellings: sulfate, aluminium, sulphur.',
    keywords: [
      { en: 'cation / anion', cn: '阳离子 / 阴离子' },
      { en: 'ionic compound', cn: '离子化合物' },
      { en: 'charge', cn: '电荷' }
    ]
  },
  // ---------- 化学：必背方程式 ----------
  {
    id: 'f13', unit: 'chem-eq', type: 'chem-eq',
    cn: '碳在氧气中燃烧',
    en: 'Combustion of carbon',
    expr: '碳 + 氧气 ——(点燃)→ 二氧化碳',
    exprEn: 'carbon + oxygen —(ignition)→ carbon dioxide',
    formula: 'C(s) + O₂(g) → CO₂(g)',
    cond: '点燃',
    condEn: 'ignition / burning',
    noteCn: '氧气充足生成 CO₂；氧气不足生成有毒的 CO。',
    noteEn: 'In limited oxygen, poisonous carbon monoxide is produced: 2C(s) + O₂(g) → 2CO(g).',
    keywords: [
      { en: 'combustion', cn: '燃烧' },
      { en: 'complete / incomplete combustion', cn: '完全 / 不完全燃烧' },
      { en: 'carbon monoxide', cn: '一氧化碳' }
    ]
  },
  {
    id: 'f14', unit: 'chem-eq', type: 'chem-eq',
    cn: '镁条燃烧',
    en: 'Burning of magnesium',
    expr: '镁 + 氧气 ——(点燃)→ 氧化镁',
    exprEn: 'magnesium + oxygen —(ignition)→ magnesium oxide',
    formula: '2Mg(s) + O₂(g) → 2MgO(s)',
    cond: '点燃，发出耀眼白光',
    condEn: 'ignition, brilliant white flame',
    noteCn: '化合反应，生成白色固体氧化镁。',
    noteEn: 'A combination reaction giving a white solid. LC observation: burns with a brilliant white flame.',
    keywords: [
      { en: 'combination reaction', cn: '化合反应' },
      { en: 'observation', cn: '实验现象' },
      { en: 'magnesium oxide', cn: '氧化镁' }
    ]
  },
  {
    id: 'f15', unit: 'chem-eq', type: 'chem-eq',
    cn: '氢气燃烧',
    en: 'Combustion of hydrogen',
    expr: '氢气 + 氧气 ——(点燃)→ 水',
    exprEn: 'hydrogen + oxygen —(ignition)→ water',
    formula: '2H₂(g) + O₂(g) → 2H₂O(l)',
    cond: '点燃',
    condEn: 'ignition',
    noteCn: '产物只有水，是清洁能源。检验氢气用 burning splint 有轻微爆鸣声。',
    noteEn: 'Clean fuel producing only water. Test for hydrogen: a burning splint gives a squeaky pop.',
    keywords: [
      { en: 'squeaky pop test', cn: '爆鸣试验' },
      { en: 'clean fuel', cn: '清洁能源' }
    ]
  },
  {
    id: 'f16', unit: 'chem-eq', type: 'chem-eq',
    cn: '过氧化氢分解制氧气',
    en: 'Decomposition of hydrogen peroxide',
    expr: '过氧化氢 ——(二氧化锰催化)→ 水 + 氧气',
    exprEn: 'hydrogen peroxide —(manganese dioxide catalyst)→ water + oxygen',
    formula: '2H₂O₂(aq) → 2H₂O(l) + O₂(g)',
    cond: 'MnO₂ 作催化剂，常温',
    condEn: 'manganese dioxide catalyst, room temperature',
    noteCn: '分解反应。MnO₂ 加快反应但本身质量和化学性质不变。',
    noteEn: 'A decomposition reaction. MnO₂ is a catalyst: it speeds up the reaction and is unchanged at the end.',
    keywords: [
      { en: 'catalyst', cn: '催化剂' },
      { en: 'decomposition', cn: '分解反应' },
      { en: 'activation energy', cn: '活化能' }
    ]
  },
  {
    id: 'f17', unit: 'chem-eq', type: 'chem-eq',
    cn: '加热高锰酸钾制氧气',
    en: 'Thermal decomposition of potassium permanganate',
    expr: '高锰酸钾 ——(加热)→ 锰酸钾 + 二氧化锰 + 氧气',
    exprEn: 'potassium permanganate —(heat)→ potassium manganate(VII) + manganese dioxide + oxygen',
    formula: '2KMnO₄(s) → K₂MnO₄(s) + MnO₂(s) + O₂(g)',
    cond: '加热；试管口略向下倾斜',
    condEn: 'heat; mouth of test tube slightly tilted down',
    noteCn: 'LC 用 potassium manganate(VII) 命名。试管口向下防止冷凝水倒流炸裂。',
    noteEn: 'LC uses potassium manganate(VII). Tilt the test tube downwards to prevent condensed water running back and cracking it.',
    keywords: [
      { en: 'thermal decomposition', cn: '热分解' },
      { en: 'oxidation state', cn: '氧化态' }
    ]
  },
  {
    id: 'f18', unit: 'chem-eq', type: 'chem-eq',
    cn: '实验室制取二氧化碳',
    en: 'Laboratory preparation of carbon dioxide',
    expr: '碳酸钙 + 盐酸 → 氯化钙 + 水 + 二氧化碳',
    exprEn: 'calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide',
    formula: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)',
    cond: '常温，大理石 + 稀盐酸',
    condEn: 'room temperature, marble chips and dilute HCl',
    noteCn: '复分解后碳酸分解。不用硫酸（生成微溶 CaSO₄ 覆盖表面使反应停止）。',
    noteEn: 'Do not use sulfuric acid: insoluble calcium sulfate coats the marble and stops the reaction.',
    keywords: [
      { en: 'effervescence', cn: '冒泡' },
      { en: 'dilute acid', cn: '稀酸' },
      { en: 'limewater test', cn: '石灰水检验' }
    ]
  },
  {
    id: 'f19', unit: 'chem-eq', type: 'chem-eq',
    cn: '检验二氧化碳',
    en: 'Test for carbon dioxide',
    expr: '二氧化碳 + 氢氧化钙 → 碳酸钙↓ + 水',
    exprEn: 'carbon dioxide + calcium hydroxide → calcium carbonate + water',
    formula: 'CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s) + H₂O(l)',
    cond: '通入澄清石灰水',
    condEn: 'bubble through limewater',
    noteCn: '现象：石灰水变浑浊。过量 CO₂ 会使浑浊消失（生成可溶性碳酸氢钙）。',
    noteEn: 'Observation: limewater turns milky. Excess CO₂ clears the milkiness as soluble calcium hydrogencarbonate forms.',
    keywords: [
      { en: 'limewater', cn: '石灰水' },
      { en: 'precipitate', cn: '沉淀' },
      { en: 'observation', cn: '现象' }
    ]
  },
  {
    id: 'f20', unit: 'chem-eq', type: 'chem-eq',
    cn: '电解水',
    en: 'Electrolysis of water',
    expr: '水 ——(通电)→ 氢气 + 氧气',
    exprEn: 'water —(electrolysis)→ hydrogen + oxygen',
    formula: '2H₂O(l) → 2H₂(g) + O₂(g)',
    cond: '通直流电，加入少量电解质增强导电性',
    condEn: 'direct current; a little electrolyte added to conduct electricity',
    noteCn: '阴极（−）产生 H₂，阳极（+）产生 O₂，体积比 H₂:O₂ = 2:1。',
    noteEn: 'Hydrogen forms at the cathode (−), oxygen at the anode (+); volume ratio H₂:O₂ = 2:1.',
    keywords: [
      { en: 'electrolysis', cn: '电解' },
      { en: 'anode / cathode', cn: '阳极 / 阴极' },
      { en: 'volume ratio', cn: '体积比' }
    ]
  },
  {
    id: 'f21', unit: 'chem-eq', type: 'chem-eq',
    cn: '金属与酸反应制氢气',
    en: 'Metal + acid reaction producing hydrogen',
    expr: '锌 + 稀硫酸 → 硫酸锌 + 氢气',
    exprEn: 'zinc + sulfuric acid → zinc sulfate + hydrogen',
    formula: 'Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)',
    cond: '常温，稀硫酸或稀盐酸',
    condEn: 'room temperature, dilute acid',
    noteCn: '置换反应。氢前金属能置换酸中的氢；铜等氢后金属不能。',
    noteEn: 'A displacement reaction. Metals above hydrogen in the reactivity series liberate H₂; copper does not.',
    keywords: [
      { en: 'displacement', cn: '置换反应' },
      { en: 'reactivity series', cn: '金属活动性顺序' }
    ]
  },
  {
    id: 'f22', unit: 'chem-eq', type: 'chem-eq',
    cn: '铁置换铜',
    en: 'Displacement of copper by iron',
    expr: '铁 + 硫酸铜 → 硫酸亚铁 + 铜',
    exprEn: 'iron + copper(II) sulfate → iron(II) sulfate + copper',
    formula: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)',
    cond: '把铁钉放入硫酸铜溶液',
    condEn: 'iron nail in copper(II) sulfate solution',
    noteCn: '现象：铁钉表面覆盖红色铜，蓝色溶液逐渐变浅绿色。',
    noteEn: 'Observation: a reddish-brown deposit of copper forms; the blue solution turns pale green.',
    keywords: [
      { en: 'displacement reaction', cn: '置换反应' },
      { en: 'oxidation state', cn: '氧化态' },
      { en: 'colour change', cn: '颜色变化' }
    ]
  },
  {
    id: 'f23', unit: 'chem-eq', type: 'chem-eq',
    cn: '酸碱中和',
    en: 'Neutralisation',
    expr: '盐酸 + 氢氧化钠 → 氯化钠 + 水',
    exprEn: 'hydrochloric acid + sodium hydroxide → sodium chloride + water',
    formula: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    cond: '滴加至指示剂变色（终点）',
    condEn: 'add until the indicator changes colour (end point)',
    noteCn: '本质离子方程式：H⁺(aq) + OH⁻(aq) → H₂O(l)。',
    noteEn: 'Net ionic equation: H⁺(aq) + OH⁻(aq) → H₂O(l). Na⁺ and Cl⁻ are spectator ions.',
    keywords: [
      { en: 'neutralisation', cn: '中和' },
      { en: 'spectator ion', cn: '旁观离子' },
      { en: 'end point', cn: '终点' }
    ]
  },
  {
    id: 'f24', unit: 'chem-eq', type: 'chem-eq',
    cn: '碳酸盐与酸反应',
    en: 'Carbonate + acid reaction',
    expr: '碳酸钠 + 盐酸 → 氯化钠 + 水 + 二氧化碳',
    exprEn: 'sodium carbonate + hydrochloric acid → sodium chloride + water + carbon dioxide',
    formula: 'Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)',
    cond: '常温',
    condEn: 'room temperature',
    noteCn: '检验碳酸根：加稀盐酸产生能使石灰水变浑浊的气体。',
    noteEn: 'Test for carbonate: add dilute acid; the gas evolved turns limewater milky.',
    keywords: [
      { en: 'carbonate ion', cn: '碳酸根' },
      { en: 'gas evolved', cn: '放出气体' }
    ]
  },
  // ---------- 化学：计算公式 ----------
  {
    id: 'f25', unit: 'chem-calc', type: 'calc',
    cn: '相对分子质量',
    en: 'Relative molecular mass (Mr)',
    expr: 'Mr = Σ(各元素的相对原子质量 × 原子个数)',
    exprEn: 'Mr = Σ (Ar × number of atoms of each element)',
    formula: '例：Mr(CO₂) = 12 + 16×2 = 44',
    cond: '无单位',
    condEn: 'Mr has no units',
    noteCn: '先数清每个元素的原子个数，再逐个相乘求和。',
    noteEn: 'Count atoms carefully. Molar mass has the same numerical value but units of g/mol.',
    keywords: [
      { en: 'Ar / Mr', cn: '相对原子 / 分子质量' },
      { en: 'molar mass', cn: '摩尔质量' }
    ]
  },
  {
    id: 'f26', unit: 'chem-calc', type: 'calc',
    cn: '元素质量分数',
    en: 'Percentage composition by mass',
    expr: '某元素质量分数 = (该元素 Ar × 原子个数) ÷ Mr × 100%',
    exprEn: '% element = (Ar × number of atoms) ÷ Mr × 100',
    formula: '例：CO₂ 中碳的质量分数 = 12 ÷ 44 × 100% ≈ 27.3%',
    cond: '结果保留合适有效数字',
    condEn: 'give answer to suitable significant figures',
    noteCn: '各元素质量分数之和约等于 100%。',
    noteEn: 'The percentages of all elements add up to approximately 100%.',
    keywords: [
      { en: 'percentage composition', cn: '质量分数' },
      { en: 'significant figures', cn: '有效数字' }
    ]
  },
  {
    id: 'f27', unit: 'chem-calc', type: 'calc',
    cn: '物质的量（LC 核心）',
    en: 'Amount of substance — the mole',
    expr: 'n = m ÷ M（n: mol；m: g；M: g/mol）',
    exprEn: 'n = m / M  (n in mol, m in g, M in g mol⁻¹)',
    formula: 'n = m / M',
    cond: 'LC 计算必写公式与单位',
    condEn: 'LC requires the formula and units to be shown',
    noteCn: '上海初三也学，但 LC 从初二衔接起就要熟练。',
    noteEn: 'One mole contains 6.02 × 10²³ particles (Avogadro constant).',
    keywords: [
      { en: 'mole', cn: '摩尔' },
      { en: 'molar mass', cn: '摩尔质量' },
      { en: 'Avogadro constant', cn: '阿伏伽德罗常数' }
    ]
  },
  {
    id: 'f28', unit: 'chem-calc', type: 'calc',
    cn: '溶液浓度',
    en: 'Concentration of a solution',
    expr: 'c = n ÷ V（c: mol/L；n: mol；V: L）',
    exprEn: 'c = n / V  (c in mol L⁻¹, n in mol, V in L)',
    formula: 'c = n / V',
    cond: '体积必须换算成升（L）',
    condEn: 'convert volume to litres first',
    noteCn: '滴定计算中先求标准液物质的量，再按方程式系数比求待测液。',
    noteEn: 'In titrations, use the balanced equation to get the mole ratio before calculating concentration.',
    keywords: [
      { en: 'concentration', cn: '浓度' },
      { en: 'titration', cn: '滴定' },
      { en: 'mole ratio', cn: '物质的量之比' }
    ]
  },
  {
    id: 'f29', unit: 'chem-calc', type: 'calc',
    cn: '质量守恒计算',
    en: 'Calculations using conservation of mass',
    expr: '反应物总质量 = 生成物总质量',
    exprEn: 'total mass of reactants = total mass of products',
    formula: 'm(反应物) = m(生成物)',
    cond: '有气体参加或生成时用封闭体系',
    condEn: 'use a closed system when gases are involved',
    noteCn: '根据方程式可求：已知一种物质质量 → 求另一种物质质量。',
    noteEn: 'Use the balanced equation: find moles of the known substance, apply the mole ratio, then convert back to mass.',
    keywords: [
      { en: 'conservation of mass', cn: '质量守恒' },
      { en: 'closed system', cn: '封闭体系' },
      { en: 'stoichiometry', cn: '化学计量' }
    ]
  },
  {
    id: 'f30', unit: 'chem-calc', type: 'calc',
    cn: '气体摩尔体积（LC）',
    en: 'Molar volume of a gas',
    expr: 'V = n × 22.4 L/mol（标准状况）',
    exprEn: 'V = n × 22.4 L mol⁻¹ at STP',
    formula: 'V = n × 22.4 (L) at STP',
    cond: '标准状况 STP（0°C, 1 atm）',
    condEn: 'STP: 0 °C and 1 atmosphere',
    noteCn: '与气体定律结合：P₁V₁/T₁ = P₂V₂/T₂，温度用 K。',
    noteEn: 'Combined gas law: P₁V₁/T₁ = P₂V₂/T₂; temperature must be in kelvin.',
    keywords: [
      { en: 'molar volume', cn: '摩尔体积' },
      { en: 'STP', cn: '标准状况' },
      { en: 'kelvin', cn: '开尔文' }
    ]
  }
];

module.exports = { units, formulas };
