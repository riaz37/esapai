import { expect, test } from "@playwright/test";

test.describe("SEO and API smoke", () => {
  test("robots.txt includes crawl rules and sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text.toLowerCase()).toContain("user-agent: *");
    expect(text).toContain("Sitemap:");
    expect(text).toContain("/api/");
  });

  test("sitemap.xml is generated and includes key routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const xml = await response.text();
    expect(xml).toContain("<urlset");
    expect(xml).toContain("/about");
    expect(xml).toContain("/contact");
    expect(xml).toContain("/privacy");
  });

  test("globe API returns geojson payload", async ({ request }) => {
    const response = await request.get("/api/globe");
    expect(response.status()).toBe(200);

    const body = (await response.json()) as { features?: unknown[] };
    expect(Array.isArray(body.features)).toBeTruthy();
  });

  test("case study list API responds with pagination metadata", async ({ request }) => {
    const response = await request.get("/api/case-studies?locale=en&page=1&pageSize=6");
    expect(response.status()).toBe(200);

    const body = (await response.json()) as {
      caseStudies?: unknown[];
      totalCount?: number;
      totalPages?: number;
      currentPage?: number;
      pageSize?: number;
      availableTags?: string[];
    };
    expect(Array.isArray(body.caseStudies)).toBeTruthy();
    expect(typeof body.totalCount).toBe("number");
    expect(typeof body.totalPages).toBe("number");
    expect(body.currentPage).toBe(1);
    expect(body.pageSize).toBe(6);
    expect(Array.isArray(body.availableTags)).toBeTruthy();
  });

  test("case study list API supports pagination and tag filtering", async ({ request }) => {
    const firstPageResponse = await request.get("/api/case-studies?locale=en&page=1&pageSize=1");
    expect(firstPageResponse.status()).toBe(200);

    const firstPageBody = (await firstPageResponse.json()) as {
      caseStudies?: Array<{ tags?: string[] }>;
      totalCount?: number;
      totalPages?: number;
      currentPage?: number;
      availableTags?: string[];
      activeTag?: string | null;
    };

    expect(firstPageBody.currentPage).toBe(1);
    expect(firstPageBody.totalCount).toBeGreaterThanOrEqual(0);
    expect(firstPageBody.totalPages).toBeGreaterThanOrEqual(1);

    const secondPageResponse = await request.get("/api/case-studies?locale=en&page=2&pageSize=1");
    expect(secondPageResponse.status()).toBe(200);

    const secondPageBody = (await secondPageResponse.json()) as {
      caseStudies?: unknown[];
      currentPage?: number;
      pageSize?: number;
    };

    expect(secondPageBody.pageSize).toBe(1);
    expect(secondPageBody.currentPage).toBeGreaterThanOrEqual(1);

    const firstTag = firstPageBody.availableTags?.[0];
    test.skip(!firstTag, "No case study tag available in API response");

    const filteredResponse = await request.get(
      `/api/case-studies?locale=en&tag=${encodeURIComponent(firstTag!)}`
    );
    expect(filteredResponse.status()).toBe(200);

    const filteredBody = (await filteredResponse.json()) as {
      caseStudies?: Array<{ tags?: string[] }>;
      activeTag?: string | null;
    };

    expect(filteredBody.activeTag).toBe(firstTag);
    expect(
      filteredBody.caseStudies?.every((caseStudy) =>
        Array.isArray(caseStudy.tags) ? caseStudy.tags.includes(firstTag!) : false
      )
    ).toBeTruthy();
  });

  test("unknown case study slug returns not found payload", async ({ request }) => {
    const response = await request.get("/api/case-studies/non-existent-slug?locale=en");
    expect(response.status()).toBe(404);

    const body = (await response.json()) as { caseStudy: null };
    expect(body.caseStudy).toBeNull();
  });

  test("contact API rejects invalid request with structured failure", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {},
    });

    expect([400, 413, 429, 500]).toContain(response.status());
    const body = (await response.json()) as { success?: boolean; message?: string };
    expect(body.success).toBe(false);
    expect(typeof body.message).toBe("string");
  });
});
