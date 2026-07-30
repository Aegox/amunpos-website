'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import PricingCard from "./PricingCard";

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
    target: "Para negocios que empiezan",
    price: "$29",
    features: [
      "POS para retail y restaurante",
      "Inventario y control de caja",
      "Facturación con IVA",
      "Predicción de stock con IA",
      "Multisucursal",
      "Domicilios y nómina"
    ]
  },
  {
    id: 2,
    title: "Estándar",
    icon: "/symbol1.svg",
    target: "Para negocios en crecimiento",
    price: "$49",
    features: [
      "Todo lo del plan Básico",
      "Multisucursal (hasta 3)",
      "Predicción de stock con IA",
      "Reportes y asistente con IA",
      "Domicilios con app de repartidor",
      "Nómina y marketing con IA"
    ]
  },
  {
    id: 3,
    title: "Profesional",
    icon: "/symbol2.svg",
    target: "Para cadenas y multisucursal",
    price: "$79",
    features: [
      "Todo lo del plan Estándar",
      "Sucursales ilimitadas",
      "Domicilios con app de repartidor propia",
      "Nómina con IA",
      "Marketing automático omnicanal",
      "Contabilidad y reportes P&L"
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="Planes" className="relative flex flex-col justify-center items-center px-5md:pt-30 pt-20 md:pb-22 pb-14 bg-[var(--body-color)] pricing-gradient">
      {/* Imágenes en el fondo */}
      <Image src="/Vector3.svg" alt="a vector shape" className="absolute top-45 right-0 z-[-1]" width={100} height={100} />
      <Image src="/dot.svg" alt="a vector shape" className="absolute top-80 left-50 z-[-1]" width={100} height={100} />

      {/* Contenido principal */}
      <div className="z-10 flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
       >
        <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">Nuestros precios</p>
      </motion.div>
      <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center w-full"
       >
        <h1 className="text-center pb-10 xl:pb-25 xl:w-[65%] text-[var(--heading-color)]  text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">Precios que crecen con tu negocio. Paga por sucursal, sin sorpresas.</h1>
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


