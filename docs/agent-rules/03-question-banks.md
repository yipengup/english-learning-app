# 03. Question Bank Rules

These rules define how to create, expand, validate, and register practice questions.

## 1. Product requirement

Each grammar topic should eventually have around 200 high-quality multiple-choice questions.

The long-term goal is **200 independent curated questions per topic**.

Temporary generated or variant-expanded banks are allowed only as placeholders while building the system. They must be clearly marked as fallback or generated content.

## 2. Question format

Every question must support the current practice UI:

```js
{
  id: 'present-simple-core-001',
  grammarId: 'present-simple',
  stem: 'She ___ English every day.',
  options: ['study', 'studies', 'studied', 'studying'],
  answer: 'studies',
  translation: '她每天学习英语。',
  explanation: '主语 She 是第三人称单数；every day 表示习惯动作，所以一般现在时谓语用 studies。',
  difficulty: '基础',
  tags: ['三单', '习惯动作']
}
```

Required fields:

- `id`
- `grammarId`
- `stem`
- `options`
- `answer`
- `translation`
- `explanation`
- `difficulty`
- `tags`

## 3. ID rules

Question IDs must be stable and descriptive.

Recommended pattern:

```text
{grammarId}-{skillArea}-{number}
```

Examples:

```text
be-verbs-agreement-001
present-simple-third-person-014
articles-definite-038
```

Do not use random IDs for released questions.

## 4. Explanation requirements

Every answer explanation must include:

1. Chinese translation of the full question.
2. Correct answer.
3. Why the correct answer fits the target grammar.
4. Why at least one common distractor is wrong, when useful.
5. Connection back to the current grammar topic.

Avoid explanations that only say “固定搭配” unless the reason is truly lexical and no grammar rule applies.

## 5. Distractor rules

Wrong options should be plausible and educational.

Good distractors test common confusion:

- subject-verb agreement;
- tense markers;
- countable vs uncountable nouns;
- adjective vs adverb;
- active vs passive;
- finite vs non-finite verbs;
- relative pronoun choice;
- Chinese-to-English interference.

Bad distractors:

- obviously impossible gibberish;
- options with different spelling/capitalization only;
- options that create more than one correct answer;
- options that test vocabulary not related to the target grammar.

## 6. Coverage design for 200 questions

A full 200-question bank should be balanced.

Suggested structure:

- 40 concept recognition questions.
- 50 form-selection questions.
- 40 meaning/context questions.
- 30 error-detection questions.
- 25 mixed comparison questions.
- 15 exam-style challenge questions.

Adjust the mix based on the topic.

## 7. Difficulty labels

Use stable learner-facing labels:

- `入门`
- `基础`
- `核心`
- `进阶`
- `挑战`
- `综合`

Avoid inventing many near-duplicate difficulty names.

## 8. Registration pattern

Curated banks should live under:

```text
src/data/questionBanks/
```

Register a bank in:

```text
src/data/questionBanks/index.js
```

The UI should not import a specific topic bank directly.

## 9. Fallback banks

Fallback banks may be used to keep every topic practiceable.

Rules:

- Fallback questions must be clearly identified by ID or metadata.
- The UI should indicate that a topic is using a fallback/generic bank.
- Do not claim fallback banks are fully curated.
- Replace fallback banks gradually with topic-specific curated banks.

## 10. Validation

Before registering a question bank, verify:

- every question has exactly one correct answer;
- the answer appears in `options`;
- options are unique;
- `grammarId` matches the topic;
- translation matches the English sentence;
- explanation refers to the actual correct option;
- IDs are unique within the bank.

Use or extend `src/domain/questionSchema.js` for validation instead of duplicating validation logic in each bank.