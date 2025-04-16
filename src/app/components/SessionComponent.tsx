import React from "react";
import Socials from "./Socials";
import { MdClose } from 'react-icons/md';
import { FcGoogle } from "react-icons/fc";

interface SessionComponentProps {
  Component: React.FC;
  title: string;
  description: string;
  question: boolean;
}

const SessionComponent: React.FC<SessionComponentProps> = ({ Component, title, description,  question }) => {
  const handleClose = () => {
    localStorage.removeItem('lastAction'); // Elimina el valor de lastAction
  };

  return (
    <div className="relative 2xl:-top-1/8 w-[95%] md:w-[450px] flex flex-col justify-center items-center z-[102] bg-white rounded-3xl shadow-md shadow-white p-10 pt-12">
      <button 
        className="cursor-pointer p-2 rounded-sm bg-red-400 hover:bg-[var(--body-color)] absolute right-6 top-8 "
        onClick={handleClose} // Llama a handleClose al hacer clic
      >
        <MdClose size={20} className="text-white" />
      </button>
      <img src="/logo.png" alt="logo de amunpos" className="h-[20px] w-auto mb-6"/>
      <h1 className="text-center pb-2 text-[var(--heading-color)]  text-[22px] leading-[1.4em] font-bold">{title}</h1>
      <p className="w-full text-center text-[var(--body-color)] pb-8">{description}</p>
      <Component />
      <span className="cursor-pointer text-[var(--body-color)]">{ title == "Registra tu cuenta" ? "O Registrate con" : "O incia sesión con"}</span>
      <a
        href="https://www.google.com/"
        aria-label="Google"
        target="_blank"
        className={`group border-1 rounded-full my-4 mb-6 p-2 transition duration-300 
        border-black hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md`}
      >
        <FcGoogle size={18} className="transition duration-300" />
      </a>
      {question ? <p className="text-[var(--body-color)]">No tienes una cuenta? <strong className="ml-2 cursor-pointer text-[var(--primary-color)]">Registrate Ahora</strong></p> : <p className="text-[var(--body-color)]">Ya tienes una cuenta? <strong className="ml-2 cursor-pointer text-[var(--primary-color)]">Inicia sesión</strong></p> }
    </div>
  );
};

export default SessionComponent;

