import React from "react";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text, icon }) => {
  return (
    <article className="group flex w-full flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-white-0 p-6 shadow-[0_1px_2px_rgba(13,12,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(13,12,23,0.16)] sm:w-[45%] xl:w-[22%]">
      <div className="flex size-11 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-strong-950">{title}</h3>
      <p className="text-sm leading-relaxed text-sub-600">{text}</p>
      <a className="mt-auto flex cursor-pointer items-center gap-1 text-sm font-medium text-brand-600">
        Aprende más
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
};

export default Card;
