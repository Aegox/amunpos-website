import Button from "./Button";

const Contacto = () => {
  return (
    <div id="contacto" className="relative">
      <div className="h-[50px] lg:h-[40px]"></div>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row-reverse items-center justify-center">
          <div className="flex justify-center w-full h-full min-w-[45%] md:w-[45%] 2xl:w-1/2 mb-6 xl:mb-0 xl:order-last">
            <div className="text-center">
              <img src="/contacto2.png" alt="contact photo" className="md:min-w-[500px] w-auto h-auto 2xl:h-[650px] md:min-h-[500px]" />
            </div>
          </div>
          <div className="px-4 w-full xl:w-1/2 xl:pl-6">
            <div className="">
              <p className="md:pl-4 w-full text-[var(--primary-color)] text-[18px] font-semibold pb-2">Contactanos</p>
              <h1 className="md:pl-3 xl:w-[90%] xl:pb-6 text-[var(--heading-color)]  text-[2rem] 2xl:text-[50px] lg:text-[2.5em] leading-[1.4em] font-bold"> Comunícate con Nosotros Hoy</h1>
            </div>
            <div className="h-[40px] lg:h-[20px]"></div>
            <form action="https://api.web3forms.com/submit" method="POST" id="cs_form" className="flex flex-wrap ">
              <input type="hidden" name="access_key" value="cd98b256-0db3-478c-ab2asd8-1ec94f8aqwsq0447c" />
              <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                <input type="text" name="name" className="bg-white block w-full py-[11px] px-[20px]  text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Nombre Completo*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                <input type="email" name="email" className="bg-white block w-full py-[11px] px-[20px]  text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Correo Electrónico*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                <input type="text" name="phone" className="bg-white block w-full py-[11px] px-[20px]  text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Teléfono Móvil*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="md:px-[12px] md:w-1/2 w-full sm:mb-0">
                <input type="text" name="subject" className="bg-white block w-full py-[11px] px-[20px]  text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Asunto*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="md:px-[12px] w-full ">
                <textarea name="message" rows={7} className="bg-white block w-full py-[11px] px-[20px]  text-gray-700 placeholder-gray-600 border-[0.3px] border-gray-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe los Detalles del Proyecto*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="md:px-[12px] w-full h-full">
                <button type="submit">
                  <Button text="Enviar mensaje" theme="black" variant="inverted" styles="px-[30px] py-[12px]"/>
                </button>
                <div id="cs_result"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-[150px] lg:h-[80px]"></div>
    </div>
  );
};

export default Contacto;

