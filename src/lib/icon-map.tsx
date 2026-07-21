import {
  BadgeCheck,
  Bed,
  Briefcase,
  Clock,
  Cross,
  Factory,
  type LucideIcon,
  Palette,
  Ruler,
  Shirt,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  factory: Factory,
  clock: Clock,
  shirt: Shirt,
  truck: Truck,
  briefcase: Briefcase,
  "badge-check": BadgeCheck,
  cross: Cross,
  users: Users,
  "shield-check": ShieldCheck,
  palette: Palette,
  ruler: Ruler,
  bed: Bed,
  sparkles: Sparkles,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
