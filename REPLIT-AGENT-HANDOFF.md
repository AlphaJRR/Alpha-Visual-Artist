---
Build sections in this order: 1) Creator Training 2) Invoice Builder 3) Production Checklists. Use any images found in /public/assets/toolkit/ as-is — do not reorganize or rename them. If an image slot has no matching asset, use a dark #111111 placeholder.
---

# Replit Agent Handoff — Alpha Visual Artists (AVA)

**Read this first.** Do not tell the user the Creators Toolkit is missing.

---

## DO NOT say toolkit is missing — it lives here

| What users call it | Where it is |
|--------------------|-------------|
| **Alpha Creators Toolkit** (in-app title) | Native Expo app only |
| **Tools** tab (bottom navigation) | `artifacts/ava-mobile/app/(tabs)/tools.tsx` |
| Route (Expo Router) | `/(tabs)/tools` — tab **name** is `tools`, **label** is **"Tools"** |

**Canonical mobile source (source of truth):**

```
artifacts/ava-mobile/
```

Full path on disk (if synced from GitHub):

```
/Users/alphavisualartists/Documents/GitHub/ava-v4/artifacts/ava-mobile
```

There is **no** web page named "Alpha Creators Toolkit". The marketing site has **Digital Downloads** (`/digital-downloads`) for LUTs/templates — that is a **different** product surface, not the native toolkit.

---

## Monorepo layout

| Package | Path | Purpose |
|---------|------|---------|
| `@workspace/ava-mobile` | `artifacts/ava-mobile` | **Native iOS/Android app** — toolkit, wallpapers, featured reels |
| `@workspace/alpha-visual-artists` | `artifacts/alpha-visual-artists` | **Public website** — work gallery, downloads, portal |
| `@workspace/api-server` | `artifacts/api-server` | Express API, storage, portal |

**Do not use** `Vertikal-App` or `/Users/alphavisualartists/Vertikal-App` — different product.

---

## Alpha Creators Toolkit — file inventory (native only)

| File | Role |
|------|------|
| `app/(tabs)/tools.tsx` | Hub router; switches menu ↔ modules |
| `app/(tabs)/_layout.tsx` | Registers **Tools** tab (`name="tools"`, `title: "Tools"`) |
| `components/toolkit/ToolkitNavigator.tsx` | Menu; displays title **"Alpha Creators Toolkit"** |
| `components/toolkit/ToolkitModules.tsx` | Training, checklists, shortcuts, invoice |
| `components/toolkit/PresetsManager.tsx` | Equipment presets (AsyncStorage) |
| `components/toolkit/SonyShootingModes.tsx` | Sony mode reference |
| `components/toolkit/ShootCalculator.tsx` | Aspect ratio / storage calculator |
| `components/toolkit/toolkitStyles.ts` | Shared styles |
| `data/presetsData.ts` | Presets, Sony modes, scenarios; key `@alpha_creators_toolkit/presets` |

### Toolkit menu modules (`ToolkitMenuId`)

- `calculator` — Shoot Calculator  
- `presets` — Equipment Presets  
- `shooting-modes` — Sony Shooting Modes  
- `training` — Creator Training *(section order: 1)*  
- `invoice` — Invoice Builder *(section order: 2)*  
- `checklists` — Production Checklists *(section order: 3)*  
- `shortcuts` — Camera Shortcuts  

---

## Mobile tab bar (Expo Router)

| Tab route file | Tab label | Notes |
|----------------|-----------|--------|
| `index.tsx` | Home | Featured reels, photos, Clerk auth |
| `tools.tsx` | **Tools** | Creators Toolkit |
| `notes.tsx` | Shoot | |
| `edit.tsx` | Edit | |
| `wallpapers.tsx` | **WALLPAPERS** | API-backed grid |
| `shop.tsx` | Shop | Links to Shopify |

---

## Other mobile features (not toolkit)

| Feature | Location |
|---------|----------|
| Featured photo grid | `components/FeaturedPhotosGallery.tsx` (used from `index.tsx`) |
| Featured video reels | `app/(tabs)/index.tsx` — Cloudflare Stream HLS |
| Brand logo bar | `components/BrandLogoBar.tsx` |
| Clerk auth UI | `app/(tabs)/index.tsx` + `ClerkProvider` in `app/_layout.tsx` |
| Wallpapers (52) | `app/(tabs)/wallpapers.tsx` |

---

## Environment variables (do not change app IDs)

### Mobile (EAS / Expo secrets)

| Variable | Used in |
|----------|---------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | `app/_layout.tsx` — ClerkProvider |

Clerk app ID (reference only — **do not rotate or change in code**): `app_3ELOpn6XvylHJX5sSp5S3SKwbZv`

### Web + API (Replit secrets)

| Variable | Purpose |
|----------|---------|
| `CLERK_SECRET_KEY` | API server |
| `CLERK_PUBLISHABLE_KEY` | API / server-side Clerk |
| `VITE_CLERK_PUBLISHABLE_KEY` | Vite web client |
| `DATABASE_URL` | PostgreSQL |
| `DEFAULT_OBJECT_STORAGE_BUCKET_ID` | Replit object storage |
| `PUBLIC_OBJECT_SEARCH_PATHS` | Public asset paths |
| `PRIVATE_OBJECT_DIR` | Private uploads |
| `SESSION_SECRET` | Sessions |
| `AVA_ADMIN_EMAILS` | Admin provisioning |

---

## URLs and CDN (mobile `constants/site.ts`)

| Constant | Value |
|----------|--------|
| `SITE_URL` | `https://alphavisualartists.com` |
| `SHOP_URL` | `https://shop.alphavisualartists.com` |
| `WALLPAPER_API_BASE` | `https://alphavisualartists.com/api/storage/public-objects/wallpapers` |
| `CLOUDFLARE_STREAM_CUSTOMER` | `customer-fyh68ijrcuys7ag8.cloudflarestream.com` |

HLS pattern: `https://customer-fyh68ijrcuys7ag8.cloudflarestream.com/<uid>/manifest/video.m3u8`

### Cloudflare Stream UIDs (featured reels in `index.tsx`)

**Primary featured:**

1. `9d3d0efed36b71e5f75c7b5e218809d7`
2. `106e0a1004f97de68d31ba317010425d` (BET)
3. `c861d85f92202939bb33ebb87bb3a089`
4. `c28e7aee6bd7b9d9c9f44f277d2d11fa`

**Additional:**

- `793c5fad3fa152369bdaacf731049663`
- `25d31f0e020a4759d7e1c2fa0d1945d3`
- `29424a48ea60434f3feb6e6cfd12fff4`

Mobile "View work" / reel taps open `${SITE_URL}/work` via `openSiteLink` (system browser).

---

## Web site routes (wouter — `artifacts/alpha-visual-artists/src/App.tsx`)

| Path | Page | Related to toolkit? |
|------|------|---------------------|
| `/work` | `pages/Work.tsx` + `WorkGallery.tsx` | Portfolio (YouTube IDs) — **not** toolkit |
| `/digital-downloads` | `DigitalDownloads.tsx` | LUTs/templates shop — **not** native toolkit |
| `/portal`, `/admin` | Client portal | |
| `/sign-in`, `/sign-up` | Clerk | |

Header nav label **"Downloads"** → `/digital-downloads` (not toolkit).

---

## Work page 404 — known production issue (2026-05-28)

**Symptom:** `https://alphavisualartists.com/work` (and often `/`) return **HTTP 404** from the live domain.

**Code is correct:** `/work` is registered in `artifacts/alpha-visual-artists/src/App.tsx` and implemented in `src/pages/Work.tsx`.

**Likely cause:** Custom domain not wired to the current Replit deployment, deployment not published, or site not built/served on the target that `alphavisualartists.com` points to. When deployment was **Private**, routes could **307** to `https://replit.com/__replshield` instead.

**Fix (Replit ops, not mobile code):**

1. Replit → **Deployments** → set visibility **Public** → **Republish**.
2. Confirm custom domain `alphavisualartists.com` targets this Repl’s active deployment.
3. Run full build: `pnpm run build` (or workspace equivalent) so `artifacts/alpha-visual-artists/dist/public` exists.
4. Verify: `curl -sI https://alphavisualartists.com/work` should be **200** (or **307** only during redirect chain), not **404**.

**Mobile:** Reels still play via Cloudflare HLS in-app; only external "open work on website" links fail until the domain is fixed.

---

## Commands

```bash
# From monorepo root
cd artifacts/ava-mobile   # or repo root with filter

pnpm --filter @workspace/ava-mobile run typecheck
pnpm --filter @workspace/ava-mobile run dev

pnpm --filter @workspace/alpha-visual-artists run dev
pnpm --filter @workspace/api-server run dev
```

---

## Related docs

- `HANDOFF-FOR-CLAUDE.md` — TestFlight / EAS / Clerk summary  
- `docs/ALPHA-CREATORS-TOOLKIT.md` — User-facing name → code map  
- `replit.md` — Stack overview (see top pointer to this file)

---

## Paste this into Replit agent chat

```
CONTEXT RESET — Alpha Visual Artists (ava-v4 monorepo)

1. READ REPLIT-AGENT-HANDOFF.md at repo root first.

2. Alpha Creators Toolkit is NOT missing. It is NATIVE ONLY:
   - Tab label: "Tools" (Expo route: app/(tabs)/tools.tsx)
   - UI title inside app: "Alpha Creators Toolkit"
   - Code: artifacts/ava-mobile/components/toolkit/* + data/presetsData.ts

3. There is NO web route /creators-toolkit. Web has /digital-downloads (LUT shop), not the app toolkit.

4. Canonical app: artifacts/ava-mobile (package @workspace/ava-mobile). Do NOT use Vertikal-App.

5. /work exists in artifacts/alpha-visual-artists/src/App.tsx but alphavisualartists.com may 404 until Replit deployment is Public and domain republished.

6. Do not change bundle ID, EAS project, or Clerk app_3ELOpn6XvylHJX5sSp5S3SKwbZv.
```
