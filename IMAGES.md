# Dolly Legacy — Image Strategy

This document maps life phases on the site to photographs, explains licensing, and tracks gaps.

## How the site organizes “phases”

| Layer | Count | Used for |
|-------|-------|----------|
| **Chapters** | 5 | Homepage scroll exhibit |
| **Eras** | 8 decades | Archive filters + era gallery |
| **Moments** | 28 | Individual stories (no photos yet) |

## Current chapter images (live)

| Chapter | Image | Era tie-in | License |
|---------|-------|------------|---------|
| **I · Origins** | Porter Wagoner & Dolly, 1969 | Early Nashville / Opry | Public domain |
| **II · Music** | RCA publicity portrait, 1977 | Songwriting peak | Public domain |
| **III · Building** | Liseberg Applause Award, 2010 | Dollywood empire | CC BY 3.0 |
| **IV · Giving** | Coat of Many Colors (museum) | Literacy / IL inspiration | CC BY-SA 4.0 |
| **V · Standing** | Peabody Awards, 2022 | Recent advocacy era | CC BY-SA 3.0 |

## Era gallery (archive page)

| Era | Status | Source |
|-----|--------|--------|
| 1950s | **Gap** — no suitable Commons portrait found | Childhood / Locust Ridge |
| 1960s | ✅ Porter Wagoner photo (1969) | Wikimedia |
| 1970s | ✅ RCA portrait (1977) | Wikimedia |
| 1980s | ✅ Carol Burnett promo (1980) | Wikimedia |
| 1990s | **Gap** — Imagination Library launch era | Need press/CC photo |
| 2000s | ✅ Kennedy Center (2003) | Wikimedia CC BY-SA 2.0 |
| 2010s | ✅ Liseberg Award (2010) | Wikimedia CC BY 3.0 |
| 2020s | ✅ Peabody Awards (2022) | Wikimedia CC BY-SA 3.0 |

## Where images live in code

```
public/images/chapters/   → 5 chapter hero portraits
public/images/eras/       → 6 decade thumbnails
src/content/phase-images.json   → captions + alt text
src/content/image-credits.json  → Commons attribution (auto-generated)
src/lib/images.ts               → getters for UI
src/app/images/page.tsx         → public credits page
```

## Legal sources (ranked)

### 1. Wikimedia Commons (what we use now)

- **Best for:** Historical publicity stills (1960s–1980s often public domain in the US), museum artifacts, event photos with CC licenses
- **Browse:** [Category:Dolly Parton](https://commons.wikimedia.org/wiki/Category:Dolly_Parton) · [by year](https://commons.wikimedia.org/wiki/Category:Dolly_Parton_by_year)
- **Requirement:** Attribution + respect license (CC BY, CC BY-SA, PD)

### 2. Official press / Dollywood media kit

- **Best for:** High-quality current portraits, Imagination Library, Dollywood
- **Requirement:** Written permission or press terms — **not** scraped from Google Images

### 3. Paid stock (Getty, etc.)

- **Best for:** Specific moments with no Commons coverage (1990s IL launch, COVID donation press)
- **Cost:** $–$$$ per image

### 4. User-contributed (your network)

- Concert photos **you** took (you own copyright)
- Submit via CONTRIBUTING.md with explicit license grant

## Per-moment images (next phase)

28 moments could each get an optional `image` field in `moments.json`. Suggested high-value targets:

| Moment ID | Suggested visual |
|-----------|------------------|
| `coat-of-many-colors` | Museum coat (already used in ch. IV) |
| `porter-wagoner` | 1969 duo photo |
| `nine-to-five` | 1980 Burnett promo or film still (check PD) |
| `imagination-library` | Official IL logo/book stack (permission) |
| `covid-vaccine` | 2020 press photo (Commons or AP with license) |
| `blm-support` | 2020 social-era portrait |

Schema change needed: add optional `image` + `imageCredit` to `moments.schema.json`.

## Gaps to fill next

1. **1950s** — childhood / Sevier County (may need illustration or licensed archive)
2. **1990s** — Imagination Library national expansion (1995+)
3. **Hero homepage** — single iconic portrait (currently text-only)
4. **Moment drawer thumbnails** — 28 images is a larger curation project

## Refreshing credits

After adding images to `public/images/`, regenerate attribution:

```bash
python3 scripts/fetch-commons-images.py   # (future helper)
```

Credits are displayed at `/images` on the live site.
