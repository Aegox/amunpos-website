import React from "react";
import { Check } from 'lucide-react';
import Button from "./Button";

type PricingCardProps = {
  id: number;
  title: string;
  target: string;
  price: string;
  features: string[];
  popular?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({ title, target, price, features, popular }) => {
  return (
    <article
      className={`relative flex w-full flex-col rounded-2xl border bg-white-0 p-8 transition-shadow duration-300 md:w-[80%] xl:w-1/3 ${
        popular
          ? "border-brand-500 shadow-[0_20px_48px_-24px_rgba(12,113,194,0.35)]"
          : "border-stroke-soft-200 shadow-[0_1px_2px_rgba(13,12,23,0.04)]"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white shadow-sm">
          Más popular
        </span>
      )}
      <h3 className="text-xl font-medium text-strong-950">{title}</h3>
      <p className="mt-1 text-sm text-sub-600">{target}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-medium tracking-[-0.02em] text-strong-950">{price}</span>
        <span className="text-sm text-sub-600">/ mes</span>
      </div>

      <Button
        variant={popular ? "primary" : "stroked"}
        text="Escoger plan"
        styles="mt-6 w-full"
      />

      <div className="my-7 h-px w-full bg-stroke-soft-200" />

      <ul className="flex flex-col gap-3.5">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-sub-600">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PricingCard;
