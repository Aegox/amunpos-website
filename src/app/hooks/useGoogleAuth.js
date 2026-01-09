// hooks/useGoogleAuth.js - FUERZA localStorage + cookies
'use client';

import { useCallback } from 'react';
import { fetchWithRetry } from '../utils/api';

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const isProduction = window.location.hostname.includes('amunpos.com');
  const domain = isProduction ? '.amunpos.com' : '';
  const domainAttr = domain ? `domain=${domain}; ` : '';
  const secureAttr = isProduction ? 'Secure; ' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; ${domainAttr}${secureAttr}SameSite=Lax`;
};

export const useGoogleAuth = () => {
  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    console.log('🚀 Google Success - Iniciando auth...');
    
    try {
      const response = await fetchWithRetry(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (response.ok && data.success) {
        const { user, token } = data.data;
        console.log('✅ Datos recibidos:', { hasUser: !!user, hasToken: !!token });

        if (typeof window !== 'undefined') {
          window.localStorage.removeItem("lastAction");

          localStorage.setItem('auth_token', token);
          localStorage.setItem('auth_user', JSON.stringify(user));
          setCookie('auth_token', token, 7);
          setCookie('user_data', JSON.stringify(user), 7);
          console.log('💾 localStorage guardado:', { token: token.substring(0,20)+'...', user: user.email });
        }
        
        // 4. Redirect POS
        const posUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173';
        console.log('➡️ Redirect POS:', posUrl);
        window.location.href = posUrl;
      } else {
        console.error('❌ Backend error:', data.message);
        alert('Error: ' + (data.message || 'Error Google'));
      }
    } catch (error) {
      console.error('💥 Google error:', error);
      alert('Error de Google: ' + error.message);
    }
  }, []);

  const handleGoogleError = useCallback((error) => {
    console.error('❌ Google error:', error);
    alert('Error al conectar con Google');
  }, []);

  return { 
    handleGoogleSuccess, 
    handleGoogleError 
  };
};
