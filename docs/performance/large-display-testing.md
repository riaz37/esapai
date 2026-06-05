# Large Display Performance Testing

Use this when checking the homepage experience for 86-inch monitors or other high-resolution displays.

## Automated Check

Run the targeted Playwright spec:

```bash
pnpm test:e2e -- tests/e2e/large-viewport-performance.spec.ts --project=chromium-desktop
```

The spec emulates a `3840x2160` viewport, confirms the app selected `data-performance-mode="large-display"`, then samples animation frames while scrolling through the homepage.

## Manual Chrome Check

1. Start the app with `pnpm dev`.
2. Open `/en` in Chrome.
3. Open DevTools and set the responsive viewport to `3840 x 2160`.
4. In the Performance panel, record while scrolling from the hero through the product showcase.
5. Confirm the document element has `data-performance-mode="large-display"`.
6. Look for fewer long Paint/Composite tasks around the hero, shutter, mission, text reveal, product showcase, and CTA sections.

Physical monitor size is not required for this check. Browser rendering cost follows viewport resolution and device pixel ratio, not the diagonal size of the screen.
