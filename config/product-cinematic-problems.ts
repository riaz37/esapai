import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  FileWarning,
  XCircle,
  Zap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface CinematicProblemConfig {
  id: number;
  icon: LucideIcon;
  spreadPos: { x: number; y: number; rotate: number };
  solIcon: LucideIcon;
}

const SPREAD_POSITIONS = [
  { x: -300, y: -40, rotate: -6 },
  { x: 20, y: 30, rotate: 2 },
  { x: 320, y: -20, rotate: 8 },
];

const ERP_ITEMS: CinematicProblemConfig[] = [
  { id: 1, icon: AlertCircle, spreadPos: SPREAD_POSITIONS[0], solIcon: Zap },
  { id: 2, icon: FileWarning, spreadPos: SPREAD_POSITIONS[1], solIcon: Sparkles },
  { id: 3, icon: XCircle, spreadPos: SPREAD_POSITIONS[2], solIcon: CheckCircle2 },
];

const AI_FRAMEWORK_ITEMS: CinematicProblemConfig[] = [
  { id: 1, icon: AlertCircle, spreadPos: SPREAD_POSITIONS[0], solIcon: Zap },
  { id: 2, icon: FileWarning, spreadPos: SPREAD_POSITIONS[1], solIcon: Sparkles },
  { id: 3, icon: XCircle, spreadPos: SPREAD_POSITIONS[2], solIcon: CheckCircle2 },
];

const ZAKRA_ITEMS: CinematicProblemConfig[] = [
  { id: 1, icon: AlertCircle, spreadPos: SPREAD_POSITIONS[0], solIcon: Zap },
  { id: 2, icon: FileWarning, spreadPos: SPREAD_POSITIONS[1], solIcon: Sparkles },
  { id: 3, icon: XCircle, spreadPos: SPREAD_POSITIONS[2], solIcon: CheckCircle2 },
];

const JAWIB_ITEMS: CinematicProblemConfig[] = [
  { id: 1, icon: AlertCircle, spreadPos: SPREAD_POSITIONS[0], solIcon: Zap },
  { id: 2, icon: FileWarning, spreadPos: SPREAD_POSITIONS[1], solIcon: Sparkles },
  { id: 3, icon: XCircle, spreadPos: SPREAD_POSITIONS[2], solIcon: CheckCircle2 },
];

const FASIH_ITEMS: CinematicProblemConfig[] = [
  { id: 1, icon: AlertCircle, spreadPos: SPREAD_POSITIONS[0], solIcon: Zap },
  { id: 2, icon: FileWarning, spreadPos: SPREAD_POSITIONS[1], solIcon: Sparkles },
  { id: 3, icon: XCircle, spreadPos: SPREAD_POSITIONS[2], solIcon: CheckCircle2 },
];

const ITEMS_BY_SLUG: Record<string, CinematicProblemConfig[]> = {
  erp: ERP_ITEMS,
  "ai-framework": AI_FRAMEWORK_ITEMS,
  zakra: ZAKRA_ITEMS,
  jawib: JAWIB_ITEMS,
  fasih: FASIH_ITEMS,
};

const DEFAULT_ITEMS = ERP_ITEMS;

export function getProductCinematicItems(slug: string): CinematicProblemConfig[] {
  return ITEMS_BY_SLUG[slug] ?? DEFAULT_ITEMS;
}
