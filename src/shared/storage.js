const KEY = 'englishGrammarLearningState.v1';

export function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { answers: {}, lastGrammarId: 'be-verbs' };
  } catch {
    return { answers: {}, lastGrammarId: 'be-verbs' };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function pickNextQuestion(bank, answers) {
  const unanswered = bank.filter(q => !answers[q.id]);
  if (unanswered.length) return randomItem(unanswered);

  const wrong = bank.filter(q => answers[q.id]?.correct === false);
  return randomItem(wrong.length ? wrong : bank);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
