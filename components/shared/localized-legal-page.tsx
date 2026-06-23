import type { LocalizedLegalPage } from "@/lib/legal-pages";
import { LegalList, LegalPage, LegalParagraph, LegalSection } from "@/components/shared/legal-page";

function renderTextWithEmail(text: string, email: string) {
  const parts = text.split(email);

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < parts.length - 1 && (
            <a href={`mailto:${email}`} className="text-primary hover:underline transition-colors">
              {email}
            </a>
          )}
        </span>
      ))}
    </>
  );
}

export function LocalizedLegalPageView({ page }: { page: LocalizedLegalPage }) {
  return (
    <LegalPage
      title={page.title}
      lastUpdated={page.lastUpdated}
      lastUpdatedLabel={page.lastUpdatedLabel}
    >
      {page.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs?.map((paragraph) => (
            <LegalParagraph key={paragraph}>{renderTextWithEmail(paragraph, page.contactEmail)}</LegalParagraph>
          ))}
          {section.items && <LegalList items={section.items} />}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
