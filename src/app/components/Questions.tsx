'use client';
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "¿Cómo beneficia un sistema POS a mi negocio?",
    answer: "Un sistema POS beneficia a tu negocio al mejorar la eficiencia en las transacciones, proporcionar información detallada sobre las ventas y ayudar a gestionar inventarios. Además, facilita la recompensa a los clientes con puntos, descuentos o ofertas especiales.",
  },
  {
    question: "¿Puedo integrar el sistema POS con mi tienda en línea?",
    answer: "Sí, muchos sistemas POS permiten la integración con tiendas en línea, lo que facilita la sincronización de inventarios y la gestión de pedidos tanto en línea como en tiendas físicas.",
  },
  {
    question: "¿Necesito capacitación especial para usar un sistema POS?",
    answer: "Generalmente, no se requiere capacitación especial para usar un sistema POS, ya que suelen ser intuitivos y fáciles de usar. Sin embargo, algunas empresas ofrecen soporte y capacitación para asegurar un uso óptimo.",
  },
  {
    question: "¿Qué tipo de análisis de ventas proporciona un sistema POS?",
    answer: "Un sistema POS proporciona análisis detallados de las ventas, incluyendo datos sobre productos más vendidos, horas pico de ventas, y comportamiento del cliente. Esto ayuda a tomar decisiones informadas para mejorar las estrategias de ventas.",
  },
  {
    question: "¿Cómo puedo elegir el sistema POS adecuado para mi negocio?",
    answer: "Para elegir el sistema POS adecuado, considera el tipo de negocio, tamaño, presupuesto, características requeridas y potencial de crecimiento futuro. Investiga varias opciones y lee reseñas para tomar una decisión informada.",
  },
];

const Questions: React.FC = () => {
  
  return (
    <motion.div
           initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center py-28 px-5 lg:px-[10%] w-full h-full "
            id="Faq"
    >
    <motion.div
           initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
    >
       <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">¿Tienes alguna pregunta?</p>
    </motion.div>
       <h1 className="text-center pb-10 xl:pb-25 xl:w-[65%] text-[var(--heading-color)]  text-[2rem] 2xl:text-[42px] lg:text-[2.5em] leading-[1.4em] font-bold">Aquí hay algunas respuestas</h1>
       
      <Accordion className="flex flex-col gap-6 w-full lg:w-[850px] " type="multiple">
        {faqData.map((item, index) => (
            <AccordionItem className="acordion-container border-[0.1px] border-gray-400 rounded-lg px-5 lg:px-16 py-5 transition-all duration-400" value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-[18px] transition-all duration-400 hover:text-[var(--primary-color)] lg:text-[22px] text-[var(--heading-color)] font-semibold no-underline hover:no-underline" style={{ textDecoration: 'none' }}>{item.question}</AccordionTrigger>
            <AccordionContent className="text-[1rem] text-[var(--body-color)]">
              {item.answer.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default Questions;
