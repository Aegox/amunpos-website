import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, hasError, disabled, ...rest }, forwardedRef) => {
  return (
    <textarea
      ref={forwardedRef}
      disabled={disabled}
      className={cn(
        "min-h-28 w-full resize-none rounded-xl bg-white-0 px-3 py-2.5 text-paragraph-sm text-strong-950 shadow-regular-xs outline-none",
        "ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out",
        "placeholder:text-soft-400",
        "hover:[&:not(:focus)]:bg-weak-50",
        !hasError && ["hover:[&:not(:focus)]:ring-transparent", "focus:shadow-button-important-focus focus:ring-stroke-strong-950"],
        hasError && ["ring-error-base", "focus:shadow-button-error-focus focus:ring-error-base"],
        disabled && "bg-weak-50 text-disabled-300 ring-transparent placeholder:text-disabled-300",
        className,
      )}
      {...rest}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea as Root };
