# amunpos-website — Astro + AlignUI, estructura inspirada en Untitled UI

Landing page de amunpos reconstruida desde cero en **Astro + React** (islas),
con el sistema de diseño real de [AlignUI](https://alignui.com) (ver
`design-system/alignui/`) y la **arquitectura de página** tomada de las
plantillas reales de [Untitled UI](https://www.untitledui.com/react/marketing/landing-pages)
(estudiadas con capturas reales, no solo la documentación): pill de anuncio
de dos segmentos en el hero, nav plano (no flotante), iconos de feature sin
relleno de color (solo borde), tarjeta de plan "popular" con etiqueta sutil
en vez de elevación dramática, y tarjeta "¿Sigues con dudas?" con avatares
superpuestos tras el FAQ.

## Stack

- **Astro 4** (compatible con Node 18.20+)
- **React 18** vía `@astrojs/react`, solo para las piezas interactivas
  (nav móvil, carrusel de testimonios, acordeón de FAQ)
- **Tailwind CSS v4** vía `@tailwindcss/vite`
- **Radix UI** + **Remix Icon** (`@remixicon/react`, el set de iconos real de AlignUI)

## Estructura

```
src/
├── components/
│   ├── sections/     # secciones de la landing
│   └── ui/            # primitivos reales de AlignUI (button, input, modal...)
├── layouts/Layout.astro
├── lib/utils.ts       # cn() con los tokens custom registrados en tailwind-merge
├── pages/index.astro
└── styles/globals.css # tokens AlignUI
```

## Comandos

| Comando               | Acción                                  |
| ---------------------- | ---------------------------------------- |
| `npm install`          | Instala dependencias                      |
| `npm run dev`          | Servidor de desarrollo                    |
| `npm run build`        | Build de producción a `./dist/`           |
| `npm run preview`      | Sirve el build de producción localmente   |
| `npx astro check`      | Typecheck de archivos `.astro`/`.tsx`     |

## Alcance de esta rama

Solo la landing page. El flujo de auth/onboarding sigue viviendo en la
versión Next.js (`rediseno-alignui`).
