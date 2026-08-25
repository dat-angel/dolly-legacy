# Dolly Legacy Moments Database

Open curated data documenting Dolly Parton's music, philanthropy, advocacy, and life milestones.

## License

**[Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CC-BY-4.0.txt)**

You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.

### Suggested attribution

```
Dolly Legacy Moments Database by Dolly Legacy contributors
Licensed under CC BY 4.0
https://github.com/YOUR_USERNAME/dolly-legacy
```

## Files

| File | Description |
|------|-------------|
| `moments.json` | Canonical database (28 moments, v1.0.0) |
| `moments.schema.json` | JSON Schema for validation and tooling |
| `LICENSE-CC-BY-4.0.txt` | Full legal text |

## Using the data

```javascript
import database from "./moments.json" assert { type: "json" };

console.log(database.meta.license); // "CC-BY-4.0"
console.log(database.moments.length);
```

```bash
# Validate against schema (requires ajv-cli or similar)
npx ajv validate -s moments.schema.json -d moments.json
```

## Third-party content notice

This database includes short **quotations** from songs and interviews. Those quotations may remain under separate copyrights held by their original authors or publishers. What is licensed under CC BY 4.0 is our **curation**: factual summaries, metadata, tags, relationships, keyword mappings, and original prose descriptions.

Do not use this data to imply endorsement by Dolly Parton, Dollywood, or the Imagination Library.

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for how to add or edit moments.
