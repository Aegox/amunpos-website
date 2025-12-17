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
      const controller = new AbortController();
      const timeoutMs = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 15000);
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(`${getApiUrl()}/auth/generateCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error al generar el código');
      }
      setSuccess(data.message || 'Código enviado correctamente');
      return true;
    } catch (err) {
      const isAbort = err?.name === 'AbortError';
      setError(isAbort ? 'Tiempo de espera agotado. Intenta de nuevo.' : (err.message || 'Error desconocido al generar el código'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { generateCode, loading, error, success };
};
