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
  teamMembers: Array<{ name: string; role: string; bio: string; image: string }>;
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
    teamMembers: [
      { name: "Baker Abukhater", role: "Founder", bio: "The visionary and dynamic Founder of ESAP AI, driving the mission to build futuristic AI-powered technologies that redefine how institutions, governments, and individuals work.", image: "/team/Baker Abukhater.jpg" },
      { name: "Ayed Alanazi", role: "People Relations Manager", bio: "People Relations Manager at ESAP AI, fostering a culture of collaboration, inclusion, and excellence across the multinational and multi-lingual team.", image: "/team/Ayed Alanazi.jpg" },
      { name: "Syed Imam", role: "Co-Founder & Team Lead", bio: "Enterprise AI Development Pioneer and Co-Founder of ESAP AI, leading engineering teams to deliver scalable agentic AI solutions for enterprises worldwide.", image: "/team/Syed Imam1.jpg" },
      { name: "M. Usman Nazir", role: "Co-Founder & Director of Artificial Intelligence", bio: "Director of Artificial Intelligence & Data Solutions at ESAP AI, architecting the intelligence layer that powers ESAP's suite of AI products and frameworks.", image: "/team/M. Usman Nazir.jpg" },
      { name: "Abdullah Abukhater", role: "Creative Innovation Director", bio: "Creative Innovation Director at ESAP AI, blending design thinking with emerging technology to shape experiences that are as beautiful as they are intelligent.", image: "/team/Abdullah Abukhater.jpg" },
      { name: "Omar Abukhater", role: "Strategy Director", bio: "Strategy Director at ESAP AI, charting the go-to-market and growth roadmap that positions ESAP as the leading force in enterprise AI transformation.", image: "/team/Omar Abukhater.jpg" },
      { name: "Salem Almtaery", role: "Human Resources Manager", bio: "Human Resources Manager at ESAP AI, dedicated to building and supporting the talented team that drives ESAP's innovation and growth.", image: "/team/Salem Almtaery.jpg" },
      { name: "Alaa Said", role: "Chief Finance Officer", bio: "Chief Finance Officer at ESAP AI, overseeing financial strategy and operations to ensure sustainable growth and investment in cutting-edge AI research.", image: "/team/Alaa Said.jpg" },
      { name: "Hamed Hasan", role: "Senior Software Engineer Lead", bio: "Senior Software Engineer Team Lead at ESAP AI, guiding development of robust, high-performance systems that underpin ESAP's AI product portfolio.", image: "/team/Hamed Hasan.jpg" },
      { name: "Mohamed Mostafa", role: "Lead Software Engineer & Delivery Manager", bio: "Lead Software Engineer & Delivery Manager at ESAP AI, ensuring projects ship on time, at quality, by bridging technical execution with stakeholder alignment.", image: "/team/Mohamed Mostafa.jpg" },
      { name: "Osama Hassanein", role: "Head of Backend & System Architecture", bio: "Head of Backend Engineering & System Architecture at ESAP AI, designing the scalable infrastructure and distributed systems that power ESAP's agentic AI platform.", image: "/team/Osama Hassanein.jpg" }
    ]
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
    teamMembers: [
      { name: "باكر أبو خاطر", role: "المؤسس", bio: "المؤسس الرؤيوي والديناميكي لشركة إساب للذكاء الاصطناعي، يقود المهمة لبناء تقنيات مستقبلية مدعومة بالذكاء الاصطناعي تعيد تعريف كيفية عمل المؤسسات والحكومات والأفراد.", image: "/team/Baker Abukhater.jpg" },
      { name: "عايد العنزي", role: "مدير علاقات الأفراد", bio: "مدير علاقات الأفراد في إساب للذكاء الاصطناعي، يعزز ثقافة التعاون والشمول والتميز عبر الفريق متعدد الجنسيات واللغات.", image: "/team/Ayed Alanazi.jpg" },
      { name: "سيد إمام", role: "مؤسس مشارك وقائد الفريق", bio: "رائد تطوير الذكاء الاصطناعي للمؤسسات ومؤسس مشارك لشركة إساب للذكاء الاصطناعي، يقود الفرق الهندسية لتقديم حلول ذكاء اصطناعي وكيلة قابلة للتوسع للمؤسسات في جميع أنحاء العالم.", image: "/team/Syed Imam1.jpg" },
      { name: "م. عثمان نذير", role: "مؤسس مشارك ومدير الذكاء الاصطناعي", bio: "مدير الذكاء الاصطناعي وحلول البيانات في إساب للذكاء الاصطناعي، يصمم طبقة الذكاء التي تدعم مجموعة منتجات وأطر عمل إساب.", image: "/team/M. Usman Nazir.jpg" },
      { name: "عبد الله أبو خاطر", role: "مدير الابتكار الإبداعي", bio: "مدير الابتكار الإبداعي في إساب للذكاء الاصطناعي، يمزج التفكير التصميمي مع التكنولوجيا الناشئة لتشكيل تجارب جميلة وذكية في آن واحد.", image: "/team/Abdullah Abukhater.jpg" },
      { name: "عمر أبو خاطر", role: "مدير الاستراتيجية", bio: "مدير الاستراتيجية في إساب للذكاء الاصطناعي، يضع خريطة الطريق للنمو والتوسع التي تضع إساب كقوة رائدة في تحول الذكاء الاصطناعي للمؤسسات.", image: "/team/Omar Abukhater.jpg" },
      { name: "سالم المطيري", role: "مدير الموارد البشرية", bio: "مدير الموارد البشرية في إساب للذكاء الاصطناعي، مكرس لبناء ودعم الفريق الموهوب الذي يدفع ابتكار ونمو إساب.", image: "/team/Salem Almtaery.jpg" },
      { name: "آلاء سعيد", role: "المدير المالي", bio: "المدير المالي في إساب للذكاء الاصطناعي، يشرف على الاستراتيجية والعمليات المالية لضمان النمو المستدام والاستثمار في أبحاث الذكاء الاصطناعي المتطورة.", image: "/team/Alaa Said.jpg" },
      { name: "حامد حسن", role: "قائد هندسة البرمجيات", bio: "قائد فريق هندسة البرمجيات في إساب للذكاء الاصطناعي، يوجه تطوير أنظمة قوية وعالية الأداء تدعم مجموعة منتجات إساب.", image: "/team/Hamed Hasan.jpg" },
      { name: "محمد مصطفى", role: "مهندس برمجيات رئيسي ومدير تسليم", bio: "مهندس برمجيات رئيسي ومدير تسليم في إساب للذكاء الاصطناعي، يضمن تسليم المشاريع في الوقت المحدد وبجودة عالية من خلال الربط بين التنفيذ التقني وتوافق أصحاب المصلحة.", image: "/team/Mohamed Mostafa.jpg" },
      { name: "أسامة حسنين", role: "رئيس هندسة الخدمات الخلفية ومعمارية الأنظمة", bio: "رئيس هندسة الخدمات الخلفية ومعمارية الأنظمة في إساب للذكاء الاصطناعي، يصمم البنية التحتية القابلة للتوسع والأنظمة الموزعة التي تشغل منصة إساب للذكاء الاصطناعي الوكيل.", image: "/team/Osama Hassanein.jpg" }
    ]
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
