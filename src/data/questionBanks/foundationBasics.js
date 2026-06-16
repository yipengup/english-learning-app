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
    q(`In "${sentence}" what is the subject?`, `在“${sentence}”中，主语是什么？`, subject, [predicate, focus, `${subject} ${predicate}`], `主语说明句子谈论的是谁或什么。本句中 ${subject} 是谓语 ${predicate} 的发出者或被说明对象。`, ['句子成分', '主语']),
    q(`In "${sentence}" what is the main predicate?`, `在“${sentence}”中，主要谓语是什么？`, predicate, [subject, focus, pattern], `谓语是句子的核心动作或状态。本句主要谓语是 ${predicate}。`, ['句子成分', '谓语']),
    q(`In "${sentence}" what role does "${focus}" play?`, `在“${sentence}”中，${focus} 是什么成分？`, role, ['subject', 'predicate', 'object', 'adverbial', 'predicative', 'object complement', 'attributive', 'indirect object'], `${focus} 在本句中承担 ${role} 功能，判断成分时要看它服务于动词、名词还是主语状态。`, ['句子成分', role]),
    q(`What is the basic sentence pattern of "${sentence}"?`, `“${sentence}” 属于哪一种基本句型？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `本句主干是 ${subject} + ${predicate}，核心结构可归为 ${pattern}。`, ['五大句型', pattern]),
    q(`Which is the subject-predicate core of sentence ${index + 1}: "${sentence}"?`, `句子“${sentence}”的主谓核心是哪一组？`, `${subject} + ${predicate}`, [`${predicate} + ${focus}`, `${subject} + ${focus}`, `${focus} + ${predicate}`], `先找主语和谓语，主干核心是 ${subject} + ${predicate}。`, ['主干', '主谓']),
    q(`Which part names the action or state in "${sentence}"?`, `“${sentence}”中哪一部分表示动作或状态？`, predicate, [subject, focus, role], `${predicate} 是谓语核心，表示动作、变化或状态。`, ['谓语', '主干']),
    q(`Which part tells who or what the sentence is mainly about in "${sentence}"?`, `“${sentence}”主要在说谁或什么？`, subject, [predicate, focus, role], `英文句子通常围绕主语展开，本句主要谈论 ${subject}。`, ['主语', '识别']),
    q(`Choose the correct analysis of "${focus}" in "${sentence}".`, `选择对“${sentence}”中 ${focus} 的正确分析。`, `${focus} is ${role}.`, [`${focus} is the subject.`, `${focus} is the predicate.`, `${focus} is a complete sentence.`], `${focus} 不是单独判断中文意思，而是看它在句中功能；这里它是 ${role}。`, ['成分分析', role])
  ]);
}

const typeMeta = {
  declarative: ['陈述句', 'states information', 'normal subject-verb order'],
  'yes-no question': ['一般疑问句', 'asks for yes or no', 'auxiliary or be before the subject'],
  'wh-question': ['特殊疑问句', 'asks for specific information', 'question word at the beginning'],
  imperative: ['祈使句', 'gives a command or request', 'base verb at the beginning'],
  exclamatory: ['感叹句', 'shows strong feeling', 'what/how exclamatory pattern'],
  'negative declarative': ['否定陈述句', 'states negative information', 'not after an auxiliary or be'],
  'tag question': ['反意疑问句', 'asks for confirmation', 'a short tag after a comma']
};

const typeCases = [
  ['She studies English every morning.', '她每天早上学英语。', 'declarative'],
  ['Does she study English every morning?', '她每天早上学英语吗？', 'yes-no question'],
  ['Where does she study English?', '她在哪里学英语？', 'wh-question'],
  ['Open your book, please.', '请打开你的书。', 'imperative'],
  ['What a useful lesson it is!', '这是一节多么有用的课啊！', 'exclamatory'],
  ['He does not like coffee.', '他不喜欢咖啡。', 'negative declarative'],
  ['You are ready, aren\'t you?', '你准备好了，是吗？', 'tag question'],
  ['My brother plays basketball after school.', '我弟弟放学后打篮球。', 'declarative'],
  ['Can you help me with this sentence?', '你能帮我看这个句子吗？', 'yes-no question'],
  ['Why did they leave early?', '他们为什么早走？', 'wh-question'],
  ['Listen to the teacher carefully.', '认真听老师讲。', 'imperative'],
  ['How clearly she explains grammar!', '她讲语法讲得多清楚啊！', 'exclamatory'],
  ['They are not in the classroom.', '他们不在教室里。', 'negative declarative'],
  ['She can swim, can\'t she?', '她会游泳，对吗？', 'tag question'],
  ['The train arrives at six.', '火车六点到。', 'declarative'],
  ['Is this answer correct?', '这个答案正确吗？', 'yes-no question'],
  ['When will the meeting start?', '会议什么时候开始？', 'wh-question'],
  ['Do not touch the hot cup.', '不要碰热杯子。', 'imperative'],
  ['What beautiful flowers they are!', '它们是多么漂亮的花啊！', 'exclamatory'],
  ['I did not finish the report.', '我没有完成报告。', 'negative declarative'],
  ['It is cold today, isn\'t it?', '今天很冷，是吗？', 'tag question'],
  ['The children are playing outside.', '孩子们正在外面玩。', 'declarative'],
  ['Are the examples clear?', '这些例子清楚吗？', 'yes-no question'],
  ['How do you spell this word?', '这个单词怎么拼？', 'wh-question'],
  ['Please write your name here.', '请在这里写下你的名字。', 'imperative']
];

function buildTypeQuestions() {
  const typeOptions = Object.keys(typeMeta);
  return typeCases.flatMap(([sentence, zh, type], index) => {
    const [label, functionText, feature] = typeMeta[type];
    return [
      q(`What type of sentence is "${sentence}"?`, `“${sentence}” 是什么句子类型？`, type, typeOptions, `它的功能是 ${functionText}，所以是 ${type}。`, ['句子类型', label]),
      q(`Choose the Chinese label for "${sentence}".`, `选择“${sentence}”对应的中文句类。`, label, Object.values(typeMeta).map(item => item[0]), `${label} 的典型功能是 ${functionText}。`, ['句子类型', label]),
      q(`What is the main function of "${sentence}"?`, `“${sentence}”主要表达什么功能？`, functionText, ['states information', 'asks for yes or no', 'gives a command or request', 'shows strong feeling', 'asks for confirmation'], `句子类型要先看交际功能。本句是在 ${functionText}。`, ['功能', label]),
      q(`Which feature best matches "${sentence}"?`, `哪一个特征最符合“${sentence}”？`, feature, ['normal subject-verb order', 'auxiliary or be before the subject', 'question word at the beginning', 'base verb at the beginning', 'what/how exclamatory pattern', 'a short tag after a comma'], `本句的关键形式特征是 ${feature}。`, ['形式特征', label]),
      q(`For sentence type practice ${index + 1}, which sentence is the example?`, `句子类型练习 ${index + 1} 中，哪一句是目标例句？`, sentence, ['Does he likes grammar?', 'What useful is it!', 'She not understand.'], `目标例句是语法正确、功能清晰的 ${label}。`, ['句子辨析', label]),
      q(`Which check should come first when classifying "${sentence}"?`, `判断“${sentence}”类型时，第一步应检查什么？`, 'its communicative function', ['only the Chinese translation', 'only the last word', 'only the number of words'], `句子类型首先看它是在陈述、提问、命令还是感叹。`, ['判断步骤', label]),
      q(`What punctuation/function pair fits "${sentence}"?`, `哪组“标点/功能”适合“${sentence}”？`, `${label} / ${functionText}`, ['疑问句 / states information', '祈使句 / asks for confirmation', '陈述句 / shows strong feeling'], `标点和语序要服务于句子的交际功能。`, ['句子功能', label]),
      q(`Which description is correct for "${sentence}"?`, `哪一个描述正确分析了“${sentence}”？`, `It is a ${type} because it ${functionText}.`, ['It is a noun phrase, not a sentence.', 'It has no communicative function.', 'It must always use do-support.'], `本句可归为 ${type}，因为它 ${functionText}。`, ['综合判断', label])
    ];
  });
}

const patternCases = [
  ['Birds fly.', '鸟儿飞。', 'SV', 'fly', 'no object'],
  ['She reads books.', '她读书。', 'SVO', 'reads', 'books'],
  ['The soup tastes good.', '汤尝起来不错。', 'SVC', 'tastes', 'good'],
  ['He gave me a pen.', '他给了我一支笔。', 'SVOO', 'gave', 'me + a pen'],
  ['We made him captain.', '我们让他当队长。', 'SVOC', 'made', 'him + captain'],
  ['The sun rises.', '太阳升起。', 'SV', 'rises', 'no object'],
  ['They discussed the plan.', '他们讨论了计划。', 'SVO', 'discussed', 'the plan'],
  ['The room became quiet.', '房间变安静了。', 'SVC', 'became', 'quiet'],
  ['My father bought me a bike.', '我爸爸给我买了一辆自行车。', 'SVOO', 'bought', 'me + a bike'],
  ['The news made us happy.', '这个消息让我们高兴。', 'SVOC', 'made', 'us + happy'],
  ['The baby slept.', '婴儿睡觉了。', 'SV', 'slept', 'no object'],
  ['I lost my key.', '我丢了钥匙。', 'SVO', 'lost', 'my key'],
  ['Her voice sounds soft.', '她的声音听起来柔和。', 'SVC', 'sounds', 'soft'],
  ['She sent Tom an email.', '她给 Tom 发了一封邮件。', 'SVOO', 'sent', 'Tom + an email'],
  ['They found the test easy.', '他们发现考试很简单。', 'SVOC', 'found', 'the test + easy'],
  ['Leaves fall.', '树叶落下。', 'SV', 'fall', 'no object'],
  ['We built a website.', '我们建了一个网站。', 'SVO', 'built', 'a website'],
  ['The idea seems strange.', '这个想法似乎很奇怪。', 'SVC', 'seems', 'strange'],
  ['The teacher told us a story.', '老师给我们讲了一个故事。', 'SVOO', 'told', 'us + a story'],
  ['I painted the wall blue.', '我把墙刷成蓝色。', 'SVOC', 'painted', 'the wall + blue'],
  ['Time passes.', '时间流逝。', 'SV', 'passes', 'no object'],
  ['She answered the question.', '她回答了问题。', 'SVO', 'answered', 'the question'],
  ['He looks tired.', '他看起来很累。', 'SVC', 'looks', 'tired'],
  ['They offered her a job.', '他们给了她一份工作。', 'SVOO', 'offered', 'her + a job'],
  ['The smell drove me crazy.', '这气味让我发疯。', 'SVOC', 'drove', 'me + crazy']
];

function buildPatternQuestions() {
  return patternCases.flatMap(([sentence, zh, pattern, verb, key], index) => [
    q(`Which basic pattern is "${sentence}"?`, `“${sentence}”属于哪种基本句型？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `${sentence} 的核心动词是 ${verb}，结构是 ${pattern}。`, ['五大句型', pattern]),
    q(`What is the main verb in "${sentence}"?`, `“${sentence}”中的核心动词是什么？`, verb, [key, pattern, sentence.split(' ')[0]], `${verb} 决定后面需要什么成分，因此决定句型。`, ['核心动词', pattern]),
    q(`What follows the verb in "${sentence}"?`, `“${sentence}”中动词后接的核心成分是什么？`, key, ['no object', 'an object', 'a subject complement', 'two objects', 'an object and object complement'], `动词 ${verb} 后面的成分是 ${key}，这是判断 ${pattern} 的关键。`, ['动词搭配', pattern]),
    q(`Choose the correct skeleton for "${sentence}".`, `选择“${sentence}”的正确骨架。`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `不要按中文翻译判断，先看动词 ${verb} 的搭配。`, ['句子骨架', pattern]),
    q(`Which statement about "${sentence}" is correct?`, `关于“${sentence}”，哪项分析正确？`, `It is ${pattern}.`, ['It has no predicate.', 'It is only a noun phrase.', 'It has two finite verbs.'], `本句有完整主谓结构，核心句型是 ${pattern}。`, ['结构判断', pattern]),
    q(`Pattern practice ${index + 1}: which label should be written after this sentence?`, `句型练习 ${index + 1}：这个句子后应标哪个标签？`, pattern, ['SV', 'SVO', 'SVC', 'SVOO', 'SVOC'], `标签应根据主干结构选择：${pattern}。`, ['标签练习', pattern]),
    q(`Why is "${sentence}" not judged only by Chinese meaning?`, `为什么不能只靠中文意思判断“${sentence}”？`, 'because the verb decides the pattern', ['because every English sentence is SVO', 'because word order is not important', 'because complements are optional'], `五大句型本质是动词的搭配能力：${verb} 决定结构。`, ['方法', pattern]),
    q(`What should you locate first in "${sentence}"?`, `分析“${sentence}”时应先定位什么？`, 'the main verb', ['the longest phrase', 'the Chinese subject', 'the final punctuation'], `先找核心谓语动词 ${verb}，再看它后面接什么。`, ['分析步骤', pattern])
  ]);
}

const thereItems = [
  ['a book', 'is', 'on the desk', '一本书', '在桌上'], ['three books', 'are', 'on the shelf', '三本书', '在书架上'], ['some water', 'is', 'in the glass', '一些水', '在杯子里'], ['two mistakes', 'are', 'in the sentence', '两个错误', '在句子里'], ['a teacher', 'is', 'in the classroom', '一位老师', '在教室里'], ['many students', 'are', 'at the gate', '许多学生', '在门口'], ['a little milk', 'is', 'in the bottle', '一点牛奶', '在瓶子里'], ['five messages', 'are', 'on my phone', '五条消息', '在我手机上'], ['a park', 'is', 'near my house', '一个公园', '在我家附近'], ['several chairs', 'are', 'around the table', '几把椅子', '在桌子周围'], ['no time', 'is', 'left', '没有时间', '剩下'], ['some problems', 'are', 'with this plan', '一些问题', '在这个计划中'], ['a pen and two books', 'is', 'in the bag', '一支笔和两本书', '在包里'], ['two books and a pen', 'are', 'in the bag', '两本书和一支笔', '在包里'], ['a lot of traffic', 'is', 'on the road', '很多交通车辆', '在路上'], ['many reasons', 'are', 'for the change', '许多原因', '造成这个变化'], ['a meeting', 'is', 'after lunch', '一个会议', '午饭后'], ['two exams', 'are', 'next week', '两场考试', '下周'], ['a picture', 'is', 'on the wall', '一幅画', '在墙上'], ['some clouds', 'are', 'in the sky', '一些云', '在天上'], ['a supermarket', 'is', 'across the street', '一家超市', '在街对面'], ['ten pages', 'are', 'in this chapter', '十页', '在本章中'], ['a chance', 'is', 'for every learner', '一个机会', '给每个学习者'], ['many ways', 'are', 'to solve it', '很多方法', '可以解决它'], ['some advice', 'is', 'in the article', '一些建议', '在文章里']
];

function buildThereBeQuestions() {
  return thereItems.flatMap(([noun, be, place, nounZh, placeZh], index) => {
    const cap = be === 'is' ? 'Is' : 'Are';
    const neg = be === 'is' ? 'There is not' : 'There are not';
    return [
      q(`There ___ ${noun} ${place}.`, `${placeZh}${nounZh}。`, be, ['is', 'are', 'am', 'have'], `There be 句型看 be 后面的真正主语；${noun} 对应 ${be}。`, ['there-be', be]),
      q(`Choose the correct sentence for "${nounZh}${placeZh}".`, `选择表达“${placeZh}${nounZh}”的正确句子。`, `There ${be} ${noun} ${place}.`, [`There have ${noun} ${place}.`, `There has ${noun} ${place}.`, `There ${be === 'is' ? 'are' : 'is'} ${noun} ${place}.`], `表达“某处有”用 There be，不用 There have。`, ['there-be', '存在句']),
      q(`Make a yes-no question: There ${be} ${noun} ${place}.`, `把“There ${be} ${noun} ${place}.”改成一般疑问句。`, `${cap} there ${noun} ${place}?`, [`Do there ${noun} ${place}?`, `Have there ${noun} ${place}?`, `There ${be} ${noun} ${place}?`], `There be 一般疑问句把 be 提到 there 前面。`, ['there-be', '疑问句']),
      q(`Make a negative sentence: There ${be} ${noun} ${place}.`, `把“There ${be} ${noun} ${place}.”改成否定句。`, `${neg} ${noun} ${place}.`, [`There does not ${noun} ${place}.`, `There has not ${noun} ${place}.`, `There not ${be} ${noun} ${place}.`], `There be 否定句是在 be 后加 not。`, ['there-be', '否定句']),
      q(`Which word controls the be-verb in item ${index + 1}: "There ___ ${noun} ${place}"?`, `第 ${index + 1} 题中，哪个词/短语决定 be 动词？`, noun, ['there', place, 'the first word'], `there 只是引导词，真正决定 is/are 的是 ${noun}。`, ['there-be', '真正主语']),
      q(`Which rule explains "There ${be} ${noun} ${place}"?`, `哪条规则解释“There ${be} ${noun} ${place}”？`, 'Choose is/are by the real subject after be.', ['Use have after there.', 'Always use are after there.', 'Always use is after there.'], `真正主语是 ${noun}，所以这里用 ${be}。`, ['there-be', '规则']),
      q(`Which option avoids the common mistake with "${noun}"?`, `哪个选项避免了 ${noun} 的常见错误？`, `There ${be} ${noun} ${place}.`, [`There has ${noun} ${place}.`, `There be ${noun} ${place}.`, `There ${be === 'is' ? 'are' : 'is'} ${noun} ${place}.`], `中文“有”容易诱导写 have，但存在句应用 There be。`, ['there-be', '易错']),
      q(`In "There ${be} ${noun} ${place}," what is "there"?`, `在“There ${be} ${noun} ${place}.”中，there 是什么？`, 'an introductory word', ['the real subject', 'the object', 'a possessive verb'], `there 引出存在句，不是真正主语。`, ['there-be', 'there'])
    ];
  });
}

const qnCases = [
  ['She likes tea.', '她喜欢茶。', 'Does she like tea?', 'She does not like tea.', 'does'], ['They play soccer.', '他们踢足球。', 'Do they play soccer?', 'They do not play soccer.', 'do'], ['He finished the work.', '他完成了工作。', 'Did he finish the work?', 'He did not finish the work.', 'did'], ['The answer is correct.', '答案是正确的。', 'Is the answer correct?', 'The answer is not correct.', 'be'], ['The examples are clear.', '例子很清楚。', 'Are the examples clear?', 'The examples are not clear.', 'be'], ['You can explain it.', '你能解释它。', 'Can you explain it?', 'You cannot explain it.', 'modal'], ['She will join us.', '她会加入我们。', 'Will she join us?', 'She will not join us.', 'modal'], ['Tom has a bike.', 'Tom 有一辆自行车。', 'Does Tom have a bike?', 'Tom does not have a bike.', 'does'], ['I need help.', '我需要帮助。', 'Do I need help?', 'I do not need help.', 'do'], ['The train arrived late.', '火车晚点到了。', 'Did the train arrive late?', 'The train did not arrive late.', 'did'], ['Mary is at home.', 'Mary 在家。', 'Is Mary at home?', 'Mary is not at home.', 'be'], ['The books are on the desk.', '书在桌上。', 'Are the books on the desk?', 'The books are not on the desk.', 'be'], ['He should review it.', '他应该复习它。', 'Should he review it?', 'He should not review it.', 'modal'], ['They must leave now.', '他们必须现在离开。', 'Must they leave now?', 'They must not leave now.', 'modal'], ['She wrote a letter.', '她写了一封信。', 'Did she write a letter?', 'She did not write a letter.', 'did'], ['He studies grammar.', '他学习语法。', 'Does he study grammar?', 'He does not study grammar.', 'does'], ['We understand the rule.', '我们理解规则。', 'Do we understand the rule?', 'We do not understand the rule.', 'do'], ['It rained yesterday.', '昨天下雨了。', 'Did it rain yesterday?', 'It did not rain yesterday.', 'did'], ['This sentence is long.', '这个句子很长。', 'Is this sentence long?', 'This sentence is not long.', 'be'], ['Those questions are difficult.', '那些问题很难。', 'Are those questions difficult?', 'Those questions are not difficult.', 'be'], ['You may start now.', '你现在可以开始。', 'May you start now?', 'You may not start now.', 'modal'], ['She would like coffee.', '她想要咖啡。', 'Would she like coffee?', 'She would not like coffee.', 'modal'], ['The child watches TV.', '孩子看电视。', 'Does the child watch TV?', 'The child does not watch TV.', 'does'], ['My friends live nearby.', '我的朋友住在附近。', 'Do my friends live nearby?', 'My friends do not live nearby.', 'do'], ['He saw the movie.', '他看了那部电影。', 'Did he see the movie?', 'He did not see the movie.', 'did']
];

function buildQuestionsNegatives() {
  return qnCases.flatMap(([positive, zh, question, negative, helper], index) => {
    const baseVerbRule = helper === 'did' ? 'did 后动词用原形' : helper === 'does' ? 'does 后动词用原形' : helper === 'do' ? 'do 后动词用原形' : helper === 'be' ? 'be 动词直接提前或加 not' : '情态动词直接提前或加 not';
    return [
      q(`Choose the correct question for "${positive}"`, `为“${positive}”选择正确疑问句。`, question, [`Do ${positive}`, `Does ${positive}`, `Did ${positive}`], `${baseVerbRule}。正确疑问句是 ${question}`, ['疑问句', helper]),
      q(`Choose the correct negative sentence for "${positive}"`, `为“${positive}”选择正确否定句。`, negative, [`${positive} not`, `Do not ${positive}`, `Does not ${positive}`], `${baseVerbRule}。正确否定句是 ${negative}`, ['否定句', helper]),
      q(`Which helper is needed for item ${index + 1}: "${positive}"?`, `第 ${index + 1} 题需要哪类助动词/结构？`, helper, ['do', 'does', 'did', 'be', 'modal'], `判断否定和疑问时先看谓语类型；这里用 ${helper}。`, ['助动词', helper]),
      q(`What rule explains "${question}"?`, `哪条规则解释“${question}”？`, baseVerbRule, ['疑问句不用助动词', 'did 后仍用过去式', 'be 后必须加 do'], `本题核心规则：${baseVerbRule}。`, ['规则', helper]),
      q(`Which sentence is grammatically correct?`, `哪个句子语法正确？`, question, [`Does he likes grammar?`, `Did she wrote it?`, `Do you are ready?`], `正确句子应符合助动词和动词形式规则。`, ['正确句', helper]),
      q(`Which version correctly uses not for "${positive}"?`, `哪个版本正确使用 not？`, negative, [`${positive} no`, `${positive} doesn't`, `Not ${positive}`], `not 的位置取决于 be、情态动词或 do/does/did。`, ['not 位置', helper]),
      q(`When forming a question from "${positive}", what changes first?`, `把“${positive}”变疑问句时，第一步改什么？`, 'move or add the auxiliary before the subject', ['translate word by word', 'put not at the end', 'change every verb to -ing'], `英语疑问句通常先处理助动词位置。`, ['疑问步骤', helper]),
      q(`Which common mistake should be avoided with "${question}"?`, `使用“${question}”时应避免哪个常见错误？`, 'using a changed verb after do/does/did', ['placing the subject before every auxiliary', 'using punctuation', 'using a subject'], `do/does/did 后面实义动词要用原形。`, ['易错', helper])
    ];
  });
}

const orderCases = [
  ['I like this book very much.', '我很喜欢这本书。', 'SVO + degree adverbial'], ['She usually reviews her notes.', '她通常复习笔记。', 'frequency adverb before main verb'], ['He is always careful.', '他总是很仔细。', 'frequency adverb after be'], ['Where does your sister work?', '你姐姐/妹妹在哪里工作？', 'wh-question order'], ['She studies English at home after dinner.', '她晚饭后在家学英语。', 'place before time'], ['Yesterday, I met my teacher at the library.', '昨天我在图书馆遇到了老师。', 'fronted time adverbial'], ['She speaks English well.', '她英语说得很好。', 'adverb after object'], ['Can you explain this rule clearly?', '你能清楚解释这条规则吗？', 'modal question order'], ['My teacher explained the rule clearly.', '我的老师清楚地解释了规则。', 'subject-verb-object'], ['There is a book on the desk.', '桌上有一本书。', 'there-be order'], ['The children are playing outside now.', '孩子们现在正在外面玩。', 'verb phrase before adverbials'], ['I often go to the library on Sundays.', '我周日经常去图书馆。', 'frequency before main verb'], ['Do you understand this example?', '你理解这个例子吗？', 'do-support question'], ['What time does the class begin?', '课几点开始？', 'wh-word + auxiliary + subject'], ['Please write the answer here.', '请把答案写在这里。', 'imperative order'], ['She gave me a useful tip.', '她给了我一个有用建议。', 'double object order'], ['The movie made us happy.', '这部电影让我们高兴。', 'object before object complement'], ['I put the keys on the table.', '我把钥匙放在桌上。', 'object before place phrase'], ['At night, the city becomes quiet.', '晚上，城市变得安静。', 'fronted time with normal main order'], ['We will meet at the station tomorrow.', '我们明天在车站见。', 'place before time'], ['The red bag belongs to Mary.', '红色包属于 Mary。', 'attributive before noun'], ['She never eats breakfast late.', '她从不很晚吃早餐。', 'negative frequency before main verb'], ['Is your brother at school?', '你哥哥/弟弟在学校吗？', 'be question order'], ['How carefully he checks his work!', '他检查作业多么仔细啊！', 'how exclamation order'], ['They have already finished the task.', '他们已经完成了任务。', 'already before main participle']
];

function buildWordOrderQuestions() {
  return orderCases.flatMap(([correct, zh, focus], index) => [
    q(`Choose the natural English word order for: ${zh}`, `选择“${zh}”的自然英语语序。`, correct, ['This book I very like.', 'Usually she notes reviews.', 'Does your sister works where?'], `自然语序要保持英文主干，再放状语。本句重点是 ${focus}。`, ['语序', focus]),
    q(`What word-order rule is shown by "${correct}"?`, `“${correct}”体现了什么语序规则？`, focus, ['Chinese topic-first order', 'random word order', 'verb at the end'], `本句重点语序规则是 ${focus}。`, ['语序规则', focus]),
    q(`Which sentence keeps the main subject and verb in a natural order?`, `哪个句子保持了自然的主谓顺序？`, correct, ['The rule clearly my teacher explained.', 'At home studies she English.', 'Does likes he tea?'], `英语依靠语序表达关系，主谓核心不能随意拆散。`, ['主谓顺序']),
    q(`In order practice ${index + 1}, what should you check first?`, `语序练习 ${index + 1} 中，第一步检查什么？`, 'the subject-verb core', ['only the Chinese word order', 'only the final word', 'only the punctuation'], `先找到主谓核心，再放宾语和状语。`, ['分析步骤']),
    q(`Which option avoids Chinglish word order?`, `哪个选项避免了中式英语语序？`, correct, ['This sentence I understand not.', 'I very like English.', 'Yesterday met I him.'], `正确选项遵循英语语序，不直接照搬中文顺序。`, ['中式英语', '语序']),
    q(`What is the safest way to build "${correct}"?`, `构造“${correct}”最稳的方法是什么？`, 'subject + verb + required complements + adverbials', ['time + object + subject + verb always', 'translate each Chinese word in order', 'put every adverb before the subject'], `先搭主干，再添加修饰语。`, ['造句方法']),
    q(`Which part of "${correct}" should generally stay close together?`, `“${correct}”中哪些部分通常要靠近？`, 'subject and main verb', ['time and punctuation', 'object and subject', 'Chinese topic and translation'], `主语和谓语关系是英语句子的核心。`, ['主谓关系']),
    q(`Why is "${correct}" better than a word-for-word Chinese order?`, `为什么“${correct}”比逐词照搬中文更好？`, 'because English uses fixed word order to show grammar roles', ['because English has no grammar roles', 'because every adverb must be first', 'because objects always come before subjects'], `英语用相对固定的语序表达主语、谓语、宾语和状语关系。`, ['语序逻辑'])
  ]);
}

export function buildSentenceElementsBank() {
  return bank('sentence-elements', buildElementQuestions());
}

export function buildSentenceTypesBank() {
  return bank('sentence-types', buildTypeQuestions());
}

export function buildBasicSentencePatternsBank() {
  return bank('basic-sentence-patterns', buildPatternQuestions());
}

export function buildThereBeBank() {
  return bank('there-be', buildThereBeQuestions());
}

export function buildQuestionsNegativesBank() {
  return bank('questions-negatives', buildQuestionsNegatives());
}

export function buildWordOrderBasicsBank() {
  return bank('word-order-basics', buildWordOrderQuestions());
}
