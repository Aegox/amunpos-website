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
    question: "¿AmunPOS sirve para retail y para restaurantes?",
    answer: "Sí. La misma plataforma cubre la tienda de la esquina y el restaurante con mesas: carrito, descuentos, pago dividido, plano de mesas y cortes de caja. No necesitas dos sistemas distintos.",
  },
  {
    question: "¿Puedo manejar varias sucursales?",
    answer: "Sí, AmunPOS es multisucursal desde el diseño. Controlas stock, cajas, permisos y reportes por local, con analítica consolidada de todo el negocio en un solo panel.",
  },
  {
    question: "¿Qué incluye el delivery? ¿Cobran comisión por pedido?",
    answer: "El delivery viene con app de repartidor propia, zonas y mapa, dentro de tu plan. No cobramos comisión por pedido como las apps de terceros: tú te quedas con tu margen.",
  },
  {
    question: "¿Cómo me ayuda la IA en el día a día?",
    answer: "La IA predice tu stock y sugiere qué comprar, recomienda precios, te asiste con un chat de negocio y genera reportes de utilidad. Además, el marketing automático atrae clientes según lo que tienes en stock y las fechas clave.",
  },
  {
    question: "Ya uso otro POS. ¿Puedo migrar mis datos?",
    answer: "Sí. AmunPOS importa tu información desde otros sistemas de punto de venta, así que empiezas con tus productos e inventario cargados, sin volver a hacerlo a mano.",
  },
  {
    question: "¿Cuánto cuesta y puedo probarlo antes?",
    answer: "Los planes van desde US$29 al mes por sucursal e incluyen lo que otros cobran aparte (delivery y nómina según el plan). Puedes empezar con una prueba gratis y crecer sumando sucursales y módulos cuando lo necesites.",
  },
];

const Questions: React.FC = () => {
  
  return (
    <motion.div
           initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center md:py-28 py-16 px-5 lg:px-[10%] w-full h-full "
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
