import React from "react";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

const CallAction: React.FC = () => {
  return (
    <section className="w-full px-5 py-16 lg:py-24">
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center overflow-hidden rounded-3xl bg-strong-950 px-6 py-16 text-center lg:px-12 lg:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/25 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-400/15 blur-[100px]" />

        <h2 className="relative max-w-2xl text-3xl font-medium leading-tight tracking-[-0.01em] text-white lg:text-[2.75rem]">
          Mejora tu negocio con soluciones POS de vanguardia
        </h2>
        <p className="relative mt-4 max-w-xl text-base text-white/60 lg:text-lg">
          Agenda una demostración hoy y descubre cómo AmunPOS puede transformar tu operación diaria.
        </p>
        <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            text="Prueba gratuita"
            trailingIcon={<ArrowRight className="size-4" />}
          />
          <Button
            variant="stroked"
            size="lg"
            text="Comprar ahora"
            styles="!bg-transparent !text-white !border-white/20 hover:!bg-white/10"
          />
        </div>
      </div>
    </section>
  );
};

export default CallAction;
