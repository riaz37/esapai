import { expect, Locator, Page } from "@playwright/test";

const COOKIE_KEY = "esapai-cookie-consent";

export async function seedAcceptedCookieConsent(page: Page) {
  await page.addInitScript((key: string) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);
    const consent = {
      status: "accepted",
      expiry: expiryDate.toISOString(),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(consent));
  }, COOKIE_KEY);
}

export async function clearCookieConsent(page: Page) {
  await page.addInitScript((key: string) => {
    localStorage.removeItem(key);
  }, COOKIE_KEY);
}

export function getContentMain(page: Page): Locator {
  // The app shell and route pages both use <main>; target the inner content root.
  return page.getByRole("main").last();
}

export async function expectLocalizedPath(page: Page) {
  await expect(page).toHaveURL(/\/(en|ar)(\/|$)/);
}

export async function dismissCookieBannerIfVisible(page: Page) {
  const bannerHeading = page.getByRole("heading", { name: "Cookie Consent" });
  const visible = await bannerHeading
    .isVisible({ timeout: 6000 })
    .catch(() => false);

  if (!visible) return;

  await page.getByRole("button", { name: "Accept All" }).click();
  await expect(bannerHeading).toBeHidden();
}

export function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    const isBenignCspWarning =
      text.includes("Content-Security-Policy") ||
      text.includes("[Report Only]") ||
      text.includes("upgrade-insecure-requests") ||
      text.includes("frame-ancestors") ||
      text.includes("googletagmanager.com/gtag/js?id=your_ga_id");
    if (isBenignCspWarning) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });
  return errors;
}
