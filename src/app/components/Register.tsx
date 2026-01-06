'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineEmail, MdLockOutline, MdVisibility, MdVisibilityOff, MdPerson } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const formSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido").min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().min(1, "El correo electrónico es requerido").email("Ingresa un correo electrónico válido"),
    password: z.string().refine((val) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(val), {
      message: "mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos",
    }),
    confirmPassword: z.string().min(1, "La confirmación de contraseña es requerida"),
    termsAccepted: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof formSchema>;

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => void;
  loading: boolean;
}

const Register: React.FC<RegisterProps> = ({ onRegister, loading: emailLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();

  const onSubmit = (data: RegisterFormData) => {
    const { name, email, password } = data;
    onRegister(name, email, password);
    reset();
  };

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* FORMULARIO REGISTER */}
        <div className="relative mb-6">
          <MdPerson color="gray" size={24} className="absolute left-3 top-3" />
          <input
            type="text"
            {...register("name")}
            className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.name ? "border-red-500" : "border-gray-400"}`}
            placeholder="Nombre completo"
            disabled={emailLoading}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="relative mb-6">
          <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
          <input
            type="email"
            {...register("email")}
            className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-400"}`}
            placeholder="Correo electrónico"
            disabled={emailLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="relative mb-6">
          <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`bg-white block w-full py-[11px] pl-[45px] pr-10 text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.password ? "border-red-500" : "border-gray-400"}`}
            placeholder="Contraseña"
            disabled={emailLoading}
          />
          <div className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="relative mb-6">
          <MdLockOutline color="gray" size={24} className="absolute left-3 top-3" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-400"}`}
            placeholder="Confirmar contraseña"
            disabled={emailLoading}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center mb-6">
          <input type="checkbox" {...register("termsAccepted")} disabled={emailLoading} />
          <label className="ml-2 text-[var(--body-color)]">Acepto términos y condiciones</label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm mb-4">{errors.termsAccepted.message}</p>}

        {/* GOOGLE LOGIN */}

        {/* EMAIL BUTTON */}
        <Button
          text="Registrarse"
          styles={`w-full mb-4 py-3 px-8 ${emailLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          loading={emailLoading}
          theme="black"
          variant="inverted"
        />
        {/* DIVIDER */}
        <div className="relative flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 px-4 text-xs text-gray-500 font-medium">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="w-full flex items-center justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="filled_blue"
          size="large"
          text="signup_with"
          shape="circle"
          logo_alignment="center"
          width="100%"
          type="icon"
        />
        </div>
      </form>
    </GoogleOAuthProvider>
  );
};

export default Register;
