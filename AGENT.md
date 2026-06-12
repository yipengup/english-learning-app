# AGENT.md

This file is the project-level operating outline for AI agents and human contributors working on `english-learning-app`.

It should stay concise. Detailed rules are split into the files under `docs/agent-rules/` and referenced from here.

## 1. Project mission

Build a mobile-friendly English learning PWA that helps Chinese-speaking learners study English grammar systematically.

The current product focus is:

- Systematic English grammar learning.
- A collapsible grammar syllabus menu from simple to complex.
- Detailed grammar explanations with English examples, Chinese translations, and example-level analysis.
- Multiple-choice practice for each grammar topic.
- Local progress tracking with unanswered-first and wrong-answer-first practice strategies.
- A low-coupling architecture that can later support vocabulary, listening, reading, writing, AI tutoring, and cloud sync.

## 2. Current project architecture

The project is currently a React + Vite + PWA front-end app deployed by GitHub Pages.

Important current modules:

- `src/main.jsx`: React entry, page composition, user interaction flow.
- `src/data/grammarCatalog.js`: grammar syllabus data and generated learning sections.
- `src/data/questionBanks/`: curated and fallback question bank builders.
- `src/data/questionBank.js`: compatibility/entry wrapper for question bank building.
- `src/domain/questionSchema.js`: question object rules and validation helpers.
- `src/domain/practiceEngine.js`: practice session, question picking, grading, progress summary.
- `src/domain/progressRepository.js`: grammar-answer progress accessors.
- `src/shared/storage.js`: localStorage persistence boundary.
- `src/styles/app.css`: app-level mobile-first styling.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.

## 3. Rule index

Before making changes, read the rule file that matches the task type.

| Task type | Required rule file |
| --- | --- |
| Architecture, refactor, module boundaries | `docs/agent-rules/01-architecture.md` |
| Grammar syllabus, knowledge hierarchy, explanations | `docs/agent-rules/02-grammar-content.md` |
| Question banks, answer explanations, 200-question expansion | `docs/agent-rules/03-question-banks.md` |
| Practice algorithm, progress, review strategy | `docs/agent-rules/04-practice-engine.md` |
| UI, mobile layout, PWA, deployment | `docs/agent-rules/05-ui-pwa-deployment.md` |
| Contributor workflow and quality checklist | `docs/agent-rules/06-workflow-quality.md` |

## 4. Required working order

For every non-trivial change:

1. Identify the task type and read the corresponding rule file.
2. Inspect the existing implementation before editing.
3. Prefer adding or replacing isolated modules over editing unrelated files.
4. Preserve existing user progress data compatibility unless the task explicitly requires a migration.
5. Keep grammar content, question data, practice logic, storage, and UI separated.
6. Update docs when changing architecture, data contracts, or contributor rules.
7. Verify the app still supports GitHub Pages deployment under `/english-learning-app/`.

## 5. Core design principles

- Data-driven UI: pages should render from catalog and question-bank data, not hardcoded topic lists.
- Low coupling: domain logic must not depend on React components.
- Stable IDs: grammar IDs and question IDs are persistent user-progress keys.
- Progressive enhancement: local-only PWA first, cloud sync later.
- Content quality first: grammar explanations and question explanations must be useful to learners, not merely technically correct.
- Mobile first: the phone experience is the primary experience.

## 6. Definition of done

A change is done only when:

- It follows the relevant rule files.
- It does not break the current grammar learning and practice flow.
- New grammar topics are reachable from the syllabus.
- New question banks are registered and can be practiced.
- Answer explanations include Chinese translation and grammar reasoning.
- The project can still be built and deployed by the existing GitHub Pages workflow.

## 7. Non-goals for the current stage

Do not introduce these unless explicitly requested:

- Backend server requirements.
- Mandatory login.
- Paid API dependency for basic learning flow.
- Large framework migration.
- Database dependency.
- Native iOS/Android app packaging.

## 8. When unsure

Prefer a small, reversible change. Keep the app usable, keep data contracts stable, and document the reasoning in the relevant rule file or README.