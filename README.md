# Jesús Posada — personal site

An English-first, bilingual portfolio for an SRE focused on observability, automation, and cloud efficiency. The site is static: it has no contact form, analytics, visitor profiling, or server-side runtime.

## Quick path

Requires Node.js 22.12.0 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321/en/`. The Spanish equivalent is available at `/es/`.

## Verify and build

```bash
npm run check
npm run build
npm run preview
```

Astro writes the deployable site to `dist/`. GitHub Actions publishes that directory to GitHub Pages.

## Content boundaries

- English is the default language; `/` redirects to `/en/`.
- Professional results are intentionally generalized to protect confidential information.
- LinkedIn is the primary contact route. Email and GitHub are secondary.
- There is no public CV, booking link, or contact form.

## Compatibility routes

Legacy section URLs remain functional and point to their closest new section:

| Previous route | Destination |
|---|---|
| `/about/` | `/en/#about` |
| `/experience/` | `/en/#impact` |
| `/skills/` | `/en/#approach` |
| `/contact/` | `/en/#contact` |

The nine existing Spanish articles are preserved under `/blog/<slug>/`. The former `/blog/?post=<slug>` format is upgraded in the browser to the stable article URL; without JavaScript it still opens the complete notes archive.
