import { expect, test } from "@playwright/test";
import { seedAcceptedCookieConsent } from "./helpers";

test.describe("Animation behavior", () => {
  test("technology cards react with 3d transform on pointer movement", async ({
    page,
    browserName,
    isMobile,
  }) => {
    test.skip(browserName !== "chromium" || isMobile, "Desktop chromium animation smoke only");
    await seedAcceptedCookieConsent(page);
    await page.goto("/en");

    const card = page.locator(".tech-card-item").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();

    const result = await card.evaluate(async (element) => {
      const el = element as HTMLElement;
      const rect = el.getBoundingClientRect();
      const before = getComputedStyle(el).transform;

      el.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: rect.left + rect.width * 0.15,
          clientY: rect.top + rect.height * 0.2,
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 350));
      const after = getComputedStyle(el).transform;
      return { before, after };
    });

    expect(result.after).not.toBe("none");
    expect(result.after).not.toBe(result.before);
  });
});
