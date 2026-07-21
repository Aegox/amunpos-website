'use client';
import { motion } from "framer-motion";
import React from "react";
import Image from 'next/image';

const brands = ["/brand_1.svg", "/brand_2.svg", "/brand_3.svg", "/brand_4.svg", "/brand_5.svg", "/brand_6.svg"];

const Partners: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="w-full border-y border-stroke-soft-200 bg-weak-50/60 px-5 py-12"
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-soft-400">
          Negocios que ya confían en AmunPOS
        </h2>
        <ul className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((src) => (
            <li key={src}>
              <Image
                src={src}
                alt="Marca aliada de AmunPOS"
                width={130}
                height={40}
                className="h-8 w-auto opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Partners;
