/**
 * data-bio.js —— 上海新教改（沪教版 2024 五四学制）七 + 八年级生物知识点
 *
 * 覆盖范围：
 *   七年级上册  序章 走进生命世界 + 第一单元 生物体的结构层次（1–2 章）
 *               第二单元 植物的生活（3–5 章）
 *   七年级下册  第三单元 生物的多样性（6–9 章）
 *               第四单元 生态系统（10–11 章）
 *   八年级上册  第五单元 人体所需物质的保障体系（12–15 章）
 *               第六单元 人体生命活动的调节（16–18 章）
 *   八年级下册  第七单元 人体健康与健康保障（19–21 章）
 *               第八单元 遗传与进化（22–24 章）
 *
 * 每条字段：
 *   id       全局唯一，b 前缀
 *   book     '八上' / '八下' / '衔接'（衔接 = 上海初二不单独教、但 Leaving Cert 必考）
 *   chapter  教材章节
 *   cn/en    中英文术语（en 用爱尔兰 Leaving Certificate 规范用词）
 *   defCn    中文解释
 *   defEn    英文解释（LC 定义风格：一句定义 + 关键词）
 *   keywords LC 关键词 [{ en, cn }]
 *   lcTip    Leaving Certificate 答题/表述方法提示
 *
 * 英式拼写按爱尔兰习惯（haemoglobin / colour / organisation 等）。
 */

const units = [
  { key: 'u0',  label: '序章 走进生命世界', book: '七上' },
  { key: 'u1',  label: '第1章 生物体的基本单位', book: '七上' },
  { key: 'u2',  label: '第2章 生物体的结构', book: '七上' },
  { key: 'u3',  label: '第3章 绿色开花植物的生命周期', book: '七上' },
  { key: 'u4',  label: '第4章 植物的物质运输与水循环', book: '七上' },
  { key: 'u5',  label: '第5章 植物的生命活动与碳氧平衡', book: '七上' },
  { key: 'u6',  label: '第6章 生物的分类', book: '七下' },
  { key: 'u7',  label: '第7章 藻类、植物与动物', book: '七下' },
  { key: 'u8',  label: '第8章 生物圈中的微生物', book: '七下' },
  { key: 'u9',  label: '第9章 生物的多样性及其保护', book: '七下' },
  { key: 'u10', label: '第10章 生物与环境', book: '七下' },
  { key: 'u11', label: '第11章 环境保护与生态安全', book: '七下' },
  { key: 'u12', label: '第12章 消化系统与营养摄取', book: '八上' },
  { key: 'u13', label: '第13章 血液循环系统与物质运输', book: '八上' },
  { key: 'u14', label: '第14章 呼吸系统与气体交换', book: '八上' },
  { key: 'u15', label: '第15章 泌尿系统与废物排泄', book: '八上' },
  { key: 'u16', label: '第16章 神经系统与神经调节', book: '八上' },
  { key: 'u17', label: '第17章 内分泌系统与激素调节', book: '八上' },
  { key: 'u18', label: '第18章 免疫系统与免疫防御', book: '八上' },
  { key: 'u19', label: '第19章 生活方式与人体健康', book: '八下' },
  { key: 'u20', label: '第20章 疾病预防与人体健康', book: '八下' },
  { key: 'u21', label: '第21章 医疗措施与人体健康', book: '八下' },
  { key: 'u22', label: '第22章 生物的生殖与延续', book: '八下' },
  { key: 'u23', label: '第23章 生物的遗传与变异', book: '八下' },
  { key: 'u24', label: '第24章 生命的起源与进化', book: '八下' },
  { key: 'lc',  label: 'LC 衔接专题', book: '衔接' }
];

const points = [
  // ---------- 第五单元 人体所需物质的保障体系 ----------
  {
    id: 'b01', unit: 'u12', book: '八上', chapter: '第12章 第1节 食物中的营养物质',
    cn: '食物中的营养物质',
    en: 'Nutrients and a balanced diet',
    defCn: '食物含糖类、脂肪、蛋白质、水、无机盐和维生素六大类营养素。糖类是主要供能物质，蛋白质用于生长和修复，维生素和无机盐调节生命活动，水是所有化学反应的介质。',
    defEn: 'A nutrient is a chemical substance in food that is needed for energy, growth, repair or the regulation of body processes. The six classes are carbohydrates, lipids, proteins, water, vitamins and minerals. Carbohydrates are the main source of energy; proteins are needed for growth and repair of tissues.',
    keywords: [
      { en: 'nutrient', cn: '营养素' },
      { en: 'carbohydrate', cn: '糖类' },
      { en: 'protein', cn: '蛋白质' },
      { en: 'lipid / fat', cn: '脂肪' },
      { en: 'vitamin', cn: '维生素' },
      { en: 'mineral ion', cn: '无机盐' },
      { en: 'balanced diet', cn: '平衡膳食' }
    ],
    lcTip: 'LC 定义题要给全关键词：class（类别）+ function（功能）+ example（例子）。回答 "What is a balanced diet?" 时须写 "the correct proportions of all the food groups" 并点出 energy 与 health 两个得分点。'
  },
  {
    id: 'b02', unit: 'u12', book: '八上', chapter: '第12章 第2节 食物的消化和吸收',
    cn: '消化与吸收',
    en: 'Digestion and absorption',
    defCn: '消化是把大分子食物分解成可吸收小分子的过程，包括物理性消化（咀嚼、搅拌）和化学性消化（酶催化）。吸收是营养物质通过小肠绒毛进入血液和淋巴的过程。',
    defEn: 'Digestion is the mechanical and chemical breakdown of large, complex food molecules into smaller, soluble molecules that can be absorbed. Absorption is the passage of these digested nutrients through the wall of the small intestine into the blood or lymph.',
    keywords: [
      { en: 'digestion', cn: '消化' },
      { en: 'absorption', cn: '吸收' },
      { en: 'mechanical / physical digestion', cn: '物理性消化' },
      { en: 'chemical digestion', cn: '化学性消化' },
      { en: 'alimentary canal', cn: '消化道' },
      { en: 'small intestine', cn: '小肠' },
      { en: 'villus (plural villi)', cn: '小肠绒毛' }
    ],
    lcTip: 'LC 常考 "trace the journey of a meal"——用 numbered bullet points 按顺序写 mouth → oesophagus → stomach → small intestine → large intestine，每站写出发生了什么，不要写成长段落。'
  },
  {
    id: 'b03', unit: 'u12', book: '八上', chapter: '第12章 · 教材外延伸（酶）',
    cn: '酶',
    en: 'Enzymes',
    defCn: '酶是活细胞产生的生物催化剂，绝大多数是蛋白质。它能降低反应活化能、加快反应速率，而自身在反应前后不变。酶具有专一性，受温度和 pH 影响，高温会使酶变性失活。',
    defEn: 'An enzyme is a biological catalyst, usually a protein, that speeds up a chemical reaction in a living cell by lowering the activation energy, without being used up. Enzymes are specific to their substrate and are affected by temperature and pH; high temperatures denature the enzyme.',
    keywords: [
      { en: 'enzyme', cn: '酶' },
      { en: 'biological catalyst', cn: '生物催化剂' },
      { en: 'activation energy', cn: '活化能' },
      { en: 'substrate', cn: '底物' },
      { en: 'active site', cn: '活性位点' },
      { en: 'denaturation', cn: '变性' },
      { en: 'optimum temperature / pH', cn: '最适温度 / pH' }
    ],
    lcTip: 'LC Unit 2 Enzymes 是必考。定义必须含 "biological catalyst" + "not used up" + "lowers activation energy" 三点。画温度/pH 对酶活性影响曲线时要标轴、标 optimum、解释下降段是 denaturation。'
  },
  {
    id: 'b04', unit: 'u13', book: '八上', chapter: '第13章 第1节 血液的组成和功能',
    cn: '血液的组成',
    en: 'Composition of blood',
    defCn: '血液由血浆和血细胞组成。血浆运输营养物质、二氧化碳和尿素；红细胞含血红蛋白运输氧；白细胞吞噬病菌起防御作用；血小板参与凝血。',
    defEn: 'Blood is a fluid tissue consisting of plasma and blood cells. Plasma transports nutrients, carbon dioxide and urea. Red blood cells contain haemoglobin and carry oxygen; white blood cells defend the body against pathogens; platelets are involved in clotting.',
    keywords: [
      { en: 'plasma', cn: '血浆' },
      { en: 'red blood cell (erythrocyte)', cn: '红细胞' },
      { en: 'haemoglobin', cn: '血红蛋白' },
      { en: 'white blood cell (leucocyte)', cn: '白细胞' },
      { en: 'platelet', cn: '血小板' },
      { en: 'clotting', cn: '凝血' }
    ],
    lcTip: 'LC 常以表格题考 "structure + function of blood components"。写红细胞适应特征时列：biconcave shape（表面积大）、no nucleus（多装血红蛋白）、haemoglobin（结合氧）——三点缺一扣分。'
  },
  {
    id: 'b05', unit: 'u13', book: '八上', chapter: '第13章 第2节 血管与心脏',
    cn: '血管与心脏',
    en: 'Blood vessels and the heart',
    defCn: '动脉把血液从心脏送出，管壁厚、弹性大；静脉把血液送回心脏，管壁薄、有静脉瓣；毛细血管管壁仅一层细胞，是物质交换的场所。心脏有四个腔，左心室壁最厚。',
    defEn: 'Arteries carry blood away from the heart and have thick, elastic walls; veins carry blood towards the heart and have thinner walls with valves; capillaries are one cell thick and are the site of exchange of materials. The mammalian heart has four chambers and the left ventricle has the thickest wall.',
    keywords: [
      { en: 'artery', cn: '动脉' },
      { en: 'vein', cn: '静脉' },
      { en: 'capillary', cn: '毛细血管' },
      { en: 'valve', cn: '瓣膜' },
      { en: 'ventricle / atrium', cn: '心室 / 心房' },
      { en: 'left ventricle', cn: '左心室' },
      { en: 'aorta', cn: '主动脉' }
    ],
    lcTip: 'LC 高频："Explain why the left ventricle has a thicker wall than the right"——答 "it pumps blood at higher pressure to the whole body (systemic circulation), while the right only pumps to the lungs"。功能与结构要对应。'
  },
  {
    id: 'b06', unit: 'u13', book: '八上', chapter: '第13章 第3节 血液循环与物质运输',
    cn: '体循环与肺循环',
    en: 'Systemic and pulmonary circulation',
    defCn: '体循环：左心室→主动脉→全身毛细血管→上下腔静脉→右心房，把氧和营养物质送给组织并带走二氧化碳。肺循环：右心室→肺动脉→肺部毛细血管→肺静脉→左心房，在肺泡完成气体交换。',
    defEn: 'Systemic circulation carries oxygenated blood from the left ventricle to all body tissues and returns deoxygenated blood to the right atrium. Pulmonary circulation carries deoxygenated blood from the right ventricle to the lungs, where it becomes oxygenated, and returns it to the left atrium.',
    keywords: [
      { en: 'systemic circulation', cn: '体循环' },
      { en: 'pulmonary circulation', cn: '肺循环' },
      { en: 'oxygenated / deoxygenated blood', cn: '动脉血 / 静脉血' },
      { en: 'pulmonary artery / vein', cn: '肺动脉 / 肺静脉' },
      { en: 'double circulation', cn: '双循环' }
    ],
    lcTip: 'LC 注意易错点：pulmonary artery 里流的是 deoxygenated blood（唯一含静脉血的动脉）。答题写 pathway 用箭头串联，名词用 LC 术语，不要中英混写。'
  },
  {
    id: 'b07', unit: 'u14', book: '八上', chapter: '第14章 第1节 呼吸与呼吸系统',
    cn: '呼吸系统',
    en: 'The human breathing system',
    defCn: '呼吸系统由鼻、咽、喉、气管、支气管和肺组成。气管壁有软骨环保持通畅，内表面纤毛和黏液可过滤异物；肺由大量肺泡构成，是气体交换的场所。',
    defEn: 'The human breathing system consists of the nose, trachea, bronchi, bronchioles and alveoli. Cartilage rings keep the trachea open; cilia and mucus trap dust and pathogens. Gas exchange occurs in the alveoli of the lungs.',
    keywords: [
      { en: 'trachea', cn: '气管' },
      { en: 'bronchus / bronchiole', cn: '支气管 / 细支气管' },
      { en: 'alveolus (plural alveoli)', cn: '肺泡' },
      { en: 'cartilage ring', cn: '软骨环' },
      { en: 'cilia', cn: '纤毛' },
      { en: 'mucus', cn: '黏液' },
      { en: 'diaphragm', cn: '膈' }
    ],
    lcTip: 'LC Unit 3 Human Breathing 常画呼吸系统图并标 5 个结构。务必写 adaptation：alveoli 数量多（large surface area）、壁薄（one cell thick）、湿润（moist）、毛细血管丰富（good blood supply）。'
  },
  {
    id: 'b08', unit: 'u14', book: '八上', chapter: '第14章 第2节 呼吸运动与气体交换',
    cn: '呼吸运动与气体交换',
    en: 'Breathing and gas exchange',
    defCn: '吸气时肋间肌和膈肌收缩，胸廓扩大、肺内气压降低，空气进入；呼气时肌肉舒张，空气排出。肺泡与血液间的气体交换靠扩散完成：氧从肺泡进入血液，二氧化碳从血液进入肺泡。',
    defEn: 'During inspiration, the intercostal muscles and diaphragm contract, increasing the volume of the thorax and lowering the pressure so air enters the lungs. During expiration, these muscles relax and air leaves. Gas exchange in the alveoli occurs by diffusion: oxygen moves into the blood and carbon dioxide moves out.',
    keywords: [
      { en: 'inspiration / inhalation', cn: '吸气' },
      { en: 'expiration / exhalation', cn: '呼气' },
      { en: 'intercostal muscle', cn: '肋间肌' },
      { en: 'diffusion', cn: '扩散' },
      { en: 'concentration gradient', cn: '浓度梯度' },
      { en: 'partial pressure', cn: '分压' }
    ],
    lcTip: 'LC 解释气体交换必须写 "down a concentration gradient" 和 "from high to low concentration"，只写 "oxygen goes in" 不给分。扩散距离的关键词：short diffusion distance / steep gradient。'
  },
  {
    id: 'b09', unit: 'u15', book: '八上', chapter: '第15章 第1节 泌尿系统的结构',
    cn: '泌尿系统',
    en: 'The urinary system',
    defCn: '泌尿系统由肾、输尿管、膀胱和尿道组成。肾是形成尿液的器官，基本单位是肾单位，包括肾小球、肾小囊和肾小管。',
    defEn: 'The urinary system consists of the kidneys, ureters, bladder and urethra. The kidney produces urine; its functional unit is the nephron, which is made up of the glomerulus, Bowman\'s capsule and the renal tubule.',
    keywords: [
      { en: 'kidney', cn: '肾' },
      { en: 'nephron', cn: '肾单位' },
      { en: 'glomerulus', cn: '肾小球' },
      { en: 'Bowman\'s capsule', cn: '肾小囊' },
      { en: 'renal tubule', cn: '肾小管' },
      { en: 'ureter / bladder / urethra', cn: '输尿管 / 膀胱 / 尿道' }
    ],
    lcTip: 'LC Excretion and Homeostasis 要求会画 nephron 并标注。肾单位结构名用英式写法，Bowman\'s capsule 所有格撇号别漏。'
  },
  {
    id: 'b10', unit: 'u15', book: '八上', chapter: '第15章 第2节 代谢产物的排泄',
    cn: '尿的形成与排泄',
    en: 'Urine formation and excretion',
    defCn: '尿的形成包括肾小球的滤过作用和肾小管的重吸收作用。血液经肾小球滤过形成原尿，原尿中的全部葡萄糖、大部分水和部分无机盐被肾小管重吸收回血液，剩余液体形成尿液。排泄是排出代谢废物的过程。',
    defEn: 'Urine formation involves ultrafiltration in the glomerulus and selective reabsorption in the renal tubule. Small molecules are filtered from the blood into Bowman\'s capsule; glucose, most water and some ions are then reabsorbed into the blood. Excretion is the removal of metabolic waste products such as urea from the body.',
    keywords: [
      { en: 'ultrafiltration', cn: '滤过作用' },
      { en: 'selective reabsorption', cn: '重吸收作用' },
      { en: 'glomerular filtrate', cn: '原尿' },
      { en: 'urea', cn: '尿素' },
      { en: 'excretion', cn: '排泄' },
      { en: 'osmotic balance', cn: '渗透平衡' }
    ],
    lcTip: 'LC 高频题："explain how the kidney regulates water balance"——必须写 ADH（antidiuretic hormone）、collecting duct、more/less water reabsorbed。只写肾小管重吸收不完整。'
  },
  {
    id: 'b11', unit: 'u16', book: '八上', chapter: '第16章 第1节 神经系统的组成',
    cn: '神经系统',
    en: 'The nervous system',
    defCn: '神经系统由中枢神经系统（脑和脊髓）和周围神经系统组成，基本结构和功能单位是神经元。它能感受刺激、传导兴奋并作出反应，使各器官协调活动。',
    defEn: 'The nervous system is made up of the central nervous system (brain and spinal cord) and the peripheral nervous system. Its basic unit is the neurone. It detects stimuli, transmits electrical impulses and coordinates the activities of organs.',
    keywords: [
      { en: 'central nervous system (CNS)', cn: '中枢神经系统' },
      { en: 'peripheral nervous system (PNS)', cn: '周围神经系统' },
      { en: 'neurone / nerve cell', cn: '神经元' },
      { en: 'stimulus / response', cn: '刺激 / 反应' },
      { en: 'electrical impulse', cn: '神经冲动' }
    ],
    lcTip: 'LC 用 "neurone"（英式），不要写 neuron。定义题常问 "what is a reflex action?"，关键词：rapid, automatic, involuntary, protective。'
  },
  {
    id: 'b12', unit: 'u16', book: '八上', chapter: '第16章 第2节 神经系统与人体运动',
    cn: '反射与反射弧',
    en: 'Reflex action and the reflex arc',
    defCn: '反射是人体通过神经系统对刺激作出的规律性反应。反射弧包括感受器、传入神经、神经中枢、传出神经和效应器五个环节。缩手反射的神经中枢在脊髓，属于非条件反射。',
    defEn: 'A reflex action is a rapid, automatic and involuntary response to a stimulus. The reflex arc consists of a receptor, a sensory neurone, a relay neurone in the spinal cord, a motor neurone and an effector. Reflexes are protective and do not require conscious thought.',
    keywords: [
      { en: 'reflex action', cn: '反射' },
      { en: 'reflex arc', cn: '反射弧' },
      { en: 'receptor', cn: '感受器' },
      { en: 'sensory / relay / motor neurone', cn: '感觉 / 中间 / 运动神经元' },
      { en: 'synapse', cn: '突触' },
      { en: 'effector', cn: '效应器' },
      { en: 'spinal cord', cn: '脊髓' }
    ],
    lcTip: 'LC 必考 pathway 书写：stimulus → receptor → sensory neurone → relay neurone (spinal cord) → motor neurone → effector → response。用箭头，七个环节一个都不能少，写 "withdrawal reflex" 举例。'
  },
  {
    id: 'b13', unit: 'u17', book: '八上', chapter: '第17章 第1节 人体的激素',
    cn: '激素与内分泌',
    en: 'Hormones and endocrine glands',
    defCn: '激素是由内分泌腺分泌、经血液运输到靶器官的化学物质，含量少但调节作用显著。人体主要内分泌腺有垂体、甲状腺、胰岛、肾上腺和性腺。',
    defEn: 'A hormone is a chemical messenger produced by an endocrine gland and transported in the blood to a target organ, where it regulates a specific process. Examples include insulin from the pancreas and thyroxine from the thyroid gland.',
    keywords: [
      { en: 'hormone', cn: '激素' },
      { en: 'endocrine gland', cn: '内分泌腺' },
      { en: 'target organ', cn: '靶器官' },
      { en: 'chemical messenger', cn: '化学信使' },
      { en: 'insulin / glucagon', cn: '胰岛素 / 胰高血糖素' },
      { en: 'thyroxine', cn: '甲状腺素' },
      { en: 'adrenaline', cn: '肾上腺素' }
    ],
    lcTip: 'LC 定义必须含 "chemical messenger" + "secreted by endocrine gland" + "into blood" + "target organ"。比较 nervous 与 hormonal control 是经典题：fast/short-lived vs slow/long-lasting。'
  },
  {
    id: 'b14', unit: 'u17', book: '八上', chapter: '第17章 · 教材外延伸（稳态）',
    cn: '血糖调节与稳态',
    en: 'Blood glucose regulation and homeostasis',
    defCn: '稳态是机体通过调节维持内环境相对稳定的状态。血糖升高时胰岛分泌胰岛素，促进细胞摄取葡萄糖并合成糖原；血糖降低时分泌胰高血糖素，促进糖原分解，使血糖回升。',
    defEn: 'Homeostasis is the maintenance of a constant internal environment. When blood glucose rises, the pancreas releases insulin, which causes cells to take up glucose and converts it to glycogen in the liver. When glucose falls, glucagon is released and glycogen is converted back to glucose.',
    keywords: [
      { en: 'homeostasis', cn: '稳态' },
      { en: 'negative feedback', cn: '负反馈' },
      { en: 'insulin / glucagon', cn: '胰岛素 / 胰高血糖素' },
      { en: 'glycogen', cn: '糖原' },
      { en: 'pancreas', cn: '胰腺' },
      { en: 'liver', cn: '肝脏' }
    ],
    lcTip: 'LC 描述调节过程要用 "when ... rises/falls → ... is secreted → ... causes ... → back to normal" 的因果链，并明确点出 negative feedback。这是 Section C 长答题常见框架。'
  },
  {
    id: 'b15', unit: 'u18', book: '八上', chapter: '第18章 第1节 人体的三道防线',
    cn: '人体的三道防线',
    en: 'The three lines of defence',
    defCn: '第一道防线是皮肤和黏膜组成的物理屏障；第二道防线是吞噬细胞的非特异性吞噬和炎症反应；第三道防线是由淋巴细胞参与的特异性免疫，包括体液免疫和细胞免疫。前两道为非特异性免疫。',
    defEn: 'The first line of defence is the physical barrier of skin and mucous membranes; the second is non-specific phagocytosis by white blood cells and inflammation; the third is the specific immune response carried out by lymphocytes, producing antibodies and memory cells.',
    keywords: [
      { en: 'first / second / third line of defence', cn: '第一 / 二 / 三道防线' },
      { en: 'non-specific / specific defence', cn: '非特异性 / 特异性免疫' },
      { en: 'phagocyte', cn: '吞噬细胞' },
      { en: 'lymphocyte', cn: '淋巴细胞' },
      { en: 'inflammation', cn: '炎症' },
      { en: 'memory cell', cn: '记忆细胞' }
    ],
    lcTip: 'LC Human Defence System 喜欢考 "compare specific and non-specific defence"——用两列表格写：non-specific = immediate, same response to all pathogens, no memory；specific = slower, targeted, memory cells。'
  },
  {
    id: 'b16', unit: 'u18', book: '八上', chapter: '第18章 第2节 疫苗与免疫',
    cn: '抗原、抗体与疫苗',
    en: 'Antigens, antibodies and vaccination',
    defCn: '抗原是能引起特异性免疫反应的物质（如病原体表面的蛋白质）；抗体是淋巴细胞受抗原刺激后产生的、能与该抗原特异性结合的蛋白质。疫苗是减毒或灭活的病原体，接种后产生记忆细胞，获得免疫。',
    defEn: 'An antigen is a substance, often a protein on the surface of a pathogen, that stimulates a specific immune response. An antibody is a protein produced by lymphocytes that binds specifically to that antigen. Vaccination introduces a harmless form of a pathogen so that memory cells are produced.',
    keywords: [
      { en: 'antigen', cn: '抗原' },
      { en: 'antibody', cn: '抗体' },
      { en: 'lymphocyte', cn: '淋巴细胞' },
      { en: 'vaccination / immunisation', cn: '接种疫苗' },
      { en: 'memory cell', cn: '记忆细胞' },
      { en: 'pathogen', cn: '病原体' },
      { en: 'primary / secondary response', cn: '初次 / 二次免疫应答' }
    ],
    lcTip: 'LC 常考二次免疫应答曲线：secondary response 更快（shorter lag phase）、更强（higher antibody concentration）、更持久。画图要标清两条曲线。'
  },
  {
    id: 'b17', unit: 'u19', book: '八下', chapter: '第19章 第1–2节 科学饮食 / 行为选择',
    cn: '生活方式与健康',
    en: 'Lifestyle and health',
    defCn: '健康包括身体、心理和社会适应方面的良好状态。合理膳食、适量运动、充足睡眠、不吸烟不酗酒有助于预防生活方式病，如肥胖、心血管疾病和糖尿病。',
    defEn: 'Health is a state of physical, mental and social well-being, not just the absence of disease. A balanced diet, regular exercise, adequate sleep and avoiding smoking and excessive alcohol reduce the risk of lifestyle diseases such as obesity and cardiovascular disease.',
    keywords: [
      { en: 'health', cn: '健康' },
      { en: 'lifestyle disease', cn: '生活方式病' },
      { en: 'obesity', cn: '肥胖' },
      { en: 'cardiovascular disease', cn: '心血管疾病' },
      { en: 'diabetes', cn: '糖尿病' },
      { en: 'risk factor', cn: '危险因素' }
    ],
    lcTip: 'LC 新大纲把 health / sustainability 贯穿所有 strand。论述题用 "risk factor → effect on body → prevention" 三段式，避免只罗列名词。'
  },
  {
    id: 'b18', unit: 'u20', book: '八下', chapter: '第20章 第2节 传染病及其预防',
    cn: '传染病及其预防',
    en: 'Infectious disease and its prevention',
    defCn: '传染病是由病原体引起、能在人与人之间传播的疾病。流行需具备传染源、传播途径和易感人群三个环节；预防对应为控制传染源、切断传播途径和保护易感人群。',
    defEn: 'An infectious disease is caused by a pathogen and can be transmitted from one organism to another. An epidemic requires a source of infection, a route of transmission and susceptible individuals. Prevention involves controlling the source, blocking transmission and protecting susceptible people.',
    keywords: [
      { en: 'infectious / communicable disease', cn: '传染病' },
      { en: 'pathogen', cn: '病原体' },
      { en: 'source of infection', cn: '传染源' },
      { en: 'route of transmission', cn: '传播途径' },
      { en: 'susceptible individual', cn: '易感人群' },
      { en: 'vector', cn: '传播媒介' }
    ],
    lcTip: 'LC 答案要把三个环节与三种措施一一配对，用 "source → control; route → block; susceptible → protect" 的对应结构写，最易拿满分。'
  },
  {
    id: 'b19', unit: 'u21', book: '八下', chapter: '第21章 第1–2节 合理用药 / 家庭急救',
    cn: '合理用药与急救',
    en: 'Safe use of medicines and first aid',
    defCn: '用药须遵医嘱，注意剂量、适应症和有效期；抗生素只对细菌有效，滥用会导致耐药。急救遵循先确保安全、再判断呼吸心跳、必要时心肺复苏并呼叫救护的原则。',
    defEn: 'Medicines should be taken at the correct dose and for the correct condition, as prescribed. Antibiotics act only on bacteria and overuse leads to resistance. In first aid, ensure safety first, check breathing and pulse, and call for emergency help.',
    keywords: [
      { en: 'dosage', cn: '剂量' },
      { en: 'antibiotic', cn: '抗生素' },
      { en: 'antibiotic resistance', cn: '抗生素耐药' },
      { en: 'first aid', cn: '急救' },
      { en: 'CPR', cn: '心肺复苏' }
    ],
    lcTip: '此题在 LC 不单独出，但 antibiotic resistance 是 Science in society 的热门情境题素材，答时点出 natural selection 的作用。'
  },
  {
    id: 'b20', unit: 'u22', book: '八下', chapter: '第22章 第1节 生物的生殖方式',
    cn: '有性生殖与无性生殖',
    en: 'Sexual and asexual reproduction',
    defCn: '有性生殖经过两性生殖细胞结合形成受精卵，后代具双亲遗传特性、变异多；无性生殖不经过生殖细胞结合，由母体直接产生新个体，后代保持母体性状。',
    defEn: 'Sexual reproduction involves the fusion of male and female gametes to form a zygote, producing offspring with genetic variation from two parents. Asexual reproduction produces offspring from a single parent without gamete fusion, so offspring are genetically identical to the parent.',
    keywords: [
      { en: 'sexual reproduction', cn: '有性生殖' },
      { en: 'asexual reproduction', cn: '无性生殖' },
      { en: 'gamete', cn: '配子' },
      { en: 'fertilisation', cn: '受精' },
      { en: 'zygote', cn: '受精卵' },
      { en: 'genetic variation', cn: '遗传变异' },
      { en: 'clone', cn: '克隆' }
    ],
    lcTip: 'LC Reproduction 必考对比表：sexual = two parents, gametes, variation；asexual = one parent, no gametes, identical offspring。vegetative propagation 是植物无性生殖的例子。'
  },
  {
    id: 'b21', unit: 'u22', book: '八下', chapter: '第22章 第2节 人类的生殖',
    cn: '人类的生殖',
    en: 'Human reproduction',
    defCn: '男性产生精子、女性产生卵细胞，两者在输卵管结合形成受精卵，受精卵分裂并着床于子宫，胚胎通过胎盘和脐带从母体获得营养并排出废物。',
    defEn: 'Sperm and ova are the male and female gametes. Fertilisation occurs in the oviduct; the zygote divides and implants in the uterus. The foetus obtains nutrients and oxygen and removes waste through the placenta and umbilical cord.',
    keywords: [
      { en: 'sperm / ovum', cn: '精子 / 卵细胞' },
      { en: 'oviduct / fallopian tube', cn: '输卵管' },
      { en: 'uterus', cn: '子宫' },
      { en: 'placenta', cn: '胎盘' },
      { en: 'umbilical cord', cn: '脐带' },
      { en: 'foetus', cn: '胎儿' },
      { en: 'gestation', cn: '妊娠' }
    ],
    lcTip: 'LC 用 foetus（英式），oviduct 比 fallopian tube 常用。胎盘功能题写：exchange of nutrients, oxygen and waste；no direct mixing of maternal and foetal blood。'
  },
  {
    id: 'b22', unit: 'u23', book: '八下', chapter: '第23章 第1节 遗传的物质基础',
    cn: '遗传物质：DNA、基因与染色体',
    en: 'Genetic material: DNA, genes and chromosomes',
    defCn: '染色体位于细胞核内，由 DNA 和蛋白质组成；基因是有遗传效应的 DNA 片段，是控制性状的基本单位。人体体细胞有 23 对染色体，生殖细胞有 23 条。',
    defEn: 'Chromosomes are structures in the nucleus made of DNA and protein. A gene is a section of DNA that carries the instructions for a particular trait. Human body cells contain 23 pairs of chromosomes, while gametes contain 23 single chromosomes.',
    keywords: [
      { en: 'chromosome', cn: '染色体' },
      { en: 'DNA', cn: 'DNA' },
      { en: 'gene', cn: '基因' },
      { en: 'nucleus', cn: '细胞核' },
      { en: 'genetic information', cn: '遗传信息' },
      { en: 'haploid / diploid', cn: '单倍体 / 二倍体' }
    ],
    lcTip: 'LC Unit 2 DNA and RNA 要会写 "gene = a segment of DNA that codes for a protein"。区分 gene / chromosome / nucleus 的包含关系是选择题常考点。'
  },
  {
    id: 'b23', unit: 'u23', book: '八下', chapter: '第23章 第2节 遗传信息的传递',
    cn: '基因的传递规律',
    en: 'Inheritance and genetic crosses',
    defCn: '生物性状由成对的基因控制，显性基因掩盖隐性基因。杂合子自交后代基因型比为 1AA:2Aa:1aa，表现型比为 3 显:1 隐。体细胞中基因成对，形成配子时彼此分离。',
    defEn: 'Traits are controlled by pairs of alleles. A dominant allele masks the effect of a recessive allele. A cross between two heterozygotes gives a genotypic ratio of 1 AA : 2 Aa : 1 aa and a phenotypic ratio of 3 dominant : 1 recessive. Alleles separate when gametes are formed.',
    keywords: [
      { en: 'allele', cn: '等位基因' },
      { en: 'dominant / recessive', cn: '显性 / 隐性' },
      { en: 'genotype', cn: '基因型' },
      { en: 'phenotype', cn: '表现型' },
      { en: 'homozygous / heterozygous', cn: '纯合 / 杂合' },
      { en: 'Punnett square', cn: '遗传图解' },
      { en: 'F1 / F2 generation', cn: '子一代 / 子二代' }
    ],
    lcTip: 'LC Genetic Crosses 必做 Punnett square：写清 parental phenotypes/genotypes → gametes → F1/F2 → ratio。三个比例（genotypic, phenotypic, gamete）别混。这是每年必考的得分点。'
  },
  {
    id: 'b24', unit: 'u23', book: '八下', chapter: '第23章 第4节 人类的染色体组成与性别决定',
    cn: '染色体与性别决定',
    en: 'Chromosomes and sex determination',
    defCn: '人体体细胞有 22 对常染色体和 1 对性染色体。女性为 XX，男性为 XY。卵细胞都含 X，精子含 X 或 Y，受精时精子类型决定后代性别，生男生女概率各约 50%。',
    defEn: 'Human body cells have 22 pairs of autosomes and one pair of sex chromosomes. Females are XX and males are XY. All ova carry an X chromosome; sperm carry either X or Y, so the sperm determines the sex of the offspring, giving a 50:50 ratio.',
    keywords: [
      { en: 'autosome', cn: '常染色体' },
      { en: 'sex chromosome', cn: '性染色体' },
      { en: 'XX / XY', cn: 'XX / XY' },
      { en: 'gamete', cn: '配子' },
      { en: 'probability', cn: '概率' }
    ],
    lcTip: 'LC 常用 genetic diagram 表示 sex determination，须写出 X / Y 配子与 50% 概率，光写 "father decides" 不给分。'
  },
  {
    id: 'b25', unit: 'u23', book: '八下', chapter: '第23章 第5节 生物的变异与应用',
    cn: '生物的变异',
    en: 'Variation',
    defCn: '变异是亲子间及子代个体间的差异，分可遗传变异（遗传物质改变）和不可遗传变异（环境影响）。可遗传变异来源有基因突变、基因重组和染色体变异。',
    defEn: 'Variation is the difference between individuals of the same species. It may be continuous (e.g. height) or discontinuous (e.g. blood group). Heritable variation is caused by mutation, meiosis and random fertilisation, while environmental variation is not passed to offspring.',
    keywords: [
      { en: 'variation', cn: '变异' },
      { en: 'continuous / discontinuous variation', cn: '连续 / 不连续变异' },
      { en: 'mutation', cn: '突变' },
      { en: 'genetic / environmental variation', cn: '遗传 / 环境变异' },
      { en: 'meiosis', cn: '减数分裂' },
      { en: 'adaptation', cn: '适应' }
    ],
    lcTip: 'LC Variation and Evolution 要求区分 continuous vs discontinuous 并各举两例；画图时注意 continuous 用 histogram/曲线，discontinuous 用 bar chart。'
  },
  {
    id: 'b26', unit: 'u24', book: '八下', chapter: '第24章 第1–2节 生命起源 / 进化历程',
    cn: '生命起源与进化历程',
    en: 'Origin of life and evolution',
    defCn: '生命起源的化学进化假说认为原始大气中的无机小分子在能量作用下生成有机小分子，逐步形成原始生命。进化历程遵循由简单到复杂、由水生到陆生、由低等到高等。化石是研究进化最直接的证据。',
    defEn: 'The chemical evolution hypothesis suggests that organic molecules formed from inorganic substances in the early atmosphere using energy from lightning and UV radiation. Evolution proceeds from simple to complex, from aquatic to terrestrial and from lower to higher organisms. Fossils provide direct evidence for evolution.',
    keywords: [
      { en: 'evolution', cn: '进化' },
      { en: 'fossil', cn: '化石' },
      { en: 'chemical evolution', cn: '化学进化' },
      { en: 'evidence', cn: '证据' },
      { en: 'extinction', cn: '灭绝' }
    ],
    lcTip: 'LC 论述进化证据时按 fossil record / comparative anatomy / embryology / biogeography 分点，每点配一个例子，不要只写 "fossils show it"。'
  },
  {
    id: 'b27', unit: 'u24', book: '八下', chapter: '第24章 第3节 生物进化的动力',
    cn: '自然选择',
    en: 'Natural selection',
    defCn: '达尔文的自然选择学说包括过度繁殖、生存斗争、遗传变异和适者生存。具有有利变异的个体更易生存并繁殖后代，有利基因逐代积累，群体逐渐适应环境并形成新物种。',
    defEn: 'Natural selection is the process whereby individuals with advantageous inherited variations are more likely to survive and reproduce, passing those alleles to the next generation. Its key points are overproduction, competition, variation and survival of the fittest.',
    keywords: [
      { en: 'natural selection', cn: '自然选择' },
      { en: 'overproduction', cn: '过度繁殖' },
      { en: 'competition / struggle for existence', cn: '生存斗争' },
      { en: 'survival of the fittest', cn: '适者生存' },
      { en: 'selective pressure', cn: '选择压力' },
      { en: 'adaptation', cn: '适应' },
      { en: 'speciation', cn: '物种形成' }
    ],
    lcTip: 'LC Section C 经典题 "explain how natural selection leads to evolution"——四步链条：variation exists → selection pressure → better adapted survive & reproduce → allele frequency changes。关键词 survival of the fittest 必须出现。'
  },
  // ---------- LC 衔接专题 ----------
  {
    id: 'b28', unit: 'lc', book: '衔接', chapter: 'LC Unit 2 · Cell structure',
    cn: '细胞的结构与特化',
    en: 'Cell structure and cell specialisation',
    defCn: '细胞是生命活动的基本单位。动物细胞有细胞膜、细胞质、细胞核；植物细胞另有细胞壁、液泡和叶绿体。细胞特化形成不同形态与功能，如红细胞、神经细胞、根毛细胞。',
    defEn: 'The cell is the basic unit of life. Animal cells have a membrane, cytoplasm and nucleus; plant cells also have a cell wall, vacuole and chloroplasts. Cell specialisation produces cells with a particular shape and function, such as red blood cells, neurones and root hair cells.',
    keywords: [
      { en: 'cell membrane / cytoplasm / nucleus', cn: '细胞膜 / 细胞质 / 细胞核' },
      { en: 'cell wall / vacuole / chloroplast', cn: '细胞壁 / 液泡 / 叶绿体' },
      { en: 'mitochondrion', cn: '线粒体' },
      { en: 'ribosome', cn: '核糖体' },
      { en: 'cell specialisation / differentiation', cn: '细胞特化 / 分化' },
      { en: 'tissue / organ', cn: '组织 / 器官' }
    ],
    lcTip: 'LC Unit 2 必考细胞图：动物细胞和植物细胞各画一个、标 6 个结构，并写出特有结构的功能。specialised cell 题按 "structure → adaptation → function" 三点写。'
  },
  {
    id: 'b29', unit: 'lc', book: '衔接', chapter: 'LC Unit 2 · Photosynthesis',
    cn: '光合作用',
    en: 'Photosynthesis',
    defCn: '光合作用是绿色植物利用光能，在叶绿体中将二氧化碳和水合成葡萄糖并释放氧气的过程。它是储能反应，为几乎所有生物提供有机物和氧气。',
    defEn: 'Photosynthesis is the process by which green plants use light energy, trapped by chlorophyll in chloroplasts, to convert carbon dioxide and water into glucose and oxygen. It is an endothermic reaction that stores energy in glucose.',
    keywords: [
      { en: 'photosynthesis', cn: '光合作用' },
      { en: 'chlorophyll / chloroplast', cn: '叶绿素 / 叶绿体' },
      { en: 'light energy', cn: '光能' },
      { en: 'endothermic reaction', cn: '吸热反应' },
      { en: 'limiting factor', cn: '限制因素' },
      { en: 'stomata', cn: '气孔' }
    ],
    lcTip: 'LC 必背文字方程式：carbon dioxide + water → glucose + oxygen（光能、叶绿素写在箭头上下）。limiting factor 题要会解释 light intensity / CO₂ concentration / temperature 曲线平台期。'
  },
  {
    id: 'b30', unit: 'lc', book: '衔接', chapter: 'LC Unit 2 · Respiration',
    cn: '细胞呼吸',
    en: 'Cellular respiration',
    defCn: '细胞呼吸是细胞内的有机物（通常是葡萄糖）在酶的作用下氧化分解、释放能量的过程。有氧呼吸需要氧，产物是二氧化碳和水；无氧呼吸产物是酒精和二氧化碳或乳酸。',
    defEn: 'Respiration is the enzyme-controlled process by which cells break down glucose to release energy. Aerobic respiration requires oxygen and produces carbon dioxide and water; anaerobic respiration occurs without oxygen and produces ethanol and carbon dioxide in yeast, or lactic acid in muscles.',
    keywords: [
      { en: 'aerobic / anaerobic respiration', cn: '有氧 / 无氧呼吸' },
      { en: 'ATP', cn: 'ATP' },
      { en: 'glucose', cn: '葡萄糖' },
      { en: 'lactic acid', cn: '乳酸' },
      { en: 'ethanol', cn: '乙醇' },
      { en: 'mitochondrion', cn: '线粒体' }
    ],
    lcTip: 'LC 常考 respiration 与 photosynthesis 对比表：respiration = all cells, all day, releases energy, exothermic；photosynthesis = green cells, light only, stores energy, endothermic。别把两者搞反。'
  },
  {
    id: 'b31', unit: 'lc', book: '衔接', chapter: 'LC Unit 2 · Diffusion & osmosis',
    cn: '扩散与渗透',
    en: 'Diffusion and osmosis',
    defCn: '扩散是分子从高浓度向低浓度自发运动的过程。渗透是水分子通过半透膜，从水势高（溶质浓度低）一侧向水势低（溶质浓度高）一侧的扩散。',
    defEn: 'Diffusion is the net movement of particles from a region of high concentration to a region of low concentration, down a concentration gradient. Osmosis is the diffusion of water molecules through a selectively permeable membrane from a region of low solute concentration to a region of high solute concentration.',
    keywords: [
      { en: 'diffusion', cn: '扩散' },
      { en: 'osmosis', cn: '渗透' },
      { en: 'concentration gradient', cn: '浓度梯度' },
      { en: 'selectively permeable membrane', cn: '选择透过性膜' },
      { en: 'hypertonic / hypotonic / isotonic', cn: '高渗 / 低渗 / 等渗' },
      { en: 'plasmolysis', cn: '质壁分离' }
    ],
    lcTip: 'LC 定义 osmosis 必须同时写 "water", "selectively permeable membrane", "from low solute to high solute concentration"——三点缺一扣分。实验题常考 potato/Egg 在不同浓度蔗糖液中的质量变化。'
  },
  {
    id: 'b32', unit: 'lc', book: '衔接', chapter: 'LC Unit 3 · Ecology',
    cn: '生态系统与食物链',
    en: 'Ecosystems and food chains',
    defCn: '生态系统由生物群落与非生物环境相互作用构成。食物链表示能量从生产者经各级消费者传递的方向；能量沿食物链逐级递减，约 10% 传递到下一营养级。',
    defEn: 'An ecosystem consists of a community of organisms interacting with their non-living environment. A food chain shows the transfer of energy from producers through consumers. Energy is lost at each trophic level, with only about 10% passed to the next level.',
    keywords: [
      { en: 'ecosystem', cn: '生态系统' },
      { en: 'producer / consumer / decomposer', cn: '生产者 / 消费者 / 分解者' },
      { en: 'food chain / food web', cn: '食物链 / 食物网' },
      { en: 'trophic level', cn: '营养级' },
      { en: 'energy transfer', cn: '能量传递' },
      { en: 'biodiversity', cn: '生物多样性' },
      { en: 'sustainability', cn: '可持续发展' }
    ],
    lcTip: 'LC 新大纲把 sustainability 贯穿始终。画食物链箭头方向 = energy flow（从被吃到吃者），写 "10% law" 解释为何食物链通常不超过 5 级。'
  },
  {
    id: 'b33', unit: 'lc', book: '衔接', chapter: 'LC Unit 2 · Meiosis',
    cn: '减数分裂',
    en: 'Meiosis',
    defCn: '减数分裂是形成生殖细胞时的特殊细胞分裂，染色体复制一次而连续分裂两次，结果一个母细胞形成四个染色体数目减半的细胞，增加遗传多样性。',
    defEn: 'Meiosis is the cell division that produces gametes. Chromosomes replicate once but the cell divides twice, producing four daughter cells with half the number of chromosomes. Crossing over and independent assortment create genetic variation.',
    keywords: [
      { en: 'meiosis', cn: '减数分裂' },
      { en: 'gamete', cn: '配子' },
      { en: 'haploid / diploid', cn: '单倍体 / 二倍体' },
      { en: 'crossing over', cn: '交叉互换' },
      { en: 'independent assortment', cn: '自由组合' },
      { en: 'genetic variation', cn: '遗传变异' }
    ],
    lcTip: 'LC 对比 mitosis / meiosis：mitosis = 2 identical diploid cells, growth and repair；meiosis = 4 different haploid cells, gamete formation。考 "source of variation in meiosis" 答 crossing over + independent assortment。'
  },
  {
    id: 'b34', unit: 'lc', book: '衔接', chapter: 'LC Unit 1 · Scientific method',
    cn: '科学探究方法',
    en: 'The scientific method',
    defCn: '科学探究一般包括提出问题、作出假设、设计实验、控制变量、收集数据、分析结论和评估误差。对照实验只改变一个自变量，其余条件保持一致。',
    defEn: 'The scientific method involves making observations, forming a hypothesis, designing a controlled experiment, collecting data, analysing results and drawing conclusions. In a fair test only the independent variable is changed, while controlled variables are kept constant.',
    keywords: [
      { en: 'hypothesis', cn: '假设' },
      { en: 'independent / dependent variable', cn: '自变量 / 因变量' },
      { en: 'controlled variable', cn: '控制变量' },
      { en: 'fair test', cn: '对照实验' },
      { en: 'control', cn: '对照组' },
      { en: 'reliability / validity', cn: '可靠性 / 效度' },
      { en: 'evidence', cn: '证据' }
    ],
    lcTip: 'LC 新大纲 Nature of Science 是贯穿 strand，实验题必问 variables 和 reliability。写答案时用 "independent: ...; dependent: ...; controlled: ..." 分点，并写 "repeat and average to improve reliability"。'
  },
  {
    id: 'b35', unit: 'u16', book: '八上', chapter: '第16章 第3节 人体主要的感觉器官',
    cn: '人体主要的感觉器官',
    en: 'Sense organs: the eye and the ear',
    defCn: '眼是视觉器官，视网膜上的感光细胞接受光刺激产生神经冲动，经视神经传到大脑皮层视觉中枢形成视觉；耳是听觉和位觉器官，耳蜗内的感受器接受声波振动，经听神经传到大脑皮层听觉中枢形成听觉。',
    defEn: 'A sense organ contains receptors that detect a specific stimulus and convert it into a nerve impulse. The impulse travels along a sensory neurone to the cerebral cortex, where the sensation is perceived. In the eye, photoreceptors in the retina detect light; in the ear, receptors in the cochlea detect sound vibrations.',
    keywords: [
      { en: 'receptor', cn: '感受器' },
      { en: 'stimulus', cn: '刺激' },
      { en: 'retina', cn: '视网膜' },
      { en: 'cochlea', cn: '耳蜗' },
      { en: 'sensory neurone', cn: '感觉神经元' },
      { en: 'cerebral cortex', cn: '大脑皮层' }
    ],
    lcTip: 'LC 常考 "stimulus → receptor → sensory neurone → CNS → response" 通路。描述视觉或听觉要按光线/声波路径逐步写，并点明形成感觉的部位是大脑皮层，而不是眼或耳本身。'
  },
  {
    id: 'b36', unit: 'u20', book: '八下', chapter: '第20章 第1节 非传染病与人体健康',
    cn: '非传染病与危险因素',
    en: 'Non-communicable diseases and risk factors',
    defCn: '非传染病不由病原体引起，也不能在人与人之间传播，多由遗传、生活方式与环境因素共同作用形成，如近视、龋齿、肥胖、心血管疾病和癌症。',
    defEn: 'A non-communicable disease is not caused by a pathogen and cannot be passed from one person to another. It usually results from a combination of genetic, lifestyle and environmental risk factors.',
    keywords: [
      { en: 'non-communicable disease', cn: '非传染病' },
      { en: 'pathogen', cn: '病原体' },
      { en: 'risk factor', cn: '危险因素' },
      { en: 'lifestyle', cn: '生活方式' },
      { en: 'genetic', cn: '遗传的' },
      { en: 'cardiovascular disease', cn: '心血管疾病' }
    ],
    lcTip: 'LC 区分传染病与非传染病，先写 "not caused by a pathogen / not passed from person to person"，再举 risk factors 并说明它们如何增加患病风险，因果链要完整。'
  },
  {
    id: 'b37', unit: 'u17', book: '八上', chapter: '第17章 第2节 性激素与青春期',
    cn: '性激素与青春期',
    en: 'Sex hormones and puberty',
    defCn: '进入青春期后，睾丸分泌雄激素（睾酮），卵巢分泌雌激素和孕激素，促使生殖器官成熟、出现第二性征，并出现月经或遗精。',
    defEn: 'During puberty the gonads begin to secrete sex hormones: testosterone from the testes, and oestrogen and progesterone from the ovaries. These hormones cause the reproductive organs to mature and the secondary sexual characteristics to develop.',
    keywords: [
      { en: 'puberty', cn: '青春期' },
      { en: 'gonad', cn: '性腺' },
      { en: 'testosterone', cn: '睾酮' },
      { en: 'oestrogen', cn: '雌激素' },
      { en: 'progesterone', cn: '孕激素' },
      { en: 'secondary sexual characteristic', cn: '第二性征' }
    ],
    lcTip: 'LC 内分泌题按 gland → hormone → target organ → effect 四段写。比较 testosterone 与 oestrogen 时用 "secreted by ... causes ..." 的完整句，不要只列名词。'
  },
  // ---------- 七年级上册：序章 + 第一、二单元 ----------
  {
    id: 'b38', unit: 'u0', book: '七上', chapter: '序章 · 科学探究的基本过程',
    cn: '科学探究的基本过程',
    en: 'The scientific method',
    defCn: '科学探究通常从观察并提出问题开始，在已有经验基础上作出假设，再设计并实施方案获得证据，最后分析证据、得出结论并表达交流。观察法和实验法是最基本的研究方法。',
    defEn: 'The scientific method is a systematic way of investigating a question: make observations, form a hypothesis, design and carry out a fair test, collect evidence, analyse the results and draw a conclusion. Observation and experiment are the most basic methods in biology.',
    keywords: [
      { en: 'observation', cn: '观察' },
      { en: 'hypothesis', cn: '假设' },
      { en: 'fair test', cn: '公平实验' },
      { en: 'independent variable', cn: '自变量' },
      { en: 'dependent variable', cn: '因变量' },
      { en: 'controlled variable', cn: '控制变量' },
      { en: 'evidence', cn: '证据' }
    ],
    lcTip: 'LC 实验设计题按 hypothesis → variables → procedure → result → conclusion 分段写；改变一个自变量时，其余条件必须保持相同，用 "keep all other factors constant" 得分。'
  },
  {
    id: 'b39', unit: 'u0', book: '七上', chapter: '序章 · 显微镜与临时装片',
    cn: '显微镜的使用与临时装片',
    en: 'Microscopy and temporary mounts',
    defCn: '显微镜的总放大倍数等于目镜倍数与物镜倍数的乘积。使用时应先低倍后高倍，调节粗、细准焦螺旋使物像清晰。制作临时装片时盖玻片要倾斜放下，以避免气泡影响观察。',
    defEn: 'The total magnification of a light microscope is the eyepiece magnification multiplied by the objective lens magnification. A specimen is viewed first under low power and then under higher power. A cover slip is lowered at an angle onto a drop of liquid to avoid trapping air bubbles.',
    keywords: [
      { en: 'magnification', cn: '放大倍数' },
      { en: 'eyepiece', cn: '目镜' },
      { en: 'objective lens', cn: '物镜' },
      { en: 'coarse / fine focus', cn: '粗 / 细准焦螺旋' },
      { en: 'temporary mount', cn: '临时装片' },
      { en: 'cover slip', cn: '盖玻片' },
      { en: 'resolution', cn: '分辨率' }
    ],
    lcTip: 'LC 常问 "Why is the cover slip lowered at an angle?"——答案必须写 "to prevent air bubbles obscuring the specimen"；看图计数时记得放大倍数改变，视野直径成反比。'
  },
  {
    id: 'b40', unit: 'u1', book: '七上', chapter: '第1章 第1节 细胞的基本结构',
    cn: '细胞的基本结构',
    en: 'Basic cell structure',
    defCn: '细胞是生物体结构和功能的基本单位。动植物细胞都有细胞膜、细胞质和细胞核；植物细胞还具有细胞壁、叶绿体和大液泡。细胞壁起支持保护作用，叶绿体是光合作用场所。',
    defEn: 'The cell is the basic structural and functional unit of living organisms. Animal and plant cells all have a cell membrane, cytoplasm and a nucleus. Plant cells also have a cellulose cell wall, chloroplasts and a large permanent vacuole; chloroplasts contain chlorophyll for photosynthesis.',
    keywords: [
      { en: 'cell membrane', cn: '细胞膜' },
      { en: 'cytoplasm', cn: '细胞质' },
      { en: 'nucleus', cn: '细胞核' },
      { en: 'cell wall', cn: '细胞壁' },
      { en: 'chloroplast', cn: '叶绿体' },
      { en: 'vacuole', cn: '液泡' },
      { en: 'mitochondrion', cn: '线粒体' }
    ],
    lcTip: 'LC 比较动植物细胞时用表格式：structure / animal / plant / function；注意 "only plant cells have a cellulose cell wall and chloroplasts"，不要写成动物细胞也有细胞壁。'
  },
  {
    id: 'b41', unit: 'u1', book: '七上', chapter: '第1章 第2节 细胞的生命活动和功能',
    cn: '细胞的生命活动和功能',
    en: 'Cell activities and organelle functions',
    defCn: '细胞能进行摄食、呼吸、排泄、生长、繁殖和应激等活动。细胞核控制遗传与代谢，细胞膜控制物质进出，细胞质是许多化学反应的场所，线粒体释放呼吸作用产生的能量。',
    defEn: 'Living cells carry out nutrition, respiration, excretion, growth, reproduction and sensitivity. The nucleus controls the activities of the cell and contains genetic material; the cell membrane controls the entry and exit of substances; the cytoplasm is the site of many chemical reactions and mitochondria release energy by respiration.',
    keywords: [
      { en: 'nutrition', cn: '营养' },
      { en: 'respiration', cn: '呼吸作用' },
      { en: 'excretion', cn: '排泄' },
      { en: 'sensitivity', cn: '应激性' },
      { en: 'mitochondrion', cn: '线粒体' },
      { en: 'selectively permeable membrane', cn: '选择透过性膜' }
    ],
    lcTip: 'LC 结构功能题要写成完整句："The nucleus controls cell activities because it contains DNA"；不要把 respiration 与 breathing 混为一谈。'
  },
  {
    id: 'b42', unit: 'u2', book: '七上', chapter: '第2章 第1节 细胞的分裂和分化',
    cn: '细胞的分裂与分化',
    en: 'Cell division and differentiation',
    defCn: '细胞分裂使一个母细胞形成两个子细胞，染色体先复制再平均分配，保证遗传物质稳定。分化是细胞在形态、结构和功能上产生差异的过程，形成不同类型的细胞。',
    defEn: 'Cell division produces two daughter cells from one parent cell. Chromosomes are copied and then separated equally so that each daughter cell receives the same genetic information. Differentiation is the process by which cells become specialised in shape, structure and function to form different cell types.',
    keywords: [
      { en: 'cell division', cn: '细胞分裂' },
      { en: 'chromosome', cn: '染色体' },
      { en: 'daughter cell', cn: '子细胞' },
      { en: 'differentiation', cn: '细胞分化' },
      { en: 'specialised cell', cn: '特化细胞' },
      { en: 'growth', cn: '生长' },
      { en: 'repair', cn: '修复' }
    ],
    lcTip: 'LC 解释 "Why is mitosis important?" 要写 growth、repair 和 replacement of damaged cells 三点；分化不改变化染色体数目，只改变基因的表达。'
  },
  {
    id: 'b43', unit: 'u2', book: '七上', chapter: '第2章 第2节 生物体的构成',
    cn: '生物体的结构层次',
    en: 'Levels of organisation',
    defCn: '多细胞生物体的结构层次一般是：细胞 → 组织 → 器官 → 系统 → 个体。形态相似、功能相同的细胞联合形成组织，不同组织按一定次序联合形成器官，多个器官协同完成一类生理功能则构成系统。',
    defEn: 'The levels of organisation in a multicellular organism are cell, tissue, organ, system and organism. A tissue is a group of similar cells working together to perform a particular function; organs are made of different tissues, and a system is a group of organs working together to carry out a major body function.',
    keywords: [
      { en: 'tissue', cn: '组织' },
      { en: 'organ', cn: '器官' },
      { en: 'system', cn: '系统' },
      { en: 'organism', cn: '个体 / 生物体' },
      { en: 'epithelial tissue', cn: '上皮组织' },
      { en: 'muscle tissue', cn: '肌肉组织' }
    ],
    lcTip: 'LC 给例子必须分层："heart = organ; circulatory system = system"；单细胞生物没有组织、器官和系统层次。'
  },
  {
    id: 'b44', unit: 'u3', book: '七上', chapter: '第3章 第1节 植物的种子',
    cn: '种子的结构与萌发',
    en: 'Seed structure and germination',
    defCn: '种子一般由种皮和胚组成，胚包括胚芽、胚轴、胚根和子叶，有些种子还有胚乳储存营养。萌发需要适宜的温度、一定水分和充足空气，胚根先突破种皮发育成根。',
    defEn: 'A seed consists of a seed coat and an embryo; the embryo has a plumule, hypocotyl, radicle and cotyledons, and some seeds store food in endosperm. Germination requires water, oxygen and a suitable temperature. The radicle is usually the first part to emerge and develops into the root.',
    keywords: [
      { en: 'seed coat', cn: '种皮' },
      { en: 'embryo', cn: '胚' },
      { en: 'cotyledon', cn: '子叶' },
      { en: 'endosperm', cn: '胚乳' },
      { en: 'radicle', cn: '胚根' },
      { en: 'germination', cn: '萌发' },
      { en: 'dormancy', cn: '休眠' }
    ],
    lcTip: 'LC 设计萌发实验时一次只改变一个条件（水 / 氧气 / 温度），其余条件相同，并用 "a suitable control" 说明对照组。'
  },
  {
    id: 'b45', unit: 'u3', book: '七上', chapter: '第3章 第2节 植物的生长',
    cn: '植物的生长与无机盐',
    en: 'Plant growth and mineral ions',
    defCn: '植物依靠根尖和茎尖的分生组织不断产生新细胞，细胞伸长和分化使根、茎加长加粗。植物需要含氮、磷、钾的无机盐：氮促进枝叶生长，磷促进根系和开花结果，钾有助于茎秆健壮。',
    defEn: 'Plants grow because meristems at root and shoot tips produce new cells, which then elongate and differentiate. Mineral ions are essential: nitrate is needed for protein synthesis and leafy growth, phosphate for root development, flowering and fruiting, and potassium for healthy stems and disease resistance.',
    keywords: [
      { en: 'meristem', cn: '分生组织' },
      { en: 'elongation', cn: '伸长' },
      { en: 'nitrate', cn: '硝酸盐 / 氮' },
      { en: 'phosphate', cn: '磷酸盐 / 磷' },
      { en: 'potassium', cn: '钾' },
      { en: 'root hair', cn: '根毛' }
    ],
    lcTip: 'LC 缺素症题按 ion → function → deficiency symptom 三列作答，例如 "nitrate deficiency causes stunted growth and yellow leaves"。'
  },
  {
    id: 'b46', unit: 'u3', book: '七上', chapter: '第3章 第3节 植物的繁殖',
    cn: '绿色开花植物的繁殖',
    en: 'Reproduction in flowering plants',
    defCn: '花的主要结构是雄蕊和雌蕊。花粉从花药传到柱头称传粉，精子与卵细胞结合完成受精，之后子房发育成果实、胚珠发育成种子。植物也可通过扦插、嫁接等进行营养繁殖。',
    defEn: 'The reproductive parts of a flower are the stamens and the carpel. Pollination is the transfer of pollen from an anther to a stigma, and fertilisation is the fusion of a male gamete with an egg cell. After fertilisation the ovary develops into a fruit and the ovule into a seed. Vegetative propagation allows new plants to be produced from parent tissues.',
    keywords: [
      { en: 'stamen', cn: '雄蕊' },
      { en: 'carpel / pistil', cn: '雌蕊' },
      { en: 'pollination', cn: '传粉' },
      { en: 'fertilisation', cn: '受精' },
      { en: 'ovary', cn: '子房' },
      { en: 'ovule', cn: '胚珠' },
      { en: 'vegetative propagation', cn: '营养繁殖' }
    ],
    lcTip: 'LC 区分 pollination 与 fertilisation 必须用一句话写清："pollination is pollen transfer; fertilisation is gamete fusion"；英国/爱尔兰拼写用 fertilisation。'
  },
  {
    id: 'b47', unit: 'u4', book: '七上', chapter: '第4章 第1节 植物的物质运输',
    cn: '植物的物质运输',
    en: 'Transport in plants',
    defCn: '木质部把根吸收的水和无机盐向上运输到茎叶，主要动力来自蒸腾拉力；韧皮部把叶片制造的有机物运输到全株，这一过程称为运输作用。根毛区大量根毛增大了吸收面积。',
    defEn: 'Xylem transports water and mineral ions from the roots upwards to the stem and leaves, driven mainly by the transpiration stream. Phloem transports the organic products of photosynthesis from leaves to the rest of the plant; this is called translocation. Root hairs increase the surface area for absorption of water and ions.',
    keywords: [
      { en: 'xylem', cn: '木质部' },
      { en: 'phloem', cn: '韧皮部' },
      { en: 'transpiration stream', cn: '蒸腾流' },
      { en: 'translocation', cn: '有机物运输' },
      { en: 'root hair', cn: '根毛' },
      { en: 'vascular bundle', cn: '维管束' }
    ],
    lcTip: 'LC 常考 "distinguish xylem from phloem"：xylem = water and minerals, upward, dead vessels; phloem = sugar, both directions, living cells。'
  },
  {
    id: 'b48', unit: 'u4', book: '七上', chapter: '第4章 第2节 植物与水循环',
    cn: '蒸腾作用与水循环',
    en: 'Transpiration and the water cycle',
    defCn: '蒸腾作用是水分以水蒸气形式从植物体（主要是叶片气孔）散失到大气中的过程。气孔由保卫细胞控制开闭。水循环包括蒸发、蒸腾、凝结、降水、地表径流和渗入地下等环节。',
    defEn: 'Transpiration is the loss of water vapour from a plant, mainly through the stomata of the leaves. Stomatal opening is controlled by guard cells. The water cycle includes evaporation, transpiration, condensation, precipitation, surface runoff and infiltration into the soil.',
    keywords: [
      { en: 'transpiration', cn: '蒸腾作用' },
      { en: 'stoma (plural stomata)', cn: '气孔' },
      { en: 'guard cell', cn: '保卫细胞' },
      { en: 'evaporation', cn: '蒸发' },
      { en: 'condensation', cn: '凝结' },
      { en: 'precipitation', cn: '降水' },
      { en: 'runoff', cn: '径流' }
    ],
    lcTip: 'LC 解释蒸腾速率受哪些因素影响时写 light intensity、temperature、humidity、wind speed，并逐条说明原因，不要只列名词。'
  },
  {
    id: 'b49', unit: 'u5', book: '七上', chapter: '第5章 第1节 植物的光合作用',
    cn: '光合作用',
    en: 'Photosynthesis',
    defCn: '光合作用是绿色植物在光下通过叶绿体中的叶绿素，把二氧化碳和水合成葡萄糖并释放氧气的过程。光照强度、二氧化碳浓度和温度都可能成为限制因素。',
    defEn: 'Photosynthesis is the process by which green plants use light energy, absorbed by chlorophyll in chloroplasts, to synthesise glucose from carbon dioxide and water, releasing oxygen as a by-product. Light intensity, carbon dioxide concentration and temperature can all be limiting factors.',
    keywords: [
      { en: 'photosynthesis', cn: '光合作用' },
      { en: 'chlorophyll', cn: '叶绿素' },
      { en: 'chloroplast', cn: '叶绿体' },
      { en: 'carbon dioxide', cn: '二氧化碳' },
      { en: 'glucose', cn: '葡萄糖' },
      { en: 'oxygen', cn: '氧气' },
      { en: 'limiting factor', cn: '限制因素' }
    ],
    lcTip: 'LC 必须会写 word equation 与配平式：6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂；答限制因素题要说 "at low light intensity, increasing CO2 has little effect"。'
  },
  {
    id: 'b50', unit: 'u5', book: '七上', chapter: '第5章 第2节 植物的呼吸作用',
    cn: '植物的呼吸作用',
    en: 'Respiration in plants',
    defCn: '呼吸作用是细胞内的有机物（通常是葡萄糖）在氧的参与下分解，释放能量并生成二氧化碳和水的过程。植物白天和夜间都进行呼吸作用，能量供各项生命活动利用。',
    defEn: 'Respiration is the chemical process in cells by which food, usually glucose, is broken down to release energy, producing carbon dioxide and water. Aerobic respiration requires oxygen and occurs in mitochondria. Plants respire both day and night, unlike photosynthesis which needs light.',
    keywords: [
      { en: 'respiration', cn: '呼吸作用' },
      { en: 'aerobic respiration', cn: '有氧呼吸' },
      { en: 'glucose', cn: '葡萄糖' },
      { en: 'mitochondrion', cn: '线粒体' },
      { en: 'energy release', cn: '能量释放' },
      { en: 'carbon dioxide', cn: '二氧化碳' }
    ],
    lcTip: 'LC 区分 photosynthesis 与 respiration：前者 store energy，后者 release energy；答题写清 "respiration occurs in all living cells at all times" 这个得分点。'
  },
  {
    id: 'b51', unit: 'u5', book: '七上', chapter: '第5章 第3节 植物与碳氧平衡',
    cn: '生物圈中的碳氧平衡',
    en: 'Carbon–oxygen balance',
    defCn: '光合作用吸收二氧化碳、释放氧气，呼吸作用、分解作用和燃烧则消耗氧气、释放二氧化碳。两者大致平衡，维持大气中氧气和二氧化碳含量的相对稳定。',
    defEn: 'Photosynthesis removes carbon dioxide from the atmosphere and releases oxygen, while respiration, decomposition and combustion consume oxygen and release carbon dioxide. These opposing processes maintain an approximate balance of gases in the atmosphere, known as the carbon–oxygen balance.',
    keywords: [
      { en: 'carbon cycle', cn: '碳循环' },
      { en: 'photosynthesis', cn: '光合作用' },
      { en: 'respiration', cn: '呼吸作用' },
      { en: 'decomposition', cn: '分解作用' },
      { en: 'combustion', cn: '燃烧' },
      { en: 'greenhouse effect', cn: '温室效应' }
    ],
    lcTip: 'LC 用 "relative rates" 解释昼夜气体变化：白天 photosynthesis 快于 respiration，夜间只有 respiration；注意写 "approximate balance"，不要写完全相等。'
  },
  // ---------- 七年级下册：第三、四单元 ----------
  {
    id: 'b52', unit: 'u6', book: '七下', chapter: '第6章 第1节 生物的分类等级',
    cn: '生物的分类等级',
    en: 'Taxonomic ranks',
    defCn: '生物分类等级从大到小依次是界、门、纲、目、科、属、种。分类单位越小，生物之间的共同特征越多、亲缘关系越近；种是最基本的分类单位。',
    defEn: 'Taxonomy groups organisms into a hierarchy of ranks: kingdom, phylum, class, order, family, genus and species. The smaller the rank, the more characteristics the organisms share and the closer their evolutionary relationship. Species is the basic unit of classification.',
    keywords: [
      { en: 'taxonomy', cn: '分类学' },
      { en: 'kingdom', cn: '界' },
      { en: 'phylum', cn: '门' },
      { en: 'class', cn: '纲' },
      { en: 'order', cn: '目' },
      { en: 'family', cn: '科' },
      { en: 'genus', cn: '属' },
      { en: 'species', cn: '种' }
    ],
    lcTip: 'LC 记忆顺序可用 "King Philip Came Over For Good Soup"；题目给分类树时，共同分类等级越低，亲缘越近。'
  },
  {
    id: 'b53', unit: 'u6', book: '七下', chapter: '第6章 第2节 生物的基本分类单位',
    cn: '种与双名法',
    en: 'Species and binomial nomenclature',
    defCn: '种是能够在自然状态下相互交配并产生可育后代的一群生物。双名法用属名加种加词给生物命名，属名首字母大写、种加词小写，通常用斜体表示。',
    defEn: 'A species is a group of organisms that can interbreed naturally and produce fertile offspring. Binomial nomenclature names an organism using its genus followed by a specific epithet; the genus begins with a capital letter, the specific epithet with a small letter, and both are usually written in italics.',
    keywords: [
      { en: 'species', cn: '种' },
      { en: 'interbreeding', cn: '相互交配' },
      { en: 'fertile offspring', cn: '可育后代' },
      { en: 'binomial nomenclature', cn: '双名法' },
      { en: 'genus', cn: '属名' },
      { en: 'specific epithet', cn: '种加词' },
      { en: 'identification key', cn: '检索表' }
    ],
    lcTip: 'LC 命名题必须写对格式："Homo sapiens"；若问为什么不能用俗名，答 common names vary between countries and languages。'
  },
  {
    id: 'b54', unit: 'u7', book: '七下', chapter: '第7章 第1节 藻类与植物的特征及类群',
    cn: '藻类与植物的主要类群',
    en: 'Algae and plant groups',
    defCn: '藻类大多生活在水中，没有根茎叶分化；苔藓植物有茎叶但无真正根和维管组织；蕨类植物有根茎叶和维管组织，用孢子繁殖；裸子植物和被子植物用种子繁殖，被子植物的种子外有果皮包被。',
    defEn: 'Algae are mostly aquatic and lack true roots, stems and leaves. Bryophytes such as mosses have simple stems and leaves but no true roots or vascular tissue. Pteridophytes such as ferns have vascular tissue and reproduce by spores. Gymnosperms and angiosperms reproduce by seeds; angiosperms produce flowers and their seeds are enclosed in fruits.',
    keywords: [
      { en: 'algae', cn: '藻类' },
      { en: 'bryophyte', cn: '苔藓植物' },
      { en: 'pteridophyte', cn: '蕨类植物' },
      { en: 'gymnosperm', cn: '裸子植物' },
      { en: 'angiosperm', cn: '被子植物' },
      { en: 'spore', cn: '孢子' },
      { en: 'fruit', cn: '果实' }
    ],
    lcTip: 'LC 比较类群用 reproduction（spore / seed）和 vascular tissue 两个分类轴；写 moss 时不要说它有 roots，应写 rhizoids。'
  },
  {
    id: 'b55', unit: 'u7', book: '七下', chapter: '第7章 第2节 动物的特征及类群',
    cn: '动物的主要类群',
    en: 'Major animal groups',
    defCn: '动物按有无脊柱分为无脊椎动物和脊椎动物。鱼类用鳃呼吸、生活在水中；两栖类幼体水生、成体可陆生；爬行类体表有鳞片、产羊膜卵；鸟类有羽毛和气囊；哺乳类体表被毛、胎生并哺乳幼崽。',
    defEn: 'Animals are divided into invertebrates and vertebrates. Fish breathe with gills; amphibians have aquatic larvae and terrestrial adults; reptiles have dry scaly skin and lay amniotic eggs; birds have feathers and air sacs; mammals have hair, give birth to live young and suckle them with milk.',
    keywords: [
      { en: 'vertebrate', cn: '脊椎动物' },
      { en: 'invertebrate', cn: '无脊椎动物' },
      { en: 'gill', cn: '鳃' },
      { en: 'amphibian', cn: '两栖类' },
      { en: 'reptile', cn: '爬行类' },
      { en: 'mammal', cn: '哺乳类' },
      { en: 'arthropod', cn: '节肢动物' }
    ],
    lcTip: 'LC 给"归类理由"时要写可观察特征，例如 "It is a mammal because it has hair and produces milk"，不要只写"看起来像"。'
  },
  {
    id: 'b56', unit: 'u7', book: '七下', chapter: '第7章 第3节 动植物对人类的影响',
    cn: '动植物与人类生活',
    en: 'Plants, animals and humans',
    defCn: '人类利用动植物获得食物、纤维、药物和能源，并通过驯化、育种提高产量；同时有害生物会传播疾病、破坏作物，外来物种入侵还会改变当地生态。可持续利用要求在满足需要的同时保护生物多样性。',
    defEn: 'Humans use plants and animals for food, fibres, medicines and fuel, and have domesticated species through selective breeding. Pests can damage crops and spread disease, while invasive species may disrupt local ecosystems. Sustainable use means meeting human needs while conserving biodiversity for future generations.',
    keywords: [
      { en: 'domestication', cn: '驯化' },
      { en: 'selective breeding', cn: '选择育种' },
      { en: 'pollinator', cn: '传粉者' },
      { en: 'pest', cn: '有害生物' },
      { en: 'invasive species', cn: '外来入侵物种' },
      { en: 'sustainable use', cn: '可持续利用' }
    ],
    lcTip: 'LC 评价影响类题按 beneficial / harmful / management 三段写，并用 "on the other hand" 呈现平衡论证。'
  },
  {
    id: 'b57', unit: 'u8', book: '七下', chapter: '第8章 第1节 真菌',
    cn: '真菌',
    en: 'Fungi',
    defCn: '真菌有真正的细胞核，细胞外有细胞壁，常由菌丝组成菌丝体。真菌不能进行光合作用，通过分泌消化酶分解有机物再吸收营养，是生态系统中的重要分解者；酵母菌可用于发酵。',
    defEn: 'Fungi are eukaryotic organisms with a cell wall; most are made of hyphae forming a mycelium. They cannot photosynthesise and feed saprotrophically by secreting enzymes onto organic matter and absorbing the digested products. Fungi are important decomposers, and yeasts are used in fermentation.',
    keywords: [
      { en: 'fungus (plural fungi)', cn: '真菌' },
      { en: 'hypha', cn: '菌丝' },
      { en: 'mycelium', cn: '菌丝体' },
      { en: 'spore', cn: '孢子' },
      { en: 'saprophyte / decomposer', cn: '腐生生物 / 分解者' },
      { en: 'fermentation', cn: '发酵' }
    ],
    lcTip: 'LC 要能写 "Fungi digest food externally and then absorb the products"；说明分解者作用时联系 nutrient cycle。'
  },
  {
    id: 'b58', unit: 'u8', book: '七下', chapter: '第8章 第2节 细菌',
    cn: '细菌',
    en: 'Bacteria',
    defCn: '细菌是单细胞原核生物，没有成形的细胞核，DNA 位于拟核区，有些还具有质粒和鞭毛。细菌通过二分裂繁殖，在适宜条件下速度很快；多数细菌有益，少数是病原菌。',
    defEn: 'Bacteria are single-celled prokaryotes: they have no true nucleus and their DNA lies in a nucleoid region, often with small plasmids. Some have flagella for movement. Bacteria reproduce by binary fission and can multiply rapidly under favourable conditions; many are beneficial, but some are pathogenic.',
    keywords: [
      { en: 'bacterium (plural bacteria)', cn: '细菌' },
      { en: 'prokaryote', cn: '原核生物' },
      { en: 'nucleoid', cn: '拟核' },
      { en: 'plasmid', cn: '质粒' },
      { en: 'flagellum', cn: '鞭毛' },
      { en: 'binary fission', cn: '二分裂' },
      { en: 'pathogenic', cn: '致病的' }
    ],
    lcTip: 'LC 比较 bacteria 与 fungi 时抓 nucleus 和 cell wall：bacteria have no true nucleus; fungi have a nucleus and chitin wall。'
  },
  {
    id: 'b59', unit: 'u8', book: '七下', chapter: '第8章 第3节 病毒',
    cn: '病毒',
    en: 'Viruses',
    defCn: '病毒没有细胞结构，一般由蛋白质外壳和内部遗传物质组成，必须寄生在活细胞内才能复制。病毒具有宿主特异性，离开宿主细胞后不能独立进行代谢和繁殖。',
    defEn: 'A virus is not a cell. It consists of a protein capsid surrounding genetic material and can only replicate inside a living host cell. Viruses are host-specific because they must attach to compatible host cells, and outside a host they show no independent metabolism or reproduction.',
    keywords: [
      { en: 'virus', cn: '病毒' },
      { en: 'capsid', cn: '蛋白质外壳' },
      { en: 'genetic material', cn: '遗传物质' },
      { en: 'host cell', cn: '宿主细胞' },
      { en: 'replication', cn: '复制' },
      { en: 'parasite', cn: '寄生物' },
      { en: 'bacteriophage', cn: '噬菌体' }
    ],
    lcTip: 'LC 问 "Why are viruses not considered living cells?" 答三点：no cell structure, no independent metabolism, can only reproduce inside host cells。'
  },
  {
    id: 'b60', unit: 'u8', book: '七下', chapter: '第8章 第4节 微生物与人类的关系',
    cn: '微生物与人类',
    en: 'Microorganisms and humans',
    defCn: '微生物在发酵食品、制药、分解废物和维持肠道菌群方面有益，也可能引起食物腐败和传染病。食品保存通过低温、加热、干燥或加盐等方法抑制微生物生长。',
    defEn: 'Microorganisms are useful in food fermentation, antibiotic production, waste decomposition and the gut microbiota, but some cause food spoilage and infectious disease. Food preservation methods such as chilling, heating, drying and salting prevent or slow microbial growth.',
    keywords: [
      { en: 'microorganism', cn: '微生物' },
      { en: 'fermentation', cn: '发酵' },
      { en: 'antibiotic', cn: '抗生素' },
      { en: 'food spoilage', cn: '食物腐败' },
      { en: 'pathogen', cn: '病原体' },
      { en: 'food preservation', cn: '食品保存' }
    ],
    lcTip: 'LC 解释保存方法时写清原理："Chilling slows down the rate of bacterial reproduction"，不要只写"放冰箱更好"。'
  },
  {
    id: 'b61', unit: 'u9', book: '七下', chapter: '第9章 第1节 认识生物的多样性',
    cn: '生物多样性的内涵',
    en: 'Biodiversity and its levels',
    defCn: '生物多样性包括遗传多样性、物种多样性和生态系统多样性。物种丰富度是某一区域物种数目的指标；生物多样性越高，生态系统通常越稳定，抵御环境变化的能力越强。',
    defEn: 'Biodiversity is the variety of living organisms in an area and includes genetic diversity, species diversity and ecosystem diversity. Species richness is the number of different species present. A higher biodiversity generally makes an ecosystem more stable and more resistant to environmental change.',
    keywords: [
      { en: 'biodiversity', cn: '生物多样性' },
      { en: 'genetic diversity', cn: '遗传多样性' },
      { en: 'species diversity', cn: '物种多样性' },
      { en: 'ecosystem diversity', cn: '生态系统多样性' },
      { en: 'species richness', cn: '物种丰富度' },
      { en: 'biodiversity hotspot', cn: '生物多样性热点' }
    ],
    lcTip: 'LC 定义题写 "the variety of genes, species and ecosystems in a given area" 三个层次，只写 species 会丢分。'
  },
  {
    id: 'b62', unit: 'u9', book: '七下', chapter: '第9章 第2节 保护生物的多样性',
    cn: '生物多样性的保护',
    en: 'Conservation of biodiversity',
    defCn: '栖息地丧失、过度开发、污染、外来物种入侵和气候变化是生物多样性下降的主要原因。保护措施包括建立自然保护区、迁地保护、人工繁育、立法和可持续利用。',
    defEn: 'Biodiversity is threatened by habitat loss, overexploitation, pollution, invasive species and climate change. Conservation measures include protected areas, ex situ conservation, captive breeding, legislation and sustainable use of resources.',
    keywords: [
      { en: 'conservation', cn: '保护' },
      { en: 'endangered species', cn: '濒危物种' },
      { en: 'habitat loss', cn: '栖息地丧失' },
      { en: 'protected area', cn: '自然保护区' },
      { en: 'captive breeding', cn: '人工繁育' },
      { en: 'sustainable development', cn: '可持续发展' }
    ],
    lcTip: 'LC "suggest three reasons for conserving biodiversity" 可按 ecological、economic、ethical 三类写，确保理由不重复。'
  },
  {
    id: 'b63', unit: 'u10', book: '七下', chapter: '第10章 第1节 生物与环境的关系',
    cn: '生态因素与生物适应',
    en: 'Ecological factors and adaptation',
    defCn: '环境中影响生物生活和分布的因素叫生态因素，包括阳光、温度、水、土壤等非生物因素和其他生物构成的生物因素。生物在长期进化中形成形态、生理和行为上的适应，如保护色和拟态。',
    defEn: 'Ecological factors affect where organisms live and include abiotic factors such as light, temperature, water and soil, and biotic factors such as competition, predation and disease. Adaptations are inherited features, structural, physiological or behavioural, that improve survival in a particular habitat.',
    keywords: [
      { en: 'habitat', cn: '栖息地' },
      { en: 'abiotic factor', cn: '非生物因素' },
      { en: 'biotic factor', cn: '生物因素' },
      { en: 'adaptation', cn: '适应' },
      { en: 'competition', cn: '竞争' },
      { en: 'predation', cn: '捕食' },
      { en: 'mutualism', cn: '互利共生' }
    ],
    lcTip: 'LC 区分 habitat 与 niche：habitat 是"住在哪里"，niche 是"如何生活、利用什么资源"；适应题要写 feature 如何帮助 survival。'
  },
  {
    id: 'b64', unit: 'u10', book: '七下', chapter: '第10章 第2节 生态系统的组成与功能',
    cn: '生态系统的组成与功能',
    en: 'Ecosystem structure and function',
    defCn: '生态系统由生物部分和非生物环境组成。生产者主要是绿色植物，消费者是各种动物，分解者是细菌和真菌。食物链和食物网表示生物之间的营养关系，能量沿营养级单向流动并逐级减少，物质则循环利用。',
    defEn: 'An ecosystem consists of a community of organisms and their physical environment. Producers make their own food by photosynthesis, consumers feed on other organisms, and decomposers break down dead material. Food chains and food webs show feeding relationships: energy flows one way through trophic levels and decreases at each transfer, while nutrients are recycled.',
    keywords: [
      { en: 'ecosystem', cn: '生态系统' },
      { en: 'producer', cn: '生产者' },
      { en: 'consumer', cn: '消费者' },
      { en: 'decomposer', cn: '分解者' },
      { en: 'food web', cn: '食物网' },
      { en: 'trophic level', cn: '营养级' },
      { en: 'energy flow', cn: '能量流动' }
    ],
    lcTip: 'LC 解释 "Why is a food web more stable than a food chain?" 写 "if one species declines, consumers have alternative food sources"。'
  },
  {
    id: 'b65', unit: 'u10', book: '七下', chapter: '第10章 第3节 生物圈是最大的生态系统',
    cn: '生物圈',
    en: 'The biosphere',
    defCn: '生物圈是地球上所有生物及其生存环境的总和，范围包括大气圈底部、水圈大部和岩石圈表面。它包含森林、草原、荒漠、湿地、海洋等多种生态系统，是最大的生态系统。',
    defEn: 'The biosphere is the global sum of all living organisms and the environments in which they live, extending through the lower atmosphere, most of the hydrosphere and the surface of the lithosphere. It contains many ecosystems such as forests, grasslands, deserts, wetlands and oceans and is the largest ecosystem on Earth.',
    keywords: [
      { en: 'biosphere', cn: '生物圈' },
      { en: 'biome', cn: '生物群系' },
      { en: 'atmosphere', cn: '大气圈' },
      { en: 'hydrosphere', cn: '水圈' },
      { en: 'lithosphere', cn: '岩石圈' },
      { en: 'global ecosystem', cn: '全球生态系统' }
    ],
    lcTip: 'LC 定义 biosphere 时写 "all living organisms and their environments on Earth"；注意它与 ecosystem 的尺度差别。'
  },
  {
    id: 'b66', unit: 'u11', book: '七下', chapter: '第11章 第1节 生态系统的自我调节',
    cn: '生态系统的自我调节',
    en: 'Self-regulation in ecosystems',
    defCn: '生态系统具有一定的自我调节能力，能通过负反馈使种群数量和群落结构保持动态平衡。这种能力有限，当干扰超过限度时，生态系统可能失去平衡甚至崩溃。',
    defEn: 'Ecosystems can self-regulate through negative feedback, keeping populations and community structure in a dynamic equilibrium. This capacity is limited: if a disturbance exceeds the ecosystem tolerance, the balance may be lost and the ecosystem can collapse.',
    keywords: [
      { en: 'self-regulation', cn: '自我调节' },
      { en: 'negative feedback', cn: '负反馈' },
      { en: 'dynamic equilibrium', cn: '动态平衡' },
      { en: 'carrying capacity', cn: '环境容纳量' },
      { en: 'population', cn: '种群' },
      { en: 'disturbance', cn: '干扰' }
    ],
    lcTip: 'LC 用捕食者—猎物曲线说明动态平衡：猎物增加 → 捕食者增加 → 猎物减少 → 捕食者减少，并强调 "not a constant number"。'
  },
  {
    id: 'b67', unit: 'u11', book: '七下', chapter: '第11章 第2节 生态安全与可持续发展',
    cn: '生态安全与可持续发展',
    en: 'Ecological security and sustainability',
    defCn: '生态安全指生态系统结构完整、功能正常，能持续为人类提供生态服务。实现可持续发展需要合理利用资源、控制污染、保护生物多样性，并兼顾经济、社会和环境三方面的需要。',
    defEn: 'Ecological security means that ecosystems remain healthy and functional and can continue to provide ecosystem services. Sustainable development meets present needs without compromising future generations, balancing economic, social and environmental considerations through resource management, pollution control and conservation.',
    keywords: [
      { en: 'ecological security', cn: '生态安全' },
      { en: 'sustainable development', cn: '可持续发展' },
      { en: 'ecosystem service', cn: '生态系统服务' },
      { en: 'pollution', cn: '污染' },
      { en: 'resource management', cn: '资源管理' },
      { en: 'carbon footprint', cn: '碳足迹' }
    ],
    lcTip: 'LC "evaluate sustainability" 题用 economic / social / environmental 三个角度各举一例，最后给出 balanced judgement。'
  }
];

// 按教材单元顺序（七上 → 七下 → 八上 → 八下 → LC 衔接）排列知识点，
// id 与记忆键不变，仅调整展示顺序，避免默认首卡跳到八年级。
const UNIT_ORDER = {};
units.forEach((u, i) => { UNIT_ORDER[u.key] = i; });
points.sort((a, b) => {
  const ai = UNIT_ORDER[a.unit] === undefined ? 99 : UNIT_ORDER[a.unit];
  const bi = UNIT_ORDER[b.unit] === undefined ? 99 : UNIT_ORDER[b.unit];
  return ai - bi;
});

module.exports = { units, points };
