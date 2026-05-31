# Alpha Visual Artists — Cloudflare Pages

**Project:** `alpha-visual-artists`  
**Branch:** `GIT`  
**Output:** `artifacts/alpha-visual-artists/dist/public`

## Build (local or CI)

```bash
cd /path/to/Alpha-Visual-Artist
pnpm install
PORT=18606 BASE_PATH=/ pnpm --filter @workspace/alpha-visual-artists run build
```

## Environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `PORT` | No (default `18606`) | Dev server only |
| `BASE_PATH` | No (default `/`) | Vite `base` |
| `VITE_CLERK_PUBLISHABLE_KEY` | For auth | Build-time; site loads without it but sign-in is disabled |
| `VITE_PORTAL_API_ENABLED` | No | Set `true` only when `/api` is routed to the Replit `api-server` |

## GitHub Actions

Workflow: `.github/workflows/deploy-ava-pages.yml` (runs on push to `GIT`).

Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `VITE_CLERK_PUBLISHABLE_KEY`.

## SPA routing

`public/_redirects` ships with the build:

```
/*    /index.html   200
```

## Not on static Pages (yet)

- **api-server** (`artifacts/api-server`) — portal, blog admin, storage APIs still target Replit.
- Portal UI shows “Coming soon” until `VITE_PORTAL_API_ENABLED=true` and `/api` is proxied.


## Cloudflare Git integration

If the **alpha-visual-artists** Pages project is connected to GitHub in the Cloudflare dashboard, turn off automatic production deploys for branch `GIT` (or disconnect Git) so this workflow is the single deploy path. Running both causes duplicate builds and conflicting releases.

## Manual deploy

```bash
pnpm --filter @workspace/alpha-visual-artists run build
wrangler pages deploy artifacts/alpha-visual-artists/dist/public \
  --project-name=alpha-visual-artists
```
