'use client';
import React, { useState } from "react";
import Register from "./Register";
import VerifyCode from "./VerifyCode";
import useCreateClient from "../hooks/useCreateClient";
import { useGenerateCode } from "../hooks/useGenerateCode";
import { useVerifyCode } from "../hooks/useVerifyCode";
import { useRouter } from "next/navigation";

const RegisterFlow: React.FC = () => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { createClient } = useCreateClient();
  const { generateCode, loading: loadingGenerate, error: errorGenerate } = useGenerateCode();
  const { verifyCode, loading: loadingVerify, error: errorVerify } = useVerifyCode();
  const router = useRouter();

  const handleRegister = async (emailInput: string, passwordInput: string) => {
    setEmail(emailInput);
    setPassword(passwordInput);

    const success = await generateCode(emailInput); // ✅ usamos generateCode
    if (success) {
      setStep('verify');
    } else {
      alert(errorGenerate || "Error enviando el código.");
    }
  };

  const handleVerify = async (code: string) => {
    const isValid = await verifyCode(email, code ); // ✅ usamos verifyCode
    if (!isValid) {
      alert(errorVerify || "Código incorrecto. Inténtalo de nuevo.");
      return;
    }

    const result = await createClient({ email, password });
    if (result?.token) {
      document.cookie = `token=${result.token}; path=/; Secure; SameSite=Strict`;
      localStorage.removeItem('lastAction');
      router.push('/onboarding');
    }
  };

  if (step === 'register') {
    return <Register onRegister={handleRegister} loading={loadingGenerate} />;
  }
  
  return <VerifyCode onVerify={handleVerify} loading={loadingVerify} />;
};

export default RegisterFlow;

