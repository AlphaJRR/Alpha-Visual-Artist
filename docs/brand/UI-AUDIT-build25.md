# UI Audit — AVA Mobile (Build 25 reference)

**Scope:** `artifacts/ava-mobile` after brand token lock-in  
**Reference:** `BRAND-IDENTITY.md`, `constants/brand.ts`  
**Note:** `app.json` iOS `buildNumber` is currently `8`; this audit reflects the full in-repo UI surface targeted as “build 25” deliverable.

---

## Aligned

| Area | Status |
|------|--------|
| Dark-first UI | Most screens use near-black backgrounds (`#0D0D0D` / `#0a0a0a` family) — close to Deep Black / AVA Black |
| Minimal chrome | Tab shell, toolkit, and home scroll are low-clutter, photo-forward |
| `useColors` hook | Error and not-found screens consume semantic tokens from `constants/colors.ts` (now mapped to brand palette) |
| Brand logo bar | Centered AVA mark, transparent bar — does not fight photography |
| Toolkit module accents | Per-module colors in `ToolkitNavigator` fit “film/social accents only” pattern |
| User-facing app name | `app.json` → “Alpha Visual Artists”, dark `userInterfaceStyle` |

---

## Gaps / fixes needed

| Issue | Detail |
|-------|--------|
| Legacy cyan accent | `#00d4ff` still hardcoded across home, shop, tabs, toolkit, calculators, deep links — violates 20% Alpha Red rule for CTAs |
| Wrong background hex | `#0a0a0a` used instead of tokenized `#0D0D0D` / `#080808` in ~15 files |
| Brand fonts not applied | `_layout` loaded Inter; Bebas / Space Grotesk / DM Mono loaded in this pass but most `StyleSheet`s lack `fontFamily` |
| Purple invoice module | `InvoiceBuilder` uses `#2D1B4E` / `#9B7FD4` as primary surfaces — acceptable as film accent module, but CTAs should still use Alpha Red |
| Inter dependency | `@expo-google-fonts/inter` still in package.json until fully removed after screen migration |
| Splash / adaptive icon | `app.json` splash `#0a0a0a` — should match `brandColors.deepBlack` |
| Build metadata | No DM Mono build label in UI; internal build number not surfaced for QA |

---

## Prioritized fix list

### P0 — Brand-breaking

1. **Replace cyan (`#00d4ff`) on primary CTAs** with `brandColors.alphaRed` — home hero buttons, shop buy CTAs, tab active tint, toolkit primary buttons, progress bars (`edit`, `notes`).
2. **Centralize colors** — import `brandColors` in remaining tab screens (`index`, `shop`, `edit`, `notes`, `wallpapers`) instead of inline hex.
3. **Wire display typography** — apply `typography.headline` / Bebas to section titles on home and tools entry.

### P1 — Consistency

4. Normalize all root `backgroundColor` to `brandColors.deepBlack` or `avaBlack`.
5. Update `openSiteLink` / `expo-web-browser` toolbar to Deep Black + Alpha Red controls.
6. Swap splash / adaptive icon background hex in `app.json`.
7. Remove unused Inter font load once headline styles use Bebas on key screens.

### P2 — Polish

8. Invoice / wallpaper modules: keep module accent purple/orange but align shared borders to `borderGray`.
9. Add optional `BrandLogoBar` red underline or meta line in DM Mono for campaign builds.
10. Document EAS build number vs marketing “build 25” in release notes.

---

## Files touched in brand lock-in (baseline)

- `BRAND-IDENTITY.md`
- `constants/brand.ts`, `constants/theme.ts`, `constants/colors.ts`
- `app/_layout.tsx` (font loading)
- `app/(tabs)/_layout.tsx`, `components/TabScreenLayout.tsx`, `components/toolkit/toolkitStyles.ts`
- `lib/openSiteLink.ts`

Remaining P0/P1 work is tracked above for a follow-up pass.
