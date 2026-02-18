
import React from 'react';
import { Node, Edge } from 'reactflow';
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
                createNode('app-chat', 300, 325, 'Web3 Chatbot', <Bot size={32} />, '/assets/architecture/chatbot_holographic_1770292441971.png'),
                createNode('app-alert', 700, 325, 'Crypto Alerts', <Activity size={32} />, '/assets/architecture/crypto_alerts_holographic_1770292459407.png'),
                createNode('app-agent', 1100, 325, 'AI Agents', <Cpu size={32} />, '/assets/architecture/ai_agent_holographic_1770292475713.png'),
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
                createNode('tok-gov', 300, 325, 'Governance', <Users size={32} />, '/assets/architecture/governance_holographic_1770292494430.png'),
                createNode('tok-util', 700, 325, '$CGPT Utility', <Zap size={32} />, '/assets/architecture/cgpt_token_holographic_1770292512049.png'),
                createNode('tok-stake', 1100, 325, 'Staking', <Layers size={32} />, '/assets/architecture/staking_holographic_1770292533085.png'),
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
                createNode('chn-val', 300, 325, 'Validators', <RefreshCw size={32} />, '/assets/architecture/validators_holographic_1770292550678.png'),
                createNode('chn-core', 700, 325, 'Framework Core', <Brain size={32} />, '/assets/architecture/aivm_core_holographic_1770292568939.png'),
                createNode('chn-mkt', 1100, 150, 'Data Market', <Database size={32} />, '/assets/architecture/data_market_holographic_1770292586117.png'),
                createNode('chn-sdk', 1100, 325, 'SDK', <Code size={32} />),
                createNode('chn-gpu', 1100, 500, 'GPU Market', <Cpu size={32} />),
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
                createNode('erp-mic', 500, 200, 'Voice Input', <Mic size={32} />, '/assets/architecture/voice_input_holographic_1770292602178.png'),
                createNode('erp-nlu', 900, 200, 'Intent NLU', <Brain size={32} />, '/assets/architecture/intent_nlu_holographic_1770292623251.png'),
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
                createNode('erp-task', 550, 225, 'Task Planner', <Workflow size={32} />, '/assets/architecture/task_planner_holographic_1770292646038.png'),
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
                createNode('zak-src1', 450, 140, 'Documents', <FileStack size={32} />),
                createNode('zak-src2', 450, 350, 'Databases', <Database size={32} />),
                createNode('zak-src3', 450, 560, 'Cloud Wiki', <Globe size={32} />),
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
                createNode('zak-graph', 700, 350, 'Graph Central', <Map size={32} />, '/assets/architecture/knowledge_graph_holographic_1770292665853.png'),
                createNode('zak-spoke1', 450, 140, 'Entity Sync', <RefreshCw size={32} />),
                createNode('zak-spoke2', 950, 140, 'Semantic Index', <BookOpen size={32} />),
                createNode('zak-spoke3', 450, 560, 'Access Control', <CheckCircle size={32} />),
                createNode('zak-spoke4', 950, 560, 'Cache', <Zap size={32} />),
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

// --- Jawib (Tree/Bifurcated Layout) ---
const jawibJourney: ProductJourneyData = {
    journeyTitle: 'Jawib Support',
    journeySubtitle: 'Automated triage and resolution tree.',
    layers: [
        {
            id: 'jaw-in',
            title: 'Omnichannel Entry',
            nodes: [
                createNode('jaw-msg', 700, 325, 'Unified Inbox', <Inbox size={32} />, '/assets/architecture/message_inbound_holographic_1770292690901.png'),
            ],
            edges: []
        },
        {
            id: 'jaw-route',
            title: 'Triage & Pathing',
            nodes: [
                createNode('jaw-rte', 475, 325, 'Smart Router', <Workflow size={32} />),
                createNode('jaw-res', 925, 175, 'AI Resolution', <CheckCircle size={32} />),
                createNode('jaw-esc', 925, 475, 'Human Escalation', <ArrowRight size={32} />, '/assets/architecture/escalation_holographic_1770292729442.png'),
            ],
            edges: [
                createEdge('jaw-rte', 'jaw-res', 'tr-out', 'bl-in'),
                createEdge('jaw-rte', 'jaw-esc', 'br-out', 'tl-in'),
            ]
        },
        {
            id: 'jaw-lrn',
            title: 'Feedback Loop',
            nodes: [
                createNode('jaw-int', 300, 325, 'Intent Scan', <ScanSearch size={32} />, '/assets/architecture/intent_scan_holographic_1770292712447.png'),
                createNode('jaw-upd', 700, 325, 'Model Update', <RefreshCw size={32} />),
                createNode('jaw-kb', 1100, 325, 'Knowledge Sync', <BookOpen size={32} />),
            ],
            edges: [
                createEdge('jaw-int', 'jaw-upd', 'r-out', 'l-in'),
                createEdge('jaw-upd', 'jaw-kb', 'r-out', 'l-in')
            ]
        }
    ]
};

// --- Fasih (Pipeline Layout) ---
const fasihJourney: ProductJourneyData = {
    journeyTitle: 'Fasih Arabic LLM',
    journeySubtitle: 'Sequential processing pipeline.',
    layers: [
        {
            id: 'fas-in',
            title: 'Input Pre-processing',
            nodes: [
                createNode('fas-txt', 400, 325, 'Text Input', <MessageSquare size={32} />),
                createNode('fas-tok', 650, 325, 'Tokenizer', <Code size={32} />),
                createNode('fas-det', 1000, 325, 'Dialect ID', <Globe size={32} />),
            ],
            edges: [
                createEdge('fas-txt', 'fas-tok', 'r-out', 'l-in'),
                createEdge('fas-tok', 'fas-det', 'r-out', 'l-in'),
            ]
        },
        {
            id: 'fas-proc',
            title: 'Neural Core',
            nodes: [
                createNode('fas-llm', 700, 325, 'Arabic LLM', <Brain size={32} />, '/assets/architecture/arabic_llm_holographic_1770292748399.png'),
            ],
            edges: []
        },
        {
            id: 'fas-out',
            title: 'Generation Pipeline',
            nodes: [
                createNode('fas-gen', 350, 325, 'Generation', <Sparkles size={32} />),
                createNode('fas-aud', 700, 325, 'Compliance Audit', <CheckCircle size={32} />),
                createNode('fas-fin', 1050, 325, 'Final Output', <FileText size={32} />),
            ],
            edges: [
                createEdge('fas-gen', 'fas-aud', 'r-out', 'l-in'),
                createEdge('fas-aud', 'fas-fin', 'r-out', 'l-in'),
            ]
        }
    ]
};


export const PRODUCT_JOURNEYS: Record<string, ProductJourneyData> = {
    'ai-framework': aiFrameworkJourney,
    'erp': erpJourney,
    'zakra': zakraJourney,
    'jawib': jawibJourney,
    'fasih': fasihJourney,
};
