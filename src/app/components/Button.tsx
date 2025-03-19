import React from "react";

interface ButtonProps {
  text: string;
  styles?: string;
  theme: "white" | "black";
  variant: "normal" | "inverted";
  absolute?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, styles = "", theme, variant , absolute }) => {
  let baseBg = "";
  let baseText = "";
  let hoverBg = "";
  let hoverText = "";

  if (theme === "white") {
    if (variant === "normal") {
      // Tema white, variante normal: fondo blanco, texto negro.
      // En hover: fondo primario y texto blanco.
      baseBg = "bg-white";
      baseText = "text-black";
      hoverBg = "bg-[var(--primary-color)]";
      hoverText = "group-hover:text-white";
    } else {
      // Tema white, variante invertida: fondo primario, texto blanco.
      // En hover: fondo blanco y texto negro.
      baseBg = "bg-[var(--primary-color)]";
      baseText = "text-white";
      hoverBg = "bg-white";
      hoverText = "group-hover:text-black";
    }
  } else {
    // theme === "black"
    if (variant === "normal") {
      // Tema black, variante normal: fondo negro, texto blanco.
      // En hover: fondo primario y texto se mantiene blanco.
      baseBg = "bg-black";
      baseText = "text-white";
      hoverBg = "bg-[var(--primary-color)]";
      hoverText = "";
    } else {
      // Tema black, variante invertida: fondo primario, texto blanco.
      // En hover: fondo negro y texto se mantiene blanco.
      baseBg = "bg-[var(--primary-color)]";
      baseText = "text-white";
      hoverBg = "bg-black";
      hoverText = "";
    }
  }

  return (
    <button
      className={`${styles} ${ absolute ? "absolute" : "relative"} overflow-hidden group cursor-pointer rounded-lg px-[20px] py-[8px] ${baseBg} ${baseText}`}
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

