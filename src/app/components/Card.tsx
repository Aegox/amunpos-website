import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  text: string;
  accent?: "blue" | "purple";
  className?: string;
}

const accentClasses = {
  blue: "border-brand-100 bg-brand-50 text-primary-base",
  purple: "border-feature-light bg-feature-lighter text-feature-base",
};

const Card: React.FC<CardProps> = ({ title, text, icon, accent = "blue", className }) => {
  return (
    <article
      className={cn(
        "group flex w-full flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-white-0 p-6 shadow-regular-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-regular-md",
        className,
      )}
    >
      <div className={cn("flex size-11 items-center justify-center rounded-xl border", accentClasses[accent])}>{icon}</div>
      <h3 className="text-title-h6 text-strong-950">{title}</h3>
      <p className="text-paragraph-sm text-sub-600">{text}</p>
      <a className="mt-auto flex cursor-pointer items-center gap-1 text-label-sm text-primary-base">
        Aprende más
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
};

export default Card;
