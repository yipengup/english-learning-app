# 05. UI, PWA, and Deployment Rules

These rules keep the phone experience usable and GitHub Pages deployment stable.

## 1. Primary experience

The primary target is mobile browser use.

Design priority:

1. phone portrait layout;
2. phone home-screen PWA experience;
3. tablet;
4. desktop.

Desktop can be pleasant, but do not optimize desktop at the expense of phone usability.

## 2. Navigation rules

The grammar menu should remain:

- available from the top-left menu button;
- collapsible on mobile;
- grouped by grammar module;
- ordered from simple to complex;
- data-driven from `grammarGroups` / `grammarCatalog`.

Do not hardcode a separate UI-only grammar list that can drift away from the catalog.

## 3. Learning page rules

A grammar learning page should show:

- topic title;
- module/category;
- level;
- summary;
- topic explanation sections;
- example blocks with English, Chinese, and analysis;
- progress stats;
- question-bank quality status;
- start-practice button;
- wrong-answer review button when useful.

## 4. Practice page rules

A practice page should show:

- grammar topic name;
- current strategy;
- end-practice button;
- question difficulty and tags;
- question stem;
- options;
- immediate correctness feedback;
- full Chinese translation;
- correct answer;
- detailed grammar explanation;
- continue-practice button;
- next-section button.

## 5. Accessibility and interaction

- Buttons must be real `<button>` elements when they trigger actions.
- Do not rely on color alone to show right/wrong state.
- Tap targets should be comfortable on mobile.
- Avoid hover-only interactions.
- Keep text readable without zooming.

## 6. Styling rules

Current styling is app-level CSS in:

```text
src/styles/app.css
```

Keep CSS simple unless componentization grows.

When adding components, prefer class names that describe UI roles, not visual colors only.

Good:

```text
practiceTop
questionMeta
categoryBlock
```

Avoid:

```text
blueBox
bigThing
style1
```

## 7. PWA rules

Maintain:

- `manifest.webmanifest`;
- mobile-friendly viewport;
- app icons;
- GitHub Pages compatible asset paths;
- Vite base path for `/english-learning-app/`.

Do not add service-worker complexity unless offline behavior is intentionally implemented and tested.

## 8. GitHub Pages deployment

The repository deploys through GitHub Actions.

Current important assumptions:

- default branch is `master`;
- workflow is under `.github/workflows/deploy.yml`;
- built static assets are deployed to GitHub Pages;
- public URL is expected to be `https://yipengup.github.io/english-learning-app/`.

If the repository branch name changes, update the workflow trigger.

## 9. Build safety

Before making deployment-related changes, check:

- `package.json` scripts;
- `vite.config.js` base path;
- GitHub workflow branch trigger;
- Pages source setting should be GitHub Actions.

Do not change deployment strategy unless the user asks.