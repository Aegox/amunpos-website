// Fuente: https://alignui.com/docs/v1.2/ui/input
// Reconstruido a partir del código real documentado (el fetch no devolvió el
// archivo íntegro linea por línea, pero sí toda la estructura de subcomponentes
// y las clases exactas). Ver README.md de esta carpeta.

// Estructura real: Input.Root (contenedor con borde/sombra) > Input.Wrapper
// (label que agrupa icono + input) > Input.Input (el <input> real) +
// Input.Icon (slot polimórfico) + Input.Affix / Input.InlineAffix (prefijo/sufijo).

// Clases base del <input>:
//   "w-full bg-transparent text-paragraph-sm text-text-strong-950 outline-none"

// Estados del Root (contenedor):
//   default:  "before:ring-1 before:ring-stroke-soft-200 shadow-regular-xs"
//   focus:    "has-[input:focus]:shadow-button-important-focus before:ring-stroke-strong-950"
//   error:    "before:ring-error-base has-[input:focus]:shadow-button-error-focus"
//   disabled: "shadow-none before:ring-transparent"

// Tamaños:
//   medium:  "rounded-10 h-10 px-3 gap-2"
//   small:   "rounded-lg h-9 px-2.5 gap-2"
//   xsmall:  "rounded-lg h-8 px-2 gap-1.5"

// Icono dentro del input:
//   "flex size-5 shrink-0 text-text-sub-600 group-has-[:placeholder-shown]:text-text-soft-400"

// Props: size: "medium" | "small" | "xsmall" (default "medium"), hasError: boolean, asChild: boolean

/*
  NOTA DE ADAPTACIÓN (amunpos-website):
  Nuestro `src/components/ui/input.tsx` implementa Root+Wrapper+Icon con las
  clases exactas de arriba, pero sin el sistema Affix/InlineAffix (prefijo de
  moneda, etc.) porque ningún formulario del sitio lo necesita hoy.
*/
