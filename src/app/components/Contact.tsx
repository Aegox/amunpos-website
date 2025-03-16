
import Image from 'next/image';

const Contacto = () => {
  return (
    <div id="contacto" className="relative">
      <div className="h-[143px] lg:h-[75px]"></div>
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full xl:w-1/2 mb-6 xl:mb-0 xl:order-last">
            <div className="text-center">
              <Image src="/assets/img/contact_left.png" alt="Imagen" width={400} height={400} />
            </div>
          </div>
          <div className="w-full xl:w-1/2 xl:pl-6">
            <div className="mb-4">
              <p className="text-accent text-lg mb-2">Contáctanos</p>
              <h2 className="text-3xl font-bold mb-0">Ponte en Contacto! Comunícate con Nosotros Hoy</h2>
            </div>
            <div className="h-[50px] lg:h-[40px]"></div>
            <form action="https://api.web3forms.com/submit" method="POST" id="cs_form" className="flex flex-wrap">
              <input type="hidden" name="access_key" value="cd98b256-0db3-478c-ab2asd8-1ec94f8aqwsq0447c" />
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <input type="text" name="name" className="block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nombre Completo*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <input type="email" name="email" className="block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Correo Electrónico*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <input type="text" name="phone" className="block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Teléfono Móvil*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <input type="text" name="subject" className="block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Asunto*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="w-full mb-4">
                <textarea name="message" rows={7} className="block w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe los Detalles del Proyecto*" required />
                <div className="h-[30px] lg:h-[30px]"></div>
              </div>
              <div className="w-full mb-4">
                <button type="submit" className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded">
                  Enviar Mensaje
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

