# Cinematic Watchlist Design

## Goal

Evolve Movie Drift's existing discovery and watchlist experience with seven cinematic, mobile-safe interface treatments: queue progress, card expansion, transparent recommendations, provider labels, atmospheric surface texture, status progression, and genre-led typography.

## Scope

The work remains a static, client-rendered TMDb application. It does not add accounts, a recommendation service, playback tracking, new third-party dependencies, or new image assets.

## Design Direction

Movie Drift retains its dark teal-and-amber cinema palette and rounded surfaces. The new signature is an editorial-film treatment: a restrained film-grain surface, warm projector-light blooms, and genre-aware typography. Effects must clarify hierarchy or state; they must not obscure poster art, text, or controls.

## Components and Behaviour

### Tonight's Queue

The watchlist hero gains a compact film-strip queue. It displays up to three saved titles ordered by status (`watching`, then `want`, then `watched`) and by most recently updated within each status. Every queue item is a link to the title's existing detail route. The strip is omitted for an empty watchlist.

### Poster-to-Backdrop Card Expansion

Desktop and keyboard-focus card states expand only within their grid space. A gradient overlay reveals a backdrop treatment, title metadata, and existing actions without changing the route. Touch viewports do not depend on hover: tap targets retain their current detail navigation and watchlist action behaviour. `prefers-reduced-motion` disables scale and opacity transitions.

### Transparent Related Picks

The watchlist gains a “Because you saved…” rail when at least one saved title has a genre overlap with a title in the app's currently available movie or series collection. The chosen source title is named in the rail heading. Candidates are deterministic: same media type first, shared genre count descending, then rating and popularity descending. Saved titles are excluded. This is a local content match, not an AI recommendation.

### India Availability Ribbons

Watchlist cards request and cache TMDb detail provider data only when an API key exists. The first available provider in the priority `flatrate`, `free`, `ads`, `rent`, `buy` is shown as “Stream on”, “Free on”, “With ads on”, “Rent on”, or “Buy on” respectively. The fallback dataset shows the existing India providers. A missing provider leaves the ribbon absent; it does not claim that a title is unavailable.

### Atmospheric Surfaces

CSS pseudo-elements add low-opacity monochrome grain and one warm light-leak gradient to cinematic and watchlist hero surfaces. The texture is static and clipped to the surface. It must maintain text contrast and not intercept pointer events.

### Watch-status Timeline

Above the current grouped watchlist sections, show a three-step status timeline: Want to Watch, Watching, Watched. Each step shows its count and visual connector progress. It is informative only; the existing section headings and status controls remain the way to change state.

### Genre-led Typography

Cards receive one visual tone from their primary genre: `suspense` for horror/thriller, `romance` for romance/drama, `future` for science fiction/animation, and `neutral` otherwise. The tone affects title font family, letter spacing, and small metadata treatment—not semantic structure, title text, or accessibility labels. All tones retain sufficient contrast and readable sizing on narrow screens.

## Data Flow

`ui-model.js` owns pure functions for queue ordering, transparent pick selection, availability labels, and genre tones. `app.js` derives the watchlist views and, when a TMDb key is configured, asynchronously enriches watchlist entries with cached provider data before re-rendering only the availability ribbons. Existing local-storage identity and status data remain unchanged. `styles.css` owns all atmospheric, timeline, card, and responsive presentation.

## Accessibility and Responsiveness

- All new link and button targets must have accessible names.
- Card hover information is also available to keyboard focus users.
- Reduced-motion users see final visual states without animations.
- The queue and timeline remain horizontally readable at 320px; no essential content depends on hover.
- Provider labels use text, not colour alone.

## Verification

- Unit tests cover queue order, recommendation selection, provider-label priority, and genre-tone assignment.
- The full Node test suite and JavaScript syntax checks must pass.
- A browser check validates the populated watchlist at a phone-width viewport, a desktop card focus state, and reduced-motion behaviour when the local browser can reach the development server.
