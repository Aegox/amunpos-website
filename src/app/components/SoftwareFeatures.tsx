'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import Eyebrow from "./Eyebrow";
import { Layers } from "lucide-react";

interface Caracteristica {
  id: number;
  nombre: string;
  descripcion: string;
}

const caracteristicas: Caracteristica[] = [
  {
    id: 1,
    nombre: "Gestión de inventario",
    descripcion: "Seguimiento preciso y en tiempo real de los productos en stock, sucursal por sucursal."
  },
  {
    id: 2,
    nombre: "Proceso de ventas y pagos",
    descripcion: "Transacciones rápidas y seguras, con un análisis detallado de cada venta."
  },
  {
    id: 3,
    nombre: "Informes y análisis",
    descripcion: "Reportes claros que te ayudan a tomar decisiones informadas sobre tu negocio."
  },
  {
    id: 4,
    nombre: "Transacciones rápidas y seguras",
    descripcion: "Pagos protegidos que cuidan la información de tus clientes en cada cobro."
  }
];

const SoftwareFeatures: React.FC = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-14 px-5 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="w-[80%] max-w-md lg:w-[42%]"
      >
        <div className="overflow-hidden rounded-2xl border border-stroke-soft-200 bg-weak-50 p-8">
          <Image src="/illustration.svg" alt="Persona pagando con tarjeta" width={500} height={500} className="w-full" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex w-full flex-col lg:w-[54%]"
      >
        <Eyebrow icon={<Layers className="size-3.5" />} text="Características clave del software" />
        <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.01em] text-strong-950 lg:text-[2.5rem]">
          Funciones potentes con un diseño cuidado al detalle
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {caracteristicas.map((item) => (
            <article key={item.id} className="flex flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-sm font-medium text-brand-700">
                0{item.id}
              </span>
              <h3 className="font-medium text-strong-950">{item.nombre}</h3>
              <p className="text-sm leading-relaxed text-sub-600">{item.descripcion}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SoftwareFeatures;
