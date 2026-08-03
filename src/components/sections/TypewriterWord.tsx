import React, { useEffect, useState } from "react";

const words = ["vender más", "ahorrar tiempo", "crecer rápido"];

export default function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = deleting ? 40 : 70;
    const pause = 1400;

    if (!deleting && charCount === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charCount === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => setCharCount((c) => c + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [charCount, deleting, wordIndex]);

  // Sin reservar ancho: el <h1> se ajusta al texto real y queda CENTRADO en todo
  // momento (reservar el ancho de la palabra más larga era justo lo que dejaba el
  // título visualmente desplazado a la izquierda). Como el titular va en una sola
  // línea, la altura no cambia y nada de lo que está debajo se mueve.
  // El cursor se saca del flujo (absolute) para que no sume ancho y el re-centrado
  // sea solo por letras reales.
  return (
    <span className="relative whitespace-nowrap">
      {words[wordIndex].slice(0, charCount)}
      {/* Ancla invisible. El cursor se coloca respecto a esta caja (`top-1/2`),
          y al borrarse la última letra la caja se quedaba SIN ALTO: el cursor
          pegaba un salto arriba y abajo cada vez que se acababa una palabra.
          Un espacio de ancho cero no suma ni un píxel de ancho —así el titular
          sigue centrándose solo por las letras de verdad— pero sí le da a la
          caja el alto de la línea. */}
      <span aria-hidden="true">&#8203;</span>
      <span
        aria-hidden="true"
        className="animate-caret absolute -right-[0.06em] top-1/2 h-[0.78em] w-[3px] -translate-y-1/2 rounded-full bg-primary-base"
      />
      <span className="sr-only">{words[wordIndex]}</span>
    </span>
  );
}
