import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { seedAcceptedCookieConsent } from "./helpers";

const A11Y_ROUTES = ["/en", "/en/about", "/en/contact", "/ar", "/ar/about", "/ar/contact"];

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await seedAcceptedCookieConsent(page);
  });

  for (const route of A11Y_ROUTES) {
    test(`critical a11y scan: ${route}`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const criticalViolations = results.violations.filter(
        (violation) => violation.impact === "critical"
      );

      expect(
        criticalViolations,
        `Critical accessibility violations on ${route}: ${JSON.stringify(
          criticalViolations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.length,
          })),
          null,
          2
        )}`
      ).toHaveLength(0);
    });
  }
});

