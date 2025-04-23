'use client';
import { useState } from "react";

const useClientLogin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; Secure; SameSite=Strict`;
  };

  const loginClient = async ({ email, password }) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8081/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error al iniciar sesión");
        return { error: data.message || "Error al iniciar sesión" };
      } else {
        setMessage("Inicio de sesión exitoso");
        setCookie("token", data.token, 7); // Cookie válida 7 días
        setCookie("user", JSON.stringify(data.user), 7);
        return { message: "Inicio de sesión exitoso" };
      }
    } catch (error) {
      setMessage("Error en el servidor");
      return { error: "Error en el servidor" };
    } finally {
      setLoading(false);
    }
  };

  return { loginClient, loading, message };
};

export default useClientLogin;

