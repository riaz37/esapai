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
    await page.goto("/en/case-study", { waitUntil: "domcontentloaded" });
    await expect(getContentMain(page)).toBeVisible();

    const listResponse = await request.get("/api/case-studies?locale=en");
    const data = (await listResponse.json()) as {
      caseStudies?: Array<{ slug?: string }>;
      availableTags?: string[];
    };

    const firstSlug = data.caseStudies?.find((cs) => !!cs.slug)?.slug;
    test.skip(!firstSlug, "No case study slug available in API response");

    await page.goto(`/en/case-study/${firstSlug}`, {
      waitUntil: "domcontentloaded",
    });
    await expect(getContentMain(page)).toBeVisible();
  });

  test("case study list normalizes invalid pages and supports filter empty states", async ({
    page,
    request,
  }) => {
    await page.goto("/en/case-study?page=999", { waitUntil: "domcontentloaded" });
    await expect(getContentMain(page)).toBeVisible();
    await expect(page).not.toHaveURL(/page=999/);

    const listResponse = await request.get("/api/case-studies?locale=en");
    const data = (await listResponse.json()) as {
      availableTags?: string[];
    };

    const firstTag = data.availableTags?.[0];
    test.skip(!firstTag, "No case study tag available in API response");

    await page.goto(`/en/case-study?tag=${encodeURIComponent(firstTag!)}`, {
      waitUntil: "domcontentloaded",
    });
    await expect(getContentMain(page)).toBeVisible();

    await page.goto("/en/case-study?tag=__unknown__", {
      waitUntil: "domcontentloaded",
    });
    await expect(page.getByRole("link", { name: "Clear filter" })).toBeVisible();
  });
});
