const assert = require("node:assert/strict");
const test = require("node:test");

const { featuredMovie, moodLabels, shouldRenderFeatured, nextCarouselIndex, expandedMoodOptions, hasIndiaAvailability, moodReserve, randomMoodOptions } = require("./ui-model.js");

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

test("nextCarouselIndex wraps in both directions", () => {
  assert.equal(nextCarouselIndex(2, 1, 3), 0);
  assert.equal(nextCarouselIndex(0, -1, 3), 2);
});

test("expandedMoodOptions adds new suggestion types without losing the core moods", () => {
  const options = expandedMoodOptions(["Mind-bending", "Feel-good"], 3);
  assert.deepEqual(options.slice(0, 2), ["Mind-bending", "Feel-good"]);
  assert.equal(options.length, 5);
  assert.ok(options.some((option) => ["Date night", "Weekend adventure", "Hidden gem", "Late night", "Under two hours", "International pick"].includes(option)));
});

test("mood reserve contains more than one hundred distinct suggestions", () => {
  assert.ok(moodReserve.length >= 100);
  assert.equal(new Set(moodReserve).size, moodReserve.length);
});

test("randomMoodOptions returns a fresh unique set outside the core moods", () => {
  const options = randomMoodOptions(["All picks", "Feel-good"], [0.01, 0.85, 0.43, 0.66], 4);
  assert.equal(options.length, 4);
  assert.equal(new Set(options).size, 4);
  assert.ok(options.every((option) => option !== "All picks" && option !== "Feel-good"));
});

test("hasIndiaAvailability recognises TMDb India provider data", () => {
  assert.equal(hasIndiaAvailability({ "watch/providers": { results: { IN: { flatrate: [{ provider_name: "Netflix" }] } } } }), true);
  assert.equal(hasIndiaAvailability({ "watch/providers": { results: { US: { flatrate: [{ provider_name: "Netflix" }] } } } }), false);
});
