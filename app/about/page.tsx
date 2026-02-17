import React from "react";
import { AboutHero } from "@/components/features/about/hero";
import { AboutNarrative } from "@/components/features/about/narrative";
import { AboutHistory } from "@/components/features/about/history";
import { Footer } from "@/components/features/navigation/footer/footer";

export const metadata = {
    title: "About Us | ESAP AI ",
    description: "Learn about the legacy and vision of ESAP AI.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <AboutHero />
            <AboutNarrative />
            <AboutHistory />
        </main>
    );
}
