/**
 * 法语复习题库 —— 孙辉《简明法语教程（修订版）上册》完整内容
 * 来源：扫描版 PDF，视觉精读书末总词汇表(p456-472)与动词变位表(p445-454)
 * wordList：1153 词条（去重），含词性/释义/课次；旧 42 词的音标与例句按 fr 继承
 * verbList：39 动词 × 5 时态 × 6 人称（现在/未完成过去/复合过去/简单将来/过去将来）
 * grammarLessons：上册语法体系 38 课（A1 语音8+入门10；A2 初级20），按目录逐课转录
 */

const wordList = [
  {
    id: 1,
    fr: "l'Allemagne",
    pos: "n.f.",
    cn: "德国",
    lesson: 26,
    phonetic: "",
    example: "C'est une l'Allemagne.",
    exampleCn: "这是一个德国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 2,
    fr: "aller",
    pos: "v.i.",
    cn: "去，走",
    lesson: 10,
    phonetic: "/ale/",
    example: "Je vais à l’école.",
    exampleCn: "我去上学。",
    hasAudio: true,
    audioId: 1
  },
  {
    id: 3,
    fr: "aller et retour",
    pos: "",
    cn: "往返",
    lesson: 28,
    phonetic: "",
    example: "Un billet aller et retour, s'il vous plaît.",
    exampleCn: "请给我一张往返票。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 4,
    fr: "Allo",
    pos: "interj.",
    cn: "喂",
    lesson: 22,
    phonetic: "",
    example: "Allo, c'est Paul.",
    exampleCn: "喂，我是保罗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 5,
    fr: "alors",
    pos: "adv.",
    cn: "于是，那么",
    lesson: 14,
    phonetic: "",
    example: "Alors, on va au cinéma ?",
    exampleCn: "那么，我们去看电影吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 6,
    fr: "les Alpes",
    pos: "",
    cn: "阿尔卑斯山",
    lesson: 22,
    phonetic: "",
    example: "Nous allons dans les Alpes.",
    exampleCn: "我们去阿尔卑斯山。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 7,
    fr: "l'Alsace",
    pos: "",
    cn: "阿尔萨斯",
    lesson: 28,
    phonetic: "",
    example: "L'Alsace est une belle région.",
    exampleCn: "阿尔萨斯是一个美丽的地区。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 8,
    fr: "améliorer",
    pos: "v.t.",
    cn: "改善，提高",
    lesson: 18,
    phonetic: "",
    example: "J'améliore mon français.",
    exampleCn: "我提高法语。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 9,
    fr: "Américain, e",
    pos: "n.",
    cn: "美国人",
    lesson: 7,
    phonetic: "",
    example: "l．David est un étudiant américain.",
    exampleCn: "大卫是美国的大学生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 10,
    fr: "americanisation",
    pos: "n.f.",
    cn: "美国化",
    lesson: 30,
    phonetic: "",
    example: "C'est une americanisation.",
    exampleCn: "这是美国化。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 11,
    fr: "Amérique",
    pos: "n.f.",
    cn: "美洲",
    lesson: 21,
    phonetic: "",
    example: "C'est Amérique.",
    exampleCn: "这是美洲。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 12,
    fr: "ami, e",
    pos: "n.",
    cn: "朋友",
    lesson: 10,
    phonetic: "",
    example: "C'est un ami.",
    exampleCn: "这是一个朋友。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 13,
    fr: "s'amuser",
    pos: "v.pr.",
    cn: "消遣，娱乐",
    lesson: 27,
    phonetic: "",
    example: "Je m'amuse.",
    exampleCn: "我消遣。",
    hasAudio: false,
    audioId: 3
  },
  {
    id: 14,
    fr: "an",
    pos: "n.m.",
    cn: "年，年龄",
    lesson: 8,
    phonetic: "",
    example: "C'est un an.",
    exampleCn: "这是一个年。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 15,
    fr: "ancien, ne",
    pos: "a.",
    cn: "古旧的，以前的",
    lesson: 12,
    phonetic: "",
    example: "C'est ancien.",
    exampleCn: "这是古旧的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 16,
    fr: "anglais, e",
    pos: "a.",
    cn: "英国的",
    lesson: 9,
    phonetic: "",
    example: "C'est anglais.",
    exampleCn: "这是英国的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 17,
    fr: "Anglais, e",
    pos: "n.",
    cn: "英国人",
    lesson: 11,
    phonetic: "",
    example: "C'est Anglais.",
    exampleCn: "这是英国人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 18,
    fr: "Angleterre",
    pos: "n.f.",
    cn: "英国",
    lesson: 17,
    phonetic: "",
    example: "C'est Angleterre.",
    exampleCn: "这是英国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 19,
    fr: "anglicisme",
    pos: "n.m.",
    cn: "英语的表达方式",
    lesson: 30,
    phonetic: "",
    example: "C'est un anglicisme.",
    exampleCn: "这是一个英语的表达方式。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 20,
    fr: "anglo-saxon, ne",
    pos: "a.",
    cn: "盎格鲁-撒克逊人的",
    lesson: 20,
    phonetic: "",
    example: "C'est anglo-saxon.",
    exampleCn: "这是盎格鲁-撒克逊人的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 21,
    fr: "animal (animaux)",
    pos: "n.m.",
    cn: "动物",
    lesson: 24,
    phonetic: "",
    example: "C'est un animal.",
    exampleCn: "这是一个动物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 22,
    fr: "année",
    pos: "n.f.",
    cn: "年，年代",
    lesson: 9,
    phonetic: "",
    example: "Il a plusieurs fois changé d'adresse cette année.",
    exampleCn: "这一年内他多次更换住址。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 23,
    fr: "annonce",
    pos: "n.f.",
    cn: "告示，启示栏",
    lesson: 13,
    phonetic: "",
    example: "C'est une annonce.",
    exampleCn: "这是一个告示。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 24,
    fr: "antique",
    pos: "a.",
    cn: "古代的，老的",
    lesson: 28,
    phonetic: "",
    example: "C'est antique.",
    exampleCn: "这是古代的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 25,
    fr: "apéritif",
    pos: "n.m.",
    cn: "开胃酒",
    lesson: 18,
    phonetic: "",
    example: "C'est un apéritif.",
    exampleCn: "这是一个开胃酒。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 26,
    fr: "à pied",
    pos: "",
    cn: "步行",
    lesson: 13,
    phonetic: "",
    example: "C'est à pied.",
    exampleCn: "这是步行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 27,
    fr: "appareil",
    pos: "n.m.",
    cn: "仪器，电话机",
    lesson: 22,
    phonetic: "",
    example: "C'est un appareil.",
    exampleCn: "这是一个仪器。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 28,
    fr: "appartement",
    pos: "n.m.",
    cn: "套房",
    lesson: 13,
    phonetic: "",
    example: "Avant de partir en mission,il a laissé la clé de son appartement a un voisin.",
    exampleCn: "出差之前，他把房间钥匙交给了一位邻居。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 29,
    fr: "appeler",
    pos: "v.t.",
    cn: "呼唤，打电话，取名，命名",
    lesson: 20,
    phonetic: "",
    example: "J'appelle.",
    exampleCn: "我呼唤。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 30,
    fr: "s'appeler",
    pos: "v.pr.",
    cn: "名叫",
    lesson: 8,
    phonetic: "",
    example: "Je m'appelle.",
    exampleCn: "我名叫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 31,
    fr: "apprécier",
    pos: "v.t.",
    cn: "给予好评，赏识",
    lesson: 28,
    phonetic: "",
    example: "J'apprécie.",
    exampleCn: "我给予好评。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 32,
    fr: "apprendre",
    pos: "v.t.",
    cn: "学习",
    lesson: 9,
    phonetic: "/apʁɑ̃dʁ/",
    example: "J’apprends le français.",
    exampleCn: "我学法语。",
    hasAudio: true,
    audioId: 4
  },
  {
    id: 33,
    fr: "appuyer",
    pos: "v.i.",
    cn: "按",
    lesson: 22,
    phonetic: "",
    example: "J'appuye.",
    exampleCn: "我按。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 34,
    fr: "après",
    pos: "prép.",
    cn: "在…之后",
    lesson: 18,
    phonetic: "",
    example: "Je viens après toi.",
    exampleCn: "我在你之后来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 35,
    fr: "après-demain",
    pos: "adv.",
    cn: "后天",
    lesson: 22,
    phonetic: "",
    example: "Je pars après-demain.",
    exampleCn: "我后天出发。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 36,
    fr: "après-midi",
    pos: "n.m.",
    cn: "下午",
    lesson: 14,
    phonetic: "",
    example: "C'est un après-midi.",
    exampleCn: "这是一个下午。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 37,
    fr: "approcher",
    pos: "v.t.",
    cn: "走近",
    lesson: 23,
    phonetic: "",
    example: "J'approche.",
    exampleCn: "我走近。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 38,
    fr: "arbre",
    pos: "n.m.",
    cn: "树",
    lesson: 24,
    phonetic: "",
    example: "C'est un arbre.",
    exampleCn: "这是一个树。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 39,
    fr: "argent",
    pos: "n.m.",
    cn: "钱",
    lesson: 17,
    phonetic: "/aʁʒɑ̃/",
    example: "Je n’ai pas d’argent.",
    exampleCn: "我没有钱。",
    hasAudio: true,
    audioId: 5
  },
  {
    id: 40,
    fr: "Arles",
    pos: "",
    cn: "阿尔",
    lesson: 29,
    phonetic: "",
    example: "C'est Arles.",
    exampleCn: "这是阿尔。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 41,
    fr: "arrêt",
    pos: "n.m.",
    cn: "停止",
    lesson: 19,
    phonetic: "",
    example: "C'est un arrêt.",
    exampleCn: "这是一个停止。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 42,
    fr: "s'arrêter",
    pos: "v.pr.",
    cn: "停住",
    lesson: 24,
    phonetic: "",
    example: "Je m'arrête.",
    exampleCn: "我停住。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 43,
    fr: "arrivée",
    pos: "n.f.",
    cn: "到达",
    lesson: 19,
    phonetic: "",
    example: "C'est une arrivée.",
    exampleCn: "这是一个到达。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 44,
    fr: "arriver",
    pos: "v.i.",
    cn: "到达",
    lesson: 18,
    phonetic: "/aʁive/",
    example: "Nous arrivons à Paris.",
    exampleCn: "我们到达巴黎。",
    hasAudio: true,
    audioId: 6
  },
  {
    id: 45,
    fr: "art",
    pos: "n.m.",
    cn: "艺术",
    lesson: 23,
    phonetic: "",
    example: "C'est un art.",
    exampleCn: "这是一个艺术。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 46,
    fr: "article",
    pos: "n.m.",
    cn: "文章，冠词",
    lesson: 22,
    phonetic: "",
    example: "J'aurai fini mon article dans deux minutes.",
    exampleCn: "我一一会儿就能把文章写完。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 47,
    fr: "ascenseur",
    pos: "n.m.",
    cn: "电梯",
    lesson: 12,
    phonetic: "/asɑ̃sœʁ/",
    example: "L’ascenseur est en panne.",
    exampleCn: "电梯坏了。",
    hasAudio: true,
    audioId: 7
  },
  {
    id: 48,
    fr: "aspirateur",
    pos: "n.m.",
    cn: "吸尘器",
    lesson: 7,
    phonetic: "",
    example: "C'est un aspirateur.",
    exampleCn: "这是吸尘器。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 49,
    fr: "s'asseoir",
    pos: "v.pr.",
    cn: "坐下",
    lesson: 21,
    phonetic: "",
    example: "Je m'assois.",
    exampleCn: "我坐下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 50,
    fr: "assez",
    pos: "adv.",
    cn: "足够，相当",
    lesson: 11,
    phonetic: "/ase/",
    example: "J’en ai assez.",
    exampleCn: "我受够了。",
    hasAudio: true,
    audioId: 8
  },
  {
    id: 51,
    fr: "à table",
    pos: "",
    cn: "进餐",
    lesson: 23,
    phonetic: "",
    example: "C'est à table.",
    exampleCn: "这是进餐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 52,
    fr: "atelier",
    pos: "n.m.",
    cn: "车间",
    lesson: 29,
    phonetic: "",
    example: "C'est un atelier.",
    exampleCn: "这是一个车间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 53,
    fr: "à toute heure",
    pos: "",
    cn: "无时不刻",
    lesson: 27,
    phonetic: "",
    example: "C'est à toute heure.",
    exampleCn: "这是无时不刻。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 54,
    fr: "attacher",
    pos: "v.t.",
    cn: "系上，扣紧",
    lesson: 19,
    phonetic: "",
    example: "J'attache.",
    exampleCn: "我系上。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 55,
    fr: "atteindre",
    pos: "v.t.",
    cn: "达到",
    lesson: 29,
    phonetic: "",
    example: "Je atteins.",
    exampleCn: "我达到。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 56,
    fr: "attendre",
    pos: "v.t.",
    cn: "等待",
    lesson: 14,
    phonetic: "/atɑ̃dʁ/",
    example: "J’attends le bus.",
    exampleCn: "我在等公交车。",
    hasAudio: true,
    audioId: 9
  },
  {
    id: 57,
    fr: "attention",
    pos: "n.f.",
    cn: "注意，当心",
    lesson: 15,
    phonetic: "/atɑ̃sjɔ̃/",
    example: "Faites attention !",
    exampleCn: "请注意！",
    hasAudio: true,
    audioId: 10
  },
  {
    id: 58,
    fr: "atterrir",
    pos: "v.i.",
    cn: "降落",
    lesson: 19,
    phonetic: "",
    example: "J'atterris.",
    exampleCn: "我降落。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 59,
    fr: "attirer",
    pos: "v.t.",
    cn: "引起，吸引",
    lesson: 27,
    phonetic: "",
    example: "J'attire.",
    exampleCn: "我引起。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 60,
    fr: "attitude",
    pos: "n.f.",
    cn: "态度",
    lesson: 29,
    phonetic: "",
    example: "C'est une attitude.",
    exampleCn: "这是态度。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 61,
    fr: "au bout de",
    pos: "",
    cn: "在…之后",
    lesson: 30,
    phonetic: "",
    example: "Au bout de la rue, il y a une école.",
    exampleCn: "在街的尽头有一所学校。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 62,
    fr: "aucun, e",
    pos: "a.",
    cn: "任何的，某种的",
    lesson: 29,
    phonetic: "",
    example: "C'est aucun.",
    exampleCn: "这是任何的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 63,
    fr: "au contraire",
    pos: "",
    cn: "相反",
    lesson: 30,
    phonetic: "",
    example: "Ce n'est pas vrai, au contraire !",
    exampleCn: "这不是真的，恰恰相反！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 64,
    fr: "augmenter",
    pos: "v.t.",
    cn: "提高，增长",
    lesson: 25,
    phonetic: "",
    example: "J'augmente.",
    exampleCn: "我提高。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 65,
    fr: "aujourd'hui",
    pos: "adv.",
    cn: "今天",
    lesson: 13,
    phonetic: "",
    example: "Vous avez bonne mine aujourd'hui.",
    exampleCn: "今天，您的脸色挺好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 66,
    fr: "au lieu de",
    pos: "",
    cn: "不…，而…",
    lesson: 24,
    phonetic: "",
    example: "Il boit du café au lieu de thé.",
    exampleCn: "他喝咖啡而不是茶。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 67,
    fr: "au milieu de",
    pos: "",
    cn: "在…中间",
    lesson: 27,
    phonetic: "",
    example: "Il est au milieu de la classe.",
    exampleCn: "他在教室中间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 68,
    fr: "au pied de",
    pos: "",
    cn: "在…脚下",
    lesson: 27,
    phonetic: "",
    example: "Elle est au pied de l'arbre.",
    exampleCn: "她在树脚下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 69,
    fr: "auprès de",
    pos: "",
    cn: "在…旁边",
    lesson: 19,
    phonetic: "",
    example: "Je suis assis auprès de Marie.",
    exampleCn: "我坐在玛丽旁边。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 70,
    fr: "au revoir",
    pos: "",
    cn: "再见",
    lesson: 10,
    phonetic: "",
    example: "Au revoir, à demain !",
    exampleCn: "再见，明天见！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 71,
    fr: "ausculter",
    pos: "v.t.",
    cn: "听诊",
    lesson: 29,
    phonetic: "",
    example: "J'ausculte.",
    exampleCn: "我听诊。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 72,
    fr: "aussi",
    pos: "adv.",
    cn: "也，还",
    lesson: 7,
    phonetic: "",
    example: "Cette rue-ci est aussi large que cette rue-la.",
    exampleCn: "这条街和那条街一样宽。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 73,
    fr: "autobus",
    pos: "n.m.",
    cn: "公共汽车",
    lesson: 25,
    phonetic: "",
    example: "C'est un autobus.",
    exampleCn: "这是一个公共汽车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 74,
    fr: "automne",
    pos: "n.m.",
    cn: "秋天",
    lesson: 18,
    phonetic: "",
    example: "C'est un automne.",
    exampleCn: "这是一个秋天。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 75,
    fr: "automobile",
    pos: "n.f.",
    cn: "汽车业",
    lesson: 26,
    phonetic: "",
    example: "C'est une automobile.",
    exampleCn: "这是一个汽车业。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 76,
    fr: "autonome",
    pos: "a.",
    cn: "自主的",
    lesson: 28,
    phonetic: "",
    example: "C'est autonome.",
    exampleCn: "这是自主的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 77,
    fr: "autoroute",
    pos: "n.f.",
    cn: "高速公路",
    lesson: 28,
    phonetic: "",
    example: "C'est une autoroute.",
    exampleCn: "这是一个高速公路。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 78,
    fr: "autre",
    pos: "a.",
    cn: "另外的，别的",
    lesson: 11,
    phonetic: "",
    example: "C'est autre.",
    exampleCn: "这是另外的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 79,
    fr: "autrefois",
    pos: "adv.",
    cn: "过去",
    lesson: 24,
    phonetic: "",
    example: "Autrefois, je vivais à Paris.",
    exampleCn: "过去我住在巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 80,
    fr: "Auvergne",
    pos: "",
    cn: "奥弗涅",
    lesson: 16,
    phonetic: "",
    example: "C'est Auvergne.",
    exampleCn: "这是奥弗涅。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 81,
    fr: "avancer",
    pos: "v.t., v.i.",
    cn: "使提前，加快",
    lesson: 14,
    phonetic: "",
    example: "J'avance.",
    exampleCn: "我使提前。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 82,
    fr: "avant de",
    pos: "",
    cn: "在…之前",
    lesson: 16,
    phonetic: "",
    example: "Il ma passéun coupdefil avant sondepart.",
    exampleCn: "他临行前给我打来电话。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 83,
    fr: "avec",
    pos: "prép.",
    cn: "和，随着",
    lesson: 10,
    phonetic: "",
    example: "Je vais au cinéma avec mon ami.",
    exampleCn: "我和朋友去看电影。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 84,
    fr: "avec plaisir",
    pos: "",
    cn: "很乐意",
    lesson: 12,
    phonetic: "",
    example: "— Tu viens ? — Avec plaisir !",
    exampleCn: "——你来吗？——很乐意！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 85,
    fr: "avenir",
    pos: "n.m.",
    cn: "前途",
    lesson: 29,
    phonetic: "",
    example: "C'est un avenir.",
    exampleCn: "这是一个前途。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 86,
    fr: "avenue",
    pos: "n.f.",
    cn: "街道，路",
    lesson: 21,
    phonetic: "",
    example: "C'est une avenue.",
    exampleCn: "这是一个街道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 87,
    fr: "Avignon",
    pos: "",
    cn: "阿维尼翁",
    lesson: 28,
    phonetic: "",
    example: "C'est Avignon.",
    exampleCn: "这是阿维尼翁。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 88,
    fr: "avion",
    pos: "n.m.",
    cn: "飞机",
    lesson: 19,
    phonetic: "",
    example: "C'est un avion.",
    exampleCn: "这是一个飞机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 89,
    fr: "avis",
    pos: "n.m.",
    cn: "看法，意见",
    lesson: 30,
    phonetic: "",
    example: "C'est un avis.",
    exampleCn: "这是一个看法。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 90,
    fr: "avocat, e",
    pos: "n.",
    cn: "律师",
    lesson: 3,
    phonetic: "",
    example: "C'est un avocat.",
    exampleCn: "这是一个律师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 91,
    fr: "avoir",
    pos: "v.t.",
    cn: "有",
    lesson: 8,
    phonetic: "",
    example: "J'ai.",
    exampleCn: "我有。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 92,
    fr: "avoir lieu",
    pos: "",
    cn: "举行",
    lesson: 28,
    phonetic: "",
    example: "La réunion a lieu demain.",
    exampleCn: "会议明天举行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 93,
    fr: "bagage",
    pos: "n.m.",
    cn: "行李",
    lesson: 19,
    phonetic: "",
    example: "C'est un bagage.",
    exampleCn: "这是一个行李。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 94,
    fr: "baigner",
    pos: "v.t.",
    cn: "围绕，流经",
    lesson: 26,
    phonetic: "",
    example: "Je baigne.",
    exampleCn: "我围绕。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 95,
    fr: "Balzac",
    pos: "",
    cn: "巴尔扎克",
    lesson: 30,
    phonetic: "",
    example: "C'est Balzac.",
    exampleCn: "这是巴尔扎克。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 96,
    fr: "banc",
    pos: "n.m.",
    cn: "长凳，长椅",
    lesson: 6,
    phonetic: "",
    example: "C'est un banc.",
    exampleCn: "这是一个长凳。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 97,
    fr: "banane",
    pos: "n.f.",
    cn: "香蕉",
    lesson: 6,
    phonetic: "",
    example: "C'est une banane.",
    exampleCn: "这是一个香蕉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 98,
    fr: "banque",
    pos: "n.f.",
    cn: "银行",
    lesson: 12,
    phonetic: "",
    example: "C'est une banque.",
    exampleCn: "这是一个银行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 99,
    fr: "bavarder",
    pos: "v.i.",
    cn: "聊天，闲谈",
    lesson: 18,
    phonetic: "",
    example: "Je bavarde.",
    exampleCn: "我聊天。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 100,
    fr: "beau, belle",
    pos: "a.",
    cn: "好看的，美的",
    lesson: 10,
    phonetic: "",
    example: "C'est beau.",
    exampleCn: "这是好看的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 101,
    fr: "beaucoup",
    pos: "adv.",
    cn: "很多，非常",
    lesson: 10,
    phonetic: "",
    example: "J'ai beaucoup de livres.",
    exampleCn: "我有很多书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 102,
    fr: "beaucoup de",
    pos: "",
    cn: "许多人",
    lesson: 23,
    phonetic: "",
    example: "Son attitude m'a beaucoup frappé.",
    exampleCn: "他的态度使我很吃惊。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 103,
    fr: "beauté",
    pos: "n.f.",
    cn: "美丽",
    lesson: 28,
    phonetic: "",
    example: "C'est une beauté.",
    exampleCn: "这是一个美丽。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 104,
    fr: "Belgique",
    pos: "n.f.",
    cn: "比利时",
    lesson: 26,
    phonetic: "",
    example: "C'est Belgique.",
    exampleCn: "这是比利时。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 105,
    fr: "Berne",
    pos: "",
    cn: "伯尔尼",
    lesson: 3,
    phonetic: "",
    example: "C'est Berne.",
    exampleCn: "这是伯尔尼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 106,
    fr: "besoin",
    pos: "n.m.",
    cn: "需要",
    lesson: 20,
    phonetic: "",
    example: "C'est un besoin.",
    exampleCn: "这是一个需要。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 107,
    fr: "betterave",
    pos: "n.f.",
    cn: "甜菜",
    lesson: 26,
    phonetic: "",
    example: "C'est une betterave.",
    exampleCn: "这是一个甜菜。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 108,
    fr: "bibliothèque",
    pos: "n.f.",
    cn: "图书馆",
    lesson: 20,
    phonetic: "",
    example: "C'est une bibliothèque.",
    exampleCn: "这是一个图书馆。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 109,
    fr: "bien",
    pos: "adv.",
    cn: "好，行",
    lesson: 10,
    phonetic: "",
    example: "Je vais bien, merci.",
    exampleCn: "我很好，谢谢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 110,
    fr: "bien entendu",
    pos: "",
    cn: "当然",
    lesson: 20,
    phonetic: "",
    example: "Bien entendu, je viens.",
    exampleCn: "当然，我来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 111,
    fr: "bien sûr",
    pos: "",
    cn: "肯定，确定",
    lesson: 13,
    phonetic: "",
    example: "ne peux pas bien dormir.",
    exampleCn: "能安睡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 112,
    fr: "bientôt",
    pos: "adv.",
    cn: "不久，马上",
    lesson: 18,
    phonetic: "",
    example: "Je reviens bientôt.",
    exampleCn: "我马上回来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 113,
    fr: "bienvenu, e",
    pos: "n.",
    cn: "受欢迎者",
    lesson: 10,
    phonetic: "",
    example: "C'est un bienvenu.",
    exampleCn: "这是一个受欢迎者。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 114,
    fr: "bière",
    pos: "n.f.",
    cn: "啤酒",
    lesson: 23,
    phonetic: "",
    example: "C'est une bière.",
    exampleCn: "这是一个啤酒。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 115,
    fr: "blé",
    pos: "n.m.",
    cn: "小麦",
    lesson: 27,
    phonetic: "",
    example: "C'est un blé.",
    exampleCn: "这是一个小麦。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 116,
    fr: "bleu, e",
    pos: "a.",
    cn: "蓝色的",
    lesson: 5,
    phonetic: "",
    example: "C'est bleu.",
    exampleCn: "这是蓝色的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 117,
    fr: "bloquer",
    pos: "v.t.",
    cn: "阻塞",
    lesson: 25,
    phonetic: "",
    example: "Je bloque.",
    exampleCn: "我阻塞。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 118,
    fr: "blue-jean",
    pos: "n.m.",
    cn: "[英]牛仔裤",
    lesson: 30,
    phonetic: "",
    example: "C'est un blue-jean.",
    exampleCn: "这是一个[英]牛仔裤。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 119,
    fr: "boire",
    pos: "v.t.",
    cn: "喝",
    lesson: 23,
    phonetic: "",
    example: "Je bois de l'eau.",
    exampleCn: "我喝水。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 120,
    fr: "bois",
    pos: "n.m.",
    cn: "树林",
    lesson: 24,
    phonetic: "",
    example: "C'est un bois.",
    exampleCn: "这是一个树林。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 121,
    fr: "bol",
    pos: "n.m.",
    cn: "碗",
    lesson: 23,
    phonetic: "",
    example: "C'est un bol.",
    exampleCn: "这是一个碗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 122,
    fr: "bon, bonne",
    pos: "a.",
    cn: "好的",
    lesson: 14,
    phonetic: "",
    example: "C'est bon.",
    exampleCn: "这是好的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 123,
    fr: "bon",
    pos: "interj.",
    cn: "好",
    lesson: 14,
    phonetic: "",
    example: "Bon, on commence !",
    exampleCn: "好，我们开始吧！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 124,
    fr: "bonjour",
    pos: "n.m.",
    cn: "早安，您好",
    lesson: 9,
    phonetic: "",
    example: "Ils se serrent la main et se disent bonjour.",
    exampleCn: "他们相互握手问好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 125,
    fr: "boulangerie",
    pos: "n.f.",
    cn: "面包店",
    lesson: 23,
    phonetic: "",
    example: "C'est une boulangerie.",
    exampleCn: "这是一个面包店。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 126,
    fr: "boulevard",
    pos: "n.m.",
    cn: "林荫大道",
    lesson: 30,
    phonetic: "",
    example: "puis vous traversez le boulevard. C'est la.",
    exampleCn: "过马路，就到了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 127,
    fr: "bouquiniste",
    pos: "n.m.",
    cn: "旧书商",
    lesson: 27,
    phonetic: "",
    example: "C'est un bouquiniste.",
    exampleCn: "这是一个旧书商。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 128,
    fr: "bout",
    pos: "n.m.",
    cn: "端部，尽头",
    lesson: 27,
    phonetic: "",
    example: "C'est un bout.",
    exampleCn: "这是一个端部。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 129,
    fr: "bouteille",
    pos: "n.f.",
    cn: "瓶子",
    lesson: 19,
    phonetic: "",
    example: "Si，une bouteille de gin et des cigarettes.",
    exampleCn: "有，一瓶金酒和-一些香烟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 130,
    fr: "boutique",
    pos: "n.f.",
    cn: "店铺",
    lesson: 21,
    phonetic: "",
    example: "C'est une boutique.",
    exampleCn: "这是一个店铺。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 131,
    fr: "bouton",
    pos: "n.m.",
    cn: "按钮",
    lesson: 22,
    phonetic: "",
    example: "C'est un bouton.",
    exampleCn: "这是一个按钮。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 132,
    fr: "breakfast",
    pos: "n.m.",
    cn: "[英]早餐",
    lesson: 20,
    phonetic: "",
    example: "C'est un breakfast.",
    exampleCn: "这是一个[英]早餐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 133,
    fr: "Bretagne",
    pos: "n.f.",
    cn: "布列塔尼",
    lesson: 28,
    phonetic: "",
    example: "C'est Bretagne.",
    exampleCn: "这是布列塔尼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 134,
    fr: "briller",
    pos: "v.i.",
    cn: "闪耀",
    lesson: 24,
    phonetic: "",
    example: "Je brille.",
    exampleCn: "我闪耀。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 135,
    fr: "bruit",
    pos: "n.m.",
    cn: "声音，嘈杂声",
    lesson: 14,
    phonetic: "",
    example: "Il n'y a pas tropde bruit，j'espere.",
    exampleCn: "我想，那儿不会太吵吧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 136,
    fr: "brosse",
    pos: "n.f.",
    cn: "刷子",
    lesson: 6,
    phonetic: "",
    example: "C'est une brosse.",
    exampleCn: "这是一个刷子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 137,
    fr: "brûler",
    pos: "v.t.",
    cn: "烧，焚烧",
    lesson: 25,
    phonetic: "",
    example: "Je brûle.",
    exampleCn: "我烧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 138,
    fr: "brun",
    pos: "n.m.",
    cn: "棕色，褐色",
    lesson: 21,
    phonetic: "",
    example: "C'est un brun.",
    exampleCn: "这是一个棕色。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 139,
    fr: "bureau",
    pos: "n.m.",
    cn: "办公室，办公桌",
    lesson: 13,
    phonetic: "",
    example: "C'est un bureau.",
    exampleCn: "这是一个办公室。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 140,
    fr: "bureau de poste",
    pos: "",
    cn: "邮电所",
    lesson: 22,
    phonetic: "",
    example: "Je vais au bureau de poste.",
    exampleCn: "我去邮局。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 141,
    fr: "ça",
    pos: "pron.",
    cn: "这个，那个",
    lesson: 9,
    phonetic: "",
    example: "Ça va ?",
    exampleCn: "你好吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 142,
    fr: "la cabine téléphonique",
    pos: "",
    cn: "电话间",
    lesson: 0,
    phonetic: "",
    example: "Je téléphone dans la cabine téléphonique.",
    exampleCn: "我在电话亭里打电话。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 143,
    fr: "cabinet",
    pos: "n.m.",
    cn: "诊所，小房间",
    lesson: 29,
    phonetic: "",
    example: "C'est un cabinet.",
    exampleCn: "这是一个诊所。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 144,
    fr: "cadeau(x)",
    pos: "n.m.",
    cn: "礼物",
    lesson: 19,
    phonetic: "",
    example: "C'est un cadeau.",
    exampleCn: "这是一个礼物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 145,
    fr: "ça fait…",
    pos: "",
    cn: "已经…（时间）",
    lesson: 30,
    phonetic: "",
    example: "C'est ça fait….",
    exampleCn: "这是已经…（时间）。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 146,
    fr: "café",
    pos: "n.m.",
    cn: "咖啡店",
    lesson: 16,
    phonetic: "",
    example: "C'est un café.",
    exampleCn: "这是一个咖啡店。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 147,
    fr: "café au lait",
    pos: "",
    cn: "牛奶咖啡",
    lesson: 23,
    phonetic: "",
    example: "Je bois un café au lait.",
    exampleCn: "我喝一杯牛奶咖啡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 148,
    fr: "cahier",
    pos: "n.m.",
    cn: "练习本",
    lesson: 7,
    phonetic: "",
    example: "C'est un cahier.",
    exampleCn: "这是一个练习本。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 149,
    fr: "Calais",
    pos: "",
    cn: "加来",
    lesson: 1,
    phonetic: "",
    example: "C'est Calais.",
    exampleCn: "这是加来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 150,
    fr: "calme",
    pos: "a.",
    cn: "安静的",
    lesson: 20,
    phonetic: "",
    example: "C'est calme.",
    exampleCn: "这是安静的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 151,
    fr: "camarade",
    pos: "n.m.",
    cn: "同志，同学",
    lesson: 4,
    phonetic: "",
    example: "C'est un camarade.",
    exampleCn: "这是一个同志。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 152,
    fr: "camion",
    pos: "n.m.",
    cn: "卡车",
    lesson: 7,
    phonetic: "",
    example: "C'est un camion.",
    exampleCn: "这是一个卡车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 153,
    fr: "campagne",
    pos: "n.f.",
    cn: "乡下，农村",
    lesson: 16,
    phonetic: "",
    example: "C'est une campagne.",
    exampleCn: "这是一个乡下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 154,
    fr: "camper",
    pos: "v.i.",
    cn: "露营",
    lesson: 28,
    phonetic: "",
    example: "Je campe.",
    exampleCn: "我露营。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 155,
    fr: "capitale",
    pos: "n.f.",
    cn: "首都",
    lesson: 27,
    phonetic: "",
    example: "C'est une capitale.",
    exampleCn: "这是一个首都。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 156,
    fr: "car",
    pos: "conj.",
    cn: "因为",
    lesson: 16,
    phonetic: "",
    example: "Je reste à la maison, car il pleut.",
    exampleCn: "我待在家里，因为下雨了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 157,
    fr: "caractère",
    pos: "n.m.",
    cn: "文字",
    lesson: 11,
    phonetic: "",
    example: "C'est un caractère.",
    exampleCn: "这是一个文字。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 158,
    fr: "carte",
    pos: "n.f.",
    cn: "证件，地图",
    lesson: 8,
    phonetic: "",
    example: "C'est une carte.",
    exampleCn: "这是一个证件。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 159,
    fr: "carte d'identité",
    pos: "",
    cn: "身份证",
    lesson: 19,
    phonetic: "",
    example: "carte de crédit,si vous voulez.",
    exampleCn: "话，还可以用信用卡支付呢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 160,
    fr: "cassette",
    pos: "n.f.",
    cn: "盒式磁带",
    lesson: 6,
    phonetic: "",
    example: "C'est une cassette.",
    exampleCn: "这是一个盒式磁带。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 161,
    fr: "cathédrale",
    pos: "n.f.",
    cn: "大教堂",
    lesson: 27,
    phonetic: "",
    example: "C'est une cathédrale.",
    exampleCn: "这是一个大教堂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 162,
    fr: "ça va",
    pos: "",
    cn: "行，可以",
    lesson: 19,
    phonetic: "",
    example: "C'est ça va.",
    exampleCn: "这是行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 163,
    fr: "ce",
    pos: "pron.",
    cn: "这个，那个",
    lesson: 1,
    phonetic: "",
    example: "Ce livre est intéressant.",
    exampleCn: "这本书很有趣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 164,
    fr: "ceinture",
    pos: "n.f.",
    cn: "安全带，腰带",
    lesson: 19,
    phonetic: "",
    example: "C'est une ceinture.",
    exampleCn: "这是一个安全带。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 165,
    fr: "ce jour-là",
    pos: "",
    cn: "那一天",
    lesson: 27,
    phonetic: "",
    example: "Ce jour-là, il neigeait.",
    exampleCn: "那一天下着雪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 166,
    fr: "cela",
    pos: "pron.",
    cn: "这个，那个",
    lesson: 21,
    phonetic: "",
    example: "Cela ne fait rien.",
    exampleCn: "没关系。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 167,
    fr: "célèbre",
    pos: "a.",
    cn: "著名的",
    lesson: 21,
    phonetic: "",
    example: "C'est célèbre.",
    exampleCn: "这是著名的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 168,
    fr: "cent",
    pos: "a., numm.",
    cn: "百",
    lesson: 13,
    phonetic: "",
    example: "C'est cent.",
    exampleCn: "这是百。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 169,
    fr: "centre",
    pos: "n.m.",
    cn: "中心，中央",
    lesson: 25,
    phonetic: "/sɑ̃tʁ/",
    example: "Le centre de Paris.",
    exampleCn: "巴黎市中心。",
    hasAudio: true,
    audioId: 11
  },
  {
    id: 170,
    fr: "certainement",
    pos: "adv.",
    cn: "肯定地，确实地",
    lesson: 29,
    phonetic: "",
    example: "Certainement.",
    exampleCn: "当然。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 171,
    fr: "certes",
    pos: "adv.",
    cn: "当然，的确",
    lesson: 28,
    phonetic: "",
    example: "Certes.",
    exampleCn: "当然。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 172,
    fr: "c'est…",
    pos: "",
    cn: "这是…",
    lesson: 1,
    phonetic: "",
    example: "C'est mon ami Paul.",
    exampleCn: "这是我的朋友保罗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 173,
    fr: "c'est-à-dire",
    pos: "",
    cn: "就是说，即",
    lesson: 29,
    phonetic: "",
    example: "Il est médecin, c'est-à-dire qu'il soigne les gens.",
    exampleCn: "他是医生，也就是说他给人治病。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 174,
    fr: "c'est ça",
    pos: "",
    cn: "是这样",
    lesson: 10,
    phonetic: "",
    example: "C'est ça, tu as raison.",
    exampleCn: "是这样，你说得对。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 175,
    fr: "c'est entendu",
    pos: "",
    cn: "说好了，说定了",
    lesson: 22,
    phonetic: "",
    example: "C'est-a-dire qu'il soignait toutes les maladies.",
    exampleCn: "也就是说他什么病都看。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 176,
    fr: "chacun, e",
    pos: "pron. indéf.",
    cn: "每一个",
    lesson: 30,
    phonetic: "",
    example: "Chacun a son idée.",
    exampleCn: "每个人都有自己的想法。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 177,
    fr: "chaîne",
    pos: "n.f.",
    cn: "山脉，流水作业线",
    lesson: 26,
    phonetic: "",
    example: "C'est une chaîne.",
    exampleCn: "这是一个山脉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 178,
    fr: "chaise",
    pos: "n.f.",
    cn: "椅子",
    lesson: 6,
    phonetic: "/ʃɛz/",
    example: "Une chaise confortable.",
    exampleCn: "一把舒适的椅子。",
    hasAudio: true,
    audioId: 12
  },
  {
    id: 179,
    fr: "chambre",
    pos: "n.f.",
    cn: "卧室，房间",
    lesson: 10,
    phonetic: "/ʃɑ̃bʁ/",
    example: "Ma chambre est petite.",
    exampleCn: "我的卧室很小。",
    hasAudio: true,
    audioId: 13
  },
  {
    id: 180,
    fr: "champ",
    pos: "n.m.",
    cn: "田，耕地",
    lesson: 13,
    phonetic: "",
    example: "C'est un champ.",
    exampleCn: "这是一个田。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 181,
    fr: "chance",
    pos: "n.f.",
    cn: "运气，机遇",
    lesson: 27,
    phonetic: "",
    example: "J'ai décidé de tenter ma chance.",
    exampleCn: "我决定碰一碰运气。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 182,
    fr: "changement",
    pos: "n.m.",
    cn: "更换，改变",
    lesson: 30,
    phonetic: "",
    example: "C'est un changement.",
    exampleCn: "这是更换。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 183,
    fr: "changer",
    pos: "v.t.",
    cn: "改变",
    lesson: 25,
    phonetic: "",
    example: "Je change.",
    exampleCn: "我改变。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 184,
    fr: "se changer",
    pos: "v.pr.",
    cn: "换衣服",
    lesson: 20,
    phonetic: "",
    example: "Je me change.",
    exampleCn: "我换衣服。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 185,
    fr: "chanter",
    pos: "v.i., v.t.",
    cn: "鸣叫，唱歌",
    lesson: 24,
    phonetic: "",
    example: "On entend les oiseaux chanter dans le bois.",
    exampleCn: "人们听见鸟儿在树林中鸣叫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 186,
    fr: "chanteur, euse",
    pos: "n.",
    cn: "歌手",
    lesson: 7,
    phonetic: "",
    example: "C'est un chanteur.",
    exampleCn: "这是歌手。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 187,
    fr: "chaque",
    pos: "a.",
    cn: "每个，各个",
    lesson: 15,
    phonetic: "",
    example: "C'est chaque.",
    exampleCn: "这是每个。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 188,
    fr: "chaud, e",
    pos: "a.",
    cn: "热的",
    lesson: 18,
    phonetic: "",
    example: "C'est chaud.",
    exampleCn: "这是热的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 189,
    fr: "chauffeur",
    pos: "n.m.",
    cn: "司机",
    lesson: 27,
    phonetic: "",
    example: "C'est un chauffeur.",
    exampleCn: "这是司机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 190,
    fr: "check in",
    pos: "",
    cn: "登记入住",
    lesson: 20,
    phonetic: "",
    example: "Nous faisons le check-in à l'hôtel.",
    exampleCn: "我们在酒店登记入住。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 191,
    fr: "check out",
    pos: "",
    cn: "退房",
    lesson: 20,
    phonetic: "",
    example: "On fait le check-out à midi.",
    exampleCn: "我们中午退房。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 192,
    fr: "chef",
    pos: "n.m.",
    cn: "主任，长",
    lesson: 16,
    phonetic: "",
    example: "C'est un chef.",
    exampleCn: "这是一个主任。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 193,
    fr: "chef de classe",
    pos: "",
    cn: "班长",
    lesson: 4,
    phonetic: "",
    example: "Marie est notre chef de classe.",
    exampleCn: "玛丽是我们的班长。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 194,
    fr: "cheminot",
    pos: "n.m.",
    cn: "铁路工人",
    lesson: 17,
    phonetic: "",
    example: "C'est un cheminot.",
    exampleCn: "这是一个铁路工人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 195,
    fr: "chemise",
    pos: "n.f.",
    cn: "衬衣",
    lesson: 6,
    phonetic: "",
    example: "C'est une chemise.",
    exampleCn: "这是一个衬衣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 196,
    fr: "cher, chère",
    pos: "a.",
    cn: "昂贵的",
    lesson: 27,
    phonetic: "",
    example: "C'est cher.",
    exampleCn: "这是昂贵的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 197,
    fr: "cher",
    pos: "",
    cn: "亲爱的",
    lesson: 30,
    phonetic: "",
    example: "Mon cher ami, bonjour !",
    exampleCn: "我亲爱的朋友，你好！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 198,
    fr: "chercher",
    pos: "v.t., v.i.",
    cn: "寻找",
    lesson: 22,
    phonetic: "/ʃɛʁʃe/",
    example: "Je cherche mon livre.",
    exampleCn: "我在找我的书。",
    hasAudio: true,
    audioId: 15
  },
  {
    id: 199,
    fr: "chercheur, se",
    pos: "n.",
    cn: "研究人员",
    lesson: 2,
    phonetic: "",
    example: "C'est un chercheur.",
    exampleCn: "这是研究人员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 200,
    fr: "chewing-gum",
    pos: "n.m.",
    cn: "[英]胶姆糖",
    lesson: 30,
    phonetic: "",
    example: "C'est un chewing-gum.",
    exampleCn: "这是一个[英]胶姆糖。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 201,
    fr: "chez",
    pos: "prép.",
    cn: "在…家里，在…",
    lesson: 10,
    phonetic: "",
    example: "Je vais chez mon oncle.",
    exampleCn: "我去叔叔家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 202,
    fr: "chic",
    pos: "a. inv.",
    cn: "漂亮的，雅致的",
    lesson: 21,
    phonetic: "",
    example: "C'est chic.",
    exampleCn: "这是漂亮的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 203,
    fr: "chien",
    pos: "n.m.",
    cn: "狗",
    lesson: 24,
    phonetic: "",
    example: "Le chasseur appelle son chien.",
    exampleCn: "猎人呼唤他的狗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 204,
    fr: "chimiste",
    pos: "n.m.",
    cn: "化学家",
    lesson: 4,
    phonetic: "",
    example: "C'est un chimiste.",
    exampleCn: "这是一个化学家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 205,
    fr: "Chine",
    pos: "n.f.",
    cn: "中国",
    lesson: 10,
    phonetic: "/ʃin/",
    example: "La Chine est un grand pays.",
    exampleCn: "中国是一个大国。",
    hasAudio: true,
    audioId: 16
  },
  {
    id: 206,
    fr: "Chinois, e",
    pos: "n.",
    cn: "中国人",
    lesson: 7,
    phonetic: "",
    example: "C'est Chinois.",
    exampleCn: "这是中国人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 207,
    fr: "chinois, e",
    pos: "a.",
    cn: "中国的",
    lesson: 10,
    phonetic: "",
    example: "C'est chinois.",
    exampleCn: "这是中国的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 208,
    fr: "chinois",
    pos: "n.m.",
    cn: "汉语",
    lesson: 11,
    phonetic: "",
    example: "Tout le monde parle chinois.",
    exampleCn: "大家都讲中文。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 209,
    fr: "choisir",
    pos: "v.t.",
    cn: "选择",
    lesson: 25,
    phonetic: "/ʃwaziʁ/",
    example: "Je choisis un cadeau.",
    exampleCn: "我选一份礼物。",
    hasAudio: true,
    audioId: 17
  },
  {
    id: 210,
    fr: "choix",
    pos: "n.m.",
    cn: "选择",
    lesson: 19,
    phonetic: "",
    example: "C'est un choix.",
    exampleCn: "这是一个选择。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 211,
    fr: "chômage",
    pos: "n.m.",
    cn: "失业",
    lesson: 17,
    phonetic: "",
    example: "C'est un chômage.",
    exampleCn: "这是一个失业。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 212,
    fr: "chômeur, se",
    pos: "n.",
    cn: "失业的人",
    lesson: 17,
    phonetic: "",
    example: "C'est un chômeur.",
    exampleCn: "这是失业的人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 213,
    fr: "chose",
    pos: "n.f.",
    cn: "事情，东西",
    lesson: 19,
    phonetic: "",
    example: "C'est une chose.",
    exampleCn: "这是一个事情。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 214,
    fr: "ciel",
    pos: "n.m.",
    cn: "天空",
    lesson: 28,
    phonetic: "",
    example: "C'est un ciel.",
    exampleCn: "这是一个天空。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 215,
    fr: "cigarette",
    pos: "n.f.",
    cn: "香烟",
    lesson: 17,
    phonetic: "",
    example: "C'est une cigarette.",
    exampleCn: "这是一个香烟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 216,
    fr: "cinéaste",
    pos: "n.",
    cn: "电影编导",
    lesson: 3,
    phonetic: "",
    example: "C'est un cinéaste.",
    exampleCn: "这是一个电影编导。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 217,
    fr: "cinéma",
    pos: "n.m.",
    cn: "电影，影院",
    lesson: 13,
    phonetic: "/sinema/",
    example: "Allons au cinéma.",
    exampleCn: "我们去看电影吧。",
    hasAudio: true,
    audioId: 18
  },
  {
    id: 218,
    fr: "circulation",
    pos: "n.f.",
    cn: "交通",
    lesson: 25,
    phonetic: "",
    example: "C'est une circulation.",
    exampleCn: "这是交通。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 219,
    fr: "clairement",
    pos: "adv.",
    cn: "清楚地",
    lesson: 22,
    phonetic: "",
    example: "Parle plus clairement, s'il vous plaît.",
    exampleCn: "请说得更清楚些。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 220,
    fr: "classe",
    pos: "n.f.",
    cn: "教室，班",
    lesson: 4,
    phonetic: "",
    example: "Personne n'est dans la classe.",
    exampleCn: "教室里没有--个人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 221,
    fr: "classique",
    pos: "a.",
    cn: "古典的",
    lesson: 28,
    phonetic: "",
    example: "C'est classique.",
    exampleCn: "这是古典的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 222,
    fr: "clef (clé)",
    pos: "n.f.",
    cn: "钥匙",
    lesson: 20,
    phonetic: "",
    example: "C'est une clef.",
    exampleCn: "这是一个钥匙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 223,
    fr: "client, e",
    pos: "n.",
    cn: "顾客",
    lesson: 25,
    phonetic: "",
    example: "C'est un client.",
    exampleCn: "这是一个顾客。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 224,
    fr: "coca-cola",
    pos: "n.m.",
    cn: "[英]可口可乐",
    lesson: 30,
    phonetic: "",
    example: "C'est un coca-cola.",
    exampleCn: "这是一个[英]可口可乐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 225,
    fr: "cœur",
    pos: "n.m.",
    cn: "心脏，中心",
    lesson: 27,
    phonetic: "",
    example: "C'est un cœur.",
    exampleCn: "这是一个心脏。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 226,
    fr: "coffre",
    pos: "n.m.",
    cn: "轿车行李箱",
    lesson: 24,
    phonetic: "",
    example: "C'est un coffre.",
    exampleCn: "这是一个轿车行李箱。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 227,
    fr: "collègue",
    pos: "n.m.",
    cn: "同事",
    lesson: 17,
    phonetic: "",
    example: "C'est un collègue.",
    exampleCn: "这是一个同事。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 228,
    fr: "colline",
    pos: "n.f.",
    cn: "山丘",
    lesson: 26,
    phonetic: "",
    example: "C'est une colline.",
    exampleCn: "这是一个山丘。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 229,
    fr: "combien",
    pos: "adv.",
    cn: "多少",
    lesson: 13,
    phonetic: "",
    example: "Depuis combien de temps êtes-vous ici？",
    exampleCn: "您在这儿多长时间了？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 230,
    fr: "comme",
    pos: "conj.",
    cn: "如同，作为，由于",
    lesson: 9,
    phonetic: "",
    example: "Elle est gentille comme sa mère.",
    exampleCn: "她像她妈妈一样和善。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 231,
    fr: "commencement",
    pos: "n.m.",
    cn: "开端",
    lesson: 18,
    phonetic: "",
    example: "C'est un commencement.",
    exampleCn: "这是开端。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 232,
    fr: "commencer",
    pos: "v.t.",
    cn: "开始",
    lesson: 29,
    phonetic: "",
    example: "Je commence.",
    exampleCn: "我开始。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 233,
    fr: "comment",
    pos: "adv.",
    cn: "怎样，如何",
    lesson: 8,
    phonetic: "",
    example: "Comment avez-vous su cela？",
    exampleCn: "您怎么知道这事的？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 234,
    fr: "commerçant, e",
    pos: "n.",
    cn: "商人",
    lesson: 25,
    phonetic: "",
    example: "C'est un commerçant.",
    exampleCn: "这是一个商人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 235,
    fr: "commerce",
    pos: "n.m.",
    cn: "商业，贸易",
    lesson: 25,
    phonetic: "",
    example: "C'est un commerce.",
    exampleCn: "这是一个商业。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 236,
    fr: "communication",
    pos: "n.f.",
    cn: "通讯，联络",
    lesson: 30,
    phonetic: "",
    example: "C'est une communication.",
    exampleCn: "这是通讯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 237,
    fr: "compagnie",
    pos: "n.f.",
    cn: "公司",
    lesson: 19,
    phonetic: "",
    example: "Elle travaille dans une compagnie multinationale.",
    exampleCn: "她在一家跨国公司工作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 238,
    fr: "complet, ète",
    pos: "a.",
    cn: "完全的",
    lesson: 19,
    phonetic: "",
    example: "C'est complet.",
    exampleCn: "这是完全的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 239,
    fr: "compliqué, e",
    pos: "a.",
    cn: "复杂的",
    lesson: 23,
    phonetic: "",
    example: "C'est compliqué.",
    exampleCn: "这是复杂的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 240,
    fr: "comporter",
    pos: "v.t.",
    cn: "包括",
    lesson: 24,
    phonetic: "",
    example: "Je comporte.",
    exampleCn: "我包括。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 241,
    fr: "comprendre",
    pos: "v.t.",
    cn: "懂，理解",
    lesson: 15,
    phonetic: "",
    example: "Ce livre est difficile a comprendre.",
    exampleCn: "这本书难懂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 242,
    fr: "concierge",
    pos: "n.f.",
    cn: "看门人",
    lesson: 12,
    phonetic: "",
    example: "C'est une concierge.",
    exampleCn: "这是一个看门人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 243,
    fr: "condition",
    pos: "n.f.",
    cn: "条件",
    lesson: 30,
    phonetic: "",
    example: "C'est une condition.",
    exampleCn: "这是条件。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 244,
    fr: "conducteur, trice",
    pos: "n.",
    cn: "开车的人",
    lesson: 24,
    phonetic: "",
    example: "C'est un conducteur.",
    exampleCn: "这是开车的人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 245,
    fr: "conduire",
    pos: "v.t.",
    cn: "驾驶",
    lesson: 24,
    phonetic: "",
    example: "Je conduis.",
    exampleCn: "我驾驶。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 246,
    fr: "confiture",
    pos: "n.f.",
    cn: "果酱",
    lesson: 23,
    phonetic: "",
    example: "Je prends de la confiture tous les matins,parce que j'aime la confiture.",
    exampleCn: "我每天早晨吃果酱，因为我喜欢果酱。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 247,
    fr: "confortable",
    pos: "a.",
    cn: "舒适的",
    lesson: 13,
    phonetic: "",
    example: "C'est confortable.",
    exampleCn: "这是舒适的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 248,
    fr: "congé",
    pos: "n.m.",
    cn: "假期，休假",
    lesson: 16,
    phonetic: "",
    example: "C'est un congé.",
    exampleCn: "这是一个假期。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 249,
    fr: "conjugaison",
    pos: "n.f.",
    cn: "动词变位",
    lesson: 9,
    phonetic: "",
    example: "C'est une conjugaison.",
    exampleCn: "这是一个动词变位。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 250,
    fr: "connaissance",
    pos: "n.f.",
    cn: "认识，结识",
    lesson: 20,
    phonetic: "",
    example: "Enchanté de faire votre connaissance.",
    exampleCn: "认识您很高兴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 251,
    fr: "connaître",
    pos: "v.t.",
    cn: "知道，熟悉",
    lesson: 17,
    phonetic: "",
    example: "Je connais cette ville.",
    exampleCn: "我了解这座城市。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 252,
    fr: "se connaître",
    pos: "v.pr.",
    cn: "相识",
    lesson: 21,
    phonetic: "",
    example: "Je me connais.",
    exampleCn: "我相识。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 253,
    fr: "conseil",
    pos: "n.m.",
    cn: "建议",
    lesson: 23,
    phonetic: "",
    example: "C'est un conseil.",
    exampleCn: "这是一个建议。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 254,
    fr: "construction",
    pos: "n.f.",
    cn: "建筑，制造",
    lesson: 26,
    phonetic: "",
    example: "C'est une construction.",
    exampleCn: "这是建筑。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 255,
    fr: "construire",
    pos: "v.t.",
    cn: "建设，建造",
    lesson: 27,
    phonetic: "",
    example: "René va faire construire une maison en banlieue.",
    exampleCn: "勒内将在郊区建一所房子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 256,
    fr: "content, e",
    pos: "a.",
    cn: "高兴的",
    lesson: 16,
    phonetic: "",
    example: "Je suis très content de vous revoir.",
    exampleCn: "我非常高兴再次见到您。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 257,
    fr: "continuer",
    pos: "v.t.",
    cn: "继续",
    lesson: 30,
    phonetic: "",
    example: "Je continue.",
    exampleCn: "我继续。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 258,
    fr: "contre",
    pos: "prép.",
    cn: "反对",
    lesson: 30,
    phonetic: "",
    example: "Je suis contre cette idée.",
    exampleCn: "我反对这个想法。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 259,
    fr: "conversation",
    pos: "n.f.",
    cn: "交谈",
    lesson: 9,
    phonetic: "",
    example: "C'est une conversation.",
    exampleCn: "这是交谈。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 260,
    fr: "copain, copine",
    pos: "n.",
    cn: "同学",
    lesson: 15,
    phonetic: "",
    example: "C'est un copain.",
    exampleCn: "这是一个同学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 261,
    fr: "copieux, se",
    pos: "a.",
    cn: "丰富的",
    lesson: 23,
    phonetic: "",
    example: "C'est copieux.",
    exampleCn: "这是丰富的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 262,
    fr: "Copernic",
    pos: "n.m.",
    cn: "哥白尼",
    lesson: 11,
    phonetic: "",
    example: "C'est Copernic.",
    exampleCn: "这是哥白尼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 263,
    fr: "Côte d'Azur",
    pos: "n.f.",
    cn: "蓝色海岸",
    lesson: 28,
    phonetic: "",
    example: "C'est Côte d'Azur.",
    exampleCn: "这是蓝色海岸。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 264,
    fr: "se coucher",
    pos: "v.pr.",
    cn: "睡觉",
    lesson: 16,
    phonetic: "",
    example: "Je me couche.",
    exampleCn: "我睡觉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 265,
    fr: "coudre",
    pos: "v.t.",
    cn: "缝",
    lesson: 29,
    phonetic: "",
    example: "Je couds.",
    exampleCn: "我缝。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 266,
    fr: "couleur",
    pos: "n.f.",
    cn: "颜色",
    lesson: 5,
    phonetic: "",
    example: "C'est une couleur.",
    exampleCn: "这是颜色。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 267,
    fr: "couloir",
    pos: "n.m.",
    cn: "通道，走廊",
    lesson: 24,
    phonetic: "",
    example: "C'est un couloir.",
    exampleCn: "这是一个通道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 268,
    fr: "cour",
    pos: "n.f.",
    cn: "院子",
    lesson: 27,
    phonetic: "",
    example: "C'est une cour.",
    exampleCn: "这是一个院子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 269,
    fr: "courir",
    pos: "v.i.",
    cn: "跑",
    lesson: 26,
    phonetic: "",
    example: "Je cours.",
    exampleCn: "我跑。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 270,
    fr: "courrier",
    pos: "n.m.",
    cn: "邮件",
    lesson: 12,
    phonetic: "",
    example: "C'est un courrier.",
    exampleCn: "这是一个邮件。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 271,
    fr: "cours",
    pos: "n.m.",
    cn: "课",
    lesson: 10,
    phonetic: "",
    example: "C'est un cours.",
    exampleCn: "这是一个课。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 272,
    fr: "cours d'eau",
    pos: "n.m.",
    cn: "河流",
    lesson: 26,
    phonetic: "",
    example: "C'est un cours d'eau.",
    exampleCn: "这是一个河流。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 273,
    fr: "course",
    pos: "n.f.",
    cn: "购货",
    lesson: 25,
    phonetic: "",
    example: "C'est une course.",
    exampleCn: "这是一个购货。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 274,
    fr: "court, e",
    pos: "a.",
    cn: "短的",
    lesson: 28,
    phonetic: "",
    example: "C'est Pascal qui court le plus vite.",
    exampleCn: "帕斯卡尔跑得最快。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 275,
    fr: "crayon",
    pos: "n.m.",
    cn: "铅笔",
    lesson: 7,
    phonetic: "",
    example: "C'est un crayon.",
    exampleCn: "这是一个铅笔。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 276,
    fr: "crier",
    pos: "v.i.",
    cn: "喊叫",
    lesson: 14,
    phonetic: "",
    example: "Je crie.",
    exampleCn: "我喊叫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 277,
    fr: "croire",
    pos: "v.t.",
    cn: "相信，认为",
    lesson: 21,
    phonetic: "",
    example: "Je crois.",
    exampleCn: "我相信。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 278,
    fr: "croissant",
    pos: "n.m.",
    cn: "月牙形面包，牛角面包",
    lesson: 23,
    phonetic: "",
    example: "C'est un croissant.",
    exampleCn: "这是一个月牙形面包。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 279,
    fr: "cuisine",
    pos: "n.f.",
    cn: "厨房，烹饪，菜肴",
    lesson: 13,
    phonetic: "",
    example: "C'est une cuisine.",
    exampleCn: "这是一个厨房。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 280,
    fr: "cultiver",
    pos: "v.t.",
    cn: "种植",
    lesson: 26,
    phonetic: "",
    example: "Je cultive.",
    exampleCn: "我种植。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 281,
    fr: "culturel, le",
    pos: "a.",
    cn: "文化的",
    lesson: 27,
    phonetic: "",
    example: "C'est culturel.",
    exampleCn: "这是文化的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 282,
    fr: "curieux, se",
    pos: "n., a.",
    cn: "好奇的人，好奇的",
    lesson: 27,
    phonetic: "",
    example: "C'est un curieux.",
    exampleCn: "这是一个好奇的人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 283,
    fr: "d'accord",
    pos: "",
    cn: "同意，好吧",
    lesson: 13,
    phonetic: "",
    example: "Beaucoup sont d'accord avec vous.",
    exampleCn: "许多人同意您的意见。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 284,
    fr: "dame",
    pos: "n.m.",
    cn: "妇女",
    lesson: 24,
    phonetic: "",
    example: "C'est un dame.",
    exampleCn: "这是一个妇女。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 285,
    fr: "dans",
    pos: "prép.",
    cn: "在…里，处于…",
    lesson: 7,
    phonetic: "",
    example: "Le livre est dans le sac.",
    exampleCn: "书在包里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 286,
    fr: "d'autre part",
    pos: "",
    cn: "此外",
    lesson: 25,
    phonetic: "",
    example: "D'autre part, il faut partir tôt.",
    exampleCn: "另一方面，得早点出发。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 287,
    fr: "de… à…",
    pos: "",
    cn: "从…到…",
    lesson: 10,
    phonetic: "",
    example: "Je travaille de neuf heures à cinq heures.",
    exampleCn: "我从九点工作到五点。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 288,
    fr: "décentralisation",
    pos: "n.f.",
    cn: "地方分权",
    lesson: 28,
    phonetic: "",
    example: "C'est une décentralisation.",
    exampleCn: "这是地方分权。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 289,
    fr: "décider",
    pos: "v.t.",
    cn: "决定",
    lesson: 29,
    phonetic: "",
    example: "Je décide de partir.",
    exampleCn: "我决定出发。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 290,
    fr: "déclarer",
    pos: "v.t.",
    cn: "申报，声明",
    lesson: 19,
    phonetic: "",
    example: "Je déclare.",
    exampleCn: "我申报。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 291,
    fr: "découvrir",
    pos: "v.t.",
    cn: "发现，发明",
    lesson: 29,
    phonetic: "",
    example: "Je découvris.",
    exampleCn: "我发现。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 292,
    fr: "décréter",
    pos: "v.t.",
    cn: "颁布法令",
    lesson: 30,
    phonetic: "",
    example: "Je décrète.",
    exampleCn: "我颁布法令。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 293,
    fr: "décrocher",
    pos: "v.t.",
    cn: "拿起（电话听筒）",
    lesson: 22,
    phonetic: "",
    example: "Je décroche.",
    exampleCn: "我拿起（电话听筒）。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 294,
    fr: "déjà",
    pos: "adv.",
    cn: "已经",
    lesson: 10,
    phonetic: "",
    example: "J'ai déjà fini.",
    exampleCn: "我已经完成了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 295,
    fr: "déjeuner",
    pos: "n.m., v.i.",
    cn: "午餐，用午餐，吃早饭",
    lesson: 14,
    phonetic: "",
    example: "C'est un déjeuner.",
    exampleCn: "这是一个午餐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 296,
    fr: "délavé, e",
    pos: "a.",
    cn: "褪色的",
    lesson: 30,
    phonetic: "",
    example: "C'est délavé.",
    exampleCn: "这是褪色的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 297,
    fr: "délicieux, se",
    pos: "a.",
    cn: "可口的，美味的",
    lesson: 23,
    phonetic: "",
    example: "C'est délicieux.",
    exampleCn: "这是可口的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 298,
    fr: "demain",
    pos: "adv.",
    cn: "明天",
    lesson: 18,
    phonetic: "",
    example: "Je partirai le 19，c'est-a-dire aprés-demain.",
    exampleCn: "我19号走，也就是说后天走。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 299,
    fr: "demander",
    pos: "v.t.",
    cn: "请求，问",
    lesson: 14,
    phonetic: "",
    example: "Je viens vous demander un service.",
    exampleCn: "我来请您帮个忙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 300,
    fr: "de même",
    pos: "",
    cn: "同样地",
    lesson: 17,
    phonetic: "",
    example: "Je pense de même.",
    exampleCn: "我也这么想。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 301,
    fr: "demi, e",
    pos: "a.",
    cn: "半，一半",
    lesson: 14,
    phonetic: "",
    example: "C'est demi.",
    exampleCn: "这是半。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 302,
    fr: "demi-heure",
    pos: "n.f.",
    cn: "半小时",
    lesson: 14,
    phonetic: "",
    example: "C'est une demi-heure.",
    exampleCn: "这是一个半小时。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 303,
    fr: "de moins en moins",
    pos: "",
    cn: "越来越（少）",
    lesson: 22,
    phonetic: "",
    example: "Il parle de moins en moins.",
    exampleCn: "他说得越来越少。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 304,
    fr: "départ",
    pos: "n.m.",
    cn: "出发",
    lesson: 19,
    phonetic: "",
    example: "C'est un départ.",
    exampleCn: "这是一个出发。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 305,
    fr: "département",
    pos: "n.m.",
    cn: "系",
    lesson: 9,
    phonetic: "",
    example: "C'est un département.",
    exampleCn: "这是系。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 306,
    fr: "dépendre",
    pos: "v.i., ind.",
    cn: "依…而定",
    lesson: 25,
    phonetic: "",
    example: "Je dépends.",
    exampleCn: "我依…而定。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 307,
    fr: "de plus en plus",
    pos: "",
    cn: "越来越多",
    lesson: 25,
    phonetic: "",
    example: "Il fait de plus en plus froid.",
    exampleCn: "天气越来越冷。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 308,
    fr: "dernière, e",
    pos: "a.",
    cn: "最后的，最近的",
    lesson: 20,
    phonetic: "",
    example: "C'est dernière.",
    exampleCn: "这是最后的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 309,
    fr: "derrière",
    pos: "prép.",
    cn: "在…后面",
    lesson: 7,
    phonetic: "",
    example: "Le chat est derrière la porte.",
    exampleCn: "猫在门后面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 310,
    fr: "descendre",
    pos: "v.i.",
    cn: "下，走下",
    lesson: 19,
    phonetic: "",
    example: "Je descends.",
    exampleCn: "我下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 311,
    fr: "désolé, e",
    pos: "a.",
    cn: "感到抱歉",
    lesson: 24,
    phonetic: "",
    example: "C'est désolé.",
    exampleCn: "这是感到抱歉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 312,
    fr: "dès que",
    pos: "",
    cn: "一…就…",
    lesson: 28,
    phonetic: "",
    example: "Je viens dès que tu m'appelles.",
    exampleCn: "你一叫我我就来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 313,
    fr: "dessert",
    pos: "n.m.",
    cn: "甜食",
    lesson: 23,
    phonetic: "",
    example: "C'est un dessert.",
    exampleCn: "这是一个甜食。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 314,
    fr: "dessin",
    pos: "n.m.",
    cn: "图画",
    lesson: 0,
    phonetic: "",
    example: "C'est un dessin.",
    exampleCn: "这是一个图画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 315,
    fr: "dessiner",
    pos: "v.t.",
    cn: "绘画",
    lesson: 30,
    phonetic: "",
    example: "Je dessine.",
    exampleCn: "我绘画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 316,
    fr: "destination",
    pos: "n.f.",
    cn: "目的地",
    lesson: 27,
    phonetic: "",
    example: "C'est une destination.",
    exampleCn: "这是目的地。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 317,
    fr: "déterminer",
    pos: "v.t.",
    cn: "确定",
    lesson: 24,
    phonetic: "",
    example: "Je détermine.",
    exampleCn: "我确定。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 318,
    fr: "devant",
    pos: "prép.",
    cn: "在…前面",
    lesson: 7,
    phonetic: "",
    example: "Il attend son frere devant le bureau.",
    exampleCn: "他在办公室前等候他兄弟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 319,
    fr: "développement",
    pos: "n.m.",
    cn: "发展",
    lesson: 25,
    phonetic: "",
    example: "C'est un développement.",
    exampleCn: "这是发展。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 320,
    fr: "développer",
    pos: "v.t.",
    cn: "发展",
    lesson: 26,
    phonetic: "",
    example: "Je développe.",
    exampleCn: "我发展。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 321,
    fr: "se développer",
    pos: "v.pr.",
    cn: "发展",
    lesson: 28,
    phonetic: "",
    example: "Je me développe.",
    exampleCn: "我发展。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 322,
    fr: "devenir",
    pos: "v.i.",
    cn: "变成，变得",
    lesson: 1,
    phonetic: "",
    example: "Je deviens.",
    exampleCn: "我变成。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 323,
    fr: "devoir",
    pos: "v.t.",
    cn: "应该",
    lesson: 14,
    phonetic: "",
    example: "Je dois.",
    exampleCn: "我应该。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 324,
    fr: "devoirs",
    pos: "n.m.pl.",
    cn: "作业",
    lesson: 10,
    phonetic: "",
    example: "J'ai des devoirs a faire.",
    exampleCn: "我要做作业。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 325,
    fr: "dialogue",
    pos: "n.m.",
    cn: "对话",
    lesson: 8,
    phonetic: "",
    example: "C'est un dialogue.",
    exampleCn: "这是一个对话。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 326,
    fr: "différent, e",
    pos: "a.",
    cn: "不同的，有差别的",
    lesson: 28,
    phonetic: "",
    example: "C'est différent.",
    exampleCn: "这是不同的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 327,
    fr: "difficile",
    pos: "a.",
    cn: "困难的",
    lesson: 9,
    phonetic: "",
    example: "Il se trouve dans une situation difficile.",
    exampleCn: "他的处境很困难。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 328,
    fr: "Dijon",
    pos: "",
    cn: "第戎",
    lesson: 28,
    phonetic: "",
    example: "C'est Dijon.",
    exampleCn: "这是第戎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 329,
    fr: "dimanche",
    pos: "n.m.",
    cn: "星期日",
    lesson: 10,
    phonetic: "",
    example: "C'est un dimanche.",
    exampleCn: "这是一个星期日。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 330,
    fr: "dîner",
    pos: "n.m., v.t.",
    cn: "进晚餐",
    lesson: 22,
    phonetic: "",
    example: "C'est un dîner.",
    exampleCn: "这是一个进晚餐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 331,
    fr: "dire",
    pos: "v.t.",
    cn: "说，告诉",
    lesson: 14,
    phonetic: "/diʁ/",
    example: "Je te dis bonjour.",
    exampleCn: "我跟你说你好。",
    hasAudio: true,
    audioId: 19
  },
  {
    id: 332,
    fr: "directeur, trice",
    pos: "n.",
    cn: "经理，主任，厂长",
    lesson: 13,
    phonetic: "",
    example: "C'est le directeur que je voudrais voir.",
    exampleCn: "我想见经理。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 333,
    fr: "disposer",
    pos: "v.t. ind.",
    cn: "支配，拥有",
    lesson: 28,
    phonetic: "",
    example: "Je dispose.",
    exampleCn: "我支配。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 334,
    fr: "disque",
    pos: "n.m.",
    cn: "唱片",
    lesson: 6,
    phonetic: "",
    example: "C'est un disque.",
    exampleCn: "这是一个唱片。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 335,
    fr: "distinguer",
    pos: "v.t.",
    cn: "区分",
    lesson: 24,
    phonetic: "",
    example: "Je distingue.",
    exampleCn: "我区分。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 336,
    fr: "diviser",
    pos: "v.t.",
    cn: "划分",
    lesson: 24,
    phonetic: "",
    example: "Je divise.",
    exampleCn: "我划分。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 337,
    fr: "dizaine",
    pos: "n.f.",
    cn: "十个左右",
    lesson: 12,
    phonetic: "",
    example: "C'est une dizaine.",
    exampleCn: "这是一个十个左右。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 338,
    fr: "docteur",
    pos: "n.m.",
    cn: "医生",
    lesson: 29,
    phonetic: "",
    example: "Docteur，j'ai mal à la téte.",
    exampleCn: "大夫,我头痛。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 339,
    fr: "document",
    pos: "n.m.",
    cn: "文件，资料",
    lesson: 26,
    phonetic: "/dɔkymɑ̃/",
    example: "Ce document est important.",
    exampleCn: "这份文件很重要。",
    hasAudio: true,
    audioId: 20
  },
  {
    id: 340,
    fr: "domaine",
    pos: "n.m.",
    cn: "范围，领域",
    lesson: 6,
    phonetic: "",
    example: "C'est un domaine.",
    exampleCn: "这是一个范围。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 341,
    fr: "domicile",
    pos: "n.m.",
    cn: "住处，住宅",
    lesson: 29,
    phonetic: "",
    example: "C'est un domicile.",
    exampleCn: "这是一个住处。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 342,
    fr: "dominer",
    pos: "v.t.",
    cn: "俯视，超出",
    lesson: 27,
    phonetic: "",
    example: "Je domine.",
    exampleCn: "我俯视。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 343,
    fr: "donc",
    pos: "conj.",
    cn: "因此，所以",
    lesson: 25,
    phonetic: "",
    example: "Il pleut, donc je prends un parapluie.",
    exampleCn: "下雨了，所以我带把伞。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 344,
    fr: "donner",
    pos: "v.t.",
    cn: "给予",
    lesson: 15,
    phonetic: "",
    example: "Peux-tu donner cesCDa Marie？",
    exampleCn: "你能把这些光盘给玛丽吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 345,
    fr: "dormir",
    pos: "v.i.",
    cn: "入睡",
    lesson: 22,
    phonetic: "/dɔʁmiʁ/",
    example: "Je dors huit heures.",
    exampleCn: "我睡八个小时。",
    hasAudio: true,
    audioId: 21
  },
  {
    id: 346,
    fr: "d'où",
    pos: "",
    cn: "从…（某处）",
    lesson: 22,
    phonetic: "",
    example: "Il est parti d'où ?",
    exampleCn: "他从哪里出发的？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 347,
    fr: "douane",
    pos: "n.f.",
    cn: "海关",
    lesson: 19,
    phonetic: "",
    example: "C'est une douane.",
    exampleCn: "这是一个海关。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 348,
    fr: "douanier",
    pos: "n.m.",
    cn: "海关人员",
    lesson: 19,
    phonetic: "",
    example: "C'est un douanier.",
    exampleCn: "这是一个海关人员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 349,
    fr: "douche",
    pos: "n.f.",
    cn: "淋浴",
    lesson: 20,
    phonetic: "",
    example: "C'est une douche.",
    exampleCn: "这是一个淋浴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 350,
    fr: "doux, ce",
    pos: "a.",
    cn: "温和的",
    lesson: 18,
    phonetic: "",
    example: "C'est doux.",
    exampleCn: "这是温和的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 351,
    fr: "drapeau(x)",
    pos: "n.m.",
    cn: "旗子",
    lesson: 5,
    phonetic: "",
    example: "C'est un drapeau.",
    exampleCn: "这是一个旗子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 352,
    fr: "drôle",
    pos: "a.",
    cn: "滑稽的，好笑的",
    lesson: 24,
    phonetic: "",
    example: "C'est drôle.",
    exampleCn: "这是滑稽的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 353,
    fr: "dur, e",
    pos: "a.",
    cn: "沉重的，艰苦的",
    lesson: 12,
    phonetic: "",
    example: "C'est dur.",
    exampleCn: "这是沉重的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 354,
    fr: "durée",
    pos: "n.f.",
    cn: "期限，在…时间内",
    lesson: 25,
    phonetic: "",
    example: "C'est une durée.",
    exampleCn: "这是一个期限。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 355,
    fr: "eau",
    pos: "n.f.",
    cn: "水",
    lesson: 23,
    phonetic: "",
    example: "C'est une eau.",
    exampleCn: "这是一个水。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 356,
    fr: "éclairer",
    pos: "v.t.",
    cn: "照亮",
    lesson: 29,
    phonetic: "",
    example: "J'éclaire.",
    exampleCn: "我照亮。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 357,
    fr: "école",
    pos: "n.f.",
    cn: "学校",
    lesson: 8,
    phonetic: "/ekɔl/",
    example: "L’école commence à huit heures.",
    exampleCn: "学校八点开始上课。",
    hasAudio: true,
    audioId: 22
  },
  {
    id: 358,
    fr: "école maternelle",
    pos: "",
    cn: "幼儿园",
    lesson: 30,
    phonetic: "",
    example: "C'est école maternelle.",
    exampleCn: "这是幼儿园。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 359,
    fr: "école primaire",
    pos: "",
    cn: "小学",
    lesson: 15,
    phonetic: "",
    example: "C'est école primaire.",
    exampleCn: "这是小学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 360,
    fr: "école secondaire",
    pos: "",
    cn: "中学",
    lesson: 15,
    phonetic: "",
    example: "Il a envoyé son fils ainé a une école militaire.",
    exampleCn: "他把长子送进一所军事院校。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 361,
    fr: "économie",
    pos: "n.f.",
    cn: "经济",
    lesson: 26,
    phonetic: "",
    example: "Notre économie connait un nouvel essor.",
    exampleCn: "我们的经济有一个新的飞跃。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 362,
    fr: "économiste",
    pos: "n.m.",
    cn: "经济学家",
    lesson: 3,
    phonetic: "",
    example: "C'est économiste.",
    exampleCn: "这是经济学家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 363,
    fr: "écouter",
    pos: "v.t.",
    cn: "听，听从",
    lesson: 11,
    phonetic: "/ekute/",
    example: "Écoutez la musique !",
    exampleCn: "请听音乐！",
    hasAudio: true,
    audioId: 24
  },
  {
    id: 364,
    fr: "écrire",
    pos: "v.t.",
    cn: "写",
    lesson: 1,
    phonetic: "/ekʁiʁ/",
    example: "J’écris une lettre.",
    exampleCn: "我在写一封信。",
    hasAudio: true,
    audioId: 23
  },
  {
    id: 365,
    fr: "s'écrire",
    pos: "v.pr.",
    cn: "互相写信",
    lesson: 22,
    phonetic: "",
    example: "Je m'écris.",
    exampleCn: "我互相写信。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 366,
    fr: "écrivain",
    pos: "n.m.",
    cn: "作家",
    lesson: 30,
    phonetic: "",
    example: "Cet écrivain est aimé de tous les lecteurs.",
    exampleCn: "这个作家得到所有读者的喜爱。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 367,
    fr: "efficace",
    pos: "a.",
    cn: "有效的",
    lesson: 22,
    phonetic: "",
    example: "C'est efficace.",
    exampleCn: "这是有效的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 368,
    fr: "église",
    pos: "n.f.",
    cn: "教堂",
    lesson: 18,
    phonetic: "",
    example: "C'est église.",
    exampleCn: "这是教堂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 369,
    fr: "eh bien",
    pos: "",
    cn: "怎么，好吧",
    lesson: 29,
    phonetic: "",
    example: "Eh bien, je ne sais pas.",
    exampleCn: "嗯，我不知道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 370,
    fr: "élégance",
    pos: "n.f.",
    cn: "优美，雅致",
    lesson: 21,
    phonetic: "",
    example: "C'est élégance.",
    exampleCn: "这是优美。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 371,
    fr: "élevage",
    pos: "n.m.",
    cn: "饲养，畜牧",
    lesson: 26,
    phonetic: "",
    example: "C'est élevage.",
    exampleCn: "这是饲养。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 372,
    fr: "élève",
    pos: "n.",
    cn: "学生",
    lesson: 15,
    phonetic: "/elɛv/",
    example: "Elle est une bonne élève.",
    exampleCn: "她是个好学生。",
    hasAudio: true,
    audioId: 25
  },
  {
    id: 373,
    fr: "s'élever",
    pos: "v.pr.",
    cn: "矗立",
    lesson: 27,
    phonetic: "",
    example: "Je m'élève.",
    exampleCn: "我矗立。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 374,
    fr: "elle",
    pos: "pron.",
    cn: "她",
    lesson: 1,
    phonetic: "",
    example: "Elle est ma sœur.",
    exampleCn: "她是我姐姐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 375,
    fr: "embouteillage",
    pos: "n.m.",
    cn: "交通阻塞",
    lesson: 27,
    phonetic: "",
    example: "C'est un embouteillage.",
    exampleCn: "这是一个交通阻塞。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 376,
    fr: "emmener",
    pos: "v.t.",
    cn: "带走，带去",
    lesson: 22,
    phonetic: "",
    example: "J'emmene.",
    exampleCn: "我带走。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 377,
    fr: "employé, e",
    pos: "n.",
    cn: "职员",
    lesson: 13,
    phonetic: "",
    example: "C'est un employé.",
    exampleCn: "这是一个职员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 378,
    fr: "s'employer",
    pos: "v.pr.",
    cn: "被使用",
    lesson: 30,
    phonetic: "",
    example: "Je m'employe.",
    exampleCn: "我被使用。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 379,
    fr: "en",
    pos: "prép.",
    cn: "在…",
    lesson: 9,
    phonetic: "",
    example: "J'habite en France.",
    exampleCn: "我住在法国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 380,
    fr: "en ce moment",
    pos: "",
    cn: "此刻，现在",
    lesson: 15,
    phonetic: "",
    example: "Je travaille en ce moment.",
    exampleCn: "我现在在工作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 381,
    fr: "encore",
    pos: "adv.",
    cn: "还，仍然",
    lesson: 14,
    phonetic: "",
    example: "Je veux encore du pain.",
    exampleCn: "我还想要面包。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 382,
    fr: "en dehors de",
    pos: "",
    cn: "在…外面",
    lesson: 25,
    phonetic: "",
    example: "Il est en dehors de la maison.",
    exampleCn: "他在房子外面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 383,
    fr: "endroit",
    pos: "n.m.",
    cn: "地方，地点",
    lesson: 27,
    phonetic: "",
    example: "C'est un endroit.",
    exampleCn: "这是一个地方。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 384,
    fr: "en effet",
    pos: "",
    cn: "因为，由于",
    lesson: 25,
    phonetic: "",
    example: "Il est malade ; en effet, il tousse.",
    exampleCn: "他病了；的确，他咳嗽。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 385,
    fr: "enfant",
    pos: "n.",
    cn: "孩子，儿童",
    lesson: 12,
    phonetic: "",
    example: "La mere porte son enfant dans son bras.",
    exampleCn: "母亲抱着孩子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 386,
    fr: "enfin",
    pos: "adv.",
    cn: "最后，终于",
    lesson: 25,
    phonetic: "/ɑ̃fɛ̃/",
    example: "Enfin, tu es là !",
    exampleCn: "终于，你来了！",
    hasAudio: true,
    audioId: 26
  },
  {
    id: 387,
    fr: "en général",
    pos: "",
    cn: "一般地，通常",
    lesson: 14,
    phonetic: "",
    example: "En général, je me lève à sept heures.",
    exampleCn: "通常我七点起床。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 388,
    fr: "ennui",
    pos: "n.m.",
    cn: "麻烦，烦恼",
    lesson: 19,
    phonetic: "",
    example: "C'est un ennui.",
    exampleCn: "这是一个麻烦。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 389,
    fr: "enquête",
    pos: "n.f.",
    cn: "调查",
    lesson: 17,
    phonetic: "",
    example: "C'est une enquête.",
    exampleCn: "这是一个调查。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 390,
    fr: "en réalité",
    pos: "",
    cn: "事实上",
    lesson: 23,
    phonetic: "",
    example: "En réalité, c'est très simple.",
    exampleCn: "事实上，这很简单。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 391,
    fr: "enregistrement",
    pos: "n.m.",
    cn: "录音",
    lesson: 11,
    phonetic: "",
    example: "C'est un enregistrement.",
    exampleCn: "这是录音。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 392,
    fr: "en retard",
    pos: "",
    cn: "迟到",
    lesson: 14,
    phonetic: "",
    example: "Je suis en retard.",
    exampleCn: "我迟到了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 393,
    fr: "s'enrichir",
    pos: "v.pr.",
    cn: "发财致富",
    lesson: 26,
    phonetic: "",
    example: "Je m'enrichis.",
    exampleCn: "我发财致富。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 394,
    fr: "ensemble",
    pos: "adv.",
    cn: "共同，一起",
    lesson: 22,
    phonetic: "",
    example: "Situes libre，nous irons ensemble.",
    exampleCn: "如果你有空儿，咱们一起去吧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 395,
    fr: "entendre",
    pos: "v.t.",
    cn: "听见",
    lesson: 14,
    phonetic: "",
    example: "J'entends la musique.",
    exampleCn: "我听见音乐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 396,
    fr: "entier, ère",
    pos: "a.",
    cn: "全部的",
    lesson: 27,
    phonetic: "",
    example: "C'est entier.",
    exampleCn: "这是全部的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 397,
    fr: "en train de",
    pos: "",
    cn: "正在…",
    lesson: 15,
    phonetic: "",
    example: "Je suis en train de manger.",
    exampleCn: "我正在吃饭。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 398,
    fr: "entre",
    pos: "prép.",
    cn: "在…之间",
    lesson: 9,
    phonetic: "",
    example: "Les relations entre ces deux pays vont s'ameliorer.",
    exampleCn: "两国的关系将好转。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 399,
    fr: "entrer",
    pos: "v.i.",
    cn: "进入，走进",
    lesson: 14,
    phonetic: "",
    example: "J'entre.",
    exampleCn: "我进入。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 400,
    fr: "enveloppe",
    pos: "n.f.",
    cn: "信封",
    lesson: 6,
    phonetic: "",
    example: "C'est une enveloppe.",
    exampleCn: "这是一个信封。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 401,
    fr: "envelopper",
    pos: "v.t.",
    cn: "包裹",
    lesson: 25,
    phonetic: "",
    example: "J'enveloppe.",
    exampleCn: "我包裹。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 402,
    fr: "envie",
    pos: "n.f.",
    cn: "愿望，想",
    lesson: 20,
    phonetic: "",
    example: "C'est une envie.",
    exampleCn: "这是一个愿望。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 403,
    fr: "environ",
    pos: "adv.",
    cn: "大约",
    lesson: 26,
    phonetic: "",
    example: "Il y a environ dix personnes.",
    exampleCn: "大约有十个人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 404,
    fr: "en voiture",
    pos: "",
    cn: "乘汽车",
    lesson: 13,
    phonetic: "",
    example: "Nous allons à Paris en voiture.",
    exampleCn: "我们坐汽车去巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 405,
    fr: "envoyer",
    pos: "v.t.",
    cn: "寄，送，派",
    lesson: 20,
    phonetic: "",
    example: "Il faut envoyer cette lettre avant le15 juin.",
    exampleCn: "要在6月15日前把这封信寄出。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 406,
    fr: "épicier, ère",
    pos: "n.",
    cn: "食品杂货商",
    lesson: 25,
    phonetic: "",
    example: "C'est épicier.",
    exampleCn: "这是食品杂货商。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 407,
    fr: "époque",
    pos: "n.f.",
    cn: "时代，时期",
    lesson: 27,
    phonetic: "",
    example: "C'est époque.",
    exampleCn: "这是时代。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 408,
    fr: "épuisé, e",
    pos: "a.",
    cn: "筋疲力尽的",
    lesson: 29,
    phonetic: "",
    example: "C'est épuisé.",
    exampleCn: "这是筋疲力尽的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 409,
    fr: "équateur",
    pos: "n.m.",
    cn: "赤道",
    lesson: 26,
    phonetic: "",
    example: "C'est équateur.",
    exampleCn: "这是赤道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 410,
    fr: "escalier",
    pos: "n.m.",
    cn: "楼梯",
    lesson: 12,
    phonetic: "",
    example: "C'est un escalier.",
    exampleCn: "这是一个楼梯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 411,
    fr: "Espagne",
    pos: "n.f.",
    cn: "西班牙",
    lesson: 13,
    phonetic: "",
    example: "C'est Espagne.",
    exampleCn: "这是西班牙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 412,
    fr: "Espagnol, e",
    pos: "n.",
    cn: "西班牙人",
    lesson: 7,
    phonetic: "",
    example: "C'est Espagnol.",
    exampleCn: "这是西班牙人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 413,
    fr: "espérer",
    pos: "v.i.",
    cn: "希望",
    lesson: 19,
    phonetic: "",
    example: "J'espére.",
    exampleCn: "我希望。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 414,
    fr: "est-ce que",
    pos: "",
    cn: "是不是",
    lesson: 2,
    phonetic: "",
    example: "Est-ce que tu viens ?",
    exampleCn: "你来吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 415,
    fr: "étage",
    pos: "n.m.",
    cn: "层",
    lesson: 12,
    phonetic: "",
    example: "Je suis monté au troisieme étage.",
    exampleCn: "我登上四层楼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 416,
    fr: "état",
    pos: "n.m.",
    cn: "状态，国家",
    lesson: 28,
    phonetic: "",
    example: "C'est état.",
    exampleCn: "这是状态。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 417,
    fr: "Etats-Unis",
    pos: "n.m.pl.",
    cn: "美国",
    lesson: 13,
    phonetic: "",
    example: "C'est Etats-Unis.",
    exampleCn: "这是美国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 418,
    fr: "été",
    pos: "n.m.",
    cn: "夏天",
    lesson: 18,
    phonetic: "",
    example: "C'est été.",
    exampleCn: "这是夏天。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 419,
    fr: "s'étendre",
    pos: "v.pr.",
    cn: "伸展",
    lesson: 26,
    phonetic: "",
    example: "Je m'étends.",
    exampleCn: "我伸展。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 420,
    fr: "étoile",
    pos: "n.f.",
    cn: "星",
    lesson: 22,
    phonetic: "",
    example: "C'est étoile.",
    exampleCn: "这是星。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 421,
    fr: "étranger, ère",
    pos: "a., n.",
    cn: "外国的，外国人",
    lesson: 9,
    phonetic: "",
    example: "C'est étranger.",
    exampleCn: "这是外国的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 422,
    fr: "être",
    pos: "v.i.",
    cn: "是，在",
    lesson: 7,
    phonetic: "",
    example: "Je suis.",
    exampleCn: "我是。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 423,
    fr: "étroit, e",
    pos: "a.",
    cn: "狭窄的",
    lesson: 25,
    phonetic: "",
    example: "C'est étroit.",
    exampleCn: "这是狭窄的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 424,
    fr: "étude",
    pos: "n.f.",
    cn: "学习，研究",
    lesson: 10,
    phonetic: "",
    example: "C'est étude.",
    exampleCn: "这是学习。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 425,
    fr: "étudiant, e",
    pos: "n.",
    cn: "大学生",
    lesson: 7,
    phonetic: "",
    example: "C'est étudiant.",
    exampleCn: "这是大学生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 426,
    fr: "euro",
    pos: "n.m.",
    cn: "欧元",
    lesson: 13,
    phonetic: "",
    example: "C'est un euro.",
    exampleCn: "这是一个欧元。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 427,
    fr: "Europe",
    pos: "n.f.",
    cn: "欧洲",
    lesson: 26,
    phonetic: "",
    example: "C'est Europe.",
    exampleCn: "这是欧洲。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 428,
    fr: "éviter",
    pos: "v.t.",
    cn: "避免",
    lesson: 27,
    phonetic: "",
    example: "J'évite.",
    exampleCn: "我避免。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 429,
    fr: "exact, e",
    pos: "a.",
    cn: "确切的",
    lesson: 27,
    phonetic: "",
    example: "C'est exact.",
    exampleCn: "这是确切的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 430,
    fr: "exactement",
    pos: "adv.",
    cn: "确切的，完完全全",
    lesson: 30,
    phonetic: "",
    example: "C'est exactement ce que je veux.",
    exampleCn: "这正是我想要的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 431,
    fr: "examen",
    pos: "n.m.",
    cn: "考试",
    lesson: 15,
    phonetic: "",
    example: "C'est un examen.",
    exampleCn: "这是一个考试。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 432,
    fr: "examiner",
    pos: "v.t.",
    cn: "检查",
    lesson: 29,
    phonetic: "",
    example: "J'examine.",
    exampleCn: "我检查。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 433,
    fr: "excellent, e",
    pos: "a.",
    cn: "出色的，极好的",
    lesson: 17,
    phonetic: "",
    example: "C'est excellent.",
    exampleCn: "这是出色的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 434,
    fr: "excursion",
    pos: "n.f.",
    cn: "郊游，远足",
    lesson: 18,
    phonetic: "",
    example: "C'est une excursion.",
    exampleCn: "这是郊游。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 435,
    fr: "excuser",
    pos: "v.t.",
    cn: "原谅，对不起",
    lesson: 14,
    phonetic: "",
    example: "Je ne peux pas vous excuser.",
    exampleCn: "我不能原谅你。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 436,
    fr: "exercice",
    pos: "n.m.",
    cn: "练习",
    lesson: 9,
    phonetic: "",
    example: "C'est un exercice.",
    exampleCn: "这是一个练习。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 437,
    fr: "exister",
    pos: "v.i.",
    cn: "存在",
    lesson: 25,
    phonetic: "",
    example: "J'existe.",
    exampleCn: "我存在。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 438,
    fr: "s'exprimer",
    pos: "v.pr.",
    cn: "表达",
    lesson: 30,
    phonetic: "",
    example: "Je m'exprime.",
    exampleCn: "我表达。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 439,
    fr: "extérieur",
    pos: "n.m.",
    cn: "外，外面",
    lesson: 25,
    phonetic: "",
    example: "C'est un extérieur.",
    exampleCn: "这是外。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 440,
    fr: "extraordinaire",
    pos: "a.",
    cn: "出奇的，不一般的",
    lesson: 28,
    phonetic: "",
    example: "C'est extraordinaire.",
    exampleCn: "这是出奇的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 441,
    fr: "fabriquer",
    pos: "v.t.",
    cn: "制造",
    lesson: 28,
    phonetic: "",
    example: "Je fabrique.",
    exampleCn: "我制造。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 442,
    fr: "facilement",
    pos: "adv.",
    cn: "容易地",
    lesson: 25,
    phonetic: "",
    example: "Je comprends facilement.",
    exampleCn: "我容易理解。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 443,
    fr: "facteur, trice",
    pos: "n.",
    cn: "邮递员",
    lesson: 2,
    phonetic: "",
    example: "C'est un facteur.",
    exampleCn: "这是邮递员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 444,
    fr: "faim",
    pos: "n.f.",
    cn: "饥饿",
    lesson: 20,
    phonetic: "",
    example: "C'est une faim.",
    exampleCn: "这是一个饥饿。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 445,
    fr: "faire",
    pos: "v.t.",
    cn: "做，使…",
    lesson: 9,
    phonetic: "",
    example: "Je fais.",
    exampleCn: "我做。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 446,
    fr: "se faire",
    pos: "v.pr.",
    cn: "产生，形成",
    lesson: 28,
    phonetic: "",
    example: "Je me fais.",
    exampleCn: "我产生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 447,
    fr: "falloir",
    pos: "v. impers.",
    cn: "必须",
    lesson: 18,
    phonetic: "",
    example: ".",
    exampleCn: "我必须。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 448,
    fr: "famille",
    pos: "n.f.",
    cn: "家庭",
    lesson: 8,
    phonetic: "",
    example: "C'est une famille.",
    exampleCn: "这是一个家庭。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 449,
    fr: "fatigant, e",
    pos: "a.",
    cn: "令人厌倦的",
    lesson: 29,
    phonetic: "",
    example: "C'est fatigant.",
    exampleCn: "这是令人厌倦的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 450,
    fr: "fatigué, e",
    pos: "a.",
    cn: "疲劳的",
    lesson: 19,
    phonetic: "",
    example: "Vous avez l'air fatigué.",
    exampleCn: "您显得挺疲劳。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 451,
    fr: "fax",
    pos: "n.m.",
    cn: "传真",
    lesson: 20,
    phonetic: "",
    example: "C'est un fax.",
    exampleCn: "这是一个传真。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 452,
    fr: "féminin",
    pos: "n.m.",
    cn: "阴性",
    lesson: 9,
    phonetic: "",
    example: "C'est un féminin.",
    exampleCn: "这是一个阴性。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 453,
    fr: "femme",
    pos: "n.f.",
    cn: "妇女，妻子",
    lesson: 12,
    phonetic: "",
    example: "C'est une femme.",
    exampleCn: "这是一个妇女。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 454,
    fr: "fenêtre",
    pos: "n.f.",
    cn: "窗子",
    lesson: 13,
    phonetic: "",
    example: "C'est une fenêtre.",
    exampleCn: "这是一个窗子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 455,
    fr: "fête",
    pos: "n.f.",
    cn: "节日",
    lesson: 22,
    phonetic: "",
    example: "C'est une fête.",
    exampleCn: "这是一个节日。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 456,
    fr: "festival",
    pos: "n.m.",
    cn: "艺术活动节",
    lesson: 28,
    phonetic: "",
    example: "C'est un festival.",
    exampleCn: "这是一个艺术活动节。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 457,
    fr: "feuilleter",
    pos: "v.t.",
    cn: "翻阅",
    lesson: 27,
    phonetic: "",
    example: "Je feuillette.",
    exampleCn: "我翻阅。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 458,
    fr: "fiche",
    pos: "n.f.",
    cn: "卡片",
    lesson: 20,
    phonetic: "",
    example: "C'est une fiche.",
    exampleCn: "这是一个卡片。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 459,
    fr: "figure",
    pos: "n.f.",
    cn: "无花果",
    lesson: 28,
    phonetic: "",
    example: "C'est une figure.",
    exampleCn: "这是一个无花果。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 460,
    fr: "fille",
    pos: "n.f.",
    cn: "女儿，女孩子",
    lesson: 12,
    phonetic: "",
    example: "C'est une fille curieuse.",
    exampleCn: "她是个好奇的姑娘。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 461,
    fr: "film",
    pos: "n.m.",
    cn: "电影",
    lesson: 15,
    phonetic: "",
    example: "C'est un film.",
    exampleCn: "这是一个电影。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 462,
    fr: "fils",
    pos: "n.m.",
    cn: "儿子",
    lesson: 12,
    phonetic: "",
    example: "C'est un fils.",
    exampleCn: "这是一个儿子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 463,
    fr: "fin",
    pos: "n.f.",
    cn: "终，末",
    lesson: 15,
    phonetic: "",
    example: "C'est une fin.",
    exampleCn: "这是一个终。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 464,
    fr: "finir",
    pos: "v.t.",
    cn: "完成",
    lesson: 14,
    phonetic: "",
    example: "Je finis mon travail.",
    exampleCn: "我完成工作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 465,
    fr: "fleur",
    pos: "n.f.",
    cn: "花",
    lesson: 7,
    phonetic: "",
    example: "C'est une fleur.",
    exampleCn: "这是花。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 466,
    fr: "fleuve",
    pos: "n.m.",
    cn: "河流",
    lesson: 26,
    phonetic: "",
    example: "C'est un fleuve.",
    exampleCn: "这是一个河流。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 467,
    fr: "fois",
    pos: "n.f.",
    cn: "次，回",
    lesson: 14,
    phonetic: "",
    example: "C'est une fois.",
    exampleCn: "这是一个次。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 468,
    fr: "fort, e",
    pos: "a.",
    cn: "强烈的",
    lesson: 14,
    phonetic: "",
    example: "C'est fort.",
    exampleCn: "这是强烈的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 469,
    fr: "frais, fraîche",
    pos: "a.",
    cn: "凉爽的",
    lesson: 18,
    phonetic: "",
    example: "C'est frais.",
    exampleCn: "这是凉爽的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 470,
    fr: "Français, e",
    pos: "n.",
    cn: "法国人",
    lesson: 7,
    phonetic: "",
    example: "C'est Français.",
    exampleCn: "这是法国人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 471,
    fr: "français",
    pos: "n.m.",
    cn: "法语",
    lesson: 9,
    phonetic: "",
    example: "C'est un français.",
    exampleCn: "这是一个法语。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 472,
    fr: "France",
    pos: "n.f.",
    cn: "法国",
    lesson: 10,
    phonetic: "",
    example: "Nous partons pour la France le mois prochain.",
    exampleCn: "我们下个月动身去法国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 473,
    fr: "franglais",
    pos: "n.m.",
    cn: "夹杂英语词的法语",
    lesson: 30,
    phonetic: "",
    example: "C'est un franglais.",
    exampleCn: "这是一个夹杂英语词的法语。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 474,
    fr: "frapper",
    pos: "v.t.",
    cn: "打击，使产生强烈印象",
    lesson: 30,
    phonetic: "",
    example: "Je frappe.",
    exampleCn: "我打击。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 475,
    fr: "fréquenter",
    pos: "v.t.",
    cn: "经常去",
    lesson: 27,
    phonetic: "",
    example: "Je fréquente.",
    exampleCn: "我经常去。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 476,
    fr: "frère",
    pos: "n.m.",
    cn: "兄弟",
    lesson: 8,
    phonetic: "",
    example: "C'est un frère.",
    exampleCn: "这是一个兄弟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 477,
    fr: "froid, e",
    pos: "a.",
    cn: "凉，冷",
    lesson: 18,
    phonetic: "",
    example: "C'est froid.",
    exampleCn: "这是凉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 478,
    fr: "fromage",
    pos: "n.m.",
    cn: "奶酪",
    lesson: 23,
    phonetic: "",
    example: "C'est un fromage.",
    exampleCn: "这是一个奶酪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 479,
    fr: "frontière",
    pos: "n.f.",
    cn: "国境，边界",
    lesson: 19,
    phonetic: "",
    example: "C'est une frontière.",
    exampleCn: "这是一个国境。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 480,
    fr: "fruit",
    pos: "n.m.",
    cn: "水果",
    lesson: 23,
    phonetic: "",
    example: "C'est un fruit.",
    exampleCn: "这是一个水果。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 481,
    fr: "fumer",
    pos: "v.t.",
    cn: "吸烟",
    lesson: 17,
    phonetic: "",
    example: "Je fume.",
    exampleCn: "我吸烟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 482,
    fr: "furieux, se",
    pos: "a.",
    cn: "狂怒的",
    lesson: 24,
    phonetic: "",
    example: "C'est furieux.",
    exampleCn: "这是狂怒的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 483,
    fr: "garage",
    pos: "n.m.",
    cn: "车库，修车厂",
    lesson: 14,
    phonetic: "",
    example: "C'est un garage.",
    exampleCn: "这是一个车库。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 484,
    fr: "garagiste",
    pos: "n.",
    cn: "汽车修理工",
    lesson: 18,
    phonetic: "",
    example: "Il faut faire venir un garagiste pour la réparer.",
    exampleCn: "必须叫-个汽车修理工来修车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 485,
    fr: "garçon",
    pos: "n.m.",
    cn: "男孩",
    lesson: 15,
    phonetic: "",
    example: "C'est un garçon.",
    exampleCn: "这是一个男孩。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 486,
    fr: "gare",
    pos: "n.f.",
    cn: "火车站",
    lesson: 28,
    phonetic: "",
    example: "C'est une gare.",
    exampleCn: "这是一个火车站。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 487,
    fr: "se garer",
    pos: "v.pr.",
    cn: "停车",
    lesson: 25,
    phonetic: "",
    example: "Je me gare.",
    exampleCn: "我停车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 488,
    fr: "Garonne",
    pos: "n.f.",
    cn: "加龙河",
    lesson: 26,
    phonetic: "",
    example: "C'est Garonne.",
    exampleCn: "这是加龙河。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 489,
    fr: "gâteau(x)",
    pos: "n.m.",
    cn: "糕点",
    lesson: 23,
    phonetic: "",
    example: "C'est un gâteau.",
    exampleCn: "这是一个糕点。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 490,
    fr: "généraliste",
    pos: "n.",
    cn: "普通科医生",
    lesson: 29,
    phonetic: "",
    example: "C'est un généraliste.",
    exampleCn: "这是一个普通科医生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 491,
    fr: "Genève",
    pos: "",
    cn: "日内瓦",
    lesson: 3,
    phonetic: "",
    example: "C'est Genève.",
    exampleCn: "这是日内瓦。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 492,
    fr: "gens",
    pos: "n.m.pl.",
    cn: "人们",
    lesson: 25,
    phonetic: "",
    example: "C'est un gens.",
    exampleCn: "这是一个人们。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 493,
    fr: "gentil, le",
    pos: "a.",
    cn: "和蔼可亲的",
    lesson: 12,
    phonetic: "",
    example: "Ce professeur est très gentil avec nous.",
    exampleCn: "这位教师待我们很亲热。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 494,
    fr: "gin",
    pos: "n.m.",
    cn: "[英]金酒",
    lesson: 19,
    phonetic: "",
    example: "C'est un gin.",
    exampleCn: "这是一个[英]金酒。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 495,
    fr: "glace",
    pos: "n.f.",
    cn: "冰淇淋",
    lesson: 23,
    phonetic: "",
    example: "Regarde-toi dans la glace.",
    exampleCn: "你照照镜子吧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 496,
    fr: "gorge",
    pos: "n.f.",
    cn: "喉咙",
    lesson: 29,
    phonetic: "",
    example: "C'est une gorge.",
    exampleCn: "这是一个喉咙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 497,
    fr: "gouvernement",
    pos: "n.m.",
    cn: "政府",
    lesson: 30,
    phonetic: "",
    example: "C'est un gouvernement.",
    exampleCn: "这是政府。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 498,
    fr: "grâce à",
    pos: "loc. prép.",
    cn: "多亏",
    lesson: 21,
    phonetic: "",
    example: "Grâce à toi, j'ai réussi.",
    exampleCn: "多亏了你，我成功了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 499,
    fr: "grand, e",
    pos: "a.",
    cn: "大的",
    lesson: 12,
    phonetic: "",
    example: "C'est un grand producteur de blé et de vin.",
    exampleCn: "它是-个盛产小麦和葡萄酒的国家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 500,
    fr: "Grande-Bretagne",
    pos: "n.f.",
    cn: "英国",
    lesson: 26,
    phonetic: "",
    example: "C'est Grande-Bretagne.",
    exampleCn: "这是英国。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 501,
    fr: "Grande Muraille",
    pos: "n.f.",
    cn: "长城",
    lesson: 25,
    phonetic: "",
    example: "C'est Grande Muraille.",
    exampleCn: "这是长城。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 502,
    fr: "grande surface",
    pos: "n.f.",
    cn: "大型超市",
    lesson: 25,
    phonetic: "",
    example: "La France est moins grande que la Chine.",
    exampleCn: "法国没有中国(面积)大。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 503,
    fr: "grand-mère",
    pos: "n.f.",
    cn: "祖母，外祖母",
    lesson: 21,
    phonetic: "",
    example: "C'est une grand-mère.",
    exampleCn: "这是一个祖母。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 504,
    fr: "grave",
    pos: "a.",
    cn: "严重的",
    lesson: 22,
    phonetic: "",
    example: "Je vous en prie, ce n'est pas grave.",
    exampleCn: "不必客气，这不要紧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 505,
    fr: "gravement",
    pos: "adv.",
    cn: "严重地",
    lesson: 29,
    phonetic: "",
    example: "Il est gravement malade.",
    exampleCn: "他病得很重。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 506,
    fr: "Grenoble",
    pos: "",
    cn: "格勒诺布尔",
    lesson: 3,
    phonetic: "",
    example: "C'est Grenoble.",
    exampleCn: "这是格勒诺布尔。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 507,
    fr: "grève",
    pos: "n.f.",
    cn: "罢工",
    lesson: 17,
    phonetic: "",
    example: "C'est une grève.",
    exampleCn: "这是一个罢工。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 508,
    fr: "guérir",
    pos: "v.t.",
    cn: "治愈",
    lesson: 29,
    phonetic: "",
    example: "Je guéris.",
    exampleCn: "我治愈。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 509,
    fr: "guerre",
    pos: "n.f.",
    cn: "战争",
    lesson: 28,
    phonetic: "/ɡɛʁ/",
    example: "La guerre et la paix.",
    exampleCn: "战争与和平。",
    hasAudio: true,
    audioId: 28
  },
  {
    id: 510,
    fr: "guitare",
    pos: "n.f.",
    cn: "吉他",
    lesson: 5,
    phonetic: "",
    example: "C'est une guitare.",
    exampleCn: "这是一个吉他。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 511,
    fr: "habitant, e",
    pos: "n.",
    cn: "居民",
    lesson: 28,
    phonetic: "",
    example: "C'est un habitant.",
    exampleCn: "这是一个居民。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 512,
    fr: "habiter",
    pos: "v.t., v.i.",
    cn: "居住",
    lesson: 8,
    phonetic: "/abite/",
    example: "J’habite à Beijing.",
    exampleCn: "我住在北京。",
    hasAudio: true,
    audioId: 29
  },
  {
    id: 513,
    fr: "habitude",
    pos: "n.f.",
    cn: "习惯",
    lesson: 25,
    phonetic: "",
    example: "C'est une habitude.",
    exampleCn: "这是习惯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 514,
    fr: "hall",
    pos: "n.m.",
    cn: "[英]大厅",
    lesson: 19,
    phonetic: "",
    example: "C'est un hall.",
    exampleCn: "这是一个[英]大厅。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 515,
    fr: "haut, e",
    pos: "a.",
    cn: "高的",
    lesson: 26,
    phonetic: "",
    example: "Les villages anciens ... en haut des montagnes.",
    exampleCn: "古老的村庄坐落在高山之巅。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 516,
    fr: "hélas",
    pos: "interj.",
    cn: "唉，哎呀",
    lesson: 17,
    phonetic: "",
    example: "Hélas, il est trop tard.",
    exampleCn: "唉，太晚了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 517,
    fr: "hésiter",
    pos: "v.i.",
    cn: "犹豫",
    lesson: 29,
    phonetic: "",
    example: "Je hésite.",
    exampleCn: "我犹豫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 518,
    fr: "heure",
    pos: "n.f.",
    cn: "小时",
    lesson: 10,
    phonetic: "/œʁ/",
    example: "Quelle heure est-il ?",
    exampleCn: "现在几点了？",
    hasAudio: true,
    audioId: 30
  },
  {
    id: 519,
    fr: "heure de pointe",
    pos: "",
    cn: "高峰时间",
    lesson: 27,
    phonetic: "",
    example: "Elle est repartie au bout d'une heure.",
    exampleCn: "一小时后她又走了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 520,
    fr: "heureusement",
    pos: "adv.",
    cn: "幸好",
    lesson: 18,
    phonetic: "",
    example: "Heureusement, il fait beau.",
    exampleCn: "幸好天气很好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 521,
    fr: "heureux, se",
    pos: "a.",
    cn: "高兴，幸福",
    lesson: 17,
    phonetic: "",
    example: "Très heureux de vous connaître.",
    exampleCn: "认识您非常高兴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 522,
    fr: "hier",
    pos: "adv.",
    cn: "昨天",
    lesson: 20,
    phonetic: "/jɛʁ/",
    example: "Je suis arrivé hier.",
    exampleCn: "我昨天到的。",
    hasAudio: true,
    audioId: 31
  },
  {
    id: 523,
    fr: "histoire",
    pos: "n.f.",
    cn: "故事，历史",
    lesson: 24,
    phonetic: "/istwaʁ/",
    example: "Une histoire drôle.",
    exampleCn: "一个有趣的故事。",
    hasAudio: true,
    audioId: 32
  },
  {
    id: 524,
    fr: "historique",
    pos: "a.",
    cn: "历史的",
    lesson: 27,
    phonetic: "",
    example: "C'est historique.",
    exampleCn: "这是历史的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 525,
    fr: "hiver",
    pos: "n.m.",
    cn: "冬天",
    lesson: 18,
    phonetic: "",
    example: "C'est un hiver.",
    exampleCn: "这是一个冬天。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 526,
    fr: "homme",
    pos: "n.m.",
    cn: "人，男人",
    lesson: 24,
    phonetic: "/ɔm/",
    example: "Cet homme est gentil.",
    exampleCn: "这个男人很和善。",
    hasAudio: true,
    audioId: 33
  },
  {
    id: 527,
    fr: "hors-d'œuvre",
    pos: "n.m.",
    cn: "冷盘",
    lesson: 23,
    phonetic: "",
    example: "C'est un hors-d'œuvre.",
    exampleCn: "这是一个冷盘。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 528,
    fr: "hôtel",
    pos: "n.m.",
    cn: "旅馆",
    lesson: 20,
    phonetic: "",
    example: "C'est un hôtel.",
    exampleCn: "这是一个旅馆。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 529,
    fr: "hôtesse",
    pos: "n.f.",
    cn: "空中小姐",
    lesson: 19,
    phonetic: "",
    example: "C'est une hôtesse.",
    exampleCn: "这是空中小姐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 530,
    fr: "hypermarché",
    pos: "n.m.",
    cn: "（大型）超级市场",
    lesson: 25,
    phonetic: "",
    example: "C'est un hypermarché.",
    exampleCn: "这是一个（大型）超级市场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 531,
    fr: "ici",
    pos: "adv.",
    cn: "这儿，此地",
    lesson: 22,
    phonetic: "/isi/",
    example: "Viens ici !",
    exampleCn: "到这里来！",
    hasAudio: true,
    audioId: 34
  },
  {
    id: 532,
    fr: "idée",
    pos: "n.f.",
    cn: "主意，想法",
    lesson: 14,
    phonetic: "",
    example: "C'est une idée.",
    exampleCn: "这是一个主意。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 533,
    fr: "il",
    pos: "pron.",
    cn: "他",
    lesson: 1,
    phonetic: "",
    example: "Il est mon frère.",
    exampleCn: "他是我哥哥。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 534,
    fr: "île",
    pos: "n.f.",
    cn: "岛",
    lesson: 27,
    phonetic: "",
    example: "C'est île.",
    exampleCn: "这是岛。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 535,
    fr: "île de la Cité",
    pos: "",
    cn: "西岱岛",
    lesson: 27,
    phonetic: "",
    example: "C'est île de la Cité.",
    exampleCn: "这是西岱岛。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 536,
    fr: "illuminé, e",
    pos: "a.",
    cn: "照亮的",
    lesson: 24,
    phonetic: "",
    example: "C'est illuminé.",
    exampleCn: "这是照亮的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 537,
    fr: "il y a",
    pos: "",
    cn: "有…",
    lesson: 11,
    phonetic: "",
    example: "Il y a un livre sur la table.",
    exampleCn: "桌上有一本书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 538,
    fr: "imagination",
    pos: "n.f.",
    cn: "想象力",
    lesson: 30,
    phonetic: "",
    example: "C'est une imagination.",
    exampleCn: "这是想象力。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 539,
    fr: "immeuble",
    pos: "n.m.",
    cn: "大楼，房屋",
    lesson: 12,
    phonetic: "",
    example: "C'est un immeuble.",
    exampleCn: "这是一个大楼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 540,
    fr: "immigré, e",
    pos: "n.",
    cn: "移民",
    lesson: 26,
    phonetic: "",
    example: "C'est un immigré.",
    exampleCn: "这是一个移民。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 541,
    fr: "important, e",
    pos: "a.",
    cn: "重要的，丰富的",
    lesson: 23,
    phonetic: "",
    example: "Ce qui est important，c'est d'avoir un travail.",
    exampleCn: "重要的是找到工作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 542,
    fr: "importance",
    pos: "n.f.",
    cn: "重要性",
    lesson: 15,
    phonetic: "",
    example: "On donne une très grande importance aux notes.",
    exampleCn: "人们对分数非常重视。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 543,
    fr: "impression",
    pos: "n.f.",
    cn: "印象",
    lesson: 29,
    phonetic: "",
    example: "C'est une impression.",
    exampleCn: "这是印象。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 544,
    fr: "impressionner",
    pos: "v.t.",
    cn: "给人以深刻印象",
    lesson: 30,
    phonetic: "",
    example: "J'impressionne.",
    exampleCn: "我给人以深刻印象。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 545,
    fr: "indépendant, e",
    pos: "a.",
    cn: "自主的，独立的",
    lesson: 17,
    phonetic: "",
    example: "C'est indépendant.",
    exampleCn: "这是自主的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 546,
    fr: "Indien, ne",
    pos: "n.",
    cn: "印度人",
    lesson: 7,
    phonetic: "",
    example: "C'est Indien.",
    exampleCn: "这是印度人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 547,
    fr: "s'indigner",
    pos: "v.pr.",
    cn: "感到愤慨",
    lesson: 30,
    phonetic: "",
    example: "Je m'indigne.",
    exampleCn: "我感到愤慨。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 548,
    fr: "indiquer",
    pos: "v.t.",
    cn: "指出，标明",
    lesson: 13,
    phonetic: "",
    example: "J'indique.",
    exampleCn: "我指出。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 549,
    fr: "indispensable",
    pos: "a.",
    cn: "不可缺少的",
    lesson: 26,
    phonetic: "",
    example: "C'est indispensable.",
    exampleCn: "这是不可缺少的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 550,
    fr: "industrie",
    pos: "n.f.",
    cn: "工业企业",
    lesson: 28,
    phonetic: "",
    example: "C'est une industrie.",
    exampleCn: "这是一个工业企业。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 551,
    fr: "industriel, le",
    pos: "a.",
    cn: "工业的",
    lesson: 26,
    phonetic: "",
    example: "C'est industriel.",
    exampleCn: "这是工业的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 552,
    fr: "influence",
    pos: "n.f.",
    cn: "影响",
    lesson: 30,
    phonetic: "",
    example: "C'est une influence.",
    exampleCn: "这是影响。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 553,
    fr: "ingénieur",
    pos: "n.m.",
    cn: "工程师",
    lesson: 7,
    phonetic: "",
    example: "C'est un ingénieur.",
    exampleCn: "这是工程师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 554,
    fr: "s'inquiéter",
    pos: "v.pr.",
    cn: "担心",
    lesson: 22,
    phonetic: "",
    example: "Je m'inquiète.",
    exampleCn: "我担心。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 555,
    fr: "s'installer",
    pos: "v.pr.",
    cn: "定居，建立",
    lesson: 27,
    phonetic: "",
    example: "Je m'installe.",
    exampleCn: "我定居。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 556,
    fr: "instituteur, trice",
    pos: "n.",
    cn: "小学教师",
    lesson: 8,
    phonetic: "",
    example: "C'est un instituteur.",
    exampleCn: "这是小学教师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 557,
    fr: "institut",
    pos: "n.m.",
    cn: "学院，研究院",
    lesson: 11,
    phonetic: "",
    example: "Il y a un parc prés de notre institut.",
    exampleCn: "在我们学院附近有一个公园。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 558,
    fr: "intelligent, e",
    pos: "a.",
    cn: "聪明的",
    lesson: 25,
    phonetic: "",
    example: "Paul est plus intelligent que Marie.",
    exampleCn: "保尔比玛丽聪明。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 559,
    fr: "intéressant, e",
    pos: "a.",
    cn: "有趣的",
    lesson: 27,
    phonetic: "",
    example: "Ici，personne n'a de travail intéressant.",
    exampleCn: "这里，没有个人的工作是有意思的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 560,
    fr: "intéresser",
    pos: "v.t.",
    cn: "使感兴趣",
    lesson: 30,
    phonetic: "",
    example: "J'intéresse.",
    exampleCn: "我使感兴趣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 561,
    fr: "s'intéresser",
    pos: "v.pr.",
    cn: "对…感兴趣",
    lesson: 29,
    phonetic: "",
    example: "Je m'intéresse.",
    exampleCn: "我对…感兴趣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 562,
    fr: "international, e (aux)",
    pos: "a.",
    cn: "国际的",
    lesson: 11,
    phonetic: "",
    example: "C'est international.",
    exampleCn: "这是国际的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 563,
    fr: "internet",
    pos: "n.m.",
    cn: "互联网",
    lesson: 20,
    phonetic: "",
    example: "C'est un internet.",
    exampleCn: "这是一个互联网。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 564,
    fr: "interprète",
    pos: "n.m.",
    cn: "翻译",
    lesson: 25,
    phonetic: "",
    example: "C'est un interprète.",
    exampleCn: "这是一个翻译。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 565,
    fr: "interview",
    pos: "n.f.",
    cn: "[英]采访",
    lesson: 30,
    phonetic: "",
    example: "C'est une interview.",
    exampleCn: "这是一个[英]采访。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 566,
    fr: "inviter",
    pos: "v.t.",
    cn: "邀请",
    lesson: 11,
    phonetic: "",
    example: "Veux-tu inviter cette jeune filleadanser？",
    exampleCn: "你愿意请这位姑娘跳舞吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 567,
    fr: "isolement",
    pos: "n.m.",
    cn: "孤立，隔绝",
    lesson: 28,
    phonetic: "",
    example: "C'est un isolement.",
    exampleCn: "这是孤立。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 568,
    fr: "Italien, ne",
    pos: "n.",
    cn: "意大利人",
    lesson: 11,
    phonetic: "",
    example: "C'est Italien.",
    exampleCn: "这是意大利人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 569,
    fr: "itinéraire",
    pos: "n.m.",
    cn: "路线",
    lesson: 27,
    phonetic: "",
    example: "C'est un itinéraire.",
    exampleCn: "这是一个路线。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 570,
    fr: "Japonais, e",
    pos: "n.",
    cn: "日本人",
    lesson: 7,
    phonetic: "",
    example: "C'est Japonais.",
    exampleCn: "这是日本人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 571,
    fr: "jaune",
    pos: "a., n.m.",
    cn: "黄色的，黄色",
    lesson: 5,
    phonetic: "",
    example: "C'est jaune.",
    exampleCn: "这是黄色的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 572,
    fr: "Jésus-Christ",
    pos: "",
    cn: "耶稣基督",
    lesson: 27,
    phonetic: "",
    example: "C'est Jésus-Christ.",
    exampleCn: "这是耶稣基督。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 573,
    fr: "jeton",
    pos: "n.m.",
    cn: "（打电话专用）硬币",
    lesson: 22,
    phonetic: "",
    example: "C'est un jeton.",
    exampleCn: "这是一个（打电话专用）硬币。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 574,
    fr: "jeu(x)",
    pos: "n.m.",
    cn: "游戏",
    lesson: 30,
    phonetic: "",
    example: "C'est un jeu.",
    exampleCn: "这是一个游戏。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 575,
    fr: "jeune",
    pos: "a., n.",
    cn: "年轻的，青年人",
    lesson: 24,
    phonetic: "",
    example: "C'est jeune.",
    exampleCn: "这是年轻的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 576,
    fr: "jouer",
    pos: "v.t.",
    cn: "玩，起作用",
    lesson: 21,
    phonetic: "",
    example: "Avez-vousdutemps pour jouer au ping-pong？",
    exampleCn: "您有时间打会儿乒乓球吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 577,
    fr: "jour",
    pos: "n.m.",
    cn: "日，白天，一天",
    lesson: 10,
    phonetic: "",
    example: "C'est un jour.",
    exampleCn: "这是一个日。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 578,
    fr: "journal (journaux)",
    pos: "n.m.",
    cn: "报纸",
    lesson: 11,
    phonetic: "",
    example: "C'est un journal.",
    exampleCn: "这是一个报纸。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 579,
    fr: "journaliste",
    pos: "n.",
    cn: "记者",
    lesson: 2,
    phonetic: "",
    example: "Nathalie est une journaliste très compétente.",
    exampleCn: "纳塔丽是一位非常能千的记者。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 580,
    fr: "journée",
    pos: "n.f.",
    cn: "天，工作日",
    lesson: 23,
    phonetic: "",
    example: "C'est une journée.",
    exampleCn: "这是一个天。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 581,
    fr: "juin",
    pos: "n.m.",
    cn: "六月",
    lesson: 15,
    phonetic: "",
    example: "C'est un juin.",
    exampleCn: "这是一个六月。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 582,
    fr: "jupe",
    pos: "n.f.",
    cn: "裙子",
    lesson: 5,
    phonetic: "",
    example: "C'est une jupe.",
    exampleCn: "这是一个裙子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 583,
    fr: "jusqu'à",
    pos: "",
    cn: "直到…",
    lesson: 15,
    phonetic: "",
    example: "Je travaille jusqu'à midi.",
    exampleCn: "我工作到中午。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 584,
    fr: "justice",
    pos: "n.f.",
    cn: "正义，司法",
    lesson: 27,
    phonetic: "",
    example: "C'est une justice.",
    exampleCn: "这是一个正义。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 585,
    fr: "kidnapper",
    pos: "v.t.",
    cn: "绑架",
    lesson: 30,
    phonetic: "",
    example: "Je kidnappe.",
    exampleCn: "我绑架。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 586,
    fr: "kilomètre",
    pos: "n.m.",
    cn: "公里",
    lesson: 18,
    phonetic: "",
    example: "C'est un kilomètre.",
    exampleCn: "这是一个公里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 587,
    fr: "kilomètre carré",
    pos: "n.m.",
    cn: "平方公里",
    lesson: 26,
    phonetic: "",
    example: "C'est un kilomètre carré.",
    exampleCn: "这是一个平方公里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 588,
    fr: "là",
    pos: "adv.",
    cn: "那儿，那边",
    lesson: 12,
    phonetic: "",
    example: "Je suis là.",
    exampleCn: "我在这里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 589,
    fr: "lac",
    pos: "n.m.",
    cn: "湖",
    lesson: 6,
    phonetic: "",
    example: "C'est un lac.",
    exampleCn: "这是湖。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 590,
    fr: "laisser",
    pos: "v.t.",
    cn: "留，让",
    lesson: 16,
    phonetic: "",
    example: "Je laisse.",
    exampleCn: "我留。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 591,
    fr: "lait",
    pos: "n.m.",
    cn: "牛奶",
    lesson: 23,
    phonetic: "",
    example: "C'est un lait.",
    exampleCn: "这是牛奶。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 592,
    fr: "langue",
    pos: "n.f.",
    cn: "语言，舌头",
    lesson: 9,
    phonetic: "",
    example: "C'est une langue.",
    exampleCn: "这是语言。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 593,
    fr: "latitude",
    pos: "n.f.",
    cn: "纬度",
    lesson: 26,
    phonetic: "",
    example: "C'est une latitude.",
    exampleCn: "这是纬度。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 594,
    fr: "leçon",
    pos: "n.f.",
    cn: "课，课程",
    lesson: 12,
    phonetic: "",
    example: "C'est une leçon.",
    exampleCn: "这是一个课。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 595,
    fr: "légume",
    pos: "n.m.",
    cn: "蔬菜",
    lesson: 23,
    phonetic: "",
    example: "C'est un légume.",
    exampleCn: "这是一个蔬菜。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 596,
    fr: "lentement",
    pos: "adv.",
    cn: "缓慢地",
    lesson: 24,
    phonetic: "",
    example: "Il est vieux，il marche lentement.",
    exampleCn: "他老了，走得很慢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 597,
    fr: "lettre",
    pos: "n.f.",
    cn: "信，字母",
    lesson: 6,
    phonetic: "",
    example: "Elle recevra ma lettre dans trois jours.",
    exampleCn: "她三天后收到我的信。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 598,
    fr: "se lever",
    pos: "v.pr.",
    cn: "起床",
    lesson: 16,
    phonetic: "",
    example: "Je me lève.",
    exampleCn: "我起床。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 599,
    fr: "liaison",
    pos: "n.f.",
    cn: "联系，交往",
    lesson: 28,
    phonetic: "",
    example: "C'est une liaison.",
    exampleCn: "这是一个联系。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 600,
    fr: "liberté",
    pos: "n.f.",
    cn: "自由",
    lesson: 29,
    phonetic: "",
    example: "C'est une liberté.",
    exampleCn: "这是一个自由。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 601,
    fr: "libre",
    pos: "a.",
    cn: "自由的，空闲的",
    lesson: 10,
    phonetic: "",
    example: "l. -- Vous êtes libre ce soir?",
    exampleCn: "您今天晚上有空吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 602,
    fr: "Lille",
    pos: "",
    cn: "里尔",
    lesson: 1,
    phonetic: "",
    example: "C'est Lille.",
    exampleCn: "这是里尔。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 603,
    fr: "limite",
    pos: "n.f.",
    cn: "边，边界",
    lesson: 25,
    phonetic: "",
    example: "C'est une limite.",
    exampleCn: "这是一个边。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 604,
    fr: "lire",
    pos: "v.t.",
    cn: "阅读",
    lesson: 13,
    phonetic: "",
    example: "Je lis un livre.",
    exampleCn: "我读书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 605,
    fr: "liste",
    pos: "n.f.",
    cn: "名单，菜单",
    lesson: 23,
    phonetic: "",
    example: "C'est une liste.",
    exampleCn: "这是一个名单。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 606,
    fr: "living-room",
    pos: "n.m.",
    cn: "[英]起居室",
    lesson: 20,
    phonetic: "",
    example: "C'est un living-room.",
    exampleCn: "这是一个[英]起居室。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 607,
    fr: "livre",
    pos: "n.m.",
    cn: "书",
    lesson: 5,
    phonetic: "",
    example: "C'est un livre.",
    exampleCn: "这是一个书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 608,
    fr: "livre d'occasion",
    pos: "n.m.",
    cn: "旧书",
    lesson: 27,
    phonetic: "",
    example: "Ce livre se vend trés vite.",
    exampleCn: "这书卖得很快。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 609,
    fr: "locataire",
    pos: "n.m.",
    cn: "租户，房客",
    lesson: 12,
    phonetic: "",
    example: "C'est un locataire.",
    exampleCn: "这是一个租户。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 610,
    fr: "loin",
    pos: "adv.",
    cn: "远",
    lesson: 16,
    phonetic: "",
    example: "L'école est loin d'ici.",
    exampleCn: "学校离这里很远。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 611,
    fr: "Loire",
    pos: "n.f.",
    cn: "卢瓦尔河",
    lesson: 26,
    phonetic: "",
    example: "C'est Loire.",
    exampleCn: "这是卢瓦尔河。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 612,
    fr: "londonien, ne",
    pos: "a.",
    cn: "伦敦的",
    lesson: 20,
    phonetic: "",
    example: "C'est londonien.",
    exampleCn: "这是伦敦的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 613,
    fr: "Londres",
    pos: "",
    cn: "伦敦",
    lesson: 17,
    phonetic: "",
    example: "C'est Londres.",
    exampleCn: "这是伦敦。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 614,
    fr: "long, longue",
    pos: "a.",
    cn: "长的",
    lesson: 26,
    phonetic: "",
    example: "Nous parlons de ce projeta long terme.",
    exampleCn: "我们正谈论这项长期计划。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 615,
    fr: "longtemps",
    pos: "adv.",
    cn: "长久地",
    lesson: 12,
    phonetic: "",
    example: "Ils ne se sont pas vus depuis longtemps.",
    exampleCn: "他们已经很长时间没有见面了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 616,
    fr: "louer",
    pos: "v.t.",
    cn: "租，出租",
    lesson: 13,
    phonetic: "",
    example: "Voila l'appartement que je voudrais louer.",
    exampleCn: "这就是我想租的套房。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 617,
    fr: "loyer",
    pos: "n.m.",
    cn: "房租",
    lesson: 13,
    phonetic: "",
    example: "C'est un loyer.",
    exampleCn: "这是一个房租。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 618,
    fr: "lumière",
    pos: "n.f.",
    cn: "光线",
    lesson: 28,
    phonetic: "",
    example: "C'est une lumière.",
    exampleCn: "这是一个光线。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 619,
    fr: "lundi",
    pos: "n.m.",
    cn: "星期一",
    lesson: 10,
    phonetic: "",
    example: "C'est un lundi.",
    exampleCn: "这是一个星期一。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 620,
    fr: "lutter",
    pos: "v.i.",
    cn: "斗争",
    lesson: 30,
    phonetic: "",
    example: "Je lutte.",
    exampleCn: "我斗争。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 621,
    fr: "Luxembourg",
    pos: "n.m.",
    cn: "卢森堡",
    lesson: 26,
    phonetic: "",
    example: "C'est Luxembourg.",
    exampleCn: "这是卢森堡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 622,
    fr: "lycée",
    pos: "n.m.",
    cn: "高级中学",
    lesson: 24,
    phonetic: "",
    example: "C'est un lycée.",
    exampleCn: "这是一个高级中学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 623,
    fr: "Lyon",
    pos: "",
    cn: "里昂",
    lesson: 26,
    phonetic: "",
    example: "C'est Lyon.",
    exampleCn: "这是里昂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 624,
    fr: "ma",
    pos: "a. poss.",
    cn: "我的…",
    lesson: 7,
    phonetic: "",
    example: "C'est ma.",
    exampleCn: "这是我的…。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 625,
    fr: "machine à coudre",
    pos: "n.f.",
    cn: "缝纫机",
    lesson: 29,
    phonetic: "",
    example: "C'est une machine à coudre.",
    exampleCn: "这是一个缝纫机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 626,
    fr: "madame",
    pos: "n.f.",
    cn: "夫人，女士",
    lesson: 7,
    phonetic: "",
    example: "l. -- Puis-je vous être utile, Madame?",
    exampleCn: "我能帮您做什么吗，夫人？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 627,
    fr: "magasin",
    pos: "n.m.",
    cn: "商店",
    lesson: 7,
    phonetic: "",
    example: "C'est un magasin.",
    exampleCn: "这是一个商店。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 628,
    fr: "magnétophone",
    pos: "n.m.",
    cn: "录音机",
    lesson: 6,
    phonetic: "",
    example: "C'est un magnétophone.",
    exampleCn: "这是一个录音机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 629,
    fr: "magnifique",
    pos: "a.",
    cn: "壮丽的，极好的",
    lesson: 27,
    phonetic: "",
    example: "C'est magnifique.",
    exampleCn: "这是壮丽的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 630,
    fr: "main-d'œuvre",
    pos: "n.f.",
    cn: "劳动力",
    lesson: 26,
    phonetic: "",
    example: "C'est une main-d'œuvre.",
    exampleCn: "这是一个劳动力。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 631,
    fr: "maintenant",
    pos: "adv.",
    cn: "现在",
    lesson: 11,
    phonetic: "",
    example: "Maintenant，elle est tout a fait guérie.",
    exampleCn: "现在，她的病完全好了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 632,
    fr: "mais",
    pos: "conj.",
    cn: "但是",
    lesson: 8,
    phonetic: "",
    example: "Je veux venir, mais je suis occupé.",
    exampleCn: "我想来，但我很忙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 633,
    fr: "maison",
    pos: "n.f.",
    cn: "房屋",
    lesson: 12,
    phonetic: "",
    example: "La maison est entourée de grands arbres.",
    exampleCn: "房子周围是-一些大树。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 634,
    fr: "malade",
    pos: "a., n.",
    cn: "生病的，病人",
    lesson: 16,
    phonetic: "",
    example: "Elle est malade. de la tuberculose.",
    exampleCn: "她得了结核病。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 635,
    fr: "maladie",
    pos: "n.f.",
    cn: "疾病",
    lesson: 29,
    phonetic: "",
    example: "C'est une maladie.",
    exampleCn: "这是一个疾病。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 636,
    fr: "Manche",
    pos: "n.f.",
    cn: "拉芒什海峡",
    lesson: 26,
    phonetic: "",
    example: "C'est Manche.",
    exampleCn: "这是拉芒什海峡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 637,
    fr: "manche",
    pos: "n.f.",
    cn: "衣袖",
    lesson: 29,
    phonetic: "",
    example: "C'est une manche.",
    exampleCn: "这是一个衣袖。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 638,
    fr: "manger",
    pos: "v.t.",
    cn: "吃，吃饭",
    lesson: 23,
    phonetic: "",
    example: "Je mange du pain.",
    exampleCn: "我吃面包。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 639,
    fr: "manquer",
    pos: "v.t. ind.",
    cn: "缺乏",
    lesson: 26,
    phonetic: "",
    example: "Je manque.",
    exampleCn: "我缺乏。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 640,
    fr: "manteau(x)",
    pos: "n.m.",
    cn: "大衣",
    lesson: 6,
    phonetic: "",
    example: "C'est un manteau.",
    exampleCn: "这是一个大衣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 641,
    fr: "manuel",
    pos: "n.m.",
    cn: "教材",
    lesson: 6,
    phonetic: "",
    example: "C'est un manuel.",
    exampleCn: "这是一个教材。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 642,
    fr: "marché",
    pos: "n.m.",
    cn: "市场",
    lesson: 25,
    phonetic: "",
    example: "C'est un marché.",
    exampleCn: "这是一个市场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 643,
    fr: "marcher",
    pos: "v.i.",
    cn: "行走",
    lesson: 14,
    phonetic: "",
    example: "Mon fils a un an，il apprend a marcher.",
    exampleCn: "我儿子一岁，他在学走路。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 644,
    fr: "mardi",
    pos: "n.m.",
    cn: "星期二",
    lesson: 20,
    phonetic: "",
    example: "C'est un mardi.",
    exampleCn: "这是一个星期二。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 645,
    fr: "mari",
    pos: "n.m.",
    cn: "丈夫",
    lesson: 12,
    phonetic: "",
    example: "C'est un mari.",
    exampleCn: "这是一个丈夫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 646,
    fr: "Marseille",
    pos: "",
    cn: "马赛",
    lesson: 11,
    phonetic: "",
    example: "C'est Marseille.",
    exampleCn: "这是马赛。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 647,
    fr: "masculin, ne",
    pos: "a.",
    cn: "阳性",
    lesson: 9,
    phonetic: "",
    example: "C'est masculin.",
    exampleCn: "这是阳性。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 648,
    fr: "Massif-Central",
    pos: "",
    cn: "中央高原",
    lesson: 28,
    phonetic: "",
    example: "C'est Massif-Central.",
    exampleCn: "这是中央高原。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 649,
    fr: "matin",
    pos: "n.m.",
    cn: "早晨",
    lesson: 14,
    phonetic: "",
    example: "Il se leve tot le matin，car I'usine est très loin.",
    exampleCn: "早晨他起得很早，因为工广很远。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 650,
    fr: "mauvais, e",
    pos: "a.",
    cn: "不好的，坏的",
    lesson: 13,
    phonetic: "",
    example: "C'est mauvais.",
    exampleCn: "这是不好的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 651,
    fr: "mécanicien, ne",
    pos: "n.",
    cn: "机械师",
    lesson: 14,
    phonetic: "",
    example: "C'est un mécanicien.",
    exampleCn: "这是一个机械师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 652,
    fr: "médecin",
    pos: "n.m.",
    cn: "医生",
    lesson: 7,
    phonetic: "",
    example: "Mon pere est médecin.",
    exampleCn: "我父亲是医生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 653,
    fr: "médecine",
    pos: "n.f.",
    cn: "医学",
    lesson: 29,
    phonetic: "",
    example: "C'est une médecine.",
    exampleCn: "这是一个医学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 654,
    fr: "medias",
    pos: "n.m.pl.",
    cn: "宣传媒介",
    lesson: 28,
    phonetic: "",
    example: "C'est un medias.",
    exampleCn: "这是一个宣传媒介。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 655,
    fr: "Méditerranée",
    pos: "n.f.",
    cn: "地中海",
    lesson: 26,
    phonetic: "",
    example: "C'est Méditerranée.",
    exampleCn: "这是地中海。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 656,
    fr: "meilleur, e",
    pos: "a.",
    cn: "最好的,更好的",
    lesson: 26,
    phonetic: "",
    example: "C'est mon meilleur ami.",
    exampleCn: "这是我最要好的朋友。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 657,
    fr: "mélange",
    pos: "n.m.",
    cn: "混合,混杂",
    lesson: 30,
    phonetic: "",
    example: "C'est un mélange.",
    exampleCn: "这是一个混合。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 658,
    fr: "ménage",
    pos: "n.m.",
    cn: "家务",
    lesson: 12,
    phonetic: "",
    example: "Elle vient faire le ménage tous les matins.",
    exampleCn: "她每天早晨来做家务活儿。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 659,
    fr: "mener",
    pos: "v.t.",
    cn: "进行,过着…生活",
    lesson: 24,
    phonetic: "",
    example: "Je mene.",
    exampleCn: "我进行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 660,
    fr: "menu",
    pos: "n.m.",
    cn: "菜单,食谱",
    lesson: 23,
    phonetic: "",
    example: "C'est un menu.",
    exampleCn: "这是一个菜单。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 661,
    fr: "mer",
    pos: "n.f.",
    cn: "海",
    lesson: 26,
    phonetic: "",
    example: "C'est une mer.",
    exampleCn: "这是一个海。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 662,
    fr: "mer du Nord",
    pos: "",
    cn: "北海",
    lesson: 26,
    phonetic: "",
    example: "La mer du Nord est au nord de la France.",
    exampleCn: "北海在法国北部。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 663,
    fr: "merci",
    pos: "interj.",
    cn: "谢谢",
    lesson: 19,
    phonetic: "",
    example: "Je vais très bien, merci.",
    exampleCn: "我身体很好，谢谢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 664,
    fr: "mercredi",
    pos: "n.m.",
    cn: "星期三",
    lesson: 15,
    phonetic: "",
    example: "J'ai recu un coup de teléphone de Jacques: il arrive à Paris mercredi prochain.",
    exampleCn: "我接到雅克打来的电话，他下星期三到巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 665,
    fr: "mère",
    pos: "n.f.",
    cn: "母亲",
    lesson: 8,
    phonetic: "",
    example: "C'est une mère.",
    exampleCn: "这是一个母亲。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 666,
    fr: "message",
    pos: "n.m.",
    cn: "便条",
    lesson: 16,
    phonetic: "",
    example: "C'est un message.",
    exampleCn: "这是一个便条。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 667,
    fr: "métro",
    pos: "n.m.",
    cn: "地铁",
    lesson: 14,
    phonetic: "",
    example: "C'est un métro.",
    exampleCn: "这是一个地铁。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 668,
    fr: "mettre",
    pos: "v.t.",
    cn: "放,置",
    lesson: 19,
    phonetic: "",
    example: "Je mets.",
    exampleCn: "我放。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 669,
    fr: "se mettre (à)",
    pos: "v.pr.",
    cn: "开始",
    lesson: 24,
    phonetic: "",
    example: "Je me mets.",
    exampleCn: "我开始。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 670,
    fr: "midi",
    pos: "n.m.",
    cn: "中午",
    lesson: 14,
    phonetic: "",
    example: "C'est un midi.",
    exampleCn: "这是一个中午。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 671,
    fr: "milieu",
    pos: "n.m.",
    cn: "中间,中期",
    lesson: 28,
    phonetic: "",
    example: "C'est un milieu.",
    exampleCn: "这是一个中间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 672,
    fr: "mille",
    pos: "a.num.",
    cn: "千",
    lesson: 14,
    phonetic: "",
    example: "C'est mille.",
    exampleCn: "这是千。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 673,
    fr: "millier",
    pos: "n.m.",
    cn: "成千",
    lesson: 29,
    phonetic: "",
    example: "C'est un millier.",
    exampleCn: "这是一个成千。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 674,
    fr: "minute",
    pos: "n.f.",
    cn: "分钟",
    lesson: 14,
    phonetic: "",
    example: "C'est une minute.",
    exampleCn: "这是一个分钟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 675,
    fr: "minuit",
    pos: "n.m.",
    cn: "午夜",
    lesson: 14,
    phonetic: "",
    example: "Chaque jour il se couche a minuit.",
    exampleCn: "他每天夜里+二点睡觉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 676,
    fr: "mode",
    pos: "n.f.",
    cn: "时装",
    lesson: 21,
    phonetic: "",
    example: "C'est une mode.",
    exampleCn: "这是一个时装。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 677,
    fr: "modèle",
    pos: "n.m.",
    cn: "典范,榜样",
    lesson: 21,
    phonetic: "",
    example: "C'est un modèle.",
    exampleCn: "这是一个典范。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 678,
    fr: "moderne",
    pos: "a.",
    cn: "现代化的",
    lesson: 30,
    phonetic: "",
    example: "C'est moderne.",
    exampleCn: "这是现代化的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 679,
    fr: "modernisation",
    pos: "n.f.",
    cn: "现代化",
    lesson: 30,
    phonetic: "",
    example: "C'est une modernisation.",
    exampleCn: "这是现代化。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 680,
    fr: "se moderniser",
    pos: "v.pr.",
    cn: "现代化",
    lesson: 24,
    phonetic: "",
    example: "Je me modernise.",
    exampleCn: "我现代化。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 681,
    fr: "moins",
    pos: "prép.",
    cn: "减去,差",
    lesson: 14,
    phonetic: "",
    example: "Ces textes sont moins longs.",
    exampleCn: "这些课文比较短。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 682,
    fr: "Mossack",
    pos: "",
    cn: "穆萨克",
    lesson: 18,
    phonetic: "",
    example: "C'est Mossack.",
    exampleCn: "这是穆萨克。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 683,
    fr: "moment",
    pos: "n.m.",
    cn: "时刻,时间",
    lesson: 30,
    phonetic: "",
    example: "C'est un moment.",
    exampleCn: "这是时刻。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 684,
    fr: "mon",
    pos: "a.poss.",
    cn: "我的",
    lesson: 8,
    phonetic: "",
    example: "C'est mon.",
    exampleCn: "这是我的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 685,
    fr: "le Monde",
    pos: "",
    cn: "《世界报》",
    lesson: 22,
    phonetic: "",
    example: "Je lis le Monde chaque matin.",
    exampleCn: "我每天早上读《世界报》。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 686,
    fr: "monde",
    pos: "n.m.",
    cn: "世界,人",
    lesson: 27,
    phonetic: "",
    example: "C'est un monde.",
    exampleCn: "这是一个世界。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 687,
    fr: "mondial, e (aux)",
    pos: "a.",
    cn: "世界的",
    lesson: 28,
    phonetic: "",
    example: "C'est mondial.",
    exampleCn: "这是世界的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 688,
    fr: "moniteur, trice",
    pos: "n.",
    cn: "教练员,辅导员",
    lesson: 3,
    phonetic: "",
    example: "C'est un moniteur.",
    exampleCn: "这是教练员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 689,
    fr: "monsieur",
    pos: "n.m.",
    cn: "先生",
    lesson: 7,
    phonetic: "",
    example: "Monsieur Durand a vu une voiture qui arrivait.",
    exampleCn: "杜朗先生看见一辆汽车开了过来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 690,
    fr: "montagne",
    pos: "n.f.",
    cn: "山",
    lesson: 18,
    phonetic: "",
    example: "Ce village se trouve au pied d'une montagne.",
    exampleCn: "这个村庄坐落在山脚下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 691,
    fr: "monter",
    pos: "v.t.",
    cn: "往上搬运",
    lesson: 12,
    phonetic: "",
    example: "Je monte.",
    exampleCn: "我往上搬运。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 692,
    fr: "montre",
    pos: "n.f.",
    cn: "手表",
    lesson: 14,
    phonetic: "",
    example: "C'est moi qui ai perdu une montre.",
    exampleCn: "是我丢失了-一块手表。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 693,
    fr: "montrer",
    pos: "v.t.",
    cn: "出示,给…看",
    lesson: 19,
    phonetic: "",
    example: "Je montre.",
    exampleCn: "我出示。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 694,
    fr: "monument",
    pos: "n.m.",
    cn: "纪念性建筑物",
    lesson: 10,
    phonetic: "",
    example: "C'est un monument.",
    exampleCn: "这是纪念性建筑物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 695,
    fr: "morceau (x)",
    pos: "n.m.",
    cn: "块,片",
    lesson: 27,
    phonetic: "",
    example: "C'est un morceau.",
    exampleCn: "这是一个块。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 696,
    fr: "mot",
    pos: "n.m.",
    cn: "字,词",
    lesson: 30,
    phonetic: "",
    example: "C'est un mot.",
    exampleCn: "这是一个字。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 697,
    fr: "moto",
    pos: "n.f.",
    cn: "摩托车",
    lesson: 6,
    phonetic: "",
    example: "C'est une moto.",
    exampleCn: "这是一个摩托车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 698,
    fr: "mouillé, e",
    pos: "a.",
    cn: "潮湿的",
    lesson: 24,
    phonetic: "",
    example: "C'est mouillé.",
    exampleCn: "这是潮湿的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 699,
    fr: "moyen",
    pos: "n.m.",
    cn: "方法,方式",
    lesson: 30,
    phonetic: "",
    example: "C'est un moyen.",
    exampleCn: "这是一个方法。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 700,
    fr: "Moyen Age",
    pos: "n.m.",
    cn: "中世纪",
    lesson: 7,
    phonetic: "",
    example: "C'est Moyen Age.",
    exampleCn: "这是中世纪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 701,
    fr: "mur",
    pos: "n.m.",
    cn: "墙",
    lesson: 7,
    phonetic: "",
    example: "C'est un mur.",
    exampleCn: "这是一个墙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 702,
    fr: "musique",
    pos: "n.f.",
    cn: "音乐",
    lesson: 30,
    phonetic: "",
    example: "C'est une musique.",
    exampleCn: "这是一个音乐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 703,
    fr: "musique pop",
    pos: "",
    cn: "[英]流行音乐",
    lesson: 30,
    phonetic: "",
    example: "J'aime la musique pop.",
    exampleCn: "我喜欢流行音乐。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 704,
    fr: "naître",
    pos: "v.i.",
    cn: "出生",
    lesson: 27,
    phonetic: "",
    example: "Je naît.",
    exampleCn: "我出生。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 705,
    fr: "national, e (aux)",
    pos: "a.",
    cn: "民族的,国家的",
    lesson: 13,
    phonetic: "",
    example: "C'est national.",
    exampleCn: "这是民族的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 706,
    fr: "nécessaire",
    pos: "a.",
    cn: "必要的",
    lesson: 19,
    phonetic: "/nesɛsɛʁ/",
    example: "C’est nécessaire.",
    exampleCn: "这是必要的。",
    hasAudio: true,
    audioId: 35
  },
  {
    id: 707,
    fr: "nécessité",
    pos: "n.f.",
    cn: "必要性",
    lesson: 30,
    phonetic: "",
    example: "C'est une nécessité.",
    exampleCn: "这是必要性。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 708,
    fr: "neiger",
    pos: "v.impers.",
    cn: "降雪",
    lesson: 18,
    phonetic: "/neʒe/",
    example: "Il neige aujourd’hui.",
    exampleCn: "今天下雪了。",
    hasAudio: true,
    audioId: 36
  },
  {
    id: 709,
    fr: "ne…jamais",
    pos: "",
    cn: "从来不,绝不",
    lesson: 15,
    phonetic: "",
    example: "Je ne fume jamais.",
    exampleCn: "我从不抽烟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 710,
    fr: "ne…pas",
    pos: "",
    cn: "不,没有",
    lesson: 6,
    phonetic: "",
    example: "Je ne sais pas.",
    exampleCn: "我不知道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 711,
    fr: "ne…plus",
    pos: "",
    cn: "不再…",
    lesson: 12,
    phonetic: "",
    example: "Je ne mange plus de viande.",
    exampleCn: "我不再吃肉了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 712,
    fr: "ne…que",
    pos: "",
    cn: "仅仅…",
    lesson: 19,
    phonetic: "",
    example: "Je n'ai que dix euros.",
    exampleCn: "我只有十欧元。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 713,
    fr: "ne…rien",
    pos: "",
    cn: "毫无…",
    lesson: 14,
    phonetic: "",
    example: "Je ne vois rien.",
    exampleCn: "我什么也看不见。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 714,
    fr: "n'est-ce pas",
    pos: "",
    cn: "是不是",
    lesson: 10,
    phonetic: "",
    example: "Tu viens, n'est-ce pas ?",
    exampleCn: "你来，对吧？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 715,
    fr: "New York",
    pos: "",
    cn: "纽约",
    lesson: 19,
    phonetic: "",
    example: "New York est une grande ville.",
    exampleCn: "纽约是一座大城市。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 716,
    fr: "new-yorkais, e",
    pos: "a.",
    cn: "纽约的",
    lesson: 20,
    phonetic: "",
    example: "C'est new-yorkais.",
    exampleCn: "这是纽约的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 717,
    fr: "Nice",
    pos: "",
    cn: "尼斯",
    lesson: 1,
    phonetic: "",
    example: "C'est Nice.",
    exampleCn: "这是尼斯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 718,
    fr: "Nîmes",
    pos: "",
    cn: "尼姆",
    lesson: 29,
    phonetic: "",
    example: "C'est Nîmes.",
    exampleCn: "这是尼姆。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 719,
    fr: "niveau",
    pos: "n.m.",
    cn: "水平,程度",
    lesson: 25,
    phonetic: "/nivo/",
    example: "Son niveau de français.",
    exampleCn: "他的法语水平。",
    hasAudio: true,
    audioId: 37
  },
  {
    id: 720,
    fr: "niveau de vie",
    pos: "",
    cn: "生活水平",
    lesson: 25,
    phonetic: "",
    example: "Le niveau de vie augmente.",
    exampleCn: "生活水平提高了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 721,
    fr: "noir, a., n.m.",
    pos: "",
    cn: "黑色的;黑色",
    lesson: 5,
    phonetic: "",
    example: "J'ai une voiture noire.",
    exampleCn: "我有一辆黑色的车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 722,
    fr: "nom",
    pos: "n.m.",
    cn: "姓,姓名",
    lesson: 20,
    phonetic: "",
    example: "C'est un nom.",
    exampleCn: "这是一个姓。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 723,
    fr: "nombre",
    pos: "n.m.",
    cn: "数目",
    lesson: 24,
    phonetic: "",
    example: "C'est un nombre.",
    exampleCn: "这是一个数目。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 724,
    fr: "nombreux, se",
    pos: "a.",
    cn: "众多的",
    lesson: 26,
    phonetic: "",
    example: "De nombreux cours d'eau parcourent la France.",
    exampleCn: "法国有许多河流。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 725,
    fr: "non",
    pos: "adv.",
    cn: "不",
    lesson: 6,
    phonetic: "",
    example: "Non.",
    exampleCn: "不。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 726,
    fr: "nord",
    pos: "n.m.",
    cn: "北,北方",
    lesson: 26,
    phonetic: "",
    example: "C'est un nord.",
    exampleCn: "这是一个北。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 727,
    fr: "normal, e (aux)",
    pos: "a.",
    cn: "正常的",
    lesson: 17,
    phonetic: "",
    example: "C'est normal.",
    exampleCn: "这是正常的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 728,
    fr: "normalement",
    pos: "adv.",
    cn: "正常地",
    lesson: 27,
    phonetic: "",
    example: "Normalement, il arrive à huit heures.",
    exampleCn: "通常他八点到。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 729,
    fr: "note",
    pos: "n.f.",
    cn: "成绩,分数",
    lesson: 15,
    phonetic: "",
    example: "C'est une note.",
    exampleCn: "这是一个成绩。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 730,
    fr: "notre",
    pos: "a.poss.",
    cn: "我们的",
    lesson: 4,
    phonetic: "",
    example: "C'est notre.",
    exampleCn: "这是我们的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 731,
    fr: "Notre-Dame",
    pos: "",
    cn: "巴黎圣母院",
    lesson: 27,
    phonetic: "",
    example: "C'est Notre-Dame.",
    exampleCn: "这是巴黎圣母院。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 732,
    fr: "nouveau (nouvel, nouvelle)",
    pos: "a.",
    cn: "新的",
    lesson: 16,
    phonetic: "",
    example: "C'est nouveau.",
    exampleCn: "这是新的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 733,
    fr: "nuage",
    pos: "n.m.",
    cn: "云",
    lesson: 18,
    phonetic: "/nɥaʒ/",
    example: "Le ciel est plein de nuages.",
    exampleCn: "天空布满云。",
    hasAudio: true,
    audioId: 39
  },
  {
    id: 734,
    fr: "nuit",
    pos: "n.f.",
    cn: "夜,夜晚",
    lesson: 28,
    phonetic: "/nɥi/",
    example: "Bonne nuit !",
    exampleCn: "晚安！",
    hasAudio: true,
    audioId: 40
  },
  {
    id: 735,
    fr: "numéro",
    pos: "n.m.",
    cn: "号码",
    lesson: 20,
    phonetic: "",
    example: "C'est un numéro.",
    exampleCn: "这是一个号码。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 736,
    fr: "obligatoire",
    pos: "a.",
    cn: "义务的,必须的",
    lesson: 15,
    phonetic: "",
    example: "C'est obligatoire.",
    exampleCn: "这是义务的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 737,
    fr: "obligé, e",
    pos: "a.",
    cn: "必须,被迫",
    lesson: 16,
    phonetic: "",
    example: "C'est obligé.",
    exampleCn: "这是必须。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 738,
    fr: "obtenir",
    pos: "v.t.",
    cn: "获得",
    lesson: 19,
    phonetic: "",
    example: "J'obtiens.",
    exampleCn: "我获得。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 739,
    fr: "occasion",
    pos: "n.f.",
    cn: "机会",
    lesson: 28,
    phonetic: "",
    example: "C'est une occasion.",
    exampleCn: "这是机会。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 740,
    fr: "occidental, e (aux)",
    pos: "a.",
    cn: "西方的",
    lesson: 26,
    phonetic: "",
    example: "C'est occidental.",
    exampleCn: "这是西方的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 741,
    fr: "occuper",
    pos: "v.t.",
    cn: "占据,处于",
    lesson: 26,
    phonetic: "",
    example: "J'occupe.",
    exampleCn: "我占据。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 742,
    fr: "océan Atlantique",
    pos: "n.m.",
    cn: "大西洋",
    lesson: 26,
    phonetic: "",
    example: "C'est un océan Atlantique.",
    exampleCn: "这是一个大西洋。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 743,
    fr: "officier",
    pos: "n.m.",
    cn: "军官",
    lesson: 8,
    phonetic: "",
    example: "C'est un officier.",
    exampleCn: "这是一个军官。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 744,
    fr: "offrir",
    pos: "v.t.",
    cn: "赠送,提供",
    lesson: 17,
    phonetic: "/ɔfʁiʁ/",
    example: "Je t’offre des fleurs.",
    exampleCn: "我送你花。",
    hasAudio: true,
    audioId: 41
  },
  {
    id: 745,
    fr: "oh",
    pos: "interj.",
    cn: "噢,啊",
    lesson: 10,
    phonetic: "",
    example: "Oh, c'est toi !",
    exampleCn: "噢，是你！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 746,
    fr: "oiseau",
    pos: "n.m.",
    cn: "鸟",
    lesson: 24,
    phonetic: "",
    example: "C'est un oiseau.",
    exampleCn: "这是一个鸟。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 747,
    fr: "on",
    pos: "pron.",
    cn: "人们,我们",
    lesson: 15,
    phonetic: "",
    example: "On va au parc ?",
    exampleCn: "我们去公园吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 748,
    fr: "oncle",
    pos: "n.m.",
    cn: "叔,舅,姑夫…",
    lesson: 17,
    phonetic: "",
    example: "C'est un oncle.",
    exampleCn: "这是一个叔。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 749,
    fr: "opposer",
    pos: "v.t.",
    cn: "使对立",
    lesson: 28,
    phonetic: "",
    example: "J'oppose.",
    exampleCn: "我使对立。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 750,
    fr: "s'opposer",
    pos: "v.pr.",
    cn: "反对",
    lesson: 30,
    phonetic: "",
    example: "Je m'oppose.",
    exampleCn: "我反对。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 751,
    fr: "or",
    pos: "conj.",
    cn: "不过,然而",
    lesson: 25,
    phonetic: "",
    example: "Il est tard, or je dois partir.",
    exampleCn: "天晚了，不过我得走了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 752,
    fr: "ordinateur",
    pos: "n.m.",
    cn: "电脑",
    lesson: 19,
    phonetic: "/ɔʁdinatœʁ/",
    example: "Mon ordinateur est neuf.",
    exampleCn: "我的电脑是新的。",
    hasAudio: true,
    audioId: 42
  },
  {
    id: 753,
    fr: "ordre",
    pos: "n.m.",
    cn: "顺序,命令",
    lesson: 28,
    phonetic: "",
    example: "C'est un ordre.",
    exampleCn: "这是一个顺序。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 754,
    fr: "ordre du jour",
    pos: "n.m.",
    cn: "议事日程",
    lesson: 28,
    phonetic: "",
    example: "C'est un ordre du jour.",
    exampleCn: "这是一个议事日程。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 755,
    fr: "oreillons",
    pos: "n.m.pl.",
    cn: "流行性腮腺炎",
    lesson: 29,
    phonetic: "",
    example: "C'est un oreillons.",
    exampleCn: "这是一个流行性腮腺炎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 756,
    fr: "organiser",
    pos: "v.t.",
    cn: "组织",
    lesson: 29,
    phonetic: "",
    example: "Onva organiser une excursiona la Grande Muraille.",
    exampleCn: "我们将组织游览长城。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 757,
    fr: "original, e (aux)",
    pos: "a.",
    cn: "奇特,新颖",
    lesson: 21,
    phonetic: "",
    example: "C'est original.",
    exampleCn: "这是奇特。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 758,
    fr: "ou",
    pos: "conj.",
    cn: "或者",
    lesson: 10,
    phonetic: "",
    example: "Tu veux du thé ou du café ?",
    exampleCn: "你要茶还是咖啡？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 759,
    fr: "où",
    pos: "adv.interr.",
    cn: "哪儿",
    lesson: 1,
    phonetic: "",
    example: "Où habites-tu ?",
    exampleCn: "你住在哪里？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 760,
    fr: "oublier",
    pos: "v.t.",
    cn: "忘记",
    lesson: 19,
    phonetic: "",
    example: "J'oublie ton nom.",
    exampleCn: "我忘记你的名字。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 761,
    fr: "oui",
    pos: "adv.",
    cn: "是,对,行",
    lesson: 2,
    phonetic: "",
    example: "Oui.",
    exampleCn: "是。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 762,
    fr: "ouvrier, ère",
    pos: "n.",
    cn: "工人",
    lesson: 7,
    phonetic: "",
    example: "C'est un ouvrier.",
    exampleCn: "这是一个工人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 763,
    fr: "ouvrir",
    pos: "v.t.",
    cn: "打开",
    lesson: 21,
    phonetic: "",
    example: "J'ouvre la porte.",
    exampleCn: "我打开门。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 764,
    fr: "palais",
    pos: "n.m.",
    cn: "宫殿,宫",
    lesson: 27,
    phonetic: "",
    example: "C'est un palais.",
    exampleCn: "这是一个宫殿。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 765,
    fr: "palais de justice",
    pos: "",
    cn: "法院",
    lesson: 27,
    phonetic: "",
    example: "Le palais de justice est en face.",
    exampleCn: "法院在对面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 766,
    fr: "panne",
    pos: "n.f.",
    cn: "故障,抛锚",
    lesson: 18,
    phonetic: "",
    example: "C'est une panne.",
    exampleCn: "这是一个故障。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 767,
    fr: "pantalon",
    pos: "n.m.",
    cn: "裤子",
    lesson: 6,
    phonetic: "",
    example: "C'est un pantalon.",
    exampleCn: "这是一个裤子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 768,
    fr: "papier",
    pos: "n.m.",
    cn: "纸",
    lesson: 5,
    phonetic: "",
    example: "C'est un papier.",
    exampleCn: "这是一个纸。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 769,
    fr: "papiers",
    pos: "n.m.pl.",
    cn: "证件,身份证",
    lesson: 19,
    phonetic: "",
    example: "C'est un papiers.",
    exampleCn: "这是一个证件。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 770,
    fr: "paquet",
    pos: "n.m.",
    cn: "包",
    lesson: 19,
    phonetic: "",
    example: "Je vais acheter un paquet de café.",
    exampleCn: "我去买一包咖啡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 771,
    fr: "par",
    pos: "prép.",
    cn: "从,由,通过",
    lesson: 12,
    phonetic: "",
    example: "Je vais à Paris par le train.",
    exampleCn: "我坐火车去巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 772,
    fr: "parapluie",
    pos: "n.m.",
    cn: "雨伞",
    lesson: 24,
    phonetic: "",
    example: "C'est un parapluie.",
    exampleCn: "这是一个雨伞。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 773,
    fr: "parce que",
    pos: "",
    cn: "因为",
    lesson: 14,
    phonetic: "",
    example: "Je reste car j'ai froid.",
    exampleCn: "我待着因为我冷。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 774,
    fr: "parcourir",
    pos: "v.t.",
    cn: "跑遍,经过",
    lesson: 26,
    phonetic: "",
    example: "Je parcouris.",
    exampleCn: "我跑遍。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 775,
    fr: "pardon",
    pos: "n.m.",
    cn: "对不起,原谅",
    lesson: 14,
    phonetic: "",
    example: "C'est un pardon.",
    exampleCn: "这是一个对不起。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 776,
    fr: "parents",
    pos: "n.m.pl.",
    cn: "父母亲",
    lesson: 12,
    phonetic: "",
    example: "Ses parents se sont opposés a son mariage.",
    exampleCn: "他父母反对他的婚事。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 777,
    fr: "paresseux, se",
    pos: "a.",
    cn: "懒惰的",
    lesson: 15,
    phonetic: "",
    example: "C'est un paresseux：il seleve très tard le matin.",
    exampleCn: "这是个懒人，他早晨起得很晚。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 778,
    fr: "par exemple",
    pos: "",
    cn: "例如,举例",
    lesson: 20,
    phonetic: "",
    example: "Par exemple, tu peux prendre un taxi.",
    exampleCn: "例如，你可以打车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 779,
    fr: "parfait, e",
    pos: "a.",
    cn: "完美的,理想的",
    lesson: 20,
    phonetic: "",
    example: "C'est parfait.",
    exampleCn: "这是完美的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 780,
    fr: "parfois",
    pos: "adv.",
    cn: "有时候",
    lesson: 14,
    phonetic: "",
    example: "Parfois, je vais au cinéma.",
    exampleCn: "有时候我去看电影。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 781,
    fr: "parfum",
    pos: "n.m.",
    cn: "香水",
    lesson: 5,
    phonetic: "",
    example: "C'est un parfum.",
    exampleCn: "这是一个香水。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 782,
    fr: "Paris",
    pos: "",
    cn: "巴黎",
    lesson: 3,
    phonetic: "",
    example: "C'est à Paris qu'ils se sont connus.",
    exampleCn: "他们是在巴黎相识的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 783,
    fr: "parisien, ne",
    pos: "a.",
    cn: "巴黎的",
    lesson: 12,
    phonetic: "",
    example: "C'est parisien.",
    exampleCn: "这是巴黎的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 784,
    fr: "Parisien, ne",
    pos: "n.",
    cn: "巴黎人",
    lesson: 23,
    phonetic: "",
    example: "C'est Parisien.",
    exampleCn: "这是巴黎人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 785,
    fr: "parking",
    pos: "n.m.",
    cn: "[英]停车场",
    lesson: 25,
    phonetic: "",
    example: "C'est un parking.",
    exampleCn: "这是一个[英]停车场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 786,
    fr: "parler",
    pos: "v.t.",
    cn: "讲,谈话",
    lesson: 10,
    phonetic: "",
    example: "Ah!J'ai oubliéde lui en parler.",
    exampleCn: "啊！我忘记和他说了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 787,
    fr: "participer",
    pos: "v.t.ind.",
    cn: "参加",
    lesson: 30,
    phonetic: "",
    example: "Je participe.",
    exampleCn: "我参加。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 788,
    fr: "partir",
    pos: "v.i.",
    cn: "出发",
    lesson: 16,
    phonetic: "",
    example: "Pensez bien a fermer les fenêtres avant de partir.",
    exampleCn: "走之前想着把窗户关好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 789,
    fr: "partout",
    pos: "adv.",
    cn: "到处",
    lesson: 17,
    phonetic: "",
    example: "Je cherche partout.",
    exampleCn: "我到处找。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 790,
    fr: "pas du tout",
    pos: "",
    cn: "一点儿也不",
    lesson: 19,
    phonetic: "",
    example: "— Tu fumes ? — Pas du tout.",
    exampleCn: "——你抽烟吗？——一点也不。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 791,
    fr: "passager, ère",
    pos: "n.",
    cn: "乘客",
    lesson: 19,
    phonetic: "",
    example: "C'est un passager.",
    exampleCn: "这是一个乘客。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 792,
    fr: "passant, e",
    pos: "n.",
    cn: "过路人,行人",
    lesson: 14,
    phonetic: "",
    example: "Jacques demande l'heure a un passant.",
    exampleCn: "雅克向一个行人问时间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 793,
    fr: "passeport",
    pos: "n.m.",
    cn: "护照",
    lesson: 19,
    phonetic: "",
    example: "C'est un passeport.",
    exampleCn: "这是一个护照。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 794,
    fr: "passer",
    pos: "v.t.",
    cn: "通过,度过",
    lesson: 15,
    phonetic: "",
    example: "Je passe.",
    exampleCn: "我通过。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 795,
    fr: "passif, ve",
    pos: "a.",
    cn: "消极的,被动的",
    lesson: 30,
    phonetic: "",
    example: "C'est passif.",
    exampleCn: "这是消极的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 796,
    fr: "patience",
    pos: "n.f.",
    cn: "耐心",
    lesson: 19,
    phonetic: "",
    example: "Cequi me touche le plus，c'est sa patience.",
    exampleCn: "最使我感动的是他的耐心。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 797,
    fr: "patient, e",
    pos: "a.",
    cn: "耐心的",
    lesson: 29,
    phonetic: "",
    example: "C'est patient.",
    exampleCn: "这是耐心的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 798,
    fr: "patiner",
    pos: "v.i.",
    cn: "滑冰",
    lesson: 18,
    phonetic: "",
    example: "Je patine.",
    exampleCn: "我滑冰。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 799,
    fr: "patron, ne",
    pos: "n.",
    cn: "老板",
    lesson: 18,
    phonetic: "",
    example: "C'est un patron.",
    exampleCn: "这是一个老板。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 800,
    fr: "payer",
    pos: "v.t.",
    cn: "支付,付款",
    lesson: 24,
    phonetic: "",
    example: "Je paye.",
    exampleCn: "我支付。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 801,
    fr: "pays",
    pos: "n.m.",
    cn: "国家",
    lesson: 11,
    phonetic: "",
    example: "C'est un pays.",
    exampleCn: "这是一个国家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 802,
    fr: "paysage",
    pos: "n.m.",
    cn: "风景",
    lesson: 28,
    phonetic: "",
    example: "C'est un paysage.",
    exampleCn: "这是一个风景。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 803,
    fr: "paysan, ne",
    pos: "n.",
    cn: "农民",
    lesson: 28,
    phonetic: "",
    example: "C'est le fils d'un paysan d'Auvergne.",
    exampleCn: "他是奥弗涅一个农民的儿子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 804,
    fr: "pêche",
    pos: "n.f.",
    cn: "桃子",
    lesson: 28,
    phonetic: "",
    example: "C'est une pêche.",
    exampleCn: "这是一个桃子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 805,
    fr: "pêcheur, se",
    pos: "n.",
    cn: "渔民",
    lesson: 27,
    phonetic: "",
    example: "C'est un pêcheur.",
    exampleCn: "这是渔民。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 806,
    fr: "peindre",
    pos: "v.t.",
    cn: "绘画",
    lesson: 30,
    phonetic: "",
    example: "Je peins.",
    exampleCn: "我绘画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 807,
    fr: "peigne",
    pos: "n.m.",
    cn: "梳子",
    lesson: 6,
    phonetic: "",
    example: "C'est un peigne.",
    exampleCn: "这是一个梳子。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 808,
    fr: "peintre",
    pos: "n.m.",
    cn: "画家",
    lesson: 28,
    phonetic: "",
    example: "C'est un peintre.",
    exampleCn: "这是一个画家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 809,
    fr: "peinture",
    pos: "n.f.",
    cn: "绘画",
    lesson: 6,
    phonetic: "",
    example: "C'est une peinture.",
    exampleCn: "这是一个绘画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 810,
    fr: "Beijing",
    pos: "",
    cn: "北京",
    lesson: 11,
    phonetic: "",
    example: "Je fais mes études à l'Université de Beijing.",
    exampleCn: "我在北京大学学习。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 811,
    fr: "pendant",
    pos: "prép.",
    cn: "在…期间",
    lesson: 18,
    phonetic: "",
    example: "J'ai travaillé pendant deux heures.",
    exampleCn: "我工作了两个小时。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 812,
    fr: "penser",
    pos: "v.i., v.t.",
    cn: "想,思考,认为",
    lesson: 21,
    phonetic: "",
    example: "Je pense.",
    exampleCn: "我想。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 813,
    fr: "percher",
    pos: "v.i.",
    cn: "坐落,栖息",
    lesson: 28,
    phonetic: "",
    example: "Je perche.",
    exampleCn: "我坐落。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 814,
    fr: "père",
    pos: "n.m.",
    cn: "父亲",
    lesson: 8,
    phonetic: "",
    example: "C'est un père.",
    exampleCn: "这是一个父亲。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 815,
    fr: "période",
    pos: "n.f.",
    cn: "时期",
    lesson: 19,
    phonetic: "",
    example: "C'est une période.",
    exampleCn: "这是一个时期。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 816,
    fr: "permettre",
    pos: "v.t.",
    cn: "允许",
    lesson: 28,
    phonetic: "",
    example: "Je permets.",
    exampleCn: "我允许。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 817,
    fr: "personnage",
    pos: "n.m.",
    cn: "人物",
    lesson: 23,
    phonetic: "",
    example: "C'est un personnage.",
    exampleCn: "这是一个人物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 818,
    fr: "perspective",
    pos: "n.f.",
    cn: "景色",
    lesson: 27,
    phonetic: "",
    example: "C'est une perspective.",
    exampleCn: "这是一个景色。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 819,
    fr: "persuader",
    pos: "v.t.",
    cn: "说服,使相信",
    lesson: 30,
    phonetic: "",
    example: "Je persuade.",
    exampleCn: "我说服。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 820,
    fr: "petit, e",
    pos: "a.",
    cn: "小的",
    lesson: 12,
    phonetic: "",
    example: "C'est petit.",
    exampleCn: "这是小的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 821,
    fr: "peu",
    pos: "adv.",
    cn: "少,不多",
    lesson: 23,
    phonetic: "",
    example: "Je parle peu de français.",
    exampleCn: "我法语说得少。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 822,
    fr: "peuple",
    pos: "n.m.",
    cn: "人民",
    lesson: 11,
    phonetic: "",
    example: "C'est un peuple.",
    exampleCn: "这是一个人民。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 823,
    fr: "pharmacien, ne",
    pos: "n.",
    cn: "药剂师",
    lesson: 7,
    phonetic: "",
    example: "C'est un pharmacien.",
    exampleCn: "这是一个药剂师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 824,
    fr: "photo",
    pos: "n.f.",
    cn: "照片",
    lesson: 6,
    phonetic: "",
    example: "C'est une photo.",
    exampleCn: "这是一个照片。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 825,
    fr: "pièce",
    pos: "n.f.",
    cn: "房间,单间",
    lesson: 13,
    phonetic: "",
    example: "C'est une pièce.",
    exampleCn: "这是一个房间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 826,
    fr: "pied",
    pos: "n.m.",
    cn: "脚",
    lesson: 13,
    phonetic: "",
    example: "C'est un pied.",
    exampleCn: "这是一个脚。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 827,
    fr: "pilote",
    pos: "n.m.",
    cn: "飞行员",
    lesson: 3,
    phonetic: "",
    example: "C'est un pilote.",
    exampleCn: "这是一个飞行员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 828,
    fr: "piste",
    pos: "n.f.",
    cn: "跑道",
    lesson: 19,
    phonetic: "",
    example: "C'est une piste.",
    exampleCn: "这是一个跑道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 829,
    fr: "place",
    pos: "n.f.",
    cn: "广场,工作位置",
    lesson: 13,
    phonetic: "",
    example: "C'est une place.",
    exampleCn: "这是一个广场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 830,
    fr: "plaine",
    pos: "n.f.",
    cn: "平原",
    lesson: 26,
    phonetic: "",
    example: "C'est une plaine.",
    exampleCn: "这是一个平原。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 831,
    fr: "plaire",
    pos: "v.t.ind.",
    cn: "使喜爱",
    lesson: 29,
    phonetic: "",
    example: "Je plais.",
    exampleCn: "我使喜爱。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 832,
    fr: "plaisir",
    pos: "n.m.",
    cn: "愉快,高兴",
    lesson: 12,
    phonetic: "",
    example: "J'accepte ce cadeau avec plaisir.",
    exampleCn: "我很高兴接受这一礼物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 833,
    fr: "plan",
    pos: "n.m.",
    cn: "平面图,方面",
    lesson: 13,
    phonetic: "",
    example: "C'est un plan.",
    exampleCn: "这是一个平面图。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 834,
    fr: "plastique",
    pos: "n.m.",
    cn: "塑料",
    lesson: 25,
    phonetic: "",
    example: "On utilise le plastique à la place du bois.",
    exampleCn: "用塑料代替木材。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 835,
    fr: "plat du jour",
    pos: "n.m.",
    cn: "当日特菜",
    lesson: 23,
    phonetic: "",
    example: "C'est un plat du jour.",
    exampleCn: "这是一个当日特菜。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 836,
    fr: "plein, e",
    pos: "a.",
    cn: "满的,完全的",
    lesson: 27,
    phonetic: "",
    example: "C'est plein.",
    exampleCn: "这是满的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 837,
    fr: "pleuvoir",
    pos: "v.impers.",
    cn: "下雨",
    lesson: 18,
    phonetic: "",
    example: "Il pleut.",
    exampleCn: "下雨。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 838,
    fr: "pluie",
    pos: "n.f.",
    cn: "雨",
    lesson: 24,
    phonetic: "",
    example: "Nous ne sommes pas partis a cause de la pluie.",
    exampleCn: "由于下雨,我们没有走。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 839,
    fr: "plupart",
    pos: "n.f.",
    cn: "大部分,大多数",
    lesson: 25,
    phonetic: "",
    example: "La plupart des étudiants travaillent bien.",
    exampleCn: "大多数学生学习不错。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 840,
    fr: "plus",
    pos: "conj.",
    cn: "加上,多出",
    lesson: 14,
    phonetic: "",
    example: "Je veux plus de pain.",
    exampleCn: "我想要更多面包。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 841,
    fr: "poche",
    pos: "n.f.",
    cn: "衣袋",
    lesson: 7,
    phonetic: "",
    example: "C'est une poche.",
    exampleCn: "这是一个衣袋。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 842,
    fr: "pôle Nord",
    pos: "n.m.",
    cn: "北极",
    lesson: 26,
    phonetic: "",
    example: "C'est un pôle Nord.",
    exampleCn: "这是一个北极。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 843,
    fr: "police",
    pos: "n.f.",
    cn: "警察局,警察(总称)",
    lesson: 19,
    phonetic: "",
    example: "C'est une police.",
    exampleCn: "这是一个警察局。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 844,
    fr: "policier",
    pos: "n.m.",
    cn: "警察",
    lesson: 19,
    phonetic: "",
    example: "C'est un policier.",
    exampleCn: "这是一个警察。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 845,
    fr: "politique",
    pos: "n.f., a.",
    cn: "政治,政治的",
    lesson: 27,
    phonetic: "",
    example: "La Chine occupe une place importante dans la vie politique internationale.",
    exampleCn: "中国在国际政治生活中占有重要地位。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 846,
    fr: "pomme",
    pos: "n.f.",
    cn: "苹果",
    lesson: 6,
    phonetic: "",
    example: "C'est une pomme.",
    exampleCn: "这是一个苹果。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 847,
    fr: "pomme de terre",
    pos: "n.f.",
    cn: "土豆",
    lesson: 26,
    phonetic: "",
    example: "C'est une pomme de terre.",
    exampleCn: "这是一个土豆。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 848,
    fr: "populaire",
    pos: "a.",
    cn: "得人心的",
    lesson: 30,
    phonetic: "",
    example: "C'est populaire.",
    exampleCn: "这是得人心的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 849,
    fr: "population",
    pos: "n.f.",
    cn: "人口,(全体)居民",
    lesson: 25,
    phonetic: "",
    example: "En effet,la population a beaucoup augmenté.",
    exampleCn: "因为，人口增长很快。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 850,
    fr: "portable",
    pos: "n.m.",
    cn: "手机",
    lesson: 22,
    phonetic: "",
    example: "C'est un portable.",
    exampleCn: "这是一个手机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 851,
    fr: "porte",
    pos: "n.f.",
    cn: "门",
    lesson: 7,
    phonetic: "",
    example: "Il est sorti sans fermer la porte.",
    exampleCn: "他没关门就出去了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 852,
    fr: "porter",
    pos: "v.t.",
    cn: "穿着,带",
    lesson: 30,
    phonetic: "",
    example: "Je porte un manteau.",
    exampleCn: "我穿着外套。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 853,
    fr: "portière",
    pos: "n.f.",
    cn: "车门",
    lesson: 24,
    phonetic: "",
    example: "C'est une portière.",
    exampleCn: "这是一个车门。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 854,
    fr: "Portugal",
    pos: "n.m.",
    cn: "葡萄牙",
    lesson: 13,
    phonetic: "",
    example: "C'est Portugal.",
    exampleCn: "这是葡萄牙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 855,
    fr: "poser",
    pos: "v.t.",
    cn: "放,提出(问题)",
    lesson: 29,
    phonetic: "",
    example: "Tu ne peux poser ces questionsqu'auprofesseur.",
    exampleCn: "你只能向老师提这些问题。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 856,
    fr: "posséder",
    pos: "v.t.",
    cn: "拥有",
    lesson: 25,
    phonetic: "",
    example: "Je posséde.",
    exampleCn: "我拥有。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 857,
    fr: "possible",
    pos: "a.",
    cn: "可能的",
    lesson: 29,
    phonetic: "",
    example: "C'est possible.",
    exampleCn: "这是可能的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 858,
    fr: "poste",
    pos: "n.m.",
    cn: "工作,位置",
    lesson: 29,
    phonetic: "",
    example: "Elle vient dela poste.",
    exampleCn: "她从邮局来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 859,
    fr: "poster",
    pos: "n.m.",
    cn: "[英]张贴画",
    lesson: 30,
    phonetic: "",
    example: "C'est un poster.",
    exampleCn: "这是一个[英]张贴画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 860,
    fr: "pouls",
    pos: "n.m.",
    cn: "脉搏",
    lesson: 29,
    phonetic: "",
    example: "C'est un pouls.",
    exampleCn: "这是一个脉搏。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 861,
    fr: "poumon",
    pos: "n.m.",
    cn: "肺",
    lesson: 29,
    phonetic: "",
    example: "C'est un poumon.",
    exampleCn: "这是一个肺。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 862,
    fr: "pour",
    pos: "prép.",
    cn: "为了…,向,往",
    lesson: 9,
    phonetic: "",
    example: "C'est pour toi.",
    exampleCn: "这是给你的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 863,
    fr: "pourboire",
    pos: "n.m.",
    cn: "小费",
    lesson: 27,
    phonetic: "",
    example: "C'est un pourboire.",
    exampleCn: "这是一个小费。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 864,
    fr: "pourquoi",
    pos: "adv., conj.",
    cn: "为什么",
    lesson: 29,
    phonetic: "",
    example: "Pourquoi êtes-vous en retard？",
    exampleCn: "你们为什么迟到？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 865,
    fr: "poursuivre",
    pos: "v.t.",
    cn: "继续",
    lesson: 15,
    phonetic: "",
    example: "Je poursuis.",
    exampleCn: "我继续。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 866,
    fr: "quant à",
    pos: "",
    cn: "至于,对…来说",
    lesson: 26,
    phonetic: "",
    example: "Quant à moi, je reste.",
    exampleCn: "至于我，我留下。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 867,
    fr: "quart",
    pos: "n.m.",
    cn: "一刻钟,四分之一",
    lesson: 14,
    phonetic: "",
    example: "Il est onze heures moins le quart.",
    exampleCn: "+一点差一刻。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 868,
    fr: "quartier",
    pos: "n.m.",
    cn: "区,居住区",
    lesson: 26,
    phonetic: "",
    example: "C'est un quartier.",
    exampleCn: "这是一个区。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 869,
    fr: "que",
    pos: "pron.interr.",
    cn: "什么,什么事",
    lesson: 2,
    phonetic: "",
    example: "Que veux-tu ?",
    exampleCn: "你想要什么？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 870,
    fr: "quel, le",
    pos: "a.interr.",
    cn: "什么样的",
    lesson: 5,
    phonetic: "",
    example: "Quel professeurvous enseigne le français？",
    exampleCn: "哪位老师教你们法语？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 871,
    fr: "quelque",
    pos: "a.indéf.",
    cn: "某一个,某些",
    lesson: 16,
    phonetic: "",
    example: "C'est quelque.",
    exampleCn: "这是某一个。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 872,
    fr: "quelque chose",
    pos: "",
    cn: "某物",
    lesson: 19,
    phonetic: "",
    example: "Je veux quelque chose à boire.",
    exampleCn: "我想要点喝的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 873,
    fr: "quelquefois",
    pos: "adv.",
    cn: "有时,偶尔",
    lesson: 12,
    phonetic: "",
    example: "Quelquefois, il neige en avril.",
    exampleCn: "有时四月会下雪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 874,
    fr: "question",
    pos: "n.f.",
    cn: "问题",
    lesson: 29,
    phonetic: "",
    example: "C'est une question.",
    exampleCn: "这是问题。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 875,
    fr: "queue",
    pos: "n.f.",
    cn: "尾巴,排队(人)",
    lesson: 17,
    phonetic: "",
    example: "C'est une queue.",
    exampleCn: "这是一个尾巴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 876,
    fr: "qui",
    pos: "pron.interr.",
    cn: "什么人",
    lesson: 1,
    phonetic: "",
    example: "Qui est là ?",
    exampleCn: "谁在那里？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 877,
    fr: "quitter",
    pos: "v.t.",
    cn: "离开",
    lesson: 20,
    phonetic: "",
    example: "Je quitte.",
    exampleCn: "我离开。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 878,
    fr: "quoi",
    pos: "pron.interr.",
    cn: "什么,什么东西",
    lesson: 30,
    phonetic: "",
    example: "Quoi ? Je ne comprends pas.",
    exampleCn: "什么？我不明白。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 879,
    fr: "quotidien, ne",
    pos: "a.",
    cn: "日常的",
    lesson: 22,
    phonetic: "",
    example: "C'est quotidien.",
    exampleCn: "这是日常的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 880,
    fr: "raconter",
    pos: "v.t.",
    cn: "讲述",
    lesson: 23,
    phonetic: "",
    example: "Je raconte.",
    exampleCn: "我讲述。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 881,
    fr: "radio",
    pos: "n.f.",
    cn: "收音机",
    lesson: 6,
    phonetic: "",
    example: "C'est une radio.",
    exampleCn: "这是一个收音机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 882,
    fr: "raisins",
    pos: "n.m.",
    cn: "葡萄",
    lesson: 28,
    phonetic: "",
    example: "C'est un raisins.",
    exampleCn: "这是一个葡萄。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 883,
    fr: "rapide",
    pos: "a.",
    cn: "快的,迅速的",
    lesson: 22,
    phonetic: "",
    example: "C'est rapide.",
    exampleCn: "这是快的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 884,
    fr: "rapidement",
    pos: "adv.",
    cn: "很快地,迅速地",
    lesson: 25,
    phonetic: "",
    example: "L'épidémie s'est rapidement étendue.",
    exampleCn: "流行病迅速蔓延。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 885,
    fr: "ravi, e",
    pos: "a.",
    cn: "高兴的,狂喜的",
    lesson: 22,
    phonetic: "",
    example: "C'est ravi.",
    exampleCn: "这是高兴的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 886,
    fr: "rayon",
    pos: "n.m.",
    cn: "柜台,货架",
    lesson: 25,
    phonetic: "",
    example: "C'est un rayon.",
    exampleCn: "这是一个柜台。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 887,
    fr: "réception",
    pos: "n.f.",
    cn: "接待处,服务台",
    lesson: 20,
    phonetic: "",
    example: "C'est une réception.",
    exampleCn: "这是接待处。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 888,
    fr: "recevoir",
    pos: "v.t.",
    cn: "接到,收到",
    lesson: 16,
    phonetic: "",
    example: "Eile peut vous recevoir lundi prochain.",
    exampleCn: "她下星期一可以接待您。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 889,
    fr: "redevenir",
    pos: "v.i.",
    cn: "又变成,再次成为",
    lesson: 21,
    phonetic: "",
    example: "Je redeviens.",
    exampleCn: "我又变成。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 890,
    fr: "redoubler",
    pos: "v.t.",
    cn: "留级",
    lesson: 15,
    phonetic: "",
    example: "Je redouble.",
    exampleCn: "我留级。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 891,
    fr: "réduit, e",
    pos: "a.",
    cn: "减少的,降低的",
    lesson: 19,
    phonetic: "",
    example: "C'est réduit.",
    exampleCn: "这是减少的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 892,
    fr: "réfléchir",
    pos: "v.t.ind.",
    cn: "考虑",
    lesson: 30,
    phonetic: "",
    example: "Je réfléchis.",
    exampleCn: "我考虑。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 893,
    fr: "réfrigérateur",
    pos: "n.m.",
    cn: "电冰箱",
    lesson: 25,
    phonetic: "",
    example: "C'est un réfrigérateur.",
    exampleCn: "这是电冰箱。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 894,
    fr: "refuser",
    pos: "v.t.",
    cn: "拒绝",
    lesson: 17,
    phonetic: "",
    example: "Je refuse.",
    exampleCn: "我拒绝。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 895,
    fr: "regarder",
    pos: "v.t.",
    cn: "看,观,瞧",
    lesson: 15,
    phonetic: "",
    example: "Je regarde la télé.",
    exampleCn: "我看电视。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 896,
    fr: "région",
    pos: "n.f.",
    cn: "地区",
    lesson: 18,
    phonetic: "",
    example: "C'est une région.",
    exampleCn: "这是一个地区。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 897,
    fr: "regretter",
    pos: "v.t.",
    cn: "抱歉,惋惜",
    lesson: 24,
    phonetic: "",
    example: "Je regrette.",
    exampleCn: "我抱歉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 898,
    fr: "relief",
    pos: "n.m.",
    cn: "地形",
    lesson: 26,
    phonetic: "",
    example: "C'est un relief.",
    exampleCn: "这是一个地形。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 899,
    fr: "remède",
    pos: "n.m.",
    cn: "药物,治疗方法",
    lesson: 29,
    phonetic: "",
    example: "C'est un remède.",
    exampleCn: "这是一个药物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 900,
    fr: "remplacer",
    pos: "v.t.",
    cn: "代替,取代",
    lesson: 25,
    phonetic: "",
    example: "Je remplace.",
    exampleCn: "我代替。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 901,
    fr: "remplir",
    pos: "v.t.",
    cn: "填写,装满",
    lesson: 20,
    phonetic: "",
    example: "Je remplis.",
    exampleCn: "我填写。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 902,
    fr: "remonter",
    pos: "v.i.",
    cn: "追溯到",
    lesson: 27,
    phonetic: "",
    example: "Il faut remonter ce tableau de 10 centimetres.",
    exampleCn: "要把这幅画再往上提10 厘米。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 903,
    fr: "Renault",
    pos: "",
    cn: "雷诺(汽车公司)",
    lesson: 12,
    phonetic: "",
    example: "C'est Renault.",
    exampleCn: "这是雷诺(汽车公司)。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 904,
    fr: "rencontre",
    pos: "n.f.",
    cn: "会面,相遇",
    lesson: 27,
    phonetic: "",
    example: "C'est une rencontre.",
    exampleCn: "这是一个会面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 905,
    fr: "rencontrer",
    pos: "v.t.",
    cn: "遇见",
    lesson: 16,
    phonetic: "",
    example: "Nous venons de rencontrer Bernard.",
    exampleCn: "我们刚才碰上了贝尔纳。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 906,
    fr: "se rencontrer",
    pos: "v.pr.",
    cn: "相遇",
    lesson: 25,
    phonetic: "",
    example: "Je me rencontre.",
    exampleCn: "我相遇。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 907,
    fr: "rendez-vous",
    pos: "n.m.",
    cn: "约会",
    lesson: 21,
    phonetic: "",
    example: "C'est un rendez-vous.",
    exampleCn: "这是一个约会。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 908,
    fr: "rendre",
    pos: "v.t.",
    cn: "给予,归还",
    lesson: 21,
    phonetic: "",
    example: "Qui va rendre visite a Nicole？",
    exampleCn: "谁去看望尼科尔？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 909,
    fr: "se rendre compte",
    pos: "",
    cn: "意识到",
    lesson: 30,
    phonetic: "",
    example: "Je me rends compte de mon erreur.",
    exampleCn: "我意识到了我的错误。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 910,
    fr: "se rendre à",
    pos: "",
    cn: "看病",
    lesson: 21,
    phonetic: "",
    example: "Je me rends à l'hôpital.",
    exampleCn: "我去医院。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 911,
    fr: "se renseigner",
    pos: "v.pr.",
    cn: "打听情况",
    lesson: 24,
    phonetic: "",
    example: "Je me renseigne.",
    exampleCn: "我打听情况。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 912,
    fr: "rentrer",
    pos: "v.i.",
    cn: "回家,回来",
    lesson: 14,
    phonetic: "",
    example: "Tu dois rentrer avant 8 heures.",
    exampleCn: "你要在 8 点以前回家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 913,
    fr: "réparation",
    pos: "n.f.",
    cn: "修理",
    lesson: 14,
    phonetic: "",
    example: "C'est une réparation.",
    exampleCn: "这是修理。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 914,
    fr: "réparer",
    pos: "v.t.",
    cn: "修理",
    lesson: 18,
    phonetic: "",
    example: "Je répare la bicyclette.",
    exampleCn: "我修理自行车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 915,
    fr: "repas",
    pos: "n.m.",
    cn: "饭,餐",
    lesson: 23,
    phonetic: "",
    example: "Le repas est preparé par Marie.",
    exampleCn: "饭菜是玛丽准备的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 916,
    fr: "repasser",
    pos: "v.t.",
    cn: "熨,烫",
    lesson: 24,
    phonetic: "",
    example: "Je repasse.",
    exampleCn: "我熨。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 917,
    fr: "répondre",
    pos: "v.i., v.t.",
    cn: "回答,答复",
    lesson: 29,
    phonetic: "",
    example: "Je réponds.",
    exampleCn: "我回答。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 918,
    fr: "reportage",
    pos: "n.m.",
    cn: "报道,报告文学",
    lesson: 17,
    phonetic: "",
    example: "C'est un reportage.",
    exampleCn: "这是一个报道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 919,
    fr: "repos",
    pos: "n.m.",
    cn: "休息",
    lesson: 10,
    phonetic: "",
    example: "C'est un repos.",
    exampleCn: "这是一个休息。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 920,
    fr: "réserver",
    pos: "v.t.",
    cn: "预订,保留",
    lesson: 20,
    phonetic: "",
    example: "Je vais réserver un billet d'avion.",
    exampleCn: "我去预订一张机票。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 921,
    fr: "ressembler",
    pos: "v.t.ind.",
    cn: "与…相像",
    lesson: 21,
    phonetic: "",
    example: "Je ressemble.",
    exampleCn: "我与…相像。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 922,
    fr: "se ressembler",
    pos: "v.pr.",
    cn: "相像",
    lesson: 30,
    phonetic: "",
    example: "Je me ressemble.",
    exampleCn: "我相像。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 923,
    fr: "restaurant",
    pos: "n.m.",
    cn: "饭馆",
    lesson: 17,
    phonetic: "",
    example: "Je n'ai pas d'argent pour tinviter au restaurant.",
    exampleCn: "我没有钱请你下饭馆。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 924,
    fr: "reste",
    pos: "n.m.",
    cn: "剩余部分",
    lesson: 27,
    phonetic: "",
    example: "C'est un reste.",
    exampleCn: "这是一个剩余部分。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 925,
    fr: "rester",
    pos: "v.i.",
    cn: "停留,处于",
    lesson: 21,
    phonetic: "",
    example: "Je préfere sortirque de rester à la maison.",
    exampleCn: "我宁愿出去玩也不愿待在家里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 926,
    fr: "résultat",
    pos: "n.m.",
    cn: "结果",
    lesson: 17,
    phonetic: "",
    example: "C'est un résultat.",
    exampleCn: "这是一个结果。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 927,
    fr: "retard",
    pos: "n.m.",
    cn: "迟到",
    lesson: 14,
    phonetic: "",
    example: "C'est Pierre qui est en retard.",
    exampleCn: "是皮埃尔迟到了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 928,
    fr: "retarder",
    pos: "v.t., v.i.",
    cn: "拨慢,迟到",
    lesson: 14,
    phonetic: "",
    example: "Je retarde.",
    exampleCn: "我拨慢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 929,
    fr: "retour",
    pos: "n.m.",
    cn: "返回,回程",
    lesson: 16,
    phonetic: "",
    example: "C'est un retour.",
    exampleCn: "这是一个返回。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 930,
    fr: "retourner",
    pos: "v.i.",
    cn: "返回",
    lesson: 16,
    phonetic: "",
    example: "Je retourne.",
    exampleCn: "我返回。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 931,
    fr: "retraite",
    pos: "n.f.",
    cn: "退休",
    lesson: 12,
    phonetic: "",
    example: "On prend sa retraite a soixante ans.",
    exampleCn: "人们六十岁退休。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 932,
    fr: "réussir",
    pos: "v.i.",
    cn: "成功,取得成绩",
    lesson: 15,
    phonetic: "",
    example: "Je pense qu'il va réussir a son examen.",
    exampleCn: "我认为他会考好的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 933,
    fr: "réveiller",
    pos: "v.t.",
    cn: "唤醒",
    lesson: 22,
    phonetic: "",
    example: "Je réveille.",
    exampleCn: "我唤醒。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 934,
    fr: "révision",
    pos: "n.f.",
    cn: "复习",
    lesson: 4,
    phonetic: "",
    example: "C'est une révision.",
    exampleCn: "这是复习。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 935,
    fr: "revoir",
    pos: "v.t.",
    cn: "再次见到",
    lesson: 21,
    phonetic: "",
    example: "Je revois.",
    exampleCn: "我再次见到。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 936,
    fr: "revue",
    pos: "n.f.",
    cn: "杂志",
    lesson: 5,
    phonetic: "",
    example: "C'est une revue.",
    exampleCn: "这是一个杂志。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 937,
    fr: "Rhône",
    pos: "n.m.",
    cn: "罗纳河",
    lesson: 26,
    phonetic: "",
    example: "C'est Rhône.",
    exampleCn: "这是罗纳河。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 938,
    fr: "risquer",
    pos: "v.t.ind.",
    cn: "冒…危险,有可能",
    lesson: 19,
    phonetic: "",
    example: "Je risque.",
    exampleCn: "我冒…危险。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 939,
    fr: "rivière",
    pos: "n.f.",
    cn: "河流",
    lesson: 6,
    phonetic: "",
    example: "C'est une rivière.",
    exampleCn: "这是一个河流。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 940,
    fr: "robe",
    pos: "n.f.",
    cn: "长裙,连衣裙",
    lesson: 6,
    phonetic: "",
    example: "C'est une robe.",
    exampleCn: "这是一个长裙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 941,
    fr: "roi",
    pos: "n.m.",
    cn: "国王",
    lesson: 26,
    phonetic: "",
    example: "C'est un roi.",
    exampleCn: "这是一个国王。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 942,
    fr: "Roissy",
    pos: "",
    cn: "鲁瓦西机场",
    lesson: 19,
    phonetic: "",
    example: "C'est Roissy.",
    exampleCn: "这是鲁瓦西机场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 943,
    fr: "rôle",
    pos: "n.m.",
    cn: "角色,作用",
    lesson: 22,
    phonetic: "",
    example: "C'est un rôle.",
    exampleCn: "这是一个角色。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 944,
    fr: "roman",
    pos: "n.m.",
    cn: "小说",
    lesson: 6,
    phonetic: "",
    example: "Jai commencéla lecture de ce roman.",
    exampleCn: "我已经开始读这部小说。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 945,
    fr: "Rome",
    pos: "",
    cn: "罗马",
    lesson: 3,
    phonetic: "",
    example: "C'est Rome.",
    exampleCn: "这是罗马。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 946,
    fr: "Rouen",
    pos: "",
    cn: "鲁昂",
    lesson: 25,
    phonetic: "",
    example: "C'est Rouen.",
    exampleCn: "这是鲁昂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 947,
    fr: "rouge",
    pos: "a., n.m.",
    cn: "红色的;红色",
    lesson: 5,
    phonetic: "",
    example: "Voulez-vous du vin rouge,du bordeaux？",
    exampleCn: "您想喝波尔多红酒葡萄酒吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 948,
    fr: "rouler",
    pos: "v.i.",
    cn: "运转,行驶",
    lesson: 25,
    phonetic: "",
    example: "Je roule.",
    exampleCn: "我运转。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 949,
    fr: "rue",
    pos: "n.f.",
    cn: "街道",
    lesson: 14,
    phonetic: "",
    example: "C'est une rue.",
    exampleCn: "这是一个街道。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 950,
    fr: "rural, e (aux)",
    pos: "a.",
    cn: "乡村的",
    lesson: 26,
    phonetic: "",
    example: "C'est rural.",
    exampleCn: "这是乡村的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 951,
    fr: "sac",
    pos: "n.m.",
    cn: "袋,包",
    lesson: 19,
    phonetic: "",
    example: "C'est un sac.",
    exampleCn: "这是一个袋。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 952,
    fr: "sac à main",
    pos: "",
    cn: "手提袋",
    lesson: 20,
    phonetic: "",
    example: "Elle porte un sac à main.",
    exampleCn: "她挎着一个手提包。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 953,
    fr: "la Sainte-Chapelle",
    pos: "",
    cn: "圣夏佩尔教堂",
    lesson: 27,
    phonetic: "",
    example: "La Sainte-Chapelle est à Paris.",
    exampleCn: "圣夏佩尔教堂在巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 954,
    fr: "saison",
    pos: "n.f.",
    cn: "季节",
    lesson: 18,
    phonetic: "",
    example: "C'est une saison.",
    exampleCn: "这是一个季节。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 955,
    fr: "salle de bains",
    pos: "n.f.",
    cn: "洗澡间",
    lesson: 13,
    phonetic: "",
    example: "Le bal a lieu dans la salle No 7.",
    exampleCn: "舞会在 7号厅举行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 956,
    fr: "salon",
    pos: "n.m.",
    cn: "客厅",
    lesson: 21,
    phonetic: "",
    example: "C'est un salon.",
    exampleCn: "这是一个客厅。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 957,
    fr: "salut",
    pos: "n.m.",
    cn: "你好,再见(问候语)",
    lesson: 22,
    phonetic: "",
    example: "C'est un salut.",
    exampleCn: "这是一个你好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 958,
    fr: "samedi",
    pos: "n.m.",
    cn: "星期六",
    lesson: 10,
    phonetic: "",
    example: "Il ne rentre chez lui que le samedi.",
    exampleCn: "他只是在星期六才回家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 959,
    fr: "sandwich",
    pos: "n.m.",
    cn: "[英]三明治",
    lesson: 23,
    phonetic: "",
    example: "J'ai pris un sandwich au jambon.",
    exampleCn: "我吃了一个火腿三明治。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 960,
    fr: "sans",
    pos: "prép.",
    cn: "没有",
    lesson: 14,
    phonetic: "",
    example: "Je bois du café sans sucre.",
    exampleCn: "我喝不加糖的咖啡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 961,
    fr: "santé",
    pos: "n.f.",
    cn: "健康",
    lesson: 29,
    phonetic: "",
    example: "Vous avez I'air en bonne santé.",
    exampleCn: "看起来，您的身体挺好。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 962,
    fr: "satisfaction",
    pos: "n.f.",
    cn: "满足,称心",
    lesson: 29,
    phonetic: "",
    example: "C'est une satisfaction.",
    exampleCn: "这是满足。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 963,
    fr: "sauf",
    pos: "prép.",
    cn: "除了…之外",
    lesson: 15,
    phonetic: "",
    example: "Tout le monde est là, sauf Paul.",
    exampleCn: "除了保罗，大家都在。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 964,
    fr: "sauter",
    pos: "v.i.",
    cn: "跳,蹦",
    lesson: 24,
    phonetic: "",
    example: "Je saute.",
    exampleCn: "我跳。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 965,
    fr: "savant",
    pos: "n.m.",
    cn: "学者,科学家",
    lesson: 30,
    phonetic: "",
    example: "C'est un savant.",
    exampleCn: "这是一个学者。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 966,
    fr: "savoir",
    pos: "v.t.",
    cn: "知道,会",
    lesson: 15,
    phonetic: "",
    example: "Qu'est-ce que vous voulez savoir？",
    exampleCn: "您想了解什么？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 967,
    fr: "science",
    pos: "n.f.",
    cn: "科学",
    lesson: 29,
    phonetic: "",
    example: "Avec les progrés de la science.",
    exampleCn: "随着科学的进步。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 968,
    fr: "second, e",
    pos: "a.",
    cn: "第二的,二等",
    lesson: 9,
    phonetic: "",
    example: "C'est second.",
    exampleCn: "这是第二的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 969,
    fr: "secrétaire",
    pos: "n.m.",
    cn: "秘书,书记",
    lesson: 4,
    phonetic: "",
    example: "C'est un secrétaire.",
    exampleCn: "这是一个秘书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 970,
    fr: "secteur",
    pos: "n.m.",
    cn: "部门,领域",
    lesson: 17,
    phonetic: "",
    example: "C'est un secteur.",
    exampleCn: "这是部门。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 971,
    fr: "section",
    pos: "n.f.",
    cn: "段,路段",
    lesson: 24,
    phonetic: "",
    example: "Moi，je suis dans la section de français.",
    exampleCn: "我吗，我在法语系。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 972,
    fr: "Seine",
    pos: "n.f.",
    cn: "塞纳河",
    lesson: 26,
    phonetic: "",
    example: "C'est Seine.",
    exampleCn: "这是塞纳河。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 973,
    fr: "semaine",
    pos: "n.f.",
    cn: "一星期",
    lesson: 20,
    phonetic: "",
    example: "Combien de cours avez-vous chaque semaine？",
    exampleCn: "你们每星期有多少节课？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 974,
    fr: "sentir",
    pos: "v.t.",
    cn: "闻到",
    lesson: 23,
    phonetic: "",
    example: "Je sentis.",
    exampleCn: "我闻到。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 975,
    fr: "se sentir",
    pos: "v.pr.",
    cn: "感觉",
    lesson: 22,
    phonetic: "",
    example: "Je me sentis.",
    exampleCn: "我感觉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 976,
    fr: "sérieusement",
    pos: "adv.",
    cn: "严重地,认真地",
    lesson: 16,
    phonetic: "",
    example: "Réfléchis sérieusement.",
    exampleCn: "认真想一想。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 977,
    fr: "serveur, se",
    pos: "n.",
    cn: "服务人员",
    lesson: 17,
    phonetic: "",
    example: "C'est un serveur.",
    exampleCn: "这是服务人员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 978,
    fr: "serviette",
    pos: "n.f.",
    cn: "毛巾,公文包",
    lesson: 5,
    phonetic: "",
    example: "C'est une serviette.",
    exampleCn: "这是一个毛巾。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 979,
    fr: "Sète",
    pos: "",
    cn: "塞特",
    lesson: 1,
    phonetic: "",
    example: "C'est Sète.",
    exampleCn: "这是塞特。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 980,
    fr: "seul, e",
    pos: "a.",
    cn: "单独的,独自的",
    lesson: 16,
    phonetic: "",
    example: "C'est seul.",
    exampleCn: "这是单独的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 981,
    fr: "seulement",
    pos: "adv.",
    cn: "仅仅,只",
    lesson: 23,
    phonetic: "",
    example: "Ah non! Depuis trois mois seulement.",
    exampleCn: "不！才刚刚三个月。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 982,
    fr: "si",
    pos: "conj.",
    cn: "如果",
    lesson: 12,
    phonetic: "",
    example: "Si tu viens, je suis content.",
    exampleCn: "如果你来，我很高兴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 983,
    fr: "siècle",
    pos: "n.m.",
    cn: "世纪",
    lesson: 25,
    phonetic: "",
    example: "C'est un siècle.",
    exampleCn: "这是一个世纪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 984,
    fr: "signe",
    pos: "n.m.",
    cn: "示意动作,手势",
    lesson: 24,
    phonetic: "",
    example: "C'est un signe.",
    exampleCn: "这是一个示意动作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 985,
    fr: "s'il vous plaît",
    pos: "",
    cn: "请",
    lesson: 11,
    phonetic: "",
    example: "Réveille-moi a six heures，s'il te plait.",
    exampleCn: "请在六点钟叫醒我。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 986,
    fr: "silencieux, se",
    pos: "a.",
    cn: "无声的,噪音小的",
    lesson: 24,
    phonetic: "",
    example: "C'est silencieux.",
    exampleCn: "这是无声的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 987,
    fr: "situé, e",
    pos: "a.",
    cn: "位于…",
    lesson: 25,
    phonetic: "",
    example: "C'est situé.",
    exampleCn: "这是位于…。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 988,
    fr: "ski",
    pos: "n.m.",
    cn: "滑雪",
    lesson: 18,
    phonetic: "",
    example: "C'est un ski.",
    exampleCn: "这是一个滑雪。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 989,
    fr: "société",
    pos: "n.f.",
    cn: "公司,协会,社会",
    lesson: 24,
    phonetic: "",
    example: "C'est une société.",
    exampleCn: "这是一个公司。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 990,
    fr: "sœur",
    pos: "n.f.",
    cn: "姐妹",
    lesson: 8,
    phonetic: "",
    example: "C'est une sœur.",
    exampleCn: "这是一个姐妹。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 991,
    fr: "soigner",
    pos: "v.t.",
    cn: "治疗",
    lesson: 29,
    phonetic: "",
    example: "Je soigne.",
    exampleCn: "我治疗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 992,
    fr: "soir",
    pos: "n.m.",
    cn: "晚上",
    lesson: 10,
    phonetic: "",
    example: "C'est un soir.",
    exampleCn: "这是一个晚上。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 993,
    fr: "soldat",
    pos: "n.m.",
    cn: "士兵",
    lesson: 8,
    phonetic: "",
    example: "C'est un soldat.",
    exampleCn: "这是一个士兵。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 994,
    fr: "soleil",
    pos: "n.m.",
    cn: "太阳,阳光",
    lesson: 24,
    phonetic: "",
    example: "C'est un soleil.",
    exampleCn: "这是一个太阳。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 995,
    fr: "somme",
    pos: "n.f.",
    cn: "一笔(钱)",
    lesson: 19,
    phonetic: "",
    example: "C'est une somme.",
    exampleCn: "这是一个一笔(钱)。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 996,
    fr: "sommeiller",
    pos: "v.i.",
    cn: "打瞌睡,打盹",
    lesson: 21,
    phonetic: "",
    example: "Je sommeille.",
    exampleCn: "我打瞌睡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 997,
    fr: "Sorbonne",
    pos: "",
    cn: "巴黎大学",
    lesson: 10,
    phonetic: "",
    example: "C'est Sorbonne.",
    exampleCn: "这是巴黎大学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 998,
    fr: "sorte",
    pos: "n.f.",
    cn: "种类,类别",
    lesson: 30,
    phonetic: "",
    example: "C'est une sorte.",
    exampleCn: "这是一个种类。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 999,
    fr: "sortir",
    pos: "v.i.",
    cn: "出门,外出",
    lesson: 15,
    phonetic: "",
    example: "Fermez la fenetre avant de sortir.",
    exampleCn: "走之前把窗子关上。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1000,
    fr: "soudain",
    pos: "adv.",
    cn: "突然",
    lesson: 24,
    phonetic: "",
    example: "Soudain, il a commencé à pleuvoir.",
    exampleCn: "突然下起了雨。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1001,
    fr: "souffrance",
    pos: "n.f.",
    cn: "痛苦,苦难",
    lesson: 29,
    phonetic: "",
    example: "C'est une souffrance.",
    exampleCn: "这是痛苦。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1002,
    fr: "souhaiter",
    pos: "v.t.",
    cn: "祝愿,希望",
    lesson: 29,
    phonetic: "",
    example: "Je souhaite.",
    exampleCn: "我祝愿。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1003,
    fr: "soupe",
    pos: "n.f.",
    cn: "汤",
    lesson: 23,
    phonetic: "",
    example: "C'est une soupe.",
    exampleCn: "这是一个汤。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1004,
    fr: "sourd, e",
    pos: "a.",
    cn: "聋的",
    lesson: 14,
    phonetic: "",
    example: "C'est sourd.",
    exampleCn: "这是聋的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1005,
    fr: "sous",
    pos: "prép.",
    cn: "在…下面",
    lesson: 7,
    phonetic: "",
    example: "Le chat dort sous la table.",
    exampleCn: "猫睡在桌子下面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1006,
    fr: "souvenir",
    pos: "n.m.",
    cn: "纪念物",
    lesson: 11,
    phonetic: "",
    example: "C'est un souvenir.",
    exampleCn: "这是一个纪念物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1007,
    fr: "souvent",
    pos: "adv.",
    cn: "经常",
    lesson: 11,
    phonetic: "",
    example: "Marie sort le moins souvent.",
    exampleCn: "玛丽出门最少。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1008,
    fr: "spécialité",
    pos: "n.f.",
    cn: "专长,拿手菜",
    lesson: 23,
    phonetic: "",
    example: "C'est une spécialité.",
    exampleCn: "这是专长。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1009,
    fr: "sport",
    pos: "n.m.",
    cn: "体育",
    lesson: 24,
    phonetic: "",
    example: "Nous faisons du sport tous les jours.",
    exampleCn: "我们每天从事体育锻炼。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1010,
    fr: "station",
    pos: "n.f.",
    cn: "(地铁)站",
    lesson: 24,
    phonetic: "",
    example: "C'est une station.",
    exampleCn: "这是(地铁)站。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1011,
    fr: "stéthoscope",
    pos: "n.m.",
    cn: "听诊器",
    lesson: 29,
    phonetic: "",
    example: "C'est un stéthoscope.",
    exampleCn: "这是一个听诊器。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1012,
    fr: "Strasbourg",
    pos: "",
    cn: "斯特拉斯堡",
    lesson: 28,
    phonetic: "",
    example: "C'est Strasbourg.",
    exampleCn: "这是斯特拉斯堡。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1013,
    fr: "styliste",
    pos: "n.m.",
    cn: "服装设计师",
    lesson: 2,
    phonetic: "",
    example: "C'est un styliste.",
    exampleCn: "这是一个服装设计师。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1014,
    fr: "stylo",
    pos: "n.m.",
    cn: "钢笔",
    lesson: 5,
    phonetic: "",
    example: "Est-ce que c'est le stylo de Charles?",
    exampleCn: "这是夏尔的钢笔吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1015,
    fr: "succès",
    pos: "n.m.",
    cn: "成功,成就",
    lesson: 25,
    phonetic: "",
    example: "C'est un succès.",
    exampleCn: "这是一个成功。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1016,
    fr: "sud",
    pos: "n.m.",
    cn: "南部",
    lesson: 11,
    phonetic: "",
    example: "C'est un sud.",
    exampleCn: "这是一个南部。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1017,
    fr: "sud-est",
    pos: "n.m.",
    cn: "东南",
    lesson: 28,
    phonetic: "",
    example: "C'est un sud-est.",
    exampleCn: "这是一个东南。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1018,
    fr: "suffire",
    pos: "v.t.ind.",
    cn: "只需…",
    lesson: 24,
    phonetic: "",
    example: "Je suffis.",
    exampleCn: "我只需…。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1019,
    fr: "suffisant, e",
    pos: "a.",
    cn: "足够的,充分的",
    lesson: 15,
    phonetic: "",
    example: "C'est suffisant.",
    exampleCn: "这是足够的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1020,
    fr: "Suisse",
    pos: "n.f.",
    cn: "瑞士",
    lesson: 26,
    phonetic: "",
    example: "C'est Suisse.",
    exampleCn: "这是瑞士。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1021,
    fr: "suivre",
    pos: "v.t.",
    cn: "跟随,上课",
    lesson: 12,
    phonetic: "",
    example: "Si vous voulez，vous pouvez me suivre.",
    exampleCn: "如果您愿意，跟我来吧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1022,
    fr: "sujet",
    pos: "n.m.",
    cn: "主题,问题",
    lesson: 17,
    phonetic: "",
    example: "C'est un sujet.",
    exampleCn: "这是一个主题。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1023,
    fr: "supermarché",
    pos: "n.m.",
    cn: "超级市场",
    lesson: 25,
    phonetic: "",
    example: "C'est un supermarché.",
    exampleCn: "这是一个超级市场。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1024,
    fr: "sur",
    pos: "prép.",
    cn: "在…上面",
    lesson: 7,
    phonetic: "",
    example: "Le livre est sur la table.",
    exampleCn: "书在桌子上。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1025,
    fr: "sûrement",
    pos: "adv.",
    cn: "肯定地,无疑地",
    lesson: 25,
    phonetic: "",
    example: "Il est sûrement malade.",
    exampleCn: "他肯定是病了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1026,
    fr: "surprise",
    pos: "n.f.",
    cn: "吃惊,惊讶",
    lesson: 21,
    phonetic: "",
    example: "Il veut vous faire une surprise.",
    exampleCn: "他要送您一件意想不到的礼物。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1027,
    fr: "surtout",
    pos: "adv.",
    cn: "尤其,特别",
    lesson: 29,
    phonetic: "",
    example: "Surtout, ne sois pas en retard.",
    exampleCn: "尤其不要迟到。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1028,
    fr: "système",
    pos: "n.m.",
    cn: "体系,体制",
    lesson: 24,
    phonetic: "",
    example: "C'est un système.",
    exampleCn: "这是一个体系。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1029,
    fr: "tabac",
    pos: "n.m.",
    cn: "烟草",
    lesson: 26,
    phonetic: "",
    example: "C'est un tabac.",
    exampleCn: "这是一个烟草。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1030,
    fr: "table",
    pos: "n.f.",
    cn: "桌子,餐桌",
    lesson: 7,
    phonetic: "",
    example: "A table，tout le monde! C'est prét!",
    exampleCn: "大家人席吧，都准备好了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1031,
    fr: "tableau",
    pos: "n.m.",
    cn: "画幅,油画",
    lesson: 7,
    phonetic: "",
    example: "Je vais te faire voir un très beau tableau.",
    exampleCn: "我要让你看一幅非常好的画。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1032,
    fr: "tante",
    pos: "n.f.",
    cn: "姑,姨,婶",
    lesson: 17,
    phonetic: "",
    example: "C'est une tante.",
    exampleCn: "这是一个姑。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1033,
    fr: "tard",
    pos: "adv.",
    cn: "迟,晚",
    lesson: 14,
    phonetic: "",
    example: "Je rentre tard ce soir.",
    exampleCn: "我今晚很晚回来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1034,
    fr: "tarif",
    pos: "n.m.",
    cn: "票价",
    lesson: 19,
    phonetic: "",
    example: "C'est un tarif.",
    exampleCn: "这是一个票价。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1035,
    fr: "tartine",
    pos: "n.f.",
    cn: "面包片",
    lesson: 23,
    phonetic: "",
    example: "C'est une tartine.",
    exampleCn: "这是一个面包片。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1036,
    fr: "tasse",
    pos: "n.f.",
    cn: "茶杯",
    lesson: 21,
    phonetic: "",
    example: "C'est une tasse.",
    exampleCn: "这是一个茶杯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1037,
    fr: "taxi",
    pos: "n.m.",
    cn: "出租汽车",
    lesson: 21,
    phonetic: "",
    example: "C'est un taxi.",
    exampleCn: "这是一个出租汽车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1038,
    fr: "technicien, ne",
    pos: "n.",
    cn: "技术员",
    lesson: 7,
    phonetic: "",
    example: "C'est un technicien.",
    exampleCn: "这是一个技术员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1039,
    fr: "tee-shirt",
    pos: "n.m.",
    cn: "[英]圆领短袖汗衫",
    lesson: 30,
    phonetic: "",
    example: "C'est un tee-shirt.",
    exampleCn: "这是一个[英]圆领短袖汗衫。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1040,
    fr: "téléphone",
    pos: "n.m.",
    cn: "电话",
    lesson: 13,
    phonetic: "",
    example: "Monsieur，on vous appelle au téléphone.",
    exampleCn: "先生，您的电话。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1041,
    fr: "téléphoner",
    pos: "v.i.",
    cn: "打电话",
    lesson: 13,
    phonetic: "",
    example: "Tu peux me téléphoner cet après-midi.",
    exampleCn: "你可以今天下午给我打电话。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1042,
    fr: "télévision",
    pos: "n.f.",
    cn: "电视机",
    lesson: 15,
    phonetic: "",
    example: "C'est une télévision.",
    exampleCn: "这是电视机。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1043,
    fr: "tellement",
    pos: "adv.",
    cn: "如此地",
    lesson: 21,
    phonetic: "",
    example: "Je suis tellement content !",
    exampleCn: "我太高兴了！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1044,
    fr: "tel que",
    pos: "",
    cn: "诸如",
    lesson: 27,
    phonetic: "",
    example: "Je connais des villes tell que Paris et Lyon.",
    exampleCn: "我知道一些城市，比如巴黎和里昂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1045,
    fr: "température",
    pos: "n.f.",
    cn: "气温,温度",
    lesson: 29,
    phonetic: "",
    example: "C'est une température.",
    exampleCn: "这是一个气温。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1046,
    fr: "temporaire",
    pos: "a.",
    cn: "临时的",
    lesson: 17,
    phonetic: "",
    example: "Alors il accepte du travail temporaire.",
    exampleCn: "于是，他干起了临时工。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1047,
    fr: "temps",
    pos: "n.m.",
    cn: "时间,天气",
    lesson: 10,
    phonetic: "",
    example: "Non，je n'ai pas de temps.",
    exampleCn: "我没有时间。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1048,
    fr: "tenir compte de",
    pos: "",
    cn: "考虑到,重视",
    lesson: 25,
    phonetic: "",
    example: "Il faut tenir compte de son avis.",
    exampleCn: "要考虑他的意见。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1049,
    fr: "terminer",
    pos: "v.t.",
    cn: "结束",
    lesson: 30,
    phonetic: "",
    example: "Je termine.",
    exampleCn: "我结束。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1050,
    fr: "terrasse",
    pos: "n.f.",
    cn: "露天座",
    lesson: 30,
    phonetic: "",
    example: "C'est une terrasse.",
    exampleCn: "这是一个露天座。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1051,
    fr: "terre",
    pos: "n.f.",
    cn: "土地,田",
    lesson: 16,
    phonetic: "",
    example: "C'est une terre.",
    exampleCn: "这是一个土地。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1052,
    fr: "texte",
    pos: "n.m.",
    cn: "课文",
    lesson: 12,
    phonetic: "",
    example: "Ces notes aident à la compréhension du texte.",
    exampleCn: "这些注释有助于理解课文。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1053,
    fr: "thé",
    pos: "n.m.",
    cn: "茶",
    lesson: 21,
    phonetic: "",
    example: "C'est un thé.",
    exampleCn: "这是一个茶。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1054,
    fr: "théâtre",
    pos: "n.m.",
    cn: "戏剧,剧场",
    lesson: 13,
    phonetic: "",
    example: "C'est un théâtre.",
    exampleCn: "这是一个戏剧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1055,
    fr: "ticket",
    pos: "n.m.",
    cn: "(车)票",
    lesson: 7,
    phonetic: "",
    example: "C'est un ticket.",
    exampleCn: "这是一个(车)票。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1056,
    fr: "timbre",
    pos: "n.m.",
    cn: "邮票",
    lesson: 6,
    phonetic: "",
    example: "C'est un timbre.",
    exampleCn: "这是一个邮票。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1057,
    fr: "le Times",
    pos: "",
    cn: "《泰晤士报》",
    lesson: 18,
    phonetic: "",
    example: "Je lis le Times.",
    exampleCn: "我读《泰晤士报》。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1058,
    fr: "tirer",
    pos: "v.t.",
    cn: "拉,使摆脱",
    lesson: 28,
    phonetic: "",
    example: "Je tire.",
    exampleCn: "我拉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1059,
    fr: "tomber",
    pos: "v.i.",
    cn: "跌倒,陷入",
    lesson: 18,
    phonetic: "",
    example: "La pluie s'est mise a tomber.",
    exampleCn: "开始下雨了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1060,
    fr: "tôt",
    pos: "adv.",
    cn: "早",
    lesson: 14,
    phonetic: "",
    example: "Je me lève tôt.",
    exampleCn: "我起得早。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1061,
    fr: "toucher",
    pos: "v.t.",
    cn: "摸,触及,使感动",
    lesson: 29,
    phonetic: "",
    example: "Je touche.",
    exampleCn: "我摸。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1062,
    fr: "toujours",
    pos: "adv.",
    cn: "永远,总是,经常",
    lesson: 14,
    phonetic: "",
    example: "II porte toujours un costume bleu.",
    exampleCn: "他总是穿一件蓝上衣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1063,
    fr: "Toulouse",
    pos: "",
    cn: "图卢兹",
    lesson: 18,
    phonetic: "",
    example: "C'est Toulouse.",
    exampleCn: "这是图卢兹。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1064,
    fr: "touriste",
    pos: "n.",
    cn: "游人,旅游者",
    lesson: 27,
    phonetic: "",
    example: "C'est un touriste.",
    exampleCn: "这是一个游人。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1065,
    fr: "tous les jours",
    pos: "",
    cn: "每天",
    lesson: 11,
    phonetic: "",
    example: "J'y vais tous les soirs.",
    exampleCn: "我每天晚上看。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1066,
    fr: "tout",
    pos: "a.",
    cn: "一切的,全部的",
    lesson: 9,
    phonetic: "",
    example: "C'est tout.",
    exampleCn: "这是一切的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1067,
    fr: "tout à fait",
    pos: "",
    cn: "完全地,非常地",
    lesson: 17,
    phonetic: "",
    example: "Je suis tout à fait d'accord.",
    exampleCn: "我完全同意。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1068,
    fr: "tout de même",
    pos: "",
    cn: "仍然,还是",
    lesson: 20,
    phonetic: "",
    example: "Il est fatigué, mais il vient tout de même.",
    exampleCn: "他累了，但还是来了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1069,
    fr: "tout de suite",
    pos: "",
    cn: "立即,马上",
    lesson: 13,
    phonetic: "",
    example: "Je viens tout de suite.",
    exampleCn: "我马上就来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1070,
    fr: "tout le monde",
    pos: "",
    cn: "大家,全体人",
    lesson: 11,
    phonetic: "",
    example: "Tout le monde est là.",
    exampleCn: "大家都在。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1071,
    fr: "tout le temps",
    pos: "",
    cn: "总是",
    lesson: 15,
    phonetic: "",
    example: "Il s'oppose a tout progrés technique.",
    exampleCn: "他抵制一切技术进步。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1072,
    fr: "train",
    pos: "n.m.",
    cn: "火车",
    lesson: 16,
    phonetic: "",
    example: "Je suis en train de lire un roman français.",
    exampleCn: "我正在读一本法文小说。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1073,
    fr: "tranquillement",
    pos: "adv.",
    cn: "安心地",
    lesson: 25,
    phonetic: "",
    example: "Je travaille tranquillement.",
    exampleCn: "我安心地工作。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1074,
    fr: "transport",
    pos: "n.m.",
    cn: "运输,交通",
    lesson: 28,
    phonetic: "",
    example: "C'est un transport.",
    exampleCn: "这是一个运输。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1075,
    fr: "transporter",
    pos: "v.t.",
    cn: "运送",
    lesson: 27,
    phonetic: "",
    example: "Je transporte.",
    exampleCn: "我运送。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1076,
    fr: "travail",
    pos: "n.m.",
    cn: "工作",
    lesson: 12,
    phonetic: "",
    example: "Je rentrerai chez moi quand j'aurai fini ce travail.",
    exampleCn: "我干完这活儿就回家。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1077,
    fr: "travailler",
    pos: "v.i.",
    cn: "工作,劳动",
    lesson: 10,
    phonetic: "",
    example: "Il est encore tot，continuons de travailler.",
    exampleCn: "时间还早，咱们继续工作吧。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1078,
    fr: "traverser",
    pos: "v.t.",
    cn: "穿过",
    lesson: 27,
    phonetic: "",
    example: "Je traverse.",
    exampleCn: "我穿过。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1079,
    fr: "très",
    pos: "adv.",
    cn: "很,十分",
    lesson: 9,
    phonetic: "",
    example: "Je suis très content.",
    exampleCn: "我非常高兴。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1080,
    fr: "trésor",
    pos: "n.m.",
    cn: "珍宝,宝库",
    lesson: 27,
    phonetic: "",
    example: "C'est un trésor.",
    exampleCn: "这是一个珍宝。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1081,
    fr: "triste",
    pos: "a.",
    cn: "伤心的,忧愁的",
    lesson: 24,
    phonetic: "",
    example: "C'est triste.",
    exampleCn: "这是伤心的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1082,
    fr: "troisième",
    pos: "a.",
    cn: "第三的",
    lesson: 9,
    phonetic: "",
    example: "C'est troisième.",
    exampleCn: "这是第三的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1083,
    fr: "trop",
    pos: "adv.",
    cn: "太,过分地",
    lesson: 20,
    phonetic: "",
    example: "C'est trop cher.",
    exampleCn: "这太贵了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1084,
    fr: "trop de",
    pos: "",
    cn: "太多的…",
    lesson: 20,
    phonetic: "",
    example: "Il y a trop de monde.",
    exampleCn: "人太多了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1085,
    fr: "trouver",
    pos: "v.t.",
    cn: "找到",
    lesson: 16,
    phonetic: "",
    example: "Je trouve la clé.",
    exampleCn: "我找到钥匙。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1086,
    fr: "se trouver",
    pos: "v.pr.",
    cn: "位于,在",
    lesson: 27,
    phonetic: "",
    example: "Je me trouve.",
    exampleCn: "我位于。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1087,
    fr: "l'un, l'autre",
    pos: "",
    cn: "一个,另一个",
    lesson: 15,
    phonetic: "",
    example: "L'un est grand, l'autre est petit.",
    exampleCn: "一个大，另一个小。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1088,
    fr: "uniforme",
    pos: "a.",
    cn: "统一的",
    lesson: 24,
    phonetic: "",
    example: "C'est uniforme.",
    exampleCn: "这是统一的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1089,
    fr: "université",
    pos: "n.f.",
    cn: "大学",
    lesson: 13,
    phonetic: "",
    example: "C'est une université.",
    exampleCn: "这是大学。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1090,
    fr: "un peu",
    pos: "",
    cn: "少许",
    lesson: 22,
    phonetic: "",
    example: "J'ai un peu froid.",
    exampleCn: "我有点冷。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1091,
    fr: "usine",
    pos: "n.f.",
    cn: "工厂",
    lesson: 8,
    phonetic: "",
    example: "C'est une usine.",
    exampleCn: "这是一个工厂。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1092,
    fr: "un tas de",
    pos: "",
    cn: "许多的,成堆的…",
    lesson: 21,
    phonetic: "",
    example: "J'ai un tas de livres.",
    exampleCn: "我有一大堆书。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1093,
    fr: "vacances",
    pos: "n.f.pl.",
    cn: "假期",
    lesson: 16,
    phonetic: "",
    example: "Chaque été，elle passe ses vacances en Italie.",
    exampleCn: "每年夏天，她在意大利度假。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1094,
    fr: "valable",
    pos: "a.",
    cn: "有效的",
    lesson: 19,
    phonetic: "",
    example: "C'est valable.",
    exampleCn: "这是有效的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1095,
    fr: "valise",
    pos: "n.f.",
    cn: "旅行箱",
    lesson: 19,
    phonetic: "",
    example: "Voulez-vous prendre cette valise？",
    exampleCn: "您愿意提这只箱子吗？",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1096,
    fr: "vallée",
    pos: "n.f.",
    cn: "山谷,河谷",
    lesson: 26,
    phonetic: "",
    example: "C'est une vallée.",
    exampleCn: "这是一个山谷。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1097,
    fr: "varié, e",
    pos: "a.",
    cn: "多样的,多变化的",
    lesson: 26,
    phonetic: "",
    example: "C'est varié.",
    exampleCn: "这是多样的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1098,
    fr: "vaste",
    pos: "a.",
    cn: "广阔的",
    lesson: 26,
    phonetic: "",
    example: "C'est vaste.",
    exampleCn: "这是广阔的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1099,
    fr: "vélo",
    pos: "n.m.",
    cn: "自行车",
    lesson: 5,
    phonetic: "",
    example: "C'est un vélo.",
    exampleCn: "这是一个自行车。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1100,
    fr: "vendeur, se",
    pos: "n.",
    cn: "售货员",
    lesson: 7,
    phonetic: "",
    example: "C'est un vendeur.",
    exampleCn: "这是售货员。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1101,
    fr: "vendredi",
    pos: "n.m.",
    cn: "星期五",
    lesson: 10,
    phonetic: "",
    example: "C'est un vendredi.",
    exampleCn: "这是一个星期五。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1102,
    fr: "venir",
    pos: "v.i.",
    cn: "来,来到",
    lesson: 10,
    phonetic: "",
    example: "Je viens.",
    exampleCn: "我来。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1103,
    fr: "vent",
    pos: "n.m.",
    cn: "风",
    lesson: 18,
    phonetic: "",
    example: "C'est un vent.",
    exampleCn: "这是一个风。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1104,
    fr: "vérifier",
    pos: "v.t.",
    cn: "核实,查对",
    lesson: 29,
    phonetic: "",
    example: "Je vérifie.",
    exampleCn: "我核实。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1105,
    fr: "verre",
    pos: "n.m.",
    cn: "玻璃杯",
    lesson: 5,
    phonetic: "",
    example: "C'est un verre.",
    exampleCn: "这是一个玻璃杯。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1106,
    fr: "vers",
    pos: "prép.",
    cn: "朝着,将近",
    lesson: 22,
    phonetic: "",
    example: "Je vais vers la gare.",
    exampleCn: "我朝火车站走去。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1107,
    fr: "vert, e",
    pos: "a., n.m.",
    cn: "绿色的;绿色",
    lesson: 5,
    phonetic: "",
    example: "C'est vert.",
    exampleCn: "这是绿色的;绿色。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1108,
    fr: "veste",
    pos: "n.f.",
    cn: "上衣",
    lesson: 5,
    phonetic: "",
    example: "C'est une veste.",
    exampleCn: "这是一个上衣。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1109,
    fr: "vêtement",
    pos: "n.m.",
    cn: "衣服",
    lesson: 19,
    phonetic: "",
    example: "C'est un vêtement.",
    exampleCn: "这是衣服。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1110,
    fr: "viande",
    pos: "n.f.",
    cn: "肉",
    lesson: 23,
    phonetic: "",
    example: "C'est une viande.",
    exampleCn: "这是一个肉。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1111,
    fr: "Vichy",
    pos: "",
    cn: "维希",
    lesson: 3,
    phonetic: "",
    example: "C'est Vichy.",
    exampleCn: "这是维希。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1112,
    fr: "village",
    pos: "n.m.",
    cn: "乡村",
    lesson: 26,
    phonetic: "",
    example: "Ce sont les plus anciennes maisons du village.",
    exampleCn: "这些是村子里最古老的房屋。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1113,
    fr: "vie",
    pos: "n.f.",
    cn: "生活,生命",
    lesson: 16,
    phonetic: "",
    example: "C'est une vie.",
    exampleCn: "这是一个生活。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1114,
    fr: "vieux (vieil, vieille)",
    pos: "a.",
    cn: "老的,旧的",
    lesson: 20,
    phonetic: "",
    example: "Sauf a de vieux amis，bien entendu.",
    exampleCn: "当然，给老朋友打电话则例外。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1115,
    fr: "ville",
    pos: "n.f.",
    cn: "城市",
    lesson: 23,
    phonetic: "",
    example: "La ville ou je suis né est un port.",
    exampleCn: "我出生的那座城市是一个港口。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1116,
    fr: "vin",
    pos: "n.m.",
    cn: "葡萄酒",
    lesson: 23,
    phonetic: "",
    example: "C'est un vin.",
    exampleCn: "这是一个葡萄酒。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1117,
    fr: "vingtaine",
    pos: "n.f.",
    cn: "二十左右",
    lesson: 12,
    phonetic: "",
    example: "C'est une vingtaine.",
    exampleCn: "这是一个二十左右。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1118,
    fr: "visiter",
    pos: "v.t.",
    cn: "参观,访问",
    lesson: 10,
    phonetic: "",
    example: "Je visite Paris.",
    exampleCn: "我参观巴黎。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1119,
    fr: "vite",
    pos: "adv.",
    cn: "快的,迅速的",
    lesson: 25,
    phonetic: "",
    example: "Viens vite !",
    exampleCn: "快点来！",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1120,
    fr: "vitrail (vitraux)",
    pos: "n.m.",
    cn: "彩绘玻璃窗",
    lesson: 27,
    phonetic: "",
    example: "C'est un vitrail.",
    exampleCn: "这是一个彩绘玻璃窗。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1121,
    fr: "vivre",
    pos: "v.i.",
    cn: "生活,生存",
    lesson: 23,
    phonetic: "",
    example: "Je vis.",
    exampleCn: "我生活。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1122,
    fr: "vocabulaire",
    pos: "n.m.",
    cn: "词汇",
    lesson: 30,
    phonetic: "",
    example: "C'est un vocabulaire.",
    exampleCn: "这是一个词汇。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1123,
    fr: "voici",
    pos: "prép.",
    cn: "这儿是,那儿是",
    lesson: 9,
    phonetic: "",
    example: "Voici mon passeport.",
    exampleCn: "这是我的护照。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1124,
    fr: "voilà",
    pos: "prép.",
    cn: "那儿是",
    lesson: 9,
    phonetic: "",
    example: "Voilà la gare.",
    exampleCn: "那就是火车站。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1125,
    fr: "voir",
    pos: "v.t.",
    cn: "看见,观看",
    lesson: 12,
    phonetic: "",
    example: "Je vois le film.",
    exampleCn: "我看这部电影。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1126,
    fr: "se voir",
    pos: "v.pr.",
    cn: "见面",
    lesson: 21,
    phonetic: "",
    example: "Je me vois.",
    exampleCn: "我见面。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1127,
    fr: "voisin, e",
    pos: "n., a.",
    cn: "邻居,相邻的",
    lesson: 26,
    phonetic: "",
    example: "C'est un voisin.",
    exampleCn: "这是一个邻居。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1128,
    fr: "voiture",
    pos: "n.f.",
    cn: "小汽车",
    lesson: 5,
    phonetic: "",
    example: "La voiture est reparée par un de mes amis.",
    exampleCn: "汽车是我的一位朋友修理的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1129,
    fr: "vol",
    pos: "n.m.",
    cn: "飞行",
    lesson: 19,
    phonetic: "",
    example: "C'est un vol.",
    exampleCn: "这是一个飞行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1130,
    fr: "volontiers",
    pos: "adv.",
    cn: "乐意地",
    lesson: 17,
    phonetic: "",
    example: "Il reste volontiers des heures sans parler.",
    exampleCn: "他往往呆上几个小时-一言不发。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1131,
    fr: "votre",
    pos: "a.poss.",
    cn: "你的,你们的",
    lesson: 4,
    phonetic: "",
    example: "C'est votre.",
    exampleCn: "这是你的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1132,
    fr: "vouloir",
    pos: "v.t.",
    cn: "愿意",
    lesson: 11,
    phonetic: "",
    example: "Je veux.",
    exampleCn: "我愿意。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1133,
    fr: "voyager",
    pos: "v.i.",
    cn: "旅行",
    lesson: 13,
    phonetic: "",
    example: "Je voyage.",
    exampleCn: "我旅行。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1134,
    fr: "voyageur, se",
    pos: "n.",
    cn: "旅行者",
    lesson: 24,
    phonetic: "",
    example: "C'est un voyageur.",
    exampleCn: "这是旅行者。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1135,
    fr: "vrai, e",
    pos: "a.",
    cn: "真实的,确实的",
    lesson: 11,
    phonetic: "",
    example: "C'est vrai.",
    exampleCn: "这是真实的。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1136,
    fr: "vraiment",
    pos: "adv.",
    cn: "真正地,实在地",
    lesson: 20,
    phonetic: "",
    example: "J'étais vraiment touché par son attitude.",
    exampleCn: "我确实被他的态度感动了。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1137,
    fr: "wagon",
    pos: "n.m.",
    cn: "车厢",
    lesson: 24,
    phonetic: "",
    example: "C'est un wagon.",
    exampleCn: "这是一个车厢。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1138,
    fr: "Washington",
    pos: "",
    cn: "华盛顿",
    lesson: 18,
    phonetic: "",
    example: "C'est Washington.",
    exampleCn: "这是华盛顿。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1139,
    fr: "week-end",
    pos: "n.m.",
    cn: "[英]周末",
    lesson: 18,
    phonetic: "",
    example: "C'est un week-end.",
    exampleCn: "这是一个[英]周末。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1140,
    fr: "y",
    pos: "pron.",
    cn: "那儿,某处",
    lesson: 13,
    phonetic: "",
    example: "J'y vais demain.",
    exampleCn: "我明天去那里。",
    hasAudio: false,
    audioId: 0
  },
  {
    id: 1141,
    fr: "zut",
    pos: "interj.",
    cn: "糟了!该死!",
    lesson: 22,
    phonetic: "",
    example: "Zut ! J'ai oublié mon sac.",
    exampleCn: "糟了！我忘了包。",
    hasAudio: false,
    audioId: 0
  }
];

const verbList = [
  {
    id: 1,
    name: "aimer",
    cn: "爱，喜欢",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "j'aime"
      },
      {
        person: "tu",
        form: "tu aimes"
      },
      {
        person: "il / elle",
        form: "il aime"
      },
      {
        person: "nous",
        form: "nous aimons"
      },
      {
        person: "vous",
        form: "vous aimez"
      },
      {
        person: "ils / elles",
        form: "ils aiment"
      }
    ],
    tenses: {
      "现在时": [
        "j'aime",
        "tu aimes",
        "il aime",
        "nous aimons",
        "vous aimez",
        "ils aiment"
      ],
      "未完成过去时": [
        "j'aimais",
        "tu aimais",
        "il aimait",
        "nous aimions",
        "vous aimiez",
        "ils aimaient"
      ],
      "复合过去时": [
        "j'ai aimé",
        "tu as aimé",
        "il a aimé",
        "nous avons aimé",
        "vous avez aimé",
        "ils ont aimé"
      ],
      "简单将来时": [
        "j'aimerai",
        "tu aimeras",
        "il aimera",
        "nous aimerons",
        "vous aimerez",
        "ils aimeront"
      ],
      "过去将来时": [
        "j'aimerais",
        "tu aimerais",
        "il aimerait",
        "nous aimerions",
        "vous aimeriez",
        "ils aimeraient"
      ]
    },
    audioId: 0
  },
  {
    id: 2,
    name: "acheter",
    cn: "买",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "j'achète"
      },
      {
        person: "tu",
        form: "tu achètes"
      },
      {
        person: "il / elle",
        form: "il achète"
      },
      {
        person: "nous",
        form: "nous achetons"
      },
      {
        person: "vous",
        form: "vous achetez"
      },
      {
        person: "ils / elles",
        form: "ils achètent"
      }
    ],
    tenses: {
      "现在时": [
        "j'achète",
        "tu achètes",
        "il achète",
        "nous achetons",
        "vous achetez",
        "ils achètent"
      ],
      "未完成过去时": [
        "j'achetais",
        "tu achetais",
        "il achetait",
        "nous achetions",
        "vous achetiez",
        "ils achetaient"
      ],
      "复合过去时": [
        "j'ai acheté",
        "tu as acheté",
        "il a acheté",
        "nous avons acheté",
        "vous avez acheté",
        "ils ont acheté"
      ],
      "简单将来时": [
        "j'achèterai",
        "tu achèteras",
        "il achètera",
        "nous achèterons",
        "vous achèterez",
        "ils achèteront"
      ],
      "过去将来时": [
        "j'achèterais",
        "tu achèterais",
        "il achèterait",
        "nous achèterions",
        "vous achèteriez",
        "ils achèteraient"
      ]
    },
    audioId: 0
  },
  {
    id: 3,
    name: "appeler",
    cn: "叫，称呼；打电话",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "j'appelle"
      },
      {
        person: "tu",
        form: "tu appelles"
      },
      {
        person: "il / elle",
        form: "il appelle"
      },
      {
        person: "nous",
        form: "nous appelons"
      },
      {
        person: "vous",
        form: "vous appelez"
      },
      {
        person: "ils / elles",
        form: "ils appellent"
      }
    ],
    tenses: {
      "现在时": [
        "j'appelle",
        "tu appelles",
        "il appelle",
        "nous appelons",
        "vous appelez",
        "ils appellent"
      ],
      "未完成过去时": [
        "j'appelais",
        "tu appelais",
        "il appelait",
        "nous appelions",
        "vous appeliez",
        "ils appelaient"
      ],
      "复合过去时": [
        "j'ai appelé",
        "tu as appelé",
        "il a appelé",
        "nous avons appelé",
        "vous avez appelé",
        "ils ont appelé"
      ],
      "简单将来时": [
        "j'appellerai",
        "tu appelleras",
        "il appellera",
        "nous appellerons",
        "vous appellerez",
        "ils appelleront"
      ],
      "过去将来时": [
        "j'appellerais",
        "tu appellerais",
        "il appellerait",
        "nous appellerions",
        "vous appelleriez",
        "ils appelleraient"
      ]
    },
    audioId: 0
  },
  {
    id: 4,
    name: "commencer",
    cn: "开始",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "je commence"
      },
      {
        person: "tu",
        form: "tu commences"
      },
      {
        person: "il / elle",
        form: "il commence"
      },
      {
        person: "nous",
        form: "nous commençons"
      },
      {
        person: "vous",
        form: "vous commencez"
      },
      {
        person: "ils / elles",
        form: "ils commencent"
      }
    ],
    tenses: {
      "现在时": [
        "je commence",
        "tu commences",
        "il commence",
        "nous commençons",
        "vous commencez",
        "ils commencent"
      ],
      "未完成过去时": [
        "je commençais",
        "tu commençais",
        "il commençait",
        "nous commencions",
        "vous commenciez",
        "ils commençaient"
      ],
      "复合过去时": [
        "j'ai commencé",
        "tu as commencé",
        "il a commencé",
        "nous avons commencé",
        "vous avez commencé",
        "ils ont commencé"
      ],
      "简单将来时": [
        "je commencerai",
        "tu commenceras",
        "il commencera",
        "nous commencerons",
        "vous commencerez",
        "ils commenceront"
      ],
      "过去将来时": [
        "je commencerais",
        "tu commencerais",
        "il commencerait",
        "nous commencerions",
        "vous commenceriez",
        "ils commenceraient"
      ]
    },
    audioId: 0
  },
  {
    id: 5,
    name: "envoyer",
    cn: "送，寄，派遣",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "j'envoie"
      },
      {
        person: "tu",
        form: "tu envoies"
      },
      {
        person: "il / elle",
        form: "il envoie"
      },
      {
        person: "nous",
        form: "nous envoyons"
      },
      {
        person: "vous",
        form: "vous envoyez"
      },
      {
        person: "ils / elles",
        form: "ils envoient"
      }
    ],
    tenses: {
      "现在时": [
        "j'envoie",
        "tu envoies",
        "il envoie",
        "nous envoyons",
        "vous envoyez",
        "ils envoient"
      ],
      "未完成过去时": [
        "j'envoyais",
        "tu envoyais",
        "il envoyait",
        "nous envoyions",
        "vous envoyiez",
        "ils envoyaient"
      ],
      "复合过去时": [
        "j'ai envoyé",
        "tu as envoyé",
        "il a envoyé",
        "nous avons envoyé",
        "vous avez envoyé",
        "ils ont envoyé"
      ],
      "简单将来时": [
        "j'enverrai",
        "tu enverras",
        "il enverra",
        "nous enverrons",
        "vous enverrez",
        "ils enverront"
      ],
      "过去将来时": [
        "j'enverrais",
        "tu enverrais",
        "il enverrait",
        "nous enverrions",
        "vous enverriez",
        "ils enverraient"
      ]
    },
    audioId: 0
  },
  {
    id: 6,
    name: "manger",
    cn: "吃",
    group: "第一组（规则）",
    forms: [
      {
        person: "je",
        form: "je mange"
      },
      {
        person: "tu",
        form: "tu manges"
      },
      {
        person: "il / elle",
        form: "il mange"
      },
      {
        person: "nous",
        form: "nous mangeons"
      },
      {
        person: "vous",
        form: "vous mangez"
      },
      {
        person: "ils / elles",
        form: "ils mangent"
      }
    ],
    tenses: {
      "现在时": [
        "je mange",
        "tu manges",
        "il mange",
        "nous mangeons",
        "vous mangez",
        "ils mangent"
      ],
      "未完成过去时": [
        "je mangeais",
        "tu mangeais",
        "il mangeait",
        "nous mangions",
        "vous mangiez",
        "ils mangeaient"
      ],
      "复合过去时": [
        "j'ai mangé",
        "tu as mangé",
        "il a mangé",
        "nous avons mangé",
        "vous avez mangé",
        "ils ont mangé"
      ],
      "简单将来时": [
        "je mangerai",
        "tu mangeras",
        "il mangera",
        "nous mangerons",
        "vous mangerez",
        "ils mangeront"
      ],
      "过去将来时": [
        "je mangerais",
        "tu mangerais",
        "il mangerait",
        "nous mangerions",
        "vous mangeriez",
        "ils mangeraient"
      ]
    },
    audioId: 0
  },
  {
    id: 7,
    name: "choisir",
    cn: "选择",
    group: "第二组（规则）",
    forms: [
      {
        person: "je",
        form: "je choisis"
      },
      {
        person: "tu",
        form: "tu choisis"
      },
      {
        person: "il / elle",
        form: "il choisit"
      },
      {
        person: "nous",
        form: "nous choisissons"
      },
      {
        person: "vous",
        form: "vous choisissez"
      },
      {
        person: "ils / elles",
        form: "ils choisissent"
      }
    ],
    tenses: {
      "现在时": [
        "je choisis",
        "tu choisis",
        "il choisit",
        "nous choisissons",
        "vous choisissez",
        "ils choisissent"
      ],
      "未完成过去时": [
        "je choisissais",
        "tu choisissais",
        "il choisissait",
        "nous choisissions",
        "vous choisissiez",
        "ils choisissaient"
      ],
      "复合过去时": [
        "j'ai choisi",
        "tu as choisi",
        "il a choisi",
        "nous avons choisi",
        "vous avez choisi",
        "ils ont choisi"
      ],
      "简单将来时": [
        "je choisirai",
        "tu choisiras",
        "il choisira",
        "nous choisirons",
        "vous choisirez",
        "ils choisiront"
      ],
      "过去将来时": [
        "je choisirais",
        "tu choisirais",
        "il choisirait",
        "nous choisirions",
        "vous choisiriez",
        "ils choisiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 8,
    name: "aller",
    cn: "去",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je vais"
      },
      {
        person: "tu",
        form: "tu vas"
      },
      {
        person: "il / elle",
        form: "il va"
      },
      {
        person: "nous",
        form: "nous allons"
      },
      {
        person: "vous",
        form: "vous allez"
      },
      {
        person: "ils / elles",
        form: "ils vont"
      }
    ],
    tenses: {
      "现在时": [
        "je vais",
        "tu vas",
        "il va",
        "nous allons",
        "vous allez",
        "ils vont"
      ],
      "未完成过去时": [
        "j'allais",
        "tu allais",
        "il allait",
        "nous allions",
        "vous alliez",
        "ils allaient"
      ],
      "复合过去时": [
        "je suis allé(e)",
        "tu es allé(e)",
        "il est allé",
        "nous sommes allé(e)s",
        "vous êtes allé(e)s",
        "ils sont allés"
      ],
      "简单将来时": [
        "j'irai",
        "tu iras",
        "il ira",
        "nous irons",
        "vous irez",
        "ils iront"
      ],
      "过去将来时": [
        "j'irais",
        "tu irais",
        "il irait",
        "nous irions",
        "vous iriez",
        "ils iraient"
      ]
    },
    audioId: 3
  },
  {
    id: 9,
    name: "apprendre",
    cn: "学习；得知",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "j'apprends"
      },
      {
        person: "tu",
        form: "tu apprends"
      },
      {
        person: "il / elle",
        form: "il apprend"
      },
      {
        person: "nous",
        form: "nous apprenons"
      },
      {
        person: "vous",
        form: "vous apprenez"
      },
      {
        person: "ils / elles",
        form: "ils apprennent"
      }
    ],
    tenses: {
      "现在时": [
        "j'apprends",
        "tu apprends",
        "il apprend",
        "nous apprenons",
        "vous apprenez",
        "ils apprennent"
      ],
      "未完成过去时": [
        "j'apprenais",
        "tu apprenais",
        "il apprenait",
        "nous apprenions",
        "vous appreniez",
        "ils apprenaient"
      ],
      "复合过去时": [
        "j'ai appris",
        "tu as appris",
        "il a appris",
        "nous avons appris",
        "vous avez appris",
        "ils ont appris"
      ],
      "简单将来时": [
        "j'apprendrai",
        "tu apprendras",
        "il apprendra",
        "nous apprendrons",
        "vous apprendrez",
        "ils apprendront"
      ],
      "过去将来时": [
        "j'apprendrais",
        "tu apprendrais",
        "il apprendrait",
        "nous apprendrions",
        "vous apprendriez",
        "ils apprendraient"
      ]
    },
    audioId: 10
  },
  {
    id: 10,
    name: "attendre",
    cn: "等待",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "j'attends"
      },
      {
        person: "tu",
        form: "tu attends"
      },
      {
        person: "il / elle",
        form: "il attend"
      },
      {
        person: "nous",
        form: "nous attendons"
      },
      {
        person: "vous",
        form: "vous attendez"
      },
      {
        person: "ils / elles",
        form: "ils attendent"
      }
    ],
    tenses: {
      "现在时": [
        "j'attends",
        "tu attends",
        "il attend",
        "nous attendons",
        "vous attendez",
        "ils attendent"
      ],
      "未完成过去时": [
        "j'attendais",
        "tu attendais",
        "il attendait",
        "nous attendions",
        "vous attendiez",
        "ils attendaient"
      ],
      "复合过去时": [
        "j'ai attendu",
        "tu as attendu",
        "il a attendu",
        "nous avons attendu",
        "vous avez attendu",
        "ils ont attendu"
      ],
      "简单将来时": [
        "j'attendrai",
        "tu attendras",
        "il attendra",
        "nous attendrons",
        "vous attendrez",
        "ils attendront"
      ],
      "过去将来时": [
        "j'attendrais",
        "tu attendrais",
        "il attendrait",
        "nous attendrions",
        "vous attendriez",
        "ils attendraient"
      ]
    },
    audioId: 12
  },
  {
    id: 11,
    name: "avoir",
    cn: "有",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "j'ai"
      },
      {
        person: "tu",
        form: "tu as"
      },
      {
        person: "il / elle",
        form: "il a"
      },
      {
        person: "nous",
        form: "nous avons"
      },
      {
        person: "vous",
        form: "vous avez"
      },
      {
        person: "ils / elles",
        form: "ils ont"
      }
    ],
    tenses: {
      "现在时": [
        "j'ai",
        "tu as",
        "il a",
        "nous avons",
        "vous avez",
        "ils ont"
      ],
      "未完成过去时": [
        "j'avais",
        "tu avais",
        "il avait",
        "nous avions",
        "vous aviez",
        "ils avaient"
      ],
      "复合过去时": [
        "j'ai eu",
        "tu as eu",
        "il a eu",
        "nous avons eu",
        "vous avez eu",
        "ils ont eu"
      ],
      "简单将来时": [
        "j'aurai",
        "tu auras",
        "il aura",
        "nous aurons",
        "vous aurez",
        "ils auront"
      ],
      "过去将来时": [
        "j'aurais",
        "tu aurais",
        "il aurait",
        "nous aurions",
        "vous auriez",
        "ils auraient"
      ]
    },
    audioId: 2
  },
  {
    id: 12,
    name: "boire",
    cn: "喝",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je bois"
      },
      {
        person: "tu",
        form: "tu bois"
      },
      {
        person: "il / elle",
        form: "il boit"
      },
      {
        person: "nous",
        form: "nous buvons"
      },
      {
        person: "vous",
        form: "vous buvez"
      },
      {
        person: "ils / elles",
        form: "ils boivent"
      }
    ],
    tenses: {
      "现在时": [
        "je bois",
        "tu bois",
        "il boit",
        "nous buvons",
        "vous buvez",
        "ils boivent"
      ],
      "未完成过去时": [
        "je buvais",
        "tu buvais",
        "il buvait",
        "nous buvions",
        "vous buviez",
        "ils buvaient"
      ],
      "复合过去时": [
        "j'ai bu",
        "tu as bu",
        "il a bu",
        "nous avons bu",
        "vous avez bu",
        "ils ont bu"
      ],
      "简单将来时": [
        "je boirai",
        "tu boiras",
        "il boira",
        "nous boirons",
        "vous boirez",
        "ils boiront"
      ],
      "过去将来时": [
        "je boirais",
        "tu boirais",
        "il boirait",
        "nous boirions",
        "vous boiriez",
        "ils boiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 13,
    name: "conduire",
    cn: "驾驶，开车",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je conduis"
      },
      {
        person: "tu",
        form: "tu conduis"
      },
      {
        person: "il / elle",
        form: "il conduit"
      },
      {
        person: "nous",
        form: "nous conduisons"
      },
      {
        person: "vous",
        form: "vous conduisez"
      },
      {
        person: "ils / elles",
        form: "ils conduisent"
      }
    ],
    tenses: {
      "现在时": [
        "je conduis",
        "tu conduis",
        "il conduit",
        "nous conduisons",
        "vous conduisez",
        "ils conduisent"
      ],
      "未完成过去时": [
        "je conduisais",
        "tu conduisais",
        "il conduisait",
        "nous conduisions",
        "vous conduisiez",
        "ils conduisaient"
      ],
      "复合过去时": [
        "j'ai conduit",
        "tu as conduit",
        "il a conduit",
        "nous avons conduit",
        "vous avez conduit",
        "ils ont conduit"
      ],
      "简单将来时": [
        "je conduirai",
        "tu conduiras",
        "il conduira",
        "nous conduirons",
        "vous conduirez",
        "ils conduiront"
      ],
      "过去将来时": [
        "je conduirais",
        "tu conduirais",
        "il conduirait",
        "nous conduirions",
        "vous conduiriez",
        "ils conduiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 14,
    name: "connaître",
    cn: "认识，了解",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je connais"
      },
      {
        person: "tu",
        form: "tu connais"
      },
      {
        person: "il / elle",
        form: "il connaît"
      },
      {
        person: "nous",
        form: "nous connaissons"
      },
      {
        person: "vous",
        form: "vous connaissez"
      },
      {
        person: "ils / elles",
        form: "ils connaissent"
      }
    ],
    tenses: {
      "现在时": [
        "je connais",
        "tu connais",
        "il connaît",
        "nous connaissons",
        "vous connaissez",
        "ils connaissent"
      ],
      "未完成过去时": [
        "je connaissais",
        "tu connaissais",
        "il connaissait",
        "nous connaissions",
        "vous connaissiez",
        "ils connaissaient"
      ],
      "复合过去时": [
        "j'ai connu",
        "tu as connu",
        "il a connu",
        "nous avons connu",
        "vous avez connu",
        "ils ont connu"
      ],
      "简单将来时": [
        "je connaîtrai",
        "tu connaîtras",
        "il connaîtra",
        "nous connaîtrons",
        "vous connaîtrez",
        "ils connaîtront"
      ],
      "过去将来时": [
        "je connaîtrais",
        "tu connaîtrais",
        "il connaîtrait",
        "nous connaîtrions",
        "vous connaîtriez",
        "ils connaîtraient"
      ]
    },
    audioId: 19
  },
  {
    id: 15,
    name: "courir",
    cn: "跑",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je cours"
      },
      {
        person: "tu",
        form: "tu cours"
      },
      {
        person: "il / elle",
        form: "il court"
      },
      {
        person: "nous",
        form: "nous courons"
      },
      {
        person: "vous",
        form: "vous courez"
      },
      {
        person: "ils / elles",
        form: "ils courent"
      }
    ],
    tenses: {
      "现在时": [
        "je cours",
        "tu cours",
        "il court",
        "nous courons",
        "vous courez",
        "ils courent"
      ],
      "未完成过去时": [
        "je courais",
        "tu courais",
        "il courait",
        "nous courions",
        "vous couriez",
        "ils couraient"
      ],
      "复合过去时": [
        "j'ai couru",
        "tu as couru",
        "il a couru",
        "nous avons couru",
        "vous avez couru",
        "ils ont couru"
      ],
      "简单将来时": [
        "je courrai",
        "tu courras",
        "il courra",
        "nous courrons",
        "vous courrez",
        "ils courront"
      ],
      "过去将来时": [
        "je courrais",
        "tu courrais",
        "il courrait",
        "nous courrions",
        "vous courriez",
        "ils courraient"
      ]
    },
    audioId: 0
  },
  {
    id: 16,
    name: "croire",
    cn: "相信，认为",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je crois"
      },
      {
        person: "tu",
        form: "tu crois"
      },
      {
        person: "il / elle",
        form: "il croit"
      },
      {
        person: "nous",
        form: "nous croyons"
      },
      {
        person: "vous",
        form: "vous croyez"
      },
      {
        person: "ils / elles",
        form: "ils croient"
      }
    ],
    tenses: {
      "现在时": [
        "je crois",
        "tu crois",
        "il croit",
        "nous croyons",
        "vous croyez",
        "ils croient"
      ],
      "未完成过去时": [
        "je croyais",
        "tu croyais",
        "il croyait",
        "nous croyions",
        "vous croyiez",
        "ils croyaient"
      ],
      "复合过去时": [
        "j'ai cru",
        "tu as cru",
        "il a cru",
        "nous avons cru",
        "vous avez cru",
        "ils ont cru"
      ],
      "简单将来时": [
        "je croirai",
        "tu croiras",
        "il croira",
        "nous croirons",
        "vous croirez",
        "ils croiront"
      ],
      "过去将来时": [
        "je croirais",
        "tu croirais",
        "il croirait",
        "nous croirions",
        "vous croiriez",
        "ils croiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 17,
    name: "devenir",
    cn: "变成，成为",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je deviens"
      },
      {
        person: "tu",
        form: "tu deviens"
      },
      {
        person: "il / elle",
        form: "il devient"
      },
      {
        person: "nous",
        form: "nous devenons"
      },
      {
        person: "vous",
        form: "vous devenez"
      },
      {
        person: "ils / elles",
        form: "ils deviennent"
      }
    ],
    tenses: {
      "现在时": [
        "je deviens",
        "tu deviens",
        "il devient",
        "nous devenons",
        "vous devenez",
        "ils deviennent"
      ],
      "未完成过去时": [
        "je devenais",
        "tu devenais",
        "il devenait",
        "nous devenions",
        "vous deveniez",
        "ils devenaient"
      ],
      "复合过去时": [
        "je suis devenu(e)",
        "tu es devenu(e)",
        "il est devenu",
        "nous sommes devenu(e)s",
        "vous êtes devenu(e)s",
        "ils sont devenus"
      ],
      "简单将来时": [
        "je deviendrai",
        "tu deviendras",
        "il deviendra",
        "nous deviendrons",
        "vous deviendrez",
        "ils deviendront"
      ],
      "过去将来时": [
        "je deviendrais",
        "tu deviendrais",
        "il deviendrait",
        "nous deviendrions",
        "vous deviendriez",
        "ils deviendraient"
      ]
    },
    audioId: 0
  },
  {
    id: 18,
    name: "devoir",
    cn: "应该，必须；欠",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je dois"
      },
      {
        person: "tu",
        form: "tu dois"
      },
      {
        person: "il / elle",
        form: "il doit"
      },
      {
        person: "nous",
        form: "nous devons"
      },
      {
        person: "vous",
        form: "vous devez"
      },
      {
        person: "ils / elles",
        form: "ils doivent"
      }
    ],
    tenses: {
      "现在时": [
        "je dois",
        "tu dois",
        "il doit",
        "nous devons",
        "vous devez",
        "ils doivent"
      ],
      "未完成过去时": [
        "je devais",
        "tu devais",
        "il devait",
        "nous devions",
        "vous deviez",
        "ils devaient"
      ],
      "复合过去时": [
        "j'ai dû",
        "tu as dû",
        "il a dû",
        "nous avons dû",
        "vous avez dû",
        "ils ont dû"
      ],
      "简单将来时": [
        "je devrai",
        "tu devras",
        "il devra",
        "nous devrons",
        "vous devrez",
        "ils devront"
      ],
      "过去将来时": [
        "je devrais",
        "tu devrais",
        "il devrait",
        "nous devrions",
        "vous devriez",
        "ils devraient"
      ]
    },
    audioId: 14
  },
  {
    id: 19,
    name: "dire",
    cn: "说，告诉",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je dis"
      },
      {
        person: "tu",
        form: "tu dis"
      },
      {
        person: "il / elle",
        form: "il dit"
      },
      {
        person: "nous",
        form: "nous disons"
      },
      {
        person: "vous",
        form: "vous dites"
      },
      {
        person: "ils / elles",
        form: "ils disent"
      }
    ],
    tenses: {
      "现在时": [
        "je dis",
        "tu dis",
        "il dit",
        "nous disons",
        "vous dites",
        "ils disent"
      ],
      "未完成过去时": [
        "je disais",
        "tu disais",
        "il disait",
        "nous disions",
        "vous disiez",
        "ils disaient"
      ],
      "复合过去时": [
        "j'ai dit",
        "tu as dit",
        "il a dit",
        "nous avons dit",
        "vous avez dit",
        "ils ont dit"
      ],
      "简单将来时": [
        "je dirai",
        "tu diras",
        "il dira",
        "nous dirons",
        "vous direz",
        "ils diront"
      ],
      "过去将来时": [
        "je dirais",
        "tu dirais",
        "il dirait",
        "nous dirions",
        "vous diriez",
        "ils diraient"
      ]
    },
    audioId: 13
  },
  {
    id: 20,
    name: "dormir",
    cn: "睡觉",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je dors"
      },
      {
        person: "tu",
        form: "tu dors"
      },
      {
        person: "il / elle",
        form: "il dort"
      },
      {
        person: "nous",
        form: "nous dormons"
      },
      {
        person: "vous",
        form: "vous dormez"
      },
      {
        person: "ils / elles",
        form: "ils dorment"
      }
    ],
    tenses: {
      "现在时": [
        "je dors",
        "tu dors",
        "il dort",
        "nous dormons",
        "vous dormez",
        "ils dorment"
      ],
      "未完成过去时": [
        "je dormais",
        "tu dormais",
        "il dormait",
        "nous dormions",
        "vous dormiez",
        "ils dormaient"
      ],
      "复合过去时": [
        "j'ai dormi",
        "tu as dormi",
        "il a dormi",
        "nous avons dormi",
        "vous avez dormi",
        "ils ont dormi"
      ],
      "简单将来时": [
        "je dormirai",
        "tu dormiras",
        "il dormira",
        "nous dormirons",
        "vous dormirez",
        "ils dormiront"
      ],
      "过去将来时": [
        "je dormirais",
        "tu dormirais",
        "il dormirait",
        "nous dormirions",
        "vous dormiriez",
        "ils dormiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 21,
    name: "écrire",
    cn: "写",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "j'écris"
      },
      {
        person: "tu",
        form: "tu écris"
      },
      {
        person: "il / elle",
        form: "il écrit"
      },
      {
        person: "nous",
        form: "nous écrivons"
      },
      {
        person: "vous",
        form: "vous écrivez"
      },
      {
        person: "ils / elles",
        form: "ils écrivent"
      }
    ],
    tenses: {
      "现在时": [
        "j'écris",
        "tu écris",
        "il écrit",
        "nous écrivons",
        "vous écrivez",
        "ils écrivent"
      ],
      "未完成过去时": [
        "j'écrivais",
        "tu écrivais",
        "il écrivait",
        "nous écrivions",
        "vous écriviez",
        "ils écrivaient"
      ],
      "复合过去时": [
        "j'ai écrit",
        "tu as écrit",
        "il a écrit",
        "nous avons écrit",
        "vous avez écrit",
        "ils ont écrit"
      ],
      "简单将来时": [
        "j'écrirai",
        "tu écriras",
        "il écrira",
        "nous écrirons",
        "vous écrirez",
        "ils écriront"
      ],
      "过去将来时": [
        "j'écrirais",
        "tu écrirais",
        "il écrirait",
        "nous écririons",
        "vous écririez",
        "ils écriraient"
      ]
    },
    audioId: 0
  },
  {
    id: 22,
    name: "être",
    cn: "是",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je suis"
      },
      {
        person: "tu",
        form: "tu es"
      },
      {
        person: "il / elle",
        form: "il est"
      },
      {
        person: "nous",
        form: "nous sommes"
      },
      {
        person: "vous",
        form: "vous êtes"
      },
      {
        person: "ils / elles",
        form: "ils sont"
      }
    ],
    tenses: {
      "现在时": [
        "je suis",
        "tu es",
        "il est",
        "nous sommes",
        "vous êtes",
        "ils sont"
      ],
      "未完成过去时": [
        "j'étais",
        "tu étais",
        "il était",
        "nous étions",
        "vous étiez",
        "ils étaient"
      ],
      "复合过去时": [
        "j'ai été",
        "tu as été",
        "il a été",
        "nous avons été",
        "vous avez été",
        "ils ont été"
      ],
      "简单将来时": [
        "je serai",
        "tu seras",
        "il sera",
        "nous serons",
        "vous serez",
        "ils seront"
      ],
      "过去将来时": [
        "je serais",
        "tu serais",
        "il serait",
        "nous serions",
        "vous seriez",
        "ils seraient"
      ]
    },
    audioId: 1
  },
  {
    id: 23,
    name: "faire",
    cn: "做",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je fais"
      },
      {
        person: "tu",
        form: "tu fais"
      },
      {
        person: "il / elle",
        form: "il fait"
      },
      {
        person: "nous",
        form: "nous faisons"
      },
      {
        person: "vous",
        form: "vous faites"
      },
      {
        person: "ils / elles",
        form: "ils font"
      }
    ],
    tenses: {
      "现在时": [
        "je fais",
        "tu fais",
        "il fait",
        "nous faisons",
        "vous faites",
        "ils font"
      ],
      "未完成过去时": [
        "je faisais",
        "tu faisais",
        "il faisait",
        "nous faisions",
        "vous faisiez",
        "ils faisaient"
      ],
      "复合过去时": [
        "j'ai fait",
        "tu as fait",
        "il a fait",
        "nous avons fait",
        "vous avez fait",
        "ils ont fait"
      ],
      "简单将来时": [
        "je ferai",
        "tu feras",
        "il fera",
        "nous ferons",
        "vous ferez",
        "ils feront"
      ],
      "过去将来时": [
        "je ferais",
        "tu ferais",
        "il ferait",
        "nous ferions",
        "vous feriez",
        "ils feraient"
      ]
    },
    audioId: 4
  },
  {
    id: 24,
    name: "falloir",
    cn: "需要，应该（无人称）",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: ""
      },
      {
        person: "tu",
        form: ""
      },
      {
        person: "il / elle",
        form: "il faut"
      },
      {
        person: "nous",
        form: ""
      },
      {
        person: "vous",
        form: ""
      },
      {
        person: "ils / elles",
        form: ""
      }
    ],
    tenses: {
      "现在时": [
        "",
        "",
        "il faut",
        "",
        "",
        ""
      ],
      "未完成过去时": [
        "",
        "",
        "il fallait",
        "",
        "",
        ""
      ],
      "复合过去时": [
        "",
        "",
        "il a fallu",
        "",
        "",
        ""
      ],
      "简单将来时": [
        "",
        "",
        "il faudra",
        "",
        "",
        ""
      ],
      "过去将来时": [
        "",
        "",
        "ils faudrait",
        "",
        "",
        ""
      ]
    },
    audioId: 24
  },
  {
    id: 25,
    name: "lire",
    cn: "读",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je lis"
      },
      {
        person: "tu",
        form: "tu lis"
      },
      {
        person: "il / elle",
        form: "il lit"
      },
      {
        person: "nous",
        form: "nous lisons"
      },
      {
        person: "vous",
        form: "vous lisez"
      },
      {
        person: "ils / elles",
        form: "ils lisent"
      }
    ],
    tenses: {
      "现在时": [
        "je lis",
        "tu lis",
        "il lit",
        "nous lisons",
        "vous lisez",
        "ils lisent"
      ],
      "未完成过去时": [
        "je lisais",
        "tu lisais",
        "il lisait",
        "nous lisions",
        "vous lisiez",
        "ils lisaient"
      ],
      "复合过去时": [
        "j'ai lu",
        "tu as lu",
        "il a lu",
        "nous avons lu",
        "vous avez lu",
        "ils ont lu"
      ],
      "简单将来时": [
        "je lirai",
        "tu liras",
        "il lira",
        "nous lirons",
        "vous lirez",
        "ils liront"
      ],
      "过去将来时": [
        "je lirais",
        "tu lirais",
        "il lirait",
        "nous lirions",
        "vous liriez",
        "ils liraient"
      ]
    },
    audioId: 11
  },
  {
    id: 26,
    name: "mettre",
    cn: "放",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je mets"
      },
      {
        person: "tu",
        form: "tu mets"
      },
      {
        person: "il / elle",
        form: "il met"
      },
      {
        person: "nous",
        form: "nous mettons"
      },
      {
        person: "vous",
        form: "vous mettez"
      },
      {
        person: "ils / elles",
        form: "ils mettent"
      }
    ],
    tenses: {
      "现在时": [
        "je mets",
        "tu mets",
        "il met",
        "nous mettons",
        "vous mettez",
        "ils mettent"
      ],
      "未完成过去时": [
        "je mettais",
        "tu mettais",
        "il mettait",
        "nous mettions",
        "vous mettiez",
        "ils mettaient"
      ],
      "复合过去时": [
        "j'ai mis",
        "tu as mis",
        "il a mis",
        "nous avons mis",
        "vous avez mis",
        "ils ont mis"
      ],
      "简单将来时": [
        "je mettrai",
        "tu mettras",
        "il mettra",
        "nous mettrons",
        "vous mettrez",
        "ils mettront"
      ],
      "过去将来时": [
        "je mettrais",
        "tu mettrais",
        "il mettrait",
        "nous mettrions",
        "vous mettriez",
        "ils mettraient"
      ]
    },
    audioId: 0
  },
  {
    id: 27,
    name: "ouvrir",
    cn: "打开",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "j'ouvre"
      },
      {
        person: "tu",
        form: "tu ouvres"
      },
      {
        person: "il / elle",
        form: "il ouvre"
      },
      {
        person: "nous",
        form: "nous ouvrons"
      },
      {
        person: "vous",
        form: "vous ouvrez"
      },
      {
        person: "ils / elles",
        form: "ils ouvrent"
      }
    ],
    tenses: {
      "现在时": [
        "j'ouvre",
        "tu ouvres",
        "il ouvre",
        "nous ouvrons",
        "vous ouvrez",
        "ils ouvrent"
      ],
      "未完成过去时": [
        "j'ouvrais",
        "tu ouvrais",
        "il ouvrait",
        "nous ouvrions",
        "vous ouvriez",
        "ils ouvraient"
      ],
      "复合过去时": [
        "j'ai ouvert",
        "tu as ouvert",
        "il a ouvert",
        "nous avons ouvert",
        "vous avez ouvert",
        "ils ont ouvert"
      ],
      "简单将来时": [
        "j'ouvrirai",
        "tu ouvriras",
        "il ouvrira",
        "nous ouvrirons",
        "vous ouvrirez",
        "ils ouvriront"
      ],
      "过去将来时": [
        "j'ouvrirais",
        "tu ouvrirais",
        "il ouvrirait",
        "nous ouvririons",
        "vous ouvririez",
        "ils ouvriraient"
      ]
    },
    audioId: 0
  },
  {
    id: 28,
    name: "partir",
    cn: "出发",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je pars"
      },
      {
        person: "tu",
        form: "tu pars"
      },
      {
        person: "il / elle",
        form: "il part"
      },
      {
        person: "nous",
        form: "nous partons"
      },
      {
        person: "vous",
        form: "vous partez"
      },
      {
        person: "ils / elles",
        form: "ils partent"
      }
    ],
    tenses: {
      "现在时": [
        "je pars",
        "tu pars",
        "il part",
        "nous partons",
        "vous partez",
        "ils partent"
      ],
      "未完成过去时": [
        "je partais",
        "tu partais",
        "il partait",
        "nous partions",
        "vous partiez",
        "ils partaient"
      ],
      "复合过去时": [
        "je suis parti(e)",
        "tu es parti(e)",
        "il est parti",
        "nous sommes parti(e)s",
        "vous êtes parti(e)s",
        "ils sont partis"
      ],
      "简单将来时": [
        "je partirai",
        "tu partiras",
        "il partira",
        "nous partirons",
        "vous partirez",
        "ils partiront"
      ],
      "过去将来时": [
        "je partirais",
        "tu partirais",
        "il partirait",
        "nous partirions",
        "vous partiriez",
        "ils partiraient"
      ]
    },
    audioId: 17
  },
  {
    id: 29,
    name: "plaire",
    cn: "使喜欢，取悦",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je plais"
      },
      {
        person: "tu",
        form: "tu plais"
      },
      {
        person: "il / elle",
        form: "il plaît"
      },
      {
        person: "nous",
        form: "nous plaisons"
      },
      {
        person: "vous",
        form: "vous plaisez"
      },
      {
        person: "ils / elles",
        form: "ils plaisent"
      }
    ],
    tenses: {
      "现在时": [
        "je plais",
        "tu plais",
        "il plaît",
        "nous plaisons",
        "vous plaisez",
        "ils plaisent"
      ],
      "未完成过去时": [
        "je plaisais",
        "tu plaisais",
        "il plaisait",
        "nous plaisions",
        "vous plaisiez",
        "ils plaisaient"
      ],
      "复合过去时": [
        "j'ai plu",
        "tu as plu",
        "il a plu",
        "nous avons plu",
        "vous avez plu",
        "ils ont plu"
      ],
      "简单将来时": [
        "je plairai",
        "tu plairas",
        "il plaira",
        "nous plairons",
        "vous plairez",
        "ils plairont"
      ],
      "过去将来时": [
        "je plairais",
        "tu plairais",
        "il plairait",
        "nous plairions",
        "vous plairiez",
        "ils plairaient"
      ]
    },
    audioId: 0
  },
  {
    id: 30,
    name: "pleuvoir",
    cn: "下雨（无人称）",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: ""
      },
      {
        person: "tu",
        form: ""
      },
      {
        person: "il / elle",
        form: "il pleut"
      },
      {
        person: "nous",
        form: ""
      },
      {
        person: "vous",
        form: ""
      },
      {
        person: "ils / elles",
        form: ""
      }
    ],
    tenses: {
      "现在时": [
        "",
        "",
        "il pleut",
        "",
        "",
        ""
      ],
      "未完成过去时": [
        "",
        "",
        "il pleuvait",
        "",
        "",
        ""
      ],
      "复合过去时": [
        "",
        "",
        "il a plu",
        "",
        "",
        ""
      ],
      "简单将来时": [
        "",
        "",
        "il pleuvra",
        "",
        "",
        ""
      ],
      "过去将来时": [
        "",
        "",
        "il pleuvrait",
        "",
        "",
        ""
      ]
    },
    audioId: 25
  },
  {
    id: 31,
    name: "pouvoir",
    cn: "能够",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je peux (puis)"
      },
      {
        person: "tu",
        form: "tu peux"
      },
      {
        person: "il / elle",
        form: "il peut"
      },
      {
        person: "nous",
        form: "nous pouvons"
      },
      {
        person: "vous",
        form: "vous pouvez"
      },
      {
        person: "ils / elles",
        form: "ils peuvent"
      }
    ],
    tenses: {
      "现在时": [
        "je peux (puis)",
        "tu peux",
        "il peut",
        "nous pouvons",
        "vous pouvez",
        "ils peuvent"
      ],
      "未完成过去时": [
        "je pouvais",
        "tu pouvais",
        "il pouvait",
        "nous pouvions",
        "vous pouviez",
        "ils pouvaient"
      ],
      "复合过去时": [
        "j'ai pu",
        "tu as pu",
        "il a pu",
        "nous avons pu",
        "vous avez pu",
        "ils ont pu"
      ],
      "简单将来时": [
        "je pourrai",
        "tu pourras",
        "il pourra",
        "nous pourrons",
        "vous pourrez",
        "ils pourront"
      ],
      "过去将来时": [
        "je pourrais",
        "tu pourrais",
        "il pourrait",
        "nous pourrions",
        "vous pourriez",
        "ils pourraient"
      ]
    },
    audioId: 7
  },
  {
    id: 32,
    name: "prendre",
    cn: "拿，取",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je prends"
      },
      {
        person: "tu",
        form: "tu prends"
      },
      {
        person: "il / elle",
        form: "il prend"
      },
      {
        person: "nous",
        form: "nous prenons"
      },
      {
        person: "vous",
        form: "vous prenez"
      },
      {
        person: "ils / elles",
        form: "ils prennent"
      }
    ],
    tenses: {
      "现在时": [
        "je prends",
        "tu prends",
        "il prend",
        "nous prenons",
        "vous prenez",
        "ils prennent"
      ],
      "未完成过去时": [
        "je prenais",
        "tu prenais",
        "il prenait",
        "nous prenions",
        "vous preniez",
        "ils prenaient"
      ],
      "复合过去时": [
        "j'ai pris",
        "tu as pris",
        "il a pris",
        "nous avons pris",
        "vous avez pris",
        "ils ont pris"
      ],
      "简单将来时": [
        "je prendrai",
        "tu prendras",
        "il prendra",
        "nous prendrons",
        "vous prendrez",
        "ils prendront"
      ],
      "过去将来时": [
        "je prendrais",
        "tu prendrais",
        "il prendrait",
        "nous prendrions",
        "vous prendriez",
        "ils prendraient"
      ]
    },
    audioId: 0
  },
  {
    id: 33,
    name: "prévoir",
    cn: "预见",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je prévois"
      },
      {
        person: "tu",
        form: "tu prévois"
      },
      {
        person: "il / elle",
        form: "il prévoit"
      },
      {
        person: "nous",
        form: "nous prévoyons"
      },
      {
        person: "vous",
        form: "vous prévoyez"
      },
      {
        person: "ils / elles",
        form: "ils prévoient"
      }
    ],
    tenses: {
      "现在时": [
        "je prévois",
        "tu prévois",
        "il prévoit",
        "nous prévoyons",
        "vous prévoyez",
        "ils prévoient"
      ],
      "未完成过去时": [
        "je prévoyais",
        "tu prévoyais",
        "il prévoyait",
        "nous prévoyions",
        "vous prévoyiez",
        "ils prévoyaient"
      ],
      "复合过去时": [
        "j'ai prévu",
        "tu as prévu",
        "il a prévu",
        "nous avons prévu",
        "vous avez prévu",
        "ils ont prévu"
      ],
      "简单将来时": [
        "je prévoirai",
        "tu prévoiras",
        "il prévoira",
        "nous prévoirons",
        "vous prévoirez",
        "ils prévoiront"
      ],
      "过去将来时": [
        "je prévoirais",
        "tu prévoirais",
        "il prévoirait",
        "nous prévoirions",
        "vous prévoiriez",
        "ils prévoiraient"
      ]
    },
    audioId: 0
  },
  {
    id: 34,
    name: "recevoir",
    cn: "收到",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je reçois"
      },
      {
        person: "tu",
        form: "tu reçois"
      },
      {
        person: "il / elle",
        form: "il reçoit"
      },
      {
        person: "nous",
        form: "nous recevons"
      },
      {
        person: "vous",
        form: "vous recevez"
      },
      {
        person: "ils / elles",
        form: "ils reçoivent"
      }
    ],
    tenses: {
      "现在时": [
        "je reçois",
        "tu reçois",
        "il reçoit",
        "nous recevons",
        "vous recevez",
        "ils reçoivent"
      ],
      "未完成过去时": [
        "je recevais",
        "tu recevais",
        "il recevait",
        "nous recevions",
        "vous receviez",
        "ils recevaient"
      ],
      "复合过去时": [
        "j'ai reçu",
        "tu as reçu",
        "il a reçu",
        "nous avons reçu",
        "vous avez reçu",
        "ils ont reçu"
      ],
      "简单将来时": [
        "je recevrai",
        "tu recevras",
        "il recevra",
        "nous recevrons",
        "vous recevrez",
        "ils recevront"
      ],
      "过去将来时": [
        "je recevrais",
        "tu recevrais",
        "il recevrait",
        "nous recevrions",
        "vous recevriez",
        "ils recevraient"
      ]
    },
    audioId: 18
  },
  {
    id: 35,
    name: "savoir",
    cn: "知道",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je sais"
      },
      {
        person: "tu",
        form: "tu sais"
      },
      {
        person: "il / elle",
        form: "il sait"
      },
      {
        person: "nous",
        form: "nous savons"
      },
      {
        person: "vous",
        form: "vous savez"
      },
      {
        person: "ils / elles",
        form: "ils savent"
      }
    ],
    tenses: {
      "现在时": [
        "je sais",
        "tu sais",
        "il sait",
        "nous savons",
        "vous savez",
        "ils savent"
      ],
      "未完成过去时": [
        "je savais",
        "tu savais",
        "il savait",
        "nous savions",
        "vous saviez",
        "ils savaient"
      ],
      "复合过去时": [
        "j'ai su",
        "tu as su",
        "il a su",
        "nous avons su",
        "vous avez su",
        "ils ont su"
      ],
      "简单将来时": [
        "je saurai",
        "tu sauras",
        "il saura",
        "nous saurons",
        "vous saurez",
        "ils sauront"
      ],
      "过去将来时": [
        "je saurais",
        "tu saurais",
        "il saurait",
        "nous saurions",
        "vous sauriez",
        "ils sauraient"
      ]
    },
    audioId: 16
  },
  {
    id: 36,
    name: "suivre",
    cn: "跟随",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je suis"
      },
      {
        person: "tu",
        form: "tu suis"
      },
      {
        person: "il / elle",
        form: "il suit"
      },
      {
        person: "nous",
        form: "nous suivons"
      },
      {
        person: "vous",
        form: "vous suivez"
      },
      {
        person: "ils / elles",
        form: "ils suivent"
      }
    ],
    tenses: {
      "现在时": [
        "je suis",
        "tu suis",
        "il suit",
        "nous suivons",
        "vous suivez",
        "ils suivent"
      ],
      "未完成过去时": [
        "je suivais",
        "tu suivais",
        "il suivait",
        "nous suivions",
        "vous suiviez",
        "ils suivaient"
      ],
      "复合过去时": [
        "j'ai suivi",
        "tu as suivi",
        "il a suivi",
        "nous avons suivi",
        "vous avez suivi",
        "ils ont suivi"
      ],
      "简单将来时": [
        "je suivrai",
        "tu suivras",
        "il suivra",
        "nous suivrons",
        "vous suivrez",
        "ils suivront"
      ],
      "过去将来时": [
        "je suivrais",
        "tu suivrais",
        "il suivrait",
        "nous suivrions",
        "vous suivriez",
        "ils suivraient"
      ]
    },
    audioId: 9
  },
  {
    id: 37,
    name: "tenir",
    cn: "拿着，保持",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je tiens"
      },
      {
        person: "tu",
        form: "tu tiens"
      },
      {
        person: "il / elle",
        form: "il tient"
      },
      {
        person: "nous",
        form: "nous tenons"
      },
      {
        person: "vous",
        form: "vous tenez"
      },
      {
        person: "ils / elles",
        form: "ils tiennent"
      }
    ],
    tenses: {
      "现在时": [
        "je tiens",
        "tu tiens",
        "il tient",
        "nous tenons",
        "vous tenez",
        "ils tiennent"
      ],
      "未完成过去时": [
        "je tenais",
        "tu tenais",
        "il tenait",
        "nous tenions",
        "vous teniez",
        "ils tenaient"
      ],
      "复合过去时": [
        "j'ai tenu",
        "tu as tenu",
        "il a tenu",
        "nous avons tenu",
        "vous avez tenu",
        "ils ont tenu"
      ],
      "简单将来时": [
        "je tiendrai",
        "tu tiendras",
        "il tiendra",
        "nous tiendrons",
        "vous tiendrez",
        "ils tiendront"
      ],
      "过去将来时": [
        "je tiendrais",
        "tu tiendrais",
        "il tiendrait",
        "nous tiendrions",
        "vous tiendriez",
        "ils tiendraient"
      ]
    },
    audioId: 0
  },
  {
    id: 38,
    name: "voir",
    cn: "看见",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je vois"
      },
      {
        person: "tu",
        form: "tu vois"
      },
      {
        person: "il / elle",
        form: "il voit"
      },
      {
        person: "nous",
        form: "nous voyons"
      },
      {
        person: "vous",
        form: "vous voyez"
      },
      {
        person: "ils / elles",
        form: "ils voient"
      }
    ],
    tenses: {
      "现在时": [
        "je vois",
        "tu vois",
        "il voit",
        "nous voyons",
        "vous voyez",
        "ils voient"
      ],
      "未完成过去时": [
        "je voyais",
        "tu voyais",
        "il voyait",
        "nous voyions",
        "vous voyiez",
        "ils voyaient"
      ],
      "复合过去时": [
        "j'ai vu",
        "tu as vu",
        "il a vu",
        "nous avons vu",
        "vous avez vu",
        "ils ont vu"
      ],
      "简单将来时": [
        "je verrai",
        "tu verras",
        "il verra",
        "nous verrons",
        "vous verrez",
        "ils verront"
      ],
      "过去将来时": [
        "je verrais",
        "tu verrais",
        "il verrait",
        "nous verrions",
        "vous verriez",
        "ils verraient"
      ]
    },
    audioId: 8
  },
  {
    id: 39,
    name: "vouloir",
    cn: "想要",
    group: "第三组（不规则）",
    forms: [
      {
        person: "je",
        form: "je veux"
      },
      {
        person: "tu",
        form: "tu veux"
      },
      {
        person: "il / elle",
        form: "il veut"
      },
      {
        person: "nous",
        form: "nous voulons"
      },
      {
        person: "vous",
        form: "vous voulez"
      },
      {
        person: "ils / elles",
        form: "ils veulent"
      }
    ],
    tenses: {
      "现在时": [
        "je veux",
        "tu veux",
        "il veut",
        "nous voulons",
        "vous voulez",
        "ils veulent"
      ],
      "未完成过去时": [
        "je voulais",
        "tu voulais",
        "il voulait",
        "nous voulions",
        "vous vouliez",
        "ils voulaient"
      ],
      "复合过去时": [
        "j'ai voulu",
        "tu as voulu",
        "il a voulu",
        "nous avons voulu",
        "vous avez voulu",
        "ils ont voulu"
      ],
      "简单将来时": [
        "je voudrai",
        "tu voudras",
        "il voudra",
        "nous voudrons",
        "vous voudrez",
        "ils voudront"
      ],
      "过去将来时": [
        "je voudrais",
        "tu voudrais",
        "il voudrait",
        "nous voudrions",
        "vous voudriez",
        "ils voudraient"
      ]
    },
    audioId: 6
  }
];

const grammarLessons = [
  {
    lesson: 1,
    level: "A1",
    stage: "语音",
    topic: "元音 [a][e][i][u][y][ə]；辅音 [p][t][k][s][ʃ][ʒ][n][ŋ]",
    points: [
      "重音、节奏组",
      "联诵",
      "开音节与闭音节"
    ]
  },
  {
    lesson: 2,
    level: "A1",
    stage: "语音",
    topic: "元音 [ɛ][œ][ø][w]；辅音 [r][l][ɲ][ɥ][j][ʃ]",
    points: [
      "重音",
      "节奏组",
      "联诵",
      "长音"
    ]
  },
  {
    lesson: 3,
    level: "A1",
    stage: "语音",
    topic: "元音 [e][ɛ̃][œ̃][ɑ̃][ɔ̃][ɔ]；辅音 [b][v][ʒ][m]",
    points: [
      "连音",
      "字母 h",
      "连字符"
    ]
  },
  {
    lesson: 4,
    level: "A1",
    stage: "语音",
    topic: "语音复习",
    points: [
      "音节的划分",
      "省音",
      "词末辅音字母"
    ]
  },
  {
    lesson: 5,
    level: "A1",
    stage: "语音",
    topic: "元音 [ɔ][o][ɑ][y][ø]；辅音 [d][g][z][ʒ][m]",
    points: [
      "名词的性",
      "名词的限定成分",
      "de 表示领属关系"
    ]
  },
  {
    lesson: 6,
    level: "A1",
    stage: "语音",
    topic: "元音 [ɑ̃][ɛ̃][ɔ̃][œ̃]；辅音 [ɲ][j][ɥ]",
    points: [
      "名词的数",
      "否定形式 ne...pas",
      "疑问句的基本形式"
    ]
  },
  {
    lesson: 7,
    level: "A1",
    stage: "语音",
    topic: "鼻化元音复习；辅音 [tʃ][dʒ]",
    points: [
      "作主语的人称代词",
      "动词变位",
      "冠词省略",
      "阳性名词转阴性名词"
    ]
  },
  {
    lesson: 8,
    level: "A1",
    stage: "语音",
    topic: "语音总复习",
    points: [
      "avoir 的变位",
      "年龄表达法",
      "语调小结",
      "拼写符号"
    ]
  },
  {
    lesson: 9,
    level: "A1",
    stage: "入门",
    theme: "问候和告别",
    topic: "法语的词类；不定冠词和定冠词；序数词",
    points: [
      "词类",
      "不定冠词 un/une/des",
      "定冠词 le/la/les",
      "序数词 premier/deuxième"
    ],
    verbs: [
      "apprendre",
      "faire"
    ]
  },
  {
    lesson: 10,
    level: "A1",
    stage: "入门",
    theme: "自我介绍",
    topic: "主有形容词；直陈式现在时；第一组动词；de 代替 des",
    points: [
      "主有形容词 mon/ma/mes",
      "直陈式现在时",
      "第一组 -er 动词变位",
      "de 代替 des"
    ],
    verbs: [
      "venir",
      "aller"
    ]
  },
  {
    lesson: 11,
    level: "A1",
    stage: "入门",
    theme: "语言",
    topic: "指示形容词；重读人称代词；专有名词前的冠词",
    points: [
      "指示形容词 ce/cette/ces",
      "重读人称代词 moi/toi/lui",
      "专有名词前冠词省略"
    ],
    verbs: [
      "être",
      "vouloir"
    ]
  },
  {
    lesson: 12,
    level: "A1",
    stage: "入门",
    theme: "致谢和道歉",
    topic: "形容词；句子成分；及物动词和不及物动词",
    points: [
      "形容词性数配合",
      "句子成分",
      "及物/不及物动词"
    ],
    verbs: [
      "pouvoir",
      "voir",
      "suivre"
    ]
  },
  {
    lesson: 13,
    level: "A1",
    stage: "入门",
    theme: "相遇",
    topic: "缩合冠词；代词 y；国名与所用介词",
    points: [
      "缩合冠词 du/au/aux",
      "代词 y",
      "国名前介词 à/en/au"
    ],
    verbs: [
      "lire",
      "voyager"
    ]
  },
  {
    lesson: 14,
    level: "A1",
    stage: "入门",
    theme: "找人",
    topic: "命令式；最近将来时；重点表达法",
    points: [
      "命令式",
      "最近将来时 aller + 不定式"
    ],
    verbs: [
      "attendre",
      "dire",
      "devoir"
    ]
  },
  {
    lesson: 15,
    level: "A1",
    stage: "入门",
    theme: "问路",
    topic: "直接宾语人称代词；泛指人称代词 on；第二组动词",
    points: [
      "直接宾语人称代词 me/te/le/la/nous/vous/les",
      "泛指代词 on",
      "第二组 -ir 动词变位"
    ],
    verbs: [
      "sortir",
      "savoir"
    ]
  },
  {
    lesson: 16,
    level: "A1",
    stage: "入门",
    theme: "交通",
    topic: "代词式动词；名词补语和形容词补语；短语",
    points: [
      "代词式动词 se + 动词",
      "名词补语",
      "形容词补语"
    ],
    verbs: [
      "se lever",
      "partir",
      "recevoir"
    ]
  },
  {
    lesson: 17,
    level: "A1",
    stage: "入门",
    theme: "介绍某人",
    topic: "间接宾语人称代词；最近过去时；代词 en",
    points: [
      "间接宾语人称代词",
      "最近过去时 venir de + 不定式",
      "代词 en"
    ],
    verbs: [
      "connaître",
      "offrir"
    ]
  },
  {
    lesson: 18,
    level: "A1",
    stage: "入门",
    theme: "回答问题",
    topic: "无人称动词；年、季、月、日表达法",
    points: [
      "无人称动词 il faut/pleut",
      "年季月日表达"
    ],
    verbs: [
      "neiger",
      "pleuvoir",
      "falloir"
    ]
  },
  {
    lesson: 19,
    level: "A2",
    stage: "初级",
    theme: "Rendre service à quelqu'un",
    topic: "oui / non / si 的用法；限定形容词 ne...que；连词 que 引导的从句",
    points: [
      "si 用于否定式回答",
      "ne...que 仅仅",
      "连词 que 引导宾语从句"
    ]
  },
  {
    lesson: 20,
    level: "A2",
    stage: "初级",
    theme: "Demander la permission",
    topic: "过去分词；复合过去时；复合句",
    points: [
      "过去分词构成",
      "复合过去时 avoir + 过去分词",
      "复合句"
    ]
  },
  {
    lesson: 21,
    level: "A2",
    stage: "初级",
    theme: "Invitation",
    topic: "être 作助动词的复合过去时；疑问词小结；疑问句的构成",
    points: [
      "être 作助动词的复合过去时",
      "疑问词 qui/que/où/quand",
      "疑问句三种构成法"
    ]
  },
  {
    lesson: 22,
    level: "A2",
    stage: "初级",
    theme: "Fixer un rendez-vous",
    topic: "复合时态中的直接宾语和间接宾语人称代词；双宾语代词的位置",
    points: [
      "复合时态中宾语代词",
      "双宾语代词位置",
      "代词性数配合"
    ]
  },
  {
    lesson: 23,
    level: "A2",
    stage: "初级",
    theme: "À table",
    topic: "代词式动词；代词的用法（补充）",
    points: [
      "代词式动词的复合过去时",
      "代词用法补充"
    ]
  },
  {
    lesson: 24,
    level: "A2",
    stage: "初级",
    theme: "Quelques interdits",
    topic: "未完成过去时；未完成过去时和复合过去时的比较",
    points: [
      "未完成过去时变位与用法",
      "未完成过去时 vs 复合过去时",
      "描述与动作的区分"
    ]
  },
  {
    lesson: 25,
    level: "A2",
    stage: "初级",
    theme: "Faire des achats",
    topic: "关系从句和关系代词 qui；形容词比较级",
    points: [
      "关系代词 qui",
      "形容词比较级 plus/moins/aussi + que"
    ]
  },
  {
    lesson: 26,
    level: "A2",
    stage: "初级",
    theme: "Souhait et compliment",
    topic: "形容词最高级；被动语态；形容词前 de 代替 des",
    points: [
      "形容词最高级 le plus/la plus",
      "被动语态 être + 过去分词",
      "形容词前 des 变 de"
    ]
  },
  {
    lesson: 27,
    level: "A2",
    stage: "初级",
    theme: "Demander un renseignement",
    topic: "关系代词 que；关系代词 où",
    points: [
      "关系代词 que",
      "关系代词 où（地点/时间）"
    ]
  },
  {
    lesson: 28,
    level: "A2",
    stage: "初级",
    theme: "Présenter son point de vue",
    topic: "指示代词；简单将来时",
    points: [
      "指示代词 celui/celle/ceux/celles",
      "简单将来时变位与用法"
    ]
  },
  {
    lesson: 29,
    level: "A2",
    stage: "初级",
    theme: "Être de fête",
    topic: "过去将来时；间接引语",
    points: [
      "过去将来时（条件式现在时）",
      "间接引语"
    ]
  },
  {
    lesson: 30,
    level: "A2",
    stage: "初级",
    theme: "Lettres",
    topic: "强调表达法；代词式动词的几种意义；书信及信封格式",
    points: [
      "强调表达法 c'est...qui/que",
      "代词式动词的意义（互反/被动/自反）",
      "书信格式"
    ]
  }
];

const TENSE_NAMES = ["现在时","未完成过去时","复合过去时","简单将来时","过去将来时"];

module.exports = { wordList, verbList, grammarLessons, TENSE_NAMES };
