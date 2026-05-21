
import React from 'react';
import {
    Activity,
    Bot,
    Cpu,
    Layers,
    Workflow,
    RefreshCw,
    Database,
    Globe,
    MessageSquare,
    Search,
    FileText,
    Mic,
    Zap,
    Users,
    Code,
    Brain,
    Link2,
    FileStack,
    Map,
    Inbox,
    ScanSearch,
    CheckCircle,
    ArrowRight,
    BookOpen,
    Sparkles,
    LayoutDashboard,
    Settings,
} from 'lucide-react';

// Local lightweight types replacing reactflow's Node/Edge (eliminates reactflow from bundle)
type Node = {
    id: string;
    type?: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
};

type Edge = {
    id: string;
    source: string;
    target: string;
    type?: string;
    sourceHandle?: string;
    targetHandle?: string;
};

type JourneyLayer = {
    id: string;
    title: string;
    nodes: Node[];
    edges: Edge[];
};

type ProductJourneyData = {
    layers: JourneyLayer[];
    journeyTitle?: string;
    journeySubtitle?: string;
};

const createEdge = (source: string, target: string, sourceHandle?: string, targetHandle?: string) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: 'cinematic', // Uses our custom component
    sourceHandle,
    targetHandle
});

// Helper to create a standard node
const createNode = (id: string, x: number, y: number, title: string, icon: React.ReactNode, image?: string) => ({
    id,
    type: 'journey',
    position: { x, y },
    data: { title, icon, image }
});

// --- AI Framework (Branching) ---
const aiFrameworkJourney: ProductJourneyData = {
    journeyTitle: 'AI Framework Ecosystem',
    journeySubtitle: 'A decentralized network powering enterprise-grade intelligence.',
    layers: [
        {
            id: 'layer-app',
            title: 'AI Application Layer',
            nodes: [
                createNode('app-chat', 300, 325, 'Web3 Chatbot', <Bot size={32} />),
                createNode('app-alert', 700, 325, 'Crypto Alerts', <Activity size={32} />),
                createNode('app-agent', 1100, 325, 'AI Agents', <Cpu size={32} />),
            ],
            edges: [
                createEdge('app-chat', 'app-alert', 'r-out', 'l-in'),
                createEdge('app-alert', 'app-agent', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'layer-token',
            title: '$CGPT Token Layer',
            nodes: [
                createNode('tok-gov', 300, 325, 'Governance', <Users size={32} />),
                createNode('tok-util', 700, 325, '$CGPT Utility', <Zap size={32} />),
                createNode('tok-stake', 1100, 325, 'Staking', <Layers size={32} />),
            ],
            edges: [
                createEdge('tok-gov', 'tok-util', 'r-out', 'l-in'),
                createEdge('tok-util', 'tok-stake', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'layer-chain',
            title: 'AI Framework Blockchain',
            nodes: [
                createNode('chn-val', 300, 325, 'Validators', <RefreshCw size={32} />),
                createNode('chn-core', 700, 325, 'Framework Core', <Brain size={32} />),
                createNode('chn-mkt', 1100, 190, 'Data Market', <Database size={32} />),
                createNode('chn-sdk', 1100, 325, 'SDK', <Code size={32} />),
                createNode('chn-gpu', 1100, 460, 'GPU Market', <Cpu size={32} />),
            ],
            edges: [
                createEdge('chn-val', 'chn-core', 'r-out', 'l-in'),
                createEdge('chn-core', 'chn-mkt', 'r-out', 'l-in'),
                createEdge('chn-core', 'chn-sdk', 'r-out', 'l-in'),
                createEdge('chn-core', 'chn-gpu', 'r-out', 'l-in'),
            ]
        }
    ]
};

// --- ERP (Matrix Layout) ---
const erpJourney: ProductJourneyData = {
    journeyTitle: 'Intelligent ERP',
    journeySubtitle: 'Voice-first enterprise management with parallel processing.',
    layers: [
        {
            id: 'erp-in',
            title: 'Input Management',
            nodes: [
                createNode('erp-mic', 500, 200, 'Voice Input', <Mic size={32} />),
                createNode('erp-nlu', 900, 200, 'Intent NLU', <Brain size={32} />),
                createNode('erp-manual', 500, 450, 'ERP Manual', <FileText size={32} />),
                createNode('erp-api', 900, 450, 'External API', <Link2 size={32} />),
            ],
            edges: [
                createEdge('erp-mic', 'erp-nlu', 'r-out', 'l-in'),
                createEdge('erp-manual', 'erp-nlu', 'r-out', 'l-in'),
                createEdge('erp-api', 'erp-nlu', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'erp-proc',
            title: 'Core Engine (Matrix)',
            nodes: [
                createNode('erp-task', 550, 225, 'Task Planner', <Workflow size={32} />),
                createNode('erp-logic', 850, 225, 'Business Logic', <Cpu size={32} />),
                createNode('erp-exec', 550, 425, 'Execution', <Zap size={32} />),
                createNode('erp-audit', 850, 425, 'Compliance', <CheckCircle size={32} />),
            ],
            edges: [
                createEdge('erp-task', 'erp-logic', 'r-out', 'l-in'),
                createEdge('erp-logic', 'erp-audit', 'b-out', 't-in'),
                createEdge('erp-task', 'erp-exec', 'b-out', 't-in'),
                createEdge('erp-exec', 'erp-audit', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'erp-ext',
            title: 'Global Distribution',
            nodes: [
                createNode('erp-db', 300, 325, 'Database', <Database size={32} />),
                createNode('erp-sync', 700, 325, 'Cloud Sync', <RefreshCw size={32} />),
                createNode('erp-dash', 1100, 325, 'Command Center', <LayoutDashboard size={32} />),
            ],
            edges: [
                createEdge('erp-db', 'erp-sync', 'r-out', 'l-in'),
                createEdge('erp-sync', 'erp-dash', 'r-out', 'l-in')
            ]
        }
    ]
};

// --- Zakra (Hub-and-Spoke Layout) ---
const zakraJourney: ProductJourneyData = {
    journeyTitle: 'Zakra Knowledge',
    journeySubtitle: 'Unified data intelligence through centralized graph hub.',
    layers: [
        {
            id: 'zak-ingest',
            title: 'Intake Network',
            nodes: [
                createNode('zak-src1', 450, 185, 'Documents', <FileStack size={32} />),
                createNode('zak-src2', 450, 350, 'Databases', <Database size={32} />),
                createNode('zak-src3', 450, 515, 'Cloud Wiki', <Globe size={32} />),
                createNode('zak-hub', 950, 350, 'Intake Hub', <Workflow size={32} />),
            ],
            edges: [
                createEdge('zak-src1', 'zak-hub', 'r-out', 'l-in'),
                createEdge('zak-src2', 'zak-hub', 'r-out', 'l-in'),
                createEdge('zak-src3', 'zak-hub', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'zak-core',
            title: 'Knowledge Core (Hub)',
            nodes: [
                createNode('zak-graph', 700, 350, 'Graph Central', <Map size={32} />),
                createNode('zak-spoke1', 450, 185, 'Entity Sync', <RefreshCw size={32} />),
                createNode('zak-spoke2', 950, 185, 'Semantic Index', <BookOpen size={32} />),
                createNode('zak-spoke3', 450, 515, 'Access Control', <CheckCircle size={32} />),
                createNode('zak-spoke4', 950, 515, 'Cache', <Zap size={32} />),
            ],
            edges: [
                createEdge('zak-graph', 'zak-spoke1', 'tl-out', 'br-in'),
                createEdge('zak-graph', 'zak-spoke2', 'tr-out', 'bl-in'),
                createEdge('zak-graph', 'zak-spoke3', 'bl-out', 'tr-in'),
                createEdge('zak-graph', 'zak-spoke4', 'br-out', 'tl-in'),
            ]
        },
        {
            id: 'zak-out',
            title: 'Intelligence Delivery',
            nodes: [
                createNode('zak-usr', 300, 325, 'User Query', <Search size={32} />),
                createNode('zak-ai', 700, 325, 'Context AI', <Brain size={32} />),
                createNode('zak-ans', 1100, 325, 'Smart Answer', <MessageSquare size={32} />),
            ],
            edges: [
                createEdge('zak-usr', 'zak-ai', 'r-out', 'l-in'),
                createEdge('zak-ai', 'zak-ans', 'r-out', 'l-in'),
            ]
        }
    ]
};

// --- PageSense (Pipeline Layout) ---
const pagesenseJourney: ProductJourneyData = {
    journeyTitle: 'PageSense Ecosystem',
    journeySubtitle: 'A self-contained intelligence layer for your document archive.',
    layers: [
        {
            id: 'ps-in',
            title: 'Document Input Layer',
            nodes: [
                createNode('ps-pdf', 350, 325, 'PDF Upload', <FileText size={32} />),
                createNode('ps-scan', 700, 325, 'Scans & Images', <ScanSearch size={32} />),
                createNode('ps-hand', 1050, 325, 'Handwritten Notes', <MessageSquare size={32} />),
            ],
            edges: [
                createEdge('ps-pdf', 'ps-scan', 'r-out', 'l-in'),
                createEdge('ps-scan', 'ps-hand', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'ps-core',
            title: 'Intelligence Core',
            nodes: [
                createNode('ps-vis', 350, 325, 'Visual Reading', <Brain size={32} />),
                createNode('ps-srch', 700, 325, 'Hybrid Search', <Globe size={32} />),
                createNode('ps-struct', 1050, 325, 'Auto Structure', <Workflow size={32} />),
            ],
            edges: [
                createEdge('ps-vis', 'ps-srch', 'r-out', 'l-in'),
                createEdge('ps-srch', 'ps-struct', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'ps-out',
            title: 'Output & Access Layer',
            nodes: [
                createNode('ps-ans', 350, 325, 'Cited Answers', <CheckCircle size={32} />),
                createNode('ps-view', 700, 325, 'Document Viewer', <BookOpen size={32} />),
                createNode('ps-data', 1050, 325, 'Structured Output', <Code size={32} />),
            ],
            edges: [
                createEdge('ps-ans', 'ps-view', 'r-out', 'l-in'),
                createEdge('ps-view', 'ps-data', 'r-out', 'l-in'),
            ]
        }
    ]
};

// --- OmniListen (Pipeline Layout) ---
const omnilistenJourney: ProductJourneyData = {
    journeyTitle: 'OmniListen Ecosystem',
    journeySubtitle: 'A self-contained intelligence layer for your entire conversation archive.',
    layers: [
        {
            id: 'ol-in',
            title: 'Audio Capture Layer',
            nodes: [
                createNode('ol-web', 350, 325, 'Web Dashboard', <Globe size={32} />),
                createNode('ol-app', 700, 325, 'Android App', <Inbox size={32} />),
                createNode('ol-ext', 1050, 325, 'Browser Extension', <Code size={32} />),
            ],
            edges: [
                createEdge('ol-web', 'ol-app', 'r-out', 'l-in'),
                createEdge('ol-app', 'ol-ext', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'ol-core',
            title: 'Intelligence Core',
            nodes: [
                createNode('ol-tx', 350, 325, 'Transcription', <MessageSquare size={32} />),
                createNode('ol-ai', 700, 325, 'AI Extraction', <Brain size={32} />),
                createNode('ol-sync', 1050, 325, 'Task & Date Sync', <RefreshCw size={32} />),
            ],
            edges: [
                createEdge('ol-tx', 'ol-ai', 'r-out', 'l-in'),
                createEdge('ol-ai', 'ol-sync', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'ol-out',
            title: 'Output & Action Layer',
            nodes: [
                createNode('ol-sum', 350, 325, 'Smart Summary', <Sparkles size={32} />),
                createNode('ol-dash', 700, 325, 'Task Dashboard', <CheckCircle size={32} />),
                createNode('ol-cal', 1050, 325, 'Calendar Events', <ArrowRight size={32} />),
            ],
            edges: [
                createEdge('ol-sum', 'ol-dash', 'r-out', 'l-in'),
                createEdge('ol-dash', 'ol-cal', 'r-out', 'l-in'),
            ]
        }
    ]
};


// --- Causal OS (Pipeline Layout) ---
const causalOsJourney: ProductJourneyData = {
    journeyTitle: 'Causal OS Ecosystem',
    journeySubtitle: 'A governed operating layer for every high-stakes decision your organization makes.',
    layers: [
        {
            id: 'cos-domain',
            title: 'Domain Setup',
            nodes: [
                createNode('cos-prep', 350, 325, 'Data Prep', <FileText size={32} />),
                createNode('cos-setup', 700, 325, 'Domain Setup', <Settings size={32} />),
                createNode('cos-live', 1050, 325, 'Live Domain', <Globe size={32} />),
            ],
            edges: [
                createEdge('cos-prep', 'cos-setup', 'r-out', 'l-in'),
                createEdge('cos-setup', 'cos-live', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'cos-core',
            title: 'Governance Core',
            nodes: [
                createNode('cos-engine', 350, 325, 'Decision Engine', <Brain size={32} />),
                createNode('cos-checks', 700, 325, 'Independent Checks', <CheckCircle size={32} />),
                createNode('cos-result', 1050, 325, 'Decision Result', <Zap size={32} />),
            ],
            edges: [
                createEdge('cos-engine', 'cos-checks', 'r-out', 'l-in'),
                createEdge('cos-checks', 'cos-result', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'cos-audit',
            title: 'Audit & Action',
            nodes: [
                createNode('cos-ledger', 350, 325, 'Decision Ledger', <BookOpen size={32} />),
                createNode('cos-queue', 700, 325, 'Review Queue', <Inbox size={32} />),
                createNode('cos-export', 1050, 325, 'Audit Export', <FileText size={32} />),
            ],
            edges: [
                createEdge('cos-ledger', 'cos-queue', 'r-out', 'l-in'),
                createEdge('cos-queue', 'cos-export', 'r-out', 'l-in'),
            ]
        }
    ]
};


export const PRODUCT_JOURNEYS: Record<string, ProductJourneyData> = {
    'ai-framework': aiFrameworkJourney,
    'erp': erpJourney,
    'zakra': zakraJourney,
    'pagesense': pagesenseJourney,
    'omnilisten': omnilistenJourney,
    'causal-os': causalOsJourney,
};
