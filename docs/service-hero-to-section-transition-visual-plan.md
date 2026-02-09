# Service Page: Hero → Next Section — Visual Plan (Camera Movement)

The transition is driven by **camera movement**: the viewer feels like a camera is moving through space, not just elements scaling or fading. Scroll = camera.

---

## 1. Starting state (Hero in view)

- Full hero: globe centered, glow, badge, title, subtitle, CTAs.
- We’re “in” the hero space. Mentally: **camera is in front of the globe**, medium shot.

**Scroll position:** Top; user has not scrolled.

---

## 2. Camera move options (pick one direction)

Three creative options. Each uses **scroll progress** to drive the **camera** (or the illusion of it).

---

### Option A — Dolly in through the globe (“Through the world”)

**Idea:** The camera **pushes forward** into the globe. The globe grows to fill the frame, we “enter” it (globe becomes a soft tunnel or portal), then we **emerge** on the other side into the next section.

**Visual beat by beat:**
1. **0% scroll** – Hero as now. Camera at “normal” distance from globe.
2. **0 → 50% scroll** – **Dolly in:** Camera moves forward. Globe gets **bigger** (scale up), fills more of the screen. Hero text and frame **recede** (parallax: they move back / get smaller / fade). Feels like we’re flying toward the globe.
3. **50 → 75% scroll** – Globe is **huge** (or full screen). Brief moment of “inside” or “surface”: we can blur the globe, add a soft vignette or gradient so it reads as a portal/tunnel. Hero UI is gone.
4. **75 → 100% scroll** – We **emerge**: globe softens (blur, fade, or scale through). Next section **reveals** as if we’ve come out the other side (e.g. from dark/globe to the Problem section). One continuous camera move: in → through → out.

**How to build it:**  
- **CSS 3D:** Hero + globe live in a `perspective` container. Scroll drives `translateZ` (and scale) so the globe moves “toward” the camera (or the camera “moves” toward the globe). At the “through” moment, crossfade to a full-bleed globe or gradient that then fades to the next section.  
- **R3F (optional):** If we want true 3D, move the actual camera in the globe scene (dolly forward); at a keyframe, switch to a 2D “tunnel” or gradient and then to the next section.

**Feel:** Cinematic, bold. “We go through the world into the story.”

---

### Option B — Crane down (Camera descends)

**Idea:** The camera **cranes down** (or the world moves up). The hero is the “top” of the set; as we move down, the hero exits the top of frame and the next section **rises into frame from below**, like a single continuous set being revealed.

**Visual beat by beat:**
1. **0% scroll** – Hero fills the frame. Camera “high,” looking at the hero.
2. **0 → 100% scroll** – Camera **lowers** (or the whole scene moves up relative to camera). Hero **slides up and out** of the top of the viewport. Next section **rises from the bottom** into frame. One locked camera, one vertical move.
3. **Parallax:** Globe, then frame, then text can move at **different speeds** (globe slowest, text fastest) so we feel depth as the camera descends.

**How to build it:**  
- **Sticky viewport + moving scene:** One sticky “viewport” (100vh). Inside it, a tall “set” (hero + next section stacked) that **translates up** with scroll. So the camera is fixed; the world moves. Parallax = multiple layers in that set with different `translateY` (or `y`) driven by the same scroll progress (e.g. globe layer 0.3, frame 0.5, text 0.8).  
- **Alternative:** Hero and section are normal document flow; we only add **parallax** (different `translateY` per layer) so it *feels* like a crane: foreground (text) moves up fast, background (globe) moves up slow.

**Feel:** One smooth reveal. “Camera drops and shows the full picture.”

---

### Option C — Pull back (Wide reveal)

**Idea:** Camera **pulls back** from the hero. The hero shrinks; we reveal more “space” around it (dark or gradient), and the next section is **revealed at the edges** (or below) as we go wider. Like ending a film scene by pulling back to show the full location.

**Visual beat by beat:**
1. **0% scroll** – Hero fills the frame. Tight on globe + content.
2. **0 → 100% scroll** – **Pull back:** Everything in the hero **scales down** from center (or camera pulls back). Globe and text get smaller. The “frame” of the shot widens: we see more black/atmosphere, then the **top of the next section** enters at the bottom of the viewport. By the end, the hero is a small “island” at the top and the next section dominates.
3. **Optional:** Slight **blur** or **darkening** at the edges (vignette) that eases off as we pull back, so the “reveal” feels intentional.

**How to build it:**  
- Hero lives in a wrapper. Scroll drives **scale(1 → 0.4)** and optional **translateY** so the hero sits at the top. Next section is below in document flow; it simply rises as we scroll. Parallax: globe scales slightly slower than text (different scale factors from the same progress).  
- For “camera” feel: use **perspective** on the hero wrapper and `transform: scale() translateZ()` so the pull-back feels 3D.

**Feel:** Calm, revealing. “We step back and see what’s next.”

---

## 3. Recommendation

| Option | Feel | Complexity | Best for |
|--------|------|------------|----------|
| **A — Dolly in through globe** | Most dramatic, “through the world” | High (portal moment, possibly R3F) | Maximum impact |
| **B — Crane down** | One continuous vertical move, clear and elegant | Medium (sticky viewport or parallax layers) | Strong “camera” with clear implementation |
| **C — Pull back** | Calm, wide reveal | Medium (scale + parallax) | Simple “camera” story |

**Suggested direction:** **Option B (Crane down)** or **Option A (Dolly in through globe)**.

- **Option B** gives a clear, creative camera move (crane descends, one set revealed) and can be done with a sticky viewport + moving scene and layered parallax—no need to touch the 3D globe internals.
- **Option A** is the most creative (“through the world”) and fits “global” storytelling; it’s more work (portal/tunnel moment, possibly R3F camera or a 2D stand-in for “through”).

Choose **B** for a strong camera move that’s manageable to build; choose **A** if you want the boldest, most memorable transition.

---

## 4. Camera movement: implementation notes

- **Scroll = time for the move:** One scroll range (e.g. 60–80vh) maps to progress `0 → 1`. All camera motion is driven by that progress with smooth easing (e.g. ease-in-out).
- **Parallax = depth:** If we have multiple layers (globe, frame, text), each gets a different **multiplier** on scroll (e.g. `translateY(scrollProgress * 100 * speed)` with `speed` 0.3, 0.6, 1). That gives the “camera moving through depth” feel.
- **3D illusion (CSS):** Use `perspective` on a parent and `transform-style: preserve-3d` on children. Drive `translateZ` and/or `scale` from scroll so the “camera” feels like it’s moving in space.
- **R3F (Option A):** The globe scene has a real camera. We can animate `camera.position.z` (and optionally x, y) from scroll; at a keyframe we hide the 3D scene and show a 2D “tunnel” or gradient that then transitions to the next section.

---

## 5. Reduced motion

- If **prefers-reduced-motion**: no scroll-driven camera. Normal scroll: hero and next section as static content. Optional: single cut or simple fade between them.

---

## 6. Next step

- **Decide:** A (dolly through globe), B (crane down), or C (pull back).
- Then we can break the chosen option into exact keyframes (progress 0, 0.25, 0.5, 0.75, 1) and map each to transforms so we implement one cohesive camera move.
