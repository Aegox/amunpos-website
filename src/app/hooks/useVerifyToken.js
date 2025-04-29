"use client";
import { useState, useEffect } from "react";
import { getApiUrl } from "../utils/api.js";

export const useVerifyToken = (token) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        setIsValid(null);
        setErrorMsg("Token no proporcionado");
        return;
      }
      try {
        const response = await fetch(`${getApiUrl()}/auth/verifyToken`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if (response.ok) {
          setIsValid(true);
          setErrorMsg(null);
        } else {
          const data = await response.json();
          setIsValid(false);
          setErrorMsg(data?.error || "Token inválido");
        }
      } catch (error) {
        console.error("Error verificando el token", error);
        setIsValid(false);
        setErrorMsg("Error de red");
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return { loading, isValid, errorMsg };
};
