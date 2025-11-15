'use client';
import React from "react";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import Image from 'next/image';

interface PricingPlan {
  id: number;
  icon: string;
  title: string;
  target: string;
  price: string;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: "Básico",
    icon: "/symbol.svg",
    target: "Para pequeños negocios",
    price: "$24",
    features: [
      "Hasta 1 usuario",
      "Gestión de inventario",
      "Informes y análisis de ventas",
      "Funcionalidades avanzadas",
      "Escaneo de código de barras",
      "Soporte 24/7 gratuito"
    ]
  },
  {
    id: 2,
    title: "Estándar",
    icon: "/symbol1.svg",
    target: "Para profesionales",
    price: "$50",
    features: [
      "Hasta 1 usuario",
      "Gestión de inventario",
      "Informes y análisis de ventas",
      "Funcionalidades avanzadas",
      "Escaneo de código de barras",
      "Soporte 24/7 gratuito"
    ]
  },
  {
    id: 3,
    title: "Profesional",
    icon: "/symbol2.svg",
    target: "Para grandes empresas",
    price: "$85",
    features: [
      "Hasta 1 usuario",
      "Gestión de inventario",
      "Informes y análisis de ventas",
      "Funcionalidades avanzadas",
      "Escaneo de código de barras",
      "Soporte 24/7 gratuito"
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="Planes" className="relative flex flex-col justify-center items-center px-5 pb-22 pt-30 bg-[var(--body-color)] pricing-gradient">
      {/* Imágenes en el fondo */}
      <Image src="/Vector3.svg" alt="a vector shape" layout="fill" objectFit="contain" className="absolute top-45 right-0 z-[-1]" />
      {/*<Image src="/dot.svg" alt="a vector shape" layout="fill" objectFit="contain" className="absolute top-80 left-50 z-[-1]" />*/}

      {/* Contenido principal */}
      <div className="z-10 flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
       >
        <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">Nuestros precios</p>
      </motion.div>
      <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
className="z-10 flex flex-col items-center w-full"
       >
        <h1 className="text-center pb-10 xl:pb-25 xl:w-[65%] text-[var(--heading-color)]  text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">Planes transparentes, encuentra el ajuste perfecto que necesitas</h1>
        <div className="flex flex-col 2xl:px-35 xl:px-20 xl:flex-row w-full gap-6 items-center">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              icon={plan.icon}
              title={plan.title}
              target={plan.target}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

