'use client';
import { useState } from 'react';
import { getApiUrl } from '../utils/api';

export const useUserEdit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editUser = async (token, userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${getApiUrl()}/user/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al editar usuario');
      }
      setSuccess(data.message || 'Usuario actualizado correctamente');
      return data;
    } catch (err) {
      setError(err.message || 'Error desconocido al editar usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { editUser, loading, error, success };
};
