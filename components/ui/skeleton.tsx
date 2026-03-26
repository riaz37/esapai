"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  variant?: "text" | "card" | "image" | "metric";
  className?: string;
  lines?: number;
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/[0.06]",
        className
      )}
    />
  );
}

export function Skeleton({ variant = "text", className, lines = 3 }: SkeletonProps) {
  if (variant === "text") {
    return (
      <div className={cn("space-y-3", className)} role="status" aria-label="Loading">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonPulse
            key={i}
            className={cn(
              "h-4",
              i === lines - 1 ? "w-3/5" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4",
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <SkeletonPulse className="h-40 w-full rounded-xl" />
        <SkeletonPulse className="h-5 w-2/3" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-4/5" />
      </div>
    );
  }

  if (variant === "image") {
    return (
      <div role="status" aria-label="Loading" className={className}>
        <SkeletonPulse className={cn("h-48 w-full rounded-xl", className)} />
      </div>
    );
  }

  if (variant === "metric") {
    return (
      <div
        className={cn("flex flex-col items-center gap-3 py-8", className)}
        role="status"
        aria-label="Loading"
      >
        <SkeletonPulse className="h-10 w-24 rounded-lg" />
        <SkeletonPulse className="h-4 w-32 rounded" />
      </div>
    );
  }

  return null;
}

export function SkeletonGrid({
  count = 3,
  variant = "card",
  columns = "grid-cols-1 md:grid-cols-3",
  className,
}: {
  count?: number;
  variant?: SkeletonProps["variant"];
  columns?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6", columns, className)} role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
