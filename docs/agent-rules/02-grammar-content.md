# 02. Grammar Content Rules

These rules guide the grammar syllabus, explanations, examples, and learning sequence.

## 1. Target learner

The app is primarily for Chinese-speaking learners who want to build systematic English grammar ability.

Explanations should:

- use Chinese as the main explanation language;
- keep English examples natural and useful;
- explain why the grammar is used, not only what the correct form is;
- highlight common Chinese-speaker mistakes when relevant.

## 2. Syllabus philosophy

The grammar system should follow a mainstream learning path from sentence foundation to real output:

```text
词类与句子成分
→ 名词短语系统
→ 动词基础
→ 时态系统：时间 × 状态/体
→ 情态/语态/语气
→ 修饰系统
→ 从句系统
→ 非谓语动词
→ 句法提升
→ 写作语法与句子边界
→ 阅读长难句分析
→ 用法、语域与综合输出
```

Do not flatten the syllabus into only a few representative topics. Important subsystems, especially tense/aspect and clause types, must be explicitly represented.

## 3. Required taxonomy coverage

The grammar catalog should aim to cover these major areas:

1. **Foundation**: parts of speech, sentence elements, sentence types, basic sentence patterns, be verbs, there be, questions/negatives, word order.
2. **Noun phrase system**: countability, singular/plural, articles, determiners, demonstratives, pronouns, quantifiers, possessives, apposition.
3. **Verb basics**: verb types, stative/dynamic verbs, auxiliaries, verb forms, subject-verb agreement, imperatives, tag questions.
4. **Tense and aspect**: the full time × aspect matrix:
   - time: present, past, future, future-in-the-past;
   - aspect/state: simple, continuous, perfect, perfect continuous;
   - plus future-expression overview and tense comparison.
5. **Modality, voice, mood**: modal meanings, deduction, modal perfect, passive voice, advanced passive, causative structures, conditionals, mixed conditionals, subjunctive, reported speech.
6. **Modifier system**: adjectives, adverbs, comparison, prepositions, prepositional phrases, phrasal verbs, misplaced/dangling modifiers, intensifiers.
7. **Clause system**: clause overview, noun clauses, relative clauses, adverbial clauses, reduced clauses.
8. **Non-finite verbs**: infinitives, bare infinitives, gerunds, participles, infinitive-vs-gerund, perfect/passive non-finites, absolute constructions.
9. **Advanced syntax**: coordination, parallelism, inversion, emphasis, ellipsis, agreement, substitution, information structure.
10. **Writing grammar**: punctuation, sentence fragments/run-ons, sentence combining, cohesion/transitions, common errors, exam review.
11. **Reading long sentences**: core extraction, nested clauses, insertions, logical connectors.
12. **Usage and output**: register, collocation grammar, grammar in writing, final review map.

When adding or changing topics, check whether the change creates a gap in the surrounding system.

## 4. Topic data requirements

Each grammar topic should provide at least:

- stable `id`;
- learner-facing `title`;
- short `summary`;
- module/category information;
- `level`;
- `mustKnow`: concrete skills the learner must master;
- `mustUnderstand`: conceptual ideas the learner must understand;
- `commonTraps`: high-frequency mistakes and traps;
- learning sections;
- examples with English sentence, Chinese translation, and analysis;
- next-topic relationship when applicable.

Stable IDs are user-progress keys. Do not rename or delete an existing ID unless a migration is intentionally implemented.

## 5. Learning section requirements

Each topic should eventually contain these sections:

1. **核心定位**: what this grammar solves.
2. **必须掌握**: concrete forms, structures, and recognition skills.
3. **必须理解**: the conceptual reason or meaning behind the structure.
4. **高频易错点**: typical mistakes and why they are wrong.
5. **练习建议**: what to notice before answering questions.
6. **例句解析**: multiple examples with English, Chinese translation, and grammar reasoning.
7. **与相邻语法对比**: compare with nearby confusing topics when relevant.

Generated sections are acceptable for broad scaffold expansion, but important topics should be replaced with curated topic-specific content over time.

## 6. Tense/aspect requirements

The tense system must be taught as a matrix, not as isolated names.

Required rows:

- present;
- past;
- future;
- future-in-the-past.

Required columns:

- simple;
- continuous/progressive;
- perfect;
- perfect continuous/progressive.

This produces 16 learning nodes. The app may also include a future-expression overview because English future meaning is often expressed with `will`, `be going to`, present continuous, simple present, `be about to`, or `be to`.

For each tense topic, include:

- core meaning;
- basic structure;
- reference time;
- common time markers;
- contrast with nearby tenses;
- common Chinese-speaker mistake;
- examples and practice focus.

## 7. Example rules

Every important rule should include examples.

A good example must include:

- English sentence.
- Chinese translation.
- Grammar analysis.

Example format:

```js
{
  en: 'She has lived here for five years.',
  zh: '她已经在这里住了五年。',
  note: 'for five years 表示从过去持续到现在，所以使用现在完成时 has lived。'
}
```

Avoid examples that are unnatural, overly obscure, or too similar to each other.

## 8. Difficulty progression

Within each module, order should generally move from recognition to production:

1. identify the structure;
2. choose the correct form;
3. distinguish similar structures;
4. understand the meaning difference;
5. apply in full-sentence context;
6. handle exam-like traps;
7. transfer to reading and writing.

## 9. Content quality standards

Do not write shallow content like “this is important; remember it.”

A useful grammar explanation should answer:

- What is the structure?
- What meaning does it express?
- What sentence position does it occupy?
- What changes with subject, tense, number, voice, or register?
- What is commonly confused with it?
- What does the learner need to look at when answering a question?
- How does it connect to the surrounding grammar system?

## 10. Language and style

- Use Simplified Chinese for explanations.
- Use concise English examples.
- Prefer everyday vocabulary in beginner topics.
- Use longer authentic-style sentences only in advanced topics.
- Avoid unexplained linguistic jargon; when jargon is necessary, define it briefly.

## 11. Do not overfit to one exam

The app can help with exams, but the grammar system should be generally useful for real English understanding.

Avoid building a catalog that only follows one test book, one school curriculum, or one exam format.
