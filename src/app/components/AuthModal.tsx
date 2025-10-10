'use client';
import React, { useState, useEffect } from 'react';
import SessionComponent from './SessionComponent';
import Login from './Login';
import RegisterFlow from './RegisterFlow';

const AuthModal = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Cargar el valor inicial solo cuando estemos en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAction = window.localStorage.getItem("lastAction");
      setLastAction(storedAction);
    }
  }, []);

  // Revisa los cambios en localStorage cada 100ms
  useEffect(() => {
    if (typeof window === "undefined") return;

    const intervalId = setInterval(() => {
      const currentLastAction = window.localStorage.getItem("lastAction");
      setLastAction(currentLastAction);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  // Renderiza el modal dinámicamente
  const renderModal = (
    Component: React.ComponentType,
    title: string,
    description: string,
    buttonText: string,
    question: boolean
  ) => (
    <div className="fixed inset-0 z-[100] w-full overflow-y-auto bg-[rgba(0,0,0,0.5)] scrollbar-hidden backdrop-blur-sm">
      <div className="w-full flex min-h-screen md:h-[140vh] items-center justify-center">
        <SessionComponent
          Component={Component}
          title={title}
          description={description}
          buttonText={buttonText}
          question={question}
        />
      </div>
    </div>
  );

  if (lastAction === "login") {
    return renderModal(
      Login,
      "Inicia sesión en tu cuenta",
      "Usa tus credenciales para iniciar sesión",
      "Iniciar sesión",
      true
    );
  } else if (lastAction === "register") {
    return renderModal(
      RegisterFlow,
      "Registra tu cuenta",
      "Crea una cuenta nueva",
      "Registrar",
      false
    );
  }

  return null;
};

export default AuthModal;

