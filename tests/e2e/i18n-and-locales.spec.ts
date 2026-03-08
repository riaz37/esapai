import { expect, test } from "@playwright/test";
import { seedAcceptedCookieConsent } from "./helpers";

test.describe("i18n and locale behavior", () => {
  test.beforeEach(async ({ page }) => {
    await seedAcceptedCookieConsent(page);
  });

  test("english route uses lang=en and ltr direction", async ({ page }) => {
    await page.goto("/en");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("arabic route uses lang=ar and rtl direction", async ({ page }) => {
    await page.goto("/ar");

    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("localized contact route responds for both locales", async ({ request }) => {
    const en = await request.get("/en/contact");
    const ar = await request.get("/ar/contact");

    expect(en.status()).toBeLessThan(400);
    expect(ar.status()).toBeLessThan(400);
  });
});

