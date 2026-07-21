import React from "react";
import { RefreshCw } from "lucide-react";

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

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-white shadow-sm ring-1 ring-inset ring-white/15 hover:bg-brand-600 active:bg-brand-700",
  neutral:
    "bg-strong-950 text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-black",
  stroked:
    "bg-white-0 text-strong-950 border border-stroke-sub-300 shadow-sm hover:bg-weak-50 hover:border-stroke-soft-200",
  ghost: "bg-transparent text-strong-950 hover:bg-soft-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

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
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${absolute ? "absolute" : "relative"} ${styles} inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {loading ? (
        <RefreshCw className="size-4 animate-spin" />
      ) : (
        <>
          {icon}
          <span>{text}</span>
          {trailingIcon}
        </>
      )}
    </button>
  );
};

export default Button;
