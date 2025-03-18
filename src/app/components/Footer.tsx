import React from  "react";
import Button from  "./Button";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col bg-[var(--heading-color)] px-5 gap-8">
      <arcticle>
        <img src="/logo.svg" alt="amunpos logo" className="w-auto h-[130px]"/>
        <p className="text-white ">Nuestro software de punto de venta es la solución definitiva diseñada para transformar tus operaciones comerciales en una fuerza eficiente y fluida. Con un enfoque en la simplicidad, la versatilidad y la tecnología de vanguardia.</p>
      </arcticle>
      <nav>
        <h3 className="text-white text-[21px] mb-5 font-semibold">Enlaces rápidos</h3>
        <ul className="text-white flex flex-col gap-4">
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Inicio</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Características</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Precios</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-1/5 cursor-pointer">Contacto</li>
          <li className="hover:text-[var(--primary-color)] transition-colors duration-300 w-[60%] cursor-pointer">Preguntas Frecuentes</li>
        </ul>
      </nav>
      <form className="flex flex-col gap-2">
        <label className="text-white text-[21px] mb-3 font-semibold">Suscribirse al newsletter</label>
        <input placeholder="Tu correo electronico" className="relative border-0 py-[11px] px-[20px] bg-white rounded-md focus:outline-none"/>
        <Button text="Enviar" theme="white" variant="inverted" styles="absolute right-0 top-0 w-[30%]"/> 
      </form>
      <div></div>
      <div>
        <span></span>
        <span></span>
      </div>
    </footer>
  );
};

export default Footer;
