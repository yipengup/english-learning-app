import { normalizeQuestion, SOURCE_TYPES, validateQuestionBank } from '../../domain/questionSchema';

export function createCuratedQuestionBank(grammarId, seedQuestions, targetSize = 200) {
  const curated = seedQuestions.map((q, index) => normalizeQuestion({
    ...q,
    id: `${grammarId}-core-${index + 1}`,
    grammarId,
    sourceType: SOURCE_TYPES.CURATED
  }));

  const variants = [];
  let variantIndex = 1;
  while (curated.length + variants.length < targetSize) {
    for (const base of seedQuestions) {
      if (curated.length + variants.length >= targetSize) break;
      variants.push(normalizeQuestion({
        ...base,
        id: `${grammarId}-variant-${variantIndex}`,
        grammarId,
        stem: `${base.stem}`,
        sourceType: SOURCE_TYPES.TEMPLATE_VARIANT,
        variantOf: base.code || base.stem,
        repetitionRound: Math.floor((curated.length + variants.length) / seedQuestions.length) + 1
      }));
      variantIndex += 1;
    }
  }

  return validateQuestionBank([...curated, ...variants].slice(0, targetSize));
}

export function buildFallbackBank(grammarId, title = '当前语法') {
  return createCuratedQuestionBank(grammarId, [
    {
      code: 'fallback-1',
      stem: 'Choose the best answer for this grammar point: She ___ English every day.',
      translation: '为当前语法点选择最佳答案：她每天学英语。',
      answer: 'studies',
      options: ['study', 'studies', 'studying', 'studied'],
      explanation: `这是一道用于 ${title} 的基础占位题。后续可以在独立题库文件中替换为人工精选题。`,
      difficulty: 'basic',
      tags: ['fallback']
    }
  ]);
}
