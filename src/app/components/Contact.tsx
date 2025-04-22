'use client';
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contacto: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormValues>();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setSubmitSuccess("Mensaje enviado con éxito.");
        reset();
      } else {
        setSubmitError("Ocurrió un error al enviar el mensaje.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Error del servidor. Inténtalo más tarde.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div id="Contacto" className="relative">
        <div className="h-[50px] lg:h-[40px]"></div>
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row-reverse items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center w-full h-full min-w-[45%] md:w-[45%] 2xl:w-1/2 mb-6 xl:mb-0 xl:order-last"
            >
              <div className="text-center">
                <img
                  src="/contacto2.png"
                  alt="contact photo"
                  className="md:min-w-[500px] w-auto h-auto 2xl:h-[650px] md:min-h-[500px]"
                />
              </div>
            </motion.div>

            <div className="px-4 w-full xl:w-1/2 xl:pl-6">
              <p className="md:pl-4 w-full text-[var(--primary-color)] text-[18px] font-semibold pb-2">
                Contáctanos
              </p>
              <h1 className="md:pl-3 xl:w-[90%] xl:pb-6 text-[var(--heading-color)] text-[2rem] 2xl:text-[50px] lg:text-[2.5em] leading-[1.4em] font-bold">
                Comunícate con Nosotros Hoy
              </h1>
              <div className="h-[40px] lg:h-[20px]"></div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
                <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Nombre Completo*"
                    className="bg-white block w-full py-[11px] px-[20px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && <span className="text-red-500 text-sm">Campo requerido</span>}
                  <div className="h-[30px] lg:h-[30px]"></div>
                </div>

                <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Correo Electrónico*"
                    className="bg-white block w-full py-[11px] px-[20px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && <span className="text-red-500 text-sm">Campo requerido</span>}
                  <div className="h-[30px] lg:h-[30px]"></div>
                </div>

                <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                  <input
                    {...register("phone", { required: true })}
                    type="text"
                    placeholder="Teléfono Móvil*"
                    className="bg-white block w-full py-[11px] px-[20px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.phone && <span className="text-red-500 text-sm">Campo requerido</span>}
                  <div className="h-[30px] lg:h-[30px]"></div>
                </div>

                <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                  <input
                    {...register("subject", { required: true })}
                    type="text"
                    placeholder="Asunto*"
                    className="bg-white block w-full py-[11px] px-[20px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.subject && <span className="text-red-500 text-sm">Campo requerido</span>}
                  <div className="h-[30px] lg:h-[30px]"></div>
                </div>

                <div className="md:px-[12px] w-full">
                  <textarea
                    {...register("message", { required: true })}
                    rows={7}
                    placeholder="Mensaje"
                    className="bg-white block w-full py-[11px] px-[20px] text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.message && <span className="text-red-500 text-sm">Campo requerido</span>}
                  <div className="h-[30px] lg:h-[30px]"></div>
                </div>

                {/* Mensajes de estado */}
                <div className="md:px-[12px] w-full mb-4">
                  {submitError && (
                    <p className="text-red-600 text-sm ">{submitError}</p>
                  )}
                  {submitSuccess && (
                    <p className="text-green-600 text-sm ">{submitSuccess}</p>
                  )}
                </div>

                <div className="md:px-[12px] w-full h-full">
                  <Button
                    text={"Enviar mensaje"}
                    theme="black"
                    variant="inverted"
                    styles="px-[30px] py-[12px]"
                    loading={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="h-[150px] lg:h-[80px]"></div>
      </div>
    </motion.div>
  );
};

export default Contacto;

