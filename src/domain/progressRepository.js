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

export const PROGRESS_EXPORT_SCHEMA = 'englishLearningApp.progressExport.v1';

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

export function createProgressExport(state = loadProgress()) {
  return {
    schema: PROGRESS_EXPORT_SCHEMA,
    exportedAt: Date.now(),
    progress: normalizeProgress(state)
  };
}

export function serializeProgressExport(state = loadProgress()) {
  return JSON.stringify(createProgressExport(state), null, 2);
}

export function importProgressExport(raw, currentState = loadProgress()) {
  const imported = parseImportedProgress(raw);
  const merged = mergeProgress(currentState, imported);
  return saveProgress(merged);
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

function parseImportedProgress(raw) {
  const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const progress = data?.schema === PROGRESS_EXPORT_SCHEMA ? data.progress : data;

  if (!progress || typeof progress !== 'object') {
    throw new Error('Invalid progress file.');
  }

  if (progress.version === 2) return normalizeProgress(progress);
  return normalizeProgress(migrateLegacyProgress(progress));
}

function normalizeProgress(progress) {
  return {
    ...initialState,
    ...progress,
    version: 2,
    answers: progress?.answers && typeof progress.answers === 'object' ? progress.answers : {},
    moduleProgress: progress?.moduleProgress && typeof progress.moduleProgress === 'object'
      ? progress.moduleProgress
      : initialState.moduleProgress
  };
}

function mergeProgress(currentState, importedState) {
  const current = normalizeProgress(currentState);
  const imported = normalizeProgress(importedState);

  return {
    ...current,
    activeModule: imported.activeModule || current.activeModule,
    lastGrammarId: imported.lastGrammarId || current.lastGrammarId,
    answers: mergeGrammarAnswers(current.answers, imported.answers),
    moduleProgress: {
      ...current.moduleProgress,
      ...imported.moduleProgress,
      grammar: {
        ...(current.moduleProgress?.grammar || {}),
        ...(imported.moduleProgress?.grammar || {})
      }
    },
    updatedAt: Math.max(current.updatedAt || 0, imported.updatedAt || 0) || null
  };
}

function mergeGrammarAnswers(currentAnswers = {}, importedAnswers = {}) {
  const next = { ...currentAnswers };
  const grammarIds = new Set([...Object.keys(currentAnswers), ...Object.keys(importedAnswers)]);

  grammarIds.forEach(grammarId => {
    const currentGrammar = currentAnswers[grammarId] || {};
    const importedGrammar = importedAnswers[grammarId] || {};
    const questionIds = new Set([...Object.keys(currentGrammar), ...Object.keys(importedGrammar)]);

    next[grammarId] = {};
    questionIds.forEach(questionId => {
      next[grammarId][questionId] = mergeAnswerRecordForImport(currentGrammar[questionId], importedGrammar[questionId]);
    });
  });

  return next;
}

function mergeAnswerRecordForImport(currentRecord, importedRecord) {
  if (!currentRecord) return importedRecord;
  if (!importedRecord) return currentRecord;

  const currentUpdatedAt = currentRecord.updatedAt || 0;
  const importedUpdatedAt = importedRecord.updatedAt || 0;
  const latest = importedUpdatedAt >= currentUpdatedAt ? importedRecord : currentRecord;
  const previous = latest === importedRecord ? currentRecord : importedRecord;
  const streakCorrect = latest.correct ? Math.max(currentRecord.streakCorrect || 0, importedRecord.streakCorrect || 0) : 0;
  const firstAnsweredAt = Math.min(
    currentRecord.firstAnsweredAt || currentRecord.updatedAt || Number.MAX_SAFE_INTEGER,
    importedRecord.firstAnsweredAt || importedRecord.updatedAt || Number.MAX_SAFE_INTEGER
  );

  return {
    ...previous,
    ...latest,
    attempts: Math.max(currentRecord.attempts || 0, importedRecord.attempts || 0),
    correctAttempts: Math.max(currentRecord.correctAttempts || 0, importedRecord.correctAttempts || 0),
    wrongAttempts: Math.max(currentRecord.wrongAttempts || 0, importedRecord.wrongAttempts || 0),
    streakCorrect,
    mastered: Boolean(currentRecord.mastered || importedRecord.mastered || streakCorrect >= 2),
    firstAnsweredAt: firstAnsweredAt === Number.MAX_SAFE_INTEGER ? undefined : firstAnsweredAt,
    lastCorrectAt: Math.max(currentRecord.lastCorrectAt || 0, importedRecord.lastCorrectAt || 0) || undefined,
    lastWrongAt: Math.max(currentRecord.lastWrongAt || 0, importedRecord.lastWrongAt || 0) || undefined
  };
}
