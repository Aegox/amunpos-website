import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

/**
 * Diego asomado por encima del modal de "Crear cuenta", agarrado del borde con las dos manos.
 * Lógica copiada del concepto aprobado (amunpos-marca/diseno/conceptos/onboarding/artefacto):
 * el cuerpo sube desde detrás del borde con un recorte, y cuando ya está arriba aparece encima
 * la imagen completa para que los dedos monten sobre el modal. Luego respira.
 *
 * Medidas de la WebP (660 × 491): `BORDE` es la fila donde va el borde superior del modal.
 */
const IMG = { src: "/ilustraciones/asomados/diego-asomado.webp", ancho: 660, alto: 491, borde: 411.6 };
// Ancho en pantalla: el modal de 460 lleva a Diego de ~330 px (485 × 0,68 de la WebP de referencia).
const PROPORCION = (485 * 0.68) / 460;
const CURVA = "cubic-bezier(.16,1,.3,1)";
const CAE = "cubic-bezier(.5,0,.75,0)";

export type PersonajeAsomadoRef = {
  /** Baja detrás del borde (0,42 s). Resuelve cuando ya se escondió. */
  salir: () => Promise<void>;
  /** En celular, mientras se escribe: se esconde (0,38 s) o vuelve a subir. */
  esconder: (si: boolean) => void;
};

/** Alto que ocupa por encima del borde del modal, para reservar ese espacio arriba. */
export function altoSobreBorde(anchoModal: number, movil: boolean) {
  const ancho = anchoModal * PROPORCION * (movil ? 0.78 : 1);
  return (ancho * IMG.borde) / IMG.ancho;
}

export const PersonajeAsomado = forwardRef<
  PersonajeAsomadoRef,
  { anchoModal: number; movil: boolean; retraso: number }
>(function PersonajeAsomado({ anchoModal, movil, retraso }, ref) {
  const raiz = useRef<HTMLDivElement>(null);
  const cuerpo = useRef<HTMLImageElement>(null);
  const completo = useRef<HTMLImageElement>(null);
  const escondido = useRef(false);
  const [listo, setListo] = useState(false);

  const ancho = anchoModal * PROPORCION * (movil ? 0.78 : 1);
  const escala = ancho / IMG.ancho;
  const alto = IMG.alto * escala;
  const borde = IMG.borde * escala;
  const desde = `translate(0px, ${borde * 0.9}px)`;

  const entrar = useCallback(
    (demora: number) => {
      const c = cuerpo.current, k = completo.current, r = raiz.current;
      if (!c || !k || !r) return;
      c.getAnimations().forEach((a) => a.cancel());
      k.getAnimations().forEach((a) => a.cancel());
      r.getAnimations().forEach((a) => a.cancel());
      k.style.opacity = "0";
      c.animate([{ transform: desde }, { transform: "translate(0px, 0px)" }], { duration: 1000, delay: demora, easing: CURVA, fill: "backwards" });
      // Los dedos aparecen cuando ya está arriba: la imagen completa encima, sin recorte.
      k.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, delay: demora + 760, easing: "ease-out", fill: "forwards" });
      // Luego respira: 3 px arriba y abajo cada 4,2 s.
      r.animate([{ translate: "0 0" }, { translate: "0 -3px" }, { translate: "0 0" }], { duration: 4200, delay: demora + 1100, iterations: Infinity, easing: "ease-in-out" });
    },
    [desde],
  );

  const bajar = useCallback(
    (duracion: number) => {
      const c = cuerpo.current, k = completo.current;
      if (!c || !k) return Promise.resolve();
      k.getAnimations().forEach((a) => a.cancel());
      k.style.opacity = "0";
      return c.animate([{ transform: "translate(0px, 0px)" }, { transform: desde }], { duration: duracion, easing: CAE, fill: "forwards" }).finished.then(() => undefined);
    },
    [desde],
  );

  useImperativeHandle(ref, () => ({
    salir: () => bajar(420),
    esconder: (si) => {
      if (si === escondido.current) return;
      escondido.current = si;
      if (si) bajar(380);
      else entrar(0);
    },
  }), [bajar, entrar]);

  // Entra una sola vez, cuando la imagen ya cargó (si no, el recorte anima un hueco).
  useLayoutEffect(() => {
    if (listo) entrar(retraso);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo]);

  // Si la imagen ya estaba en caché, puede no disparar onLoad después de montar.
  useEffect(() => {
    if (cuerpo.current?.complete && cuerpo.current.naturalWidth) setListo(true);
  }, []);

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className="pointer-events-none absolute z-[2]"
      style={{ width: ancho, height: alto, left: anchoModal / 2 - ancho / 2, top: -borde + 1 }}
    >
      {/* El cuerpo: solo lo que queda por encima del borde del modal. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 ${alto - borde}px 0)` }}>
        <img
          ref={cuerpo}
          src={IMG.src}
          alt=""
          draggable={false}
          onLoad={() => setListo(true)}
          className="absolute left-0 top-0 h-full w-full select-none"
          style={{ transform: listo ? undefined : desde }}
        />
      </div>
      {/* Completa y encima: así se ven los dedos sobre el borde. */}
      <img ref={completo} src={IMG.src} alt="" draggable={false} className="absolute left-0 top-0 h-full w-full select-none" style={{ opacity: 0 }} />
    </div>
  );
});
