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

function expandedMoodOptions(coreMoods = [], extraCount = 3) {
  const extras = ["Date night", "Weekend adventure", "Hidden gem", "Late night", "Under two hours", "International pick"];
  return [...coreMoods, ...extras.slice(0, extraCount)];
}

const moodReserve = [
  "Rainy day", "Sunset", "Midnight", "Sunday", "Friday night", "Holiday", "Slow morning", "Golden hour", "Road trip", "Cozy", "Stormy", "Summer",
].flatMap((setting) => [
  "escape", "romance", "adventure", "mystery", "laugh", "cry", "thrill", "dream", "rewatch", "conversation",
].map((theme) => `${setting} ${theme}`));

function randomMoodOptions(coreMoods = [], randomValues = null, count = 6) {
  const pool = moodReserve.filter((mood) => !coreMoods.includes(mood));
  const result = [];
  for (let index = 0; index < Math.min(count, pool.length); index += 1) {
    const random = randomValues?.[index] ?? Math.random();
    const selectedIndex = Math.min(pool.length - 1, Math.floor(random * pool.length));
    result.push(pool.splice(selectedIndex, 1)[0]);
  }
  return result;
}

function hasIndiaAvailability(movie = {}) {
  const providers = movie["watch/providers"]?.results?.IN;
  return Boolean(providers && [providers.flatrate, providers.free, providers.ads, providers.rent, providers.buy].some((list) => list?.length));
}

if (typeof module !== "undefined") module.exports = { featuredMovie, moodLabels, shouldRenderFeatured, nextCarouselIndex, expandedMoodOptions, hasIndiaAvailability, moodReserve, randomMoodOptions };
