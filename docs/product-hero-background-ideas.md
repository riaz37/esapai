# Product Hero Section — Background Ideas & Remotion

Research on hero background options for the product cinematic flow and how Remotion can be used for better visuals.

---

## 1. Custom Hero Assets (Implemented)

The product cinematic hero supports **custom video** with a gradient fallback.

### Data (per product in `lib/products.ts`)

- **`content.hero.demoVideo`** — Optional. When set, used as the hero background **video** (e.g. `/productvideo1.mp4`). Same timeline: grayscale + darken on scroll. When not set → gradient fallback.

### Priority

1. If **`demoVideo`** is set → render `<video>` (with overlays).
2. Else → render **gradient** (asset-free mesh + radial layers).

### Example: video

```ts
content: {
  hero: {
    subtitle: ["Voice-Activated ERP for Modern SMEs", "..."],
    centerIcon: "/products/voiceerp.svg",
    demoVideo: "/productvideo1.mp4",  // hero background video (add to public/)
  },
  // ...
}
```

Put video in `public/` (e.g. `public/productvideo1.mp4`). The timeline (grayscale, brightness, opacity on exit) is applied to the wrapper for both video and gradient.

---

## 2. Hero Background Ideas (No Custom Assets)

| Idea | Description | Pros | Cons |
|------|-------------|------|------|
| **Animated gradient / mesh** | Slow-moving radial/ellipse gradients (primary green, dark base). Same GSAP filter treatment. | No assets, performant, matches theme. | Less “narrative” than video. |
| **Remotion composition** | Programmatic “chaos → order” background (particles, noise, silhouettes) via `@remotion/player`. | Rich motion, frame-accurate, reusable. | Extra bundle, needs Remotion setup. |
| **CSS-only motion** | `@keyframes` on gradient position/opacity; optional `prefers-reduced-motion`. | Zero JS for motion, lightweight. | Harder to sync exactly with scroll timeline. |
| **Subtle grid / lines** | CSS or SVG grid that fades or blurs with GSAP. | Tech/product feel, no images. | Can feel generic if overused. |
| **Product icon as hero** | Large, centered product icon (from `content.hero.centerIcon`) with glow; same grayscale/brightness timeline. | Product-specific, uses existing data. | Needs icon asset per product (you may already have). |

**Recommendation:** Keep the current gradient as default; add an optional Remotion hero background for a “premium” variant (see below).

---

## 3. Remotion — How It Fits

[Remotion](https://www.remotion.dev/docs/) lets you build **video compositions in React** with `useCurrentFrame()`, `interpolate()`, `spring()`, etc., and embed them via **`<Player>`** (no pre-rendered video file).

### Already in the project

- **Intro loader:** `LogoBootSequence` in `components/features/products/hero/remotion/LogoBootSequence.tsx`, used in `components/ui/intro-loader.tsx` with `@remotion/player`:
  - `<Player component={LogoBootSequence} durationInFrames={120} compositionWidth={400} compositionHeight={400} fps={30} ... />`
- **Problem/Friction:** `ProblemFrictionSequence.tsx` — chaos/silos style (radial gradient, floating fragments, chromatic-style overlay).
- **Reel:** `ProductCinematicReel.tsx` in sections/remotion.

### Using Remotion for the product hero background

1. **Create a composition** (e.g. `ProductHeroBackground.tsx`) that:
   - Uses `AbsoluteFill` for full-frame.
   - Renders an abstract “world before” look: e.g. slow-moving gradients, subtle particles, or noise (similar to `ProblemFrictionSequence` but calmer).
   - Uses `useCurrentFrame()` for motion; no scroll coupling inside Remotion.

2. **Embed in the hero** with `<Player>`:
   - Same aspect/sizing as the current hero background (e.g. full viewport).
   - `loop={true}` so it runs continuously.
   - Put the Player **behind** hero content (z-index). The existing GSAP timeline can still target a **wrapper** around the Player (e.g. `bgRef`) and animate `filter: grayscale() brightness()` and `opacity` on that wrapper so the Remotion background “sinks into chaos” with scroll, same as now.

3. **Sync with scroll:**  
   Do **not** drive Remotion by scroll. Keep scroll-driven logic in GSAP: animate the wrapper that contains the Player (grayscale, brightness, opacity) so the hero background (Remotion) visually “dissolves” into chaos in sync with the rest of the cinematic flow.

### Remotion docs quick ref

- [Player](https://www.remotion.dev/docs/player) — embed compositions in React apps.
- [Composition](https://www.remotion.dev/docs/composition) — register compositions (for Studio/render); optional if you only use Player.
- [The fundamentals](https://www.remotion.dev/docs/the-fundamentals) — `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()`.
- [Installation in existing projects](https://www.remotion.dev/docs/install) — you already have `remotion` and `@remotion/player`.

### Optional: Product-specific Remotion hero

- Add a Remotion composition that accepts **inputProps** (e.g. `productSlug` or `primaryColor`).
- In the product page, pass `inputProps={{ productSlug: slug }}` into `<Player>` so the background can vary per product (e.g. hue or intensity) while keeping one shared composition.

---

## 4. Summary

- **Bug fix:** All former `videoRef` / `<video>` usage is replaced by a single **asset-free gradient** background and **`bgRef`**; the timeline and reduced-motion branch animate `bgRef` only.
- **Ideas:** Gradient (current), Remotion composition, CSS-only motion, grid, or product icon — all work without custom hero assets.
- **Remotion:** Use it for a richer, programmatic hero background by adding a Remotion composition and embedding it with `<Player>` behind the hero, and keep using GSAP on a wrapper (e.g. `bgRef`) for scroll-driven grayscale/brightness/opacity so the hero still “sinks into chaos” with the rest of the section.
