# Provider and People Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make India discovery resilient when provider data is absent and complete the people discovery experience.

**Architecture:** Core TMDb detail data will be fetched independently from optional India provider data, so an absent provider response cannot block a title detail page. Discovery cards will receive a theatre fallback only within the active India scope. People discovery will use a searchable, vertically scrolling grid while existing series-page people rail remains compact.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in test runner, TMDb API.

**Spec:** Confirmed user requirements in this task.

## Global Constraints

- Keep the India availability filter selected by default.
- Use the exact label `Screening on Theaters` only when India discovery has no listed provider.
- Preserve accessible image alternative text and keyboard navigation.

---

### Task 1: Model the India theatre fallback and people name matching

**Files:**
- Modify: `ui-model.js`
- Test: `ui-model.test.js`

- [x] Write tests for the theatre fallback and case-insensitive people matching.
- [x] Run `node --test` and confirm the new tests fail.
- [x] Add minimal pure helpers and export them.
- [x] Run `node --test` and confirm the suite passes.

### Task 2: Decouple details from optional providers

**Files:**
- Modify: `app.js`
- Test: `ui-model.test.js`

- [x] Fetch core detail data without the provider subresource.
- [x] Fetch India provider data independently with a safe fallback.
- [x] Update discovery and watchlist hydration to use the provider lookup.
- [x] Use the India-scope theatre fallback for discovery-card labels.
- [x] Run `node --test` and JavaScript syntax checks.

### Task 3: Complete people discovery and simplify rail cards

**Files:**
- Modify: `app.js`
- Modify: `styles.css`

- [x] Add the Discover People search field and debounce its rendering.
- [x] Render Popular People as a responsive vertical grid.
- [x] Retain the compact people rail only on series discovery.
- [x] Remove visible title overlays from Trending now and Critically acclaimed cards.
- [x] Run the full test and syntax suite.

### Task 4: Verify and publish

**Files:**
- Verify: `app.js`, `ui-model.js`, `ui-model.test.js`, `styles.css`

- [ ] Run `node --test`, `node --check app.js`, `node --check ui-model.js`, and `git diff --check`.
- [ ] Review `git diff` against all six requirements.
- [ ] Commit the implementation and push the commit to `origin/main`.
