"use client";

import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  message,
  action,
  className,
}: EmptyStateProps) {
  const t = useTranslations("UI");

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <Icon className="h-6 w-6 text-white/30" strokeWidth={1.5} />
      </div>
      <p className="text-sm text-white/50 max-w-xs leading-relaxed">
        {message ?? t("empty")}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
