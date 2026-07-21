import * as React from "react";

import { cn } from "@/lib/utils";

export type InputSize = "medium" | "small" | "xsmall";

const rootSizeClasses: Record<InputSize, string> = {
  medium: "rounded-10 h-10 px-3 gap-2",
  small: "rounded-lg h-9 px-2.5 gap-2",
  xsmall: "rounded-lg h-8 px-2 gap-1.5",
};

export interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: InputSize;
  hasError?: boolean;
  disabled?: boolean;
}

export function InputRoot({ size = "medium", hasError, disabled, className, ...rest }: InputRootProps) {
  return (
    <div
      className={cn(
        "group/input relative flex w-full items-center bg-white-0 shadow-regular-xs",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-inset before:ring-stroke-soft-200",
        "transition duration-200 ease-out",
        "has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950",
        hasError && "before:ring-error-base has-[input:focus]:shadow-button-error-focus has-[input:focus]:before:ring-error-base",
        disabled && "shadow-none before:ring-transparent bg-weak-50",
        rootSizeClasses[size],
        className,
      )}
      {...rest}
    />
  );
}
InputRoot.displayName = "InputRoot";

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ className, ...rest }, forwardedRef) => {
  return (
    <input
      ref={forwardedRef}
      className={cn(
        "relative w-full bg-transparent text-paragraph-sm text-strong-950 outline-none",
        "placeholder:text-soft-400",
        "disabled:text-disabled-300 disabled:placeholder:text-disabled-300",
        className,
      )}
      {...rest}
    />
  );
});
InputField.displayName = "InputField";

export function InputIcon({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("relative flex size-5 shrink-0 items-center justify-center text-sub-600", "group-has-[input:placeholder-shown]/input:text-soft-400", className)}
      {...rest}
    />
  );
}
InputIcon.displayName = "InputIcon";

export { InputRoot as Root, InputField as Input, InputIcon as Icon };
