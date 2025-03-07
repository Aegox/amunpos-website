import React from "react";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <div className="flex items-center justify-center relative w-full h-[900px] overflow-hidden pt-[150px] px-10 z-30">
      <img 
        src="/hero_bg2.png" 
        className="absolute top-0 left-0 w-full h-full object-cover animate-move-image z-10" 
        alt="a hero sprite"
      />
      <div className="light-effect"></div>
      <section className="flex flex-col gap-10 w-[40%] min-w-[600px]">
        <h1 className="w-[600px] text-[4.1em] leading-[1.4em] font-bold">Maximiza Ventas con Nuestro Terminal POS</h1>
        <p className="text-[var(--gray-color)] font-normal w-[90%] min-w-[600px]">Nuestro software POS avanzado está diseñado para transformar tus operaciones comerciales. Con sus características potentes y una interfaz intuitiva, mejora la experiencia del cliente y optimiza tu eficiencia global.</p>
        <div className="flex gap-5" >
          <Button background="black" hover="primary" text="Producto demo" styles="py-[12px] px-[30px]"/>
          <Button background="priamry" hover="black" text="Prueba gratis" styles="py-[12px] px-[30px]"/>
        </div>
      </section>
      <img src="hero_img.png" alt="a seller employer" className="z-20 object-cover w-[450px] min-w-[350px]"/>
    </div>
  );
};

export default Hero;
