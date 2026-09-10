const assert = require("node:assert/strict");
const test = require("node:test");

const { featuredMovie, moodLabels, shouldRenderFeatured, nextCarouselIndex, swipeDirection, mediaTypeOf, mediaTitle, mediaDate, mediaRoute, watchlistKey, hasIndiaAvailability, shouldApplyRevealCard, watchlistQueue, relatedPick, availabilityLabel, genreTone, clearWatchlistStatus, discoveryRouteKind } = require("./ui-model.js");

test("featuredMovie chooses the most popular rated release", () => {
  const result = featuredMovie([
    { id: 1, popularity: 92, vote_average: 6.9, release_date: "2026-06-20" },
    { id: 2, popularity: 80, vote_average: 8.4, release_date: "2026-07-03" },
    { id: 3, popularity: 87, vote_average: 7.7, release_date: "2026-07-06" },
  ]);

  assert.equal(result.id, 2);
});

test("moodLabels turns a movie's genres and score into browseable moods", () => {
  const result = moodLabels({ genre_ids: [27, 53], vote_average: 8.3 }, [
    { id: 27, name: "Horror" },
    { id: 53, name: "Thriller" },
  ]);

  assert.deepEqual(result, ["Edge of your seat", "Mind-bending", "Critics' pick"]);
});

test("moodLabels falls back gracefully when genre data is absent", () => {
  assert.deepEqual(moodLabels({ genre_ids: [], vote_average: 0 }, []), ["Worth a look"]);
});

test("shouldRenderFeatured is tied to the requested first discovery page", () => {
  assert.equal(shouldRenderFeatured({ requestedPage: 1, query: "" }), true);
  assert.equal(shouldRenderFeatured({ requestedPage: 2, query: "" }), false);
  assert.equal(shouldRenderFeatured({ requestedPage: 1, query: "arrival" }), false);
});

test("discoveryRouteKind recognises the People discovery destination", () => {
  assert.equal(discoveryRouteKind("#/people"), "people");
  assert.equal(discoveryRouteKind("#/series"), "tv");
  assert.equal(discoveryRouteKind("#/"), "movie");
});

test("nextCarouselIndex wraps in both directions", () => {
  assert.equal(nextCarouselIndex(2, 1, 3), 0);
  assert.equal(nextCarouselIndex(0, -1, 3), 2);
});

test("swipeDirection only changes slides after a deliberate horizontal swipe", () => {
  assert.equal(swipeDirection(400, 330), 1);
  assert.equal(swipeDirection(330, 400), -1);
  assert.equal(swipeDirection(400, 370), 0);
});

test("cards remain visible when their route has no scroll-reveal observer", () => {
  assert.equal(shouldApplyRevealCard(null), false);
  assert.equal(shouldApplyRevealCard({ observe() {} }), true);
});

test("watchlistQueue prioritises active titles and returns at most three", () => {
  const result = watchlistQueue([
    { id: 1, status: "want", updatedAt: "2026-09-01" },
    { id: 2, status: "watched", updatedAt: "2026-09-03" },
    { id: 3, status: "watching", updatedAt: "2026-09-02" },
    { id: 4, status: "want", updatedAt: "2026-09-04" },
  ]);

  assert.deepEqual(result.map((item) => item.id), [3, 4, 1]);
});

test("relatedPick favours shared genres in the same media type and excludes saved titles", () => {
  const source = [{ id: 10, media_type: "movie", genre_ids: [18, 10749] }];
  const candidates = [
    { id: 11, media_type: "tv", genre_ids: [18, 10749], vote_average: 10, popularity: 100 },
    { id: 12, media_type: "movie", genre_ids: [18], vote_average: 7, popularity: 20 },
    { id: 13, media_type: "movie", genre_ids: [18, 10749], vote_average: 8, popularity: 30 },
  ];

  assert.equal(relatedPick(source, candidates, new Set(["movie:12"])).id, 13);
});

test("relatedPick preserves the exact typed source identity for its heading", () => {
  const result = relatedPick(
    [{ id: 21, media_type: "tv", genre_ids: [18] }, { id: 21, media_type: "movie", genre_ids: [27] }],
    [{ id: 22, media_type: "tv", genre_ids: [18], vote_average: 8, popularity: 40 }],
  );

  assert.equal(result.relatedToKey, "tv:21");
});

test("clearWatchlistStatus removes only entries in the requested watchlist group", () => {
  const result = clearWatchlistStatus({
    "movie:1": { id: 1, media_type: "movie", status: "want" },
    "tv:2": { id: 2, media_type: "tv", status: "watching" },
    "movie:3": { id: 3, media_type: "movie", status: "want" },
  }, "want");

  assert.deepEqual(Object.keys(result), ["tv:2"]);
});

test("availabilityLabel uses India provider priority and keeps its action explicit", () => {
  assert.deepEqual(availabilityLabel({ rent: [{ provider_name: "Apple TV" }], flatrate: [{ provider_name: "Netflix" }] }), { action: "Stream on", provider: "Netflix" });
  assert.deepEqual(availabilityLabel({ ads: [{ provider_name: "JioHotstar" }] }), { action: "With ads on", provider: "JioHotstar" });
  assert.equal(availabilityLabel({}), null);
});

test("genreTone gives suspense precedence over romance and uses a neutral fallback", () => {
  assert.equal(genreTone({ genre_ids: [27, 10749] }), "suspense");
  assert.equal(genreTone({ genre_ids: [878] }), "future");
  assert.equal(genreTone({ genre_ids: [99] }), "neutral");
});

test("media helpers normalize movie and TV naming, dates, routes, and watchlist identity", () => {
  const movie = { id: 21, title: "A Movie", release_date: "2026-06-01", media_type: "movie" };
  const series = { id: 21, name: "A Series", first_air_date: "2026-06-02", media_type: "tv" };

  assert.equal(mediaTypeOf(movie), "movie");
  assert.equal(mediaTypeOf(series), "tv");
  assert.equal(mediaTitle(movie), "A Movie");
  assert.equal(mediaTitle(series), "A Series");
  assert.equal(mediaDate(movie), "2026-06-01");
  assert.equal(mediaDate(series), "2026-06-02");
  assert.equal(mediaRoute(movie), "#/movie/21");
  assert.equal(mediaRoute(series), "#/series/21");
  assert.notEqual(watchlistKey(movie), watchlistKey(series));
});

test("hasIndiaAvailability recognises TMDb India provider data", () => {
  assert.equal(hasIndiaAvailability({ "watch/providers": { results: { IN: { flatrate: [{ provider_name: "Netflix" }] } } } }), true);
  assert.equal(hasIndiaAvailability({ "watch/providers": { results: { US: { flatrate: [{ provider_name: "Netflix" }] } } } }), false);
});
