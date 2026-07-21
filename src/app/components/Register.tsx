'use client';
import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { InputRoot, InputField, InputIcon } from "@/components/ui/input";
import { LabelRoot } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";

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
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();
  const termsAccepted = watch("termsAccepted");

  const onSubmit = (data: RegisterFormData) => {
    const { name, email, password } = data;
    onRegister(name, email, password);
    reset();
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="register-name">Nombre completo</LabelRoot>
          <InputRoot hasError={!!errors.name}>
            <InputIcon>
              <RiUserLine className="size-5" />
            </InputIcon>
            <InputField id="register-name" type="text" placeholder="Tu nombre completo" disabled={emailLoading} {...register("name")} />
          </InputRoot>
          {errors.name && <p className="text-paragraph-xs text-error-base">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="register-email">Correo electrónico</LabelRoot>
          <InputRoot hasError={!!errors.email}>
            <InputIcon>
              <RiMailLine className="size-5" />
            </InputIcon>
            <InputField id="register-email" type="email" placeholder="tucorreo@ejemplo.com" disabled={emailLoading} {...register("email")} />
          </InputRoot>
          {errors.email && <p className="text-paragraph-xs text-error-base">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="register-password">Contraseña</LabelRoot>
          <InputRoot hasError={!!errors.password}>
            <InputIcon>
              <RiLockLine className="size-5" />
            </InputIcon>
            <InputField
              id="register-password"
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
          {errors.password && <p className="text-paragraph-xs text-error-base">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <LabelRoot htmlFor="register-confirm-password">Confirmar contraseña</LabelRoot>
          <InputRoot hasError={!!errors.confirmPassword}>
            <InputIcon>
              <RiLockLine className="size-5" />
            </InputIcon>
            <InputField
              id="register-confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={emailLoading}
              {...register("confirmPassword")}
            />
          </InputRoot>
          {errors.confirmPassword && <p className="text-paragraph-xs text-error-base">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <LabelRoot className="items-start gap-2">
            <Checkbox
              checked={!!termsAccepted}
              onCheckedChange={(checked) => setValue("termsAccepted", (checked === true) as true, { shouldValidate: true })}
              disabled={emailLoading}
            />
            <span className="text-paragraph-sm text-sub-600">Acepto términos y condiciones</span>
          </LabelRoot>
          {errors.termsAccepted && <p className="text-paragraph-xs text-error-base">{errors.termsAccepted.message}</p>}
        </div>

        <Button text="Registrarse" type="submit" styles="w-full" loading={emailLoading} variant="primary" />

        <Divider variant="line-text">o</Divider>

        <div className="flex w-full items-center justify-center">
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
