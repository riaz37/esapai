
import React from 'react';
import { Node, Edge } from 'reactflow';
import {
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
    Server,
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
    ClipboardList,
    Cable,
    Sparkles,
    LayoutDashboard,
    TrendingUp,
} from 'lucide-react';

export type JourneyLayer = {
    id: string;
    title: string;
    nodes: Node[];
    edges: Edge[];
};

export type ProductJourneyData = {
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
const createNode = (id: string, x: number, y: number, title: string, icon: React.ReactNode) => ({
    id,
    type: 'journey',
    position: { x, y },
    data: { title, icon }
});

// --- AIVM Ecosystem (Reference Implementation) ---
const aivmJourney: ProductJourneyData = {
    journeyTitle: 'AIVM Ecosystem',
    journeySubtitle: 'A complete decentralized AI infrastructure.',
    layers: [
        {
            id: 'layer-app',
            title: 'AI Application Layer',
            nodes: [
                createNode('app-chat', 200, 200, 'Web3 Chatbot', <Bot size={32} />),
                createNode('app-alert', 600, 200, 'Crypto Alerts', <Activity size={32} />),
                createNode('app-agent', 1000, 200, 'AI Agents', <Cpu size={32} />),
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
                createNode('tok-gov', 200, 200, 'Governance', <Users size={32} />),
                createNode('tok-util', 600, 200, '$CGPT Utility', <Zap size={32} />),
                createNode('tok-stake', 1000, 200, 'Staking', <Layers size={32} />),
            ],
            edges: [
                createEdge('tok-gov', 'tok-util', 'r-out', 'l-in'),
                createEdge('tok-util', 'tok-stake', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'layer-chain',
            title: 'AIVM Blockchain',
            nodes: [
                createNode('chn-val', 200, 300, 'Validators', <RefreshCw size={32} />),
                createNode('chn-core', 600, 300, 'AIVM Core', <Brain size={32} />),
                createNode('chn-mkt', 1000, 120, 'Data Market', <Database size={32} />),
                createNode('chn-sdk', 1000, 300, 'SDK', <Code size={32} />),
                createNode('chn-gpu', 1000, 480, 'GPU Market', <Cpu size={32} />),
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

// --- ERP (Voice Activated) ---
const erpJourney: ProductJourneyData = {
    journeyTitle: 'Intelligent ERP',
    journeySubtitle: 'Voice-first enterprise management.',
    layers: [
        {
            id: 'erp-in',
            title: 'Input Layer',
            nodes: [
                createNode('erp-mic', 300, 250, 'Voice Input', <Mic size={32} />),
                createNode('erp-nlu', 700, 250, 'Intent NLU', <Brain size={32} />),
            ],
            edges: [createEdge('erp-mic', 'erp-nlu', 'r-out', 'l-in')]
        },
        {
            id: 'erp-proc',
            title: 'Processing Layer',
            nodes: [
                createNode('erp-task', 300, 250, 'Task Planner', <Workflow size={32} />),
                createNode('erp-exec', 700, 250, 'Execution', <Zap size={32} />),
            ],
            edges: [createEdge('erp-task', 'erp-exec', 'r-out', 'l-in')]
        },
        {
            id: 'erp-out',
            title: 'Action Layer',
            nodes: [
                createNode('erp-db', 200, 250, 'Database', <Database size={32} />),
                createNode('erp-sync', 600, 250, 'Sync Engine', <RefreshCw size={32} />),
                createNode('erp-ui', 1000, 250, 'Dashboard', <LayoutDashboard size={32} />),
            ],
            edges: [
                createEdge('erp-db', 'erp-sync', 'r-out', 'l-in'),
                createEdge('erp-sync', 'erp-ui', 'r-out', 'l-in')
            ]
        }
    ]
};

// --- Zakra (Knowledge Agent) ---
const zakraJourney: ProductJourneyData = {
    journeyTitle: 'Zakra Knowledge',
    journeySubtitle: 'Unified data intelligence.',
    layers: [
        {
            id: 'zak-ingest',
            title: 'Ingestion Layer',
            nodes: [
                createNode('zak-src', 300, 250, 'Data Sources', <Link2 size={32} />),
                createNode('zak-idx', 700, 250, 'Indexing', <FileStack size={32} />),
            ],
            edges: [createEdge('zak-src', 'zak-idx', 'r-out', 'l-in')]
        },
        {
            id: 'zak-know',
            title: 'Knowledge Layer',
            nodes: [
                createNode('zak-map', 500, 250, 'Knowledge Graph', <Map size={32} />),
            ],
            edges: []
        },
        {
            id: 'zak-query',
            title: 'Query Layer',
            nodes: [
                createNode('zak-usr', 200, 250, 'User Query', <Search size={32} />),
                createNode('zak-act', 600, 250, 'Context Engine', <Brain size={32} />),
                createNode('zak-ans', 1000, 250, 'Answer', <MessageSquare size={32} />),
            ],
            edges: [
                createEdge('zak-usr', 'zak-act', 'r-out', 'l-in'),
                createEdge('zak-act', 'zak-ans', 'r-out', 'l-in'),
            ]
        }
    ]
};

// --- Jawib (Customer Service) ---
const jawibJourney: ProductJourneyData = {
    journeyTitle: 'Jawib Support',
    journeySubtitle: 'Automated customer resolution.',
    layers: [
        {
            id: 'jaw-in',
            title: 'Inbound Layer',
            nodes: [
                createNode('jaw-msg', 300, 250, 'Message In', <Inbox size={32} />),
                createNode('jaw-rte', 700, 250, 'Router', <Workflow size={32} />),
            ],
            edges: [createEdge('jaw-msg', 'jaw-rte', 'r-out', 'l-in')]
        },
        {
            id: 'jaw-anl',
            title: 'Analysis Layer',
            nodes: [
                createNode('jaw-int', 300, 250, 'Intent Scan', <ScanSearch size={32} />),
                createNode('jaw-res', 700, 250, 'resolver', <CheckCircle size={32} />),
            ],
            edges: [createEdge('jaw-int', 'jaw-res', 'r-out', 'l-in')]
        },
        {
            id: 'jaw-lrn',
            title: 'Learning Layer',
            nodes: [
                createNode('jaw-esc', 200, 250, 'Escalation', <ArrowRight size={32} />),
                createNode('jaw-mod', 600, 250, 'Model Update', <RefreshCw size={32} />),
                createNode('jaw-kb', 1000, 250, 'Knowledge Base', <BookOpen size={32} />),
            ],
            edges: [
                createEdge('jaw-esc', 'jaw-mod', 'r-out', 'l-in'),
                createEdge('jaw-mod', 'jaw-kb', 'r-out', 'l-in')
            ]
        }
    ]
};

// --- Fasih (Arabic LLM) ---
const fasihJourney: ProductJourneyData = {
    journeyTitle: 'Fasih Arabic LLM',
    journeySubtitle: 'Nuanced Arabic understanding.',
    layers: [
        {
            id: 'fas-in',
            title: 'Dialect Layer',
            nodes: [
                createNode('fas-txt', 300, 250, 'Text Input', <MessageSquare size={32} />),
                createNode('fas-det', 700, 250, 'Dialect ID', <Globe size={32} />),
            ],
            edges: [createEdge('fas-txt', 'fas-det', 'r-out', 'l-in')]
        },
        {
            id: 'fas-proc',
            title: 'Processing Layer',
            nodes: [
                createNode('fas-tok', 300, 250, 'Tokenizer', <Code size={32} />),
                createNode('fas-llm', 700, 250, 'Arabic LLM', <Brain size={32} />),
            ],
            edges: [createEdge('fas-tok', 'fas-llm', 'r-out', 'l-in')]
        },
        {
            id: 'fas-out',
            title: 'Output Layer',
            nodes: [
                createNode('fas-gen', 300, 250, 'Generation', <Sparkles size={32} />),
                createNode('fas-fin', 700, 250, 'Final Output', <FileText size={32} />),
            ],
            edges: [createEdge('fas-gen', 'fas-fin', 'r-out', 'l-in')]
        }
    ]
};

// --- Domain Expansion ---
const domainJourney: ProductJourneyData = {
    journeyTitle: 'Domain Expansion',
    journeySubtitle: 'Scale beyond limits.',
    layers: [
        {
            id: 'dom-audit',
            title: 'Audit Layer',
            nodes: [
                createNode('dom-ass', 300, 250, 'Assessment', <ClipboardList size={32} />),
                createNode('dom-map', 700, 250, 'System Map', <Map size={32} />),
            ],
            edges: [createEdge('dom-ass', 'dom-map', 'r-out', 'l-in')]
        },
        {
            id: 'dom-brdg',
            title: 'Bridge Layer',
            nodes: [
                createNode('dom-con', 300, 250, 'Connectors', <Link2 size={32} />),
                createNode('dom-auto', 700, 250, 'Automation', <Cable size={32} />),
            ],
            edges: [createEdge('dom-con', 'dom-auto', 'r-out', 'l-in')]
        },
        {
            id: 'dom-scale',
            title: 'Scale Layer',
            nodes: [
                createNode('dom-srf', 200, 250, 'Surface Data', <LayoutDashboard size={32} />),
                createNode('dom-opt', 600, 250, 'Optimization', <Sparkles size={32} />),
                createNode('dom-gro', 1000, 250, 'Growth', <TrendingUp size={32} />),
            ],
            edges: [
                createEdge('dom-srf', 'dom-opt', 'r-out', 'l-in'),
                createEdge('dom-opt', 'dom-gro', 'r-out', 'l-in')
            ]
        }
    ]
};

// --- Import Helper (Activity) ---
import { Activity } from 'lucide-react';

export const PRODUCT_JOURNEYS: Record<string, ProductJourneyData> = {
    'ai-framework': aivmJourney,
    'erp': erpJourney,
    'zakra': zakraJourney,
    'jawib': jawibJourney,
    'fasih': fasihJourney,
    'domain-expansion': domainJourney,
};
