// lucide-react v1 does not currently expose its declaration file to this
// TypeScript configuration. Keep this compatibility shim until the package
// restores its bundled type entrypoint.
declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  export type LucideIcon = ComponentType<
    SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
  >;

  export const AtSign: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const BadgeCheck: LucideIcon;
  export const Bed: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Building2: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const CircleHelp: LucideIcon;
  export const Clock: LucideIcon;
  export const Cross: LucideIcon;
  export const Factory: LucideIcon;
  export const Globe: LucideIcon;
  export const Image: LucideIcon;
  export const LockKeyhole: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MonitorCog: LucideIcon;
  export const PackageOpen: LucideIcon;
  export const Palette: LucideIcon;
  export const Phone: LucideIcon;
  export const Quote: LucideIcon;
  export const Ruler: LucideIcon;
  export const Save: LucideIcon;
  export const Settings2: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Shirt: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Truck: LucideIcon;
  export const Users: LucideIcon;
  export const UsersRound: LucideIcon;
  export const X: LucideIcon;
}
