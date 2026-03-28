# TODOS

Design and UX debt captured during `/plan-design-review` on 2026-03-28.

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

### 10. Fix GSAP "target not found" console warnings
**What:** 10+ GSAP animations register against refs that don't exist at mount time, silently failing. Add `if (!ref.current) return;` guards before all `gsap.to(ref.current, ...)` calls.
**Why:** Silent animation failures mean content may stay at opacity-0 or un-translated. These are bugs masquerading as warnings.
**Cons:** Small effort, high confidence impact on animation reliability.
**Context:** Visible in browser console on homepage load. Primarily affects scroll-reveal animations in hero and section components.
**Depends on:** Nothing.

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

