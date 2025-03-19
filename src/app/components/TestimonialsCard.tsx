import React from "react";
import RatingStars from "./RatingStars";

type TestimonialsCardProps = {
  client: string;
  company: string;
  rating: string;
  review: string;
  img: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ client , rating , review , img ,company }) => {
  return (
    <article className="2xl:max-w-[340px] w-full flex flex-col bg-white rounded-xl shadow-features p-[50px]">
      <header className="flex gap-3 pb-5 w-full">
        <img src={img} alt="a client photo of amunpos" className="w-[60px] h-[60px]"/>
        <div className="flex flex-col">
          <h3 className="text-[var(--heading-color)] w-full text-[22px] leading-[1.4em] font-bold">{client}</h3>
          <span className="text-[var(--body-color)] font-normal">{company}</span>
        </div>
      </header>
        <p className="text-[var(--body-color)] font-normal mb-4">{review}</p>
      <RatingStars rating={rating} />
    </article>
  );
};

export default TestimonialsCard;
