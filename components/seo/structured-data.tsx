import type { StructuredDataProps } from "@/types/props";

/**
 * Renders JSON-LD structured data directly into the server response.
 * Must stay a plain <script> tag (no 'use client', no next/script) —
 * next/script's default "afterInteractive" strategy injects the tag via a
 * client-side effect after hydration, so it never reaches non-JS crawlers
 * (GPTBot, ClaudeBot, PerplexityBot) reading the raw HTML.
 */
export function StructuredDataComponent({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
