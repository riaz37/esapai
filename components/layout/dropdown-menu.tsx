"use client";

import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface DropdownMenuProps {
  title: string;
  description: string;
  items: MenuItem[];
  basePath: string;
  dropdownClass: string;
  itemClass: string;
  isOpen: boolean;
  onClose: () => void;
}

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
  if (!isOpen) return null;

  return (
    <div className={`${dropdownClass} fixed top-20 left-1/2 -translate-x-1/2 mt-4 w-[95vw] max-w-6xl shadow-lg z-50`}>
      <div className="p-8 md:p-12 relative z-10">
        <div className="grid md:grid-cols-[1fr,2fr] gap-8 lg:gap-12">
          {/* Left Section */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(19, 245, 132)" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                {title}
              </h2>
            </div>
            <p className="text-light-gray text-white-opacity-70 text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Section - Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`${basePath}/${item.slug}`}
                onClick={onClose}
                className={`${itemClass} group relative p-4 md:p-6 cursor-pointer`}
              >
                <div className="flex items-center md:items-start gap-4 md:gap-5">
                  {/* Icon Placeholder */}
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-primary-opacity-20 group-hover:bg-primary-opacity-30 transition-colors filter-glow-primary-small shrink-0"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-primary rounded-full" />
                  </div>

                  <div className="flex-1">
                    {/* Item Name */}
                    <h3 className="text-base md:text-lg font-semibold text-light-gray mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    {/* Item Description */}
                    <p className="text-sm text-white-opacity-70 leading-relaxed">
                      {item.description}
                    </p>
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

