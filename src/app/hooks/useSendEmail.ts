'use client';
import { useState } from 'react';
import { getApiUrl } from '../utils/api';

interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const CONTACT_EMAIL = 'diegoamundaray2017@gmail.com';

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendContactMessage = async (payload: ContactEmailPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const subject = `Contacto Landing AmunPOS - ${payload.subject}`;
    const text = [
      'Nuevo mensaje desde el formulario de contacto',
      `Nombre: ${payload.name}`,
      `Correo: ${payload.email}`,
      `Teléfono: ${payload.phone}`,
      '',
      'Mensaje:',
      payload.message,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${payload.name}</p>
        <p><strong>Correo:</strong> ${payload.email}</p>
        <p><strong>Teléfono:</strong> ${payload.phone}</p>
        <p><strong>Asunto:</strong> ${payload.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-line;">${payload.message}</p>
      </div>
    `;

    try {
      const response = await fetch(`${getApiUrl()}/mails/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: CONTACT_EMAIL,
          subject,
          text,
          html,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el correo');
      }

      setSuccess(true);
      return true;
    } catch (err) {
      console.error('Error al enviar el correo:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendContactMessage, loading, error, success };
};

export default useSendEmail;
