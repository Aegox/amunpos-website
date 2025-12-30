'use client';

import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineEmail, MdLockOutline, MdVisibility, MdVisibilityOff, MdPerson } from "react-icons/md";

// Validación con Zod
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
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
            "mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos",
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

type RegisterFormData = z.infer<typeof formSchema>;

// Props: recibe onRegister para enviar name+email+password al flujo padre
interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
  loading: boolean;
}

const Register: React.FC<RegisterProps> = ({ onRegister, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    const { name, email, password } = data;
    onRegister(name, email, password);
    reset();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Nombre */}
      <div className="relative mb-6">
        <MdPerson color="gray" size={24} className="absolute left-3 top-3" />
        <input
          type="text"
          {...register("name")}
          className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="Nombre completo"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
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
      <div className="flex items-center mb-6">
        <input type="checkbox" {...register("termsAccepted")} />
        <label className="ml-2 text-[var(--body-color)]">
          Acepto términos y condiciones
        </label>
      </div>
      {errors.termsAccepted && (
        <p className="text-red-500 text-sm mb-4">
          {errors.termsAccepted.message}
        </p>
      )}

      {/* Botón de Registro */}
      <Button
        text="Registrarse"
        styles="w-full py-3 px-8 mb-6"
        loading={loading}
        theme="black"
        variant="inverted"
      />
    </form>
  );
};

export default Register;

