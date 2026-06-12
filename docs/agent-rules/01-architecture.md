# 01. Architecture Rules

These rules define how to keep the project low-coupling and easy to extend.

## 1. Layer boundaries

The app should be organized around these layers:

1. **Domain layer**: pure learning and practice logic.
   - Location: `src/domain/`
   - Examples: question schema, practice engine, progress summary.
   - Must not import React, CSS, browser APIs, or UI components.

2. **Data layer**: grammar catalog and question-bank data/builders.
   - Location: `src/data/`
   - Examples: `grammarCatalog.js`, `questionBanks/`.
   - Can import domain validation helpers when needed.
   - Should not contain React rendering logic.

3. **Persistence boundary**: local progress storage.
   - Location: `src/shared/storage.js`, `src/domain/progressRepository.js`.
   - Browser storage access should be isolated here.
   - Future cloud sync should replace or extend this layer, not spread API calls across UI components.

4. **Presentation layer**: React components and app composition.
   - Location: currently `src/main.jsx`; future growth should split into `src/features/` or `src/components/`.
   - Should consume catalog data and domain services.
   - Should not own core question-picking, grading, or schema rules.

## 2. Dependency direction

Allowed direction:

```text
UI → domain
UI → data
UI → persistence boundary
Data → domain validation helpers
Persistence repository → shared storage
```

Avoid these dependencies:

```text
domain → UI
domain → localStorage
data → UI
question bank files → React components
storage → React components
```

## 3. Extension pattern

When adding a new learning area, prefer a registry-based pattern.

Examples:

- Grammar topic registry: `grammarCatalog` / `grammarGroups`.
- Question-bank registry: `src/data/questionBanks/index.js`.
- Future vocabulary module: should have its own catalog and bank registry.

Do not add large `if/else` blocks in UI for each topic unless the visual behavior is truly different.

## 4. Stable IDs

IDs are part of the user-data contract.

- Grammar topic IDs such as `be-verbs` and `present-simple` must remain stable.
- Question IDs must remain stable once released.
- Renaming a title is allowed; renaming an ID requires a migration plan.
- Do not generate persistent IDs from array indexes.

## 5. File-size control

Avoid creating very large files that mix responsibilities.

Suggested future split:

```text
src/components/
  Sidebar.jsx
  LearningView.jsx
  PracticeView.jsx

src/features/grammar/
  grammarCatalog.js
  GrammarPage.jsx

src/domain/
  practiceEngine.js
  questionSchema.js
  progressRepository.js
```

Do this split when a file becomes hard to scan, not prematurely.

## 6. Backward compatibility

Local progress is currently stored in the browser. Any change to the shape of saved state must either:

- preserve old data shape, or
- include a migration function, or
- intentionally reset data with a clear reason.

Do not silently break existing learner progress.

## 7. Preferred implementation style

- Prefer pure functions for business logic.
- Prefer explicit data objects over hidden implicit behavior.
- Prefer small builder functions for generated banks.
- Keep UI state minimal and derived values computed from data/domain helpers.
- Keep deployment-specific settings isolated in Vite config and workflow files.