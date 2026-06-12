import { buildBeVerbBank } from './beVerbs';
import { buildPresentSimpleBank } from './presentSimple';
import { buildFallbackBank } from './bankFactory';

const registry = {
  'be-verbs': buildBeVerbBank,
  'present-simple': buildPresentSimpleBank
};

export function getQuestionBank(grammarId, grammarTitle) {
  const builder = registry[grammarId];
  if (builder) return builder();
  return buildFallbackBank(grammarId, grammarTitle);
}

export function hasCuratedQuestionBank(grammarId) {
  return Boolean(registry[grammarId]);
}
