import React from "react";
import { AboutPageClient } from "@/components/features/about/pages/about-page";

export const metadata = {
    title: "About Us | ESAP AI ",
    description: "Learn about the legacy and vision of ESAP AI.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <AboutPageClient />
        </main>
    );
}

