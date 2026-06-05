import { expect, test } from "@playwright/test";
import { seedAcceptedCookieConsent } from "./helpers";

type ScrollMetrics = {
  p95FrameMs: number;
  maxFrameMs: number;
  longTaskCount: number;
  sampleCount: number;
};

test.use({ screenshot: "off", trace: "off", video: "off" });

async function measureScrollFramePacing(): Promise<ScrollMetrics> {
  const frameDeltas: number[] = [];
  const longTasks: PerformanceEntry[] = [];
  let lastFrame = performance.now();
  let observer: PerformanceObserver | undefined;

  try {
    observer = new PerformanceObserver((list) => {
      longTasks.push(...list.getEntries());
    });
    observer.observe({ type: "longtask", buffered: false });
  } catch {
    // Long Task API is Chromium-only and may be disabled in some test environments.
  }

  let running = true;
  const tick = (now: number) => {
    frameDeltas.push(now - lastFrame);
    lastFrame = now;
    if (running) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  const steps = 24;
  for (let index = 0; index <= steps; index += 1) {
    window.scrollTo({ top: (maxScroll * index) / steps, behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  running = false;
  observer?.disconnect();

  const sorted = frameDeltas.slice(3).sort((a, b) => a - b);
  const p95Index = Math.max(0, Math.floor(sorted.length * 0.95) - 1);

  return {
    p95FrameMs: sorted[p95Index] ?? 0,
    maxFrameMs: sorted[sorted.length - 1] ?? 0,
    longTaskCount: longTasks.length,
    sampleCount: sorted.length,
  };
}

test.describe("Large viewport performance", () => {
  test("uses large-display performance mode and keeps scroll frame pacing bounded", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Large viewport performance is measured in Chromium");

    await page.setViewportSize({ width: 3840, height: 2160 });
    await seedAcceptedCookieConsent(page);
    await page.addInitScript(() => {
      Object.defineProperty(window, "devicePixelRatio", {
        configurable: true,
        get: () => 1,
      });
    });

    await page.goto("/en", { waitUntil: "domcontentloaded" });

    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.performanceMode))
      .toBe("large-display");

    await page.evaluate(measureScrollFramePacing);
    await page.waitForTimeout(2000);
    const metrics = await page.evaluate(measureScrollFramePacing);

    expect(metrics.p95FrameMs, JSON.stringify(metrics)).toBeLessThan(50);
    expect(metrics.maxFrameMs, JSON.stringify(metrics)).toBeLessThan(250);
    expect(metrics.longTaskCount, JSON.stringify(metrics)).toBe(0);
  });
});
