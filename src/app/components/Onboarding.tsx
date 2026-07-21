"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserEdit } from "../hooks/useUserEdit";
import { motion } from "framer-motion";
import Button from "./Button";
import { getCookie } from "../utils/cookie";
import Image from 'next/image';
import { InputRoot, InputField } from "@/components/ui/input";
import { LabelRoot } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BusinessFormData {
  companyName: string;
  companyType: string;
  employeeRange: string;
}

const selectClass =
  "h-10 w-full rounded-10 bg-white-0 px-3 text-paragraph-sm text-strong-950 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out focus:shadow-button-important-focus focus:ring-stroke-strong-950";

const BusinessFormModal = () => {
  const [, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>();

  const { editUser, loading } = useUserEdit();

  const onSubmit = async (data: BusinessFormData) => {
    try {
      const token = typeof window !== 'undefined' ? getCookie('auth_token') : null;
      if (!token) {
        setError("No hay token válido");
        return;
      }

      const clientUpdated = await editUser(token, data);

      if (clientUpdated) {
        const envAppUrl = process.env.NEXT_PUBLIC_APP_URL;
        const redirectUrl = envAppUrl || window.location.origin;
        window.location.href = redirectUrl;
      } else {
        setError("Error al actualizar los datos");
      }
    } catch {
      setError("Error en el servidor");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-screen w-full items-center justify-center bg-weak-50 px-4 py-10"
    >
      <div className="dot-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[420px]" />
      <div className="pointer-events-none absolute -top-20 -right-20 size-96 rounded-full bg-brand-400/15 blur-[110px]" />

      <div className="relative w-full max-w-md rounded-2xl border border-stroke-soft-200 bg-white-0 p-8 shadow-regular-md">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <Image src="/logo.png" alt="AmunPOS" width={150} height={25} className="h-6 w-auto" />
          <h4 className="text-title-h6 text-strong-950">Información de tu negocio</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <LabelRoot htmlFor="companyName">Nombre de tu negocio</LabelRoot>
            <InputRoot hasError={!!errors.companyName}>
              <InputField id="companyName" type="text" {...register("companyName", { required: "El nombre del negocio es obligatorio" })} />
            </InputRoot>
            {errors.companyName && <p className="text-paragraph-xs text-error-base">{errors.companyName.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <LabelRoot htmlFor="companyType">Tipo de negocio</LabelRoot>
            <select
              id="companyType"
              {...register("companyType", { required: "Selecciona el tipo de negocio" })}
              className={cn(selectClass, errors.companyType && "ring-error-base")}
            >
              <option value="">Seleccione una opción</option>
              <option value="restaurante">Restaurante</option>
              <option value="papeleria">Papelería</option>
              <option value="cafe">Café</option>
              <option value="consultoria">Consultoría</option>
              <option value="retail">Venta al por menor</option>
              <option value="ecommerce">E‑commerce</option>
              <option value="tecnologia">Tecnología</option>
              <option value="servicios">Servicios</option>
            </select>
            {errors.companyType && <p className="text-paragraph-xs text-error-base">{errors.companyType.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <LabelRoot htmlFor="employeeRange">Número de empleados</LabelRoot>
            <select
              id="employeeRange"
              {...register("employeeRange", { required: "Selecciona un rango de empleados" })}
              className={cn(selectClass, errors.employeeRange && "ring-error-base")}
            >
              <option value="">Seleccione un rango</option>
              <option value="0-50">0 - 50</option>
              <option value="51-100">51 - 100</option>
              <option value="101-200">101 - 200</option>
              <option value="201-500">201 - 500</option>
              <option value="500+">500+</option>
            </select>
            {errors.employeeRange && <p className="text-paragraph-xs text-error-base">{errors.employeeRange.message}</p>}
          </div>

          <Button text="Continuar" styles="w-full mt-2" loading={loading} variant="primary" />
        </form>
      </div>
    </motion.div>
  );
};

export default BusinessFormModal;
