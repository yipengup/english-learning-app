function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export const PRACTICE_STRATEGIES = {
  SEQUENTIAL: 'sequential',
  WRONG_ONLY: 'wrong-only',
  RANDOM_REVIEW: 'random-review'
};

export function shuffleOptions(question) {
  if (!question) return null;
  return { ...question, options: shuffle(question.options) };
}

export function getQuestionStatus(questionId, answers = {}) {
  return answers[questionId] || null;
}

export function createPracticeSession(questionBank, answers = {}, strategy = PRACTICE_STRATEGIES.SEQUENTIAL) {
  return {
    current: pickNextQuestion(questionBank, answers, strategy),
    selected: null,
    checked: false,
    count: 0,
    startedAt: Date.now(),
    strategy
  };
}

function pickSequentialQuestion(questionBank, answers = {}) {
  const unanswered = questionBank.find(q => !answers[q.id]);
  if (unanswered) return unanswered;

  const answered = questionBank
    .map((question, index) => ({ question, index, record: answers[question.id] }))
    .filter(item => item.record);

  if (!answered.length) return questionBank[0];

  return answered.sort((a, b) => {
    const timeDiff = (a.record.updatedAt || 0) - (b.record.updatedAt || 0);
    return timeDiff || a.index - b.index;
  })[0].question;
}

function pickWrongQuestion(questionBank, answers = {}) {
  return questionBank.find(q => answers[q.id]?.correct === false) || null;
}

function pickRandomReviewQuestion(questionBank, answers = {}) {
  const unanswered = questionBank.filter(q => !answers[q.id]);
  const pool = unanswered.length ? unanswered : questionBank;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function pickNextQuestion(questionBank, answers = {}, strategy = PRACTICE_STRATEGIES.SEQUENTIAL) {
  if (!questionBank.length) return null;

  if (strategy === PRACTICE_STRATEGIES.WRONG_ONLY || strategy === 'wrong-first') {
    return shuffleOptions(pickWrongQuestion(questionBank, answers));
  }

  if (strategy === PRACTICE_STRATEGIES.RANDOM_REVIEW || strategy === 'unanswered-first') {
    return shuffleOptions(pickRandomReviewQuestion(questionBank, answers));
  }

  return shuffleOptions(pickSequentialQuestion(questionBank, answers));
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
  const attempts = (previous?.attempts || 0) + 1;
  const correctAttempts = (previous?.correctAttempts || 0) + (result.correct ? 1 : 0);
  const wrongAttempts = (previous?.wrongAttempts || 0) + (result.correct ? 0 : 1);
  const streakCorrect = result.correct ? (previous?.streakCorrect || 0) + 1 : 0;

  return {
    ...previous,
    ...result,
    attempts,
    correctAttempts,
    wrongAttempts,
    streakCorrect,
    mastered: streakCorrect >= 2,
    firstAnsweredAt: previous?.firstAnsweredAt || result.updatedAt,
    lastCorrectAt: result.correct ? result.updatedAt : previous?.lastCorrectAt,
    lastWrongAt: result.correct ? previous?.lastWrongAt : result.updatedAt
  };
}

export function getProgressSummary(questionBank, answers = {}) {
  const answered = questionBank.filter(q => answers[q.id]);
  const wrong = answered.filter(q => answers[q.id]?.correct === false);
  const mastered = answered.filter(q => answers[q.id]?.mastered || answers[q.id]?.streakCorrect >= 2);
  const totalAttempts = answered.reduce((sum, q) => sum + (answers[q.id]?.attempts || 0), 0);
  const correctLatest = answered.filter(q => answers[q.id]?.correct === true).length;
  const pending = Math.max(questionBank.length - answered.length, 0);
  const accuracyRate = answered.length ? Math.round((correctLatest / answered.length) * 100) : 0;
  const completionRate = questionBank.length ? Math.round((answered.length / questionBank.length) * 100) : 0;

  return {
    total: questionBank.length,
    done: answered.length,
    wrong: wrong.length,
    mastered: mastered.length,
    pending,
    totalAttempts,
    accuracyRate,
    completionRate
  };
}
