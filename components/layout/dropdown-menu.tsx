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
    <div className={`${dropdownClass} fixed top-14 left-1/2 -translate-x-1/2 mt-1 w-[78vw] max-w-3xl shadow-lg z-50`}>
      <div className="p-4 md:p-6 relative z-10">
        <div className="grid gap-4 md:grid-cols-[0.9fr,1.4fr] md:gap-6">
          {/* Left Section */}
          <div className="flex flex-col">
            <div className="flex items-start gap-2.5 mb-3">
              <div className="shrink-0 w-9 h-9 flex items-center justify-center">
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(19, 245, 132)" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                {title}
              </h2>
            </div>
            <p className="text-light-gray text-white-opacity-70 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Section - Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`${basePath}/${item.slug}`}
                onClick={onClose}
                className={`${itemClass} group relative p-2.5 md:p-3 cursor-pointer`}
              >
                <div className="flex items-center md:items-start gap-2.5 md:gap-3">
                  {/* Icon Placeholder */}
                  <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-primary-opacity-20 group-hover:bg-primary-opacity-30 transition-colors filter-glow-primary-small shrink-0">
                    <div
                      className="border-2 border-primary rounded-full"
                      style={{ width: "1.125rem", height: "1.125rem" }}
                    />
                  </div>

                  <div className="flex-1">
                    {/* Item Name */}
                    <h3 className="text-xs md:text-sm font-semibold text-light-gray mb-0.5 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    {/* Item Description */}
                    <p className="text-[0.7rem] md:text-xs text-white-opacity-70 leading-relaxed">
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

