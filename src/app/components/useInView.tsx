
import { useState, useEffect, useRef } from 'react';

const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificamos que ref esté asignado
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // Si el elemento está en el viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Si quieres que la animación se dispare solo una vez, desconecta el observer
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
};

export default useInView;

