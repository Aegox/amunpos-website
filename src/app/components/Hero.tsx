'use client';

import React from "react";
import Button from "./Button";
import Eyebrow from "./Eyebrow";
import Image from 'next/image';
import { ArrowRight, Sparkles } from "lucide-react";
import { getCookie } from "../utils/cookie";
import { scrollToSection as scrollWithOffset } from "../utils/scroll";

const Hero: React.FC = () => {
  const getAppUrl = () => process.env.NEXT_PUBLIC_APP_URL || 'https://app.amunpos.com';

  const handleLearnMore = () => {
    scrollWithOffset('Caracteristicas');
  };

  const handleFreeTrial = () => {
    const token = getCookie('auth_token');
    if (token) {
      window.location.href = getAppUrl();
      return;
    }
    window.localStorage.setItem('lastAction', 'register');
  };

  return (
    <div id="Inicio" className="relative w-full overflow-hidden pt-[136px] pb-16 lg:pb-24">
      <div className="dot-grid-bg pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-brand-400/20 blur-[110px]" />
      <div className="pointer-events-none absolute -top-10 left-0 h-[320px] w-[320px] rounded-full bg-brand-300/15 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 text-center lg:px-8">
        <Eyebrow
          icon={<Sparkles className="size-3.5" />}
          text="Punto de venta + inventario + delivery, en un solo lugar"
        />

        <h1 className="mt-6 max-w-3xl text-[2.5rem] font-medium leading-[1.1] tracking-[-0.02em] text-strong-950 sm:text-5xl lg:text-[3.5rem]">
          Maximiza tus ventas con un terminal POS hecho para crecer contigo
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sub-600">
          El software POS de AmunPOS transforma tus operaciones comerciales: cobra,
          controla inventario y entiende tu negocio con una interfaz simple y potente,
          pensada para el día a día de tu equipo.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            text="Prueba gratis"
            trailingIcon={<ArrowRight className="size-4" />}
            onClick={handleFreeTrial}
          />
          <Button
            variant="stroked"
            size="lg"
            text="Conoce más"
            onClick={handleLearnMore}
          />
        </div>

        <div className="relative mt-16 w-full max-w-[1080px]">
          <div className="pointer-events-none absolute -inset-x-8 -bottom-10 h-24 bg-gradient-to-t from-white-0 via-white-0/60 to-transparent" />
          <div className="overflow-hidden rounded-2xl border border-stroke-soft-200 bg-white-0 shadow-[0_24px_60px_-24px_rgba(13,12,23,0.25)]">
            <div className="flex items-center gap-1.5 border-b border-stroke-soft-200 bg-weak-50 px-4 py-3">
              <span className="size-2.5 rounded-full bg-stroke-sub-300" />
              <span className="size-2.5 rounded-full bg-stroke-sub-300" />
              <span className="size-2.5 rounded-full bg-stroke-sub-300" />
            </div>
            <Image
              src="/capture-of-pos.png"
              alt="Vista del panel de AmunPOS"
              width={1679}
              height={918}
              priority
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
