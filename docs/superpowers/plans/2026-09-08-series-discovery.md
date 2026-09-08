# Series Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated TMDb-backed Series discovery flow alongside the existing movie flow.

**Architecture:** Route state determines the active media type. Shared media helpers let existing cards, rails, featured slides, details, and watchlist rendering work with either TMDb movie or TV records. Fallback series preserve the no-key preview experience.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node test runner, TMDb API.

**Spec:** `docs/superpowers/specs/2026-09-08-series-discovery-design.md`

## Global Constraints

- Preserve `#/` movie discovery and existing movie detail links.
- Use `#/series` and `#/series/:id` for all TV content.
- Use TMDb TV endpoints and India provider data for series.
- Keep the watchlist local and media-type-safe.
- Maintain touch and desktop responsiveness.

---

### Task 1: Establish Shared Media Helpers

**Files:**
- Modify: `ui-model.js`
- Modify: `ui-model.test.js`

**Interfaces:**
- Produces `mediaTitle(item)`, `mediaDate(item)`, `mediaRoute(item)`, and `watchlistKey(item)` for all later UI code.

- [ ] Write failing tests for movie and TV titles, dates, routes, and distinct watchlist keys.
- [ ] Implement the helpers with `title`/`name`, `release_date`/`first_air_date`, and type-aware routes.
- [ ] Run `node --test ui-model.test.js` and confirm all helpers pass.

### Task 2: Add Series Routes And Discovery Switch

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `styles.css`

**Interfaces:**
- Consumes the Task 1 route helper.
- Produces active `state.mediaType` for `movie` and `tv` discovery routes.

- [ ] Add primary navigation links for Discover Movies and Discover Series.
- [ ] Parse `#/series` and `#/series/:id` without altering movie routes.
- [ ] Render a labelled Movies/Series segmented switch in discovery.
- [ ] Verify both routes render and show the correct active navigation.

### Task 3: Fetch And Render Series

**Files:**
- Modify: `app.js`

**Interfaces:**
- Consumes `state.mediaType` and shared media helpers.
- Produces normalized discovery items with a `media_type` value.

- [ ] Add fallback series with `name`, `first_air_date`, ratings, summaries, and genres.
- [ ] Select the appropriate TMDb `discover`, `search`, and genre endpoints for the active type.
- [ ] Use first-air-date filtering and TV sort values for series.
- [ ] Reuse cards, feature carousel, rails, search suggestions, and quick look with series-specific copy.
- [ ] Verify fallback and live paths do not duplicate titles within a rail.

### Task 4: Render Series Details And Shared Watchlist

**Files:**
- Modify: `app.js`
- Modify: `ui-model.js`
- Modify: `ui-model.test.js`

**Interfaces:**
- Consumes normalized detail items and `watchlistKey(item)`.
- Produces series details and a type-safe combined watchlist.

- [ ] Fetch TV detail records with credits, videos, and India providers.
- [ ] Show creator, season count, episode count, and episode runtime on series details.
- [ ] Store watchlist items with `media_type`; migrate existing entries to `movie`.
- [ ] Verify a movie and a series with the same numeric ID can both be saved.

### Task 5: Verify And Publish

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `ui-model.js`
- Modify: `ui-model.test.js`

- [ ] Run `node --check app.js`, `node --check ui-model.js`, and `node --test ui-model.test.js`.
- [ ] Verify Movies and Series at desktop and mobile widths, including a series detail and mixed watchlist.
- [ ] Commit and push the completed feature to `main`.
