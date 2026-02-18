import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "integration-and-automation",
    name: "Integration & Automation",
    description:
      "Complete AI integration and strategic automation—from assessment and roadmap to deployment and ongoing support.",
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
    slug: "faas",
    content: {
      hero: {
        subtitle: [
          "Managed AI framework platform. Focus on innovation, we handle scaling.",
        ],
        titleMain: "AI Agents Framework",
        titleHighlight: "as a Service (FaaS)",
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
    name: "Innovation & Research Lab",
    description: "Cutting-edge AI research and development",
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
