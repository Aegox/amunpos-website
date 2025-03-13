import React from "react";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';


type PricingCardProps = {
  id: number;
  icon: string;
  title: string;
  target: string;
  price: string;
  features: string[];
};



const PricingCard: React.FC<PricingCardProps> = ({ id, icon, title, target, price, features }) => {
  const isDefault = id === 2;

  return (
    <article className={`z-50 overflow-hidden relative text-white group transition-colors duration-400 ${isDefault ? 'bg-[var(--primary-color)]' : 'bg-white'} hover:bg-[var(--primary-color)] w-full px-8 py-10 rounded-[1rem] shadow-2xl`}>
    {isDefault && (<div className="bg-[var(--red-color)] py-1 w-[220px] text-center rotate-40 text-white font-bold top-8 right-[-50px] absolute transform-[45]">Más popular</div>)}
      <header className="flex w-full h-auto gap-4 pl-4">
        <div className={`group-hover:border-white group-hover:bg-white ${isDefault ? 'border-white bg-white' : ''} w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] flex justify-center items-center border-1 rounded-[100%]`}>
          <img src={icon} alt="a icon of price plan" />
        </div>
        <div className="flex flex-col w-auto">
          <h1 className={`pb-1 2xl:w-[90%] xl:w-[100%] text-[${isDefault ? 'white' : 'var(--heading-color)'}] group-hover:text-white text-[1.875rem] leading-[1.4em] font-bold`}>{title}</h1>
          <h3 className={`font-normal 2xl:text-[1.4rem] text-[${isDefault ? 'white' : 'var(--body-color)'}] group-hover:text-white`}>{target}</h3>
        </div>
      </header>
      <div className={`mx-auto h-[0.2px] w-full mt-8 mb-8 ${isDefault ? 'bg-white' : 'bg-gray-300'} group-hover:bg-white`}></div>
      <div className="pl-5 pb-4">
        <h1 className={`2xl:w-[90%] xl:w-[100%] text-[${isDefault ? 'white' : 'var(--heading-color)'}] group-hover:text-white text-[2.4rem] leading-[1.4em] font-bold`}>{price}<span className={`pl-3 text-[1rem] font-normal  text-[${isDefault ? 'white' : 'var(--body-color)'}] group-hover:text-white`}>/ mes</span></h1>
      </div>
    <ul className="flex flex-col gap-4 pb-10 pl-5">
      {features.map((item, index) => (
        <li key={item} className={`flex gap-2 text-[${isDefault ? 'white' : 'var(--body-color)'}] group-hover:text-white font-normal`}>
      {id === 1 && (index >= 3) ? (
        <div className={`flex justify-center items-center rounded-[100%] w-[22px] h-[22px] ${isDefault ? 'bg-white' : 'bg-[var(--primary-color)]'} group-hover:bg-white`}>
          <AiOutlineClose className={`text-[10px] ${isDefault ? 'text-black' : 'text-white'} group-hover:text-black`} />
        </div>
      ) : id === 2 && (index >= features.length - 2) ? (
        <div className={`flex justify-center items-center rounded-[100%] w-[22px] h-[22px] ${isDefault ? 'bg-white' : 'bg-[var(--primary-color)]'} group-hover:bg-white`}>
          <AiOutlineClose className={`text-[10px] ${isDefault ? 'text-black' : 'text-white'} group-hover:text-black`} />
        </div>
      ) : (
        <div className={`flex justify-center items-center rounded-[100%] w-[22px] h-[22px] ${isDefault ? 'bg-white' : 'bg-[var(--primary-color)]'} group-hover:bg-white`}>
          <AiOutlineCheck className={`text-[10px] ${isDefault ? 'text-black' : 'text-white'} group-hover:text-black`} />
        </div>
        )}
          {item}
        </li>
        ))}
      </ul>
      
      <button className={`cursor-pointer w-full rounded-xl py-[12px] px-[30px] ${isDefault ? 'bg-white text-black' : 'bg-[var(--primary-color)] text-white'} group-hover:bg-white group-hover:text-black transition-transform duration-400 hover:-translate-y-1 z-30`}>Escoger plan</button>
    </article>
  );
};

export default PricingCard;

