import { normalizeQuestion, SOURCE_TYPES, validateQuestionBank } from '../../domain/questionSchema';

function q(stem, translation, answer, options, explanation, tags, difficulty = '入门') {
  return { stem, translation, answer, options, explanation, difficulty, tags };
}

const partsOfSpeechQuestions = [
  q('In "The teacher explains the rule clearly." what part of speech is "teacher"?', '在 “The teacher explains the rule clearly.” 中，teacher 是什么词类？老师清楚地讲解规则。', 'noun', ['noun', 'verb', 'adjective', 'adverb'], '题目意思：判断 teacher 的词类。正确答案是 noun。teacher 表示人，是名词。', ['词类', '名词'], '入门')
];

export function buildPartsOfSpeechBank() {
  return validateQuestionBank(partsOfSpeechQuestions.map((question, index) => normalizeQuestion({
    ...question,
    id: `parts-of-speech-core-${index + 1}`,
    grammarId: 'parts-of-speech',
    sourceType: SOURCE_TYPES.CURATED
  })));
}
