function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export const PRACTICE_STRATEGIES = {
  SEQUENTIAL: 'sequential',
  WRONG_ONLY: 'wrong-only',
  RANDOM_REVIEW: 'random-review'
};

export const CORE_ROUND_SIZE = 40;
export const REVIEW_ROUND_SIZE = 10;
export const MASTERY_ACCURACY_TARGET = 85;

export function shuffleOptions(question) {
  if (!question) return null;
  return { ...question, options: shuffle(question.options) };
}

export function getQuestionStatus(questionId, answers = {}) {
  return answers[questionId] || null;
}

function getQuestionById(questionBank, questionId) {
  return questionBank.find(question => question.id === questionId) || null;
}

function buildSequentialQueue(questionBank, answers = {}) {
  const unansweredIndex = questionBank.findIndex(question => !answers[question.id]);

  if (unansweredIndex >= 0) {
    const roundQueue = questionBank.slice(unansweredIndex, unansweredIndex + CORE_ROUND_SIZE);

    return {
      queue: roundQueue.map(question => question.id),
      mode: `本轮 ${roundQueue.length} 题`,
      startOffset: 0,
      total: roundQueue.length,
      bankTotal: questionBank.length
    };
  }

  const reviewQueue = questionBank.slice(0, CORE_ROUND_SIZE);

  return {
    queue: reviewQueue.map(question => question.id),
    mode: `复习轮 ${reviewQueue.length} 题`,
    startOffset: 0,
    total: reviewQueue.length,
    bankTotal: questionBank.length
  };
}

function buildWrongQueue(questionBank, answers = {}) {
  const queue = questionBank.filter(question => answers[question.id]?.correct === false).map(question => question.id);
  return {
    queue,
    mode: '错题清理',
    startOffset: 0,
    total: queue.length
  };
}

function buildRandomReviewQueue(questionBank, answers = {}) {
  const unanswered = questionBank.filter(question => !answers[question.id]);
  const pool = unanswered.length ? unanswered : questionBank;
  const queue = shuffle(pool).slice(0, REVIEW_ROUND_SIZE).map(question => question.id);

  return {
    queue,
    mode: unanswered.length ? '未做题冲刺' : `${REVIEW_ROUND_SIZE}题冲刺`,
    startOffset: 0,
    total: queue.length
  };
}

function buildPracticeQueue(questionBank, answers = {}, strategy = PRACTICE_STRATEGIES.SEQUENTIAL) {
  if (strategy === PRACTICE_STRATEGIES.WRONG_ONLY || strategy === 'wrong-first') {
    return buildWrongQueue(questionBank, answers);
  }

  if (strategy === PRACTICE_STRATEGIES.RANDOM_REVIEW || strategy === 'unanswered-first') {
    return buildRandomReviewQueue(questionBank, answers);
  }

  return buildSequentialQueue(questionBank, answers);
}

function getPracticeProgress(session, currentIndex = session.index || 0) {
  const total = session.total || session.queue?.length || 0;
  const currentNumber = total ? Math.min((session.startOffset || 0) + currentIndex + 1, total) : 0;
  const remaining = total ? Math.max(total - currentNumber, 0) : 0;
  const percent = total ? Math.round((currentNumber / total) * 100) : 0;

  return {
    mode: session.mode,
    total,
    currentNumber,
    remaining,
    percent
  };
}

export function createPracticeSession(questionBank, answers = {}, strategy = PRACTICE_STRATEGIES.SEQUENTIAL) {
  const queueMeta = buildPracticeQueue(questionBank, answers, strategy);
  const baseSession = {
    current: null,
    selected: null,
    checked: false,
    count: 0,
    startedAt: Date.now(),
    strategy,
    index: 0,
    ...queueMeta
  };

  const firstQuestion = getQuestionById(questionBank, queueMeta.queue[0]);
  return {
    ...baseSession,
    current: shuffleOptions(firstQuestion),
    progress: getPracticeProgress(baseSession, 0)
  };
}

export function advancePracticeSession(session, questionBank) {
  const nextIndex = (session.index || 0) + 1;
  const nextQuestion = getQuestionById(questionBank, session.queue?.[nextIndex]);

  if (!nextQuestion) {
    return {
      ...session,
      current: null,
      selected: null,
      checked: false,
      index: nextIndex,
      progress: {
        ...getPracticeProgress(session, Math.max((session.total || 1) - 1, 0)),
        remaining: 0,
        percent: 100
      }
    };
  }

  return {
    ...session,
    current: shuffleOptions(nextQuestion),
    selected: null,
    checked: false,
    count: session.count + 1,
    index: nextIndex,
    progress: getPracticeProgress(session, nextIndex)
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
  const coreQuestions = questionBank.slice(0, Math.min(CORE_ROUND_SIZE, questionBank.length));
  const coreAnswered = coreQuestions.filter(q => answers[q.id]);
  const coreCorrectLatest = coreAnswered.filter(q => answers[q.id]?.correct === true).length;
  const coreAccuracyRate = coreAnswered.length ? Math.round((coreCorrectLatest / coreAnswered.length) * 100) : 0;
  const coreCompletionRate = coreQuestions.length ? Math.round((coreAnswered.length / coreQuestions.length) * 100) : 0;
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
    coreTotal: coreQuestions.length,
    coreDone: coreAnswered.length,
    corePending: Math.max(coreQuestions.length - coreAnswered.length, 0),
    coreAccuracyRate,
    coreCompletionRate,
    masteryAccuracyTarget: MASTERY_ACCURACY_TARGET,
    wrong: wrong.length,
    mastered: mastered.length,
    pending,
    totalAttempts,
    accuracyRate,
    completionRate
  };
}
