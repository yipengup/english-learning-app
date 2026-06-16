/**
 * Exam Engine V2
 * 将所有语法题库升级为统一“考试系统引擎”结构
 * 支持：
 * - cloze
 * - error-correction
 * - transformation
 * - reordering
 * - distractor generation
 */

// -----------------------------
// Question Type System
// -----------------------------
export const QUESTION_TYPE = {
  CLOZE: 'cloze',
  ERROR: 'error-correction',
  TRANSFORMATION: 'transformation',
  REORDERING: 'reordering'
};

// -----------------------------
// Core Question Builder
// -----------------------------
export function createQuestion({
  stem,
  translation,
  answer,
  options = [],
  explanation = '',
  tags = [],
  difficulty = 'basic',
  type = QUESTION_TYPE.CLOZE
}) {
  return {
    stem,
    translation,
    answer,
    options,
    explanation,
    tags,
    difficulty,
    type
  };
}

// -----------------------------
// Distractor Engine
// -----------------------------
export function buildDistractors(answer, pool = []) {
  const base = pool.length ? pool : ['is','are','am','do','does','did','have','has','go','goes'];
  const set = new Set([answer]);

  const result = [answer];

  for (const item of base) {
    if (!set.has(item)) {
      set.add(item);
      result.push(item);
    }
    if (result.length >= 4) break;
  }

  return result;
}

// -----------------------------
// Error Correction Wrapper
// -----------------------------
export function makeErrorQuestion(wrongSentence, correctSentence, explanation, tags = []) {
  return createQuestion({
    stem: `Error: ${wrongSentence}`,
    translation: '改错题',
    answer: correctSentence,
    options: [correctSentence],
    explanation,
    tags,
    difficulty: 'intermediate',
    type: QUESTION_TYPE.ERROR
  });
}

// -----------------------------
// Transformation Wrapper
// -----------------------------
export function makeTransformationQuestion(stem, answer, options, explanation, tags = []) {
  return createQuestion({
    stem,
    translation: '句型转换',
    answer,
    options,
    explanation,
    tags,
    difficulty: 'intermediate',
    type: QUESTION_TYPE.TRANSFORMATION
  });
}

// -----------------------------
// Reordering Wrapper
// -----------------------------
export function makeReorderQuestion(words, answer, explanation, tags = []) {
  return createQuestion({
    stem: `Reorder: ${words.join(' / ')}`,
    translation: '重组句子',
    answer,
    options: [answer],
    explanation,
    tags,
    difficulty: 'basic',
    type: QUESTION_TYPE.REORDERING
  });
}
