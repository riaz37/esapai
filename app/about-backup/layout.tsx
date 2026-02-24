import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | ESAP AI",
    description: "Meet the visionaries and builders behind ESAP AI's next-generation platform.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
