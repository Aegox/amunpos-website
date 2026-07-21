import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge no conoce nuestros tokens custom de globals.css (escala
// tipográfica de AlignUI, colores semánticos strong/sub/soft/stroke/primary/
// feature/error). Sin este registro, agrupaba por defecto CUALQUIER clase
// "text-*" en un solo grupo — así que "text-label-md" (tamaño de fuente) se
// consideraba en conflicto con "text-static-white" (color) y se quedaba solo
// con la última, borrando el color del texto. Bug real detectado en el botón
// "Prueba gratis" (texto negro sobre fondo azul) — ver conversación.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "title-h1", "title-h2", "title-h3", "title-h4", "title-h5", "title-h6",
            "label-xl", "label-lg", "label-md", "label-sm", "label-xs",
            "paragraph-xl", "paragraph-lg", "paragraph-md", "paragraph-sm", "paragraph-xs",
            "subheading-md", "subheading-sm", "subheading-xs", "subheading-2xs",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "strong-950", "sub-600", "soft-400", "disabled-300", "white-0",
            "static-white", "static-black",
            "primary-base", "primary-dark", "primary-darker",
            "error-base", "error-dark",
            "feature-base", "feature-dark", "feature-light", "feature-lighter",
          ],
        },
      ],
      "bg-color": [
        {
          bg: [
            "weak-50", "soft-200", "white-0", "strong-950", "surface-800", "sub-300",
            "primary-base", "primary-dark", "primary-darker", "primary-alpha-10",
            "error-base", "error-dark", "error-alpha-10",
            "feature-base", "feature-dark", "feature-light", "feature-lighter",
          ],
        },
      ],
      "border-color": [
        {
          border: [
            "stroke-soft-200", "stroke-sub-300", "stroke-strong-950", "stroke-white-0",
            "primary-base", "error-base", "feature-light",
          ],
        },
      ],
      "ring-color": [
        {
          ring: [
            "stroke-soft-200", "stroke-sub-300", "stroke-strong-950", "stroke-white-0",
            "primary-base", "error-base",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
