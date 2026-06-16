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

const typeMeta = {
  declarative: ['陈述句', 'states information', 'normal subject-verb order'],
  'yes-no question': ['一般疑问句', 'asks for yes or no', 'auxiliary, modal, or be before the subject'],
  'wh-question': ['特殊疑问句', 'asks for specific information', 'question word plus question order'],
  imperative: ['祈使句', 'gives a command, request, or instruction', 'base verb at the beginning'],
  exclamatory: ['感叹句', 'shows strong feeling', 'what/how exclamatory pattern']
};

const sentenceTypeCases = [
  ['She studies English every morning.', '她每天早上学英语。', 'declarative'],
  ['My brother plays basketball after school.', '我弟弟放学后打篮球。', 'declarative'],
  ['The train arrives at six.', '火车六点到。', 'declarative'],
  ['This answer is correct.', '这个答案是正确的。', 'declarative'],
  ['They are reading in the library.', '他们正在图书馆读书。', 'declarative'],
  ['Does she study English every morning?', '她每天早上学英语吗？', 'yes-no question'],
  ['Can you help me with this sentence?', '你能帮我看这个句子吗？', 'yes-no question'],
  ['Is this answer correct?', '这个答案正确吗？', 'yes-no question'],
  ['Are the examples clear?', '这些例子清楚吗？', 'yes-no question'],
  ['Did they finish the homework?', '他们完成作业了吗？', 'yes-no question'],
  ['Where does she study English?', '她在哪里学英语？', 'wh-question'],
  ['Why did they leave early?', '他们为什么早走？', 'wh-question'],
  ['When will the meeting start?', '会议什么时候开始？', 'wh-question'],
  ['How do you spell this word?', '这个单词怎么拼？', 'wh-question'],
  ['What did the teacher explain?', '老师解释了什么？', 'wh-question'],
  ['Open your book, please.', '请打开你的书。', 'imperative'],
  ['Listen to the teacher carefully.', '认真听老师讲。', 'imperative'],
  ['Do not touch the hot cup.', '不要碰热杯子。', 'imperative'],
  ['Please write your name here.', '请在这里写下你的名字。', 'imperative'],
  ['Check your answer again.', '再检查一遍你的答案。', 'imperative'],
  ['What a useful lesson it is!', '这是一节多么有用的课啊！', 'exclamatory'],
  ['How clearly she explains grammar!', '她讲语法讲得多清楚啊！', 'exclamatory'],
  ['What beautiful flowers they are!', '它们是多么漂亮的花啊！', 'exclamatory'],
  ['How fast the train runs!', '火车跑得多快啊！', 'exclamatory'],
  ['What an interesting example this is!', '这是一个多么有趣的例子啊！', 'exclamatory']
];

function buildSentenceTypeQuestions() {
  const typeOptions = Object.keys(typeMeta);
  const labelOptions = Object.values(typeMeta).map(item => item[0]);
  return sentenceTypeCases.flatMap(([sentence, zh, type], index) => {
    const [label, functionText, feature] = typeMeta[type];
    return [
      q(`What type of sentence is "${sentence}"?`, `“${sentence}” 是什么句子类型？`, type, typeOptions, `它的功能是 ${functionText}，所以是 ${type}。`, ['句子类型', label]),
      q(`Choose the Chinese label for "${sentence}".`, `选择“${sentence}”对应的中文句类。`, label, labelOptions, `${label} 的典型功能是 ${functionText}。`, ['句子类型', label]),
      q(`What is the main function of "${sentence}"?`, `“${sentence}”主要表达什么功能？`, functionText, ['states information', 'asks for yes or no', 'asks for specific information', 'gives a command, request, or instruction', 'shows strong feeling'], `句子类型先看交际功能。本句是在 ${functionText}。`, ['功能', label]),
      q(`Which feature best matches "${sentence}"?`, `哪一个形式特征最符合“${sentence}”？`, feature, ['normal subject-verb order', 'auxiliary, modal, or be before the subject', 'question word plus question order', 'base verb at the beginning', 'what/how exclamatory pattern'], `本句的关键形式特征是 ${feature}。`, ['形式特征', label]),
      q(`Sentence type practice ${index + 1}: which sentence is the target example?`, `句子类型练习 ${index + 1} 中，哪一句是目标例句？`, sentence, ['Does he likes grammar?', 'What useful is it!', 'She not understand.'], `目标例句语法正确、功能清晰，属于 ${label}。`, ['句子辨析', label]),
      q(`Which check should come first when classifying "${sentence}"?`, `判断“${sentence}”类型时，第一步应检查什么？`, 'its communicative function', ['only the Chinese translation', 'only the last word', 'only the number of words'], `句子类型首先看它是在陈述、提问、命令还是感叹。`, ['判断步骤', label]),
      q(`Which punctuation/function pair fits "${sentence}"?`, `哪组“句类/功能”适合“${sentence}”？`, `${label} / ${functionText}`, ['疑问句 / states information', '祈使句 / asks for specific information', '陈述句 / shows strong feeling'], `句类和功能必须匹配。`, ['句子功能', label]),
      q(`Which description is correct for "${sentence}"?`, `哪一个描述正确分析了“${sentence}”？`, `It is a ${type} because it ${functionText}.`, ['It is only a noun phrase.', 'It has no communicative function.', 'It must always use do-support.'], `本句可归为 ${type}，因为它 ${functionText}。`, ['综合判断', label])
    ];
  });
}

export function buildSentenceTypesBank() {
  return bank('sentence-types', buildSentenceTypeQuestions());
}

const patternCases = [
  ['Birds fly.', '鸟儿飞。', 'Birds', 'fly', 'no object or complement', 'SV', 'fly 是不及物动词'],
  ['The sun rises.', '太阳升起。', 'The sun', 'rises', 'no object or complement', 'SV', 'rises 是不及物动词'],
  ['The baby slept.', '婴儿睡觉了。', 'The baby', 'slept', 'no object or complement', 'SV', 'slept 是不及物动词'],
  ['Leaves fall.', '树叶落下。', 'Leaves', 'fall', 'no object or complement', 'SV', 'fall 是不及物动词'],
  ['Time passes.', '时间流逝。', 'Time', 'passes', 'no object or complement', 'SV', 'passes 是不及物动词'],
  ['She reads books.', '她读书。', 'She', 'reads', 'books', 'SVO', 'reads 是及物动词，books 是宾语'],
  ['They discussed the plan.', '他们讨论了计划。', 'They', 'discussed', 'the plan', 'SVO', 'discussed 直接接宾语'],
  ['I lost my key.', '我丢了钥匙。', 'I', 'lost', 'my key', 'SVO', 'lost 后接动作对象'],
  ['We built a website.', '我们建了一个网站。', 'We', 'built', 'a website', 'SVO', 'built 后接宾语'],
  ['She answered the question.', '她回答了问题。', 'She', 'answered', 'the question', 'SVO', 'answered 后接宾语'],
  ['The soup tastes good.', '汤尝起来不错。', 'The soup', 'tastes', 'good', 'SVC', 'tastes 是系动词，good 是表语'],
  ['The room became quiet.', '房间变安静了。', 'The room', 'became', 'quiet', 'SVC', 'became 是系动词，quiet 是表语'],
  ['Her voice sounds soft.', '她的声音听起来柔和。', 'Her voice', 'sounds', 'soft', 'SVC', 'sounds 是系动词'],
  ['The idea seems strange.', '这个想法似乎很奇怪。', 'The idea', 'seems', 'strange', 'SVC', 'seems 后接表语'],
  ['He looks tired.', '他看起来很累。', 'He', 'looks', 'tired', 'SVC', 'looks 是系动词'],
  ['He gave me a pen.', '他给了我一支笔。', 'He', 'gave', 'me + a pen', 'SVOO', 'gave 后接间接宾语和直接宾语'],
  ['My father bought me a bike.', '我爸爸给我买了一辆自行车。', 'My father', 'bought', 'me + a bike', 'SVOO', 'bought 可接双宾语'],
  ['She sent Tom an email.', '她给 Tom 发了一封邮件。', 'She', 'sent', 'Tom + an email', 'SVOO', 'sent 后接双宾语'],
  ['The teacher told us a story.', '老师给我们讲了一个故事。', 'The teacher', 'told', 'us + a story', 'SVOO', 'told 后接双宾语'],
  ['They offered her a job.', '他们给了她一份工作。', 'They', 'offered', 'her + a job', 'SVOO', 'offered 后接双宾语'],
  ['We made him captain.', '我们让他当队长。', 'We', 'made', 'him + captain', 'SVOC', 'captain 补充说明 him'],
  ['The news made us happy.', '这个消息让我们高兴。', 'The news', 'made', 'us + happy', 'SVOC', 'happy 补充说明 us'],
  ['They found the test easy.', '他们发现考试很简单。', 'They', 'found', 'the test + easy', 'SVOC', 'easy 补充说明 the test'],
  ['I painted the wall blue.', '我把墙刷成蓝色。', 'I', 'painted', 'the wall + blue', 'SVOC', 'blue 补充说明 the wall'],
  ['The smell drove me crazy.', '这气味让我发疯。', 'The smell', 'drove', 'me + crazy', 'SVOC', 'crazy 补充说明 me']
];

function buildPatternQuestions() {
  return patternCases.flatMap(([sentence, zh, subject, verb, key, pattern, note], index) => [
    q(`Which basic pattern is "${sentence}"?`, `“${sentence}”属于哪种基本句型？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `${sentence} 的核心动词是 ${verb}，结构是 ${pattern}。${note}。`, ['五大句型', pattern]),
    q(`What is the main verb in "${sentence}"?`, `“${sentence}”中的核心动词是什么？`, verb, [subject, key, pattern], `${verb} 决定后面需要什么成分，因此决定句型。`, ['核心动词', pattern]),
    q(`What follows the verb in "${sentence}"?`, `“${sentence}”中动词后接的核心成分是什么？`, key, ['no object or complement', 'one object', 'a subject complement', 'two objects', 'an object and object complement'], `动词 ${verb} 后面的核心成分是 ${key}。`, ['动词搭配', pattern]),
    q(`Choose the correct skeleton for "${sentence}".`, `选择“${sentence}”的正确骨架。`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `不要按中文翻译判断，先看动词 ${verb} 的搭配。`, ['句子骨架', pattern]),
    q(`Which statement about "${sentence}" is correct?`, `关于“${sentence}”，哪项分析正确？`, `It is ${pattern}.`, ['It has no predicate.', 'It is only a noun phrase.', 'It has two finite verbs.'], `本句有完整主谓结构，核心句型是 ${pattern}。`, ['结构判断', pattern]),
    q(`Pattern practice ${index + 1}: which label should be written after this sentence?`, `句型练习 ${index + 1}：这个句子后应标哪个标签？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `标签应根据主干结构选择：${pattern}。`, ['标签练习', pattern]),
    q(`Why is "${sentence}" not judged only by Chinese meaning?`, `为什么不能只靠中文意思判断“${sentence}”？`, 'because the verb decides the pattern', ['because every English sentence is SVO', 'because word order is not important', 'because complements are optional'], `五大句型本质是动词的搭配能力：${verb} 决定结构。`, ['方法', pattern]),
    q(`What should you locate first in "${sentence}"?`, `分析“${sentence}”时应先定位什么？`, 'the main verb', ['the longest phrase', 'the Chinese topic', 'the final punctuation'], `先找核心谓语动词 ${verb}，再看它后面接什么。`, ['分析步骤', pattern])
  ]);
}

export function buildBasicSentencePatternsBank() {
  return bank('basic-sentence-patterns', buildPatternQuestions());
}

const thereItems = [
  ['a book', 'is', 'on the desk', '一本书', '在桌上'], ['three books', 'are', 'on the shelf', '三本书', '在书架上'], ['some water', 'is', 'in the glass', '一些水', '在杯子里'], ['two mistakes', 'are', 'in the sentence', '两个错误', '在句子里'], ['a teacher', 'is', 'in the classroom', '一位老师', '在教室里'],
  ['many students', 'are', 'at the gate', '许多学生', '在门口'], ['a little milk', 'is', 'in the bottle', '一点牛奶', '在瓶子里'], ['five messages', 'are', 'on my phone', '五条消息', '在我手机上'], ['a park', 'is', 'near my house', '一个公园', '在我家附近'], ['several chairs', 'are', 'around the table', '几把椅子', '在桌子周围'],
  ['no time', 'is', 'left', '没有时间', '剩下'], ['some problems', 'are', 'with this plan', '一些问题', '在这个计划中'], ['a pen and two books', 'is', 'in the bag', '一支笔和两本书', '在包里'], ['two books and a pen', 'are', 'in the bag', '两本书和一支笔', '在包里'], ['a lot of traffic', 'is', 'on the road', '很多交通车辆', '在路上'],
  ['many reasons', 'are', 'for the change', '许多原因', '造成这个变化'], ['a meeting', 'is', 'after lunch', '一个会议', '午饭后'], ['two exams', 'are', 'next week', '两场考试', '下周'], ['a picture', 'is', 'on the wall', '一幅画', '在墙上'], ['some clouds', 'are', 'in the sky', '一些云', '在天上'],
  ['a supermarket', 'is', 'across the street', '一家超市', '在街对面'], ['ten pages', 'are', 'in this chapter', '十页', '在本章中'], ['a chance', 'is', 'for every learner', '一个机会', '给每个学习者'], ['many ways', 'are', 'to solve it', '很多方法', '可以解决它'], ['some advice', 'is', 'in the article', '一些建议', '在文章里']
];

function buildThereBeQuestions() {
  return thereItems.flatMap(([noun, be, place, nounZh, placeZh], index) => {
    const cap = be === 'is' ? 'Is' : 'Are';
    const neg = be === 'is' ? 'There is not' : 'There are not';
    return [
      q(`There ___ ${noun} ${place}.`, `${placeZh}${nounZh}。`, be, ['is', 'are', 'has'], `There be 句型看 be 后面的真正主语；${noun} 对应 ${be}。`, ['there-be', be]),
      q(`Choose the correct sentence for "${nounZh}${placeZh}".`, `选择表达“${placeZh}${nounZh}”的正确句子。`, `There ${be} ${noun} ${place}.`, [`There has ${noun} ${place}.`, `There have ${noun} ${place}.`, `There ${be === 'is' ? 'are' : 'is'} ${noun} ${place}.`], `表达“某处有”用 There be，不用 There have/has。`, ['there-be', '存在句']),
      q(`Make a yes-no question: "There ${be} ${noun} ${place}."`, `把“There ${be} ${noun} ${place}.”改成一般疑问句。`, `${cap} there ${noun} ${place}?`, [`Do there ${noun} ${place}?`, `Have there ${noun} ${place}?`, `There ${be} ${noun} ${place}?`], `There be 一般疑问句把 be 提到 there 前面。`, ['there-be', '疑问句']),
      q(`Make a negative sentence: "There ${be} ${noun} ${place}."`, `把“There ${be} ${noun} ${place}.”改成否定句。`, `${neg} ${noun} ${place}.`, [`There does not ${noun} ${place}.`, `There has not ${noun} ${place}.`, `There not ${be} ${noun} ${place}.`], `There be 否定句是在 be 后加 not。`, ['there-be', '否定句']),
      q(`Which part controls the be-verb in item ${index + 1}: "There ___ ${noun} ${place}"?`, `第 ${index + 1} 题中，哪个词/短语决定 be 动词？`, noun, ['there', place, 'the first word'], `there 只是引导词，真正决定 is/are 的是 ${noun}。`, ['there-be', '真正主语']),
      q(`Which rule explains "There ${be} ${noun} ${place}"?`, `哪条规则解释“There ${be} ${noun} ${place}”？`, 'Choose is/are by the real subject after be.', ['Use have after there.', 'Always use are after there.', 'Always use is after there.'], `真正主语是 ${noun}，所以这里用 ${be}。`, ['there-be', '规则']),
      q(`Which option avoids the common mistake with "${noun}"?`, `哪个选项避免了 ${noun} 的常见错误？`, `There ${be} ${noun} ${place}.`, [`There has ${noun} ${place}.`, `There be ${noun} ${place}.`, `There ${be === 'is' ? 'are' : 'is'} ${noun} ${place}.`], `中文“有”容易诱导写 have，但存在句应用 There be。`, ['there-be', '易错']),
      q(`In "There ${be} ${noun} ${place}," what is "there"?`, `在“There ${be} ${noun} ${place}.”中，there 是什么？`, 'an introductory word', ['the real subject', 'the object', 'a possessive verb'], `there 引出存在句，不是真正主语。`, ['there-be', 'there'])
    ];
  });
}

export function buildThereBeBank() {
  return bank('there-be', buildThereBeQuestions());
}

const qnCases = [
  ['She likes tea.', '她喜欢茶。', 'Does she like tea?', 'She does not like tea.', 'does', 'does 后动词用原形'],
  ['They play soccer.', '他们踢足球。', 'Do they play soccer?', 'They do not play soccer.', 'do', 'do 后动词用原形'],
  ['He finished the work.', '他完成了工作。', 'Did he finish the work?', 'He did not finish the work.', 'did', 'did 后动词用原形'],
  ['The answer is correct.', '答案是正确的。', 'Is the answer correct?', 'The answer is not correct.', 'be', 'be 动词直接提前或加 not'],
  ['The examples are clear.', '例子很清楚。', 'Are the examples clear?', 'The examples are not clear.', 'be', 'be 动词直接提前或加 not'],
  ['You can explain it.', '你能解释它。', 'Can you explain it?', 'You cannot explain it.', 'modal', '情态动词直接提前或加 not'],
  ['She will join us.', '她会加入我们。', 'Will she join us?', 'She will not join us.', 'modal', '情态动词直接提前或加 not'],
  ['Tom has a bike.', 'Tom 有一辆自行车。', 'Does Tom have a bike?', 'Tom does not have a bike.', 'does', 'has 作实义动词时疑问否定用 does，have 用原形'],
  ['I need help.', '我需要帮助。', 'Do I need help?', 'I do not need help.', 'do', 'do 后动词用原形'],
  ['The train arrived late.', '火车晚点到了。', 'Did the train arrive late?', 'The train did not arrive late.', 'did', 'did 后动词用原形'],
  ['Mary is at home.', 'Mary 在家。', 'Is Mary at home?', 'Mary is not at home.', 'be', 'be 动词直接提前或加 not'],
  ['The books are on the desk.', '书在桌上。', 'Are the books on the desk?', 'The books are not on the desk.', 'be', 'be 动词直接提前或加 not'],
  ['He should review it.', '他应该复习它。', 'Should he review it?', 'He should not review it.', 'modal', '情态动词直接提前或加 not'],
  ['They must leave now.', '他们必须现在离开。', 'Must they leave now?', 'They must not leave now.', 'modal', '情态动词直接提前或加 not'],
  ['She wrote a letter.', '她写了一封信。', 'Did she write a letter?', 'She did not write a letter.', 'did', 'did 后动词用原形'],
  ['He studies grammar.', '他学习语法。', 'Does he study grammar?', 'He does not study grammar.', 'does', 'does 后动词用原形'],
  ['We understand the rule.', '我们理解规则。', 'Do we understand the rule?', 'We do not understand the rule.', 'do', 'do 后动词用原形'],
  ['It rained yesterday.', '昨天下雨了。', 'Did it rain yesterday?', 'It did not rain yesterday.', 'did', 'did 后动词用原形'],
  ['This sentence is long.', '这个句子很长。', 'Is this sentence long?', 'This sentence is not long.', 'be', 'be 动词直接提前或加 not'],
  ['Those questions are difficult.', '那些问题很难。', 'Are those questions difficult?', 'Those questions are not difficult.', 'be', 'be 动词直接提前或加 not'],
  ['You may start now.', '你现在可以开始。', 'May you start now?', 'You may not start now.', 'modal', '情态动词直接提前或加 not'],
  ['She would like coffee.', '她想要咖啡。', 'Would she like coffee?', 'She would not like coffee.', 'modal', '情态动词直接提前或加 not'],
  ['The child watches TV.', '孩子看电视。', 'Does the child watch TV?', 'The child does not watch TV.', 'does', 'does 后动词用原形'],
  ['My friends live nearby.', '我的朋友住在附近。', 'Do my friends live nearby?', 'My friends do not live nearby.', 'do', 'do 后动词用原形'],
  ['He saw the movie.', '他看了那部电影。', 'Did he see the movie?', 'He did not see the movie.', 'did', 'did 后动词用原形']
];

function buildQuestionsNegatives() {
  return qnCases.flatMap(([positive, zh, question, negative, helper, rule], index) => [
    q(`Choose the correct question for "${positive}"`, `为“${positive}”选择正确疑问句。`, question, [`Do ${positive}`, `Does ${positive}`, `Did ${positive}`], `${rule}。正确疑问句是 ${question}`, ['疑问句', helper]),
    q(`Choose the correct negative sentence for "${positive}"`, `为“${positive}”选择正确否定句。`, negative, [`${positive} not`, `Do not ${positive}`, `Does not ${positive}`], `${rule}。正确否定句是 ${negative}`, ['否定句', helper]),
    q(`Which helper is needed for item ${index + 1}: "${positive}"?`, `第 ${index + 1} 题需要哪类助动词/结构？`, helper, ['do', 'does', 'did', 'be', 'modal'], `判断否定和疑问时先看谓语类型；这里用 ${helper}。`, ['助动词', helper]),
    q(`What rule explains "${question}"?`, `哪条规则解释“${question}”？`, rule, ['疑问句不用助动词', 'did 后仍用过去式', 'be 后必须加 do'], `本题核心规则：${rule}。`, ['规则', helper]),
    q(`Which sentence is grammatically correct?`, `哪个句子语法正确？`, question, [`Does he likes grammar?`, `Did she wrote it?`, `Do you are ready?`], `正确句子应符合助动词和动词形式规则。`, ['正确句', helper]),
    q(`Which version correctly uses not for "${positive}"?`, `哪个版本正确使用 not？`, negative, [`${positive} no`, `${positive} doesn't`, `Not ${positive}`], `not 的位置取决于 be、情态动词或 do/does/did。`, ['not 位置', helper]),
    q(`When forming a question from "${positive}", what changes first?`, `把“${positive}”变疑问句时，第一步改什么？`, 'move or add the auxiliary before the subject', ['translate word by word', 'put not at the end', 'change every verb to -ing'], `英语疑问句通常先处理助动词位置。`, ['疑问步骤', helper]),
    q(`Which common mistake should be avoided with "${question}"?`, `使用“${question}”时应避免哪个常见错误？`, 'using a changed verb after do/does/did', ['placing the subject before every auxiliary', 'using punctuation', 'using a subject'], `do/does/did 后面实义动词要用原形。`, ['易错', helper])
  ]);
}

export function buildQuestionsNegativesBank() {
  return bank('questions-negatives', buildQuestionsNegatives());
}

const orderCases = [
  ['I like this book very much.', '我很喜欢这本书。', 'SVO + degree adverbial', ['This book I like very much.', 'I very like this book.', 'Like I this book very much.']],
  ['She usually reviews her notes.', '她通常复习笔记。', 'frequency adverb before main verb', ['She reviews usually her notes.', 'Usually she her notes reviews.', 'She her notes usually reviews.']],
  ['He is always careful.', '他总是很仔细。', 'frequency adverb after be', ['He always is careful.', 'Always he is careful.', 'He careful always is.']],
  ['Where does your sister work?', '你姐姐/妹妹在哪里工作？', 'wh-question order', ['Where your sister does work?', 'Where does work your sister?', 'Your sister works where?']],
  ['She studies English at home after dinner.', '她晚饭后在家学英语。', 'place before time', ['She studies English after dinner at home.', 'She at home after dinner studies English.', 'After dinner at home she English studies.']],
  ['Yesterday, I met my teacher at the library.', '昨天我在图书馆遇到了老师。', 'fronted time adverbial', ['Yesterday met I my teacher at the library.', 'I yesterday at the library met my teacher.', 'At the library yesterday met I my teacher.']],
  ['She speaks English well.', '她英语说得很好。', 'adverb after object', ['She speaks well English.', 'She well speaks English.', 'English she speaks well.']],
  ['Can you explain this rule clearly?', '你能清楚解释这条规则吗？', 'modal question order', ['You can explain this rule clearly?', 'Can explain you this rule clearly?', 'Can you clearly this rule explain?']],
  ['My teacher explained the rule clearly.', '我的老师清楚地解释了规则。', 'subject-verb-object', ['The rule my teacher explained clearly.', 'My teacher clearly the rule explained.', 'Explained my teacher the rule clearly.']],
  ['There is a book on the desk.', '桌上有一本书。', 'there-be order', ['A book is there on the desk.', 'On the desk has a book.', 'There a book is on the desk.']],
  ['The children are playing outside now.', '孩子们现在正在外面玩。', 'verb phrase before adverbials', ['The children outside now are playing.', 'Now outside are playing the children.', 'The children playing are outside now.']],
  ['I often go to the library on Sundays.', '我周日经常去图书馆。', 'frequency before main verb', ['I go often to the library on Sundays.', 'Often I to the library go on Sundays.', 'I to the library often go on Sundays.']],
  ['Do you understand this example?', '你理解这个例子吗？', 'do-support question', ['You understand this example?', 'Do understand you this example?', 'Do you this example understand?']],
  ['What time does the class begin?', '课几点开始？', 'wh-word + auxiliary + subject', ['What time the class does begin?', 'What time does begin the class?', 'The class begins what time?']],
  ['Please write the answer here.', '请把答案写在这里。', 'imperative order', ['Please the answer write here.', 'Here please write the answer.', 'Please write here the answer.']],
  ['She gave me a useful tip.', '她给了我一个有用建议。', 'double object order', ['She gave a useful tip me.', 'She me gave a useful tip.', 'A useful tip she gave me.']],
  ['The movie made us happy.', '这部电影让我们高兴。', 'object before object complement', ['The movie made happy us.', 'The movie us made happy.', 'Happy the movie made us.']],
  ['I put the keys on the table.', '我把钥匙放在桌上。', 'object before place phrase', ['I put on the table the keys.', 'I the keys put on the table.', 'On the table I the keys put.']],
  ['At night, the city becomes quiet.', '晚上，城市变得安静。', 'fronted time with normal main order', ['At night, becomes the city quiet.', 'The city at night quiet becomes.', 'At night, quiet becomes the city.']],
  ['We will meet at the station tomorrow.', '我们明天在车站见。', 'place before time', ['We will meet tomorrow at the station.', 'We at the station tomorrow will meet.', 'Tomorrow at the station will meet we.']],
  ['The red bag belongs to Mary.', '红色包属于 Mary。', 'attributive before noun', ['The bag red belongs to Mary.', 'Belongs the red bag to Mary.', 'The red bag to Mary belongs.']],
  ['She never eats breakfast late.', '她从不很晚吃早餐。', 'negative frequency before main verb', ['She eats never breakfast late.', 'Never she breakfast eats late.', 'She breakfast never eats late.']],
  ['Is your brother at school?', '你哥哥/弟弟在学校吗？', 'be question order', ['Your brother is at school?', 'Is at school your brother?', 'At school is your brother?']],
  ['How carefully he checks his work!', '他检查作业多么仔细啊！', 'how exclamation order', ['How he checks carefully his work!', 'How carefully checks he his work!', 'He checks his work how carefully!']],
  ['They have already finished the task.', '他们已经完成了任务。', 'already before main participle', ['They already have finished the task.', 'They have finished already the task.', 'Already they the task have finished.']]
];

function buildWordOrderQuestions() {
  return orderCases.flatMap(([correct, zh, focus, wrongOrders], index) => [
    q(`Choose the natural English word order for: ${zh}`, `选择“${zh}”的自然英语语序。`, correct, wrongOrders, `自然语序要保持英文主干，再放状语。本句重点是 ${focus}。`, ['语序', focus]),
    q(`What word-order rule is shown by "${correct}"?`, `“${correct}”体现了什么语序规则？`, focus, ['Chinese topic-first order', 'random word order', 'verb at the end'], `本句重点语序规则是 ${focus}。`, ['语序规则', focus]),
    q(`Which sentence keeps the main subject and verb in a natural order?`, `哪个句子保持了自然的主谓顺序？`, correct, ['The rule clearly my teacher explained.', 'At home studies she English.', 'Does likes he tea?'], `英语依靠语序表达关系，主谓核心不能随意拆散。`, ['主谓顺序']),
    q(`In order practice ${index + 1}, what should you check first?`, `语序练习 ${index + 1} 中，第一步检查什么？`, 'the subject-verb core', ['only the Chinese word order', 'only the final word', 'only the punctuation'], `先找到主谓核心，再放宾语和状语。`, ['分析步骤']),
    q(`Which option avoids Chinglish word order?`, `哪个选项避免了中式英语语序？`, correct, ['This sentence I understand not.', 'I very like English.', 'Yesterday met I him.'], `正确选项遵循英语语序，不直接照搬中文顺序。`, ['中式英语', '语序']),
    q(`What is the safest way to build "${correct}"?`, `构造“${correct}”最稳的方法是什么？`, 'subject + verb + required complements + adverbials', ['time + object + subject + verb always', 'translate each Chinese word in order', 'put every adverb before the subject'], `先搭主干，再添加修饰语。`, ['造句方法']),
    q(`Which part of "${correct}" should generally stay close together?`, `“${correct}”中哪些部分通常要靠近？`, 'subject and main verb', ['time and punctuation', 'object and subject', 'Chinese topic and translation'], `主语和谓语关系是英语句子的核心。`, ['主谓关系']),
    q(`Why is "${correct}" better than a word-for-word Chinese order?`, `为什么“${correct}”比逐词照搬中文更好？`, 'because English uses fixed word order to show grammar roles', ['because English has no grammar roles', 'because every adverb must be first', 'because objects always come before subjects'], `英语用相对固定的语序表达主语、谓语、宾语和状语关系。`, ['语序逻辑'])
  ]);
}

export function buildWordOrderBasicsBank() {
  return bank('word-order-basics', buildWordOrderQuestions());
}
