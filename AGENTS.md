This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npx emdash dev        # Start dev server (runs migrations, seeds, generates types)
npx emdash types      # Regenerate TypeScript types from schema
npx emdash seed seed/seed.json --validate  # Validate seed file
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.
- **hiring-review** -- 職務経歴書・レジュメ (`src/pages/pages/resume/`) を採用担当者目線（EM + リクルーター）で率直・辛口にレビューする。スキル欄・自己PR・プロジェクト記述のフィードバックを求められた時に使う。

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## Gotchas

### Dark mode body background (EmDash kumo override)

`src/styles/theme.css` ends with an `html body { background: var(--color-bg); color: var(--color-text) }` rule. **Do not remove it.**

- **Why:** EmDash (>= 0.16) injects an unlayered global `body { background-color: var(--color-kumo-elevated); color: var(--text-color-kumo-default) }`. Those kumo tokens use CSS `light-dark()`, which resolves off the element's `color-scheme` -- but this site's dark mode is driven by a `.dark` class on `:root` (it never sets `color-scheme`). So `light-dark()` always picks the light value and the body turns **white in dark mode**, and EmDash's unlayered rule also overrides `Base.astro`'s `@layer base` body styles.
- **Fix:** The `html body` rule (specificity 0,0,2) outranks EmDash's `body` (0,0,1), reclaiming body bg/text for the site's own `--color-bg`/`--color-text` in both modes. No `!important`, no layer-order dependency.
- Setting `color-scheme: dark` does **not** fix it (EmDash's `light-dark()` tokens don't respond here). It's safe to drop the override only if a future EmDash version stops force-theming the frontend `body`.
