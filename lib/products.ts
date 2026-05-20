import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "zakra",
    name: "Zakra",
    description: "Smart Knowledge Agent that delivers instant, context-aware answers from your entire knowledge base. Unlock the power of your organizational data.",
    menuDescription: "Smart knowledge agent for instant answers.",
    slug: "zakra",
    icon: "/products-menu-icons/zakra.png",
    content: {
      hero: {
        subtitle: [
          "Intelligent Knowledge Management. Actionable insights from your data.",
        ],
        centerIcon: "/products/zakra.svg",
        centerIconAlt: "Zakra Knowledge Agent Icon",
        heroVideo: "/videos/KB.mp4",
        demoVideo: "/product-videos/zakra.mp4",
        tagline: "Knowledge Synthesis",
        liveUrl: "https://zakra.esap.ai",
      },
      mission: {
        title: "Unified Knowledge Intelligence",
        subtitle:
          "Instant, context-aware answers from your entire knowledge base. Make information accessible.",
        cards: [
          {
            title: "Intelligent Search",
            description:
              "Natural language queries that understand context and intent, delivering precise answers from your knowledge base.",
          },
          {
            title: "Multi-Source Integration",
            description:
              "Connect and search across documents, databases, wikis, and knowledge repositories in one unified interface.",
          },
          {
            title: "Context-Aware Responses",
            description:
              "Get answers that understand your specific domain, industry terminology, and organizational context.",
          },
        ],
      },
      automationHub: {
        title: "Knowledge Capabilities",
        subtitle:
          "Effortless and intelligent knowledge management.",
        features: [
          {
            title: "Semantic Search",
            description:
              "Find information using meaning, not just keywords. Understands synonyms, related concepts, and context.",
          },
          {
            title: "Knowledge Graph",
            description:
              "Visualize connections between concepts, documents, and people to discover hidden relationships in your data.",
          },
          {
            title: "Automated Summarization",
            description:
              "Generate concise summaries of long documents, meetings, and reports to save time and improve comprehension.",
          },
          {
            title: "Real-Time Updates",
            description:
              "Stay current with automatic indexing of new content and notifications about relevant information changes.",
          },
        ],
      },
      exploreButton: "Explore Solution",
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "Zakra Knowledge Agent Demo",
      },
      performance: {
        metrics: [
          { value: "80%", label: "Faster Information Retrieval" },
          { value: "95%", label: "Answer Accuracy" },
          { value: "60%", label: "Time Saved" },
        ],
      },
      aceternityFeatures: {
        title: "Zakra Features",
        subtitle:
          "Intelligent knowledge management solutions.",
        features: [
          {
            title: "Intelligent Knowledge Search",
            description:
              "Search across your entire knowledge base with natural language queries and semantic understanding.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Knowledge Graph Visualization",
            description:
              "Visualize connections between concepts, documents, and people in your knowledge base.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Zakra in Action",
            description:
              "See how Zakra transforms information retrieval and knowledge management for your organization.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Source Integration",
            description:
              "Connect and search across documents, databases, wikis, and knowledge repositories seamlessly.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
      cinematic: {
        challenges: {
          badge: "Pain Points",
          titlePart1: "Current Market ",
          titlePart2: "Challenges",
          subtitle: "Exposing the knowledge silos and retrieval gaps that keep enterprises from leveraging their own data effectively.",
        },
        narrative: {
          introLine: "Knowledge is scattered. Answers are hard to find.",
          problemsIntroLine: "Three barriers stand in the way.",
          epiphanyPreLine: "Then everything changes.",
          solutionIntroLine: "Here's how we fix it.",
          recapLine: "You've seen the problems and our solution. Now see it in action.",
        },
        problems: [
          { title: "Information Scattered Everywhere", description: "Docs, Excel, wikis - no single place to get a reliable answer.", solTitle: "Intelligent Search", solDesc: "Natural language queries that understand context and intent, delivering precise answers from your knowledge base.", solImpact: "80% Faster Retrieval" },
          { title: "Manual Tagging and Indexing", description: "Content grows faster than your team can organize it.", solTitle: "Multi-Source Integration", solDesc: "Connect and search across documents, databases, wikis, and knowledge repositories in one unified interface.", solImpact: "95% Answer Accuracy" },
          { title: "Generic Search Results", description: "Keyword matches that miss context and domain nuance.", solTitle: "Context-Aware Responses", solDesc: "Get answers that understand your specific domain, industry terminology, and organizational context.", solImpact: "60% Time Saved" },
        ],
      },
      architecture: {
        title: "Architecture Deck",
        badge: "Visual Index",
        subtitle: "Architecture - Zakra. Detailed visualization of the knowledge synthesis engine components.",
        reelImages: [
          "/product-images/Slide-22.webp",
          "/product-images/Slide-23.webp",
          "/product-images/Slide-24.webp",
        ],
      },
      outcomes: {
        title: "Outcomes",
        badge: "Proof",
      },
      demo: {
        title: "Knowledge in Action",
        subtitle: "Watch instant answers flow from your knowledge base.",
        badge: "Demo",
      },
      cta: {
        title: "Ready to Try Zakra?",
        subtitle: "Unlock instant, context-aware answers from your knowledge base.",
        buttonText: "Get Started",
      },
      journey: {
        title: "Zakra Knowledge",
        subtitle: "Unified data intelligence through centralized graph hub.",
        badge: "Architecture",
        stages: ["Stage One", "Stage Two", "Stage Three"],
        layers: [
          { title: "Intake Network", nodes: ["Documents", "Databases", "Cloud Wiki", "Intake Hub"] },
          { title: "Knowledge Core (Hub)", nodes: ["Graph Central", "Entity Sync", "Semantic Index", "Access Control", "Cache"] },
          { title: "Intelligence Delivery", nodes: ["User Query", "Context AI", "Smart Answer"] },
        ],
      },
    },
  },
  {
    id: "pagesense",
    name: "PageSense",
    description: "Upload Arabic and English documents once. Ask questions. Get cited answers instantly.",
    menuDescription: "Document intelligence for Arabic and English archives.",
    slug: "pagesense",
    icon: "/products-menu-icons/Pagesense.png",
    content: {
      hero: {
        subtitle: [
          "Upload Arabic and English documents once. Ask questions. Get cited answers instantly.",
        ],
        centerIcon: "/products/jawib.svg",
        centerIconAlt: "PageSense Document Intelligence Icon",
        heroVideo: "/videos/KB.mp4",
        demoVideo: "/product-videos/jawib.mp4",
        tagline: "Document Intelligence",
        liveUrl: "https://pagesense.esap.ai",
      },
      mission: {
        title: "Ask Your Documents",
        subtitle:
          "Upload Arabic and English documents once. Ask questions. Get cited answers instantly.",
        cards: [
          {
            title: "Ask Your Documents",
            description:
              "Type any question in Arabic or English and get a direct answer with the exact page it came from in seconds.",
          },
          {
            title: "No Document Left Behind",
            description:
              "Handles handwriting, stamps, tables, and characters that look nearly identical - every word captured correctly, every time.",
          },
          {
            title: "Clean Data From Every File",
            description:
              "Every document becomes organized, readable data and the right file always surfaces no matter how you phrase the search.",
          },
        ],
      },
      automationHub: {
        title: "Document Intelligence",
        subtitle:
          "Extraction and retrieval built for Arabic enterprise archives.",
        features: [
          {
            title: "Instant Cited Answers",
            description:
              "Ask in Arabic or English and receive answers pinpointing the exact page and document - no manual searching required.",
          },
          {
            title: "Visual Document Reading",
            description:
              "Extracts text from handwriting, stamps, tables, and near-identical characters with enterprise-grade accuracy.",
          },
          {
            title: "Hybrid Search",
            description:
              "Semantic and keyword search combined so the right document surfaces regardless of how the query is phrased.",
          },
          {
            title: "Structured Output",
            description:
              "Every processed document becomes clean, organized, queryable data - ready for downstream workflows.",
          },
        ],
      },
      exploreButton: "Explore Solution",
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "PageSense Document Intelligence Demo",
      },
      performance: {
        metrics: [
          { value: "5 min", label: "From Upload to Answer" },
          { value: "100%", label: "On-Premise Data Control" },
          { value: "2×", label: "Arabic + English Native" },
        ],
      },
      aceternityFeatures: {
        title: "PageSense Features",
        subtitle:
          "Intelligence layer for your document archive.",
        features: [
          {
            title: "Instant Document Search",
            description:
              "Ask any question in Arabic or English and get a cited answer with page reference in seconds.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Full-Spectrum OCR",
            description:
              "Handles handwriting, stamps, tables, and near-identical Arabic characters with enterprise accuracy.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "See PageSense in Action",
            description:
              "Watch enterprise-scale Arabic document search deliver cited answers in seconds.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "On-Premise Deployment",
            description:
              "Full data sovereignty - PageSense runs on your own infrastructure with no external data transfer.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
      cinematic: {
        challenges: {
          badge: "Pain Points",
          titlePart1: "Current Market ",
          titlePart2: "Challenges",
          subtitle: "Exposing the document retrieval gaps that slow Arabic enterprises when searching across large unstructured archives.",
        },
        narrative: {
          introLine: "Thousands of documents. No way to search them.",
          problemsIntroLine: "Three barriers stand in the way.",
          epiphanyPreLine: "Then everything changes.",
          solutionIntroLine: "Here's how we fix it.",
          recapLine: "You've seen the problems and our solution. Now see it in action.",
        },
        problems: [
          { title: "No Answers From Archives", description: "Documents pile up but questions still require manual page-by-page searches.", solTitle: "Ask Your Documents", solDesc: "Type any question in Arabic or English and get a direct answer with the exact page it came from in seconds.", solImpact: "5 min to Answer" },
          { title: "OCR Misses Arabic Characters", description: "Handwriting, stamps, and look-alike characters break standard extraction tools.", solTitle: "No Document Left Behind", solDesc: "Handles handwriting, stamps, tables, and characters that look nearly identical - every word captured correctly, every time.", solImpact: "100% On-Premise" },
          { title: "Inconsistent Search Results", description: "Phrasing a query differently returns completely different - or no - results.", solTitle: "Clean Data From Every File", solDesc: "Every document becomes organized, readable data and the right file always surfaces no matter how you phrase the search.", solImpact: "2× Languages" },
        ],
      },
      architecture: {
        title: "Architecture Deck",
        badge: "Visual Index",
        subtitle: "PageSense - Document Intelligence. Detailed visualization of the extraction and retrieval pipeline.",
        reelImages: [
          "/product-images/Slide-22.webp",
          "/product-images/Slide-23.webp",
          "/product-images/Slide-24.webp",
        ],
      },
      outcomes: {
        title: "Outcomes",
        badge: "Proof",
      },
      demo: {
        title: "PageSense in Action",
        subtitle: "See instant Arabic document search at enterprise scale.",
        badge: "Demo",
      },
      cta: {
        title: "Ready to Try PageSense?",
        subtitle: "Upload your Arabic documents and get cited answers on your own infrastructure.",
        buttonText: "Get Started",
      },
      journey: {
        title: "PageSense Ecosystem",
        subtitle: "A self-contained intelligence layer for your document archive.",
        badge: "Architecture",
        stages: ["Stage One", "Stage Two", "Stage Three"],
        layers: [
          { title: "Document Input Layer", nodes: ["PDF Upload", "Scans & Images", "Handwritten Notes"] },
          { title: "Intelligence Core", nodes: ["Visual Reading", "Hybrid Search", "Auto Structure"] },
          { title: "Output & Access Layer", nodes: ["Cited Answers", "Document Viewer", "Structured Output"] },
        ],
      },
    },
  },
  {
    id: "omnilisten",
    name: "OmniListen",
    description: "Every Arabic and English conversation transcribed, summarized, and actioned before you leave the room.",
    menuDescription: "Conversational autopilot for Arabic and English teams.",
    slug: "omnilisten",
    icon: "/products-menu-icons/Omnilisten.png",
    content: {
      hero: {
        subtitle: [
          "Every Arabic and English conversation transcribed, summarized, and actioned before you leave the room.",
        ],
        centerIcon: "/products/fasih.svg",
        centerIconAlt: "OmniListen Conversational Intelligence Icon",
        heroVideo: "/videos/KB.mp4",
        demoVideo: "/product-videos/fasih.mp4",
        tagline: "Conversational Autopilot",
        liveUrl: "https://omnilisten.esap.ai",
      },
      mission: {
        title: "Role-Based Intelligence",
        subtitle:
          "Every Arabic and English conversation transcribed, summarized, and actioned before you leave the room.",
        cards: [
          {
            title: "Role-Based Intelligence",
            description:
              "Configurable AI presets for HR, Sales, Project Management, and Executive roles automatically surface what matters most - no manual filtering, no post-meeting cleanup.",
          },
          {
            title: "Real-World Audio Capture",
            description:
              "Seamlessly record boardroom discussions, client site visits, and phone calls - not just Zoom calls. Dynamic Range Compression sharpens distant microphone audio before transcription begins.",
          },
          {
            title: "Bilingual by Default",
            description:
              "Built to handle Arabic-English code-switching the way Saudi teams actually speak. One conversation record generates two complete summaries - one in Arabic, one in English simultaneously.",
          },
        ],
      },
      automationHub: {
        title: "Conversation Intelligence",
        subtitle:
          "Capture, extract, and deliver decisions from every conversation.",
        features: [
          {
            title: "Transcription Engine",
            description:
              "95–98% accuracy across Arabic, English, and code-switched conversations with Dynamic Range Compression for real-world audio.",
          },
          {
            title: "AI Extraction",
            description:
              "Automatically surfaces decisions, action items, dates, and owners - role-configured for HR, Sales, PM, and Executive contexts.",
          },
          {
            title: "Task & Calendar Sync",
            description:
              "Detected tasks and deadlines flow directly into dashboards and calendar events without manual copy-paste.",
          },
          {
            title: "Smart Summary",
            description:
              "Every meeting produces a bilingual summary in Arabic and English simultaneously - done before the room clears.",
          },
        ],
      },
      exploreButton: "Explore Solution",
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "OmniListen Conversational Intelligence Demo",
      },
      performance: {
        metrics: [
          { value: "Zero", label: "Active Minutes Spent on Notes" },
          { value: "95–98%", label: "Transcription Accuracy" },
          { value: "2×", label: "Arabic + English Simultaneously" },
        ],
      },
      aceternityFeatures: {
        title: "OmniListen Features",
        subtitle:
          "Conversational intelligence for bilingual teams.",
        features: [
          {
            title: "Zero Note-Taking",
            description:
              "Every conversation auto-transcribed, summarized, and actioned - HR, Sales, PM, and Executive presets out of the box.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "99.9% Uptime Capture",
            description:
              "Records boardroom, site visits, and phone calls - not just Zoom. Dynamic Range Compression handles real-world audio.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "See OmniListen in Action",
            description:
              "Watch real-time Arabic conversation intelligence deliver tasks and summaries at enterprise scale.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Bilingual Output",
            description:
              "One conversation. Two complete summaries - Arabic and English - generated simultaneously with full task lists.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
      cinematic: {
        challenges: {
          badge: "Pain Points",
          titlePart1: "Current Market ",
          titlePart2: "Challenges",
          subtitle: "Addressing the manual note-taking overhead and bilingual gaps that drain time and lose critical decisions from every meeting.",
        },
        narrative: {
          introLine: "Meetings end. Decisions vanish.",
          problemsIntroLine: "Three barriers stand in the way.",
          epiphanyPreLine: "Then everything changes.",
          solutionIntroLine: "Here's how we fix it.",
          recapLine: "You've seen the problems and our solution. Now see it in action.",
        },
        problems: [
          { title: "Manual Notes Miss Everything", description: "Key decisions, tasks, and dates disappear between the meeting room and the inbox.", solTitle: "Role-Based Intelligence", solDesc: "Configurable AI presets for HR, Sales, PM, and Executive roles automatically surface what matters most - no manual filtering, no post-meeting cleanup.", solImpact: "Zero Note Time" },
          { title: "Standard Tools Miss Real-World Audio", description: "Zoom-only capture misses boardroom discussions, site visits, and phone calls.", solTitle: "Real-World Audio Capture", solDesc: "Seamlessly record boardroom discussions, client site visits, and phone calls. Dynamic Range Compression sharpens distant microphone audio before transcription begins.", solImpact: "99.9% Uptime" },
          { title: "Arabic-English Code-Switching Breaks Transcription", description: "Saudi teams switch between Arabic and English mid-sentence - generic tools break.", solTitle: "Bilingual by Default", solDesc: "Built to handle Arabic-English code-switching the way Saudi teams actually speak. One conversation generates two complete summaries simultaneously.", solImpact: "90% Satisfaction" },
        ],
      },
      architecture: {
        title: "Architecture Deck",
        badge: "Visual Index",
        subtitle: "OmniListen - Conversational Intelligence. Detailed visualization of the capture, extraction, and output pipeline.",
        reelImages: [
          "/product-images/Slide-22.webp",
          "/product-images/Slide-23.webp",
          "/product-images/Slide-24.webp",
        ],
      },
      outcomes: {
        title: "Outcomes",
        badge: "Proof",
      },
      demo: {
        title: "OmniListen in Action",
        subtitle: "See real-time Arabic conversation intelligence at enterprise scale.",
        badge: "Demo",
      },
      cta: {
        title: "Ready to Try OmniListen?",
        subtitle: "Capture every Arabic and English conversation and walk away with decisions, tasks, and deadlines already done.",
        buttonText: "Get Started",
      },
      journey: {
        title: "OmniListen Ecosystem",
        subtitle: "A self-contained intelligence layer for your entire conversation archive.",
        badge: "Architecture",
        stages: ["Stage One", "Stage Two", "Stage Three"],
        layers: [
          { title: "Audio Capture Layer", nodes: ["Web Dashboard", "Android App", "Browser Extension"] },
          { title: "Intelligence Core", nodes: ["Transcription", "AI Extraction", "Task & Date Sync"] },
          { title: "Output & Action Layer", nodes: ["Smart Summary", "Task Dashboard", "Calendar Events"] },
        ],
      },
    },
  },
  {
    id: "erp",
    name: "ERP",
    description: "Voice Activated AI ERP for SMEs. Manage your entire business operation through natural voice commands while ensuring enterprise-grade security and efficiency.",
    menuDescription: "Voice-activated ERP for SMEs with AI-powered automation.",
    slug: "erp",
    icon: "/products-menu-icons/ERP.png",
    content: {
      hero: {
        subtitle: [
          "Voice-Activated ERP for Modern SMEs. AI-powered voice commands for business.",
        ],
        centerIcon: "/products/voiceerp.webp",
        centerIconAlt: "Voice ERP Icon",
        heroVideo: "/videos/KB.mp4",
        demoVideo: "/product-videos/crm.mp4",
        tagline: "Operational Intelligence",
      },
      mission: {
        title: "Enterprise Voice Operations",
        subtitle:
          "Manage your entire business operation through natural voice commands while ensuring security.",
        cards: [
          {
            title: "Voice-First Interface",
            description:
              "Control all ERP functions through natural voice commands, making business management accessible and efficient for everyone.",
          },
          {
            title: "AI-Powered Automation",
            description:
              "Intelligent automation handles routine tasks, data entry, and reporting, freeing your team to focus on strategic decisions.",
          },
          {
            title: "SME-Optimized Design",
            description:
              "Built specifically for small and medium enterprises with scalable architecture that grows with your business needs.",
          },
        ],
      },
      automationHub: {
        title: "Intelligent Automation",
        subtitle:
          "Streamline processes from chemical inventory to finance.",
        features: [
          {
            title: "Adaptive Legacy Bridge",
            description:
              "Seamlessly wraps around existing systems to enable smart AI enhancements without disruption to your current operations.",
          },
          {
            title: "Voice Command Suite",
            description:
              "Complete voice control for inventory, sales, accounting, and HR management with natural language processing.",
          },
          {
            title: "Real-Time Analytics",
            description:
              "Get instant insights into your business performance with AI-driven analytics and predictive reporting.",
          },
          {
            title: "Smart Workflow Automation",
            description:
              "Automate complex business processes with intelligent workflows that adapt to your operational patterns.",
          },
        ],
      },
      exploreButton: "Explore Solution",
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "Voice ERP in Action",
      },
      performance: {
        metrics: [
          { value: "75%", label: "Time Savings" },
          { value: "90%", label: "User Satisfaction" },
          { value: "3x", label: "Productivity Increase" },
        ],
      },
      aceternityFeatures: {
        title: "Core ERP Features",
        subtitle:
          "Powerful capabilities for modern businesses.",
        features: [
          {
            title: "Track Business Operations",
            description:
              "Track and manage your business operations with ease using our intuitive ERP interface.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
          },
          {
            title: "Capture Insights with AI",
            description:
              "Capture business insights effortlessly using our advanced AI technology and analytics.",
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
          },
          {
            title: "Watch ERP in Action",
            description:
              "See how our Voice-Activated ERP transforms business operations with real-world demonstrations.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
          },
          {
            title: "Global Deployment",
            description:
              "Deploy your ERP system across multiple locations with our cloud infrastructure and global reach.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
      cinematic: {
        challenges: {
          badge: "Pain Points",
          titlePart1: "Current Market ",
          titlePart2: "Challenges",
          subtitle: "Uncovering operational bottlenecks and manual process inefficiencies that hold SMEs back from scaling efficiently.",
        },
        narrative: {
          introLine: "Every day, teams hit the same walls.",
          problemsIntroLine: "Three barriers stand in the way.",
          epiphanyPreLine: "Then everything changes.",
          solutionIntroLine: "Here's how we fix it.",
          recapLine: "You've seen the problems and our solution. Now see it in action.",
        },
        problems: [
          { title: "Manual Data Entry Bottleneck", description: "Teams waste hours on forms and spreadsheets instead of running the business.", solTitle: "Voice-First Interface", solDesc: "Control all ERP functions through natural voice commands, making business management accessible and efficient for everyone.", solImpact: "+75% Time Savings" },
          { title: "Siloed Systems", description: "Inventory, sales, and finance don't talk - errors and delays multiply.", solTitle: "AI-Powered Automation", solDesc: "Intelligent automation handles routine tasks, data entry, and reporting, freeing your team to focus on strategic decisions.", solImpact: "Zero Downtime" },
          { title: "Complex Training Overhead", description: "Valuable minds spent on learning legacy UIs instead of driving growth.", solTitle: "SME-Optimized Design", solDesc: "Built specifically for small and medium enterprises with scalable architecture that grows with your business needs.", solImpact: "3x Productivity" },
        ],
      },
      architecture: {
        title: "Architecture Deck",
        badge: "Visual Index",
        subtitle: "Architecture - ERP. Detailed visualization of the voice-activated ERP engine components.",
        reelImages: [
          "/product-images/Slide-22.webp",
          "/product-images/Slide-23.webp",
          "/product-images/Slide-24.webp",
        ],
      },
      outcomes: {
        title: "Outcomes",
        badge: "Proof",
      },
      demo: {
        title: "Voice ERP in Action",
        subtitle: "Watch how voice commands transform business operations.",
        badge: "Demo",
      },
      cta: {
        title: "Ready to Try ERP?",
        subtitle: "Manage your entire business through voice commands.",
        buttonText: "Get Started",
      },
      journey: {
        title: "Intelligent ERP",
        subtitle: "Voice-first enterprise management with parallel processing.",
        badge: "Architecture",
        stages: ["Stage One", "Stage Two", "Stage Three"],
        layers: [
          { title: "Input Management", nodes: ["Voice Input", "Intent NLU", "ERP Manual", "External API"] },
          { title: "Core Engine (Matrix)", nodes: ["Task Planner", "Business Logic", "Execution", "Compliance"] },
          { title: "Global Distribution", nodes: ["Database", "Cloud Sync", "Command Center"] },
        ],
      },
    },
  },
  {
    id: "ai-framework",
    name: "AI Framework",
    description: "A comprehensive AI Agent & Automation Framework designed to build, deploy, and scale intelligent enterprise solutions with unprecedented speed.",
    menuDescription: "Build and deploy AI agents at enterprise scale.",
    slug: "ai-framework",
    icon: "/products-menu-icons/ai-framework.png",
    content: {
      hero: {
        subtitle: [
          "Build powerful AI agents. Scalable enterprise solutions.",
        ],
        centerIcon: "/products/ai-framework.svg", // This one was 29K, keeping as SVG unless larger one found
        centerIconAlt: "AI Framework Icon",
        heroVideo: "/videos/KB.mp4",
        demoVideo: "/product-videos/ai-framework.mp4",
        tagline: "Agent Orchestration",
      },
      mission: {
        title: "Decentralized Intelligence Network",
        subtitle:
          "Rapidly build and deploy AI agents at enterprise scale with modular reliability.",
        cards: [
          {
            title: "Modular Architecture",
            description:
              "Flexible, composable components that adapt to your specific needs and use cases, enabling rapid development and customization.",
          },
          {
            title: "Easy Integration",
            description:
              "Seamlessly connect with existing systems, APIs, and third-party services through standardized interfaces and connectors.",
          },
          {
            title: "Scalable Design",
            description:
              "Built to handle enterprise-scale workloads with high performance, reliability, and automatic scaling capabilities.",
          },
        ],
      },
      automationHub: {
        title: "Automation Capabilities",
        subtitle:
          "Sophisticated workflows with intuitive tooling.",
        features: [
          {
            title: "Agent Orchestration",
            description:
              "Coordinate multiple AI agents to work together on complex tasks with intelligent task distribution and collaboration.",
          },
          {
            title: "Workflow Builder",
            description:
              "Visual tools to design and deploy automation workflows without coding, with drag-and-drop simplicity.",
          },
          {
            title: "Event-Driven Architecture",
            description:
              "React to system events and trigger automated responses in real-time with reactive programming patterns.",
          },
          {
            title: "Monitoring & Analytics",
            description:
              "Track performance, debug issues, and optimize your automation workflows with comprehensive observability tools.",
          },
        ],
      },
      exploreButton: "Explore Solution",
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "AI Framework in Action",
      },
      performance: {
        metrics: [
          { value: "90%", label: "Developer Satisfaction" },
          { value: "10x", label: "Faster Development" },
          { value: "99.9%", label: "Uptime" },
        ],
      },
      aceternityFeatures: {
        title: "Framework Capabilities",
        subtitle:
          "Features for building intelligent systems.",
        features: [
          {
            title: "Build AI Agents",
            description:
              "Create sophisticated AI agents with our intuitive framework and comprehensive tooling library.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Workflow Automation",
            description:
              "Design and deploy complex automation workflows with visual tools and drag-and-drop simplicity.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Framework Demo",
            description:
              "See how our AI Framework enables rapid development and deployment of enterprise AI solutions.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Enterprise Scale",
            description:
              "Deploy and scale your AI solutions across enterprise infrastructure with high performance and reliability.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
      cinematic: {
        challenges: {
          badge: "Pain Points",
          titlePart1: "Current Market ",
          titlePart2: "Challenges",
          subtitle: "Confronting the slow development cycles and integration barriers that prevent enterprises from deploying AI agents at scale.",
        },
        narrative: {
          introLine: "Building AI agents shouldn't take months.",
          problemsIntroLine: "Three obstacles slow you down.",
          epiphanyPreLine: "Then everything changes.",
          solutionIntroLine: "Here's how we fix it.",
          recapLine: "You've seen the problems and our solution. Now see it in action.",
        },
        problems: [
          { title: "Slow Development Cycles", description: "Months to build and deploy a single AI agent. Market moves faster.", solTitle: "Modular Architecture", solDesc: "Flexible, composable components that adapt to your specific needs and use cases, enabling rapid development and customization.", solImpact: "10x Faster Dev" },
          { title: "Integration Nightmares", description: "Existing systems and APIs don't plug in - custom glue code everywhere.", solTitle: "Easy Integration", solDesc: "Seamlessly connect with existing systems, APIs, and third-party services through standardized interfaces and connectors.", solImpact: "99.9% Uptime" },
          { title: "Scale Anxiety", description: "Agents work in dev; fall over when traffic hits production.", solTitle: "Scalable Design", solDesc: "Built to handle enterprise-scale workloads with high performance, reliability, and automatic scaling capabilities.", solImpact: "90% Dev Satisfaction" },
        ],
      },
      architecture: {
        title: "Architecture Deck",
        badge: "Visual Index",
        subtitle: "Architecture - AI Framework. Detailed visualization of the agent orchestration engine components.",
        reelImages: [
          "/product-images/Slide-22.webp",
          "/product-images/Slide-23.webp",
          "/product-images/Slide-24.webp",
        ],
      },
      outcomes: {
        title: "Outcomes",
        badge: "Proof",
      },
      demo: {
        title: "Framework in Action",
        subtitle: "See rapid AI agent deployment at enterprise scale.",
        badge: "Demo",
      },
      cta: {
        title: "Ready to Try AI Framework?",
        subtitle: "Build and deploy AI agents at enterprise scale.",
        buttonText: "Get Started",
      },
      journey: {
        title: "AI Framework Ecosystem",
        subtitle: "A decentralized network powering enterprise-grade intelligence.",
        badge: "Architecture",
        stages: ["Stage One", "Stage Two", "Stage Three"],
        layers: [
          { title: "AI Application Layer", nodes: ["Web3 Chatbot", "Crypto Alerts", "AI Agents"] },
          { title: "$CGPT Token Layer", nodes: ["Governance", "$CGPT Utility", "Staking"] },
          { title: "AI Framework Blockchain", nodes: ["Validators", "Framework Core", "Data Market", "SDK", "GPU Market"] },
        ],
      },
    },
  },

];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

