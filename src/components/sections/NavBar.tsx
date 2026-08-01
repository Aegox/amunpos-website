import React, { useState, useEffect } from "react";
import {
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiSparklingLine,
  RiShoppingCart2Line,
  RiStackLine,
  RiTeamLine,
  RiCompass3Line,
  RiChatQuoteLine,
  RiMailLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  ai?: boolean;
};

const productItems: MenuItem[] = [
  { icon: RiSparklingLine, title: "Asistente de IA", desc: "Pregunta, migra y automatiza con IA", href: "#Producto", ai: true },
  { icon: RiShoppingCart2Line, title: "Ventas y caja", desc: "Cobra en segundos con cualquier método", href: "#Producto" },
  { icon: RiStackLine, title: "Inventario en tiempo real", desc: "Stock sincronizado entre sucursales", href: "#Producto" },
  { icon: RiTeamLine, title: "Nómina y equipo", desc: "Horarios con IA, fichaje y pagos", href: "#Producto" },
];

const companyItems: MenuItem[] = [
  { icon: RiCompass3Line, title: "Nosotros", desc: "Quiénes somos y por qué existe amunpos", href: "#Inicio" },
  { icon: RiChatQuoteLine, title: "Beneficios", desc: "Lo que tu negocio va a lograr", href: "#Testimonios" },
  { icon: RiMailLine, title: "Contacto", desc: "Habla con nuestro equipo", href: "#Contacto" },
];

function MenuItemRow({ icon: Icon, title, desc, href, ai }: MenuItem) {
  return (
    <a
      href={href}
      className="group/link flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition duration-200 ease-linear hover:bg-gray-25"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-gray-0 ring-1 ring-inset ring-gray-100 transition duration-200 ease-linear group-hover/link:shadow-button-white group-hover/link:ring-transparent">
        <Icon
          className={cn(
            "size-5 transition duration-200 ease-linear",
            ai ? "text-ai-base" : "text-gray-500 group-hover/link:text-primary-base",
          )}
        />
      </div>
      <div className="flex-1">
        <div className="text-label-sm text-gray-900">{title}</div>
        <div className="mt-1 text-paragraph-xs text-gray-600">{desc}</div>
      </div>
      <RiArrowRightSLine className="size-5 text-gray-400" />
    </a>
  );
}

function NavDropdown({ label, items }: { label: string; items: MenuItem[] }) {
  return (
    <div className="group relative z-50">
      <button
        type="button"
        className="flex items-center gap-0.5 text-label-sm text-gray-600 transition duration-200 ease-linear group-hover:text-gray-800"
      >
        {label}
        <RiArrowDownSLine className="size-5 text-gray-500 transition duration-200 ease-out group-hover:-rotate-180 group-hover:text-primary-base" />
      </button>
      <div className="absolute left-0 top-full pointer-events-none -translate-y-3 pt-4 opacity-0 transition duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex w-[340px] flex-col gap-1 rounded-[20px] bg-gray-0 p-2 shadow-button-white">
          {items.map((item) => (
            <MenuItemRow key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Auto-hide: se esconde al bajar y reaparece al subir. No se esconde cerca del
  // tope (para no tapar el hero al volver) ni con el menú móvil abierto.
  // Ocultar el navbar al bajar NO es una animación decorativa: es lo que
  // devuelve la pantalla al contenido. Antes esto salía antes de tiempo si el
  // sistema pedía menos movimiento, y entonces la barra no se ocultaba nunca.
  // Lo que hay que suprimir en ese caso es la transición, no la función; de eso
  // se encarga la clase `motion-reduce:transition-none` de abajo.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 120 || menuOpen) {
          setHidden(false);
        } else if (Math.abs(delta) > 6) {
          setHidden(delta > 0);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-transform duration-300 ease-out motion-reduce:transition-none lg:top-4",
        hidden && "-translate-y-[calc(100%+1.5rem)]",
      )}
    >
      <header className="flex h-16 w-full items-center justify-between gap-4 rounded-2xl bg-gray-25 px-4 shadow-button-white lg:h-auto lg:w-auto lg:justify-start lg:gap-0 lg:rounded-3xl lg:bg-gray-0 lg:py-2.5 lg:pl-5 lg:pr-2.5">
        <a className="flex items-center focus:outline-none" href="#Inicio">
          <img src="/logo.png" alt="amunpos" className="h-5 w-auto" />
        </a>

        {/* Un solo grupo de navegación con ritmo uniforme: antes el logo, el
            dropdown "Producto" y el resto de enlaces eran 3 bloques con gaps
            distintos (2.5 / 5) separados por un punto decorativo suelto, y el
            espaciado se leía irregular. */}
        <nav className="ml-8 hidden items-center gap-6 lg:flex">
          <NavDropdown label="Producto" items={productItems} />
          <a href="#Planes" className="text-label-sm text-gray-600 transition duration-200 ease-linear hover:text-gray-800">
            Precios
          </a>
          <a href="#Faq" className="text-label-sm text-gray-600 transition duration-200 ease-linear hover:text-gray-800">
            Preguntas frecuentes
          </a>
          <NavDropdown label="Empresa" items={companyItems} />
        </nav>

        <div className="ml-8 hidden items-center gap-2 lg:flex">
          <a href="#" className="flex h-9 items-center rounded-9 px-3.5 text-label-sm text-gray-700 transition duration-200 ease-linear hover:bg-gray-50">
            Iniciar sesión
          </a>
          <a
            href="#Planes"
            className="flex h-9 items-center gap-1.5 rounded-13 bg-gray-900 px-3.5 text-label-sm text-gray-0 shadow-button-gray transition duration-200 ease-linear hover:bg-gray-800"
          >
            Empieza gratis
            <RiArrowRightSLine className="size-4 text-gray-500" />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-9 border border-gray-200 lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-3 top-[76px] z-40 flex max-h-[calc(100vh-96px)] flex-col overflow-y-auto rounded-2xl bg-gray-0 p-3 shadow-button-white lg:hidden">
          <div className="flex flex-col gap-1">
            <div className="px-3 pb-1 pt-2 text-subheading-xs text-gray-450">Producto</div>
            {productItems.map((item) => (
              <MenuItemRow key={item.title} {...item} />
            ))}
          </div>
          <div className="my-2 h-px bg-gray-100" />
          <a href="#Planes" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-label-sm text-gray-700 hover:bg-gray-25">
            Precios
          </a>
          <a href="#Faq" onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 text-label-sm text-gray-700 hover:bg-gray-25">
            Preguntas frecuentes
          </a>
          <div className="mt-2 flex flex-col gap-1">
            <div className="px-3 pb-1 pt-2 text-subheading-xs text-gray-450">Empresa</div>
            {companyItems.map((item) => (
              <MenuItemRow key={item.title} {...item} />
            ))}
          </div>
          <div className="my-2 h-px bg-gray-100" />
          <div className="flex flex-col gap-2 p-1">
            <a href="#" className="flex h-10 items-center justify-center rounded-9 border border-gray-200 text-label-sm text-gray-700">
              Iniciar sesión
            </a>
            <a
              href="#Planes"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 items-center justify-center gap-1.5 rounded-13 bg-gray-900 text-label-sm text-gray-0 shadow-button-gray"
            >
              Empieza gratis
              <RiArrowRightSLine className="size-4 text-gray-500" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
