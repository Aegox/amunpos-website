'use client';
import { useState } from "react";

const useClientLogin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loginClient = async ({ email, password }) => {
    setLoading(true);
    setMessage(""); // Limpiar mensaje anterior

    try {
      const res = await fetch("http://localhost:5432/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error al iniciar sesión");
        return { error: data.message || "Error al iniciar sesión" }; // Retornar el mensaje de error
      } else {
        setMessage("Inicio de sesión exitoso");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { message: "Inicio de sesión exitoso" }; // Retornar el mensaje de éxito
      }
    } catch (error) {
      setMessage("Error en el servidor");
      return { error: "Error en el servidor" }; // Retornar el mensaje de error en caso de fallo en el servidor
    } finally {
      setLoading(false);
    }
  };

  return { loginClient, loading, message };
};

export default useClientLogin;

