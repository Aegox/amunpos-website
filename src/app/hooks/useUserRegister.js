'use client';
import { useState } from 'react';
import { getApiUrl } from '../utils/api';

export const useUserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${getApiUrl()}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      // La API de /auth/register responde con:
      // { success: boolean, message?: string, data: { user, token } }
      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Error al registrar usuario');
      }

      const payload = data?.data || {};
      setSuccess(data?.message || 'Usuario registrado correctamente');
      // Devolvemos solo { user, token } para simplificar el consumo
      return payload;
    } catch (err) {
      setError(err.message || 'Error desconocido al registrar usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
