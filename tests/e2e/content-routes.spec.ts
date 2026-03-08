import { expect, test } from "@playwright/test";
import { getContentMain, seedAcceptedCookieConsent } from "./helpers";

const PRODUCT_SLUGS = ["erp", "ai-framework", "zakra", "jawib", "fasih"];
const SERVICE_SLUGS = ["integration-and-automation", "faas", "innovation-lab"];

test.describe("Content routes", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await seedAcceptedCookieConsent(page);
  });

  test("all product detail routes respond and render", async ({ page, request }) => {
    for (const slug of PRODUCT_SLUGS) {
      const path = `/en/product/${slug}`;
      const response = await request.get(path);
      expect(response.status(), `product route ${path}`).toBeLessThan(400);

      await page.goto(path);
      await expect(getContentMain(page)).toBeVisible();
    }
  });

  test("service detail routes do not hard-fail", async ({ page, request }) => {
    for (const slug of SERVICE_SLUGS) {
      const path = `/en/service/${slug}`;
      const response = await request.get(path);
      expect([200, 404], `service route ${path} status`).toContain(response.status());

      await page.goto(path);
      await expect(getContentMain(page)).toBeVisible();
    }
  });

  test("case study list and first detail route render when available", async ({
    page,
    request,
  }) => {
    await page.goto("/en/case-study");
    await expect(getContentMain(page)).toBeVisible();

    const listResponse = await request.get("/api/case-studies?locale=en");
    const data = (await listResponse.json()) as {
      caseStudies?: Array<{ slug?: string }>;
    };

    const firstSlug = data.caseStudies?.find((cs) => !!cs.slug)?.slug;
    test.skip(!firstSlug, "No case study slug available in API response");

    await page.goto(`/en/case-study/${firstSlug}`);
    await expect(getContentMain(page)).toBeVisible();
  });
});
