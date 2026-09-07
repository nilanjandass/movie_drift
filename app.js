const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const CACHE_TTL = 1000 * 60 * 20;
const WATCHLIST_KEY = "movie-drift-watchlist";
const API_KEY_STORAGE = "movie-drift-tmdb-key";
const PREFS_KEY = "movie-drift-preferences";

const FALLBACK_GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10749, name: "Romance" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Documentary" },
];

const FALLBACK_MOVIES = [
  {
    id: 950387,
    title: "Aether City",
    release_date: "2026-07-03",
    vote_average: 7.8,
    vote_count: 1324,
    popularity: 88,
    original_language: "en",
    genre_ids: [878, 53],
    overview: "A signal from a floating city pulls a restless engineer into a mystery that rewrites the skyline every midnight.",
    poster_path: null,
    backdrop_path: null,
  },
  {
    id: 950388,
    title: "The Last Laugh Track",
    release_date: "2026-06-28",
    vote_average: 7.1,
    vote_count: 824,
    popularity: 72,
    original_language: "en",
    genre_ids: [35, 18],
    overview: "A retired sitcom writer returns to a live studio audience and discovers one more joke can change three lives.",
    poster_path: null,
    backdrop_path: null,
  },
  {
    id: 950389,
    title: "Monsoon Glass",
    release_date: "2026-06-20",
    vote_average: 8.2,
    vote_count: 1802,
    popularity: 94,
    original_language: "hi",
    genre_ids: [18, 10749],
    overview: "Two architects designing a flood memorial find their unfinished plans becoming a map back to each other.",
    poster_path: null,
    backdrop_path: null,
  },
  {
    id: 950390,
    title: "Blackout Orchard",
    release_date: "2026-06-14",
    vote_average: 6.9,
    vote_count: 619,
    popularity: 65,
    original_language: "ko",
    genre_ids: [27, 53],
    overview: "When a rural town loses power for seven nights, the old orchard starts returning everyone it once took.",
    poster_path: null,
    backdrop_path: null,
  },
  {
    id: 950391,
    title: "Saltwater Saints",
    release_date: "2026-06-06",
    vote_average: 7.5,
    vote_count: 1011,
    popularity: 81,
    original_language: "es",
    genre_ids: [28, 18],
    overview: "A rescue diver and a disgraced captain race a cartel storm to retrieve a sunken ledger off the Yucatan coast.",
    poster_path: null,
    backdrop_path: null,
  },
  {
    id: 950392,
    title: "Paper Moons",
    release_date: "2026-05-30",
    vote_average: 7.3,
    vote_count: 906,
    popularity: 70,
    original_language: "ja",
    genre_ids: [16, 878],
    overview: "A hand-drawn moon escapes from a child's notebook and guides a quiet city through one impossible evening.",
    poster_path: null,
    backdrop_path: null,
  },
];

const FALLBACK_DETAILS = {
  runtime: 122,
  status: "Released",
  budget: 68000000,
  revenue: 213000000,
  tagline: "Some nights move the whole sky.",
  production_companies: [{ name: "Northstar Pictures" }, { name: "Glassline Studios" }],
  videos: {
    results: [
      { key: "dQw4w9WgXcQ", site: "YouTube", type: "Trailer", name: "Official Trailer" },
      { key: "ysz5S6PUM-U", site: "YouTube", type: "Teaser", name: "First Look" },
    ],
  },
  images: {
    backdrops: [{ file_path: null }, { file_path: null }, { file_path: null }],
    posters: [{ file_path: null }, { file_path: null }],
  },
  "watch/providers": {
    results: {
      IN: {
        flatrate: [{ provider_name: "Netflix" }, { provider_name: "Amazon Prime Video" }, { provider_name: "JioHotstar" }, { provider_name: "ZEE5" }, { provider_name: "Hoichoi" }, { provider_name: "SonyLIV" }],
        rent: [{ provider_name: "Apple TV" }, { provider_name: "Google Play Movies" }],
        buy: [{ provider_name: "Google Play Movies" }],
      },
    },
  },
  credits: {
    crew: [
      { id: 7001, job: "Director", name: "Mira Solenne", profile_path: null },
      { id: 7002, job: "Screenplay", name: "Theo Vance", profile_path: null },
    ],
    cast: [
      { id: 7003, name: "Anika Rao", character: "Dr. Nia Vale", profile_path: null },
      { id: 7004, name: "Jon Bell", character: "Cal Mercer", profile_path: null },
      { id: 7005, name: "Sofia Tan", character: "Mara", profile_path: null },
      { id: 7006, name: "Luis Ortega", character: "Captain Ives", profile_path: null },
      { id: 7007, name: "Kim Seo-jun", character: "Jun Park", profile_path: null },
      { id: 7008, name: "Amara Blake", character: "Eden", profile_path: null },
      { id: 7009, name: "Nolan Price", character: "Hale", profile_path: null },
      { id: 7010, name: "Maya Ferris", character: "Lio", profile_path: null },
    ],
  },
};

const FALLBACK_PEOPLE = {
  7001: {
    id: 7001,
    name: "Mira Solenne",
    known_for_department: "Directing",
    biography: "Mira Solenne is a genre filmmaker known for elegant science fiction, restrained suspense, and human-scale stories inside big ideas.",
    birthday: "1982-04-18",
    place_of_birth: "Mumbai, India",
    profile_path: null,
    combined_credits: { cast: [], crew: FALLBACK_MOVIES.map((movie) => ({ ...movie, job: "Director", media_type: "movie" })) },
  },
  7002: {
    id: 7002,
    name: "Theo Vance",
    known_for_department: "Writing",
    biography: "Theo Vance writes character-driven genre films with a taste for mysteries, memory, and impossible architecture.",
    birthday: "1979-11-02",
    place_of_birth: "London, England",
    profile_path: null,
    combined_credits: { cast: [], crew: FALLBACK_MOVIES.slice(0, 4).map((movie) => ({ ...movie, job: "Screenplay", media_type: "movie" })) },
  },
};

const LANGUAGES = [
  ["", "Any language"],
  ["en", "English"],
  ["hi", "Hindi"],
  ["ta", "Tamil"],
  ["te", "Telugu"],
  ["ml", "Malayalam"],
  ["kn", "Kannada"],
  ["bn", "Bengali"],
  ["mr", "Marathi"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["de", "German"],
  ["it", "Italian"],
  ["pt", "Portuguese"],
];

const SORT_OPTIONS = [
  ["primary_release_date.desc", "Newest release"],
  ["primary_release_date.asc", "Oldest release"],
  ["vote_average.desc", "Highest rated"],
  ["popularity.desc", "Most popular"],
  ["original_title.asc", "Title A-Z"],
];

const WATCH_STATUSES = [
  ["want", "Want to Watch"],
  ["watching", "Watching"],
  ["watched", "Watched"],
];

const MAJOR_INDIA_PARTNERS = ["Amazon Prime Video", "Netflix", "JioHotstar", "ZEE5", "Hoichoi", "SonyLIV", "Apple TV", "Google Play Movies", "MUBI", "Sun Nxt", "aha"];

const state = {
  route: "home",
  movieId: null,
  personId: null,
  apiKey: localStorage.getItem(API_KEY_STORAGE) || "",
  genres: FALLBACK_GENRES,
  prefs: readPreferences(),
  filters: {
    language: "",
    genre: "",
    fromYear: "",
    toYear: "",
    minRating: "",
    sortBy: "primary_release_date.desc",
    query: "",
    indiaAvailable: false,
  },
  page: 1,
  totalPages: 1,
  loading: false,
  movies: [],
  observer: null,
  searchTimer: null,
  featureSlides: [],
  featuredIndex: 0,
  featureTimer: null,
  generatedMoods: [],
  watchlist: readWatchlist(),
};

state.filters.language = state.prefs.language;
state.filters.minRating = state.prefs.minRating;
state.filters.sortBy = normalizeSort(state.prefs.sortBy);

const app = document.querySelector("#app");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsButton = document.querySelector("#settingsButton");
const apiKeyInput = document.querySelector("#apiKeyInput");
const saveApiKeyButton = document.querySelector("#saveApiKeyButton");
const prefLanguageSelect = document.querySelector("#prefLanguageSelect");
const prefRatingInput = document.querySelector("#prefRatingInput");
const prefSortSelect = document.querySelector("#prefSortSelect");
const quickLookDialog = document.querySelector("#quickLookDialog");
const quickLookContent = document.querySelector("#quickLookContent");

settingsButton.addEventListener("click", () => {
  apiKeyInput.value = state.apiKey;
  renderPreferenceControls();
  settingsDialog.showModal();
});

saveApiKeyButton.addEventListener("click", (event) => {
  event.preventDefault();
  state.apiKey = apiKeyInput.value.trim();
  if (state.apiKey) {
    localStorage.setItem(API_KEY_STORAGE, state.apiKey);
  } else {
    localStorage.removeItem(API_KEY_STORAGE);
  }
  if (prefLanguageSelect && prefRatingInput && prefSortSelect) {
    state.prefs = {
      language: prefLanguageSelect.value,
      minRating: prefRatingInput.value,
      sortBy: normalizeSort(prefSortSelect.value),
    };
    localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
    state.filters.language = state.prefs.language;
    state.filters.minRating = state.prefs.minRating;
    state.filters.sortBy = state.prefs.sortBy;
  }
  settingsDialog.close();
  refreshHome();
});

window.addEventListener("hashchange", route);
route();

function route() {
  const hash = window.location.hash || "#/";
  const detailMatch = hash.match(/^#\/movie\/(\d+)/);
  const personMatch = hash.match(/^#\/person\/(\d+)/);

  if (hash !== "#/") clearInterval(state.featureTimer);

  if (detailMatch) {
    state.route = "detail";
    state.movieId = Number(detailMatch[1]);
    setActiveNav("");
    renderDetail(state.movieId);
    return;
  }

  if (personMatch) {
    state.route = "person";
    state.personId = Number(personMatch[1]);
    setActiveNav("");
    renderPerson(state.personId);
    return;
  }

  if (hash === "#/watchlist") {
    state.route = "watchlist";
    setActiveNav("watchlist");
    renderWatchlist();
    return;
  }

  state.route = "home";
  state.movieId = null;
  state.personId = null;
  setActiveNav("home");
  renderHome();
}

function setActiveNav(routeName) {
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.routeLink === routeName);
  });
}

function renderPreferenceControls() {
  if (!prefLanguageSelect || !prefRatingInput || !prefSortSelect) return;
  prefLanguageSelect.innerHTML = LANGUAGES.map(([value, label]) => `<option value="${value}" ${state.prefs.language === value ? "selected" : ""}>${label}</option>`).join("");
  prefSortSelect.innerHTML = SORT_OPTIONS.map(([value, label]) => `<option value="${value}" ${normalizeSort(state.prefs.sortBy) === value ? "selected" : ""}>${label}</option>`).join("");
  prefRatingInput.value = state.prefs.minRating;
}

async function renderHome() {
  disconnectObserver();
  app.innerHTML = `
    <section class="cinema-stage" id="featuredSpotlight">
      <div class="feature-copy">
        <p class="eyebrow">Tonight's pick</p>
        <h1>Finding a film worth your evening.</h1>
        <p class="hero-copy">Loading a considered pick from the latest releases.</p>
      </div>
    </section>
    <section class="search-panel">
      <label class="field search-field">
        <span>Search movies</span>
        <input id="movieSearchInput" type="search" placeholder="Search by title" value="${escapeHtml(state.filters.query)}" autocomplete="off" />
      </label>
      <div id="searchSuggestions" class="suggestions is-hidden"></div>
    </section>
    <section class="program-section is-hidden" id="discoveryRails"></section>
    <section class="how-to-panel"><p class="eyebrow">Live data</p><h2>How to connect TMDb</h2><ol><li>Open <a class="inline-link" href="https://www.themoviedb.org/settings/api" target="_blank" rel="noreferrer">TMDb API settings</a> and sign in or create a free account.</li><li>Request an API key from the API section and complete the short form.</li><li>Copy the API key, open the settings button above, paste it, and select Save key.</li></ol></section>
    <section class="program-section mood-program">
      <div class="section-heading"><h2>Pick by mood</h2><span>Filters chronological discovery</span></div>
      <div class="mood-rail" id="moodRail"></div><button class="ghost-button mood-more" id="moreMoodButton" type="button">New moods</button>
    </section>
    <section>
      <div class="toolbar">
        <h2>${state.filters.query ? "Search results" : "Chronological discovery"}</h2>
        <button class="filter-toggle" id="filterToggle">Filters</button>
      </div>
      <form class="filters" id="filtersForm">
        ${renderFilters()}
      </form>
      <div class="movie-grid" id="movieGrid"></div>
      <div class="loader" id="loader">Loading movies...</div>
      <div class="sentinel" id="sentinel"></div>
    </section>
  `;

  wireSearch();
  wireFilters();
  wireMoodRail();
  await loadGenres();
  updateGenreFilter();
  await refreshHome();
}

function renderFilters() {
  const year = new Date().getFullYear();
  return `
    <label class="field">
      <span>Language</span>
      <select name="language">
        ${LANGUAGES.map(([value, label]) => `<option value="${value}" ${state.filters.language === value ? "selected" : ""}>${label}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span>Genre</span>
      <select name="genre" id="genreSelect">
        <option value="">Any genre</option>
        ${state.genres.map((genre) => `<option value="${genre.id}" ${String(state.filters.genre) === String(genre.id) ? "selected" : ""}>${genre.name}</option>`).join("")}
      </select>
    </label>
    <label class="field">
      <span>From year</span>
      <input name="fromYear" type="number" min="1900" max="${year + 1}" value="${state.filters.fromYear}" placeholder="2000" />
    </label>
    <label class="field">
      <span>To year</span>
      <input name="toYear" type="number" min="1900" max="${year + 1}" value="${state.filters.toYear}" placeholder="${year}" />
    </label>
    <label class="field">
      <span>Min rating</span>
      <input name="minRating" type="number" min="0" max="10" step="0.5" value="${state.filters.minRating}" placeholder="7.0" />
    </label>
    <label class="field">
      <span>Sort by</span>
      <select name="sortBy">
        ${SORT_OPTIONS.map(([value, label]) => `<option value="${value}" ${state.filters.sortBy === value ? "selected" : ""}>${label}</option>`).join("")}
      </select>
    </label>
    <label class="availability-filter"><input name="indiaAvailable" type="checkbox" ${state.filters.indiaAvailable ? "checked" : ""} /><span>Available in India</span></label>
    <button class="clear-button" type="button" id="clearFilters">Clear</button>
  `;
}

function wireSearch() {
  const input = document.querySelector("#movieSearchInput");
  const suggestions = document.querySelector("#searchSuggestions");
  if (!input || !suggestions) return;

  input.addEventListener("input", () => {
    state.filters.query = input.value.trim();
    clearTimeout(state.searchTimer);
    state.searchTimer = setTimeout(async () => {
      await renderSuggestions(state.filters.query, suggestions);
      refreshHome();
    }, 320);
  });

  input.addEventListener("focus", async () => {
    if (input.value.trim()) await renderSuggestions(input.value.trim(), suggestions);
  });
}

async function renderSuggestions(query, target) {
  if (!query) {
    target.classList.add("is-hidden");
    target.innerHTML = "";
    return;
  }

  const results = await fetchSearchSuggestions(query);
  if (!results.length) {
    target.classList.add("is-hidden");
    target.innerHTML = "";
    return;
  }

  target.innerHTML = results.slice(0, 6).map((movie) => `
    <button class="suggestion" type="button" data-movie-id="${movie.id}">
      <img src="${posterUrl(movie.poster_path, "w185", movie.title)}" alt="" />
      <span><strong>${escapeHtml(movie.title || "Untitled")}</strong><small>${formatYear(movie.release_date)} | ${Number(movie.vote_average || 0).toFixed(1)} / 10</small></span>
    </button>
  `).join("");
  target.classList.remove("is-hidden");
  target.querySelectorAll("[data-movie-id]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = `#/movie/${button.dataset.movieId}`;
    });
  });
}

async function fetchSearchSuggestions(query) {
  if (!state.apiKey) {
    return FALLBACK_MOVIES.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
  }
  const params = new URLSearchParams({ api_key: state.apiKey, query, include_adult: "false", page: "1" });
  const data = await cachedFetch(`${TMDB_BASE_URL}/search/movie?${params}`, `search:${params}`);
  return data.results || [];
}

function wireFilters() {
  const form = document.querySelector("#filtersForm");
  const toggle = document.querySelector("#filterToggle");
  const clear = document.querySelector("#clearFilters");

  toggle.addEventListener("click", () => form.classList.toggle("is-hidden"));
  form.addEventListener("input", debounce(() => {
    const data = new FormData(form);
    state.filters = {
      ...state.filters,
      language: data.get("language") || "",
      genre: data.get("genre") || "",
      fromYear: data.get("fromYear") || "",
      toYear: data.get("toYear") || "",
      minRating: data.get("minRating") || "",
      sortBy: normalizeSort(data.get("sortBy")),
      indiaAvailable: data.get("indiaAvailable") === "on",
    };
    savePreferencesFromFilters();
    refreshHome();
  }, 250));

  clear.addEventListener("click", () => {
    state.filters = { language: "", genre: "", fromYear: "", toYear: "", minRating: "", sortBy: "primary_release_date.desc", query: state.filters.query, indiaAvailable: false };
    savePreferencesFromFilters();
    form.innerHTML = renderFilters();
    wireFilters();
    refreshHome();
  });
}

function updateGenreFilter() {
  const select = document.querySelector("#genreSelect");
  if (!select) return;
  select.innerHTML = `<option value="">Any genre</option>${state.genres.map((genre) => `<option value="${genre.id}" ${String(state.filters.genre) === String(genre.id) ? "selected" : ""}>${genre.name}</option>`).join("")}`;
}

async function refreshHome() {
  if (state.route !== "home") return;
  state.page = 1;
  state.totalPages = 1;
  state.movies = [];
  const grid = document.querySelector("#movieGrid");
  grid.innerHTML = renderSkeletons();
  await loadNextPage();
  setupInfiniteScroll();
}

async function loadNextPage() {
  if (state.loading || state.page > state.totalPages) return;
  const requestedPage = state.page;
  state.loading = true;
  updateLoader("Loading movies...");

  try {
    const data = await fetchMovies(requestedPage);
    state.totalPages = Math.min(data.total_pages || 1, 500);
    const normalized = data.results || [];
    state.movies = state.movies.concat(normalized);
    const grid = document.querySelector("#movieGrid");
    if (requestedPage === 1) grid.innerHTML = "";
    renderMovieBatch(normalized, grid);
    if (shouldRenderFeatured({ requestedPage, query: state.filters.query })) {
      renderFeaturedSpotlight(state.movies);
      renderDiscoveryRails(state.movies);
    }
    if (state.page === requestedPage) state.page = requestedPage + 1;
    updateLoader(state.page > state.totalPages ? "You reached the end." : "");
  } catch (error) {
    console.error(error);
    updateLoader("Could not load more movies. Check the API key or try again.");
  } finally {
    state.loading = false;
  }
}

async function fetchMovies(page) {
  if (!state.apiKey) return filterFallbackMovies(page);

  if (state.filters.query) {
    const params = new URLSearchParams({
      api_key: state.apiKey,
      page,
      query: state.filters.query,
      include_adult: "false",
    });
    const data = await cachedFetch(`${TMDB_BASE_URL}/search/movie?${params}`, `movie-search:${params}`);
    return { ...data, results: filterAndSortMovies(data.results || []) };
  }

  const params = new URLSearchParams({
    api_key: state.apiKey,
    page,
    sort_by: state.filters.sortBy,
    include_adult: "false",
    "vote_count.gte": "10",
  });

  if (state.filters.language) params.set("with_original_language", state.filters.language);
  if (state.filters.genre) params.set("with_genres", state.filters.genre);
  if (state.filters.fromYear) params.set("primary_release_date.gte", `${state.filters.fromYear}-01-01`);
  if (state.filters.toYear) params.set("primary_release_date.lte", `${state.filters.toYear}-12-31`);
  if (state.filters.minRating) params.set("vote_average.gte", state.filters.minRating);
  if (state.filters.indiaAvailable) {
    params.set("watch_region", "IN");
    params.set("with_watch_monetization_types", "flatrate|free|ads|rent|buy");
  }

  return cachedFetch(`${TMDB_BASE_URL}/discover/movie?${params}`, `discover:${params}`);
}

function filterFallbackMovies(page) {
  const pageSize = 6;
  const source = state.filters.query
    ? FALLBACK_MOVIES.filter((movie) => movie.title.toLowerCase().includes(state.filters.query.toLowerCase()))
    : FALLBACK_MOVIES;
  const movies = filterAndSortMovies(source);
  const start = (page - 1) * pageSize;
  return {
    results: movies.slice(start, start + pageSize),
    page,
    total_pages: Math.max(1, Math.ceil(movies.length / pageSize)),
  };
}

function filterAndSortMovies(source) {
  let movies = [...source];

  if (state.filters.language) movies = movies.filter((movie) => movie.original_language === state.filters.language);
  if (state.filters.genre) movies = movies.filter((movie) => (movie.genre_ids || []).includes(Number(state.filters.genre)));
  if (state.filters.fromYear) movies = movies.filter((movie) => Number((movie.release_date || "0").slice(0, 4)) >= Number(state.filters.fromYear));
  if (state.filters.toYear) movies = movies.filter((movie) => Number((movie.release_date || "9999").slice(0, 4)) <= Number(state.filters.toYear));
  if (state.filters.minRating) movies = movies.filter((movie) => Number(movie.vote_average || 0) >= Number(state.filters.minRating));
  if (state.filters.indiaAvailable) movies = movies.filter((movie) => movie.india_available !== false);

  const sort = state.filters.sortBy;
  movies.sort((a, b) => {
    if (sort === "primary_release_date.asc") return (a.release_date || "").localeCompare(b.release_date || "");
    if (sort === "vote_average.desc") return Number(b.vote_average || 0) - Number(a.vote_average || 0);
    if (sort === "popularity.desc") return Number(b.popularity || 0) - Number(a.popularity || 0);
    if (sort === "original_title.asc" || sort === "title.asc") return (a.title || "").localeCompare(b.title || "");
    return (b.release_date || "").localeCompare(a.release_date || "");
  });
  return movies;
}

function renderMovieBatch(movies, target) {
  if (!target) return;
  if (state.page === 1 && movies.length === 0) {
    target.innerHTML = `<div class="empty-state"><div><h2>No movies match those filters.</h2><p class="muted">Try a wider search, year range, or lower rating threshold.</p></div></div>`;
    return;
  }

  const template = document.querySelector("#movieCardTemplate");
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const poster = card.querySelector(".poster");
    const title = card.querySelector(".movie-title");
    const posterButton = card.querySelector(".poster-button");
    const watchToggle = card.querySelector(".watch-toggle");
    const score = card.querySelector(".card-score");

    poster.src = posterUrl(movie.poster_path, "w500", movie.title);
    poster.alt = `${movie.title || "Movie"} poster`;
    title.textContent = movie.title || movie.name || "Untitled";
    card.querySelector(".movie-meta").innerHTML = movieMeta(movie);
    card.querySelector(".movie-overview").textContent = movie.overview || "No synopsis is available yet.";
    score.style.setProperty("--score", Math.min(10, Math.max(0, Number(movie.vote_average || 0))));
    score.querySelector(".score-value").textContent = Number(movie.vote_average || 0).toFixed(1);

    const openMovie = () => {
      window.location.hash = `#/movie/${movie.id}`;
    };
    title.addEventListener("click", openMovie);
    posterButton.addEventListener("click", openMovie);
    card.addEventListener("mouseenter", () => card.classList.add("is-previewed"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-previewed"));
    paintWatchButton(watchToggle, movie.id);
    watchToggle.addEventListener("click", () => toggleWatchlist(movie, watchToggle));

    fragment.appendChild(card);
  });

  target.appendChild(fragment);
}

function renderSkeletons(count = 6) {
  return Array.from({ length: count }, () => `<div class="skeleton-card" aria-hidden="true"></div>`).join("");
}

function renderFeaturedSpotlight(movies) {
  state.featureSlides = featuredSlidesByGenre(movies);
  state.featuredIndex = 0;
  clearInterval(state.featureTimer);
  paintFeaturedSlide();
  state.featureTimer = setInterval(() => moveFeaturedSlide(1), 10000);
}

function featuredSlidesByGenre(movies) {
  const slides = [];
  const usedGenres = new Set();
  [...movies].sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0)).forEach((movie) => {
    const genre = (movie.genre_ids || []).find((id) => !usedGenres.has(id));
    if (genre) {
      usedGenres.add(genre);
      slides.push(movie);
    }
  });
  return slides.length ? slides : [featuredMovie(movies)].filter(Boolean);
}

function paintFeaturedSlide() {
  const target = document.querySelector("#featuredSpotlight");
  const movie = state.featureSlides[state.featuredIndex];
  if (!target || !movie) return;
  target.style.setProperty("--featured-image", `url("${posterUrl(movie.backdrop_path || movie.poster_path, "w1280", movie.title)}")`);
  target.innerHTML = `
    <div class="feature-copy">
      <p class="eyebrow">Tonight's pick · ${escapeHtml(genreNames(movie.genre_ids) || "Featured")}</p>
      <h1>${escapeHtml(movie.title || "Untitled")}</h1>
      <div class="detail-meta"><span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>${formatRuntime(movie.runtime || 122)}</span><span>${formatYear(movie.release_date)}</span></div>
      <p class="hero-copy">${escapeHtml(movie.overview || "A standout from the latest releases.")}</p>
      <div class="pill-row">${moodLabels(movie, state.genres).map((label) => `<span class="pill">${label}</span>`).join("")}</div>
      <div class="feature-actions"><button class="primary-button" id="featureDetailsButton">View film</button><button class="ghost-button" id="featureQuickLookButton">Quick look</button></div>
    </div>
    <div class="feature-navigation"><div class="feature-dots">${state.featureSlides.map((_, index) => `<button type="button" class="${index === state.featuredIndex ? "is-active" : ""}" data-slide-to="${index}" aria-label="Show pick ${index + 1}"></button>`).join("")}</div></div>
  `;
  document.querySelector("#featureDetailsButton").addEventListener("click", () => { window.location.hash = `#/movie/${movie.id}`; });
  document.querySelector("#featureQuickLookButton").addEventListener("click", () => showQuickLook(movie));
  target.querySelectorAll("[data-slide-to]").forEach((button) => button.addEventListener("click", () => { state.featuredIndex = Number(button.dataset.slideTo); paintFeaturedSlide(); }));
}

function moveFeaturedSlide(direction) {
  state.featuredIndex = nextCarouselIndex(state.featuredIndex, direction, state.featureSlides.length);
  paintFeaturedSlide();
}

function wireMoodRail() {
  const target = document.querySelector("#moodRail");
  if (!target) return;
  const coreMoods = ["All picks"];
  if (!state.generatedMoods.length) state.generatedMoods = randomMoodOptions(coreMoods, null, 5);
  const moods = [...coreMoods, ...state.generatedMoods];
  target.innerHTML = moods.map((mood, index) => `<button class="mood-chip ${index === 0 ? "is-active" : ""}" type="button" data-mood="${mood}">${mood}</button>`).join("");
  target.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood]");
    if (!button) return;
    target.querySelectorAll(".mood-chip").forEach((chip) => chip.classList.toggle("is-active", chip === button));
    renderChronologicalMood(button.dataset.mood);
  });
  document.querySelector("#moreMoodButton")?.addEventListener("click", () => {
    state.generatedMoods = randomMoodOptions(coreMoods, null, 5);
    wireMoodRail();
  });
}

function renderChronologicalMood(mood) {
  const grid = document.querySelector("#movieGrid");
  if (!grid) return;
  const movies = filterByMood(state.movies, mood);
  grid.innerHTML = "";
  if (!movies.length) {
    grid.innerHTML = `<div class="empty-state"><div><h2>No movies match this mood.</h2><p class="muted">Try a new set of moods or return to all picks.</p></div></div>`;
    return;
  }
  renderMovieBatch(movies, grid);
}

function filterByMood(movies, mood) {
  if (!mood || mood === "All picks") return movies;
  const extras = {
    "Date night": (movie) => moodLabels(movie, state.genres).includes("Feel-good"),
    "Weekend adventure": (movie) => (movie.genre_ids || []).some((id) => [28, 12, 878].includes(id)),
    "Hidden gem": (movie) => Number(movie.vote_average || 0) >= 7 && Number(movie.popularity || 0) < 50,
    "Late night": (movie) => moodLabels(movie, state.genres).some((label) => ["Edge of your seat", "Mind-bending"].includes(label)),
    "Under two hours": (movie) => Number(movie.runtime || 110) < 120,
    "International pick": (movie) => movie.original_language && movie.original_language !== "en",
  };
  if (extras[mood]) return movies.filter(extras[mood]);
  if (moodReserve.includes(mood)) return movies.filter((movie) => matchesGeneratedMood(movie, mood));
  return movies.filter((movie) => moodLabels(movie, state.genres).includes(mood));
}

function matchesGeneratedMood(movie, mood) {
  const label = mood.toLowerCase();
  if (label.includes("romance")) return (movie.genre_ids || []).includes(10749);
  if (label.includes("adventure")) return (movie.genre_ids || []).some((id) => [28, 12, 878].includes(id));
  if (label.includes("mystery") || label.includes("thrill")) return moodLabels(movie, state.genres).some((tag) => ["Mind-bending", "Edge of your seat"].includes(tag));
  if (label.includes("laugh")) return (movie.genre_ids || []).includes(35);
  if (label.includes("cry")) return (movie.genre_ids || []).includes(18);
  if (label.includes("dream")) return (movie.genre_ids || []).some((id) => [878, 16].includes(id));
  return Number(movie.popularity || 0) > 0;
}

function renderDiscoveryRails(movies) {
  const target = document.querySelector("#discoveryRails");
  if (!target) return;
  const entries = [
    ["Trending now", fillRail([...movies].sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0)))],
    ["Critically acclaimed", fillRail([...movies].filter((movie) => Number(movie.vote_average || 0) >= 7.5))],
    ["New in India", fillRail([...movies].filter((movie) => ["hi", "ta", "te", "ml", "kn", "bn", "mr"].includes(movie.original_language)))],
  ].filter(([, list]) => list.length);
  if (!entries.length) {
    target.classList.add("is-hidden");
    return;
  }
  target.classList.remove("is-hidden");
  target.innerHTML = entries.map(([title, list]) => `
    <div class="program-section">
      <div class="section-heading"><h2>${title}</h2><span>Browse the shelf</span></div>
      <div class="rail-shell"><button class="rail-arrow rail-arrow-left" type="button" aria-label="Scroll ${title} left">‹</button><div class="film-rail">${list.slice(0, 20).map((movie) => `<button class="rail-movie" type="button" data-rail-movie="${movie.id}"><img src="${posterUrl(movie.poster_path, "w342", movie.title)}" alt="${escapeHtml(movie.title || "Movie")} poster" loading="lazy" /><span>${escapeHtml(movie.title || "Untitled")}</span></button>`).join("")}</div><button class="rail-arrow rail-arrow-right" type="button" aria-label="Scroll ${title} right">›</button></div>
    </div>
  `).join("");
  target.querySelectorAll("[data-rail-movie]").forEach((button) => button.addEventListener("click", () => { window.location.hash = `#/movie/${button.dataset.railMovie}`; }));
  target.querySelectorAll(".rail-shell").forEach((shell) => {
    const rail = shell.querySelector(".film-rail");
    shell.querySelector(".rail-arrow-left").addEventListener("click", () => rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: "smooth" }));
    shell.querySelector(".rail-arrow-right").addEventListener("click", () => rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: "smooth" }));
  });
}

function fillRail(movies) {
  const seen = new Set();
  return movies.filter((movie) => {
    if (!movie?.id || seen.has(movie.id)) return false;
    seen.add(movie.id);
    return true;
  });
}

function showQuickLook(movie) {
  if (!quickLookDialog || !quickLookContent) return;
  quickLookContent.innerHTML = `
    <button class="icon-button quick-close" type="button" aria-label="Close quick look" title="Close">×</button>
    <img src="${posterUrl(movie.poster_path, "w500", movie.title)}" alt="${escapeHtml(movie.title || "Movie")} poster" />
    <div>
      <p class="eyebrow">Quick look</p>
      <h2 id="quickLookTitle">${escapeHtml(movie.title || "Untitled")}</h2>
      <div class="detail-meta"><span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>${formatYear(movie.release_date)}</span><span>${(movie.original_language || "").toUpperCase()}</span></div>
      <div class="pill-row">${moodLabels(movie, state.genres).map((label) => `<span class="pill">${label}</span>`).join("")}</div>
      <div class="detail-actions"><button class="primary-button" id="quickLookDetails">View film</button></div>
    </div>
    <p class="muted quick-overview">${escapeHtml(movie.overview || "No synopsis is available yet.")}</p>
  `;
  quickLookContent.querySelector(".quick-close").addEventListener("click", () => quickLookDialog.close());
  quickLookContent.querySelector("#quickLookDetails").addEventListener("click", () => {
    quickLookDialog.close();
    window.location.hash = `#/movie/${movie.id}`;
  });
  quickLookDialog.showModal();
}

function movieMeta(movie) {
  const release = formatDate(movie.release_date);
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const language = (movie.original_language || "").toUpperCase();
  return `<span>${release}</span><span>${rating} / 10</span><span>${language}</span>`;
}

async function renderDetail(movieId) {
  disconnectObserver();
  app.innerHTML = `<div class="loader">Loading movie details...</div>`;

  try {
    const movie = await fetchMovieDetail(movieId);
    const directors = (movie.credits?.crew || []).filter((person) => person.job === "Director");
    const writers = (movie.credits?.crew || []).filter((person) => ["Writer", "Screenplay", "Story"].includes(person.job));
    const cast = movie.credits?.cast || [];
    const companies = (movie.production_companies || []).map((company) => company.name).join(", ") || "Not listed";
    const genres = (movie.genres || []).map((genre) => genre.name).join(", ") || genreNames(movie.genre_ids);
    const videos = movie.videos?.results || [];
    const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer") || videos.find((video) => video.site === "YouTube");
    const providers = movie["watch/providers"]?.results?.IN || {};
    const saved = state.watchlist[movie.id];

    app.innerHTML = `
      <section class="detail-hero">
        <img class="detail-poster" src="${posterUrl(movie.poster_path, "w780", movie.title)}" alt="${escapeHtml(movie.title || "Movie")} poster" />
        <div>
          <p class="eyebrow">${formatDate(movie.release_date)}</p>
          <h1>${escapeHtml(movie.title || "Untitled")}</h1>
          <div class="detail-meta">
            <span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span>
            <span>${movie.vote_count || 0} votes</span>
            <span>${formatRuntime(movie.runtime)}</span>
            <span>${(movie.original_language || "").toUpperCase()}</span>
          </div>
          <div class="detail-actions">
            <select class="status-select" id="detailStatusSelect" aria-label="Watch status">
              <option value="">Not saved</option>
              ${WATCH_STATUSES.map(([value, label]) => `<option value="${value}" ${saved?.status === value ? "selected" : ""}>${label}</option>`).join("")}
            </select>
            <a class="ghost-button" href="#/">Back to discovery</a>
          </div>
          <p class="hero-copy">${escapeHtml(movie.overview || "No synopsis is available yet.")}</p>
        </div>
      </section>
      <section class="details-layout">
        <div class="detail-stack">
          ${renderTrailerPanel(trailer, videos)}
          <div class="detail-panel">
            <h2>Full cast</h2>
            <div class="cast-grid">
              ${cast.length ? cast.map((person) => renderPersonCard(person, person.character || "Role not listed")).join("") : `<p class="muted">Cast information is not available.</p>`}
            </div>
          </div>
        </div>
        <aside class="detail-stack">
          ${renderProvidersPanel(providers)}
          <div class="detail-panel">
            <h2>Metadata</h2>
            <dl class="facts">
              <div class="fact"><dt>Director</dt><dd>${renderPeopleLinks(directors)}</dd></div>
              <div class="fact"><dt>Writer</dt><dd>${renderPeopleLinks(writers)}</dd></div>
              <div class="fact"><dt>Genre</dt><dd>${escapeHtml(genres || "Not listed")}</dd></div>
              <div class="fact"><dt>Production</dt><dd>${escapeHtml(companies)}</dd></div>
              <div class="fact"><dt>Status</dt><dd>${escapeHtml(movie.status || "Not listed")}</dd></div>
              <div class="fact"><dt>Budget</dt><dd>${formatMoney(movie.budget)}</dd></div>
              <div class="fact"><dt>Revenue</dt><dd>${formatMoney(movie.revenue)}</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    `;

    document.querySelector("#detailStatusSelect").addEventListener("input", (event) => {
      setWatchStatus(movie, event.target.value);
    });
  } catch (error) {
    console.error(error);
    app.innerHTML = `<div class="empty-state"><div><h2>Details are unavailable.</h2><p class="muted">Check the TMDb key or return to discovery.</p><a class="primary-button" href="#/">Back to discovery</a></div></div>`;
  }
}

function renderTrailerPanel(trailer) {
  if (!trailer) {
    return `<div class="detail-panel"><h2>Trailers</h2><p class="muted">No trailers are available for this movie yet.</p></div>`;
  }
  return `
    <div class="detail-panel">
      <h2>Trailer</h2>
      <div class="video-frame">
        <iframe title="${escapeHtml(trailer.name || "Movie trailer")}" src="https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}?controls=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>
      </div>
      <p class="muted video-note">Use the player controls to play, pause, or enter fullscreen from the control bar on the right.</p>
    </div>
  `;
}

function renderProvidersPanel(providers) {
  const sections = [
    ["Stream", providers.flatrate],
    ["Rent", providers.rent],
    ["Buy", providers.buy],
  ].filter(([, list]) => list?.length);

  if (!sections.length) {
    return `<div class="detail-panel"><h2>Available in India</h2>${renderIndiaPartnerBoard(providers)}<p class="muted">No India streaming, rental, or purchase providers are listed by TMDb right now.</p></div>`;
  }

  return `
    <div class="detail-panel">
      <h2>Available in India</h2>
      ${renderIndiaPartnerBoard(providers)}
    </div>
  `;
}

function renderIndiaPartnerBoard(providers) {
  return `<div class="partner-board">${MAJOR_INDIA_PARTNERS.map((partner) => `<span class="partner-badge ${providerListed(partner, providers) ? "is-listed" : ""}">${escapeHtml(partner)}</span>`).join("")}</div>`;
}

function providerListed(partner, providers) {
  return [providers.flatrate, providers.rent, providers.buy, providers.free, providers.ads].flat().filter(Boolean).some((provider) => provider.provider_name.toLowerCase() === partner.toLowerCase());
}

function renderPersonCard(person, subtext) {
  return `
    <a class="cast-card person-card" href="#/person/${person.id || ""}">
      <img src="${profileUrl(person.profile_path, person.name)}" alt="" loading="lazy" />
      <span><strong>${escapeHtml(person.name)}</strong><small>${escapeHtml(subtext)}</small></span>
    </a>
  `;
}

function renderPeopleLinks(people) {
  if (!people.length) return "Not listed";
  return people.map((person) => person.id ? `<a class="inline-link" href="#/person/${person.id}">${escapeHtml(person.name)}</a>` : escapeHtml(person.name)).join(", ");
}

async function fetchMovieDetail(movieId) {
  const fallback = FALLBACK_MOVIES.find((movie) => movie.id === Number(movieId));
  if (!state.apiKey) {
    if (!fallback) throw new Error("Fallback detail not found");
    return { ...fallback, genres: FALLBACK_GENRES.filter((genre) => fallback.genre_ids.includes(genre.id)), ...FALLBACK_DETAILS };
  }

  const params = new URLSearchParams({
    api_key: state.apiKey,
    append_to_response: "credits,videos,watch/providers",
  });
  return cachedFetch(`${TMDB_BASE_URL}/movie/${movieId}?${params}`, `detail:${movieId}:${params}`);
}

async function renderPerson(personId) {
  disconnectObserver();
  app.innerHTML = `<div class="loader">Loading profile...</div>`;

  try {
    const person = await fetchPerson(personId);
    const credits = normalizePersonCredits(person).slice(0, 18);
    app.innerHTML = `
      <section class="detail-hero">
        <img class="detail-poster person-poster" src="${profileUrl(person.profile_path, person.name)}" alt="${escapeHtml(person.name)} profile" />
        <div>
          <p class="eyebrow">${escapeHtml(person.known_for_department || "Filmography")}</p>
          <h1>${escapeHtml(person.name || "Person")}</h1>
          <div class="detail-meta">
            <span>${formatDate(person.birthday)}</span>
            <span>${escapeHtml(person.place_of_birth || "Place not listed")}</span>
          </div>
          <div class="detail-actions">
            <a class="ghost-button" href="#/">Back to discovery</a>
          </div>
          <p class="hero-copy">${escapeHtml(person.biography || "No biography is available yet.")}</p>
        </div>
      </section>
      <section class="toolbar"><h2>Known for</h2></section>
      <section class="movie-grid" id="personCredits"></section>
    `;
    renderMovieBatch(credits, document.querySelector("#personCredits"));
  } catch (error) {
    console.error(error);
    app.innerHTML = `<div class="empty-state"><div><h2>Profile is unavailable.</h2><p class="muted">Check the TMDb key or return to discovery.</p><a class="primary-button" href="#/">Back to discovery</a></div></div>`;
  }
}

async function fetchPerson(personId) {
  if (!state.apiKey) {
    return FALLBACK_PEOPLE[personId] || {
      id: personId,
      name: "Cast Member",
      biography: "Preview profile data appears here when using sample mode. Add a TMDb key for real actor and director pages.",
      known_for_department: "Acting",
      profile_path: null,
      combined_credits: { cast: FALLBACK_MOVIES.map((movie) => ({ ...movie, character: "Featured role", media_type: "movie" })), crew: [] },
    };
  }
  const params = new URLSearchParams({ api_key: state.apiKey, append_to_response: "combined_credits" });
  return cachedFetch(`${TMDB_BASE_URL}/person/${personId}?${params}`, `person:${personId}:${params}`);
}

function normalizePersonCredits(person) {
  const credits = [...(person.combined_credits?.cast || []), ...(person.combined_credits?.crew || [])]
    .filter((credit) => credit.media_type === "movie" || credit.title)
    .map((credit) => ({
      id: credit.id,
      title: credit.title || credit.name,
      release_date: credit.release_date || credit.first_air_date,
      vote_average: credit.vote_average,
      vote_count: credit.vote_count,
      popularity: credit.popularity,
      original_language: credit.original_language,
      overview: credit.overview,
      poster_path: credit.poster_path,
      genre_ids: credit.genre_ids || [],
    }));
  const seen = new Set();
  return credits
    .filter((credit) => {
      if (seen.has(credit.id)) return false;
      seen.add(credit.id);
      return true;
    })
    .sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0));
}

function renderWatchlist() {
  disconnectObserver();
  const movies = Object.values(state.watchlist).sort((a, b) => (b.savedAt || "").localeCompare(a.savedAt || ""));
  const grouped = WATCH_STATUSES.map(([status, label]) => [status, label, movies.filter((movie) => movie.status === status)]);
  app.innerHTML = `
    <section class="hero-panel">
      <div>
        <p class="eyebrow">Personal queue</p>
        <h1>Your watchlist</h1>
        <p class="hero-copy">Movies grouped by Want to Watch, Watching, and Watched.</p>
      </div>
      <div class="status-card"><strong>${movies.length} saved</strong><p class="muted">Stored locally in this browser.</p></div>
    </section>
    <section id="watchlistGroups" class="watchlist-groups"></section>
  `;

  const root = document.querySelector("#watchlistGroups");
  if (!movies.length) {
    root.innerHTML = `<div class="empty-state"><div><h2>No saved movies yet.</h2><p class="muted">Add movies from discovery or a detail page.</p><a class="primary-button" href="#/">Browse movies</a></div></div>`;
    return;
  }

  root.innerHTML = grouped.map(([status, label, list]) => `
    <section>
      <div class="toolbar"><h2 class="watch-status-heading watch-status-${status}"><span aria-hidden="true">${statusSymbol(status)}</span>${label}</h2><span class="pill">${list.length}</span></div>
      <div class="movie-grid" data-watch-status="${label}"></div>
    </section>
  `).join("");

  grouped.forEach(([, label, list]) => {
    const grid = root.querySelector(`[data-watch-status="${label}"]`);
    if (list.length) {
      renderMovieBatch(list, grid);
    } else {
      grid.innerHTML = `<div class="empty-state compact-empty"><p class="muted">No movies here yet.</p></div>`;
    }
  });
}

async function loadGenres() {
  if (!state.apiKey) {
    state.genres = FALLBACK_GENRES;
    return;
  }
  try {
    const data = await cachedFetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${state.apiKey}`, "genres");
    state.genres = data.genres || FALLBACK_GENRES;
  } catch (error) {
    console.warn("Using fallback genres", error);
    state.genres = FALLBACK_GENRES;
  }
}

async function cachedFetch(url, key) {
  const storageKey = `movie-drift-cache:${key}`;
  const cached = localStorage.getItem(storageKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.createdAt < CACHE_TTL) return parsed.data;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`TMDb request failed: ${response.status}`);
  const data = await response.json();
  localStorage.setItem(storageKey, JSON.stringify({ createdAt: Date.now(), data }));
  return data;
}

function setupInfiniteScroll() {
  disconnectObserver();
  if (state.filters.query) return;
  const sentinel = document.querySelector("#sentinel");
  if (!sentinel) return;
  state.observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) loadNextPage();
  }, { rootMargin: "600px" });
  state.observer.observe(sentinel);
}

function disconnectObserver() {
  if (state.observer) state.observer.disconnect();
  state.observer = null;
}

function toggleWatchlist(movie, button) {
  if (state.watchlist[movie.id]) {
    delete state.watchlist[movie.id];
  } else {
    setWatchStatus(movie, "want");
  }
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
  if (button) paintWatchButton(button, movie.id);
}

function setWatchStatus(movie, status) {
  if (!status) {
    delete state.watchlist[movie.id];
  } else {
    state.watchlist[movie.id] = {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      original_language: movie.original_language,
      overview: movie.overview,
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids || (movie.genres || []).map((genre) => genre.id),
      status,
      savedAt: state.watchlist[movie.id]?.savedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
}

function paintWatchButton(button, movieId) {
  const saved = state.watchlist[movieId];
  const card = button.closest(".movie-card");
  button.classList.toggle("is-saved", Boolean(saved));
  card?.classList.toggle("is-status-watching", saved?.status === "watching");
  card?.classList.toggle("is-status-watched", saved?.status === "watched");
  button.textContent = saved ? statusSymbol(saved.status) : "+";
  button.title = saved ? statusLabel(saved.status) : "Add to watchlist";
}

function statusSymbol(status) {
  if (status === "watching") return ">";
  if (status === "watched") return "✓";
  return "+";
}

function statusLabel(status) {
  return WATCH_STATUSES.find(([value]) => value === status)?.[1] || "Want to Watch";
}

function readWatchlist() {
  try {
    const stored = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "{}");
    Object.keys(stored).forEach((id) => {
      if (!stored[id].status) stored[id].status = "want";
    });
    return stored;
  } catch {
    return {};
  }
}

function readPreferences() {
  try {
    const prefs = { language: "", minRating: "", sortBy: "primary_release_date.desc", ...JSON.parse(localStorage.getItem(PREFS_KEY) || "{}") };
    prefs.sortBy = normalizeSort(prefs.sortBy);
    return prefs;
  } catch {
    return { language: "", minRating: "", sortBy: "primary_release_date.desc" };
  }
}

function savePreferencesFromFilters() {
  state.prefs = {
    language: state.filters.language,
    minRating: state.filters.minRating,
    sortBy: normalizeSort(state.filters.sortBy),
  };
  localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
}

function normalizeSort(value) {
  if (value === "title.asc") return "original_title.asc";
  return value || "primary_release_date.desc";
}

function posterUrl(path, size, title) {
  if (path) return `${TMDB_IMAGE_URL}/${size}${path}`;
  const label = encodeURIComponent((title || "Movie").slice(0, 28));
  return `https://placehold.co/600x900/10242a/f7f8ff?text=${label}`;
}

function profileUrl(path, name) {
  if (path) return `${TMDB_IMAGE_URL}/w500${path}`;
  const label = encodeURIComponent((name || "Profile").slice(0, 24));
  return `https://placehold.co/600x900/17242d/f7f8ff?text=${label}`;
}

function genreNames(ids = []) {
  return ids.map((id) => state.genres.find((genre) => genre.id === id)?.name).filter(Boolean).join(", ");
}

function formatDate(value) {
  if (!value) return "TBA";
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function formatYear(value) {
  return value ? value.slice(0, 4) : "TBA";
}

function formatRuntime(minutes) {
  if (!minutes) return "Runtime TBA";
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return hours ? `${hours}h ${remaining}m` : `${remaining}m`;
}

function formatMoney(value) {
  if (!value) return "Not listed";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function updateLoader(message) {
  const loader = document.querySelector("#loader");
  if (loader) loader.textContent = message;
}

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
