"use client";
import { useState } from "react";

const useUpdateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedClient, setUpdatedClient] = useState<any>(null);

  const updateClient = async (token: string, updateData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8081/client/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ AQUÍ mandas el token en el header
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el cliente");
      }

      const data = await response.json();
      setUpdatedClient(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateClient,
    loading,
    error,
    updatedClient,
  };
};

export default useUpdateClient;

