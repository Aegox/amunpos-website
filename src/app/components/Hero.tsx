import React from "react";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <div id="Inicio" className="relative flex flex-col-reverse gap-15 lg:flex-row items-center justify-center relative w-full h-full lg:h-[900px] overflow-hidden pt-[150px] px-10 z-30 lg:pb-10 pb-20">
<div className="absolute z-30 -top-20 -right-20 w-[450px] h-[450px] bg-[var(--primary-color)] rounded-full filter blur-3xl opacity-15"></div>
      <img 
        src="/hero_bg2.png" 
        className="absolute top-0 left-0 w-full h-full object-cover animate-move-image z-10" 
        alt="a hero sprite"
      />
      <div className="light-effect"></div>
      <section className="flex flex-col gap-10 w-full lg:w-[40%] lg:min-w-[600px]">
        <h1 className="w-[100%] lg:w-[600px] text-[48px] 2xl:text-[4em] xl:text-[3.8em] leading-[1.4em] font-bold">Maximiza Ventas con Nuestro Terminal POS</h1>
        <p className="text-[var(--gray-color)] font-normal w-[100%] lg:w-[90%] lg:min-w-[600px]">Nuestro software POS avanzado está diseñado para transformar tus operaciones comerciales. Con sus características potentes y una interfaz intuitiva, mejora la experiencia del cliente y optimiza tu eficiencia global.</p>
        <div className="flex gap-5" >
          <Button theme="black" variant="normal" text="Producto demo" styles="py-[12px] px-[30px]"/>
          <Button theme="black" variant="inverted" text="Prueba gratis" styles="py-[12px] px-[30px]"/>
        </div>
      </section>
      <img src="hero_img.png" alt="a seller employer" className="z-20 object-cover w-[90%] h-[60%] lg:w-[450px] lg:min-w-[350px]"/>

    </div>
  );
};

export default Hero;
