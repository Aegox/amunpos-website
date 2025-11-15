'use client';
import { motion } from "framer-motion";
import React from "react";
import Image from 'next/image';

const Partners: React.FC = () => {
  return (
    <motion.div
           initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="pb-20 h-full w-full px-5"
    >
    <motion.div
           initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
    >
      <h1 className="w-full text-center pb-10 text-[var(--heading-color)] font-semibold text-[18px]">
        Nuestros patrocinadores a nivel mundial
      </h1>
    </motion.div>
      <ul className="flex w-full items-center justify-center flex-wrap gap-5 lg:gap-15">
        <li>
          <Image 
            src="/brand_1.svg" 
            alt="a partner of amunpos in the world"
            width={150}
            height={100}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>       
        <li>
          <Image 
            src="/brand_2.svg" 
            alt="a partner of amunpos in the world"
            width={150}
            height={100}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <Image 
            src="/brand_3.svg" 
            alt="a partner of amunpos in the world"
            width={150}
            height={100}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <Image 
            src="/brand_4.svg" 
            alt="a partner of amunpos in the world"
            width={150}
            height={100}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <Image 
            src="/brand_5.svg" 
            alt="a partner of amunpos in the world"
            width={110}
            height={50}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <Image 
            src="/brand_6.svg" 
            alt="a partner of amunpos in the world"
            width={150}
            height={100}
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
      </ul>
    </motion.div>
  );
};

export default Partners;
