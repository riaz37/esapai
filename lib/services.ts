import type { ServiceFeature, ServiceContent, Service } from "@/types/service";

export type { ServiceFeature, ServiceContent, Service };

export const services: Service[] = [
  {
    id: "end-to-end-integration",
    name: "End-to-End Agentic AI Integration",
    description: "Complete AI agent integration solutions",
    slug: "end-to-end-integration",
    content: {
      hero: {
        subtitle: [
          "Complete AI integration solutions",
          "From strategy to deployment",
        ],
      },
      features: {
        title: "Integration Services",
        subtitle:
          "Transform operations with intelligent automation.",
        items: [
          {
            title: "Strategic Planning & Assessment",
            description:
              "Comprehensive analysis of your current systems and workflows to design optimal AI agent integration strategies.",
          },
          {
            title: "Custom Agent Development",
            description:
              "Build tailored AI agents specifically designed for your business processes, industry, and operational requirements.",
          },
          {
            title: "System Integration",
            description:
              "Seamlessly integrate AI agents with your existing infrastructure, databases, APIs, and third-party services.",
          },
          {
            title: "Training & Optimization",
            description:
              "Fine-tune agents with your data and workflows, ensuring optimal performance and continuous improvement.",
          },
          {
            title: "Ongoing Support & Maintenance",
            description:
              "24/7 monitoring, updates, and support to ensure your AI agents operate at peak performance.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "End-to-End AI Integration Overview",
      },
    },
  },
  {
    id: "enterprise-automation",
    name: "Enterprise Automation Strategy Consulting",
    description: "Strategic automation consulting services",
    slug: "enterprise-automation",
    content: {
      hero: {
        subtitle: [
          "Strategic automation consulting",
          "Guidance to implement automation",
        ],
      },
      features: {
        title: "Automation Expertise",
        subtitle:
          "Strategies to maximize ROI and efficiency.",
        items: [
          {
            title: "Automation Opportunity Assessment",
            description:
              "Identify high-impact automation opportunities across your organization through comprehensive process analysis.",
          },
          {
            title: "ROI Analysis & Planning",
            description:
              "Quantify potential benefits, estimate costs, and create detailed implementation roadmaps with clear milestones.",
          },
          {
            title: "Change Management Strategy",
            description:
              "Develop comprehensive change management plans to ensure smooth adoption and minimize disruption.",
          },
          {
            title: "Technology Selection",
            description:
              "Recommend the best automation tools and platforms based on your specific needs, budget, and technical requirements.",
          },
          {
            title: "Implementation Roadmap",
            description:
              "Create detailed execution plans with phased rollouts, risk mitigation strategies, and success metrics.",
          },
        ],
      },
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "Enterprise Automation Strategy",
      },
    },
  },
  {
    id: "faas",
    name: "AI Agents Framework-as-a-Service (FaaS)",
    description: "Managed AI framework platform",
    slug: "faas",
    content: {
      hero: {
        subtitle: [
          "Managed AI framework platform",
          "Focus on innovation, we handle scaling",
        ],
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
      youtubeVideo: {
        videoId: "hPkB_DBwnfU",
        title: "FaaS Platform Demo",
      },
    },
  },

  {
    id: "innovation-lab",
    name: "ESAP AI Innovation & Research Lab",
    description: "Cutting-edge AI research and development",
    slug: "innovation-lab",
    content: {
      hero: {
        subtitle: [
          "Cutting-edge AI R&D",
          "Pushing boundaries of AI",
        ],
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

