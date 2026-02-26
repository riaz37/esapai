# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands use `pnpm`:

```bash
pnpm dev              # Start dev server on :3000
pnpm dev:turbo        # Dev server with Turbopack (faster builds)
pnpm build            # Production build
pnpm build:analyze    # Build + generate bundle size analysis (output in ./analyze/)
pnpm start            # Run production server
pnpm lint             # Run ESLint
```

## Project Architecture Overview

### Technology Stack
- **Next.js 16** with App Router using `[locale]` segment for i18n
- **React 19** with TypeScript 5
- **next-intl** for internationalization (English "en" + Arabic "ar")
- **Sanity 5** as headless CMS for all dynamic content
- **GSAP 3** + ScrollTrigger for animations
- **Three.js** + React Three Fiber for 3D graphics
- **Tailwind CSS 4** with logical properties for RTL support

### Directory Structure

```
app/
├── [locale]/          # All user-facing routes (locale-based routing)
│   ├── layout.tsx
│   ├── page.tsx       # Home
│   ├── about/         # About page
│   ├── product/       # Product listing + detail pages
│   ├── service/       # Service listing + detail pages
│   ├── case-study/    # Case studies listing + detail pages
│   └── contact/
├── demo/              # Demo/testing routes (not localized)
└── api/               # API routes (not localized)

components/
├── features/          # Feature-specific, large components
│   ├── about/
│   ├── home/
│   ├── products/
│   ├── services/
│   ├── case-studies/
│   ├── navigation/
│   └── contact/
├── shared/            # Reusable components across features
├── three/             # Three.js 3D components
└── ui/                # UI primitives (buttons, cards, etc.)

lib/
├── sanity/            # CMS integration (client, queries, image)
├── hooks/             # Custom React hooks
└── utils/             # Utility functions

types/                 # TypeScript type definitions
i18n/                  # Localization configuration
messages/              # Translation JSON files (en.json, ar.json)
```

## Localization (i18n) Pattern

### Setup
- **Config**: `i18n/routing.ts` defines locales ("en", "ar") and default locale
- **Messages**: `messages/en.json` and `messages/ar.json` contain all UI text
- **Middleware**: `i18n/request.ts` handles locale detection and message loading

### Usage in Components

**Client components** use the `useTranslations` hook:
```tsx
const t = useTranslations("Namespace.sub");
// Access: t("key")
```

**Dynamic/array content** (e.g., product slugs):
```tsx
const t = useTranslations("Parent");
const items = t.raw("slug.items") as Array<{title: string}>;
```

**Detecting RTL**:
```tsx
import { useLocale } from "next-intl";
const locale = useLocale();
const isRTL = locale === "ar";
```

**GSAP animations in RTL** - multiply x-axis values by direction:
```tsx
const dir = locale === "ar" ? -1 : 1;
gsap.to(element, { x: 100 * dir });  // Flips in RTL
```

### CSS RTL Support
- Use Tailwind logical properties: `start`/`end`, `ps`/`pe`, `ms`/`me` instead of left/right
- Avoid hardcoded `left`/`right` in styles
- For complex positioning, use `insetInlineStart`/`insetInlineEnd` instead of `left`/`right`

## Content Management (Sanity CMS)

### Data Fetching Pattern
All content queries are in `lib/sanity/queries.ts`:
```tsx
export async function getProductBySlug(slug: string, locale: string) {
  return client.fetch(productBySlugQuery, { slug, locale });
}
```

### Supported Content Types
- **Products**: `/product/[slug]` — `productDocument` in Sanity
- **Services**: `/service/[slug]` — `serviceDocument` in Sanity
- **Case Studies**: `/case-study/[slug]` — `caseStudyDocument` in Sanity
- **About Page**: `/about` — `aboutPage` document
- **Home Page**: `/` — `homePage` document

### Key Fields to Know
Products/Services have both:
- Sanity-stored fields (hero images, videos, structured data)
- Message-based fields (titles, descriptions) via i18n translations

## Important Patterns & Conventions

### Component Organization
- **Feature components** go in `components/features/` organized by page (e.g., `components/features/about/`, `components/features/products/`)
- **Shared components** in `components/shared/` (used across multiple features)
- **UI components** in `components/ui/` (primitives like buttons, badges)

### Performance Considerations
- Heavy 3D scenes use lazy loading and performance detection
- Animations use GSAP with `prefers-reduced-motion` support
- Images use Next.js `<Image>` component with proper sizes
- Code splitting via dynamic imports for below-the-fold content

### Type Safety
- All major types defined in `types/` directory
- Use strict TypeScript (enabled in tsconfig.json)
- Props interfaces should be specific, not generic `Props`

### Styling
- Primary CSS: Tailwind utility classes
- Custom animations: GSAP for complex interactions
- CSS-in-JS: Avoid; use Tailwind + GSAP instead
- Theming: No dark mode currently; single theme via Tailwind config

## Routing & Navigation

### Locale-Based Routing
- All user routes use `app/[locale]/...` pattern
- API routes are in `app/api/` (outside locale segment)
- Use `next-intl` Link/useRouter/usePathname from `i18n/routing.ts`

### Dynamic Routes
- Product detail: `/[locale]/product/[slug]`
- Service detail: `/[locale]/service/[slug]`
- Case study detail: `/[locale]/case-study/[slug]`

### Redirects
Hardcoded service redirect for merged pages (in next.config.ts):
- `/service/end-to-end-integration` → `/service/integration-and-automation`
- `/service/enterprise-automation` → `/service/integration-and-automation`

## Environment Variables

**Required server-side variables** (in `.env.local`, never exposed to browser):
```
ARCJET_KEY                    # Rate limiting & security
SANITY_API_READ_TOKEN        # CMS content access
WEB3FORMS_ACCESS_KEY         # Contact form submissions
```

**Public variables** (prefixed with `NEXT_PUBLIC_`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID     # CMS project ID
NEXT_PUBLIC_SANITY_DATASET        # CMS dataset (e.g., "production")
NEXT_PUBLIC_GA_ID                 # Google Analytics
NEXT_PUBLIC_SITE_URL              # Domain for metadata
```

## Security & Headers

Security headers configured in `next.config.ts`:
- CSP (Content Security Policy) with report-only in development
- HSTS, X-Frame-Options, X-Content-Type-Options enabled
- Remote image sources: Unsplash, Aceternity, Sanity CDN
- Form submissions only to Web3Forms API

## Building & Deployment

### Production Build
```bash
pnpm build
```

The build:
1. Type-checks all TypeScript files
2. Optimizes images and CSS
3. Code-splits for optimal bundle size
4. Generates static pages where possible

### Bundle Analysis
```bash
pnpm build:analyze
```
Opens HTML reports in `analyze/client.html` and `analyze/server.html`.

### Deployment Considerations
- All environment variables must be set before build
- Sanity read token is required for content fetching at build time
- Images are cached for 30 days (configurable in next.config.ts)
- Static assets (JS, CSS, fonts, images) cached for 1 year

## Common Development Scenarios

### Adding a New Feature Page
1. Create route under `app/[locale]/[feature]/`
2. Create page component at `app/[locale]/[feature]/page.tsx`
3. Create feature components in `components/features/[feature]/`
4. Add translations to `messages/en.json` and `messages/ar.json`
5. If using Sanity content, add query to `lib/sanity/queries.ts`

### Adding Internationalized Content
1. Add English text to `messages/en.json`
2. Add Arabic translation to `messages/ar.json`
3. Use `useTranslations("Namespace")` in component
4. For RTL-sensitive layouts, check locale with `useLocale()`

### Styling for RTL
1. Use Tailwind logical properties (`start`, `end`, `ps`, `pe`, `ms`, `me`)
2. Avoid `left`, `right`, `margin-left`, `padding-right` etc.
3. For GSAP: multiply x values by `locale === "ar" ? -1 : 1`
4. For SVG/graphics: use CSS `transform: scaleX(-1)` in RTL

### Debugging Animations
- Check browser DevTools → Performance tab
- Verify `prefers-reduced-motion` media query is respected
- Use GSAP's built-in DevTools (in development)
- Check for layout shifts caused by GSAP animations

## Notes

- **Turbopack**: Use `pnpm dev:turbo` for faster dev builds during heavy refactoring
- **Sanity Studio**: Located in `studio/` directory (separate Next.js app)
- **Testing**: No automated tests currently in place
- **Linting**: ESLint configured with Next.js rules; run before committing
