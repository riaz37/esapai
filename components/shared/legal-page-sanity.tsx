import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { SanityLegalPage } from "@/lib/sanity/queries";
import { LegalPage, LegalSection } from "@/components/shared/legal-page";

const portableTextComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="text-light-gray-90 leading-relaxed">{children}</p>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold text-primary mt-8 mb-4">
                {children}
            </h3>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ms-5 sm:ms-6 md:ms-8 space-y-2 sm:space-y-3 text-sm sm:text-base text-light-gray-90 leading-relaxed">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal ms-5 sm:ms-6 md:ms-8 space-y-2 sm:space-y-3 text-sm sm:text-base text-light-gray-90 leading-relaxed">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="ps-1.5 sm:ps-2 md:ps-3 relative">
                <span className="relative z-10">{children}</span>
            </li>
        ),
        number: ({ children }) => (
            <li className="ps-1.5 sm:ps-2 md:ps-3 relative">
                <span className="relative z-10">{children}</span>
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="text-primary font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em>{children}</em>,
        link: ({ value, children }) => (
            <a
                href={value?.href}
                className="text-primary hover:underline transition-colors"
                target={value?.href?.startsWith("mailto:") ? undefined : "_blank"}
                rel={value?.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
                {children}
            </a>
        ),
    },
};

interface LegalPageFromSanityProps {
    page: SanityLegalPage;
}

export function LegalPageFromSanity({ page }: LegalPageFromSanityProps) {
    const lastSection = page.sections[page.sections.length - 1];
    const isContactSection = lastSection?.heading?.includes("Contact") || lastSection?.heading?.includes("اتصل");

    return (
        <LegalPage title={page.title} lastUpdated={page.lastUpdated}>
            {page.sections.map((section, index) => {
                const isLast = index === page.sections.length - 1;
                const showContactBlock = isLast && isContactSection && (page.contactEmail || page.contactAddress);

                return (
                    <LegalSection key={section.heading} title={section.heading}>
                        <PortableText value={section.content} components={portableTextComponents} />
                        {showContactBlock && (
                            <div className="mt-6 p-6 md:p-8 rounded-2xl bg-white-opacity-5 border border-white-opacity-10 space-y-3 text-light-gray-90">
                                {page.contactEmail && (
                                    <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <strong className="text-primary font-semibold min-w-[80px]">Email:</strong>
                                        <a href={`mailto:${page.contactEmail}`} className="text-primary hover:underline transition-colors">
                                            {page.contactEmail}
                                        </a>
                                    </p>
                                )}
                                {page.contactAddress && (
                                    <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                        <strong className="text-primary font-semibold min-w-[80px]">Address:</strong>
                                        <span>{page.contactAddress}</span>
                                    </p>
                                )}
                            </div>
                        )}
                    </LegalSection>
                );
            })}
        </LegalPage>
    );
}
