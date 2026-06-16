import { createCuratedQuestionBank } from './bankFactory';

function toOptions(answer, options) {
  const fallback = ['am', 'is', 'are', 'be', 'was', 'were', 'do', 'does'];
  const seen = new Set();
  return [answer, ...options, ...fallback].filter(item => {
    if (!item || seen.has(item)) return false;
    seen.add(item);
    return true;
  }).slice(0, 4);
}

function q(stem, translation, answer, options, explanation, tags, difficulty = 'basic') {
  return { stem, translation, answer, options: toOptions(answer, options), explanation, difficulty, tags };
}

function bank(questions) {
  const seen = new Set();
  const unique = questions.filter(item => {
    const key = `${item.stem}@@${item.answer}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (unique.length < 200) throw new Error(`be-verbs needs 200 unique questions, got ${unique.length}`);
  return createCuratedQuestionBank('be-verbs', unique.slice(0, 200), 200);
}

const beCases = [
  ['I', 'am', 'ready for class', '我', '准备好上课'],
  ['You', 'are', 'welcome here', '你/你们', '在这里受欢迎'],
  ['He', 'is', 'good at math', '他', '擅长数学'],
  ['She', 'is', 'interested in English', '她', '对英语感兴趣'],
  ['It', 'is', 'cold today', '今天', '很冷'],
  ['We', 'are', 'in the same group', '我们', '在同一组'],
  ['They', 'are', 'from Canada', '他们', '来自加拿大'],
  ['My brother', 'is', 'at school', '我哥哥/弟弟', '在学校'],
  ['My parents', 'are', 'busy tonight', '我父母', '今晚很忙'],
  ['This answer', 'is', 'correct', '这个答案', '正确'],
  ['These answers', 'are', 'correct', '这些答案', '正确'],
  ['The dictionary', 'is', 'on the desk', '词典', '在桌上'],
  ['The books', 'are', 'in my bag', '书', '在我的包里'],
  ['Tom and Jack', 'are', 'classmates', 'Tom 和 Jack', '是同班同学'],
  ['Either the teacher or the students', 'are', 'in the classroom', '要么老师要么学生们', '在教室里'],
  ['Neither the students nor the teacher', 'is', 'late', '学生们和老师都', '没有迟到'],
  ['There', 'is', 'a mistake in this sentence', '这个句子里', '有一个错误'],
  ['There', 'are', 'three examples in this lesson', '这节课里', '有三个例子'],
  ['A cup of tea', 'is', 'on the table', '一杯茶', '在桌上'],
  ['Many chairs', 'are', 'around the table', '许多椅子', '在桌子周围'],
  ['Some water', 'is', 'in the bottle', '一些水', '在瓶子里'],
  ['The children', 'are', 'very excited', '孩子们', '很兴奋'],
  ['The news', 'is', 'important', '这个消息', '重要'],
  ['The police', 'are', 'outside', '警察', '在外面'],
  ['The problem', 'is', 'difficult but useful', '这个问题', '难但有用']
];

function cap(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function subjectRule(subject, be) {
  if (subject === 'I') return '主语 I 在一般现在时中固定搭配 am。';
  if (subject === 'You') return 'you 不管表示“你”还是“你们”，一般现在时 be 动词都用 are。';
  if (be === 'are') return `${subject} 表示复数或按就近原则对应复数，所以用 are。`;
  return `${subject} 是单数、不可数或按就近原则对应单数，所以用 is。`;
}

function buildBeVerbQuestions() {
  return beCases.flatMap(([subject, be, complement, subjectZh, complementZh], index) => {
    const questionStart = cap(be);
    const negative = `${subject} ${be} not ${complement}.`;
    const positive = `${subject} ${be} ${complement}.`;
    return [
      q(`${subject} ___ ${complement}.`, `${subjectZh}${complementZh}。`, be, ['am', 'is', 'are', 'be'], `${subjectRule(subject, be)}${complement} 是表语或地点成分。`, ['be', '主谓一致']),
      q(`Choose the correct be-verb sentence for "${subjectZh}${complementZh}".`, `选择表达“${subjectZh}${complementZh}”的正确句子。`, positive, [`${subject} am ${complement}.`, `${subject} is ${complement}.`, `${subject} are ${complement}.`], `${subjectRule(subject, be)}正确句子是 ${positive}`, ['be', '正确句']),
      q(`Make a negative sentence: ${positive}`, `把“${positive}”改成否定句。`, negative, [`${subject} does not ${complement}.`, `${subject} not ${be} ${complement}.`, `${subject} do not ${complement}.`], `be 动词否定直接在 be 后加 not，不需要 do/does。`, ['be', '否定句']),
      q(`Make a yes-no question: ${positive}`, `把“${positive}”改成一般疑问句。`, `${questionStart} ${subject} ${complement}?`, [`Do ${subject} ${complement}?`, `Does ${subject} ${complement}?`, `${subject} ${be} ${complement}?`], `be 动词疑问句把 ${be} 提到主语前。`, ['be', '疑问句']),
      q(`Which word controls the be-verb in item ${index + 1}: "${subject} ___ ${complement}"?`, `第 ${index + 1} 题中，哪个部分决定 be 动词？`, subject, [complement, be, 'not'], `be 动词形式要和主语一致，本题看 ${subject}。`, ['be', '主语']),
      q(`Which rule explains "${positive}"?`, `哪条规则解释“${positive}”？`, subjectRule(subject, be), ['be 后必须接动词原形', '所有主语都用 are', '所有单词后都加 do'], `本题核心是主语和 be 动词一致。`, ['be', '规则']),
      q(`Which option avoids the common mistake with "${subject}"?`, `哪个选项避免了 ${subject} 搭配 be 的常见错误？`, positive, [`${subject} be ${complement}.`, `${subject} do ${complement}.`, `${subject} ${be === 'is' ? 'are' : 'is'} ${complement}.`], `不能用中文“是/在”直接套 be，要看主语选择 am/is/are。`, ['be', '易错']),
      q(`In "${positive}" what comes after the be-verb?`, `在“${positive}”中，be 动词后面的部分是什么功能？`, 'subject complement or place expression', ['direct object of an action verb', 'auxiliary do', 'past-tense marker'], `be 后面通常说明身份、状态、性质或位置，不是具体动作宾语。`, ['be', '表语'])
    ];
  });
}

export function buildBeVerbBank() {
  return bank(buildBeVerbQuestions());
}
