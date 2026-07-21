import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "neutral" | "error";
export type ButtonMode = "filled" | "stroke" | "lighter" | "ghost";
export type ButtonSize = "medium" | "small" | "xsmall" | "xxsmall";

const sizeClasses: Record<ButtonSize, string> = {
  medium: "h-10 gap-3 rounded-10 px-3.5 text-label-sm",
  small: "h-9 gap-3 rounded-lg px-3 text-label-sm",
  xsmall: "h-8 gap-2.5 rounded-lg px-2.5 text-label-sm",
  xxsmall: "h-7 gap-2.5 rounded-lg px-2 text-label-sm",
};

const variantClasses: Record<ButtonVariant, Record<ButtonMode, string>> = {
  primary: {
    filled: "bg-primary-base text-static-white hover:bg-primary-darker focus-visible:shadow-button-primary-focus",
    stroke: "ring-1 ring-inset bg-white-0 text-primary-base ring-primary-base hover:bg-primary-alpha-10 hover:ring-transparent focus-visible:shadow-button-primary-focus",
    lighter: "ring-1 ring-inset bg-primary-alpha-10 text-primary-base ring-transparent hover:bg-white-0 hover:ring-primary-base focus-visible:bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base",
    ghost: "ring-1 ring-inset bg-transparent text-primary-base ring-transparent hover:bg-primary-alpha-10 focus-visible:bg-white-0 focus-visible:shadow-button-primary-focus focus-visible:ring-primary-base",
  },
  neutral: {
    filled: "bg-strong-950 text-white-0 hover:bg-surface-800 focus-visible:shadow-button-important-focus",
    stroke: "ring-1 ring-inset bg-white-0 text-sub-600 shadow-regular-xs ring-stroke-soft-200 hover:bg-weak-50 hover:text-strong-950 hover:shadow-none hover:ring-transparent focus-visible:text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
    lighter: "ring-1 ring-inset bg-weak-50 text-sub-600 ring-transparent hover:bg-white-0 hover:text-strong-950 hover:shadow-regular-xs hover:ring-stroke-soft-200 focus-visible:bg-white-0 focus-visible:text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
    ghost: "ring-1 ring-inset bg-transparent text-sub-600 ring-transparent hover:bg-weak-50 hover:text-strong-950 focus-visible:bg-white-0 focus-visible:text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950",
  },
  error: {
    filled: "bg-error-base text-static-white hover:bg-error-dark focus-visible:shadow-button-error-focus",
    stroke: "ring-1 ring-inset bg-white-0 text-error-base ring-error-base hover:bg-error-alpha-10 hover:ring-transparent focus-visible:shadow-button-error-focus",
    lighter: "ring-1 ring-inset bg-error-alpha-10 text-error-base ring-transparent hover:bg-white-0 hover:ring-error-base focus-visible:bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base",
    ghost: "ring-1 ring-inset bg-transparent text-error-base ring-transparent hover:bg-error-alpha-10 focus-visible:bg-white-0 focus-visible:shadow-button-error-focus focus-visible:ring-error-base",
  },
};

export interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  mode?: ButtonMode;
  size?: ButtonSize;
  asChild?: boolean;
}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  ({ variant = "primary", mode = "filled", size = "medium", asChild, className, ...rest }, forwardedRef) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={forwardedRef}
        className={cn(
          "group relative inline-flex items-center justify-center whitespace-nowrap outline-none",
          "transition duration-200 ease-out",
          "focus:outline-none",
          "disabled:pointer-events-none disabled:bg-weak-50 disabled:text-disabled-300 disabled:ring-transparent",
          sizeClasses[size],
          variantClasses[variant][mode],
          className,
        )}
        {...rest}
      />
    );
  },
);
ButtonRoot.displayName = "ButtonRoot";

export function ButtonIcon({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("-mx-1 flex size-5 shrink-0 items-center justify-center", className)} {...rest} />;
}
ButtonIcon.displayName = "ButtonIcon";

export { ButtonRoot as Root, ButtonIcon as Icon };
