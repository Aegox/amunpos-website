import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

/**
 * El botón de Google, con NUESTRO aspecto.
 *
 * Google no deja dar estilo a su botón: lo dibuja dentro de un iframe y solo
 * admite las opciones de su API (tema, forma, tamaño). Con el diseño de este
 * sitio desentona — otro radio, otra sombra, otra tipografía.
 *
 * La salida obvia sería `useGoogleLogin`, que sí devuelve el control del
 * marcado… pero devuelve un `access_token`, y nuestro backend verifica un
 * `id_token` (`/auth/google` llama a `verifyIdToken`). Cambiarlo obligaría a
 * tocar el backend, que ya está hecho y funcionando.
 *
 * Así que se superponen los dos: el nuestro debajo, el de Google encima e
 * invisible. El clic lo recibe el de Google —con lo que el flujo del
 * `id_token` no cambia ni una línea— y lo que se ve es el nuestro. El
 * envoltorio mide el ancho real y se lo pasa al de Google, porque su botón
 * necesita un ancho en píxeles y si no coincide queda una franja donde el clic
 * no hace nada.
 */
export function BotonGoogle({
  texto,
  onCredencial,
  onFallo,
  deshabilitado,
}: {
  texto: string;
  onCredencial: (idToken: string) => void;
  onFallo: () => void;
  deshabilitado?: boolean;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);

  useEffect(() => {
    const medir = () => setAncho(caja.current?.offsetWidth ?? 0);
    medir();
    if (!caja.current || typeof ResizeObserver === "undefined") return;
    const observador = new ResizeObserver(medir);
    observador.observe(caja.current);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={caja} className="relative w-full">
      {/* El que se ve. `aria-hidden` porque quien lee con lector de pantalla
          debe encontrar el botón DE VERDAD, el de Google, no este adorno. */}
      <div
        aria-hidden="true"
        className={
          "flex h-11 w-full items-center justify-center gap-2.5 rounded-13 bg-gray-0 text-label-sm text-gray-900 shadow-button-white transition duration-200 " +
          (deshabilitado ? "opacity-50" : "hover:bg-gray-25")
        }
      >
        <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.44-4.96 3.44-8.46Z"
          />
          <path
            fill="#34A853"
            d="M12 23.5c3.1 0 5.7-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.53-2.02-6.44-4.74H1.72v2.98A11.5 11.5 0 0 0 12 23.5Z"
          />
          <path
            fill="#FBBC05"
            d="M5.56 14.18a6.9 6.9 0 0 1 0-4.36V6.84H1.72a11.51 11.51 0 0 0 0 10.32l3.84-2.98Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.69 0 3.2.58 4.4 1.72l3.29-3.29C17.7 1.28 15.1.25 12 .25 7.52.25 3.65 2.82 1.72 6.84l3.84 2.98C6.47 7.1 9 5.08 12 5.08v-.33Z"
          />
        </svg>
        {texto}
      </div>

      {/* El de verdad: encima, transparente y con el mismo tamaño. */}
      <div
        className="absolute inset-0 overflow-hidden opacity-0 [color-scheme:light]"
        style={{ pointerEvents: deshabilitado ? "none" : "auto" }}
      >
        {ancho > 0 && (
          <GoogleLogin
            onSuccess={(r) => {
              if (r.credential) onCredencial(r.credential);
            }}
            onError={onFallo}
            useOneTap={false}
            theme="outline"
            size="large"
            shape="rectangular"
            text="continue_with"
            width={ancho}
          />
        )}
      </div>
    </div>
  );
}
