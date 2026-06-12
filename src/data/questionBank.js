const templates = {
  'be-verbs': [
    { stem: 'I ___ a beginner in English grammar.', translation: '我是英语语法初学者。', answer: 'am', options: ['am','is','are','be'], explain: '主语是 I，be 动词必须用 am。' },
    { stem: 'She ___ very interested in this lesson.', translation: '她对这节课很感兴趣。', answer: 'is', options: ['am','is','are','be'], explain: 'She 是第三人称单数，后面用 is。' },
    { stem: 'They ___ not in the same class.', translation: '他们不在同一个班。', answer: 'are', options: ['am','is','are','was'], explain: 'They 是复数主语，否定句结构是 are not。' },
    { stem: '___ this your notebook?', translation: '这是你的笔记本吗？', answer: 'Is', options: ['Is','Are','Am','Be'], explain: 'this 是单数，疑问句把 is 提到主语前。' }
  ],
  'present-simple': [
    { stem: 'Tom ___ English every day.', translation: 'Tom 每天学习英语。', answer: 'studies', options: ['study','studies','studying','studied'], explain: 'Tom 是第三人称单数，一般现在时动词 study 变 studies。' },
    { stem: 'We ___ grammar on weekends.', translation: '我们周末复习语法。', answer: 'review', options: ['reviews','review','reviewing','reviewed'], explain: 'We 不是第三人称单数，动词用原形 review。' },
    { stem: 'She does not ___ coffee.', translation: '她不喜欢咖啡。', answer: 'like', options: ['likes','like','liked','liking'], explain: 'does not 后面的实义动词要恢复原形。' },
    { stem: '___ you often read English aloud?', translation: '你经常大声读英语吗？', answer: 'Do', options: ['Do','Does','Are','Is'], explain: '主语 you 的一般现在时疑问句用 Do。' }
  ],
  'present-continuous': [
    { stem: 'I ___ watching a grammar video now.', translation: '我现在正在看语法视频。', answer: 'am', options: ['am','is','are','do'], explain: '现在进行时结构是 be + doing，I 搭配 am。' },
    { stem: 'They are ___ for the English test.', translation: '他们正在为英语考试学习。', answer: 'studying', options: ['study','studies','studying','studied'], explain: 'are 后面接动词 ing，构成现在进行时。' },
    { stem: 'She ___ learning pronunciation this month.', translation: '她这个月正在学发音。', answer: 'is', options: ['am','is','are','does'], explain: 'She 是单数主语，现在进行时用 is learning。' }
  ],
  'past-simple': [
    { stem: 'I ___ this grammar point yesterday.', translation: '我昨天复习了这个语法点。', answer: 'reviewed', options: ['review','reviews','reviewed','reviewing'], explain: 'yesterday 是过去时间，动词用过去式 reviewed。' },
    { stem: 'She ___ a new dictionary last week.', translation: '她上周买了一本新词典。', answer: 'bought', options: ['buy','buys','bought','buying'], explain: 'last week 提示一般过去时，buy 的过去式是 bought。' },
    { stem: 'They did not ___ the answer.', translation: '他们不知道答案。', answer: 'know', options: ['knew','knows','know','known'], explain: 'did not 后面的实义动词用原形 know。' }
  ],
  'present-perfect': [
    { stem: 'I have ___ the exercise.', translation: '我已经完成了练习。', answer: 'finished', options: ['finish','finishes','finished','finishing'], explain: '现在完成时结构是 have + 过去分词。' },
    { stem: 'She has ___ here for three years.', translation: '她在这里住了三年。', answer: 'lived', options: ['live','lives','lived','living'], explain: 'has + 过去分词，for three years 表示持续到现在。' },
    { stem: 'Have you ___ this rule before?', translation: '你以前见过这个规则吗？', answer: 'seen', options: ['see','saw','seen','seeing'], explain: 'have 后面用过去分词，see 的过去分词是 seen。' }
  ],
  'modal-verbs': [
    { stem: 'She can ___ English fluently.', translation: '她能流利地说英语。', answer: 'speak', options: ['speaks','speak','spoke','speaking'], explain: '情态动词 can 后面必须接动词原形。' },
    { stem: 'You should ___ your mistakes carefully.', translation: '你应该认真复习你的错误。', answer: 'review', options: ['reviews','review','reviewed','reviewing'], explain: 'should 表示建议，后面接动词原形。' },
    { stem: 'Students must ___ the rules.', translation: '学生必须遵守规则。', answer: 'follow', options: ['follows','follow','followed','following'], explain: 'must 后面接动词原形 follow。' }
  ],
  'passive-voice': [
    { stem: 'The letter was ___ by Mary.', translation: '这封信是 Mary 写的。', answer: 'written', options: ['write','wrote','written','writing'], explain: '被动语态结构是 be + 过去分词，write 的过去分词是 written。' },
    { stem: 'English is ___ in many countries.', translation: '许多国家都说英语。', answer: 'spoken', options: ['speak','spoke','spoken','speaking'], explain: 'English 是动作承受者，is spoken 是被动语态。' },
    { stem: 'The room was ___ yesterday.', translation: '房间昨天被打扫了。', answer: 'cleaned', options: ['clean','cleans','cleaned','cleaning'], explain: 'was + cleaned 表示过去被动。' }
  ],
  'relative-clauses': [
    { stem: 'The man ___ is talking is my teacher.', translation: '正在讲话的那个人是我的老师。', answer: 'who', options: ['who','which','where','when'], explain: '先行词是人 The man，关系词用 who。' },
    { stem: 'This is the book ___ I bought yesterday.', translation: '这是我昨天买的那本书。', answer: 'that', options: ['where','when','that','who'], explain: '先行词是物 book，that 可作宾语引导定语从句。' },
    { stem: 'This is the school ___ I studied.', translation: '这是我曾经学习过的学校。', answer: 'where', options: ['who','which','where','whose'], explain: '先行词是地点 school，并在从句中作地点状语，用 where。' }
  ]
};

export function buildQuestionBank(grammarId) {
  const base = templates[grammarId] || templates['be-verbs'];
  return Array.from({ length: 200 }, (_, index) => {
    const t = base[index % base.length];
    const round = Math.floor(index / base.length) + 1;
    return {
      id: `${grammarId}-${index + 1}`,
      grammarId,
      stem: `${t.stem}  (${round})`,
      translation: t.translation,
      options: shuffle(t.options),
      answer: t.answer,
      explanation: t.explain,
      sourceType: '经典必练题型'
    };
  });
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
