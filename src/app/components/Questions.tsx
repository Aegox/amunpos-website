import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Questions: React.FC = () => {
  
  return (
    <div className="flex flex-col justify-center bg-black py-28 px-5 lg:px-[10%] w-full h-full ">
      <h1 className="text-2xl xl:text-3xl font-bold text-white mb-4 ">Preguntas frecuentes</h1>
      <p className="font-light text-lg text-white mb-10">Respondemos las preguntas de nuestros usuarios para aclarar dudas sobre el uso de nuestro servivio.</p>      <Accordion type="single" collapsible className="w-full ">
        {faqData.map((item, index) => (
            <AccordionItem className="border-orange-400 bg-black text-orange-400 lg:px-16 py-5" value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-[18px] font-semibold">{item.question}</AccordionTrigger>
            <AccordionContent className="text-[1rem] font-light text-white">
              {item.answer.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Questions;
