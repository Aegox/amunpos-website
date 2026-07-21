'use client';
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Eyebrow from "./Eyebrow";
import { HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "¿Cómo beneficia un sistema POS a mi negocio?",
    answer: "Un sistema POS mejora la eficiencia en las transacciones, te da información detallada sobre tus ventas y facilita la gestión de inventario. Además, te permite recompensar a tus clientes con puntos, descuentos u ofertas especiales.",
  },
  {
    question: "¿Puedo integrar AmunPOS con mi tienda en línea?",
    answer: "Sí. AmunPOS se integra con tu tienda en línea, sincronizando inventario y pedidos tanto en canales digitales como en tus sucursales físicas.",
  },
  {
    question: "¿Necesito capacitación especial para usarlo?",
    answer: "No. AmunPOS está diseñado para ser intuitivo desde el primer uso. Aun así, ofrecemos soporte y capacitación gratuitos para asegurar que tu equipo lo aproveche al máximo.",
  },
  {
    question: "¿Qué tipo de análisis de ventas proporciona?",
    answer: "Reportes detallados sobre productos más vendidos, horas pico, comportamiento de clientes y mucho más, para ayudarte a tomar mejores decisiones comerciales.",
  },
  {
    question: "¿Cómo elijo el plan adecuado para mi negocio?",
    answer: "Considera el tamaño de tu operación, tu presupuesto y las funciones que más necesitas. Nuestro equipo puede ayudarte a encontrar el plan ideal sin compromiso.",
  },
  {
    question: "¿Qué tan real es la parte de inteligencia artificial?",
    answer: "Es funcionalidad activa, no una promesa: el asistente de negocio, la migración de datos, la lectura de facturas y la generación de horarios ya funcionan dentro de AmunPOS hoy. Seguimos sumando más capacidades de IA cada trimestre.",
  },
];

const Questions: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col items-center px-5 py-20 lg:py-28"
      id="Faq"
    >
      <Eyebrow icon={<HelpCircle className="size-3.5" />} text="¿Tienes alguna pregunta?" />
      <h2 className="mt-5 max-w-xl text-center text-title-h3 text-strong-950 lg:text-title-h2">
        Aquí hay algunas respuestas
      </h2>

      <Accordion className="mt-14 flex w-full max-w-[820px] flex-col gap-3" type="multiple">
        {faqData.map((item, index) => (
          <AccordionItem
            className="rounded-2xl border border-stroke-soft-200 bg-white-0 px-6 [&:not(:last-child)]:border-b-stroke-soft-200"
            value={`item-${index}`}
            key={index}
          >
            <AccordionTrigger className="py-5 text-left text-label-md text-strong-950 no-underline hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-paragraph-sm text-sub-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default Questions;
