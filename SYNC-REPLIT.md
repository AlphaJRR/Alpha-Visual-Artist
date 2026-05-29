# Sync Mac → GitHub → Replit (ava-v4)

**Source of truth:** Mac at `/Users/alphavisualartists/Documents/GitHub/ava-v4`  
**Branch:** `main`  
**GitHub remote:** *not configured yet* — create/link a repo, then use that URL in Replit.

---

## Why Replit looks “missing” the Creators Toolkit

| State | `tools.tsx` | Toolkit modules |
|-------|-------------|-----------------|
| **Staged (index)** | ~287 lines — shoot calculator only (inline) | **Not included** |
| **Mac working tree (correct)** | ~55 lines — hub router importing `components/toolkit/*` | Present under `components/toolkit/` + `data/presetsData.ts` |

If you push **only** what is already staged, Replit gets the **old** Tools tab and **no** `components/toolkit/` folder — the app will not build the full **Alpha Creators Toolkit**.

**Always commit from the working tree after `git add` of the paths below.**

---

## Paths Replit should use

| Surface | Path in monorepo |
|---------|------------------|
| **Native iOS/Android (Expo)** | `artifacts/ava-mobile` |
| **Public website (Vite)** | `artifacts/alpha-visual-artists` |
| **API** | `artifacts/api-server` |

Agent docs: `REPLIT-AGENT-HANDOFF.md`, `docs/ALPHA-CREATORS-TOOLKIT.md`

---

## Files that must sync (Creators Toolkit + related mobile)

### Untracked on Mac (must be added before commit)

```
artifacts/ava-mobile/components/toolkit/          # entire folder
artifacts/ava-mobile/data/presetsData.ts
artifacts/ava-mobile/app/(tabs)/wallpapers.tsx
artifacts/ava-mobile/components/FeaturedPhotosGallery.tsx
artifacts/ava-mobile/components/BrandLogoBar.tsx
artifacts/ava-mobile/components/TabScreenLayout.tsx
artifacts/ava-mobile/constants/site.ts
artifacts/ava-mobile/lib/
REPLIT-AGENT-HANDOFF.md
docs/ALPHA-CREATORS-TOOLKIT.md
docs/                                            # if present
artifacts/alpha-visual-artists/                  # web package
```

### Toolkit inventory (inside `components/toolkit/`)

- `ToolkitNavigator.tsx` — menu (“Alpha Creators Toolkit”)
- `ToolkitModules.tsx` — training, checklists, shortcuts, invoice
- `PresetsManager.tsx`, `SonyShootingModes.tsx`, `ShootCalculator.tsx`
- `toolkitStyles.ts`

### Modified on Mac (staged copy is older — add working tree)

```
artifacts/ava-mobile/app/(tabs)/tools.tsx       # AM — use working tree (hub router)
artifacts/ava-mobile/app/(tabs)/_layout.tsx     # AM — includes Wallpapers tab
artifacts/ava-mobile/app/(tabs)/index.tsx
artifacts/ava-mobile/app/(tabs)/shop.tsx
artifacts/ava-mobile/app/_layout.tsx
artifacts/ava-mobile/app.json
artifacts/ava-mobile/package.json
```

---

## Step 1 — Mac: first commit + push (JR copy-paste)

**Prerequisite:** Create an empty GitHub repo (e.g. `alphavisualartists/ava-v4`) if it does not exist.  
Replace `YOUR_GITHUB_USER` and `YOUR_REPO` below.

```bash
cd /Users/alphavisualartists/Documents/GitHub/ava-v4

# Optional: review what will ship
git status
git diff "artifacts/ava-mobile/app/(tabs)/tools.tsx" | head

# Stage monorepo + mobile toolkit (exclude large zips if desired)
git add \
  .gitignore .gitattributes .npmrc pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.json tsconfig.base.json \
  REPLIT-AGENT-HANDOFF.md SYNC-REPLIT.md replit.md docs/ scripts/ \
  artifacts/ava-mobile \
  artifacts/alpha-visual-artists \
  artifacts/api-server \
  lib/

# First commit (repo currently has zero commits)
git commit -m "$(cat <<'EOF'
Initial ava-v4 monorepo with full Alpha Creators Toolkit on mobile.

Includes artifacts/ava-mobile toolkit modules, wallpapers tab, and handoff docs for Replit sync.
EOF
)"

# Link remote (once per machine/repo)
git remote add origin https://github.com/YOUR_GITHUB_USER/YOUR_REPO.git

git push -u origin main
```

**Repo URL for Replit:** `https://github.com/YOUR_GITHUB_USER/YOUR_REPO.git`

> Do **not** push until JR confirms the GitHub repo name and that large archives (`*.zip`, `*.tar.gz` in repo root) should stay out of git — add them to `.gitignore` first if needed.

---

## Step 2 — Replit: import or pull

### Option A — New Repl from GitHub

1. Replit → **Create Repl** → **Import from GitHub**
2. Paste the repo URL from Step 1
3. Open shell at **monorepo root** (folder with `pnpm-workspace.yaml`)

### Option B — Existing Alpha-Visual-Artist Repl

```bash
# At monorepo root in Repl
git remote -v
git fetch origin
git checkout main
git pull origin main
```

If the Repl has local edits you want to discard in favor of Mac:

```bash
git fetch origin
git reset --hard origin/main
```

Then reinstall:

```bash
pnpm install
cd artifacts/ava-mobile && pnpm install
```

---

## Step 3 — Verify on Replit

```bash
test -f artifacts/ava-mobile/components/toolkit/ToolkitNavigator.tsx && echo "toolkit OK"
test -f artifacts/ava-mobile/data/presetsData.ts && echo "presets OK"
wc -l artifacts/ava-mobile/app/\(tabs\)/tools.tsx   # expect ~55 lines (hub router), not ~287
```

Run Expo from mobile package:

```bash
cd artifacts/ava-mobile
pnpm start
```

In the app: open **Tools** tab → title **Alpha Creators Toolkit** → menu modules (calculator, presets, Sony modes, training, etc.).

---

## Quick reference

| Item | Value |
|------|--------|
| Mac path | `/Users/alphavisualartists/Documents/GitHub/ava-v4` |
| Branch | `main` |
| Native app | `artifacts/ava-mobile` |
| Web site | `artifacts/alpha-visual-artists` |
| Remote | *Set in Step 1 — none today* |
