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
      window.location.href = 'https://amun-pos.vercel.app/';
      return;
    }
    window.localStorage.setItem('lastAction', type);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    router.push('/');
  };

  if (pathname === '/onboarding' || pathname === '/dashboard') {
    return null;
  }

  return (
    <nav
      className={`fixed flex top-0 xl:h-[90px] h-[80px] w-full xl:justify-center transition-all duration-300 navbar-slide z-50 ${
        scrollY === 0
          ? 'bg-transparent shadow-none'
          : isScrollingDown
          ? 'hide bg-transparent shadow-none'
          : 'show bg-white shadow-md'
      }`}
    >
      <div className="lg:w-[1370px] w-[100%] pr-5 flex justify-between xl:px-20 xl:gap-10 items-center px-0 lg:h-[90px] h-[80px]">
        <Link className="z-[100]" href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            objectFit='contain'
            width={200}
            height={25}
            className="pb-2 xl:w-[210px] lg:w-[230px] w-[200px] h-auto cursor-pointer"
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
            <Image
              src="/bars.svg"
              alt="bars for menu mobile"
              width={35}
              height={35}
              className="cursor-pointer h-auto"
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="xl:hidden pl-10 absolute top-0 left-0 w-full h-screen pt-[90px] bg-white flex flex-col gap-6 z-30">
          <div className="absolute top-4 right-4 pt-4 pr-2">
            <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
              <Image
                src="/quit.svg"
                alt="x for menu mobile"
                width={25}
                height={25}
                className="cursor-pointer w-[25px] h-[25px]"
              />
            </button>
          </div>
          <ul className="flex flex-col gap-5 text-[1.15em]">
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
          <div className="flex flex-col items-start gap-6 text-[1.15em]">
            {!isAuthenticated ? (
              <>
                <button
                  className="w-[100px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]"
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
                  styles="w-[159px] text-[1em]"
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

