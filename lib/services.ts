import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "integration-and-automation",
    name: "Integration & Automation",
    description:
      "Complete AI integration and strategic automation - from assessment and roadmap to deployment and ongoing support.",
    menuDescription: "End-to-end integration and automation services",
    icon: "/service-menu-icons/Automation.png",
    slug: "integration-and-automation",
    content: {
      hero: {
        subtitle: [
          "From strategy to deployment. Integration and automation that drives ROI.",
        ],
        titleMain: "Integration &",
        titleHighlight: "Automation",
      },
      features: {
        title: "Integration & Automation",
        subtitle:
          "Strategy, implementation, and support to transform operations with intelligent automation.",
        items: [
          {
            title: "Strategic Planning",
            description:
              "Analyze systems to design optimal AI strategies.",
          },
          {
            title: "Automation",
            description:
              "Identify high-impact automation.",
          },
          {
            title: "ROI & Planning",
            description:
              "Quantify benefits and create roadmaps.",
          },
          {
            title: "Custom Agents",
            description:
              "Build tailored AI agents for your specific needs.",
          },
          {
            title: "System Integration",
            description:
              "Connect AI agents with your existing infra.",
          },
          {
            title: "Tech Selection",
            description:
              "Recommend the best tools for your budget.",
          },
          {
            title: "Change Mgmt",
            description:
              "Plans to ensure smooth adoption.",
          },
          {
            title: "Training",
            description:
              "Fine-tune agents for optimal performance.",
          },
          {
            title: "Roadmap",
            description:
              "Detailed execution plans with milestones.",
          },
          {
            title: "24/7 Support",
            description:
              "Monitoring and updates for peak performance.",
          },
        ],
      },
      problem: {
        title: "Why Manual Integration Fails",
        subtitle: "Disconnected systems and manual workflows silently drain productivity, revenue, and team morale.",
        badge: "The Problem",
        items: [
          { title: "Siloed Systems", description: "Data lives in separate tools with no reliable sync, creating blind spots across teams." },
          { title: "Manual Bottlenecks", description: "Repetitive tasks consume skilled employees who should be focused on high-value work." },
          { title: "No AI Roadmap", description: "Companies invest in AI tools without a strategy, leading to wasted spend and poor adoption." },
          { title: "Integration Failures", description: "Off-the-shelf connectors break under custom business logic, requiring constant patching." },
        ],
      },
      process: {
        title: "How We Deliver",
        subtitle: "A proven six-step process from assessment to continuous support.",
        badge: "Our Process",
        steps: [
          { title: "Discovery & Audit", description: "Map current systems, workflows, and pain points to identify the highest-impact opportunities." },
          { title: "Strategy & Roadmap", description: "Define a phased automation roadmap with clear ROI targets and risk mitigation." },
          { title: "Solution Design", description: "Architect integrations and AI agents tailored to your existing infrastructure." },
          { title: "Build & Test", description: "Develop, integrate, and rigorously test every workflow before any production rollout." },
          { title: "Deploy & Train", description: "Launch with change management support and hands-on team training for smooth adoption." },
          { title: "Monitor & Optimise", description: "24/7 monitoring with ongoing tuning to maintain performance and expand capabilities." },
        ],
      },
      beforeAfter: {
        label: "Transformation",
        title: "Before and After Automation",
      },
      performance: {
        metrics: [
          { value: "70%", label: "Faster Deployment" },
          { value: "3x", label: "ROI Increase" },
          { value: "99.9%", label: "Uptime SLA" },
        ],
      },
      cta: {
        title: "Ready to Automate?",
        subtitle: "Let us map your automation opportunities and build a roadmap that delivers measurable ROI.",
        buttonText: "Start Your Assessment",
        buttonLink: "/contact",
      },
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "Integration & Enterprise Automation Overview",
      },
    },
  },
  {
    id: "faas",
    name: "AI Agents Framework-as-a-Service (FaaS)",
    description: "Managed AI framework platform",
    menuDescription: "Scalable infrastructure for AI agents",
    icon: "/service-menu-icons/Agent.png",
    slug: "faas",
    content: {
      hero: {
        subtitle: [
          "Managed AI framework platform. Focus on innovation, we handle scaling.",
        ],
        titleMain: "AI Agents Framework",
        titleHighlight: "FaaS Platform",
      },
      features: {
        title: "Managed Framework",
        subtitle:
          "Deploy and scale agents without infrastructure headaches.",
        items: [
          {
            title: "Cloud-Native Infrastructure",
            description:
              "Scalable, secure cloud infrastructure with automatic scaling, load balancing, and high availability.",
          },
          {
            title: "Rapid Deployment",
            description:
              "Deploy AI agents in minutes with our streamlined deployment pipeline and automated configuration management.",
          },
          {
            title: "Monitoring & Observability",
            description:
              "Comprehensive monitoring, logging, and analytics to track performance, usage, and costs in real-time.",
          },
          {
            title: "Security & Compliance",
            description:
              "Enterprise-grade security with encryption, access controls, and compliance certifications built-in.",
          },
          {
            title: "24/7 Support & Maintenance",
            description:
              "Dedicated support team handles updates, patches, and troubleshooting so you can focus on your business.",
          },
        ],
      },
      problem: {
        title: "The Infrastructure Tax on AI Teams",
        subtitle: "Engineering time spent managing infrastructure is time not spent building intelligent agents.",
        badge: "The Problem",
        items: [
          { title: "Complex Setup", description: "Standing up a production-grade agent framework takes months of engineering work before the first agent ships." },
          { title: "Unpredictable Scaling", description: "Traffic spikes crash self-managed deployments, causing downtime at the worst possible moments." },
          { title: "Security Gaps", description: "Homegrown infrastructure often skips enterprise-grade compliance, creating audit risks." },
          { title: "Maintenance Overhead", description: "Patches, updates, and incident response consume the team that should be advancing the product." },
        ],
      },
      process: {
        title: "From Sign-Up to Production",
        subtitle: "Onboard, configure, and scale without touching a server.",
        badge: "Our Process",
        steps: [
          { title: "Onboarding", description: "Connect your environment in minutes with our guided onboarding and pre-built configuration templates." },
          { title: "Agent Configuration", description: "Define agent roles, permissions, and resource limits through a simple declarative interface." },
          { title: "Deploy", description: "Push agents to our cloud-native infrastructure with zero downtime blue-green deployments." },
          { title: "Monitor", description: "Real-time dashboards surface performance, cost, and usage across every agent in your fleet." },
          { title: "Scale", description: "Automatic horizontal scaling handles any load spike without manual intervention." },
          { title: "Iterate", description: "Push updates continuously while the platform handles rollbacks if anything degrades." },
        ],
      },
      beforeAfter: {
        label: "Platform Impact",
        title: "Self-Managed vs. FaaS",
      },
      performance: {
        metrics: [
          { value: "10x", label: "Scale Capacity" },
          { value: "5min", label: "Deployment Time" },
          { value: "100%", label: "Managed Infra" },
        ],
      },
      cta: {
        title: "Ship Agents, Not Infrastructure",
        subtitle: "Focus entirely on building intelligent agents while we handle everything underneath.",
        buttonText: "Get Early Access",
        buttonLink: "/contact",
      },
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "FaaS Platform Demo",
      },
    },
  },
  {
    id: "innovation-lab",
    name: "Innovation & Research Lab",
    description: "Cutting-edge AI research and development",
    menuDescription: "Applied AI R&D and rapid prototyping",
    icon: "/service-menu-icons/Inovetion Lab.png",
    slug: "innovation-lab",
    content: {
      hero: {
        subtitle: [
          "Cutting-edge AI R&D. Pushing boundaries of AI.",
        ],
        titleMain: "Innovation & Research",
        titleHighlight: "Lab",
      },
      features: {
        title: "Advanced R&D",
        subtitle:
          "Exploring the frontiers of AI technology.",
        items: [
          {
            title: "Research & Development",
            description:
              "Continuous research into new AI techniques, architectures, and applications to stay at the forefront of innovation.",
          },
          {
            title: "Prototype Development",
            description:
              "Rapid prototyping of experimental AI solutions to validate concepts and explore new possibilities.",
          },
          {
            title: "Technology Partnerships",
            description:
              "Collaborate with leading universities, research institutions, and technology companies on cutting-edge projects.",
          },
          {
            title: "Early Access Programs",
            description:
              "Get early access to breakthrough AI technologies and features before they're available to the general market.",
          },
          {
            title: "Custom Research Projects",
            description:
              "Commissioned research projects tailored to your specific challenges, exploring novel AI approaches.",
          },
        ],
      },
      problem: {
        title: "Why Enterprises Fall Behind on AI",
        subtitle: "Most organisations know they need to innovate but lack the capacity, expertise, or speed to do it.",
        badge: "The Problem",
        items: [
          { title: "No Internal R&D Capacity", description: "Building an AI research team from scratch takes years and significant capital most organisations cannot spare." },
          { title: "Slow Experimentation", description: "Rigid procurement and approval cycles mean promising ideas die before they can be validated." },
          { title: "Technology Blind Spots", description: "Teams working inside a single stack miss breakthroughs happening at the edges of the field." },
          { title: "Risk-Averse Culture", description: "Fear of failure prevents the rapid prototyping needed to find what actually works." },
        ],
      },
      process: {
        title: "From Idea to Validated Innovation",
        subtitle: "A structured research process that turns ambiguous problems into working prototypes fast.",
        badge: "Our Process",
        steps: [
          { title: "Discovery", description: "Identify strategic challenges and open research questions worth investing in." },
          { title: "Literature Review", description: "Survey the state of the art to avoid reinventing what already exists." },
          { title: "Hypothesis Design", description: "Frame testable hypotheses with clear success criteria before writing a line of code." },
          { title: "Rapid Prototyping", description: "Build the smallest possible version that proves or disproves the hypothesis." },
          { title: "Validation", description: "Test prototypes with real users and domain experts, measuring against the defined criteria." },
          { title: "Handoff or Scale", description: "Package validated findings as production-ready solutions or spin them into dedicated product tracks." },
        ],
      },
      beforeAfter: {
        label: "Innovation Impact",
        title: "Experimenting Alone vs. With the Lab",
      },
      performance: {
        metrics: [
          { value: "50+", label: "Research Projects" },
          { value: "2x", label: "Innovation Speed" },
          { value: "First", label: "Early Access" },
        ],
      },
      cta: {
        title: "Bring Your Hardest Problem",
        subtitle: "Partner with our lab to explore, prototype, and validate AI solutions your competitors have not considered yet.",
        buttonText: "Start a Research Project",
        buttonLink: "/contact",
      },
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "ESAP AI Innovation Lab",
      },
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
