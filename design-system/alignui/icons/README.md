# Iconos usados por AlignUI

## Set principal: Remix Icon vía `@remixicon/react`

Confirmado en el código fuente real de tres componentes distintos:

- `Modal` → `RiCloseLine` (botón de cerrar)
- `Tag` → `RiCloseFill` (botón de dismiss)
- `Dropdown` → `RiArrowRightSLine` (flecha de submenú)

Es decir: **AlignUI no dibuja sus propios iconos de línea** — usa
[Remix Icon](https://remixicon.com/) completo (más de 2800 iconos, MIT,
gratis) a través del paquete oficial `@remixicon/react`, que exporta cada
icono como un componente React (`Ri<Nombre><Line|Fill>`). Por eso, para
tener fidelidad real con AlignUI en cualquier ícono de interfaz (flechas,
cerrar, chevrons, ojo de mostrar/ocultar contraseña, sobre, candado,
usuario, etc.) lo correcto es **instalar el paquete real**, no aproximarlo
con otra librería:

```bash
npm install @remixicon/react
```

Uso:
```tsx
import { RiCloseLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiUserLine } from '@remixicon/react';

<RiCloseLine className="size-5" />
```

Cada componente es un `RemixiconComponentType` — polimórfico, acepta
`className`, `size`, y cualquier prop SVG estándar.

## Iconos custom (no son de Remix Icon)

Solo el **Checkbox** dibuja sus propios paths a mano, porque necesita
animar el trazo (stroke-dasharray/stroke-dashoffset) como si el check se
"dibujara" al marcarse — Remix Icon no ofrece esa variante animable.
Los paths exactos ya están extraídos en esta misma carpeta:

- [`checkbox-check.svg`](checkbox-check.svg) — el ✓, viewBox `0 0 10 8`,
  path `M1 3.5L4 6.5L9 1.5`, `stroke-width="1.5"`. Longitud total real
  (via `getTotalLength()`): **11.313708305358887**.
- [`checkbox-indeterminate.svg`](checkbox-indeterminate.svg) — la raya del
  estado indeterminado, viewBox `0 0 8 2`, path `M0 1H8`,
  `stroke-width="1.5"`. Longitud total: **8**.

## Mapeo Remix Icon usado en la app (amunpos-website)

Al reconstruir el flujo de auth con fidelidad AlignUI, se reemplazaron los
iconos de `react-icons/md` por sus equivalentes reales de Remix Icon:

| Antes (react-icons/md) | Ahora (@remixicon/react) |
|---|---|
| `MdOutlineEmail` | `RiMailLine` |
| `MdLockOutline` | `RiLockLine` |
| `MdVisibility` / `MdVisibilityOff` | `RiEyeLine` / `RiEyeOffLine` |
| `MdPerson` | `RiUserLine` |
| `MdClose` | `RiCloseLine` |
