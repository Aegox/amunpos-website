import React from "react";

interface ButtonProps {
  text: string;
  styles?: string;
  theme: "white" | "black";
  variant: "normal" | "inverted";
  absolute?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Agrega la propiedad onClick
}

const Button: React.FC<ButtonProps> = ({ text, styles = "", theme, variant, absolute, onClick }) => {
  let baseBg = "";
  let baseText = "";
  let hoverBg = "";
  let hoverText = "";

  if (theme === "white") {
    if (variant === "normal") {
      baseBg = "bg-white";
      baseText = "text-black";
      hoverBg = "bg-[var(--primary-color)]";
      hoverText = "group-hover:text-white";
    } else {
      baseBg = "bg-[var(--primary-color)]";
      baseText = "text-white";
      hoverBg = "bg-white";
      hoverText = "group-hover:text-black";
    }
  } else {
    if (variant === "normal") {
      baseBg = "bg-black";
      baseText = "text-white";
      hoverBg = "bg-[var(--primary-color)]";
      hoverText = "";
    } else {
      baseBg = "bg-[var(--primary-color)]";
      baseText = "text-white";
      hoverBg = "bg-black";
      hoverText = "";
    }
  }

  return (
    <button
      className={`${styles} ${absolute ? "absolute" : "relative"} overflow-hidden group cursor-pointer rounded-lg px-[20px] py-[8px] ${baseBg} ${baseText}`}
      onClick={onClick} // Agrega el evento onClick al botón
    >
      <span className={`relative z-10 transition-colors duration-300 ${hoverText}`}>
        {text}
      </span>
      <span
        className={`absolute top-0 left-0 w-0 h-full ${hoverBg} transition-all duration-300 group-hover:w-full z-0`}
      />
    </button>
  );
};

export default Button;

