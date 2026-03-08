import { expect, test } from "@playwright/test";
import { clearCookieConsent, seedAcceptedCookieConsent } from "./helpers";

test.describe("Cookie consent and contact flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("cookie consent banner appears and stores accepted state", async ({ page }) => {
    await clearCookieConsent(page);
    await page.goto("/en");

    const bannerHeading = page.getByRole("heading", { name: "Cookie Consent" });
    await expect(bannerHeading).toBeVisible({ timeout: 7000 });

    await page.getByRole("button", { name: "Accept All" }).click();
    await expect(bannerHeading).toBeHidden();

    const savedConsent = await page.evaluate(() => {
      const raw = localStorage.getItem("esapai-cookie-consent");
      return raw ? (JSON.parse(raw) as { status?: string }) : null;
    });

    expect(savedConsent?.status).toBe("accepted");
  });

  test("contact form keeps submit disabled until terms are accepted", async ({ page }) => {
    await seedAcceptedCookieConsent(page);
    await page.goto("/en/contact");

    await page.fill("#fullName", "QA Engineer");
    await page.fill("#email", "qa@example.com");
    await page.fill("#message", "This is an automated contact form test.");

    const submitButton = page.locator('form button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test("contact form submits successfully with mocked APIs", async ({ page }) => {
    await seedAcceptedCookieConsent(page);

    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            name: "QA Engineer",
            email: "qa@example.com",
            message: "Mocked successful submission",
            access_key: "fake-access-key",
          },
        }),
      });
    });

    await page.route("https://api.web3forms.com/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "OK",
        }),
      });
    });

    await page.goto("/en/contact");
    await page.fill("#fullName", "QA Engineer");
    await page.fill("#email", "qa@example.com");
    await page.fill("#message", "Mocked successful submission");
    await page.check("#terms");
    await page.locator('form button[type="submit"]').click();

    await expect(page.getByText("Your message has been sent successfully!")).toBeVisible();
    await expect(page.locator("#fullName")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#message")).toHaveValue("");
    await expect(page.locator("#terms")).not.toBeChecked();
  });
});
