# TODOS

Design and UX debt captured during `/plan-design-review` on 2026-03-28.
Jarvis Assistant items captured during `/plan-ceo-review` on 2026-03-28.

---

## Jarvis Assistant

### ~~J1. Mobile layout spec for Jarvis chat panel~~ — RESOLVED (2026-03-28)
**Decision:** Bottom sheet / drawer pattern. See `docs/designs/jarvis-assistant.md` → Design Spec → Mobile Panel Spec.
**Spec:** 70vh bottom sheet, drag handle, swipe to dismiss, 100vw, 16px top border-radius. Orb remains visible at safe-area-aware offset. Full implementation spec in the plan file.

### J2. Arabic locale copy for Jarvis (messages/ar.json)
**What:** Translate all `Jarvis.*` keys in `messages/en.json` to professional Arabic. Covers section announcements, nudge copy, CTA text, error messages, and voice toggle labels (~25 keys).
**Why:** Without this, the assistant speaks English on the Arabic locale. For ESAP's target market (Gulf enterprise buyers), this is a trust failure.
**Pros:** First-class Arabic experience. Matches the site's RTL-first positioning.
**Cons:** Machine translation is not acceptable for customer-facing enterprise copy. Requires human review.
**Context:** `messages/ar.json` already exists and covers all other sections. CC can produce a draft; a native Arabic speaker needs to review before shipping.
**Effort:** S (human: ~1 day translation + review / CC: ~30min draft)
**Priority:** P1 for Arabic market. Can launch English-first.
**Depends on:** `Jarvis.*` en.json keys finalized in implementation.

### J4. Improve high-intent detection signal quality
**What:** Add dwell time threshold (e.g. >30s on a section) or question quality heuristic to the `HIGH_INTENT` formula. Current formula fires after 2 questions + product + case-study visited with no time-on-section signal.
**Why:** Low-signal leads reduce sales team trust in the Jarvis handoff. A visitor who bounced in 30s but scrolled through two sections triggers the CTA incorrectly.
**Pros:** Higher-quality leads improve sales team confidence in the Jarvis channel. Reduces noise from bounce traffic.
**Cons:** Adds state (dwell time counter). Requires choosing a threshold without user data. Best calibrated post-launch with real traffic.
**Context:** Captured during `/plan-eng-review`. The v1 formula is acceptable as a starting point — ship it, then iterate once you have signal on lead quality from the sales team.
**Effort:** S (human: ~2h / CC: ~10min)
**Priority:** P2 — ship v1 formula, iterate post-launch.
**Depends on:** Jarvis v1 shipped and generating leads.

### J5. iOS Safari backdrop-filter performance test for Jarvis panel
**What:** Test `backdrop-filter: blur(12px)` (the `.glass-cyber` class) on the Jarvis chat panel on iOS Safari. If animation jank or battery drain is detected, fall back to `background: rgba(2,3,5,0.92)` (opaque dark, no blur).
**Why:** iOS Safari has a known performance issue with `backdrop-filter` on complex animated backgrounds. The Jarvis panel sits over GSAP-animated content — higher jank risk than static sections.
**Pros:** Smooth experience on iPhone. Avoids draining battery during sales calls.
**Cons:** Opaque fallback loses the glassmorphism aesthetic on iOS.
**Context:** Fallback CSS is already documented in `docs/designs/jarvis-assistant.md` Design Spec → Panel Visual Spec. Engineering only needs to test and conditionally apply. Can use `@supports (backdrop-filter: blur(1px))` + Safari-specific detection if needed.
**Effort:** S (human: ~1h / CC: ~10min)
**Priority:** P2 — ship first, test on real device.
**Depends on:** Jarvis panel implementation complete.

### J3. demo-scripts.ts copy authoring (demo mode)
**What:** Author the scripted responses in `lib/jarvis/demo-scripts.ts` for demo mode. Engineering ships the scaffolding (`DemoScript` interface, section structure, fallback logic). Sales/marketing team authors the actual words.
**Why:** Without real copy, `?demo=true` shows `[COPY NEEDED]` placeholders — unusable for sales calls.
**Pros:** Sales team gets a live AI demo tool they can use on screen-shares. Closes deals faster.
**Cons:** Cross-team dependency (engineering + sales). Copy quality determines demo effectiveness.
**Context:** Demo mode is gated behind `NEXT_PUBLIC_DEMO_ENABLED=true` env var so it can't ship publicly until copy is ready. Engineering unblocked. Sales owns the content.
**Effort:** M (human: ~2 days copywriting / CC: ~1h for structure)
**Priority:** P2 — ship public Jarvis first. Demo mode follows when copy is ready.
**Depends on:** Engineering: `DemoScript` scaffolding. Sales: copy authoring.

---

## High Priority

### 1. Full design token cleanup — replace `#13F584` with CSS tokens
**What:** Replace all 112 instances of hardcoded `#13F584` (and `rgba(19, 245, 132, ...)`) with Tailwind utility classes (`text-primary`, `bg-primary/20`, `hover:border-primary/30`) or CSS var references (`var(--color-primary)`).
**Why:** Breaks the design token system. If brand color changes, 112 places need manual updates instead of 1 variable.
**Pros:** Single source of truth for brand color. Enables white-labeling. Makes intent explicit.
**Cons:** Time investment; gradient utility classes may still need `[#13F584]` syntax in some edge cases (Tailwind 4 gradient stops).
**Context:** DESIGN.md defines `--color-primary: rgba(19, 245, 132, 1)` and the `@theme` block maps it to Tailwind utilities. Some files already use `bg-primary/20` correctly. The cleanup is a sweep, not a redesign.
**Depends on:** Nothing.

### 2. Remove /product and /service from footer navigation
**What:** Remove "Product" and "Service" nav links from `components/features/navigation/footer/footer.tsx`.
**Why:** Both links lead to 404 pages — `app/[locale]/product/` and `app/[locale]/service/` have no `page.tsx`, only `[slug]/`.
**Pros:** No more broken navigation. Footer still shows Home, About, Case Study, Contact.
**Cons:** Slightly less product/service discoverability from footer (mitigated by navbar dropdowns).
**Context:** The navbar dropdowns handle product/service navigation. Footer links to non-existent pages damage trust and SEO.
**Depends on:** Nothing.

### 3. Wrap MissionSection, TextReveal, CTASection in SectionErrorBoundary
**What:** In `app/[locale]/page.tsx`, wrap the three un-protected sections:
- `<LazySection>` around `<MissionSection>`
- `<LazySection>` around `<TextRevealSection>`
- `<LazySection>` around `<CTASection>`
**Why:** ServiceSection, ProductShowcase, and AchievementSection are already wrapped. A crash in Mission/TextReveal/CTA takes down the whole home page.
**Pros:** Consistent error resilience. CMS issues in any section are contained.
**Cons:** Minor — adds 3 wrapper components.
**Context:** `SectionErrorBoundary` component already exists at `components/ui/section-error-boundary.tsx`.
**Depends on:** Nothing.

### 4. Add CTASection to case study detail page
**What:** Add the existing `CTASection` component before the Related Case Studies section in `components/features/case-studies/pages/case-study-page.tsx`.
**Why:** Users finish reading a compelling case study with no conversion path. The emotional peak ("this company succeeded") has no action.
**Pros:** Captures conversion intent at the right moment. The CTASection component already adapts to context.
**Cons:** Adds page length. May feel pushy if case study content already has a strong close.
**Context:** CTASection is already used on home, about, product, and service pages. Dynamic import it as done in `product-page.tsx`.
**Depends on:** Nothing.

---

## Medium Priority

### 5. Fix LoadingSpinner RTL (logical properties)
**What:** In `components/features/contact/sections/contact-form-card.tsx`, change `animate-spin -ml-1 mr-2` to `animate-spin -ms-1 me-2`.
**Why:** In Arabic (RTL) mode, the spinner appears on the wrong side of the button text.
**Pros:** Correct RTL behavior consistent with site-wide logical property conventions.
**Cons:** None.
**Context:** The rest of the contact form uses logical properties. This is a 2-character fix.
**Depends on:** Nothing.

### 6. Fix empty states in case study list and legal pages
**What:**
- In `components/features/case-studies/pages/case-study-list-animated.tsx`, replace the inline `<p>` empty text with the `EmptyState` component.
- In `app/[locale]/privacy/page.tsx` and `app/[locale]/terms/page.tsx`, replace `<p>Content not available.</p>` with `<EmptyState>`.
**Why:** Inconsistent UX — Services, Achievement, and other sections use the EmptyState component. Legal pages show unstyled text.
**Pros:** Visual consistency. EmptyState has proper `role="status"` and `aria-live` attributes.
**Cons:** Minor code change.
**Context:** `EmptyState` is at `components/ui/empty-state.tsx` with icon, message, and optional action props.
**Depends on:** Nothing.

### 7. Fix partner logo alt text
**What:** In `components/features/home/sections/trusted-partners/index.tsx`, update `DEFAULT_PARTNERS` to use `alt=""` and add `aria-hidden="true"` to partner logo images.
**Why:** Default alt text "Partner 1", "Partner 2" is meaningless for screen readers. Logos are decorative in this context.
**Pros:** Correct accessibility semantics. Screen readers skip decorative images.
**Cons:** When Sanity provides real partner data, the `alt` field from CMS takes over — so this only affects the hardcoded fallback.
**Context:** Partner logos are displayed as a visual trust signal, not interactive links.
**Depends on:** Nothing.

---

## Deferred / Open Decisions

### ~~8. Display font for headings~~ ✅ Fixed 2026-03-28
**What:** Space Grotesk is now wired to headings via `var(--font-heading-en, ...)` in `globals.css`. IBM Plex Sans Arabic handles Arabic locale. DESIGN.md updated.
**Fix commit:** `cfca421` + `e285192` on branch `riaz`.

### ~~13. Inter body font not loading~~ ✅ Fixed 2026-04-02
**What:** `@theme --font-sans` used `var(--font-inter)` which doesn't exist at `:root` scope (only on body via next/font class). Body text fell back to system ui-sans-serif site-wide.
**Fix:** Use `inter.className` on body + literal font names in @theme.
**Fix commit:** `51c9d79` on branch `riaz` via `/design-review`.

### 14. WebGL fallback for service pages
**What:** Service pages using Three.js crash with "Something Went Wrong" when WebGL context fails (low-end devices, headless browsers, privacy-focused browsers).
**Why:** No graceful degradation. Users on affected devices see a full-page error instead of the service content.
**Pros:** Broader device support. Better error resilience.
**Effort:** M (human: ~4h / CC: ~20min) — add WebGL capability check and static fallback rendering.
**Priority:** P2 — affects a minority of users but is a trust-breaking error.
**Depends on:** Nothing.

### ~~10. Fix GSAP "target not found" console warnings~~ — Partially fixed 2026-04-02
**What:** 10+ GSAP animations register against refs that don't exist at mount time, silently failing.
**Fixed:** FINDING-005 (CTA `.container` query, commit `8f3730c`) and FINDING-006 (hero hexagon guard, commit `037444b`).
**Remaining:** ~6 additional GSAP target warnings per page load from other components. Requires deeper investigation into component rendering timing.
**Depends on:** Nothing.

### 15. Solutions section icon-in-circle design pattern
**What:** The "Focus on Growth" solutions section uses icons inside circular containers for each solution card (Agentic AI Integration, FaaS Infrastructure, Tailored Solutions).
**Why:** Matches AI slop pattern #3 (icons in colored circles as section decoration). Not egregious, but identifiable by design-aware visitors.
**Context:** Flagged by /design-review on 2026-04-02. Consider replacing with more distinctive layout (asymmetric grid, illustrations, or product screenshots).
**Priority:** P3 — polish item.
**Depends on:** Design decision.

### 11. Verify Sanity token for service detail pages
**What:** `/en/service/[slug]` pages throw "Something Went Wrong". Check that `SANITY_API_READ_TOKEN` is set in `.env.local` AND in production environment variables. Verify service documents exist in Sanity dataset.
**Why:** Service detail pages are dead links. Any user clicking a service in the nav or from case studies hits a runtime error.
**Context:** Product detail pages (`/en/product/erp`) work fine. Service pages specifically fail — check if `serviceDocument` type has content in Sanity dataset.
**Depends on:** Sanity CMS access.

### 12. Populate Mission and Growth sections at wide viewport (1920px+)
**What:** At 1920px+, "Our Mission" section has ~800px of vertical scroll for a badge, headline, and one sentence. "Focus on Growth" is similarly sparse. Add horizontal content (stat cards, 3D visuals, or supporting copy) at `xl:` breakpoint.
**Why:** Big monitor users see too much empty black canvas. Sections feel unfinished at wide widths.
**Context:** The existing 3D orbs in the Mission section are a start. Add a right-column layout at `xl:grid-cols-2` with stats or supporting visual.
**Depends on:** Design decision on what content fills the right column.

### 9. Product and Service listing pages
**What:** Create `app/[locale]/product/page.tsx` and `app/[locale]/service/page.tsx` as browsable listing pages.
**Why deferred:** Footer links were removed instead (TODOS item 2). Navbar dropdowns handle discovery.
**When to revisit:** When product catalog grows enough to need a browsable index.

