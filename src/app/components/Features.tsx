'use client';
import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

interface CardDataProps {
  title: string;
  text: string;
  icon: string;
}

const cardData: CardDataProps[] = [
  { 
    title: "Adecuado para todos los tipos de negocios", 
    text: "Nuestra satisfacción supera cualquier renuncia, incluso cuando parece insignificante.",
    icon: "/shop.svg"
  },
  { 
    title: "Rentable con Precio Asequible", 
    text: "Nuestra solución es económica y ofrece un excelente valor por el precio.",
    icon: "/price_bar.svg"
  },
  { 
    title: "Fácil de Configurar & Sin Conocimientos", 
    text: "Nuestro sistema es fácil de instalar y no requiere conocimientos técnicos avanzados.",
    icon: "/setup.svg"
  },
  { 
    title: "Panel de Usuario Moderno y Atractivo", 
    text: "Nuestro panel de usuario es moderno y fácil de usar, diseñado para mejorar tu experiencia. Explora sus características.",
    icon: "/ui.svg"
  }
];

const Features: React.FC = () => {
  return (
    <div className="relative w-full pt-35 pb-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-center"
       >
      <h4 className="text-center text-[var(--primary-color)] text-[18px] pb-2 font-semibold">
        Crea y Haz Crecer Tu Negocio con amunpos
      </h4>

      </motion.div>
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-center"
       >
      <h1 className="text-center text-[var(--heading-color)] text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold w-[90%]">
        Simple y Astutamente Complejo 
      </h1>
      <h1 className="text-center text-[var(--heading-color)] text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold w-[90%]">
        Nuestro Sistema de Punto de Venta
      </h1>
      </motion.div>

      <img src="/Vector.svg" alt="shape vector for background features" className="absolute right-0 top-[32%]"/>
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
       >
        <div className="flex flex-wrap justify-center gap-8 pt-20 px-10 md:px-20 w-full">
         {cardData.map((data, index) => (
          <Card key={index} title={data.title} icon={data.icon} text={data.text} />
         ))}
       </div>
      </motion.div>
    </div>
  );
};

export default Features;

