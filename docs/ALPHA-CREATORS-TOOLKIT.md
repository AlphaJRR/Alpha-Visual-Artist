---
Build sections in this order: 1) Creator Training 2) Invoice Builder 3) Production Checklists. Use any images found in /public/assets/toolkit/ as-is — do not reorganize or rename them. If an image slot has no matching asset, use a dark #111111 placeholder.
---

# Alpha Creators Toolkit — code map

For Replit agents, Claude, and contributors. **User-facing name** vs **implementation**.

## Names users see

| Surface | Label |
|---------|--------|
| Bottom tab | **Tools** |
| Toolkit home screen | **Alpha Creators Toolkit** |
| Section eyebrow | **CREATOR TOOLS** / **Creator Tools** |

Search the codebase for **"Tools"** (tab) and **"Alpha Creators Toolkit"** (screen title), not a single string everywhere.

## Platform

| Platform | Has toolkit? |
|----------|----------------|
| **Native app** (`artifacts/ava-mobile`) | **Yes** — full implementation |
| **Website** (`artifacts/alpha-visual-artists`) | **No** — use `/digital-downloads` for downloadable products only |

## Entry points

```
artifacts/ava-mobile/
├── app/(tabs)/_layout.tsx     # Tab: name="tools", title="Tools"
├── app/(tabs)/tools.tsx       # Router: menu ↔ modules
├── data/presetsData.ts        # Data + AsyncStorage key
└── components/toolkit/
    ├── ToolkitNavigator.tsx   # Main menu
    ├── ShootCalculator.tsx
    ├── PresetsManager.tsx
    ├── SonyShootingModes.tsx
    ├── ToolkitModules.tsx     # training | checklists | shortcuts | invoice
    └── toolkitStyles.ts
```

## Module IDs (`ToolkitMenuId`)

Defined in `ToolkitNavigator.tsx`:

- `calculator`, `presets`, `shooting-modes`, `training`, `invoice`, `checklists`, `shortcuts` (creator sections **1→3**: training, invoice, checklists)

## Persistence

- Presets: `PRESET_STORAGE_KEY = '@alpha_creators_toolkit/presets'` in `presetsData.ts`
- Read/write in `PresetsManager.tsx` via AsyncStorage

## Restoring on Replit

1. Ensure `artifacts/ava-mobile` exists in the Repl (sync from GitHub `ava-v4`).
2. Open **Tools** tab in Expo dev client — no extra env vars required for toolkit (Clerk optional for Home auth only).
3. Do **not** add toolkit to the Vite site unless product asks for a separate web version.

## See also

- [REPLIT-AGENT-HANDOFF.md](../REPLIT-AGENT-HANDOFF.md) — full monorepo + URLs + Cloudflare UIDs
