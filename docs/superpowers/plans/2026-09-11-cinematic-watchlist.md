# Cinematic Watchlist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved cinematic watchlist treatments while preserving Movie Drift's static, client-rendered TMDb architecture.

**Architecture:** Pure selection and labeling rules live in `ui-model.js`, allowing the queue, related-picks rail, provider labels, and genre tone to be unit-tested without a browser. `app.js` enriches watchlist entries with cached TMDb provider data and renders the new watchlist regions. `styles.css` provides the CSS-only atmosphere, responsive timeline, card state, and genre treatments.

**Tech Stack:** Vanilla HTML, CSS, browser JavaScript, TMDb API, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-11-cinematic-watchlist-design.md`

## Global Constraints

- Keep the application static and client-rendered; add no dependencies, accounts, tracking service, or image assets.
- Do not make a provider-unavailable claim when TMDb returns no India provider.
- Never make mobile content or controls depend on hover.
- Respect `prefers-reduced-motion` and retain readable, high-contrast text at 320px.
- Use `mediaRoute`, `mediaTitle`, `mediaTypeOf`, and `watchlistKey` for all title identity, labels, and navigation.

---

### Task 1: Add deterministic watchlist presentation rules

**Files:**
- Modify: `ui-model.js:1-67`
- Test: `ui-model.test.js:1-65`

**Interfaces:**
- Produces: `watchlistQueue(items, limit = 3)`, `relatedPick(sourceItems, candidates, savedKeys)`, `availabilityLabel(providers)`, and `genreTone(item)`.
- Consumes: Normalized media objects with `id`, `media_type`, `genre_ids`, `status`, `updatedAt`, `vote_average`, and `popularity`.

- [ ] **Step 1: Write the failing model tests**

```js
test("watchlistQueue prioritises active titles and returns at most three", () => {
  const result = watchlistQueue([
    { id: 1, status: "want", updatedAt: "2026-09-01" },
    { id: 2, status: "watched", updatedAt: "2026-09-03" },
    { id: 3, status: "watching", updatedAt: "2026-09-02" },
    { id: 4, status: "want", updatedAt: "2026-09-04" },
  ]);
  assert.deepEqual(result.map((item) => item.id), [3, 4, 1]);
});

test("relatedPick favours the same media type with shared genres and excludes saved titles", () => {
  const source = [{ id: 10, media_type: "movie", genre_ids: [18, 10749] }];
  const candidates = [
    { id: 11, media_type: "tv", genre_ids: [18, 10749], vote_average: 10, popularity: 100 },
    { id: 12, media_type: "movie", genre_ids: [18], vote_average: 7, popularity: 20 },
    { id: 13, media_type: "movie", genre_ids: [18, 10749], vote_average: 8, popularity: 30 },
  ];
  assert.equal(relatedPick(source, candidates, new Set(["movie:12"])).id, 13);
});

test("availabilityLabel uses India provider priority and keeps its action explicit", () => {
  assert.deepEqual(availabilityLabel({ rent: [{ provider_name: "Apple TV" }], flatrate: [{ provider_name: "Netflix" }] }), { action: "Stream on", provider: "Netflix" });
  assert.equal(availabilityLabel({}), null);
});

test("genreTone gives suspense precedence over romance and a neutral fallback", () => {
  assert.equal(genreTone({ genre_ids: [27, 10749] }), "suspense");
  assert.equal(genreTone({ genre_ids: [878] }), "future");
  assert.equal(genreTone({ genre_ids: [99] }), "neutral");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test ui-model.test.js`

Expected: FAIL because the four newly imported functions are absent.

- [ ] **Step 3: Implement only the pure helpers**

```js
function watchlistQueue(items = [], limit = 3) {
  const statusRank = { watching: 0, want: 1, watched: 2 };
  return items.slice().sort((a, b) => statusRank[a.status] - statusRank[b.status]
    || (b.updatedAt || "").localeCompare(a.updatedAt || "")).slice(0, limit);
}

function availabilityLabel(providers = {}) {
  const types = [["flatrate", "Stream on"], ["free", "Free on"], ["ads", "With ads on"], ["rent", "Rent on"], ["buy", "Buy on"]];
  const [type, action] = types.find(([key]) => providers[key]?.length) || [];
  return type ? { action, provider: providers[type][0].provider_name } : null;
}
```

Implement `relatedPick` with the ordering specified by the spec and `genreTone` with the exact tone mapping.

- [ ] **Step 4: Run the model suite to verify it passes**

Run: `node --test ui-model.test.js`

Expected: PASS with all existing and new model tests.

- [ ] **Step 5: Commit the model rules**

```bash
git add ui-model.js ui-model.test.js
git commit -m "Add cinematic watchlist model rules"
```

### Task 2: Render queue, timeline, related picks, and availability labels

**Files:**
- Modify: `app.js:749-806`, `app.js:1156-1170`, `app.js:1257-1293`
- Modify: `index.html:95-113`
- Test: `ui-model.test.js:1-100`

**Interfaces:**
- Consumes: `watchlistQueue`, `relatedPick`, `availabilityLabel`, `genreTone` from `ui-model.js`.
- Produces: queue markup in `#watchlistQueue`, timeline markup in `#watchStatusTimeline`, recommendation markup in `#watchlistRelated`, and `.availability-ribbon` on enriched watchlist cards.

- [ ] **Step 1: Enrich watchlist entries and render the new regions**

```js
async function fetchWatchlistProviders(movie) {
  const detail = await fetchMediaDetail(movie.id, mediaTypeOf(movie));
  return detail["watch/providers"]?.results?.IN || {};
}
```

Call the function only from `renderWatchlist` when `state.apiKey` is present. Preserve an in-flight render token so a route change cannot repaint an old watchlist. Store the provider object on the in-memory item only; do not mutate local-storage schema. In sample mode, derive the fallback provider board from `fetchMediaDetail`.

Update `renderMovieBatch` to add `data-genre-tone`, and when `movie.providers` exists, append a text `.availability-ribbon` to `.poster-stage`. Change the template only if a dedicated ribbon node is clearer than creating it in JavaScript.

Update `renderWatchlist` to insert the queue, count timeline, and related-pick rail before `#watchlistGroups`. Assemble recommendation candidates from both `FALLBACK_MOVIES` and `FALLBACK_SERIES` in sample mode, or `state.movies` plus fallbacks for live mode. Each related pick uses `mediaRoute` and preserves the title's media type.

- [ ] **Step 2: Run the model suite to verify it passes**

Run: `node --test ui-model.test.js`

Expected: PASS.

- [ ] **Step 3: Run JavaScript syntax checks**

Run: `node --check app.js && node --check ui-model.js`

Expected: Both commands exit 0.

- [ ] **Step 4: Commit the rendered watchlist experience**

```bash
git add app.js index.html ui-model.test.js
git commit -m "Render cinematic watchlist elements"
```

### Task 3: Add the atmospheric, responsive visual system

**Files:**
- Modify: `styles.css:1-1358`

**Interfaces:**
- Consumes: `.watchlist-hero`, `.watchlist-queue`, `.watch-status-timeline`, `.watchlist-related`, `.availability-ribbon`, and `[data-genre-tone]` produced in Task 2.
- Produces: CSS-only grain/light-leak treatment, card expansion state, responsive timeline and queue layout, and genre typography.

- [ ] **Step 1: Implement scoped CSS treatments**

```css
.watchlist-hero { position: relative; isolation: isolate; overflow: hidden; }
.watchlist-hero::before { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.17) .6px, transparent .6px); background-size: 5px 5px; content: ""; opacity: .08; pointer-events: none; }
.watchlist-hero::after { position: absolute; inset: 0; background: radial-gradient(circle at 92% 8%, rgba(255,203,107,.22), transparent 31%); content: ""; pointer-events: none; }
.movie-card[data-genre-tone="suspense"] .movie-title { letter-spacing: .025em; }
```

Add queue and related rails using horizontal scrolling and `scroll-snap`, a three-step status timeline that wraps rather than overflows at 320px, and an availability ribbon with a text action label. Restrict card expansion to `@media (hover: hover) and (min-width: 621px)` and include keyboard `:focus-within`. Under `prefers-reduced-motion: reduce`, suppress transition and transform effects for all new components.

- [ ] **Step 2: Run the model suite and syntax checks**

Run: `node --test && node --check app.js && node --check ui-model.js`

Expected: PASS and exit 0.

- [ ] **Step 3: Commit the visual system**

```bash
git add styles.css ui-model.test.js
git commit -m "Style cinematic watchlist surfaces"
```

### Task 4: Verify the completed visual and functional flow

**Files:**
- Verify: `app.js`, `styles.css`, `ui-model.js`, `ui-model.test.js`

**Interfaces:**
- Consumes: All production code from Tasks 1–3.
- Produces: Verification evidence only; no production changes.

- [ ] **Step 1: Run the complete automated verification**

Run: `node --test && node --check app.js && node --check ui-model.js && git diff --check`

Expected: all tests pass, both syntax checks exit 0, and no whitespace errors.

- [ ] **Step 2: Browser-check populated watchlist at mobile and desktop widths**

Run a local static server, open `#/watchlist`, seed at least one movie and one series through the existing UI, and verify:

```text
Mobile 375px: queue, timeline, cards, provider ribbons, and related rail have readable horizontal or wrapped layouts.
Desktop: card hover and keyboard focus reveal the bounded backdrop state.
Reduced motion: new cards and atmospheric surfaces show without movement.
```

Expected: every selected treatment is visible; no console errors; watchlist controls continue to work.

- [ ] **Step 3: Inspect the final changes**

Run: `git status --short && git diff HEAD~3..HEAD --check`

Expected: only the approved implementation, unit tests, and design artifacts are present.

- [ ] **Step 4: Commit any verification-only correction**

```bash
git add app.js styles.css ui-model.js ui-model.test.js index.html
git commit -m "Fix cinematic watchlist verification"
```
