"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyToken } from "../hooks/useVerifyToken";
import { FaSpinner } from "react-icons/fa";
import Onboarding from "../components/Onboarding";

const OnboardingPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { loading, isValid } = useVerifyToken(token);

  useEffect(() => {
    if (!loading && isValid === false) {
      router.push("/login");
    }
  }, [loading, isValid, router]);

  if (!token || loading || isValid === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner size={40} className="animate-spin" />
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

