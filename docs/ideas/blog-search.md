# Blog Search and Tag Filtering

Add progressive, real-time filtering to the blog archive so readers can find published posts by topic or text without leaving the page. The archive must remain useful as static HTML when JavaScript is unavailable.

## Product Requirements

- Filter posts in the browser as the reader types, without a submit action, navigation, or network request.
- Match a case-insensitive query against each post's title, excerpt, and article content.
- Let readers select more than one tag. A post must match every selected tag, and text and tag filters must both match when used together.
- Keep the search input and tag controls keyboard-operable and visibly labelled.
- Announce the result count and no-results state through a polite live status region without moving focus.
- Provide a clear way to reset all active filters.

## Astro Approach

`src/pages/blog/index.astro` remains the archive entry point. At build time, use its existing `getCollection('blog')` query and draft exclusion to create a minimal search record for each published post:

- Use `data.title` for the title.
- Use `data.description` as the excerpt when present; otherwise derive a short plain-text excerpt from the Markdown body.
- Use the collection entry's raw Markdown `body` for content matching, normalized to searchable plain text.
- Parse the current comma-separated `data.tags` value into trimmed, deduplicated tag labels for filtering and control generation.

Render the complete post list as static links first. Serialize only the fields needed for filtering into the generated page, then use a small framework-free client script to update row visibility, selected controls, and status text. Search and tag state are combined in the browser; no server endpoint is required. If the collection grows enough for the embedded index to affect page weight materially, reassess the indexing strategy before implementation.

## Scope And Non-Goals

This idea covers discovery within the existing blog archive and preserves its current publication and sorting rules. It does not add site-wide search, remote indexing, fuzzy ranking, autocomplete, pagination, article-page changes, a tag taxonomy migration, analytics, or a JavaScript UI framework.

## Acceptance Criteria

- The initial static page shows every published post in the current sort order; drafts remain excluded in production.
- Typing updates visible results immediately and matches terms found in titles, excerpts, or article content.
- Readers can activate multiple tags, and only posts matching all selected tags remain visible.
- Text and tag filters work together, and clearing filters restores the full published list.
- Every control has an accessible name, works with a keyboard, and has a visible focus state.
- A polite status announces the current result count and an explicit no-results message.
- Filtering performs no runtime network request and the unenhanced static archive remains navigable without JavaScript.
