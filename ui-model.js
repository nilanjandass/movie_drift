function featuredMovie(movies = []) {
  return movies
    .slice()
    .sort((left, right) => (Number(right.vote_average || 0) * 10 + Number(right.popularity || 0)) - (Number(left.vote_average || 0) * 10 + Number(left.popularity || 0)))[0] || null;
}

function moodLabels(movie = {}, genres = []) {
  const genreNames = (movie.genre_ids || [])
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);
  const labels = [];

  if (genreNames.includes("Horror") || genreNames.includes("Thriller")) labels.push("Edge of your seat");
  if (genreNames.includes("Science Fiction") || genreNames.includes("Mystery") || genreNames.includes("Thriller")) labels.push("Mind-bending");
  if (genreNames.includes("Romance") || genreNames.includes("Comedy")) labels.push("Feel-good");
  if (genreNames.includes("Animation") || genreNames.includes("Family")) labels.push("Family watch");
  if (Number(movie.vote_average || 0) >= 8) labels.push("Critics' pick");

  return labels.length ? labels.slice(0, 3) : ["Worth a look"];
}

function shouldRenderFeatured({ requestedPage, query }) {
  return requestedPage === 1 && !query;
}

function discoveryRouteKind(hash = "#/") {
  if (hash === "#/people") return "people";
  return hash === "#/series" ? "tv" : "movie";
}

function nextCarouselIndex(current, direction, total) {
  if (!total) return 0;
  return (current + direction + total) % total;
}

function swipeDirection(startX, endX, threshold = 48) {
  const distance = endX - startX;
  if (Math.abs(distance) < threshold) return 0;
  return distance < 0 ? 1 : -1;
}

function shouldApplyRevealCard(revealObserver) {
  return Boolean(revealObserver && typeof revealObserver.observe === "function");
}

function watchlistQueue(items = [], limit = 3) {
  const statusRank = { watching: 0, want: 1, watched: 2 };
  return items
    .slice()
    .sort((left, right) => (statusRank[left.status] ?? 3) - (statusRank[right.status] ?? 3)
      || (right.updatedAt || right.savedAt || "").localeCompare(left.updatedAt || left.savedAt || ""))
    .slice(0, limit);
}

function relatedPick(sourceItems = [], candidates = [], savedKeys = new Set()) {
  const matches = sourceItems.flatMap((source) => candidates
    .filter((candidate) => candidate?.id && candidate.id !== source.id && !savedKeys.has(watchlistKey(candidate)))
    .map((candidate) => ({
      candidate,
      source,
      sharedGenres: (candidate.genre_ids || []).filter((id) => (source.genre_ids || []).includes(id)).length,
      sameType: mediaTypeOf(candidate) === mediaTypeOf(source),
    }))
    .filter((match) => match.sharedGenres));

  matches.sort((left, right) => Number(right.sameType) - Number(left.sameType)
    || right.sharedGenres - left.sharedGenres
    || Number(right.candidate.vote_average || 0) - Number(left.candidate.vote_average || 0)
    || Number(right.candidate.popularity || 0) - Number(left.candidate.popularity || 0));

  return matches.length ? { ...matches[0].candidate, relatedToKey: watchlistKey(matches[0].source) } : null;
}

function clearWatchlistStatus(watchlist = {}, status) {
  return Object.fromEntries(Object.entries(watchlist).filter(([, item]) => item.status !== status));
}

function availabilityLabel(providers = {}) {
  const providerTypes = [
    ["flatrate", "Stream on"],
    ["free", "Free on"],
    ["ads", "With ads on"],
    ["rent", "Rent on"],
    ["buy", "Buy on"],
  ];
  const [key, action] = providerTypes.find(([type]) => providers[type]?.length) || [];
  return key ? { action, provider: providers[key][0].provider_name } : null;
}

function genreTone(item = {}) {
  const genres = item.genre_ids || [];
  if (genres.includes(27) || genres.includes(53)) return "suspense";
  if (genres.includes(10749) || genres.includes(18)) return "romance";
  if (genres.includes(878) || genres.includes(16)) return "future";
  return "neutral";
}

function mediaTypeOf(item = {}) {
  return item.media_type === "tv" ? "tv" : "movie";
}

function mediaTitle(item = {}) {
  return item.title || item.name || "Untitled";
}

function mediaDate(item = {}) {
  return item.release_date || item.first_air_date || "";
}

function mediaRoute(item = {}) {
  const segment = mediaTypeOf(item) === "tv" ? "series" : "movie";
  return `#/${segment}/${item.id || ""}`;
}

function watchlistKey(item = {}) {
  return `${mediaTypeOf(item)}:${item.id || ""}`;
}

function hasIndiaAvailability(movie = {}) {
  const providers = movie["watch/providers"]?.results?.IN;
  return Boolean(providers && [providers.flatrate, providers.free, providers.ads, providers.rent, providers.buy].some((list) => list?.length));
}

if (typeof module !== "undefined") module.exports = { featuredMovie, moodLabels, shouldRenderFeatured, discoveryRouteKind, nextCarouselIndex, swipeDirection, shouldApplyRevealCard, watchlistQueue, relatedPick, availabilityLabel, genreTone, clearWatchlistStatus, mediaTypeOf, mediaTitle, mediaDate, mediaRoute, watchlistKey, hasIndiaAvailability };
