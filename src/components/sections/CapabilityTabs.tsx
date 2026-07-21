import React, { useState } from "react";
import { RiSparklingLine, RiShoppingCart2Line, RiStackLine, RiTeamLine, RiCheckLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

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
        <div className="w-full lg:w-1/2">
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

        <div className="w-full lg:w-1/2">
          {isAI ? (
            <div
              className="mx-auto max-w-sm overflow-hidden rounded-18 bg-gray-925 p-5"
              style={{ boxShadow: "var(--shadow-ai-glow)" }}
            >
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
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
          ) : (
            <div className="overflow-hidden rounded-18 border border-gray-200 shadow-button-white">
              <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-4 py-3">
                <span className="size-2.5 rounded-full bg-gray-300"></span>
                <span className="size-2.5 rounded-full bg-gray-300"></span>
                <span className="size-2.5 rounded-full bg-gray-300"></span>
              </div>
              <img src="/capture-of-pos.png" alt="Panel de AmunPOS" className="h-auto w-full object-cover object-top" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
