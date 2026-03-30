"use client";

import { Link } from "@/i18n/routing";
import { useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";
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
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        onToggle();
        break;
      }
      case "Escape": {
        if (isOpen) {
          e.preventDefault();
          onToggle();
        }
        break;
      }
    }
  }, [onToggle, isOpen]);

  const handleItemKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const nextIndex = index < items.length - 1 ? index + 1 : 0;
        itemRefs.current[nextIndex]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : items.length - 1;
        itemRefs.current[prevIndex]?.focus();
        break;
      }
      case "Escape": {
        e.preventDefault();
        onToggle();
        break;
      }
    }
  }, [items.length, onToggle]);

  return (
    <div role="none">
      {/* Accordion Trigger */}
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={handleTriggerKeyDown}
        className={`nav-link-group relative group w-full px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-between ${isSectionActive || isOpen
          ? "is-active text-primary"
          : "text-white hover:text-primary"
          }`}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="relative z-10 text-base font-semibold">{title}</span>
        <ChevronDown
          className={`relative z-10 size-4 text-primary/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        />
      </button>

      {/* Expanded Items */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id={id}
            role="menu"
            aria-label={title}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-2 pb-2 pt-1">
              {items.map((item, index) => (
                <Link
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  href={`${basePath}/${item.slug}`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={onNavigate}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  className="mobile-menu-item group flex items-center gap-3 px-3 py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 rounded-lg"
                >
                  {/* Active indicator */}
                  <div className="w-[2px] h-8 rounded-full bg-white/10 group-hover:bg-primary group-focus-visible:bg-primary transition-colors duration-300 shrink-0" />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-zinc-400 group-hover:text-white group-focus-visible:text-white transition-colors duration-300">
                      {item.name}
                    </div>
                    {item.description && (
                      <div className="text-xs text-white/60 group-hover:text-white/80 truncate mt-0.5 transition-colors duration-300">
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
