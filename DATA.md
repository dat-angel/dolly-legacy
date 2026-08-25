# Open Data — Dolly Legacy Moments

The **[moments database](src/content/moments.json)** is published as open data under **CC BY 4.0**.

## Quick reference

| Component | License | File |
|-----------|---------|------|
| Website & code | MIT | [LICENSE](LICENSE) |
| Moments database | CC BY 4.0 | [src/content/LICENSE-CC-BY-4.0.txt](src/content/LICENSE-CC-BY-4.0.txt) |
| JSON Schema | MIT (part of repo) | [src/content/moments.schema.json](src/content/moments.schema.json) |

## Why dual licensing?

- **MIT** is the standard for open-source software — permissive, widely understood by developers and package registries.
- **CC BY 4.0** is the recommended license for open datasets — it requires attribution while allowing commercial use, modification, and redistribution. It also explicitly covers **sui generis database rights** (EU database directive).

## Attribution example

When reusing the database in your app, docs, or research:

```
Data from the Dolly Legacy Moments Database
by Dolly Legacy contributors — CC BY 4.0
https://github.com/YOUR_USERNAME/dolly-legacy
```

## What is licensed?

| Licensed (CC BY 4.0) | Not relicensed |
|----------------------|----------------|
| Factual summaries & descriptions | Song lyrics (copyright holders) |
| Metadata (tags, eras, categories) | Interview quotes (original speakers/publishers) |
| `relatedIds`, `moodTags`, `dollySayKeywords` | Dolly Parton's name & likeness (trademark/publicity) |
| Curation & structure | Imagination Library trademarks |

## Exporting the data

The canonical file is `src/content/moments.json`. It includes a `meta` block with version, license, and attribution strings for programmatic use.

```json
{
  "meta": {
    "license": "CC-BY-4.0",
    "attribution": "Dolly Legacy contributors",
    "version": "1.0.0"
  },
  "moments": [ ... ]
}
```

See [src/content/README.md](src/content/README.md) for validation and usage examples.
