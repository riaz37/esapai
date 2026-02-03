# Award-Winning Product Page — Section-by-Section Blueprint

A concrete, non-generic plan to turn the individual product page into a single narrative with smooth transitions, consistent theme, and storytelling. Everything below references your existing components, theme tokens, and GSAP patterns.

---

## Hero: Use ProductHero as the dedicated hero section

**Decision:** Use [components/features/products/hero/product-hero.tsx](components/features/products/hero/product-hero.tsx) as the **first section** of the product page. It provides a clear, focused hero (GridFloor background, TypewriterTitle, ProductHaloFlow, CTAs) with no full-screen video, so the message is the focus.

- **Product page order:** Render **ProductHero** first, then **ProductCinematicFlow** (problem → solution only; no hero phase inside it).
- **Props:** Pass `title={hydratedProduct.name}`, `subtitle={content.hero?.subtitle ?? [...]}`, `centerIcon={content.hero?.centerIcon}`, `centerIconAlt`, `productSlug={slug}` from product data so the hero is product-specific.
- **Implications:** ProductCinematicFlow becomes **Problem → Solution** only: remove the hero phase (video + hero text + CTA) from its timeline; it starts with the chaos / problem steps and ends with epiphany, solution reveal, and exit wipe. The floating progress nav gains one more section (hero first, then cinematic).

---

## Narrative Arc (One Sentence Per Section)

1. **Hero** — "This is [Product]. Here's what it does."
2. **Cinematic Flow** — “This is the world before; here’s the chaos; watch it become order.”
3. **Solution Video** — “See it in action.”
4. **Architecture Deck** — “Under the hood.”
5. **User Journey** — “This is the path your team takes.”
6. **Business Impact** — “Here’s the proof.”
7. **CTA** — “Take the next step.”

---

## 1. ProductHero (dedicated hero — first section)

**Component:** [components/features/products/hero/product-hero.tsx](components/features/products/hero/product-hero.tsx).

- **Usage:** First section in `product-page.tsx`. Receives `title`, `subtitle`, `centerIcon`, `centerIconAlt`, `productSlug` from `hydratedProduct` and product content.
- **No changes required** to the component itself unless you want product-specific tweaks (e.g. badge text from CMS). Links like "Explore Solution" can point to `#explore` or `#cinematic` to scroll to the problem/solution flow.

---

## 2. ProductCinematicFlow (Problem → Chaos → Order; no hero)

**Current:** Contains hero (video + text) then chaos then order; long single pin.

**Change:** Remove the hero phase from ProductCinematicFlow. The section now starts with **problem/chaos** (e.g. dark or gradient background, then three problem steps or cards) and proceeds to epiphany and solution reveal, then exit wipe. Hero is handled by ProductHero above.

**Improvements (within the flow only):**

- **Product-specific video** (for problem/chaos background; optional or gradient if hero is separate)  
  Use `hydratedProduct.content?.hero?.demoVideo` (e.g. `/productvideo1.mp4` for ERP). Fallback to `/fasih-demo.mp4` only when missing. Same `<video>` ref; swap `src` when `slug` changes so the same timeline still drives grayscale/brightness.

- **Product-aware problem/solution copy**  
  Either:
  - Add a small config in `config/` (e.g. `config/product-cinematic-problems.ts`) keyed by `slug` with 3 items: `title`, `description`, `solTitle`, `solDesc`, `solImpact`, and reuse your existing icons/spreadPos, or
  - Derive one “problem” and one “solution” line from `content.mission` (e.g. first card title/description) so each product tells its own chaos → order story.

- **Chapter label**  
  At the very start of the pinned timeline, add a ref for a small label (e.g. “Chapter 1 — The World Before”). Animate it: `from({ opacity: 0, y: -20 })` then `to({ opacity: 0 }, "chaos")` so it fades as chaos cards appear. Use existing typography: `text-xs md:text-sm uppercase tracking-[0.2em] text-primary/80 font-mono`.

- **Exit as handoff**  
  Instead of only fading the stage and video to 0, add a **full-width wipe** element (a div with `bg-black` or `bg-[#050505]`) that sits above the next section. Animate it with the same timeline at label `"exit"`: e.g. `fromTo(wipeRef, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power2.inOut' })`. So the next section is “revealed” by the wipe rather than appearing after a blank. The next section (ProductSolutionVideo) should sit right under this wipe so there’s no gap.

- **Accessibility**  
  At the top of the `useGSAP` callback, `if (prefersReducedMotion()) { /* set final state, no scrub */ return; }` and optionally shorten the timeline or disable pin for reduced motion (see `performance-section.tsx` / `team.tsx` for your existing pattern).

---

## 3. ProductSolutionVideo

**Current:** Generic headline and single video; no link to previous section.

**Improvements:**

- **Product-specific video and copy**  
  Pass `product` (or `slug` + `initialProduct`) into the section. Use `product.content?.hero?.demoVideo` for the `<video src>`. Use a product-specific headline, e.g. from `content.mission?.title` (“Revolutionize Your Operations”) or a short tagline; fallback to “Intelligence in Motion” only when missing.

- **Narrative caption**  
  Add a one-line caption under the headline (e.g. “See it in action.” or “Witness the future of [product name].”). Animate it with the same ScrollTrigger that runs the clip-path reveal: e.g. `fromTo(captionRef, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, "-=1")` so it appears just before or with the video.

- **Continuity from Section 1**  
  If you added the wipe in ProductCinematicFlow, this section is already revealed by it. Optionally add a 1px top border in `border-primary/20` and a very subtle `bg-gradient-to-b from-primary/5 to-transparent` over the first 100px so the “green room” feeling continues.

- **Respect reduced motion**  
  If `prefersReducedMotion()`, skip clip-path animation and set final state; keep the glow simple or static.

---

## 4. ProductCinematicReelSection (Architecture Deck)

**Current:** Generic reel images and HUD; no product tie-in; possible hydration issues.

**Improvements:**

- **Product-aware reel (optional)**  
  If you later add `content.reelImages?: string[]` to product type, use that here; otherwise keep `REEL_IMAGES` but treat this section as “platform architecture” that’s consistent across products. You can still pass `productSlug` and show a small label like “Architecture — [ProductName]” in the header so the narrative stays product-specific.

- **Chapter label**  
  Reuse the same “chapter” style: e.g. “Chapter 3 — Under the Hood” above or inside the existing SectionHeader so the scroll feels like a story beat.

- **Hydration-safe HUD**  
  Replace `Math.random()` in the HUD bars and hex values with deterministic values (e.g. hash of `index` or a seed from section ref), same idea as `CinematicEdge` in `user-journey.tsx` (duration from edge id). That way server and client match.

- **Transition into UserJourney**  
  When the last blade dissolves and the section fades out, keep the same background tone. Optionally add a short “bridge” label (e.g. “The Journey”) that fades in at the very end of this section’s timeline and stays visible for the first 10% of the next section’s scroll, so the user reads “The Journey” before the React Flow graph appears.

---

## 5. UserJourney

**Current:** Product-specific graph and camera; header fades immediately; no per-step narrative.

**Improvements:**

- **Per-step narrative captions**  
  Extend `JourneyStep` in `config/user-journeys.tsx` with an optional `caption?: string` (e.g. “You define the agent”, “We deploy it at scale”). In `UserJourneyFlow`, add a ref for a caption element (fixed or sticky at bottom-center). In the timeline’s `onUpdate` (or in each step’s `onStart`), set the caption text from the current step and animate it: `fromTo(captionRef, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 })`. Style: `text-sm uppercase tracking-widest text-primary/90` so it matches your theme and doesn’t compete with the graph.

- **Chapter title that updates**  
  Instead of fading the header to 0 at 0, keep a minimal strip (e.g. “The Journey”) and update the subtitle or a second line with the current step’s title (e.g. “Deploy Infra”) when that node is active. So the header becomes a “current chapter” indicator rather than disappearing.

- **Smoother handoff to Business Impact / CTA**  
  On the last step, after a short hold, animate the whole journey stage slightly back (scale 0.98, opacity 0.95) and then let scroll release; or add a final “Outro” step with `targetId: ''` and caption “Where it takes you.” so the transition to the next section feels intentional.

- **Reduced motion**  
  If `prefersReducedMotion()`, skip camera movement (or use very short duration) and show all nodes without emphasis animation; captions can still update for context.

---

## 6. Business Impact (New Section — Use `business-impact.tsx`)

**Current:** File exists but is empty; product has `content.performance.metrics` and mission cards.

**Improvements:**

- **Purpose**  
  “Proof” chapter: big numbers and 2–3 outcome cards, product-specific. Place after UserJourney and before CTA in `product-page.tsx`.

- **Data**  
  Use `content.performance.metrics` for the big numbers (e.g. “75%”, “90%”, “3x”). Use first 2–3 `content.mission.cards` for outcome cards (title + short description).

- **Layout**  
  One row of 3 metrics (large type, primary accent); below, 2–3 cards in a row. Reuse your existing Card styling from ProductCinematicFlow (e.g. `bg-black/90 border-primary/50 backdrop-blur-xl`) so it feels like the same “order” world. Optional: subtle parallax on scroll (e.g. `y: [0, 30]` with ScrollTrigger) so the block feels alive.

- **Animation**  
  On scroll into view: count-up for numbers (GSAP `fromTo` with `innerText` or a ref, e.g. 0 → 75 for “75%”); cards with `from({ opacity: 0, y: 40 })` and stagger. Use `prefersReducedMotion()` to skip or shorten.

- **Narrative**  
  SectionHeader: title “Outcomes”, subtitle product-specific from `content.mission?.subtitle`. Optional chapter label: “Chapter 5 — The Proof.”

- **Theme**  
  Same background as other sections (`bg-black` or `#050505`), same radial gradient with `primary/5`–`primary/10`, same typography and BadgeChip so the page never leaves the “green room.”

---

## 7. CTA Section

**Current:** Generic title/subtitle; not product-specific.

**Improvements:**

- **Product-specific copy**  
  Pass `product` (or `slug` + product name) into CTASection. Title: e.g. “Get [ProductName] for your team” or “Ready to try [ProductName]?”. Subtitle: use `product.content?.mission?.subtitle` or a one-liner that matches the product. Keep the existing star warp and layout.

- **Micro-interaction**  
  Give the primary button a very subtle glow pulse: reuse the same green you use elsewhere (`shadow-[0_0_20px_rgba(19,245,132,0.3)]` with a 2s ease-in-out opacity or scale animation), or wrap the button in a thin ring that animates (similar to InteractiveProductIconHalo but minimal). Keeps the CTA feeling “alive” without breaking the theme.

- **Reduced motion**  
  No continuous pulse if `prefersReducedMotion()`; static glow is fine.

---

## 8. Page-Level: Transitions and Progress

**Section-to-section continuity**

- **Single wipe**  
  The only new “transition” element you need is the one in ProductCinematicFlow (the exit wipe). That already ties Section 1 → 2. For Reel → UserJourney, a shared background and optional “bridge” label (see Section 3) is enough; no extra div needed.

- **Shared background**  
  Ensure every section uses the same base: `bg-black` or `#050505` / `#010202`, and the same radial gradient (`bg-[radial-gradient(...primary/5...)]` or similar). That way scroll never feels like jumping to a different site.

**Floating progress / chapter nav (optional but high impact)**

- **Behavior**  
  A vertical pill on the right (e.g. `right: 1.5rem`, `top: 50%`, `-translateY(-50%)`), containing 7 dots. Each dot = one section (Hero, Cinematic Flow, Solution Video, Reel, Journey, Impact, CTA). On scroll, the active dot gets `scale(1.2)` and `bg-primary`; others are `bg-white/20`. Clicking a dot scrolls to that section (e.g. `sectionRef.current.scrollIntoView({ behavior: 'smooth' })`).

- **Implementation**  
  Give each section a `data-section` (e.g. `data-section="cinematic"`) and use one ScrollTrigger per section with `onEnter` / `onLeave` to update active state (useState). Or use `ScrollTrigger.create({ trigger, start, end, onUpdate: (self) => { setProgress(self.progress); setActiveSection(...) } })` and derive active from progress. Style: `w-2 h-2 rounded-full transition-all duration-300`; active: `scale-125 bg-primary`, inactive: `bg-white/20`. Background of pill: `bg-black/80 border border-white/10 rounded-full p-2`. Fits your theme and gives a clear “where am I in the story” cue.

- **Reduced motion**  
  Dots still work; only skip any animation on the dot (instant switch).

---

## 9. Consistency Checklist

- **Colors**  
  Only `#13F584` (primary), black / `#050505` / `#010202`, white/white-opacity. No new palettes.

- **Typography**  
  SectionHeader + BadgeChip for every section title; narrative captions: `text-xs` or `text-sm uppercase tracking-widest text-primary/80` (or 90). Same font stack as globals.

- **Motion**  
  All new GSAP: `useGSAP`, scoped refs, and `prefersReducedMotion()` check; stick to `power2.inOut` / `power3.out` / `expo.out` so it matches existing sections.

- **Components**  
  No new design system: Card, Button, TypewriterTitle, BadgeChip, SectionHeader, LazySection. New UI only where needed (wipe div, caption div, progress dots).

---

## 10. Suggested Order of Implementation

1. **Hero + product page** — Add ProductHero as the first section in `product-page.tsx`; pass `title`, `subtitle`, `centerIcon`, `centerIconAlt`, `productSlug` from `hydratedProduct`; update `SECTION_IDS` and `sectionRefs` to 7 sections (hero, cinematic, solution-video, reel, journey, impact, cta).
2. **ProductCinematicFlow** — Remove hero phase (video + hero text + CTA); start with problem/chaos; keep video or gradient for chaos background + exit wipe + reduced motion.
3. **ProductSolutionVideo** — Product video/copy + caption + reduced motion.
4. **Business Impact** — Implement section with metrics + cards + product data; add to `product-page.tsx`.
5. **UserJourney** — Captions + updating chapter title + reduced motion.
6. **ProductCinematicReelSection** — Hydration-safe HUD + optional chapter label + bridge label.
7. **CTA** — Product-specific copy + subtle button pulse.
8. **Floating progress** — Section refs + ScrollTrigger + dots.

This order gives you a continuous narrative (hero → problem/solution → demo → proof → journey → outcomes → CTA) and then adds the progress nav so the story is easy to navigate. Everything stays within your theme and existing stack.
