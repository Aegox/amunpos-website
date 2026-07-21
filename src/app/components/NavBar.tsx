'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Button from './Button';
import { getCookie } from '../utils/cookie';
import { scrollToSection as scrollWithOffset } from '../utils/scroll';

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const sections = [
    { label: 'Inicio', id: 'Inicio' },
    { label: 'Características', id: 'Caracteristicas' },
    { label: 'IA', id: 'IA' },
    { label: 'Planes', id: 'Planes' },
    { label: 'Testimonios', id: 'Testimonios' },
    { label: 'FAQ', id: 'Faq' },
    { label: 'Contacto', id: 'Contacto' },
  ];

  useEffect(() => {
    const cookieToken = getCookie('auth_token') || getCookie('auth_token_client');
    setIsAuthenticated(!!cookieToken);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAppUrl = () => process.env.NEXT_PUBLIC_APP_URL;

  const handleClick = (type: string) => {
    const token = getCookie('auth_token');
    if (token) {
      const appUrl = getAppUrl();
      if (!appUrl) {
        console.warn('NEXT_PUBLIC_APP_URL is not set; skipping redirect');
        return;
      }
      window.location.href = appUrl;
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
      className={`fixed top-0 z-50 flex w-full justify-center transition-all duration-300 ${
        scrolled ? 'border-b border-stroke-soft-200 bg-white-0/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Link className="z-[100] flex items-center gap-2" href="/">
          <Image
            src="/logo.svg"
            alt="AmunPOS"
            width={150}
            height={24}
            className="h-6 w-auto cursor-pointer"
          />
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-stroke-soft-200 bg-weak-50/60 p-1 xl:flex">
          {sections.map(({ label, id }) => (
            <button
              key={id}
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-sub-600 transition-colors duration-200 hover:bg-white-0 hover:text-strong-950 hover:shadow-sm"
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          ))}
        </ul>

        <section className="hidden items-center gap-3 xl:flex">
          {isAuthenticated ? (
            <Button
              variant="primary"
              size="sm"
              text="Ir al dashboard"
              trailingIcon={<ArrowRight className="size-4" />}
              onClick={() => {
                const appUrl = getAppUrl();
                if (!appUrl) {
                  console.warn('NEXT_PUBLIC_APP_URL is not set; skipping redirect');
                  return;
                }
                window.location.href = appUrl;
              }}
            />
          ) : (
            <>
              <button
                className="cursor-pointer text-sm font-medium text-strong-950 transition-colors duration-200 hover:text-brand-600"
                onClick={() => handleClick('login')}
              >
                Iniciar sesión
              </button>
              <Button
                variant="primary"
                size="sm"
                text="Regístrate gratis"
                onClick={() => handleClick('register')}
              />
            </>
          )}
        </section>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-40 flex size-10 items-center justify-center rounded-lg border border-stroke-soft-200 xl:hidden"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed left-0 top-0 z-30 flex h-screen w-full flex-col gap-8 bg-white-0 px-6 pt-24 xl:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="flex flex-col gap-1 text-lg">
              {sections.map(({ label, id }) => (
                <li key={id}>
                  <button
                    className="w-full cursor-pointer rounded-lg px-3 py-3 text-left font-medium text-strong-950 transition-colors duration-200 hover:bg-weak-50 hover:text-brand-600"
                    onClick={() => {
                      setIsMenuOpen(false);
                      scrollToSection(id);
                    }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-stroke-soft-200 pt-6">
              {!isAuthenticated ? (
                <>
                  <button
                    className="cursor-pointer rounded-lg px-3 py-3 text-left font-medium text-strong-950 transition-colors duration-200 hover:bg-weak-50"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleClick('login');
                    }}
                  >
                    Iniciar sesión
                  </button>
                  <Button
                    variant="primary"
                    text="Regístrate gratis"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleClick('register');
                    }}
                  />
                </>
              ) : (
                <>
                  <button
                    className="cursor-pointer rounded-lg px-3 py-3 text-left font-medium text-strong-950 transition-colors duration-200 hover:bg-weak-50"
                    onClick={() => {
                      setIsMenuOpen(false);
                      const appUrl = getAppUrl();
                      if (!appUrl) {
                        console.warn('NEXT_PUBLIC_APP_URL is not set; skipping redirect');
                        return;
                      }
                      window.location.href = appUrl;
                    }}
                  >
                    Dashboard
                  </button>
                  <Button
                    variant="stroked"
                    text="Cerrar sesión"
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
