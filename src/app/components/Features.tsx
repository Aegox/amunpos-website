'use client';
import React from "react";
import Card from "./Card";
import Eyebrow from "./Eyebrow";
import { motion } from "framer-motion";
import { Boxes, Wallet, GitBranch, Users, Truck, LineChart } from "lucide-react";

interface CardDataProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const cardData: CardDataProps[] = [
  {
    title: "Cobra sin fricción",
    text: "Ventas rápidas, múltiples métodos de pago y tickets claros — tu equipo cobra en segundos, no en minutos.",
    icon: <Wallet className="size-5" />,
  },
  {
    title: "Inventario que no se descuadra",
    text: "Stock en tiempo real por sucursal, con alertas antes de que un producto se agote de verdad.",
    icon: <Boxes className="size-5" />,
  },
  {
    title: "Todas tus sucursales, un panel",
    text: "Compara ventas, stock y equipo entre locales sin abrir una hoja de cálculo.",
    icon: <GitBranch className="size-5" />,
  },
  {
    title: "Equipo y nómina bajo control",
    text: "Fichaje, horarios y pagos por país, sin depender de planillas sueltas.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Delivery con su propia app",
    text: "Repartidores con su propia app, estados de pedido en vivo y cobro al cerrar la ruta.",
    icon: <Truck className="size-5" />,
  },
  {
    title: "Reportes que sí usas",
    text: "Cifras del negocio explicadas en lenguaje simple, listas para decidir sin depender de un contador.",
    icon: <LineChart className="size-5" />,
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
          <Eyebrow text="Todo lo que un negocio necesita" />
          <h2 className="mt-5 max-w-2xl text-center text-title-h3 text-strong-950 lg:text-title-h2">
            Menos herramientas sueltas, más control real
          </h2>
          <p className="mt-4 max-w-xl text-center text-paragraph-md text-sub-600">
            Reemplaza la caja registradora, la hoja de cálculo de inventario y el grupo de
            WhatsApp de nómina por un solo sistema que habla entre sí.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
