import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import {
  RiLayoutGridLine,
  RiSparklingLine,
  RiShoppingCart2Line,
  RiStackLine,
  RiTeamLine,
  RiAlarmWarningLine,
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
}[] = [
  {
    id: "panel",
    label: "Panel",
    icon: RiLayoutGridLine,
    tagline: "Ventas, caja e inventario al instante",
    path: "dashboard",
  },
  {
    id: "ia",
    label: "Asistente",
    icon: RiSparklingLine,
    ai: true,
    badge: "IA",
    tagline: "Pregunta, migra y automatiza",
    path: "asistente",
  },
  {
    id: "ventas",
    label: "Ventas y caja",
    icon: RiShoppingCart2Line,
    tagline: "Cobra con cualquier método",
    path: "caja",
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: RiStackLine,
    tagline: "Stock por sucursal, con alertas",
    path: "inventario",
  },
  {
    id: "nomina",
    label: "Nómina",
    icon: RiTeamLine,
    tagline: "Fichaje, horarios y pagos",
    path: "equipo",
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

/** Cascarón de la app (rail lateral + barra superior) para que cada mockup se
 *  lea como una pantalla real de amunpos y no como una tarjeta suelta flotando
 *  en un marco vacío. Replica la estructura de la captura real del panel. */
function AppShell({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-1 bg-gray-950 py-3 sm:flex">
        <span className="mb-2 flex size-8 items-center justify-center rounded-[9px] bg-primary-base/15">
          <RiLayoutGridLine className="size-4 text-primary-base" />
        </span>
        {[RiShoppingCart2Line, RiStackLine, RiTeamLine, RiSparklingLine].map((Icon, i) => (
          <span key={i} className="flex size-8 items-center justify-center rounded-[9px]">
            <Icon className="size-4 text-gray-600" />
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 py-2.5">
          <div className="h-7 flex-1 rounded-9 bg-gray-50 ring-1 ring-inset ring-gray-200" />
          <span className="size-7 shrink-0 rounded-full bg-gray-100" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex shrink-0 items-center justify-between">
            <span className="text-label-md text-gray-900">{title}</span>
            {action}
          </div>
          <div className="mt-4 min-h-0 flex-1">{children}</div>
        </div>
      </div>
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
        className="ruler-frame relative -mx-5 flex w-[calc(100%+2.5rem)] items-stretch overflow-x-auto px-5 py-6 md:mx-0 md:w-full md:overflow-visible md:px-[26px]"
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
              {i > 0 && <span aria-hidden="true" className="my-1 w-px shrink-0 self-stretch bg-gray-200" />}
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

      {/* Vista previa grande */}
      <div className="relative mt-12 w-full max-w-[1080px]">
        {/* inset-x-0 en móvil: con -inset-x-8 el glow sobresalía y generaba
            scroll horizontal en la página (12px) */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 bottom-6 rounded-[48px] bg-primary-base/10 blur-[90px] sm:-inset-x-8" />
        <div key={`v-${active}`} className="animate-fade-up relative">
          {active === "panel" && (
            <Frame path="dashboard">
              <img
                src="/capture-of-pos.webp"
                width="1679"
                height="918"
                alt="Panel de amunpos con ventas, inventario y reportes"
                className="h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </Frame>
          )}

          {active === "ia" && (
            <Frame path="asistente">
              <AppShell
                title="Asistente"
                action={
                  <span className="flex items-center gap-1.5 rounded-full bg-ai-light px-2.5 py-1 text-label-xs text-ai-dark">
                    <RiSparklingLine className="size-3.5" />
                    En línea
                  </span>
                }
              >
                <div className="flex h-full flex-col justify-end gap-3 pb-1">
                  <div className="ml-auto max-w-[76%] rounded-2xl rounded-tr-sm bg-gray-100 px-4 py-2.5 text-paragraph-sm text-gray-800">
                    ¿Cuál fue mi producto más vendido esta semana?
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-ai-light px-4 py-2.5 text-paragraph-sm text-gray-800 ring-1 ring-inset ring-ai-base/20">
                    “Café Americano 12oz” — 214 unidades, 18% más que la semana pasada.
                  </div>
                  <div className="ml-auto max-w-[76%] rounded-2xl rounded-tr-sm bg-gray-100 px-4 py-2.5 text-paragraph-sm text-gray-800">
                    ¿Cuánto debo pedir para la próxima semana?
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-ai-light px-4 py-2.5 text-paragraph-sm text-gray-800 ring-1 ring-inset ring-ai-base/20">
                    Te alcanza hasta el jueves. Sugiero pedir 260 unidades.
                  </div>
                  <div className="mt-1 flex items-center gap-2 rounded-13 bg-gray-50 px-4 py-2.5 ring-1 ring-inset ring-gray-200">
                    <span className="flex-1 text-paragraph-sm text-gray-450">Escribe tu pregunta…</span>
                    <span className="flex size-6 items-center justify-center rounded-full bg-ai-base">
                      <RiSparklingLine className="size-3.5 text-gray-0" />
                    </span>
                  </div>
                </div>
              </AppShell>
            </Frame>
          )}

          {active === "ventas" && (
            <Frame path="caja">
              <AppShell title="Caja" action={<span className="text-paragraph-xs text-gray-450">Ticket #0412 · 11:42</span>}>
                <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
                  {/* Catálogo */}
                  <div className="hidden min-h-0 grid-cols-3 content-start gap-2.5 lg:grid">
                    {[
                      "Café Americano",
                      "Cappuccino",
                      "Latte 12oz",
                      "Croissant jamón",
                      "Medialuna",
                      "Agua mineral",
                      "Jugo naranja",
                      "Brownie",
                      "Sándwich",
                    ].map((p, i) => (
                      <div
                        key={p}
                        className={cn(
                          "flex h-[64px] flex-col justify-end rounded-13 p-2.5 text-paragraph-xs ring-1 ring-inset",
                          i === 0
                            ? "bg-primary-alpha-10 text-primary-dark ring-primary-base/25"
                            : "bg-gray-50 text-gray-700 ring-gray-200",
                        )}
                      >
                        {p}
                      </div>
                    ))}
                  </div>

                  {/* Ticket */}
                  <div className="flex min-h-0 flex-col rounded-13 bg-gray-50 p-4 ring-1 ring-inset ring-gray-200">
                    <div className="flex flex-col gap-2.5">
                      {[
                        ["Café Americano", "×2", "$7.00"],
                        ["Croissant jamón", "×1", "$4.20"],
                        ["Agua mineral", "×1", "$1.80"],
                      ].map(([name, qty, price]) => (
                        <div key={name} className="flex items-center gap-2 text-paragraph-xs">
                          <span className="flex-1 truncate text-gray-700">{name}</span>
                          <span className="text-gray-450">{qty}</span>
                          <span className="w-12 text-right text-gray-900">{price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="my-3 h-px w-full bg-gray-200" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-label-sm text-gray-900">Total</span>
                      <span className="text-title-h6 text-gray-900">$13.00</span>
                    </div>
                    <div className="mt-auto flex flex-col gap-2 pt-4">
                      <div className="flex gap-1.5">
                        {["Efectivo", "Tarjeta", "Transf."].map((m) => (
                          <span
                            key={m}
                            className={cn(
                              "flex-1 rounded-9 py-1.5 text-center text-paragraph-xs",
                              m === "Tarjeta"
                                ? "bg-primary-base text-gray-0"
                                : "bg-gray-0 text-gray-600 ring-1 ring-inset ring-gray-200",
                            )}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                      <span className="rounded-9 bg-gray-900 py-2 text-center text-label-sm text-gray-0">Cobrar</span>
                    </div>
                  </div>
                </div>
              </AppShell>
            </Frame>
          )}

          {active === "inventario" && (
            <Frame path="inventario">
              <AppShell
                title="Inventario"
                action={
                  <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-label-xs text-gray-700">
                    <RiAlarmWarningLine className="size-3.5" />2 bajos
                  </span>
                }
              >
                <div className="flex h-full flex-col">
                  <div className="grid shrink-0 grid-cols-[1fr_auto_auto] gap-x-4 border-b border-gray-200 pb-2 text-paragraph-xs text-gray-450">
                    <span>Producto</span>
                    <span className="w-20 text-right">Sucursal</span>
                    <span className="w-16 text-right">Stock</span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col justify-evenly">
                    {[
                      { name: "Café Americano 12oz", pct: 82, qty: "164", branch: "Centro" },
                      { name: "Cappuccino", pct: 64, qty: "98", branch: "Centro" },
                      { name: "Croissant de jamón", pct: 46, qty: "23", branch: "Centro" },
                      { name: "Medialunas", pct: 28, qty: "14", branch: "Norte" },
                      { name: "Vasos biodegradables", pct: 12, qty: "8", branch: "Norte", low: true },
                    ].map((p) => (
                      <div key={p.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4">
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <span className="truncate text-paragraph-sm text-gray-900">{p.name}</span>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={cn("h-full rounded-full", p.low ? "bg-gray-900" : "bg-primary-base")}
                              style={{ width: `${p.pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-20 text-right text-paragraph-xs text-gray-450">{p.branch}</span>
                        <span
                          className={cn(
                            "w-16 text-right text-paragraph-sm",
                            p.low ? "text-gray-900" : "text-gray-600",
                          )}
                        >
                          {p.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AppShell>
            </Frame>
          )}

          {active === "nomina" && (
            <Frame path="equipo">
              <AppShell title="Equipo" action={<span className="text-paragraph-xs text-gray-450">Turno mañana</span>}>
                <div className="flex h-full flex-col">
                  <div className="grid shrink-0 grid-cols-[1fr_auto_auto] gap-x-4 border-b border-gray-200 pb-2 text-paragraph-xs text-gray-450">
                    <span>Empleado</span>
                    <span className="w-24 text-right">Entrada</span>
                    <span className="w-20 text-right">Horas</span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col justify-evenly">
                    {[
                      { name: "Valeria Ríos", role: "Cajera", time: "08:02", hrs: "6h 12m", on: true },
                      { name: "Marco Tovar", role: "Cocina", time: "07:58", hrs: "6h 16m", on: true },
                      { name: "Lucía Peña", role: "Mesera", time: "08:15", hrs: "5h 59m", on: true },
                      { name: "Ana Gómez", role: "Repartidora", time: "Sin fichar", hrs: "—", on: false },
                    ].map((e) => (
                      <div key={e.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-label-xs text-gray-700">
                            {e.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")}
                          </span>
                          <div className="min-w-0">
                            <div className="truncate text-paragraph-sm text-gray-900">{e.name}</div>
                            <div className="text-paragraph-xs text-gray-450">{e.role}</div>
                          </div>
                        </div>
                        <span className="flex w-24 items-center justify-end gap-1.5 text-paragraph-xs text-gray-600">
                          <span className={cn("size-1.5 rounded-full", e.on ? "bg-primary-base" : "bg-gray-300")} />
                          {e.time}
                        </span>
                        <span className="w-20 text-right text-paragraph-sm text-gray-600">{e.hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AppShell>
            </Frame>
          )}
        </div>
      </div>
    </div>
  );
}
