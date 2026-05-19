App artifacts/ava-mobile is not on this Mac. The Cursor workspace is empty, and the Alpha Visual Artists mobile app lives in the Replit project Alpha-Visual-Artist (artifacts/ava-mobile inside that monorepo).

What I verified
Step	Result
cd artifacts/ava-mobile
Fails — no such directory under ~ or in common project folders
eas login
Already logged in as vertikalapp (also vertikalapps-organization)
eas init / eas build
Cannot run without the Expo app at artifacts/ava-mobile
The only local Expo project with eas.json and a production iOS profile is /Users/alphavisualartists/Vertikal-App (slug vertikal-mobile) — that is a different app than AVA mobile.

Run the build on Replit (recommended)
In the Alpha-Visual-Artist Repl shell:

cd artifacts/ava-mobile
eas login          # browser/device login if needed
eas init           # link to Expo project if not already
eas build --platform ios --profile production --non-interactive
Use --non-interactive only if Apple credentials and Expo project linking are already set up in that Repl.

Or run locally after syncing the repo
In Replit: Tools → Git → connect/push to GitHub (or download the Repl as a zip).
Clone that repo on your Mac.
Open the monorepo root (the folder that contains artifacts/ava-mobile and pnpm-workspace.yaml) in Cursor.
Then the same cd + eas commands will work here.
If you meant Vertikal instead
Say so and I can run the production iOS build from /Users/alphavisualartists/Vertikal-App (after moving the workspace there).

Next step: Either open the Replit project and run the commands above in its shell, or sync the Repl to GitHub and tell me the local clone path so I can run the build from your machine.






Here is what ran and where things stand.

Completed
Step	Result
git pull
Done in /Users/alphavisualartists/Documents/GitHub/vertikal (fast-forward, 104 commits). eas.json is at the repo root, not under artifacts/.
npm i -g eas-cli
Installed eas-cli@18.13.1
eas login
Already logged in as vertikalapp (joshua@vertikalapp.com)
npm install
Installed project deps in the vertikal repo (needed for build)
Blocker: artifacts/ava-mobile does not exist
After the pull, there is still no artifacts/ava-mobile in this GitHub repo. The Expo app and eas.json live at the monorepo root:

/Users/alphavisualartists/Documents/GitHub/vertikal/
├── eas.json
├── app.json          (slug: vertikal-mobile)
└── App.tsx
artifacts/ava-mobile is the Replit monorepo layout (Alpha-Visual-Artist) and is not in AlphaJRR/vertikal on main.

Build attempt
From the repo root (where eas.json actually is):

eas build --platform ios --profile production --non-interactive
Failed — iOS credentials are not set up for non-interactive builds:

Credentials are not set up. Run this command again in interactive mode.

What to run in your terminal (interactive)
If you meant VERTIKAL (this repo):

cd /Users/alphavisualartists/Documents/GitHub/vertikal
eas credentials:configure-build --platform ios
eas build --platform ios --profile production
If you truly need AVA mobile (artifacts/ava-mobile), run the same commands from the Replit project root after that folder exists locally (sync Replit → GitHub, then clone).

eas login is optional here since you are already authenticated; run it only if you want to switch accounts.

I can retry the build after you configure iOS credentials in your terminal, or help sync the Replit artifacts/ava-mobile tree to GitHub if that is the app you want to ship.Last login: Mon May 18 18:40:17 on console
alphavisualartists@JoshuasacStudio ~ % eas credentials
Run this command inside a project directory.
    Error: credentials command failed.
alphavisualartists@JoshuasacStudio ~ % 

























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
import siteRoutes from "./site.js";
// ... 
router.use(siteRoutes);
pnpm run typecheck
# Push to Replit
# Hero image
POST /api/site/upload/hero

# Portfolio videos
POST /api/site/upload/portfolio

# Gallery images
POST /api/site/upload/gallery

# Team photos
POST /api/site/upload/team

# About media
POST /api/site/upload/about

# Press kit
POST /api/site/upload/press

# Downloadables
POST /api/site/upload/download

# Misc (favicon, etc)
POST /api/site/upload/misc
