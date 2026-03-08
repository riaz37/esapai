import { expect, test } from "@playwright/test";
import { seedAcceptedCookieConsent } from "./helpers";

test.describe("Mobile navigation", () => {
  test("hamburger menu exposes localized about link", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-specific behavior");
    await seedAcceptedCookieConsent(page);
    await page.goto("/en");

    const menuToggle = page.locator("svg.tabler-icon-menu-2").first();
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();

    const aboutLink = page.getByRole("link", { name: /about/i }).first();
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute("href", /\/en\/about$/);
  });
});
