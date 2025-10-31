'use client';
import React, { useState } from "react";
import Register from "./Register";
import VerifyCode from "./VerifyCode";
import { useUserRegister } from "../hooks/useUserRegister";
import { useGenerateCode } from "../hooks/useGenerateCode";
import { useVerifyCode } from "../hooks/useVerifyCode";

const RegisterFlow: React.FC = () => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser } = useUserRegister();
  const { generateCode, loading: loadingGenerate, error: errorGenerate } = useGenerateCode();
  const { verifyCode, loading: loadingVerify, error: errorVerify } = useVerifyCode();

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

    const result = await registerUser({ email, password });
    console.log(result)
    if (result?.token) {
      document.cookie = `token=${result.token}; path=/; Secure; SameSite=Strict`;
      localStorage.removeItem('lastAction');
      window.location.href = `${window.location.origin}/onboarding`;
    }
  };

  if (step === 'register') {
    return <Register onRegister={handleRegister} loading={loadingGenerate} />;
  }
  
  return <VerifyCode onVerify={handleVerify} loading={loadingVerify} />;
};

export default RegisterFlow;

