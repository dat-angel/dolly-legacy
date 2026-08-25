# Dolly Legacy

A fan tribute website celebrating Dolly Parton — her music, philanthropy, and lifelong advocacy for Black communities, LGBTQ+ people, and working women.

**Live demo:** Deploy to [Vercel](https://vercel.com/new) or run locally below.

## Features

- **Scroll exhibit** — Five chapters from Appalachian roots to standing with everyone
- **Moments archive** — 28+ filterable moments with quotes, tags, and era filters
- **Typewriter mode** — The 9 to 5 quote types out with click-clack sounds (scroll to the Music chapter)
- **What would Dolly say?** — Ask a question, get a curated quote matched by keywords
- **Surprise me** — Press `?` on the archive page for a random moment
- **Jolene easter egg** — Type `jolene` in search

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/dolly-legacy)

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
