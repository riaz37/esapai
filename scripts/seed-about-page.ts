/**
 * Seeds all aboutPage documents in Sanity (en + ar).
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> npx tsx scripts/seed-about-page.ts
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

const ABOUT_DATA: Record<string, {
  heroBadge: string;
  heroTitle: string;
  heroTitlePart1: string;
  heroTitlePart2: string;
  heroSubtitle: string;
  narrativeDesignation: string;
  teamCategoryLabel: string;
  teamLeadershipLabel: string;
  teamInnovationLabel: string;
  historyTitle: string;
  historyBadge: string;
  historySubtitle: string;
  historyHook: string;
  visionTitle: string;
  visionBody: string;
}> = {
  en: {
    heroBadge: "Legacy & Vision",
    heroTitle: "Our Legacy",
    heroTitlePart1: "Our ",
    heroTitlePart2: "Legacy",
    heroSubtitle:
      "Building the foundation for enterprise intelligence. From humble beginnings to global infrastructure — this is our story.",
    narrativeDesignation: "Designation",
    teamCategoryLabel: "CORE TEAM MEMBER",
    teamLeadershipLabel: "LEADERSHIP",
    teamInnovationLabel: "INNOVATION",
    historyTitle: "The Journey of ESAP AI",
    historyBadge: "Our Legacy",
    historySubtitle:
      "From complex manual workflows to enterprise-grade AI autonomy.",
    historyHook:
      "Every milestone shaped the AI infrastructure powering enterprises today.",
    visionTitle: "Our Vision",
    visionBody:
      "To become the operating system for enterprise intelligence — a world where every business process is augmented, automated, and optimised by AI that understands context, acts autonomously, and learns continuously.",
  },
  ar: {
    heroBadge: "الإرث والرؤية",
    heroTitle: "إرثنا",
    heroTitlePart1: "",
    heroTitlePart2: "إرثنا",
    heroSubtitle:
      "بناء الأساس لذكاء المؤسسات. من البدايات المتواضعة إلى البنية التحتية العالمية - هذه هي قصتنا.",
    narrativeDesignation: "المسمى الوظيفي",
    teamCategoryLabel: "عضو الفريق الأساسي",
    teamLeadershipLabel: "القيادة",
    teamInnovationLabel: "الابتكار",
    historyTitle: "رحلة إساب للذكاء الاصطناعي",
    historyBadge: "إرثنا",
    historySubtitle:
      "من سير العمل اليدوي المعقد إلى استقلالية الذكاء الاصطناعي على مستوى المؤسسات.",
    historyHook:
      "كل إنجاز شكّل البنية التحتية للذكاء الاصطناعي التي تُشغّل المؤسسات اليوم.",
    visionTitle: "رؤيتنا",
    visionBody:
      "أن نصبح نظام التشغيل لذكاء المؤسسات — عالم تكون فيه كل عملية تجارية معززة ومؤتمتة ومحسّنة بذكاء اصطناعي يفهم السياق ويتصرف باستقلالية ويتعلم باستمرار.",
  },
};

async function seed() {
  const docs = await client.fetch<{ _id: string; language: string }[]>(
    `*[_type == "aboutPage"]{ _id, language }`
  );

  if (!docs.length) {
    console.log("No aboutPage documents found.");
    return;
  }

  const tx = client.transaction();

  for (const doc of docs) {
    const lang = doc.language as "en" | "ar";
    const data = ABOUT_DATA[lang];

    if (!data) {
      console.log(`  skip: no data for language "${lang}"`);
      continue;
    }

    tx.patch(doc._id, (patch) => patch.set(data));
    console.log(`  queued: aboutPage-${lang} (${doc._id})`);
  }

  await tx.commit();
  console.log("Done — all aboutPage documents updated.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
