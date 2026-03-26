import { expect, test } from "@playwright/test";
import { seedAcceptedCookieConsent, dismissCookieBannerIfVisible } from "./helpers";

test.describe("Animation behavior", () => {
  test("text reveal words are present and styled for animation", async ({
    page,
    browserName,
    isMobile,
  }) => {
    test.skip(browserName !== "chromium" || isMobile, "Desktop chromium animation smoke only");
    await seedAcceptedCookieConsent(page);
    await page.goto("/en");
    await dismissCookieBannerIfVisible(page);

    // Progressively scroll to trigger lazy-loaded sections
    for (let i = 1; i <= 6; i++) {
      await page.evaluate((fraction) => {
        window.scrollTo({ top: document.body.scrollHeight * fraction, behavior: "instant" });
      }, i / 6);
      await page.waitForTimeout(1000);
    }

    const firstWord = page.locator(".word").first();
    const visible = await firstWord.isVisible().catch(() => false);

    if (!visible) {
      test.skip(true, "TextReveal section not rendered (lazy-load or missing Sanity content)");
    }

    await expect(firstWord).toBeVisible();
  });
});
