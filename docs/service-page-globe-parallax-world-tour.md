# Service Page: Advanced Parallax Globe & World Tour

Concept and implementation notes for a scroll-driven globe that feels like a full world tour.

---

## 1. Core concept: scroll-linked world tour

- **Sticky globe**: The hero becomes a tall scroll area (e.g. 300–400vh). The globe stays **sticky** while content scrolls; the globe is the constant “stage.”
- **Waypoints**: Each major section (or scroll segment) maps to a **geographic waypoint** (camera angle or globe rotation). As scroll progress goes 0 → 1, the globe **rotates** to show Americas → Europe → MENA → Asia → Pacific, then back or loop.
- **Smooth transitions**: Interpolate rotation (phi = longitude, theta = latitude) between waypoints so the “tour” feels continuous, not jumpy.

Result: user scrolls down the service page and the globe smoothly turns to show different regions, like a guided world tour.

---

## 2. Parallax ideas

| Idea | Description |
|------|-------------|
| **Scroll-driven rotation** | Globe rotation (phi/theta) is driven by scroll progress. Primary effect for “world tour.” |
| **Layered depth** | Globe, atmosphere, arcs, and UI move at different rates (e.g. globe 1x, atmosphere 0.7x, arcs 1.2x) for depth. |
| **Vertical parallax** | Globe container moves slightly slower than scroll (e.g. `transform: translateY(scroll * 0.3)`) so it lags behind. |
| **Scale / zoom** | Slight zoom-in at mid-scroll (e.g. 1 → 1.1) then back to 1 at end of hero for a “diving into the world” feel. |
| **Opacity by section** | Globe fades or softens when sections (Problem, Features, etc.) are in view, so content stays legible. |

---

## 3. Transition ideas (between sections / waypoints)

| Transition | Description |
|------------|-------------|
| **Geographic waypoints** | Each block of scroll (e.g. 0–0.2, 0.2–0.4, …) maps to a target (lat/lng or phi/theta). Use smooth interpolation (ease-in-out) between waypoints. |
| **Arc emphasis** | When a waypoint is “active,” briefly emphasize arcs that originate or land in that region (e.g. brighter color, thicker arc, or extra ring). |
| **Atmosphere pulse** | On entering a new waypoint, a short atmosphere glow or ring pulse (already have rings in `components/ui/globe.tsx`). |
| **Section title → look-at** | Optional: section title in view could nudge the globe to “look at” a region (e.g. “Global deployment” → show spread of arcs). |
| **Lighting shift** | Scroll could subtly shift directional light (e.g. day → dusk) per segment for mood. |
| **Zoom in/out** | Slight camera zoom into a region at waypoint, then pull back for next (needs camera distance control in R3F). |
| **Snap or free** | **Snap**: scroll snaps to waypoints (full-page-story feel). **Free**: continuous scroll with smooth interpolation. Free is usually safer for accessibility and “escape hatch.” |

---

## 4. Suggested waypoints (example)

Map scroll progress to one full “orbit” or partial tour:

| Progress | Region | Phi (longitude) | Theta (lat tilt) | Feel |
|----------|--------|------------------|-------------------|------|
| 0 | Americas | 0 | 0.3 | Start |
| 0.25 | Europe / MENA | π/2 | 0.3 | |
| 0.5 | Asia | π | 0.3 | |
| 0.75 | Pacific | 3π/2 | 0.3 | |
| 1 | Americas | 2π | 0.3 | Loop |

Phi/theta values are illustrative; tune so the globe “faces” the desired region (three-globe uses standard spherical coords).

---

## 5. Implementation outline

### 5.1 Globe: accept scroll-driven rotation

- **Current**: `World` uses `<OrbitControls autoRotate={true} />` and no external rotation.
- **Change**: Add a **controlled mode**:
  - Optional prop, e.g. `rotation?: { phi: number; theta: number }` (or `scrollProgress: number` + waypoints inside globe).
  - When `rotation` is provided: **disable** autoRotate and apply `rotation` to the globe’s parent `<group>` (the same `groupRef` that holds the ThreeGlobe instance). Apply each frame or when `rotation` changes (e.g. in a `useFrame` or `useEffect` that sets `groupRef.current.rotation.order = 'YXZ'` and sets `.x` (theta) and `.y` (phi)).
  - When `rotation` is not provided: keep current behavior (OrbitControls + autoRotate).

This keeps the existing globe usable elsewhere and adds a scroll-driven mode for the service page.

### 5.2 Service page: scroll container + progress

- **Option A – Motion**: Reuse the pattern from `portal-video-showcase.tsx`:
  - Wrap hero + following sections in a ref. Use `useScroll({ target: containerRef, offset: ["start start", "end end"] })` to get `scrollYProgress` (0 → 1).
  - Use `useTransform(scrollYProgress, waypointInputs, waypointPhis)` (and same for theta) to get smooth phi/theta from progress.
  - Pass `rotation={{ phi, theta }}` into `World`. Use `useSpring` on phi/theta if you want smoother, slightly delayed motion.

- **Option B – GSAP ScrollTrigger**: Similar idea:
  - One or more `ScrollTrigger` instances that define segments (e.g. by section or by a single long hero).
  - On update, compute progress (e.g. 0–1) and interpolate waypoints to get phi/theta, then set state or a ref that the globe reads (e.g. in a context or callback).

Prefer **Motion** if you want minimal GSAP surface and consistency with `portal-video-showcase`; use **GSAP** if you’re already driving other service-page animations with ScrollTrigger.

### 5.3 Layout: sticky globe + tall hero

- Hero section: e.g. `min-height: 300vh` (or 400vh) with the globe in a **sticky** wrapper (`position: sticky; top: 0; height: 100vh`).
- So: one tall column of scroll, globe fixed in view for that whole distance, scroll progress 0 → 1 drives waypoints.
- Section content (Problem, Features, etc.) can either:
  - Sit **below** this tall hero (current structure), and “world tour” runs only in the hero, or
  - Be **overlaid** on the same sticky area (text/sections scroll over the globe) so the tour spans the full page. For overlay, use the same scroll target but a larger scroll height so progress 0 → 1 covers the whole page.

### 5.4 Performance and a11y

- **Lazy load globe**: Keep dynamic import and `ssr: false` for the globe.
- **prefers-reduced-motion**: If `prefersReducedMotion()` is true, keep globe static (e.g. single default view or autoRotate only, no scroll-driven rotation). Use `@/lib/utils/performance-utils`.
- **Optional skip**: Consider a “Skip animation” or “Reduce motion” control that disables scroll-linked rotation.

---

## 6. Quick wins (without full waypoint system)

- **Parallax lag**: In the current hero, drive the globe container’s `translateY` from scroll (e.g. `useScroll` + `useTransform` with a 0.3 factor) so the globe lags slightly.
- **Opacity by scroll**: Fade globe from 0.4 to 0.2 as user scrolls out of hero so sections read better.
- **Single “fly-to”**: On first scroll past hero, one smooth rotation (e.g. from current view to Asia) then hold or slow autoRotate.

---

## 7. Files to touch

| File | Change |
|------|--------|
| `components/ui/globe.tsx` | Add optional scroll-driven rotation (controlled phi/theta, disable autoRotate when set). |
| `types/ui.ts` or `types/props.ts` | Add `rotation?: { phi: number; theta: number }` (or equivalent) to `GlobeConfig` / `WorldProps`. |
| `components/features/services/hero/service-hero.tsx` | Either (a) keep hero as-is and add a wrapper that provides scroll progress + rotation to `World`, or (b) turn hero into tall sticky section and drive rotation from scroll. |
| `components/features/services/pages/service-page.tsx` | If hero becomes tall + sticky, ensure ref wraps hero (and optionally following sections) for `useScroll` target. |
| Optional: `config/service-globe-waypoints.ts` | Export waypoint array `[ progress, phi, theta ][]` for easy tuning. |

---

## 8. Summary

- **Main idea**: Sticky globe + scroll progress → interpolated geographic waypoints → globe rotation (phi/theta) for a “full world tour” feel.
- **Parallax**: Add depth (layers), vertical lag, optional zoom/opacity.
- **Transitions**: Waypoints, arc emphasis, atmosphere pulse, optional lighting or section-based “look-at.”
- **Implementation**: Globe accepts external rotation; service page uses a tall sticky hero (or full-page overlay) and Motion or GSAP to map scroll → waypoints → rotation, with reduced-motion and performance in mind.

If you want to proceed, the next concrete step is implementing the optional `rotation` prop and applying it to the globe’s group in `components/ui/globe.tsx`, then wiring scroll progress in the service hero.
