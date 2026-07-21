'use client';

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FileScan, CalendarClock, Import, MessageCircle, Wand2, ArrowUpRight } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { Badge } from "@/components/ui/badge";

interface AIFeature {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const aiFeatures: AIFeature[] = [
  {
    title: "Asistente de negocio 24/7",
    text: "Pregúntale en lenguaje natural: “¿cuál fue mi producto más vendido esta semana?” y obtén la respuesta al instante, sin abrir un reporte.",
    icon: <MessageCircle className="size-5" />,
  },
  {
    title: "Migración de datos sin planillas",
    text: "Sube tu inventario o catálogo actual como está — Excel, PDF, foto — y la IA lo acomoda en AmunPOS por ti.",
    icon: <Import className="size-5" />,
  },
  {
    title: "Facturas que se leen solas",
    text: "Fotografía una factura de proveedor y la IA extrae productos, cantidades y precios listos para registrar.",
    icon: <FileScan className="size-5" />,
  },
  {
    title: "Horarios de equipo en minutos",
    text: "Describe turnos y disponibilidad; la IA arma el horario semanal de tu equipo y lo ajusta cuando algo cambia.",
    icon: <CalendarClock className="size-5" />,
  },
];

const roadmapItems = [
  "Sugerencia de compras según tu velocidad de venta real",
  "Publicaciones de marketing con la identidad de tu marca",
];

const AIShowcase: React.FC = () => {
  return (
    <section id="IA" className="relative w-full overflow-hidden bg-strong-950 px-5 py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-feature-base/20 blur-[140px]" />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <Eyebrow icon={<Sparkles className="size-3.5" />} text="Impulsado por IA" tone="purple" className="border-feature-base/30 bg-white/5 text-feature-light" />
          <h2 className="mt-5 max-w-2xl text-title-h3 text-white lg:text-title-h2">
            La IA que hace el trabajo, no la que promete magia
          </h2>
          <p className="mt-4 max-w-xl text-paragraph-md text-white/60">
            Cuatro tareas que antes te robaban horas — migrar datos, leer facturas, armar
            horarios y entender tus números — ahora las resuelve la IA de AmunPOS mientras tú
            atiendes el negocio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {aiFeatures.map((feature, index) => (
            <article
              key={index}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-feature-base/40 hover:bg-white/[0.06]"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-feature-base/30 bg-feature-base/15 text-feature-light">
                {feature.icon}
              </div>
              <h3 className="text-title-h6 text-white">{feature.title}</h3>
              <p className="text-paragraph-sm text-white/60">{feature.text}</p>
            </article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex w-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:justify-between"
        >
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Badge color="purple" variant="light">
                Próximamente
              </Badge>
              <span className="flex items-center gap-1 text-label-sm text-white/70">
                <Wand2 className="size-3.5" /> En el roadmap de IA
              </span>
            </div>
            <ul className="flex flex-col gap-1 text-paragraph-sm text-white/50">
              {roadmapItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <a
            href="#Contacto"
            className="flex shrink-0 items-center gap-1.5 text-label-sm font-medium text-feature-light transition-colors duration-200 hover:text-white"
          >
            Cuéntanos qué necesitas
            <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AIShowcase;
