'use client';
import React from "react";
import { Store, ShoppingCart, Coffee, ShoppingBag, Globe, Building2, Sparkles as SparklesIcon, MoreHorizontal } from 'lucide-react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Eyebrow from "./Eyebrow";

const useCases = [
  { label: "Tiendas minoristas", icon: Store },
  { label: "Supermercados", icon: ShoppingCart },
  { label: "Restaurantes y cafeterías", icon: Coffee },
  { label: "Tiendas de conveniencia", icon: ShoppingBag },
  { label: "Negocios en línea", icon: Globe },
  { label: "Hostelería y hoteles", icon: Building2 },
  { label: "Salones y spas", icon: SparklesIcon },
  { label: "Y muchos más", icon: MoreHorizontal },
];

const UseCases: React.FC = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-col-reverse items-center gap-14 px-5 py-16 lg:flex-row lg:gap-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-[80%] max-w-md lg:w-[42%]"
      >
        <div className="overflow-hidden rounded-2xl border border-stroke-soft-200 bg-weak-50 p-8">
          <Image src="/illustration1.svg" alt="Persona pagando con tarjeta" width={500} height={500} className="w-full" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex w-full flex-col lg:w-[54%]"
      >
        <Eyebrow icon={<Store className="size-3.5" />} text="Un mismo sistema, cualquier rubro" />
        <h2 className="mt-5 text-title-h3 text-strong-950 lg:text-title-h2">
          Tu negocio crece distinto al de al lado — AmunPOS se adapta al tuyo
        </h2>
        <p className="mt-4 text-paragraph-md text-sub-600">
          No importa si vendes por mostrador, por mesa o por ruta de entrega: la configuración
          se ajusta a cómo trabajas de verdad, no al revés.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {useCases.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-xl border border-stroke-soft-200 bg-white-0 px-4 py-3"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-primary-base">
                <Icon className="size-4" />
              </span>
              <span className="text-label-sm text-strong-950">{label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default UseCases;
