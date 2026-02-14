export function ContactBackdrop() {
  return (
    <>
      {/* Green Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-30 blur-3xl" />
      </div>
    </>
  );
}



