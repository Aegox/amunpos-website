"use client";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineAppstore, AiOutlineDollar, AiOutlineBarChart, AiOutlineHeart } from 'react-icons/ai';

interface Outcome {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const outcomes: Outcome[] = [
  {
    icon: <AiOutlineAppstore />,
    title: "Todo en un solo lugar",
    text: "Deja de saltar entre POS, Excel, WhatsApp y apps de delivery. Un solo sistema para vender, controlar y hacer crecer tu negocio.",
  },
  {
    icon: <AiOutlineDollar />,
    title: "Menos comisiones, más margen",
    text: "Delivery con app de repartidor propia y módulos incluidos: te quedas con lo que otras herramientas se llevan en comisiones.",
  },
  {
    icon: <AiOutlineBarChart />,
    title: "Decisiones con datos, no a ojo",
    text: "Reportes de utilidad y un asistente con IA que te dice, en tiempo real, dónde ganas y dónde pierdes.",
  },
  {
    icon: <AiOutlineHeart />,
    title: "Clientes que vuelven",
    text: "Fidelización y marketing automático que premian la recurrencia y mantienen tu negocio lleno.",
  },
];

const Testimonials = () => {
  return (
    <section id="Testimonios" className="flex flex-col items-center w-full h-full py-25 px-6 lg:px-[8%]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="w-full flex flex-col items-center"
      >
        <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">
          Lo que vas a lograr
        </p>
        <h1 className="w-[90%] text-center pb-12 xl:pb-16 xl:w-[65%] text-[var(--heading-color)] text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">
          Resultados reales para tu negocio, desde el primer día
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1000px]"
      >
        {outcomes.map((o) => (
          <article
            key={o.title}
            className="flex flex-col gap-4 p-8 rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl"
          >
            <span className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[var(--primary-color)] text-white text-[1.6rem]">
              {o.icon}
            </span>
            <h3 className="text-[1.25rem] font-semibold text-[var(--heading-color)]">{o.title}</h3>
            <p className="text-[var(--body-color)]">{o.text}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
