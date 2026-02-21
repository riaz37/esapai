"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight, LayoutGrid, Zap, Shield, Cpu } from "lucide-react";
import type { MenuItem, DropdownMenuProps } from "@/types/navigation";

export function DropdownMenu({
  title,
  description,
  items,
  basePath,
  dropdownClass,
  itemClass,
  isOpen,
  onClose,
}: DropdownMenuProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(items[0]?.id || null);

  const activeItem = useMemo(() =>
    items.find(item => item.id === hoveredId) || items[0],
    [hoveredId, items]
  );

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-3 z-[100] pointer-events-auto",
        "w-[900px] bg-zinc-950/98 backdrop-blur-3xl border border-white/10 shadow-3xl rounded-3xl overflow-hidden",
        dropdownClass
      )}
    >
      <div className="flex h-[540px]">
        {/* Left Sidebar */}
        <div className="w-[300px] border-r border-white/5 bg-black/20 flex flex-col">
          <div className="p-6">
            <h2 className="text-emerald-500 text-xs font-bold">
              {title}
            </h2>
          </div>

          <div className="flex-1 py-4 overflow-y-auto custom-scrollbar">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`${basePath}/${item.slug}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onClick={onClose}
                className={cn(
                  "group relative px-6 py-4 cursor-pointer transition-all duration-300 block",
                  hoveredId === item.id ? "bg-[#13F584]/5" : "hover:bg-white/5"
                )}
              >
                {/* Active Indicator */}
                {hoveredId === item.id && (
                  <m.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#13F584]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      hoveredId === item.id ? "bg-[#13F584]/20 text-[#13F584]" : "bg-white/5 text-zinc-500"
                    )}>
                      {item.icon ? (
                        <Image src={item.icon} alt={item.name} width={24} height={24} className="opacity-80" />
                      ) : (
                        <Cpu className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        hoveredId === item.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                      )}>
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Panel: Dynamic Content */}
        <div className="flex-1 bg-gradient-to-br from-transparent to-[#13F584]/10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <m.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 p-10 flex flex-col"
            >
              <div className="flex-1">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-10">
                  <div className="max-w-lg">
                    <h4 className="text-4xl font-bold text-white mb-4 tracking-tight">
                      {activeItem.name}
                    </h4>
                    <p className="text-base text-white/60 leading-relaxed font-normal">
                      {activeItem.menuDescription || activeItem.description}
                    </p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-8 mb-8">
                  {/* Stats / Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold mb-2">
                      <Zap className="w-3 h-3 text-[#13F584]" />
                      Impact Analysis
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {activeItem.content?.performance?.metrics?.map((m: any, idx: number) => (
                        <div key={m.label} className="bg-white/5 border border-white/5 p-4 rounded-xl hover:border-[#13F584]/20 transition-all duration-300 bg-gradient-to-b from-white/[0.02] to-transparent">
                          <div className="text-2xl font-bold text-[#13F584] leading-none">{m.value}</div>
                          <div className="text-white/40 text-xs font-bold mt-2">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    {!activeItem.content?.performance?.metrics && (
                      <div className="p-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600 text-xs text-center italic">
                        Real-time telemetry <br /> pending deployment...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Area Removed */}
              <div className="mt-auto" />
            </m.div>
          </AnimatePresence>

          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}




