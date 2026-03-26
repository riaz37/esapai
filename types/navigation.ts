/**
 * Navigation-related type definitions
 */

export type MobileMenuItem = {
  id: string;
  name: string;
  description?: string;
  slug: string;
};

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  menuDescription?: string;
  slug: string;
  icon?: string;
  content?: object;
}

export interface DropdownMenuProps {
  title: string;
  description: string;
  items: MenuItem[];
  basePath: string;
  dropdownClass: string;
  itemClass: string;
  isOpen: boolean;
  onClose: () => void;
}
