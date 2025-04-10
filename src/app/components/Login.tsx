import React from "react";
import { MdOutlineEmail } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';

const Login: React.FC  = () => {
  return (
      <form className="w-full mb-6">
        <div className="relative mb-6">
          <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
          <input type="email" name="email" className="bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Correo electrónico" required />
        </div>
        <div className="relative mb-6 ">
          <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
          <input type="password" name="password" className="bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Contraseña" required />
        </div>
        <div className="flex justify-between w-full">
         <label className="text-[14px] md:text-[1rem] flex items-center gap-2 text-[var(--body-color)]">
          <input type="checkbox"/>
          Recordarme
        </label>
          <span className="text-[14px] md:text-[1rem] cursor-pointer text-[var(--primary-color)]">Olvidaste tu contraseña?</span>
      </div>
      </form>
  )
};

export default Login;
