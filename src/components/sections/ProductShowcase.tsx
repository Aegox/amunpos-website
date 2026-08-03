import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import {
  RiLayoutGridLine,
  RiSparklingLine,
  RiShoppingCart2Line,
  RiStackLine,
  RiTeamLine,
  RiLockLine,
  RiShareBoxLine,
  RiAddLine,
  RiFileCopyLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

type TabId = "panel" | "ia" | "ventas" | "inventario" | "nomina";

const tabs: {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ai?: boolean;
  badge?: string;
  tagline: string;
  path: string;
  /** Nombre del archivo en /public/capturas, sin extension. */
  captura: string;
  alt: string;
}[] = [
  {
    id: "panel",
    label: "Panel",
    icon: RiLayoutGridLine,
    tagline: "Ventas, caja e inventario al instante",
    path: "dashboard",
    captura: "panel",
    alt: "Panel de amunpos con las ventas del dia, los metodos de pago y el margen",
  },
  {
    id: "ia",
    label: "Asistente",
    icon: RiSparklingLine,
    ai: true,
    badge: "IA",
    tagline: "Pregunta, migra y automatiza",
    path: "asistente",
    captura: "asistente",
    alt: "El asistente de IA de amunpos abierto sobre el panel",
  },
  {
    id: "ventas",
    label: "Ventas y caja",
    icon: RiShoppingCart2Line,
    tagline: "Cobra con cualquier método",
    path: "caja",
    captura: "caja",
    alt: "Pantalla de caja de amunpos con el historial de cierres",
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: RiStackLine,
    tagline: "Stock por sucursal, con alertas",
    path: "inventario",
    captura: "inventario",
    alt: "Inventario de amunpos con stock, costo y margen por producto",
  },
  {
    id: "nomina",
    label: "Nómina",
    icon: RiTeamLine,
    tagline: "Fichaje, horarios y pagos",
    path: "equipo",
    captura: "equipo",
    alt: "Modulo de equipo de amunpos con el listado de empleados",
  },
];

/** Ventana de navegador (semáforo de colores + URL centrada con candado),
 *  el mismo encuadre que usa alignui.com para presentar su producto. */
function Frame({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-gray-200 bg-gray-0 shadow-[0_28px_70px_-24px_rgba(16,24,40,0.28)]">
      <div className="relative flex items-center gap-2 bg-gray-50 px-4 py-3.5">
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />

        <span className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-paragraph-sm text-gray-600">
          <RiLockLine className="size-3.5 text-gray-450" />
          <span className="hidden sm:inline">app.amunpos.com/{path}</span>
        </span>

        <span className="ml-auto flex items-center gap-3 text-gray-400">
          <RiShareBoxLine className="size-4" />
          <RiAddLine className="size-4" />
          <RiFileCopyLine className="size-4" />
        </span>
      </div>
      {/* Alto fijo: cambiar de pestaña no debe mover el resto de la página */}
      <div className="h-[320px] overflow-hidden border-t border-gray-200 sm:h-[400px] lg:h-[460px]">{children}</div>
    </div>
  );
}


export default function ProductShowcase() {
  const [active, setActive] = useState<TabId>("panel");
  const current = tabs.find((t) => t.id === active)!;
  const activeIndex = tabs.findIndex((t) => t.id === active);

  // La línea indicadora se MIDE del botón activo, no se calcula por porcentaje.
  //
  // Antes era `width: 100/tabs.length %` con `translateX(i * 100%)`, y quedaba
  // descuadrada respecto al icono por tres motivos a la vez: el contenedor tiene
  // `px-[26px]` y un elemento absoluto se posiciona contra la caja de relleno,
  // así que arrastraba esos 26 px; los 4 divisores de 1 px se comen ancho que el
  // porcentaje no descuenta; y en móvil las columnas son de ancho fijo (190 px)
  // en vez de repartirse por igual, así que el porcentaje ni se acerca.
  //
  // Midiendo el botón no hay nada que suponer: funciona con cualquier padding,
  // número de pestañas o punto de ruptura.
  const listaRef = useRef<HTMLDivElement>(null);
  const botonesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [marca, setMarca] = useState<{ left: number; width: number } | null>(null);

  const medir = useCallback(() => {
    const lista = listaRef.current;
    const boton = botonesRef.current[activeIndex];
    if (!lista || !boton) return;
    // offsetLeft es relativo al contenedor posicionado, así que ya descuenta el
    // padding y el desplazamiento horizontal del carrusel en móvil.
    setMarca({ left: boton.offsetLeft, width: boton.offsetWidth });
  }, [activeIndex]);

  useLayoutEffect(() => {
    medir();
    const lista = listaRef.current;
    if (!lista) return;
    // Al cambiar de tamaño el contenedor cambian los anchos de columna.
    const observador = new ResizeObserver(medir);
    observador.observe(lista);
    // Las fuentes web cambian el ancho del texto al cargar y desplazan las
    // columnas; sin esto la línea se queda donde estaba con la fuente de reserva.
    document.fonts?.ready.then(medir).catch(() => {});
    return () => observador.disconnect();
  }, [medir]);

  return (
    <div className="flex flex-col items-center">
      {/* Selector: columnas separadas por divisores dentro de un marco de
          "regla" con puntos en las esquinas — el mismo encuadre que usa
          alignui.com en la sección que sigue a su hero. El icono de la
          pestaña activa se rellena con el color de marca (animado). */}
      <div
        ref={listaRef}
        role="tablist"
        aria-label="Capacidades de amunpos"
        /* `md:w-[calc(100%-60px)]` — el marco va METIDO respecto a los dos raíles de la
           página, no al ras. Estaba a 1240, exactamente el ancho de los
           raíles, así que sus dos rayas horizontales morían justo encima de
           ellos y el conjunto se leía como una sola caja soldada a la
           retícula. En alignui.com el marco ocupa un 95 % de lo que separan
           los raíles, y esa franja de aire a cada lado es lo que lo deja
           respirar como pieza aparte.

           Con márgenes NO vale: el padre es un flex en columna con
           `items-center`, así que el ancho `auto` encoge la caja hasta el
           contenido y el marco se quedaba en 1061 en vez de 1180. */
        className="ruler-frame relative -mx-5 flex w-[calc(100%+2.5rem)] items-stretch overflow-x-auto px-5 py-6 md:mx-0 md:w-[calc(100%-60px)] md:overflow-visible md:px-[26px]"
      >
        <span className="corner-dot hidden md:block" style={{ left: 0, top: 0, transform: "translate(-50%, -50%)" }} />
        <span className="corner-dot hidden md:block" style={{ right: 0, top: 0, transform: "translate(50%, -50%)" }} />
        <span className="corner-dot hidden md:block" style={{ left: 0, bottom: 0, transform: "translate(-50%, 50%)" }} />
        <span className="corner-dot hidden md:block" style={{ right: 0, bottom: 0, transform: "translate(50%, 50%)" }} />

        {/* Indicador activo: una línea corta de color que se desliza sobre el
            borde superior del marco, como en alignui.com. El contenedor mide lo
            que una columna y se desplaza con transform; la línea visible va
            centrada dentro y es corta. */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-px left-0 h-0.5 transition-[transform,width] duration-300 ease-out",
            // Hasta que se mide, oculta: pintarla en 0,0 daría un salto visible
            // en la primera carga.
            marca ? "opacity-100" : "opacity-0",
          )}
          style={
            marca
              ? { width: `${marca.width}px`, transform: `translateX(${marca.left}px)` }
              : undefined
          }
        >
          <span
            className={cn(
              "mx-auto block h-full w-12 rounded-full transition-colors duration-300",
              current.ai ? "bg-ai-base" : "bg-primary-base",
            )}
          />
        </span>

        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <React.Fragment key={tab.id}>
              {/* Margen NEGATIVO para comerse parte del `py-6` del marco: los
                  divisores tienen que quedar a unos 18 px de las rayas de
                  arriba y abajo, que es la proporción de alignui.com (110 de
                  146). Con el relleno tal cual se quedaban a 28 y el bloque se
                  veía descosido por el centro. */}
              {i > 0 && <span aria-hidden="true" className="-my-1.5 w-px shrink-0 self-stretch bg-gray-200" />}
              <button
                ref={(el) => { botonesRef.current[i] = el; }}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className="group flex w-[190px] shrink-0 flex-col items-center px-4 text-center outline-none md:w-auto md:flex-1"
              >
                {/* En reposo: fondo gris con el icono en negro. Al
                    seleccionarlo se le da la vuelta — el fondo pasa al color de
                    marca y el icono a blanco.
                    Antes solo se teñía el icono de azul sobre el mismo gris, y
                    a un vistazo las cinco pastillas se veían iguales: había que
                    fijarse en el tono del dibujito para saber cuál estaba
                    puesta. Invirtiendo el bloque entero se ve desde lejos. */}
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-[14px] ring-1 ring-inset transition-colors duration-300 ease-out group-focus-visible:ring-2 group-focus-visible:ring-primary-base/40",
                    isActive
                      ? cn("text-gray-0 ring-transparent", tab.ai ? "bg-ai-base" : "bg-primary-base")
                      : "bg-gray-50 text-gray-900 ring-transparent group-hover:bg-gray-100",
                  )}
                >
                  <Icon className="size-5" />
                </span>

                <span className="mt-4 flex items-center justify-center gap-1.5">
                  <span
                    className={cn(
                      "text-label-sm transition-colors duration-200",
                      isActive ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900",
                    )}
                  >
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span className="rounded-[5px] bg-ai-light px-1.5 py-0.5 text-subheading-xs text-ai-dark">
                      {tab.badge}
                    </span>
                  )}
                </span>

                <span className="mt-1 max-w-[200px] text-pretty text-paragraph-xs text-gray-600">{tab.tagline}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Sin título ni descripción aquí: cada card del selector ya lleva su
          propio texto, repetirlo debajo era redundante. */}

      {/* Vista previa grande: CAPTURAS REALES del producto.
          Antes esto eran maquetas dibujadas a mano con divs — una pantalla de
          caja, una tabla de inventario, una lista de empleados—, y por muy
          cuidadas que estuvieran nunca eran el producto: cualquier cambio en la
          app las dejaba mintiendo, y quien compara con la demo nota la
          diferencia enseguida. Ahora son capturas de la app corriendo, sacadas
          con Playwright contra una cuenta de demo con datos de verdad.

          Se regeneran con los guiones del scratchpad (`sembrar.mjs` para los
          datos y `capturas.mjs` para las fotos) apuntando a la API local. */}
      <div className="relative mt-12 w-full max-w-[1080px]">
        {/* inset-x-0 en móvil: con -inset-x-8 el glow sobresalía y generaba
            scroll horizontal en la página (12px) */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 bottom-6 rounded-[48px] bg-primary-base/10 blur-[90px] sm:-inset-x-8" />
        <div key={`v-${active}`} className="animate-fade-up relative">
          <Frame path={current.path}>
            <img
              src={`/capturas/${current.captura}.webp`}
              width="1440"
              height="900"
              alt={current.alt}
              className="h-full w-full object-cover object-top"
              /* La primera no va diferida: es lo que se ve al abrir la página y
                 con `lazy` aparecía en blanco un instante. */
              loading={active === "panel" ? "eager" : "lazy"}
              decoding="async"
            />
          </Frame>
        </div>
      </div>
    </div>
  );
}
