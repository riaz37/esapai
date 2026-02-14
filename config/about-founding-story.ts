import type { FoundingStoryConfig } from "@/types/about";

/**
 * Founding story content derived from the co-founder article.
 * Used by the cinematic founding story section on the About page.
 */
export const foundingStoryConfig: FoundingStoryConfig = {
  hook:
    "Digitalizing what can't be digitalized — a real case study.",

  phases: [
    {
      id: "phase-1",
      phaseLabel: "Phase 1",
      title: "The build",
      body: "Around late 2020, a well-known consulting company in construction — mostly government projects — was running everything on Excel and physical papers: project management, HR, finance, supplier management. They had tried Dynamics 365, Odoo; none fit their complicated business logic. So they went hybrid until 2020, when money loss, poor tracking, and manual effort made it clear: something had to be done. I entered the scene. One month to show one workflow. I almost quit. Then a senior employee said: here you can build something from scratch, something big. I stayed. I became an employee inside a struggling module, learning paper flow and approvals by observation — no requirements, no docs. One month, 24/7, and I built a prototype. We shook hands. I spent the next 8 months going deep: data in Excel everywhere, 60k+ records, owner-defined formats, workflow that had to match exactly. I decided they would love it and use it without complaining — no training, obvious UI, simple pending tasks. We built 6–7 key modules. Within two weeks the owner migrated everything to production.",
      highlight: "80% paperwork gone. No manual tracking. Finally, relief.",
    },
    {
      id: "phase-2",
      phaseLabel: "Phase 2",
      title: "Migration & automation",
      body: "Migration was brutal. Excel data was messy: missing references, wrong grouping, broken structure. We built a pipeline — what can be synced, what can't; restructure what's possible; store the rest as extra sources. We learned why companies fear digitalizing: millions of messy records are not easy. Automation became a huge advantage. We built automations that were unheard of back then: attendance (letters, tickets, objections, payroll deductions), expense (employees always knew where and how much they spent). Many more automations helped scale without extra manpower. After migration and automation, the owner decided to open a software solution company. Almost every company suffers with outdated ERPs or fears digitalizing due to complexity, time, cost, and disaster outcomes. Our real advantage: understanding core issues and the end-user.",
    },
    {
      id: "phase-3",
      phaseLabel: "Phase 3",
      title: "AI & redefining",
      body: "AI started emerging strongly around 2022. Agents started being discussed. We saw the potential beyond automation and started building next-gen AI products for enterprises. Goal: enterprise AI solutions based on deep end-user understanding, constant feedback from departments, and strict end-user satisfaction rules. Big companies do agentic automation and process intelligence, but most don't care about end-users. That's where ESAP AI comes in. ESAP's main goal: intelligent agents — AGI-like workplace agents. Not LLMs alone; architecture and orchestration are the key. Aligned with Vision 2030: from Saudi Arabia to the world.",
    },
  ],

  visionTitle: "Our vision",
  visionBody:
    "A complete enterprise ecosystem operated by intelligent agents. Every employee has an AI agent that assists them. Employees do not need to learn ERP systems, understand workflows, or remember how things are operated. They provide the required data and review before submission. Everything else — forms, navigation, tracking, approvals, workflows, execution — is handled by the agent. The agent is the executor. We're building the framework that makes this possible: complete enterprise architecture, agents that orchestrate any business logic dynamically, full CRUD and ERP actions, and the ability to adapt to different companies, workflows, and industries. This is just the beginning.",

  closing: "This is just the beginning.",
};
