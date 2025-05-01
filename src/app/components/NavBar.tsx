'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { getCookie } from '../utils/cookie';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/onboarding' || pathname === '/dashboard') {
    return null;
  }

  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrollingDown(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (type: string) => {
    const token = getCookie('token');
    if (token) {
      window.location.href = 'http://localhost:5173/';
      return;
    }
    localStorage.setItem('lastAction', type);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav
      className={`fixed flex top-0 h-[90px] w-full xl:justify-center transition-all duration-300 navbar-slide z-50 ${
        scrollY === 0
          ? 'bg-transparent shadow-none'
          : isScrollingDown
          ? 'hide bg-transparent shadow-none'
          : 'show bg-white shadow-md'
      }`}
    >
      <div className="w-[1370px] flex px-5 justify-between xl:gap-10 lg:px-20 items-center h-[90px]">
        <Link href="/">
          <Image
            src="/logo.svg"
            width={210}
            height={210}
            alt="logo"
            className="pb-2 cursor-pointer z-50"
          />
        </Link>

        {/* Menú para pantallas grandes */}
        <ul className="hidden xl:flex gap-10">
          {['Inicio', 'Caracteristicas', 'Planes', 'Testimonios', 'Faq', 'Contacto'].map(section => (
            <Link
              key={section}
              href={`#${section}`}
              className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)]"
            >
              {section}
            </Link>
          ))}
        </ul>

        {/* Botones para pantallas grandes */}
        <section className="hidden xl:flex gap-10">
              <button
                className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]"
                onClick={() => handleClick('login')}
              >
                Iniciar sesión
              </button>
              <Button
                variant="inverted"
                theme="black"
                text="Registrarse"
                onClick={() => handleClick('register')}
              />
        </section>

        {/* Ícono hamburguesa para móvil */}
        <div className="xl:hidden pt-1">
          <button onClick={() => setIsMenuOpen(true)} aria-label="Abrir menú">
            <img
              src="/bars.svg"
              alt="bars for menu mobile"
              className="cursor-pointer w-[30px] h-[30px]"
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 z-40">
          <div className="absolute top-4 right-4 pt-4 pr-2">
            <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
              <img
                src="/quit.svg"
                alt="x for menu mobile"
                className="cursor-pointer w-[20px] h-[20px]"
              />
            </button>
          </div>
          <ul className="flex flex-col gap-6 pl-5 text-3xl">
            {['Inicio', 'Caracteristicas', 'Planes', 'Testimonios', 'Contacto'].map(item => (
              <li
                key={item}
                className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6 text-3xl">
            {!isAuthenticated ? (
              <>
                <button
                  className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleClick('login');
                  }}
                >
                  Iniciar sesión
                </button>
                <Button
                  variant="inverted"
                  theme="black"
                  text="Registrarse"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleClick('register');
                  }}
                />
              </>
            ) : (
              <>
                <button
                  className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/dashboard');
                  }}
                >
                  Dashboard
                </button>
                <Button
                  variant="inverted"
                  theme="black"
                  text="Cerrar sesión"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

