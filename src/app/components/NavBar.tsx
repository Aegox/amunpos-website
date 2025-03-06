'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";

const NavBar: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingDown(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed flex justify-around items-center gap-20 top-0 h-[90px] w-full px-20 transition-all duration-300 navbar-slide ${
        scrollY === 0 ? "bg-transparent shadow-none" : isScrollingDown ? "hide bg-transparent shadow-none" : "show bg-white shadow-md"
      }`}
    >
      <Image 
        src="/logo.svg"
        width={210}
        height={210}
        alt="logo"
        className="pb-2 cursor-pointer"
      />
      <ul className="flex gap-10">
        <li className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)]">Inicio</li>
        <li className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)]">Características</li>
        <li className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] ">Planes</li>
        <li className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] ">Testimonios</li>
        <li className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] ">Contacto</li>
      </ul>
      <section className="flex gap-5 ">
        <button className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]">Iniciar sesión</button> 
        <Button background="primary" hover="black" text="Registrarse" />
      </section>
    </nav>
  );
};

export default NavBar;

