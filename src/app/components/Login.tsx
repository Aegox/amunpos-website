'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useUserLogin } from "../hooks/useUserLogin";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { InputRoot, InputField, InputIcon } from "@/components/ui/input";
import { LabelRoot } from "@/components/ui/label";
import { Divider } from "@/components/ui/divider";

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
      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="login-email">Correo electrónico</LabelRoot>
          <InputRoot hasError={!!errors.email}>
            <InputIcon>
              <RiMailLine className="size-5" />
            </InputIcon>
            <InputField id="login-email" type="email" placeholder="tucorreo@ejemplo.com" disabled={emailLoading} {...register("email")} />
          </InputRoot>
          {errors.email && <p className="text-paragraph-xs text-error-base">{String(errors.email.message)}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="login-password">Contraseña</LabelRoot>
          <InputRoot hasError={!!errors.password}>
            <InputIcon>
              <RiLockLine className="size-5" />
            </InputIcon>
            <InputField
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={emailLoading}
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="flex size-5 shrink-0 items-center justify-center text-soft-400 transition-colors duration-200 hover:text-sub-600"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <RiEyeOffLine className="size-5" /> : <RiEyeLine className="size-5" />}
            </button>
          </InputRoot>
          {errors.password && <p className="text-paragraph-xs text-error-base">{String(errors.password.message)}</p>}
        </div>

        {errorState && <p className="text-center text-paragraph-sm text-error-base">{errorState}</p>}

        <Button text="Iniciar sesión" type="submit" styles="w-full" loading={emailLoading} variant="primary" />

        <Divider variant="line-text">o</Divider>

        <div className="flex w-full items-center justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_blue"
            size="large"
            text="signin_with"
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

export default Login;
