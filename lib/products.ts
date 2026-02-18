import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "erp",
    name: "ERP",
    description: "Voice Activated AI ERP for SMEs. Manage your entire business operation through natural voice commands while ensuring enterprise-grade security and efficiency.",
    menuDescription: "Voice-activated ERP for SMEs with AI-powered automation.",
    slug: "erp",
    icon: "/products/erp.svg",
    content: {
      hero: {
        subtitle: [
          "Voice-Activated ERP for Modern SMEs. AI-powered voice commands for business.",
        ],
        centerIcon: "/products/voiceerp.svg",
        centerIconAlt: "Voice ERP Icon",
        demoVideo: "/fasih-demo.mp4",
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
    },
  },
  {
    id: "ai-framework",
    name: "AI Framework",
    description: "A comprehensive AI Agent & Automation Framework designed to build, deploy, and scale intelligent enterprise solutions with unprecedented speed.",
    menuDescription: "Build and deploy AI agents at enterprise scale.",
    slug: "ai-framework",
    content: {
      hero: {
        subtitle: [
          "Build powerful AI agents. Scalable enterprise solutions.",
        ],
        centerIcon: "/products/ai-framework.svg",
        centerIconAlt: "AI Framework Icon",
        demoVideo: "/fasih-demo.mp4",
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
    },
  },
  {
    id: "zakra",
    name: "Zakra",
    description: "Smart Knowledge Agent that delivers instant, context-aware answers from your entire knowledge base. Unlock the power of your organizational data.",
    menuDescription: "Smart knowledge agent for instant answers.",
    slug: "zakra",
    content: {
      hero: {
        subtitle: [
          "Intelligent Knowledge Management. Actionable insights from your data.",
        ],
        centerIcon: "/products/zakra.svg",
        centerIconAlt: "Zakra Knowledge Agent Icon",
        demoVideo: "/fasih-demo.mp4",
        tagline: "Knowledge Synthesis",
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
    },
  },
  {
    id: "jawib",
    name: "Jawib",
    description: "Intelligent Customer Service Agent providing 24/7 personalized support. Transform your customer experience with seamless, human-like interactions.",
    menuDescription: "24/7 AI customer service agent.",
    slug: "jawib",
    content: {
      hero: {
        subtitle: [
          "24/7 AI Support. Exceptional customer experiences.",
        ],
        centerIcon: "/products/jawib.svg",
        centerIconAlt: "Jawib Customer Service Agent Icon",
        demoVideo: "/fasih-demo.mp4",
        tagline: "Service Automation",
      },
      mission: {
        title: "Automated Support Resolution",
        subtitle:
          "Intelligent Customer Service Agent providing 24/7 personalized support. Improve satisfaction and scale operations.",
        cards: [
          {
            title: "24/7 Availability",
            description:
              "Provide instant support to customers anytime, anywhere, with intelligent responses that never sleep.",
          },
          {
            title: "Multi-Channel Support",
            description:
              "Engage customers across chat, email, phone, and social media with consistent, personalized experiences.",
          },
          {
            title: "Human Handoff",
            description:
              "Seamlessly escalate complex issues to human agents when needed, with full context and conversation history.",
          },
        ],
      },
      automationHub: {
        title: "Service Features",
        subtitle:
          "Transform customer interactions.",
        features: [
          {
            title: "Natural Language Understanding",
            description:
              "Understand customer intent, sentiment, and context to provide accurate, helpful responses in natural conversation.",
          },
          {
            title: "Ticket Management",
            description:
              "Automatically create, prioritize, and track support tickets while maintaining detailed conversation logs.",
          },
          {
            title: "Knowledge Base Integration",
            description:
              "Access your product documentation, FAQs, and knowledge base to provide accurate, up-to-date information.",
          },
          {
            title: "Analytics & Insights",
            description:
              "Track customer satisfaction, identify common issues, and gain insights to continuously improve your service.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "Jawib Customer Service Agent Demo",
      },
      performance: {
        metrics: [
          { value: "90%", label: "First Contact Resolution" },
          { value: "2s", label: "Average Response Time" },
          { value: "4.8/5", label: "Customer Satisfaction" },
        ],
      },
      aceternityFeatures: {
        title: "Jawib Features",
        subtitle:
          "Solutions for exceptional service.",
        features: [
          {
            title: "24/7 Customer Support",
            description:
              "Provide instant, intelligent customer support around the clock with natural language understanding.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Channel Engagement",
            description:
              "Engage customers across chat, email, phone, and social media with consistent experiences.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Jawib Demo",
            description:
              "See how Jawib transforms customer service with AI-powered automation and intelligent responses.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Global Support Network",
            description:
              "Scale your customer service operations globally with multi-language support and regional deployment.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "fasih",
    name: "Fasih",
    description: "The native Arabic LLM bridging the gap with deep understanding of dialects and cultural nuances for accurate, regionally-aware processing.",
    menuDescription: "Native Arabic LLM with dialect support.",
    slug: "fasih",
    content: {
      hero: {
        subtitle: [
          "Native Arabic AI. Built for Arabic understanding.",
        ],
        centerIcon: "/products/fasih.svg",
        centerIconAlt: "Fasih Arabic LLM Icon",
        demoVideo: "/fasih-demo.mp4",
        tagline: "Cultural Nuance",
      },
      mission: {
        title: "Nuanced Arabic Understanding",
        subtitle:
          "Bridging the gap with deep understanding of dialects and cultural nuances for accurate, regionally-aware processing.",
        cards: [
          {
            title: "Native Arabic Understanding",
            description:
              "Deep understanding of Modern Standard Arabic, regional dialects, and cultural nuances for accurate communication.",
          },
          {
            title: "Cultural Context",
            description:
              "Trained on Arabic content with cultural awareness, ensuring appropriate and contextually relevant responses.",
          },
          {
            title: "Multi-Dialect Support",
            description:
              "Recognize and process various Arabic dialects while maintaining high accuracy across different regions.",
          },
        ],
      },
      automationHub: {
        title: "Arabic Capabilities",
        subtitle:
          "Processing and generation for Arabic.",
        features: [
          {
            title: "Text Generation",
            description:
              "Generate high-quality Arabic text for content creation, translations, and automated responses with natural fluency.",
          },
          {
            title: "Language Understanding",
            description:
              "Deep semantic understanding of Arabic text, including complex grammar, idioms, and regional expressions.",
          },
          {
            title: "Translation Services",
            description:
              "Accurate bidirectional translation between Arabic and other languages with context preservation.",
          },
          {
            title: "Voice & Speech",
            description:
              "Support for Arabic speech recognition and text-to-speech with natural pronunciation and intonation.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "oAuaVWvw0lM",
        title: "Fasih Arabic LLM Overview",
      },
      performance: {
        metrics: [
          { value: "98%", label: "Arabic Text Accuracy" },
          { value: "15", label: "Dialects Supported" },
          { value: "50B+", label: "Arabic Tokens Trained" },
        ],
      },
      aceternityFeatures: {
        title: "Fasih Features",
        subtitle:
          "Leading native Arabic language model.",
        features: [
          {
            title: "Native Arabic Processing",
            description:
              "Deep understanding of Modern Standard Arabic, regional dialects, and cultural nuances for accurate communication.",
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Dialect Support",
            description:
              "Recognize and process various Arabic dialects with high accuracy across different regions.",
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Fasih Overview",
            description:
              "See how Fasih delivers accurate, culturally-aware Arabic language processing for your applications.",
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Global Arabic Support",
            description:
              "Deploy Arabic language capabilities across global applications with regional dialect support.",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },

];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

