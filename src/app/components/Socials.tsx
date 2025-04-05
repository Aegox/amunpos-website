import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import React from "react";

interface SocialsProps {
  styles: string;
};

const Socials: React.FC<SocialsProps> = ({ styles }) => {
  return (
    <div className={`${styles ? styles : "text-white"} social-buttons flex gap-4 pt-6`}>
      <a
        href="https://www.facebook.com/"
        aria-label="Facebook"
        target="_blank"
        className={`group border-1 rounded-full p-2 transition duration-300 
          ${styles ? "border-black" : "border-white"} 
          hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md`}
      >
        <FaFacebookF size={16} className="group-hover:text-[var(--primary-color)] transition duration-300" />
      </a>
      <a
        href="https://twitter.com/"
        aria-label="Twitter"
        target="_blank"
        className={`group border-1 rounded-full p-2 transition duration-300 
          ${styles ? "border-black" : "border-white"} 
          hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md`}
      >
        <FaTwitter size={16} className="group-hover:text-[var(--primary-color)] transition duration-300" />
      </a>
      <a
        href="https://www.linkedin.com/"
        aria-label="LinkedIn"
        target="_blank"
        className={`group border-1 rounded-full p-2 transition duration-300 
          ${styles ? "border-black" : "border-white"} 
          hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md`}
      >
        <FaLinkedinIn size={16} className="group-hover:text-[var(--primary-color)] transition duration-300" />
      </a>
      <a
        href="https://www.instagram.com/"
        aria-label="Instagram"
        target="_blank"
        className={`group border-1 rounded-full p-2 transition duration-300 
          ${styles ? "border-black" : "border-white"} 
          hover:border-[var(--primary-color)] hover:translate-y-[-2px] hover:shadow-md`}
      >
        <FaInstagram size={16} className="group-hover:text-[var(--primary-color)] transition duration-300" />
      </a>
    </div>
  );
};

export default Socials;

