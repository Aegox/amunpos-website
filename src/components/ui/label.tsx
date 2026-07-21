"use client";

import * as React from "react";
import * as LabelPrimitives from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

export const LabelRoot = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> & { disabled?: boolean }
>(({ className, disabled, ...rest }, forwardedRef) => {
  return (
    <LabelPrimitives.Root
      ref={forwardedRef}
      className={cn("group flex cursor-pointer items-center gap-px text-label-sm text-strong-950", "aria-disabled:text-disabled-300", className)}
      aria-disabled={disabled}
      {...rest}
    />
  );
});
LabelRoot.displayName = "LabelRoot";

export function LabelAsterisk({ className, children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-primary-base", "group-aria-disabled:text-disabled-300", className)} {...rest}>
      {children || "*"}
    </span>
  );
}
LabelAsterisk.displayName = "LabelAsterisk";

export function LabelSub({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-paragraph-sm text-sub-600", "group-aria-disabled:text-disabled-300", className)} {...rest}>
      {children}
    </span>
  );
}
LabelSub.displayName = "LabelSub";

export { LabelRoot as Root, LabelAsterisk as Asterisk, LabelSub as Sub };
