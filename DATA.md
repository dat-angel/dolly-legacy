# Open Data — Dolly Legacy Moments

The **[moments database](data/moments.json)** is published as open data under **CC BY 4.0**.

The canonical source for edits is [`src/content/moments.json`](src/content/moments.json). Run `npm run sync-data` (or `npm run build`) to refresh the flat export in [`data/moments.json`](data/moments.json) and the live file at `/data/moments.json`.

## Quick reference

| Component | License | File |
|-----------|---------|------|
| Website & code | MIT | [LICENSE](LICENSE) |
| Moments database | CC BY 4.0 | [src/content/LICENSE-CC-BY-4.0.txt](src/content/LICENSE-CC-BY-4.0.txt) |
| Letters index | CC BY 4.0 | [src/content/letters.json](src/content/letters.json) |
| JSON Schema | MIT (part of repo) | [src/content/moments.schema.json](src/content/moments.schema.json) |

## Why dual licensing?

- **MIT** is the standard for open-source software — permissive, widely understood by developers and package registries.
- **CC BY 4.0** is the recommended license for open datasets — it requires attribution while allowing commercial use, modification, and redistribution. It also explicitly covers **sui generis database rights** (EU database directive).

## Attribution example

When reusing the database in your app, docs, or research:

```
Data from the Dolly Legacy Moments Database
by Dolly Legacy contributors — CC BY 4.0
https://github.com/dat-angel/dolly-legacy
```

## What is licensed?

| Licensed (CC BY 4.0) | Not relicensed |
|----------------------|----------------|
| Factual summaries & descriptions | Song lyrics (copyright holders) |
| Metadata (tags, eras, categories) | Interview quotes (original speakers/publishers) |
| `relatedIds`, `moodTags`, `dollySayKeywords` | Dolly Parton's name & likeness (trademark/publicity) |
| Curation & structure | Imagination Library trademarks |

## Exporting the data

| Where | URL / path |
|-------|------------|
| **Repo harbor** | [`data/moments.json`](data/moments.json) |
| **Live download** | https://www.dollyparton.page/data/moments.json |
| **Source (edit here)** | [`src/content/moments.json`](src/content/moments.json) |

Refresh after edits:

```bash
npm run sync-data
```

The file includes a `meta` block with version, license, and attribution strings for programmatic use.

See [src/content/README.md](src/content/README.md) for validation and usage examples.
