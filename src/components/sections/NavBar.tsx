import React, { useState, useEffect } from "react";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { ButtonRoot } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { label: "Características", id: "Caracteristicas" },
  { label: "IA", id: "IA" },
  { label: "Precios", id: "Planes" },
  { label: "Testimonios", id: "Testimonios" },
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
    <nav
      className={cn(
        "fixed top-0 z-50 flex w-full justify-center bg-white-0 transition-shadow duration-300",
        scrolled ? "border-b border-stroke-soft-200" : "border-b border-transparent",
      )}
    >
      <div className="flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <a className="flex items-center gap-2" href="#Inicio">
          <img src="/logo.svg" alt="AmunPOS" className="h-9 w-auto lg:h-10" />
        </a>

        <ul className="hidden items-center gap-8 xl:flex">
          {sections.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`} className="text-label-sm text-sub-600 transition-colors duration-200 hover:text-strong-950">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 xl:flex">
          <ButtonRoot variant="neutral" mode="stroke" size="small" asChild>
            <a href="#">Iniciar sesión</a>
          </ButtonRoot>
          <ButtonRoot size="small" asChild>
            <a href="#Planes">Regístrate gratis</a>
          </ButtonRoot>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-lg border border-stroke-soft-200 xl:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed left-0 top-[72px] z-30 flex h-[calc(100vh-72px)] w-full flex-col gap-1 bg-white-0 px-6 pt-6 xl:hidden">
          {sections.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-label-md text-strong-950 transition-colors duration-200 hover:bg-weak-50"
            >
              {label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-stroke-soft-200 pt-6">
            <ButtonRoot variant="neutral" mode="stroke" asChild>
              <a href="#">Iniciar sesión</a>
            </ButtonRoot>
            <ButtonRoot asChild>
              <a href="#Planes" onClick={() => setMenuOpen(false)}>
                Regístrate gratis
              </a>
            </ButtonRoot>
          </div>
        </div>
      )}
    </nav>
  );
}
