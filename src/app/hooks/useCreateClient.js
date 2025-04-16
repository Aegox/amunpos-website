"use client";
import { useState } from "react";

const useCreateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdClient, setCreatedClient] = useState(null);

  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);

    try {
    const response = await fetch("http://localhost:5432/client/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el cliente");
      }

      const data = await response.json();
      setCreatedClient(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createClient,
    loading,
    error,
    createdClient,
  };
};

export default useCreateClient;

