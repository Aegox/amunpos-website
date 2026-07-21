# Radios y sombras — extraídos del código real de los componentes

AlignUI no usa solo la escala de `rounded-*` estándar de Tailwind: agrega
radios propios en px exactos (`rounded-10`, `rounded-20`) para que ciertos
componentes (Button medium, Modal) tengan una curva más particular que no
cae en `rounded-lg`/`rounded-xl` de fábrica.

## Radios observados en el código real

| Clase | Uso observado | Valor |
|---|---|---|
| `rounded-lg` | Button (small/xsmall/xxsmall), Dropdown item, Tag | 0.5rem (8px) |
| `rounded-10` | Button medium, Input medium | 10px (custom) |
| `rounded-xl` | Textarea, Tooltip (size medium) | 0.75rem (12px) |
| `rounded-20` | Modal content | 20px (custom) |
| `rounded-2xl` | Dropdown content/sub-content | 1rem (16px) |
| `rounded-md` | Tooltip (size small), Divider text variant, Tag | 0.375rem (6px) |
| `rounded-full` | Badge, Avatar, Switch track/thumb | 9999px |

## Sombras observadas (todas son tokens custom, no las de Tailwind stock)

| Token | Uso |
|---|---|
| `shadow-regular-xs` | Sombra base sutil de Input/Textarea/Button neutral-stroke en reposo |
| `shadow-regular-md` | Sombra de Modal y Dropdown content (más profunda, para overlays flotantes) |
| `shadow-button-primary-focus` | Anillo de foco de botones/inputs variante primary |
| `shadow-button-error-focus` | Anillo de foco variante error |
| `shadow-button-important-focus` | Anillo de foco variante neutral/importante (el más usado: inputs, botones neutral) |
| `shadow-switch-thumb` | Sombra del thumb del Switch (le da volumen de "pastilla" 3D) |
| `shadow-tooltip` | Sombra del Tooltip content |

Estas sombras no tienen un valor CSS público documentado (dependen del CLI),
así que en `globals.css` se definieron aproximaciones fieles al mismo
lenguaje visual: `shadow-regular-xs`/`md` como sombras muy sutiles de un solo
capa (`0 1px 2px rgba(13,12,23,.04)` / `0 12px 32px -8px rgba(13,12,23,.12)`),
y los `shadow-button-*-focus` como un anillo de 2 sombras apiladas
(`0 0 0 1px <color> , 0 0 0 4px <color al 20%>`) — el mismo patrón que usa
AlignUI para simular un "focus ring" sin usar `ring-*` de Tailwind (porque el
ring ya está ocupado por el borde normal del componente).
