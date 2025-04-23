'use client';

import React, { useState } from "react";
import Button from "./Button";

interface VerifyCodeComponentProps {
  onVerify: (code: string) => void
  loading: boolean
}

const VerifyCodeComponent: React.FC<VerifyCodeComponentProps> = ({ onVerify , loading }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length === 0) {
      setError('Por favor ingresa el código.');
      return;
    }
    setError('');
    onVerify(code); // Llamamos la función que maneja la verificación
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <input
        type="text"
        placeholder="Ingresa el código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="bg-white block w-full py-[11px] pl-[45px] pr-10 text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-6"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Button
        text="Verificar Código"
        styles={`w-full py-3 px-8 mb-6 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        loading={loading}
      >
      </Button>
    </form>
  );
};

export default VerifyCodeComponent;
