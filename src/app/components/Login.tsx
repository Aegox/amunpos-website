import React from "react";
import Button from "./Button";
import Socials from "./Socials";
import { MdClose } from 'react-icons/md';
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';

const Login: React.FC  = () => {
  return (
    <div className="flex flex-col justify-center items-center z-50 absolute top-1/4 left-1/3 bg-white rounded-3xl shadow-md shadow-white  p-10 pt-12">
      <button className="cursor-pointer p-2 rounded-sm bg-red-400 hover:bg-[var(--body-color)] absolute right-6 top-8 ">
        <MdClose size={20} className="text-white" />
      </button>
      <img src="/logo.png" alt="logo de amunpos" className="h-[20px] w-auto mb-6"/>
      <h1 className="text-center pb-2 text-[var(--heading-color)]  text-[22px] leading-[1.4em] font-bold">Inicia sesión en tu cuenta</h1>
      <p className="w-full text-center text-[var(--body-color)] pb-8">Usa tus credenciales para acceder a tu cuenta</p>
      
<form className="w-full mb-6">
  <div className="relative mb-6">
    <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
    <input type="email" name="email" className="bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Correo electrónico" required />
  </div>
  <div className="relative">
    <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
    <input type="password" name="password" className="bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Contraseña" required />
  </div>
</form>
      <div className="flex justify-between w-full mb-6">
        <label className="flex items-center gap-2 text-[var(--body-color)]">
          <input type="checkbox"/>
          Recordarme
        </label>
        <span className="cursor-pointer text-[var(--primary-color)]">Olvidaste tu contraseña?</span>
      </div>
      <Button text="Iniciar sesión" styles="w-full py-[12px] px-[30px] mb-6"/>
      <span className="cursor-pointer text-[var(--body-color)]">O incia sesión con </span>
      <Socials styles="text-black mb-5 "/>
      <p className="text-[var(--body-color)]">No tienes una cuenta? <strong className="ml-2 cursor-pointer text-[var(--primary-color)]">Registrate Ahora</strong></p>
    </div>
  )
};

export default Login;
