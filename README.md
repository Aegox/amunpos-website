# amunpos-website — rediseño Astro + AlignUI

Landing page de AmunPOS reconstruida desde cero en **Astro + React** (islas),
siguiendo el sistema de diseño real de [AlignUI](https://alignui.com) — ver
`design-system/alignui/` para la referencia completa (componentes reales,
tokens de color/tipografía, iconos) — y con la información de arquitectura de
página inspirada en las plantillas de landing de
[Untitled UI](https://www.untitledui.com/react/marketing/landing-pages)
(patrón de secciones alternadas, tarjeta de plan "popular" elevada, franja de
logos tras el hero).

## Stack

- **Astro 4** (compatible con Node 18.20+, sin exigir Node 22 como Astro 5)
- **React 18** vía `@astrojs/react`, solo para las piezas interactivas
  (nav móvil, carrusel de testimonios, acordeón de FAQ) — el resto de
  secciones son componentes `.astro` estáticos, sin JS de cliente.
- **Tailwind CSS v4** vía `@tailwindcss/vite` (CSS-first, `@theme` en
  `src/styles/globals.css`)
- **Radix UI** primitives (`@radix-ui/react-accordion`, etc.) + **Remix Icon**
  (`@remixicon/react`) — el set de iconos real de AlignUI.

## Estructura

```
src/
├── components/
│   ├── sections/     # secciones de la landing (.astro estáticas + .tsx islas)
│   └── ui/            # primitivos reales de AlignUI (button, input, modal...)
├── layouts/
│   └── Layout.astro   # shell HTML, fuente Inter, CSS global
├── lib/
│   └── utils.ts       # cn() — clsx + tailwind-merge con los tokens custom registrados
├── pages/
│   └── index.astro    # composición de la landing
└── styles/
    └── globals.css     # tokens AlignUI (color, radios, sombras, escala tipográfica)
```

## Comandos

| Comando           | Acción                                    |
| ----------------- | ----------------------------------------- |
| `npm install`      | Instala dependencias                      |
| `npm run dev`      | Servidor de desarrollo                    |
| `npm run build`    | Build de producción a `./dist/`           |
| `npm run preview`  | Sirve el build de producción localmente   |
| `npm run astro check` | Typecheck de archivos `.astro`/`.tsx`  |

## Alcance de esta rama

Esta rama (`astro-alignui-rebuild`) cubre **solo la landing page**. El flujo
de auth/onboarding (login, registro, dashboard) sigue viviendo en la versión
Next.js (`rediseno-alignui`) — no se portó aquí todavía.
