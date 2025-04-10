'use client';
import React, { useState, useEffect } from 'react';
import SessionComponent from './SessionComponent';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
  const [lastAction, setLastAction] = useState(localStorage.getItem('lastAction'));

  // Revisa los cambios en localStorage cada 100ms
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLastAction = localStorage.getItem('lastAction');
      if (currentLastAction !== lastAction) {
        setLastAction(currentLastAction);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [lastAction]);

  // Renderiza el modal
  const renderModal = (
    Component: React.ComponentType,
    title: string,
    description: string,
    buttonText: string,
    question: boolean
  ) => (
    <div className="fixed inset-0 z-[100] w-full overflow-y-auto bg-[rgba(0,0,0,0.5)] scrollbar-hidden backdrop-blur-sm">
      {/* Usamos flex para centrar y min-h-screen para ocupar al menos la pantalla completa */}
      <div className="w-full flex min-h-screen  md:h-[140vh] items-center justify-center">
        {/* Contenedor del modal */}
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
    return renderModal(Login, "Inicia sesión en tu cuenta", "Usa tus credenciales para iniciar sesión", "Iniciar sesión", true);
  } else if (lastAction === "register") {
    return renderModal(Register, "Registra tu cuenta", "Crea una cuenta nueva", "Registrar", false);
  }

  return null;
};

export default AuthModal;

