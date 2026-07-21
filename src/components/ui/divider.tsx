import * as React from "react";

import { cn } from "@/lib/utils";

export type DividerVariant = "line" | "line-spacing" | "line-text";

const variantClasses: Record<DividerVariant, string> = {
  line: "h-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-stroke-soft-200",
  "line-spacing": "h-1 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-stroke-soft-200",
  "line-text":
    "gap-2.5 text-subheading-2xs text-soft-400 before:h-px before:w-full before:flex-1 before:bg-stroke-soft-200 after:h-px after:w-full after:flex-1 after:bg-stroke-soft-200",
};

export function Divider({ className, variant = "line", ...rest }: React.HTMLAttributes<HTMLDivElement> & { variant?: DividerVariant }) {
  return <div role="separator" className={cn("relative flex w-full items-center", variantClasses[variant], className)} {...rest} />;
}
Divider.displayName = "Divider";

export { Divider as Root };
