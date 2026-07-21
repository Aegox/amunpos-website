import React from "react";
import Button from "./Button";
import Socials from "./Socials";
import Image from 'next/image';
import { Send } from "lucide-react";

const quickLinks = ["Inicio", "Características", "Precios", "Contacto", "Preguntas frecuentes"];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-strong-950 px-5 pt-16 lg:pt-24">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 pb-16 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-8 lg:pb-24">
        <div>
          <Image src="/logo.png" alt="AmunPOS" width={150} height={25} className="mb-6 h-6 w-auto brightness-0 invert" />
          <p className="max-w-sm text-paragraph-sm text-white/60">
            AmunPOS une ventas, inventario y equipo en un solo panel, con inteligencia artificial
            que se encarga del trabajo repetitivo para que tu negocio crezca más rápido.
          </p>
          <Socials styles="mt-6" />
        </div>

        <nav>
          <h3 className="mb-5 text-sm font-medium text-white">Enlaces rápidos</h3>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link} className="w-fit cursor-pointer text-sm text-white/60 transition-colors duration-200 hover:text-brand-400">
                {link}
              </li>
            ))}
          </ul>
        </nav>

        <form className="flex flex-col gap-3">
          <label className="text-sm font-medium text-white">Suscríbete al newsletter</label>
          <div className="flex gap-2">
            <input
              placeholder="Tu correo electrónico"
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-brand-400 focus:outline-none"
            />
            <Button text="" icon={<Send className="size-4" />} variant="primary" styles="!px-3.5" />
          </div>
        </form>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-sm text-white/40">
          © {new Date().getFullYear()} AmunPOS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
