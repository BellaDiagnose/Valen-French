/**
 * data-bio.js —— 上海新教改（沪教版 2024 五四学制）初二生物知识点
 *
 * 覆盖范围：
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
  { key: 'u12', label: '12 消化与营养', book: '八上' },
  { key: 'u13', label: '13 血液循环', book: '八上' },
  { key: 'u14', label: '14 呼吸与气体交换', book: '八上' },
  { key: 'u15', label: '15 泌尿与排泄', book: '八上' },
  { key: 'u16', label: '16 神经调节', book: '八上' },
  { key: 'u17', label: '17 激素调节', book: '八上' },
  { key: 'u18', label: '18 免疫防御', book: '八上' },
  { key: 'u19', label: '19 生活方式与健康', book: '八下' },
  { key: 'u20', label: '20 疾病预防', book: '八下' },
  { key: 'u21', label: '21 医疗与急救', book: '八下' },
  { key: 'u22', label: '22 生殖与延续', book: '八下' },
  { key: 'u23', label: '23 遗传与变异', book: '八下' },
  { key: 'u24', label: '24 生命起源与进化', book: '八下' },
  { key: 'lc',  label: 'LC 衔接专题', book: '衔接' }
];

const points = [
  // ---------- 第五单元 人体所需物质的保障体系 ----------
  {
    id: 'b01', unit: 'u12', book: '八上', chapter: '第12章 第1节',
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
    id: 'b02', unit: 'u12', book: '八上', chapter: '第12章 第2节',
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
    id: 'b03', unit: 'u12', book: '八上', chapter: '第12章 衔接',
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
    id: 'b04', unit: 'u13', book: '八上', chapter: '第13章 第1节',
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
    id: 'b05', unit: 'u13', book: '八上', chapter: '第13章 第2节',
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
    id: 'b06', unit: 'u13', book: '八上', chapter: '第13章 第3节',
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
    id: 'b07', unit: 'u14', book: '八上', chapter: '第14章 第1节',
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
    id: 'b08', unit: 'u14', book: '八上', chapter: '第14章 第2节',
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
    id: 'b09', unit: 'u15', book: '八上', chapter: '第15章 第1节',
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
    id: 'b10', unit: 'u15', book: '八上', chapter: '第15章 第2节',
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
    id: 'b11', unit: 'u16', book: '八上', chapter: '第16章 第1节',
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
    id: 'b12', unit: 'u16', book: '八上', chapter: '第16章 第2节',
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
    id: 'b13', unit: 'u17', book: '八上', chapter: '第17章 第1节',
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
    id: 'b14', unit: 'u17', book: '八上', chapter: '第17章 衔接',
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
    id: 'b15', unit: 'u18', book: '八上', chapter: '第18章 第1节',
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
    id: 'b16', unit: 'u18', book: '八上', chapter: '第18章 第2节',
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
    id: 'b17', unit: 'u19', book: '八下', chapter: '第19章',
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
    id: 'b18', unit: 'u20', book: '八下', chapter: '第20章',
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
    id: 'b19', unit: 'u21', book: '八下', chapter: '第21章',
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
    id: 'b20', unit: 'u22', book: '八下', chapter: '第22章 第1节',
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
    id: 'b21', unit: 'u22', book: '八下', chapter: '第22章 第2节',
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
    id: 'b22', unit: 'u23', book: '八下', chapter: '第23章 第1节',
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
    id: 'b23', unit: 'u23', book: '八下', chapter: '第23章 第2节',
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
    id: 'b24', unit: 'u23', book: '八下', chapter: '第23章 第4节',
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
    id: 'b25', unit: 'u23', book: '八下', chapter: '第23章 第5节',
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
    id: 'b26', unit: 'u24', book: '八下', chapter: '第24章 第1–2节',
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
    id: 'b27', unit: 'u24', book: '八下', chapter: '第24章 第3节',
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
  }
];

module.exports = { units, points };
