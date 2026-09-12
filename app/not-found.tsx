import Link from "next/link";

/**
 * Fallback 404 for requests that don't resolve to a locale segment at all
 * (e.g. blocked by middleware's matcher, or a locale-less asset-like path).
 * Locale-aware 404s are handled by app/[locale]/not-found.tsx.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>404 — Page not found</h1>
          <p style={{ marginBottom: "1.5rem" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/en">Go to homepage</Link>
        </div>
      </body>
    </html>
  );
}
