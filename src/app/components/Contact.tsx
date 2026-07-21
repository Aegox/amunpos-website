'use client';
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Eyebrow from "./Eyebrow";
import useSendEmail from "../hooks/useSendEmail";
import Image from 'next/image';
import { Mail, Send } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const inputClass =
  "block w-full rounded-lg border border-stroke-sub-300 bg-white-0 px-4 py-2.5 text-sm text-strong-950 placeholder-soft-400 transition-colors duration-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

const Contacto: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const { sendContactMessage, loading, error, success } = useSendEmail();

  const onSubmit = async (data: FormValues) => {
    try {
      const sent = await sendContactMessage(data);
      if (sent) reset();
    } catch (err) {
      console.error("Error al enviar el correo:", err);
    }
  };

  return (
    <motion.section
      id="Contacto"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="w-full px-5 py-20 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-14 lg:flex-row lg:items-stretch">
        <div className="hidden w-full max-w-md overflow-hidden rounded-2xl border border-stroke-soft-200 bg-weak-50 lg:block lg:w-[42%]">
          <Image
            src="/contacto2.png"
            alt="Contacto con AmunPOS"
            width={500}
            height={650}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[54%]">
          <Eyebrow icon={<Mail className="size-3.5" />} text="Contáctanos" />
          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-[-0.01em] text-strong-950 lg:text-[2.5rem]">
            Comunícate con nosotros hoy
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Nombre completo*"
                className={inputClass}
              />
              {errors.name && <span className="text-xs text-red-500">Campo requerido</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Correo electrónico*"
                className={inputClass}
              />
              {errors.email && <span className="text-xs text-red-500">Campo requerido</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                {...register("phone", { required: true })}
                type="text"
                placeholder="Teléfono móvil*"
                className={inputClass}
              />
              {errors.phone && <span className="text-xs text-red-500">Campo requerido</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <input
                {...register("subject", { required: true })}
                type="text"
                placeholder="Asunto*"
                className={inputClass}
              />
              {errors.subject && <span className="text-xs text-red-500">Campo requerido</span>}
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <textarea
                {...register("message", { required: true })}
                rows={5}
                placeholder="Mensaje"
                className={inputClass}
              />
              {errors.message && <span className="text-xs text-red-500">Campo requerido</span>}
            </div>

            <div className="sm:col-span-2">
              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">Mensaje enviado con éxito.</p>}
            </div>

            <div className="sm:col-span-2">
              <Button
                text="Enviar mensaje"
                type="submit"
                variant="primary"
                trailingIcon={<Send className="size-4" />}
                loading={loading}
                styles="w-full sm:w-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contacto;
