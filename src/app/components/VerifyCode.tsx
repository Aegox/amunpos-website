'use client';

import React, { useState } from "react";
import Button from "./Button";
import { RiShieldKeyholeLine } from "@remixicon/react";
import { InputRoot, InputField, InputIcon } from "@/components/ui/input";
import { LabelRoot } from "@/components/ui/label";

interface VerifyCodeComponentProps {
  onVerify: (code: string) => void
  loading: boolean
}

const VerifyCodeComponent: React.FC<VerifyCodeComponentProps> = ({ onVerify, loading }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length === 0) {
      setError('Por favor ingresa el código.');
      return;
    }
    setError('');
    onVerify(code);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <LabelRoot htmlFor="verify-code">Código de verificación</LabelRoot>
        <InputRoot hasError={!!error}>
          <InputIcon>
            <RiShieldKeyholeLine className="size-5" />
          </InputIcon>
          <InputField
            id="verify-code"
            type="text"
            placeholder="Ingresa el código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </InputRoot>
        {error && <p className="text-paragraph-xs text-error-base">{error}</p>}
      </div>
      <Button text="Verificar código" type="submit" styles="w-full" loading={loading} variant="primary" />
    </form>
  );
};

export default VerifyCodeComponent;
