import React, { useEffect, useState } from "react";

// Cada frase con su emoji. El emoji NO se teclea: aparece cuando la frase ya
// está entera y se va en cuanto empieza a borrarse.
//
// Se deja fuera del texto que se escribe a propósito. Un emoji saliendo letra a
// letra no significa nada —es un solo carácter, así que aparecería de golpe a
// mitad del tecleo— y encima cuenta doble en `slice`, con lo que se veía medio
// emoji roto en un fotograma. Poniéndolo aparte, remata la frase justo cuando
// termina de escribirse, que es donde hace gracia.
const frases = [
  { texto: "vender más", emoji: "💰" },
  { texto: "ahorrar tiempo", emoji: "⏳" },
  { texto: "crecer rápido", emoji: "🚀" },
];
const words = frases.map((f) => f.texto);

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

  const completa = !deleting && charCount === words[wordIndex].length;

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
      {/* El emoji, solo con la frase entera. Va DESPUÉS del cursor y con margen
          propio para que no se solapen. */}
      {completa && (
        <span aria-hidden="true" className="emoji-remate ml-[0.08em] inline-block">
          {frases[wordIndex].emoji}
        </span>
      )}
      <span className="sr-only">{words[wordIndex]}</span>
    </span>
  );
}
