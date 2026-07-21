import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  icon?: React.ReactNode;
  text: string;
  tone?: "blue" | "purple";
  className?: string;
}

const toneClasses = {
  blue: "border-brand-200 bg-brand-50 text-primary-dark",
  purple: "border-feature-light bg-feature-lighter text-feature-dark",
};

const Eyebrow: React.FC<EyebrowProps> = ({ icon, text, tone = "blue", className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-label-sm",
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {text}
    </span>
  );
};

export default Eyebrow;
