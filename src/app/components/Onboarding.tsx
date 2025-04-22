"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateClient from "../hooks/useUpdateClient";
import { motion } from "framer-motion";
import Button from "./Button";
import { useRouter } from "next/navigation";  // Esto es para redirigir en Next.js

interface BusinessFormData {
  businessName: string;
  businessType: string;
  employeeRange: string;
}

const BusinessFormModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const token = localStorage.getItem("token");
  const router = useRouter(); // Hook para redirección

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>();

  const {
    updateClient,
    loading,
    error,
  } = useUpdateClient();

  const onSubmit = async (data: BusinessFormData) => {
    if (token) {
      const clientUpdated = await updateClient(token, data);

      if (clientUpdated) {
        // Si el cliente fue actualizado correctamente, redirigimos al dashboard
        router.push("/dashboard");
      } else {
        // Manejo de errores si la actualización falla
        console.error("Error al actualizar cliente:", error);
      }
    } else {
      console.error("Token no encontrado en localStorage");
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-50 flex items-center justify-center"
    >
      <div className="absolute z-30 -top-20 -right-20 w-[400px] h-[400px] bg-[var(--primary-color)] rounded-full filter blur-3xl opacity-15"></div>
      <img 
        src="/hero_bg2.png" 
        className="absolute top-0 left-0 w-full h-full object-cover animate-move-image z-10" 
        alt="a hero sprite"
      />
      <div className="light-effect"></div>
      <div className="bg-white z-50 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h4 className="text-center text-[var(--primary-color)] text-[22px] pb-8 font-semibold">
          Información de tu negocio
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Nombre del negocio */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Nombre de tu negocio
            </label>
            <input
              id="businessName"
              type="text"
              {...register("businessName", { required: "El nombre del negocio es obligatorio" })}
              className={`bg-white block w-full py-[10px] px-3 text-gray-700 placeholder-gray-600 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.businessName ? "border-red-500" : ""}`}
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>

          {/* Tipo de negocio */}
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
              Tipo de negocio
            </label>
            <select
              id="businessType"
              {...register("businessType", { required: "Selecciona el tipo de negocio" })}
              className={`bg-white block w-full py-[11px] px-3 pr-5 text-gray-700 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.businessType ? "border-red-500" : ""}`}
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
            {errors.businessType && (
              <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
            )}
          </div>

          {/* Número de empleados */}
          <div>
            <label htmlFor="employeeRange" className="block text-sm font-medium text-gray-700">
              Número de empleados
            </label>
            <select
              id="employeeRange"
              {...register("employeeRange", { required: "Selecciona un rango de empleados" })}
              className={`bg-white block w-full py-[11px] px-3 text-gray-700 border-[0.3px] rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-8 ${errors.employeeRange ? "border-red-500" : ""}`}
            >
              <option value="">Seleccione un rango</option>
              <option value="0-50">0 - 50</option>
              <option value="51-100">51 - 100</option>
              <option value="101-200">101 - 200</option>
              <option value="201-500">201 - 500</option>
              <option value="500+">500+</option>
            </select>
            {errors.employeeRange && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeRange.message}</p>
            )}
          </div>

          {/* Botón de continuar */}
          <div>
            <Button text="Continuar" styles="w-full" loading={loading} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default BusinessFormModal;

