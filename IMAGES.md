# Dolly Legacy — Image Strategy

This document maps life phases on the site to photographs, explains licensing, and tracks gaps.

## How the site organizes “phases”

| Layer | Count | Used for |
|-------|-------|----------|
| **Chapters** | 5 | Homepage story chapters |
| **Eras** | 8 decades | Archive filters + era gallery |
| **Moments** | 28 | Individual stories, each with a photograph |

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
| 1950s | ✅ Pick'n Grin Bluegrass Band photo (~1959) | Wikimedia CC BY 2.0 |
| 1960s | ✅ Porter Wagoner photo (1969) | Wikimedia |
| 1970s | ✅ RCA portrait (1977) | Wikimedia |
| 1980s | ✅ Carol Burnett promo (1980) | Wikimedia |
| 1990s | ✅ National Press Club portrait (1995–2000) | Wikimedia CC BY-SA 4.0 |
| 2000s | ✅ Kennedy Center (2003) | Wikimedia CC BY-SA 2.0 |
| 2010s | ✅ Liseberg Award (2010) | Wikimedia CC BY 3.0 |
| 2020s | ✅ Peabody Awards (2022) | Wikimedia CC BY-SA 3.0 |

## Where images live in code

```
public/images/chapters/   → 5 chapter hero portraits
public/images/eras/       → 8 decade thumbnails
public/images/moments/    → unique photos for 23 moments (5 reuse chapter/era files)
src/content/phase-images.json   → captions + alt text
src/content/moment-images.json  → per-moment captions + credit keys
src/content/image-credits.json  → Commons attribution
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

## Per-moment images

Every moment has a photograph on cards, drawers, and share pages. Unique Commons files live in `public/images/moments/`. Five moments reuse the best chapter/era portrait when that image is the strongest licensed match:

| Moment ID | Visual |
|-----------|--------|
| `porter-wagoner` | 1969 duo photo (Chapter I) |
| `nine-to-five` | 1980 Burnett promo (1980s era) |
| `business-autonomy` | RCA portrait, 1977 (Chapter II) |
| `imagination-library` | National Press Club (1990s era) |
| `covid-second-donation` | Peabody Awards, 2022 (Chapter V) |

High-value unique files include the Coat of Many Colors at the Hall of Fame, original *Jolene* and *I Will Always Love You* vinyl labels, the *Nine to Five* trio, Dollywood, and the Grammy Museum “do it on purpose” wall.

Refresh unique files with:

```bash
python3 scripts/fetch-moment-images.py
```

## Gaps to fill next

1. **Hero homepage** — single iconic portrait (currently text-only)

## Refreshing credits

After adding images to `public/images/`, regenerate attribution:

```bash
python3 scripts/fetch-moment-images.py
```

Credits are displayed at `/images` on the live site.
