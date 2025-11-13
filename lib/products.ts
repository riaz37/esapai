export interface MissionCard {
  title: string;
  description: string;
}

export interface AutomationFeature {
  title: string;
  description: string;
}

export interface PerformanceMetric {
  value: string;
  label: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  skeleton?: "image" | "gallery" | "youtube" | "globe";
  skeletonProps?: {
    imageUrl?: string;
    galleryImages?: string[];
    youtubeUrl?: string;
    youtubeThumbnail?: string;
  };
  className?: string;
}

export interface ProductContent {
  hero?: {
    subtitle?: string[];
    centerIcon?: string;
    centerIconAlt?: string;
  };
  mission?: {
    title?: string;
    subtitle?: string;
    cards?: MissionCard[];
  };
  automationHub?: {
    title?: string;
    subtitle?: string;
    features?: AutomationFeature[];
  };
  youtubeVideo?: {
    videoId?: string;
    title?: string;
  };
  performance?: {
    metrics?: PerformanceMetric[];
  };
  aceternityFeatures?: {
    title?: string;
    subtitle?: string;
    features?: ProductFeature[];
    className?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: ProductContent;
}

export const products: Product[] = [
  {
    id: "erp",
    name: "ERP",
    description: "Voice Activated AI ERP for SMEs",
    slug: "erp",
    content: {
      hero: {
        subtitle: [
          "Voice-Activated Enterprise Resource Planning for Modern SMEs",
          "Transform your business operations with AI-powered voice commands",
        ],
        centerIcon: "/products/voiceerp.svg",
        centerIconAlt: "Voice ERP Icon",
      },
      mission: {
        title: "Revolutionize Your Business Operations",
        subtitle:
          "Our Voice-Activated AI ERP empowers small and medium enterprises with intelligent automation, seamless integration, and natural voice interaction. Manage your entire business through intuitive voice commands while maintaining enterprise-grade security and reliability.",
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
        title: "Intelligent Automation Hub",
        subtitle:
          "Comprehensive automation capabilities that streamline your business processes from inventory management to financial reporting.",
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
        videoId: "ED2H_y6dmC8",
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
        title: "Comprehensive ERP Features",
        subtitle:
          "Explore the powerful capabilities that make our Voice-Activated AI ERP the perfect solution for modern businesses.",
        features: [
          {
            title: "Track Business Operations",
            description:
              "Track and manage your business operations with ease using our intuitive ERP interface.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/erp.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
          },
          {
            title: "Capture Insights with AI",
            description:
              "Capture business insights effortlessly using our advanced AI technology and analytics.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/erp.svg",
                "/products/erp.svg",
                "/products/erp.svg",
                "/products/erp.svg",
                "/products/erp.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
          },
          {
            title: "Watch ERP in Action",
            description:
              "See how our Voice-Activated ERP transforms business operations with real-world demonstrations.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=ED2H_y6dmC8",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
          },
          {
            title: "Global Deployment",
            description:
              "Deploy your ERP system across multiple locations with our cloud infrastructure and global reach.",
            skeleton: "globe",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "ai-framework",
    name: "AI Framework",
    description: "AI Agent & Automation Framework",
    slug: "ai-framework",
    content: {
      hero: {
        subtitle: [
          "Build powerful AI agents and automation workflows",
          "Scalable framework for enterprise AI solutions",
        ],
        centerIcon: "/products/ai-framework.svg",
        centerIconAlt: "AI Framework Icon",
      },
      mission: {
        title: "Empower Your Development Team",
        subtitle:
          "A comprehensive framework that enables rapid development and deployment of AI-powered applications and automation systems. Build, deploy, and scale AI agents with enterprise-grade reliability and performance.",
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
        title: "Powerful Automation Capabilities",
        subtitle:
          "Create sophisticated automation workflows with our intuitive framework and extensive tooling library.",
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
        videoId: "dQw4w9WgXcQ",
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
        title: "AI Framework Capabilities",
        subtitle:
          "Discover the powerful features that make our AI Framework the ideal solution for building and deploying intelligent automation systems.",
        features: [
          {
            title: "Build AI Agents",
            description:
              "Create sophisticated AI agents with our intuitive framework and comprehensive tooling library.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/ai-framework.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Workflow Automation",
            description:
              "Design and deploy complex automation workflows with visual tools and drag-and-drop simplicity.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/ai-framework.svg",
                "/products/ai-framework.svg",
                "/products/ai-framework.svg",
                "/products/ai-framework.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Framework Demo",
            description:
              "See how our AI Framework enables rapid development and deployment of enterprise AI solutions.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Enterprise Scale",
            description:
              "Deploy and scale your AI solutions across enterprise infrastructure with high performance and reliability.",
            skeleton: "globe",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "zakra",
    name: "Zakra",
    description: "Smart Knowledge Agent",
    slug: "zakra",
    content: {
      hero: {
        subtitle: [
          "Intelligent Knowledge Management at Your Fingertips",
          "Transform information into actionable insights with AI-powered knowledge retrieval",
        ],
        centerIcon: "/products/zakra.svg",
        centerIconAlt: "Zakra Knowledge Agent Icon",
      },
      mission: {
        title: "Unlock the Power of Your Knowledge Base",
        subtitle:
          "Zakra is your intelligent knowledge assistant that understands context, retrieves relevant information instantly, and provides accurate answers from your organization's knowledge base. Make every piece of information accessible and actionable.",
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
        title: "Advanced Knowledge Capabilities",
        subtitle:
          "Powerful features that make knowledge management effortless and intelligent.",
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
        videoId: "ED2H_y6dmC8",
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
        title: "Zakra Knowledge Features",
        subtitle:
          "Explore the intelligent capabilities that make Zakra your ultimate knowledge management solution.",
        features: [
          {
            title: "Intelligent Knowledge Search",
            description:
              "Search across your entire knowledge base with natural language queries and semantic understanding.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/zakra.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Knowledge Graph Visualization",
            description:
              "Visualize connections between concepts, documents, and people in your knowledge base.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/zakra.svg",
                "/products/zakra.svg",
                "/products/zakra.svg",
                "/products/zakra.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Zakra in Action",
            description:
              "See how Zakra transforms information retrieval and knowledge management for your organization.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=ED2H_y6dmC8",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Source Integration",
            description:
              "Connect and search across documents, databases, wikis, and knowledge repositories seamlessly.",
            skeleton: "globe",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "jawib",
    name: "Jawib",
    description: "Customer Service Agent",
    slug: "jawib",
    content: {
      hero: {
        subtitle: [
          "24/7 AI-Powered Customer Support",
          "Deliver exceptional customer experiences with intelligent automation",
        ],
        centerIcon: "/products/jawib.svg",
        centerIconAlt: "Jawib Customer Service Agent Icon",
      },
      mission: {
        title: "Elevate Your Customer Service Experience",
        subtitle:
          "Jawib is an intelligent customer service agent that handles inquiries, resolves issues, and provides personalized support around the clock. Reduce response times, improve satisfaction, and scale your customer service operations effortlessly.",
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
        title: "Comprehensive Customer Service Features",
        subtitle:
          "Advanced capabilities that transform how you interact with and support your customers.",
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
        videoId: "ED2H_y6dmC8",
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
        title: "Jawib Customer Service Features",
        subtitle:
          "Discover the comprehensive features that make Jawib the perfect solution for exceptional customer service.",
        features: [
          {
            title: "24/7 Customer Support",
            description:
              "Provide instant, intelligent customer support around the clock with natural language understanding.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/jawib.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Channel Engagement",
            description:
              "Engage customers across chat, email, phone, and social media with consistent experiences.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/jawib.svg",
                "/products/jawib.svg",
                "/products/jawib.svg",
                "/products/jawib.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Jawib Demo",
            description:
              "See how Jawib transforms customer service with AI-powered automation and intelligent responses.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=ED2H_y6dmC8",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Global Support Network",
            description:
              "Scale your customer service operations globally with multi-language support and regional deployment.",
            skeleton: "globe",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "fasih",
    name: "Fasih",
    description: "The native Arabic LLM",
    slug: "fasih",
    content: {
      hero: {
        subtitle: [
          "Native Arabic Language Model",
          "Advanced AI built specifically for Arabic language understanding and generation",
        ],
        centerIcon: "/products/fasih.svg",
        centerIconAlt: "Fasih Arabic LLM Icon",
      },
      mission: {
        title: "Bridging the Arabic Language AI Gap",
        subtitle:
          "Fasih is a large language model specifically trained on Arabic language, dialects, and cultural context. Delivering accurate, culturally-aware Arabic language processing for applications requiring native Arabic understanding.",
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
        title: "Advanced Arabic Language Capabilities",
        subtitle:
          "Comprehensive features designed for Arabic language processing and generation.",
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
        videoId: "ED2H_y6dmC8",
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
        title: "Fasih Arabic LLM Features",
        subtitle:
          "Explore the advanced capabilities that make Fasih the leading native Arabic language model.",
        features: [
          {
            title: "Native Arabic Processing",
            description:
              "Deep understanding of Modern Standard Arabic, regional dialects, and cultural nuances for accurate communication.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/fasih.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Multi-Dialect Support",
            description:
              "Recognize and process various Arabic dialects with high accuracy across different regions.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/fasih.svg",
                "/products/fasih.svg",
                "/products/fasih.svg",
                "/products/fasih.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Fasih Overview",
            description:
              "See how Fasih delivers accurate, culturally-aware Arabic language processing for your applications.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=ED2H_y6dmC8",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Global Arabic Support",
            description:
              "Deploy Arabic language capabilities across global applications with regional dialect support.",
            skeleton: "globe",
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
          },
        ],
      },
    },
  },
  {
    id: "domain-expansion",
    name: "Domain Expansion",
    description: "Seamlessly connect legacy",
    slug: "domain-expansion",
    content: {
      hero: {
        subtitle: [
          "Seamlessly Connect Legacy Systems",
          "Bridge the gap between legacy infrastructure and modern AI-powered solutions",
        ],
        centerIcon: "/products/domain-expansion.svg",
        centerIconAlt: "Domain Expansion Icon",
      },
      mission: {
        title: "Modernize Without Replacing",
        subtitle:
          "Domain Expansion enables seamless integration between your existing legacy systems and modern AI technologies. Extend the capabilities of your current infrastructure without costly migrations or complete overhauls.",
        cards: [
          {
            title: "Legacy System Integration",
            description:
              "Connect to any legacy system, database, or API without requiring modifications to existing infrastructure.",
          },
          {
            title: "AI-Enhanced Functionality",
            description:
              "Add intelligent automation, natural language processing, and AI capabilities to systems built decades ago.",
          },
          {
            title: "Zero-Downtime Deployment",
            description:
              "Implement AI enhancements gradually without disrupting your current operations or requiring system downtime.",
          },
        ],
      },
      automationHub: {
        title: "Comprehensive Integration Capabilities",
        subtitle:
          "Powerful tools and connectors that make legacy system integration simple and reliable.",
        features: [
          {
            title: "Universal Connectors",
            description:
              "Pre-built connectors for common legacy systems, databases, and protocols with support for custom integrations.",
          },
          {
            title: "Data Transformation",
            description:
              "Automatically transform data formats, schemas, and protocols to enable seamless communication between systems.",
          },
          {
            title: "API Wrapping",
            description:
              "Create modern REST and GraphQL APIs around legacy systems, making them accessible to modern applications.",
          },
          {
            title: "Real-Time Synchronization",
            description:
              "Keep data synchronized between legacy and modern systems in real-time with conflict resolution and error handling.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "ED2H_y6dmC8",
        title: "Domain Expansion Integration Demo",
      },
      performance: {
        metrics: [
          { value: "70%", label: "Cost Reduction" },
          { value: "100+", label: "System Types Supported" },
          { value: "99.9%", label: "Integration Reliability" },
        ],
      },
      aceternityFeatures: {
        title: "Domain Expansion Integration Features",
        subtitle:
          "Discover how Domain Expansion seamlessly connects legacy systems with modern AI-powered solutions.",
        features: [
          {
            title: "Legacy System Integration",
            description:
              "Connect to any legacy system, database, or API without requiring modifications to existing infrastructure.",
            skeleton: "image",
            skeletonProps: {
              imageUrl: "/products/domain-expansion.svg",
            },
            className:
              "col-span-1 lg:col-span-4 border-b lg:border-r border-white-opacity-20",
          },
          {
            title: "Universal Connectors",
            description:
              "Pre-built connectors for common legacy systems with support for custom integrations and protocols.",
            skeleton: "gallery",
            skeletonProps: {
              galleryImages: [
                "/products/domain-expansion.svg",
                "/products/domain-expansion.svg",
                "/products/domain-expansion.svg",
                "/products/domain-expansion.svg",
              ],
            },
            className: "border-b col-span-1 lg:col-span-2 border-white-opacity-20",
          },
          {
            title: "Watch Integration Demo",
            description:
              "See how Domain Expansion bridges the gap between legacy infrastructure and modern AI solutions.",
            skeleton: "youtube",
            skeletonProps: {
              youtubeUrl: "https://www.youtube.com/watch?v=ED2H_y6dmC8",
              youtubeThumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
            },
            className:
              "col-span-1 lg:col-span-3 lg:border-r border-white-opacity-20",
          },
          {
            title: "Global Deployment",
            description:
              "Deploy integrations across multiple locations with cloud infrastructure and enterprise-grade reliability.",
            skeleton: "globe",
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

