"use client";
import { useEffect, useState } from "react";

export const useVerifyToken = (token) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        setIsValid(null);
        return;
      }

      try {
        const response = await fetch("http://localhost:8081/auth/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error verificando el token", error);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return { loading, isValid };
};

