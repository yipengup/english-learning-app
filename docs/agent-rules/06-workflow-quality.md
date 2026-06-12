# 06. Workflow and Quality Rules

These rules define how agents and contributors should make changes safely.

## 1. Before editing

Before making a change:

1. Read `AGENT.md`.
2. Read the specific rule file for the task.
3. Inspect the current implementation.
4. Identify the smallest coherent change.
5. Avoid unrelated refactors.

## 2. Change planning

For multi-step work, write a short plan before editing.

A good plan names:

- files to inspect;
- files likely to change;
- data contracts affected;
- user-facing behavior affected;
- validation approach.

## 3. Commit style

Use clear commit messages.

Recommended prefixes:

- `docs:` documentation and agent rules;
- `feat:` user-facing feature;
- `fix:` bug fix;
- `refactor:` behavior-preserving structure change;
- `content:` grammar explanation or question content;
- `test:` test or validation support;
- `chore:` tooling or maintenance.

## 4. Quality checklist

Before considering work complete, verify:

- the app still has a valid grammar catalog;
- the first grammar topic loads;
- menu navigation still works;
- practice can start;
- answer submission displays feedback;
- progress can be saved;
- question bank quality status still renders;
- GitHub Pages assumptions remain valid.

## 5. Content review checklist

For grammar content changes, verify:

- examples are natural English;
- Chinese translations are accurate;
- analysis explains the grammar point, not only vocabulary;
- level is appropriate;
- no topic duplicates another topic unnecessarily;
- generated placeholder content is not presented as fully curated content.

## 6. Question review checklist

For question-bank changes, verify:

- every question has one correct answer;
- options are unique;
- the correct answer appears in options;
- explanation matches the answer;
- translation matches the stem;
- tags reflect the actual tested skill;
- distractors are meaningful;
- IDs are stable and unique.

## 7. Refactor checklist

For refactors, verify:

- behavior is intentionally preserved or clearly changed;
- imports follow layer boundaries;
- no circular dependencies are introduced;
- old localStorage progress is still readable;
- UI still consumes public functions rather than internal implementation details.

## 8. Documentation update triggers

Update docs when changing:

- grammar topic schema;
- question schema;
- progress state shape;
- practice strategy behavior;
- deployment branch or base path;
- module architecture;
- agent/contributor workflow.

## 9. Communication style

When reporting changes to the user:

- state what changed;
- state where it changed;
- mention any limitation honestly;
- suggest the next practical step;
- do not claim high-quality human-curated content if it is generated or placeholder content.

## 10. Safety rule

When uncertain, preserve the working app first. A smaller correct improvement is better than a large change that breaks the deployed PWA.