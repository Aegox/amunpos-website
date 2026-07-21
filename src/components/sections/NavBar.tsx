import React, { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Características", id: "Caracteristicas" },
  { label: "IA", id: "IA" },
  { label: "Precios", id: "Planes" },
  { label: "FAQ", id: "Faq" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 flex w-full justify-center bg-gray-0/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "border-b border-gray-200" : "border-b border-transparent",
      )}
    >
      <div className="flex h-16 w-full max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <a className="flex items-center gap-2" href="#Inicio">
          <img src="/logo.svg" alt="AmunPOS" className="h-8 w-auto" />
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map(({ label, id }) => (
            <a key={id} href={`#${id}`} className="text-label-sm text-gray-600 transition-colors duration-200 hover:text-gray-900">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <a
            href="#"
            className="flex h-9 items-center rounded-9 px-3.5 text-label-sm text-gray-700 transition duration-200 hover:bg-gray-50"
          >
            Iniciar sesión
          </a>
          <a
            href="#Planes"
            className="flex h-9 items-center gap-2 rounded-9 bg-primary-base px-3.5 text-label-sm text-gray-0 shadow-button-gray transition duration-200 hover:bg-primary-dark"
          >
            Empieza gratis
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-9 border border-gray-200 xl:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed left-0 top-16 z-30 flex h-[calc(100vh-64px)] w-full flex-col gap-1 bg-gray-0 px-6 pt-6 xl:hidden">
          {links.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-9 px-3 py-3 text-label-md text-gray-900 transition-colors duration-200 hover:bg-gray-50"
            >
              {label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-6">
            <a href="#" className="rounded-9 px-3 py-3 text-center text-label-md text-gray-900 hover:bg-gray-50">
              Iniciar sesión
            </a>
            <a
              href="#Planes"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 items-center justify-center rounded-9 bg-primary-base text-label-md text-gray-0 shadow-button-gray"
            >
              Empieza gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
