"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Cpu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
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
    <div>
      {/* Accordion Trigger */}
      <button
        type="button"
        onClick={onToggle}
        className={`nav-link-group relative group w-full px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-between ${isSectionActive || isOpen
          ? "is-active text-[#13F584]"
          : "text-white/70 hover:text-[#13F584]"
          }`}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="relative z-10 text-base font-semibold">{title}</span>
        <ChevronDown
          className={`relative z-10 size-4 text-[#13F584]/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Expanded Items */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-2 pb-2 pt-1">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`${basePath}/${item.slug}`}
                  onClick={onNavigate}
                  className="mobile-menu-item group flex items-center gap-3 px-3 py-3"
                >
                  {/* Active indicator */}
                  <div className="w-[2px] h-8 rounded-full bg-white/10 group-hover:bg-[#13F584] transition-colors duration-300 shrink-0" />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </div>
                    {item.description && (
                      <div className="text-xs text-white/30 group-hover:text-white/50 truncate mt-0.5 transition-colors duration-300">
                        {item.description}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
