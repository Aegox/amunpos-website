
import React from "react";
import Button from "./Button";
import Socials from "./Socials";
import { MdClose } from 'react-icons/md';

interface SessionComponentProps {
  Component: React.FC;
  title: string;
  description: string;
  buttonText: string;
  question: boolean;
}

const SessionComponent: React.FC<SessionComponentProps> = ({ Component, title, description, buttonText, question }) => {
  const handleClose = () => {
    localStorage.removeItem('lastAction'); // Elimina el valor de lastAction
  };

  return (
    <div className="w-[450px] flex flex-col justify-center items-center z-[102] absolute top-1/6 left-1/3 bg-white rounded-3xl shadow-md shadow-white p-10 pt-12">
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
      <Button text={buttonText} styles="w-full py-[12px] px-[30px] mb-8"/>
      <span className="cursor-pointer text-[var(--body-color)]">O incia sesión con </span>
      <Socials styles="text-black mb-5 "/>
      {question && <p className="text-[var(--body-color)]">No tienes una cuenta? <strong className="ml-2 cursor-pointer text-[var(--primary-color)]">Registrate Ahora</strong></p>}
    </div>
  );
};

export default SessionComponent;

