/**
 * Seeds performanceMetrics and menuDescription for all service documents
 * in Sanity (both en and ar).
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> npx tsx scripts/seed-service-metrics.ts
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "9wyn6sgi";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error("Missing SANITY_API_TOKEN. Get a write token from sanity.io/manage.");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const METRICS_BY_SLUG: Record<
  string,
  { name?: string; menuDescription: string; metrics: { value: string; label: string }[] }
> = {
  "integration-and-automation": {
    menuDescription:
      "End-to-end integration and automation services",
    metrics: [
      { value: "3x", label: "Faster Time-to-Value" },
      { value: "40%", label: "Ops Cost Reduction" },
      { value: "99.9%", label: "Uptime SLA" },
    ],
  },
  "faas": {
    menuDescription:
      "Scalable AI agent infrastructure. Deploy in days, not months.",
    metrics: [
      { value: "10x", label: "Faster Agent Setup" },
      { value: "<300ms", label: "Avg. Latency" },
      { value: "85%", label: "Task Automation" },
    ],
  },
  "innovation-lab": {
    menuDescription:
      "Applied AI R&D and rapid prototyping for your industry.",
    metrics: [
      { value: "3x", label: "Innovation Speed" },
      { value: "50+", label: "Prototypes Shipped" },
      { value: "90%", label: "Client Success Rate" },
    ],
  },
};

async function seed() {
  const docs = await client.fetch<{ _id: string; slug: { current: string } }[]>(
    `*[_type == "serviceDocument"]{ _id, slug }`
  );

  if (!docs.length) {
    console.log("No service documents found.");
    return;
  }

  const tx = client.transaction();

  for (const doc of docs) {
    const slug = doc.slug?.current;
    const data = METRICS_BY_SLUG[slug];

    if (!data) {
      console.log(`  skip: no data defined for slug "${slug}"`);
      continue;
    }

    tx.patch(doc._id, (patch) =>
      patch.set({
        ...(data.name ? { name: data.name } : {}),
        menuDescription: data.menuDescription,
        performanceMetrics: data.metrics.map((m) => ({
          _type: "object",
          _key: m.label.toLowerCase().replace(/\s+/g, "-"),
          value: m.value,
          label: m.label,
        })),
      })
    );

    console.log(`  queued: ${slug} (${doc._id})`);
  }

  await tx.commit();
  console.log("Done — all service documents updated.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
