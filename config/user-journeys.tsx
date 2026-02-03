
import React from 'react';
import { Node, Edge } from 'reactflow';
import {
    Bot,
    Layers,
    Workflow,
    RefreshCw,
    Database,
    Globe,
    MessageSquare,
    Search,
    FileText,
    Server,
    Mic,
    BarChart3,
    Zap,
    Users,
    Code,
    Brain,
    Lightbulb,
    Wrench,
    Rocket,
    Activity,
    TrendingUp,
    Link2,
    FileStack,
    Map,
    Inbox,
    ScanSearch,
    CheckCircle,
    ArrowRight,
    BookOpen,
    ClipboardList,
    Cable,
    Sparkles,
    LayoutDashboard,
} from 'lucide-react';

export type JourneyStep = {
    targetId: string; // Node ID to focus on (or '' for overview)
    position?: { x: number; y: number }; // Optional; computed in component for focused steps
    zoom: number;
    duration: number;
    caption?: string; // Narrative line shown when this step is active
};

export type ProductJourneyData = {
    nodes: Node[];
    edges: Edge[];
    cinematicSequence: JourneyStep[];
    /** Optional product-specific section title (e.g. "How ERP Works") */
    journeyTitle?: string;
    /** Optional product-specific section subtitle */
    journeySubtitle?: string;
};

const STEP_SPACING = 300;

const createEdge = (source: string, target: string, order: number) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: 'cinematic',
    data: { order }
});

/** Build nodes in a straight line: step1..stepN, each with optional size 'lg' at heroIndex */
function buildNodes(
    count: number,
    steps: { title: string; icon: React.ReactNode }[],
    heroIndex: number
): Node[] {
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
        const id = `step${i + 1}`;
        nodes.push({
            id,
            type: 'journey',
            position: { x: i * STEP_SPACING, y: 200 },
            data: {
                title: steps[i].title,
                icon: steps[i].icon,
                ...(i === heroIndex ? { size: 'lg' as const } : {}),
            },
        });
    }
    return nodes;
}

/** Build edges between step1 → step2 → … → stepN */
function buildEdges(count: number): Edge[] {
    const edges: Edge[] = [];
    for (let i = 0; i < count - 1; i++) {
        edges.push(createEdge(`step${i + 1}`, `step${i + 2}`, i + 1));
    }
    return edges;
}

/** Build cinematic sequence: overview → step1..stepN → overview (positions computed in component) */
function buildSequence(
    count: number,
    overviewCaption: string,
    stepCaptions: string[],
    outroCaption = 'Where it takes you.'
): JourneyStep[] {
    const steps: JourneyStep[] = [
        { targetId: '', zoom: 0.6, duration: 0, caption: overviewCaption },
        ...Array.from({ length: count }, (_, i) => ({
            targetId: `step${i + 1}`,
            zoom: 1.2 as const,
            duration: 2 as const,
            caption: stepCaptions[i] ?? '',
        })),
        { targetId: '', zoom: 0.6, duration: 2, caption: outroCaption },
    ];
    return steps;
}

// --- ERP (Voice Activated) — 4 steps ---
const erpJourney: ProductJourneyData = {
    journeyTitle: 'How ERP Works',
    journeySubtitle: 'From voice command to instant result. Zero training required.',
    nodes: buildNodes(4, [
        { title: 'Voice Command', icon: <Mic size={32} /> },
        { title: 'AI Processor', icon: <Brain size={32} /> },
        { title: 'Task Automation', icon: <Workflow size={32} /> },
        { title: 'Instant Result', icon: <Zap size={32} /> },
    ], 1),
    edges: buildEdges(4),
    cinematicSequence: buildSequence(4, 'From voice to action.', [
        'Speak. The system listens.',
        'AI processes intent in real time.',
        'Tasks run automatically.',
        'Results delivered instantly.',
    ]),
};

// --- AI Framework — 5 steps (idea → scale) ---
const aivmJourney: ProductJourneyData = {
    journeyTitle: 'From Idea to Scale',
    journeySubtitle: 'Build, deploy, and scale AI agents with enterprise reliability.',
    nodes: buildNodes(5, [
        { title: 'Define Idea', icon: <Lightbulb size={32} /> },
        { title: 'Build Agent', icon: <Wrench size={32} /> },
        { title: 'Deploy Infra', icon: <Rocket size={32} /> },
        { title: 'Monitor Performance', icon: <Activity size={32} /> },
        { title: 'Scale & Optimize', icon: <TrendingUp size={32} /> },
    ], 2),
    edges: buildEdges(5),
    cinematicSequence: buildSequence(5, 'The path from idea to scale.', [
        'You define the use case. We provide the framework.',
        'Build agents with modular, composable components.',
        'Deploy to enterprise infrastructure in minutes.',
        'Monitor performance and reliability in real time.',
        'Scale without limits. Optimize continuously.',
    ]),
};

// --- Zakra (Knowledge Agent) — 5 steps ---
const zakraJourney: ProductJourneyData = {
    journeyTitle: 'From Data to Answers',
    journeySubtitle: 'Connect your knowledge. Query in natural language. Get context-aware answers.',
    nodes: buildNodes(5, [
        { title: 'Connect Sources', icon: <Link2 size={32} /> },
        { title: 'Ingest & Index', icon: <FileStack size={32} /> },
        { title: 'Knowledge Map', icon: <Map size={32} /> },
        { title: 'Natural Query', icon: <Search size={32} /> },
        { title: 'Context Answer', icon: <MessageSquare size={32} /> },
    ], 2),
    edges: buildEdges(5),
    cinematicSequence: buildSequence(5, 'From scattered data to one source of truth.', [
        'Connect spreadsheets, docs, and databases.',
        'Ingest and index without manual tagging.',
        'Build a unified knowledge map automatically.',
        'Query in natural language. No SQL required.',
        'Get answers with full context and sources.',
    ]),
};

// --- Jawib (Customer Service) — 5 steps ---
const jawibJourney: ProductJourneyData = {
    journeyTitle: 'From Inquiry to Resolution',
    journeySubtitle: 'Inbound, analyze, resolve, escalate, learn. 24/7 support automation.',
    nodes: buildNodes(5, [
        { title: 'Inbound', icon: <Inbox size={32} /> },
        { title: 'Analyze Intent', icon: <ScanSearch size={32} /> },
        { title: 'Resolve or Escalate', icon: <CheckCircle size={32} /> },
        { title: 'Human Handoff', icon: <ArrowRight size={32} /> },
        { title: 'Learn & Improve', icon: <BookOpen size={32} /> },
    ], 2),
    edges: buildEdges(5),
    cinematicSequence: buildSequence(5, 'From first touch to lasting resolution.', [
        'Customers reach out. Any channel, any time.',
        'Intent is analyzed instantly. No scripts.',
        'Most cases resolve automatically. Rest get triaged.',
        'Humans step in only when it matters.',
        'Every interaction improves the model.',
    ]),
};

// --- Fasih (Arabic LLM) — 4 steps ---
const fasihJourney: ProductJourneyData = {
    journeyTitle: 'From Dialect to Nuance',
    journeySubtitle: 'Native Arabic understanding. Dialect-aware. Culturally grounded.',
    nodes: buildNodes(4, [
        { title: 'Dialect Input', icon: <MessageSquare size={32} /> },
        { title: 'Understand', icon: <Globe size={32} /> },
        { title: 'Process', icon: <Brain size={32} /> },
        { title: 'Nuanced Output', icon: <FileText size={32} /> },
    ], 1),
    edges: buildEdges(4),
    cinematicSequence: buildSequence(4, 'From dialect to nuance.', [
        'Input in any Arabic dialect. No normalization needed.',
        'Native understanding. Not translation.',
        'LLM processing with cultural context.',
        'Nuanced, natural output. Human-quality.',
    ]),
};

// --- Domain Expansion — 6 steps (legacy to modern) ---
const domainJourney: ProductJourneyData = {
    journeyTitle: 'From Legacy to Modern',
    journeySubtitle: 'Assess, connect, bridge, automate, surface, scale. No rip-and-replace.',
    nodes: buildNodes(6, [
        { title: 'Assess', icon: <ClipboardList size={32} /> },
        { title: 'Connect', icon: <Link2 size={32} /> },
        { title: 'Bridge', icon: <Cable size={32} /> },
        { title: 'Automate', icon: <Sparkles size={32} /> },
        { title: 'Surface', icon: <LayoutDashboard size={32} /> },
        { title: 'Scale', icon: <TrendingUp size={32} /> },
    ], 2),
    edges: buildEdges(6),
    cinematicSequence: buildSequence(6, 'From legacy systems to modern workflows.', [
        'Assess existing systems and integration points.',
        'Connect without disrupting current operations.',
        'AI bridges legacy and modern APIs.',
        'Automate workflows without rip-and-replace.',
        'Surface data in modern dashboards.',
        'Scale across departments and regions.',
    ]),
};

// --- Export Map ---
export const PRODUCT_JOURNEYS: Record<string, ProductJourneyData> = {
    'ai-framework': aivmJourney, // Maps to AI Framework (AIVM)
    'erp': erpJourney,
    'zakra': zakraJourney,
    'jawib': jawibJourney,
    'fasih': fasihJourney,
    'domain-expansion': domainJourney,
};
