import React from "react";
import { MdClose } from 'react-icons/md';
import Image from 'next/image';

interface SessionComponentProps {
  Component: React.ComponentType;
  title: string;
  description: string;
  buttonText: string;
  question: boolean;
}

const SessionComponent: React.FC<SessionComponentProps> = ({ Component, title, description,  question }) => {
  const handleClose = () => {
    localStorage.removeItem('lastAction'); // Elimina el valor de lastAction
  };
  const handleTo = (type: string) => {
    localStorage.setItem("lastAction", type)
  }

  return (
    <div className="relative 2xl:-top-1/8 w-[95%] md:w-[450px] flex flex-col justify-center items-center z-[102] bg-white rounded-3xl shadow-md shadow-white p-10 pt-12">
      <button 
        className="cursor-pointer p-2 rounded-sm bg-red-400 hover:bg-[var(--body-color)] absolute right-6 top-8 "
        onClick={handleClose} // Llama a handleClose al hacer clic
      >
        <MdClose size={20} className="text-white" />
      </button>
      <Image src="/logo.png" alt="logo de amunpos" width={150} height={20} className="h-[20px] w-auto mb-6"/>
      <h1 className="text-center pb-2 text-[var(--heading-color)]  text-[22px] leading-[1.4em] font-bold">{title}</h1>
      <p className="w-full text-center text-[var(--body-color)] pb-8">{description}</p>
      <Component />
      {question ? <p className="text-[var(--body-color)] mt-6">No tienes una cuenta? <button onClick={()=> { handleTo("register")}} ><strong className="ml-2 cursor-pointer text-[var(--primary-color)] mt-6">Registrate Ahora</strong></button></p> : <p className="text-[var(--body-color)] mt-6">Ya tienes una cuenta? <button onClick={()=>{handleTo("login")}} ><strong className="ml-2 cursor-pointer text-[var(--primary-color)]">Inicia sesión</strong></button></p> }
    </div>
  );
};

export default SessionComponent;

