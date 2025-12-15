'use client';
import React, { useState } from "react";
import Register from "./Register";
import VerifyCode from "./VerifyCode";
import { useUserRegister } from "../hooks/useUserRegister";
import { useGenerateCode } from "../hooks/useGenerateCode";
import { useVerifyCode } from "../hooks/useVerifyCode";

const RegisterFlow: React.FC = () => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser } = useUserRegister();
  const { generateCode, loading: loadingGenerate, error: errorGenerate } = useGenerateCode();
  const { verifyCode, loading: loadingVerify, error: errorVerify } = useVerifyCode();

  const handleRegister = async (nameInput: string, emailInput: string, passwordInput: string) => {
    setName(nameInput);
    setEmail(emailInput);
    setPassword(passwordInput);

    const success = await generateCode(emailInput); // ✅ usamos generateCode
    if (success) {
      setStep('verify');
    } else {
      alert(errorGenerate || "Error enviando el código.");
    }
  };

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const isProduction = window.location.hostname.includes('amunpos.com');
    const domain = isProduction ? '.amunpos.com' : '';
    const domainAttr = domain ? `domain=${domain}; ` : '';
    const secureAttr = isProduction ? 'Secure; ' : '';
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; ${domainAttr}${secureAttr}SameSite=Lax`;
  };

  const handleVerify = async (code: string) => {
    const isValid = await verifyCode(email, code ); // ✅ usamos verifyCode
    if (!isValid) {
      alert(errorVerify || "Código incorrecto. Inténtalo de nuevo.");
      return;
    }

    const result = await registerUser({ name, email, password });
    console.log(result)
    if (result?.token) {
      setCookie('auth_token', result.token, 7);
      if (result.user) {
        setCookie('user_data', JSON.stringify(result.user), 7);
      }
      localStorage.removeItem('lastAction');
      const isProduction = window.location.hostname.includes('amunpos.com');
      const redirectUrl = isProduction ? 'https://app.amunpos.com/onboarding' : 'http://localhost:5173/onboarding';
      window.location.href = redirectUrl;
    } else {
      alert('Error al registrar usuario. Por favor intenta de nuevo.');
    }
  };

  if (step === 'register') {
    return <Register onRegister={handleRegister} loading={loadingGenerate} />;
  }
  
  return <VerifyCode onVerify={handleVerify} loading={loadingVerify} />;
};

export default RegisterFlow;

