export const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single-choice'
};

export const SOURCE_TYPES = {
  CURATED: 'curated',
  TEMPLATE_VARIANT: 'template-variant',
  FALLBACK: 'fallback'
};

export function normalizeQuestion(question, defaults = {}) {
  return {
    type: QUESTION_TYPES.SINGLE_CHOICE,
    difficulty: 'basic',
    tags: [],
    sourceType: SOURCE_TYPES.CURATED,
    ...defaults,
    ...question,
    options: [...question.options]
  };
}

export function assertValidQuestion(question) {
  const required = ['id', 'grammarId', 'stem', 'translation', 'answer', 'options', 'explanation'];
  for (const key of required) {
    if (!question[key]) throw new Error(`Question ${question.id || 'unknown'} is missing ${key}`);
  }
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    throw new Error(`Question ${question.id} must have exactly 4 options`);
  }
  if (!question.options.includes(question.answer)) {
    throw new Error(`Question ${question.id} options must include the answer`);
  }
  return question;
}

export function validateQuestionBank(bank) {
  return bank.map(q => assertValidQuestion(q));
}
