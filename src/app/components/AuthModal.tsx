
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
    if (lastAction) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  // Renderiza el modal
  const renderModal = (
    Component: React.ComponentType,
    title: string,
    description: string,
    buttonText: string,
    question: boolean
  ) => (
    <div className="fixed inset-0 z-[100] hide-scrollbar overflow-y-auto bg-[rgba(0,0,0,0.5)]">
      {/* Usamos flex para centrar y min-h-screen para ocupar al menos la pantalla completa */}
      <div className="flex min-h-screen items-center justify-center">
        {/* Contenedor del modal con altura limitada y scroll interno */}
        <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto hide-scrollbar">
          <SessionComponent 
            Component={Component} 
            title={title} 
            description={description} 
            buttonText={buttonText} 
            question={question} 
          />
        </div>
      </div>
      {/* Estilos para ocultar la scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;    /* Firefox */
          -ms-overflow-style: none; /* IE y Edge */
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 0;  /* Hace que no se muestre en Chrome, Safari y Opera */
          height: 0;
        }
      `}</style>
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

