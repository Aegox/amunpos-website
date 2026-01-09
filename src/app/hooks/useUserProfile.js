'use client';
import { useState } from 'react';
import { fetchWithRetry, getApiUrl } from '../utils/api';

export const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId, token) => {
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const response = await fetchWithRetry(`${getApiUrl()}/user/edit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfil');
      }
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error desconocido al obtener perfil');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { fetchProfile, loading, error, profile };
};
