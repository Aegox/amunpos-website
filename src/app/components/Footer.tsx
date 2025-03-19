import React from  "react";
import Button from  "./Button";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col xl:gap-0 xl:items-center w-full bg-[var(--heading-color)] px-3  pt-[70px] xl:pt-[140px] xl:px-25">
    {/* Main Content Container */}
    <div className="gap-8 h-full xl:w-[90%]  mb-[50px] xl:mb-[110px] flex flex-col xl:flex-row xl:justify-between  ">
      <article>
        <img src="/logo.png" alt="amunpos logo" className="w-auto h-[25px] mb-8 mt-2"/>
        <p className="text-white w-full xl:w-[330px]">Nuestro software de punto de venta es una solución definitiva que transforma tus operaciones comerciales en una fuerza eficiente y fluida, destacando la simplicidad, versatilidad de vanguardia.</p>

        {/* Social Media Links */}
        <div className="social-buttons flex gap-4 pt-6">
          <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" className="group border-1 border-white rounded-full p-2 transition duration-300  hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md">
            <FaFacebookF size={16} className="text-white group-hover:text-[var(--primary-color)] transition duration-300" />
          </a>
          <a href="https://twitter.com/" aria-label="Twitter" target="_blank" className="group border-1 border-white rounded-full p-2 transition duration-300  hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md">
            <FaTwitter size={16} className="text-white group-hover:text-[var(--primary-color)] transition duration-300" />
          </a>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" className="group border-1 border-white rounded-full p-2 transition duration-300  hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md">
            <FaLinkedinIn size={16} className="text-white group-hover:text-[var(--primary-color)] transition duration-300" />
          </a>
          <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" className="group border-1 border-white rounded-full p-2 transition duration-300  hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md">
            <FaInstagram size={16} className="text-white group-hover:text-[var(--primary-color)] transition duration-300" />
          </a>
        </div>

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
          <img src="/Vector.svg" alt="a vector shape" className="hidden xl:block xl:absolute xl:visible top-45 right-0" />
        </div>
      </form>
    </div>

    {/* Copyright Section */}
    <div className="flex flex-col w-full items-center">
      <div className="h-[1px] w-full bg-[var(--body-color)] mb-5 xl:w-[90%]"></div>
      <div className="flex-wrap flex justify-center text-center text-gray-400 font-normal mb-5">
         © Copyright 2025. Design by<a href="https://themeforest.net/user/awesomethemez/portfolio" target="_blank" className="ml-1 text-[var(--primary-color)]">amunpos</a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

