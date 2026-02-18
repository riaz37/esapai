export default function CaseStudyLoading() {
  return (
    <main className="relative">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="h-16 w-96 bg-dark/50 rounded-lg mb-6 animate-pulse" />
          <div className="h-6 w-full max-w-3xl bg-dark/50 rounded-lg mb-4 animate-pulse" />
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={`tag-skeleton-${n}`} className="h-8 w-24 bg-dark/50 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-dark/50 rounded-lg animate-pulse" />
            <div className="h-64 bg-dark/50 rounded-lg animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={`section-skeleton-${n}`} className="h-48 bg-dark/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
