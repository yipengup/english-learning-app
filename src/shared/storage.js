import { loadProgress, saveProgress } from '../domain/progressRepository';
import { pickNextQuestion } from '../domain/practiceEngine';

export function loadState() {
  return loadProgress();
}

export function saveState(state) {
  return saveProgress(state);
}

export { pickNextQuestion };
