import React from "react";
import { RiQuestionLine } from "@remixicon/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ButtonRoot } from "@/components/ui/button";

const faqData = [
  {
    question: "¿Cómo beneficia un sistema POS a mi negocio?",
    answer:
      "Un sistema POS mejora la eficiencia en las transacciones, te da información detallada sobre tus ventas y facilita la gestión de inventario. Además, te permite recompensar a tus clientes con puntos, descuentos u ofertas especiales.",
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
    answer:
      "Es funcionalidad activa, no una promesa: el asistente de negocio, la migración de datos, la lectura de facturas y la generación de horarios ya funcionan dentro de AmunPOS hoy. Seguimos sumando más capacidades de IA cada trimestre.",
  },
];

export default function Faq() {
  return (
    <section id="Faq" className="flex w-full scroll-mt-[72px] flex-col items-center px-5 py-20 lg:py-28">
      <span className="flex items-center gap-1.5 text-label-sm font-medium text-primary-base">
        <RiQuestionLine className="size-3.5" />
        ¿Tienes alguna pregunta?
      </span>
      <h2 className="mt-3 max-w-xl text-center text-title-h3 text-strong-950 lg:text-title-h2">Aquí hay algunas respuestas</h2>

      <Accordion className="mt-14 flex w-full max-w-[820px] flex-col gap-3" type="multiple">
        {faqData.map((item, index) => (
          <AccordionItem
            className="rounded-2xl border border-stroke-soft-200 bg-white-0 px-6 [&:not(:last-child)]:border-b-stroke-soft-200"
            value={`item-${index}`}
            key={index}
          >
            <AccordionTrigger className="py-5 text-left text-label-md text-strong-950 no-underline hover:no-underline">{item.question}</AccordionTrigger>
            <AccordionContent className="text-paragraph-sm text-sub-600">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 flex w-full max-w-[420px] flex-col items-center gap-4 rounded-2xl border border-stroke-soft-200 bg-weak-50 p-8 text-center">
        <div className="flex -space-x-2">
          {["/user1.png", "/user2.png", "/user3.png"].map((src) => (
            <img key={src} src={src} alt="" className="size-9 rounded-full border-2 border-white-0 object-cover" />
          ))}
        </div>
        <div>
          <h3 className="text-label-md text-strong-950">¿Sigues con dudas?</h3>
          <p className="mt-1 text-paragraph-sm text-sub-600">
            Si no encuentras lo que buscas, escríbenos y te respondemos directamente.
          </p>
        </div>
        <ButtonRoot size="small" asChild>
          <a href="#Contacto">Contáctanos</a>
        </ButtonRoot>
      </div>
    </section>
  );
}
