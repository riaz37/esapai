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

  test("case study list API responds with array shape", async ({ request }) => {
    const response = await request.get("/api/case-studies?locale=en");
    expect(response.status()).toBe(200);

    const body = (await response.json()) as { caseStudies?: unknown[] };
    expect(Array.isArray(body.caseStudies)).toBeTruthy();
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
