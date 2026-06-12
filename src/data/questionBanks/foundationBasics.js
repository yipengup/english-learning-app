import { createCuratedQuestionBank } from './bankFactory';

function q(stem, translation, answer, options, explanation, tags, difficulty = '入门') {
  return { stem, translation, answer, options, explanation, difficulty, tags };
}

const partsOfSpeechSeeds = [
  q('In the sentence "The careful student reads slowly," what is "careful"?', '在句子 “The careful student reads slowly.” 中，careful 是什么词类？', 'adjective', ['noun', 'verb', 'adjective', 'preposition'], '题目意思：判断 careful 的词类。正确答案是 adjective。careful 放在名词 student 前，修饰名词，说明“细心的学生”，所以是形容词。', ['词类', '形容词']),
  q('In "She speaks clearly," the word "clearly" is a/an ___.', '在 “She speaks clearly.” 中，clearly 是一个什么词？', 'adverb', ['adjective', 'adverb', 'noun', 'article'], '题目意思：判断 clearly 的词类。正确答案是 adverb。clearly 修饰动词 speaks，说明“说得清楚”，所以是副词，不是形容词。', ['词类', '副词']),
  q('Choose the noun in this sentence: "Grammar helps learners."', '选择句子 “Grammar helps learners.” 中的名词。', 'Grammar', ['Grammar', 'helps', 'learners', 'helps learners'], '题目意思：找出名词。正确答案是 Grammar。Grammar 在主语位置，表示“语法”这个概念，是名词。learners 也是名词，但本题选项中要求识别主语名词。', ['词类', '名词']),
  q('In "Please light the candle," the word "light" is a ___.', '在 “Please light the candle.” 中，light 是什么词？', 'verb', ['noun', 'verb', 'adjective', 'adverb'], '题目意思：判断 light 的词类。正确答案是 verb。light 在祈使句中表示“点燃”这个动作，后面接宾语 the candle，所以是动词。', ['一词多类', '动词']),
  q('Which word is a preposition in "The book is on the desk"?', '在 “The book is on the desk.” 中，哪个词是介词？', 'on', ['book', 'is', 'on', 'desk'], '题目意思：找出介词。正确答案是 on。on 表示 book 和 desk 之间的位置关系，并带宾语 the desk。', ['词类', '介词']),
  q('Which option best describes "and" in "I read and write every day"?', '在 “I read and write every day.” 中，and 的作用是什么？', 'It connects two verbs.', ['It names a thing.', 'It connects two verbs.', 'It modifies a noun.', 'It shows a place.'], '题目意思：判断 and 的功能。正确答案是 It connects two verbs。and 是连词，连接 read 和 write 两个并列动作。', ['词类', '连词']),
  q('In "This lesson is useful," the word "This" is a ___.', '在 “This lesson is useful.” 中，This 是什么词？', 'determiner', ['determiner', 'verb', 'adverb', 'preposition'], '题目意思：判断 This 的词类。正确答案是 determiner。This 放在名词 lesson 前，限定“这节课”，是限定词/指示限定词。', ['限定词', '词类']),
  q('Which sentence uses "well" correctly as an adverb?', '哪一个句子正确地把 well 用作副词？', 'She writes well.', ['She is well writer.', 'She writes well.', 'She is a well student.', 'She well is writing.'], '题目意思：选择 well 作副词的正确句子。正确答案是 She writes well。well 修饰动词 writes，表示“写得好”。', ['副词', '易错']),
  q('In "Work hard," the word "hard" is a/an ___.', '在 “Work hard.” 中，hard 是什么词？', 'adverb', ['noun', 'verb', 'adjective', 'adverb'], '题目意思：判断 hard 的词类。正确答案是 adverb。hard 修饰动词 Work，表示“努力地工作”。', ['一词多类', '副词']),
  q('Which word can be both a noun and a verb depending on context?', '哪个词可以根据语境既作名词又作动词？', 'work', ['the', 'quickly', 'work', 'under'], '题目意思：判断一词多类。正确答案是 work。work 可以作名词“工作”，也可以作动词“工作”。', ['一词多类'])
];

const sentenceElementsSeeds = [
  q('In "The boy opened the window," what is "The boy"?', '在 “The boy opened the window.” 中，The boy 是什么成分？', 'subject', ['subject', 'object', 'adverbial', 'complement'], '题目意思：判断 The boy 的句子成分。正确答案是 subject。The boy 是动作 opened 的发出者，位于谓语前，是主语。', ['主语', '句子成分']),
  q('In "The boy opened the window," what is "the window"?', '在 “The boy opened the window.” 中，the window 是什么成分？', 'object', ['subject', 'object', 'predicate', 'adverbial'], '题目意思：判断 the window 的成分。正确答案是 object。window 是 opened 这个动作的承受对象，所以是宾语。', ['宾语', '句子成分']),
  q('In "The soup tastes delicious," what is "delicious"?', '在 “The soup tastes delicious.” 中，delicious 是什么成分？', 'predicative', ['object', 'predicative', 'subject', 'adverbial'], '题目意思：判断 delicious 的成分。正确答案是 predicative。tastes 是系动词，delicious 说明主语 The soup 的状态，是表语。', ['表语', '系动词']),
  q('In "She answered the question carefully," what is "carefully"?', '在 “She answered the question carefully.” 中，carefully 是什么成分？', 'adverbial', ['object', 'subject', 'adverbial', 'predicative'], '题目意思：判断 carefully 的成分。正确答案是 adverbial。carefully 说明 answered 的方式，是方式状语。', ['状语', '方式']),
  q('In "We call him Tom," what is "Tom"?', '在 “We call him Tom.” 中，Tom 是什么成分？', 'object complement', ['direct object', 'object complement', 'subject', 'adverbial'], '题目意思：判断 Tom 的成分。正确答案是 object complement。Tom 补充说明宾语 him 的身份，是宾语补足语。', ['补语', 'SVOC']),
  q('Which part is the predicate in "My teacher explained the rule"?', '在 “My teacher explained the rule.” 中，谓语是哪一部分？', 'explained', ['My teacher', 'explained', 'the rule', 'teacher'], '题目意思：找谓语。正确答案是 explained。它是句子的核心动词，说明主语做了什么。', ['谓语', '主干']),
  q('In "The book on the desk is mine," what is the main predicate?', '在 “The book on the desk is mine.” 中，主要谓语是什么？', 'is', ['on', 'desk', 'is', 'mine'], '题目意思：找主要谓语。正确答案是 is。on the desk 是介词短语修饰 book，不是谓语。', ['谓语', '介词短语']),
  q('In "Learning grammar takes time," what is the subject?', '在 “Learning grammar takes time.” 中，主语是什么？', 'Learning grammar', ['Learning grammar', 'takes', 'time', 'grammar takes'], '题目意思：找主语。正确答案是 Learning grammar。动名词短语整体作主语，takes 是谓语。', ['主语', '动名词']),
  q('Which sentence has a subject complement?', '哪一个句子含有主语补足/表语？', 'The room is quiet.', ['The room is quiet.', 'She opened the door.', 'They discussed the plan.', 'I met him yesterday.'], '题目意思：判断表语结构。正确答案是 The room is quiet。quiet 说明主语 The room 的状态，是表语。', ['表语', 'SVC']),
  q('Which part is an attributive modifier in "the old book"?', '在 “the old book” 中，哪个部分是定语？', 'old', ['the', 'old', 'book', 'old book'], '题目意思：找定语。正确答案是 old。old 修饰名词 book，说明“旧的书”。', ['定语', '形容词'])
];

const sentenceTypesSeeds = [
  q('Which sentence is a declarative sentence?', '哪一个句子是陈述句？', 'She studies grammar every day.', ['Does she study grammar?', 'Study grammar every day.', 'She studies grammar every day.', 'What a useful rule it is!'], '题目意思：识别陈述句。正确答案是 She studies grammar every day。它按正常语序陈述事实。', ['句子类型', '陈述句']),
  q('Choose the correct yes-no question.', '选择正确的一般疑问句。', 'Does he like grammar?', ['He likes grammar?', 'Does he likes grammar?', 'Does he like grammar?', 'Do he like grammar?'], '题目意思：选择正确疑问句。正确答案是 Does he like grammar。he 是三单，用 Does，后面 like 用原形。', ['疑问句', 'does']),
  q('Which is an imperative sentence?', '哪一个是祈使句？', 'Read the sentence carefully.', ['You read the sentence carefully?', 'Read the sentence carefully.', 'What a sentence!', 'She reads carefully.'], '题目意思：识别祈使句。正确答案是 Read the sentence carefully。祈使句通常省略主语 you，以动词原形开头。', ['祈使句']),
  q('Choose the correct exclamatory sentence with "What".', '选择正确的 What 感叹句。', 'What a useful example it is!', ['What useful example it is!', 'What a useful example it is!', 'How a useful example it is!', 'What useful is the example!'], '题目意思：选择 What 感叹句。正确答案是 What a useful example it is。What 修饰名词短语 a useful example。', ['感叹句', 'what']),
  q('Choose the correct exclamatory sentence with "How".', '选择正确的 How 感叹句。', 'How clearly she explains the rule!', ['How clearly she explains the rule!', 'How a clear rule it is!', 'What clearly she explains!', 'How she clearly the rule!'], '题目意思：选择 How 感叹句。正确答案是 How clearly she explains the rule。How 修饰副词 clearly。', ['感叹句', 'how']),
  q('Which question is correct for the past action?', '针对过去动作，哪个疑问句正确？', 'Did you finish the exercise?', ['Did you finished the exercise?', 'Do you finished the exercise?', 'Did you finish the exercise?', 'Finished you the exercise?'], '题目意思：选择过去动作疑问句。正确答案是 Did you finish the exercise。Did 表过去，finish 用原形。', ['疑问句', 'did']),
  q('Which sentence is a negative declarative sentence?', '哪一个是否定陈述句？', 'She does not understand the rule.', ['Does she understand the rule?', 'She does not understand the rule.', 'Do not open the book.', 'What a hard rule!'], '题目意思：识别否定陈述句。正确答案是 She does not understand the rule。它陈述一个否定事实。', ['否定句', '陈述句']),
  q('Choose the correct wh-question.', '选择正确的特殊疑问句。', 'Where does your teacher live?', ['Where your teacher lives?', 'Where does your teacher live?', 'Where does your teacher lives?', 'Where is your teacher live?'], '题目意思：选择特殊疑问句。正确答案是 Where does your teacher live。your teacher 是三单，用 does，live 用原形。', ['特殊疑问句']),
  q('Which sentence is a polite imperative?', '哪一个是礼貌的祈使句？', 'Please check your answer.', ['Please check your answer.', 'Do you check your answer?', 'You please checks answer.', 'What a check!'], '题目意思：识别礼貌祈使句。正确答案是 Please check your answer。please 加动词原形，使请求更礼貌。', ['祈使句', '礼貌']),
  q('Which sentence asks for confirmation?', '哪一个句子是在确认信息？', 'You are ready, aren’t you?', ['You are ready, aren’t you?', 'Are ready you?', 'What ready you are!', 'Ready the book.'], '题目意思：识别确认信息的问句。正确答案是 You are ready, aren’t you? 这是反意疑问句，用于确认。', ['疑问句', '反意疑问'])
];

const sentencePatternSeeds = [
  q('Which sentence is SV?', '哪一个句子是 SV 主谓结构？', 'Birds fly.', ['Birds fly.', 'She reads books.', 'The soup tastes good.', 'We call him Tom.'], '题目意思：识别 SV。正确答案是 Birds fly。Birds 是主语，fly 是不及物动词，不需要宾语。', ['五大句型', 'SV']),
  q('Which sentence is SVO?', '哪一个句子是 SVO 主谓宾结构？', 'She reads books.', ['Birds fly.', 'She reads books.', 'The room is quiet.', 'He gave me a pen.'], '题目意思：识别 SVO。正确答案是 She reads books。reads 是及物动词，books 是宾语。', ['五大句型', 'SVO']),
  q('Which sentence is SVC?', '哪一个句子是 SVC 主系表结构？', 'The soup tastes delicious.', ['The soup tastes delicious.', 'She opened the door.', 'Birds fly.', 'They made him captain.'], '题目意思：识别 SVC。正确答案是 The soup tastes delicious。tastes 是系动词，delicious 是表语。', ['五大句型', 'SVC']),
  q('Which sentence is SVOO?', '哪一个句子是 SVOO 双宾语结构？', 'My teacher gave me a book.', ['My teacher gave me a book.', 'My teacher is kind.', 'My teacher arrived early.', 'My teacher made me happy.'], '题目意思：识别双宾语。正确答案是 My teacher gave me a book。me 是间接宾语，a book 是直接宾语。', ['五大句型', 'SVOO']),
  q('Which sentence is SVOC?', '哪一个句子是 SVOC 宾语补足语结构？', 'We found the lesson useful.', ['We found the lesson useful.', 'We found the lesson.', 'The lesson was useful.', 'We studied the lesson.'], '题目意思：识别 SVOC。正确答案是 We found the lesson useful。useful 补充说明宾语 the lesson。', ['五大句型', 'SVOC']),
  q('Choose the correct sentence with "arrive".', '选择 arrive 的正确用法。', 'They arrived at school.', ['They arrived school.', 'They arrived at school.', 'They arrived the school.', 'They were arrived school.'], '题目意思：考查不及物动词 arrive。正确答案是 They arrived at school。arrive 后接地点通常需要介词 at/in。', ['不及物动词', '介词']),
  q('Choose the correct sentence with "discuss".', '选择 discuss 的正确用法。', 'We discussed the problem.', ['We discussed about the problem.', 'We discussed the problem.', 'We discussed to the problem.', 'We discussed on the problem.'], '题目意思：考查及物动词 discuss。正确答案是 We discussed the problem。discuss 直接接宾语，不加 about。', ['及物动词', '搭配']),
  q('Which option completes an SVC sentence? The idea sounds ___.', '哪个选项补全主系表句子：The idea sounds ___。', 'reasonable', ['reasonably', 'reasonable', 'reason', 'reasoned'], '题目意思：补全 SVC。正确答案是 reasonable。sounds 是系动词，后面接形容词作表语。', ['SVC', '形容词表语']),
  q('Which verb often takes an object complement?', '哪个动词常接宾语补足语？', 'make', ['sleep', 'arrive', 'make', 'happen'], '题目意思：识别可接宾补的动词。正确答案是 make，如 make me happy。', ['SVOC', '动词类型']),
  q('Which sentence is incomplete because it lacks an object?', '哪个句子因为缺宾语而不完整？', 'She explained.', ['Birds fly.', 'She explained.', 'He slept.', 'The soup tastes good.'], '题目意思：判断缺宾语。正确答案是 She explained。explain 通常是及物动词，需要说明解释什么。', ['及物动词', '缺宾语'])
];

const thereBeSeeds = [
  q('There ___ a book on the desk.', '桌上有一本书。', 'is', ['is', 'are', 'am', 'have'], '题目意思：桌上有一本书。正确答案是 is。There be 句型看 be 后最近名词，a book 是单数，所以用 is。', ['there-be', '单数']),
  q('There ___ three books on the desk.', '桌上有三本书。', 'are', ['is', 'are', 'am', 'has'], '题目意思：桌上有三本书。正确答案是 are。three books 是复数，所以用 are。', ['there-be', '复数']),
  q('There ___ a pen and two books in my bag.', '我的包里有一支笔和两本书。', 'is', ['is', 'are', 'have', 'has'], '题目意思：包里有一支笔和两本书。正确答案是 is。There be 常用就近原则，最近的是 a pen，单数。', ['there-be', '就近原则']),
  q('There ___ two books and a pen in my bag.', '我的包里有两本书和一支笔。', 'are', ['is', 'are', 'has', 'be'], '题目意思：包里有两本书和一支笔。正确答案是 are。最近的是 two books，复数。', ['there-be', '就近原则']),
  q('Choose the correct question.', '选择正确的疑问句。', 'Is there a mistake in this sentence?', ['Does there a mistake in this sentence?', 'Is there a mistake in this sentence?', 'Are there a mistake in this sentence?', 'Has there a mistake in this sentence?'], '题目意思：询问句子里是否有错误。正确答案是 Is there a mistake in this sentence? 疑问句把 is 提前。', ['there-be', '疑问句']),
  q('Choose the correct negative sentence.', '选择正确的否定句。', 'There is not enough time.', ['There does not enough time.', 'There is not enough time.', 'There has not enough time.', 'There are not enough time.'], '题目意思：时间不够。正确答案是 There is not enough time。time 不可数，按单数处理，用 is not。', ['there-be', '否定句']),
  q('Choose the correct future existence sentence.', '选择正确的将来存在句。', 'There will be a test tomorrow.', ['There will have a test tomorrow.', 'There will be a test tomorrow.', 'There is will a test tomorrow.', 'There has a test tomorrow.'], '题目意思：明天会有一次测试。正确答案是 There will be a test tomorrow。将来存在用 will be。', ['there-be', '将来']),
  q('Which sentence uses "have" correctly instead of "there be"?', '哪个句子正确使用 have 而不是 there be？', 'My school has a library.', ['My school has a library.', 'There has a library in my school.', 'There have a library in my school.', 'My school there is a library.'], '题目意思：学校拥有图书馆。正确答案是 My school has a library。主语 My school 表示拥有，用 has。', ['there-be', 'have 区分']),
  q('There ___ no water in the bottle.', '瓶子里没有水。', 'is', ['is', 'are', 'have', 'do'], '题目意思：瓶子里没有水。正确答案是 is。water 是不可数名词，There be 用 is。', ['there-be', '不可数']),
  q('Choose the sentence that means "附近有两个 parks".', '选择表示“附近有两个公园”的句子。', 'There are two parks nearby.', ['There is two parks nearby.', 'There are two parks nearby.', 'There has two parks nearby.', 'There be two parks nearby.'], '题目意思：附近有两个公园。正确答案是 There are two parks nearby。two parks 是复数。', ['there-be', '复数'])
];

const questionsNegativesSeeds = [
  q('She ___ not like coffee.', '她不喜欢咖啡。', 'does', ['do', 'does', 'is', 'are'], '题目意思：她不喜欢咖啡。正确答案是 does。like 是实义动词，She 是三单，否定用 does not + 动词原形。', ['否定句', 'does']),
  q('They ___ not need help.', '他们不需要帮助。', 'do', ['do', 'does', 'are', 'is'], '题目意思：他们不需要帮助。正确答案是 do。They 是复数，实义动词 need 的否定用 do not。', ['否定句', 'do']),
  q('___ you understand this rule?', '你理解这条规则吗？', 'Do', ['Do', 'Does', 'Are', 'Is'], '题目意思：你理解这条规则吗？正确答案是 Do。understand 是实义动词，you 的一般疑问句用 Do。', ['疑问句', 'do']),
  q('___ she understand this rule?', '她理解这条规则吗？', 'Does', ['Do', 'Does', 'Is', 'Are'], '题目意思：她理解这条规则吗？正确答案是 Does。she 是三单，用 Does，understand 用原形。', ['疑问句', 'does']),
  q('Did you ___ the homework?', '你完成作业了吗？', 'finish', ['finished', 'finish', 'finishes', 'finishing'], '题目意思：你完成作业了吗？正确答案是 finish。Did 已经表示过去，后面动词用原形。', ['疑问句', 'did']),
  q('The answer ___ not correct.', '这个答案不正确。', 'is', ['does', 'is', 'do', 'are'], '题目意思：这个答案不正确。正确答案是 is。correct 是形容词，前面需要 be，否定为 is not。', ['be 否定', '形容词']),
  q('___ the examples clear?', '这些例子清楚吗？', 'Are', ['Is', 'Are', 'Do', 'Does'], '题目意思：这些例子清楚吗？正确答案是 Are。examples 是复数，be 动词用 are，疑问句 are 提前。', ['be 疑问', '复数']),
  q('You should not ___ the subject.', '你不应该忽略主语。', 'ignore', ['ignores', 'ignore', 'ignored', 'ignoring'], '题目意思：你不应该忽略主语。正确答案是 ignore。情态动词 should not 后接动词原形。', ['情态动词', '否定']),
  q('Choose the correct negative sentence.', '选择正确的否定句。', 'He did not go there.', ['He did not went there.', 'He did not go there.', 'He does not went there.', 'He not went there.'], '题目意思：他没有去那里。正确答案是 He did not go there。did not 后用动词原形 go。', ['did', '否定句']),
  q('Choose the correct question.', '选择正确的疑问句。', 'Can you explain the sentence?', ['Do you can explain the sentence?', 'Can you explain the sentence?', 'Can you explains the sentence?', 'You can explain the sentence?'], '题目意思：你能解释这个句子吗？正确答案是 Can you explain the sentence。情态动词 can 直接提前，后面用原形 explain。', ['情态动词', '疑问句'])
];

const wordOrderSeeds = [
  q('Choose the natural English word order.', '选择自然的英语语序。', 'I like this book very much.', ['This book I very like.', 'I very like this book.', 'I like this book very much.', 'Very much I like this book.'], '题目意思：我很喜欢这本书。正确答案是 I like this book very much。英语基本语序是主语 + 谓语 + 宾语。', ['语序', 'SVO']),
  q('Where should "usually" go?', 'usually 应该放在哪里？', 'She usually reviews her notes.', ['She reviews usually her notes.', 'Usually she reviews her notes only wrong.', 'She usually reviews her notes.', 'She reviews her usually notes.'], '题目意思：她通常复习笔记。正确答案是 She usually reviews her notes。频率副词通常放在实义动词前。', ['副词位置', '频率副词']),
  q('Choose the correct be-verb adverb order.', '选择 be 动词和频率副词的正确语序。', 'He is always careful.', ['He always is careful.', 'He is always careful.', 'Always he careful is.', 'He careful always is.'], '题目意思：他总是很仔细。正确答案是 He is always careful。频率副词放在 be 动词后。', ['副词位置', 'be']),
  q('Choose the correct question word order.', '选择正确的疑问句语序。', 'Where does your sister work?', ['Where your sister works?', 'Where does your sister work?', 'Where does your sister works?', 'Where is your sister work?'], '题目意思：你姐姐/妹妹在哪里工作？正确答案是 Where does your sister work。特殊疑问句需要 does + 主语 + 动词原形。', ['疑问语序']),
  q('Choose the best order of place and time.', '选择地点和时间状语的较自然顺序。', 'She studies English at home after dinner.', ['She studies English after dinner at home.', 'She studies English at home after dinner.', 'She at home studies English after dinner.', 'After dinner at home studies she English.'], '题目意思：她晚饭后在家学英语。正确答案是 She studies English at home after dinner。地点状语通常比时间状语更靠近动词。', ['状语顺序']),
  q('Choose the correct sentence.', '选择正确句子。', 'There is a book on the desk.', ['A book has on the desk.', 'There is a book on the desk.', 'On the desk has a book.', 'Has a book on the desk.'], '题目意思：桌上有一本书。正确答案是 There is a book on the desk。表达存在用 There be。', ['语序', 'there-be']),
  q('Which sentence keeps the subject and verb together naturally?', '哪个句子自然保持主语和谓语关系？', 'My teacher explained the rule clearly.', ['My teacher clearly the rule explained.', 'Clearly my teacher the rule explained.', 'My teacher explained the rule clearly.', 'The rule my teacher clearly explained always.'], '题目意思：老师清楚地解释了规则。正确答案是 My teacher explained the rule clearly。主语 My teacher 后紧跟谓语 explained。', ['语序', '主谓宾']),
  q('Choose the correct sentence with a fronted time adverbial.', '选择时间状语提前的正确句子。', 'Yesterday, I met my teacher at the library.', ['Yesterday, I met my teacher at the library.', 'Yesterday met I my teacher at the library.', 'Yesterday my teacher at the library met I.', 'Yesterday I my teacher met at the library.'], '题目意思：昨天我在图书馆遇到了老师。正确答案是 Yesterday, I met my teacher at the library。时间状语可提前，但主谓宾语序不变。', ['时间状语', '语序']),
  q('Choose the correct adverb position.', '选择副词位置正确的句子。', 'She speaks English well.', ['She speaks well English.', 'She well speaks English.', 'She speaks English well.', 'She English speaks well.'], '题目意思：她英语说得很好。正确答案是 She speaks English well。well 修饰 speaks，通常放在宾语后。', ['副词位置']),
  q('Choose the correct order in a sentence with a modal verb.', '选择含情态动词的正确语序。', 'Can you explain this rule clearly?', ['Can you explain this rule clearly?', 'You can this rule explain clearly?', 'Can explain you this rule clearly?', 'Can you clearly this rule explain?'], '题目意思：你能清楚解释这条规则吗？正确答案是 Can you explain this rule clearly。情态动词提前，后接主语和动词原形。', ['疑问语序', '情态动词'])
];

export function buildPartsOfSpeechBank() {
  return createCuratedQuestionBank('parts-of-speech', partsOfSpeechSeeds, 200);
}

export function buildSentenceElementsBank() {
  return createCuratedQuestionBank('sentence-elements', sentenceElementsSeeds, 200);
}

export function buildSentenceTypesBank() {
  return createCuratedQuestionBank('sentence-types', sentenceTypesSeeds, 200);
}

export function buildBasicSentencePatternsBank() {
  return createCuratedQuestionBank('basic-sentence-patterns', sentencePatternSeeds, 200);
}

export function buildThereBeBank() {
  return createCuratedQuestionBank('there-be', thereBeSeeds, 200);
}

export function buildQuestionsNegativesBank() {
  return createCuratedQuestionBank('questions-negatives', questionsNegativesSeeds, 200);
}

export function buildWordOrderBasicsBank() {
  return createCuratedQuestionBank('word-order-basics', wordOrderSeeds, 200);
}
