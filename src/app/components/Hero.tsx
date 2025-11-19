import React from "react";
import Button from "./Button";
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div id="Inicio" className="relative flex flex-col-reverse gap-15 lg:gap-5 xl:gap-15 lg:flex-row items-center justify-center relative w-full h-full lg:h-screen overflow-hidden pt-[75px] xl:pt-[100px] lg:px-10 px-5 z-30 xl:pb-10 pb-20 lg:pt-30">
    <div className="absolute z-30 -top-20 w-full h-[450px] bg-[var(--primary-color)] rounded-full filter blur-3xl opacity-15"></div>
      <Image 
        src="/hero_bg2.png" 
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full animate-move-image z-10" 
        alt="a hero sprite"
      />
      <div className="light-effect"></div>
      <section className="flex flex-col gap-10 lg:w-[25%] lg:min-w-[50%] lg:gap-4 w-full xl:w-[40%] xl:min-w-[600px]">
        <h1 className="w-[100%] xl:w-[600px] text-[3em] 2xl:text-[4em] xl:text-[3em] sm:text-[2em] leading-[1.4em] font-bold">Maximiza Ventas con Nuestro Terminal POS</h1>
        <p className="text-[var(--gray-color)] font-normal w-[100%] xl:w-[90%] xl:min-w-[600px] xl:text-[1.1em] lg:w-[350px] text-[1em] md:text-[1em]">Nuestro software POS avanzado está diseñado para transformar tus operaciones comerciales. Con sus características potentes y una interfaz intuitiva, mejora la experiencia del cliente y optimiza tu eficiencia global.</p>
        <div className="flex gap-5 lg:pt-2" >
          <Button theme="black" variant="normal" text="Producto demo" styles="py-[12px] px-[30px]"/>
          <Button theme="black" variant="inverted" text="Prueba gratis" styles="py-[12px] px-[30px]"/>
        </div>
      </section>
      <Image src="/hero_img.png" alt="a seller employer" width={450} height={600} className="z-100 object-cover w-[100%] h-auto pt-[50px] lg:pt-0 xl:w-[32%] lg:w-[40%]"/>

    </div>
  );
};

export default Hero;
