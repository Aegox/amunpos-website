"use client";
import { useState, useCallback } from "react";
import { getApiUrl } from "../utils/api.js";

export const useVerifyToken = () => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const verifyToken = useCallback(async (token) => {
    setLoading(true);
    if (!token) {
      setLoading(false);
      setIsValid(null);
      setErrorMsg("Token no proporcionado");
      return false;
    }
    try {
      const response = await fetch(`${getApiUrl()}/auth/verifyToken`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsValid(true);
        setErrorMsg(null);
        return true;
      } else {
        const data = await response.json();
        setIsValid(false);
        setErrorMsg(data.message || "Token inválido");
        return false;
      }
    } catch {
      setErrorMsg("Error al verificar token");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyToken, loading, isValid, errorMsg };
};