/**
 * 法语复习题库 —— En Avant: Mon dossier (A1-B2, 21 unités)
 * 来源：en-avant-mon-dossier_clean_p1-p208.pdf（扫描版，视觉精读 Banque de vocabulaire）
 * 已过滤纯练习指令类伪词条；教材无音标，故无 phonetic 字段
 */

const enavantWords = [
  {
    id: 1,
    fr: "Je m'appelle...",
    cn: "我叫……",
    cat: "Se présenter",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je m'appelle Camille.", exampleCn: "我叫卡米尔。"
  },
  {
    id: 2,
    fr: "je",
    cn: "我",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je vais à l'école.", exampleCn: "我去上学。"
  },
  {
    id: 3,
    fr: "tu",
    cn: "你",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Tu habites en ville ?", exampleCn: "你住在城里吗？"
  },
  {
    id: 4,
    fr: "il",
    cn: "他",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il s'appelle Cédric.", exampleCn: "他叫塞德里克。"
  },
  {
    id: 5,
    fr: "elle",
    cn: "她",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Elle s'appelle Rosalie.", exampleCn: "她叫罗莎莉。"
  },
  {
    id: 6,
    fr: "on",
    cn: "我们（泛指）",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "On va à l'école ensemble.", exampleCn: "我们一起去上学。"
  },
  {
    id: 7,
    fr: "nous",
    cn: "我们",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Nous habitons à Paris.", exampleCn: "我们住在巴黎。"
  },
  {
    id: 8,
    fr: "vous",
    cn: "您／你们",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Vous vous appelez comment ?", exampleCn: "您叫什么名字？"
  },
  {
    id: 9,
    fr: "ils",
    cn: "他们",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Ils sont français.", exampleCn: "他们是法国人。"
  },
  {
    id: 10,
    fr: "elles",
    cn: "她们",
    cat: "Les pronoms personnels",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Elles sont françaises.", exampleCn: "她们是法国人。"
  },
  {
    id: 11,
    fr: "Bonjour",
    cn: "你好／早上好",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Bonjour, madame.", exampleCn: "您好，夫人。"
  },
  {
    id: 12,
    fr: "Salut",
    cn: "嗨／你好（非正式）",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Salut, ça va ?", exampleCn: "嗨，你好吗？"
  },
  {
    id: 13,
    fr: "Ça va ?",
    cn: "你好吗？",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Salut Paul, ça va ?", exampleCn: "嗨保罗，你好吗？"
  },
  {
    id: 14,
    fr: "Comment allez-vous ?",
    cn: "您好吗？",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Bonjour, comment allez-vous ?", exampleCn: "您好，您好吗？"
  },
  {
    id: 15,
    fr: "Au revoir",
    cn: "再见",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Au revoir, à demain !", exampleCn: "再见，明天见！"
  },
  {
    id: 16,
    fr: "Ça va bien",
    cn: "我很好",
    cat: "Les salutations !",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Ça va bien, merci.", exampleCn: "我很好，谢谢。"
  },
  {
    id: 17,
    fr: "deux",
    cn: "二",
    cat: "Les nombres",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "J'ai deux frères.", exampleCn: "我有两个兄弟。"
  },
  {
    id: 18,
    fr: "dix",
    cn: "十",
    cat: "Les nombres",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il a dix ans.", exampleCn: "他十岁。"
  },
  {
    id: 19,
    fr: "vingt",
    cn: "二十",
    cat: "Les nombres",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "J'ai vingt ans.", exampleCn: "我二十岁。"
  },
  {
    id: 20,
    fr: "trente",
    cn: "三十",
    cat: "Les nombres",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Ma mère a trente ans.", exampleCn: "我妈妈三十岁。"
  },
  {
    id: 21,
    fr: "premier",
    cn: "第一",
    cat: "Les nombres",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "C'est mon premier jour à l'école.", exampleCn: "这是我上学的第一天。"
  },
  {
    id: 22,
    fr: "janvier",
    cn: "一月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Mon anniversaire est en janvier.", exampleCn: "我的生日在一月。"
  },
  {
    id: 23,
    fr: "février",
    cn: "二月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il fait froid en février.", exampleCn: "二月天气很冷。"
  },
  {
    id: 24,
    fr: "mars",
    cn: "三月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Nous avons un examen en mars.", exampleCn: "我们三月有一场考试。"
  },
  {
    id: 25,
    fr: "avril",
    cn: "四月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il pleut souvent en avril.", exampleCn: "四月经常下雨。"
  },
  {
    id: 26,
    fr: "mai",
    cn: "五月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je vais en France en mai.", exampleCn: "我五月去法国。"
  },
  {
    id: 27,
    fr: "juin",
    cn: "六月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Les vacances commencent en juin.", exampleCn: "假期从六月开始。"
  },
  {
    id: 28,
    fr: "juillet",
    cn: "七月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Nous allons à la plage en juillet.", exampleCn: "我们七月去海滩。"
  },
  {
    id: 29,
    fr: "août",
    cn: "八月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je reste à la maison en août.", exampleCn: "八月我待在家里。"
  },
  {
    id: 30,
    fr: "septembre",
    cn: "九月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "L'école recommence en septembre.", exampleCn: "学校九月开学。"
  },
  {
    id: 31,
    fr: "octobre",
    cn: "十月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il fait frais en octobre.", exampleCn: "十月天气凉爽。"
  },
  {
    id: 32,
    fr: "novembre",
    cn: "十一月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Il neige souvent en novembre.", exampleCn: "十一月经常下雪。"
  },
  {
    id: 33,
    fr: "décembre",
    cn: "十二月",
    cat: "Les mois de l'année",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Noël est en décembre.", exampleCn: "圣诞节在十二月。"
  },
  {
    id: 34,
    fr: "lundi",
    cn: "星期一",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je vais à l'école le lundi.", exampleCn: "我周一去上学。"
  },
  {
    id: 35,
    fr: "mardi",
    cn: "星期二",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "J'ai un cours de français le mardi.", exampleCn: "我周二有法语课。"
  },
  {
    id: 36,
    fr: "mercredi",
    cn: "星期三",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je joue au foot le mercredi.", exampleCn: "我周三踢足球。"
  },
  {
    id: 37,
    fr: "jeudi",
    cn: "星期四",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Nous avons un test le jeudi.", exampleCn: "我们周四有一个测验。"
  },
  {
    id: 38,
    fr: "vendredi",
    cn: "星期五",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je vais au cinéma le vendredi.", exampleCn: "我周五去看电影。"
  },
  {
    id: 39,
    fr: "samedi",
    cn: "星期六",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je fais du sport le samedi.", exampleCn: "我周六做运动。"
  },
  {
    id: 40,
    fr: "dimanche",
    cn: "星期日",
    cat: "Les jours de la semaine",
    unit: 1,
    theme: "Salut, c'est moi !",
    example: "Je me repose le dimanche.", exampleCn: "我周日休息。"
  },
  {
    id: 41,
    fr: "Écoutez !",
    cn: "听！",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Écoutez, s'il vous plaît !", exampleCn: "请听！"
  },
  {
    id: 42,
    fr: "Parlez !",
    cn: "说！",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Parlez plus fort, s'il vous plaît !", exampleCn: "请大声点说！"
  },
  {
    id: 43,
    fr: "Ouvrez les/vos cahiers !",
    cn: "打开你们的练习本！",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Ouvrez vos cahiers, s'il vous plaît !", exampleCn: "请打开你们的练习本！"
  },
  {
    id: 44,
    fr: "Fermez les/vos livres !",
    cn: "合上你们的书！",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Fermez les livres, s'il vous plaît !", exampleCn: "请合上书！"
  },
  {
    id: 45,
    fr: "Levez la main !",
    cn: "举手！",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Levez la main si vous savez !", exampleCn: "知道的话请举手！"
  },
  {
    id: 46,
    fr: "Je ne comprends pas.",
    cn: "我不明白。",
    cat: "Communiquer en classe",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Je ne comprends pas la question.", exampleCn: "我不明白这个问题。"
  },
  {
    id: 47,
    fr: "le bras",
    cn: "手臂",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai mal au bras.", exampleCn: "我手臂疼。"
  },
  {
    id: 48,
    fr: "le pied",
    cn: "脚",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai mal au pied.", exampleCn: "我脚疼。"
  },
  {
    id: 49,
    fr: "la jambe",
    cn: "腿",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai mal à la jambe.", exampleCn: "我腿疼。"
  },
  {
    id: 50,
    fr: "la main",
    cn: "手",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Je me lave les mains.", exampleCn: "我洗手。"
  },
  {
    id: 51,
    fr: "la tête",
    cn: "头",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai mal à la tête.", exampleCn: "我头疼。"
  },
  {
    id: 52,
    fr: "la bouche",
    cn: "嘴",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Ouvre la bouche, s'il te plaît.", exampleCn: "请张开嘴。"
  },
  {
    id: 53,
    fr: "le nez",
    cn: "鼻子",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai mal au nez.", exampleCn: "我鼻子疼。"
  },
  {
    id: 54,
    fr: "les yeux",
    cn: "眼睛",
    cat: "Les parties du corps",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Elle a les yeux bleus.", exampleCn: "她有一双蓝眼睛。"
  },
  {
    id: 55,
    fr: "le tableau blanc",
    cn: "白板",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Regardez le tableau blanc, s'il vous plaît !", exampleCn: "请看白板！"
  },
  {
    id: 56,
    fr: "la chaise",
    cn: "椅子",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Il y a une chaise dans la classe.", exampleCn: "教室里有一把椅子。"
  },
  {
    id: 57,
    fr: "le livre",
    cn: "书",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai un livre français.", exampleCn: "我有一本法语书。"
  },
  {
    id: 58,
    fr: "le crayon",
    cn: "铅笔",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'écris avec un crayon.", exampleCn: "我用铅笔写字。"
  },
  {
    id: 59,
    fr: "le cahier",
    cn: "练习本",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Ouvre ton cahier, s'il te plaît.", exampleCn: "请打开你的练习本。"
  },
  {
    id: 60,
    fr: "l'ordinateur (m)",
    cn: "电脑",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Je travaille sur l'ordinateur.", exampleCn: "我在电脑上学习。"
  },
  {
    id: 61,
    fr: "il y a...",
    cn: "有……",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Il y a une école dans mon quartier.", exampleCn: "我家附近有一所学校。"
  },
  {
    id: 62,
    fr: "il n'y a pas de...",
    cn: "没有……",
    cat: "Dans la salle de classe !",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Il n'y a pas de tableau ici.", exampleCn: "这里没有黑板。"
  },
  {
    id: 63,
    fr: "C'est...",
    cn: "这是……",
    cat: "Qu'est-ce que c'est ?",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "C'est un livre.", exampleCn: "这是一本书。"
  },
  {
    id: 64,
    fr: "Ce n'est pas...",
    cn: "这不是……",
    cat: "Qu'est-ce que c'est ?",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Ce n'est pas mon cahier.", exampleCn: "这不是我的练习本。"
  },
  {
    id: 65,
    fr: "jaune",
    cn: "黄色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai un crayon jaune.", exampleCn: "我有一支黄色铅笔。"
  },
  {
    id: 66,
    fr: "vert(e)",
    cn: "绿色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "La pomme est verte.", exampleCn: "这个苹果是绿色的。"
  },
  {
    id: 67,
    fr: "bleu(e)",
    cn: "蓝色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Le ciel est bleu.", exampleCn: "天空是蓝色的。"
  },
  {
    id: 68,
    fr: "rouge",
    cn: "红色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "La voiture est rouge.", exampleCn: "这辆车是红色的。"
  },
  {
    id: 69,
    fr: "noir(e)",
    cn: "黑色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Je porte un manteau noir.", exampleCn: "我穿一件黑色外套。"
  },
  {
    id: 70,
    fr: "blanc(he)",
    cn: "白色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "La neige est blanche.", exampleCn: "雪是白色的。"
  },
  {
    id: 71,
    fr: "marron",
    cn: "棕色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'ai les cheveux marron.", exampleCn: "我是棕色头发。"
  },
  {
    id: 72,
    fr: "rose",
    cn: "粉色",
    cat: "Les couleurs",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Les fleurs sont roses.", exampleCn: "花是粉色的。"
  },
  {
    id: 73,
    fr: "l'histoire (f)",
    cn: "历史",
    cat: "Les matières",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'étudie l'histoire.", exampleCn: "我学历史。"
  },
  {
    id: 74,
    fr: "le sport / l'EPS",
    cn: "体育",
    cat: "Les matières",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'aime le sport.", exampleCn: "我喜欢运动。"
  },
  {
    id: 75,
    fr: "la géographie",
    cn: "地理",
    cat: "Les matières",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "La géographie est intéressante.", exampleCn: "地理很有趣。"
  },
  {
    id: 76,
    fr: "le français",
    cn: "法语（课）",
    cat: "Les matières",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "J'apprends le français.", exampleCn: "我学法语。"
  },
  {
    id: 77,
    fr: "les mathématiques (f)",
    cn: "数学",
    cat: "Les matières",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "Les mathématiques sont difficiles.", exampleCn: "数学很难。"
  },
  {
    id: 78,
    fr: "mon/ma/mes",
    cn: "我的",
    cat: "À mon école",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "C'est mon livre, ma chaise et mes cahiers.", exampleCn: "这是我的书、我的椅子和我的练习本。"
  },
  {
    id: 79,
    fr: "ton/ta/tes",
    cn: "你的",
    cat: "À mon école",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "C'est ton livre, ta chaise et tes cahiers ?", exampleCn: "这是你的书、你的椅子和你的练习本吗？"
  },
  {
    id: 80,
    fr: "son/sa/ses",
    cn: "他／她的",
    cat: "À mon école",
    unit: 2,
    theme: "Dans la salle de classe",
    example: "C'est son livre, sa chaise et ses cahiers.", exampleCn: "这是他/她的书、椅子和练习本。"
  },
  {
    id: 81,
    fr: "l'Allemagne",
    cn: "德国",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'habite en Allemagne.", exampleCn: "我住在德国。"
  },
  {
    id: 82,
    fr: "l'Angleterre",
    cn: "英国（英格兰）",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle habite en Angleterre.", exampleCn: "她住在英国。"
  },
  {
    id: 83,
    fr: "la Belgique",
    cn: "比利时",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous allons en Belgique.", exampleCn: "我们去比利时。"
  },
  {
    id: 84,
    fr: "le Danemark",
    cn: "丹麦",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Il vient du Danemark.", exampleCn: "他来自丹麦。"
  },
  {
    id: 85,
    fr: "l'Écosse",
    cn: "苏格兰",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "L'Écosse est au nord de l'Angleterre.", exampleCn: "苏格兰在英格兰北部。"
  },
  {
    id: 86,
    fr: "l'Espagne",
    cn: "西班牙",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Je vais en Espagne en été.", exampleCn: "我夏天去西班牙。"
  },
  {
    id: 87,
    fr: "la France",
    cn: "法国",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Je suis en France.", exampleCn: "我在法国。"
  },
  {
    id: 88,
    fr: "la Grèce",
    cn: "希腊",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle habite en Grèce.", exampleCn: "她住在希腊。"
  },
  {
    id: 89,
    fr: "l'Italie",
    cn: "意大利",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous visitons l'Italie.", exampleCn: "我们游览意大利。"
  },
  {
    id: 90,
    fr: "la Suisse",
    cn: "瑞士",
    cat: "Les pays européens",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Il habite en Suisse.", exampleCn: "他住在瑞士。"
  },
  {
    id: 91,
    fr: "à la campagne",
    cn: "在乡下",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'habite à la campagne.", exampleCn: "我住在乡下。"
  },
  {
    id: 92,
    fr: "à la montagne",
    cn: "在山里",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous allons à la montagne.", exampleCn: "我们去山里。"
  },
  {
    id: 93,
    fr: "au bord de la mer",
    cn: "在海边",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle habite au bord de la mer.", exampleCn: "她住在海边。"
  },
  {
    id: 94,
    fr: "dans un appartement",
    cn: "在公寓里",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'habite dans un appartement.", exampleCn: "我住在公寓里。"
  },
  {
    id: 95,
    fr: "dans une maison",
    cn: "在一栋房子里",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous habitons dans une maison.", exampleCn: "我们住在一栋房子里。"
  },
  {
    id: 96,
    fr: "en banlieue",
    cn: "在郊区",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Tu habites en banlieue ?", exampleCn: "你住在郊区吗？"
  },
  {
    id: 97,
    fr: "en ville",
    cn: "在城里",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'habite en ville.", exampleCn: "我住在城里。"
  },
  {
    id: 98,
    fr: "petit",
    cn: "小的",
    cat: "Où habites-tu ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "C'est un petit village.", exampleCn: "这是一个小村子。"
  },
  {
    id: 99,
    fr: "J'habite...",
    cn: "我住在……",
    cat: "Tu habites en ville ou en banlieue ?",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'habite à Paris.", exampleCn: "我住在巴黎。"
  },
  {
    id: 100,
    fr: "quarante",
    cn: "四十",
    cat: "Les nombres 32–60",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Mon père a quarante ans.", exampleCn: "我爸爸四十岁。"
  },
  {
    id: 101,
    fr: "cinquante",
    cn: "五十",
    cat: "Les nombres 32–60",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Il a cinquante ans.", exampleCn: "他五十岁。"
  },
  {
    id: 102,
    fr: "soixante",
    cn: "六十",
    cat: "Les nombres 32–60",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Ma grand-mère a soixante ans.", exampleCn: "我奶奶六十岁。"
  },
  {
    id: 103,
    fr: "le code postal",
    cn: "邮政编码",
    cat: "Les nombres 32–60",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Quel est le code postal de Paris ?", exampleCn: "巴黎的邮政编码是多少？"
  },
  {
    id: 104,
    fr: "le nord",
    cn: "北",
    cat: "Les points cardinaux",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous allons au nord.", exampleCn: "我们往北走。"
  },
  {
    id: 105,
    fr: "le sud",
    cn: "南",
    cat: "Les points cardinaux",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle habite au sud de la France.", exampleCn: "她住在法国南部。"
  },
  {
    id: 106,
    fr: "l'est",
    cn: "东",
    cat: "Les points cardinaux",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Le soleil se lève à l'est.", exampleCn: "太阳从东方升起。"
  },
  {
    id: 107,
    fr: "l'ouest",
    cn: "西",
    cat: "Les points cardinaux",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous allons à l'ouest.", exampleCn: "我们往西走。"
  },
  {
    id: 108,
    fr: "le centre",
    cn: "中心",
    cat: "Les points cardinaux",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "La banque est au centre de la ville.", exampleCn: "银行在市中心。"
  },
  {
    id: 109,
    fr: "écouter",
    cn: "听",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'écoute de la musique.", exampleCn: "我听音乐。"
  },
  {
    id: 110,
    fr: "danser",
    cn: "跳舞",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle danse très bien.", exampleCn: "她跳舞跳得很好。"
  },
  {
    id: 111,
    fr: "aimer",
    cn: "喜欢／爱",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "J'aime le chocolat.", exampleCn: "我喜欢巧克力。"
  },
  {
    id: 112,
    fr: "jouer",
    cn: "玩／踢（球）",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Je joue au football.", exampleCn: "我踢足球。"
  },
  {
    id: 113,
    fr: "travailler",
    cn: "工作／学习",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Mon père travaille à l'école.", exampleCn: "我爸爸在学校工作。"
  },
  {
    id: 114,
    fr: "regarder",
    cn: "看",
    cat: "Les verbes",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Je regarde la télévision le soir.", exampleCn: "我晚上看电视。"
  },
  {
    id: 115,
    fr: "être",
    cn: "是",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Je suis étudiant.", exampleCn: "我是学生。"
  },
  {
    id: 116,
    fr: "allemand(e)",
    cn: "德国的／德国人",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Il est allemand.", exampleCn: "他是德国人。"
  },
  {
    id: 117,
    fr: "anglais(e)",
    cn: "英国的／英国人",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Elle est anglaise.", exampleCn: "她是英国人。"
  },
  {
    id: 118,
    fr: "espagnol(e)",
    cn: "西班牙的／西班牙人",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Mon ami est espagnol.", exampleCn: "我的朋友是西班牙人。"
  },
  {
    id: 119,
    fr: "français(e)",
    cn: "法国的／法国人",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Nous sommes français.", exampleCn: "我们是法国人。"
  },
  {
    id: 120,
    fr: "la capitale",
    cn: "首都",
    cat: "Les nationalités",
    unit: 3,
    theme: "Où habites-tu ?",
    example: "Paris est la capitale de la France.", exampleCn: "巴黎是法国的首都。"
  },
  {
    id: 121,
    fr: "le père",
    cn: "父亲",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Mon père est médecin.", exampleCn: "我爸爸是医生。"
  },
  {
    id: 122,
    fr: "la mère",
    cn: "母亲",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Ma mère travaille à l'école.", exampleCn: "我妈妈在学校工作。"
  },
  {
    id: 123,
    fr: "le frère",
    cn: "兄弟",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "J'ai un frère.", exampleCn: "我有一个兄弟。"
  },
  {
    id: 124,
    fr: "la sœur",
    cn: "姐妹",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "J'ai une sœur.", exampleCn: "我有一个姐妹。"
  },
  {
    id: 125,
    fr: "le grand-père",
    cn: "祖父／外祖父",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Mon grand-père a soixante-dix ans.", exampleCn: "我爷爷七十岁。"
  },
  {
    id: 126,
    fr: "la grand-mère",
    cn: "祖母／外祖母",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Ma grand-mère est gentille.", exampleCn: "我奶奶很和蔼。"
  },
  {
    id: 127,
    fr: "le fils",
    cn: "儿子",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est le fils de ma tante.", exampleCn: "这是我姑姑的儿子。"
  },
  {
    id: 128,
    fr: "la fille",
    cn: "女儿",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est la fille de mon oncle.", exampleCn: "这是我叔叔的女儿。"
  },
  {
    id: 129,
    fr: "le petit-fils",
    cn: "孙子",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est le petit-fils de ma grand-mère.", exampleCn: "这是我奶奶的孙子。"
  },
  {
    id: 130,
    fr: "la petite-fille",
    cn: "孙女",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est la petite-fille de mon grand-père.", exampleCn: "这是我爷爷的孙女。"
  },
  {
    id: 131,
    fr: "l'oncle",
    cn: "叔叔／舅舅",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Mon oncle habite à Lyon.", exampleCn: "我叔叔住在里昂。"
  },
  {
    id: 132,
    fr: "la tante",
    cn: "姑姑／阿姨",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Ma tante est française.", exampleCn: "我姑姑是法国人。"
  },
  {
    id: 133,
    fr: "le cousin",
    cn: "堂／表兄弟",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Mon cousin a dix ans.", exampleCn: "我表弟十岁。"
  },
  {
    id: 134,
    fr: "la cousine",
    cn: "堂／表姐妹",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Ma cousine est sympa.", exampleCn: "我表姐人很好。"
  },
  {
    id: 135,
    fr: "le neveu",
    cn: "侄子／外甥",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est le neveu de mon père.", exampleCn: "这是我爸爸的侄子。"
  },
  {
    id: 136,
    fr: "la nièce",
    cn: "侄女／外甥女",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "C'est la nièce de ma mère.", exampleCn: "这是我妈妈的侄女。"
  },
  {
    id: 137,
    fr: "le mari",
    cn: "丈夫",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Le mari de ma sœur est français.", exampleCn: "我姐姐的丈夫是法国人。"
  },
  {
    id: 138,
    fr: "la femme",
    cn: "妻子",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "La femme de mon frère est gentille.", exampleCn: "我哥哥的妻子很和善。"
  },
  {
    id: 139,
    fr: "le bébé",
    cn: "婴儿",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Le bébé dort.", exampleCn: "宝宝在睡觉。"
  },
  {
    id: 140,
    fr: "les parents",
    cn: "父母",
    cat: "Camille nous présente sa famille",
    unit: 4,
    theme: "Mes proches",
    example: "Mes parents sont à la maison.", exampleCn: "我父母在家。"
  },
  {
    id: 141,
    fr: "soixante",
    cn: "六十",
    cat: "Quel âge ont tes grands-parents ?",
    unit: 4,
    theme: "Mes proches",
    example: "Mon grand-père a soixante ans.", exampleCn: "我爷爷六十岁。"
  },
  {
    id: 142,
    fr: "soixante-dix",
    cn: "七十",
    cat: "Quel âge ont tes grands-parents ?",
    unit: 4,
    theme: "Mes proches",
    example: "Il a soixante-dix ans.", exampleCn: "他七十岁。"
  },
  {
    id: 143,
    fr: "quatre-vingts",
    cn: "八十",
    cat: "Quel âge ont tes grands-parents ?",
    unit: 4,
    theme: "Mes proches",
    example: "Ma grand-mère a quatre-vingts ans.", exampleCn: "我奶奶八十岁。"
  },
  {
    id: 144,
    fr: "quatre-vingt-dix",
    cn: "九十",
    cat: "Quel âge ont tes grands-parents ?",
    unit: 4,
    theme: "Mes proches",
    example: "Elle a quatre-vingt-dix ans.", exampleCn: "她九十岁。"
  },
  {
    id: 145,
    fr: "cent",
    cn: "一百",
    cat: "Quel âge ont tes grands-parents ?",
    unit: 4,
    theme: "Mes proches",
    example: "Il y a cent élèves à l'école.", exampleCn: "学校有一百名学生。"
  },
  {
    id: 146,
    fr: "mon/ma/mes",
    cn: "我的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Ma mère, mon père, mes parents.", exampleCn: "我妈妈、我爸爸、我的父母。"
  },
  {
    id: 147,
    fr: "ton/ta/tes",
    cn: "你的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Ton frère, ta sœur, tes parents.", exampleCn: "你兄弟、你姐妹、你的父母。"
  },
  {
    id: 148,
    fr: "son/sa/ses",
    cn: "他／她的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Son fils, sa fille, ses enfants.", exampleCn: "他/她的儿子、女儿、孩子。"
  },
  {
    id: 149,
    fr: "notre/nos",
    cn: "我们的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Notre maison, nos parents.", exampleCn: "我们的房子、我们的父母。"
  },
  {
    id: 150,
    fr: "votre/vos",
    cn: "你们的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Votre école, vos cahiers.", exampleCn: "你们的学校、你们的练习本。"
  },
  {
    id: 151,
    fr: "leur/leurs",
    cn: "他们的",
    cat: "Ma mère, mon père, mes parents",
    unit: 4,
    theme: "Mes proches",
    example: "Leur fils, leurs parents.", exampleCn: "他们的儿子、他们的父母。"
  },
  {
    id: 152,
    fr: "un bisou",
    cn: "亲吻",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "Je fais un bisou à ma grand-mère.", exampleCn: "我亲了一下我奶奶。"
  },
  {
    id: 153,
    fr: "les joues",
    cn: "脸颊",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "Elle a les joues rouges.", exampleCn: "她脸颊红红的。"
  },
  {
    id: 154,
    fr: "à droite",
    cn: "在右边",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "La pharmacie est à droite.", exampleCn: "药店在右边。"
  },
  {
    id: 155,
    fr: "à gauche",
    cn: "在左边",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "La banque est à gauche.", exampleCn: "银行在左边。"
  },
  {
    id: 156,
    fr: "le matin",
    cn: "早上",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "Je me lave le matin.", exampleCn: "我早上洗漱。"
  },
  {
    id: 157,
    fr: "l'après-midi",
    cn: "下午",
    cat: "Faire la bise",
    unit: 4,
    theme: "Mes proches",
    example: "Je travaille l'après-midi.", exampleCn: "我下午学习。"
  },
  {
    id: 158,
    fr: "grand(e)",
    cn: "高的",
    cat: "Décris ta famille !",
    unit: 4,
    theme: "Mes proches",
    example: "Mon frère est grand.", exampleCn: "我哥哥个子高。"
  },
  {
    id: 159,
    fr: "de taille moyenne",
    cn: "中等身高",
    cat: "Décris ta famille !",
    unit: 4,
    theme: "Mes proches",
    example: "Je suis de taille moyenne.", exampleCn: "我中等身高。"
  },
  {
    id: 160,
    fr: "petit(e)",
    cn: "矮的／小的",
    cat: "Décris ta famille !",
    unit: 4,
    theme: "Mes proches",
    example: "Ma sœur est petite.", exampleCn: "我妹妹个子小。"
  },
  {
    id: 161,
    fr: "un appartement",
    cn: "公寓",
    cat: "Mon domicile",
    unit: 5,
    theme: "Chez moi",
    example: "J'habite dans un appartement.", exampleCn: "我住在一套公寓里。"
  },
  {
    id: 162,
    fr: "une maison",
    cn: "房子",
    cat: "Mon domicile",
    unit: 5,
    theme: "Chez moi",
    example: "Nous habitons dans une maison.", exampleCn: "我们住在一栋房子里。"
  },
  {
    id: 163,
    fr: "un studio",
    cn: "单间公寓",
    cat: "Mon domicile",
    unit: 5,
    theme: "Chez moi",
    example: "Il habite dans un studio.", exampleCn: "他住在一间单间公寓里。"
  },
  {
    id: 164,
    fr: "un pavillon",
    cn: "独立小洋楼",
    cat: "Mon domicile",
    unit: 5,
    theme: "Chez moi",
    example: "Elle habite dans un pavillon.", exampleCn: "她住在一栋独立小楼里。"
  },
  {
    id: 165,
    fr: "la porte d'entrée",
    cn: "大门／入户门",
    cat: "L'entrée",
    unit: 5,
    theme: "Chez moi",
    example: "La porte d'entrée est bleue.", exampleCn: "大门是蓝色的。"
  },
  {
    id: 166,
    fr: "l'escalier (m)",
    cn: "楼梯",
    cat: "L'entrée",
    unit: 5,
    theme: "Chez moi",
    example: "Je monte l'escalier.", exampleCn: "我上楼梯。"
  },
  {
    id: 167,
    fr: "le rez-de-chaussée",
    cn: "一楼（底层）",
    cat: "L'entrée",
    unit: 5,
    theme: "Chez moi",
    example: "Nous habitons au rez-de-chaussée.", exampleCn: "我们住在一楼。"
  },
  {
    id: 168,
    fr: "un réfrigérateur",
    cn: "冰箱",
    cat: "Dans la cuisine",
    unit: 5,
    theme: "Chez moi",
    example: "Le réfrigérateur est dans la cuisine.", exampleCn: "冰箱在厨房里。"
  },
  {
    id: 169,
    fr: "un four",
    cn: "烤箱",
    cat: "Dans la cuisine",
    unit: 5,
    theme: "Chez moi",
    example: "Le four est chaud.", exampleCn: "烤箱很热。"
  },
  {
    id: 170,
    fr: "un four à micro-ondes",
    cn: "微波炉",
    cat: "Dans la cuisine",
    unit: 5,
    theme: "Chez moi",
    example: "Le four à micro-ondes est dans la cuisine.", exampleCn: "微波炉在厨房里。"
  },
  {
    id: 171,
    fr: "un lave-vaisselle",
    cn: "洗碗机",
    cat: "Dans la cuisine",
    unit: 5,
    theme: "Chez moi",
    example: "Le lave-vaisselle est plein.", exampleCn: "洗碗机满了。"
  },
  {
    id: 172,
    fr: "une poubelle",
    cn: "垃圾桶",
    cat: "Dans la cuisine",
    unit: 5,
    theme: "Chez moi",
    example: "La poubelle est dans la cuisine.", exampleCn: "垃圾桶在厨房里。"
  },
  {
    id: 173,
    fr: "une assiette",
    cn: "盘子",
    cat: "Dans la salle à manger",
    unit: 5,
    theme: "Chez moi",
    example: "L'assiette est sur la table.", exampleCn: "盘子在桌子上。"
  },
  {
    id: 174,
    fr: "une fourchette",
    cn: "叉子",
    cat: "Dans la salle à manger",
    unit: 5,
    theme: "Chez moi",
    example: "Je mange avec une fourchette.", exampleCn: "我用叉子吃东西。"
  },
  {
    id: 175,
    fr: "un couteau",
    cn: "刀",
    cat: "Dans la salle à manger",
    unit: 5,
    theme: "Chez moi",
    example: "Coupe le pain avec un couteau.", exampleCn: "用刀切面包。"
  },
  {
    id: 176,
    fr: "le lave-linge",
    cn: "洗衣机",
    cat: "Dans la buanderie",
    unit: 5,
    theme: "Chez moi",
    example: "Je mets les vêtements dans le lave-linge.", exampleCn: "我把衣服放进洗衣机。"
  },
  {
    id: 177,
    fr: "le sèche-linge",
    cn: "烘干机",
    cat: "Dans la buanderie",
    unit: 5,
    theme: "Chez moi",
    example: "Le sèche-linge est dans la buanderie.", exampleCn: "烘干机在洗衣房里。"
  },
  {
    id: 178,
    fr: "le canapé",
    cn: "沙发",
    cat: "Dans le salon/salle de séjour",
    unit: 5,
    theme: "Chez moi",
    example: "Je regarde la télé sur le canapé.", exampleCn: "我在沙发上看电视。"
  },
  {
    id: 179,
    fr: "le fauteuil",
    cn: "扶手椅",
    cat: "Dans le salon/salle de séjour",
    unit: 5,
    theme: "Chez moi",
    example: "Assieds-toi dans le fauteuil.", exampleCn: "坐在扶手椅上。"
  },
  {
    id: 180,
    fr: "la télévision",
    cn: "电视",
    cat: "Dans le salon/salle de séjour",
    unit: 5,
    theme: "Chez moi",
    example: "La télévision est dans le salon.", exampleCn: "电视在客厅里。"
  },
  {
    id: 181,
    fr: "le lavabo",
    cn: "洗手池",
    cat: "Dans la salle de bains",
    unit: 5,
    theme: "Chez moi",
    example: "Je me lave les mains au lavabo.", exampleCn: "我在洗手池洗手。"
  },
  {
    id: 182,
    fr: "la baignoire",
    cn: "浴缸",
    cat: "Dans la salle de bains",
    unit: 5,
    theme: "Chez moi",
    example: "Je prends un bain dans la baignoire.", exampleCn: "我在浴缸里洗澡。"
  },
  {
    id: 183,
    fr: "la douche",
    cn: "淋浴",
    cat: "Dans la salle de bains",
    unit: 5,
    theme: "Chez moi",
    example: "Je prends une douche le matin.", exampleCn: "我早上洗澡。"
  },
  {
    id: 184,
    fr: "le robinet",
    cn: "水龙头",
    cat: "Dans la salle de bains",
    unit: 5,
    theme: "Chez moi",
    example: "Le robinet est ouvert.", exampleCn: "水龙头开着。"
  },
  {
    id: 185,
    fr: "le lit",
    cn: "床",
    cat: "Dans la chambre",
    unit: 5,
    theme: "Chez moi",
    example: "Je dors dans le lit.", exampleCn: "我睡在床上。"
  },
  {
    id: 186,
    fr: "une armoire",
    cn: "衣柜",
    cat: "Dans la chambre",
    unit: 5,
    theme: "Chez moi",
    example: "Mes vêtements sont dans l'armoire.", exampleCn: "我的衣服在衣柜里。"
  },
  {
    id: 187,
    fr: "un réveil",
    cn: "闹钟",
    cat: "Dans la chambre",
    unit: 5,
    theme: "Chez moi",
    example: "Le réveil sonne à sept heures.", exampleCn: "闹钟七点响。"
  },
  {
    id: 188,
    fr: "la pelouse",
    cn: "草坪",
    cat: "Dans le jardin",
    unit: 5,
    theme: "Chez moi",
    example: "L'enfant joue sur la pelouse.", exampleCn: "孩子在草坪上玩。"
  },
  {
    id: 189,
    fr: "un arbre",
    cn: "树",
    cat: "Dans le jardin",
    unit: 5,
    theme: "Chez moi",
    example: "Il y a un arbre dans le jardin.", exampleCn: "花园里有一棵树。"
  },
  {
    id: 190,
    fr: "une terrasse",
    cn: "露台",
    cat: "Dans le jardin",
    unit: 5,
    theme: "Chez moi",
    example: "Nous déjeunons sur la terrasse.", exampleCn: "我们在露台上吃午饭。"
  },
  {
    id: 191,
    fr: "dans",
    cn: "在……里面",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "Le livre est dans le sac.", exampleCn: "书在包里。"
  },
  {
    id: 192,
    fr: "à côté de",
    cn: "在……旁边",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "La banque est à côté de la poste.", exampleCn: "银行在邮局旁边。"
  },
  {
    id: 193,
    fr: "devant",
    cn: "在……前面",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "Je suis devant la maison.", exampleCn: "我在房子前面。"
  },
  {
    id: 194,
    fr: "derrière",
    cn: "在……后面",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "Le jardin est derrière la maison.", exampleCn: "花园在房子后面。"
  },
  {
    id: 195,
    fr: "sur",
    cn: "在……上面",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "Le chat est sur la chaise.", exampleCn: "猫在椅子上。"
  },
  {
    id: 196,
    fr: "sous",
    cn: "在……下面",
    cat: "Où sont mes clés ?",
    unit: 5,
    theme: "Chez moi",
    example: "La balle est sous la table.", exampleCn: "球在桌子下面。"
  },
  {
    id: 197,
    fr: "Je fais le ménage.",
    cn: "我做家务。",
    cat: "Les tâches ménagères",
    unit: 5,
    theme: "Chez moi",
    example: "Le samedi, je fais le ménage.", exampleCn: "周六我做家务。"
  },
  {
    id: 198,
    fr: "Je fais la cuisine.",
    cn: "我做饭。",
    cat: "Les tâches ménagères",
    unit: 5,
    theme: "Chez moi",
    example: "Je fais la cuisine avec ma mère.", exampleCn: "我和妈妈一起做饭。"
  },
  {
    id: 199,
    fr: "Je fais la vaisselle.",
    cn: "我洗碗。",
    cat: "Les tâches ménagères",
    unit: 5,
    theme: "Chez moi",
    example: "Après le dîner, je fais la vaisselle.", exampleCn: "晚饭后我洗碗。"
  },
  {
    id: 200,
    fr: "Je passe l'aspirateur.",
    cn: "我吸尘。",
    cat: "Les tâches ménagères",
    unit: 5,
    theme: "Chez moi",
    example: "Je passe l'aspirateur dans le salon.", exampleCn: "我在客厅用吸尘器。"
  },
  {
    id: 201,
    fr: "Je me réveille.",
    cn: "我醒了。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me réveille à sept heures.", exampleCn: "我七点醒来。"
  },
  {
    id: 202,
    fr: "Je me lève.",
    cn: "我起床。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me lève à sept heures et demie.", exampleCn: "我七点半起床。"
  },
  {
    id: 203,
    fr: "Je me lave.",
    cn: "我洗漱。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me lave avant de manger.", exampleCn: "我饭前洗漱。"
  },
  {
    id: 204,
    fr: "Je me douche.",
    cn: "我淋浴。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me douche le soir.", exampleCn: "我晚上洗澡。"
  },
  {
    id: 205,
    fr: "Je me brosse les dents.",
    cn: "我刷牙。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me brosse les dents après le dîner.", exampleCn: "我晚饭后刷牙。"
  },
  {
    id: 206,
    fr: "Je m'habille.",
    cn: "我穿衣服。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je m'habille à huit heures.", exampleCn: "我八点穿衣服。"
  },
  {
    id: 207,
    fr: "Je prends mon petit déjeuner.",
    cn: "我吃早餐。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je prends mon petit déjeuner à huit heures.", exampleCn: "我八点吃早餐。"
  },
  {
    id: 208,
    fr: "Je quitte la maison.",
    cn: "我离开家。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je quitte la maison à huit heures et demie.", exampleCn: "我八点半离家。"
  },
  {
    id: 209,
    fr: "J'arrive à l'école.",
    cn: "我到学校。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "J'arrive à l'école à neuf heures.", exampleCn: "我九点到学校。"
  },
  {
    id: 210,
    fr: "Je rentre à la maison.",
    cn: "我回家。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je rentre à la maison à midi.", exampleCn: "我中午回家。"
  },
  {
    id: 211,
    fr: "Je fais mes devoirs.",
    cn: "我做作业。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je fais mes devoirs le soir.", exampleCn: "我晚上做作业。"
  },
  {
    id: 212,
    fr: "Je dîne.",
    cn: "我吃晚饭。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je dîne à sept heures.", exampleCn: "我七点吃晚饭。"
  },
  {
    id: 213,
    fr: "Je me repose.",
    cn: "我休息。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me repose après les devoirs.", exampleCn: "做完作业后我休息。"
  },
  {
    id: 214,
    fr: "Je me déshabille.",
    cn: "我脱衣服。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me déshabille avant de dormir.", exampleCn: "睡觉前我脱衣服。"
  },
  {
    id: 215,
    fr: "Je me couche.",
    cn: "我上床睡觉。",
    cat: "Les activités quotidiennes",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me couche à dix heures.", exampleCn: "我十点上床睡觉。"
  },
  {
    id: 216,
    fr: "à une heure",
    cn: "一点钟",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Le cours commence à une heure.", exampleCn: "课一点开始。"
  },
  {
    id: 217,
    fr: "à deux heures",
    cn: "两点钟",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "J'ai un rendez-vous à deux heures.", exampleCn: "我两点有个约会。"
  },
  {
    id: 218,
    fr: "cinq heures et quart",
    cn: "五点一刻",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Il est cinq heures et quart.", exampleCn: "现在五点一刻。"
  },
  {
    id: 219,
    fr: "huit heures et demie",
    cn: "八点半",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Il est huit heures et demie.", exampleCn: "现在八点半。"
  },
  {
    id: 220,
    fr: "moins le quart",
    cn: "差一刻（差十五分）",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Il est midi moins le quart.", exampleCn: "现在差一刻十二点。"
  },
  {
    id: 221,
    fr: "à midi",
    cn: "在中午",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je mange à midi.", exampleCn: "我中午吃饭。"
  },
  {
    id: 222,
    fr: "à minuit",
    cn: "在午夜",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me couche à minuit.", exampleCn: "我午夜才睡。"
  },
  {
    id: 223,
    fr: "le matin",
    cn: "早上",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je me réveille tôt le matin.", exampleCn: "我早上醒得早。"
  },
  {
    id: 224,
    fr: "l'après-midi",
    cn: "下午",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je joue au foot l'après-midi.", exampleCn: "我下午踢足球。"
  },
  {
    id: 225,
    fr: "le soir",
    cn: "晚上",
    cat: "Pour dire l'heure",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je regarde la télé le soir.", exampleCn: "我晚上看电视。"
  },
  {
    id: 226,
    fr: "à pied",
    cn: "步行",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je vais à l'école à pied.", exampleCn: "我走路去上学。"
  },
  {
    id: 227,
    fr: "à vélo",
    cn: "骑自行车",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Il va au travail à vélo.", exampleCn: "他骑自行车上班。"
  },
  {
    id: 228,
    fr: "en avion",
    cn: "乘飞机",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Nous allons en France en avion.", exampleCn: "我们坐飞机去法国。"
  },
  {
    id: 229,
    fr: "en bus",
    cn: "乘公共汽车",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je vais à l'école en bus.", exampleCn: "我坐公交去上学。"
  },
  {
    id: 230,
    fr: "en métro",
    cn: "乘地铁",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Elle va au travail en métro.", exampleCn: "她坐地铁上班。"
  },
  {
    id: 231,
    fr: "en train",
    cn: "乘火车",
    cat: "Les moyens de transport",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Nous allons à Paris en train.", exampleCn: "我们坐火车去巴黎。"
  },
  {
    id: 232,
    fr: "choisir",
    cn: "选择",
    cat: "Pour bien réfléchir",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je choisis un cadeau pour ma mère.", exampleCn: "我给妈妈挑一件礼物。"
  },
  {
    id: 233,
    fr: "finir",
    cn: "结束，完成",
    cat: "Pour bien réfléchir",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je finis mes devoirs à huit heures.", exampleCn: "我八点做完作业。"
  },
  {
    id: 234,
    fr: "réfléchir",
    cn: "思考，考虑",
    cat: "Pour bien réfléchir",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je réfléchis avant de répondre.", exampleCn: "我回答前先想一想。"
  },
  {
    id: 235,
    fr: "réunir",
    cn: "集合，聚集",
    cat: "Pour bien réfléchir",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Elle réunit sa famille.", exampleCn: "她把家人聚在一起。"
  },
  {
    id: 236,
    fr: "car",
    cn: "因为",
    cat: "Pendant la journée",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Je reste à la maison car il pleut.", exampleCn: "我待在家里，因为在下雨。"
  },
  {
    id: 237,
    fr: "donc",
    cn: "所以，因此",
    cat: "Pendant la journée",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Il pleut, donc je prends un parapluie.", exampleCn: "下雨了，所以我带把伞。"
  },
  {
    id: 238,
    fr: "mais",
    cn: "但是",
    cat: "Pendant la journée",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "J'aime le français, mais c'est difficile.", exampleCn: "我喜欢法语，但它很难。"
  },
  {
    id: 239,
    fr: "ou",
    cn: "或者",
    cat: "Pendant la journée",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "Tu veux du thé ou du café ?", exampleCn: "你要茶还是咖啡？"
  },
  {
    id: 240,
    fr: "parce que",
    cn: "因为",
    cat: "Pendant la journée",
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    example: "J'aime l'été parce qu'il fait chaud.", exampleCn: "我喜欢夏天，因为天气热。"
  },
  {
    id: 241,
    fr: "Est-ce que tu fais de l'exercice ?",
    cn: "你锻炼吗？",
    cat: "Le livre de l'élève",
    unit: 7,
    theme: "Mes coups de cœur",
    example: "Est-ce que tu fais de l'exercice chaque matin ?", exampleCn: "你每天早上锻炼吗？"
  },
  {
    id: 242,
    fr: "faire de l'exercice",
    cn: "做运动，锻炼",
    cat: "Le livre de l'élève",
    unit: 7,
    theme: "Mes coups de cœur",
    example: "Je fais de l'exercice pour être en forme.", exampleCn: "我锻炼身体保持健康。"
  },
  {
    id: 243,
    fr: "les mathématiques (f)",
    cn: "数学",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "J'aime les mathématiques.", exampleCn: "我喜欢数学。"
  },
  {
    id: 244,
    fr: "les sciences (f)",
    cn: "理科，科学",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "Les sciences sont intéressantes.", exampleCn: "理科很有趣。"
  },
  {
    id: 245,
    fr: "la géographie",
    cn: "地理",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "La géographie est utile.", exampleCn: "地理很有用。"
  },
  {
    id: 246,
    fr: "le français",
    cn: "法语（课）",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "J'apprends le français à l'école.", exampleCn: "我在学校学法语。"
  },
  {
    id: 247,
    fr: "l'anglais (m)",
    cn: "英语（课）",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "Je parle un peu d'anglais.", exampleCn: "我会说一点英语。"
  },
  {
    id: 248,
    fr: "l'histoire (f)",
    cn: "历史",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "L'histoire de France est intéressante.", exampleCn: "法国历史很有趣。"
  },
  {
    id: 249,
    fr: "l'espagnol (m)",
    cn: "西班牙语",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "Mon frère apprend l'espagnol.", exampleCn: "我哥哥学西班牙语。"
  },
  {
    id: 250,
    fr: "l'allemand (m)",
    cn: "德语",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "L'allemand est difficile.", exampleCn: "德语很难。"
  },
  {
    id: 251,
    fr: "le dessin",
    cn: "绘画（课）",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "J'aime le cours de dessin.", exampleCn: "我喜欢绘画课。"
  },
  {
    id: 252,
    fr: "l'informatique (f)",
    cn: "信息技术（课）",
    cat: "Les matières",
    unit: 8,
    theme: "Mes études",
    example: "J'étudie l'informatique à l'école.", exampleCn: "我在学校学信息技术。"
  },
  {
    id: 253,
    fr: "J'aime...",
    cn: "我喜欢……",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "J'aime le sport et la musique.", exampleCn: "我喜欢运动和音乐。"
  },
  {
    id: 254,
    fr: "Je n'aime pas...",
    cn: "我不喜欢……",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Je n'aime pas les mathématiques.", exampleCn: "我不喜欢数学。"
  },
  {
    id: 255,
    fr: "J'adore...",
    cn: "我非常喜欢……",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "J'adore le chocolat !", exampleCn: "我非常喜欢巧克力！"
  },
  {
    id: 256,
    fr: "Je déteste...",
    cn: "我讨厌……",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Je déteste la pluie.", exampleCn: "我讨厌下雨。"
  },
  {
    id: 257,
    fr: "parce que",
    cn: "因为",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Je n'aime pas les maths parce que c'est difficile.", exampleCn: "我不喜欢数学因为太难了。"
  },
  {
    id: 258,
    fr: "utile",
    cn: "有用的",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Le dictionnaire est utile.", exampleCn: "字典很有用。"
  },
  {
    id: 259,
    fr: "difficile",
    cn: "难的",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Les mathématiques sont difficiles.", exampleCn: "数学很难。"
  },
  {
    id: 260,
    fr: "intéressant",
    cn: "有趣的",
    cat: "Le système scolaire en France",
    unit: 8,
    theme: "Mes études",
    example: "Ce livre est intéressant.", exampleCn: "这本书很有趣。"
  },
  {
    id: 261,
    fr: "plus... que",
    cn: "比……更",
    cat: "Les sciences sont plus difficiles que les maths,…",
    unit: 8,
    theme: "Mes études",
    example: "Les sciences sont plus difficiles que les maths.", exampleCn: "理科比数学难。"
  },
  {
    id: 262,
    fr: "moins... que",
    cn: "不如……，比……少",
    cat: "Les sciences sont plus difficiles que les maths,…",
    unit: 8,
    theme: "Mes études",
    example: "Le français est moins difficile que l'allemand.", exampleCn: "法语没有德语难。"
  },
  {
    id: 263,
    fr: "aussi... que",
    cn: "和……一样",
    cat: "Les sciences sont plus difficiles que les maths,…",
    unit: 8,
    theme: "Mes études",
    example: "Elle est aussi intelligente que son frère.", exampleCn: "她和她哥哥一样聪明。"
  },
  {
    id: 264,
    fr: "travailleur / travailleuse",
    cn: "勤奋的（男/女）",
    cat: "Les sciences sont plus difficiles que les maths,…",
    unit: 8,
    theme: "Mes études",
    example: "Mon frère est travailleur.", exampleCn: "我哥哥很勤奋。"
  },
  {
    id: 265,
    fr: "créatif / créative",
    cn: "有创造力的（男/女）",
    cat: "Les sciences sont plus difficiles que les maths,…",
    unit: 8,
    theme: "Mes études",
    example: "Ma sœur est créative.", exampleCn: "我妹妹很有创造力。"
  },
  {
    id: 266,
    fr: "la salle de classe",
    cn: "教室",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "La salle de classe est grande.", exampleCn: "教室很大。"
  },
  {
    id: 267,
    fr: "la bibliothèque",
    cn: "图书馆",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Je lis des livres à la bibliothèque.", exampleCn: "我在图书馆看书。"
  },
  {
    id: 268,
    fr: "le gymnase",
    cn: "体育馆",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Nous faisons du sport dans le gymnase.", exampleCn: "我们在体育馆运动。"
  },
  {
    id: 269,
    fr: "la piscine",
    cn: "游泳池",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Je nage dans la piscine de l'école.", exampleCn: "我在学校游泳池游泳。"
  },
  {
    id: 270,
    fr: "la cantine",
    cn: "食堂",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Je mange à la cantine à midi.", exampleCn: "我中午在学校食堂吃饭。"
  },
  {
    id: 271,
    fr: "le laboratoire",
    cn: "实验室",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Nous travaillons dans le laboratoire.", exampleCn: "我们在实验室做实验。"
  },
  {
    id: 272,
    fr: "il y a",
    cn: "有（表示存在）",
    cat: "Les installations scolaires",
    unit: 8,
    theme: "Mes études",
    example: "Il y a une bibliothèque dans mon école.", exampleCn: "我的学校里有一个图书馆。"
  },
  {
    id: 273,
    fr: "On doit...",
    cn: "我们必须……",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "On doit faire les devoirs.", exampleCn: "我们必须做作业。"
  },
  {
    id: 274,
    fr: "porter un uniforme",
    cn: "穿校服",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "On doit porter un uniforme à l'école.", exampleCn: "在学校必须穿校服。"
  },
  {
    id: 275,
    fr: "arriver à l'heure",
    cn: "准时到",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "Je dois arriver à l'heure à l'école.", exampleCn: "我必须准时到校。"
  },
  {
    id: 276,
    fr: "faire les devoirs",
    cn: "做作业",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "On doit faire les devoirs chaque soir.", exampleCn: "每天晚上都必须做作业。"
  },
  {
    id: 277,
    fr: "être respectueux",
    cn: "有礼貌，尊敬他人",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "On doit être respectueux avec les profs.", exampleCn: "我们必须尊敬老师。"
  },
  {
    id: 278,
    fr: "Il est interdit de/d'...",
    cn: "禁止……",
    cat: "Le règlement scolaire",
    unit: 8,
    theme: "Mes études",
    example: "Il est interdit de manger en classe.", exampleCn: "教室里禁止吃东西。"
  },
  {
    id: 279,
    fr: "la récréation",
    cn: "课间休息",
    cat: "La journée scolaire de Camille",
    unit: 8,
    theme: "Mes études",
    example: "La récréation est à dix heures.", exampleCn: "课间休息在十点。"
  },
  {
    id: 280,
    fr: "la pause-déjeuner",
    cn: "午餐休息",
    cat: "La journée scolaire de Camille",
    unit: 8,
    theme: "Mes études",
    example: "La pause-déjeuner est à midi.", exampleCn: "午餐休息在中午。"
  },
  {
    id: 281,
    fr: "commencer",
    cn: "开始",
    cat: "La journée scolaire de Camille",
    unit: 8,
    theme: "Mes études",
    example: "Les cours commencent à neuf heures.", exampleCn: "课程九点开始。"
  },
  {
    id: 282,
    fr: "finir",
    cn: "结束",
    cat: "La journée scolaire de Camille",
    unit: 8,
    theme: "Mes études",
    example: "Les cours finissent à cinq heures.", exampleCn: "课程五点结束。"
  },
  {
    id: 283,
    fr: "la nourriture",
    cn: "食物",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "La nourriture française est délicieuse.", exampleCn: "法国食物很美味。"
  },
  {
    id: 284,
    fr: "délicieux / délicieuse",
    cn: "美味的（男/女）",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Ce gâteau est délicieux.", exampleCn: "这个蛋糕很好吃。"
  },
  {
    id: 285,
    fr: "un croissant",
    cn: "牛角包",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange un croissant le matin.", exampleCn: "我早上吃一个牛角包。"
  },
  {
    id: 286,
    fr: "un éclair",
    cn: "闪电泡芙",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "J'adore les éclairs au chocolat.", exampleCn: "我很喜欢巧克力闪电泡芙。"
  },
  {
    id: 287,
    fr: "la quiche lorraine",
    cn: "洛林咸派",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "La quiche lorraine est un plat français.", exampleCn: "洛林咸派是一道法国菜。"
  },
  {
    id: 288,
    fr: "les cuisses de grenouilles",
    cn: "青蛙腿",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Il a mangé des cuisses de grenouilles.", exampleCn: "他吃了青蛙腿。"
  },
  {
    id: 289,
    fr: "les escargots (m)",
    cn: "蜗牛",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "J'aime les escargots.", exampleCn: "我喜欢吃蜗牛。"
  },
  {
    id: 290,
    fr: "l'omelette (f)",
    cn: "煎蛋卷",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Je fais une omelette au petit déjeuner.", exampleCn: "我早餐做煎蛋卷。"
  },
  {
    id: 291,
    fr: "manger",
    cn: "吃",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange une pomme.", exampleCn: "我吃一个苹果。"
  },
  {
    id: 292,
    fr: "boire",
    cn: "喝",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je bois un verre d'eau.", exampleCn: "我喝一杯水。"
  },
  {
    id: 293,
    fr: "préférer",
    cn: "更喜欢",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je préfère le thé au café.", exampleCn: "比起咖啡我更喜欢茶。"
  },
  {
    id: 294,
    fr: "un bol",
    cn: "一碗",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange un bol de céréales.", exampleCn: "我吃一碗麦片。"
  },
  {
    id: 295,
    fr: "des céréales (f)",
    cn: "麦片，谷物",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Les céréales sont bonnes pour la santé.", exampleCn: "麦片对健康有益。"
  },
  {
    id: 296,
    fr: "une tartine",
    cn: "抹黄油/果酱的面包片",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange une tartine avec du beurre.", exampleCn: "我吃一片抹黄油的面包。"
  },
  {
    id: 297,
    fr: "du beurre",
    cn: "黄油",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mets du beurre sur le pain.", exampleCn: "我在面包上抹黄油。"
  },
  {
    id: 298,
    fr: "de la confiture",
    cn: "果酱",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "J'aime la confiture de fraises.", exampleCn: "我喜欢草莓酱。"
  },
  {
    id: 299,
    fr: "du pain grillé",
    cn: "烤面包，吐司",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange du pain grillé au petit déjeuner.", exampleCn: "我早餐吃烤面包。"
  },
  {
    id: 300,
    fr: "du lait",
    cn: "牛奶",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je bois du lait le matin.", exampleCn: "我早上喝牛奶。"
  },
  {
    id: 301,
    fr: "un sandwich (au jambon)",
    cn: "火腿三明治",
    cat: "Le petit déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je prends un sandwich au jambon.", exampleCn: "我吃一个火腿三明治。"
  },
  {
    id: 302,
    fr: "un morceau",
    cn: "一块",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Je prends un morceau de gâteau.", exampleCn: "我拿了一块蛋糕。"
  },
  {
    id: 303,
    fr: "une boîte",
    cn: "一盒，一罐",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "J'achète une boîte de chocolats.", exampleCn: "我买了一盒巧克力。"
  },
  {
    id: 304,
    fr: "une bouteille",
    cn: "一瓶",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Elle boit une bouteille d'eau.", exampleCn: "她喝了一瓶水。"
  },
  {
    id: 305,
    fr: "Bon appétit !",
    cn: "祝你好胃口！",
    cat: "La nourriture fait partie de notre culture !",
    unit: 9,
    theme: "On marche bien",
    example: "Bon appétit !", exampleCn: "祝你好胃口！"
  },
  {
    id: 306,
    fr: "la salade mixte",
    cn: "什锦沙拉",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je prends une salade mixte.", exampleCn: "我要一份什锦沙拉。"
  },
  {
    id: 307,
    fr: "le poulet",
    cn: "鸡肉",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Le poulet est délicieux.", exampleCn: "鸡肉很好吃。"
  },
  {
    id: 308,
    fr: "les légumes",
    cn: "蔬菜",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange des légumes chaque jour.", exampleCn: "我每天吃蔬菜。"
  },
  {
    id: 309,
    fr: "le riz",
    cn: "米饭",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Nous mangeons du riz et du poulet.", exampleCn: "我们吃米饭和鸡肉。"
  },
  {
    id: 310,
    fr: "le dessert",
    cn: "甜点",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je prends un dessert après le repas.", exampleCn: "饭后我吃甜点。"
  },
  {
    id: 311,
    fr: "la crème caramel",
    cn: "焦糖布丁",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "La crème caramel est mon dessert préféré.", exampleCn: "焦糖布丁是我最喜欢的甜点。"
  },
  {
    id: 312,
    fr: "la cantine",
    cn: "食堂",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange à la cantine.", exampleCn: "我在食堂吃饭。"
  },
  {
    id: 313,
    fr: "un menu",
    cn: "菜单，套餐",
    cat: "Le déjeuner",
    unit: 9,
    theme: "On marche bien",
    example: "Voici le menu du jour.", exampleCn: "这是今日菜单。"
  },
  {
    id: 314,
    fr: "je préfère le beurre à la confiture.",
    cn: "相比果酱我更喜欢黄油。",
    cat: "Tu préfères les fruits ou les légumes ?",
    unit: 9,
    theme: "On marche bien",
    example: "Je préfère le beurre à la confiture.", exampleCn: "比起果酱我更喜欢黄油。"
  },
  {
    id: 315,
    fr: "le dîner",
    cn: "晚餐",
    cat: "Le repas du soir",
    unit: 9,
    theme: "On marche bien",
    example: "Le dîner est à sept heures.", exampleCn: "晚饭七点吃。"
  },
  {
    id: 316,
    fr: "dîner (v)",
    cn: "吃晚饭（动词）",
    cat: "Le repas du soir",
    unit: 9,
    theme: "On marche bien",
    example: "Nous dînons à sept heures.", exampleCn: "我们七点吃晚饭。"
  },
  {
    id: 317,
    fr: "les lasagnes",
    cn: "千层面",
    cat: "Le repas du soir",
    unit: 9,
    theme: "On marche bien",
    example: "J'aime les lasagnes de ma mère.", exampleCn: "我喜欢妈妈做的千层面。"
  },
  {
    id: 318,
    fr: "le saumon avec des pommes de terre",
    cn: "三文鱼配土豆",
    cat: "Le repas du soir",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange du saumon avec des pommes de terre.", exampleCn: "我吃三文鱼配土豆。"
  },
  {
    id: 319,
    fr: "les pâtes à la carbonara",
    cn: "卡邦尼意面",
    cat: "Le repas du soir",
    unit: 9,
    theme: "On marche bien",
    example: "Nous mangeons des pâtes à la carbonara.", exampleCn: "我们吃卡邦尼意面。"
  },
  {
    id: 320,
    fr: "J'ai faim.",
    cn: "我饿了。",
    cat: "Le goûter",
    unit: 9,
    theme: "On marche bien",
    example: "J'ai faim, je vais manger.", exampleCn: "我饿了，我要去吃饭。"
  },
  {
    id: 321,
    fr: "un biscuit",
    cn: "饼干",
    cat: "Le goûter",
    unit: 9,
    theme: "On marche bien",
    example: "Je mange un biscuit au goûter.", exampleCn: "我下午吃点心时吃一块饼干。"
  },
  {
    id: 322,
    fr: "du Nutella®",
    cn: "Nutella 榛子巧克力酱",
    cat: "Le goûter",
    unit: 9,
    theme: "On marche bien",
    example: "J'aime le Nutella sur le pain.", exampleCn: "我喜欢面包上抹Nutella。"
  },
  {
    id: 323,
    fr: "la bibliothèque",
    cn: "图书馆",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je vais à la bibliothèque de la ville.", exampleCn: "我去市图书馆。"
  },
  {
    id: 324,
    fr: "le commissariat",
    cn: "警察局",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Le commissariat est en face de la banque.", exampleCn: "警察局在银行对面。"
  },
  {
    id: 325,
    fr: "la place",
    cn: "广场",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Il y a un marché sur la place.", exampleCn: "广场上有一个市场。"
  },
  {
    id: 326,
    fr: "le pont",
    cn: "桥",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Nous traversons le pont.", exampleCn: "我们过桥。"
  },
  {
    id: 327,
    fr: "l'église (f)",
    cn: "教堂",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "L'église est au centre de la ville.", exampleCn: "教堂在市中心。"
  },
  {
    id: 328,
    fr: "la cathédrale",
    cn: "大教堂",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "La cathédrale est très ancienne.", exampleCn: "这座大教堂很古老。"
  },
  {
    id: 329,
    fr: "le centre sportif",
    cn: "体育中心",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je joue au tennis au centre sportif.", exampleCn: "我在体育中心打网球。"
  },
  {
    id: 330,
    fr: "l'hôtel de ville (m)",
    cn: "市政厅",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "L'hôtel de ville est en face du parc.", exampleCn: "市政厅在公园对面。"
  },
  {
    id: 331,
    fr: "l'office de tourisme (m)",
    cn: "旅游咨询处",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je vais à l'office de tourisme.", exampleCn: "我去旅游咨询处。"
  },
  {
    id: 332,
    fr: "l'hôtel (m)",
    cn: "旅馆，酒店",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Nous dormons à l'hôtel.", exampleCn: "我们住在酒店。"
  },
  {
    id: 333,
    fr: "le parc",
    cn: "公园",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je me promène dans le parc.", exampleCn: "我在公园散步。"
  },
  {
    id: 334,
    fr: "le cinéma",
    cn: "电影院",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je vais au cinéma le samedi.", exampleCn: "我周六去看电影。"
  },
  {
    id: 335,
    fr: "le musée",
    cn: "博物馆",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Nous visitons le musée d'Orsay.", exampleCn: "我们参观奥赛博物馆。"
  },
  {
    id: 336,
    fr: "la piscine",
    cn: "游泳池",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je nage à la piscine.", exampleCn: "我在游泳池游泳。"
  },
  {
    id: 337,
    fr: "le stade",
    cn: "体育场",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Le stade est derrière l'école.", exampleCn: "体育场在学校后面。"
  },
  {
    id: 338,
    fr: "la gare",
    cn: "火车站",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je prends le train à la gare.", exampleCn: "我在火车站坐火车。"
  },
  {
    id: 339,
    fr: "l'hôpital (m)",
    cn: "医院",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "L'hôpital est à côté de la pharmacie.", exampleCn: "医院在药店旁边。"
  },
  {
    id: 340,
    fr: "le château",
    cn: "城堡",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Nous visitons le château.", exampleCn: "我们参观城堡。"
  },
  {
    id: 341,
    fr: "la librairie",
    cn: "书店",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "J'achète un livre à la librairie.", exampleCn: "我在书店买书。"
  },
  {
    id: 342,
    fr: "le restaurant",
    cn: "餐厅",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Nous mangeons au restaurant.", exampleCn: "我们在餐厅吃饭。"
  },
  {
    id: 343,
    fr: "le centre commercial",
    cn: "购物中心",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Le centre commercial est ouvert le dimanche.", exampleCn: "购物中心周日营业。"
  },
  {
    id: 344,
    fr: "le marché",
    cn: "市场",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Le marché est le dimanche matin.", exampleCn: "市场在周日早上。"
  },
  {
    id: 345,
    fr: "la banque",
    cn: "银行",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Où se trouve la banque ?", exampleCn: "银行在哪里？"
  },
  {
    id: 346,
    fr: "la poste",
    cn: "邮局",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "La poste est à côté de la banque.", exampleCn: "邮局在银行旁边。"
  },
  {
    id: 347,
    fr: "la pharmacie",
    cn: "药店",
    cat: "Les endroits de la ville",
    unit: 10,
    theme: "En ville",
    example: "Je vais à la pharmacie.", exampleCn: "我去药店。"
  },
  {
    id: 348,
    fr: "au centre de",
    cn: "在……中心",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "La banque est au centre de la ville.", exampleCn: "银行在市中心。"
  },
  {
    id: 349,
    fr: "à côté de",
    cn: "在……旁边",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "Le café est à côté de l'école.", exampleCn: "咖啡馆在学校旁边。"
  },
  {
    id: 350,
    fr: "en face de",
    cn: "在……对面",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "Le musée est en face de la gare.", exampleCn: "博物馆在火车站对面。"
  },
  {
    id: 351,
    fr: "à gauche de",
    cn: "在……左边",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "La poste est à gauche de la banque.", exampleCn: "邮局在银行左边。"
  },
  {
    id: 352,
    fr: "à droite de",
    cn: "在……右边",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "L'hôtel est à droite de la place.", exampleCn: "酒店在广场右边。"
  },
  {
    id: 353,
    fr: "au coin de",
    cn: "在……拐角处",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "Le café est au coin de la rue.", exampleCn: "咖啡馆在街角。"
  },
  {
    id: 354,
    fr: "devant",
    cn: "在……前面",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "Je suis devant le cinéma.", exampleCn: "我在电影院前面。"
  },
  {
    id: 355,
    fr: "derrière",
    cn: "在……后面",
    cat: "Où se trouve la banque ?",
    unit: 10,
    theme: "En ville",
    example: "Le parking est derrière le stade.", exampleCn: "停车场在体育场后面。"
  },
  {
    id: 356,
    fr: "Continuez tout droit",
    cn: "一直往前走",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Continuez tout droit, s'il vous plaît.", exampleCn: "请一直往前走。"
  },
  {
    id: 357,
    fr: "Tournez à droite",
    cn: "向右转",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Tournez à droite au feu.", exampleCn: "在红绿灯处右转。"
  },
  {
    id: 358,
    fr: "Tournez à gauche",
    cn: "向左转",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Tournez à gauche à la première rue.", exampleCn: "在第一条街左转。"
  },
  {
    id: 359,
    fr: "Traversez la rue",
    cn: "穿过街道",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Traversez la rue avec moi.", exampleCn: "和我一起过马路。"
  },
  {
    id: 360,
    fr: "Prenez la première rue à droite",
    cn: "走右边第一条街",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Prenez la première rue à droite.", exampleCn: "走右边第一条街。"
  },
  {
    id: 361,
    fr: "Continuez jusqu'aux feux",
    cn: "一直走到红绿灯处",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Continuez jusqu'aux feux.", exampleCn: "一直走到红绿灯。"
  },
  {
    id: 362,
    fr: "Continuez jusqu'au rond-point",
    cn: "一直走到环岛处",
    cat: "Les directions",
    unit: 10,
    theme: "En ville",
    example: "Continuez jusqu'au rond-point.", exampleCn: "一直走到环岛。"
  },
  {
    id: 363,
    fr: "le marché",
    cn: "市场",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je vais au marché le samedi.", exampleCn: "我周六去市场。"
  },
  {
    id: 364,
    fr: "l'hypermarché (m)",
    cn: "大型超市",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Nous faisons les courses à l'hypermarché.", exampleCn: "我们去大超市采购。"
  },
  {
    id: 365,
    fr: "bon marché",
    cn: "便宜的",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Les légumes sont bon marché au marché.", exampleCn: "市场上的蔬菜很便宜。"
  },
  {
    id: 366,
    fr: "des produits frais",
    cn: "新鲜产品",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'achète des produits frais.", exampleCn: "我买新鲜产品。"
  },
  {
    id: 367,
    fr: "un produit",
    cn: "产品",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Ce produit est français.", exampleCn: "这个产品是法国产的。"
  },
  {
    id: 368,
    fr: "un prix",
    cn: "价格",
    cat: "Au supermarché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Quel est le prix de ce fromage ?", exampleCn: "这个奶酪多少钱？"
  },
  {
    id: 369,
    fr: "le marchand de fruits et légumes",
    cn: "果蔬商贩",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'achète des pommes chez le marchand de fruits.", exampleCn: "我在水果商那里买苹果。"
  },
  {
    id: 370,
    fr: "le boucher",
    cn: "肉贩",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le boucher vend de la viande.", exampleCn: "肉贩卖肉。"
  },
  {
    id: 371,
    fr: "le boulanger",
    cn: "面包师",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le boulanger vend du pain.", exampleCn: "面包师卖面包。"
  },
  {
    id: 372,
    fr: "le marchand de charcuterie",
    cn: "熟食肉制品商贩",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'achète du jambon chez le marchand de charcuterie.", exampleCn: "我在熟食店买火腿。"
  },
  {
    id: 373,
    fr: "le marchand de produits laitiers",
    cn: "乳制品商贩",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je vais chez le marchand de produits laitiers.", exampleCn: "我去乳制品店。"
  },
  {
    id: 374,
    fr: "le client / la cliente",
    cn: "顾客（男/女）",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le client achète une baguette.", exampleCn: "顾客买了一根法棍。"
  },
  {
    id: 375,
    fr: "les quantités (f)",
    cn: "数量",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Quelles quantités voulez-vous ?", exampleCn: "您要多少量？"
  },
  {
    id: 376,
    fr: "un kilo",
    cn: "一公斤",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je voudrais un kilo de pommes.", exampleCn: "我想要一公斤苹果。"
  },
  {
    id: 377,
    fr: "un gramme",
    cn: "一克",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je voudrais cent grammes de fromage.", exampleCn: "我想要一百克奶酪。"
  },
  {
    id: 378,
    fr: "une bouteille",
    cn: "一瓶",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Une bouteille de vin, s'il vous plaît.", exampleCn: "请给我一瓶葡萄酒。"
  },
  {
    id: 379,
    fr: "un litre",
    cn: "一升",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Un litre de lait, s'il vous plaît.", exampleCn: "请给我一升牛奶。"
  },
  {
    id: 380,
    fr: "un pot",
    cn: "一罐，一壶",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Un pot de confiture, s'il vous plaît.", exampleCn: "请给我一罐果酱。"
  },
  {
    id: 381,
    fr: "une douzaine",
    cn: "一打（十二个）",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Une douzaine d'œufs, s'il vous plaît.", exampleCn: "请给我一打鸡蛋。"
  },
  {
    id: 382,
    fr: "une boîte",
    cn: "一盒",
    cat: "Au marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Une boîte de chocolats, s'il vous plaît.", exampleCn: "请给我一盒巧克力。"
  },
  {
    id: 383,
    fr: "l'ail (m)",
    cn: "大蒜",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je n'aime pas l'ail.", exampleCn: "我不喜欢大蒜。"
  },
  {
    id: 384,
    fr: "l'asperge (f)",
    cn: "芦笋",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Les asperges sont chères en hiver.", exampleCn: "冬天芦笋很贵。"
  },
  {
    id: 385,
    fr: "l'aubergine (f)",
    cn: "茄子",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'aime l'aubergine grillée.", exampleCn: "我喜欢烤茄子。"
  },
  {
    id: 386,
    fr: "les épinards (m)",
    cn: "菠菜",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je mange des épinards.", exampleCn: "我吃菠菜。"
  },
  {
    id: 387,
    fr: "l'oignon (m)",
    cn: "洋葱",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je déteste les oignons.", exampleCn: "我讨厌洋葱。"
  },
  {
    id: 388,
    fr: "la betterave",
    cn: "甜菜",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "La betterave est rouge.", exampleCn: "甜菜是红色的。"
  },
  {
    id: 389,
    fr: "la carotte",
    cn: "胡萝卜",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Les carottes sont bonnes pour les yeux.", exampleCn: "胡萝卜对眼睛好。"
  },
  {
    id: 390,
    fr: "les lentilles (f)",
    cn: "扁豆",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je mange des lentilles avec du riz.", exampleCn: "我吃扁豆配米饭。"
  },
  {
    id: 391,
    fr: "la pomme de terre",
    cn: "土豆",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'achète des pommes de terre.", exampleCn: "我买土豆。"
  },
  {
    id: 392,
    fr: "le brocoli",
    cn: "西兰花",
    cat: "Les légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le brocoli est un légume vert.", exampleCn: "西兰花是绿色蔬菜。"
  },
  {
    id: 393,
    fr: "le bœuf",
    cn: "牛肉",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je mange du bœuf le dimanche.", exampleCn: "我周日吃牛肉。"
  },
  {
    id: 394,
    fr: "le steak haché",
    cn: "绞肉牛排",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je prends un steak haché.", exampleCn: "我要一份牛肉饼。"
  },
  {
    id: 395,
    fr: "le filet de bœuf",
    cn: "牛里脊",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le filet de bœuf est cher.", exampleCn: "牛里脊很贵。"
  },
  {
    id: 396,
    fr: "le poulet",
    cn: "鸡肉",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le poulet est moins cher que le bœuf.", exampleCn: "鸡肉比牛肉便宜。"
  },
  {
    id: 397,
    fr: "le mouton",
    cn: "羊肉",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Le mouton est une viande.", exampleCn: "羊肉是一种肉。"
  },
  {
    id: 398,
    fr: "le rosbif",
    cn: "烤牛肉",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Nous mangeons du rosbif le dimanche.", exampleCn: "我们周日吃烤牛肉。"
  },
  {
    id: 399,
    fr: "le jambon",
    cn: "火腿",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "Je prends un sandwich au jambon.", exampleCn: "我要一个火腿三明治。"
  },
  {
    id: 400,
    fr: "le bacon",
    cn: "培根",
    cat: "La viande",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'aime le bacon avec les œufs.", exampleCn: "我喜欢培根配鸡蛋。"
  },
  {
    id: 401,
    fr: "la boulangerie",
    cn: "面包店",
    cat: "La visite guidée du marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "La boulangerie est ouverte à sept heures.", exampleCn: "面包店七点开门。"
  },
  {
    id: 402,
    fr: "la baguette",
    cn: "法棍面包",
    cat: "La visite guidée du marché",
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    example: "J'achète une baguette à la boulangerie.", exampleCn: "我在面包店买一根法棍。"
  },
  {
    id: 403,
    fr: "des tongs (f)",
    cn: "人字拖",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je porte des tongs à la plage.", exampleCn: "我在海滩穿人字拖。"
  },
  {
    id: 404,
    fr: "un imperméable",
    cn: "雨衣",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je prends un imperméable s'il pleut.", exampleCn: "下雨我就带雨衣。"
  },
  {
    id: 405,
    fr: "long / longue",
    cn: "长的",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Cette robe est longue.", exampleCn: "这条裙子很长。"
  },
  {
    id: 406,
    fr: "court / courte",
    cn: "短的",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Cette jupe est courte.", exampleCn: "这条短裙很短。"
  },
  {
    id: 407,
    fr: "rayé(e)",
    cn: "有条纹的",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je porte une chemise rayée.", exampleCn: "我穿一件条纹衬衫。"
  },
  {
    id: 408,
    fr: "à pois",
    cn: "带圆点花纹的",
    cat: "Les vêtements",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Elle a une robe à pois.", exampleCn: "她有一条圆点花裙子。"
  },
  {
    id: 409,
    fr: "les tissus (m)",
    cn: "布料、面料",
    cat: "Les matières",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Ce tissu est doux.", exampleCn: "这块布料很柔软。"
  },
  {
    id: 410,
    fr: "en laine",
    cn: "羊毛的",
    cat: "Les matières",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je porte un manteau en laine.", exampleCn: "我穿一件羊毛外套。"
  },
  {
    id: 411,
    fr: "en coton",
    cn: "棉的",
    cat: "Les matières",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Cette chemise est en coton.", exampleCn: "这件衬衫是棉的。"
  },
  {
    id: 412,
    fr: "en cuir",
    cn: "皮革的",
    cat: "Les matières",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Il porte une veste en cuir.", exampleCn: "他穿一件皮夹克。"
  },
  {
    id: 413,
    fr: "les bijoux (m)",
    cn: "珠宝首饰",
    cat: "Les bijoux",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Elle porte des bijoux.", exampleCn: "她戴着珠宝。"
  },
  {
    id: 414,
    fr: "en or",
    cn: "金质的",
    cat: "Les bijoux",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Cette bague est en or.", exampleCn: "这枚戒指是金的。"
  },
  {
    id: 415,
    fr: "en argent",
    cn: "银质的",
    cat: "Les bijoux",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Le collier est en argent.", exampleCn: "这条项链是银的。"
  },
  {
    id: 416,
    fr: "porter",
    cn: "穿、佩戴",
    cat: "S'habiller",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je porte un jean et un tee-shirt.", exampleCn: "我穿牛仔裤和T恤。"
  },
  {
    id: 417,
    fr: "mettre",
    cn: "穿上、放置",
    cat: "S'habiller",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je mets mon manteau, il fait froid.", exampleCn: "我穿上外套，天冷了。"
  },
  {
    id: 418,
    fr: "Habille-toi !",
    cn: "把衣服穿好！",
    cat: "S'habiller",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Habille-toi, il est tard !", exampleCn: "快穿好衣服，很晚了！"
  },
  {
    id: 419,
    fr: "s'habiller",
    cn: "穿衣、打扮",
    cat: "S'habiller",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Je m'habille à sept heures.", exampleCn: "我七点穿衣服。"
  },
  {
    id: 420,
    fr: "demain",
    cn: "明天",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Demain, je vais à l'école.", exampleCn: "明天我去上学。"
  },
  {
    id: 421,
    fr: "demain matin",
    cn: "明天早上",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Demain matin, je fais du sport.", exampleCn: "明天早上我做运动。"
  },
  {
    id: 422,
    fr: "demain après-midi",
    cn: "明天下午",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Demain après-midi, nous allons au cinéma.", exampleCn: "明天下午我们去看电影。"
  },
  {
    id: 423,
    fr: "demain soir",
    cn: "明天晚上",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Demain soir, je dîne avec mes amis.", exampleCn: "明天晚上我和朋友吃饭。"
  },
  {
    id: 424,
    fr: "le weekend prochain",
    cn: "下周末",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Le week-end prochain, nous allons à la plage.", exampleCn: "下周末我们去海滩。"
  },
  {
    id: 425,
    fr: "le mois prochain",
    cn: "下个月",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "Le mois prochain, je vais en France.", exampleCn: "下个月我去法国。"
  },
  {
    id: 426,
    fr: "l'année prochaine (f)",
    cn: "明年",
    cat: "Les expressions de temps au futur",
    unit: 12,
    theme: "On habite depuis le temps",
    example: "L'année prochaine, je passe un examen.", exampleCn: "明年我参加考试。"
  },
  {
    id: 427,
    fr: "avoir faim",
    cn: "饿",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai faim, je mange un biscuit.", exampleCn: "我饿了，吃块饼干。"
  },
  {
    id: 428,
    fr: "avoir soif",
    cn: "渴",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai soif, je bois de l'eau.", exampleCn: "我渴了，喝水。"
  },
  {
    id: 429,
    fr: "avoir chaud",
    cn: "觉得热",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai chaud, j'ouvre la fenêtre.", exampleCn: "我觉得热，打开窗户。"
  },
  {
    id: 430,
    fr: "avoir froid",
    cn: "觉得冷",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai froid, je mets un manteau.", exampleCn: "我觉得冷，穿上外套。"
  },
  {
    id: 431,
    fr: "avoir peur",
    cn: "害怕",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai peur du noir.", exampleCn: "我怕黑。"
  },
  {
    id: 432,
    fr: "avoir mal à la gorge",
    cn: "嗓子疼",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai mal à la gorge.", exampleCn: "我嗓子疼。"
  },
  {
    id: 433,
    fr: "avoir mal au ventre",
    cn: "肚子疼",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai mal au ventre.", exampleCn: "我肚子疼。"
  },
  {
    id: 434,
    fr: "avoir mal à la tête",
    cn: "头疼",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai mal à la tête.", exampleCn: "我头疼。"
  },
  {
    id: 435,
    fr: "avoir envie de...",
    cn: "想要……",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai envie de chocolat.", exampleCn: "我想吃巧克力。"
  },
  {
    id: 436,
    fr: "avoir honte",
    cn: "感到羞愧",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai honte de mon erreur.", exampleCn: "我为我的错误感到羞愧。"
  },
  {
    id: 437,
    fr: "avoir tort",
    cn: "错了",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai tort, je m'excuse.", exampleCn: "我错了，我道歉。"
  },
  {
    id: 438,
    fr: "avoir raison",
    cn: "对了、有道理",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "Tu as raison.", exampleCn: "你是对的。"
  },
  {
    id: 439,
    fr: "avoir besoin de...",
    cn: "需要……",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai besoin d'aide.", exampleCn: "我需要帮助。"
  },
  {
    id: 440,
    fr: "avoir de la chance",
    cn: "幸运",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai de la chance !", exampleCn: "我真幸运！"
  },
  {
    id: 441,
    fr: "avoir sommeil",
    cn: "困、想睡觉",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai sommeil, je vais me coucher.", exampleCn: "我困了，要去睡觉。"
  },
  {
    id: 442,
    fr: "être soulagé",
    cn: "感到宽慰、松了口气",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "Je suis soulagé après l'examen.", exampleCn: "考试后我松了一口气。"
  },
  {
    id: 443,
    fr: "Quand as-tu faim ?",
    cn: "你什么时候觉得饿？",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "Quand as-tu faim ? À midi ?", exampleCn: "你什么时候饿？中午吗？"
  },
  {
    id: 444,
    fr: "Quand as-tu chaud ?",
    cn: "你什么时候觉得热？",
    cat: "Qu'est-ce que tu as ?",
    unit: 13,
    theme: "On se téléphone",
    example: "Quand as-tu chaud ? En été ?", exampleCn: "你什么时候觉得热？夏天吗？"
  },
  {
    id: 445,
    fr: "le weekend dernier",
    cn: "上周末",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Le week-end dernier, j'ai joué au foot.", exampleCn: "上周末我踢了足球。"
  },
  {
    id: 446,
    fr: "la semaine dernière",
    cn: "上周",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "La semaine dernière, j'ai vu un film.", exampleCn: "上周我看了一部电影。"
  },
  {
    id: 447,
    fr: "l'année dernière",
    cn: "去年",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "L'année dernière, je suis allé en France.", exampleCn: "去年我去了法国。"
  },
  {
    id: 448,
    fr: "l'été dernier",
    cn: "去年夏天",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "L'été dernier, j'ai nagé dans la mer.", exampleCn: "去年夏天我在海里游泳。"
  },
  {
    id: 449,
    fr: "il y a deux semaines",
    cn: "两周前",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Il y a deux semaines, j'ai acheté un vélo.", exampleCn: "两周前我买了辆自行车。"
  },
  {
    id: 450,
    fr: "dimanche dernier",
    cn: "上周日",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Dimanche dernier, j'ai rendu visite à ma grand-mère.", exampleCn: "上周日我去看望了奶奶。"
  },
  {
    id: 451,
    fr: "vendredi soir",
    cn: "周五晚上",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Vendredi soir, j'ai regardé un film.", exampleCn: "周五晚上我看了一部电影。"
  },
  {
    id: 452,
    fr: "samedi matin",
    cn: "周六早上",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Samedi matin, j'ai fait le ménage.", exampleCn: "周六早上我做了家务。"
  },
  {
    id: 453,
    fr: "hier",
    cn: "昨天",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Hier, j'ai joué au tennis.", exampleCn: "昨天我打了网球。"
  },
  {
    id: 454,
    fr: "hier soir",
    cn: "昨晚",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Hier soir, j'ai dîné au restaurant.", exampleCn: "昨晚我在餐厅吃了饭。"
  },
  {
    id: 455,
    fr: "hier après-midi",
    cn: "昨天下午",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Hier après-midi, j'ai fait mes devoirs.", exampleCn: "昨天下午我做了作业。"
  },
  {
    id: 456,
    fr: "hier matin",
    cn: "昨天早上",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Hier matin, je me suis levé à six heures.", exampleCn: "昨天早上我六点起床。"
  },
  {
    id: 457,
    fr: "j'ai joué",
    cn: "我玩了",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "J'ai joué avec mon frère.", exampleCn: "我和弟弟玩了。"
  },
  {
    id: 458,
    fr: "il a regardé",
    cn: "他看了",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Il a regardé la télévision.", exampleCn: "他看了电视。"
  },
  {
    id: 459,
    fr: "nous avons choisi",
    cn: "我们选择了",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Nous avons choisi un restaurant.", exampleCn: "我们选了一家餐厅。"
  },
  {
    id: 460,
    fr: "ils ont vendu",
    cn: "他们卖了",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Ils ont vendu leur voiture.", exampleCn: "他们卖了车。"
  },
  {
    id: 461,
    fr: "As-tu fini ?",
    cn: "你完成了吗？",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "As-tu fini tes devoirs ?", exampleCn: "你做完作业了吗？"
  },
  {
    id: 462,
    fr: "Avez-vous attendu ?",
    cn: "你们等了吗？",
    cat: "Le passé composé",
    unit: 13,
    theme: "On se téléphone",
    example: "Avez-vous attendu le bus ?", exampleCn: "你们等公交车了吗？"
  },
  {
    id: 463,
    fr: "Je n'ai pas fait...",
    cn: "我没有做……",
    cat: "La négation",
    unit: 13,
    theme: "On se téléphone",
    example: "Je n'ai pas fait mes devoirs.", exampleCn: "我没有做作业。"
  },
  {
    id: 464,
    fr: "Je n'ai plus fait...",
    cn: "我不再做……了",
    cat: "La négation",
    unit: 13,
    theme: "On se téléphone",
    example: "Je n'ai plus fait de sport.", exampleCn: "我不再做运动了。"
  },
  {
    id: 465,
    fr: "Je n'ai jamais fait...",
    cn: "我从来没有做过……",
    cat: "La négation",
    unit: 13,
    theme: "On se téléphone",
    example: "Je n'ai jamais fait de ski.", exampleCn: "我从来没滑过雪。"
  },
  {
    id: 466,
    fr: "Je n'ai rien fait...",
    cn: "我什么都没做",
    cat: "La négation",
    unit: 13,
    theme: "On se téléphone",
    example: "Je n'ai rien fait ce matin.", exampleCn: "今天早上我什么都没做。"
  },
  {
    id: 467,
    fr: "Pendant les vacances",
    cn: "在假期期间",
    cat: "Pendant les vacances",
    unit: 14,
    theme: "Pendant les vacances",
    example: "Pendant les vacances, je voyage avec ma famille.", exampleCn: "假期里我和家人一起旅行。"
  },
  {
    id: 468,
    fr: "Les activités",
    cn: "活动",
    cat: "Les activités",
    unit: 14,
    theme: "Pendant les vacances",
    example: "Quelles activités fais-tu pendant les vacances ?", exampleCn: "你假期做什么活动？"
  },
  {
    id: 469,
    fr: "La météo",
    cn: "天气",
    cat: "La météo",
    unit: 14,
    theme: "Pendant les vacances",
    example: "La météo est belle aujourd'hui.", exampleCn: "今天天气很好。"
  },
  {
    id: 470,
    fr: "Les endroits",
    cn: "地点",
    cat: "Les endroits",
    unit: 14,
    theme: "Pendant les vacances",
    example: "Quels endroits visitez-vous ?", exampleCn: "你们参观哪些地方？"
  },
  {
    id: 471,
    fr: "La nourriture",
    cn: "食物",
    cat: "La nourriture",
    unit: 14,
    theme: "Pendant les vacances",
    example: "La nourriture locale est délicieuse.", exampleCn: "当地食物很美味。"
  },
  {
    id: 472,
    fr: "Autres informations",
    cn: "其他信息",
    cat: "Autres informations",
    unit: 14,
    theme: "Pendant les vacances",
    example: "Voici d'autres informations sur le voyage.", exampleCn: "这里是关于旅行的其他信息。"
  },
  {
    id: 473,
    fr: "On avance !",
    cn: "我们前进！",
    cat: "On avance !",
    unit: 15,
    theme: "On avance !",
    example: "On avance dans nos études !", exampleCn: "我们在学习上进步了！"
  },
  {
    id: 474,
    fr: "Travaillez en groupes.",
    cn: "请分组进行。",
    cat: "Exercice 3c",
    unit: 15,
    theme: "On avance !",
    example: "Travaillez en groupes, s'il vous plaît.", exampleCn: "请分组合作。"
  },
  {
    id: 475,
    fr: "On choisit un thème",
    cn: "我们选择一个主题",
    cat: "On choisit un thème",
    unit: 15,
    theme: "On avance !",
    example: "On choisit un thème pour le projet.", exampleCn: "我们为项目选一个主题。"
  },
  {
    id: 476,
    fr: "Retirez vos chaussures",
    cn: "请脱下鞋子",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Retirez vos chaussures à l'entrée.", exampleCn: "进门请脱鞋。"
  },
  {
    id: 477,
    fr: "Avez-vous votre passeport ou votre carte d'identité et votre carte d'embarquement ?",
    cn: "您带护照或身份证以及登机牌了吗？",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Avez-vous votre passeport et votre carte d'embarquement ?", exampleCn: "您带护照和登机牌了吗？"
  },
  {
    id: 478,
    fr: "L'embarquement à bord du vol LB1606 va commencer à la porte 8.",
    cn: "LB1606航班即将在8号登机口登机。",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "L'embarquement va commencer à la porte 8.", exampleCn: "登机将在8号登机口开始。"
  },
  {
    id: 479,
    fr: "Le vol numéro LS0505 est retardé.",
    cn: "LS0505次航班延误了。",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le vol LS0505 est retardé.", exampleCn: "LS0505航班延误了。"
  },
  {
    id: 480,
    fr: "Les arrivées (f)",
    cn: "到达（到达口）",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Les arrivées sont à l'étage.", exampleCn: "到达口在楼上。"
  },
  {
    id: 481,
    fr: "Les départs (m)",
    cn: "出发（出发口）",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Les départs sont au premier étage.", exampleCn: "出发口在二楼。"
  },
  {
    id: 482,
    fr: "Le passeport",
    cn: "护照",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je montre mon passeport à l'aéroport.", exampleCn: "我在机场出示护照。"
  },
  {
    id: 483,
    fr: "Le billet",
    cn: "机票、票",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Voici mon billet d'avion.", exampleCn: "这是我的机票。"
  },
  {
    id: 484,
    fr: "La valise",
    cn: "行李箱",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Ma valise est lourde.", exampleCn: "我的行李箱很重。"
  },
  {
    id: 485,
    fr: "Les bagages (m)",
    cn: "行李",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "J'ai deux bagages.", exampleCn: "我有两件行李。"
  },
  {
    id: 486,
    fr: "L'enregistrement (m)",
    cn: "值机、登机手续",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "L'enregistrement est ouvert.", exampleCn: "值机柜台开放了。"
  },
  {
    id: 487,
    fr: "La porte d'embarquement",
    cn: "登机口",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La porte d'embarquement est indiquée sur le billet.", exampleCn: "登机口显示在机票上。"
  },
  {
    id: 488,
    fr: "La location de voitures",
    cn: "汽车租赁",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La location de voitures est à l'aéroport.", exampleCn: "租车处在机场。"
  },
  {
    id: 489,
    fr: "Le bureau de change",
    cn: "货币兑换处",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je vais au bureau de change.", exampleCn: "我去兑换处。"
  },
  {
    id: 490,
    fr: "Les objets trouvés (m)",
    cn: "失物招领处",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "J'ai perdu mon portable, je vais aux objets trouvés.", exampleCn: "我丢了手机，去失物招领处。"
  },
  {
    id: 491,
    fr: "L'escalier mécanique (m)",
    cn: "自动扶梯",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je prends l'escalier mécanique.", exampleCn: "我坐自动扶梯。"
  },
  {
    id: 492,
    fr: "La zone de sécurité",
    cn: "安检区",
    cat: "À l'aéroport",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La zone de sécurité est devant la porte d'embarquement.", exampleCn: "安检区在登机口前面。"
  },
  {
    id: 493,
    fr: "Wi-Fi gratuit avec code",
    cn: "免费无线网络（需密码）",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Il y a un Wi-Fi gratuit avec code à l'auberge.", exampleCn: "旅舍有需要密码的免费Wi-Fi。"
  },
  {
    id: 494,
    fr: "Le parking",
    cn: "停车场",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le parking est à côté de l'auberge.", exampleCn: "停车场在旅舍旁边。"
  },
  {
    id: 495,
    fr: "Les boissons chaudes",
    cn: "热饮",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Les boissons chaudes sont au café.", exampleCn: "热饮在咖啡区。"
  },
  {
    id: 496,
    fr: "La cuisine",
    cn: "厨房",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La cuisine est commune dans l'auberge.", exampleCn: "旅舍的厨房是公用的。"
  },
  {
    id: 497,
    fr: "Le dortoir",
    cn: "多人宿舍",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je dors dans le dortoir de l'auberge.", exampleCn: "我住在旅舍的多人宿舍。"
  },
  {
    id: 498,
    fr: "La laverie",
    cn: "洗衣房",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La laverie est au sous-sol.", exampleCn: "洗衣房在地下室。"
  },
  {
    id: 499,
    fr: "Le panier-repas",
    cn: "便当、野餐篮",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je prends un panier-repas pour le train.", exampleCn: "我带了一份火车便当。"
  },
  {
    id: 500,
    fr: "Draps inclus (m)",
    cn: "含床单",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Draps inclus dans la chambre.", exampleCn: "房间含床单。"
  },
  {
    id: 501,
    fr: "Chambre accessible aux fauteuils roulants",
    cn: "轮椅无障碍客房",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Une chambre accessible aux fauteuils roulants est disponible.", exampleCn: "有轮椅无障碍客房。"
  },
  {
    id: 502,
    fr: "Les visites guidées",
    cn: "导览参观",
    cat: "À l'auberge de jeunesse",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Les visites guidées sont gratuites.", exampleCn: "导览参观是免费的。"
  },
  {
    id: 503,
    fr: "Le quai",
    cn: "站台",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le train part du quai 3.", exampleCn: "火车从3号站台出发。"
  },
  {
    id: 504,
    fr: "Le conducteur de train",
    cn: "火车司机",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le conducteur de train conduit le train.", exampleCn: "火车司机开火车。"
  },
  {
    id: 505,
    fr: "Le billet de train",
    cn: "火车票",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Voici mon billet de train.", exampleCn: "这是我的火车票。"
  },
  {
    id: 506,
    fr: "Le distributeur (automatique) de billets",
    cn: "自动售票机",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "J'achète un billet au distributeur automatique.", exampleCn: "我在自动售票机买票。"
  },
  {
    id: 507,
    fr: "Le passager",
    cn: "乘客",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le passager monte dans le train.", exampleCn: "乘客上了火车。"
  },
  {
    id: 508,
    fr: "Le contrôleur",
    cn: "检票员、列车员",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le contrôleur vérifie les billets.", exampleCn: "检票员查票。"
  },
  {
    id: 509,
    fr: "Le guichet",
    cn: "售票窗口",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "J'achète un billet au guichet.", exampleCn: "我在窗口买票。"
  },
  {
    id: 510,
    fr: "Les rails (m)",
    cn: "铁轨",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Les rails sont longs.", exampleCn: "铁轨很长。"
  },
  {
    id: 511,
    fr: "Le TGV",
    cn: "法国高速列车（高铁）",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Le TGV va très vite.", exampleCn: "法国高铁跑得很快。"
  },
  {
    id: 512,
    fr: "La consigne",
    cn: "行李寄存处",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je laisse mes bagages à la consigne.", exampleCn: "我把行李寄存在寄存处。"
  },
  {
    id: 513,
    fr: "La salle d'attente",
    cn: "候车室",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "La salle d'attente est chauffée.", exampleCn: "候车室有暖气。"
  },
  {
    id: 514,
    fr: "Un aller simple",
    cn: "单程票",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je voudrais un aller simple pour Paris.", exampleCn: "我要一张去巴黎的单程票。"
  },
  {
    id: 515,
    fr: "Un aller-retour",
    cn: "往返票",
    cat: "À la gare",
    unit: 16,
    theme: "En voyage scolaire",
    example: "Je voudrais un aller-retour pour Lyon.", exampleCn: "我要一张去里昂的往返票。"
  },
  {
    id: 516,
    fr: "La tête",
    cn: "头",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal à la tête.", exampleCn: "我头疼。"
  },
  {
    id: 517,
    fr: "Le cou",
    cn: "脖子",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au cou.", exampleCn: "我脖子疼。"
  },
  {
    id: 518,
    fr: "L'épaule (f)",
    cn: "肩膀",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal à l'épaule.", exampleCn: "我肩膀疼。"
  },
  {
    id: 519,
    fr: "Le bras",
    cn: "手臂",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je me suis fait mal au bras.", exampleCn: "我手臂受伤了。"
  },
  {
    id: 520,
    fr: "Le coude",
    cn: "肘部",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au coude.", exampleCn: "我胳膊肘疼。"
  },
  {
    id: 521,
    fr: "La main",
    cn: "手",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je me lave les mains.", exampleCn: "我洗手。"
  },
  {
    id: 522,
    fr: "Le doigt",
    cn: "手指",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai cinq doigts à chaque main.", exampleCn: "我每只手有五根手指。"
  },
  {
    id: 523,
    fr: "Le pouce",
    cn: "拇指",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je me suis fait mal au pouce.", exampleCn: "我拇指受伤了。"
  },
  {
    id: 524,
    fr: "Le ventre / l'estomac (m)",
    cn: "肚子 / 胃",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au ventre.", exampleCn: "我肚子疼。"
  },
  {
    id: 525,
    fr: "Le dos",
    cn: "背部",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au dos.", exampleCn: "我背疼。"
  },
  {
    id: 526,
    fr: "La jambe",
    cn: "腿",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je me suis fait mal à la jambe.", exampleCn: "我腿受伤了。"
  },
  {
    id: 527,
    fr: "Le genou",
    cn: "膝盖",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au genou.", exampleCn: "我膝盖疼。"
  },
  {
    id: 528,
    fr: "Le pied",
    cn: "脚",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au pied.", exampleCn: "我脚疼。"
  },
  {
    id: 529,
    fr: "Le visage",
    cn: "脸",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je me lave le visage.", exampleCn: "我洗脸。"
  },
  {
    id: 530,
    fr: "L'œil / les yeux (m)",
    cn: "眼睛（单数/复数）",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai les yeux bleus.", exampleCn: "我有蓝眼睛。"
  },
  {
    id: 531,
    fr: "La bouche",
    cn: "嘴",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Ouvre la bouche, s'il te plaît.", exampleCn: "请张开嘴。"
  },
  {
    id: 532,
    fr: "L'oreille (f)",
    cn: "耳朵",
    cat: "Les parties du corps",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal à l'oreille.", exampleCn: "我耳朵疼。"
  },
  {
    id: 533,
    fr: "Mettre l'eau à la bouche",
    cn: "令人垂涎；使人口水直流",
    cat: "Expressions idiomatiques",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Ce gâteau met l'eau à la bouche.", exampleCn: "这个蛋糕让人垂涎。"
  },
  {
    id: 534,
    fr: "Avoir un coup de cœur pour quelque chose",
    cn: "对某事物一见倾心",
    cat: "Expressions idiomatiques",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai un coup de cœur pour ce livre.", exampleCn: "我一眼就喜欢上了这本书。"
  },
  {
    id: 535,
    fr: "Avoir la main verte",
    cn: "有园艺天赋（手绿）",
    cat: "Expressions idiomatiques",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Ma grand-mère a la main verte.", exampleCn: "我奶奶很会种花。"
  },
  {
    id: 536,
    fr: "C'est le pied !",
    cn: "太棒了！爽极了！",
    cat: "Expressions idiomatiques",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Ce voyage, c'est le pied !", exampleCn: "这次旅行太棒了！"
  },
  {
    id: 537,
    fr: "Manger des produits frais",
    cn: "吃新鲜食品",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Il faut manger des produits frais.", exampleCn: "应该吃新鲜食品。"
  },
  {
    id: 538,
    fr: "Dormir entre huit et dix heures par nuit",
    cn: "每晚睡八到十小时",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je dors entre huit et dix heures par nuit.", exampleCn: "我每晚睡八到十小时。"
  },
  {
    id: 539,
    fr: "Passer du temps en plein air",
    cn: "花时间在户外",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Il faut passer du temps en plein air.", exampleCn: "应该多待在户外。"
  },
  {
    id: 540,
    fr: "Prendre le temps de parler avec ses proches",
    cn: "花时间与亲人交谈",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je prends le temps de parler avec mes proches.", exampleCn: "我抽时间和亲人聊天。"
  },
  {
    id: 541,
    fr: "Prendre le temps de faire les choses qu'on aime",
    cn: "花时间做自己喜欢的事",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je prends le temps de faire les choses que j'aime.", exampleCn: "我花时间做自己喜欢的事。"
  },
  {
    id: 542,
    fr: "Faire de l'exercice",
    cn: "锻炼身体",
    cat: "Des conseils pour la santé et le bien-être",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Il faut faire de l'exercice chaque jour.", exampleCn: "每天都应该锻炼。"
  },
  {
    id: 543,
    fr: "La vue",
    cn: "视觉",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai une bonne vue.", exampleCn: "我视力很好。"
  },
  {
    id: 544,
    fr: "L'odorat (m)",
    cn: "嗅觉",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "L'odorat est un sens.", exampleCn: "嗅觉是一种感官。"
  },
  {
    id: 545,
    fr: "L'ouïe (f)",
    cn: "听觉",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "L'ouïe est un sens.", exampleCn: "听觉是一种感官。"
  },
  {
    id: 546,
    fr: "Le toucher",
    cn: "触觉",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Le toucher est un sens.", exampleCn: "触觉是一种感官。"
  },
  {
    id: 547,
    fr: "Le goût",
    cn: "味觉",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Le goût est un sens.", exampleCn: "味觉是一种感官。"
  },
  {
    id: 548,
    fr: "Voir / Entendre",
    cn: "看见 / 听见",
    cat: "Les sens",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "Je vois et j'entends.", exampleCn: "我能看见也能听见。"
  },
  {
    id: 549,
    fr: "La fièvre (avoir de la fièvre)",
    cn: "发烧（发烧）",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai de la fièvre.", exampleCn: "我发烧了。"
  },
  {
    id: 550,
    fr: "La toux",
    cn: "咳嗽",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai la toux.", exampleCn: "我咳嗽。"
  },
  {
    id: 551,
    fr: "Le mal de tête / Avoir mal à la tête",
    cn: "头痛 / 头疼",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal à la tête.", exampleCn: "我头疼。"
  },
  {
    id: 552,
    fr: "La perte de l'odorat ou du goût",
    cn: "嗅觉或味觉丧失",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai perdu l'odorat et le goût.", exampleCn: "我失去了嗅觉和味觉。"
  },
  {
    id: 553,
    fr: "Les difficultés respiratoires",
    cn: "呼吸困难",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai des difficultés respiratoires.", exampleCn: "我呼吸困难。"
  },
  {
    id: 554,
    fr: "Les troubles du sommeil",
    cn: "睡眠障碍",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai des troubles du sommeil.", exampleCn: "我有睡眠障碍。"
  },
  {
    id: 555,
    fr: "Avoir mal au ventre",
    cn: "肚子疼",
    cat: "Les symptômes",
    unit: 17,
    theme: "Raconte-moi une vie",
    example: "J'ai mal au ventre.", exampleCn: "我肚子疼。"
  },
  {
    id: 556,
    fr: "Connaître",
    cn: "认识、了解",
    cat: "Les meilleurs amis",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je connais bien Paris.", exampleCn: "我很熟悉巴黎。"
  },
  {
    id: 557,
    fr: "Je le connais",
    cn: "我认识他",
    cat: "Les meilleurs amis",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "C'est mon ami, je le connais bien.", exampleCn: "这是我的朋友，我很了解他。"
  },
  {
    id: 558,
    fr: "Je la connais",
    cn: "我认识她",
    cat: "Les meilleurs amis",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "C'est ma sœur, je la connais bien.", exampleCn: "这是我姐姐，我很了解她。"
  },
  {
    id: 559,
    fr: "Je les connais",
    cn: "我认识他们/她们",
    cat: "Les meilleurs amis",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Ce sont mes amis, je les connais bien.", exampleCn: "这些是我的朋友，我很了解他们。"
  },
  {
    id: 560,
    fr: "Mon meilleur ami / Ma meilleure amie",
    cn: "我最好的朋友（男/女）",
    cat: "Les meilleurs amis",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Mon meilleur ami s'appelle Louis.", exampleCn: "我最好的朋友叫路易。"
  },
  {
    id: 561,
    fr: "La technologie",
    cn: "科技产品",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'aime la technologie.", exampleCn: "我喜欢科技产品。"
  },
  {
    id: 562,
    fr: "Les bijoux (m)",
    cn: "珠宝首饰",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Elle reçoit des bijoux pour son anniversaire.", exampleCn: "她生日收到珠宝。"
  },
  {
    id: 563,
    fr: "Les vêtements (m)",
    cn: "衣服",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'achète des vêtements neufs.", exampleCn: "我买新衣服。"
  },
  {
    id: 564,
    fr: "L'équipement (m) sportif",
    cn: "运动装备",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai acheté un équipement sportif.", exampleCn: "我买了一套运动装备。"
  },
  {
    id: 565,
    fr: "Un portable",
    cn: "手机",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai un nouveau portable.", exampleCn: "我有一部新手机。"
  },
  {
    id: 566,
    fr: "Un haut-parleur",
    cn: "扬声器",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Le haut-parleur est très puissant.", exampleCn: "这个扬声器声音很大。"
  },
  {
    id: 567,
    fr: "Une montre",
    cn: "手表",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Ma montre est à l'heure.", exampleCn: "我的手表很准。"
  },
  {
    id: 568,
    fr: "Des écouteurs (m) sans fil",
    cn: "无线耳机",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai des écouteurs sans fil.", exampleCn: "我有一副无线耳机。"
  },
  {
    id: 569,
    fr: "Des boucles d'oreille (f)",
    cn: "耳环",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Elle porte des boucles d'oreille.", exampleCn: "她戴着耳环。"
  },
  {
    id: 570,
    fr: "Un collier",
    cn: "项链",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Il m'a offert un collier.", exampleCn: "他送了我一条项链。"
  },
  {
    id: 571,
    fr: "Une bague",
    cn: "戒指",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai reçu une bague.", exampleCn: "我收到了一枚戒指。"
  },
  {
    id: 572,
    fr: "Une guitare / Une batterie",
    cn: "吉他 / 架子鼓",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je joue de la guitare.", exampleCn: "我弹吉他。"
  },
  {
    id: 573,
    fr: "Un tee-shirt",
    cn: "T恤",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je porte un tee-shirt bleu.", exampleCn: "我穿一件蓝色T恤。"
  },
  {
    id: 574,
    fr: "Un sweat à capuche",
    cn: "连帽卫衣",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Il porte un sweat à capuche.", exampleCn: "他穿一件连帽卫衣。"
  },
  {
    id: 575,
    fr: "Un pyjama",
    cn: "睡衣",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je mets mon pyjama le soir.", exampleCn: "我晚上穿睡衣。"
  },
  {
    id: 576,
    fr: "Des jeux de société (m)",
    cn: "桌游",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je joue aux jeux de société avec mes amis.", exampleCn: "我和朋友玩桌游。"
  },
  {
    id: 577,
    fr: "Recevoir",
    cn: "收到",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai reçu un cadeau d'anniversaire.", exampleCn: "我收到了一份生日礼物。"
  },
  {
    id: 578,
    fr: "Être un(e) fan de",
    cn: "是……的粉丝",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je suis fan de musique.", exampleCn: "我是音乐迷。"
  },
  {
    id: 579,
    fr: "Être un(e) mordu(e) de",
    cn: "对……着迷",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Il est mordu de football.", exampleCn: "他对足球很着迷。"
  },
  {
    id: 580,
    fr: "Être passionné(e) de",
    cn: "热衷于……",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Elle est passionnée de lecture.", exampleCn: "她热爱阅读。"
  },
  {
    id: 581,
    fr: "Être un rat de bibliothèque",
    cn: "书虫（爱读书的人）",
    cat: "Les cadeaux (m) d'anniversaire",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je suis un rat de bibliothèque.", exampleCn: "我是个书虫。"
  },
  {
    id: 582,
    fr: "Le plus / Le moins",
    cn: "最……（最多）/ 最不……（最少）",
    cat: "Le superlatif",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je travaille le plus, il travaille le moins.", exampleCn: "我干得最多，他干得最少。"
  },
  {
    id: 583,
    fr: "Le meilleur / Le pire",
    cn: "最好的 / 最差的",
    cat: "Le superlatif",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "C'est le meilleur jour de ma vie.", exampleCn: "这是我人生中最好的一天。"
  },
  {
    id: 584,
    fr: "Pour fêter mon anniversaire",
    cn: "为了庆祝我的生日",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Pour fêter mon anniversaire, je sors avec mes amis.", exampleCn: "为了庆祝生日，我和朋友们出去玩。"
  },
  {
    id: 585,
    fr: "Veux-tu aller/faire... ?",
    cn: "你想去/做……吗？",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Veux-tu aller au cinéma avec moi ?", exampleCn: "你想和我去看电影吗？"
  },
  {
    id: 586,
    fr: "Est-ce que tu veux... ?",
    cn: "你想要……吗？",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Est-ce que tu veux du café ?", exampleCn: "你想要咖啡吗？"
  },
  {
    id: 587,
    fr: "Ça te dit... ?",
    cn: "你想……吗？/ 你觉得……怎样？",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Ça te dit une promenade ?", exampleCn: "你想去散步吗？"
  },
  {
    id: 588,
    fr: "As-tu envie de... ?",
    cn: "你想……吗？",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "As-tu envie de sortir ce soir ?", exampleCn: "你今晚想出去吗？"
  },
  {
    id: 589,
    fr: "Tu es libre... ?",
    cn: "你有空……吗？",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Tu es libre samedi ?", exampleCn: "你周六有空吗？"
  },
  {
    id: 590,
    fr: "Je t'invite à...",
    cn: "我邀请你去……",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je t'invite à dîner chez moi.", exampleCn: "我邀请你来我家吃饭。"
  },
  {
    id: 591,
    fr: "Je veux bien / Pourquoi pas / D'accord",
    cn: "我很愿意 / 为什么不呢 / 好的",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je veux bien, pourquoi pas, d'accord !", exampleCn: "我很愿意，为什么不呢，好的！"
  },
  {
    id: 592,
    fr: "Bonne idée / Volontiers",
    cn: "好主意 / 乐意之至",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Bonne idée ! Volontiers !", exampleCn: "好主意！我很乐意！"
  },
  {
    id: 593,
    fr: "On se retrouvera...",
    cn: "我们下次再聚……",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "On se retrouvera demain à l'école.", exampleCn: "我们明天学校见。"
  },
  {
    id: 594,
    fr: "Je regrette, je ne peux pas",
    cn: "很遗憾，我不能",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "Je regrette, je ne peux pas venir.", exampleCn: "很遗憾，我不能来。"
  },
  {
    id: 595,
    fr: "J'ai trop de devoirs / Je n'ai pas le temps / Je ne me sens pas bien",
    cn: "我作业太多 / 我没时间 / 我感觉不舒服（拒绝邀请的理由）",
    cat: "Les fêtes, les anniversaires et les invitations",
    unit: 18,
    theme: "Nous voilà dans la cité",
    example: "J'ai trop de devoirs, je n'ai pas le temps.", exampleCn: "我作业太多，没时间。"
  },
  {
    id: 596,
    fr: "une profession",
    cn: "职业",
    cat: "Exercice 5f",
    unit: 19,
    theme: "On travaille",
    example: "Quelle est ta profession ?", exampleCn: "你的职业是什么？"
  },
  {
    id: 597,
    fr: "pilote",
    cn: "飞行员",
    cat: "Exercice 5f",
    unit: 19,
    theme: "On travaille",
    example: "Mon frère est pilote.", exampleCn: "我哥哥是飞行员。"
  },
  {
    id: 598,
    fr: "un avion",
    cn: "飞机",
    cat: "Exercice 5f",
    unit: 19,
    theme: "On travaille",
    example: "L'avion décolle à huit heures.", exampleCn: "飞机八点起飞。"
  },
  {
    id: 599,
    fr: "un aéroport",
    cn: "机场",
    cat: "Exercice 5f",
    unit: 19,
    theme: "On travaille",
    example: "Nous attendons à l'aéroport.", exampleCn: "我们在机场等。"
  },
  {
    id: 600,
    fr: "travailler",
    cn: "工作",
    cat: "Exercice 5f",
    unit: 19,
    theme: "On travaille",
    example: "Je travaille dans un bureau.", exampleCn: "我在办公室工作。"
  },
  {
    id: 601,
    fr: "Qu'est-ce que tu voudrais être ?",
    cn: "你想成为什么？",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Qu'est-ce que tu voudrais être plus tard ?", exampleCn: "你以后想做什么？"
  },
  {
    id: 602,
    fr: "je voudrais",
    cn: "我想要（vouloir 的条件式）",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Je voudrais être médecin.", exampleCn: "我想当医生。"
  },
  {
    id: 603,
    fr: "le temps",
    cn: "时间",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Je n'ai pas le temps aujourd'hui.", exampleCn: "我今天没时间。"
  },
  {
    id: 604,
    fr: "beau / mauvais",
    cn: "（天气）好 / 坏",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Aujourd'hui il fait beau, demain il fera mauvais.", exampleCn: "今天天气好，明天天气不好。"
  },
  {
    id: 605,
    fr: "je pouvais",
    cn: "我能够（pouvoir 的未完成过去时）",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Je pouvais jouer dehors quand j'étais petit.", exampleCn: "我小时候可以在外面玩。"
  },
  {
    id: 606,
    fr: "si",
    cn: "如果（引导条件句）",
    cat: "Exercice 6d",
    unit: 19,
    theme: "On travaille",
    example: "Si j'ai le temps, je viendrai.", exampleCn: "如果我有时间，我会来。"
  },
  {
    id: 607,
    fr: "Le moment est venu !",
    cn: "时机到了！",
    cat: "End of unit task",
    unit: 20,
    theme: "On révise",
    example: "Le moment est venu de partir !", exampleCn: "该出发的时候到了！"
  },
  {
    id: 608,
    fr: "le futur",
    cn: "将来时",
    cat: "For this task",
    unit: 20,
    theme: "On révise",
    example: "Je pense au futur.", exampleCn: "我想着未来。"
  },
  {
    id: 609,
    fr: "un superlatif",
    cn: "最高级",
    cat: "For this task",
    unit: 20,
    theme: "On révise",
    example: "Le superlatif sert à comparer.", exampleCn: "最高级用来比较。"
  },
  {
    id: 610,
    fr: "les expressions pour invitations",
    cn: "邀请用语（页面英文表述 expressions for invitations）",
    cat: "For this task",
    unit: 20,
    theme: "On révise",
    example: "Les expressions pour invitations sont utiles.", exampleCn: "邀请用语很有用。"
  },
  {
    id: 611,
    fr: "une stratégie",
    cn: "策略",
    cat: "Language learning strategies",
    unit: 20,
    theme: "On révise",
    example: "Une stratégie aide à apprendre.", exampleCn: "策略有助于学习。"
  },
  {
    id: 612,
    fr: "un verbe",
    cn: "动词",
    cat: "Language learning strategies",
    unit: 20,
    theme: "On révise",
    example: "Un verbe est un mot d'action.", exampleCn: "动词是表示动作的词。"
  },
  {
    id: 613,
    fr: "vingt-quatre heures",
    cn: "二十四小时（页数标注 cent-soixante-dix-sept = 177）",
    cat: "页码",
    unit: 20,
    theme: "On révise",
    example: "Il y a vingt-quatre heures dans une journée.", exampleCn: "一天有二十四小时。"
  }
];

const enavantPoints = [
  {
    title: "Se présenter",
    cn: "自我介绍：Comment tu t'appelles ? / Je m'appelle... / s'appeler / Comment ça s'écrit ?",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Les pronoms personnels",
    cn: "人称代词：je（我）、tu（你）、il（他）、elle（她）、on（我们）、nous（我们）、vous（您/你们）、ils（他们）、elles（她们）",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Les salutations !",
    cn: "问候语",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Les nombres",
    cn: "数字 1–31：20=vingt，21–29 用 vingt+个位数（vingt-et-un, vingt-deux…），30=trente，premier=第一；原表列出 deux 至 trente 的全部数词",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Les mois de l'année",
    cn: "一年中的月份",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Les jours de la semaine",
    cn: "一周中的星期",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    title: "Communiquer en classe",
    cn: "课堂交流用语（祈使句：Écoutez ! / Levez la main ! 等）",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Les parties du corps",
    cn: "身体部位",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Dans la salle de classe !",
    cn: "在教室里（课堂物品）",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Qu'est-ce que c'est ?",
    cn: "这是什么？（C'est... / Ce n'est pas... / Ce sont...）",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Les couleurs",
    cn: "颜色（注意阴阳性配合：vert/verte, blanc/blanche）",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Les matières",
    cn: "学科科目",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "À mon école",
    cn: "在我的学校",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Les adjectifs possessifs",
    cn: "物主形容词：mon/ma/mes（我的）、ton/ta/tes（你的）、son/sa/ses（他/她的）",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "il y a / il n'y a pas de",
    cn: "存在句：有……／没有……",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    title: "Les pays européens",
    cn: "欧洲国家",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Où habites-tu ?",
    cn: "你住在哪里？（居住地点：à la campagne / en ville / en banlieue 等）",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Les nationalités",
    cn: "国籍（国籍形容词阴阳性：français/française, allemand/allemande 等）",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Les nombres 32–60",
    cn: "数字 32–60；quarante=40, cinquante=50, soixante=60；le code postal=邮政编码",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Les points cardinaux",
    cn: "方位（le nord 北 / le sud 南 / l'est 东 / l'ouest 西 / le centre 中心）",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Les verbes",
    cn: "动词",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    title: "Camille nous présente sa famille",
    cn: "卡米勒介绍她的家庭（家庭成员词汇）",
    unit: 4,
    theme: "Mes proches"
  },
  {
    title: "Quel âge ont tes grands-parents ?",
    cn: "数字 60–100：soixante（60）、soixante-dix（70）、quatre-vingts（80）、quatre-vingt-dix（90）、cent（100）；71–79 用 soixante+11–19，81–99 用 quatre-vingt+1–19",
    unit: 4,
    theme: "Mes proches"
  },
  {
    title: "Ma mère, mon père, mes parents",
    cn: "物主形容词：mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs",
    unit: 4,
    theme: "Mes proches"
  },
  {
    title: "Faire la bise",
    cn: "贴面吻礼节（à droite / à gauche 表示左右脸颊）",
    unit: 4,
    theme: "Mes proches"
  },
  {
    title: "Décris ta famille !",
    cn: "描述家人外貌：grand(e) / de taille moyenne / petit(e)",
    unit: 4,
    theme: "Mes proches"
  },
  {
    title: "Mon domicile",
    cn: "我的住所（房屋类型）",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "L'entrée",
    cn: "入口／门厅",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans la cuisine",
    cn: "在厨房",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans la salle à manger",
    cn: "在餐厅",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans la buanderie",
    cn: "在洗衣房",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans le salon/salle de séjour",
    cn: "在客厅",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans la salle de bains",
    cn: "在浴室",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans la chambre",
    cn: "在卧室",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Dans le jardin",
    cn: "在花园",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Où sont mes clés ?",
    cn: "我的钥匙在哪里？（地点介词：dans / à côté de / devant / derrière / sur / sous）",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Les tâches ménagères",
    cn: "家务活（Je fais le ménage / la cuisine / la vaisselle…）",
    unit: 5,
    theme: "Chez moi"
  },
  {
    title: "Les activités quotidiennes",
    cn: "日常活动",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Pour dire l'heure",
    cn: "报时",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Les moyens de transport",
    cn: "交通方式",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Pour bien réfléchir",
    cn: "思考类动词",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Pendant la journée",
    cn: "一天中的连词",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Les verbes pronominaux (se + verbe)",
    cn: "代词式动词：se + 动词原形，如 se réveiller / se lever / se laver，主语与宾语为同一人",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "L'heure : heure + minute",
    cn: "报时规律：整点用 à + 数字；一刻用 et quart；半点用 et demie；差几分用 moins（如 moins le quart 差一刻）",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Les moyens de transport : en + 交通工具",
    cn: "交通方式：en + 交通工具（en bus / en train / en avion）；但步行、骑车用 à（à pied / à vélo）",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Les verbes en -ir",
    cn: "-ir 结尾动词（第二组）：choisir / finir / réfléchir / réunir 等",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "car, donc, mais, ou, parce que",
    cn: "连词：car/parce que 表原因，donc 表结果，mais 表转折，ou 表选择；et 表并列",
    unit: 6,
    theme: "Mes habitudes quotidiennes"
  },
  {
    title: "Vocabulaire et grammaire",
    cn: "词汇与语法（本页为空白笔记区，供记录第7单元补充内容）",
    unit: 7,
    theme: "Mes coups de cœur"
  },
  {
    title: "Le livre de l'élève",
    cn: "学生用书配套练习（本页无 Banque de vocabulaire 词汇表）",
    unit: 7,
    theme: "Mes coups de cœur"
  },
  {
    title: "Est-ce que tu fais de l'exercice ?",
    cn: "一般疑问句：Est-ce que + 主语 + 动词？你做运动吗？",
    unit: 7,
    theme: "Mes coups de cœur"
  },
  {
    title: "Les matières",
    cn: "科目",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "Le système scolaire en France",
    cn: "法国的学校制度",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "Les sciences sont plus difficiles que les maths,…",
    cn: "理科比数学更难……（比较级例句）",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "Les installations scolaires",
    cn: "学校设施",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "Le règlement scolaire",
    cn: "校规",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "La journée scolaire de Camille",
    cn: "卡米尔的校园一天",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "Les comparatifs : plus / moins / aussi + 形容词 + que",
    cn: "比较级：plus... que 比……更；moins... que 不如……；aussi... que 和……一样",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "On doit + 动词原形 / Il est interdit de + 动词原形",
    cn: "表示义务与禁止：On doit... 我们必须……；Il est interdit de... 禁止……",
    unit: 8,
    theme: "Mes études"
  },
  {
    title: "La nourriture fait partie de notre culture !",
    cn: "食物是我们文化的一部分！",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Le petit déjeuner",
    cn: "早餐",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Tu préfères les fruits ou les légumes ?",
    cn: "你更喜欢水果还是蔬菜？（粉色例句）",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Le déjeuner",
    cn: "午餐",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Le repas du soir",
    cn: "晚餐",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Le goûter",
    cn: "零食，下午茶",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "L'article partitif (du / de la / de l' / des)",
    cn: "部分冠词：du（阳性）、de la（阴性）、de l'（元音或哑音 h 前）、des（复数），表示“一些”",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "préférer A à B",
    cn: "比起 B 更喜欢 A：je préfère le beurre à la confiture",
    unit: 9,
    theme: "On marche bien"
  },
  {
    title: "Les endroits de la ville",
    cn: "城市里的场所",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "Où se trouve la banque ?",
    cn: "银行在哪里？（粉色问路句型）",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "Les directions",
    cn: "指路",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "Où se trouve + 地点名词 ?",
    cn: "问地点句型：……在哪里？",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "à côté de / en face de / à gauche de / à droite de + 名词",
    cn: "方位介词短语：在……旁边／对面／左边／右边",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "Impératif : Continuez / Tournez / Prenez / Traversez",
    cn: "祈使式用于指路：继续走／转弯／走第几条街／穿过",
    unit: 10,
    theme: "En ville"
  },
  {
    title: "Au supermarché",
    cn: "在超市",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "Au marché",
    cn: "在市场",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "Les légumes",
    cn: "蔬菜",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "La viande",
    cn: "肉类",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "La visite guidée du marché",
    cn: "市场导览",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "un/une + 数量单位",
    cn: "数量表达：un kilo 一公斤、un gramme 一克、une bouteille 一瓶、un litre 一升、une douzaine 一打",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "Les partitifs devant les aliments",
    cn: "食物前的部分冠词：du bœuf、de la salade、des légumes",
    unit: 11,
    theme: "Au marché, au café, au restaurant"
  },
  {
    title: "Les vêtements et les matières",
    cn: "服装与材质（本页为词汇表延续页，原分类表头未在本页显示，按内容归类）",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "S'habiller",
    cn: "穿衣：动词 porter（穿/佩戴）、mettre（穿上）、代词式动词 s'habiller（打扮）",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "La météo",
    cn: "天气：si + 现在时，s'il pleut 表示“如果下雨”",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "Les expressions de temps au futur",
    cn: "将来时间表达：demain / le... prochain（明天、下周/月/年）",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "L'accord de l'adjectif",
    cn: "形容词性数配合：long/longue、court/courte、rayé(e)",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "depuis",
    cn: "自……以来：单元语法，depuis + 时间点，常与现在时连用表示持续状态（On habite depuis...）",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "Remarque",
    cn: "本页下半部分为“Vocabulaires et grammaire”空白笔记页（Use this space to note additional vocabulary and grammar from Unit 12）。",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    title: "Qu'est-ce que tu as ?",
    cn: "你怎么了？（原页表头：What's wrong?；avoir + 名词表达感觉/状态）",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    title: "Le passé composé",
    cn: "复合过去时：avoir + 过去分词（j'ai joué, nous avons choisi），谈论过去发生的事",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    title: "La négation",
    cn: "否定：ne...pas / ne...plus / ne...jamais / ne...rien（放在助动词两侧）",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    title: "Les expressions de temps passé",
    cn: "过去时间表达：hier、... dernier / dernière、il y a deux semaines",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    title: "Pendant les vacances",
    cn: "假期中（本单元主题）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "Les activités",
    cn: "活动（表格分类栏）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "La météo",
    cn: "天气（表格分类栏）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "Les endroits",
    cn: "地点（表格分类栏）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "La nourriture",
    cn: "食物（表格分类栏）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "Autres informations",
    cn: "其他信息（表格分类栏）",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "Remarque",
    cn: "本页为单元导入的“Réfléchissons ! / Stop and think”头脑风暴页，表格由学生自行填写，无预填词汇、无粉红高亮例句（原页标注 p280-281）。",
    unit: 14,
    theme: "Pendant les vacances"
  },
  {
    title: "On avance !",
    cn: "我们前进！（本单元主题）",
    unit: 15,
    theme: "On avance !"
  },
  {
    title: "On choisit un thème",
    cn: "我们选择一个主题（练习4b标题）",
    unit: 15,
    theme: "On avance !"
  },
  {
    title: "Les points forts et les points faibles",
    cn: "优点与缺点（原页英文标签 Strengths / Weaknesses；示例：Variety of verbs used 动词多样；More images to show the final product 多用图片展示成果）",
    unit: 15,
    theme: "On avance !"
  },
  {
    title: "Les éléments d'une présentation",
    cn: "展示的要素（原页英文标签译成法语：Expressions de temps 时间表达、Le passé 过去时、Le présent 现在时、Le futur 将来时、Les verbes 动词、Le titre 标题、Le vocabulaire clé 核心词汇、Les adjectifs 形容词、Les adverbes 副词）",
    unit: 15,
    theme: "On avance !"
  },
  {
    title: "Remarque",
    cn: "本页为练习页（Exercice 3c、4b，原页标注 p310、p312），非词汇库；含分组讨论与展示规划任务，图形组织器标签为英文，无粉红高亮例句。",
    unit: 15,
    theme: "On avance !"
  },
  {
    title: "À l'aéroport",
    cn: "在机场（原页表头：At the airport）",
    unit: 16,
    theme: "En voyage scolaire"
  },
  {
    title: "À l'auberge de jeunesse",
    cn: "在青年旅舍（原页表头：At the youth hostel）",
    unit: 16,
    theme: "En voyage scolaire"
  },
  {
    title: "À la gare",
    cn: "在火车站（原页表头：At the station）",
    unit: 16,
    theme: "En voyage scolaire"
  },
  {
    title: "La politesse et l'impératif",
    cn: "礼貌用语与祈使句：Avez-vous... ?（您有……吗）、Retirez vos chaussures（请脱鞋）",
    unit: 16,
    theme: "En voyage scolaire"
  },
  {
    title: "Les parties du corps",
    cn: "身体部位",
    unit: 17,
    theme: "Raconte-moi une vie"
  },
  {
    title: "Expressions idiomatiques",
    cn: "习语、习惯表达",
    unit: 17,
    theme: "Raconte-moi une vie"
  },
  {
    title: "Des conseils pour la santé et le bien-être",
    cn: "健康与养生建议（动词短语）",
    unit: 17,
    theme: "Raconte-moi une vie"
  },
  {
    title: "Les sens",
    cn: "五种感官（名词与感官动词）",
    unit: 17,
    theme: "Raconte-moi une vie"
  },
  {
    title: "Les symptômes",
    cn: "症状（含 avoir mal à 结构）",
    unit: 17,
    theme: "Raconte-moi une vie"
  },
  {
    title: "Les meilleurs amis",
    cn: "最好的朋友（connaître 的用法）",
    unit: 18,
    theme: "Nous voilà dans la cité"
  },
  {
    title: "Les cadeaux (m) d'anniversaire",
    cn: "生日礼物",
    unit: 18,
    theme: "Nous voilà dans la cité"
  },
  {
    title: "Le superlatif",
    cn: "最高级：le plus / le moins / le meilleur / le pire",
    unit: 18,
    theme: "Nous voilà dans la cité"
  },
  {
    title: "Les fêtes, les anniversaires et les invitations",
    cn: "聚会、生日与邀请（邀请与拒绝的表达）",
    unit: 18,
    theme: "Nous voilà dans la cité"
  },
  {
    title: "Le verbe connaître",
    cn: "动词 connaître 变位：je connais, tu connais, il connaît, nous connaissons, vous connaissez, ils connaissent",
    unit: 18,
    theme: "Nous voilà dans la cité"
  },
  {
    title: "Exercice 5f En plus",
    cn: "拓展练习5f：描述职业（页首提示 p391）",
    unit: 19,
    theme: "On travaille"
  },
  {
    title: "Qu'est-ce que tu voudrais être ?",
    cn: "你想成为什么？（页内小标题，p393）",
    unit: 19,
    theme: "On travaille"
  },
  {
    title: "Si + imparfait, conditionnel présent",
    cn: "si 从句用未完成过去时、主句用条件式现在时：Si j'avais le temps, S'il faisait beau, S'il faisait mauvais, Si je pouvais（需补全句子）",
    unit: 19,
    theme: "On travaille"
  },
  {
    title: "Réfléchissons !",
    cn: "反思环节标题",
    unit: 20,
    theme: "On révise"
  },
  {
    title: "End of unit task: Le moment est venu !",
    cn: "单元末任务：时机到了！",
    unit: 20,
    theme: "On révise"
  },
  {
    title: "Le futur et le superlatif",
    cn: "简单将来时和最高级（本单元自评要点）",
    unit: 20,
    theme: "On révise"
  },
  {
    title: "Language learning strategies",
    cn: "语言学习策略：动词时间线（verb timeline）、3Q/O/P/C 写作法",
    unit: 20,
    theme: "On révise"
  },
  {
    title: "Mon dossier",
    cn: "我的学习档案（页眉）",
    unit: 21,
    theme: "On réussit !"
  },
  {
    title: "Student Reflection Note 1",
    cn: "学生反思记录表1（空白表格，英文表头：SCHOOL / STUDENT / TITLE 等）",
    unit: 21,
    theme: "On réussit !"
  }
];

const enavantExamples = [
  {
    fr: "Comment tu t'appelles ?",
    cn: "你叫什么名字？",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    fr: "Comment ça s'écrit ?",
    cn: "这个怎么拼写？",
    unit: 1,
    theme: "Salut, c'est moi !"
  },
  {
    fr: "Qu'est-ce que c'est ?",
    cn: "这是什么？",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    fr: "Qu'est-ce que tu as dans ton cartable ?",
    cn: "你的书包里有什么？",
    unit: 2,
    theme: "Dans la salle de classe"
  },
  {
    fr: "Tu habites en ville ou en banlieue ?",
    cn: "你住在城里还是郊区？",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    fr: "J'aime mon quartier !",
    cn: "我喜欢我的街区！",
    unit: 3,
    theme: "Où habites-tu ?"
  },
  {
    fr: "Quel âge ont tes grands-parents ?",
    cn: "你的祖父母多大年纪？",
    unit: 4,
    theme: "Mes proches"
  },
  {
    fr: "Ma mère, mon père, mes parents",
    cn: "我的妈妈、我的爸爸、我的父母",
    unit: 4,
    theme: "Mes proches"
  },
  {
    fr: "Faire la bise",
    cn: "贴面吻（在脸颊上亲一下）",
    unit: 4,
    theme: "Mes proches"
  },
  {
    fr: "Décris ta famille !",
    cn: "描述一下你的家庭！",
    unit: 4,
    theme: "Mes proches"
  },
  {
    fr: "Où sont mes clés ?",
    cn: "我的钥匙在哪里？",
    unit: 5,
    theme: "Chez moi"
  },
  {
    fr: "Les sciences sont plus difficiles que les maths,…",
    cn: "理科比数学更难……",
    unit: 8,
    theme: "Mes études"
  },
  {
    fr: "Tu préfères les fruits ou les légumes ?",
    cn: "你更喜欢水果还是蔬菜？",
    unit: 9,
    theme: "On marche bien"
  },
  {
    fr: "Où se trouve la banque ?",
    cn: "银行在哪里？",
    unit: 10,
    theme: "En ville"
  },
  {
    fr: "Et pour s'habiller à la mode ?",
    cn: "那要怎样穿得时髦呢？",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    fr: "Mais qu'est-ce que tu portes ?",
    cn: "那你穿的是什么？",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    fr: "Et s'il pleut ?",
    cn: "那如果下雨呢？",
    unit: 12,
    theme: "On habite depuis le temps"
  },
  {
    fr: "Qu'est-ce que tu as fait le weekend dernier ?",
    cn: "你上周末做了什么？",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    fr: "Qu'est-ce que tu as fait ?",
    cn: "你做了什么？",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    fr: "Qu'est-ce que tu n'as pas fait le weekend dernier ?",
    cn: "你上周末没做什么？",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    fr: "Qu'est-ce que tu n'as pas fait ?",
    cn: "你没做什么？",
    unit: 13,
    theme: "On se téléphone"
  },
  {
    fr: "Elle est pilote. Elle pilote des avions. Elle travaille dans un aéroport.",
    cn: "她是飞行员。她驾驶飞机。她在机场工作。",
    unit: 19,
    theme: "On travaille"
  },
  {
    fr: "Réfléchissons !",
    cn: "让我们想一想！",
    unit: 20,
    theme: "On révise"
  },
  {
    fr: "Le moment est venu !",
    cn: "时机到了！",
    unit: 20,
    theme: "On révise"
  }
];

const enavantUnits = [
  {
    unit: 1,
    theme: "Salut, c'est moi !",
    wordCount: 40
  },
  {
    unit: 2,
    theme: "Dans la salle de classe",
    wordCount: 40
  },
  {
    unit: 3,
    theme: "Où habites-tu ?",
    wordCount: 40
  },
  {
    unit: 4,
    theme: "Mes proches",
    wordCount: 40
  },
  {
    unit: 5,
    theme: "Chez moi",
    wordCount: 40
  },
  {
    unit: 6,
    theme: "Mes habitudes quotidiennes",
    wordCount: 40
  },
  {
    unit: 7,
    theme: "Mes coups de cœur",
    wordCount: 2
  },
  {
    unit: 8,
    theme: "Mes études",
    wordCount: 40
  },
  {
    unit: 9,
    theme: "On marche bien",
    wordCount: 40
  },
  {
    unit: 10,
    theme: "En ville",
    wordCount: 40
  },
  {
    unit: 11,
    theme: "Au marché, au café, au restaurant",
    wordCount: 40
  },
  {
    unit: 12,
    theme: "On habite depuis le temps",
    wordCount: 24
  },
  {
    unit: 13,
    theme: "On se téléphone",
    wordCount: 40
  },
  {
    unit: 14,
    theme: "Pendant les vacances",
    wordCount: 6
  },
  {
    unit: 15,
    theme: "On avance !",
    wordCount: 3
  },
  {
    unit: 16,
    theme: "En voyage scolaire",
    wordCount: 40
  },
  {
    unit: 17,
    theme: "Raconte-moi une vie",
    wordCount: 40
  },
  {
    unit: 18,
    theme: "Nous voilà dans la cité",
    wordCount: 40
  },
  {
    unit: 19,
    theme: "On travaille",
    wordCount: 11
  },
  {
    unit: 20,
    theme: "On révise",
    wordCount: 7
  },
  {
    unit: 21,
    theme: "On réussit !",
    wordCount: 0
  }
];

module.exports = { enavantWords, enavantPoints, enavantExamples, enavantUnits };
