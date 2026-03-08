# Frontend Full-Coverage Test Matrix

This matrix maps comprehensive frontend coverage to Playwright specs.

## 1. Routing and shell integrity

- Root localization redirect (`/` -> locale route)
- Core route availability (`/en`, `/ar`, legal pages, contact, product, case-study)
- Global shell presence (navbar, footer, main region)

Spec:
- `tests/e2e/routes-and-layout.spec.ts`

## 2. Navigation and discoverability

- Desktop nav exposes correct localized contact link
- Footer exposes localized legal links (`privacy`, `terms`)
- Mobile nav menu exposes localized about link

Specs:
- `tests/e2e/routes-and-layout.spec.ts`
- `tests/e2e/mobile-navigation.spec.ts`

## 3. i18n and directionality

- HTML `lang` correctness for `en` and `ar`
- RTL/LTR direction correctness for locales
- Localized contact pages load in both locales

Spec:
- `tests/e2e/i18n-and-locales.spec.ts`

## 4. Contact and consent functional flows

- Cookie banner visibility for pending state
- Cookie acceptance persistence in localStorage
- Contact submit disabled until terms are accepted
- Contact success path (mocked `/api/contact` + mocked Web3Forms)
- Form reset behavior after successful submit

Spec:
- `tests/e2e/cookie-consent-and-contact.spec.ts`

## 5. API and SEO contract smoke

- `robots.txt` contract
- `sitemap.xml` contract
- `/api/globe` data shape
- `/api/case-studies` list shape
- unknown case-study slug behavior
- contact API invalid payload behavior

Spec:
- `tests/e2e/seo-and-api.spec.ts`

## 6. Dynamic content route health

- Product detail routes for all known slugs
- Service detail routes no hard-fail behavior (`200` or controlled `404`)
- Case study list and first detail route render when available

Spec:
- `tests/e2e/content-routes.spec.ts`

## 7. Animation behavior smoke

- Technology cinematic panel transform changes on scroll (desktop chromium)

Spec:
- `tests/e2e/animation-behavior.spec.ts`

## 8. Runtime health checks

- No local request failures for key pages
- No unhandled console/page errors on key pages

Spec:
- `tests/e2e/runtime-health.spec.ts`

## 9. Visual smoke capture

- Full-page screenshot capture for key journeys (`home`, `contact`, `product/erp`)
- Artifacts attached in Playwright report for manual visual review

Spec:
- `tests/e2e/visual-smoke.spec.ts`

## 10. Accessibility automation

- Axe WCAG 2A/2AA scans for localized key pages
- Critical violations must be zero

Spec:
- `tests/e2e/accessibility.spec.ts`

## 11. Browser matrix

Projects configured in `playwright.config.ts`:

- Chromium desktop
- Chromium mobile (Pixel 7)
- Firefox desktop
- WebKit desktop (Safari engine)

## 12. Runbook

- Full suite: `pnpm test:e2e`
- Chromium only: `pnpm test:e2e:chromium`
- Cross-browser desktop: `pnpm test:e2e:cross-browser`
- Headed debug: `pnpm test:e2e:headed`
- Report: `pnpm test:e2e:report`

