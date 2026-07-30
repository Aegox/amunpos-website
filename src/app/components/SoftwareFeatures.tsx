'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

interface Caracteristica {
  id: number;
  nombre: string;
  descripcion: string;
}

const caracteristicas: Caracteristica[] = [
  {
    id: 1,
    nombre: "Inventario con IA",
    descripcion: "Seguimiento por sucursal y predicción de stock: sabe qué comprar y cuándo, antes de que te quedes sin producto."
  },
  {
    id: 2,
    nombre: "Ventas, caja y pagos",
    descripcion: "Cobra en efectivo, tarjeta o transferencia, con caja, mesas y facturación integradas."
  },
  {
    id: 3,
    nombre: "Reportes y asistente con IA",
    descripcion: "Analítica en tiempo real y un asistente de negocio que te dice dónde ganas y dónde pierdes."
  },
  {
    id: 4,
    nombre: "Multisucursal y accesos",
    descripcion: "Controla stock, cajas, permisos y reportes por sucursal desde un mismo panel."
  }
];

const SoftwareFeatures: React.FC = () => {
  return (
    <section className="flex flex-col xl:flex-row w-full xl:w-auto items-center justify-center pt-5 lg:pb-20 pb-2 gap-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="w-[60%] 2xl:w-[36%] xl:w-[40%] lg:w-[50%]"
       >
      <Image src="/illustration.svg" alt="a people paying with a card of money" width={500} height={500} className="" /> 
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="pt-10 flex flex-col justify-center items-center w-full px-5 xl:w-[45%]"
       >
        <p className="text-left sm:w-[80%] w-[100%] md:w-[90%] text-[var(--primary-color)] text-[18px] pb-2 font-semibold">Características clave del software</p>
        <h1 className="pb-12 2xl:w-[90%] xl:w-[100%] sm:w-[80%] md:w-[90%] w-[100%] text-[var(--heading-color)]  text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">Características potentes con un diseño increíble</h1>
        <div className="flex flex-wrap gap-5 w-full justify-center">
          {caracteristicas.map((item) => (
            <article key={item.id} className="flex flex-col gap-5 sm:w-[80%] xl:w-[48%] md:w-[45%] w-[100%]">
              <span className=" bg-[var(--primary-color)] text-white rounded-[100%] w-[55px] h-[55px] p-4 text-[1.3rem] text-center">0{item.id}</span>
              <h3 className="w-full font-semibold text-[var(--heading-color)] text-[1.25rem]">{item.nombre}</h3>
              <p className="w-full text-[var(--body-color)]">{item.descripcion}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SoftwareFeatures;
