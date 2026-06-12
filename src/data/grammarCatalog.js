export const grammarCatalog = [
  {
    id: 'be-verbs',
    level: '入门',
    title: 'Be 动词：am / is / are',
    summary: '掌握英语最基础的系动词结构：主语 + be + 表语。',
    nextId: 'present-simple',
    sections: [
      {
        heading: '1. Be 动词表示“是 / 处于某种状态”',
        body: 'Be 动词不是普通动作，而是连接主语和身份、状态、位置、性质。am 搭配 I，is 搭配单数主语，are 搭配复数主语和 you。',
        examples: [
          { en: 'I am a student.', zh: '我是一名学生。', note: 'I 后面固定用 am，a student 是身份。' },
          { en: 'She is tired.', zh: '她累了。', note: 'She 是第三人称单数，所以用 is，tired 表示状态。' },
          { en: 'They are in the classroom.', zh: '他们在教室里。', note: 'They 是复数主语，所以用 are，in the classroom 表示位置。' }
        ]
      },
      {
        heading: '2. 否定句：be 后面直接加 not',
        body: 'Be 动词的否定不需要 do / does，直接在 am / is / are 后面加 not。',
        examples: [
          { en: 'He is not my brother.', zh: '他不是我的兄弟。', note: 'is 后直接加 not，表示否定身份。' },
          { en: 'We are not late.', zh: '我们没有迟到。', note: 'are not 后接形容词 late，表示状态否定。' }
        ]
      },
      {
        heading: '3. 一般疑问句：be 提到主语前',
        body: '含 be 动词的句子变一般疑问句时，把 be 动词提前即可。',
        examples: [
          { en: 'Are you ready?', zh: '你准备好了吗？', note: '陈述句 You are ready. 变疑问句时 are 提前。' },
          { en: 'Is this your book?', zh: '这是你的书吗？', note: 'this 是单数，所以用 is。' }
        ]
      }
    ]
  },
  {
    id: 'present-simple',
    level: '基础',
    title: '一般现在时',
    summary: '表达习惯、事实、规律和稳定状态。',
    nextId: 'present-continuous',
    sections: [
      {
        heading: '1. 一般现在时表示习惯或事实',
        body: '一般现在时常用于每天、经常、通常发生的动作，也用于客观事实。',
        examples: [
          { en: 'I read English every morning.', zh: '我每天早上读英语。', note: 'every morning 表示习惯性动作。' },
          { en: 'The sun rises in the east.', zh: '太阳从东方升起。', note: '这是客观事实，所以用一般现在时。' }
        ]
      },
      {
        heading: '2. 第三人称单数动词要变化',
        body: '主语是 he / she / it 或单数名词时，普通动词通常加 -s 或 -es。',
        examples: [
          { en: 'She likes grammar.', zh: '她喜欢语法。', note: 'She 是第三人称单数，like 变 likes。' },
          { en: 'Tom goes to school by bus.', zh: 'Tom 坐公交去上学。', note: 'go 的第三人称单数形式是 goes。' }
        ]
      },
      {
        heading: '3. 否定和疑问使用 do / does',
        body: '普通动词构成否定或疑问时，需要助动词 do / does，后面的实义动词恢复原形。',
        examples: [
          { en: 'She does not like coffee.', zh: '她不喜欢咖啡。', note: 'does 已经体现第三人称单数，所以 like 用原形。' },
          { en: 'Do you play basketball?', zh: '你打篮球吗？', note: 'you 搭配 do，play 保持原形。' }
        ]
      }
    ]
  },
  {
    id: 'present-continuous',
    level: '基础',
    title: '现在进行时',
    summary: '表达此刻正在发生或当前阶段正在进行的动作。',
    nextId: 'past-simple',
    sections: [
      {
        heading: '1. 结构：be + 动词 ing',
        body: '现在进行时由 am / is / are 加动词 ing 构成，强调动作正在进行。',
        examples: [
          { en: 'I am studying English now.', zh: '我现在正在学英语。', note: 'now 提示此刻正在发生，am studying 是进行时。' },
          { en: 'They are watching a movie.', zh: '他们正在看电影。', note: 'They 是复数，所以用 are watching。' }
        ]
      },
      {
        heading: '2. 当前阶段正在进行',
        body: '不一定是说话这一秒正在做，也可以表示最近一段时间正在进行的事情。',
        examples: [
          { en: 'She is learning French this year.', zh: '她今年正在学法语。', note: 'this year 表示当前阶段，不一定此刻正在学。' }
        ]
      }
    ]
  },
  {
    id: 'past-simple',
    level: '基础',
    title: '一般过去时',
    summary: '表达过去某个时间发生并结束的动作或状态。',
    nextId: 'present-perfect',
    sections: [
      {
        heading: '1. 过去发生并结束',
        body: '一般过去时常与 yesterday, last week, in 2020 等过去时间连用。',
        examples: [
          { en: 'I visited Beijing last year.', zh: '我去年参观了北京。', note: 'last year 是明确过去时间，visit 变 visited。' },
          { en: 'She bought a new phone yesterday.', zh: '她昨天买了一部新手机。', note: 'buy 的过去式是不规则形式 bought。' }
        ]
      }
    ]
  },
  {
    id: 'present-perfect',
    level: '进阶',
    title: '现在完成时',
    summary: '表达过去动作对现在的影响，或从过去持续到现在。',
    nextId: 'modal-verbs',
    sections: [
      {
        heading: '1. 结构：have / has + 过去分词',
        body: '现在完成时关注“现在的结果”或“到现在为止的经历”。',
        examples: [
          { en: 'I have finished my homework.', zh: '我已经完成作业了。', note: '重点是现在作业完成了，不只是过去做过。' },
          { en: 'She has lived here for five years.', zh: '她在这里住了五年。', note: 'for five years 表示从过去持续到现在。' }
        ]
      }
    ]
  },
  {
    id: 'modal-verbs',
    level: '进阶',
    title: '情态动词',
    summary: '表达能力、可能性、许可、建议、义务等语气。',
    nextId: 'passive-voice',
    sections: [
      {
        heading: '1. 情态动词后接动词原形',
        body: 'can, should, must, may, might 等后面直接接动词原形，不受主语人称影响。',
        examples: [
          { en: 'She can speak English.', zh: '她会说英语。', note: 'can 后面用 speak 原形，不能说 can speaks。' },
          { en: 'You should review your mistakes.', zh: '你应该复习你的错题。', note: 'should 表示建议，后面接 review 原形。' }
        ]
      }
    ]
  },
  {
    id: 'passive-voice',
    level: '进阶',
    title: '被动语态',
    summary: '当重点是动作承受者时，使用 be + 过去分词。',
    nextId: 'relative-clauses',
    sections: [
      {
        heading: '1. 结构：be + 过去分词',
        body: '被动语态强调主语是动作的承受者，而不是执行者。',
        examples: [
          { en: 'The window was broken by Tom.', zh: '窗户被 Tom 打破了。', note: 'window 是被打破的对象，所以用被动语态。' },
          { en: 'English is spoken in many countries.', zh: '许多国家都说英语。', note: 'English 是被说的语言，is spoken 表示被动。' }
        ]
      }
    ]
  },
  {
    id: 'relative-clauses',
    level: '高级',
    title: '定语从句',
    summary: '用从句修饰名词，常见关系词有 who, which, that, where。',
    nextId: null,
    sections: [
      {
        heading: '1. 定语从句修饰前面的名词',
        body: '定语从句相当于一个较长的形容词，用来说明前面的名词是谁、哪一个、什么样。',
        examples: [
          { en: 'The man who is speaking is my teacher.', zh: '正在讲话的那个人是我的老师。', note: 'who is speaking 修饰 The man。' },
          { en: 'This is the book that I bought yesterday.', zh: '这是我昨天买的那本书。', note: 'that I bought yesterday 修饰 the book。' }
        ]
      }
    ]
  }
];
