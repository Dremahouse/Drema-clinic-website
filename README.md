# Drema UI Redesign (Isolated Repository)

An **isolated, staging-only** repository for the Drema website UI redesign work.
It contains only the public site UI, the staging Sanity Studio used to author it,
and the minimal infrastructure needed to build and preview them.

This repository was extracted from the main `nextjs-drema-web` repository so UI
redesign work can proceed without touching production code, production
credentials, or the Physician Review toolchain.

## Purpose

- Redesign and iterate on the public Drema website UI (`src/app/(frontend)`,
  `src/components`, `src/lib`, `src/utils`).
- Run the public/staging Sanity Studio (`/studio`) against the **staging**
  dataset for content preview.
- Prepare a Vercel **Preview** deployment (no production domains or env vars).

## Staging-only architecture

- Sanity dataset: **staging** (`NEXT_PUBLIC_SANITY_DATASET=staging`).
- Sanity access is **read-only**. `src/lib/sanity/client/live.ts` passes
  `SANITY_API_READ_TOKEN` as both `serverToken` and `browserToken`, so the
  configured token **must** be a **staging-scoped, READ-ONLY** token. Never
  configure a production or write-capable token here.
- There is no production Sanity mutation infrastructure in this repository:
  no write client, no migration/seed/content-operation scripts, no Physician
  Review tools or schemas, and no Supabase or workflow runtime.

## Expected environment variables

Copy `.env.example` to `.env.local` and fill in values:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Must be `staging` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | yes | Sanity API version |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | yes | Public URL of the embedded Studio |
| `NEXT_PUBLIC_SITE_URL` | yes | Preview origin (canonical/sitemap/Studio links). **Never the production domain.** |
| `SANITY_API_READ_TOKEN` | yes | Staging-scoped, **READ-ONLY** Sanity token (exposed to browsers via `browserToken`) |
| `MAX_STATIC_PARAMS` | yes | Cap for static generation params (1–1000) |
| `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | no | Public analytics IDs |

`src/env/serverEnv.ts` validates only `SANITY_API_READ_TOKEN` and
`MAX_STATIC_PARAMS`. Do not add production secrets to this repository.

## Local development

```bash
nvm use            # see .nvmrc (Node >= 22)
npm ci
npm run dev        # next dev (turbopack) + sanity typegen watcher
```

Open `http://localhost:3000` (the app) and `http://localhost:3000/studio`
(the Studio, against staging).

## Type generation

Sanity types are generated from the staging schema:

```bash
npm run sanity:typegen   # extracts .sanity/schema.json and generates src/sanity.types.ts
npm run watch-typegen    # regenerate on schema changes while developing
```

## Testing

```bash
npm run test        # vitest (watch)
npm run test -- run # single run
npm run typecheck   # tsc --noEmit
npm run check       # biome check
```

## UI-only scope

Included: public frontend routes/components, UI lib/utils, public Studio
schemas/structure/actions, draft-mode enable route, sitemap/robots, and the
design references under `docs/`.

Excluded by design: Physician Review code and schemas, production Sanity
mutation infrastructure (write client, ApproveImportReview), internal APIs,
Supabase, workflow runtime, operational scripts, reports/logs, and all
production or local environment files.

## Prohibitions

- **No production credentials** may be committed or configured in this
  repository (no production Sanity tokens, no service accounts, no deployment
  secrets).
- **No Physician Review work** belongs in this repository.
- Production Sanity must never be mutated from this repository.
- Do not point `NEXT_PUBLIC_SITE_URL` at the production domain; Preview
  deployments are noindex (`src/app/robots.ts` only allows indexing when
  `VERCEL_ENV === "production"`).

## Returning work to the main repository

Transfers back to `nextjs-drema-web` are **owner-controlled**: because internal
paths are preserved 1:1, changes are reviewed and applied file-scoped via
patches/PRs against the main repository. Nothing in this repository deploys to
production or writes to production data.
