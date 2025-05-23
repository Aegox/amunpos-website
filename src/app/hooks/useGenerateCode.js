'use client';

import { useState } from 'react';
import { getApiUrl } from '../utils/api';

export const useGenerateCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const generateCode = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${getApiUrl()}/auth/generateCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al generar el código');
      }
      setSuccess(data.message || 'Código enviado correctamente');
      return true;
    } catch (err) {
      setError(err.message || 'Error desconocido al generar el código');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { generateCode, loading, error, success };
};
