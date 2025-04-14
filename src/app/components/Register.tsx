'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineEmail, MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiUser } from "react-icons/fi";

// Esquema de validación con Zod
const formSchema = z
  .object({
    fullName: z.string().min(1, "El nombre completo es requerido"),
    email: z
      .string()
      .min(1, "El correo electrónico es requerido")
      .email("Ingresa un correo electrónico válido"),
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(val),
        {
          message:
            "minimo 8 caracteres, mayusculas, minusculas, numeros y símbolos",
        }
      ),
    confirmPassword: z.string().min(1, "La confirmación de contraseña es requerida"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Inferir el tipo a partir del esquema Zod
type RegisterFormData = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  // Estado para alternar visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    console.log("Datos del registro:", data);
    // Aquí puedes manejar el registro con una API o lógica personalizada
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Nombre Completo */}
      <div className="relative mb-6">
        <FiUser color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type="text"
          {...register("fullName")}
          className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.fullName ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="Nombre completo"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

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

      {/* Confirmar Contraseña */}
      <div className="relative mb-6">
        <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type={showPassword ? "text" : "password"}
          {...register("confirmPassword")}
          className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="Confirmar contraseña"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Términos y Condiciones */}
      <div className="flex flex-col justify-between w-full mb-6">
        <label className="flex items-center gap-2 text-[var(--body-color)]">
          <input type="checkbox" {...register("termsAccepted")} />
          Acepto términos y condiciones
        </label>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
        )}
      </div>

      <Button text={"Registrarse"} styles="w-full py-3 px-8 mb-6" />
    </form>
  );
};

export default Register;

