"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonArrow } from "@/components/ui/button";
import {
  m,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "center start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <m.div
      ref={ref}
      // Added horizontal padding to match Section.tsx geometry
      className={cn("fixed inset-x-0 top-2 z-40 w-full px-4 sm:px-6 md:px-8 lg:px-12", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </m.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        backgroundColor: visible ? "rgba(250, 250, 250, 0.02)" : "rgba(250, 250, 250, 0)",
        borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        paddingLeft: visible ? "12px" : "0px",
        paddingRight: visible ? "12px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
        mass: 1,
      }}
      style={{
        minWidth: visible ? "950px" : "auto",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full bg-transparent border border-transparent py-2 lg:flex max-w-[1400px]",
        className,
      )}
    >
      {children}
    </m.div >
  );
};

const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <m.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-premium-body transition-colors hover:text-white"
          key={item.link}
          href={item.link}
        >
          {hovered === idx && (
            <m.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </m.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <m.div
      animate={{
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        backgroundColor: visible ? "rgba(250, 250, 250, 0.02)" : "rgba(250, 250, 250, 0)",
        borderColor: visible ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "12px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
        mass: 1,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent border border-transparent px-0 py-2 lg:hidden",
        className,
      )}
    >
      {children}
    </m.div>
  );
};

const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-1 rounded-2xl px-3 py-4 border border-white/10 overflow-hidden",
            className,
          )}
          style={{
            background: "rgba(3, 13, 8, 0.98)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
          }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/logo/mainlogo.png"
          alt="Main Logo"
          width={40}
          height={40}
          priority
          className="h-8 w-auto"
        />
        <Image
          src="/logo/esaplogo.svg"
          alt="ESAP Logo"
          width={65}
          height={21}
          className="h-auto w-auto"
        />
      </div>
    </Link>
  );
};



export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  size = "default",
  onClick,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  [key: string]: any;
}) => {
  if (href) {
    return (
      <Button variant={variant} size={size} className={className} asChild {...props}>
        <Link href={href} onClick={onClick} className="inline-flex items-center gap-2 group">
          <span>{children}</span>
          {variant === "primary" && <ButtonArrow size={size} />}
        </Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};
