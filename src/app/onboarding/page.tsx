"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyToken } from "../hooks/useVerifyToken";
import { FaSpinner } from "react-icons/fa";
import Onboarding from "../components/Onboarding";
import { getCookie } from "../utils/cookie";

const OnboardingPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? getCookie('auth_token') : null;
    setToken(storedToken || null);
  }, []);

  const { verifyToken, loading, isValid, errorMsg } = useVerifyToken();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        await verifyToken(token);
      }
    };
    checkToken();
  }, [token, verifyToken]);

  useEffect(() => {
    if (!loading && isValid === false) {
      router.push("/login");
    }
  }, [loading, isValid, router]);

  if (loading || isValid === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner size={40} className="animate-spin" />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FaSpinner size={40} className="animate-spin mb-4" />
        <p className="text-red-500">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div>
      <Onboarding />
    </div>
  );
};

export default OnboardingPage;

