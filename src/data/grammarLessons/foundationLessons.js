function ex(en, zh, note) {
  return { en, zh, note };
}

export const foundationLessonDetails = {
  'parts-of-speech': {
    sections: [
      {
        heading: '1. 核心定位：词类不是单词标签，而是句子功能',
        body: '词类学习的目标不是背“名词、动词、形容词”的中文定义，而是看到一个词在句子中承担什么工作。英语词类决定一个词能站在哪里、能修饰谁、能和哪些词组合。很多单词会变换词类，例如 light 可以是名词、形容词或动词，所以必须回到句子位置判断。',
        examples: [
          ex('Light travels fast.', '光传播得很快。', 'Light 在主语位置，表示“光”，是名词；travels 是谓语动词。'),
          ex('This is a light bag.', '这是一个轻的包。', 'light 放在名词 bag 前修饰名词，表示“轻的”，是形容词。'),
          ex('Please light the candle.', '请点燃蜡烛。', 'light 在 Please 后作动作，后面接宾语 the candle，是动词。')
        ]
      },
      {
        heading: '2. 必须掌握：八类核心词的功能',
        body: '名词负责命名人、物、地点、概念；动词负责表达动作或状态；形容词修饰名词或作表语；副词修饰动词、形容词、副词或整句；介词表示关系并带宾语；连词连接词、短语或句子；限定词限定名词范围；代词代替名词短语。做题时先问：这个空格要承担什么句子功能？',
        examples: [
          ex('The careful student reads slowly.', '那个细心的学生慢慢地读。', 'student 是名词，careful 是形容词修饰 student，reads 是动词，slowly 是副词修饰 reads。'),
          ex('She put the book on the desk.', '她把书放在桌子上。', 'on 是介词，the desk 是介词宾语；on the desk 说明位置。'),
          ex('This book is useful, and I like it.', '这本书有用，而且我喜欢它。', 'and 是连词，连接两个分句；it 是代词，指代 this book。')
        ]
      },
      {
        heading: '3. 必须理解：词类由位置和搭配决定',
        body: '中文翻译不能直接决定英语词类。同一个中文“好”可能是形容词 good，也可能需要副词 well；同一个英文 work 可以是名词“工作”，也可以是动词“工作”。判断词类时要看它前后出现了什么词、是否带宾语、是否修饰名词、是否被副词修饰。',
        examples: [
          ex('She is a good speaker.', '她是一位优秀的演讲者。', 'good 修饰名词 speaker，是形容词。'),
          ex('She speaks well.', '她讲得很好。', 'well 修饰动词 speaks，是副词，不能用 good。'),
          ex('Hard work pays off.', '努力工作会有回报。', 'work 在这里是名词；hard 修饰名词 work，表示“艰苦的”。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：只按中文意思判断词类；把介词短语当谓语；把形容词拿去修饰动词；把副词放在需要形容词的位置。遇到选择题时，先找主语和谓语，再判断空格是修饰名词、修饰动词，还是作句子核心成分。',
        examples: [
          ex('The answer is correct.', '这个答案是正确的。', 'correct 作表语，说明主语状态，是形容词。'),
          ex('She answered correctly.', '她回答得正确。', 'correctly 修饰动词 answered，是副词。'),
          ex('The man in the room is my teacher.', '房间里的那个人是我的老师。', 'in the room 是介词短语修饰 The man，真正谓语是 is。')
        ]
      }
    ]
  },
  'sentence-elements': {
    sections: [
      {
        heading: '1. 核心定位：句子成分回答“这个部分在句子里做什么”',
        body: '句子成分不是词类。词类看单词类型，句子成分看这个词或短语在句子中的功能。英语最核心的是主语和谓语：主语说明“谁/什么”，谓语说明“做什么/是什么/怎么样”。宾语承受动作，表语说明主语身份或状态，定语修饰名词，状语说明时间、地点、方式、原因等，补语补充说明宾语或主语。',
        examples: [
          ex('The boy opened the window carefully.', '那个男孩小心地打开了窗户。', 'The boy 是主语，opened 是谓语，the window 是宾语，carefully 是方式状语。'),
          ex('The soup tastes delicious.', '这汤尝起来很美味。', 'The soup 是主语，tastes 是系动词，delicious 是表语。'),
          ex('We call him Tom.', '我们叫他 Tom。', 'him 是宾语，Tom 是宾语补足语，补充说明 him 的身份。')
        ]
      },
      {
        heading: '2. 必须掌握：先找谓语，再划分其他成分',
        body: '分析句子时不要从第一个词开始硬翻译。第一步找谓语动词，因为谓语决定句子骨架；第二步找谓语前的主语；第三步看谓语后需要宾语、表语还是补语；最后处理定语和状语。这个顺序能避免被长修饰语干扰。',
        examples: [
          ex('The old book on the table belongs to my father.', '桌上的那本旧书属于我父亲。', '主干是 The book belongs to my father；old 和 on the table 都修饰 book。'),
          ex('After class, the students discussed the problem in groups.', '课后，学生们分组讨论了这个问题。', 'After class 和 in groups 是状语；主干是 the students discussed the problem。'),
          ex('Learning grammar takes time.', '学习语法需要时间。', 'Learning grammar 是动名词短语作主语，takes 是谓语，time 是宾语。')
        ]
      },
      {
        heading: '3. 必须理解：成分可以由词、短语或从句充当',
        body: '主语不一定是一个名词，也可以是不定式、动名词或从句；宾语也可以是从句；定语可以是形容词、介词短语或定语从句。真正要理解的是“功能”，而不是只背某个词类能做什么。',
        examples: [
          ex('What he said surprised me.', '他说的话让我吃惊。', 'What he said 是主语从句，整体作主语。'),
          ex('I know that he is honest.', '我知道他很诚实。', 'that he is honest 是宾语从句，整体作 know 的宾语。'),
          ex('The girl with long hair is my sister.', '那个长头发的女孩是我姐姐/妹妹。', 'with long hair 是介词短语作定语，修饰 The girl。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '中文学习者常把中文话题直接当英文主语，或者看到介词短语就误以为句子已经有谓语。判断完整句时必须确认存在真正的谓语动词。尤其要注意：介词短语不能单独作谓语；从句和非谓语结构不能随意当主句谓语。',
        examples: [
          ex('The book on the desk is mine.', '桌上的那本书是我的。', 'on the desk 不是谓语，is 才是谓语。'),
          ex('Because he was tired, he went home early.', '因为他累了，所以他早回家了。', 'Because 从句是状语从句，主句是 he went home early。'),
          ex('To learn English well requires practice.', '学好英语需要练习。', 'To learn English well 是不定式短语作主语，requires 是谓语。')
        ]
      }
    ]
  },
  'sentence-types': {
    sections: [
      {
        heading: '1. 核心定位：句子类型决定语序和交际目的',
        body: '陈述句用来说明事实或观点；疑问句用来提问；祈使句用来请求、命令、建议或说明步骤；感叹句表达强烈情绪。它们不是简单换标点，而是会影响助动词位置、主语是否出现、what/how 的选择。',
        examples: [
          ex('She likes grammar.', '她喜欢语法。', '陈述句，正常语序是主语 She + 谓语 likes + 宾语 grammar。'),
          ex('Does she like grammar?', '她喜欢语法吗？', '一般疑问句需要助动词 Does 提前，like 用原形。'),
          ex('What a useful lesson it is!', '这是一节多么有用的课啊！', 'What 引导感叹句，中心名词是 lesson。')
        ]
      },
      {
        heading: '2. 必须掌握：四类句子的基本结构',
        body: '陈述句通常是主语 + 谓语；一般疑问句把 be/助动词/情态动词放到主语前；特殊疑问句是疑问词 + 一般疑问句语序；祈使句通常省略主语 you，用动词原形开头；感叹句常用 What + 名词短语 或 How + 形容词/副词。',
        examples: [
          ex('Are you ready?', '你准备好了吗？', 'be 动词疑问句直接把 Are 放到主语 you 前。'),
          ex('Where does he live?', '他住在哪里？', '特殊疑问句：Where + does + 主语 + 动词原形 live。'),
          ex('Read the sentence carefully.', '仔细读这个句子。', '祈使句省略主语 you，用动词原形 Read 开头。')
        ]
      },
      {
        heading: '3. 必须理解：疑问句的核心是助动词系统',
        body: '英语疑问句不是简单把语调升高。只要谓语是实义动词，通常需要 do/does/did 帮助构成疑问；如果句中已有 be、have 作助动词或情态动词，就直接提前它们。疑问句中实义动词往往恢复原形。',
        examples: [
          ex('Did you finish the exercise?', '你完成练习了吗？', 'did 已经表示过去，finish 用原形，不能说 Did you finished。'),
          ex('Can she answer the question?', '她能回答这个问题吗？', '情态动词 can 提前，后面 answer 用原形。'),
          ex('Is the answer correct?', '答案正确吗？', 'be 动词 is 直接提前，不需要 do。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：一般疑问句漏助动词；Did 后仍用过去式；祈使句前误加 you；what/how 感叹句混用。做题时先判断句子目的，再看谓语类型，最后决定是否需要助动词提前。',
        examples: [
          ex('Do you understand the rule?', '你理解这条规则吗？', 'understand 是实义动词，疑问句需要 Do。'),
          ex('How clearly she explains the rule!', '她解释这条规则多么清楚啊！', 'How 修饰副词 clearly。'),
          ex('What an interesting example this is!', '这是一个多么有趣的例子啊！', 'What 修饰名词短语 an interesting example。')
        ]
      }
    ]
  },
  'basic-sentence-patterns': {
    sections: [
      {
        heading: '1. 核心定位：五大句型是英语句子的骨架',
        body: '五大句型不是为了背公式，而是帮助你判断动词后面需要什么。英语句子核心由动词决定：有的动词不需要宾语，有的必须接宾语，有的连接主语和表语，有的需要两个宾语，有的还需要宾语补足语。',
        examples: [
          ex('Birds fly.', '鸟会飞。', 'SV：主语 Birds + 不及物动词 fly。'),
          ex('She reads books.', '她读书。', 'SVO：reads 是及物动词，books 是宾语。'),
          ex('The room is quiet.', '房间很安静。', 'SVC：is 是系动词，quiet 是表语。')
        ]
      },
      {
        heading: '2. 必须掌握：SV / SVO / SVC / SVOO / SVOC',
        body: 'SV 是主语 + 不及物动词；SVO 是主语 + 及物动词 + 宾语；SVC 是主语 + 系动词 + 表语；SVOO 是主语 + 动词 + 间接宾语 + 直接宾语；SVOC 是主语 + 动词 + 宾语 + 宾语补足语。做题时要根据动词的搭配能力选择结构。',
        examples: [
          ex('My teacher gave me a book.', '我的老师给了我一本书。', 'SVOO：me 是间接宾语，a book 是直接宾语。'),
          ex('We found the lesson useful.', '我们发现这节课很有用。', 'SVOC：the lesson 是宾语，useful 补充说明 lesson。'),
          ex('The baby smiled.', '婴儿笑了。', 'smiled 是不及物动词，不需要宾语。')
        ]
      },
      {
        heading: '3. 必须理解：句型由动词决定，不由中文翻译决定',
        body: '中文里“到达学校”有宾语感，但英语 arrive 是不及物动词，要说 arrive at school；中文“讨论关于问题”容易误导，但 discuss 是及物动词，直接接 the problem。学习句型要把动词和它的搭配一起记。',
        examples: [
          ex('They arrived at the station.', '他们到达了车站。', 'arrive 是不及物动词，不能直接说 arrive the station，要加介词 at。'),
          ex('We discussed the plan.', '我们讨论了这个计划。', 'discuss 是及物动词，直接接宾语 the plan，不需要 about。'),
          ex('The idea sounds reasonable.', '这个想法听起来合理。', 'sounds 是系动词，后面接形容词 reasonable 作表语。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：及物动词缺宾语；不及物动词直接接宾语；系动词后用副词；SVOC 中漏掉宾语补足语。遇到长句时先找动词，再问这个动词需要几个核心成分。',
        examples: [
          ex('Please explain the rule.', '请解释这条规则。', 'explain 是及物动词，需要宾语 the rule。'),
          ex('The music sounds beautiful.', '这音乐听起来很美。', 'sounds 是系动词，后面用形容词 beautiful，不用 beautifully。'),
          ex('The news made us happy.', '这个消息让我们很开心。', 'us 是宾语，happy 是宾语补足语。')
        ]
      }
    ]
  },
  'be-verbs': {
    sections: [
      {
        heading: '1. 核心定位：be 动词连接主语和状态/身份/位置',
        body: 'be 动词不表示具体动作，而是把主语和后面的表语连接起来。am/is/are 的选择取决于主语人称和单复数。be 后面可以接名词、形容词、介词短语等，说明主语是谁、怎么样、在哪里。',
        examples: [
          ex('I am a beginner.', '我是初学者。', 'I 搭配 am，a beginner 是名词短语作表语。'),
          ex('She is careful.', '她很细心。', 'She 是第三人称单数，用 is；careful 是形容词表语。'),
          ex('The books are on the desk.', '这些书在桌子上。', 'The books 是复数，用 are；on the desk 是介词短语表位置。')
        ]
      },
      {
        heading: '2. 必须掌握：am / is / are 的选择',
        body: 'I 用 am；you/we/they 和复数名词用 are；he/she/it 和单数名词用 is。否定句在 be 后加 not；疑问句把 be 放到主语前。不要在 be 句的否定和疑问中再加 do。',
        examples: [
          ex('You are right.', '你是对的。', 'you 不管单数还是复数，be 动词都用 are。'),
          ex('This answer is not correct.', '这个答案不正确。', '否定句直接 is not，不需要 does not。'),
          ex('Are these examples clear?', '这些例子清楚吗？', '复数主语 these examples 用 are，疑问句 are 提前。')
        ]
      },
      {
        heading: '3. 必须理解：be 不能和普通动词随意并列',
        body: '中文里“我是喜欢英语的”容易让人说 I am like English，但英语普通动作由实义动词承担，不需要 be。只有进行时、被动语态、系表结构等情况才需要 be。',
        examples: [
          ex('I like English.', '我喜欢英语。', 'like 是实义动词，不能说 I am like English。'),
          ex('I am learning English.', '我正在学英语。', '这里 am 是助动词，和 learning 构成现在进行时。'),
          ex('The door is closed.', '门是关着的。', 'is + closed 表示状态或被动结果。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：I 后用 is；复数主语后用 is；be 和实义动词重复；形容词前漏 be。判断是否需要 be 时，先看句子有没有普通动作。如果只是说明身份、性质、位置，通常需要 be。',
        examples: [
          ex('She is interested in grammar.', '她对语法感兴趣。', 'interested 是形容词，前面需要 is。'),
          ex('They are not in the classroom.', '他们不在教室里。', 'They 是复数，用 are not。'),
          ex('Do you like this lesson?', '你喜欢这节课吗？', 'like 是实义动词，疑问句用 Do，不用 Are you like。')
        ]
      }
    ]
  },
  'there-be': {
    sections: [
      {
        heading: '1. 核心定位：There be 表示“存在”',
        body: 'There be 句型用来表达“某处有某人/某物”。there 不是地点，而是引导词；真正的主语通常在 be 后面。这个结构强调存在，而 have 强调拥有。',
        examples: [
          ex('There is a dictionary on the desk.', '桌上有一本词典。', 'a dictionary 是真正主语，单数，所以用 is。'),
          ex('There are three questions in this exercise.', '这个练习里有三道题。', 'three questions 是复数，所以用 are。'),
          ex('I have a dictionary.', '我有一本词典。', 'have 强调“我拥有”，不是某处存在。')
        ]
      },
      {
        heading: '2. 必须掌握：就近原则和句型变化',
        body: 'There be 的 be 常和后面最近的名词保持一致。否定句在 be 后加 not；疑问句把 be 提前；将来表达可以用 There will be 或 There is going to be。',
        examples: [
          ex('There is a book and two pens on the table.', '桌上有一本书和两支笔。', '最近的名词是 a book，单数，所以用 is。'),
          ex('There are two pens and a book on the table.', '桌上有两支笔和一本书。', '最近的名词是 two pens，复数，所以用 are。'),
          ex('Is there a mistake here?', '这里有错误吗？', '疑问句把 Is 放到 there 前。')
        ]
      },
      {
        heading: '3. 必须理解：There be 和 have 的区别',
        body: 'There be 表示某地存在某物；have 表示某人或某物拥有、具有。中文都可能翻译成“有”，但英语结构不同。There has 通常不是正确的存在句。',
        examples: [
          ex('There is a park near my home.', '我家附近有一个公园。', '强调地点附近存在一个公园，用 There is。'),
          ex('My city has a large park.', '我的城市有一个大公园。', 'My city 作主语，强调城市拥有这个设施，用 has。'),
          ex('There will be a test tomorrow.', '明天会有一次测试。', '将来的存在用 There will be。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：说 There has...；忽略就近原则；把地点 there 和引导词 there 混淆；否定疑问乱加 do。做题时找到 be 后最近的名词，再判断单复数。',
        examples: [
          ex('There is not enough time.', '时间不够。', 'time 是不可数名词，按单数处理，用 is not。'),
          ex('Are there any examples?', '有例子吗？', '复数 examples 用 are，疑问句 are 提前。'),
          ex('There was a problem yesterday.', '昨天有一个问题。', '过去存在用 There was。')
        ]
      }
    ]
  },
  'questions-negatives': {
    sections: [
      {
        heading: '1. 核心定位：疑问和否定依赖助动词',
        body: '英语不是靠单纯语调或加“不”来构造疑问和否定。be 动词、情态动词可以直接提前或加 not；普通实义动词通常需要 do/does/did 帮忙。理解助动词系统，是后面学习时态、语态和从句的基础。',
        examples: [
          ex('She is ready.', '她准备好了。', 'be 句否定是 She is not ready；疑问是 Is she ready?'),
          ex('She likes English.', '她喜欢英语。', '实义动词 likes 的否定是 She does not like English。'),
          ex('Can you explain it?', '你能解释它吗？', '情态动词 can 直接提前，后面 explain 用原形。')
        ]
      },
      {
        heading: '2. 必须掌握：三套规则',
        body: '第一，be 句：be + not，疑问时 be 提前。第二，情态动词句：modal + not，疑问时 modal 提前。第三，实义动词句：do/does/did + not + 动词原形，疑问时 Do/Does/Did + 主语 + 动词原形。',
        examples: [
          ex('He does not understand the rule.', '他不理解这条规则。', 'does not 后的 understand 必须用原形。'),
          ex('Did they finish the homework?', '他们完成作业了吗？', 'did 表过去，finish 用原形。'),
          ex('You should not ignore the subject.', '你不应该忽略主语。', '情态动词 should 后加 not，ignore 用原形。')
        ]
      },
      {
        heading: '3. 必须理解：助动词承担语法信息',
        body: '在疑问和否定中，do/does/did 会承担人称、数和时态信息，所以后面的实义动词回到原形。很多错误来自“一个信息表达两次”：Did you went? 里 did 已经表达过去，went 又表达一次过去。',
        examples: [
          ex('Does she speak English?', '她会说英语吗？', 'Does 表示第三人称单数疑问，speak 用原形。'),
          ex('She does not speak English.', '她不会说英语。', 'does not 承担否定和三单信息，speak 不加 s。'),
          ex('They did not go there.', '他们没有去那里。', 'did not 表过去否定，go 用原形。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：实义动词疑问句漏 do；did 后仍用过去式；be 句错误加 do；not 放错位置。做题时先判断谓语类型：be、情态动词，还是普通实义动词。',
        examples: [
          ex('Are you tired?', '你累了吗？', 'tired 是形容词，句子需要 be，不需要 do。'),
          ex('Do they need help?', '他们需要帮助吗？', 'need 是实义动词，疑问句用 Do。'),
          ex('She cannot answer the question.', '她不能回答这个问题。', 'cannot 是情态动词否定，answer 用原形。')
        ]
      }
    ]
  },
  'word-order-basics': {
    sections: [
      {
        heading: '1. 核心定位：英语靠语序表达语法关系',
        body: '英语比中文更依赖固定语序。基本陈述句通常是主语 + 谓语 + 宾语/表语，时间、地点、方式等状语可以放在句末或句首。语序变化会影响疑问、强调和句子是否自然。',
        examples: [
          ex('I read grammar notes every morning.', '我每天早上读语法笔记。', '基本语序是主语 I + 谓语 read + 宾语 grammar notes + 时间状语。'),
          ex('Every morning, I read grammar notes.', '每天早上，我读语法笔记。', '时间状语可放句首，用逗号隔开，主干语序不变。'),
          ex('Do you read grammar notes every morning?', '你每天早上读语法笔记吗？', '疑问句中助动词 Do 放到主语 you 前。')
        ]
      },
      {
        heading: '2. 必须掌握：陈述句、疑问句和修饰语位置',
        body: '陈述句主谓顺序通常不能乱；一般疑问句需要助动词或 be/情态动词提前；频率副词常放在实义动词前、be/助动词/情态动词后；地点状语通常比时间状语更靠近动词。',
        examples: [
          ex('She usually studies at home after dinner.', '她通常晚饭后在家学习。', 'usually 放在实义动词 studies 前；地点 at home 通常在时间 after dinner 前。'),
          ex('He is always careful.', '他总是很仔细。', '频率副词 always 放在 be 动词 is 后。'),
          ex('Can you explain this sentence clearly?', '你能清楚地解释这个句子吗？', '情态动词 Can 提前；方式副词 clearly 放在宾语后。')
        ]
      },
      {
        heading: '3. 必须理解：中文话题顺序不能直接搬到英文',
        body: '中文可以说“这本书我很喜欢”，但英语通常要说 I like this book。中文常把时间、地点、话题放前面，但英语要保证主语和谓语关系清楚。高级结构可以改变语序，但入门阶段先掌握自然基本语序。',
        examples: [
          ex('I like this book very much.', '我很喜欢这本书。', '英语通常以 I 作主语，like 作谓语，this book 作宾语。'),
          ex('There is a book on the desk.', '桌上有一本书。', '存在句不用 A book has on the desk，而用 There be。'),
          ex('The teacher explained the rule to us.', '老师给我们解释了这条规则。', '英文要明确主语 The teacher 和谓语 explained。')
        ]
      },
      {
        heading: '4. 高频易错点',
        body: '常见错误包括：按中文话题顺序直译；把时间状语插进主谓之间；疑问句仍用陈述语序；副词位置错误。做题时先恢复主干：谁 + 做什么/是什么 + 对谁/什么。',
        examples: [
          ex('Yesterday I met my teacher at the library.', '昨天我在图书馆遇到了我的老师。', '时间状语句首可以，但主干 I met my teacher 不变。'),
          ex('Where does your brother work?', '你哥哥在哪里工作？', '特殊疑问句仍要 does + 主语 + 动词原形。'),
          ex('She speaks English very well.', '她英语说得很好。', '副词 well 修饰 speaks，通常放在宾语后。')
        ]
      }
    ]
  }
};
