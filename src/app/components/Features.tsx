'use client';
import React from "react";
import Card from "./Card";
import Eyebrow from "./Eyebrow";
import { motion } from "framer-motion";
import { Store, Wallet, Wrench, LayoutDashboard, Zap } from "lucide-react";

interface CardDataProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const cardData: CardDataProps[] = [
  {
    title: "Adecuado para todo tipo de negocio",
    text: "Retail, restaurantes, delivery o servicios: AmunPOS se adapta al flujo real de tu operación, no al revés.",
    icon: <Store className="size-5" />,
  },
  {
    title: "Rentable, con precio accesible",
    text: "Una solución completa sin costos ocultos, pensada para que el software nunca sea el obstáculo.",
    icon: <Wallet className="size-5" />,
  },
  {
    title: "Fácil de configurar, sin conocimientos técnicos",
    text: "Instálalo y empieza a vender en minutos. Sin integraciones complejas ni curva de aprendizaje.",
    icon: <Wrench className="size-5" />,
  },
  {
    title: "Panel moderno y atractivo",
    text: "Un dashboard claro y agradable de usar todos los días, diseñado para tu equipo, no solo para ti.",
    icon: <LayoutDashboard className="size-5" />,
  },
];

const Features: React.FC = () => {
  return (
    <div id="Caracteristicas" className="relative w-full px-5 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Eyebrow icon={<Zap className="size-3.5" />} text="Crece con AmunPOS" />
          <h2 className="mt-5 max-w-2xl text-center text-3xl font-medium leading-tight tracking-[-0.01em] text-strong-950 lg:text-[2.75rem]">
            Simple por fuera, sorprendentemente potente por dentro
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex w-full flex-wrap justify-center gap-5"
        >
          {cardData.map((data, index) => (
            <Card key={index} title={data.title} icon={data.icon} text={data.text} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
