import React from  "react";
import Button from  "./Button";
import Socials from  "./Socials";
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
      <footer className="flex flex-col xl:gap-0 xl:items-center w-full bg-[var(--heading-color)] px-3  pt-[70px] xl:pt-[140px] xl:px-25">
    {/* Main Content Container */}
      <div className="gap-8 h-full xl:w-[90%]  mb-[50px] xl:mb-[110px] flex flex-col xl:flex-row xl:justify-between  ">
      <article>
        <Image src="/logo.png" alt="amunpos logo" width={150} height={25} className="w-auto h-[25px] mb-8 mt-2"/>
        <p className="text-white w-full xl:w-[330px]">El sistema operativo del comercio en Latinoamérica: vende, controla inventario y caja, factura, reparte a domicilio, paga la nómina y atrae clientes con marketing automático — todo en un solo lugar.</p>
        <Socials styles=""/>

      </article>

      {/* Quick Links Navigation */}
      <nav>
        <h3 className="text-white text-[21px] mb-5 font-semibold">Enlaces rápidos</h3>
        <ul className="text-white flex flex-col gap-4">
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Inicio</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Características</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Precios</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Contacto</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-[60%] lg:w-full cursor-pointer">Preguntas Frecuentes</li>
        </ul>
      </nav>

      {/* Newsletter Subscription Form */}
      <form className="flex flex-col gap-2 mb-4 xl:min-w-[300px]">
        <label className="text-white text-[21px] mb-3 font-semibold">Suscribirse al newsletter</label>
        <div className="relative flex items-center justify-center ">
          <input placeholder="Tu correo electronico" className="w-full border-0 py-[11px] px-[20px] bg-white rounded-md focus:outline-none"/>
          <Button text="Enviar" theme="black" variant="inverted" styles="right-1" absolute={true}/>
          <Image src="/Vector.svg" alt="a vector shape" width={300} height={300} objectFit="contain" className="hidden xl:block xl:absolute xl:visible top-45 right-0" />
        </div>
      </form>
    </div>

    {/* Copyright Section */}
    <div className="flex flex-col w-full items-center">
      <div className="h-[1px] w-full bg-[var(--body-color)] mb-5 xl:w-[90%]"></div>
      <div className="flex-wrap flex justify-center text-center text-gray-400 font-normal mb-5">
         © 2026 AmunPOS. Todos los derechos reservados.
      </div>
    </div>
  </footer>
  );
};

export default Footer;

