'use client';
import React from "react";
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineCoffee, AiOutlineShopping } from 'react-icons/ai';
import { FaHotel, FaSpa } from 'react-icons/fa';
import { IoIosCart } from 'react-icons/io';
import { motion } from "framer-motion";
import Image from 'next/image';

const UseCases: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row-reverse justify-center items-center px-5 md:pt-22 pt-18 md:pb-22 pb-14">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="w-[90%] pb-10 2xl:w-[38%] xl:w-[40%] md:w-[50%]"
       >
      <Image src="/illustration1.svg" alt="a people paying with a card of money" width={500} height={500} /> 
      </motion.div>
      <motion.div 
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col xl:w-[45%]"
      >
        <p className="w-full text-left text-[var(--primary-color)] text-[18px] font-semibold pb-2">Quién puede usar nuestro amunpos</p>
        <h1 className="pb-10 2xl:w-[90%] xl:w-[100%] text-[var(--heading-color)]  text-[2rem] 2xl:text-[3em] lg:text-[2.5em] leading-[1.4em] font-bold">Nuestro software es capaz de cubrir una amplia gama de negocios e industrias</h1>
        <ul className="flex flex-wrap w-full list-none text-[1.25rem] 2xl:text-[1.4rem] text-[var(--body-color)]">
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <AiOutlineShop className="text-2xl text-blue-500 mr-2" />
            <span>Tiendas minoristas</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <AiOutlineShoppingCart className="text-2xl text-blue-500 mr-2" />
            <span>Supermercados</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <AiOutlineCoffee className="text-2xl text-blue-500 mr-2" />
            <span>Restaurantes y cafeterías</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <AiOutlineShopping className="text-2xl text-blue-500 mr-2" />
           <span>Tiendas de conveniencia</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <IoIosCart className="text-2xl text-blue-500 mr-2" />
            <span>Negocios electrónicos</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <FaHotel className="text-2xl text-blue-500 mr-2" />
            <span>Hostelería y hoteles</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <FaSpa className="text-2xl text-blue-500 mr-2" />
            <span>Salones y spas</span>
          </li>
          <li className="flex items-center mb-4 xl:mb-6 w-full lg:w-[50%]">
            <AiOutlineShop className="text-2xl text-blue-500 mr-2" />
            <span>Y muchos más...</span>
          </li>     
        </ul>     
      </motion.div>
    </section>
  );
};

export default UseCases;
