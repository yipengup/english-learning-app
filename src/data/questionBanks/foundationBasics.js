import { createCuratedQuestionBank } from './bankFactory';

function q(stem, translation, answer, options, explanation, tags, difficulty = '入门') {
  return { stem, translation, answer, options: toOptions(answer, options), explanation, difficulty, tags };
}

function toOptions(answer, options) {
  const fallback = ['subject', 'predicate', 'object', 'predicative', 'adverbial', 'attributive', 'SV', 'SVO', 'SVC', 'SVOO', 'SVOC', 'declarative', 'yes-no question', 'wh-question', 'imperative', 'exclamatory', 'is', 'are', 'do', 'does', 'did'];
  const seen = new Set();
  return [answer, ...options, ...fallback].filter(item => {
    if (!item || seen.has(item)) return false;
    seen.add(item);
    return true;
  }).slice(0, 4);
}

function bank(grammarId, questions) {
  const seen = new Set();
  const unique = questions.filter(item => {
    const key = `${item.stem}@@${item.answer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (unique.length < 200) throw new Error(`${grammarId} needs 200 unique questions, got ${unique.length}`);
  return createCuratedQuestionBank(grammarId, unique.slice(0, 200), 200);
}

const elementCases = [
  ['The boy opened the window.', '男孩打开了窗户。', 'The boy', 'opened', 'the window', 'object', 'SVO'],
  ['My teacher explained the rule clearly.', '我的老师清楚地解释了规则。', 'My teacher', 'explained', 'clearly', 'adverbial', 'SVO'],
  ['The soup tastes delicious.', '汤尝起来很美味。', 'The soup', 'tastes', 'delicious', 'predicative', 'SVC'],
  ['We call him Tom.', '我们叫他 Tom。', 'We', 'call', 'Tom', 'object complement', 'SVOC'],
  ['The old book is useful.', '那本旧书很有用。', 'The old book', 'is', 'old', 'attributive', 'SVC'],
  ['Birds fly in the sky.', '鸟儿在天空中飞。', 'Birds', 'fly', 'in the sky', 'adverbial', 'SV'],
  ['She gave me a notebook.', '她给了我一个笔记本。', 'She', 'gave', 'me', 'indirect object', 'SVOO'],
  ['The children made the room clean.', '孩子们把房间弄干净了。', 'The children', 'made', 'clean', 'object complement', 'SVOC'],
  ['Learning English takes time.', '学习英语需要时间。', 'Learning English', 'takes', 'time', 'object', 'SVO'],
  ['The man in the room is my uncle.', '房间里的那个人是我的叔叔。', 'The man in the room', 'is', 'in the room', 'attributive', 'SVC'],
  ['A red car stopped outside.', '一辆红色汽车停在外面。', 'A red car', 'stopped', 'outside', 'adverbial', 'SV'],
  ['The movie made us excited.', '这部电影让我们很兴奋。', 'The movie', 'made', 'excited', 'object complement', 'SVOC'],
  ['Her answer sounded reasonable.', '她的答案听起来合理。', 'Her answer', 'sounded', 'reasonable', 'predicative', 'SVC'],
  ['Tom bought his mother flowers.', 'Tom 给他妈妈买了花。', 'Tom', 'bought', 'his mother', 'indirect object', 'SVOO'],
  ['The girl with glasses reads quietly.', '戴眼镜的女孩安静地读书。', 'The girl with glasses', 'reads', 'with glasses', 'attributive', 'SV'],
  ['They elected him monitor.', '他们选他当班长。', 'They', 'elected', 'monitor', 'object complement', 'SVOC'],
  ['The baby is asleep.', '婴儿睡着了。', 'The baby', 'is', 'asleep', 'predicative', 'SVC'],
  ['Our coach sent the team a message.', '我们的教练给队伍发了一条消息。', 'Our coach', 'sent', 'the team', 'indirect object', 'SVOO'],
  ['The students discussed the project yesterday.', '学生们昨天讨论了项目。', 'The students', 'discussed', 'yesterday', 'adverbial', 'SVO'],
  ['A cup of tea warms my hands.', '一杯茶温暖了我的手。', 'A cup of tea', 'warms', 'my hands', 'object', 'SVO'],
  ['The weather became cold at night.', '晚上天气变冷了。', 'The weather', 'became', 'cold', 'predicative', 'SVC'],
  ['The news surprised everyone.', '这个消息让每个人吃惊。', 'The news', 'surprised', 'everyone', 'object', 'SVO'],
  ['The light in the kitchen went out.', '厨房里的灯灭了。', 'The light in the kitchen', 'went out', 'in the kitchen', 'attributive', 'SV'],
  ['She found the test difficult.', '她觉得考试很难。', 'She', 'found', 'difficult', 'object complement', 'SVOC'],
  ['My parents showed me old photos.', '我父母给我看了旧照片。', 'My parents', 'showed', 'me', 'indirect object', 'SVOO']
];

function buildElementQuestions() {
  return elementCases.flatMap(([sentence, zh, subject, predicate, focus, role, pattern], index) => [
    q(`In "${sentence}" what is the subject?`, `在“${sentence}”中，主语是什么？`, subject, [predicate, focus, `${subject} ${predicate}`], `主语说明句子谈论的是谁或什么。本句中 ${subject} 是谓语 ${predicate} 的发出者或被说明对象。`, ['句子成分', '主语', pattern]),
    q(`In "${sentence}" what is the main predicate?`, `在“${sentence}”中，主要谓语是什么？`, predicate, [subject, focus, pattern], `谓语是句子的核心动作或状态。本句主要谓语是 ${predicate}。`, ['句子成分', '谓语', pattern]),
    q(`In "${sentence}" what role does "${focus}" play?`, `在“${sentence}”中，${focus} 是什么成分？`, role, ['subject', 'predicate', 'object', 'adverbial', 'predicative', 'object complement', 'attributive', 'indirect object'], `${focus} 在本句中承担 ${role} 功能。`, ['句子成分', role, pattern]),
    q(`What is the basic sentence pattern of "${sentence}"?`, `“${sentence}” 属于哪一种基本句型？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `本句结构为 ${pattern}。`, ['五大句型', pattern]),
    q(`Which part is closest to the main verb in "${sentence}"?`, `在“${sentence}”中，哪个部分最接近动词？`, predicate, [subject, focus, pattern], `核心动词是 ${predicate}。`, ['主干', '谓语']),
    q(`Which sentence analysis is correct for "${sentence}"?`, `哪项分析正确？`, `${subject} + ${predicate}`, [`${predicate} + ${focus}`, `${subject} + ${focus}`], `主干是主语+谓语。`, ['主干', '句子成分', pattern])
  ]);
}

export function buildSentenceElementsBank() {
  const questions = buildElementQuestions();
  return createCuratedQuestionBank('sentence-elements', questions, 200);
}

const sentenceTypeCases = [
  ['She studies English every day.', '陈述句，用来说明事实或情况。', 'declarative', ['yes-no question', 'imperative', 'exclamatory']],
  ['Do you like grammar?', '一般疑问句，用来询问 yes/no 信息。', 'yes-no question', ['declarative', 'imperative', 'exclamatory']],
  ['What does this word mean?', '特殊疑问句，用 what 询问信息。', 'wh-question', ['yes-no question', 'declarative', 'imperative']],
  ['Please open your book.', '祈使句，用动词原形提出请求或命令。', 'imperative', ['declarative', 'wh-question', 'exclamatory']],
  ['What a useful lesson it is!', '感叹句，用 what 表达强烈感受。', 'exclamatory', ['declarative', 'yes-no question', 'imperative']],
  ['How quickly she answered!', '感叹句，用 how 强调副词 quickly。', 'exclamatory', ['wh-question', 'declarative', 'imperative']],
  ['Can he finish the task today?', '一般疑问句，把情态动词 can 提到主语前。', 'yes-no question', ['declarative', 'wh-question', 'imperative']],
  ['Where are the keys?', '特殊疑问句，用 where 询问地点。', 'wh-question', ['yes-no question', 'declarative', 'exclamatory']],
  ['Do not forget the rule.', '否定祈使句，用 Do not + 动词原形。', 'imperative', ['declarative', 'yes-no question', 'wh-question']],
  ['The train leaves at seven.', '陈述句，用来陈述安排。', 'declarative', ['imperative', 'wh-question', 'exclamatory']]
];

export function buildSentenceTypesBank() {
  return createCuratedQuestionBank('sentence-types', sentenceTypeCases.map(([sentence, note, answer, options]) => q(
    `What type of sentence is "${sentence}"?`,
    `判断句子类型：“${sentence}”`,
    answer,
    options,
    `${note} 判断句子类型时先看交际功能，再看语序和标点。`,
    ['句子类型', answer]
  )), 200);
}

const patternCases = [
  ['Birds fly.', 'Birds', 'fly', '', 'SV', '主语 + 不及物动词'],
  ['She reads books.', 'She', 'reads', 'books', 'SVO', '主语 + 及物动词 + 宾语'],
  ['The soup tastes good.', 'The soup', 'tastes', 'good', 'SVC', '主语 + 系动词 + 表语'],
  ['Tom gave me a pen.', 'Tom', 'gave', 'me a pen', 'SVOO', '主语 + 动词 + 间接宾语 + 直接宾语'],
  ['We made him captain.', 'We', 'made', 'him captain', 'SVOC', '主语 + 动词 + 宾语 + 宾补'],
  ['The baby sleeps quietly.', 'The baby', 'sleeps', 'quietly', 'SV', 'quietly 是状语，核心骨架仍是 SV'],
  ['My father bought me a bike.', 'My father', 'bought', 'me a bike', 'SVOO', 'buy 可接双宾语'],
  ['Her answer sounds reasonable.', 'Her answer', 'sounds', 'reasonable', 'SVC', 'sounds 是系动词'],
  ['They found the room empty.', 'They', 'found', 'the room empty', 'SVOC', 'empty 补充说明宾语 the room'],
  ['The teacher explained the rule.', 'The teacher', 'explained', 'the rule', 'SVO', 'explain 后接宾语 the rule']
];

export function buildBasicSentencePatternsBank() {
  const questions = patternCases.flatMap(([sentence, subject, verb, complement, pattern, note]) => [
    q(`What is the basic sentence pattern of "${sentence}"?`, `判断基本句型：“${sentence}”`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `${note}。先找主语 ${subject} 和谓语 ${verb}，再看动词后需要什么成分。`, ['五大句型', pattern]),
    q(`In "${sentence}" what is the subject?`, `找出“${sentence}”的主语。`, subject, [verb, complement || pattern, `${subject} ${verb}`], `主语是句子谈论的对象，本句主语是 ${subject}。`, ['五大句型', '主语']),
    q(`In "${sentence}" what is the main verb?`, `找出“${sentence}”的核心谓语。`, verb, [subject, complement || pattern, `${subject} ${verb}`], `核心谓语体现句子动作或状态，本句是 ${verb}。`, ['五大句型', '谓语'])
  ]);
  return createCuratedQuestionBank('basic-sentence-patterns', questions, 200);
}

const thereBeCases = [
  ['a book', 'on the desk', 'is', '单数名词 a book'],
  ['two books', 'on the desk', 'are', '复数名词 two books'],
  ['some water', 'in the bottle', 'is', '不可数名词 water'],
  ['many students', 'in the classroom', 'are', '复数名词 students'],
  ['a problem', 'with this answer', 'is', '单数名词 a problem'],
  ['three examples', 'in this lesson', 'are', '复数名词 examples'],
  ['little time', 'before the test', 'is', '不可数名词 time'],
  ['several chairs', 'around the table', 'are', '复数名词 chairs'],
  ['a teacher and two students', 'at the door', 'is', '就近原则看 a teacher'],
  ['two students and a teacher', 'at the door', 'are', '就近原则看 two students']
];

export function buildThereBeBank() {
  const questions = thereBeCases.flatMap(([realSubject, place, be, note]) => {
    const sentence = `There ${be} ${realSubject} ${place}.`;
    return [
      q(`There ___ ${realSubject} ${place}.`, `选择 there be 句型中的 be 动词。`, be, ['is', 'are', 'has'], `there be 的真正主语是 be 后面的 ${realSubject}，${note}，所以用 ${be}。`, ['there be', '主谓一致']),
      q(`What is the real subject in "${sentence}"?`, `找出 there be 句型中的真正主语。`, realSubject, ['There', be, place], `there 是引导词，真正主语通常在 be 后面，本句是 ${realSubject}。`, ['there be', '真正主语']),
      q(`Which sentence correctly expresses existence?`, `哪一句正确表达“某处有某物”？`, sentence, [`There has ${realSubject} ${place}.`, `It ${be} ${realSubject} ${place}.`, `${realSubject} there ${be} ${place}.`], `表达“某处有”用 There be + 名词 + 地点，不用 There has。`, ['there be', '正确句'])
    ];
  });
  return createCuratedQuestionBank('there-be', questions, 200);
}

const questionNegativeCases = [
  ['She likes tea.', 'Does she like tea?', 'She does not like tea.', 'does', '主语 she 是第三人称单数，疑问和否定借助 does，实义动词用原形'],
  ['They play tennis.', 'Do they play tennis?', 'They do not play tennis.', 'do', '主语 they 是复数，疑问和否定借助 do'],
  ['He is ready.', 'Is he ready?', 'He is not ready.', 'is', 'be 动词句疑问直接提前 be，否定直接加 not'],
  ['We are late.', 'Are we late?', 'We are not late.', 'are', 'be 动词 are 提前构成疑问'],
  ['Tom can swim.', 'Can Tom swim?', 'Tom cannot swim.', 'can', '情态动词 can 提前构成疑问，后接动词原形'],
  ['Lily studied yesterday.', 'Did Lily study yesterday?', 'Lily did not study yesterday.', 'did', '一般过去时疑问和否定借助 did，动词恢复原形'],
  ['The app saves progress.', 'Does the app save progress?', 'The app does not save progress.', 'does', 'The app 是第三人称单数，用 does 支撑疑问和否定'],
  ['You should review it.', 'Should you review it?', 'You should not review it.', 'should', '情态动词 should 的疑问和否定不需要 do']
];

export function buildQuestionsNegativesBank() {
  const questions = questionNegativeCases.flatMap(([positive, question, negative, helper, note]) => [
    q(`Make a yes-no question: "${positive}"`, `把句子改成一般疑问句：“${positive}”`, question, [negative, positive, `${helper} ${positive}`], `${note}。正确疑问句是 ${question}`, ['疑问句', helper]),
    q(`Make a negative sentence: "${positive}"`, `把句子改成否定句：“${positive}”`, negative, [question, positive, `${positive} not`], `${note}。正确否定句是 ${negative}`, ['否定句', helper]),
    q(`Which helper is used in the question or negative form of "${positive}"?`, `这个句子的疑问或否定形式使用哪个助动词/情态/be？`, helper, ['do', 'does', 'did', 'is', 'are', 'can', 'should'], `${note}。`, ['助动词系统', helper])
  ]);
  return createCuratedQuestionBank('questions-negatives', questions, 200);
}

const wordOrderCases = [
  ['I read books every night.', ['I', 'read', 'books', 'every night'], '陈述句基本顺序是主语 + 谓语 + 宾语 + 时间状语。'],
  ['She often reviews notes.', ['She', 'often', 'reviews', 'notes'], '频率副词 often 通常放在实义动词前。'],
  ['They play football in the park.', ['They', 'play', 'football', 'in the park'], '地点状语通常放在核心动宾结构之后。'],
  ['Does he like English?', ['Does', 'he', 'like', 'English'], '一般疑问句把助动词 Does 放到主语前。'],
  ['What do you study after class?', ['What', 'do', 'you', 'study', 'after class'], '特殊疑问句常用疑问词 + 助动词 + 主语 + 动词原形。'],
  ['Please write the answer carefully.', ['Please', 'write', 'the answer', 'carefully'], '祈使句常省略主语 you，动词原形开头。'],
  ['My teacher explains grammar clearly.', ['My teacher', 'explains', 'grammar', 'clearly'], '方式状语 clearly 放在动宾结构之后。'],
  ['There is a pen on the desk.', ['There', 'is', 'a pen', 'on the desk'], 'there be 句型顺序是 There + be + 名词 + 地点。'],
  ['We will meet at school tomorrow.', ['We', 'will meet', 'at school', 'tomorrow'], '地点状语通常在时间状语前。'],
  ['Can you finish the work today?', ['Can', 'you', 'finish', 'the work', 'today'], '情态动词疑问句把 Can 放到主语前。']
];

export function buildWordOrderBasicsBank() {
  const questions = wordOrderCases.flatMap(([sentence, parts, note]) => [
    q(`Choose the correct word order.`, `选择正确语序。`, sentence, [
      sentence,
      [...parts].reverse().join(' ') + '.',
      [parts[1], parts[0], ...parts.slice(2)].join(' ') + '.',
      [parts[0], ...parts.slice(2), parts[1]].join(' ') + '.'
    ], `${note} 正确句子是 ${sentence}`, ['语序', '正确句']),
    q(`What comes first in "${sentence}"?`, `“${sentence}” 中最前面的核心成分是什么？`, parts[0], [parts[1], parts[2], parts[parts.length - 1]], `先看句子类型。这个句子的开头是 ${parts[0]}。`, ['语序', '开头']),
    q(`Which explanation matches "${sentence}"?`, `哪项解释符合这个句子的语序？`, note, ['英语陈述句通常随意倒装', '时间状语必须放在主语和谓语之间', '疑问句和陈述句语序完全一样'], note, ['语序', '规则'])
  ]);
  return createCuratedQuestionBank('word-order-basics', questions, 200);
}
