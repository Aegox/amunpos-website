import React from "react";

interface ButtonProps {
  hover: string;
  background: string;
  text: string;
  styles: string;
}

const Button: React.FC<ButtonProps> = ({ hover, background, text , styles}) => {
  return (
    <button 
      className={`${styles} cursor-pointer text-white ${background === "black" ? "bg-black" : "bg-[var(--primary-color)]"} rounded-lg px-[20px] py-[8px] relative overflow-hidden group`}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className={`absolute top-0 left-0 w-0 h-full ${hover === "black" ? "bg-black" : "bg-[var(--primary-color)]"} transition-all duration-300 group-hover:w-full z-0`}
      />
    </button>
  );
};

export default Button;

