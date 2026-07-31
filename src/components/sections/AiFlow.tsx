import React, { useState, useEffect, useRef } from "react";
import {
  RiCheckboxCircleFill,
  RiLoader4Line,
  RiCircleLine,
  RiSparkling2Fill,
  RiArrowRightDoubleLine,
  RiTruckLine,
  RiInstagramLine,
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
 *   alignui va construyendo una sola pantalla de login, aquí se recorre la vida
 *   del negocio: ENTRAR (montar el inventario sin teclear), REPONER (qué pedirle
 *   al proveedor) y VENDER MÁS (la publicación). Encadenarlos es lo que hace
 *   creíble que el asistente trabaja, en vez de responder preguntas sueltas.
 *
 * Los tres salen del deck y son los que más levantan la ceja de un dueño:
 * alta de productos desde facturas, `suggestPurchase` (velocidad de venta a
 * 30/60/90 días + stock + días de entrega del proveedor) y el generador de
 * marketing con contexto REAL (top vendidos del mes + brand kit + fecha clave).
 * Lo que los hace atractivos es que la IA usa los datos del negocio, no que
 * "tiene IA": por eso cada respuesta dice de dónde sacó la conclusión.
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
    prompt: "Móntame el inventario con estas facturas",
    promptCorto: "Monta el inventario",
    chat: [
      "Leí las 3 facturas: 47 productos con su costo.",
      "Les puse precio con tu margen y los dejé listos.",
    ],
    titulo: "Productos creados",
    filas: [
      { nombre: "Bandeja paisa", detalle: "Costo $16.000", valor: "$38.000" },
      { nombre: "Ajiaco santafereño", detalle: "Costo $13.000", valor: "$32.000" },
      { nombre: "Limonada de coco", detalle: "Costo $3.500", valor: "$11.000" },
      { nombre: "Cerveza", detalle: "Costo $4.500", valor: "$9.000" },
    ],
    pie: { icono: RiSparkling2Fill, texto: "47 productos · sin teclear ninguno" },
  },
  {
    prompt: "¿Qué le pido al proveedor esta semana?",
    promptCorto: "Qué pedir",
    chat: [
      "Miré cuánto vendes de cada uno en 30, 60 y 90 días.",
      "La Distribuidora tarda 3 días: pedí para cubrirlos.",
    ],
    titulo: "Pedido sugerido",
    filas: [
      { nombre: "Pollo", detalle: "Vendes 12 kg/día · quedan 2,5", valor: "60 kg" },
      { nombre: "Aguacate", detalle: "Vendes 8 kg/día · queda 1", valor: "40 kg" },
      { nombre: "Papa criolla", detalle: "Vendes 9 kg/día · quedan 6", valor: "50 kg" },
    ],
    pie: { icono: RiTruckLine, texto: "$980.000 · tú confirmas antes de enviar" },
  },
  {
    prompt: "Hazme un post para el Día de la Madre",
    promptCorto: "Haz un post",
    chat: [
      "Usé tus 3 platos más vendidos del mes y tu logo.",
      "Copy, hashtags e imagen 1080×1080 listos.",
    ],
    titulo: "Publicación lista",
    filas: [
      { nombre: "Imagen 1080×1080", detalle: "Con tus colores y tu logo" },
      { nombre: "Texto y hashtags", detalle: "3 variantes para elegir" },
      { nombre: "Bandeja paisa", detalle: "Tu plato más vendido", valor: "$38.000" },
    ],
    pie: { icono: RiInstagramLine, texto: "Publicar o compartir por WhatsApp" },
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
          No es un chat que responde: usa los datos de tu negocio. Monta el
          inventario, calcula qué pedirle al proveedor y arma tus publicaciones.
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
                  {/* El haz recorriendo el borde, solo en la pastilla activa.
                      Son dos capas apiladas, sin `mask-composite`: una que
                      recorta el cónico girando a la forma de la pastilla, y otra
                      del color del fondo que tapa el centro y deja a la vista
                      únicamente el anillo de 1 px. La versión con máscara no
                      pintaba nada — el navegador descartaba la declaración
                      entera —, y esta es geometría pura, así que no depende de
                      qué propiedades soporte cada navegador. */}
                  {trabajando && (
                    <>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px overflow-hidden rounded-full"
                      >
                        <span
                          // `key` con el paso: al cambiar de pastilla React monta
                          // un nodo nuevo y la vuelta arranca desde cero, en vez
                          // de heredar el ángulo de la anterior y entrar a medias.
                          key={paso}
                          className="haz-borde absolute left-1/2 top-1/2 aspect-square w-[115%] origin-center -translate-x-1/2 -translate-y-1/2"
                          style={{
                            // La vuelta dura lo que dura el paso: cierra el
                            // círculo y justo ahí pasa el relevo a la siguiente.
                            ["--vuelta" as string]: `${DURACION - 400}ms`,
                            backgroundImage:
                              "conic-gradient(from -100deg, transparent 0deg, transparent 4deg, var(--ai-base) 45deg, var(--ai-base) 92deg, transparent 92deg, transparent)",
                          }}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full bg-gray-0"
                      />
                    </>
                  )}

                  <span className="relative grid size-4 shrink-0 place-items-center">
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

                  <span className="relative md:hidden">{p.promptCorto}</span>
                  <span className="relative hidden md:inline">{p.prompt}</span>
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
