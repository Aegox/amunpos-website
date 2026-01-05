// hooks/useGoogleAuth.js - FUERZA localStorage + cookies
'use client';

import { useCallback } from 'react';

export const useGoogleAuth = () => {
  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    console.log('🚀 Google Success - Iniciando auth...');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (response.ok && data.success) {
        const { user, token } = data.data;
        console.log('✅ Datos recibidos:', { hasUser: !!user, hasToken: !!token });

        if (typeof window !== 'undefined') {
          // 1. LIMPIAR anterior
          window.localStorage.removeItem("lastAction");
          
          // 2. FUERZA LOCALSTORAGE (POS lo lee)
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(user));
          console.log('💾 localStorage guardado:', { token: token.substring(0,20)+'...', user: user.email });

          // 3. COOKIES Lax para backup
          document.cookie = `auth_token=${token}; path=/; max-age=${7*24*60*60}; SameSite=Lax`;
          document.cookie = `user_data=${JSON.stringify(user)}; path=/; max-age=${7*24*60*60}; SameSite=Lax`;
          
          console.log('🍪 Cookies guardadas');
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
