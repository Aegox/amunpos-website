# Color — alignui.com/docs/v1.2/foundation/color

AlignUI **no publica valores hex fijos** para sus tokens semánticos: su CLI
(`alignui/cli`, ver `github.com/alignui/cli` discusión #3) te pregunta al
instalar qué color neutro (Gray o Slate) y qué color primario (Blue, Purple,
Orange, Sky) quieres, y genera la hoja de variables con esos valores. Lo que
sí es fijo y documentado es la **nomenclatura de tokens** — ese es el activo
real que copiamos: nombres semánticos de dos capas (`bg-weak-50` en vez de
`bg-gray-50` directamente), para poder recolorear todo el sistema cambiando
un solo valor base.

## Nomenclatura real (verbatim de `alignui/cli` discusión #3)

```css
/* Neutral (elegido: Gray o Slate) */
--color-neutral-0 … --color-neutral-900   /* escala de 10 pasos */
--color-neutral-alpha-10/16/24            /* overlays translúcidos */

/* Marca */
--color-primary-base
--color-primary-alpha-10

/* Estáticos (no cambian con el tema) */
--color-static-black
--color-static-white

/* Semántico: fondos */
--color-bg-strong-950   /* fondo casi negro, ej. footers, botones "neutral filled" */
--color-bg-surface-800  /* hover del anterior */
--color-bg-sub-300      /* fondo de controles inactivos (ej. track de switch) */
--color-bg-soft-200     /* fondo sutil (ej. checkbox sin marcar) */
--color-bg-weak-50      /* fondo de superficie secundaria (hover de filas, etc) */
--color-bg-white-0      /* blanco puro */

/* Semántico: texto */
--color-text-strong-950   /* texto principal / headings */
--color-text-sub-600      /* texto secundario */
--color-text-soft-400     /* texto terciario / placeholder */
--color-text-disabled-300 /* texto deshabilitado */
--color-text-white-0      /* texto blanco (sobre fondos oscuros) */

/* Semántico: bordes */
--color-stroke-strong-950  /* borde de máximo contraste (focus ring) */
--color-stroke-sub-300     /* borde medio */
--color-stroke-soft-200    /* borde por defecto, el más usado */
--color-stroke-white-0     /* borde blanco (sobre fondos oscuros) */
```

Además (de los componentes reales que sí vimos en código):
`primary-darker`, `primary-dark` (variantes hover/focus más oscuras del
primario), y colores semánticos completos por familia — `success` (verde),
`error` (rojo), `warning` (naranja), `information` (azul), `away`
(amarillo), `feature` (púrpura), `verified` (sky), `highlighted` (rosa),
`stable` (teal) — cada uno con variantes `-base`, `-dark`, `-light`,
`-lighter`, cf. investigación previa de este mismo proyecto.

## Mapeo aplicado a AmunPOS

En vez de regenerar la CLI de AlignUI (que pide sus propios valores),
mapeamos manualmente esta nomenclatura sobre:

- **`primary-*`** → el azul histórico de AmunPOS, `hsl(204 88% 40%)` /
  `#0c71c2` (ya usado como `--primary-color` desde antes de este rediseño).
  - `primary-base` = `hsl(204 88% 40%)` (el azul de siempre)
  - `primary-darker` = `hsl(204 88% 32%)` (hover de botón filled)
  - `primary-dark` = `hsl(204 88% 36%)` (focus ring)
  - `primary-alpha-10` = `hsl(204 88% 40% / 10%)` (fondo "lighter"/"ghost" hover)
- **`neutral-*` / `bg-*` / `text-*` / `stroke-*`** → escala de grises neutra
  estándar (equivalente a elegir "Gray" en su CLI), no un gris con matiz
  azulado — para que el azul de marca sea lo único que "hable" de color.
- **`static-black` / `static-white`** → `#000000` / `#ffffff` literal, sin
  cambios (son literal negro/blanco puro por diseño, para texto sobre
  botones de color).

Los valores concretos están en `src/app/globals.css`, bloque `@theme`
bajo el comentario "AlignUI — foundation".
