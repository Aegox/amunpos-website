"use client";
import TestimonialsCard from "./TestimonialsCard";
import Eyebrow from "./Eyebrow";
import { motion } from "framer-motion";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface testimonialsDataProps {
  client_name: string;
  company: string;
  client_review: string;
  rating: number;
  img: string;
}

const testimonialsData: testimonialsDataProps[] = [
  {
    client_name: "Wizard Bona",
    company: "Voila Caffe",
    client_review: "AmunPOS transformó por completo cómo gestionamos la caja y el inventario. El equipo se adaptó en un día, sin capacitación extra.",
    rating: 5,
    img: "/user1.png"
  },
  {
    client_name: "Ansari Patron",
    company: "Green Lodge",
    client_review: "Los reportes en tiempo real nos permitieron tomar decisiones que antes tardaban semanas. Un antes y un después para el negocio.",
    rating: 4.5,
    img: "/user2.png"
  },
  {
    client_name: "Tonima Mozeja",
    company: "Almas Market",
    client_review: "El soporte responde rapidísimo y el sistema nunca nos ha dejado a mitad de una venta. Justo lo que necesitábamos.",
    rating: 4,
    img: "/user3.png"
  },
  {
    client_name: "Wizard Bona",
    company: "Voila Caffe",
    client_review: "La IA nos leyó las facturas de tres proveedores en minutos. Lo que hacíamos a mano un día completo, ahora es de una sentada.",
    rating: 5,
    img: "/user4.png"
  },
  {
    client_name: "Ansari Patron",
    company: "Green Lodge",
    client_review: "Migramos todo nuestro inventario con la IA de AmunPOS sin tocar una hoja de cálculo. Datos siempre sincronizados entre sucursales.",
    rating: 4.5,
    img: "/user5.png"
  },
  {
    client_name: "Tonima Mozeja",
    company: "Almas Market",
    client_review: "El asistente de IA responde preguntas del negocio al instante — ya no espero al cierre de mes para saber qué se vendió mejor.",
    rating: 5,
    img: "/user3.png"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setVisibleCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonialsData.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = (i: number) => setCurrentIndex(Math.min(Math.max(i, 0), maxIndex));

  return (
    <section id="Testimonios" className="w-full px-5 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Eyebrow icon={<MessageCircle className="size-3.5" />} text="Comentarios de clientes" />
          <h2 className="mt-5 max-w-2xl text-center text-title-h3 text-strong-950 lg:text-title-h2">
            Negocios que ya recuperaron su tiempo
          </h2>
        </motion.div>

        <div className="relative mt-14 w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (100% / ${visibleCount} + 1.25rem)))` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="shrink-0" style={{ width: `calc(100% / ${visibleCount} - ${((visibleCount - 1) * 1.25) / visibleCount}rem)` }}>
                <TestimonialsCard
                  client={testimonial.client_name}
                  company={testimonial.company}
                  img={testimonial.img}
                  rating={testimonial.rating}
                  review={testimonial.client_review}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            aria-label="Anterior"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex size-9 items-center justify-center rounded-full border border-stroke-soft-200 text-strong-950 transition-colors duration-200 hover:bg-weak-50 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-brand-500' : 'w-2 bg-stroke-sub-300 hover:bg-soft-400'
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            aria-label="Siguiente"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === maxIndex}
            className="flex size-9 items-center justify-center rounded-full border border-stroke-soft-200 text-strong-950 transition-colors duration-200 hover:bg-weak-50 disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
