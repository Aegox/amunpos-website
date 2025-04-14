
'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

interface FormData {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const [loginError, setLoginError] = useState("");
  const { register, handleSubmit, reset } = useForm<FormData>();

  // Función simulada del login, que en este ejemplo siempre retorna false para mostrar el error.
  const fakeLogin = async (data: FormData): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false); // Simula que el backend retorna error
      }, 1000);
    });
  };

  const onSubmit = async (data: FormData) => {
    // Limpia cualquier error previo
    setLoginError("");
    console.log("Datos del formulario:", data);

    // Aquí llamarías a tu backend. La función fakeLogin es solo para simular la llamada.
    const isLoginSuccessful = await fakeLogin(data);
    if (!isLoginSuccessful) {
      setLoginError("Contraseña o correo incorrectos");
    } else {
      // Manejar login exitoso
      setLoginError("");
    }
    reset();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative mb-6">
        <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type="email"
          {...register("email")}
          className="bg-white block w-full py-3 pl-12 text-gray-700 placeholder-gray-600 border border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Correo electrónico"
          required
        />
      </div>
      <div className="relative mb-6">
        <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type="password"
          {...register("password")}
          className="bg-white block w-full py-3 pl-12 text-gray-700 placeholder-gray-600 border border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Contraseña"
          required
        />
      </div>
      <div className="flex justify-between w-full">
        <label className="text-sm md:text-base flex items-center gap-2 text-[var(--body-color)]">
          <input type="checkbox" {...register("remember")} />
          Recordarme
        </label>
        <span className="text-sm md:text-base cursor-pointer text-[var(--primary-color)]">
          ¿Olvidaste tu contraseña?
        </span>
      </div>
      <Button 
        text={"Iniciar sesión"} 
        styles="w-full py-3 px-8 my-8" 
      />
      {/* Muestra el mensaje de error en caso de que el backend indique credenciales incorrectas */}
      {loginError && (
        <p className="text-red-500 text-center">{loginError}</p>
      )}
    </form>
  );
};

export default Login;

