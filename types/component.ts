/**
 * Component-specific type definitions
 */

import type { ReactNode } from "react";

export interface ProductHaloFlowNode {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface ProductHaloFlowProps {
  leftNodes?: ProductHaloFlowNode[];
  rightNodes?: ProductHaloFlowNode[];
  centerNode?: {
    id?: string;
    title?: string;
    icon?: ReactNode;
  };
  haloScale?: number;
}
