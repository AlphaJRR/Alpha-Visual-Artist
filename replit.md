# Alpha Visual Artists

Chicago video production studio site + Expo mobile app + private client portal (galleries, comments, approvals, reference uploads).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API server (port 5000)
- `pnpm --filter @workspace/alpha-visual-artists run dev` — public website + portal
- `pnpm --filter @workspace/ava-mobile run dev` — Expo mobile WebView app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks/Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema (dev)

Required env: `DATABASE_URL`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`, `DEFAULT_OBJECT_STORAGE_BUCKET_ID`, `PUBLIC_OBJECT_SEARCH_PATHS`, `PRIVATE_OBJECT_DIR`, `SESSION_SECRET`, `AVA_ADMIN_EMAILS` (comma-separated emails — first sign-in with that email becomes admin).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + Clerk (`@clerk/express`) + Drizzle ORM
- DB: PostgreSQL
- Object Storage: GCS via Replit App Storage (presigned URLs + ACL)
- Web: React 19 + Vite + Tailwind v4 + wouter + @clerk/react
- Mobile: Expo SDK 54 (WebView with `sharedCookiesEnabled` so portal session works)

## Where things live

- DB schema: `lib/db/src/schema/portal.ts`
- API spec (storage endpoints): `lib/api-spec/openapi.yaml`
- Portal API routes: `artifacts/api-server/src/routes/portal.ts`
- Storage routes: `artifacts/api-server/src/routes/storage.ts`
- Auth middleware (Clerk + JIT user provisioning): `artifacts/api-server/src/middlewares/auth.ts`
- Web portal pages: `artifacts/alpha-visual-artists/src/pages/portal/*` and `pages/admin/*`
- Site theme: cyan `#00E6FF` on `#0D0D0D`; Sora display, Inter body

## Architecture decisions

- Single origin: site + `/api` are served via the same Replit proxy domain so cookie-based Clerk sessions Just Work in the WebView.
- JIT user provisioning: first authenticated request creates a `users` row from the Clerk profile; admin role is assigned by matching email against `AVA_ADMIN_EMAILS`.
- Object storage: clients upload via presigned URLs; uploads + finished videos are stored under `PRIVATE_OBJECT_DIR` and ACL-locked to the uploader. Reads through `/api/storage/objects/*` require auth + ACL.
- Portal routes use inline Zod (not OpenAPI codegen) for speed; storage routes use generated schemas.

## Product

- Public site: services, podcast, downloads, apparel, work, privacy
- Client portal (`/portal`): list of projects, per-project video player with threaded comments + approvals, per-project reference file upload
- Admin (`/admin`): create projects, assign to clients, upload final videos to projects
- Auth: `/sign-in`, `/sign-up` (email + password via Clerk Whitelabel)

## User preferences

- Prefers short, direct ALL-CAPS commands.
- Cyan-on-black brand. Sora display + Inter body. Tailwind v4 (CSS config, no `.ts`).

## Known issues / TODO (mobile)

The mobile Home tab Recent Work reels currently bundle ~5 video files (~330MB) directly into the app via `require()`, and every video reel autoplays a muted preview simultaneously inside a non-virtualized horizontal `ScrollView`. **User is aware** and will fix this properly later through Replit (object storage / CDN streaming + virtualized list with viewable-item-based playback). Do NOT attempt to "fix" by stripping out the videos — they are intentional product placement until then.

When that work happens, the right approach is:
1. Move full videos to Replit App Storage (object-storage skill) and stream by URL.
2. Replace the horizontal `ScrollView` with `FlatList` + `onViewableItemsChanged` so only the visible reel(s) play.
3. Add explicit `player.pause()` on `VideoModal` close + a single-active-playback policy that pauses preview players while the modal is open.

## Gotchas

- After editing `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen`.
- After editing `lib/db/src/schema/*`, run `pnpm --filter @workspace/db run push`.
- `AVA_ADMIN_EMAILS` must be set before the first admin user signs in, or they'll be provisioned as `client` and need a manual DB update.
- The mobile workflow can fail transiently after a `pnpm install` because Metro was watching a temp file that got deleted — just restart the workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure
- See the `clerk-auth`, `object-storage`, `artifacts` skills for integration patterns
