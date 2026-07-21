"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

// Paths reales de AlignUI (ver design-system/alignui/icons/). Los precalculó
// con getTotalLength() para animar el trazo como si se dibujara a mano.
const TOTAL_LENGTH_CHECK = 11.313708305358887;
const TOTAL_LENGTH_INDETERMINATE = 8;

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 3.5L4 6.5L9 1.5" strokeWidth="1.5" className="stroke-static-white" />
    </svg>
  );
}

function IconIndeterminate(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 1H8" strokeWidth="1.5" className="stroke-static-white" />
    </svg>
  );
}

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, checked, ...rest }, forwardedRef) => {
    return (
      <CheckboxPrimitive.Root
        ref={forwardedRef}
        checked={checked}
        className={cn("group/checkbox relative flex size-5 shrink-0 items-center justify-center outline-none", "focus:outline-none", className)}
        {...rest}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="2"
            y="2"
            width="16"
            height="16"
            rx="4"
            className={cn(
              "fill-soft-200 transition duration-200 ease-out",
              "group-hover/checkbox:fill-sub-300",
              "group-focus/checkbox:fill-primary-base",
              "group-data-[state=checked]/checkbox:fill-primary-base",
              "group-data-[state=indeterminate]/checkbox:fill-primary-base",
              "group-hover/checkbox:group-data-[state=checked]/checkbox:fill-primary-darker",
              "group-hover/checkbox:group-data-[state=indeterminate]/checkbox:fill-primary-darker",
              "group-disabled/checkbox:fill-soft-200",
              "group-disabled/checkbox:group-data-[state=checked]/checkbox:fill-soft-200",
            )}
          />
          <rect
            x="3.5"
            y="3.5"
            width="13"
            height="13"
            rx="2.6"
            className={cn(
              "fill-white-0 transition duration-200 ease-out",
              "group-disabled/checkbox:hidden",
              "group-data-[state=checked]/checkbox:opacity-0",
              "group-data-[state=indeterminate]/checkbox:opacity-0",
            )}
          />
        </svg>
        <CheckboxPrimitive.Indicator forceMount className="[&_path]:transition-all [&_path]:duration-300 [&_path]:ease-out [&_svg]:opacity-0">
          <IconCheck
            className={cn(
              "absolute left-1/2 top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2",
              "group-data-[state=checked]/checkbox:opacity-100",
              "group-data-[state=checked]/checkbox:[&>path]:[stroke-dashoffset:0]",
              "[&>path]:[stroke-dasharray:var(--total-length)] [&>path]:[stroke-dashoffset:var(--total-length)]",
              "group-data-[state=indeterminate]/checkbox:invisible",
            )}
            style={{ ["--total-length" as string]: TOTAL_LENGTH_CHECK } as React.CSSProperties}
          />
          <IconIndeterminate
            className={cn(
              "absolute left-1/2 top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2",
              "group-data-[state=indeterminate]/checkbox:opacity-100",
              "group-data-[state=indeterminate]/checkbox:[&>path]:[stroke-dashoffset:0]",
              "[&>path]:[stroke-dasharray:var(--total-length)] [&>path]:[stroke-dashoffset:var(--total-length)]",
              "invisible group-data-[state=indeterminate]/checkbox:visible",
            )}
            style={{ ["--total-length" as string]: TOTAL_LENGTH_INDETERMINATE } as React.CSSProperties}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox as Root };
