"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Zap, Cpu } from "lucide-react";
import type { DropdownMenuProps } from "@/types/navigation";

export function DropdownMenu({
  title,
  items,
  basePath,
  dropdownClass,
  isOpen,
  onClose,
}: DropdownMenuProps) {
  const t = useTranslations("Menus");
  const tProducts = useTranslations("Products");
  const [hoveredId, setHoveredId] = useState<string | null>(items[0]?.id || null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelVideoRef = useRef<HTMLVideoElement>(null);
  const [panelHovered, setPanelHovered] = useState(false);

  const activeItem = useMemo(() =>
    items.find(item => item.id === hoveredId) || items[0],
    [hoveredId, items]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape": {
        e.preventDefault();
        onClose();
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const nextIndex = focusedIndex < items.length - 1 ? focusedIndex + 1 : 0;
        setFocusedIndex(nextIndex);
        setHoveredId(items[nextIndex].id);
        linkRefs.current[nextIndex]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : items.length - 1;
        setFocusedIndex(prevIndex);
        setHoveredId(items[prevIndex].id);
        linkRefs.current[prevIndex]?.focus();
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocusedIndex(0);
        setHoveredId(items[0].id);
        linkRefs.current[0]?.focus();
        break;
      }
      case "End": {
        e.preventDefault();
        const lastIndex = items.length - 1;
        setFocusedIndex(lastIndex);
        setHoveredId(items[lastIndex].id);
        linkRefs.current[lastIndex]?.focus();
        break;
      }
    }
  }, [focusedIndex, items, onClose]);

  useEffect(() => {
    if (isOpen && items.length > 0) {
      setFocusedIndex(0);
      setHoveredId(items[0].id);
      const timer = setTimeout(() => {
        linkRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
    return () => {
      setFocusedIndex(-1);
    };
  }, [isOpen, items]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={title}
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mt-3 z-[100] pointer-events-auto",
        "w-[min(900px,90vw)] bg-zinc-950/98 backdrop-blur-3xl border border-white/10 shadow-3xl rounded-3xl overflow-hidden",
        dropdownClass
      )}
    >
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-[min(300px,35vw)] border-r border-white/5 bg-black/20 flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar" role="none">
            {items.map((item, index) => (
              <Link
                key={item.id}
                ref={(el) => { linkRefs.current[index] = el; }}
                href={`${basePath}/${item.slug}`}
                role="menuitem"
                tabIndex={focusedIndex === index ? 0 : -1}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  setFocusedIndex(index);
                }}
                onFocus={() => {
                  setHoveredId(item.id);
                  setFocusedIndex(index);
                }}
                onClick={onClose}
                className={cn(
                  "group relative px-6 py-4 cursor-pointer transition-all duration-300 block",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                  hoveredId === item.id ? "bg-primary/5" : "hover:bg-white/5"
                )}
              >
                {/* Active Indicator */}
                {hoveredId === item.id && (
                  <m.div
                    layoutId="active-indicator"
                    className="absolute start-0 top-0 bottom-0 w-[3px] bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      hoveredId === item.id ? "bg-primary/20 text-primary" : "bg-white/5 text-zinc-500"
                    )}>
                      {item.icon ? (
                        <Image src={item.icon} alt="" width={24} height={24} className="opacity-80" />
                      ) : (
                        <Cpu className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        hoveredId === item.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                      )}>
                        {basePath === "/product" ? tProducts(`${item.id}.name`) : item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Panel: Dynamic Content */}
        <div
          className="flex-1 bg-gradient-to-br from-transparent to-primary/10 relative overflow-hidden"
          aria-live="polite"
          onMouseEnter={() => { setPanelHovered(true); panelVideoRef.current?.play(); }}
          onMouseLeave={() => { setPanelHovered(false); if (panelVideoRef.current) { panelVideoRef.current.pause(); panelVideoRef.current.currentTime = 0; } }}
        >
          {/* Background: static mesh — top-right, rotated 180deg */}
          <img
            src="/images/footerbg.png"
            alt=""
            aria-hidden="true"
            className="absolute top-0 end-0 w-full h-auto pointer-events-none select-none"
            style={{
              opacity: panelHovered ? 0 : 0.15,
              filter: "invert(1)",
              zIndex: 0,
              transform: "rotate(180deg)",
              transition: "opacity 0.5s",
            }}
          />
          <video
            ref={panelVideoRef}
            src="/videos/footer3.mp4"
            muted
            loop
            playsInline
            preload="none"
            className="absolute top-0 end-0 w-full h-full object-cover object-top pointer-events-none select-none"
            style={{ opacity: panelHovered ? 0.35 : 0, transition: "opacity 0.5s", zIndex: 0, transform: "rotate(180deg)" }}
          />
          {activeItem && (
            <AnimatePresence mode="wait">
              <m.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative p-10 flex flex-col z-10"
              >
                <div>
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="max-w-lg">
                      <h4 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        {basePath === "/product" ? tProducts(`${activeItem.id}.name`) : activeItem.name}
                      </h4>
                      <p className="text-base text-white/60 leading-relaxed font-normal">
                        {basePath === "/product"
                          ? tProducts(`${activeItem.id}.menuDescription`)
                          : (activeItem.menuDescription || activeItem.description)}
                      </p>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 gap-8 mb-8">
                    {/* Stats / Metrics */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/60 text-xs font-bold mb-2">
                        <Zap className="w-3 h-3 text-primary" />
                        {t("impactAnalysis")}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {(activeItem.content as any)?.performance?.metrics?.map((metric: { label: string; value: string }) => (
                          <div key={metric.label} className="bg-primary/5 p-4 rounded-xl hover:bg-primary/10 transition-all duration-300">
                            <div className="text-2xl font-bold text-primary leading-none">{metric.value}</div>
                            <div className="text-white/60 text-xs font-bold mt-2">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      {!(activeItem.content as any)?.performance?.metrics && (
                        <div className="p-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600 text-xs text-center italic">
                          {t("telemetryPending")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Area Removed */}
                <div className="mt-auto" />
              </m.div>
            </AnimatePresence>
          )}

          {/* Decorative Corner Glow */}
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 end-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
