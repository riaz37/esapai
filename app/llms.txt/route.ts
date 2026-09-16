import { getCaseStudies } from "@/lib/case-studies";
import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { SEO_CONFIG } from "@/lib/seo/config";

const LOCALE = "en";

function buildLlmsTxt(caseStudies: { title: string; slug: string; subtitle: string }[]): string {
  const baseUrl = SEO_CONFIG.baseUrl.replace(/\/$/, "");

  const productLines = products
    .map((p) => `- [${p.name}](${baseUrl}/${LOCALE}/product/${p.slug}): ${p.description}`)
    .join("\n");

  const serviceLines = services
    .map((s) => `- [${s.name}](${baseUrl}/${LOCALE}/service/${s.slug}): ${s.description}`)
    .join("\n");

  const caseStudyLines = caseStudies
    .map((cs) => `- [${cs.title}](${baseUrl}/${LOCALE}/case-study/${cs.slug})${cs.subtitle ? `: ${cs.subtitle}` : ""}`)
    .join("\n");

  return `# ESAP AI

> ESAP AI builds on-premise, Arabic-native AI agents and agentic automation for
> enterprises in Saudi Arabia and the GCC. Headquartered in Riyadh. Products deploy
> inside customer infrastructure rather than as multi-tenant SaaS, supporting data
> residency and PDPL-aligned governance requirements.

## What ESAP AI does

ESAP AI rebuilds enterprise workflows end-to-end using AI agents, designed around
non-technical end users rather than technical operators. The company was founded by
operators who ran enterprise ERP migrations and automation projects, and builds from
recurring department-level feedback (HR, finance, project management, operations).

Key differentiators:
- On-premise deployment — models and data remain inside customer infrastructure
- Business-logic-aware — agents understand company-specific operational rules, not just documents
- Arabic-native — full Arabic interface and workflow support, not translated UI
- Voice-operated — ERP and agent interaction via natural voice commands
- Multi-company navigation — single interface across holding-company subsidiaries

## Products

${productLines}

## Services

${serviceLines}

## Case studies

${caseStudyLines}

## Company

- Name: ESAP AI
- Headquarters: Riyadh, Saudi Arabia
- Markets served: Saudi Arabia and the GCC
- Languages: English and Arabic ([/en/](${baseUrl}/en), [/ar/](${baseUrl}/ar))
- LinkedIn: https://www.linkedin.com/company/esapai/
- Contact: ${baseUrl}/${LOCALE}/contact

## Optional

- [About ESAP AI](${baseUrl}/${LOCALE}/about)
- [Privacy Policy](${baseUrl}/${LOCALE}/privacy)
- [Terms & Conditions](${baseUrl}/${LOCALE}/terms)
`;
}

export async function GET(): Promise<Response> {
  const caseStudies = await getCaseStudies(LOCALE);

  const body = buildLlmsTxt(
    caseStudies.map((cs) => ({ title: cs.title, slug: cs.slug, subtitle: cs.subtitle }))
  );

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
