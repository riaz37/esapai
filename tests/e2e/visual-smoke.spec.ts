import { expect, test } from "@playwright/test";
import { getContentMain, seedAcceptedCookieConsent } from "./helpers";

const VISUAL_ROUTES = [
  { path: "/en", name: "home" },
  { path: "/en/contact", name: "contact" },
  { path: "/en/product/erp", name: "product-erp" },
];

test.describe("Visual smoke", () => {
  test.beforeEach(async ({ page }) => {
    await seedAcceptedCookieConsent(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const route of VISUAL_ROUTES) {
    test(`captures screenshot for ${route.name}`, async ({ page }, testInfo) => {
      await page.goto(route.path);
      await expect(getContentMain(page)).toBeVisible();

      const image = await page.screenshot({ fullPage: true });
      await testInfo.attach(`${route.name}.png`, {
        body: image,
        contentType: "image/png",
      });
    });
  }
});
