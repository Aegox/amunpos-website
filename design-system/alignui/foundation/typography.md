# Tipografía — alignui.com/docs/v1.2/foundation/typography

Fuente: **Inter** para todo (títulos, labels, párrafos). Recomendada vía
`next/font/google` con variable `--font-sans` (ver
`alignui.com/docs/installation/next`).

Todos los valores abajo son verbatim de la documentación oficial.

## Title (headings grandes, peso Medium/500)

| Token | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|
| `title-h1` | 56px | 64px | 500 | -1% |
| `title-h2` | 48px | 56px | 500 | -1% |
| `title-h3` | 40px | 48px | 500 | -1% |
| `title-h4` | 32px | 40px | 500 | -0.5% |
| `title-h5` | 24px | 32px | 500 | 0% |
| `title-h6` | 20px | 28px | 500 | 0% |

## Label (texto de UI con énfasis: botones, labels de campo)

| Token | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|
| `label-xl` | 24px | 32px | 500 | -1.5% |
| `label-lg` | 18px | 24px | 500 | -1.5% |
| `label-md` | 16px | 24px | 500 | -1.1% |
| `label-sm` | 14px | 20px | 500 | -0.6% |
| `label-xs` | 12px | 16px | 500 | 0% |

## Paragraph (texto de cuerpo, peso Regular/400)

| Token | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|
| `paragraph-xl` | 24px | 32px | 400 | -1.5% |
| `paragraph-lg` | 18px | 24px | 400 | -1.5% |
| `paragraph-md` | 16px | 24px | 400 | -1.1% |
| `paragraph-sm` | 14px | 20px | 400 | -0.6% |
| `paragraph-xs` | 12px | 16px | 400 | 0% |

## Subheading (uso: labels de dropdown/badges, generalmente uppercase)

| Token | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|
| `subheading-md` | 16px | 24px | 500 | 6% |
| `subheading-sm` | 14px | 20px | 500 | 6% |
| `subheading-xs` | 12px | 16px | 500 | 4% |
| `subheading-2xs` | 11px | 12px | 500 | 2% |

## Doc (solo para su propia documentación, no relevante para producto)

| Token | Tamaño | Line-height | Peso | Letter-spacing |
|---|---|---|---|---|
| `doc-label` | 18px | 32px | 500 | -1.5% |
| `doc-paragraph` | 18px | 32px | 400 | -1.5% |

## Cómo se mapeó a Tailwind v4 en `globals.css`

Cada fila se declaró como un cuarteto de variables `--text-<token>` /
`--text-<token>--line-height` / `--text-<token>--letter-spacing` /
`--text-<token>--font-weight` dentro de un bloque `@theme`, lo que hace que
Tailwind v4 genere automáticamente utilidades `text-title-h1`,
`text-label-sm`, etc. que ya incluyen tamaño, line-height, letter-spacing
**y** peso correctos en una sola clase — no hace falta combinar `leading-*`,
`tracking-*` ni `font-medium`/`font-normal` aparte.
