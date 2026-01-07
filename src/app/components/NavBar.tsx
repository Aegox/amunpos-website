'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { getCookie } from '../utils/cookie';
import { scrollToSection as scrollWithOffset } from '../utils/scroll';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const sections = [
    { label: 'Inicio', id: 'Inicio' },
    { label: 'Caracteristicas', id: 'Caracteristicas' },
    { label: 'Planes', id: 'Planes' },
    { label: 'Testimonios', id: 'Testimonios' },
    { label: 'Faq', id: 'Faq' },
    { label: 'Contacto', id: 'Contacto' },
  ];

  useEffect(() => {
    const cookieToken = getCookie('auth_token') || getCookie('auth_token_client');
    setIsAuthenticated(!!cookieToken);
  }, []);

  // Efecto para manejar el scroll cuando el menú está abierto
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      // Limpieza al desmontar el componente
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isMenuOpen]);

  // Efecto para manejar el scroll del navbar
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

  const getAppUrl = () => process.env.NEXT_PUBLIC_APP_URL || 'https://app.amunpos.com';

  const handleClick = (type: string) => {
    const token = getCookie('auth_token');
    if (token) {
      window.location.href = getAppUrl();
      return;
    }
    window.localStorage.setItem('lastAction', type);
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;

    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const didScroll = scrollWithOffset(sectionId);

    if (!didScroll) {
      window.location.hash = sectionId;
    } else if (window.history?.pushState) {
      const url = sectionId ? `#${sectionId}` : window.location.pathname;
      window.history.pushState(null, '', url);
    }
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
      className={`fixed flex top-0 xl:h-[90px] h-[80px]  w-full xl:justify-center transition-all duration-300 navbar-slide z-50 ${
        scrollY === 0
          ? 'bg-transparent shadow-none'
          : isScrollingDown
          ? 'hide bg-transparent shadow-none'
          : 'show bg-white shadow-md'
      }`}
    >
      <div className="lg:w-[1370px] w-screen pr-5 flex justify-between items-center xl:px-20 xl:gap-10 px-0 lg:h-[90px] h-[80px]">
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
          {sections.map(({ label, id }) => (
            <button
              key={id}
              className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-left"
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </ul>

        {/* Botones para pantallas grandes */}
        <section className="hidden xl:flex gap-6 items-center">
          {isAuthenticated ? (
            <Button
              variant="inverted"
              theme="black"
              text="Dashboard"
              onClick={() => (window.location.href = getAppUrl())}
            />
          ) : (
            <>
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
            </>
          )}
        </section>

        {/* Botón de hamburguesa animado */}
        <div className="xl:hidden pt-1 z-40">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="w-12 h-12 flex flex-col justify-center items-center relative"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <motion.span 
              className="w-8 h-0.5 bg-black absolute rounded-full"
              animate={isMenuOpen ? 'open' : 'closed'}
              variants={{
                closed: { rotate: 0, y: -7 },
                open: { rotate: 45, y: 0 }
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span 
              className="w-8 h-0.5 bg-black absolute rounded-full"
              animate={isMenuOpen ? 'open' : 'closed'}
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.span 
              className="w-8 h-0.5 bg-black absolute rounded-full"
              animate={isMenuOpen ? 'open' : 'closed'}
              variants={{
                closed: { rotate: 0, y: 7 },
                open: { rotate: -45, y: 0 }
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="xl:hidden pl-10 fixed top-0 left-0 w-full h-screen pt-[90px] bg-white flex flex-col gap-6 z-30"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.6, 1]
            }}
          >
            <div className="absolute top-4 right-4 pt-4 pr-2">
              {/* El botón de cierre se ha eliminado ya que usamos el botón de hamburguesa animado */}
            </div>
          <ul className="flex flex-col gap-5 text-[1.15em]">
            {sections.map(({ label, id }) => (
              <li
                key={id}
                className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)]"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToSection(id);
                }}
              >
                {label}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-6 text-[1.15em]">
            {!isAuthenticated ? (
              <>
                <button
                  className="w-[150px] text-[1em] text-left cursor-pointer transition-colors duration-300 ease-in-out hover:text-[var(--primary-color)] text-[var(--heading-color)]"
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
                    window.location.href = getAppUrl();
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
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
  );
};

export default NavBar;
