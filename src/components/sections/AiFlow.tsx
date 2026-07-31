import React, { useState, useEffect, useRef } from "react";
import {
  RiCheckboxCircleFill,
  RiLoader4Line,
  RiCircleLine,
  RiSparkling2Fill,
  RiArrowRightDoubleLine,
  RiAlertLine,
  RiTruckLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

/**
 * El asistente trabajando, paso a paso.
 *
 * Réplica del recurso que alignui.com usa en su sección "Rapid Development":
 * unas pastillas de instrucción que se van completando una a una, unidas por
 * separadores, con líneas que bajan a un panel donde se ve el resultado en vivo.
 *
 * Dos decisiones propias:
 *
 * · **Allí el resultado es código; aquí es la pantalla del POS.** A un
 *   restaurante no le dice nada ver JSX escribiéndose: le dice ver aparecer sus
 *   platos con precio, la alerta de stock y el pedido al proveedor. El panel
 *   izquierdo es la conversación y el derecho lo que quedó hecho.
 *
 * · **Los tres pasos cuentan UNA historia, no tres cosas sueltas.** Igual que
 *   alignui va construyendo una sola pantalla de login, aquí se monta un
 *   negocio: primero entra la carta, luego se vigila el stock, y al final se le
 *   pide al proveedor lo que falta. Encadenarlos es lo que hace creíble que el
 *   asistente trabaja, en vez de responder preguntas sueltas.
 */

type Fila = { nombre: string; detalle: string; valor?: string };

const pasos: {
  prompt: string;
  promptCorto: string;
  chat: string[];
  titulo: string;
  filas: Fila[];
  pie?: { icono: React.ComponentType<{ className?: string }>; texto: string };
}[] = [
  {
    prompt: "Carga la carta desde esta foto del menú",
    promptCorto: "Carga la carta",
    chat: [
      "Leí la foto y encontré 14 platos.",
      "Los agrupé por categoría y detecté los precios.",
    ],
    titulo: "Productos creados",
    filas: [
      { nombre: "Bandeja paisa", detalle: "Fuertes", valor: "$38.000" },
      { nombre: "Ajiaco santafereño", detalle: "Fuertes", valor: "$32.000" },
      { nombre: "Limonada de coco", detalle: "Bebidas", valor: "$11.000" },
      { nombre: "Arepa de choclo", detalle: "Entradas", valor: "$12.000" },
    ],
    pie: { icono: RiSparkling2Fill, texto: "14 productos listos para vender" },
  },
  {
    prompt: "Avísame antes de que se acabe el pollo",
    promptCorto: "Vigila el stock",
    chat: [
      "Miré tus últimas 4 semanas de ventas.",
      "Gastas 12 kg al día: te aviso con 2 días de margen.",
    ],
    titulo: "Alerta configurada",
    filas: [
      { nombre: "Pollo", detalle: "Quedan 31 kg", valor: "2,5 días" },
      { nombre: "Papa criolla", detalle: "Quedan 48 kg", valor: "6 días" },
      { nombre: "Aguacate", detalle: "Quedan 9 kg", valor: "1 día" },
    ],
    pie: { icono: RiAlertLine, texto: "Aguacate se agota mañana" },
  },
  {
    prompt: "Ármale el pedido al proveedor",
    promptCorto: "Pide al proveedor",
    chat: [
      "Junté lo que está por acabarse en un solo pedido.",
      "Distribuidora La 33, entrega el jueves.",
    ],
    titulo: "Pedido de compra",
    filas: [
      { nombre: "Pollo", detalle: "60 kg", valor: "$540.000" },
      { nombre: "Aguacate", detalle: "40 kg", valor: "$260.000" },
      { nombre: "Papa criolla", detalle: "50 kg", valor: "$180.000" },
    ],
    pie: { icono: RiTruckLine, texto: "Total $980.000 · listo para enviar" },
  },
];

const DURACION = 4200;

export default function AiFlow() {
  const [paso, setPaso] = useState(0);
  // Solo anima cuando la sección está a la vista: un temporizador corriendo en
  // una sección que nadie ve gasta batería y desincroniza el recorrido.
  const [visible, setVisible] = useState(false);
  const seccionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0.25 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  // Depende de `paso` a propósito: así el temporizador se REINICIA cada vez que
  // cambia el paso, incluido cuando lo cambia el usuario pinchando. Con un
  // intervalo fijo, pinchar una pastilla podía saltar a la siguiente a los
  // pocos milisegundos, porque el reloj seguía corriendo por su cuenta.
  //
  // Avanza TAMBIÉN con "reducir movimiento" activado. Antes salía antes de
  // empezar, y en un equipo con esa opción puesta el recorrido no pasaba nunca
  // de la primera instrucción: parecía roto. Reducir movimiento significa que no
  // haya desplazamientos que mareen — el haz girando y el texto escribiéndose ya
  // los apaga el CSS —, no que el contenido se quede congelado. Con la opción
  // puesta cada paso dura más, para dar tiempo a leerlo sin animación que guíe.
  useEffect(() => {
    if (!visible) return;
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => setPaso((p) => (p + 1) % pasos.length),
      menosMovimiento ? DURACION * 1.6 : DURACION,
    );
    return () => clearTimeout(t);
  }, [visible, paso]);

  const actual = pasos[paso];

  return (
    <section ref={seccionRef} className="w-full px-5 py-16 xl:py-24">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        {/* ── Encabezado ── */}
        <span className="flex h-8 items-center gap-1.5 rounded-9 bg-gray-0 pl-2 pr-3 text-label-sm text-gray-700 shadow-button-white">
          <RiSparkling2Fill className="size-4 text-ai-base" />
          Asistente
        </span>
        <h2 className="mt-4 text-balance text-center text-title-h5 text-gray-950 md:text-title-h4 xl:text-title-h3">
          Dile lo que necesitas.
          <br className="hidden sm:inline" /> Lo deja hecho.
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-center text-paragraph-md text-gray-600 xl:text-paragraph-lg">
          Sin menús que aprender: el asistente monta tu carta, vigila el stock y
          arma el pedido al proveedor mientras tú atiendes.
        </p>

        {/* ── Las tres instrucciones ── */}
        <div className="mt-9 flex w-full items-center justify-start gap-2 overflow-x-auto px-1 py-2 md:justify-center md:gap-1 md:overflow-visible xl:mt-12">
          {pasos.map((p, i) => {
            const hecho = i < paso;
            const trabajando = i === paso;
            return (
              <React.Fragment key={p.prompt}>
                {i > 0 && (
                  <RiArrowRightDoubleLine
                    aria-hidden="true"
                    className="hidden size-5 shrink-0 text-gray-300 md:block"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setPaso(i)}
                  aria-current={trabajando}
                  className={cn(
                    "relative flex h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full pl-[15px] pr-4 text-label-sm outline-none transition duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary-base/40",
                    trabajando
                      ? "bg-gray-0 text-gray-800 shadow-[0_4px_8px_rgba(41,41,41,.06),0_2px_4px_rgba(41,41,41,.04),0_1px_2px_rgba(41,41,41,.04)]"
                      : hecho
                        ? "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200"
                        : "bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-200",
                  )}
                >
                  {/* El haz solo existe en la pastilla que se está ejecutando */}
                  {trabajando && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-full p-px"
                      style={{
                        mask: "linear-gradient(#000 0 0) exclude, linear-gradient(#000 0 0) content-box",
                        WebkitMask: "linear-gradient(#000 0 0) exclude, linear-gradient(#000 0 0) content-box",
                      }}
                    >
                      <span
                        // `key` con el paso: al cambiar de pastilla React monta
                        // un nodo nuevo y la vuelta arranca desde cero. Sin esto
                        // el haz heredaba el ángulo del anterior y entraba a
                        // media vuelta.
                        key={paso}
                        className="haz-borde absolute left-1/2 top-1/2 aspect-square w-full origin-center -translate-x-1/2 -translate-y-1/2"
                        style={{
                          // La vuelta dura lo que dura el paso: el haz cierra el
                          // círculo y justo ahí pasa el relevo a la siguiente.
                          ["--vuelta" as string]: `${DURACION - 400}ms`,
                          backgroundImage:
                            "conic-gradient(from -100deg, transparent 0deg, transparent 4deg, var(--ai-base) 45deg, var(--ai-base) 90deg, transparent 90deg, transparent)",
                        }}
                      />
                    </span>
                  )}

                  <span className="grid size-4 shrink-0 place-items-center">
                    <span key={`${i}-${hecho}-${trabajando}`} className="icono-entra col-start-1 row-start-1">
                      {hecho ? (
                        <RiCheckboxCircleFill className="size-4 text-ai-base" />
                      ) : trabajando ? (
                        <RiLoader4Line className="size-4 animate-spin text-ai-base" />
                      ) : (
                        <RiCircleLine className="size-4 text-gray-400" />
                      )}
                    </span>
                  </span>

                  <span className="md:hidden">{p.promptCorto}</span>
                  <span className="hidden md:inline">{p.prompt}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Las líneas que bajan al panel ── */}
        {/* El viewBox mide lo mismo que el panel (1004) para que las patas
            aterricen justo en sus esquinas. Con un ancho menor las líneas se
            quedaban colgando en el aire y el conjunto no se leía como una cosa
            conectada. `preserveAspectRatio=none` deja que se estiren a lo ancho
            sin deformar el grosor del trazo (vector-effect lo mantiene en 1px). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1004 48"
          preserveAspectRatio="none"
          className="hidden h-12 w-full max-w-[1004px] xl:block"
          fill="none"
        >
          {[
            "M2 48V40C2 31.16 9.16 24 18 24H486C494.84 24 502 16.84 502 8V0",
            "M502 30V48",
            "M1002 48V40C1002 31.16 994.84 24 986 24H518C509.16 24 502 16.84 502 8V0",
          ].map((d) => (
            <path
              key={d}
              d={d}
              className="traza-linea stroke-gray-200"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
            />
          ))}
        </svg>

        {/* ── El panel: conversación a la izquierda, resultado a la derecha ── */}
        <div className="mt-6 w-full max-w-[1004px] rounded-[24px] bg-gray-50 p-2 ring-1 ring-gray-200 xl:mt-0 xl:rounded-[28px] xl:p-2.5">
          <div className="grid w-full items-center px-3 py-2.5 md:grid-cols-[minmax(0,1fr)_360px] xl:px-4 xl:py-3">
            <div className="flex items-center gap-1.5 text-label-sm text-gray-600">
              <RiSparkling2Fill className="size-4 text-ai-base" />
              Asistente
              <span className="ml-1 size-1.5 shrink-0 rounded-full bg-ai-base" />
            </div>
            <div className="hidden items-center gap-1.5 pl-5 text-label-sm text-gray-450 md:flex">
              Resultado
            </div>
          </div>

          <div
            className="grid min-h-0 w-full overflow-hidden rounded-[16px] bg-gray-0 md:grid-cols-[minmax(0,1fr)_360px] xl:rounded-[20px]"
            style={{ boxShadow: "0 1px 1px .5px rgba(41,41,41,.04), 0 6px 6px -3px rgba(41,41,41,.04), 0 24px 24px -12px rgba(41,41,41,.04)" }}
          >
            {/* Conversación */}
            <div className="relative flex min-h-[240px] flex-col gap-3 p-5 md:min-h-[300px] md:border-r md:border-gray-100 xl:p-7">
              <div key={`tu-${paso}`} className="fila-entra self-end rounded-2xl rounded-br-md bg-gray-900 px-4 py-2.5 text-label-sm text-gray-0">
                {actual.prompt}
              </div>

              {actual.chat.map((linea, i) => (
                <div
                  key={`${paso}-${i}`}
                  className="fila-entra flex max-w-[92%] gap-2.5"
                  style={{ ["--i" as string]: i + 1 }}
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ai-light">
                    <RiSparkling2Fill className="size-3.5 text-ai-base" />
                  </span>
                  <span className="text-paragraph-sm text-gray-700">
                    <span className="escribe" style={{ ["--chars" as string]: linea.length }}>
                      {linea}
                    </span>
                  </span>
                </div>
              ))}

              {/* La barra de escritura ocupa el hueco de abajo y, sobre todo,
                  enseña dónde se le habla: sin ella el panel parecía una captura
                  de resultados, no una conversación. */}
              <div className="mt-auto flex items-center gap-2 rounded-full bg-gray-25 px-4 py-2.5 ring-1 ring-gray-200">
                <span className="text-paragraph-sm text-gray-450">Escribe lo que necesitas</span>
                <span className="animate-caret h-4 w-px bg-ai-base" />
              </div>
            </div>

            {/* Resultado */}
            <div className="flex flex-col border-t border-gray-100 p-5 md:border-t-0 xl:p-6">
              <div className="text-subheading-xs uppercase tracking-wide text-gray-450">
                {actual.titulo}
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {actual.filas.map((f, i) => (
                  <div
                    key={`${paso}-${f.nombre}`}
                    className="fila-entra flex items-center justify-between gap-3 rounded-xl bg-gray-25 px-3 py-2.5 ring-1 ring-gray-100"
                    style={{ ["--i" as string]: i + 2 }}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-label-sm text-gray-900">{f.nombre}</div>
                      <div className="text-paragraph-xs text-gray-500">{f.detalle}</div>
                    </div>
                    {f.valor && (
                      <div className="shrink-0 text-label-sm tabular-nums text-gray-700">{f.valor}</div>
                    )}
                  </div>
                ))}
              </div>

              {actual.pie && (
                <div
                  key={`pie-${paso}`}
                  className="fila-entra mt-3 flex items-center gap-2 rounded-xl bg-ai-light px-3 py-2.5 text-label-sm text-ai-dark"
                  style={{ ["--i" as string]: actual.filas.length + 2 }}
                >
                  <actual.pie.icono className="size-4 shrink-0" />
                  {actual.pie.texto}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
