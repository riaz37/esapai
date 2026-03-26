"use client";

import { useTranslations } from "next-intl";

export function SkipToContent() {
  const t = useTranslations("UI");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[9999] focus:inline-block focus:rounded-lg focus:bg-zinc-950 focus:border focus:border-[#13F584]/40 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#13F584] focus:outline-none focus:ring-2 focus:ring-[#13F584]/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {t("skipToContent")}
    </a>
  );
}
