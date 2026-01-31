"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group/btn",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-[800ms]",
        primary:
          "bg-[#020305]/40 backdrop-blur-md border border-white/10 text-[#13F584] shadow-[0px_4px_54px_11px_rgba(226,226,226,0.15)_inset] hover:shadow-[0px_4px_54px_11px_rgba(226,226,226,0.25)_inset] hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95",
        outline:
          "bg-transparent border border-white/20 text-white hover:border-[#13F584] hover:text-[#13F584] hover:bg-[#13F584]/10 hover:shadow-[0_0_20px_rgba(19,245,132,0.15)] hover:-translate-y-0.5 active:scale-[0.98] relative overflow-hidden",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors",
        destructive:
          "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:-translate-y-0.5 active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "default",
        className: "pr-2",
      },
      {
        variant: "primary",
        size: "lg",
        className: "pr-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showArrow?: boolean;
}

export const ButtonArrow = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center text-black group-hover/btn:scale-110 group-hover/btn:rotate-[360deg] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ml-2 shrink-0",
      className
    )}
    style={{ background: "linear-gradient(180deg, #13F584 0%, #80FFBF 100%)" }}
  >
    <ArrowUpRight size={18} strokeWidth={2.5} className="!size-[18px]" />
  </div>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showArrow = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span className="relative z-10">{children}</span>
            {variant === "primary" && showArrow && <ButtonArrow />}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

