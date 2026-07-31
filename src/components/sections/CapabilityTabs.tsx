import React, { useState } from "react";
import { RiSparklingLine, RiShoppingCart2Line, RiStackLine, RiTeamLine, RiCheckLine, RiAlarmWarningLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

// Chrome de "ventana de app" compartido por los 3 mockups no-IA: mismos puntos
// + misma pastilla de URL, para que las 3 lean como capturas de la MISMA app
// (no una imagen genérica repetida sin relación con la tab activa).
function AppWindow({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-[300px] w-full max-w-sm flex-col overflow-hidden rounded-18 border border-gray-200 shadow-button-white">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <span className="size-2.5 rounded-full bg-gray-300"></span>
        <span className="size-2.5 rounded-full bg-gray-300"></span>
        <span className="size-2.5 rounded-full bg-gray-300"></span>
        <span className="ml-2 truncate rounded-md bg-gray-0 px-2 py-0.5 text-paragraph-xs text-gray-450 ring-1 ring-gray-200">
          app.amunpos.com/{path}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-gray-0 p-5">{children}</div>
    </div>
  );
}

const tabs = [
  {
    id: "ia",
    label: "IA",
    icon: RiSparklingLine,
    badge: "NUEVO",
    title: "Pregúntale a tu negocio, como si hablaras con un socio",
    desc: "El asistente de IA de AmunPOS responde preguntas de negocio en lenguaje natural, migra tu inventario desde Excel o una foto, y lee las facturas de tus proveedores por ti.",
  },
  {
    id: "ventas",
    label: "Ventas",
    icon: RiShoppingCart2Line,
    badge: null,
    title: "Cobra en segundos, con el método que tu cliente prefiera",
    desc: "Ventas rápidas, múltiples métodos de pago y tickets claros — tu equipo cobra en segundos, no en minutos.",
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: RiStackLine,
    badge: null,
    title: "Stock que no se descuadra entre sucursales",
    desc: "Stock en tiempo real por sucursal, con alertas antes de que un producto se agote de verdad.",
  },
  {
    id: "nomina",
    label: "Nómina",
    icon: RiTeamLine,
    badge: null,
    title: "Equipo y nómina bajo control, sin planillas sueltas",
    desc: "Fichaje, horarios generados con IA y pagos por país, todo desde el mismo panel.",
  },
];

export default function CapabilityTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  const isAI = active === "ia";

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="mx-auto flex w-full max-w-xl flex-wrap items-center justify-center gap-1 rounded-full bg-gray-50 p-1 shadow-badge-gray">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex h-10 items-center gap-2 rounded-full px-3.5 text-label-sm transition duration-200",
                isActive ? "bg-gray-0 text-gray-900 shadow-button-white" : "text-gray-600 hover:text-gray-800",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full",
                  isActive && tab.id === "ia" ? "bg-ai-base text-gray-0" : "bg-gray-100 text-gray-500",
                )}
              >
                <Icon className="size-3.5" />
              </span>
              {tab.label}
              {tab.badge && isActive && (
                <span className="-ml-1 rounded-full bg-ai-light px-1.5 text-subheading-xs text-ai-dark">{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div key={`text-${active}`} className="w-full animate-fade-up lg:w-1/2">
          <h3 className="text-title-h5 text-gray-900">{current.title}</h3>
          <p className="mt-3 text-paragraph-md text-gray-600">{current.desc}</p>
          {isAI && (
            <ul className="mt-5 flex flex-col gap-2.5">
              {["Responde preguntas de negocio al instante", "Migra tu catálogo sin planillas", "Lee facturas de proveedores automáticamente"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-paragraph-sm text-gray-700">
                  <RiCheckLine className="size-4 shrink-0 text-ai-base" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div key={`visual-${active}`} className="w-full animate-fade-up lg:w-1/2" style={{ animationDelay: "0.05s" }}>
          {active === "ia" && (
            <div
              className="mx-auto flex h-[300px] w-full max-w-sm flex-col overflow-hidden rounded-18 bg-gray-925 p-5"
              style={{ boxShadow: "var(--shadow-ai-glow)" }}
            >
              <div className="flex shrink-0 items-center gap-2 border-b border-white/10 pb-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-ai-base/20 text-ai-base">
                  <RiSparklingLine className="size-3.5" />
                </span>
                <span className="text-label-sm text-gray-0">Asistente AmunPOS</span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-paragraph-sm text-gray-0">
                  ¿Cuál fue mi producto más vendido esta semana?
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-ai-base/20 bg-ai-base/10 px-4 py-2.5 text-paragraph-sm text-gray-0/90">
                  "Café Americano 12oz" — 214 unidades, 18% más que la semana pasada.
                </div>
              </div>
            </div>
          )}

          {active === "ventas" && (
            <AppWindow path="caja">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between text-label-sm text-gray-900">
                  Ticket #0412
                  <span className="text-paragraph-xs text-gray-450">Hoy, 11:42</span>
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  {[
                    ["Café Americano 12oz", "$3.50"],
                    ["Croissant de jamón", "$4.20"],
                    ["Agua mineral", "$1.80"],
                  ].map(([name, price]) => (
                    <div key={name} className="flex items-center justify-between text-paragraph-sm text-gray-700">
                      <span>{name}</span>
                      <span className="text-gray-900">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="my-4 h-px w-full bg-gray-200"></div>
                <div className="flex items-baseline justify-between">
                  <span className="text-label-md text-gray-900">Total</span>
                  <span className="text-title-h6 text-gray-900">$9.50</span>
                </div>
                <div className="mt-auto flex gap-2 pt-4">
                  {["Efectivo", "Tarjeta", "Transferencia"].map((method) => (
                    <span
                      key={method}
                      className={cn(
                        "rounded-9 px-2.5 py-1.5 text-paragraph-xs",
                        method === "Tarjeta" ? "bg-primary-base text-gray-0" : "bg-gray-50 text-gray-500",
                      )}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </AppWindow>
          )}

          {active === "inventario" && (
            <AppWindow path="inventario">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between text-label-sm text-gray-900">
                  Stock por sucursal
                  <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-label-xs text-gray-700">
                    <RiAlarmWarningLine className="size-3.5" />2 bajos
                  </span>
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  {[
                    { name: "Café Americano 12oz", pct: 82, qty: "164 uds" },
                    { name: "Croissant de jamón", pct: 46, qty: "23 uds" },
                    { name: "Vasos biodegradables", pct: 12, qty: "8 uds", low: true },
                  ].map((p) => (
                    <div key={p.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-paragraph-sm">
                        <span className={p.low ? "text-gray-900" : "text-gray-700"}>{p.name}</span>
                        <span className="text-paragraph-xs text-gray-450">{p.qty}</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={cn("h-full rounded-full", p.low ? "bg-gray-900" : "bg-primary-base")}
                          style={{ width: `${p.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AppWindow>
          )}

          {active === "nomina" && (
            <AppWindow path="equipo">
              <div className="flex h-full flex-col">
                <div className="text-label-sm text-gray-900">Fichaje de hoy</div>
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  {[
                    { name: "Valeria R.", role: "Cajera", time: "08:02", active: true },
                    { name: "Marco T.", role: "Cocina", time: "07:58", active: true },
                    { name: "Ana G.", role: "Repartidor", time: "—", active: false },
                  ].map((e) => (
                    <div key={e.name} className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-label-xs text-gray-700">
                        {e.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-paragraph-sm text-gray-900">{e.name}</div>
                        <div className="text-paragraph-xs text-gray-450">{e.role}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-paragraph-xs text-gray-600">
                        <span className={cn("size-1.5 rounded-full", e.active ? "bg-primary-base" : "bg-gray-300")}></span>
                        {e.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AppWindow>
          )}
        </div>
      </div>
    </div>
  );
}
