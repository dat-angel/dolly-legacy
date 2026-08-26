# Dolly Legacy

A fan celebration of Dolly Parton — her songs, books, backbone, and the people she stood with. The moments database is open (CC BY 4.0) so you can remix quotes, credits, and stories.

**Live:** [dolly-legacy.vercel.app](https://dolly-legacy.vercel.app)

## Features

- **Life slider** — Scrub 1946 to now on one screen
- **Moments scrapbook** — 35 filterable stories with quotes, tags, and era filters
- **Typewriter quotes** — Her words click-clack on the page
- **What would Dolly say?** — Ask about today's mess; get a curated quote she already said
- **Who she stood with** — Working women, kids who need books, LGBTQ+ people, Black communities
- **Letters she sent** — Typed notes, signed faxes, and songs that were letters — stationery, not a click-clack archive
- **Open data harbor** — `moments.json`, `letters.json`, schema, photo credits — take it
- **Surprise me** — Press `?` on the archive for a random moment

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

## Project structure

```
src/
├── app/              # Next.js App Router pages (`/data` is the harbor)
├── components/       # UI including Typewriter & WhatWouldDollySay
├── content/          # moments.json — the open database
└── lib/              # Types, filters, dolly-say matching
```

To add a moment, edit `src/content/moments.json`.

## Disclaimer

Fan project — not affiliated with Dolly Parton, Dollywood, or the Imagination Library. Quotes attributed to public sources.

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
