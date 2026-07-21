import React, { useState, useEffect } from "react";
import { RiMessage3Line, RiArrowLeftSLine, RiArrowRightSLine, RiStarFill, RiDoubleQuotesL } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface Testimonial {
  client: string;
  company: string;
  review: string;
  rating: number;
  img: string;
}

const testimonials: Testimonial[] = [
  {
    client: "Wizard Bona",
    company: "Voila Caffe",
    review: "AmunPOS transformó por completo cómo gestionamos la caja y el inventario. El equipo se adaptó en un día, sin capacitación extra.",
    rating: 5,
    img: "/user1.png",
  },
  {
    client: "Ansari Patron",
    company: "Green Lodge",
    review: "Los reportes en tiempo real nos permitieron tomar decisiones que antes tardaban semanas. Un antes y un después para el negocio.",
    rating: 4.5,
    img: "/user2.png",
  },
  {
    client: "Tonima Mozeja",
    company: "Almas Market",
    review: "El soporte responde rapidísimo y el sistema nunca nos ha dejado a mitad de una venta. Justo lo que necesitábamos.",
    rating: 4,
    img: "/user3.png",
  },
  {
    client: "Wizard Bona",
    company: "Voila Caffe",
    review: "La IA nos leyó las facturas de tres proveedores en minutos. Lo que hacíamos a mano un día completo, ahora es de una sentada.",
    rating: 5,
    img: "/user4.png",
  },
  {
    client: "Ansari Patron",
    company: "Green Lodge",
    review: "Migramos todo nuestro inventario con la IA de AmunPOS sin tocar una hoja de cálculo. Datos siempre sincronizados entre sucursales.",
    rating: 4.5,
    img: "/user5.png",
  },
  {
    client: "Tonima Mozeja",
    company: "Almas Market",
    review: "El asistente de IA responde preguntas del negocio al instante — ya no espero al cierre de mes para saber qué se vendió mejor.",
    rating: 5,
    img: "/user3.png",
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <RiStarFill key={n} className={cn("size-4", n <= Math.round(rating) ? "text-primary-base" : "text-stroke-sub-300")} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setVisibleCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const goTo = (i: number) => setIndex(Math.min(Math.max(i, 0), maxIndex));

  return (
    <section id="Testimonios" className="w-full scroll-mt-[72px] px-5 py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <span className="flex items-center gap-1.5 text-label-sm font-medium text-primary-base">
          <RiMessage3Line className="size-3.5" />
          Comentarios de clientes
        </span>
        <h2 className="mt-3 max-w-2xl text-center text-title-h3 text-strong-950 lg:text-title-h2">
          Negocios que ya recuperaron su tiempo
        </h2>

        <div className="relative mt-14 w-full overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${index} * (100% / ${visibleCount} + 1.25rem)))` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="shrink-0" style={{ width: `calc(100% / ${visibleCount} - ${((visibleCount - 1) * 1.25) / visibleCount}rem)` }}>
                <article className="flex h-full w-full flex-col rounded-2xl border border-stroke-soft-200 bg-white-0 p-8 shadow-regular-xs">
                  <RiDoubleQuotesL className="size-7 text-brand-200" />
                  <p className="mt-4 flex-1 text-paragraph-sm text-sub-600">{t.review}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-stroke-soft-200 pt-5">
                    <img src={t.img} alt={`Foto de ${t.client}`} className="size-11 shrink-0 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <h3 className="text-label-sm text-strong-950">{t.client}</h3>
                      <span className="text-paragraph-xs text-soft-400">{t.company}</span>
                    </div>
                    <div className="ml-auto">
                      <RatingStars rating={t.rating} />
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            aria-label="Anterior"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="flex size-9 items-center justify-center rounded-full border border-stroke-soft-200 text-strong-950 transition-colors duration-200 hover:bg-weak-50 disabled:opacity-30"
          >
            <RiArrowLeftSLine className="size-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={cn("h-2 rounded-full transition-all duration-300", index === i ? "w-6 bg-primary-base" : "w-2 bg-stroke-sub-300 hover:bg-soft-400")}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            aria-label="Siguiente"
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            className="flex size-9 items-center justify-center rounded-full border border-stroke-soft-200 text-strong-950 transition-colors duration-200 hover:bg-weak-50 disabled:opacity-30"
          >
            <RiArrowRightSLine className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
