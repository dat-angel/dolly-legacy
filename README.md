# Dolly Legacy

A fan tribute website celebrating Dolly Parton — her music, philanthropy, and lifelong advocacy for Black communities, LGBTQ+ people, and working women.

**Live:** [dolly-legacy.vercel.app](https://dolly-legacy.vercel.app)

## Features

- **Life slider** — Scrub 1946 to now on one screen instead of scrolling five long chapters
- **Moments archive** — 28+ filterable moments with quotes, tags, and era filters
- **Typewriter mode** — The 9 to 5 quote types out on the Music chapter page
- **What would Dolly say?** — Chat with her across decades. Pick a time in her life and get a curated quote from that era.
- **Surprise me** — Press `?` on the archive page for a random moment
- **Jolene easter egg** — Type `jolene` in search

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dat-angel/dolly-legacy)

Or:

```bash
npx vercel --prod
```

Recommended domain: `dolly.dev` or `dollylegacy.dev` via [Vercel Domains](https://vercel.com/domains).

## Project structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI including Typewriter & WhatWouldDollySay
├── content/          # moments.json — all tribute content
└── lib/              # Types, filters, dolly-say matching
```

To add a moment, edit `src/content/moments.json`.

## Disclaimer

Fan tribute only — not affiliated with Dolly Parton, Dollywood, or the Imagination Library. Quotes attributed to public sources.

## Licensing

This repository uses **dual licensing**:

| Component | License | Details |
|-----------|---------|---------|
| **Code** (website, scripts, schema) | [MIT](LICENSE) | Use freely with attribution |
| **Database** (`src/content/moments.json`) | [CC BY 4.0](src/content/LICENSE-CC-BY-4.0.txt) | Share and adapt with attribution |

See [DATA.md](DATA.md) for attribution examples, export instructions, and third-party content notes.

**Suggested data attribution:**

> Dolly Legacy Moments Database by Dolly Legacy contributors — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
