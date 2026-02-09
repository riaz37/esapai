"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight, LayoutGrid, Zap, Shield, Cpu } from "lucide-react";
import type { MenuItem, DropdownMenuProps } from "@/types/navigation";

export type { MenuItem, DropdownMenuProps };

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
            <h2 className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.25em]">
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
                  hoveredId === item.id ? "bg-emerald-500/5" : "hover:bg-white/5"
                )}
              >
                {/* Active Indicator */}
                {hoveredId === item.id && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      hoveredId === item.id ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-zinc-500"
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
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all duration-300",
                    hoveredId === item.id ? "text-emerald-500 opacity-100 translate-x-0" : "text-zinc-700 opacity-0 -translate-x-2"
                  )} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Panel: Dynamic Content */}
        <div className="flex-1 bg-gradient-to-br from-transparent to-emerald-950/20 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
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
                    <p className="text-base text-zinc-400 leading-relaxed font-light">
                      {activeItem.menuDescription || activeItem.description}
                    </p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Features / Modules */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      <LayoutGrid className="w-3 h-3 text-emerald-500" />
                      Core Capabilities
                    </div>
                    {(activeItem.content?.automationHub?.features ||
                      activeItem.content?.features?.items ||
                      activeItem.content?.mission?.cards || []).slice(0, 3).map((f: any, idx: number) => (
                        <div key={idx} className="flex gap-3 group/feat">
                          <div className="w-1 h-1 rounded-full bg-emerald-500/40 mt-2 shrink-0 group-hover/feat:bg-emerald-500 transition-colors" />
                          <div>
                            <p className="text-sm font-semibold text-zinc-200">{f.title}</p>
                            <p className="text-[11px] text-zinc-500 line-clamp-1">{f.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Stats / Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      <Zap className="w-3 h-3 text-emerald-500" />
                      Impact Analysis
                    </div>
                    {activeItem.content?.performance?.metrics?.map((m: any, idx: number) => (
                      <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-xl hover:border-emerald-500/20 transition-all duration-300">
                        <div className="text-xl font-bold text-emerald-400 font-mono leading-none">{m.value}</div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{m.label}</div>
                      </div>
                    ))}
                    {!activeItem.content?.performance?.metrics && (
                      <div className="p-4 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600 text-xs text-center italic">
                        Real-time telemetry <br /> pending deployment...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6 opacity-40">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-500/50" />
                    <span className="text-[9px] text-zinc-400 uppercase tracking-[0.2em]">Tier-1 Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-zinc-400 uppercase tracking-[0.2em]">Alpha Node</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}




