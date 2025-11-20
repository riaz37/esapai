"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface ProductHeroProps {
  title: string;
  subtitle: string[];
  centerIcon?: string;
  centerIconAlt?: string;
}

export function ProductHero({ title, subtitle, centerIcon, centerIconAlt }: ProductHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      <div className="relative z-2 container mx-auto px-4 pt-32 md:pt-40 pb-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-gradient-primary">
            {title}
          </h1>

          {/* Sub-headline */}
          <div className="mb-6 space-y-2">
            {subtitle.map((line, index) => (
              <p key={index} className="text-lg md:text-xl lg:text-2xl text-light-gray-90">
                {line}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="primary" size="lg" className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" asChild>
              <Link href="#explore">Explore Solution</Link>
            </Button>
            <Button 
              variant="watch-demo" 
              size="lg" 
              className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]" 
              asChild
            >
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>

        {/* Product Images - Watermakr and VoiceERP */}
        <div className="relative w-full flex justify-center -mt-4">
          <div className="relative w-full max-w-[95vw]">
            <Image
              src="/products/Watermakr.svg"
              alt="Watermark"
              width={1600}
              height={1000}
              className="w-full h-auto mx-auto"
              priority
            />

            {/* Left side decorative elements */}
            <motion.div
              className="absolute left-0 top-[20%] pointer-events-none z-10"
              animate={{
                y: [0, -15, 0],
                opacity: [0.7, 1, 0.7],
                filter: [
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                  "drop-shadow(0 0 20px rgba(19, 245, 132, 0.7))",
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/products/element1.svg"
                alt="Decorative element"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute left-[8%] top-[40%] pointer-events-none z-10"
              animate={{
                y: [0, 15, 0],
                opacity: [0.6, 0.9, 0.6],
                filter: [
                  "drop-shadow(0 0 6px rgba(19, 245, 132, 0.3))",
                  "drop-shadow(0 0 16px rgba(19, 245, 132, 0.6))",
                  "drop-shadow(0 0 6px rgba(19, 245, 132, 0.3))",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Image
                src="/products/element2.svg"
                alt="Decorative element"
                width={60}
                height={60}
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute left-[3%] top-[60%] pointer-events-none z-10"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
                filter: [
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.4))",
                  "drop-shadow(0 0 24px rgba(19, 245, 132, 0.7))",
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.4))",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Image
                src="/products/element3.svg"
                alt="Decorative element"
                width={100}
                height={100}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute left-[12%] top-[72%] pointer-events-none z-10"
              animate={{
                y: [0, 20, 0],
                opacity: [0.55, 0.95, 0.55],
                filter: [
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.35))",
                  "drop-shadow(0 0 28px rgba(19, 245, 132, 0.65))",
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.35))",
                ],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <Image
                src="/products/elemnet4.svg"
                alt="Decorative element"
                width={90}
                height={90}
                className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] lg:w-24 lg:h-24"
                priority
              />
            </motion.div>

            {/* Right side decorative elements */}
            <motion.div
              className="absolute right-0 top-[15%] pointer-events-none z-10"
              animate={{
                y: [0, 12, 0],
                opacity: [0.7, 1, 0.7],
                filter: [
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                  "drop-shadow(0 0 20px rgba(19, 245, 132, 0.7))",
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/products/element5.svg"
                alt="Decorative element"
                width={90}
                height={90}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute right-[8%] top-[35%] pointer-events-none z-10"
              animate={{
                y: [0, -18, 0],
                opacity: [0.6, 0.9, 0.6],
                filter: [
                  "drop-shadow(0 0 6px rgba(19, 245, 132, 0.3))",
                  "drop-shadow(0 0 18px rgba(19, 245, 132, 0.6))",
                  "drop-shadow(0 0 6px rgba(19, 245, 132, 0.3))",
                ],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7,
              }}
            >
              <Image
                src="/products/element6.svg"
                alt="Decorative element"
                width={70}
                height={70}
                className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute right-[3%] top-[55%] pointer-events-none z-10"
              animate={{
                y: [0, 14, 0],
                opacity: [0.5, 0.85, 0.5],
                filter: [
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                  "drop-shadow(0 0 22px rgba(19, 245, 132, 0.7))",
                  "drop-shadow(0 0 8px rgba(19, 245, 132, 0.4))",
                ],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <Image
                src="/products/element7.svg"
                alt="Decorative element"
                width={85}
                height={85}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute right-[12%] top-[72%] pointer-events-none z-10"
              animate={{
                y: [0, -18, 0],
                opacity: [0.55, 0.9, 0.55],
                filter: [
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.35))",
                  "drop-shadow(0 0 28px rgba(19, 245, 132, 0.65))",
                  "drop-shadow(0 0 10px rgba(19, 245, 132, 0.35))",
                ],
              }}
              transition={{
                duration: 4.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            >
              <Image
                src="/products/element8.svg"
                alt="Decorative element"
                width={75}
                height={75}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-[5.5rem] lg:h-[5.5rem]"
                priority
              />
            </motion.div>

            {centerIcon && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                  className="absolute w-[55%] max-w-[520px] aspect-square rounded-full bg-gradient-to-b from-emerald-400/50 via-emerald-400/20 to-transparent blur-3xl"
                  animate={{
                    scale: [0.95, 1.1, 0.95],
                    opacity: [0.5, 0.35, 0.5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute w-[32%] max-w-[320px] aspect-square rounded-full bg-emerald-400/40 blur-[120px]"
                  animate={{
                    scale: [0.9, 1.05, 0.9],
                    opacity: [0.6, 0.4, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <Image
                  src={centerIcon}
                  alt={centerIconAlt || "Product Icon"}
                  width={640}
                  height={640}
                  className="w-[40%] md:w-[35%] lg:w-[30%] xl:w-[28%] h-auto drop-shadow-[0_10px_40px_rgba(0,255,170,0.35)]"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

