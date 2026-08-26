# Contributing

Thank you for helping grow the Dolly Legacy open database and celebration site.

## What you can contribute

- **New moments** — milestones, quotes, philanthropy, advocacy stories
- **Letters** — public, sourced notes on who she wrote to (`src/content/letters.json`)
- **Corrections** — factual fixes with sources
- **Tags & relationships** — better `relatedIds`, `moodTags`, `dollySayKeywords`
- **Code** — UI, accessibility, performance

## Adding a moment

1. Edit [`src/content/moments.json`](src/content/moments.json)
2. Add an entry to the `moments` array following [`moments.schema.json`](src/content/moments.schema.json)
3. Use a unique `id` (kebab-case)
4. Include a `source` URL when citing interviews or news
5. Bump `meta.version` (patch for additions, minor for schema changes)

### Required fields

- `id`, `title`, `era`, `category`, `tags`, `summary`

### Recommended fields

- `year`, `body`, `quote`, `source`, `hiddenFact`, `relatedIds`, `moodTags`, `dollySayKeywords`

## Licensing your contributions

By contributing, you agree that:

- **Code** contributions are licensed under [MIT](LICENSE)
- **Database** contributions (moments, metadata, prose) are licensed under [CC BY 4.0](src/content/LICENSE-CC-BY-4.0.txt)

## Content guidelines

- Be factual and respectful — this is a fan celebration, not parody
- Attribute quotes to public sources (NPR, AP, interviews, etc.)
- Use short lyric excerpts only; link to official recordings when possible
- Cover Dolly's support for underrepresented communities accurately
- Do not add content that implies official affiliation with Dolly Parton or Dollywood

## Pull request checklist

- [ ] Moment validates against `moments.schema.json`
- [ ] `meta.version` bumped if data changed
- [ ] Sources cited for quotes and facts
- [ ] `npm run build` passes
