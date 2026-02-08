# Service Problem Section — Visual Design Research & Assets

Research on how to visually design the **Service Problem** section (“Why this service” / Challenge), with inspiration from award-winning and high-converting sites and a concrete asset list.

---

## 1. Why the problem section matters

- Placed **right after the hero** so visitors see it while attention is high.
- Answers: “Do I really need this?” before they scroll away.
- **Don’t make visitors connect the dots**—show the problem clearly (short attention spans).
- Goal: **Relatable pain** → **emotional impact** → **curiosity** (“How do others fix this?”).

---

## 2. Award-winning and reference patterns

### A. Before / after (contrast)

**Reference:** Graphy, Paperbox, Reform, Partful, Reveal (landingpageelements.com).

- **Idea:** One side = “before” (current pain: messy sheets, extra meetings, unclear graphs). Other side = “after” (clarity, one tool, fewer meetings).
- **Why it works:** Instant visual contrast; no long copy needed.
- **Use for ESAP:** e.g. “Without us: siloed tools, delayed rollout, wasted budget” vs “With us: one roadmap, live in months, clear ROI.”

**Visual:** Split layout (50/50 or 40/60). Left = “before” (darker, busier or chaotic). Right = “after” (calmer, single flow or dashboard). Optional divider or “Before | After” label.

---

### B. Floating callout cards (pain points)

**Reference:** Glide (glideapps.com), Bardeen, Antimetal, Chore (landingpageelements.com).

- **Idea:** One headline that states the core frustration. Below or beside it, **3–5 floating cards** (or badges) each stating one pain point (e.g. “Unclear graphs,” “Too many meetings,” “Scattered data”).
- **Why it works:** Scannable; each card = one idea; feels modern and “product-y.”
- **Use for ESAP:** Headline = service-level problem. Cards = “Wasted budget,” “Delayed rollout,” “Siloed tools,” “No in-house capacity,” etc.

**Visual:** Cards with subtle border or glow, slight offset/stack or stagger; optional small icon per card. Dark theme: `border-white/10`, `bg-white/5`, soft shadow. Scroll: stagger-in (e.g. GSAP or CSS `animation-delay`).

---

### C. Problem scale (numbers / impact)

**Reference:** Custom counters and “wall of impact” patterns (e.g. boilerplate BOP docs, Jasper’s Wall of Impact).

- **Idea:** Don’t just say “it’s painful”—show **scale**: “X% of projects overrun,” “Y hours lost per week,” “$Z wasted per year.”
- **Why it works:** Rational + emotional; good for enterprise and government.
- **Use for ESAP:** Optional stat row under the headline: “70% of AI pilots never reach production,” “12–18 months typical time to value,” etc. (Use real or plausible stats.)

**Visual:** 2–4 big numbers with short labels; minimal style (large type, accent color). Optional subtle count-up on scroll (respect `prefers-reduced-motion`).

---

### D. Chaos → order (narrative)

**Reference:** Depict.ai (Awwwards – animation + scrolling), “From chaos to clarity” case studies, product cinematic flows.

- **Idea:** Same scene or diagram **transforming**: chaos (many disconnected nodes, red/warning) → order (single flow, green/success). Often scroll-driven.
- **Why it works:** Tells a mini-story; fits “integration” and “automation” (silos → one system).
- **Use for ESAP:** Especially for **Integration & Automation**: abstract “system chaos” (many boxes, broken lines) morphing into “one connected flow.”

**Visual:** Illustration or diagram (SVG or Lottie); scroll-linked state change or two keyframes. Keep it diagram-like, not literal UI.

---

### E. Simple two-column (copy + one visual)

**Reference:** Classic consulting and StoryBrand-style pages.

- **Idea:** Left = headline + 2–3 impact bullets + one curiosity line. Right = **one strong asset**: illustration, diagram, or short loop (no sound).
- **Why it works:** Clear hierarchy; works on mobile (stack); low production cost.
- **Use for ESAP:** Safe baseline: SectionHeader + short copy block + one illustration or icon set per pain point.

**Visual:** Max-width copy column; asset with consistent style (line art, flat illustration, or simple 3D). Slightly warmer or neutral background than hero to separate (e.g. `#0c0c0e` or very subtle tint).

---

## 3. Recommended direction for ESAP (service problem section)

**Hybrid:** **Floating callout cards** + **one hero visual** (or before/after light).

- **Above the fold (after SectionHeader):**  
  - One **headline** (e.g. “You’ve chosen AI—but connecting it is the hard part”).  
  - **3–4 pain cards** (floating or grid): e.g. “Wasted budget,” “Delayed rollout,” “Siloed tools,” “No in-house capacity.” Each with optional icon.  
- **Below or right:**  
  - **One visual:** either (a) a single “chaos” or “before” illustration (e.g. scattered systems) or (b) a light before/after (before = chaos, after = one flow).  
- **Closing line:** One curiosity CTA: “How do others go from plan to live in months?” (can link to #how-it-works or #what-we-deliver).

This keeps the section scannable, on-brand (dark, primary accent), and buildable with components you already have (Section, SectionHeader, cards) plus one new visual asset.

---

## 4. Assets checklist

### Must-have

| Asset | Purpose | Specs / notes |
|-------|--------|----------------|
| **Pain point icons** (3–5) | One per callout card | 24–32px, outline or duotone, Lucide-style. Can use Lucide (AlertTriangle, Clock, DollarSign, GitBranch, Users) or custom SVG. |
| **Section background** | Differentiate from hero | Subtle gradient or tint (e.g. `#09090b` → `#0c0c0e`, or very light amber/brown in gradient). No new image if using CSS. |

### Strongly recommended

| Asset | Purpose | Specs / notes |
|-------|--------|----------------|
| **“Chaos” or “before” illustration** | Right column or below cards | Single scene: e.g. multiple disconnected boxes, question marks, broken links. SVG or PNG, dark theme (dark bg, light lines). Style: line art or flat, not photo. |
| **Optional “after” state** | If doing before/after | Same scene but connected flow, one path, checkmarks. Can be second frame of same illustration or separate SVG. |

### Optional (elevate)

| Asset | Purpose | Specs / notes |
|-------|--------|----------------|
| **Lottie / lightweight animation** | Chaos → order transition | 2–5 s loop or scroll-driven. Same idea as “chaos → order”; use only if you have design/dev capacity. |
| **Stats (numbers)** | Impact row under headline | 2–4 metrics; copy from marketing. Animated count-up on scroll (optional, respect reduced motion). |
| **Illustration set** | Per-service variant | E.g. Integration = “systems/plugs,” FaaS = “server/cloud,” Innovation Lab = “lab/lightbulb.” One key visual per service. |

### What to avoid

- **Stock photos** of people in meetings (feels generic).
- **Long paragraphs** (keep to headline + bullets + one line).
- **Carousels** for pain points (show all at once or in a small grid).
- **Too much motion** (stagger and one hero visual are enough).

---

## 5. Layout and structure (concrete)

```
[ SectionHeader: badge "Challenge" + title + subtitle ]

[ Headline – one sentence, service-level problem ]

[ Pain cards – 3–4 cards, grid or floating ]
  Card 1: icon + short label (e.g. "Wasted budget")
  Card 2: icon + short label (e.g. "Delayed rollout")
  Card 3: icon + short label (e.g. "Siloed tools")
  Card 4: icon + short label (e.g. "No in-house capacity")

[ Optional: 2-column on desktop ]
  Left: headline + cards + curiosity line
  Right: "Chaos" or before/after illustration

[ Curiosity line – one sentence, link to #how-it-works or #solutions ]
```

**Responsive:** Mobile = single column; headline → cards → visual → curiosity line. Cards can wrap in 2x2 grid on small screens.

---

## 6. Inspiration links (summary)

| Site / element | What to take |
|----------------|--------------|
| **Graphy (problem section)** | Before/after split; clear “before = spreadsheets + meetings” vs “after = one tool.” |
| **Glide (problem statement)** | Headline + floating callout cards for pain points. |
| **Depict.ai (Awwwards)** | Problem section with scroll + animation; motion and pacing. |
| **Landing Page Elements** | Glide, Bardeen, Antimetal, Partful, Reform – problem statements and before/after. |
| **Consulting best practices** | StoryBrand: client as hero; problem first; specific, conversational copy. |
| **BOP / boilerplate docs** | Problem section with counters and impact numbers. |

---

## 7. Content model (for CMS or `lib/services.ts`)

To drive the section from content, add (or extend) per service:

```ts
content.challenge?: {
  headline: string;           // One sentence: service-level problem
  impactCards: Array<{        // 3–4 pain points
    label: string;
    icon?: string;            // Lucide name or asset path
  }>;
  curiosityLine: string;      // "How do others…?"
  curiosityHref?: string;     // e.g. "#how-it-works"
  // Optional:
  illustration?: string;      // Path to chaos/before asset
  illustrationAlt?: string;
  stats?: Array<{ value: string; label: string }>;
}
```

This keeps copy and assets configurable per service (Integration & Automation, FaaS, Innovation Lab) while reusing the same component and layout.

---

## 8. Next steps

1. **Copy:** Finalise headline + 3–4 impact cards + curiosity line per service.
2. **Visual:** Choose one primary pattern (floating cards + one illustration, or light before/after).
3. **Assets:** Add pain icons (or map Lucide icons); commission or pick one “chaos”/“before” illustration per service (or one shared).
4. **Build:** Implement `ServiceProblemSection` with SectionHeader + headline + card grid + optional right-column illustration + curiosity line; add scroll stagger (e.g. GSAP or CSS).
5. **Content:** Add `challenge` to service content (type + `lib/services.ts` or Sanity) and wire props into the section.

Once this is in place, the same research and asset list can be reused for FaaS and Innovation Lab with service-specific copy and one tailored visual each.
