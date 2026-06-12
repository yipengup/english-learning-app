function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function shuffleOptions(question) {
  return { ...question, options: shuffle(question.options) };
}

export function getQuestionStatus(questionId, answers = {}) {
  return answers[questionId] || null;
}

export function createPracticeSession(questionBank, answers = {}, strategy = 'unanswered-first') {
  return {
    current: pickNextQuestion(questionBank, answers, strategy),
    selected: null,
    checked: false,
    count: 0,
    startedAt: Date.now(),
    strategy
  };
}

export function pickNextQuestion(questionBank, answers = {}, strategy = 'unanswered-first') {
  if (!questionBank.length) return null;

  if (strategy === 'wrong-first') {
    const wrong = questionBank.filter(q => answers[q.id]?.correct === false);
    if (wrong.length) return shuffleOptions(randomItem(wrong));
  }

  const unanswered = questionBank.filter(q => !answers[q.id]);
  if (unanswered.length) return shuffleOptions(randomItem(unanswered));

  const wrong = questionBank.filter(q => answers[q.id]?.correct === false);
  if (wrong.length) return shuffleOptions(randomItem(wrong));

  return shuffleOptions(randomItem(questionBank));
}

export function gradeAnswer(question, selected) {
  const correct = selected === question.answer;
  return {
    questionId: question.id,
    correct,
    selected,
    answer: question.answer,
    updatedAt: Date.now(),
    attempts: 1
  };
}

export function mergeAnswerRecord(previous, result) {
  return {
    ...result,
    attempts: (previous?.attempts || 0) + 1,
    firstAnsweredAt: previous?.firstAnsweredAt || result.updatedAt
  };
}

export function getProgressSummary(questionBank, answers = {}) {
  const answered = questionBank.filter(q => answers[q.id]);
  const wrong = answered.filter(q => answers[q.id]?.correct === false);
  const mastered = answered.filter(q => answers[q.id]?.correct === true);
  return {
    total: questionBank.length,
    done: answered.length,
    wrong: wrong.length,
    mastered: mastered.length,
    completionRate: questionBank.length ? Math.round((answered.length / questionBank.length) * 100) : 0
  };
}
