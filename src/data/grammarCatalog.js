const groups = [
  {
    id: 'foundation',
    title: '01 入门地基：句子与词类',
    description: '先建立词类、句子成分、基本句型，解决“英语句子怎么搭起来”。',
    level: '入门',
    topics: [
      ['parts-of-speech', '词类总览', '认识名词、动词、形容词、副词、介词、连词、限定词等核心词类。'],
      ['sentence-elements', '句子成分：主谓宾表定状补', '理解主语、谓语、宾语、表语、定语、状语、补语在句子里的功能。'],
      ['basic-sentence-patterns', '五大基本句型', '掌握 SV、SVO、SVC、SVOO、SVOC 五种英语句子骨架。'],
      ['be-verbs', 'Be 动词：am / is / are', '掌握英语最基础的系动词结构：主语 + be + 表语。'],
      ['there-be', 'There be 句型', '表达“某处有某物/某人”，区分 there is 和 there are。'],
      ['questions-negatives', '疑问句与否定句基础', '掌握 be、助动词、情态动词构成疑问和否定的核心规则。']
    ]
  },
  {
    id: 'noun-system',
    title: '02 名词系统：名词、冠词、代词、限定词',
    description: '解决英语名词短语如何表达“一个、这个、这些、很多、我的”。',
    level: '基础',
    topics: [
      ['nouns-countability', '名词可数与不可数', '区分 a book / water / advice 等可数与不可数用法。'],
      ['singular-plural', '名词单复数', '掌握规则复数、不规则复数以及单复数一致。'],
      ['articles', '冠词：a / an / the / 零冠词', '理解泛指、特指、首次提及和再次提及。'],
      ['determiners', '限定词：this / that / some / any / each', '掌握名词前的限定、数量和指代。'],
      ['pronouns', '代词系统', '掌握人称代词、物主代词、反身代词、指示代词和不定代词。'],
      ['quantifiers', '数量词：many / much / few / little / enough', '区分可数、不可数以及数量强弱。'],
      ['possessives', "所有格：'s 与 of", "表达所属关系，区分 Tom's book 和 the door of the room。"]
    ]
  },
  {
    id: 'verb-tense',
    title: '03 动词与时态：动作、时间、助动词',
    description: '解决英语最核心的动词变化和时间表达。',
    level: '核心',
    topics: [
      ['present-simple', '一般现在时', '表达习惯、事实、规律和稳定状态。'],
      ['present-continuous', '现在进行时', '表达此刻正在发生或当前阶段正在进行的动作。'],
      ['past-simple', '一般过去时', '表达过去某个时间发生并结束的动作或状态。'],
      ['past-continuous', '过去进行时', '表达过去某一时刻正在进行的动作或背景。'],
      ['future-forms', '将来表达：will / be going to / 现在进行时表将来', '比较预测、计划、安排和临时决定。'],
      ['present-perfect', '现在完成时', '表达过去动作对现在的影响，或从过去持续到现在。'],
      ['present-perfect-continuous', '现在完成进行时', '强调从过去持续到现在的动作过程。'],
      ['past-perfect', '过去完成时', '表达过去的过去，说明两个过去动作的先后。'],
      ['tense-comparison', '时态综合辨析', '比较一般时、进行时、完成时在真实语境中的选择。'],
      ['verb-forms', '动词形式：原形、三单、过去式、过去分词、ing', '系统掌握动词变化规则与不规则形式。']
    ]
  },
  {
    id: 'modality-voice',
    title: '04 情态、语态与语气',
    description: '表达能力、义务、推测、被动和假设。',
    level: '进阶',
    topics: [
      ['modal-verbs', '情态动词', '表达能力、可能性、许可、建议、义务等语气。'],
      ['modal-perfect', '情态动词 + have done', '表达对过去的推测、遗憾或责备。'],
      ['passive-voice', '被动语态', '当重点是动作承受者时，使用 be + 过去分词。'],
      ['causative-have-get', '使役结构：have / get something done', '表达让别人完成某事或某事被处理。'],
      ['subjunctive-mood', '虚拟语气基础', '表达与事实相反、愿望、建议和假设。'],
      ['conditionals', '条件句：零、一、二、三类条件句', '系统掌握 if 条件句中的真实、可能和虚拟。']
    ]
  },
  {
    id: 'adjective-adverb-preposition',
    title: '05 修饰系统：形容词、副词、介词',
    description: '让句子变得准确：描述性质、程度、方式、地点和时间。',
    level: '基础',
    topics: [
      ['adjectives', '形容词用法', '掌握形容词作定语、表语及多个形容词排序。'],
      ['adverbs', '副词用法', '表达方式、频率、程度、时间和地点。'],
      ['comparatives-superlatives', '比较级与最高级', '比较两者、多者以及倍数表达。'],
      ['prepositions-place-time', '介词：时间与地点', '区分 at / in / on / by / during / for / since 等高频介词。'],
      ['prepositional-phrases', '介词短语', '理解介词短语作定语、状语和补语。'],
      ['phrasal-verbs', '短语动词', '掌握 look up、give up、turn on 等动词 + 小品词结构。']
    ]
  },
  {
    id: 'clauses',
    title: '06 从句系统：把简单句变复杂句',
    description: '主流语法学习的高级核心：名词从句、定语从句、状语从句。',
    level: '高级',
    topics: [
      ['noun-clauses', '名词性从句', '掌握 that / whether / wh- 从句作主语、宾语、表语和同位语。'],
      ['relative-clauses', '定语从句', '用从句修饰名词，常见关系词有 who, which, that, where。'],
      ['adverbial-clauses-time', '时间状语从句', '掌握 when / while / before / after / until / as soon as。'],
      ['adverbial-clauses-reason-result', '原因、结果、目的状语从句', '掌握 because / so that / so...that / in order that。'],
      ['adverbial-clauses-concession', '让步与对比状语从句', '掌握 although / though / even though / whereas。'],
      ['reduced-clauses', '从句简化', '把部分从句压缩成分词短语、不定式或介词短语。']
    ]
  },
  {
    id: 'nonfinite',
    title: '07 非谓语动词：不定式、动名词、分词',
    description: '解决一个句子里出现多个动词时如何处理。',
    level: '高级',
    topics: [
      ['infinitives', '不定式：to do', '掌握作主语、宾语、目的状语、定语和补语。'],
      ['gerunds', '动名词：doing', '掌握 doing 作名词性成分，以及常接 gerund 的动词。'],
      ['participles', '分词：doing / done', '掌握现在分词和过去分词作定语、状语和补语。'],
      ['infinitive-vs-gerund', 'to do 与 doing 辨析', '比较 remember to do / remember doing 等常见差异。'],
      ['absolute-construction', '独立主格结构', '理解名词/代词 + 分词/形容词/介词短语的高级表达。']
    ]
  },
  {
    id: 'syntax-advanced',
    title: '08 句法提升：并列、倒装、强调、省略',
    description: '从“正确”走向“高级、地道、书面化”。',
    level: '高级',
    topics: [
      ['coordination', '并列结构', '掌握 and / but / or / so / yet 连接词、短语和句子。'],
      ['parallelism', '平行结构', '保持语法形式一致，让表达更清晰。'],
      ['inversion', '倒装句', '掌握否定词前置、only 前置、so/neither 倒装等结构。'],
      ['emphasis', '强调句与强调结构', '掌握 It is/was...that... 以及 do 强调。'],
      ['ellipsis', '省略结构', '理解重复信息省略，提升阅读复杂句能力。'],
      ['agreement', '主谓一致', '掌握单复数主语、就近原则、集合名词等一致规则。']
    ]
  },
  {
    id: 'writing-grammar',
    title: '09 写作语法与易错点',
    description: '面向考试、写作和真实表达的语法准确性。',
    level: '综合',
    topics: [
      ['punctuation', '标点与句子边界', '掌握逗号、分号、冒号、引号及避免逗号拼接。'],
      ['fragments-runons', '残缺句与流水句', '识别 fragment、run-on sentence 和 comma splice。'],
      ['reported-speech', '直接引语与间接引语', '掌握时态后移、人称变化、时间地点变化。'],
      ['relative-pronoun-omission', '关系词省略', '判断定语从句中 that / which / who 何时可以省略。'],
      ['common-errors', '高频语法易错点综合', '集中训练中式英语、搭配、冠词、介词和时态混用。'],
      ['exam-grammar-review', '考试语法综合复习', '面向选择题、完形、阅读长难句和写作改错的综合训练。']
    ]
  }
];

const examplesByGroup = {
  foundation: [
    ['The young teacher explained the rule clearly.', '那位年轻老师清楚地解释了这条规则。', 'The young teacher 是主语，explained 是谓语动词，the rule 是宾语，clearly 是方式状语。'],
    ['Does she like English?', '她喜欢英语吗？', '一般疑问句把助动词 does 放到主语前，实义动词 like 恢复原形。']
  ],
  'noun-system': [
    ['I bought a book, and the book is about grammar.', '我买了一本书，那本书是关于语法的。', '第一次提到用 a book，再次提到用 the book。'],
    ['She gave me some advice.', '她给了我一些建议。', 'advice 是不可数名词，不能说 advices。']
  ],
  'verb-tense': [
    ['I study English every day.', '我每天学习英语。', 'every day 表示习惯，用一般现在时。'],
    ['She has lived here for five years.', '她已经在这里住了五年。', 'for five years 表示从过去持续到现在，用现在完成时。']
  ],
  'modality-voice': [
    ['You should review the lesson.', '你应该复习这一课。', 'should 表示建议，后面接动词原形 review。'],
    ['The letter was written yesterday.', '这封信是昨天写的。', 'letter 是动作承受者，用 was written 表达被动。']
  ],
  'adjective-adverb-preposition': [
    ['She speaks English fluently.', '她英语说得很流利。', 'fluently 是副词，修饰 speaks。'],
    ['The book on the desk is mine.', '桌上的那本书是我的。', 'on the desk 是介词短语，修饰 The book。']
  ],
  clauses: [
    ['I know that he is honest.', '我知道他很诚实。', 'that he is honest 是宾语从句，作 know 的宾语。'],
    ['The book that I bought is useful.', '我买的那本书很有用。', 'that I bought 是定语从句，修饰 The book。']
  ],
  nonfinite: [
    ['I want to improve my grammar.', '我想提高语法。', 'want 是谓语，to improve 是不定式作宾语。'],
    ['Learning grammar takes time.', '学习语法需要时间。', 'Learning grammar 是动名词短语作主语。']
  ],
  'syntax-advanced': [
    ['She likes reading, writing, and speaking English.', '她喜欢读英语、写英语和说英语。', 'reading、writing、speaking 保持平行结构。'],
    ['Never have I seen such a beautiful place.', '我从未见过这么美的地方。', '否定词 Never 置于句首，引起部分倒装。']
  ],
  'writing-grammar': [
    ['Because I was tired, I went home early.', '因为我累了，所以我早早回家了。', 'Because 从句不能单独成句，后面需要主句。'],
    ['I like grammar; it helps me write clearly.', '我喜欢语法；它帮助我写得更清楚。', '两个完整句子关系紧密时，可以用分号连接。']
  ]
};

const sectionIntro = {
  foundation: '学习英语语法不要先背术语，而要先判断它在句子中承担什么功能：表达身份、动作、关系、数量，还是补充时间、地点、原因等信息。',
  'noun-system': '名词、冠词、代词、限定词和数量词共同构成名词短语。它们经常充当主语、宾语、表语或介词宾语。',
  'verb-tense': '英语动词不仅表示动作，还要通过时态、助动词和词形变化说明动作发生的时间、状态和与现在的关系。',
  'modality-voice': '这一组语法表达能力、可能性、义务、被动关系或与事实相反的假设。',
  'adjective-adverb-preposition': '形容词、副词和介词短语负责修饰信息，让句子在性质、程度、方式、地点和时间上更准确。',
  clauses: '从句可以充当名词、形容词或副词的功能，是阅读长难句和写作升级的核心。',
  nonfinite: '一个简单句通常只有一个谓语动词。当需要再表达一个动作时，常用 to do、doing 或 done。',
  'syntax-advanced': '并列、平行、倒装、强调、省略和一致规则能让句子更清晰、更自然，也常出现在考试长难句中。',
  'writing-grammar': '写作语法关注句子边界、标点、改错和真实输出，目标是把选择题能力迁移到写作。'
};

const flatTopicTuples = groups.flatMap(group => group.topics.map(topic => ({ group, topic })));

function topicToLesson(group, topicTuple) {
  const [id, title, summary] = topicTuple;
  const currentIndex = flatTopicTuples.findIndex(item => item.topic[0] === id);
  const nextId = flatTopicTuples[currentIndex + 1]?.topic[0] || null;
  const examples = examplesByGroup[group.id] || examplesByGroup.foundation;
  return {
    id,
    level: group.level,
    track: group.title,
    categoryId: group.id,
    categoryTitle: group.title,
    categoryDescription: group.description,
    title,
    summary,
    nextId,
    sections: [
      {
        heading: `1. 核心定位：${title}`,
        body: `${summary} ${sectionIntro[group.id] || sectionIntro.foundation}`,
        examples: examples.map(([en, zh, note]) => ({ en, zh, note }))
      },
      {
        heading: '2. 学习步骤：先识别，再套规则，最后看语境',
        body: `学习「${title}」时，先判断它在句子中的功能，再观察关键词、词序、主谓关系和固定搭配。练习题会优先训练常见考法和高频易错点。`,
        examples: [
          { en: examples[0][0], zh: examples[0][1], note: `这类例句用于提醒你：${examples[0][2]}` },
          { en: examples[1][0], zh: examples[1][1], note: `做题时不要只翻译中文，要回到「${title}」的语法规则。` }
        ]
      }
    ]
  };
}

export const grammarGroups = groups.map(group => ({
  id: group.id,
  title: group.title,
  description: group.description,
  level: group.level,
  topics: group.topics.map(topic => topicToLesson(group, topic))
}));

export const grammarCatalog = grammarGroups.flatMap(group => group.topics);
