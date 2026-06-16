import { createCuratedQuestionBank } from './bankFactory';

function q(stem, translation, answer, options, explanation, tags, difficulty='basic', type='reordering') {
  return { stem, translation, answer, options, explanation, tags, difficulty, type };
}

function bank(id, questions) {
  const seen = new Set();
  const unique = questions.filter(i => {
    const key = i.stem + '@@' + i.answer;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return createCuratedQuestionBank(id, unique, unique.length);
}

export const wordOrderBank = bank('word-order-exam', [
  q('Reorder: yesterday / I / saw / him', '重组句子', 'I saw him yesterday.', ['I saw him yesterday.', 'Yesterday I saw him.', 'I yesterday saw him.', 'Saw I him yesterday.'], '英语时间状语通常放句首或句末。', ['word-order'], 'basic','reordering'),
  q('Error: Often she goes to school.', '改错语序', 'She often goes to school.', ['She often goes to school.', 'Often she goes to school.', 'She goes often to school.', 'She goes to often school.'], '频率副词通常放在行为动词之前。', ['adverb-position'], 'basic','error-correction'),
  q('Reorder: quickly / finished / he / the work', '重组句子', 'He finished the work quickly.', ['He finished the work quickly.', 'Quickly finished he the work.', 'He quickly the work finished.', 'Finished he the work quickly.'], '副词修饰动词通常放后面。', ['word-order'], 'basic','reordering')
]);

export default wordOrderBank;
