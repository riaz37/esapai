import React from "react";
import { AboutV2Hero } from "@/components/features/about-v2/hero";
import { AboutV2Narrative } from "@/components/features/about-v2/narrative";
import { Footer } from "@/components/features/navigation/footer/footer";

export const metadata = {
    title: "About Us | ESAP AI ",
    description: "Learn about the legacy and vision of ESAP AI.",
};

export default function AboutV2Page() {
    return (
        <main className="bg-black min-h-screen">
            <AboutV2Hero />
            <AboutV2Narrative />

            {/* Simple transition to footer */}
            <section className="py-24 px-4 bg-[#0a0a0a]">
                <div className="container mx-auto text-center border-t border-white/5 pt-24">
                    <h2 className="text-4xl md:text-6xl font-black text-white/20 uppercase tracking-[0.2em] mb-12">
                        This is just the beginning
                    </h2>
                </div>
            </section>

            <Footer />
        </main>
    );
}
