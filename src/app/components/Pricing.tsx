'use client';
import React from "react";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import Eyebrow from "./Eyebrow";
import { Tag } from "lucide-react";

interface PricingPlan {
  id: number;
  title: string;
  target: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Básico",
    target: "Para pequeños negocios",
    price: "$24",
    features: [
      "Hasta 1 usuario",
      "Gestión de inventario",
      "Informes y análisis de ventas",
      "Escaneo de código de barras",
      "Asistente IA incluido",
      "Soporte 24/7",
    ]
  },
  {
    id: 2,
    title: "Estándar",
    target: "Para profesionales",
    price: "$50",
    popular: true,
    features: [
      "Hasta 3 usuarios",
      "Gestión de inventario multi-sucursal",
      "Migración y facturación con IA",
      "Informes y análisis de ventas",
      "Escaneo de código de barras",
      "Soporte 24/7 prioritario",
    ]
  },
  {
    id: 3,
    title: "Profesional",
    target: "Para grandes empresas",
    price: "$85",
    features: [
      "Usuarios ilimitados",
      "Gestión de inventario multi-sucursal",
      "Todas las funciones de IA",
      "Informes y análisis avanzados",
      "Escaneo de código de barras",
      "Soporte 24/7 dedicado",
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="Planes" className="relative w-full bg-weak-50 px-5 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Eyebrow icon={<Tag className="size-3.5" />} text="Nuestros precios" />
          <h2 className="mt-5 max-w-xl text-center text-title-h3 text-strong-950 lg:text-title-h2">
            Planes transparentes, la IA incluida en todos
          </h2>
          <p className="mt-4 max-w-lg text-center text-paragraph-md text-sub-600">
            Sin costos ocultos ni complementos sorpresa: elige según el tamaño de tu equipo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 flex w-full flex-col items-center gap-8 xl:flex-row xl:items-stretch xl:gap-6"
        >
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              target={plan.target}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
