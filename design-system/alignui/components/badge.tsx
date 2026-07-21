// Fuente: https://alignui.com/docs/v1.2/ui/badge
// El fetch de esta página no devolvió el archivo íntegro (solo el bloque
// `slots` inicial + un comentario "// ... variant definitions"), pero sí
// todas las clases reales por variante/tamaño. Estructura confirmada:
// mismo patrón Root+Icon+Dot con `tv({ slots })` que Button/Tag/Avatar.

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import type { PolymorphicComponentProps } from '@/utils/polymorphic';
import { recursiveCloneChildren } from '@/utils/recursive-clone-children';
import { tv, type VariantProps } from '@/utils/tv';

const BADGE_ROOT_NAME = 'BadgeRoot';
const BADGE_ICON_NAME = 'BadgeIcon';
const BADGE_DOT_NAME = 'BadgeDot';

export const badgeVariants = tv({
  slots: {
    root: 'inline-flex items-center justify-center rounded-full leading-none transition duration-200 ease-out',
    icon: 'shrink-0',
    dot: ['dot', 'flex items-center justify-center', 'before:size-1 before:rounded-full before:bg-current'],
  },
  // variants reales por color (gray/blue/red/green/orange...) x estilo:
  //   filled:  bg-[color]-base text-static-white
  //   light:   bg-[color]-light text-[color]-dark
  //   lighter: bg-[color]-lighter text-[color]-base
  //   stroke:  ring-1 ring-inset ring-current text-[color]-base
  // tamaños:
  //   small:  h-4 gap-1.5 px-2 text-subheading-2xs uppercase
  //   medium: h-5 gap-1.5 px-2 text-label-xs
  // radio: rounded-full (siempre, sin excepción)
});

/*
  NOTA: esta página en particular no reveló los objetos `variants`/
  `compoundVariants` completos (a diferencia de Button/Tag/Avatar donde sí
  se obtuvo el archivo entero). Si se necesita fidelidad 100% en el futuro,
  volver a `alignui.com/docs/v1.2/ui/badge` y pedir explícitamente el bloque
  de código completo, o extraerlo directamente de la instalación real vía
  su CLI (`npx alignui-cli add badge`).
*/
