# Plan de internacionalización — amunpos.com

Estado: **propuesta, sin implementar**. La sección de precios ya está lista y es
la que fuerza casi todas las decisiones de aquí.

---

## 1. Qué problema hay que resolver, en realidad

Son dos cosas que la gente suele mezclar y **no son la misma**:

| | Idioma | Moneda y precio |
|---|---|---|
| Lo decide | qué lee cómodo el visitante | **dónde se factura** |
| Cambiar mal cuesta | que lea en inglés sin querer | que vea un precio que no le vas a cobrar |
| Se puede cambiar sin más | sí | **no** |

Un mexicano viviendo en Miami quiere la web en español y que le cobres en USD.
Un colombiano de viaje por Portugal quiere español y pesos. **El idioma sale del
navegador; la moneda sale del país de facturación.** Si se atan los dos a la
misma señal, uno de los dos casos sale mal siempre.

Y hay una tercera cosa que casi nadie separa y aquí importa mucho:

> **Convertir no es lo mismo que fijar precio.**

$29 USD son ~113.000 COP al cambio de hoy. Un SaaS colombiano no cobra 113.000:
cobra 99.000. Si se muestra el resultado de una multiplicación, el precio baila
cada día, sale con céntimos, y quien lo vea dos veces con números distintos deja
de fiarse. **Los precios por país se fijan a mano, no se calculan.**

---

## 2. Alcance propuesto

**Fase 1 — Moneda (lo que se pidió y lo que más cambia la conversión)**
Los precios se ven en la moneda del visitante, con importes fijados a mano por
país y un selector para corregir.

**Fase 2 — Idioma**
Español (por defecto), inglés y portugués, con URL propia por idioma.

Van en ese orden porque la moneda **ya tiene dónde encajar** (la tabla de precios
recién hecha) y el idioma toca los 12 componentes del sitio. Y porque el precio
en la moneda de uno mueve la aguja bastante más que traducir la web.

---

## 3. Fase 1 — Moneda

### 3.1 De dónde sale el país

Por orden, gana el primero que responda:

1. **Lo que eligió el visitante** (`localStorage`). Manda siempre: si tocó el
   selector, no se le vuelve a mover.
2. **Cabecera de geo del CDN.** Vercel da `x-vercel-ip-country`, Cloudflare
   `cf-ipcountry`. Es lo más fiable y **no cuesta nada** — ya viene en la
   petición.
3. **La zona horaria del navegador.** `Intl.DateTimeFormat().resolvedOptions().timeZone`
   → `America/Bogota`. Acierta bastante y no requiere permisos.
4. **Nada de lo anterior** → USD. Es la caída por defecto y es la correcta:
   nadie se ofende por ver USD, y sí por ver la moneda del país de al lado.

**Lo que NO se va a usar:** la API de geolocalización del navegador. Pide un
permiso, sale un cartel del sistema encima del hero, y todo para un dato que la
IP ya da con precisión de sobra. Pedir permiso de ubicación para enseñar un
precio es la clase de cosa que hace cerrar la pestaña.

### 3.2 La tabla de precios por país

Un solo fichero, `src/data/precios.ts`, con los importes **escritos a mano**:

```ts
export const monedas = {
  USD: { simbolo: "$",    codigo: "USD", decimales: 0, paises: ["US", "EC", "PA", "SV"] },
  COP: { simbolo: "$",    codigo: "COP", decimales: 0, paises: ["CO"] },
  MXN: { simbolo: "$",    codigo: "MXN", decimales: 0, paises: ["MX"] },
  PEN: { simbolo: "S/",   codigo: "PEN", decimales: 0, paises: ["PE"] },
  CLP: { simbolo: "$",    codigo: "CLP", decimales: 0, paises: ["CL"] },
  ARS: { simbolo: "$",    codigo: "ARS", decimales: 0, paises: ["AR"] },
  EUR: { simbolo: "€",    codigo: "EUR", decimales: 0, paises: ["ES"] },
};

// Precio mensual por plan y moneda. NO se calcula: se decide.
export const precios = {
  basico:      { USD: 29,  COP: 99000,  MXN: 499,  PEN: 109, CLP: 26900, ARS: 29900, EUR: 27 },
  estandar:    { USD: 49,  COP: 169000, MXN: 899,  PEN: 189, CLP: 45900, ARS: 49900, EUR: 45 },
  profesional: { USD: 79,  COP: 269000, MXN: 1499, PEN: 299, CLP: 74900, ARS: 79900, EUR: 73 },
};
```

Los números de arriba son **de ejemplo**: hay que fijarlos con criterio comercial
(qué cobra la competencia local, qué poder adquisitivo hay, cómo queda el número
redondo). Eso no lo decide el código.

Argentina va a necesitar revisión periódica; el resto aguanta años.

### 3.3 Cómo se pinta

`Intl.NumberFormat` con el locale del visitante:

```ts
new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP",
  maximumFractionDigits: 0 }).format(99000);  // "$ 99.000"
```

Con eso el separador de miles sale bien en cada sitio sin tabla propia (`99.000`
en Colombia, `99,000` en México) — y ya tenemos `tabular-nums` en los precios,
así que al cambiar de moneda no bailan las columnas.

**Aviso importante para el diseño:** `$79` ocupa 3 caracteres y `$269.000` ocupa
8. La cabecera de plan de la tabla nueva tiene que aguantar eso sin romperse. Hay
que probarlo con COP y ARS antes de dar la fase por cerrada; probablemente haya
que bajar el tamaño del precio en las monedas largas.

### 3.4 El selector

Junto al conmutador mes/año, un botón discreto: `🇨🇴 COP ▾` que abre una lista de
países. Al elegir, se guarda en `localStorage` y se repinta.

Debajo, en letra pequeña: **"Precios en pesos colombianos. Se factura en COP."**
Sin esa frase el visitante no sabe si el precio es una conversión orientativa o
lo que le van a cobrar, y eso frena la compra.

### 3.5 Detalle que se suele romper

El sitio es **estático** (Astro sin SSR). Si el precio se pintara en el HTML del
build, todos los visitantes verían el mismo. Dos salidas:

- **A (recomendada):** el HTML sale con USD, y una isla de React corrige en
  cliente al montar. Funciona en cualquier hosting estático, no cambia nada de
  la infraestructura. Coste: un parpadeo de USD → moneda local en la primera
  carga. Se tapa renderizando el precio con `visibility:hidden` hasta que se
  resuelve la moneda (solo el precio, no el bloque: así no salta la maquetación).
- **B:** activar SSR para la home y leer la cabecera de geo en el servidor. Sin
  parpadeo, pero obliga a que el sitio deje de ser estático — y eso se paga en
  velocidad en TODAS las visitas para arreglar un parpadeo de 100 ms en la
  primera.

Con **A**, y si algún día el sitio ya es SSR por otra razón, se pasa a **B** sin
tocar el resto.

---

## 4. Fase 2 — Idioma

### 4.1 URL por idioma

```
amunpos.com/         → español (por defecto, sin prefijo)
amunpos.com/en/      → inglés
amunpos.com/pt/      → portugués
```

Astro trae enrutado i18n de serie (`i18n` en `astro.config.mjs`), así que esto
no necesita librería. Cada idioma genera sus páginas estáticas en el build: no
hay coste en tiempo de ejecución y **Google indexa las tres**, que es la mitad
del motivo de traducir.

Con `<link rel="alternate" hreflang="...">` en las tres, más `x-default` al
español.

**Por qué URL y no un conmutador que cambia el texto en cliente:** sin URL propia
no hay nada que indexar, no se puede compartir un enlace en inglés, y al recargar
se pierde el idioma. Un selector sin URL es una demo, no una web multi-idioma.

### 4.2 Dónde vive el texto

Un fichero por idioma con la misma forma:

```
src/i18n/
  es.ts   ← el original, y la referencia
  en.ts
  pt.ts
```

Con el tipo de `es.ts` como contrato:

```ts
export type Textos = typeof import("./es").textos;
export const textos: Textos = { ... }   // en.ts y pt.ts
```

Así **TypeScript avisa en el build si falta una clave** al traducir. Es la
diferencia entre enterarte al compilar y enterarte porque un cliente ve
`hero.titulo` en pantalla.

### 4.3 El trabajo real

Hay que sacar el texto de 12 componentes. El orden por rentabilidad:

1. `NavBar`, `Hero` — lo que se ve antes de decidir si sigues leyendo
2. `Pricing` + `PricingTable` — va con la fase 1
3. `Faq`, `Footer` — mucho texto, poca maquetación
4. `WhatsInside`, `Testimonials`, `AiFlow`, `ProductShowcase` — los que llevan
   datos y textos mezclados; los más laboriosos

### 4.4 Lo que se rompe al traducir y conviene saber antes

- **El titular del hero se escribe solo** (`TypewriterWord`) con palabras en
  español. Cada idioma necesita su lista, y en inglés y portugués son más
  largas: el `whitespace-nowrap` de `md` en adelante va a desbordar. Hay que
  medir con la palabra más larga de cada idioma.
- **El texto del chat del asistente se escribe letra a letra** con `--chars`
  en unidades `ch`. Traducido cambia el número de caracteres, y ese valor se
  calcula del texto: si se saca a los ficheros de idioma, hay que calcularlo en
  tiempo de render, no a mano.
- **El alemán y el portugués alargan los textos entre un 15 % y un 30 %.** Las
  columnas de la tabla de precios y las pastillas del selector de producto están
  ajustadas al español. Se prueba con el idioma más largo, no con el más corto.
- **`toda una cadena`, `sin sorpresas`** y demás juegos del copy no se traducen
  literales. Traducir esta web es reescribirla en otro idioma, no pasarla por un
  traductor — si se hace literal, se pierde justo lo que se ha estado ajustando
  estos días.

### 4.5 Qué idioma se elige solo

`Accept-Language` del navegador **solo para sugerir**, nunca para redirigir
callado. Si alguien entra a `/en/` desde España, se queda en `/en/`: pidió esa
URL. Como mucho, un aviso discreto arriba: *"¿Prefieres español? →"*.

Redirigir automáticamente por idioma rompe los enlaces compartidos y confunde a
Google, y es de las cosas más difíciles de deshacer una vez indexada mal.

---

## 5. Qué NO se propone hacer

- **Traducir con IA sin repasar.** Para el copy de una landing, no. Es
  exactamente donde se nota.
- **Convertir moneda con tipo de cambio en vivo.** Explicado en el punto 1:
  precios que bailan y salen con céntimos.
- **Pedir permiso de ubicación del navegador.**
- **Un cuarto y quinto idioma "ya que estamos".** Cada idioma es mantenimiento
  para siempre: cada cambio de copy hay que hacerlo tres veces.

---

## 6. Orden sugerido

| # | Qué | Por qué antes que lo siguiente |
|---|-----|-------------------------------|
| 1 | Detectar el país y el selector de moneda | Nada depende de esto, y es lo que se pidió |
| 2 | Tabla de precios por país + `Intl.NumberFormat` | Necesita el paso 1 |
| 3 | Probar la maquetación con COP y ARS | Los importes largos rompen las columnas |
| 4 | Enrutado i18n de Astro + `es.ts` | Sacar el texto a fichero sin traducir todavía: se ve si algo se rompe con el idioma que ya está |
| 5 | `en.ts` y `pt.ts` | Con el tipo de `es.ts` obligando a completarlas |
| 6 | Selector de idioma + `hreflang` | Lo último: hasta que no hay contenido traducido, no hay nada que enlazar |

El paso 4 es el que ahorra los sustos: mueve todo el texto **sin cambiar ni una
palabra**, así que si algo se descuadra se sabe que fue el refactor y no la
traducción.
