import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg"> & { size?: number };

function IconBase({ children, size = 24, viewBox = "0 0 24 24", className, ...props }: IconProps & { viewBox?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className} {...props}>
      {children}
    </svg>
  );
}

export function Globe({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconBase>
  );
}

export function Rocket({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </IconBase>
  );
}

export function Trophy({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </IconBase>
  );
}

export function GraduationCap({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </IconBase>
  );
}

export function Book({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </IconBase>
  );
}

export function Code({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </IconBase>
  );
}

export function ChartBar({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </IconBase>
  );
}

export function Users({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function HeartHandshake({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </IconBase>
  );
}

export function ShieldCheck({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </IconBase>
  );
}

export function MapPin({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

export function Mail({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8l8 5 8-5" />
    </IconBase>
  );
}

export function Phone({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  );
}

export function Clock({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </IconBase>
  );
}

export function Target({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  );
}

export function Sparkles({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="M19 17l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
    </IconBase>
  );
}

export function CheckCircle({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </IconBase>
  );
}

export function ArrowRight({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </IconBase>
  );
}

export function Building({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </IconBase>
  );
}

export function Lightbulb({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5C7.9 12.5 8.6 14 9 14" />
      <path d="M9 14h6" />
      <path d="M10 18h4" />
      <path d="M12 22v-4" />
    </IconBase>
  );
}

export function Monitor({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </IconBase>
  );
}

export function Coffee({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </IconBase>
  );
}

export function Puzzle({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.704.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.611-1.611a2.404 2.404 0 0 1 1.704-.706c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.969a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.968 1.02Z" />
    </IconBase>
  );
}

export function Wrench({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </IconBase>
  );
}

export function Headphones({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M3 11v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a5 5 0 0 1 10 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 0 0-16 0Z" />
      <path d="M17 17v1a2 2 0 0 1-2 2h-1" />
      <path d="M7 18v-1" />
    </IconBase>
  );
}

export function Computer({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </IconBase>
  );
}

export function Calendar({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconBase>
  );
}

export function Star({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </IconBase>
  );
}

export function Search({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </IconBase>
  );
}

export function MenuIcon({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </IconBase>
  );
}

export function X({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconBase>
  );
}

export function ChevronRight({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </IconBase>
  );
}

export function ChevronDown({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <polyline points="6 9 12 15 18 9" />
    </IconBase>
  );
}

export function Sun({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </IconBase>
  );
}

export function Moon({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </IconBase>
  );
}

export function FileText({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </IconBase>
  );
}

export function HelpCircle({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  );
}

export function Facebook({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
  );
}

export function Twitter({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </IconBase>
  );
}

export function Linkedin({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  );
}

export function Youtube({ size, className, ...props }: IconProps) {
  return (
    <IconBase size={size} className={className} {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </IconBase>
  );
}
