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

The grammar system should follow a mainstream learning path:

```text
词类与句子成分
→ 名词系统
→ 动词与时态
→ 情态/语态/语气
→ 修饰系统
→ 从句系统
→ 非谓语动词
→ 句法提升
→ 写作语法与易错点
```

The current catalog has 9 modules and many topic-level lessons. Keep this hierarchy unless there is a strong reason to restructure it.

## 3. Topic data requirements

Each grammar topic should provide at least:

- stable `id`;
- learner-facing `title`;
- short `summary`;
- module/category information;
- `level`;
- learning sections;
- examples with English sentence, Chinese translation, and analysis;
- next-topic relationship when applicable.

## 4. Learning section requirements

Each topic should eventually contain these sections:

1. **核心概念**: what this grammar solves.
2. **基本结构**: the form/pattern.
3. **使用场景**: when to use it.
4. **例句解析**: multiple examples with line-by-line reasoning.
5. **高频易错点**: typical mistakes and why they are wrong.
6. **与相邻语法对比**: compare with nearby confusing topics.
7. **练习建议**: what to notice before answering questions.

The current generator may provide placeholder/general sections. For important topics, replace generated sections with curated topic-specific content.

## 5. Example rules

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

## 6. Difficulty progression

Within each module, order should generally move from recognition to production:

1. identify the structure;
2. choose the correct form;
3. distinguish similar structures;
4. understand the meaning difference;
5. apply in full-sentence context;
6. handle exam-like traps.

## 7. Content quality standards

Do not write shallow content like “this is important; remember it.”

A useful grammar explanation should answer:

- What is the structure?
- What meaning does it express?
- What sentence position does it occupy?
- What changes with subject, tense, number, or voice?
- What is commonly confused with it?
- What does the learner need to look at when answering a question?

## 8. Language and style

- Use Simplified Chinese for explanations.
- Use concise English examples.
- Prefer everyday vocabulary in beginner topics.
- Use longer authentic-style sentences only in advanced topics.
- Avoid unexplained linguistic jargon; when jargon is necessary, define it briefly.

## 9. Do not overfit to one exam

The app can help with exams, but the grammar system should be generally useful for real English understanding.

Avoid building a catalog that only follows one test book, one school curriculum, or one exam format.