import { buildPartsOfSpeechBank } from './partsOfSpeech';
import { buildSentenceElementsBank } from './sentenceElements';
import { buildBeVerbBank } from './beVerbs';
import { buildPresentSimpleBank } from './presentSimple';
import { buildFallbackBank } from './bankFactory';
import {
  buildSentenceTypesBank,
  buildBasicSentencePatternsBank,
  buildThereBeBank,
  buildQuestionsNegativesBank,
  buildWordOrderBasicsBank
} from './foundationBasics';

// Exam Engine V2 (new)
import wordOrderExamBank from './wordOrder_exam_v2';

const registry = {
  'parts-of-speech': buildPartsOfSpeechBank,
  'sentence-elements': buildSentenceElementsBank,
  'sentence-types': buildSentenceTypesBank,
  'basic-sentence-patterns': buildBasicSentencePatternsBank,
  'be-verbs': buildBeVerbBank,
  'there-be': buildThereBeBank,
  'questions-negatives': buildQuestionsNegativesBank,
  'word-order-basics': buildWordOrderBasicsBank,
  'present-simple': buildPresentSimpleBank,

  // Exam Engine V2 additions
  'word-order-exam': () => wordOrderExamBank
};

export function getQuestionBank(grammarId, grammarTitle) {
  const builder = registry[grammarId];
  if (builder) return builder();
  return buildFallbackBank(grammarId, grammarTitle);
}

export function hasCuratedQuestionBank(grammarId) {
  return Boolean(registry[grammarId]);
}