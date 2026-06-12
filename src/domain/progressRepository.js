const STORAGE_KEY = 'englishLearningApp.progress.v2';
const LEGACY_KEY = 'englishGrammarLearningState.v1';

const initialState = {
  version: 2,
  activeModule: 'grammar',
  lastGrammarId: 'be-verbs',
  answers: {},
  moduleProgress: {
    grammar: {}
  },
  updatedAt: null
};

export function loadProgress() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (current?.version === 2) return current;

    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY));
    if (legacy) return migrateLegacyProgress(legacy);

    return initialState;
  } catch {
    return initialState;
  }
}

export function saveProgress(state) {
  const next = { ...state, version: 2, updatedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getGrammarAnswers(state, grammarId) {
  return state.answers?.[grammarId] || {};
}

export function updateGrammarAnswer(state, grammarId, questionId, answerRecord) {
  const grammarAnswers = getGrammarAnswers(state, grammarId);
  return {
    ...state,
    activeModule: 'grammar',
    lastGrammarId: grammarId,
    answers: {
      ...state.answers,
      [grammarId]: {
        ...grammarAnswers,
        [questionId]: answerRecord
      }
    }
  };
}

function migrateLegacyProgress(legacy) {
  return {
    ...initialState,
    lastGrammarId: legacy.lastGrammarId || initialState.lastGrammarId,
    answers: legacy.answers || {}
  };
}
