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

const FALLBACK_SERIES = [
  { id: 960101, name: "Signal Harbour", first_air_date: "2026-07-10", vote_average: 8.4, vote_count: 2410, popularity: 96, original_language: "en", genre_ids: [878, 53], overview: "A lighthouse keeper begins receiving distress calls from a coast that vanished forty years ago.", poster_path: null, backdrop_path: null, number_of_seasons: 2, number_of_episodes: 16, episode_run_time: [52] },
  { id: 960102, name: "The Mango Season", first_air_date: "2026-07-03", vote_average: 7.6, vote_count: 1830, popularity: 82, original_language: "hi", genre_ids: [18, 10749], overview: "Three siblings return to their ancestral home and find old promises ripening with the monsoon.", poster_path: null, backdrop_path: null, number_of_seasons: 1, number_of_episodes: 8, episode_run_time: [48] },
  { id: 960103, name: "Night Shift Kolkata", first_air_date: "2026-06-26", vote_average: 8.1, vote_count: 2199, popularity: 91, original_language: "bn", genre_ids: [18, 53], overview: "An emergency room team unravels a citywide conspiracy between midnight admissions.", poster_path: null, backdrop_path: null, number_of_seasons: 3, number_of_episodes: 24, episode_run_time: [44] },
  { id: 960104, name: "After the Last Bell", first_air_date: "2026-06-19", vote_average: 7.4, vote_count: 1420, popularity: 75, original_language: "ko", genre_ids: [35, 18], overview: "A substitute teacher turns a failing after-school club into a surprising second chance.", poster_path: null, backdrop_path: null, number_of_seasons: 1, number_of_episodes: 12, episode_run_time: [58] },
  { id: 960105, name: "Astral House", first_air_date: "2026-06-12", vote_average: 8.0, vote_count: 2015, popularity: 88, original_language: "ja", genre_ids: [16, 878], overview: "Every room in a small apartment block opens onto a different planet after midnight.", poster_path: null, backdrop_path: null, number_of_seasons: 2, number_of_episodes: 20, episode_run_time: [26] },
  { id: 960106, name: "Salt Lines", first_air_date: "2026-06-05", vote_average: 7.8, vote_count: 1674, popularity: 79, original_language: "es", genre_ids: [28, 18], overview: "A marine rescue crew crosses hostile waters to protect a community the map forgot.", poster_path: null, backdrop_path: null, number_of_seasons: 1, number_of_episodes: 10, episode_run_time: [50] },
  { id: 960107, name: "The Quiet District", first_air_date: "2026-05-29", vote_average: 7.2, vote_count: 1102, popularity: 67, original_language: "fr", genre_ids: [27, 53], overview: "A sound engineer notices an entire neighbourhood has stopped making noise.", poster_path: null, backdrop_path: null, number_of_seasons: 1, number_of_episodes: 6, episode_run_time: [55] },
  { id: 960108, name: "Chai and Code", first_air_date: "2026-05-22", vote_average: 7.9, vote_count: 1530, popularity: 77, original_language: "en", genre_ids: [35, 18], overview: "Two rival app founders are forced to share a studio and a family recipe book.", poster_path: null, backdrop_path: null, number_of_seasons: 2, number_of_episodes: 18, episode_run_time: [32] },
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

const FALLBACK_SERIES_DETAILS = {
  ...FALLBACK_DETAILS,
  status: "Returning Series",
  created_by: [{ id: 7001, name: "Mira Solenne", profile_path: null }],
  number_of_seasons: 2,
  number_of_episodes: 16,
  episode_run_time: [52],
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

const WATCH_STATUSES = [
  ["want", "Want to Watch"],
  ["watching", "Watching"],
  ["watched", "Watched"],
];

const MAJOR_INDIA_PARTNERS = ["Amazon Prime Video", "Netflix", "JioHotstar", "ZEE5", "Hoichoi", "SonyLIV", "Apple TV", "Google Play Movies", "MUBI", "Sun Nxt", "aha"];

const MEDIA_CONFIG = {
  movie: {
    endpoint: "movie",
    collection: FALLBACK_MOVIES,
    dateField: "release_date",
    titleField: "title",
    dateFilter: "primary_release_date",
    defaultSort: "primary_release_date.desc",
    titleSort: "original_title.asc",
    label: "Movies",
    singular: "movie",
  },
  tv: {
    endpoint: "tv",
    collection: FALLBACK_SERIES,
    dateField: "first_air_date",
    titleField: "name",
    dateFilter: "first_air_date",
    defaultSort: "first_air_date.desc",
    titleSort: "original_name.asc",
    label: "Series",
    singular: "series",
  },
};

const state = {
  route: "home",
  movieId: null,
  mediaType: "movie",
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
  revealObserver: null,
  searchTimer: null,
  featureSlides: [],
  featuredIndex: 0,
  featureTimer: null,
  featureGestureAbort: null,
  filterAbort: null,
  watchlist: readWatchlist(),
};

state.filters.language = state.prefs.language;
state.filters.minRating = state.prefs.minRating;
state.filters.sortBy = normalizeSort(state.prefs.sortBy, state.mediaType);

function activeMediaConfig() {
  return MEDIA_CONFIG[state.mediaType];
}

function defaultSort(mediaType = state.mediaType) {
  return MEDIA_CONFIG[mediaType].defaultSort;
}

function sortOptionsForActiveMedia() {
  const media = activeMediaConfig();
  return [
    [media.defaultSort, "Newest release"],
    [`${media.dateField}.asc`, "Oldest release"],
    ["vote_average.desc", "Highest rated"],
    ["popularity.desc", "Most popular"],
    [media.titleSort, "Title A-Z"],
  ];
}

function ensureMediaSort() {
  const validSorts = new Set(sortOptionsForActiveMedia().map(([value]) => value));
  if (!validSorts.has(state.filters.sortBy)) state.filters.sortBy = defaultSort();
}

function withMediaType(items, mediaType = state.mediaType) {
  return (items || []).map((item) => ({ ...item, media_type: mediaType }));
}

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
const reviewDialog = document.querySelector("#reviewDialog");
const reviewDialogContent = document.querySelector("#reviewDialogContent");
const goTopButton = document.querySelector("#goTopButton");

goTopButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("scroll", () => {
  goTopButton?.classList.toggle("is-visible", window.scrollY > 520);
}, { passive: true });
goTopButton?.classList.toggle("is-visible", window.scrollY > 520);

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
  const seriesDetailMatch = hash.match(/^#\/series\/(\d+)/);
  const personMatch = hash.match(/^#\/person\/(\d+)/);

  if (hash !== "#/") clearInterval(state.featureTimer);
  disconnectRevealObserver();

  if (detailMatch) {
    state.route = "detail";
    state.movieId = Number(detailMatch[1]);
    state.mediaType = "movie";
    setActiveNav("");
    renderDetail(state.movieId, "movie");
    return;
  }

  if (seriesDetailMatch) {
    state.route = "detail";
    state.movieId = Number(seriesDetailMatch[1]);
    state.mediaType = "tv";
    setActiveNav("");
    renderDetail(state.movieId, "tv");
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
  state.mediaType = hash === "#/series" ? "tv" : "movie";
  ensureMediaSort();
  setActiveNav(state.mediaType);
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
  prefSortSelect.innerHTML = sortOptionsForActiveMedia().map(([value, label]) => `<option value="${value}" ${normalizeSort(state.prefs.sortBy, state.mediaType) === value ? "selected" : ""}>${label}</option>`).join("");
  prefRatingInput.value = state.prefs.minRating;
}

async function renderHome() {
  disconnectObserver();
  const media = activeMediaConfig();
  app.innerHTML = `
    <nav class="media-switch" aria-label="Discover content type">
      <a href="#/" class="media-switch-link ${state.mediaType === "movie" ? "is-active" : ""}">Discover Movies</a>
      <a href="#/series" class="media-switch-link ${state.mediaType === "tv" ? "is-active" : ""}">Discover Series</a>
    </nav>
    <section class="cinema-stage" id="featuredSpotlight">
      <div class="feature-copy">
        <p class="eyebrow">Tonight's pick</p>
        <h1>Finding a ${media.singular} worth your evening.</h1>
        <p class="hero-copy">Loading a considered pick from the latest ${media.label.toLowerCase()}.</p>
      </div>
    </section>
    <section class="search-panel">
      <label class="field search-field">
        <span>Search ${media.label.toLowerCase()}</span>
        <input id="movieSearchInput" type="search" placeholder="Search ${media.singular} by title" value="${escapeHtml(state.filters.query)}" autocomplete="off" />
      </label>
      <div id="searchSuggestions" class="suggestions is-hidden"></div>
    </section>
    <section class="program-section is-hidden" id="discoveryRails"></section>
    <section class="discovery-section">
      <div class="toolbar">
        <h2>${state.filters.query ? `${media.label} search results` : `Chronological ${media.singular} discovery`}</h2>
        <button class="filter-toggle" id="filterToggle" type="button" aria-expanded="false" aria-controls="filterPopover">Filters</button>
      </div>
      <div class="filter-popover is-hidden" id="filterPopover">
        <form class="filters" id="filtersForm" aria-label="Discovery filters">
          ${renderFilters()}
        </form>
      </div>
      <div class="movie-grid" id="movieGrid"></div>
      <div class="loader" id="loader">Loading ${media.label.toLowerCase()}...</div>
      <div class="sentinel" id="sentinel"></div>
    </section>
  `;

  setupScrollReveals();
  wireSearch();
  wireFilters();
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
        ${sortOptionsForActiveMedia().map(([value, label]) => `<option value="${value}" ${state.filters.sortBy === value ? "selected" : ""}>${label}</option>`).join("")}
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

  target.innerHTML = results.slice(0, 6).map((item) => `
    <button class="suggestion" type="button" data-media-route="${mediaRoute(item)}">
      <img src="${posterUrl(item.poster_path, "w185", mediaTitle(item))}" alt="" />
      <span><strong>${escapeHtml(mediaTitle(item))}</strong><small>${formatYear(mediaDate(item))} | ${Number(item.vote_average || 0).toFixed(1)} / 10</small></span>
    </button>
  `).join("");
  target.classList.remove("is-hidden");
  target.querySelectorAll("[data-media-route]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.hash = button.dataset.mediaRoute;
    });
  });
}

async function fetchSearchSuggestions(query) {
  const media = activeMediaConfig();
  if (!state.apiKey) {
    return withMediaType(media.collection.filter((item) => mediaTitle(item).toLowerCase().includes(query.toLowerCase())));
  }
  const params = new URLSearchParams({ api_key: state.apiKey, query, include_adult: "false", page: "1" });
  const data = await cachedFetch(`${TMDB_BASE_URL}/search/${media.endpoint}?${params}`, `${media.endpoint}-search:${params}`);
  return withMediaType(data.results);
}

function wireFilters() {
  const form = document.querySelector("#filtersForm");
  const toggle = document.querySelector("#filterToggle");
  const popover = document.querySelector("#filterPopover");
  const clear = document.querySelector("#clearFilters");
  if (!form || !toggle || !popover || !clear) return;

  state.filterAbort?.abort();
  state.filterAbort = new AbortController();
  const { signal } = state.filterAbort;

  let closeTimer = null;
  const setPopoverOpen = (isOpen) => {
    clearTimeout(closeTimer);
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      popover.classList.remove("is-hidden", "is-closing");
      requestAnimationFrame(() => popover.classList.add("is-open"));
      popover.querySelector("select, input")?.focus();
      return;
    }
    popover.classList.remove("is-open");
    popover.classList.add("is-closing");
    closeTimer = setTimeout(() => {
      popover.classList.add("is-hidden");
      popover.classList.remove("is-closing");
    }, 180);
  };

  toggle.addEventListener("click", () => setPopoverOpen(popover.classList.contains("is-hidden")), { signal });
  form.addEventListener("input", debounce(() => {
    const data = new FormData(form);
    state.filters = {
      ...state.filters,
      language: data.get("language") || "",
      genre: data.get("genre") || "",
      fromYear: data.get("fromYear") || "",
      toYear: data.get("toYear") || "",
      minRating: data.get("minRating") || "",
      sortBy: normalizeSort(data.get("sortBy"), state.mediaType),
      indiaAvailable: data.get("indiaAvailable") === "on",
    };
    savePreferencesFromFilters();
    refreshHome();
  }, 250), { signal });

  clear.addEventListener("click", () => {
    state.filters = { language: "", genre: "", fromYear: "", toYear: "", minRating: "", sortBy: defaultSort(), query: state.filters.query, indiaAvailable: false };
    savePreferencesFromFilters();
    form.elements.language.value = "";
    form.elements.genre.value = "";
    form.elements.fromYear.value = "";
    form.elements.toYear.value = "";
    form.elements.minRating.value = "";
    form.elements.sortBy.value = defaultSort();
    form.elements.indiaAvailable.checked = false;
    refreshHome();
  }, { signal });

  document.addEventListener("click", (event) => {
    if (!popover.classList.contains("is-hidden") && !popover.contains(event.target) && !toggle.contains(event.target)) setPopoverOpen(false);
  }, { signal });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setPopoverOpen(false);
  }, { signal });
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
  updateLoader(`Loading ${activeMediaConfig().label.toLowerCase()}...`);

  try {
    const data = await fetchMedia(requestedPage);
    state.totalPages = Math.min(data.total_pages || 1, 500);
    const normalized = withMediaType(data.results);
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
    updateLoader(`Could not load more ${activeMediaConfig().label.toLowerCase()}. Check the API key or try again.`);
  } finally {
    state.loading = false;
  }
}

async function fetchMedia(page) {
  const media = activeMediaConfig();
  if (!state.apiKey) return filterFallbackMedia(page);

  if (state.filters.query) {
    const params = new URLSearchParams({
      api_key: state.apiKey,
      page,
      query: state.filters.query,
      include_adult: "false",
    });
    const data = await cachedFetch(`${TMDB_BASE_URL}/search/${media.endpoint}?${params}`, `${media.endpoint}-search:${params}`);
    return { ...data, results: filterAndSortMedia(data.results || []) };
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
  if (state.filters.fromYear) params.set(`${media.dateFilter}.gte`, `${state.filters.fromYear}-01-01`);
  if (state.filters.toYear) params.set(`${media.dateFilter}.lte`, `${state.filters.toYear}-12-31`);
  if (state.filters.minRating) params.set("vote_average.gte", state.filters.minRating);
  if (state.filters.indiaAvailable) {
    params.set("watch_region", "IN");
    params.set("with_watch_monetization_types", "flatrate|free|ads|rent|buy");
  }

  return cachedFetch(`${TMDB_BASE_URL}/discover/${media.endpoint}?${params}`, `discover:${media.endpoint}:${params}`);
}

function filterFallbackMedia(page) {
  const media = activeMediaConfig();
  const pageSize = 6;
  const source = state.filters.query
    ? media.collection.filter((item) => mediaTitle(item).toLowerCase().includes(state.filters.query.toLowerCase()))
    : media.collection;
  const items = filterAndSortMedia(source);
  const start = (page - 1) * pageSize;
  return {
    results: items.slice(start, start + pageSize),
    page,
    total_pages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}

function filterAndSortMedia(source) {
  let items = [...source];

  if (state.filters.language) items = items.filter((item) => item.original_language === state.filters.language);
  if (state.filters.genre) items = items.filter((item) => (item.genre_ids || []).includes(Number(state.filters.genre)));
  if (state.filters.fromYear) items = items.filter((item) => Number((mediaDate(item) || "0").slice(0, 4)) >= Number(state.filters.fromYear));
  if (state.filters.toYear) items = items.filter((item) => Number((mediaDate(item) || "9999").slice(0, 4)) <= Number(state.filters.toYear));
  if (state.filters.minRating) items = items.filter((item) => Number(item.vote_average || 0) >= Number(state.filters.minRating));
  if (state.filters.indiaAvailable) items = items.filter((item) => item.india_available !== false);

  const sort = state.filters.sortBy;
  items.sort((a, b) => {
    if (sort.endsWith(".asc") && sort !== "original_title.asc" && sort !== "original_name.asc") return mediaDate(a).localeCompare(mediaDate(b));
    if (sort === "vote_average.desc") return Number(b.vote_average || 0) - Number(a.vote_average || 0);
    if (sort === "popularity.desc") return Number(b.popularity || 0) - Number(a.popularity || 0);
    if (sort === "original_title.asc" || sort === "original_name.asc" || sort === "title.asc") return mediaTitle(a).localeCompare(mediaTitle(b));
    return mediaDate(b).localeCompare(mediaDate(a));
  });
  return items;
}

function renderMovieBatch(movies, target) {
  if (!target) return;
  if (state.page === 1 && movies.length === 0) {
    target.innerHTML = `<div class="empty-state"><div><h2>No ${activeMediaConfig().label.toLowerCase()} match those filters.</h2><p class="muted">Try a wider search, year range, or lower rating threshold.</p></div></div>`;
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
    const previewButton = card.querySelector(".preview-button");

    poster.src = posterUrl(movie.poster_path, "w500", mediaTitle(movie));
    poster.alt = `${mediaTitle(movie)} poster`;
    title.textContent = mediaTitle(movie);
    card.querySelector(".movie-meta").innerHTML = movieMeta(movie);
    card.querySelector(".movie-overview").textContent = movie.overview || "No synopsis is available yet.";
    score.style.setProperty("--score", Math.min(10, Math.max(0, Number(movie.vote_average || 0))));
    const scoreTarget = Math.min(10, Math.max(0, Number(movie.vote_average || 0)));
    score.style.setProperty("--score", "0");
    requestAnimationFrame(() => score.style.setProperty("--score", scoreTarget));
    score.querySelector(".score-value").textContent = Number(movie.vote_average || 0).toFixed(1);
    card.classList.add("reveal-card");
    state.revealObserver?.observe(card);

    const openMedia = () => { window.location.hash = mediaRoute(movie); };
    title.addEventListener("click", openMedia);
    posterButton.addEventListener("click", openMedia);
    if (target.id === "movieGrid") {
      previewButton.hidden = false;
      previewButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showQuickLook(movie);
      });
    }
    card.addEventListener("mouseenter", () => card.classList.add("is-previewed"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-previewed"));
    paintWatchButton(watchToggle, movie);
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
  paintFeaturedSlide();
  wireFeaturedSwipe();
  restartFeaturedTimer();
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
  target.classList.remove("is-transitioning");
  const featureImagePath = movie.backdrop_path || movie.poster_path;
  if (featureImagePath) {
    target.style.setProperty("--featured-image", `url("${posterUrl(featureImagePath, "w1280", mediaTitle(movie))}")`);
  } else {
    target.style.removeProperty("--featured-image");
  }
  target.innerHTML = `
    <div class="feature-copy">
      <p class="eyebrow">Tonight's pick · ${escapeHtml(genreNames(movie.genre_ids) || "Featured")}</p>
      <h1>${escapeHtml(mediaTitle(movie))}</h1>
      <div class="detail-meta"><span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>${mediaTypeOf(movie) === "tv" ? `${movie.number_of_seasons || 1} season${Number(movie.number_of_seasons || 1) === 1 ? "" : "s"}` : formatRuntime(movie.runtime || 122)}</span><span>${formatYear(mediaDate(movie))}</span></div>
      <p class="hero-copy">${escapeHtml(movie.overview || "A standout from the latest releases.")}</p>
      <div class="pill-row">${moodLabels(movie, state.genres).map((label) => `<span class="pill">${label}</span>`).join("")}</div>
      <div class="feature-actions"><button class="primary-button" id="featureDetailsButton">View ${mediaTypeOf(movie) === "tv" ? "series" : "film"}</button><button class="ghost-button" id="featureQuickLookButton">Quick look</button></div>
    </div>
    <div class="feature-navigation"><div class="feature-dots">${state.featureSlides.map((_, index) => `<button type="button" class="${index === state.featuredIndex ? "is-active" : ""}" data-slide-to="${index}" aria-label="Show pick ${index + 1}"></button>`).join("")}</div></div>
  `;
  void target.offsetWidth;
  target.classList.add("is-transitioning");
  document.querySelector("#featureDetailsButton").addEventListener("click", () => { window.location.hash = mediaRoute(movie); });
  document.querySelector("#featureQuickLookButton").addEventListener("click", () => showQuickLook(movie));
  target.querySelectorAll("[data-slide-to]").forEach((button) => button.addEventListener("click", () => {
    state.featuredIndex = Number(button.dataset.slideTo);
    paintFeaturedSlide();
    restartFeaturedTimer();
  }));
}

function moveFeaturedSlide(direction) {
  state.featuredIndex = nextCarouselIndex(state.featuredIndex, direction, state.featureSlides.length);
  paintFeaturedSlide();
}

function restartFeaturedTimer() {
  clearInterval(state.featureTimer);
  if (state.featureSlides.length > 1) state.featureTimer = setInterval(() => moveFeaturedSlide(1), 10000);
}

function wireFeaturedSwipe() {
  const target = document.querySelector("#featuredSpotlight");
  if (!target) return;

  state.featureGestureAbort?.abort();
  state.featureGestureAbort = new AbortController();
  const { signal } = state.featureGestureAbort;
  let gesture = null;

  const resetGesture = () => {
    gesture = null;
    target.classList.remove("is-swiping");
  };

  target.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || event.target.closest("button, a, input, select")) return;
    gesture = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    target.setPointerCapture?.(event.pointerId);
  }, { signal });

  target.addEventListener("pointermove", (event) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    const deltaX = event.clientX - gesture.x;
    const deltaY = event.clientY - gesture.y;
    if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
      target.classList.add("is-swiping");
      event.preventDefault();
    }
  }, { signal });

  target.addEventListener("pointerup", (event) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    const deltaX = event.clientX - gesture.x;
    const deltaY = event.clientY - gesture.y;
    const direction = Math.abs(deltaX) > Math.abs(deltaY) ? swipeDirection(gesture.x, event.clientX) : 0;
    resetGesture();
    if (!direction) return;
    moveFeaturedSlide(direction);
    restartFeaturedTimer();
  }, { signal });

  target.addEventListener("pointercancel", resetGesture, { signal });
}

function renderDiscoveryRails(movies) {
  const target = document.querySelector("#discoveryRails");
  if (!target) return;
  const entries = [
    ["Trending now", fillRail([...movies].sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0)))],
    ["Critically acclaimed", fillRail([...movies].filter((movie) => Number(movie.vote_average || 0) >= 7.5))],
  ].filter(([, list]) => list.length);
  if (!entries.length) {
    target.classList.add("is-hidden");
    return;
  }
  target.classList.remove("is-hidden");
  target.innerHTML = entries.map(([title, list]) => `
    <div class="program-section">
      <div class="section-heading"><h2>${title}</h2><span>Browse the shelf</span></div>
      <div class="rail-shell"><button class="rail-arrow rail-arrow-left" type="button" aria-label="Scroll ${title} left">‹</button><div class="film-rail">${list.slice(0, 20).map((movie) => `<button class="rail-movie" type="button" data-rail-route="${mediaRoute(movie)}"><img src="${posterUrl(movie.poster_path, "w342", mediaTitle(movie))}" alt="${escapeHtml(mediaTitle(movie))} poster" loading="lazy" /><span>${escapeHtml(mediaTitle(movie))}</span></button>`).join("")}</div><button class="rail-arrow rail-arrow-right" type="button" aria-label="Scroll ${title} right">›</button></div>
    </div>
  `).join("");
  target.querySelectorAll("[data-rail-route]").forEach((button) => button.addEventListener("click", () => { window.location.hash = button.dataset.railRoute; }));
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
    <img src="${posterUrl(movie.poster_path, "w500", mediaTitle(movie))}" alt="${escapeHtml(mediaTitle(movie))} poster" />
    <div>
      <p class="eyebrow">Quick look</p>
      <h2 id="quickLookTitle">${escapeHtml(mediaTitle(movie))}</h2>
      <div class="detail-meta"><span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>${formatYear(mediaDate(movie))}</span><span>${(movie.original_language || "").toUpperCase()}</span></div>
      <div class="pill-row">${moodLabels(movie, state.genres).map((label) => `<span class="pill">${label}</span>`).join("")}</div>
      <div class="detail-actions"><button class="primary-button" id="quickLookDetails">View film</button></div>
    </div>
    <p class="muted quick-overview">${escapeHtml(movie.overview || "No synopsis is available yet.")}</p>
  `;
  quickLookContent.querySelector(".quick-close").addEventListener("click", () => quickLookDialog.close());
  quickLookContent.querySelector("#quickLookDetails").addEventListener("click", () => {
    quickLookDialog.close();
    window.location.hash = mediaRoute(movie);
  });
  quickLookDialog.showModal();
}

function movieMeta(movie) {
  const release = formatDate(mediaDate(movie));
  const rating = Number(movie.vote_average || 0).toFixed(1);
  const language = (movie.original_language || "").toUpperCase();
  return `<span>${release}</span><span>${rating} / 10</span><span>${language}</span>`;
}

async function renderDetail(movieId, mediaType = state.mediaType) {
  disconnectObserver();
  window.scrollTo(0, 0);
  const media = MEDIA_CONFIG[mediaType];
  app.innerHTML = `<div class="loader">Loading ${media.singular} details...</div>`;

  try {
    const movie = await fetchMediaDetail(movieId, mediaType);
    const directors = (movie.credits?.crew || []).filter((person) => person.job === "Director");
    const writers = (movie.credits?.crew || []).filter((person) => ["Writer", "Screenplay", "Story"].includes(person.job));
    const creators = movie.created_by || directors;
    const cast = movie.credits?.cast || [];
    const companies = (movie.production_companies || []).map((company) => company.name).join(", ") || "Not listed";
    const genres = (movie.genres || []).map((genre) => genre.name).join(", ") || genreNames(movie.genre_ids);
    const videos = movie.videos?.results || [];
    const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer") || videos.find((video) => video.site === "YouTube");
    const providers = movie["watch/providers"]?.results?.IN || {};
    const saved = state.watchlist[watchlistKey(movie)];
    const related = withMediaType(movie.recommendations?.results || fallbackRelatedTitles(movie.id, mediaType), mediaType).filter((item) => Number(item.id) !== Number(movie.id)).slice(0, 12);
    const reviews = movie.reviews?.results || fallbackReviews(movie);

    app.innerHTML = `
      <section class="detail-hero">
        <img class="detail-poster" src="${posterUrl(movie.poster_path, "w780", mediaTitle(movie))}" alt="${escapeHtml(mediaTitle(movie))} poster" />
        <div>
          <p class="eyebrow">${formatDate(mediaDate(movie))}</p>
          <h1>${escapeHtml(mediaTitle(movie))}</h1>
          <div class="detail-meta">
            <span>${Number(movie.vote_average || 0).toFixed(1)} / 10</span>
            <span>${movie.vote_count || 0} votes</span>
            <span>${mediaType === "tv" ? `${movie.number_of_seasons || 0} seasons` : formatRuntime(movie.runtime)}</span>
            <span>${(movie.original_language || "").toUpperCase()}</span>
          </div>
          <div class="detail-actions">
            <select class="status-select" id="detailStatusSelect" aria-label="Watch status">
              <option value="">Not saved</option>
              ${WATCH_STATUSES.map(([value, label]) => `<option value="${value}" ${saved?.status === value ? "selected" : ""}>${label}</option>`).join("")}
            </select>
            <a class="icon-button" href="${mediaType === "tv" ? "#/series" : "#/"}" aria-label="Back to discovery" title="Back to discovery">&larr;</a>
          </div>
          <p class="hero-copy">${escapeHtml(movie.overview || "No synopsis is available yet.")}</p>
        </div>
      </section>
      <section class="details-layout">
        <div class="detail-stack">
          ${renderTrailerPanel(trailer, videos)}
          ${renderCastPanel(cast)}
        </div>
        <aside class="detail-stack">
          ${renderProvidersPanel(providers)}
          <div class="detail-panel">
            <h2>Metadata</h2>
            <dl class="facts">
              <div class="fact"><dt>${mediaType === "tv" ? "Creator" : "Director"}</dt><dd>${renderPeopleLinks(mediaType === "tv" ? creators : directors)}</dd></div>
              <div class="fact"><dt>Writer</dt><dd>${renderPeopleLinks(writers)}</dd></div>
              <div class="fact"><dt>Genre</dt><dd>${escapeHtml(genres || "Not listed")}</dd></div>
              <div class="fact"><dt>Production</dt><dd>${escapeHtml(companies)}</dd></div>
              <div class="fact"><dt>Status</dt><dd>${escapeHtml(movie.status || "Not listed")}</dd></div>
              ${mediaType === "tv" ? `<div class="fact"><dt>Seasons</dt><dd>${movie.number_of_seasons || "Not listed"}</dd></div><div class="fact"><dt>Episodes</dt><dd>${movie.number_of_episodes || "Not listed"}</dd></div><div class="fact"><dt>Episode runtime</dt><dd>${formatRuntime(movie.episode_run_time?.[0])}</dd></div>` : `<div class="fact"><dt>Budget</dt><dd>${formatMoney(movie.budget)}</dd></div><div class="fact"><dt>Revenue</dt><dd>${formatMoney(movie.revenue)}</dd></div>`}
            </dl>
          </div>
        </aside>
      </section>
      ${renderReviewsPanel(reviews)}
      ${renderRelatedPanel(related, mediaType)}
    `;

    document.querySelector("#detailStatusSelect").addEventListener("input", (event) => {
      setWatchStatus(movie, event.target.value);
    });
    wireDetailRails(reviews);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  } catch (error) {
    console.error(error);
    app.innerHTML = `<div class="empty-state"><div><h2>Details are unavailable.</h2><p class="muted">Check the TMDb key or return to discovery.</p><a class="primary-button" href="#/">Back to discovery</a></div></div>`;
  }
}

function renderTrailerPanel(trailer) {
  if (!trailer) {
    return `<div class="detail-panel"><h2>Trailers</h2><p class="muted">No trailers are available for this title yet.</p></div>`;
  }
  return `
    <div class="detail-panel trailer-panel">
      <h2>Trailer</h2>
      <div class="video-frame">
        <iframe title="${escapeHtml(trailer.name || "Trailer")}" src="https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}?controls=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>
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

function renderCastPanel(cast) {
  if (!cast.length) return `<div class="detail-panel"><h2>Full cast</h2><p class="muted">Cast information is not available.</p></div>`;
  return renderDetailRail("Full cast", cast.map((person) => renderPersonCard(person, person.character || "Role not listed")).join(""), "cast-rail", "cast");
}

function renderReviewsPanel(reviews) {
  const cards = reviews.slice(0, 12).map((review, index) => {
    const author = review.author_details?.name || review.author_details?.username || review.author || "TMDb member";
    const rating = review.author_details?.rating;
    return `<button class="review-card" type="button" data-review-index="${index}" aria-label="Read full review by ${escapeHtml(author)}"><div class="review-card-heading"><strong>${escapeHtml(author)}</strong>${rating ? `<span>${Number(rating).toFixed(1)} / 10</span>` : ""}</div><p>${escapeHtml(review.content || "No review text was provided.")}</p></button>`;
  }).join("");
  return renderDetailRail("Reviews", cards || `<p class="muted">No reviews are available for this title yet.</p>`, "review-rail", "reviews");
}

function renderRelatedPanel(related, mediaType) {
  const content = related.length
    ? related.map((item) => `<button class="rail-movie" type="button" data-detail-route="${mediaRoute(item)}"><img src="${posterUrl(item.poster_path, "w342", mediaTitle(item))}" alt="${escapeHtml(mediaTitle(item))} poster" loading="lazy" /><span>${escapeHtml(mediaTitle(item))}</span></button>`).join("")
    : `<p class="muted">No related ${mediaType === "tv" ? "series" : "movies"} are available yet.</p>`;
  return renderDetailRail(`Related ${mediaType === "tv" ? "series" : "movies"}`, content, "related-rail", "related");
}

function renderDetailRail(title, content, className, railName) {
  return `<section class="detail-panel detail-rail-panel"><div class="section-heading"><h2>${title}</h2><span>Swipe to browse</span></div><div class="detail-rail-shell"><button class="rail-arrow rail-arrow-left" type="button" aria-label="Scroll ${railName} left">‹</button><div class="detail-rail ${className}" data-detail-rail>${content}</div><button class="rail-arrow rail-arrow-right" type="button" aria-label="Scroll ${railName} right">›</button></div></section>`;
}

function wireDetailRails(reviews = []) {
  app.querySelectorAll("[data-review-index]").forEach((card) => card.addEventListener("click", () => showReview(reviews[Number(card.dataset.reviewIndex)])));
  app.querySelectorAll("[data-detail-route]").forEach((button) => button.addEventListener("click", () => { window.location.hash = button.dataset.detailRoute; }));
  app.querySelectorAll(".detail-rail-shell").forEach((shell) => {
    const rail = shell.querySelector("[data-detail-rail]");
    shell.querySelector(".rail-arrow-left").addEventListener("click", () => rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: "smooth" }));
    shell.querySelector(".rail-arrow-right").addEventListener("click", () => rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: "smooth" }));
  });
}

function showReview(review) {
  if (!reviewDialog || !reviewDialogContent || !review) return;
  const author = review.author_details?.name || review.author_details?.username || review.author || "TMDb member";
  const rating = review.author_details?.rating;
  reviewDialogContent.innerHTML = `<button class="icon-button review-close" type="button" aria-label="Close review" title="Close">×</button><p class="eyebrow">Full review</p><div class="review-dialog-heading"><h2 id="reviewDialogTitle">${escapeHtml(author)}</h2>${rating ? `<span>${Number(rating).toFixed(1)} / 10</span>` : ""}</div><p class="review-dialog-copy">${escapeHtml(review.content || "No review text was provided.")}</p>`;
  reviewDialogContent.querySelector(".review-close").addEventListener("click", () => reviewDialog.close());
  reviewDialog.showModal();
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

async function fetchMediaDetail(movieId, mediaType = state.mediaType) {
  const media = MEDIA_CONFIG[mediaType];
  const fallback = media.collection.find((movie) => movie.id === Number(movieId));
  if (!state.apiKey) {
    if (!fallback) throw new Error("Fallback detail not found");
    return { ...fallback, media_type: mediaType, genres: FALLBACK_GENRES.filter((genre) => fallback.genre_ids.includes(genre.id)), recommendations: { results: fallbackRelatedTitles(movieId, mediaType) }, reviews: { results: fallbackReviews(fallback) }, ...(mediaType === "tv" ? FALLBACK_SERIES_DETAILS : FALLBACK_DETAILS) };
  }

  const params = new URLSearchParams({
    api_key: state.apiKey,
    append_to_response: "credits,videos,watch/providers,recommendations,reviews",
  });
  const detail = await cachedFetch(`${TMDB_BASE_URL}/${media.endpoint}/${movieId}?${params}`, `detail:${media.endpoint}:${movieId}:${params}`);
  return { ...detail, media_type: mediaType };
}

function fallbackRelatedTitles(movieId, mediaType) {
  return MEDIA_CONFIG[mediaType].collection.filter((item) => Number(item.id) !== Number(movieId)).slice(0, 12);
}

function fallbackReviews(movie) {
  return [
    { author: "Movie Drift viewer", author_details: { rating: Math.max(6, Math.round(Number(movie.vote_average || 7))) }, content: `${mediaTitle(movie)} has a strong premise, a clear sense of place, and enough momentum to make it an easy recommendation.` },
    { author: "Weekend watchlist", author_details: { rating: Math.max(6, Math.round(Number(movie.vote_average || 7) - 0.5)) }, content: "A compelling pick for viewers looking for a polished story with a memorable atmosphere." },
  ];
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
            <a class="icon-button" href="${state.mediaType === "tv" ? "#/series" : "#/"}" aria-label="Back to discovery" title="Back to discovery">&larr;</a>
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
      combined_credits: { cast: [...FALLBACK_MOVIES, ...FALLBACK_SERIES].map((movie) => ({ ...movie, character: "Featured role", media_type: movie.name ? "tv" : "movie" })), crew: [] },
    };
  }
  const params = new URLSearchParams({ api_key: state.apiKey, append_to_response: "combined_credits" });
  return cachedFetch(`${TMDB_BASE_URL}/person/${personId}?${params}`, `person:${personId}:${params}`);
}

function normalizePersonCredits(person) {
  const credits = [...(person.combined_credits?.cast || []), ...(person.combined_credits?.crew || [])]
    .filter((credit) => ["movie", "tv"].includes(credit.media_type) || credit.title || credit.name)
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
      media_type: credit.media_type === "tv" || credit.name ? "tv" : "movie",
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
        <p class="hero-copy">Movies and series grouped by Want to Watch, Watching, and Watched.</p>
      </div>
      <div class="status-card"><strong>${movies.length} saved</strong><p class="muted">Stored locally in this browser.</p></div>
    </section>
    <section id="watchlistGroups" class="watchlist-groups"></section>
  `;

  const root = document.querySelector("#watchlistGroups");
  if (!movies.length) {
    root.innerHTML = `<div class="empty-state"><div><h2>No saved titles yet.</h2><p class="muted">Add movies or series from discovery or a detail page.</p><div class="empty-actions"><a class="primary-button" href="#/">Browse movies</a><a class="primary-button" href="#/series">Browse series</a></div></div></div>`;
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
      grid.innerHTML = `<div class="empty-state compact-empty"><p class="muted">No titles here yet.</p></div>`;
    }
  });
}

async function loadGenres() {
  const media = activeMediaConfig();
  if (!state.apiKey) {
    state.genres = FALLBACK_GENRES;
    return;
  }
  try {
    const data = await cachedFetch(`${TMDB_BASE_URL}/genre/${media.endpoint}/list?api_key=${state.apiKey}`, `genres:${media.endpoint}`);
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

function setupScrollReveals() {
  disconnectRevealObserver();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  state.revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".media-switch, .cinema-stage, .search-panel, .program-section, .discovery-section").forEach((section) => {
    section.classList.add("reveal-on-scroll");
    state.revealObserver.observe(section);
  });
}

function disconnectRevealObserver() {
  if (state.revealObserver) state.revealObserver.disconnect();
  state.revealObserver = null;
}

function disconnectObserver() {
  if (state.observer) state.observer.disconnect();
  state.observer = null;
}

function toggleWatchlist(movie, button) {
  const key = watchlistKey(movie);
  if (state.watchlist[key]) {
    delete state.watchlist[key];
  } else {
    setWatchStatus(movie, "want");
  }
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
  if (button) paintWatchButton(button, movie);
}

function setWatchStatus(movie, status) {
  const key = watchlistKey(movie);
  if (!status) {
    delete state.watchlist[key];
  } else {
    state.watchlist[key] = {
      id: movie.id,
      title: mediaTitle(movie),
      name: movie.name,
      release_date: mediaDate(movie),
      first_air_date: movie.first_air_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      original_language: movie.original_language,
      overview: movie.overview,
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids || (movie.genres || []).map((genre) => genre.id),
      media_type: mediaTypeOf(movie),
      status,
      savedAt: state.watchlist[key]?.savedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
}

function paintWatchButton(button, movie) {
  const saved = state.watchlist[watchlistKey(movie)];
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
    const migrated = {};
    Object.entries(stored).forEach(([key, item]) => {
      const media_type = mediaTypeOf(item);
      const normalized = { ...item, id: item.id || Number(key), media_type, status: item.status || "want" };
      migrated[watchlistKey(normalized)] = normalized;
    });
    return migrated;
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

function normalizeSort(value, mediaType = state.mediaType) {
  const media = MEDIA_CONFIG[mediaType];
  if (value === "title.asc") return media.titleSort;
  if (value === "primary_release_date.desc" || value === "first_air_date.desc") return media.defaultSort;
  if (value === "primary_release_date.asc" || value === "first_air_date.asc") return `${media.dateField}.asc`;
  return value || media.defaultSort;
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
