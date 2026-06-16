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