import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  FileWarning,
  XCircle,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface CinematicProblemItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  spreadPos: { x: number; y: number; rotate: number };
  solTitle: string;
  solDesc: string;
  solIcon: LucideIcon;
  solImpact: string;
}

/** Narrative copy for documentary-style cinematic flow (opening → problems → epiphany → solution → bridge). */
export interface ProductCinematicNarrative {
  introLine?: string;
  problemsIntroLine?: string;
  epiphanyPreLine?: string;
  solutionIntroLine?: string;
  recapLine?: string;
}

const DEFAULT_NARRATIVE: ProductCinematicNarrative = {
  introLine: "Every day, teams hit the same walls.",
  problemsIntroLine: "Three barriers stand in the way.",
  epiphanyPreLine: "Then everything changes.",
  solutionIntroLine: "Here's how we fix it.",
  recapLine: "You've seen the problems and our solution. Now see it in action.",
};

const NARRATIVES_BY_SLUG: Record<string, Partial<ProductCinematicNarrative>> = {
  erp: {
    introLine: "Every day, teams hit the same walls.",
    problemsIntroLine: "Three barriers stand in the way.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
  "ai-framework": {
    introLine: "Building AI agents shouldn't take months.",
    problemsIntroLine: "Three obstacles slow you down.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
  zakra: {
    introLine: "Knowledge is scattered. Answers are hard to find.",
    problemsIntroLine: "Three barriers stand in the way.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
  jawib: {
    introLine: "Support volume never stops. Teams burn out.",
    problemsIntroLine: "Three barriers stand in the way.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
  fasih: {
    introLine: "Arabic deserves more than an afterthought.",
    problemsIntroLine: "Three barriers stand in the way.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
  "domain-expansion": {
    introLine: "Legacy systems hold you back. Modern APIs feel out of reach.",
    problemsIntroLine: "Three barriers stand in the way.",
    epiphanyPreLine: "Then everything changes.",
    solutionIntroLine: "Here's how we fix it.",
    recapLine: "You've seen the problems and our solution. Now see it in action.",
  },
};

export function getProductCinematicNarrative(slug: string): ProductCinematicNarrative {
  const overrides = NARRATIVES_BY_SLUG[slug];
  return { ...DEFAULT_NARRATIVE, ...overrides };
}

const SPREAD_POSITIONS = [
  { x: -300, y: -40, rotate: -6 },
  { x: 20, y: 30, rotate: 2 },
  { x: 320, y: -20, rotate: 8 },
];

const ERP_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Manual Data Entry Bottleneck",
    description: "Teams waste hours on forms and spreadsheets instead of running the business.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "Voice-First Interface",
    solDesc: "Control all ERP functions through natural voice commands, making business management accessible and efficient for everyone.",
    solIcon: Zap,
    solImpact: "+75% Time Savings",
  },
  {
    id: 2,
    title: "Siloed Systems",
    description: "Inventory, sales, and finance don't talk—errors and delays multiply.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "AI-Powered Automation",
    solDesc: "Intelligent automation handles routine tasks, data entry, and reporting, freeing your team to focus on strategic decisions.",
    solIcon: Sparkles,
    solImpact: "Zero Downtime",
  },
  {
    id: 3,
    title: "Complex Training Overhead",
    description: "Valuable minds spent on learning legacy UIs instead of driving growth.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "SME-Optimized Design",
    solDesc: "Built specifically for small and medium enterprises with scalable architecture that grows with your business needs.",
    solIcon: CheckCircle2,
    solImpact: "3x Productivity",
  },
];

const AI_FRAMEWORK_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Slow Development Cycles",
    description: "Months to build and deploy a single AI agent. Market moves faster.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "Modular Architecture",
    solDesc: "Flexible, composable components that adapt to your specific needs and use cases, enabling rapid development and customization.",
    solIcon: Zap,
    solImpact: "10x Faster Dev",
  },
  {
    id: 2,
    title: "Integration Nightmares",
    description: "Existing systems and APIs don't plug in—custom glue code everywhere.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "Easy Integration",
    solDesc: "Seamlessly connect with existing systems, APIs, and third-party services through standardized interfaces and connectors.",
    solIcon: Sparkles,
    solImpact: "99.9% Uptime",
  },
  {
    id: 3,
    title: "Scale Anxiety",
    description: "Agents work in dev; fall over when traffic hits production.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "Scalable Design",
    solDesc: "Built to handle enterprise-scale workloads with high performance, reliability, and automatic scaling capabilities.",
    solIcon: CheckCircle2,
    solImpact: "90% Dev Satisfaction",
  },
];

const ZAKRA_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Information Scattered Everywhere",
    description: "Docs, Excel, wikis—no single place to get a reliable answer.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "Intelligent Search",
    solDesc: "Natural language queries that understand context and intent, delivering precise answers from your knowledge base.",
    solIcon: Zap,
    solImpact: "80% Faster Retrieval",
  },
  {
    id: 2,
    title: "Manual Tagging and Indexing",
    description: "Content grows faster than your team can organize it.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "Multi-Source Integration",
    solDesc: "Connect and search across documents, databases, wikis, and knowledge repositories in one unified interface.",
    solIcon: Sparkles,
    solImpact: "95% Answer Accuracy",
  },
  {
    id: 3,
    title: "Generic Search Results",
    description: "Keyword matches that miss context and domain nuance.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "Context-Aware Responses",
    solDesc: "Get answers that understand your specific domain, industry terminology, and organizational context.",
    solIcon: CheckCircle2,
    solImpact: "60% Time Saved",
  },
];

const JAWIB_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Support Volume Overload",
    description: "Tickets pile up. Customers wait. Teams burn out.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "24/7 Availability",
    solDesc: "Provide instant support to customers anytime, anywhere, with intelligent responses that never sleep.",
    solIcon: Zap,
    solImpact: "90% First Contact",
  },
  {
    id: 2,
    title: "Inconsistent Answers",
    description: "Different agents, different scripts—customers get mixed messages.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "Multi-Channel Support",
    solDesc: "Engage customers across chat, email, phone, and social media with consistent, personalized experiences.",
    solIcon: Sparkles,
    solImpact: "2s Response Time",
  },
  {
    id: 3,
    title: "Handoff Friction",
    description: "When bots can't help, context is lost and customers repeat themselves.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "Human Handoff",
    solDesc: "Seamlessly escalate complex issues to human agents when needed, with full context and conversation history.",
    solIcon: CheckCircle2,
    solImpact: "4.8/5 Satisfaction",
  },
];

const FASIH_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Arabic Lost in Translation",
    description: "Generic models treat Arabic as an afterthought—dialects and nuance get flattened.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "Native Arabic Understanding",
    solDesc: "Deep understanding of Modern Standard Arabic, regional dialects, and cultural nuances for accurate communication.",
    solIcon: Zap,
    solImpact: "98% Text Accuracy",
  },
  {
    id: 2,
    title: "Cultural Context Missing",
    description: "Outputs that are technically correct but tone-deaf to region and culture.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "Cultural Context",
    solDesc: "Trained on Arabic content with cultural awareness, ensuring appropriate and contextually relevant responses.",
    solIcon: Sparkles,
    solImpact: "15 Dialects",
  },
  {
    id: 3,
    title: "One-Size-Fits-All Dialects",
    description: "MSA-only support leaves regional users and content out in the cold.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "Multi-Dialect Support",
    solDesc: "Recognize and process various Arabic dialects while maintaining high accuracy across different regions.",
    solIcon: CheckCircle2,
    solImpact: "50B+ Tokens",
  },
];

const DOMAIN_EXPANSION_PROBLEMS: CinematicProblemItem[] = [
  {
    id: 1,
    title: "Legacy Lock-In",
    description: "Critical data and logic trapped in systems that can't talk to modern APIs.",
    icon: AlertCircle,
    spreadPos: SPREAD_POSITIONS[0],
    solTitle: "Legacy System Integration",
    solDesc: "Connect to any legacy system, database, or API without requiring modifications to existing infrastructure.",
    solIcon: Zap,
    solImpact: "70% Cost Reduction",
  },
  {
    id: 2,
    title: "Rip-and-Replace Risk",
    description: "Big bang migrations that cost millions and still fail.",
    icon: FileWarning,
    spreadPos: SPREAD_POSITIONS[1],
    solTitle: "AI-Enhanced Functionality",
    solDesc: "Add intelligent automation, natural language processing, and AI capabilities to systems built decades ago.",
    solIcon: Sparkles,
    solImpact: "100+ System Types",
  },
  {
    id: 3,
    title: "Downtime Fear",
    description: "Any change to legacy systems means scheduled outages and business disruption.",
    icon: XCircle,
    spreadPos: SPREAD_POSITIONS[2],
    solTitle: "Zero-Downtime Deployment",
    solDesc: "Implement AI enhancements gradually without disrupting your current operations or requiring system downtime.",
    solIcon: CheckCircle2,
    solImpact: "99.9% Reliability",
  },
];

const PROBLEMS_BY_SLUG: Record<string, CinematicProblemItem[]> = {
  erp: ERP_PROBLEMS,
  "ai-framework": AI_FRAMEWORK_PROBLEMS,
  zakra: ZAKRA_PROBLEMS,
  jawib: JAWIB_PROBLEMS,
  fasih: FASIH_PROBLEMS,
  "domain-expansion": DOMAIN_EXPANSION_PROBLEMS,
};

const DEFAULT_PROBLEMS = ERP_PROBLEMS;

export function getProductCinematicProblems(slug: string): CinematicProblemItem[] {
  return PROBLEMS_BY_SLUG[slug] ?? DEFAULT_PROBLEMS;
}
