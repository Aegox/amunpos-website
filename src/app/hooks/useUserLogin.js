'use client';
import { useState } from 'react';
import { getApiUrl } from '../utils/api';

export const useUserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
  };

  const loginUser = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const response = await fetch(`${getApiUrl()}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return false;
      }
      setCookie('token', data.token, 7);
      setCookie('user', JSON.stringify(data), 7);
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error desconocido al iniciar sesión');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, user };
};
