"use client";

import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon?: string;
  content?: {
    hero?: {
      centerIcon?: string;
      centerIconAlt?: string;
    };
  };
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
    <div className={`${dropdownClass} fixed top-14 left-1/2 -translate-x-1/2 mt-3 w-[78vw] max-w-3xl shadow-lg z-50`}>
      <div className="p-4 md:p-6 relative z-10">
        <div className="grid gap-4 md:grid-cols-[0.9fr,1.4fr] md:gap-6">
          {/* Left Section */}
          <div className="flex flex-col">
            <div className="flex items-start mb-3">
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
            {items.map((item) => {
              const iconSrc = item.icon ?? item.content?.hero?.centerIcon;
              const iconAlt =
                item.content?.hero?.centerIconAlt ?? `${item.name} icon`;

              return (
                <Link
                  key={item.id}
                  href={`${basePath}/${item.slug}`}
                  onClick={onClose}
                  className={`${itemClass} group relative p-2.5 md:p-3 cursor-pointer`}
                >
                  <div className="flex items-center md:items-start gap-2.5 md:gap-3">
                    {iconSrc && (
                      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-opacity-20 group-hover:bg-primary-opacity-30 transition-colors filter-glow-primary-small shrink-0 overflow-hidden">
                        <Image
                          src={iconSrc}
                          alt={iconAlt}
                          width={56}
                          height={56}
                          className="h-10 w-10 md:h-12 md:w-12 object-contain"
                        />
                      </div>
                    )}

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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

