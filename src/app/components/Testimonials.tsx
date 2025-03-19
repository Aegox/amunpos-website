"use client";
import TestimonialsCard from "./TestimonialsCard";
import React, { useState, useRef, useEffect } from 'react';

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
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 5,
    img: "/user1.png"
  },
  {
    client_name: "Ansari Patron",
    company: "Green Lodge",
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 4.5,
    img: "/user2.png"
  },
  {
    client_name: "Tonima Mozeja",
    company: "Almas Market",
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 4,
    img: "/user3.png"
  },
  {
    client_name: "Wizard Bona",
    company: "Voila Caffe",
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 5,
    img: "/user4.png"
  },
  {
    client_name: "Ansari Patron",
    company: "Green Lodge",
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 4.5,
    img: "/user5.png"
  },
  {
    client_name: "Tonima Mozeja",
    company: "Almas Market",
    client_review: "Estoy encantado/a de compartir mi experiencia con el software de Poze. Sus soluciones de IA han revolucionado verdaderamente la forma en que operan las empresas. Han establecido un nuevo estándar en la industria. ¡Muy recomendado/a!",
    rating: 5,
    img: "/user3.png"
  }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(370);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        // Si es mobile, usamos el ancho del contenedor padre; si no, usamos 370px
        if (containerRef.current?.parentElement) {
          setCardWidth(mobile ? containerRef.current.parentElement.offsetWidth : 370);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalTestimonials = testimonialsData.length;
    const visibleTestimonials = 1; // Se muestra 1 testimonial a la vez
    const maxIndex = totalTestimonials - visibleTestimonials;

    // Dots: en mobile, uno por testimonial; en desktop, 3 (inicio, medio y fin)
    const dotIndices = isMobile 
      ? Array.from({ length: totalTestimonials }, (_, i) => i)
      : [0, Math.floor(maxIndex / 2), maxIndex];

    useEffect(() => {
        if (containerRef.current) {
            const translateX = -currentIndex * cardWidth;
            containerRef.current.style.transform = `translateX(${translateX}px)`;
        }
    }, [currentIndex, cardWidth]);

    return (
        <section className="flex flex-col items-center w-full h-full py-25 px-10 overflow-x-hidden">
            <p className="w-full text-center text-[var(--primary-color)] text-[18px] font-semibold pb-2">
                Comentarios de clientes
            </p>
            <h1 className="w-[90%] text-center pb-10 xl:pb-25 xl:w-[65%] text-[var(--heading-color)] text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">
                Voces de satisfacción. Testimonios que hablan de nuestra excelencia.
            </h1>

            <div className="relative h-full w-full">
                <div
                    ref={containerRef}
                    className="flex items-center justify-start transition-transform duration-500 gap-10"
                    style={{
                        width: `${totalTestimonials * cardWidth}px`,
                    }}
                >
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} style={{ width: `${cardWidth}px` }}>
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

            {/* Dots de navegación */}
            <div className="flex justify-center mt-10">
                {dotIndices.map((targetIndex, i) => (
                    <button
                        key={i}
                        className={`h-3 w-3 rounded-full mx-1 focus:outline-none ${
                            currentIndex === targetIndex
                                ? 'bg-[var(--primary-color)]'
                                : 'bg-gray-300 hover:bg-gray-500'
                        }`}
                        onClick={() => setCurrentIndex(targetIndex)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;


