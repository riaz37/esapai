import Script from "next/script";
import type { StructuredDataProps } from "@/types/props";

/**
 * Component to inject JSON-LD structured data into the page
 * Supports single schema or array of schemas
 */
export function StructuredDataComponent({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema) => (
        <Script
          key={schema["@type"]}
          type="application/ld+json"
          id={`structured-data-${schema["@type"]}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
