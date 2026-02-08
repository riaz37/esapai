# Service Pages — Section Design, Data Requirements & Storytelling Inspiration

Deep-dive section plan for the three service pages: **Integration & Automation**, **FaaS**, and **Innovation Lab**. Each service gets a clear understanding, section list (including “what we need from you”), and pointers to storytelling patterns from strong reference sites.

---

## Part 1: Understanding Each Service

### 1. Integration & Automation

**What it is:** End-to-end professional service—from strategy and assessment through custom agent development, system integration, change management, and ongoing support. We act as the guide from “we want AI” to “we have it running and supported.”

**Who it’s for:** Enterprises and government entities that have or are selecting AI products but lack in-house capacity to integrate, roadmap, and run them successfully.

**Problem we solve:** “We have tools (or are evaluating them) but can’t connect them to our systems, don’t have a clear roadmap, and don’t want to own the full implementation risk.”

**What we deliver:** Strategy & assessment → opportunity & ROI analysis → custom agent development → system integration → technology selection → change management → training & optimization → implementation roadmap → 24/7 support & maintenance.

**Data / inputs we need from the client:**
- Strategic: Business goals, success metrics, timeline, budget range, decision-makers.
- Technical: Current systems (ERPs, CRMs, APIs), data sources, security/compliance requirements, integration points.
- Operational: Key workflows to automate, pain points, change readiness (teams, training needs).
- Access: Staging/sandbox environments, documentation, and (later) production access for deployment.

---

### 2. FaaS (AI Agents Framework-as-a-Service)

**What it is:** Managed platform to build, deploy, and run AI agents. We run the infrastructure (cloud, scaling, security, monitoring); the client focuses on agent logic and business use cases.

**Who it’s for:** Product and engineering teams that want to ship agents quickly without building and operating infra (DevOps, SRE, security, compliance).

**Problem we solve:** “We want to build and scale AI agents without owning servers, scaling, or 24/7 ops.”

**What we deliver:** Cloud-native infra, rapid deployment pipeline, monitoring & observability, security & compliance, 24/7 support & maintenance—all as a managed service.

**Data / inputs we need from the client:**
- Use case: What agents will do (workflows, APIs, data sources), expected scale (QPS, users).
- Technical: Preferred runtimes/languages, existing CI/CD, auth/SSO, data residency or compliance needs.
- Commercial: Expected usage bands, SLAs, support tier (standard vs dedicated).

---

### 3. Innovation Lab (ESAP AI Innovation & Research Lab)

**What it is:** R&D and exploration service—research, rapid prototyping, partnerships, early access, and custom research projects. Explores frontier AI and validates ideas without the client betting the farm.

**Who it’s for:** Enterprises and innovation teams that want to explore new AI use cases, prototypes, or partnerships without full-time R&D hiring.

**Problem we solve:** “We need to explore what’s next (new models, use cases, tech) without committing to a full build or hiring a lab.”

**What we deliver:** Research & development, prototype development, technology partnerships, early access programs, custom research projects—often in time-boxed sprints (e.g. 6-week discovery → prototype → validation).

**Data / inputs we need from the client:**
- Challenge: Specific problem or opportunity (e.g. “Arabic NLP for our support,” “proof of concept for X”).
- Scope: Exploration vs. prototype vs. roadmap; timeline and budget range.
- Constraints: IP, confidentiality, data sensitivity, partnership preferences (universities, vendors).

---

## Part 2: Sections to Build (Per Service)

Sections follow the flow: **Hero → Problem (why this service) → Solution (what we do / how we deliver) → How it works (process) → What we need from you → Proof / outcomes → CTA.**

| # | Section | Integration & Automation | FaaS | Innovation Lab |
|---|--------|---------------------------|------|----------------|
| 1 | **Hero** | ✓ Same pattern | ✓ Same pattern | ✓ Same pattern |
| 2 | **Problem: Why this service** | ✓ | ✓ | ✓ |
| 3 | **Solution: What we deliver** | ✓ Phases + deliverables | ✓ Platform capabilities | ✓ Offerings (R&D, prototype, partnerships) |
| 4 | **How we deliver / Process** | ✓ Our methodology (e.g. 5–6 phases) | ✓ From signup to production | ✓ Sprint / engagement model |
| 5 | **What we need from you** | ✓ Inputs checklist | ✓ Requirements / onboarding | ✓ Brief / scope inputs |
| 6 | **Proof & outcomes** | ✓ Case teaser + metrics | ✓ Proof row + testimonial | ✓ Example projects / early access |
| 7 | **CTA** | ✓ Same pattern | ✓ Same pattern | ✓ Same pattern |

---

## Part 3: Section-by-Section Design (All Three Services)

### Section 1 — Hero

**Purpose:** Service name + one-line value. No long copy.

**Content (per service):**
- **Integration & Automation:** Headline e.g. “Integration & Automation”; subtitle: “From strategy to deployment—integration and automation that drives ROI.”
- **FaaS:** “AI Agents Framework-as-a-Service (FaaS)”; “Managed AI framework platform. Focus on innovation; we handle scaling.”
- **Innovation Lab:** “ESAP AI Innovation & Research Lab”; “Cutting-edge AI R&D. Pushing boundaries of AI.”

**Visual:** Full-viewport or near full-viewport; dark base; centered title + subtitle; minimal motion. No product halo.  
**Storytelling ref:** Clean hero like Stripe/Linear—clear value in few words.

---

### Section 2 — Problem: Why this service

**Purpose:** Service-level problem + emotional impact + curiosity. Client as hero; we’re the guide.

**Content (per service):**
- **Integration & Automation:** “You’ve chosen AI—but connecting it to your systems and people is the hard part.” Impact: wasted budget, delayed rollout, siloed tools. Curiosity: “How do others go from plan to live in months?”
- **FaaS:** “You want to build and ship agents, not run infrastructure.” Impact: distraction, hiring ops, security/compliance burden. Curiosity: “What if you could deploy in minutes and scale without a team?”
- **Innovation Lab:** “You need to explore what’s next without betting the farm.” Impact: slow innovation, fear of wrong bet. Curiosity: “What if you could test frontier AI in weeks, not years?”

**Visual:** Single column or 2-column (copy + simple visual). Cards or short statements; scroll stagger. Slightly warmer tint than hero.  
**Storytelling ref:** StoryBrand-style: client as hero, problem first; e.g. consulting sites that open with “When X happens…” or “If you’re facing…”.

---

### Section 3 — Solution: What we deliver

**Purpose:** Clear answer to “What do I get?”—phases, deliverables, or capabilities. No vague “transformation” without substance.

**Content (per service):**
- **Integration & Automation:** Headline “What we deliver.” Process strip or bento: Strategy & assessment → Opportunity & ROI → Custom agents → Integration → Tech selection → Change management → Training → Roadmap → Support. Each with one-line deliverable (reuse `content.features.items`).
- **FaaS:** Headline “Platform capabilities.” Bento or feature grid: Cloud-native infra, Rapid deployment, Monitoring & observability, Security & compliance, 24/7 support. Short benefit per item (reuse `content.features.items`).
- **Innovation Lab:** Headline “How we explore with you.” Cards: R&D, Prototype development, Technology partnerships, Early access, Custom research. One line each (reuse `content.features.items`).

**Visual:** Numbered process strip (horizontal or vertical) or bento grid; diagram-like. Scroll stagger.  
**Storytelling ref:** Linear-style feature sections with clear benefit per block; Vercel-style bento for capabilities.

---

### Section 4 — How we deliver / Process

**Purpose:** Show the *journey* with us—steps, timeline, and who does what. Builds trust and sets expectations.

**Content (per service):**
- **Integration & Automation:** “Our process.” 5–6 steps, e.g. Discovery & assessment → Strategy & roadmap → Design & build → Integrate & test → Deploy & train → Support & optimize. Optional: typical timeline (e.g. 12–16 weeks to go-live) and “You’ll get: kickoff doc, weekly syncs, milestone reviews, handover pack.”
- **FaaS:** “From signup to production.” e.g. Onboard & configure → Connect your repo / agents → Deploy to staging → Security & compliance review → Go live → Scale & support. Optional: “Live in days, not months.”
- **Innovation Lab:** “How a typical engagement works.” e.g. Brief & scope (Week 1) → Discovery & feasibility (Weeks 2–3) → Prototype (Weeks 4–6) → Validate & roadmap (Week 6+). Optional: “6-week sprint to first prototype.”

**Visual:** Horizontal timeline or vertical stepper; each step has title + one line. Optional duration badges.  
**Storytelling ref:** “How it works” process sections (e.g. Reactiv Labs, Superweb)—clear phases with short copy; avoid carousels.

---

### Section 5 — What we need from you

**Purpose:** Be explicit about client inputs so we can deliver well. Reduces friction and sets a “we’re prepared” tone.

**Content (per service):**
- **Integration & Automation:** “What we’ll need to get started.” Checklist or short list: Business goals & success metrics; Overview of current systems (or audit call); Key workflows you want to automate; Timeline and budget range; Decision-makers and stakeholders; (Later) Staging/production access and docs. Subtext: “So we can tailor strategy and delivery.”
- **FaaS:** “To get you live quickly.” Use case and scale; Tech preferences (runtime, CI/CD, auth); Compliance / data residency; Support tier. Subtext: “We’ll handle the rest.”
- **Innovation Lab:** “What we need to explore with you.” Problem or opportunity in 1–2 paragraphs; Scope (exploration vs. prototype vs. roadmap); Timeline and budget band; Any IP/confidentiality constraints. Subtext: “The more context, the better the sprint.”

**Visual:** Simple list or checklist; optional icons. Can be 2-column (short intro left, list right).  
**Storytelling ref:** Primal Space / consulting “client requirements” style—clear, scannable, reassuring.

---

### Section 6 — Proof & outcomes

**Purpose:** Evidence that we deliver—metrics, quote, or mini case. Client-centered.

**Content (per service):**
- **Integration & Automation:** One “typical outcome” or mini case (e.g. “Government agency: 3 legacy systems integrated, live in 6 months”) + 2–3 metrics (e.g. “X% faster rollout,” “Y% cost reduction”). Optional: testimonial quote or “Read full case study” link.
- **FaaS:** Proof row: “Deploy in minutes,” “99.9% uptime,” or similar; one short testimonial. Optional: “See how [Client] runs 50+ agents on FaaS.”
- **Innovation Lab:** 1–2 example outcomes (e.g. “Prototype for Arabic support in 6 weeks,” “Early access to Fasih for enterprise”). Optional: partner logos or “Early access program” badge.

**Visual:** Metrics as numbers or small cards; quote block; optional thumbnail or logo.  
**Storytelling ref:** Orbit Media / B2B checklist—testimonials with a headline above the quote; stats with visual treatment; avoid sliders.

---

### Section 7 — CTA

**Purpose:** One clear next step—contact, book a call, or “Talk to us about [service].”

**Content:** “Ready to get started?” / “Let’s design your integration.” / “Get in touch.” Primary: Contact or Book a call → `/contact`. Optional secondary: Explore products, Case studies.  
**Visual:** Reuse product CTA; service-specific headline + optional `serviceSlug` for tracking.

---

## Part 4: Storytelling Inspiration — Which Section, Which Pattern

| Section | Storytelling pattern | Reference type / example |
|--------|----------------------|---------------------------|
| **Hero** | One clear value line; no clutter | Stripe, Linear—headline + short subline |
| **Problem** | Client as hero; problem → impact → curiosity | StoryBrand consulting pages; “When X… / If you’re facing…” |
| **Solution** | Phases or capabilities with one benefit each | Linear feature blocks; Vercel bento; process strips (Reactiv Labs, Superweb) |
| **How we deliver** | Sequential steps; optional timeline | “How it works” (Reactiv Labs, Sitelyhub, Superweb)—4–8 steps, no carousel |
| **What we need from you** | Transparent checklist; reduces anxiety | Client requirements (Primal Space, consulting “what we need”) |
| **Proof** | One strong proof row + testimonial with headline | Orbit Media B2B checklist; Stripe-style proof row; one quote with headline |
| **CTA** | Single primary action; outcome-oriented verb | “Schedule a call,” “Start your integration”—not generic “Contact” |

**Avoid:** Carousels/sliders for process or proof; long paragraphs; vague headlines (“Transforming experiences”); hiding what we need from the client.

---

## Part 5: Content Data Shape (for CMS / lib)

To support “What we need from you” and “How we deliver,” extend service content (e.g. in `lib/services.ts` or Sanity) along these lines:

```ts
// Optional additions to ServiceContent (types/service.ts)
content?: {
  hero: { ... };
  features: { ... };
  youtubeVideo?: { ... };
  // New / extended:
  challenge?: {
    headline: string;
    impactBullets: string[];
    curiosityLine: string;
  };
  processSteps?: Array<{ title: string; description: string; duration?: string }>;
  whatWeNeed?: Array<{ label: string; detail?: string }>;
  proof?: {
    headline?: string;
    metrics?: Array<{ value: string; label: string }>;
    scenario?: string;
    testimonial?: { quote: string; name?: string; role?: string };
    caseStudySlug?: string;
  };
};
```

---

## Part 6: Section Order Summary (All Three Services)

| Order | Section | Integration & Automation | FaaS | Innovation Lab |
|-------|--------|-------------------------|------|----------------|
| 1 | Hero | ✓ | ✓ | ✓ |
| 2 | Problem: Why this service | ✓ | ✓ | ✓ |
| 3 | Solution: What we deliver | ✓ Phases + deliverables | ✓ Platform capabilities | ✓ R&D offerings |
| 4 | How we deliver / Process | ✓ 5–6 phase methodology | ✓ Signup → production | ✓ 6-week sprint model |
| 5 | What we need from you | ✓ Strategy, systems, access | ✓ Use case, tech, compliance | ✓ Brief, scope, constraints |
| 6 | Proof & outcomes | ✓ Case + metrics | ✓ Proof row + testimonial | ✓ Examples / early access |
| 7 | CTA | ✓ | ✓ | ✓ |

This gives each of the three service pages a consistent narrative (problem → solution → process → inputs → proof → CTA) while the content and “what we need from you” stay specific to each service.
