import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeColor = "gray" | "blue" | "purple" | "green" | "red" | "orange";
export type BadgeVariant = "filled" | "light" | "lighter" | "stroke";
export type BadgeSize = "small" | "medium";

// Mapeo real de AlignUI: el color "purple" de UI es el token semántico
// "feature" — su convención para resaltar capacidades avanzadas (ver
// design-system/alignui/components/badge.tsx). Se usa aquí para IA.
const colorClasses: Record<BadgeColor, Record<BadgeVariant, string>> = {
  gray: {
    filled: "bg-strong-950 text-static-white",
    light: "bg-soft-200 text-sub-600",
    lighter: "bg-weak-50 text-sub-600",
    stroke: "text-sub-600",
  },
  blue: {
    filled: "bg-primary-base text-static-white",
    light: "bg-primary-alpha-10 text-primary-dark",
    lighter: "bg-brand-50 text-primary-base",
    stroke: "text-primary-base",
  },
  purple: {
    filled: "bg-feature-base text-static-white",
    light: "bg-feature-light text-feature-dark",
    lighter: "bg-feature-lighter text-feature-base",
    stroke: "text-feature-base",
  },
  green: {
    filled: "bg-emerald-600 text-static-white",
    light: "bg-emerald-100 text-emerald-800",
    lighter: "bg-emerald-50 text-emerald-600",
    stroke: "text-emerald-600",
  },
  red: {
    filled: "bg-error-base text-static-white",
    light: "bg-error-alpha-10 text-error-dark",
    lighter: "bg-error-alpha-10 text-error-base",
    stroke: "text-error-base",
  },
  orange: {
    filled: "bg-orange-500 text-static-white",
    light: "bg-orange-100 text-orange-800",
    lighter: "bg-orange-50 text-orange-600",
    stroke: "text-orange-600",
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  small: "h-4 gap-1.5 px-2 text-subheading-2xs uppercase",
  medium: "h-5 gap-1.5 px-2 text-label-xs",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({ color = "gray", variant = "filled", size = "small", className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full leading-none",
        variant === "stroke" && "ring-1 ring-inset ring-current",
        sizeClasses[size],
        colorClasses[color][variant],
        className,
      )}
      {...rest}
    />
  );
}
Badge.displayName = "Badge";

export { Badge as Root };
