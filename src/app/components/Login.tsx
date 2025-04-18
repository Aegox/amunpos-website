'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import useClientLogin from "../hooks/useClientLogin";

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { loginClient, loading, message } = useClientLogin();
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const onSubmit = async (data) => {
    setError(""); // Limpiar el mensaje de error antes de realizar el inicio de sesión
    setSuccessMessage(""); // Limpiar el mensaje de éxito
    console.log(data)
    // Aquí estamos enviando los datos correctamente al backend
    const response = await loginClient(data);

    // Si hay un error, mostrar el mensaje de error
    if (response?.error) {
      setError(response.error); // Si hay un error, se muestra el mensaje en rojo
    } else if (response?.message) {
      setSuccessMessage(response.message); // Si es exitoso, se muestra el mensaje en verde
    }

    reset(); // Opcional, para limpiar los campos
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Correo Electrónico */}
      <div className="relative mb-6">
        <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type="email"
          {...register("email")}
          className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="Correo electrónico"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div className="relative mb-6">
        <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className={`bg-white block w-full py-[11px] pl-[45px] pr-10 text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="Contraseña"
        />
        {/* Ícono de visibilidad */}
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <MdVisibilityOff color="gray" size={20} />
          ) : (
            <MdVisibility color="gray" size={20} />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Mensajes */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p> // Mostrar mensaje de error en rojo
      )}
      {successMessage && (
        <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p> // Mostrar mensaje de éxito en verde
      )}

      {/* Botón de Login */}
      <Button
        text={"Iniciar sesión"}
        styles={`w-full py-3 px-8 mb-6 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        loading={loading}
      />
    </form>
  );
};

export default Login;

