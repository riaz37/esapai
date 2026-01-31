
import React from 'react';
import { Node, Edge } from 'reactflow';
import {
    Bot,
    Cpu,
    Layers,
    ShoppingBasket,
    Workflow,
    RefreshCw,
    Database,
    Shield,
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
    Brain
} from 'lucide-react';

export type JourneyStep = {
    targetId: string; // Node ID to focus on (or '' for overview)
    position: { x: number; y: number }; // Camera target coordinates
    zoom: number;
    duration: number;
};

export type ProductJourneyData = {
    nodes: Node[];
    edges: Edge[];
    cinematicSequence: JourneyStep[];
};

// --- Helper to create standard cinematic edges ---
const createEdge = (source: string, target: string, order: number) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: 'cinematic',
    data: { order }
});

// --- AIVM / AI Framework (The Original Field) ---
const aivmJourney: ProductJourneyData = {
    nodes: [
        { id: 'validators', type: 'journey', position: { x: 0, y: 150 }, data: { title: "AIVM VALIDATORS", icon: <RefreshCw size={28} /> } },
        { id: 'hub', type: 'journey', position: { x: 500, y: 300 }, data: { title: "AIVM CORE", icon: <Layers size={40} />, size: 'lg', active: true } },
        { id: 'marketplace', type: 'journey', position: { x: 1000, y: 100 }, data: { title: "AI DATA MARKETPLACE", icon: <ShoppingBasket size={32} />, items: ['AI COMPANIES', 'DATASET PROVIDERS'] } },
        { id: 'gpu', type: 'journey', position: { x: 1050, y: 500 }, data: { title: "GPU MARKETPLACE", icon: <Cpu size={32} /> } },
        { id: 'sdk', type: 'journey', position: { x: 600, y: 650 }, data: { title: "INFERENCE SDK", icon: <Workflow size={28} /> } },
        { id: 'agents', type: 'journey', position: { x: 150, y: 600 }, data: { title: "AI AGENTS INFRA", icon: <Bot size={32} /> } },
    ],
    edges: [
        createEdge('validators', 'hub', 1),
        createEdge('hub', 'marketplace', 2),
        createEdge('hub', 'sdk', 3),
        createEdge('sdk', 'agents', 4),
        createEdge('hub', 'gpu', 5),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 300, y: 250 }, zoom: 0.6, duration: 0 }, // Start: Overview
        { targetId: 'validators', position: { x: 450, y: 150 }, zoom: 1.2, duration: 2 },
        { targetId: 'hub', position: { x: 100, y: 50 }, zoom: 1.1, duration: 2.5 },
        { targetId: 'marketplace', position: { x: -350, y: 200 }, zoom: 1.1, duration: 2.5 },
        { targetId: 'gpu', position: { x: -400, y: -200 }, zoom: 1.1, duration: 2.5 },
        { targetId: 'sdk', position: { x: 0, y: -300 }, zoom: 1.1, duration: 2.5 },
        { targetId: 'agents', position: { x: 350, y: -300 }, zoom: 1.1, duration: 2.5 },
        { targetId: '', position: { x: 300, y: 250 }, zoom: 0.6, duration: 3 }, // End: Overview
    ]
};

// --- ERP (Voice Activated) ---
const erpJourney: ProductJourneyData = {
    nodes: [
        { id: 'voice', type: 'journey', position: { x: 0, y: 200 }, data: { title: "Voice Command", icon: <Mic size={32} /> } },
        { id: 'processor', type: 'journey', position: { x: 400, y: 200 }, data: { title: "AI Processing", icon: <Brain size={40} />, size: 'lg', active: true } },
        { id: 'inventory', type: 'journey', position: { x: 800, y: 0 }, data: { title: "Inventory", icon: <Database size={28} /> } },
        { id: 'finance', type: 'journey', position: { x: 800, y: 400 }, data: { title: "Finance/HR", icon: <BarChart3 size={28} /> } },
        { id: 'analytics', type: 'journey', position: { x: 400, y: 500 }, data: { title: "Real-time Insights", icon: <Zap size={28} /> } },
    ],
    edges: [
        createEdge('voice', 'processor', 1),
        createEdge('processor', 'inventory', 2),
        createEdge('processor', 'finance', 3),
        createEdge('processor', 'analytics', 4),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.65, duration: 0 }, // Start: Overview
        { targetId: 'voice', position: { x: 200, y: 200 }, zoom: 1.3, duration: 2 },
        { targetId: 'processor', position: { x: 0, y: 0 }, zoom: 1.1, duration: 2 },
        { targetId: 'inventory', position: { x: -400, y: 200 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'finance', position: { x: -400, y: -200 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'analytics', position: { x: 0, y: -300 }, zoom: 1.2, duration: 2.5 },
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.65, duration: 3 }, // End: Overview
    ]
};

// --- Zakra (Knowledge Agent) ---
const zakraJourney: ProductJourneyData = {
    nodes: [
        { id: 'query', type: 'journey', position: { x: 100, y: 300 }, data: { title: "User Query", icon: <Search size={28} /> } },
        { id: 'graph', type: 'journey', position: { x: 500, y: 300 }, data: { title: "Knowledge Graph", icon: <Globe size={40} />, size: 'lg', active: true } },
        { id: 'docs', type: 'journey', position: { x: 900, y: 100 }, data: { title: "Documents", icon: <FileText size={28} /> } },
        { id: 'db', type: 'journey', position: { x: 900, y: 500 }, data: { title: "Databases", icon: <Database size={28} /> } },
        { id: 'answer', type: 'journey', position: { x: 500, y: 600 }, data: { title: "Contextual Answer", icon: <MessageSquare size={28} /> } },
    ],
    edges: [
        createEdge('query', 'graph', 1),
        createEdge('graph', 'docs', 2),
        createEdge('graph', 'db', 3),
        createEdge('docs', 'answer', 4),
        createEdge('db', 'answer', 5),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 250, y: 200 }, zoom: 0.65, duration: 0 }, // Start: Overview
        { targetId: 'query', position: { x: 400, y: 0 }, zoom: 1.3, duration: 2 },
        { targetId: 'graph', position: { x: 0, y: 0 }, zoom: 1, duration: 2 },
        { targetId: 'docs', position: { x: -400, y: 200 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'db', position: { x: -400, y: -200 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'answer', position: { x: 0, y: -300 }, zoom: 1.3, duration: 2.5 },
        { targetId: '', position: { x: 250, y: 200 }, zoom: 0.65, duration: 3 }, // End: Overview
    ]
};

// --- Jawib (Customer Service) ---
const jawibJourney: ProductJourneyData = {
    nodes: [
        { id: 'customer', type: 'journey', position: { x: 50, y: 250 }, data: { title: "Customer", icon: <Users size={28} /> } },
        { id: 'agent', type: 'journey', position: { x: 450, y: 250 }, data: { title: "AI Agent", icon: <Bot size={40} />, size: 'lg', active: true } },
        { id: 'kb', type: 'journey', position: { x: 850, y: 50 }, data: { title: "Knowledge Base", icon: <Database size={28} /> } },
        { id: 'human', type: 'journey', position: { x: 850, y: 450 }, data: { title: "Human Handoff", icon: <Users size={28} /> } },
    ],
    edges: [
        createEdge('customer', 'agent', 1),
        createEdge('agent', 'kb', 2),
        createEdge('kb', 'agent', 3),
        createEdge('agent', 'human', 4),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 0 }, // Start: Overview
        { targetId: 'customer', position: { x: 400, y: 0 }, zoom: 1.3, duration: 2 },
        { targetId: 'agent', position: { x: 0, y: 0 }, zoom: 1.1, duration: 2 },
        { targetId: 'kb', position: { x: -400, y: 200 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'human', position: { x: -400, y: -200 }, zoom: 1.2, duration: 2.5 },
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 3 }, // End: Overview
    ]
};

// --- Fasih (Arabic LLM) ---
const fasihJourney: ProductJourneyData = {
    nodes: [
        { id: 'input', type: 'journey', position: { x: 50, y: 300 }, data: { title: "Arabic Input", icon: <MessageSquare size={28} /> } },
        { id: 'llm', type: 'journey', position: { x: 450, y: 300 }, data: { title: "Native LLM", icon: <Brain size={40} />, size: 'lg', active: true } },
        { id: 'dialects', type: 'journey', position: { x: 450, y: 50 }, data: { title: "Dialect Engine", icon: <Globe size={28} /> } },
        { id: 'output', type: 'journey', position: { x: 850, y: 300 }, data: { title: "Localized Output", icon: <FileText size={28} /> } },
    ],
    edges: [
        createEdge('input', 'llm', 1),
        createEdge('llm', 'dialects', 2),
        createEdge('dialects', 'llm', 3),
        createEdge('llm', 'output', 4),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 0 }, // Start: Overview
        { targetId: 'input', position: { x: 400, y: 0 }, zoom: 1.3, duration: 2 },
        { targetId: 'llm', position: { x: 0, y: 0 }, zoom: 1.1, duration: 2 },
        { targetId: 'dialects', position: { x: 0, y: 250 }, zoom: 1.3, duration: 2.5 },
        { targetId: 'output', position: { x: -400, y: 0 }, zoom: 1.3, duration: 2.5 },
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 3 }, // End: Overview
    ]
};

// --- Domain Expansion (Legacy) ---
const domainJourney: ProductJourneyData = {
    nodes: [
        { id: 'legacy', type: 'journey', position: { x: 50, y: 300 }, data: { title: "Legacy System", icon: <Server size={28} /> } },
        { id: 'bridge', type: 'journey', position: { x: 450, y: 300 }, data: { title: "AI Bridge", icon: <Workflow size={40} />, size: 'lg', active: true } },
        { id: 'modern', type: 'journey', position: { x: 850, y: 150 }, data: { title: "Modern App", icon: <Code size={28} /> } },
        { id: 'analytics', type: 'journey', position: { x: 850, y: 450 }, data: { title: "AI Analytics", icon: <BarChart3 size={28} /> } },
    ],
    edges: [
        createEdge('legacy', 'bridge', 1),
        createEdge('bridge', 'modern', 2),
        createEdge('bridge', 'analytics', 3),
    ],
    cinematicSequence: [
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 0 }, // Start: Overview
        { targetId: 'legacy', position: { x: 400, y: 0 }, zoom: 1.3, duration: 2 },
        { targetId: 'bridge', position: { x: 0, y: 0 }, zoom: 1.1, duration: 2 },
        { targetId: 'modern', position: { x: -400, y: 150 }, zoom: 1.2, duration: 2.5 },
        { targetId: 'analytics', position: { x: -400, y: -150 }, zoom: 1.2, duration: 2.5 },
        { targetId: '', position: { x: 250, y: 250 }, zoom: 0.7, duration: 3 }, // End: Overview
    ]
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
