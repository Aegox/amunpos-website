import React from "react";
import Button from "./Button";

const CallAction: React.FC = () => {
  return (
    <section className="flex justify-center py-10 w-full px-3 lg:px-0 lg:h-[550px]">
      <div className="relative flex flex-col items-center justify-center bg-[var(--heading-color)] rounded-3xl 2xl:w-[78%] lg:w-[85%] h-full px-5 py-24 lg:pt-[90px] lg:pb-[100px] lg:px-[40px]">
        <img src="/Ellipse_small.svg" className="w-1/6 absolute top-0 right-0" alt="a shape of call action component" />
        <img src="/stroke.svg" className="w-1/5 absolute bottom-0 left-0" alt="a shape of call action component" />
        <h1 className="w-full text-[32px] mb-2 lg:w-[80%] font-bold text-center text-white 2xl:text-[50px] lg:text-[42px] leading-none lg:leading-[1.3em]">¡Mejora tu negocio con nuestras soluciones POS de vanguardia!</h1> 
        <p className="w-[95%] lg:w-[65%] text-center text-gray-400 text-[18px] font-normal">¡Experimenta el futuro de las transacciones! Agenda una demostración hoy y comprueba cómo nuestra solución POS puede revolucionar tu negocio.</p> 
        <div className="gap-5 flex justify-center mt-8 w-full">
          <Button text="Prueba gratuita" theme="white" variant="normal" styles="px-[30px] py-[12px]" />
          <Button text="Comprar ahora" theme="white" variant="inverted" styles="px-[30px] py-[12px]"/>
        </div>
      </div>
    </section>
  );
};

export default CallAction;
