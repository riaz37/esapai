"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceItem } from "@/components/ui/service-item";

export function Service() {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-dark">
      <div className="relative container mx-auto max-w-7xl z-10">
        <SectionHeader
          title={
            <>
              <span className="block">Comprehensive AI</span>
              <span className="block">Services & Solutions</span>
            </>
          }
          subtitle="From strategic consulting to complete integration, we offer end-to-end AI services that transform your business operations and drive innovation."
        />

        {/* Central Brain with Services */}
        <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center py-8 md:py-12 -mt-12 md:-mt-16">
          {/* Ellipse around the brain */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Image
              src="/landing/service/ellipse.svg"
              alt="Ellipse glow"
              width={600}
              height={600}
              className="w-full h-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[650px] object-contain"
            />
          </div>

          {/* Central Brain */}
          <div className="relative z-20 animate-float">
            <Image
              src="/landing/service/brain.svg"
              alt="AI Brain"
              width={400}
              height={400}
              className="w-full h-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] object-contain"
              priority
            />
          </div>

          {/* Service Modules - Circular Arrangement */}
          <div className="absolute inset-0 z-10 overflow-visible">
            {/* Positioning container centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-visible">
              {/* Top Left - ~120 degrees */}
              <ServiceItem
                title={
                  <>
                    End-to-End Agentic <span className="text-white-opacity-70">AI</span> Integration
                  </>
                }
                description="Complete AI agent integration from strategy to deployment"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 450px)',
                  top: 'calc(50% - 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Middle Left - 180 degrees */}
              <ServiceItem
                title="Enterprise Automation Strategy"
                description="Strategic consulting to identify and implement automation opportunities"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 500px)',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Bottom Left - ~240 degrees */}
              <ServiceItem
                title="Framework-as-a-Service"
                description="Managed AI framework platform with cloud infrastructure"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 450px)',
                  top: 'calc(50% + 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Top Right - ~60 degrees */}
              <ServiceItem
                title="Tailored AI Solutions"
                description="Custom AI solutions designed for your specific business needs"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 450px)',
                  top: 'calc(50% - 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Middle Right - 0/360 degrees */}
              <ServiceItem
                title="Industry-Specific Excellence"
                description="Specialized AI solutions for healthcare, finance, and manufacturing"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 500px)',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Bottom Right - ~300 degrees */}
              <ServiceItem
                title="Innovation & Research Lab"
                description="Cutting-edge AI research and development for next-gen solutions"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 450px)',
                  top: 'calc(50% + 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floor Grid Pattern - boxes.svg */}
      <div className="absolute -bottom-24 left-0 right-0 z-0 pointer-events-none">
        <Image
          src="/landing/service/boxes.svg"
          alt="Floor grid pattern"
          width={1370}
          height={547}
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}


