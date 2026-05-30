# Alpha Visual Artists — Brand Identity

**Version:** 1.0 · **Status:** Source of truth for AVA product, web, and mobile.

---

## Brand personality

Cinematic · Premium · Creative Authority · Modern · Bold · High-End Production · Artist-First · Emotionally Powerful

## Positioning

**Creative Authority Brand** — Cinematic Production, Platform-Native Strategy, Audience Psychology

---

## Color system

### Primary palette (80% of UI)

Use black, dark gray, and white for surfaces, typography, and structure. Reserve **Alpha Red** for the 20% accent layer.

| Token | Hex | Role |
|-------|-----|------|
| AVA Black | `#080808` | Deepest background, hero sections |
| Deep Black | `#0D0D0D` | App root, screen backgrounds |
| Graphite | `#111111` | Cards, elevated surfaces |
| Border Gray | `#1C1C1C` | Dividers, borders |
| Border Gray Light | `#1E1E1E` | Subtle borders, inputs |
| Pure White | `#FFFFFF` | Primary text, icons on dark |

### Accent (20% of UI)

| Token | Hex | Role |
|-------|-----|------|
| Alpha Red | `#E8000A` | Logos, CTAs, highlights, progress, emphasis words |

**Rule:** ~80% black/dark gray/white · ~20% Alpha Red. Do not use red for body copy, large backgrounds, or decorative fills.

### Secondary accents (film / social modules only)

Teal, Blue, Purple, Magenta, Orange, Yellow, Red — toolkit category icons, reel tags, and editorial accents only. Never replace Alpha Red on primary CTAs.

---

## Typography

| Family | Role | Treatment |
|--------|------|-----------|
| **Bebas Neue** | Headlines, display | ALL CAPS, oversized, tight leading |
| **Space Grotesk** | Body, subheads | SemiBold for subheads; Regular/Medium for paragraphs |
| **DM Mono** | Metadata, timecodes, labels | UPPERCASE, high letter-spacing |

### Type scale (mobile reference)

| Role | Font | Size | Weight | Notes |
|------|------|------|--------|-------|
| Display XL | Bebas Neue | 40–48 | 400 | Hero titles, tab heroes |
| Display | Bebas Neue | 32–36 | 400 | Section headers |
| Headline | Bebas Neue | 24–28 | 400 | Card titles, ALL CAPS |
| Subhead | Space Grotesk | 16–18 | 600 | Section labels |
| Body | Space Grotesk | 14–16 | 400 | Paragraphs, descriptions |
| Caption | Space Grotesk | 12–13 | 400 | Secondary copy |
| Meta | DM Mono | 10–12 | 400 | Tags, timecodes, `letterSpacing: 2+` |

---

## Motion

Slow, confident movement · clean transitions · cinematic pacing · large type · minimal clutter  

Reference tone: Apple, Nike, A24, Vox, Netflix, Porsche campaign pacing.

---

## Photography

Deep blacks · strong contrast · rich skin tones · cool blue shadows · warm highlights  

**Avoid:** over-saturation, cheap gradients, excessive glow, cluttered layouts.

---

## Taglines

| Priority | Line |
|----------|------|
| Primary candidate | **CREATE WITHOUT LIMITS** |
| Alternates | STORIES MOVE PEOPLE · FILM. DESIGN. CULTURE. · CREATIVITY IS A RESPONSIBILITY · THE WORK SPEAKS FIRST |

---

## Do / Don't

### Do

- Lead with black surfaces and white type; use Alpha Red only for action and emphasis.
- Use Bebas Neue for display moments; Space Grotesk for readable UI copy.
- Use DM Mono for technical labels (build numbers, durations, toolkit metadata).
- Keep layouts sparse; let photography and type breathe.
- Match iOS/Android tokens in `artifacts/ava-mobile/constants/brand.ts` and `colors.ts`.

### Don't

- Replace Alpha Red with cyan, teal, or legacy `#00d4ff` on primary CTAs.
- Flood screens with red backgrounds or red body text.
- Mix more than one accent color on a single primary button row.
- Use Inter or system default for branded headlines once brand fonts are loaded.
- Add glow effects, neon gradients, or rainbow UI chrome on core brand screens.

---

## Implementation

- **Mobile tokens:** `artifacts/ava-mobile/constants/brand.ts`, `constants/theme.ts`, `constants/colors.ts`
- **Quick reference (print/PDF):** `docs/brand/AVA-Brand-Quick-Reference.html`
- **UI audit:** `docs/brand/UI-AUDIT-build25.md`
