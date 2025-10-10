'use client';
import { useState } from 'react';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
}

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (params: SendEmailParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:8083/mails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el correo');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Error al enviar el correo:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }

    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error, success };
};

export default useSendEmail;
