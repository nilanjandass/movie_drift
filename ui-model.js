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

function nextCarouselIndex(current, direction, total) {
  if (!total) return 0;
  return (current + direction + total) % total;
}

function swipeDirection(startX, endX, threshold = 48) {
  const distance = endX - startX;
  if (Math.abs(distance) < threshold) return 0;
  return distance < 0 ? 1 : -1;
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

if (typeof module !== "undefined") module.exports = { featuredMovie, moodLabels, shouldRenderFeatured, nextCarouselIndex, swipeDirection, mediaTypeOf, mediaTitle, mediaDate, mediaRoute, watchlistKey, hasIndiaAvailability };
