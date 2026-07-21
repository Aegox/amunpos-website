import React from "react";
import Image from 'next/image';
import * as Modal from '@/components/ui/modal';

interface SessionComponentProps {
  Component: React.ComponentType;
  title: string;
  description: string;
  buttonText?: string;
  question: boolean;
}

const SessionComponent: React.FC<SessionComponentProps> = ({ Component, title, description, question }) => {
  const handleTo = (type: string) => {
    window.localStorage.setItem("lastAction", type);
  };

  return (
    <>
      <Modal.Header>
        <Image src="/logo.png" alt="AmunPOS" width={150} height={20} className="h-5 w-auto" />
        <Modal.Title>{title}</Modal.Title>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Header>
      <Modal.Body>
        <Component />
      </Modal.Body>
      <Modal.Footer>
        {question ? (
          <>
            ¿No tienes una cuenta?{" "}
            <button onClick={() => handleTo("register")} className="font-medium text-primary-base hover:text-primary-darker">
              Regístrate ahora
            </button>
          </>
        ) : (
          <>
            ¿Ya tienes una cuenta?{" "}
            <button onClick={() => handleTo("login")} className="font-medium text-primary-base hover:text-primary-darker">
              Inicia sesión
            </button>
          </>
        )}
      </Modal.Footer>
    </>
  );
};

export default SessionComponent;
