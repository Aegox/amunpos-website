# AlignUI — referencia de sistema de diseño

Esta carpeta es material de estudio, **no** código que la app importe directamente.
Contiene el código fuente real de los componentes gratuitos de
[alignui.com/docs](https://alignui.com/docs) (licencia libre, pensados para
copiar/pegar), extraído directamente de su documentación, para que cualquiera
en el equipo pueda ver exactamente cómo miden, nombran y animan cada pieza
antes de adaptarla al sistema de AmunPOS.

**Por qué existe:** la landing y el flujo de auth de amunpos-website se
rediseñaron "al estilo AlignUI" (rama `rediseno-alignui`), pero usando el azul
de marca de AmunPOS en vez del azul por defecto de AlignUI. Esta carpeta es la
fuente de verdad de esas medidas/clases para que el resto de componentes del
sitio (o de futuros proyectos) se puedan alinear con la misma precisión, sin
tener que volver a investigar cada vez.

## Qué stack usa AlignUI realmente

- **Primitivos**: Radix UI (`@radix-ui/react-*`) sin excepción — Dialog, Checkbox,
  Switch, Tooltip, Dropdown-menu, Label, Slot.
- **Variantes**: [`tailwind-variants`](https://www.tailwind-variants.org/) (la
  función `tv`), no `class-variance-authority` — permite `slots` (varias partes
  con clases propias dentro del mismo componente) y `compoundVariants`.
- **Iconos**: [`@remixicon/react`](https://www.npmjs.com/package/@remixicon/react)
  (Remix Icon, MIT). Todo ícono de UI (cerrar, flechas, etc.) es un
  `Ri*Line`/`Ri*Fill` de ese paquete — no SVGs custom, excepto el check y el
  indeterminate del Checkbox (sí son paths inline, están en `icons/`).
  Confirmado en el código real de Modal (`RiCloseLine`), Tag (`RiCloseFill`) y
  Dropdown (`RiArrowRightSLine`).
- **Composición polimórfica**: cada componente compuesto (Button, Badge, Tag,
  Avatar) usa un patrón `Root` + `Icon` con `recursiveCloneChildren` para
  inyectar `variant/size/color` del padre al hijo automáticamente. Es elegante
  pero es más maquinaria de la que amunpos-website necesita hoy — en la app
  real adaptamos las clases visuales sin replicar ese motor polimórfico
  completo (ver nota en cada componente adaptado).
- **Fuente**: Inter (confirmado en `alignui.com/docs/installation/next`, que
  recomienda `next/font/google` con `Inter` como `--font-sans`).

## Índice

- [`foundation/colors.md`](foundation/colors.md) — nomenclatura de tokens de
  color (`bg-*`, `text-*`, `stroke-*`, `primary-*`) y su mapeo a la marca de
  AmunPOS.
- [`foundation/typography.md`](foundation/typography.md) — escala tipográfica
  completa (title/label/paragraph/subheading) con tamaño, line-height, peso y
  letter-spacing exactos.
- [`foundation/radius-shadow.md`](foundation/radius-shadow.md) — radios y
  sombras (`shadow-regular-xs`, `shadow-button-*-focus`, etc.).
- [`components/`](components/) — código fuente real de 13 componentes
  (Button, Input, Label, Textarea, Checkbox, Switch, Modal, Tooltip, Tag,
  Badge, Avatar, Divider, Dropdown), tal como aparece en su documentación.
- [`icons/`](icons/) — los 2 SVG custom del Checkbox (check + indeterminate)
  y la lista de iconos Remix Icon usados por los componentes de esta carpeta.

## Cómo se usó esto en amunpos-website

Los tokens de `foundation/colors.md` y `foundation/typography.md` están
volcados en `src/app/globals.css` (bloque `@theme` bajo el comentario
"AlignUI"). Los componentes reales de la app (`src/components/ui/*`,
`src/app/components/Button.tsx`, etc.) toman las clases de aquí pero
**no** replican el motor polimórfico `recursiveCloneChildren` — nuestros
componentes son más simples porque los usamos con una API de props directa
(`variant`, `size`, `icon`), no con children compuestos arbitrarios.
