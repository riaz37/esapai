/**
 * Submits every URL in the production sitemap to IndexNow (Bing, Yandex,
 * Seznam, Naver). Only useful once the site is deployed and the key file
 * (public/{key}.txt, see lib/seo/indexnow.ts) is live at the target host —
 * IndexNow verifies ownership by fetching that file before accepting URLs.
 *
 * Usage:
 *   npx tsx scripts/submit-indexnow.ts [host]
 *   (defaults to www.esap.ai)
 */

import { submitIndexNow } from "../lib/seo/indexnow";

const host = process.argv[2] ?? "www.esap.ai";

async function main() {
  const sitemapRes = await fetch(`https://${host}/sitemap.xml`);
  if (!sitemapRes.ok) {
    throw new Error(`Could not fetch https://${host}/sitemap.xml: ${sitemapRes.status}`);
  }

  const xml = await sitemapRes.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  if (urls.length === 0) {
    throw new Error("No <loc> entries found in sitemap — nothing to submit");
  }

  console.log(`Submitting ${urls.length} URLs from https://${host}/sitemap.xml to IndexNow...`);
  await submitIndexNow({ host, urls });
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
