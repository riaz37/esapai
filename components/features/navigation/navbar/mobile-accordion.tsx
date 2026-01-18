"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { MobileMenuItem } from "@/types/navigation";

export type { MobileMenuItem };

export function MobileAccordion({
  id,
  title,
  isOpen,
  onToggle,
  items,
  basePath,
  isSectionActive,
  onNavigate,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: MobileMenuItem[];
  basePath: string;
  isSectionActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={onToggle}
        className={`nav-link-group relative group w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${isSectionActive ? "is-active text-primary" : "text-light-gray hover:text-primary"
          }`}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="nav-glow" aria-hidden="true" />
        <span className="relative z-10 text-lg font-semibold">{title}</span>
        <ChevronDown
          className={`relative z-10 size-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="mt-2 ml-5 border-l border-white-opacity-20 pl-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`${basePath}/${item.slug}`}
                onClick={onNavigate}
                className="group block rounded-lg px-3 py-2 transition-colors hover:bg-white-opacity-10"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white-opacity-20 group-hover:bg-primary transition-colors" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-light-gray group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    {item.description && (
                      <div className="text-xs text-white-opacity-70 truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



