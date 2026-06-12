import { createCuratedQuestionBank } from './bankFactory';

const seeds = [
  { code: 'be-subject-i', stem: 'I ___ ready for the grammar lesson.', translation: '我已经准备好上语法课了。', answer: 'am', options: ['am', 'is', 'are', 'be'], explanation: '主语是 I，be 动词只能用 am。ready 是形容词作表语。', difficulty: 'basic', tags: ['subject-agreement', 'am'] },
  { code: 'be-third-person-singular', stem: 'My sister ___ good at pronunciation.', translation: '我妹妹/姐姐很擅长发音。', answer: 'is', options: ['am', 'is', 'are', 'be'], explanation: 'My sister 是第三人称单数，后面用 is。good at 表示“擅长”。', difficulty: 'basic', tags: ['subject-agreement', 'is'] },
  { code: 'be-plural', stem: 'These grammar notes ___ very useful.', translation: '这些语法笔记很有用。', answer: 'are', options: ['is', 'are', 'am', 'was'], explanation: 'These grammar notes 是复数主语，所以用 are。', difficulty: 'basic', tags: ['subject-agreement', 'are'] },
  { code: 'be-you', stem: 'You ___ welcome to ask questions.', translation: '欢迎你提问。', answer: 'are', options: ['am', 'is', 'are', 'be'], explanation: 'you 不管表示“你”还是“你们”，现在时 be 动词都用 are。', difficulty: 'basic', tags: ['you-are'] },
  { code: 'be-negative', stem: 'The answer ___ not correct.', translation: '这个答案不正确。', answer: 'is', options: ['am', 'is', 'are', 'be'], explanation: 'The answer 是单数，否定句结构是 is not correct。be 动词否定不需要 do。', difficulty: 'basic', tags: ['negative'] },
  { code: 'be-question-this', stem: '___ this sentence correct?', translation: '这个句子正确吗？', answer: 'Is', options: ['Is', 'Are', 'Am', 'Do'], explanation: 'this sentence 是单数，be 动词疑问句把 Is 提到主语前。', difficulty: 'basic', tags: ['question'] },
  { code: 'be-question-you', stem: '___ you interested in English grammar?', translation: '你对英语语法感兴趣吗？', answer: 'Are', options: ['Am', 'Is', 'Are', 'Do'], explanation: '主语是 you，be 动词用 are；疑问句中 are 放在句首。', difficulty: 'basic', tags: ['question'] },
  { code: 'be-location-singular', stem: 'The dictionary ___ on the desk.', translation: '词典在桌子上。', answer: 'is', options: ['is', 'are', 'am', 'do'], explanation: 'The dictionary 是单数物，表示位置时用 is + 介词短语。', difficulty: 'basic', tags: ['location'] },
  { code: 'be-location-plural', stem: 'The books ___ in my bag.', translation: '这些书在我的包里。', answer: 'are', options: ['is', 'are', 'am', 'does'], explanation: 'The books 是复数主语，表示位置时用 are。', difficulty: 'basic', tags: ['location'] },
  { code: 'be-there-singular', stem: 'There ___ a mistake in this sentence.', translation: '这个句子里有一个错误。', answer: 'is', options: ['is', 'are', 'am', 'be'], explanation: 'There be 句型遵循就近原则，a mistake 是单数，所以用 is。', difficulty: 'basic', tags: ['there-be'] },
  { code: 'be-there-plural', stem: 'There ___ three examples in this lesson.', translation: '这节课里有三个例句。', answer: 'are', options: ['is', 'are', 'am', 'has'], explanation: 'There be 后面紧跟 three examples，是复数，所以用 are。', difficulty: 'basic', tags: ['there-be'] },
  { code: 'be-contraction', stem: "She ___ not afraid of making mistakes.", translation: '她不害怕犯错。', answer: 'is', options: ['is', 'are', 'am', 'does'], explanation: 'She 是第三人称单数，否定结构是 is not，也可以缩写为 isn\'t。', difficulty: 'basic', tags: ['negative'] },
  { code: 'be-predicate-noun', stem: 'Mr. Green ___ our English teacher.', translation: '格林先生是我们的英语老师。', answer: 'is', options: ['am', 'is', 'are', 'be'], explanation: 'Mr. Green 是单数人名，our English teacher 是身份名词短语，所以用 is 连接。', difficulty: 'basic', tags: ['predicate-noun'] },
  { code: 'be-predicate-adjective', stem: 'The listening exercise ___ difficult but helpful.', translation: '这个听力练习很难但有帮助。', answer: 'is', options: ['is', 'are', 'am', 'do'], explanation: 'The listening exercise 是单数，difficult 和 helpful 是形容词表语。', difficulty: 'basic', tags: ['predicate-adjective'] },
  { code: 'be-we', stem: 'We ___ in the same study group.', translation: '我们在同一个学习小组。', answer: 'are', options: ['am', 'is', 'are', 'be'], explanation: 'We 是复数第一人称，be 动词用 are。', difficulty: 'basic', tags: ['subject-agreement'] },
  { code: 'be-compound-subject', stem: 'Tom and Jack ___ classmates.', translation: 'Tom 和 Jack 是同班同学。', answer: 'are', options: ['is', 'are', 'am', 'be'], explanation: 'Tom and Jack 是并列主语，表示两个人，所以用 are。', difficulty: 'basic', tags: ['compound-subject'] },
  { code: 'be-or-nearest', stem: 'Either the teacher or the students ___ in the classroom.', translation: '要么老师在教室里，要么学生们在教室里。', answer: 'are', options: ['is', 'are', 'am', 'be'], explanation: 'either...or... 常按就近原则，离 be 最近的是 students，复数，所以用 are。', difficulty: 'intermediate', tags: ['agreement', 'nearest-subject'] },
  { code: 'be-neither-nearest', stem: 'Neither the students nor the teacher ___ late.', translation: '学生们和老师都没有迟到。', answer: 'is', options: ['is', 'are', 'am', 'be'], explanation: 'neither...nor... 常按就近原则，离 be 最近的是 the teacher，单数，所以用 is。', difficulty: 'intermediate', tags: ['agreement', 'nearest-subject'] },
  { code: 'be-formal-subject-it', stem: 'It ___ important to review mistakes.', translation: '复习错误很重要。', answer: 'is', options: ['is', 'are', 'am', 'be'], explanation: 'It 作形式主语，真正内容是不定式 to review mistakes；谓语用 is。', difficulty: 'intermediate', tags: ['formal-subject'] },
  { code: 'be-wh-question', stem: 'Where ___ your grammar notebook?', translation: '你的语法笔记本在哪里？', answer: 'is', options: ['is', 'are', 'am', 'do'], explanation: 'your grammar notebook 是单数，特殊疑问句中仍然用 is。', difficulty: 'basic', tags: ['wh-question'] }
];

export function buildBeVerbBank() {
  return createCuratedQuestionBank('be-verbs', seeds, 200);
}
