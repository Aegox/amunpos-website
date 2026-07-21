'use client';
import React, { useState, useEffect } from 'react';
import * as Modal from '@/components/ui/modal';
import SessionComponent from './SessionComponent';
import Login from './Login';
import RegisterFlow from './RegisterFlow';

const AuthModal = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Cargar el valor inicial solo cuando estemos en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLastAction(window.localStorage.getItem("lastAction"));
    }
  }, []);

  // Revisa los cambios en localStorage cada 100ms
  useEffect(() => {
    if (typeof window === "undefined") return;

    const intervalId = setInterval(() => {
      setLastAction(window.localStorage.getItem("lastAction"));
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const isOpen = lastAction === "login" || lastAction === "register";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      window.localStorage.removeItem("lastAction");
      setLastAction(null);
    }
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content>
        {lastAction === "login" && (
          <SessionComponent
            Component={Login}
            title="Inicia sesión en tu cuenta"
            description="Usa tus credenciales para iniciar sesión"
            question
          />
        )}
        {lastAction === "register" && (
          <SessionComponent
            Component={RegisterFlow}
            title="Registra tu cuenta"
            description="Crea una cuenta nueva"
            question={false}
          />
        )}
      </Modal.Content>
    </Modal.Root>
  );
};

export default AuthModal;
