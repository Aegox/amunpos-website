import React, { useState } from "react";
import {
  RiLayoutGridLine,
  RiSparklingLine,
  RiShoppingCart2Line,
  RiStackLine,
  RiTeamLine,
  RiAlarmWarningLine,
  RiCheckLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

type TabId = "panel" | "ia" | "ventas" | "inventario" | "nomina";

const tabs: {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ai?: boolean;
  path: string;
  title: string;
  desc: string;
  bullets?: string[];
}[] = [
  {
    id: "panel",
    label: "Panel",
    icon: RiLayoutGridLine,
    path: "dashboard",
    title: "Todo tu negocio, en una sola pantalla",
    desc: "Ventas, caja, inventario y utilidad del día en tiempo real — sin abrir cinco herramientas para entender cómo va el negocio.",
  },
  {
    id: "ia",
    label: "IA",
    icon: RiSparklingLine,
    ai: true,
    path: "asistente",
    title: "Pregúntale a tu negocio, como si hablaras con un socio",
    desc: "El asistente responde en lenguaje natural, migra tu inventario desde Excel o una foto, y lee las facturas de tus proveedores por ti.",
    bullets: [
      "Responde preguntas de negocio al instante",
      "Migra tu catálogo sin planillas",
      "Lee facturas de proveedores automáticamente",
    ],
  },
  {
    id: "ventas",
    label: "Ventas",
    icon: RiShoppingCart2Line,
    path: "caja",
    title: "Cobra en segundos, con el método que tu cliente prefiera",
    desc: "Carrito rápido, pago dividido y tickets claros. La misma caja sirve para la tienda de la esquina y para el restaurante con mesas.",
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: RiStackLine,
    path: "inventario",
    title: "Stock que no se descuadra entre sucursales",
    desc: "Existencias en tiempo real por local, con alertas antes de que un producto se agote de verdad.",
  },
  {
    id: "nomina",
    label: "Nómina",
    icon: RiTeamLine,
    path: "equipo",
    title: "Equipo y nómina bajo control, sin planillas sueltas",
    desc: "Fichaje por PIN, horarios generados con IA y pagos por país, todo desde el mismo panel.",
  },
];

/** Marco de "ventana de navegador" común a todas las vistas previas. */
function Frame({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-0 shadow-[0_28px_70px_-24px_rgba(16,24,40,0.28)]">
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="size-2.5 rounded-full bg-gray-300" />
        <span className="ml-3 hidden rounded-md bg-gray-0 px-2.5 py-1 text-paragraph-xs text-gray-450 ring-1 ring-gray-200 sm:inline">
          app.amunpos.com/{path}
        </span>
      </div>
      {/* Alto fijo: cambiar de pestaña no debe mover el resto de la página */}
      <div className="h-[300px] overflow-hidden sm:h-[380px] lg:h-[440px]">{children}</div>
    </div>
  );
}

/** Cascarón de la app (rail lateral + barra superior) para que cada mockup se
 *  lea como una pantalla real de AmunPOS y no como una tarjeta suelta flotando
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

  return (
    <div className="flex flex-col items-center">
      {/* Selector de iconos clickeables */}
      <div
        role="tablist"
        aria-label="Capacidades de AmunPOS"
        className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-2"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                "group flex items-center gap-2.5 rounded-13 px-3.5 py-2.5 transition duration-200 ease-out",
                isActive
                  ? "bg-gray-0 text-gray-900 shadow-button-white ring-1 ring-gray-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-[9px] transition duration-200",
                  isActive
                    ? tab.ai
                      ? "bg-ai-base text-gray-0"
                      : "bg-primary-base text-gray-0"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200",
                )}
              >
                <Icon className="size-[18px]" />
              </span>
              <span className="text-label-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Texto de la capacidad activa */}
      <div key={`t-${active}`} className="animate-fade-up mt-10 max-w-2xl text-center">
        <h3 className="text-pretty text-title-h6 text-gray-900 md:text-title-h5">{current.title}</h3>
        <p className="mt-3 text-pretty text-paragraph-md text-gray-600">{current.desc}</p>
        {current.bullets && (
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {current.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-paragraph-sm text-gray-700">
                <RiCheckLine className="size-4 shrink-0 text-ai-base" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vista previa grande */}
      <div className="relative mt-10 w-full max-w-[1080px]">
        <div className="pointer-events-none absolute -inset-x-8 -top-6 bottom-6 rounded-[48px] bg-primary-base/10 blur-[90px]" />
        <div key={`v-${active}`} className="animate-fade-up relative">
          {active === "panel" && (
            <Frame path="dashboard">
              <img
                src="/capture-of-pos.webp"
                width="1679"
                height="918"
                alt="Panel de AmunPOS con ventas, inventario y reportes"
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
