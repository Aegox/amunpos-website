import React from "react";
import RatingStars from "./RatingStars";
import Image from 'next/image';
import { Quote } from "lucide-react";

type TestimonialsCardProps = {
  client: string;
  company: string;
  rating: number;
  review: string;
  img: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ client, rating, review, img, company }) => {
  return (
    <article className="flex h-full w-full flex-col rounded-2xl border border-stroke-soft-200 bg-white-0 p-8 shadow-[0_1px_2px_rgba(13,12,23,0.04)]">
      <Quote className="size-7 text-brand-200" fill="var(--primary-100)" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-sub-600">{review}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-stroke-soft-200 pt-5">
        <Image src={img} alt={`Foto de ${client}`} width={44} height={44} className="size-11 shrink-0 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-strong-950">{client}</h3>
          <span className="text-xs text-soft-400">{company}</span>
        </div>
        <div className="ml-auto">
          <RatingStars rating={rating} />
        </div>
      </div>
    </article>
  );
};

export default TestimonialsCard;
