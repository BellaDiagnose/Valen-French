/**
 * data-chem.js —— 上海新教改（沪教版八年级全一册新教材）初二化学知识点
 *
 * 覆盖范围（2026/2027 学年新教材四个主题）：
 *   主题1 化学的魅力
 *   主题2 常见的物质（上）：空气 / 氧气 / 二氧化碳
 *   主题3 物质的组成与结构：水的性质与组成 / 物质的微观构成
 *   主题4 物质的化学变化（上）：定量关系与表示方法 / 基本反应类型
 *   LC 衔接：上海初三或 Leaving Certificate 才系统学、但与初二内容直接对接的核心概念
 *
 * 字段同 data-bio.js。英式拼写按爱尔兰习惯。
 */

const units = [
  { key: 't1',  label: '主题1 化学的魅力', book: '八年级' },
  { key: 't2',  label: '主题2 常见物质·上', book: '八年级' },
  { key: 't3',  label: '主题3 组成与结构', book: '八年级' },
  { key: 't4',  label: '主题4 化学变化·上', book: '八年级' },
  { key: 'lc',  label: 'LC 衔接专题', book: '衔接' }
];

const points = [
  // ---------- 主题1 化学的魅力 ----------
  {
    id: 'c01', unit: 't1', book: '八年级', chapter: '主题1 · 化学使生活更美好',
    cn: '化学研究的对象',
    en: 'What is chemistry?',
    defCn: '化学是在分子、原子层次上研究物质的组成、结构、性质及变化规律的科学。它既研究自然界已有的物质，也创造新物质。',
    defEn: 'Chemistry is the scientific study of the composition, structure, properties and reactions of matter, especially at the level of atoms and molecules. Chemists both investigate existing substances and synthesise new ones.',
    keywords: [
      { en: 'chemistry', cn: '化学' },
      { en: 'matter', cn: '物质' },
      { en: 'atom / molecule', cn: '原子 / 分子' },
      { en: 'composition', cn: '组成' },
      { en: 'property', cn: '性质' },
      { en: 'chemical change', cn: '化学变化' }
    ],
    lcTip: 'LC 开篇题常问 "define chemistry"——必须写 "study of matter: composition, structure, properties and reactions"，只写 "study of chemicals" 不给分。'
  },
  {
    id: 'c02', unit: 't1', book: '八年级', chapter: '主题1 · 物理变化与化学变化',
    cn: '物理变化与化学变化',
    en: 'Physical and chemical changes',
    defCn: '物理变化没有新物质生成，如冰融化、玻璃破碎；化学变化有新物质生成，如铁生锈、蜡烛燃烧，常伴随发光、放热、变色、生成气体或沉淀等现象。',
    defEn: 'A physical change does not form a new substance and is usually reversible, e.g. melting ice. A chemical change forms one or more new substances and is often irreversible, e.g. rusting of iron or burning of magnesium. Signs include heat, light, colour change, gas and precipitate.',
    keywords: [
      { en: 'physical change', cn: '物理变化' },
      { en: 'chemical change / chemical reaction', cn: '化学变化' },
      { en: 'reversible / irreversible', cn: '可逆 / 不可逆' },
      { en: 'reactant', cn: '反应物' },
      { en: 'product', cn: '生成物' },
      { en: 'precipitate', cn: '沉淀' },
      { en: 'evidence of reaction', cn: '反应证据' }
    ],
    lcTip: 'LC 高频题 "give three pieces of evidence that a chemical reaction has occurred"——写 gas given off / colour change / precipitate formed / temperature change，任写三个，动词用 given off、formed 更地道。'
  },
  {
    id: 'c03', unit: 't1', book: '八年级', chapter: '主题1 · 化学实验探究',
    cn: '实验基本操作与安全',
    en: 'Laboratory techniques and safety',
    defCn: '取用固体用药匙或镊子，液体倾倒时标签朝向手心；加热用外焰，试管口不对人；稀释浓硫酸须把酸沿器壁慢慢注入水中并搅拌。实验前先检查装置气密性。',
    defEn: 'Solids are handled with a spatula or tweezers; when pouring liquids the label faces the palm. Heat using the outer flame of a Bunsen burner and never point a test tube at a person. To dilute concentrated acid, add acid slowly to water and stir. Check the gas-tightness of apparatus before use.',
    keywords: [
      { en: 'spatula', cn: '药匙' },
      { en: 'Bunsen burner', cn: '本生灯' },
      { en: 'gas-tightness', cn: '气密性' },
      { en: 'hazard / risk', cn: '危险 / 风险' },
      { en: 'safety goggles', cn: '护目镜' },
      { en: 'fume hood', cn: '通风橱' }
    ],
    lcTip: 'LC Investigating in Chemistry 常考 safety：写 hazard → risk → precaution（例如 "acid is corrosive; it can burn skin; wear goggles and gloves"），三步缺一扣分。'
  },
  {
    id: 'c04', unit: 't1', book: '八年级', chapter: '主题1 · 科学探究',
    cn: '科学探究的步骤',
    en: 'Steps of a scientific investigation',
    defCn: '科学探究通常包括提出问题、猜想与假设、制定计划、进行实验收集证据、解释与结论、反思与评价、表达与交流。控制变量法是设计对照实验的核心方法。',
    defEn: 'A scientific investigation involves asking a question, forming a hypothesis, planning a fair test, collecting and recording data, analysing results, drawing conclusions and evaluating the method. A controlled experiment changes only one independent variable at a time.',
    keywords: [
      { en: 'hypothesis', cn: '假设' },
      { en: 'fair test', cn: '对照实验' },
      { en: 'independent / dependent variable', cn: '自变量 / 因变量' },
      { en: 'controlled variable', cn: '控制变量' },
      { en: 'observation', cn: '观察' },
      { en: 'conclusion', cn: '结论' },
      { en: 'evaluation', cn: '评估' }
    ],
    lcTip: 'LC 实验题必写变量三件套 + "repeat and average to improve reliability"。评价题用 "limitation → improvement" 配对写，别只写 "do it again"。'
  },
  // ---------- 主题2 常见的物质（上） ----------
  {
    id: 'c05', unit: 't2', book: '八年级', chapter: '主题2 · 空气',
    cn: '空气的成分',
    en: 'Composition of air',
    defCn: '空气是混合物，按体积分数约含氮气 78%、氧气 21%、稀有气体 0.94%、二氧化碳 0.03%–0.04%，其余为水蒸气和杂质。',
    defEn: 'Air is a mixture of gases: approximately 78% nitrogen, 21% oxygen, about 1% noble gases and around 0.04% carbon dioxide, with variable amounts of water vapour.',
    keywords: [
      { en: 'mixture', cn: '混合物' },
      { en: 'nitrogen', cn: '氮气' },
      { en: 'oxygen', cn: '氧气' },
      { en: 'noble gas', cn: '稀有气体' },
      { en: 'carbon dioxide', cn: '二氧化碳' },
      { en: 'percentage by volume', cn: '体积分数' }
    ],
    lcTip: 'LC 常考测定空气中氧气含量实验（铜粉/红磷）：写 "oxygen is used up, water rises to 1/5 of the container" 并解释 remaining gas is mainly nitrogen。'
  },
  {
    id: 'c06', unit: 't2', book: '八年级', chapter: '主题2 · 氧气',
    cn: '氧气的性质',
    en: 'Properties of oxygen',
    defCn: '氧气是无色无味、不易溶于水的气体，密度比空气略大。它是化学性质活泼的氧化剂，支持燃烧和呼吸，能使带火星的木条复燃。',
    defEn: 'Oxygen is a colourless, odourless gas, slightly denser than air and only slightly soluble in water. It is a reactive oxidising agent that supports combustion and respiration; it relights a glowing splint.',
    keywords: [
      { en: 'oxidising agent', cn: '氧化剂' },
      { en: 'supports combustion', cn: '支持燃烧' },
      { en: 'glowing splint test', cn: '带火星木条检验' },
      { en: 'oxidation', cn: '氧化' },
      { en: 'soluble', cn: '可溶的' }
    ],
    lcTip: 'LC 必背氧气检验："a glowing splint is relit"。注意 distinguish oxygen 与 air：air 也支持燃烧但木条不复燃。'
  },
  {
    id: 'c07', unit: 't2', book: '八年级', chapter: '主题2 · 氧气',
    cn: '氧气的实验室制法',
    en: 'Laboratory preparation of oxygen',
    defCn: '实验室常用加热高锰酸钾或氯酸钾与二氧化锰混合物、或过氧化氢在二氧化锰催化下分解制氧气。因氧气不易溶于水，可用排水法收集。',
    defEn: 'In the laboratory oxygen is prepared by heating potassium permanganate, or by decomposing hydrogen peroxide using manganese dioxide as a catalyst. Because oxygen is only slightly soluble in water, it can be collected by displacement of water.',
    keywords: [
      { en: 'potassium permanganate', cn: '高锰酸钾' },
      { en: 'hydrogen peroxide', cn: '过氧化氢' },
      { en: 'manganese dioxide', cn: '二氧化锰' },
      { en: 'catalyst', cn: '催化剂' },
      { en: 'displacement of water', cn: '排水集气法' },
      { en: 'decomposition', cn: '分解' }
    ],
    lcTip: 'LC 实验题要会写：why use a catalyst（lowers activation energy, unchanged at end）、why collect over water（insoluble）。装置气密性检查必写。'
  },
  {
    id: 'c08', unit: 't2', book: '八年级', chapter: '主题2 · 二氧化碳',
    cn: '二氧化碳的性质',
    en: 'Properties of carbon dioxide',
    defCn: '二氧化碳是无色无味气体，密度比空气大，能溶于水并与水反应生成碳酸。它不支持燃烧、不能供给呼吸，能使澄清石灰水变浑浊。固态二氧化碳叫干冰。',
    defEn: 'Carbon dioxide is a colourless gas, denser than air and soluble in water, forming carbonic acid. It does not support combustion or respiration and turns limewater milky. Solid carbon dioxide is known as dry ice.',
    keywords: [
      { en: 'carbon dioxide', cn: '二氧化碳' },
      { en: 'carbonic acid', cn: '碳酸' },
      { en: 'limewater test', cn: '石灰水检验' },
      { en: 'denser than air', cn: '密度比空气大' },
      { en: 'dry ice', cn: '干冰' },
      { en: 'greenhouse gas', cn: '温室气体' }
    ],
    lcTip: 'LC 必背检验："turns limewater milky / a white precipitate of calcium carbonate forms"。写化学方程式时状态符号 (aq)/(s) 要标。'
  },
  {
    id: 'c09', unit: 't2', book: '八年级', chapter: '主题2 · 二氧化碳',
    cn: '二氧化碳的实验室制法',
    en: 'Laboratory preparation of carbon dioxide',
    defCn: '实验室用大理石（或石灰石）与稀盐酸在常温下反应制取二氧化碳，用向上排空气法收集，因为二氧化碳密度比空气大且能溶于水。',
    defEn: 'Carbon dioxide is prepared in the laboratory by reacting marble or limestone with dilute hydrochloric acid at room temperature. It is collected by upward displacement of air because it is denser than air and soluble in water.',
    keywords: [
      { en: 'marble / limestone', cn: '大理石 / 石灰石' },
      { en: 'dilute hydrochloric acid', cn: '稀盐酸' },
      { en: 'upward displacement of air', cn: '向上排空气法' },
      { en: 'calcium carbonate', cn: '碳酸钙' },
      { en: 'effervescence', cn: '气泡 / 沸腾现象' }
    ],
    lcTip: 'LC 解释为何不用硫酸（forms insoluble calcium carbonate coating, reaction stops）和为何不用浓盐酸（gas contaminated with HCl vapour）——这是经典追问。'
  },
  {
    id: 'c10', unit: 't2', book: '八年级', chapter: '主题2 · 燃烧与灭火',
    cn: '燃烧的条件与灭火原理',
    en: 'Conditions for combustion and fire control',
    defCn: '燃烧需要三个条件：可燃物、与氧气接触、温度达到着火点。灭火只需破坏其中任一条件：清除可燃物、隔绝氧气或降温至着火点以下。',
    defEn: 'Combustion requires three conditions: a fuel, a supply of oxygen and a temperature above the ignition point. Fire can be controlled by removing any one of these: removing the fuel, excluding oxygen or cooling below the ignition temperature.',
    keywords: [
      { en: 'fuel', cn: '可燃物' },
      { en: 'ignition temperature', cn: '着火点' },
      { en: 'oxygen supply', cn: '氧气供应' },
      { en: 'fire extinguisher', cn: '灭火器' },
      { en: 'complete / incomplete combustion', cn: '完全 / 不完全燃烧' }
    ],
    lcTip: 'LC 用 "fire triangle" 图解释，三边写 fuel / oxygen / heat，灭火写 "remove one side of the triangle"。不完全燃烧产物 CO 有毒，是常考情境。'
  },
  // ---------- 主题3 物质的组成与结构 ----------
  {
    id: 'c11', unit: 't3', book: '八年级', chapter: '主题3 · 水',
    cn: '水的组成与电解',
    en: 'Composition of water and electrolysis',
    defCn: '水由氢、氧两种元素组成，化学式 H₂O。电解水时正极产生氧气、负极产生氢气，体积比约为 1:2，说明一个水分子由两个氢原子和一个氧原子构成。',
    defEn: 'Water is a compound of hydrogen and oxygen with the formula H₂O. During electrolysis, oxygen is produced at the anode (+) and hydrogen at the cathode (−), in a volume ratio of 1:2. This shows that each water molecule contains two hydrogen atoms and one oxygen atom.',
    keywords: [
      { en: 'electrolysis', cn: '电解' },
      { en: 'anode / cathode', cn: '阳极 / 阴极' },
      { en: 'hydrogen', cn: '氢气' },
      { en: 'oxygen', cn: '氧气' },
      { en: 'volume ratio', cn: '体积比' },
      { en: 'compound', cn: '化合物' }
    ],
    lcTip: 'LC 必背 "oxygen at the anode, hydrogen at the cathode; 1:2 ratio；hydrogen is twice the volume"。检验：hydrogen 用 burning splint（squeaky pop），oxygen 用 glowing splint。'
  },
  {
    id: 'c12', unit: 't3', book: '八年级', chapter: '主题3 · 净水',
    cn: '水的净化',
    en: 'Water treatment',
    defCn: '净水方法按净化程度由低到高为静置沉淀、吸附沉淀、过滤、吸附、蒸馏。过滤除去不溶性杂质，蒸馏可得到蒸馏水，净化程度最高。',
    defEn: 'Water is purified by sedimentation, filtration, adsorption and distillation. Filtration removes insoluble suspended solids; distillation produces distilled water and gives the purest product.',
    keywords: [
      { en: 'filtration', cn: '过滤' },
      { en: 'sedimentation', cn: '沉淀' },
      { en: 'adsorption', cn: '吸附' },
      { en: 'distillation', cn: '蒸馏' },
      { en: 'distilled water', cn: '蒸馏水' },
      { en: 'suspended solid', cn: '悬浮固体' }
    ],
    lcTip: 'LC Water 单元常考 water treatment 流程：screening → coagulation → filtration → chlorination。写每步目的，不要只列名词。'
  },
  {
    id: 'c13', unit: 't3', book: '八年级', chapter: '主题3 · 硬水与软水',
    cn: '硬水与软水',
    en: 'Hard and soft water',
    defCn: '硬水含较多可溶性钙、镁化合物，软水含较少或不含。硬水加肥皂水泡沫少、浮渣多；煮沸或蒸馏可软化硬水。硬水易形成水垢，影响锅炉安全。',
    defEn: 'Hard water contains dissolved calcium and magnesium ions; soft water does not. Hard water produces little lather and a scum with soap. It can be softened by boiling or distillation and forms scale in boilers.',
    keywords: [
      { en: 'hard / soft water', cn: '硬水 / 软水' },
      { en: 'calcium / magnesium ion', cn: '钙 / 镁离子' },
      { en: 'lather / scum', cn: '泡沫 / 浮渣' },
      { en: 'boiling', cn: '煮沸' },
      { en: 'scale', cn: '水垢' }
    ],
    lcTip: 'LC 高频："how to distinguish hard and soft water"——add soap solution, shake; soft = plenty of lather, hard = scum。写 test + observation + conclusion 三步。'
  },
  {
    id: 'c14', unit: 't3', book: '八年级', chapter: '主题3 · 微粒的性质',
    cn: '分子与原子',
    en: 'Molecules and atoms',
    defCn: '分子是保持物质化学性质的最小粒子，原子是化学变化中的最小粒子。化学变化中分子可分、原子不可再分，原子重新组合形成新分子。',
    defEn: 'A molecule is the smallest particle of a substance that retains its chemical properties; an atom is the smallest particle that takes part in a chemical reaction. In a chemical change, molecules are broken and atoms are rearranged to form new molecules, but atoms themselves are unchanged.',
    keywords: [
      { en: 'atom', cn: '原子' },
      { en: 'molecule', cn: '分子' },
      { en: 'element', cn: '元素' },
      { en: 'compound', cn: '化合物' },
      { en: 'rearrangement', cn: '重新组合' },
      { en: 'conservation of atoms', cn: '原子守恒' }
    ],
    lcTip: 'LC 必考 "explain what happens to atoms during a chemical reaction"——写 "bonds break and form; atoms are rearranged; no atoms are created or destroyed" 三点。'
  },
  {
    id: 'c15', unit: 't3', book: '八年级', chapter: '主题3 · 微粒的性质',
    cn: '微粒的基本性质',
    en: 'Properties of particles',
    defCn: '微粒质量和体积都很小，总在不断运动，微粒间有间隔。温度越高运动越快，间隔越大；气体间隔最大，固体最小。这些性质解释扩散、蒸发和热胀冷缩。',
    defEn: 'Particles are very small, are in constant random motion and have spaces between them. Higher temperatures increase the speed of particles and the spacing between them. These properties explain diffusion, evaporation and thermal expansion.',
    keywords: [
      { en: 'particle / kinetic theory', cn: '微粒 / 分子运动论' },
      { en: 'random motion', cn: '无规则运动' },
      { en: 'diffusion', cn: '扩散' },
      { en: 'space between particles', cn: '微粒间间隔' },
      { en: 'thermal expansion', cn: '热胀冷缩' }
    ],
    lcTip: 'LC Behaviour of Matter 用 kinetic theory 解释状态变化：写 particle spacing + arrangement + motion 三列对比 solid/liquid/gas，比纯文字容易拿分。'
  },
  {
    id: 'c16', unit: 't3', book: '八年级', chapter: '主题3 · 元素符号',
    cn: '元素与元素符号',
    en: 'Elements and chemical symbols',
    defCn: '元素是具有相同核电荷数（质子数）的一类原子的总称。元素符号第一个字母大写、第二个小写，如 H、O、C、Na、Cl。目前已知元素一百多种。',
    defEn: 'An element is a substance made of atoms with the same number of protons in the nucleus. Chemical symbols always begin with a capital letter and, if there is a second letter, it is lower case, e.g. H, O, Na, Cl.',
    keywords: [
      { en: 'element', cn: '元素' },
      { en: 'proton number / atomic number', cn: '质子数 / 原子序数' },
      { en: 'chemical symbol', cn: '元素符号' },
      { en: 'periodic table', cn: '元素周期表' },
      { en: 'group / period', cn: '族 / 周期' }
    ],
    lcTip: 'LC 符号书写大小写严格扣分：Co（钴）与 CO（一氧化碳）完全不同。周期表题用 group/period 定位，写全 "Group 1, Period 3"。'
  },
  {
    id: 'c17', unit: 't3', book: '八年级', chapter: '主题3 · 化学式',
    cn: '化学式',
    en: 'Chemical formulae',
    defCn: '化学式用元素符号和数字表示物质的组成，如 H₂O、CO₂、NaCl。元素符号右下角数字表示一个分子中该原子的个数；化学式前面的系数表示分子个数。',
    defEn: 'A chemical formula uses symbols and numbers to show the composition of a substance, e.g. H₂O, CO₂, NaCl. The subscript shows the number of atoms of that element in one molecule; the number in front of a formula is the coefficient, showing how many molecules are involved.',
    keywords: [
      { en: 'chemical formula', cn: '化学式' },
      { en: 'subscript', cn: '下标' },
      { en: 'coefficient', cn: '系数' },
      { en: 'molecular formula', cn: '分子式' },
      { en: 'empirical formula', cn: '最简式 / 实验式' }
    ],
    lcTip: 'LC 必区分 subscript 与 coefficient：2H₂O 中 2（coefficient）= 2 个水分子，下标 2 = 每个分子 2 个氢原子。计算题数原子个数时两者要相乘。'
  },
  {
    id: 'c18', unit: 't3', book: '八年级', chapter: '主题3 · 化合价',
    cn: '化合价',
    en: 'Valency and combining capacity',
    defCn: '化合价表示原子在形成化合物时得失电子或共用电子对的数目，有正价和负价。化合物中各元素正负化合价代数和为零，据此可写出化学式。',
    defEn: 'Valency is the combining capacity of an atom, shown by the number of electrons it loses, gains or shares. Elements have positive or negative valencies. In a compound, the total positive and negative valencies balance to zero, which allows formulae to be deduced.',
    keywords: [
      { en: 'valency', cn: '化合价' },
      { en: 'oxidation number / state', cn: '氧化数' },
      { en: 'combining capacity', cn: '化合能力' },
      { en: 'ion', cn: '离子' },
      { en: 'charge', cn: '电荷' }
    ],
    lcTip: 'LC 用 oxidation number 更多。规则题：O 通常 −2、H 通常 +1、单质为 0；写答案时说明 "the sum of oxidation numbers in a compound is zero"。'
  },
  // ---------- 主题4 物质的化学变化（上） ----------
  {
    id: 'c19', unit: 't4', book: '八年级', chapter: '主题4 · 质量守恒定律',
    cn: '质量守恒定律',
    en: 'Law of conservation of mass',
    defCn: '参加化学反应的各物质质量总和等于反应后生成的各物质质量总和。实质是反应前后原子的种类、数目和质量都不改变，只是重新组合。',
    defEn: 'The total mass of the reactants equals the total mass of the products in a chemical reaction. This is because atoms are neither created nor destroyed: their type, number and mass remain unchanged and they are only rearranged.',
    keywords: [
      { en: 'conservation of mass', cn: '质量守恒' },
      { en: 'reactant', cn: '反应物' },
      { en: 'product', cn: '生成物' },
      { en: 'closed system', cn: '封闭体系' },
      { en: 'atom conservation', cn: '原子守恒' }
    ],
    lcTip: 'LC 解释题必须落到原子层面："atoms are rearranged, not created or destroyed"。涉及气体参加/生成的实验要指出须在 closed system 中做，否则称量结果偏小或偏大。'
  },
  {
    id: 'c20', unit: 't4', book: '八年级', chapter: '主题4 · 化学方程式',
    cn: '化学方程式',
    en: 'Chemical equations',
    defCn: '化学方程式用化学式表示化学反应，能表明反应物、生成物、反应条件和各物质间的质量关系。书写步骤：写化学式→配平→注明条件与气体/沉淀符号。',
    defEn: 'A chemical equation uses formulae to represent a reaction, showing the reactants, products, conditions and the relative amounts of each substance. To write one: write the correct formulae, balance the equation, then add reaction conditions and state symbols.',
    keywords: [
      { en: 'chemical equation', cn: '化学方程式' },
      { en: 'balanced equation', cn: '配平的化学方程式' },
      { en: 'state symbol (s, l, g, aq)', cn: '状态符号' },
      { en: 'condition', cn: '反应条件' },
      { en: 'stoichiometry', cn: '化学计量' }
    ],
    lcTip: 'LC 配平方程式是必考分：先配 C、H，最后配 O；写状态符号 (s)/(l)/(g)/(aq)。上海新教改"弱化方程式背诵"，但 LC 强调精确——这是两边最大的差异，要重点练。'
  },
  {
    id: 'c21', unit: 't4', book: '八年级', chapter: '主题4 · 基本反应类型',
    cn: '化合反应与分解反应',
    en: 'Combination and decomposition reactions',
    defCn: '化合反应是由两种或两种以上物质生成一种物质的反应（A+B→AB）；分解反应是由一种物质生成两种或两种以上物质的反应（AB→A+B）。',
    defEn: 'A combination reaction is one in which two or more substances join to form a single product (A + B → AB). A decomposition reaction is one in which a single compound breaks down into two or more simpler substances (AB → A + B).',
    keywords: [
      { en: 'combination / synthesis reaction', cn: '化合反应' },
      { en: 'decomposition reaction', cn: '分解反应' },
      { en: 'thermal decomposition', cn: '热分解' },
      { en: 'product / reactant', cn: '生成物 / 反应物' }
    ],
    lcTip: 'LC 归类题看"反应物个数 + 生成物个数"即可：多变一 = combination，一变多 = decomposition。举例要配平：2Mg + O₂ → 2MgO；2KMnO₄ → K₂MnO₄ + MnO₂ + O₂。'
  },
  {
    id: 'c22', unit: 't4', book: '八年级', chapter: '主题4 · 基本反应类型',
    cn: '置换反应与复分解反应',
    en: 'Displacement and double-decomposition reactions',
    defCn: '置换反应是一种单质与一种化合物反应生成另一种单质和另一种化合物（A+BC→AC+B）；复分解反应是两种化合物相互交换成分生成两种新化合物（AB+CD→AD+CB），常在溶液中进行，生成沉淀、气体或水时发生。',
    defEn: 'In a displacement reaction a more reactive element replaces a less reactive one in a compound (A + BC → AC + B). In a double-decomposition reaction two compounds exchange ions to form two new compounds (AB + CD → AD + CB); it occurs when a precipitate, gas or water is formed.',
    keywords: [
      { en: 'displacement reaction', cn: '置换反应' },
      { en: 'double decomposition / precipitation', cn: '复分解反应' },
      { en: 'reactivity series', cn: '金属活动性顺序' },
      { en: 'neutralisation', cn: '中和反应' },
      { en: 'spectator ion', cn: '旁观离子' }
    ],
    lcTip: 'LC 判断置换能否发生用 reactivity series：more reactive metal displaces a less reactive one from its salt solution。写 ionic equation 时删掉 spectator ions 是加分点。'
  },
  {
    id: 'c23', unit: 't4', book: '八年级', chapter: '主题4 · 氧化与还原',
    cn: '氧化反应',
    en: 'Oxidation and reduction',
    defCn: '物质与氧发生的反应叫氧化反应；含氧化合物里的氧被夺去的反应叫还原反应。从电子角度看，氧化是失去电子，还原是得到电子，两者总是同时发生。',
    defEn: 'Oxidation is the loss of electrons (or gain of oxygen) by a substance; reduction is the gain of electrons (or loss of oxygen). Oxidation and reduction always occur together in a redox reaction.',
    keywords: [
      { en: 'oxidation', cn: '氧化' },
      { en: 'reduction', cn: '还原' },
      { en: 'redox reaction', cn: '氧化还原反应' },
      { en: 'oxidising / reducing agent', cn: '氧化剂 / 还原剂' },
      { en: 'electron transfer', cn: '电子转移' }
    ],
    lcTip: 'LC Redox 用 "OIL RIG"（Oxidation Is Loss, Reduction Is Gain of electrons）记忆。判断题要写清 "X is oxidised because it loses electrons"。'
  },
  {
    id: 'c24', unit: 't4', book: '八年级', chapter: '主题4 · 定量关系',
    cn: '相对原子质量与相对分子质量',
    en: 'Relative atomic and molecular mass',
    defCn: '相对原子质量是以碳-12原子质量的 1/12 为标准，其他原子质量与该标准的比值。相对分子质量等于化学式中各原子相对原子质量的总和，没有单位。',
    defEn: 'Relative atomic mass (Ar) is the average mass of an atom compared with one twelfth of the mass of a carbon-12 atom. Relative molecular mass (Mr) is the sum of the relative atomic masses of all atoms in a molecule; both have no units.',
    keywords: [
      { en: 'relative atomic mass (Ar)', cn: '相对原子质量' },
      { en: 'relative molecular mass (Mr)', cn: '相对分子质量' },
      { en: 'carbon-12 standard', cn: '碳-12 标准' },
      { en: 'isotope', cn: '同位素' },
      { en: 'molar mass', cn: '摩尔质量' }
    ],
    lcTip: 'LC 计算题务必区分 Ar / Mr / molar mass，后两者数值相同但单位不同（Mr 无单位，molar mass 单位 g/mol）。写计算步骤：先列式子再代入，最后写单位。'
  },
  {
    id: 'c25', unit: 't4', book: '八年级', chapter: '主题4 · 定量关系',
    cn: '化合物中元素质量分数',
    en: 'Percentage composition by mass',
    defCn: '化合物中某元素的质量分数 = 该元素的相对原子质量×原子个数 ÷ 化合物的相对分子质量 × 100%。',
    defEn: 'The percentage by mass of an element in a compound is calculated as (Ar × number of atoms of that element) ÷ Mr of the compound × 100.',
    keywords: [
      { en: 'percentage composition', cn: '质量分数' },
      { en: 'mass of element', cn: '元素质量' },
      { en: 'Mr', cn: '相对分子质量' },
      { en: 'stoichiometric calculation', cn: '化学计量计算' }
    ],
    lcTip: 'LC 常与 empirical formula 结合考：先算各元素质量百分比 → 假设 100 g → 求 mol 比 → 化简整数比。步骤写全，中间结果保留位数。'
  },
  // ---------- LC 衔接专题 ----------
  {
    id: 'c26', unit: 'lc', book: '衔接', chapter: 'LC Strand 1 · Atomic structure',
    cn: '原子结构',
    en: 'Atomic structure',
    defCn: '原子由带正电的原子核和核外带负电的电子构成，原子核由质子和中子组成。质子数决定元素种类，质子数=核电荷数=核外电子数（原子呈电中性）。电子分层排布，如 2,8,8。',
    defEn: 'An atom consists of a small, positively charged nucleus containing protons and neutrons, surrounded by negatively charged electrons in energy levels. The number of protons determines the element; in a neutral atom the number of protons equals the number of electrons. Electrons occupy shells, e.g. 2,8,8.',
    keywords: [
      { en: 'proton / neutron / electron', cn: '质子 / 中子 / 电子' },
      { en: 'nucleus', cn: '原子核' },
      { en: 'energy level / shell', cn: '电子层' },
      { en: 'atomic number / mass number', cn: '原子序数 / 质量数' },
      { en: 'isotope', cn: '同位素' },
      { en: 'electronic configuration', cn: '电子排布' }
    ],
    lcTip: 'LC 必写 electronic configuration 如 2,8,1；题问 "why are Group 1 elements reactive?" 答 "one outer electron, easily lost to achieve a full outer shell"。'
  },
  {
    id: 'c27', unit: 'lc', book: '衔接', chapter: 'LC Strand 1 · Bonding',
    cn: '离子键与共价键',
    en: 'Ionic and covalent bonding',
    defCn: '离子键是阴阳离子间的静电吸引，通常形成于金属与非金属之间；共价键是原子间共用电子对形成的作用，通常形成于非金属之间。离子化合物熔沸点高、熔融或溶于水时导电；共价化合物多不导电。',
    defEn: 'An ionic bond is the electrostatic attraction between oppositely charged ions, usually formed between a metal and a non-metal by electron transfer. A covalent bond is a shared pair of electrons between two non-metal atoms. Ionic compounds have high melting points and conduct when molten or dissolved; covalent compounds generally do not conduct.',
    keywords: [
      { en: 'ionic bond', cn: '离子键' },
      { en: 'covalent bond', cn: '共价键' },
      { en: 'electron transfer / sharing', cn: '电子转移 / 共用' },
      { en: 'electrostatic attraction', cn: '静电吸引' },
      { en: 'ion', cn: '离子' },
      { en: 'lone pair', cn: '孤对电子' },
      { en: 'dative covalent bond', cn: '配位键' }
    ],
    lcTip: 'LC Strand 2 Bonding 高频：比较 ionic vs covalent 用表格（particles / bonding / mp / conductivity / solubility）。画图题用 dot-and-cross diagram，注意标出电荷。'
  },
  {
    id: 'c28', unit: 'lc', book: '衔接', chapter: 'LC Strand 1 · The mole',
    cn: '物质的量与摩尔',
    en: 'The mole and amount of substance',
    defCn: '摩尔是物质的量的单位，1 mol 物质含约 6.02×10²³ 个微粒（阿伏伽德罗常数）。物质的量 n = 质量 m ÷ 摩尔质量 M，单位 mol。',
    defEn: 'The mole is the SI unit for the amount of substance. One mole contains 6.02 × 10²³ particles (the Avogadro constant). The number of moles n = mass m ÷ molar mass M, where M is in g/mol.',
    keywords: [
      { en: 'mole (mol)', cn: '摩尔' },
      { en: 'Avogadro constant', cn: '阿伏伽德罗常数' },
      { en: 'molar mass', cn: '摩尔质量' },
      { en: 'amount of substance', cn: '物质的量' },
      { en: 'stoichiometry', cn: '化学计量' },
      { en: 'mole ratio', cn: '物质的量之比' }
    ],
    lcTip: 'LC 化学计算核心工具：n = m/M；用方程式的系数比（mole ratio）换算。答题必须写 "n = m/M" 和单位，只写答案不给过程会扣分。'
  },
  {
    id: 'c29', unit: 'lc', book: '衔接', chapter: 'LC Strand 4 · Acids and bases',
    cn: '酸、碱与中和反应',
    en: 'Acids, bases and neutralisation',
    defCn: '酸在水溶液中电离产生 H⁺，碱产生 OH⁻。酸与碱反应生成盐和水，称为中和反应。pH 小于 7 为酸性，等于 7 为中性，大于 7 为碱性。',
    defEn: 'An acid produces H⁺(aq) ions in water; a base produces OH⁻(aq) ions. Neutralisation is the reaction between an acid and a base to form a salt and water. A pH below 7 is acidic, 7 is neutral and above 7 is alkaline.',
    keywords: [
      { en: 'acid / base / alkali', cn: '酸 / 碱 / 可溶性碱' },
      { en: 'neutralisation', cn: '中和反应' },
      { en: 'salt', cn: '盐' },
      { en: 'pH scale', cn: 'pH 标度' },
      { en: 'indicator', cn: '指示剂' },
      { en: 'H⁺ / OH⁻ ion', cn: '氢离子 / 氢氧根' }
    ],
    lcTip: 'LC 必背 ionic equation：H⁺(aq) + OH⁻(aq) → H₂O(l)。滴定时写 "end point indicated by colour change of phenolphthalein/methyl orange"。'
  },
  {
    id: 'c30', unit: 'lc', book: '衔接', chapter: 'LC Strand 4 · Volumetric analysis',
    cn: '滴定与浓度计算',
    en: 'Volumetric analysis and concentration',
    defCn: '滴定是用已知浓度的溶液逐滴加入待测液，直到指示剂变色达到终点，从而求出未知浓度。浓度 c = 物质的量 n ÷ 体积 V（单位 mol/L）。',
    defEn: 'Titration is a technique in which a solution of known concentration is added to a measured volume of another solution until the end point is reached, allowing the unknown concentration to be calculated. Concentration c = number of moles n ÷ volume V (mol/L).',
    keywords: [
      { en: 'titration', cn: '滴定' },
      { en: 'end point', cn: '终点' },
      { en: 'indicator', cn: '指示剂' },
      { en: 'standard solution', cn: '标准溶液' },
      { en: 'concentration (mol/L)', cn: '浓度' },
      { en: 'burette / pipette', cn: '滴定管 / 移液管' }
    ],
    lcTip: 'LC 实验题常考操作细节：rinse burette with the acid, read at eye level from the bottom of the meniscus, add dropwise near the end point, repeat to get concordant titres。'
  },
  {
    id: 'c31', unit: 'lc', book: '衔接', chapter: 'LC Strand 3 · Rates of reaction',
    cn: '化学反应速率',
    en: 'Rates of reaction',
    defCn: '反应速率表示单位时间内反应物或生成物浓度的变化。升高温度、增大浓度、增大接触面积、使用催化剂和使用更高freq的光都能加快反应；本质是有效碰撞次数增加。',
    defEn: 'The rate of reaction is the change in concentration of a reactant or product per unit time. Rate increases with higher temperature, higher concentration, greater surface area and the presence of a catalyst, because these increase the frequency of successful collisions.',
    keywords: [
      { en: 'rate of reaction', cn: '反应速率' },
      { en: 'collision theory', cn: '碰撞理论' },
      { en: 'activation energy', cn: '活化能' },
      { en: 'catalyst', cn: '催化剂' },
      { en: 'surface area', cn: '接触面积' },
      { en: 'successful collision', cn: '有效碰撞' }
    ],
    lcTip: 'LC 解释影响因素必须用 collision theory 语言："more particles per unit volume → more frequent collisions → faster rate"。只写 "more reactive" 不给分。'
  },
  {
    id: 'c32', unit: 'lc', book: '衔接', chapter: 'LC Strand 3 · Equilibrium',
    cn: '化学平衡',
    en: 'Chemical equilibrium',
    defCn: '可逆反应中正反应速率与逆反应速率相等、各物质浓度保持不变时达到动态平衡。改变浓度、温度或压强会使平衡移动（勒夏特列原理）。',
    defEn: 'Dynamic equilibrium is reached in a reversible reaction when the forward and reverse rates are equal and the concentrations of all species remain constant. Changes in concentration, temperature or pressure shift the equilibrium according to Le Chatelier\'s principle.',
    keywords: [
      { en: 'dynamic equilibrium', cn: '动态平衡' },
      { en: 'reversible reaction', cn: '可逆反应' },
      { en: 'Le Chatelier\'s principle', cn: '勒夏特列原理' },
      { en: 'forward / reverse reaction', cn: '正 / 逆反应' },
      { en: 'yield', cn: '产率' }
    ],
    lcTip: 'LC 答题模板："the system opposes the change"——先说移动方向，再说对产率的影响。温度影响要结合反应是 exothermic 还是 endothermic。'
  },
  {
    id: 'c33', unit: 'lc', book: '衔接', chapter: 'LC Strand 2 · Gases',
    cn: '气体与气体定律',
    en: 'Gases and the gas laws',
    defCn: '根据分子运动论，气体分子间距离大、运动快，压强来自分子与器壁的碰撞。玻意耳定律：温度不变时压强与体积成反比；查理定律：压强不变时体积与热力学温度成正比。',
    defEn: 'According to kinetic theory, gas particles are far apart and move rapidly; pressure results from collisions with the container walls. Boyle\'s law states that at constant temperature pressure is inversely proportional to volume; Charles\' law states that at constant pressure volume is proportional to absolute temperature.',
    keywords: [
      { en: 'kinetic theory', cn: '分子运动论' },
      { en: 'Boyle\'s law', cn: '玻意耳定律' },
      { en: 'Charles\' law', cn: '查理定律' },
      { en: 'absolute temperature (K)', cn: '热力学温度' },
      { en: 'pressure', cn: '压强' }
    ],
    lcTip: 'LC 计算用 P₁V₁/T₁ = P₂V₂/T₂，温度必须换算为 Kelvin（K = °C + 273）。写答案时说明 "at constant temperature / pressure" 的前提条件。'
  },
  {
    id: 'c34', unit: 'lc', book: '衔接', chapter: 'LC Strand 4 · Organic chemistry',
    cn: '有机物入门',
    en: 'Introduction to organic chemistry',
    defCn: '有机物是含碳化合物（少数简单含碳化合物除外）。烃只含碳和氢，分烷烃、烯烃和炔烃；同系物结构相似、组成相差一个或多个 CH₂，化学性质相似。',
    defEn: 'Organic compounds contain carbon (with a few exceptions). Hydrocarbons contain only carbon and hydrogen and are classified as alkanes, alkenes or alkynes. A homologous series has the same functional group and general formula, with successive members differing by CH₂.',
    keywords: [
      { en: 'organic compound', cn: '有机物' },
      { en: 'hydrocarbon', cn: '烃' },
      { en: 'alkane / alkene / alkyne', cn: '烷烃 / 烯烃 / 炔烃' },
      { en: 'homologous series', cn: '同系物' },
      { en: 'functional group', cn: '官能团' },
      { en: 'isomer', cn: '同分异构体' },
      { en: 'IUPAC nomenclature', cn: 'IUPAC 命名' }
    ],
    lcTip: 'LC 命名题按 IUPAC：选最长碳链 → 编号（取代基位次最小）→ 写前缀+词根+后缀。烯烃用 bromine water 褪色检验（addition 反应）。'
  }
];

module.exports = { units, points };
