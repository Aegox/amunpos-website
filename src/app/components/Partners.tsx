'use client';
import { motion } from "framer-motion";
import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';

interface Integration {
  name: string;
  icon: React.ReactNode;
}

const integrations: Integration[] = [
  { name: "WhatsApp", icon: <FaWhatsapp /> },
  { name: "Instagram", icon: <FaInstagram /> },
  { name: "Facebook", icon: <FaFacebookF /> },
];

const Partners: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="pb-20 h-full w-full px-5 flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">
          Marketing omnicanal, automático
        </p>
        <h1 className="w-full text-center pb-10 text-[var(--heading-color)] font-bold text-[1.6rem] lg:text-[2rem]">
          Tu negocio, siempre presente donde están tus clientes
        </h1>
      </motion.div>
      <ul className="flex w-full items-center justify-center flex-wrap gap-8 lg:gap-16">
        {integrations.map((item) => (
          <li key={item.name} className="flex flex-col items-center gap-3 text-[var(--body-color)] transition-colors duration-300 hover:text-[var(--primary-color)]">
            <span className="text-[3rem] lg:text-[3.5rem]">{item.icon}</span>
            <span className="text-[1rem] font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
      <p className="pt-8 text-center text-[var(--body-color)] max-w-[560px]">
        AmunPOS publica y responde por ti en tus redes — sin contratar a nadie.
      </p>
    </motion.div>
  );
};

export default Partners;
