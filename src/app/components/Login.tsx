'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useUserLogin } from "../hooks/useUserLogin";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();
  const { loginUser, loading: emailLoading } = useUserLogin();
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorState, setErrorState] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    setErrorState("");
    const response = await loginUser(data);
    if (response?.error) {
      setErrorState(response.error);
    } else if (response) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("lastAction");
        const envAppUrl = process.env.NEXT_PUBLIC_APP_URL;
        const redirectUrl = envAppUrl || window.location.origin;
        window.location.href = redirectUrl;
      }
    }
    reset();
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* FORMULARIO EMAIL */}
        <div className="relative mb-6">
          <MdOutlineEmail color="gray" size={24} className="absolute left-3 top-3" />
          <input
            type="email"
            {...register("email")}
            className={`bg-white block w-full py-[11px] pl-[45px] text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-400"}`}
            placeholder="Correo electrónico"
            disabled={emailLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
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
            {showPassword ? <MdVisibilityOff color="gray" size={20} /> : <MdVisibility color="gray" size={20} />}
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
        </div>

        {errorState && <p className="text-red-500 text-sm text-center mb-4">{errorState}</p>}

        {/* GOOGLE LOGIN */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          width="100%"
        />

        {/* DIVIDER */}
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 px-4 text-xs text-gray-500 font-medium">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* EMAIL BUTTON */}
        <Button
          text="Iniciar sesión"
          styles={`w-full py-3 px-8 ${emailLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          loading={emailLoading}
          theme="black"
          variant="inverted"
        />
      </form>
    </GoogleOAuthProvider>
  );
};

export default Login;
