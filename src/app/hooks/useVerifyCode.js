'use client';

import { useState } from 'react';
import { getApiUrl } from '../utils/api';

export const useVerifyCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyCode = async (email, code) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${getApiUrl()}/auth/verifyCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al verificar el código');
      }
      return data.isValid === true;
    } catch (err) {
      setError(err.message || 'Error desconocido al verificar el código');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, loading, error };
};
