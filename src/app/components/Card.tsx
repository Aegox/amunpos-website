import React from "react";

interface CardProps {
  title: string;
  icon: string;
  text: string
}

const Card: React.FC<CardProps> = ({ title, text, icon }) => {
  return (
    <article className="flex flex-col justify-between gap-3 bg-white w-full sm:w-[45%] xl:w-[20%] px-[20px] pt-[45px] pb-[40px] rounded-xl transition-transform duration-400 hover:shadow-2xl hover:-translate-y-2 shadow-features z-30">
      <img src={icon} alt="a shop svg for section features" className="h-[55px] w-[57px]"/>
      <h3 className="text-[var(--heading-color)] text-[1.4rem]">{title}</h3>
      <p className="text-[var(--body-color)]">{text}</p>
      <div className="flex items-center gap-1">
        <a className="text-[var(--primary-color)] cursor-pointer">Aprende más</a>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.147 1.75739C10.147 1.28795 9.76649 0.907395 9.29705 0.907394L1.64705 0.907394C1.17761 0.907395 0.797048 1.28795 0.797048 1.75739C0.797048 2.22684 1.17761 2.60739 1.64705 2.60739H8.44705V9.4074C8.44705 9.87684 8.82761 10.2574 9.29705 10.2574C9.76649 10.2574 10.147 9.87684 10.147 9.4074L10.147 1.75739ZM1.41281 10.8437L9.89809 2.35844L8.69601 1.15635L0.210727 9.64163L1.41281 10.8437Z" fill="var(--primary-color)"></path>
        </svg>
      </div>
    </article>
  );
};

export default Card;
