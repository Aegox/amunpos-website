import React from "react";
import { RiRefreshLine } from "@remixicon/react";
import { ButtonRoot, ButtonIcon, type ButtonSize as UiButtonSize } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "neutral" | "stroked" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  text: string;
  styles?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit";
  absolute?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
}

// AlignUI Button real solo define medium/small/xsmall/xxsmall (ver
// design-system/alignui/components/button.tsx). "lg" es una extensión propia
// para los CTA grandes del hero/CallAction, siguiendo la misma familia visual
// (rounded-10, mismo text-label-*).
const sizeMap: Record<ButtonSize, UiButtonSize | "large"> = {
  sm: "small",
  md: "medium",
  lg: "large",
};

const largeClasses = "h-12 gap-3 rounded-10 px-5 text-label-md";

const Button: React.FC<ButtonProps> = ({
  text,
  styles = "",
  variant = "primary",
  size = "md",
  type = "button",
  absolute,
  icon,
  trailingIcon,
  onClick,
  loading,
  disabled,
}) => {
  const mode = variant === "stroked" ? "stroke" : variant === "ghost" ? "ghost" : "filled";
  const buttonVariant = variant === "stroked" || variant === "ghost" ? "neutral" : variant;
  const mappedSize = sizeMap[size];

  return (
    <ButtonRoot
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      variant={buttonVariant}
      mode={mode}
      size={mappedSize === "large" ? "medium" : mappedSize}
      className={cn(absolute ? "absolute" : "relative", "cursor-pointer disabled:cursor-not-allowed", mappedSize === "large" && largeClasses, styles)}
    >
      {loading ? (
        <ButtonIcon>
          <RiRefreshLine className="size-4 animate-spin" />
        </ButtonIcon>
      ) : (
        <>
          {icon && <ButtonIcon>{icon}</ButtonIcon>}
          <span>{text}</span>
          {trailingIcon && <ButtonIcon>{trailingIcon}</ButtonIcon>}
        </>
      )}
    </ButtonRoot>
  );
};

export default Button;
