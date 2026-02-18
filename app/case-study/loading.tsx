export default function CaseStudiesLoading() {
  return (
    <main className="relative">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
        <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
          <div className="h-16 w-64 bg-dark/50 rounded-lg mb-6 animate-pulse" />
          <div className="h-6 w-96 bg-dark/50 rounded-lg animate-pulse" />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={`card-skeleton-${n}`}
                className="h-96 bg-dark/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
