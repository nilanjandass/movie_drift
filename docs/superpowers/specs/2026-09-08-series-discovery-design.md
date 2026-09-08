# Series Discovery Design

## Goal

Split Movie Drift discovery into clear Movies and Series experiences while retaining a unified, local watchlist.

## Navigation

The primary navigation exposes `Discover Movies`, `Discover Series`, and `Watchlist`. Movies use `#/`; series use `#/series`; detail routes are `#/movie/:id` and `#/series/:id`.

## Data Model

Discovery items carry `media_type` (`movie` or `tv`). Shared rendering reads a title from `title` or `name`, and a release date from `release_date` or `first_air_date`. Watchlist keys include the media type, preventing a movie and a series with the same TMDb ID from overwriting one another.

## TMDb Integration

Movies continue to call movie endpoints. Series call the corresponding TV endpoints for discovery, search, genre lists, details, credits, trailers, and India availability. Movie date filters use primary release dates; series filters use first-air dates.

## Series Experience

The Series view has its own featured carousel, search copy, discovery rails, chronological results, filter popup, and fallback catalogue. Detail pages present title, first-air date, cast, trailer, India availability, creator, production, number of seasons, number of episodes, and episode runtime.

## Compatibility And Verification

Existing saved watchlist entries are migrated as movies on read. Pure helpers cover media type, labels, dates, routes, and watchlist keys. Browser checks cover switching between Movies and Series, series cards, series details, and the shared watchlist.
