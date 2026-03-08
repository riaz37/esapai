import { expect, test } from "@playwright/test";
import {
  dismissCookieBannerIfVisible,
  expectLocalizedPath,
  seedAcceptedCookieConsent,
} from "./helpers";

test.describe("Routes and layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("core localized routes return successful responses", async ({ request }) => {
    test.setTimeout(120_000);
    const routes = [
      "/",
      "/en",
      "/en/about",
      "/en/contact",
      "/en/product/erp",
      "/en/case-study",
      "/en/privacy",
      "/en/terms",
    ];

    for (const route of routes) {
      const response = await request.get(route);
      expect(response.status(), `route ${route} should load`).toBeLessThan(400);
    }
  });

  test("root redirects to a locale and renders global layout", async ({ page }) => {
    await seedAcceptedCookieConsent(page);
    await page.goto("/");
    await expectLocalizedPath(page);

    await expect(page.locator("nav").first()).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
  });

  test("navbar and footer expose correct legal/contact routes", async ({ page }) => {
    test.setTimeout(60_000);
    await seedAcceptedCookieConsent(page);
    await page.goto("/en");
    await dismissCookieBannerIfVisible(page);

    const navContactLink = page.locator('nav a[href$="/contact"]:visible').first();
    await expect(navContactLink).toBeVisible({ timeout: 15_000 });
    await expect(navContactLink).toHaveAttribute("href", /\/en\/contact$/);
    await page.goto("/en/contact");
    await expect(page).toHaveURL(/\/en\/contact$/);

    await page.goto("/en");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const privacyLink = page.locator('footer a[href$="/privacy"]').last();
    await expect(privacyLink).toBeVisible({ timeout: 15_000 });
    await expect(privacyLink).toHaveAttribute("href", /\/en\/privacy$/);
    await page.goto("/en/privacy");
    await expect(page).toHaveURL(/\/en\/privacy$/);

    await page.goto("/en");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const termsLink = page.locator('footer a[href$="/terms"]').last();
    await expect(termsLink).toBeVisible({ timeout: 15_000 });
    await expect(termsLink).toHaveAttribute("href", /\/en\/terms$/);
    await page.goto("/en/terms");
    await expect(page).toHaveURL(/\/en\/terms$/);
  });
});
