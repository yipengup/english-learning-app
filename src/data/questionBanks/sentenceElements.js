import { createCuratedQuestionBank } from './bankFactory';

function toOptions(answer, options) {
  const fallback = [
    'subject',
    'predicate',
    'object',
    'predicative',
    'adverbial',
    'attributive',
    'object complement',
    'indirect object',
    'direct object'
  ];
  const seen = new Set();
  return [answer, ...options, ...fallback].filter(item => {
    if (!item || seen.has(item)) return false;
    seen.add(item);
    return true;
  }).slice(0, 4);
}

function q(stem, translation, answer, options, explanation, tags, difficulty = '入门') {
  return { stem, translation, answer, options: toOptions(answer, options), explanation, difficulty, tags };
}

function buildBank(questions) {
  const seen = new Set();
  const unique = questions.filter(item => {
    const key = `${item.stem}@@${item.answer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (unique.length < 200) throw new Error(`sentence-elements needs 200 unique questions, got ${unique.length}`);
  return createCuratedQuestionBank('sentence-elements', unique.slice(0, 200), 200);
}

const elementCases = [
  ['The boy opened the window.', '男孩打开了窗户。', 'The boy', 'opened', 'the window', 'object', 'opened the window'],
  ['My teacher explained the rule clearly.', '我的老师清楚地解释了规则。', 'My teacher', 'explained', 'the rule', 'object', 'clearly'],
  ['The soup tastes delicious.', '汤尝起来很美味。', 'The soup', 'tastes', 'delicious', 'predicative', 'tastes delicious'],
  ['We call him Tom.', '我们叫他 Tom。', 'We', 'call', 'Tom', 'object complement', 'him'],
  ['The old book is useful.', '那本旧书很有用。', 'The old book', 'is', 'old', 'attributive', 'useful'],
  ['Birds fly in the sky.', '鸟儿在天空中飞。', 'Birds', 'fly', 'in the sky', 'adverbial', 'fly in the sky'],
  ['She gave me a notebook.', '她给了我一个笔记本。', 'She', 'gave', 'me', 'indirect object', 'a notebook'],
  ['The children made the room clean.', '孩子们把房间弄干净了。', 'The children', 'made', 'clean', 'object complement', 'the room'],
  ['Learning English takes time.', '学习英语需要时间。', 'Learning English', 'takes', 'time', 'object', 'takes time'],
  ['The man in the room is my uncle.', '房间里的那个人是我的叔叔。', 'The man in the room', 'is', 'in the room', 'attributive', 'my uncle'],
  ['A red car stopped outside.', '一辆红色汽车停在外面。', 'A red car', 'stopped', 'outside', 'adverbial', 'red'],
  ['The movie made us excited.', '这部电影让我们很兴奋。', 'The movie', 'made', 'excited', 'object complement', 'us'],
  ['Her answer sounded reasonable.', '她的答案听起来合理。', 'Her answer', 'sounded', 'reasonable', 'predicative', 'sounded reasonable'],
  ['Tom bought his mother flowers.', 'Tom 给他妈妈买了花。', 'Tom', 'bought', 'his mother', 'indirect object', 'flowers'],
  ['The girl with glasses reads quietly.', '戴眼镜的女孩安静地读书。', 'The girl with glasses', 'reads', 'with glasses', 'attributive', 'quietly'],
  ['They elected him monitor.', '他们选他当班长。', 'They', 'elected', 'monitor', 'object complement', 'him'],
  ['The baby is asleep.', '婴儿睡着了。', 'The baby', 'is', 'asleep', 'predicative', 'is asleep'],
  ['Our coach sent the team a message.', '我们的教练给队伍发了一条消息。', 'Our coach', 'sent', 'the team', 'indirect object', 'a message'],
  ['The students discussed the project yesterday.', '学生们昨天讨论了项目。', 'The students', 'discussed', 'the project', 'object', 'yesterday'],
  ['A cup of tea warms my hands.', '一杯茶温暖了我的手。', 'A cup of tea', 'warms', 'my hands', 'object', 'warms my hands'],
  ['The weather became cold at night.', '晚上天气变冷了。', 'The weather', 'became', 'cold', 'predicative', 'at night'],
  ['The news surprised everyone.', '这个消息让每个人吃惊。', 'The news', 'surprised', 'everyone', 'object', 'surprised everyone'],
  ['The light in the kitchen went out.', '厨房里的灯灭了。', 'The light in the kitchen', 'went out', 'in the kitchen', 'attributive', 'went out'],
  ['She found the test difficult.', '她觉得考试很难。', 'She', 'found', 'difficult', 'object complement', 'the test'],
  ['My parents showed me old photos.', '我父母给我看了旧照片。', 'My parents', 'showed', 'me', 'indirect object', 'old photos']
];

function roleExplanation(focus, role) {
  const map = {
    object: `${focus} 是动作影响或涉及的对象，所以是宾语。`,
    predicative: `${focus} 说明主语的身份、状态或性质，所以是表语。`,
    adverbial: `${focus} 说明时间、地点、方式或程度，所以是状语。`,
    attributive: `${focus} 修饰名词，限定或说明名词，所以是定语。`,
    'object complement': `${focus} 补充说明宾语的身份、状态或结果，所以是宾语补足语。`,
    'indirect object': `${focus} 表示动作的接受者或受益者，所以是间接宾语。`
  };
  return map[role] || `${focus} 在句中承担 ${role} 功能。`;
}

function buildSentenceElementQuestions() {
  return elementCases.flatMap(([sentence, zh, subject, predicate, focus, role, support], index) => [
    q(
      `In "${sentence}" what is the subject?`,
      `在“${sentence}”中，主语是什么？`,
      subject,
      [predicate, focus, support],
      `主语说明句子主要谈论谁或什么。本句中 ${subject} 是谓语 ${predicate} 的发出者或被说明对象。`,
      ['句子成分', '主语']
    ),
    q(
      `In "${sentence}" what is the main predicate?`,
      `在“${sentence}”中，主要谓语是什么？`,
      predicate,
      [subject, focus, support],
      `谓语是句子的核心动作或状态。本句主要谓语是 ${predicate}。`,
      ['句子成分', '谓语']
    ),
    q(
      `In "${sentence}" what role does "${focus}" play?`,
      `在“${sentence}”中，${focus} 是什么成分？`,
      role,
      ['subject', 'predicate', 'object', 'predicative', 'adverbial', 'attributive', 'object complement', 'indirect object'],
      roleExplanation(focus, role),
      ['句子成分', role]
    ),
    q(
      `Which part is NOT the subject in "${sentence}"?`,
      `在“${sentence}”中，哪一部分不是主语？`,
      predicate,
      [subject, `${subject} ${predicate}`, focus],
      `${subject} 才是主语；${predicate} 是谓语核心，不是主语。`,
      ['句子成分', '主语辨析']
    ),
    q(
      `Which part is closest to the main verb in "${sentence}"?`,
      `在“${sentence}”中，哪个部分最接近句子核心动词？`,
      predicate,
      [subject, focus, support],
      `分析句子成分时先锁定谓语核心。本句核心动词或系动词是 ${predicate}。`,
      ['谓语', '主干']
    ),
    q(
      `Choose the correct subject-predicate core of "${sentence}".`,
      `选择“${sentence}”的正确主谓核心。`,
      `${subject} + ${predicate}`,
      [`${predicate} + ${focus}`, `${focus} + ${predicate}`, `${subject} + ${focus}`],
      `主谓核心由主语和主要谓语组成：${subject} + ${predicate}。`,
      ['主干', '主谓']
    ),
    q(
      `Which question helps identify "${focus}" in "${sentence}"?`,
      `哪个问题有助于判断“${sentence}”中 ${focus} 的成分？`,
      role === 'adverbial' ? 'How / where / when does it happen?' : role === 'attributive' ? 'Which noun does it modify?' : role === 'predicative' ? 'What is the subject like?' : role === 'object complement' ? 'What does it say about the object?' : role === 'indirect object' ? 'To whom or for whom?' : 'What receives the action?',
      ['Who is the speaker?', 'Where is the punctuation?', 'How many words are there?'],
      `判断成分要问功能问题，而不是只翻译中文。${roleExplanation(focus, role)}`,
      ['判断方法', role]
    ),
    q(
      `Which description of "${sentence}" focuses on sentence elements only?`,
      `哪一项只分析“${sentence}”的句子成分？`,
      `${subject} is the subject, ${predicate} is the predicate, and ${focus} is ${role}.`,
      ['It is SV/SVO/SVC.', 'It is present simple tense.', 'It is a long sentence only.'],
      `本小节只考句子成分：主语、谓语以及 ${focus} 的功能，不直接考五大基本句型标签。`,
      ['句子成分', '边界']
    )
  ]);
}

export function buildSentenceElementsBank() {
  return buildBank(buildSentenceElementQuestions());
}
