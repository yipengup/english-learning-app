import { getQuestionBank } from './questionBanks';

export function buildQuestionBank(grammarId, grammarTitle = '') {
  return getQuestionBank(grammarId, grammarTitle);
}
