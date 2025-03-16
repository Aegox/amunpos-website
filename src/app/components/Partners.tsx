import React from "react";

const Partners: React.FC = () => {
  return (
    <div className="pb-20 h-full w-full px-5">
      <h1 className="w-full text-center pb-10 text-[var(--heading-color)] font-semibold text-[18px]">
        Nuestros patrocinadores a nivel mundial
      </h1>
      <ul className="flex w-full justify-center flex-wrap gap-5 lg:gap-15">
        <li>
          <img 
            src="/brand_1.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>       
        <li>
          <img 
            src="/brand_2.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <img 
            src="/brand_3.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <img 
            src="/brand_4.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <img 
            src="/brand_5.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
        <li>
          <img 
            src="/brand_6.svg" 
            alt="a partner of amunpos in the world"
            className="filter grayscale transition duration-300 hover:grayscale-0" 
          />
        </li>
      </ul>
    </div>
  );
};

export default Partners;
