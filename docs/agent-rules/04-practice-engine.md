# 04. Practice Engine Rules

These rules define how practice sessions, grading, progress, and review strategy should work.

## 1. Current behavior

The current practice system supports:

- creating a practice session from a question bank;
- choosing the next question;
- unanswered-first strategy;
- wrong-answer-first strategy;
- grading selected options;
- merging answer history;
- computing progress summary.

Core file:

```text
src/domain/practiceEngine.js
```

Progress accessors:

```text
src/domain/progressRepository.js
```

Browser storage boundary:

```text
src/shared/storage.js
```

## 2. Keep the engine pure

The practice engine should remain mostly pure functions.

It should not:

- import React;
- read or write localStorage directly;
- manipulate DOM;
- know about CSS or UI layout;
- depend on GitHub Pages or PWA details.

It can:

- receive question banks and answer records;
- return the next question/session state;
- compute answer correctness;
- compute summary statistics.

## 3. Practice strategy rules

Current strategy names:

- `unanswered-first`
- `wrong-first`

Behavior:

1. `unanswered-first`: prefer questions with no answer record.
2. when all are answered, prefer wrong questions.
3. when no wrong questions exist, draw from the full bank.
4. `wrong-first`: prefer wrong questions first; if none exist, fallback to unanswered-first behavior.

Future strategies can be added, but keep strategy names stable.

Possible future strategies:

- `spaced-review`
- `weak-tags-first`
- `mixed-review`
- `exam-mode`

## 4. Answer record contract

Answer record should preserve:

- selected option;
- correct answer;
- correctness;
- attempts;
- first answered time;
- last updated time.

When extending the contract, preserve old fields.

Possible future fields:

- `lastWrongAt`
- `masteryLevel`
- `reviewDueAt`
- `weakTags`
- `timeSpentMs`

## 5. Session state rules

Practice session state can include UI-facing state such as selected option and checked status, but the domain engine should return plain objects.

Current shape:

```js
{
  current,
  selected,
  checked,
  count,
  startedAt,
  strategy
}
```

Do not put large question banks inside saved state. Save only answer records and compact progress metadata.

## 6. Randomness and repeatability

Random selection is acceptable for the current lightweight app.

For future testability, consider injecting a picker/random function instead of hardcoding `Math.random` everywhere.

Do not introduce a complex scheduling algorithm until question banks are richer enough to benefit from it.

## 7. Progress summary rules

Progress summary should be derived from the question bank and answer records.

It should not be manually maintained in multiple places.

Current summary fields:

- total;
- done;
- wrong;
- mastered;
- completionRate.

Future summary fields may include:

- accuracyRate;
- masteryLevel;
- weakTags;
- reviewDueCount.

## 8. Error handling

If a bank is empty, the engine must not crash the app.

The UI should handle `current === null` gracefully when added.

Question validation errors should be caught during bank construction or development, not after the learner clicks an answer.

## 9. Future module reuse

The same engine pattern should be reusable for:

- vocabulary multiple choice;
- listening comprehension choices;
- reading comprehension choices;
- writing grammar correction choices.

Avoid naming generic engine functions with grammar-only assumptions unless they truly depend on grammar.