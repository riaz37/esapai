"use client";

import { cn } from "@/lib/utils";
import type { FoundingStoryPhase } from "@/types/about";

interface FoundingStoryStageProps {
  phase: FoundingStoryPhase;
  className?: string;
}

export function FoundingStoryStage({ phase, className }: FoundingStoryStageProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto", className)}>
      {phase.phaseLabel && (
        <p className="text-primary mb-3 text-label-caps tracking-cinematic-widest">
          {phase.phaseLabel}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
        {phase.title}
      </h2>
      <div className="text-white/70 text-base sm:text-lg leading-relaxed space-y-4">
        {phase.body.split(/\n\n+/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {phase.quote && (
        <blockquote className="mt-6 text-lg italic text-white/70 border-l-2 border-primary/50 pl-6">
          &ldquo;{phase.quote}&rdquo;
        </blockquote>
      )}
      {phase.highlight && (
        <p className="mt-6 text-primary font-semibold text-lg drop-shadow-[0_0_8px_rgba(19,245,132,0.4)]">
          {phase.highlight}
        </p>
      )}
    </div>
  );
}
