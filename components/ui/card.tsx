import { Spotlight } from "@/components/ui/spotlight"
import { cn } from "@/lib/utils";
import React from "react";

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { spotlight?: boolean }>(
  ({ className, style, spotlight = true, onMouseMove, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Combine external and internal refs
    const setRefs = React.useCallback((node: HTMLDivElement | null) => {
      (containerRef as any).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    }, [ref]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !spotlight) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      onMouseMove?.(e);
    };

    return (
      <div
        ref={setRefs}
        data-slot="card"
        className={cn(
          "text-card-foreground flex flex-col gap-6 rounded-[32px] border-0 py-6 overflow-hidden relative transition-all duration-300",
          className
        )}
        style={{
          background: "linear-gradient(180deg, #000000 0%, #121212 100%), radial-gradient(146.13% 118.42% at 50% -15.5%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 99.59%)",
          boxShadow: "0px 4px 54px 11px rgba(226, 226, 226, 0.15) inset",
          ...style
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => { setIsHovered(true); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { setIsHovered(false); onMouseLeave?.(e); }}
        {...props}
      >
        {spotlight && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-30"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(19, 245, 132, 0.15), transparent 80%)`,
            }}
          />
        )}
        {props.children}
      </div>
    );
  }
)
Card.displayName = "Card"

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}