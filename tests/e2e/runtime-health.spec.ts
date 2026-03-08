import { expect, test } from "@playwright/test";
import { getContentMain, seedAcceptedCookieConsent, trackConsoleErrors } from "./helpers";

const ROUTES = ["/en", "/en/about", "/en/product/erp", "/en/contact"];

test.describe("Runtime health", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await seedAcceptedCookieConsent(page);
  });

  for (const route of ROUTES) {
    test(`no critical console/request failures on ${route}`, async ({ page }) => {
      const errors = trackConsoleErrors(page);
      const failedRequests: string[] = [];

      page.on("requestfailed", (request) => {
        const url = request.url();
        const failure = request.failure();
        const failureText = failure?.errorText ?? "";
        const isLocal = url.includes("127.0.0.1") || url.includes("localhost");
        const isBenignAbort =
          failureText.includes("ERR_ABORTED") ||
          failureText.includes("NS_BINDING_ABORTED") ||
          failureText.toLowerCase().includes("cancelled") ||
          (request.resourceType() === "media" && failureText.length > 0);

        if (isLocal && !isBenignAbort) {
          failedRequests.push(`${request.method()} ${url} (${failureText || "unknown failure"})`);
        }
      });

      await page.goto(route, { waitUntil: "networkidle" });
      await expect(getContentMain(page)).toBeVisible();

      expect(failedRequests, `Failed local requests on ${route}`).toEqual([]);
      expect(errors, `Console errors on ${route}: ${errors.join("\n")}`).toEqual([]);
    });
  }
});
